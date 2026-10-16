import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import fs from "node:fs";
import path from "node:path";

import { runInit, runInitTemplates } from "../commands/init";
import { BUILTIN_TEMPLATE_FILES, TEMPLATE_DOC_FILE } from "../lib/template";
import { makeTempRoot, removeTempRoot, writeFile } from "./helpers";

const dirs: string[] = [];
function temp(): string {
  const d = makeTempRoot();
  dirs.push(d);
  return d;
}
let logs: string[];
beforeEach(() => {
  logs = [];
  vi.spyOn(console, "log").mockImplementation((...a: unknown[]) =>
    logs.push(a.map(String).join(" "))
  );
});
afterEach(() => {
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
    const ts = fs.readFileSync(path.join(target, "component.ts.tpl"), "utf-8");
    expect(ts).toContain("___CLASS_NAME___");
  });

  it("已存在文件默认跳过，--force 覆盖", () => {
    const root = temp();
    const target = path.join(root, "out");
    runInitTemplates(target);
    // 篡改其一
    const touched = path.join(target, "component.ts.tpl");
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
      fs.existsSync(path.join(root, "custom-tpl", "component.ts.tpl"))
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
      fs.existsSync(path.join(root, "tpl-from-config", "entry.ts.tpl"))
    ).toBe(true);
  });

  it("--templates 无 config 时回落默认目录 ea-templates", async () => {
    const root = temp();
    vi.spyOn(process, "cwd").mockReturnValue(root);

    await runInit({ templates: true });

    expect(
      fs.existsSync(path.join(root, "ea-templates", "component.ts.tpl"))
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

    expect(fs.existsSync(path.join(target, "component.ts.tpl"))).toBe(true);
    expect(fs.existsSync(path.join(target, "README.md"))).toBe(false);
    expect(out()).toContain("README.md 编辑以上 .tpl 后");
  });

  it("无 --templates 打印交互式向导未实现的最小引导", async () => {
    const root = temp();
    vi.spyOn(process, "cwd").mockReturnValue(root);

    await runInit({});

    expect(out()).toContain("交互式配置向导暂未实现");
    expect(out()).toContain("ea init --templates");
  });

  it("config 已存在时引导头部显示已检测到提示", async () => {
    const root = temp();
    writeFile(
      root,
      "ea.config.json",
      JSON.stringify({
        project: { componentDirs: "c", testDir: "t", entry: "e" },
      })
    );
    vi.spyOn(process, "cwd").mockReturnValue(root);

    await runInit({});

    expect(out()).toContain("已检测到 ea.config.json");
    expect(out()).not.toContain("未找到 ea.config.json");
  });

  it("--dir 指向 cwd 自身时输出相对路径回落为 .", async () => {
    const root = temp();
    vi.spyOn(process, "cwd").mockReturnValue(root);

    await runInit({ templates: true, dir: "." });

    expect(fs.existsSync(path.join(root, "component.ts.tpl"))).toBe(true);
    expect(out()).toContain("./component.ts.tpl");
  });
});
