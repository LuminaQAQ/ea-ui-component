import path from "node:path";

import { loadConfig } from "../lib/config";
import { regenerateAggregateEntry, diffAggregateEntry } from "../lib/aggregate";
import { c, error, info, success, warn } from "../lib/output";

export interface SyncOptions {
  /** 仅预览聚合入口将变更的 export 行，不落盘 */
  dryRun?: boolean;
}

/** 聚合入口相对 cwd 的展示路径（统一正斜杠） */
function relEntry(abs: string): string {
  const rel = path.relative(process.cwd(), abs).split(path.sep).join("/");
  return rel || abs;
}

/**
 * ea sync：把聚合入口重新对齐组件目录的具名值导出投影（聚合入口由 CLI 命令维护，非构建自动生成）。
 * 手动增删组件目录或调整附属组件可见性后，运行本命令即可同步。
 * ea add 落盘时内部已复用同一逻辑自动重建，常规新增无需手跑本命令。
 */
export function runSync(options: SyncOptions = {}): void {
  const cfg = loadConfig();
  const entryRel = relEntry(cfg.project.entry);

  if (options.dryRun) {
    const d = diffAggregateEntry(cfg);
    info(`聚合入口：${entryRel}`);
    if (d.status === "ok") {
      success(`✓ 与目录投影一致（${d.expected.length} 行），无需变更`);
      return;
    }
    if (d.status === "skip") {
      info(`ℹ ${d.message}`);
      return;
    }
    if (d.status === "error") {
      error(`✗ ${d.message}`);
      process.exitCode = 1;
      return;
    }
    for (const line of d.missing) info(c.green(`  + ${line}`));
    for (const line of d.extra) info(c.red(`  - ${line}`));
    warn(
      `\n--dry-run：将变更 ${d.missing.length + d.extra.length} 行，未写入（运行 ea sync 生效）`
    );
    return;
  }

  regenerateAggregateEntry(cfg);
  const after = diffAggregateEntry(cfg);
  if (after.status === "ok" || after.status === "skip") {
    success(
      `✓ 聚合入口已与目录投影同步：${entryRel}（${after.expected.length} 行导出）`
    );
  } else {
    error(`✗ 重建后仍不一致：${after.message}`);
    process.exitCode = 1;
  }
}
