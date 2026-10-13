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
      // 同名测试检测宽松接受 .ts/.js 双后缀，.test.ts 为规范形态优先命中
      const tsTestPath = path.join(dir, `${name}.test.ts`);
      const jsTestPath = path.join(dir, `${name}.test.js`);
      const testFile = fs.existsSync(tsTestPath)
        ? tsTestPath
        : fs.existsSync(jsTestPath)
          ? jsTestPath
          : null;
      result.push({ name, dir, hasIndex, testFile, internal: root.internal });
    }
  }
  return result;
}

/** 共享测试区根目录下的 *.test.ts / *.test.js 文件名列表（不含子目录）；组件测试判定由调用方执行 */
export function scanTestRootFiles(cfg: ResolvedEaConfig): string[] {
  const { testDir } = cfg.project;
  if (!fs.existsSync(testDir)) return [];
  return fs
    .readdirSync(testDir, { withFileTypes: true })
    .filter(e => e.isFile() && /\.test\.(js|ts)$/.test(e.name))
    .map(e => e.name)
    .sort();
}
