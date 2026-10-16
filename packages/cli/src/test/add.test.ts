import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import fs from "node:fs";
import path from "node:path";

import { runAdd, namePrompt, splitNames } from "../commands/add";
import { makeTempRoot, removeTempRoot, writeFile, readLf } from "./helpers";

interface SetupOpts {
  prefix?: string;
  componentDirs?: (string | { path: string; internal?: boolean })[];
}

const promptsMock = vi.hoisted(() => vi.fn());
vi.mock("prompts", () => ({ default: promptsMock }));

const dirs: string[] = [];
let originalTTY: boolean | undefined;
let logs: string[];

function temp(): string {
  const d = makeTempRoot();
  dirs.push(d);
  return d;
}

function setup(opts: SetupOpts = {}): string {
  // 区分“未传 prefix”（默认 ea）与“显式传 undefined”（模拟缺失）两种情形
  const prefix = "prefix" in opts ? opts.prefix : "ea";
  const componentDirs = opts.componentDirs ?? ["components"];
  const root = temp();
  writeFile(
    root,
    "ea.config.json",
    JSON.stringify({
      project: {
        prefix,
        componentDirs,
        testDir: "test",
        entry: "components/index.ts",
      },
      check: { rootTestWhitelist: [], ignore: [] },
    })
  );
  // 固定版本，令 @since 可断言
  writeFile(root, "package.json", JSON.stringify({ version: "9.9.9" }));
  // 预建公开组件根，令 --internal 场景重建聚合入口时其父目录已存在
  fs.mkdirSync(path.join(root, "components"), { recursive: true });
  vi.spyOn(process, "cwd").mockReturnValue(root);
  return root;
}

function setTTY(value: boolean | undefined): void {
  Object.defineProperty(process.stdin, "isTTY", { value, configurable: true });
}

beforeEach(() => {
  originalTTY = process.stdin.isTTY;
  logs = [];
  promptsMock.mockReset();
  vi.spyOn(console, "log").mockImplementation((...a: unknown[]) =>
    logs.push(a.map(String).join(" "))
  );
});
afterEach(() => {
  Object.defineProperty(process.stdin, "isTTY", {
    value: originalTTY,
    configurable: true,
  });
  vi.restoreAllMocks();
  while (dirs.length) removeTempRoot(dirs.pop()!);
});

const out = () => logs.join("\n");

