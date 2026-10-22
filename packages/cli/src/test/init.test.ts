import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import fs from "node:fs";
import path from "node:path";

import { runInit, runInitTemplates } from "../commands/init";
import { BUILTIN_TEMPLATE_FILES, TEMPLATE_DOC_FILE } from "../lib/template";
import { makeTempRoot, removeTempRoot, writeFile, readLf } from "./helpers";

const promptsMock = vi.hoisted(() => vi.fn());
vi.mock("prompts", () => ({ default: promptsMock }));

const dirs: string[] = [];
function temp(): string {
  const d = makeTempRoot();
  dirs.push(d);
  return d;
}
let logs: string[];
let originalTTY: boolean | undefined;
beforeEach(() => {
  originalTTY = process.stdin.isTTY;
  promptsMock.mockReset();
  logs = [];
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

describe("runInitTemplates", () => {
  it("落盘全部内置模板与 README", () => {
    const root = temp();
    const target = path.join(root, "ea-templates");

    runInitTemplates(target);

    for (const f of BUILTIN_TEMPLATE_FILES) {
      expect(fs.existsSync(path.join(target, f))).toBe(true);
    }
    expect(fs.existsSync(path.join(target, TEMPLATE_DOC_FILE))).toBe(true);
    const ts = fs.readFileSync(
      path.join(target, "component", "component.ts.tpl"),
      "utf-8"
    );
    expect(ts).toContain("___CLASS_NAME___");
  });

  it("已存在文件默认跳过，--force 覆盖", () => {
    const root = temp();
    const target = path.join(root, "out");
    runInitTemplates(target);
    // 篡改其一
    const touched = path.join(target, "component", "component.ts.tpl");
    fs.writeFileSync(touched, "// customized");

    runInitTemplates(target); // 无 force
    expect(fs.readFileSync(touched, "utf-8")).toBe("// customized");

    runInitTemplates(target, true); // force
    expect(fs.readFileSync(touched, "utf-8")).toContain("___CLASS_NAME___");
    expect(out()).toContain("已存在，--force 覆盖");
  });
});

describe("runInit", () => {
  it("--templates 使用 --dir 指定输出目录", async () => {
    const root = temp();
    vi.spyOn(process, "cwd").mockReturnValue(root);

    await runInit({ templates: true, dir: "custom-tpl" });

    expect(
      fs.existsSync(
        path.join(root, "custom-tpl", "component", "component.ts.tpl")
      )
    ).toBe(true);
  });

  it("--templates 缺 --dir 时取 config.templates", async () => {
    const root = temp();
    writeFile(
      root,
      "ea.config.json",
      JSON.stringify({
        project: { componentDirs: "c", testDir: "t", entry: "e" },
        templates: "tpl-from-config",
        check: { rootTestWhitelist: [], ignore: [] },
      })
    );
    vi.spyOn(process, "cwd").mockReturnValue(root);

    await runInit({ templates: true });

    expect(
      fs.existsSync(
        path.join(root, "tpl-from-config", "component", "entry.ts.tpl")
      )
    ).toBe(true);
  });

  it("--templates 无 config 时回落默认目录 ea-templates", async () => {
    const root = temp();
    vi.spyOn(process, "cwd").mockReturnValue(root);

    await runInit({ templates: true });

    expect(
      fs.existsSync(
        path.join(root, "ea-templates", "component", "component.ts.tpl")
      )
    ).toBe(true);
  });

  it("内置目录无 README 时 eject 不含 README 且提示仍打印", () => {
    const root = temp();
    const target = path.join(root, "tpl");
    const realExists = fs.existsSync.bind(fs);
    vi.spyOn(fs, "existsSync").mockImplementation((p: fs.PathLike) => {
      if (String(p).endsWith("README.md")) return false;
      return realExists(p);
    });

    runInitTemplates(target);

    expect(
      fs.existsSync(path.join(target, "component", "component.ts.tpl"))
    ).toBe(true);
    expect(fs.existsSync(path.join(target, "README.md"))).toBe(false);
    expect(out()).toContain("README.md 编辑以上 .tpl 后");
  });

  it("--defaults 探测默认值写入 config 并生成聚合入口哨兵骨架", async () => {
    const root = temp();
    fs.mkdirSync(path.join(root, "src", "components"), { recursive: true });
    vi.spyOn(process, "cwd").mockReturnValue(root);

    await runInit({ defaults: true });

    const cfg = JSON.parse(
      fs.readFileSync(path.join(root, "ea.config.json"), "utf-8")
    );
    expect(cfg.project.componentDirs).toBe("src/components");
    expect(cfg.project.testDir).toBe("src/test");
    expect(cfg.project.entry).toBe("src/components/index.ts");
    expect(cfg.project.prefix).toBeUndefined();

    const entry = readLf(path.join(root, "src", "components", "index.ts"));
    expect(entry).toContain("// @ea-generated:start");
    expect(entry).toContain("// @ea-generated:end");
    expect(out()).toContain("未配置 project.prefix");
  });

  it("--defaults 探测 monorepo 布局（packages/components/src/components）", async () => {
    const root = temp();
    fs.mkdirSync(
      path.join(root, "packages", "components", "src", "components"),
      {
        recursive: true,
      }
    );
    vi.spyOn(process, "cwd").mockReturnValue(root);

    await runInit({ defaults: true });

    const cfg = JSON.parse(
      fs.readFileSync(path.join(root, "ea.config.json"), "utf-8")
    );
    expect(cfg.project.componentDirs).toBe(
      "packages/components/src/components"
    );
    expect(cfg.project.testDir).toBe("packages/components/src/test");
    expect(cfg.project.entry).toBe(
      "packages/components/src/components/index.ts"
    );
  });

  it("--defaults 已存在 config 时报错不覆盖", async () => {
    const root = temp();
    writeFile(root, "ea.config.json", "{}");
    vi.spyOn(process, "cwd").mockReturnValue(root);

    await expect(runInit({ defaults: true })).rejects.toThrow(
      "--defaults 不覆盖现有配置"
    );
    expect(fs.readFileSync(path.join(root, "ea.config.json"), "utf-8")).toBe(
      "{}"
    );
  });

  it("非交互且无 --defaults 时报错引导 --defaults", async () => {
    const root = temp();
    vi.spyOn(process, "cwd").mockReturnValue(root);
    Object.defineProperty(process.stdin, "isTTY", {
      value: false,
      configurable: true,
    });

    await expect(runInit({})).rejects.toThrow("ea init --defaults");
  });

  it("交互式向导按输入写入 prefix 与目录", async () => {
    const root = temp();
    vi.spyOn(process, "cwd").mockReturnValue(root);
    Object.defineProperty(process.stdin, "isTTY", {
      value: true,
      configurable: true,
    });
    promptsMock.mockResolvedValueOnce({
      prefix: "abc",
      componentDirs: "lib/widgets",
      testDir: "lib/test",
      entry: "lib/widgets/index.ts",
    });

    await runInit({});

    const cfg = JSON.parse(
      fs.readFileSync(path.join(root, "ea.config.json"), "utf-8")
    );
    expect(cfg.project).toMatchObject({
      prefix: "abc",
      componentDirs: "lib/widgets",
      testDir: "lib/test",
      entry: "lib/widgets/index.ts",
    });
    expect(promptsMock).toHaveBeenCalledTimes(1);
  });

  it("交互式向导 prefix 非法时报错", async () => {
    const root = temp();
    vi.spyOn(process, "cwd").mockReturnValue(root);
    Object.defineProperty(process.stdin, "isTTY", {
      value: true,
      configurable: true,
    });
    promptsMock.mockResolvedValueOnce({ prefix: "ABC" });

    await expect(runInit({})).rejects.toThrow("不合法");
  });

  it("交互式向导 config 已存在且拒绝覆盖时不写入", async () => {
    const root = temp();
    writeFile(root, "ea.config.json", '{"project":{}}');
    vi.spyOn(process, "cwd").mockReturnValue(root);
    Object.defineProperty(process.stdin, "isTTY", {
      value: true,
      configurable: true,
    });
    promptsMock.mockResolvedValueOnce({ overwrite: false });

    await runInit({});

    expect(fs.readFileSync(path.join(root, "ea.config.json"), "utf-8")).toBe(
      '{"project":{}}'
    );
    expect(out()).toContain("已取消：未写入配置");
  });

  it("--defaults 入口已存在时对齐并提示", async () => {
    const root = temp();
    fs.mkdirSync(path.join(root, "src", "components"), { recursive: true });
    writeFile(
      root,
      "src/components/index.ts",
      "// @ea-generated:start\n// @ea-generated:end\n"
    );
    vi.spyOn(process, "cwd").mockReturnValue(root);

    await runInit({ defaults: true });

    expect(out()).toContain("聚合入口已存在，对齐目录投影");
  });

  it("--defaults 入口无哨兵且含手工内容时降级为提示", async () => {
    const root = temp();
    fs.mkdirSync(path.join(root, "src", "components"), { recursive: true });
    writeFile(root, "src/components/manual.ts", "export const x = 1;\n");
    writeFile(root, "src/components/index.ts", 'import "./manual";\n');
    vi.spyOn(process, "cwd").mockReturnValue(root);

    await runInit({ defaults: true });

    expect(out()).toContain("聚合入口未同步");
  });

  it("交互式向导留空回落到探测默认值且不写 prefix", async () => {
    const root = temp();
    fs.mkdirSync(path.join(root, "src", "components"), { recursive: true });
    vi.spyOn(process, "cwd").mockReturnValue(root);
    Object.defineProperty(process.stdin, "isTTY", {
      value: true,
      configurable: true,
    });
    promptsMock.mockResolvedValueOnce({
      prefix: "",
      componentDirs: "",
      testDir: "",
      entry: "",
    });

    await runInit({});

    const cfg = JSON.parse(
      fs.readFileSync(path.join(root, "ea.config.json"), "utf-8")
    );
    expect(cfg.project).toMatchObject({
      componentDirs: "src/components",
      testDir: "src/test",
      entry: "src/components/index.ts",
    });
    expect(cfg.project.prefix).toBeUndefined();
  });

  it("--dir 指向 cwd 自身时输出相对路径回落为 .", async () => {
    const root = temp();
    vi.spyOn(process, "cwd").mockReturnValue(root);

    await runInit({ templates: true, dir: "." });

    expect(
      fs.existsSync(path.join(root, "component", "component.ts.tpl"))
    ).toBe(true);
    expect(out()).toContain("./component/component.ts.tpl");
  });
});
