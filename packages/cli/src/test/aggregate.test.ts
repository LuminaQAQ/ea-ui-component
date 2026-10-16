import { describe, it, expect, vi, afterEach } from "vitest";
import fs from "node:fs";
import path from "node:path";

import { loadConfig } from "../lib/config";
import { regenerateAggregateEntry } from "../lib/aggregate";
import { makeTempRoot, removeTempRoot, writeFile, readLf } from "./helpers";

const dirs: string[] = [];
function temp(): string {
  const d = makeTempRoot();
  dirs.push(d);
  return d;
}
afterEach(() => {
  vi.restoreAllMocks();
  while (dirs.length) removeTempRoot(dirs.pop()!);
});

function silence() {
  vi.spyOn(console, "log").mockImplementation(() => {});
}

/** 写项目 config，返回 loadConfig 结果 */
function cfg(
  root: string,
  entry: string,
  componentDirs: (string | { path: string; internal?: boolean })[] = [
    "components",
  ]
) {
  writeFile(
    root,
    "ea.config.json",
    JSON.stringify({
      project: { prefix: "ea", componentDirs, testDir: "test", entry },
      check: { rootTestWhitelist: [], ignore: [] },
    })
  );
  return loadConfig(root);
}

describe("regenerateAggregateEntry", () => {
  it("entry 不存在时生成含哨兵与相对路径再导出的文件", () => {
    silence();
    const root = temp();
    writeFile(
      root,
      "components/ea-button/index.ts",
      "export class EaButton {}\nexport const meta = 1;\n"
    );
    writeFile(
      root,
      "components/ea-alert/index.ts",
      "export function show() {}\n"
    );
    const config = cfg(root, "components/index.ts");

    regenerateAggregateEntry(config);

    const entryAbs = path.join(root, "components", "index.ts");
    expect(fs.existsSync(entryAbs)).toBe(true);
    const text = readLf(entryAbs);
    expect(text).toContain("// @ea-generated:start");
    expect(text).toContain("// @ea-generated:end");
    expect(text).toContain('export { EaButton, meta } from "./ea-button";');
    expect(text).toContain('export { show } from "./ea-alert";');
  });

  it("entry 位于组件根之外时正确计算多级相对路径（反斜杠归一为 /）", () => {
    silence();
    const root = temp();
    writeFile(
      root,
      "src/components/ea-button/index.ts",
      "export const x = 1;\n"
    );
    const config = cfg(root, "src/index.ts", ["src/components"]);

    regenerateAggregateEntry(config);

    const text = readLf(path.join(root, "src", "index.ts"));
    expect(text).toContain('export { x } from "./components/ea-button";');
    expect(text).not.toContain("\\");
  });

  it("跳过 internal 目录与无 index.ts 的目录", () => {
    silence();
    const root = temp();
    writeFile(root, "components/ea-button/index.ts", "export const a = 1;\n");
    writeFile(root, "common/ea-base/index.ts", "export const b = 1;\n");
    fs.mkdirSync(path.join(root, "components", "ea-empty"), {
      recursive: true,
    }); // 目录无 index.ts
    const config = cfg(root, "components/index.ts", [
      "components",
      { path: "common", internal: true },
    ]);

    regenerateAggregateEntry(config);
    const text = readLf(path.join(root, "components", "index.ts"));
    expect(text).toContain("./ea-button");
    expect(text).not.toContain("ea-base");
    expect(text).not.toContain("ea-empty");
  });

  it("具名再导出收录、type-only 跳过", () => {
    silence();
    const root = temp();
    writeFile(
      root,
      "components/ea-x/index.ts",
      [
        "export class EaX {}",
        'export { helper } from "./helper";',
        'export type { T } from "./types";',
        "export interface I {}",
      ].join("\n")
    );
    const config = cfg(root, "components/index.ts");
    regenerateAggregateEntry(config);
    const text = readLf(path.join(root, "components", "index.ts"));
    expect(text).toContain("export { EaX, helper }");
    expect(text).not.toMatch(/\bT\b/);
    expect(text).not.toContain("I");
  });

  it("哨兵分区外手工内容保留，分区内容重建", () => {
    silence();
    const root = temp();
    writeFile(root, "components/ea-button/index.ts", "export const a = 1;\n");
    const entryAbs = writeFile(
      root,
      "components/index.ts",
      [
        "// header manual",
        "export const CUSTOM = 42;",
        "// @ea-generated:start",
        'export { OLD } from "./old";',
        "// @ea-generated:end",
        "// footer manual",
      ].join("\n")
    );
    const config = cfg(root, "components/index.ts");
    regenerateAggregateEntry(config);

    const lines = readLf(entryAbs).split("\n");
    expect(lines).toContain("// header manual");
    expect(lines).toContain("export const CUSTOM = 42;");
    expect(lines).toContain("// footer manual");
    expect(lines).not.toContain('export { OLD } from "./old";');
    expect(entryHasLine(lines, 'export { a } from "./ea-button";')).toBe(true);
    expect(
      lines.filter((l: string) => l === "// @ea-generated:start")
    ).toHaveLength(1);
  });

  it("export * 中止并带行号", () => {
    const root = temp();
    writeFile(root, "components/ea-bad/index.ts", 'export * from "./x";\n');
    const config = cfg(root, "components/index.ts");
    expect(() => regenerateAggregateEntry(config)).toThrow(
      /export \* 无法展开/
    );
  });

  it("别名再导出 as 中止", () => {
    const root = temp();
    writeFile(
      root,
      "components/ea-bad/index.ts",
      'export { foo as bar } from "./x";\n'
    );
    const config = cfg(root, "components/index.ts");
    expect(() => regenerateAggregateEntry(config)).toThrow(/别名再导出/);
  });

  it("解构导出中止", () => {
    const root = temp();
    writeFile(
      root,
      "components/ea-bad/index.ts",
      "export const { a, b } = obj;\n"
    );
    const config = cfg(root, "components/index.ts");
    expect(() => regenerateAggregateEntry(config)).toThrow(/解构导出形态/);
  });

  it("未识别的 export 形态中止并提示扩展白名单", () => {
    const root = temp();
    writeFile(
      root,
      "components/ea-bad/index.ts",
      "export namespace Magic {}\n"
    );
    const config = cfg(root, "components/index.ts");
    expect(() => regenerateAggregateEntry(config)).toThrow(
      /未识别的 export 形态/
    );
  });

  it("手工区含无法解析的 export 时报包装错误", () => {
    const root = temp();
    writeFile(root, "components/ea-button/index.ts", "export const a = 1;\n");
    writeFile(
      root,
      "components/index.ts",
      [
        "export const { bad } = obj;",
        "// @ea-generated:start",
        "// @ea-generated:end",
      ].join("\n")
    );
    const config = cfg(root, "components/index.ts");
    expect(() => regenerateAggregateEntry(config)).toThrow(
      /手工区导出解析失败/
    );
  });

  it("聚合入口位于子目录时 import 规范路径带 ./ 前缀", () => {
    const root = temp();
    writeFile(root, "components/ea-button/index.ts", "export const a = 1;\n");
    writeFile(
      root,
      "dist/entry.ts",
      ["// @ea-generated:start", "// @ea-generated:end"].join("\n")
    );
    const config = cfg(root, "dist/entry.ts");

    regenerateAggregateEntry(config);

    const lines = readLf(path.join(root, "dist/entry.ts")).split("\n");
    const idx = lines.indexOf("// @ea-generated:start");
    expect(lines[idx + 1]).toBe('export { a } from "../components/ea-button";');
  });

  it("组件 index.ts 无值导出时聚合入口不为其生成行", () => {
    const root = temp();
    writeFile(
      root,
      "components/ea-only-type/index.ts",
      "export type T = string;\n"
    );
    writeFile(root, "components/ea-btn/index.ts", "export const a = 1;\n");
    writeFile(
      root,
      "components/index.ts",
      ["// @ea-generated:start", "// @ea-generated:end"].join("\n")
    );
    const config = cfg(root, "components/index.ts");

    regenerateAggregateEntry(config);

    const body = readLf(path.join(root, "components", "index.ts"));
    expect(body).not.toContain("ea-only-type");
    expect(body).toContain('export { a } from "./ea-btn";');
  });

  it("手工区与生成名单重名时中止（防双处导出）", () => {
    silence();
    const root = temp();
    writeFile(root, "components/ea-button/index.ts", "export const DUP = 1;\n");
    writeFile(
      root,
      "components/index.ts",
      [
        "export const DUP = 2;",
        "// @ea-generated:start",
        "// @ea-generated:end",
      ].join("\n")
    );
    const config = cfg(root, "components/index.ts");
    expect(() => regenerateAggregateEntry(config)).toThrow(
      /手工区存在与生成名单重复/
    );
  });

  it("无哨兵但含手工内容时销毁防御中止", () => {
    const root = temp();
    writeFile(root, "components/ea-button/index.ts", "export const a = 1;\n");
    writeFile(root, "components/index.ts", "export const HAND = 9;\n");
    const config = cfg(root, "components/index.ts");
    expect(() => regenerateAggregateEntry(config)).toThrow(/疑似手工内容/);
  });

  it("无哨兵且为纯生成形态时全量重建", () => {
    silence();
    const root = temp();
    writeFile(root, "components/ea-button/index.ts", "export const a = 1;\n");
    // 现内容为旧版生成产物（无哨兵），行集与新生成名单一致，视为纯生成形态→全量重建
    writeFile(
      root,
      "components/index.ts",
      'export { a } from "./ea-button";\n'
    );
    const config = cfg(root, "components/index.ts");
    regenerateAggregateEntry(config);
    const text = readLf(path.join(root, "components", "index.ts"));
    expect(text).toContain("// @ea-generated:start");
    expect(text).toContain('export { a } from "./ea-button";');
  });

  it("组件无具名值导出时不产出该行", () => {
    silence();
    const root = temp();
    writeFile(
      root,
      "components/ea-only-type/index.ts",
      'export type { T } from "./t";\n'
    );
    writeFile(root, "components/ea-button/index.ts", "export const a = 1;\n");
    const config = cfg(root, "components/index.ts");
    regenerateAggregateEntry(config);
    const text = readLf(path.join(root, "components", "index.ts"));
    expect(text).not.toContain("ea-only-type");
    expect(text).toContain("./ea-button");
  });

  it("AST：平铺 export { A, B };（无 from）收录", () => {
    silence();
    const root = temp();
    writeFile(
      root,
      "components/ea-x/index.ts",
      "class A {}\nclass B {}\nexport { A, B };\n"
    );
    const config = cfg(root, "components/index.ts");
    regenerateAggregateEntry(config);
    const text = readLf(path.join(root, "components", "index.ts"));
    expect(text).toContain('export { A, B } from "./ea-x";');
  });

  it("AST：行内 type 修饰收录值排除型", () => {
    silence();
    const root = temp();
    writeFile(
      root,
      "components/ea-x/index.ts",
      'export { A, type B } from "./m";\n'
    );
    const config = cfg(root, "components/index.ts");
    regenerateAggregateEntry(config);
    const text = readLf(path.join(root, "components", "index.ts"));
    expect(text).toContain("export { A }");
    expect(text).not.toContain("B");
  });

  it("AST：export enum 收录", () => {
    silence();
    const root = temp();
    writeFile(root, "components/ea-x/index.ts", "export enum E { A, B }\n");
    const config = cfg(root, "components/index.ts");
    regenerateAggregateEntry(config);
    const text = readLf(path.join(root, "components", "index.ts"));
    expect(text).toContain('export { E } from "./ea-x";');
  });

  it("AST：export default 排除", () => {
    silence();
    const root = temp();
    writeFile(
      root,
      "components/ea-x/index.ts",
      "class X {}\nexport { X };\nexport default X;\n"
    );
    const config = cfg(root, "components/index.ts");
    regenerateAggregateEntry(config);
    const text = readLf(path.join(root, "components", "index.ts"));
    expect(text).toContain('export { X } from "./ea-x";');
    expect(text).not.toMatch(/default/);
  });

  it("哨兵标记部分缺失（有 start 无 end）报错", () => {
    silence();
    const root = temp();
    writeFile(root, "components/ea-button/index.ts", "export const a = 1;\n");
    writeFile(
      root,
      "components/index.ts",
      "export const C = 1;\n// @ea-generated:start\n"
    );
    const config = cfg(root, "components/index.ts");
    expect(() => regenerateAggregateEntry(config)).toThrow(/部分缺失/);
  });

  it("哨兵标记重复报错", () => {
    silence();
    const root = temp();
    writeFile(root, "components/ea-button/index.ts", "export const a = 1;\n");
    writeFile(
      root,
      "components/index.ts",
      "// @ea-generated:start\n// @ea-generated:end\n// @ea-generated:start\n"
    );
    const config = cfg(root, "components/index.ts");
    expect(() => regenerateAggregateEntry(config)).toThrow(/重复/);
  });

  it("哨兵标记交错（end 在 start 前）报错", () => {
    silence();
    const root = temp();
    writeFile(root, "components/ea-button/index.ts", "export const a = 1;\n");
    writeFile(
      root,
      "components/index.ts",
      "// @ea-generated:end\n// @ea-generated:start\n"
    );
    const config = cfg(root, "components/index.ts");
    expect(() => regenerateAggregateEntry(config)).toThrow(/交错或顺序错误/);
  });

  it("多公开目录下按字典序稳定输出", () => {
    silence();
    const root = temp();
    writeFile(root, "components/ea-zeta/index.ts", "export const z = 1;\n");
    writeFile(root, "components/ea-alpha/index.ts", "export const a = 1;\n");
    writeFile(root, "components/ea-mid/index.ts", "export const m = 1;\n");
    const config = cfg(root, "components/index.ts");
    regenerateAggregateEntry(config);
    const text = readLf(path.join(root, "components", "index.ts"));
    const ia = text.indexOf("ea-alpha");
    const im = text.indexOf("ea-mid");
    const iz = text.indexOf("ea-zeta");
    expect(ia).toBeGreaterThan(-1);
    expect(ia).toBeLessThan(im);
    expect(im).toBeLessThan(iz);
  });
});

function entryHasLine(lines: string[], line: string): boolean {
  return lines.some(l => l.trim() === line);
}
