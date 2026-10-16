import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import { runCheck } from "../commands/check";
import { makeTempRoot, removeTempRoot, writeFile } from "./helpers";

const dirs: string[] = [];
function temp(): string {
  const d = makeTempRoot();
  dirs.push(d);
  return d;
}

let originalExitCode: number | string | null | undefined;
let logs: string[];

beforeEach(() => {
  originalExitCode = process.exitCode;
  process.exitCode = undefined;
  logs = [];
  vi.spyOn(console, "log").mockImplementation((...args: unknown[]) => {
    logs.push(args.map(String).join(" "));
  });
});

afterEach(() => {
  process.exitCode = originalExitCode;
  vi.restoreAllMocks();
  while (dirs.length) removeTempRoot(dirs.pop()!);
});

function setup(input: {
  prefix?: string;
  componentDirs?: (string | { path: string; internal?: boolean })[];
  ignore?: { name: string; rules?: string[]; reason?: string }[];
  rootTestWhitelist?: string[];
}) {
  const root = temp();
  writeFile(
    root,
    "ea.config.json",
    JSON.stringify({
      project: {
        prefix: input.prefix,
        componentDirs: input.componentDirs ?? ["components"],
        testDir: "test",
        entry: "components/index.ts",
      },
      check: {
        rootTestWhitelist: input.rootTestWhitelist ?? [],
        ignore: input.ignore ?? [],
      },
    })
  );
  vi.spyOn(process, "cwd").mockReturnValue(root);
  return root;
}

const out = () => logs.join("\n");

