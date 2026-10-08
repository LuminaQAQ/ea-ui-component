import fs from "node:fs";
import path from "node:path";
import type { EaConfig } from "./config";

export type Scope = "components" | "common";

export interface ComponentDirInfo {
  name: string;
  dir: string;
  hasIndex: boolean;
  /** 同名测试文件绝对路径；不存在时为 null */
  testFile: string | null;
  scope: Scope;
}

/** 扫描 components/common 目录下所有子目录，采集 index.ts 与同名测试的存在性 */
export function scanScope(cfg: EaConfig, scope: Scope): ComponentDirInfo[] {
  const root = scope === "components" ? cfg.project.componentsDir : cfg.project.commonDir;
  if (!fs.existsSync(root)) return [];
  return fs
    .readdirSync(root)
    .filter(f => fs.statSync(path.join(root, f)).isDirectory())
    .sort()
    .map(name => {
      const dir = path.join(root, name);
      const hasIndex = fs.existsSync(path.join(dir, "index.ts"));
      const testPath = path.join(dir, `${name}.test.js`);
      const testFile = fs.existsSync(testPath) ? testPath : null;
      return { name, dir, hasIndex, testFile, scope };
    });
}

/** 共享测试区根目录下的 ea-*.test.js 文件名列表（不含子目录） */
export function scanTestRootFiles(cfg: EaConfig): string[] {
  const { testDir } = cfg.project;
  if (!fs.existsSync(testDir)) return [];
  return fs
    .readdirSync(testDir, { withFileTypes: true })
    .filter(e => e.isFile() && /^ea-.*\.test\.js$/.test(e.name))
    .map(e => e.name)
    .sort();
}