describe("runAdd — 非交互（参数给全）", () => {
  it("单组件 + --yes 落盘三件套并重建聚合入口", async () => {
    setTTY(false);
    const root = setup();

    await runAdd("my-widget", { summary: "小部件", yes: true });

    const dir = path.join(root, "components", "ea-my-widget");
    expect(fs.existsSync(path.join(dir, "index.ts"))).toBe(true);
    expect(fs.existsSync(path.join(dir, "index.scss"))).toBe(true);
    expect(fs.existsSync(path.join(dir, "ea-my-widget.test.ts"))).toBe(true);

    const index = readLf(path.join(dir, "index.ts"));
    expect(index).toContain("export class EaMyWidget");
    expect(index).toContain("export default EaMyWidget;");
    expect(index).toContain("@summary 小部件");
    expect(index).toContain("@since 9.9.9");
    expect(index).toContain('"ea-my-widget": EaMyWidget');
    expect(index).not.toContain("___");

    const entry = readLf(path.join(root, "components", "index.ts"));
    expect(entry).toContain('export { EaMyWidget } from "./ea-my-widget";');
    expect(entry).toContain("// @ea-generated:start");
  });

  it("--dry-run 不落盘任何文件", async () => {
    setTTY(false);
    const root = setup();

    await runAdd("preview-only", { summary: "预览", dryRun: true });

    expect(
      fs.existsSync(path.join(root, "components", "ea-preview-only"))
    ).toBe(false);
    expect(fs.existsSync(path.join(root, "components", "index.ts"))).toBe(
      false
    );
    expect(out()).toContain("--dry-run：未写入任何文件");
  });

  it("--with 生成复合组件（薄主入口 + 附属实现）", async () => {
    setTTY(false);
    const root = setup();

    await runAdd("foo", { with: ["bar"], summary: "复合", yes: true });

    const base = path.join(root, "components", "ea-foo");
    const mainEntry = readLf(path.join(base, "index.ts"));
    expect(mainEntry).toContain('import { EaFoo } from "./components/ea-foo"');
    expect(mainEntry).toContain("EaBar");
    expect(mainEntry).toContain("export { EaFoo, EaBar };");

    // 主实现与附属实现分别落盘于 components/ 下
    expect(
      fs.existsSync(path.join(base, "components", "ea-foo", "index.ts"))
    ).toBe(true);
    expect(
      fs.existsSync(path.join(base, "components", "ea-bar", "index.ts"))
    ).toBe(true);
    expect(
      fs.existsSync(path.join(base, "components", "ea-bar", "index.scss"))
    ).toBe(true);

    // 附属实现不含值导出段（cut 截断）
    const subImpl = readLf(path.join(base, "components", "ea-bar", "index.ts"));
    expect(subImpl).not.toContain("export default EaBar;");
    // 但保留 TagNameMap 自声明（v1.16：谁注册 TAG_NAME 谁自声明，附属亦如此）
    expect(subImpl).toContain("declare global");
    expect(subImpl).toContain('"ea-bar": EaBar');

    const entry = readLf(path.join(root, "components", "index.ts"));
    expect(entry).toContain('export { EaFoo, EaBar } from "./ea-foo";');
  });

  it("--parts 生成私有组件（主实现副作用注册、不进聚合出口）", async () => {
    setTTY(false);
    const root = setup();

    await runAdd("foo", { parts: ["p1"], summary: "含私有", yes: true });

    const base = path.join(root, "components", "ea-foo");
    const index = readLf(path.join(base, "index.ts"));
    expect(index).toContain('import "./components/ea-p1/index";');
    expect(index).toContain("@dependency ea-p1");
    expect(index).toContain("export default EaFoo;");
    // 私有组件实现落盘
    expect(
      fs.existsSync(path.join(base, "components", "ea-p1", "index.ts"))
    ).toBe(true);

    // 聚合入口只导出主类，不含私有组件
    const entry = readLf(path.join(root, "components", "index.ts"));
    expect(entry).toContain('export { EaFoo } from "./ea-foo";');
    expect(entry).not.toContain("EaP1");
    expect(entry).not.toContain("ea-p1");
  });

  it("--internal 落到内部组件目录且不进聚合出口", async () => {
    setTTY(false);
    const root = setup({
      componentDirs: ["components", { path: "common", internal: true }],
    });

    await runAdd("secret", { summary: "内部", internal: true, yes: true });

    expect(
      fs.existsSync(path.join(root, "common", "ea-secret", "index.ts"))
    ).toBe(true);
    expect(fs.existsSync(path.join(root, "components", "ea-secret"))).toBe(
      false
    );

    const entry = readLf(path.join(root, "components", "index.ts"));
    expect(entry).not.toContain("ea-secret");
  });

  it("目标目录已存在时由上游重名检测中止不覆盖", async () => {
    setTTY(false);
    const root = setup();
    fs.mkdirSync(path.join(root, "components", "ea-dup"), { recursive: true });

    await expect(runAdd("dup", { summary: "x", yes: true })).rejects.toThrow(
      /已存在（目录重名）/
    );
  });

  it("缺少 prefix 时前置报错", async () => {
    setTTY(false);
    setup({ prefix: undefined });

    await expect(runAdd("foo", { summary: "x", yes: true })).rejects.toThrow(
      /需要完整配置/
    );
  });

  it("非法组件名报错", async () => {
    setTTY(false);
    setup();

    await expect(runAdd("MyBad", { summary: "x", yes: true })).rejects.toThrow(
      /组件名非法/
    );
  });
});

describe("runAdd — 交互", () => {
  it("TTY 下 prompts 取消返回 null 并提示已取消", async () => {
    setTTY(true);
    setup();
    promptsMock.mockResolvedValue({ value: undefined });

    await runAdd(undefined, { summary: "x" });

    expect(out()).toContain("已取消：交互输入中止");
    expect(promptsMock).toHaveBeenCalled();
  });

  it("非 TTY 且未提供名称时报错", async () => {
    setTTY(false);
    setup();

    await expect(runAdd(undefined, {})).rejects.toThrow(
      /非交互环境无法 prompts/
    );
  });
});

