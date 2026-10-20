import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import fs from "node:fs";
import path from "node:path";

import { runRemove } from "../commands/remove";
import { makeTempRoot, removeTempRoot, writeFile, readLf } from "./helpers";

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

function setup(
  componentDirs: (string | { path: string; internal?: boolean })[] = [
    "components",
  ]
): string {
  const root = temp();
  writeFile(
    root,
    "ea.config.json",
    JSON.stringify({
      project: {
        prefix: "ea",
        componentDirs,
        testDir: "test",
        entry: "components/index.ts",
      },
      check: { rootTestWhitelist: [], ignore: [] },
    })
  );
  vi.spyOn(process, "cwd").mockReturnValue(root);
  return root;
}

/** 建一个组件目录（index.ts + 同名测试）；类名取 kebab 名的 PascalCase 形态 */
function makeComponent(root: string, dirRel: string, name: string): string {
  const dir = path.join(root, ...dirRel.split("/"), name);
  const className = name
    .split("-")
    .map(seg => seg.charAt(0).toUpperCase() + seg.slice(1))
    .join("");
  writeFile(
    root,
    `${dirRel}/${name}/index.ts`,
    `export class ${className} {}\n`
  );
  writeFile(root, `${dirRel}/${name}/${name}.test.ts`, "// t\n");
  return dir;
}

function setTTY(value: boolean | undefined): void {
  Object.defineProperty(process.stdin, "isTTY", { value, configurable: true });
}

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

describe("runRemove", () => {
  it("--yes 删除组件目录并重建聚合入口", async () => {
    setTTY(false);
    const root = setup();
    const dir = makeComponent(root, "components", "ea-x");

    await runRemove("ea-x", { yes: true });

    expect(fs.existsSync(dir)).toBe(false);
    const entry = readLf(path.join(root, "components", "index.ts"));
    expect(entry).toContain("// @ea-generated:start");
    expect(entry).not.toContain("ea-x");
  });

  it("--dry-run 预览文件树与聚合将移除行，不删除", async () => {
    setTTY(false);
    const root = setup();
    const dir = makeComponent(root, "components", "ea-x");

    await runRemove("ea-x", { dryRun: true });

    expect(out()).toContain("删除预览");
    expect(out()).toContain("index.ts");
    expect(out()).toContain("聚合入口将移除");
    expect(out()).toContain('export { EaX } from "./ea-x";');
    expect(out()).toContain("--dry-run：未删除任何文件");
    expect(fs.existsSync(dir)).toBe(true);
  });

  it("交互 confirm 拒绝时不删除", async () => {
    setTTY(true);
    const root = setup();
    const dir = makeComponent(root, "components", "ea-x");
    promptsMock.mockResolvedValueOnce({ confirmed: false });

    await runRemove("ea-x", {});

    expect(fs.existsSync(dir)).toBe(true);
    expect(out()).toContain("已取消删除");
  });

  it("交互 confirm 同意时删除并提示清理引用", async () => {
    setTTY(true);
    const root = setup();
    const dir = makeComponent(root, "components", "ea-x");
    promptsMock.mockResolvedValueOnce({ confirmed: true });

    await runRemove("ea-x", {});

    expect(fs.existsSync(dir)).toBe(false);
    expect(out()).toContain("请手动清理对 ea-x 的引用");
  });

  it("非交互且无 --yes 时报错不删除", async () => {
    setTTY(false);
    const root = setup();
    const dir = makeComponent(root, "components", "ea-x");

    await expect(runRemove("ea-x", {})).rejects.toThrow(
      "非交互环境无法 prompts"
    );
    expect(fs.existsSync(dir)).toBe(true);
  });

  it("组件不存在时报错", async () => {
    setTTY(false);
    setup();

    await expect(runRemove("ea-nope", { yes: true })).rejects.toThrow(
      "组件 ea-nope 不存在于公开组件目录"
    );
  });

  it("裸名经 prefix 归一化后命中目标目录", async () => {
    setTTY(false);
    const root = setup();
    const dir = makeComponent(root, "components", "ea-my-widget");

    await runRemove("my-widget", { yes: true });

    expect(fs.existsSync(dir)).toBe(false);
  });

  it("--internal 从 internal 目录移除，不进聚合", async () => {
    setTTY(false);
    const root = setup(["components", { path: "common", internal: true }]);
    const dir = makeComponent(root, "common", "ea-y");

    await runRemove("ea-y", { internal: true, yes: true });

    expect(fs.existsSync(dir)).toBe(false);
    expect(out()).toContain("内部组件不进聚合出口");
  });

  it("--internal 传公开组件名时报不存在", async () => {
    setTTY(false);
    const root = setup(["components", { path: "common", internal: true }]);
    makeComponent(root, "components", "ea-x");

    await expect(
      runRemove("ea-x", { internal: true, yes: true })
    ).rejects.toThrow("不存在于 internal 内部组件目录");
  });

  it("递归列出嵌套附属目录文件", async () => {
    setTTY(false);
    const root = setup();
    makeComponent(root, "components", "ea-x");
    writeFile(
      root,
      "components/ea-x/components/ea-sub/index.ts",
      "export class EaSub {}\n"
    );

    await runRemove("ea-x", { dryRun: true });

    expect(out()).toContain("ea-sub");
    expect(out()).toContain("components/");
  });

  it("缺少组件名参数时报错", async () => {
    setTTY(false);
    setup();

    await expect(runRemove(undefined, { yes: true })).rejects.toThrow(
      "ea remove 需要组件名"
    );
  });
});
