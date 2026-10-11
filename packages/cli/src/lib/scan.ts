import fs from "node:fs";
import path from "node:path";
import type { EaConfig } from "./config";

export interface ComponentDirInfo {
  name: string;
  dir: string;
  hasIndex: boolean;
  /** 同名测试文件绝对路径；不存在时为 null */
  testFile: string | null;
  /** 内部组件目录（common 等）：不进聚合、无独立 exports */
  internal: boolean;
}

/** 扫描 componentsDirs 全部目录（含 internal），采集 index.ts 与同名测试的存在性 */
export function scanComponentDirs(cfg: EaConfig): ComponentDirInfo[] {
  const result: ComponentDirInfo[] = [];
  for (const root of cfg.project.componentsDirs) {
    const rootPath = typeof root === "string" ? root : root.path;
    const internal = typeof root !== "string" && !!root.internal;
    if (!fs.existsSync(rootPath)) continue;

    const subDirs = fs
      .readdirSync(rootPath)
      .filter(f => fs.statSync(path.join(rootPath, f)).isDirectory())
      .sort();
    for (const name of subDirs) {
      const dir = path.join(rootPath, name);
      const hasIndex = fs.existsSync(path.join(dir, "index.ts"));
      const testPath = path.join(dir, `${name}.test.js`);
      const testFile = fs.existsSync(testPath) ? testPath : null;
      result.push({ name, dir, hasIndex, testFile, internal });
    }
  }
  return result;
}

/** 共享测试区根目录下的 *.test.js 文件名列表（不含子目录）；组件测试判定由调用方按 prefix 规则执行 */
export function scanTestRootFiles(cfg: EaConfig): string[] {
  const { testDir } = cfg.project;
  if (!fs.existsSync(testDir)) return [];
  return fs
    .readdirSync(testDir, { withFileTypes: true })
    .filter(e => e.isFile() && e.name.endsWith(".test.js"))
    .map(e => e.name)
    .sort();
}