describe("runAdd — 运行态与重名检测补全", () => {
  it("交互模式：name→无附属→confirm true 落盘成功态", async () => {
    setTTY(true);
    const root = setup();
    promptsMock
      .mockResolvedValueOnce({ value: "foo" }) // 主名
      .mockResolvedValueOnce({ more: false }) // 是否包含附属组件
      .mockResolvedValueOnce({ confirmed: true }); // 写盘前确认

    await runAdd(undefined, { summary: "交互" });

    expect(
      fs.existsSync(path.join(root, "components", "ea-foo", "index.ts"))
    ).toBe(true);
    expect(
      fs.existsSync(path.join(root, "components", "ea-foo", "ea-foo.test.ts"))
    ).toBe(true);
    expect(promptsMock).toHaveBeenCalledTimes(3);
  });

  it("重名：附属名与主组件重名", async () => {
    setTTY(false);
    setup();

    await expect(
      runAdd("foo", { with: ["foo"], summary: "x", yes: true })
    ).rejects.toThrow(/重名/);
  });

  it("重名：同批 --with 互斥", async () => {
    setTTY(false);
    setup();

    await expect(
      runAdd("main", { with: ["bar", "bar"], summary: "x", yes: true })
    ).rejects.toThrow(/重名/);
  });

  it("重名：附属名撞现有目录", async () => {
    setTTY(false);
    const root = setup();
    fs.mkdirSync(path.join(root, "components", "ea-bar"), { recursive: true });

    await expect(
      runAdd("main", { with: ["bar"], summary: "x", yes: true })
    ).rejects.toThrow(/重名/);
  });

  it("--internal 但 config 无 internal 目录时报错", async () => {
    setTTY(false);
    setup(); // 仅公开 components 目录

    await expect(
      runAdd("secret", { summary: "x", internal: true, yes: true })
    ).rejects.toThrow(/需要 componentDirs 中配置 internal/);
  });

  it("@since 版本向上探测穷尽时回退 unknown 并警告", async () => {
    setTTY(false);
    // 独立沙箱：不写 package.json，令 detectComponentVersion 穷尽未中
    const root = temp();
    writeFile(
      root,
      "ea.config.json",
      JSON.stringify({
        project: {
          prefix: "ea",
          componentDirs: ["components"],
          testDir: "test",
          entry: "components/index.ts",
        },
        check: { rootTestWhitelist: [], ignore: [] },
      })
    );
    fs.mkdirSync(path.join(root, "components"), { recursive: true });
    vi.spyOn(process, "cwd").mockReturnValue(root);

    await runAdd("noversion", { summary: "s", dryRun: true });

    expect(out()).toContain("未找到组件所在包的 package.json version");
  });

  it("预览卡片含归一化回显、目录树与聚合入口新增行（--dry-run）", async () => {
    setTTY(false);
    setup();

    await runAdd("preview", { summary: "s", dryRun: true });

    // 头部回显完整类名/全名
    expect(out()).toContain("EaPreview");
    expect(out()).toContain("ea-preview");
    // 目录树 box-drawing 字符
    expect(out()).toMatch(/[├└]──/);
    // 聚合入口新增行摘要
    expect(out()).toContain("聚合入口:");
    expect(out()).toContain('export { EaPreview } from "./ea-preview";');
  });
});

describe("namePrompt validate — 三段防呆第 2 段即时报错（直测）", () => {
  const validateOf = () =>
    namePrompt("组件名", "ea", () => new Set(["ea-taken"])).validate as (
      value: string
    ) => true | string;

  it("非法名返回具体原因而非 true", () => {
    expect(validateOf()("MyBad")).toMatch(/大写字母/);
  });

  it("重名返回目录重名原因", () => {
    expect(validateOf()("taken")).toBe("ea-taken 已存在（目录重名）");
  });

  it("边界输入：恰等于 prefix 本身被拒", () => {
    expect(validateOf()("ea")).toMatch(/而非前缀/);
  });

  it("边界输入：以 - 结尾剥出裸名为空被拒", () => {
    expect(validateOf()("ea-")).toMatch(/裸名为空/);
  });

  it("合法输入返回 true", () => {
    expect(validateOf()("color-picker")).toBe(true);
  });
});

