import fs from "node:fs";
import path from "node:path";
import type { ResolvedEaConfig } from "./config";

export interface ComponentDirInfo {
  name: string;
  dir: string;
  hasIndex: boolean;
  /** 同名测试文件绝对路径；不存在时为 null */
  testFile: string | null;
  /** 内部组件目录（common 等）：不进聚合出口、无独立 exports */
  internal: boolean;
}

/** 扫描 componentDirs 全部目录（含 internal），采集 index.ts 与同名测试的存在性 */
export function scanComponentDirs(cfg: ResolvedEaConfig): ComponentDirInfo[] {
  const result: ComponentDirInfo[] = [];
  for (const root of cfg.project.componentDirs) {
    if (!fs.existsSync(root.path)) continue;

    const subDirs = fs
      .readdirSync(root.path)
      .filter(f => fs.statSync(path.join(root.path, f)).isDirectory())
      .sort();
    for (const name of subDirs) {
      const dir = path.join(root.path, name);
      const hasIndex = fs.existsSync(path.join(dir, "index.ts"));
      const testPath = path.join(dir, `${name}.test.ts`);
      const testFile = fs.existsSync(testPath) ? testPath : null;
      result.push({ name, dir, hasIndex, testFile, internal: root.internal });
    }
  }
  return result;
}

/** 共享测试区根目录下的 *.test.ts 文件名列表（不含子目录）；组件测试判定由调用方执行 */
export function scanTestRootFiles(cfg: ResolvedEaConfig): string[] {
  const { testDir } = cfg.project;
  if (!fs.existsSync(testDir)) return [];
  return fs
    .readdirSync(testDir, { withFileTypes: true })
    .filter(e => e.isFile() && e.name.endsWith(".test.ts"))
    .map(e => e.name)
    .sort();
}
