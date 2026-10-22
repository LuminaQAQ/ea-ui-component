import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { runCreate } from "../commands/create";
import { runCheck } from "../commands/check";
import { runAdd } from "../commands/add";
import { makeTempRoot, removeTempRoot, readLf } from "./helpers";

const dirs: string[] = [];
function temp(): string {
  const d = makeTempRoot();
  dirs.push(d);
  return d;
}

let logs: string[];
let originalExitCode: number | string | null | undefined;

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

const out = () => logs.join("\n");

describe("runCreate", () => {
  it("生成单包项目：真实模板复制 + name/prefix 改写 + config", async () => {
    const root = temp();
    vi.spyOn(process, "cwd").mockReturnValue(root);

    await runCreate("my-lib", { prefix: "ml" });
    const target = path.join(root, "my-lib");

    const pkg = JSON.parse(readLf(path.join(target, "package.json")));
    expect(pkg.name).toBe("my-lib");

    const cfg = JSON.parse(readLf(path.join(target, "ea.config.json")));
    expect(cfg.project.prefix).toBe("ml");
    expect(cfg.project.componentDirs).toBe("src/components");
    expect(cfg.project.entry).toBe("src/index.ts");

    const entry = readLf(path.join(target, "src/index.ts"));
    expect(entry).toContain("// @ea-generated:start");
    expect(entry).toContain("// @ea-generated:end");
    expect(entry).toContain(
      'export { MlButton } from "./components/ml-button";'
    );

    // 示例组件随 prefix 改写（目录 / 测试 / 标签与类名）
    const sampleDir = path.join(target, "src", "components", "ml-button");
    expect(fs.existsSync(sampleDir)).toBe(true);
    expect(fs.existsSync(path.join(sampleDir, "ml-button.test.ts"))).toBe(true);
    const sample = readLf(path.join(sampleDir, "index.ts"));
    expect(sample).toContain('const TAG_NAME = "ml-button"');
    expect(sample).toContain("export class MlButton");

    // 不再随项目分发本仓库的 constants
    expect(
      fs.existsSync(path.join(target, "src", "constants", "variant.ts"))
    ).toBe(false);

    // demo 页
    const html = readLf(path.join(target, "index.html"));
    expect(html).toContain("<ml-button");
    const main = readLf(path.join(target, "main.ts"));
    expect(main).toContain('getElementById("minus")');
    expect(fs.existsSync(path.join(target, "main.ts"))).toBe(true);
    expect(fs.existsSync(path.join(target, "assets", "style.css"))).toBe(true);
    expect(fs.existsSync(path.join(target, ".gitignore"))).toBe(true);
    expect(fs.existsSync(path.join(target, "gitignore"))).toBe(false);
    expect(fs.existsSync(path.join(target, "pnpm-workspace.yaml"))).toBe(true);

    const readme = readLf(path.join(target, "README.md"));
    expect(readme).toContain("组件库");
  });

  it("prefix 为 ea 时示例组件保持 ea-button", async () => {
    const root = temp();
    vi.spyOn(process, "cwd").mockReturnValue(root);

    await runCreate("ea-lib", { prefix: "ea" });
    const target = path.join(root, "ea-lib");

    expect(
      fs.existsSync(
        path.join(target, "src", "components", "ea-button", "index.ts")
      )
    ).toBe(true);
  });

  it("示例模板依赖为 caret range（由 Dependabot 提升下限）", () => {
    const repoRoot = path.resolve(
      path.dirname(fileURLToPath(import.meta.url)),
      "../../../.."
    );
    const tplPkg = JSON.parse(
      fs.readFileSync(
        path.join(repoRoot, "packages/cli/templates/project/package.json"),
        "utf-8"
      )
    );
    for (const dep of [
      "@easy-component-ui/core",
      "@easy-component-ui/themes",
    ]) {
      // 与 create-vite 一致：^x.y.z，用户在 install 时拿到 minor/patch 最新
      expect(tplPkg.dependencies[dep]).toMatch(/^\^\d+\.\d+\.\d+$/);
    }
  });

  it("项目名/prefix 非法时报错", async () => {
    const root = temp();
    vi.spyOn(process, "cwd").mockReturnValue(root);

    await expect(runCreate("MyLib", { prefix: "ml" })).rejects.toThrow(
      /项目名非法/
    );
    await expect(runCreate("my-lib", { prefix: "ML" })).rejects.toThrow(
      /prefix 非法/
    );
  });

  it("目标目录非空时报错", async () => {
    const root = temp();
    vi.spyOn(process, "cwd").mockReturnValue(root);
    fs.mkdirSync(path.join(root, "taken"));
    fs.writeFileSync(path.join(root, "taken", "x.txt"), "x");

    await expect(runCreate("taken", { prefix: "ml" })).rejects.toThrow(
      /目标目录非空/
    );
  });

  it("--dry-run 只预览不落盘", async () => {
    const root = temp();
    vi.spyOn(process, "cwd").mockReturnValue(root);

    await runCreate("dry", { prefix: "ml", dryRun: true });

    expect(fs.existsSync(path.join(root, "dry"))).toBe(false);
    expect(out()).toContain("将创建项目 dry");
  });

  it("冒烟：create → check 通过 → add 组件 → check 仍通过", async () => {
    const root = temp();
    vi.spyOn(process, "cwd").mockReturnValue(root);

    await runCreate("smoke", { prefix: "sk" });
    const target = path.join(root, "smoke");

    vi.spyOn(process, "cwd").mockReturnValue(target);
    process.exitCode = undefined;
    runCheck();
    expect(out()).toContain("校验通过");
    expect(process.exitCode).not.toBe(1);

    logs = [];
    await runAdd("demo", { summary: "演示组件", yes: true });

    logs = [];
    process.exitCode = undefined;
    runCheck();
    expect(out()).toContain("校验通过");
    expect(process.exitCode).not.toBe(1);
  });
});
