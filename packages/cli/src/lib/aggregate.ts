import fs from "node:fs";
import path from "node:path";
import type { ResolvedEaConfig } from "./config";

const GENERATED_START = "// @ea-generated:start";
const GENERATED_END = "// @ea-generated:end";

/**
 * 解析组件 index.ts 的具名值导出名单：
 * 支持平铺 export {}、直出 export class、from 再导出、行内 type 修饰；
 * 排除 export type / interface / default；其余形态（export * / const 等）
 * 中止报错并打印文件与行号，禁止静默跳过
 */
function parseIndexExports(src: string, filePath: string): string[] {
  const names: string[] = [];
  const lines = src.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const no = i + 1;
    const m = line.match(/^export\s+(.+)$/);
    if (!m) continue;
    const rest = m[1];
    if (/^(type|interface|default)\b/.test(rest)) continue;
    const brace = rest.match(/^\{(.*)\}\s*(?:from\s+.*)?;?\s*$/);
    if (brace) {
      for (const raw of brace[1].split(",")) {
        const item = raw.trim();
        if (item === "" || /^type\s/.test(item)) continue;
        if (/\bas\b/.test(item)) {
          throw new Error(
            `export 别名形态不支持（${filePath}:L${no}）：${item}。请改用直接导出或扩展 CLI 解析白名单`
          );
        }
        names.push(item);
      }
      continue;
    }
    const cls = rest.match(/^(?:abstract\s+)?class\s+(\w+)/);
    if (cls) {
      names.push(cls[1]);
      continue;
    }
    throw new Error(
      `组件 index.ts 出现未识别的 export 形态（${filePath}:L${no}）：${line.trim()}。机械投影仅支持平铺/直出/from 再导出，请调整导出形态或扩展 CLI 解析白名单`
    );
  }
  return names;
}

/**
 * 标记区定位失败时抛出，报错含行号；extra 描述具体冲突形态
 */
function markerError(lines: string[], detail: string): Error {
  const positions = [GENERATED_START, GENERATED_END]
    .map(m => {
      const no = lines.indexOf(m) + 1;
      return no > 0 ? `${m} @ L${no}` : `${m} 缺失`;
    })
    .join("，");
  return new Error(
    `聚合入口哨兵标记${detail}（${positions}）。请修正标记后重试，标记格式：${GENERATED_START} 与 ${GENERATED_END} 各一行，生成内容置于两标记之间`
  );
}

/**
 * 定位两个哨兵标记的行下标；无任何标记返回 null，重复/部分缺失/交错时抛错
 */
function locateMarkers(lines: string[]): { start: number; end: number } | null {
  const firstStart = lines.indexOf(GENERATED_START);
  const firstEnd = lines.indexOf(GENERATED_END);
  const dupStart = lines.indexOf(GENERATED_START, firstStart + 1);
  const dupEnd = lines.indexOf(GENERATED_END, firstEnd + 1);
  if (dupStart !== -1 || dupEnd !== -1) {
    const dup = dupStart !== -1 ? GENERATED_START : GENERATED_END;
    throw new Error(`聚合入口哨兵标记重复：${dup} 出现多处，请保留一处后重试`);
  }
  if (firstStart === -1 && firstEnd === -1) return null;
  if (firstStart === -1 || firstEnd === -1) {
    throw markerError(lines, "部分缺失");
  }
  if (firstStart >= firstEnd) {
    throw markerError(lines, "交错或顺序错误");
  }
  return { start: firstStart, end: firstEnd };
}

/**
 * 无哨兵时的防御检查：现有文件含生成形态之外的多余行（疑似手工内容）则中止，
 * 防止全量重建销毁手工内容；纯生成形态则允许全量重建
 */
function guardNoSentinel(
  lines: string[],
  entryPath: string,
  generated: string[]
): void {
  const existing = [...lines];
  while (existing.length > 0 && existing[existing.length - 1] === "")
    existing.pop();
  const counts = new Map<string, number>();
  for (const line of generated) counts.set(line, (counts.get(line) ?? 0) + 1);
  const extra: { line: string; no: number }[] = [];
  for (let i = 0; i < existing.length; i++) {
    const line = existing[i];
    const left = counts.get(line) ?? 0;
    if (left > 0) counts.set(line, left - 1);
    else extra.push({ line, no: i + 1 });
  }
  if (extra.length > 0) {
    throw new Error(
      [
        `聚合入口 ${entryPath} 无哨兵标记，且存在 ${extra.length} 行生成产物之外的内容（疑似手工内容），已中止以避免重建销毁：`,
        ...extra.slice(0, 10).map(e => `  L${e.no}: ${e.line}`),
        `请手工植入哨兵标记（${GENERATED_START} 至 ${GENERATED_END}，生成内容置于两标记之间，手工内容置于标记区之外）后重试`,
      ].join("\n")
    );
  }
}

/**
 * 扫描 componentDirs 公开目录（跳过 internal）并机械投影各 index.ts 的具名值导出，
 * 在哨兵分区内重建聚合出口的再导出清单；分区之外的行（手工内容）原位保留。
 * 无哨兵时执行 diff 防御：含多余行则中止报错，纯生成形态则全量重建并提示。
 */
export function regenerateAggregateEntry(config: ResolvedEaConfig): void {
  const entryPath = config.project.entry;

  const dirs: { name: string; root: string }[] = [];
  for (const root of config.project.componentDirs) {
    if (root.internal || !fs.existsSync(root.path)) continue;
    const subDirs = fs
      .readdirSync(root.path)
      .filter(f => fs.statSync(path.join(root.path, f)).isDirectory())
      .filter(f => fs.existsSync(path.join(root.path, f, "index.ts")))
      .sort();
    for (const name of subDirs) dirs.push({ name, root: root.path });
  }

  const exportLines: string[] = [];
  for (const { name, root } of dirs) {
    const filePath = path.join(root, name, "index.ts");
    const src = fs.readFileSync(filePath, "utf-8");
    const names = parseIndexExports(src, filePath);
    if (names.length > 0) {
      exportLines.push(`export { ${names.join(", ")} } from "./${name}";`);
    }
  }

  const generated = [GENERATED_START, ...exportLines, GENERATED_END];

  if (!fs.existsSync(entryPath)) {
    fs.writeFileSync(entryPath, generated.join("\n") + "\n");
    console.log(`✓ 已生成聚合入口 ${entryPath}`);
    return;
  }

  const lines = fs.readFileSync(entryPath, "utf-8").split("\n");
  const markers = locateMarkers(lines);

  let result: string[];
  if (markers) {
    result = [
      ...lines.slice(0, markers.start),
      GENERATED_START,
      ...exportLines,
      GENERATED_END,
      ...lines.slice(markers.end + 1),
    ];
  } else {
    guardNoSentinel(lines, entryPath, generated);
    result = generated;
    console.log(`✓ 聚合入口无哨兵标记且无手工内容，已全量重建 ${entryPath}`);
  }
  while (result.length > 0 && result[result.length - 1] === "") result.pop();
  fs.writeFileSync(entryPath, result.join("\n") + "\n");
}