describe("runAdd — 输入解析与参数边界", () => {
  it("--with 支持空格与逗号混排并逐项 trim", () => {
    expect(splitNames(["bar, baz", "qux", ""])).toEqual(["bar", "baz", "qux"]);
    expect(splitNames(undefined)).toEqual([]);
  });

  it("非 TTY 不传 --summary 时 summary 留空仍落盘", async () => {
    setTTY(false);
    const root = setup();

    await runAdd("bare", { yes: true });

    const index = readLf(path.join(root, "components", "ea-bare", "index.ts"));
    expect(index).toContain("@summary \n");
    expect(index).not.toContain("undefined");
  });

  it("--summary 含换行时 JSDoc 破坏被锁定为现状", async () => {
    setTTY(false);
    const root = setup();

    await runAdd("multi", { summary: "第一行\n第二行", yes: true });

    const index = readLf(path.join(root, "components", "ea-multi", "index.ts"));
    expect(index).toContain("第一行\n第二行\n * @status stable");
  });

  it("--summary 含 ___TOKEN___ 字面量不被二次替换", async () => {
    setTTY(false);
    const root = setup();

    await runAdd("inject", { summary: "含 ___VERSION___ 占位", yes: true });

    const index = readLf(
      path.join(root, "components", "ea-inject", "index.ts")
    );
    expect(index).toContain("含 ___VERSION___ 占位");
  });

  it("组件名贴近长度上限（243 字符全名）正常写盘", async () => {
    setTTY(false);
    const root = setup();

    const bare = "x".repeat(240) + "-y";
    await runAdd(bare, { summary: "长名", yes: true });

    expect(
      fs.existsSync(path.join(root, "components", `ea-${bare}`, "index.ts"))
    ).toBe(true);
  });

  it("超长组件名（超 246 字符全名）报错且不落盘", async () => {
    setTTY(false);
    const root = setup();

    await expect(
      runAdd("x".repeat(250) + "-y", { summary: "超长", yes: true })
    ).rejects.toThrow(/超长/);

    expect(fs.readdirSync(path.join(root, "components"))).toEqual([]);
  });

  it("交互模式确认写入被拒时不落盘", async () => {
    setTTY(true);
    const root = setup();
    promptsMock
      .mockResolvedValueOnce({ value: "foo" })
      .mockResolvedValueOnce({ more: false })
      .mockResolvedValueOnce({ confirmed: false });

    await runAdd(undefined, { summary: "x" });

    expect(out()).toContain("已取消写入");
    expect(fs.existsSync(path.join(root, "components", "ea-foo"))).toBe(false);
  });
});

