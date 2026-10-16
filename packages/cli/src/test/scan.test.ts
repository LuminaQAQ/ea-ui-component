import { describe, it, expect, afterEach } from "vitest";
import path from "node:path";

import { loadConfig } from "../lib/config";
import { scanComponentDirs, scanTestRootFiles } from "../lib/scan";
import { makeTempRoot, removeTempRoot, writeFile } from "../test/helpers";

const dirs: string[] = [];
function temp(): string {
  const d = makeTempRoot();
  dirs.push(d);
  return d;
}
afterEach(() => {
  while (dirs.length) removeTempRoot(dirs.pop()!);
});

function cfgOf(root: string, componentDirs: unknown[]) {
  writeFile(
    root,
    "ea.config.json",
    JSON.stringify({
      project: { prefix: "ea", componentDirs, testDir: "test", entry: "index.ts" },
      check: { rootTestWhitelist: [], ignore: [] },
    })
  );
  return loadConfig(root);
}

describe("scanComponentDirs", () => {
  it("采集 index.ts 与同名测试存在性并按名排序", () => {
    const root = temp();
    writeFile(root, "components/ea-button/index.ts", "export const a=1");
    writeFile(root, "components/ea-button/ea-button.test.ts", "// t");
    writeFile(root, "components/ea-alert/index.ts", "export const b=1");
    const cfg = cfgOf(root, ["components"]);

    const list = scanComponentDirs(cfg);
    expect(list.map(d => d.name)).toEqual(["ea-alert", "ea-button"]);

    const button = list.find(d => d.name === "ea-button")!;
    expect(button.hasIndex).toBe(true);
    expect(button.testFile).toBe(path.join(root, "components", "ea-button", "ea-button.test.ts"));
    expect(button.internal).toBe(false);

    const alert = list.find(d => d.name === "ea-alert")!;
    expect(alert.testFile).toBeNull();
  });

  it("缺 index.ts 时 hasIndex=false 但仍记录测试", () => {
    const root = temp();
    writeFile(root, "components/ea-orphan/ea-orphan.test.ts", "// t");
    const [info] = scanComponentDirs(cfgOf(root, ["components"]));
    expect(info.hasIndex).toBe(false);
    expect(info.testFile).toContain("ea-orphan.test.ts");
  });

  it("无 .test.ts 时回落接受 .test.js", () => {
    const root = temp();
    writeFile(root, "components/ea-x/index.ts", "export const x=1");
    writeFile(root, "components/ea-x/ea-x.test.js", "// t");
    const [info] = scanComponentDirs(cfgOf(root, ["components"]));
    expect(info.testFile).toContain("ea-x.test.js");
  });

  it(".test.ts 优先于 .test.js", () => {
    const root = temp();
    writeFile(root, "components/ea-x/index.ts", "export const x=1");
    writeFile(root, "components/ea-x/ea-x.test.ts", "// t");
    writeFile(root, "components/ea-x/ea-x.test.js", "// t");
    const [info] = scanComponentDirs(cfgOf(root, ["components"]));
    expect(info.testFile).toContain("ea-x.test.ts");
  });

  it("internal 目录标记透传，多目录合并", () => {
    const root = temp();
    writeFile(root, "components/ea-button/index.ts", "export const a=1");
    writeFile(root, "common/ea-base/index.ts", "export const b=1");
    const list = scanComponentDirs(
      cfgOf(root, ["components", { path: "common", internal: true }])
    );
    expect(list.find(d => d.name === "ea-base")!.internal).toBe(true);
    expect(list.find(d => d.name === "ea-button")!.internal).toBe(false);
  });

  it("目录不存在时跳过", () => {
    const root = temp();
    writeFile(root, "components/ea-button/index.ts", "export const a=1");
    const list = scanComponentDirs(cfgOf(root, ["components", "missing-dir"]));
    expect(list.map(d => d.name)).toEqual(["ea-button"]);
  });

  it("忽略非目录条目", () => {
    const root = temp();
    writeFile(root, "components/stray.txt", "x");
    writeFile(root, "components/ea-button/index.ts", "export const a=1");
    const list = scanComponentDirs(cfgOf(root, ["components"]));
    expect(list.map(d => d.name)).toEqual(["ea-button"]);
  });
});

describe("scanTestRootFiles", () => {
  it("仅返回测试区根目录的 *.test.ts/.js 文件名并排序", () => {
    const root = temp();
    writeFile(root, "test/ea-button.test.ts", "// t");
    writeFile(root, "test/base.test.js", "// t");
    writeFile(root, "test/helper.ts", "// not test");
    writeFile(root, "test/sub/ea-alert.test.ts", "// nested");
    const files = scanTestRootFiles(cfgOf(root, ["components"]));
    expect(files).toEqual(["base.test.js", "ea-button.test.ts"]);
  });

  it("测试区不存在时返回空数组", () => {
    const root = temp();
    expect(scanTestRootFiles(cfgOf(root, ["components"]))).toEqual([]);
  });
});
