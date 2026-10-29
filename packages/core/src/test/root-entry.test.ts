import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

type ExportTarget = string | { import?: string; types?: string };

const pkgRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const distDir = resolve(pkgRoot, "dist");
const pkg = JSON.parse(
  readFileSync(resolve(pkgRoot, "package.json"), "utf-8")
) as { exports: Record<string, ExportTarget> };

const resolveTarget = (
  target: ExportTarget | undefined
): string | undefined => {
  if (!target) return undefined;
  return typeof target === "string" ? target : target.import;
};

const namedSubpaths = Object.entries(pkg.exports).filter(
  ([key]) => key !== "." && !key.includes("*")
);

// 依赖构建产物；未构建时整体跳过（新克隆的仓库不会因此变红）
describe.skipIf(!existsSync(distDir))(
  "包根入口与导出映射（需先 build）",
  () => {
    it.fails(
      "P0-1：exports['.'].import 指向的运行时文件存在（当前缺失，属于已知缺陷）",
      () => {
        const target = resolveTarget(pkg.exports["."]);
        expect(target).toBeDefined();
        expect(existsSync(resolve(pkgRoot, target as string))).toBe(true);
      }
    );

    it("其余具名子路径的运行时文件都存在", () => {
      const missing = namedSubpaths
        .map(([key, value]) => ({ key, target: resolveTarget(value) }))
        .filter(({ target }) => target && !existsSync(resolve(pkgRoot, target)))
        .map(({ key, target }) => `${key} → ${target}`);

      expect(missing).toEqual([]);
    });

    it("根入口的类型声明已生成（与运行时入口缺失形成对照）", () => {
      const typesTarget = pkg.exports["."];
      const types =
        typeof typesTarget === "string" ? undefined : typesTarget.types;

      expect(types).toBeDefined();
      expect(existsSync(resolve(pkgRoot, types as string))).toBe(true);
    });
  }
);