describe("runAdd — 子名与问答取消边界", () => {
  it("--with 子名非法 → 抛附属组件名非法", async () => {
    setTTY(false);
    setup();

    await expect(
      runAdd("foo", { with: ["MyBad"], summary: "x", yes: true })
    ).rejects.toThrow(/附属组件名非法/);
  });

  it("--parts 子名非法 → 抛私有组件名非法", async () => {
    setTTY(false);
    setup();

    await expect(
      runAdd("foo", { parts: ["Bad"], summary: "x", yes: true })
    ).rejects.toThrow(/私有组件名非法/);
  });

  it("交互主名问答取消 → 返回 null", async () => {
    setTTY(true);
    setup();
    promptsMock.mockResolvedValueOnce({ value: undefined });

    await runAdd(undefined, { summary: "x" });

    expect(out()).toContain("已取消：交互输入中止");
  });

  it("交互附属循环中「继续添加」取消 → 返回 null", async () => {
    setTTY(true);
    setup();
    promptsMock
      .mockResolvedValueOnce({ value: "foo" })
      .mockResolvedValueOnce({ more: true })
      .mockResolvedValueOnce({ value: "bar" })
      .mockResolvedValueOnce({ next: undefined }); // 取消继续问答

    await runAdd(undefined, { summary: "x" });

    expect(out()).toContain("已取消：交互输入中止");
  });

  it("交互附属名问答本身取消 → 返回 null", async () => {
    setTTY(true);
    setup();
    promptsMock
      .mockResolvedValueOnce({ value: "foo" })
      .mockResolvedValueOnce({ more: true })
      .mockResolvedValueOnce({ value: undefined }); // 取消附属名问答

    await runAdd(undefined, { summary: "x" });

    expect(out()).toContain("已取消：交互输入中止");
  });

  it("交互 multiselect 取消 → 返回 null", async () => {
    setTTY(true);
    setup();
    promptsMock
      .mockResolvedValueOnce({ value: "foo" })
      .mockResolvedValueOnce({ more: true })
      .mockResolvedValueOnce({ value: "bar" })
      .mockResolvedValueOnce({ next: false })
      .mockResolvedValueOnce({ exposed: undefined }); // 取消暴露复选

    await runAdd(undefined, { summary: "x" });

    expect(out()).toContain("已取消：交互输入中止");
  });
});

describe("runAdd — 交互式附属组件收集（无 --with 时 prompts 逐个收集）", () => {
  it("收集两个附属并勾选暴露落盘复合结构", async () => {
    setTTY(true);
    const root = setup();
    promptsMock
      .mockResolvedValueOnce({ value: "foo" }) // 主名
      .mockResolvedValueOnce({ more: true }) // 包含附属
      .mockResolvedValueOnce({ value: "bar" }) // 子名 1
      .mockResolvedValueOnce({ next: true }) // 继续
      .mockResolvedValueOnce({ value: "baz" }) // 子名 2
      .mockResolvedValueOnce({ next: false }) // 不继续
      .mockResolvedValueOnce({ exposed: ["ea-foo", "ea-bar", "ea-baz"] }) // 全暴露
      .mockResolvedValueOnce({ value: "" }) // 摘要问答（留空）
      .mockResolvedValueOnce({ confirmed: true });

    await runAdd(undefined, {});

    const base = path.join(root, "components", "ea-foo");
    const entryTs = readLf(path.join(base, "index.ts"));
    expect(entryTs).toContain("EaBar");
    expect(entryTs).toContain("EaBaz");
    expect(
      fs.existsSync(path.join(base, "components", "ea-bar", "index.ts"))
    ).toBe(true);
    expect(
      fs.existsSync(path.join(base, "components", "ea-baz", "index.ts"))
    ).toBe(true);
    const agg = readLf(path.join(root, "components", "index.ts"));
    expect(agg).toContain('export { EaFoo, EaBar, EaBaz } from "./ea-foo";');
  });

  it("multiselect 未勾选的附属降级为私有组件", async () => {
    setTTY(true);
    const root = setup();
    promptsMock
      .mockResolvedValueOnce({ value: "foo" })
      .mockResolvedValueOnce({ more: true })
      .mockResolvedValueOnce({ value: "bar" })
      .mockResolvedValueOnce({ next: false })
      .mockResolvedValueOnce({ exposed: [] }) // 全不勾选
      .mockResolvedValueOnce({ confirmed: true });

    await runAdd(undefined, { summary: "私有" });

    const base = path.join(root, "components", "ea-foo");
    const indexTs = readLf(path.join(base, "index.ts"));
    // 主出口回落为 component 模板具名导出，含私有组件副作用 import 与 @dependency
    expect(indexTs).toContain('import "./components/ea-bar/index";');
    expect(indexTs).toContain("@dependency ea-bar");
    expect(indexTs).toContain("export default EaFoo;");
    expect(
      fs.existsSync(path.join(base, "components", "ea-bar", "index.ts"))
    ).toBe(true);

    const agg = readLf(path.join(root, "components", "index.ts"));
    expect(agg).toContain('export { EaFoo } from "./ea-foo";');
    expect(agg).not.toContain("EaBar");
  });

  it("交互中任意问答取消 → 返回 null 并提示已取消", async () => {
    setTTY(true);
    setup();
    promptsMock
      .mockResolvedValueOnce({ value: "foo" })
      .mockResolvedValueOnce({ more: undefined }); // 取消附属问答

    await runAdd(undefined, { summary: "x" });

    expect(out()).toContain("已取消：交互输入中止");
  });

  it("交互子名经 validate 拦截后取消（normalize 兜底返回 null）", async () => {
    setTTY(true);
    setup();
    promptsMock
      .mockResolvedValueOnce({ value: "foo" })
      .mockResolvedValueOnce({ more: true })
      .mockResolvedValueOnce({ value: "Bad" }); // 绕过 validate 的非法值

    await runAdd(undefined, { summary: "x" });

    expect(out()).toContain("已取消：交互输入中止");
  });

  it("交互 summary 问答：trim 后留空", async () => {
    setTTY(true);
    const root = setup();
    promptsMock
      .mockResolvedValueOnce({ value: "foo" })
      .mockResolvedValueOnce({ more: false })
      .mockResolvedValueOnce({ value: "  摘要内容  " })
      .mockResolvedValueOnce({ confirmed: true });

    await runAdd(undefined, {});

    const index = readLf(path.join(root, "components", "ea-foo", "index.ts"));
    expect(index).toContain("@summary 摘要内容");
  });
});

