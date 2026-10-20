import fs from "node:fs";
import path from "node:path";

import { loadConfig, type ResolvedEaConfig } from "../lib/config";
import { aggregateLineFor, regenerateAggregateEntry } from "../lib/aggregate";
import { normalizeName } from "../lib/naming";
import { ask, rel, renderTree } from "./add";
import { c, info, success, warn } from "../lib/output";

export interface RemoveOptions {
  internal?: boolean;
  dryRun?: boolean;
  yes?: boolean;
}

/** 递归列出目录下的文件（相对该目录，正斜杠，字典序） */
function listFiles(dir: string): string[] {
  const out: string[] = [];
  const walk = (cur: string, prefix: string): void => {
    const entries = fs
      .readdirSync(cur, { withFileTypes: true })
      .sort((a, b) => a.name.localeCompare(b.name));
    for (const e of entries) {
      const relPath = prefix ? `${prefix}/${e.name}` : e.name;
      if (e.isDirectory()) walk(path.join(cur, e.name), relPath);
      else out.push(relPath);
    }
  };
  walk(dir, "");
  return out;
}

/** 组件全名解析：已配置 prefix 时按归一化规则处理，否则按原样全名匹配 */
function resolveFullName(cfg: ResolvedEaConfig, input: string): string {
  const trimmed = input.trim();
  if (!cfg.project.prefix) return trimmed;
  const normalized = normalizeName(trimmed, cfg.project.prefix);
  if ("error" in normalized) throw new Error(`组件名非法：${normalized.error}`);
  return normalized.full;
}

/** 在候选目录集中查找组件目录（--internal 决定公开集 / internal 集） */
function findComponentDir(
  cfg: ResolvedEaConfig,
  full: string,
  useInternal: boolean
): string | null {
  for (const root of cfg.project.componentDirs) {
    if (root.internal !== useInternal) continue;
    const candidate = path.join(root.path, full);
    if (fs.existsSync(candidate) && fs.statSync(candidate).isDirectory())
      return candidate;
  }
  return null;
}

/** 移除预览：文件树 + 聚合入口将消失的 export 行 */
function renderRemovePreview(
  full: string,
  dir: string,
  files: string[],
  entryLine: string | null
): string {
  const header = `${c.red("✗")} ${c.bold(full)} ${c.dim("·")} ${c.dim("删除预览")}`;
  const entryText = entryLine
    ? c.red(entryLine)
    : c.dim("（无，内部组件不进聚合出口）");
  return [
    "",
    header,
    "",
    `  ${rel(dir)}/`,
    "",
    renderTree(files),
    "",
    `${c.dim("聚合入口将移除: ")}${entryText}`,
    "",
  ].join("\n");
}

/**
 * ea remove <name>：删除组件目录并同步重建聚合出口。
 * 支持交互 confirm / --dry-run / --yes / 无 TTY 报错。
 * 不自动改写引用方，断引用由 tsc / ea check 兜底并提醒人工清理。
 */
export async function runRemove(
  name: string | undefined,
  options: RemoveOptions = {}
): Promise<void> {
  const cfg = loadConfig();
  if (!name) throw new Error("ea remove 需要组件名：ea remove <name>");

  const useInternal = !!options.internal;
  const full = resolveFullName(cfg, name);
  const dir = findComponentDir(cfg, full, useInternal);
  if (!dir) {
    throw new Error(
      `组件 ${full} 不存在于${useInternal ? " internal 内部" : "公开"}组件目录，无法移除`
    );
  }

  const files = listFiles(dir);
  const entryLine = useInternal ? null : aggregateLineFor(cfg, dir);

  info(renderRemovePreview(full, dir, files, entryLine));

  if (options.dryRun) {
    info("\n--dry-run：未删除任何文件");
    return;
  }

  if (!options.yes) {
    const { confirmed } = await ask({
      type: "confirm",
      name: "confirmed",
      message: `确认删除 ${full} 及其 ${files.length} 个文件？`,
      initial: false,
    });
    if (!confirmed) {
      info("已取消删除，未删除任何文件");
      return;
    }
  }

  fs.rmSync(dir, { recursive: true, force: true });
  success(`✓ 已删除 ${rel(dir)}/`);
  warn(
    `⚠ 请手动清理对 ${full} 的引用（引用方不做自动改写，断引用由 tsc / ea check 兜底）`
  );

  regenerateAggregateEntry(cfg);
}