describe("runCheck", () => {
  it("全部合规：退出码不变并打印通过", () => {
    const root = setup({ prefix: "ea" });
    writeFile(
      root,
      "components/ea-button/index.ts",
      "export class EaButton {}"
    );
    writeFile(root, "components/ea-button/ea-button.test.ts", "// t");

    runCheck();

    expect(process.exitCode).not.toBe(1);
    expect(out()).toContain("校验通过");
    expect(out()).not.toContain("✗ [");
  });

  it("缺少同名测试报 missing-test 且退出码 1", () => {
    const root = setup({ prefix: "ea" });
    writeFile(
      root,
      "components/ea-button/index.ts",
      "export class EaButton {}"
    );

    runCheck();

    expect(process.exitCode).toBe(1);
    expect(out()).toContain("[missing-test]");
    expect(out()).toContain("缺少同名测试文件 ea-button.test.ts");
  });

  it("组件名不符合 prefix 规则报 naming", () => {
    const root = setup({ prefix: "ea" });
    writeFile(root, "components/badname/index.ts", "export const a = 1;");
    writeFile(root, "components/badname/badname.test.ts", "// t");

    runCheck();

    expect(process.exitCode).toBe(1);
    expect(out()).toContain("[naming]");
  });

  it("有测试无 index 报 orphan-test", () => {
    const root = setup({ prefix: "ea" });
    writeFile(root, "components/ea-orphan/ea-orphan.test.ts", "// t");

    runCheck();

    expect(process.exitCode).toBe(1);
    expect(out()).toContain("[orphan-test]");
  });

  it("共享测试区出现单组件测试报 test-root-violation", () => {
    const root = setup({ prefix: "ea" });
    writeFile(root, "components/ea-button/index.ts", "export const a = 1;");
    writeFile(root, "components/ea-button/ea-button.test.ts", "// t");
    writeFile(root, "test/ea-button.test.ts", "// misplaced");

    runCheck();

    expect(process.exitCode).toBe(1);
    expect(out()).toContain("[test-root-violation]");
  });

  it("白名单可豁免共享测试区文件", () => {
    const root = setup({
      prefix: "ea",
      rootTestWhitelist: ["ea-button.test.ts"],
    });
    writeFile(root, "components/ea-button/index.ts", "export const a = 1;");
    writeFile(root, "components/ea-button/ea-button.test.ts", "// t");
    writeFile(root, "test/ea-button.test.ts", "// whitelisted");

    runCheck();

    expect(out()).not.toContain("[test-root-violation]");
  });

  it("config.ignore 按规则豁免（rules 精确匹配）", () => {
    const root = setup({
      prefix: "ea",
      ignore: [{ name: "ea-button", rules: ["missing-test"] }],
    });
    writeFile(
      root,
      "components/ea-button/index.ts",
      "export class EaButton {}"
    );

    runCheck();

    expect(out()).not.toContain("[missing-test]");
  });

  it("config.ignore rules 缺省豁免该组件全部可蔑免规则", () => {
    // naming 规则不受 ignore 蔑免（需合规命名），故用合法名 + 缺测试场景验证 missing-test 被全蔑免
    const root = setup({ prefix: "ea", ignore: [{ name: "ea-x" }] });
    writeFile(root, "components/ea-x/index.ts", "export const a = 1;");

    runCheck();

    expect(out()).not.toContain("[missing-test]");
    expect(out()).toContain("校验通过");
  });

  it("--ignore 选项豁免指定组件", () => {
    const root = setup({ prefix: "ea" });
    writeFile(
      root,
      "components/ea-button/index.ts",
      "export class EaButton {}"
    );

    runCheck({ ignore: ["ea-button"] });

    expect(out()).not.toContain("[missing-test]");
    expect(out()).toContain("校验通过");
  });

  it("未配置 prefix 时按纯 WC 全名校验命名", () => {
    const root = setup({ prefix: undefined });
    writeFile(root, "components/my-widget/index.ts", "export const a = 1;");
    writeFile(root, "components/my-widget/my-widget.test.ts", "// t");

    runCheck();

    expect(out()).not.toContain("[naming]");
  });

  it("未配置 prefix 时 R3 仅当根区文件名精确等于组件全名才违规", () => {
    const root = setup({ prefix: undefined });
    writeFile(root, "components/my-widget/index.ts", "export const a = 1;");
    writeFile(root, "components/my-widget/my-widget.test.ts", "// t");
    // 根区出现与组件全名同名测试 → 违规
    writeFile(root, "test/my-widget.test.ts", "// misplaced");
    // 根区非组件名（基类/工具测试）→ 不误伤
    writeFile(root, "test/utils.test.ts", "// ok");

    runCheck();

    expect(out()).toContain("[test-root-violation]");
    expect(out()).not.toContain("utils.test.ts（");
  });

  it("R3 违规不受 --ignore 影响（实现仅对 R1/R2 按名蔑免，R3 只走白名单）", () => {
    const root = setup({ prefix: "ea" });
    writeFile(root, "components/ea-button/index.ts", "export const a = 1;");
    writeFile(root, "components/ea-button/ea-button.test.ts", "// t");
    writeFile(root, "test/ea-button.test.ts", "// misplaced");

    runCheck({ ignore: ["ea-button"] });

    // --ignore 不覆盖 R3：仍报违规（区别于已测的 rootTestWhitelist 路径）
    expect(out()).toContain("[test-root-violation]");
  });

  it("违规行走 stdout 而非 stderr", () => {
    const errSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const root = setup({ prefix: "ea" });
    writeFile(
      root,
      "components/ea-button/index.ts",
      "export class EaButton {}"
    );

    runCheck();

    expect(out()).toContain("[missing-test]");
    expect(errSpy).not.toHaveBeenCalled();
  });

  it("未配置 prefix 且命名违规时报纯 WC 规范消息", () => {
    const root = setup({ prefix: undefined });
    writeFile(root, "components/badname/index.ts", "export const a = 1;");
    writeFile(root, "components/badname/badname.test.ts", "// t");

    runCheck();

    expect(process.exitCode).toBe(1);
    expect(out()).toContain("不符合 WC 全名规范");
  });

  it("豁免展示带 reason 时冒号后输出原因", () => {
    const root = setup({
      prefix: "ea",
      ignore: [
        { name: "ea-anchor", rules: ["missing-test"], reason: "WIP 组件" },
      ],
    });
    writeFile(root, "components/ea-anchor/index.ts", "export const a = 1;");

    runCheck();

    expect(out()).toContain("豁免 ea-anchor：WIP 组件");
    expect(out()).toContain("校验通过");
  });

  it("豁免展示无 reason 时不带冒号后缀", () => {
    const root = setup({ prefix: "ea", ignore: [{ name: "ea-x" }] });
    writeFile(root, "components/ea-x/index.ts", "export const a = 1;");

    runCheck();

    expect(out()).toContain("豁免 ea-x");
    expect(out()).not.toContain("豁免 ea-x：");
  });

  it("豁免缺失 reason 报 ignore-reason warning 且不影响退出码", () => {
    const root = setup({
      prefix: "ea",
      ignore: [{ name: "ea-x", rules: ["missing-test"] }],
    });
    writeFile(root, "components/ea-x/index.ts", "export const a = 1;");

    runCheck();

    expect(process.exitCode).not.toBe(1);
    expect(out()).toContain("[ignore-reason]");
    expect(out()).toContain("缺少 reason");
    expect(out()).toContain("校验通过");
  });

  it("豁免对应组件目录不存在报 ignore-stale warning", () => {
    const root = setup({
      prefix: "ea",
      ignore: [
        { name: "ea-gone", rules: ["missing-test"], reason: "历史豁免" },
      ],
    });

    runCheck();

    expect(process.exitCode).not.toBe(1);
    expect(out()).toContain("[ignore-stale]");
    expect(out()).toContain("组件目录不存在");
  });

  it("豁免规则未命中任何违规报 ignore-stale 复查提示", () => {
    const root = setup({
      prefix: "ea",
      ignore: [{ name: "ea-button", rules: ["missing-test"], reason: "WIP" }],
    });
    writeFile(root, "components/ea-button/index.ts", "export const a = 1;");
    writeFile(root, "components/ea-button/ea-button.test.ts", "// t");

    runCheck();

    expect(process.exitCode).not.toBe(1);
    expect(out()).toContain("[ignore-stale]");
    expect(out()).toContain("未命中任何可豁免违规");
  });

  it("豁免命中违规时不报 ignore-stale", () => {
    const root = setup({
      prefix: "ea",
      ignore: [{ name: "ea-button", rules: ["missing-test"], reason: "WIP" }],
    });
    writeFile(root, "components/ea-button/index.ts", "export const a = 1;");

    runCheck();

    expect(out()).not.toContain("[ignore-stale]");
    expect(out()).toContain("校验通过");
  });

  it("warning 与 error 并存：错误仍主导退出码 1 并统计警告数", () => {
    const root = setup({
      prefix: "ea",
      ignore: [
        { name: "ea-gone", rules: ["missing-test"], reason: "历史豁免" },
      ],
    });
    writeFile(root, "components/ea-button/index.ts", "export const a = 1;");

    runCheck();

    expect(process.exitCode).toBe(1);
    expect(out()).toContain("[missing-test]");
    expect(out()).toContain("[ignore-stale]");
    expect(out()).toContain("1 个错误，1 个警告");
  });
});