describe("runAdd — 组合形态与 internal 边界", () => {
  it("--with + --parts 并存：公开附属进出口、私有仅副作用注册", async () => {
    setTTY(false);
    const root = setup();

    await runAdd("foo", {
      with: ["bar"],
      parts: ["p1"],
      summary: "组合",
      yes: true,
    });

    const base = path.join(root, "components", "ea-foo");
    const entryTs = readLf(path.join(base, "index.ts"));
    expect(entryTs).toContain('import { EaFoo } from "./components/ea-foo"');
    expect(entryTs).toContain("EaBar");

    const mainImpl = readLf(
      path.join(base, "components", "ea-foo", "index.ts")
    );
    expect(mainImpl).toContain('import "./components/ea-p1/index";');
    expect(mainImpl).toContain("@dependency ea-p1");
    expect(
      fs.existsSync(path.join(base, "components", "ea-p1", "index.ts"))
    ).toBe(true);

    // 预览分类为「复合组件 + N 私有组件」
    expect(out()).toContain("复合组件 + 1 私有组件");
    // 私有组件在目录树中标注
    expect(out()).toContain("# 私有组件");

    const agg = readLf(path.join(root, "components", "index.ts"));
    expect(agg).toContain('export { EaFoo, EaBar } from "./ea-foo";');
    expect(agg).not.toContain("EaP1");
  });

  it("--with + --internal 正交：复合结构生成到 internal 目录", async () => {
    setTTY(false);
    const root = setup({
      componentDirs: ["components", { path: "common", internal: true }],
    });

    await runAdd("panel", {
      with: ["body"],
      summary: "内部复合",
      internal: true,
      yes: true,
    });

    const base = path.join(root, "common", "ea-panel");
    expect(fs.existsSync(path.join(base, "index.ts"))).toBe(true);
    expect(
      fs.existsSync(path.join(base, "components", "ea-body", "index.ts"))
    ).toBe(true);
    expect(fs.existsSync(path.join(root, "components", "ea-panel"))).toBe(
      false
    );
    expect(readLf(path.join(root, "components", "index.ts"))).not.toContain(
      "ea-panel"
    );
  });

  it("componentDirs 全为 internal 且未传 --internal 时报错", async () => {
    setTTY(false);
    setup({ componentDirs: [{ path: "common", internal: true }] });

    await expect(runAdd("foo", { summary: "x", yes: true })).rejects.toThrow(
      /不存在公开组件目录/
    );
  });

  it("私有组件预览分类为「单组件 + N 私有组件」", async () => {
    setTTY(false);
    setup();

    await runAdd("widget", { parts: ["p1", "p2"], summary: "s", dryRun: true });

    expect(out()).toContain("单组件 + 2 私有组件");
  });
});
