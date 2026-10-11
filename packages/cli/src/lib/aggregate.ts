import fs from "node:fs";
import path from "node:path";
import type { EaConfig } from "./config";

const IMPORTS_START = "// @ea-generated:imports start";
const IMPORTS_END = "// @ea-generated:imports end";
const TYPES_START = "// @ea-generated:types start";
const TYPES_END = "// @ea-generated:types end";

/**
 * 解析组件 index.ts 的具名值导出名单（§4.1.1 机械投影）：
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
  const positions = [IMPORTS_START, IMPORTS_END, TYPES_START, TYPES_END]
    .map(m => {
      const no = lines.indexOf(m) + 1;
      return no > 0 ? `${m} @ L${no}` : `${m} 缺失`;
    })
    .join("，");
  return new Error(
    `聚合入口哨兵标记${detail}（${positions}）。请修正标记后重试，标记格式见 ea.config.json 同级文档或 ea init`
  );
}

/**
 * 定位四个哨兵标记的行下标；无任何标记返回 null，重复/部分缺失/交错时抛错
 */
function locateMarkers(lines: string[]): {
  importsStart: number;
  importsEnd: number;
  typesStart: number;
  typesEnd: number;
} | null {
  const found = [IMPORTS_START, IMPORTS_END, TYPES_START, TYPES_END].map(m => {
    const first = lines.indexOf(m);
    const dup = lines.indexOf(m, first + 1);
    return { marker: m, first, dup };
  });
  for (const { marker, first, dup } of found) {
    if (dup !== -1) {
      throw new Error(
        `聚合入口哨兵标记重复：${marker} 出现于 L${first + 1} 与 L${dup + 1}，请保留一处后重试`
      );
    }
  }
  if (found.every(({ first }) => first === -1)) return null;
  if (found.some(({ first }) => first === -1)) {
    throw markerError(lines, "部分缺失");
  }
  const [importsStart, importsEnd, typesStart, typesEnd] = found.map(
    ({ first }) => first
  );
  if (!(
    importsStart < importsEnd &&
    importsEnd < typesStart &&
    typesStart < typesEnd
  )) {
    throw markerError(lines, "交错或顺序错误");
  }
  return { importsStart, importsEnd, typesStart, typesEnd };
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
        `请手工植入哨兵标记（${IMPORTS_START} 至 ${TYPES_END}，手工内容置于两标记区之间）后重试`,
      ].join("\n")
    );
  }
}

/**
 * 扫描 componentsDirs 公开目录（跳过 internal）并机械投影各 index.ts 的具名值导出，
 * 在哨兵分区内重建聚合入口；分区之间的手工内容原位保留。
 * 无哨兵时执行 diff 防御：含多余行则中止报错，纯生成形态则全量重建并提示。
 */
export function regenerateAggregateEntry(config: EaConfig): void {
  const entryPath = config.project.aggregateEntry.path;

  const publicRoots = config.project.componentsDirs
    .map(d =>
      typeof d === "string"
        ? { path: d, internal: false }
        : { path: d.path, internal: !!d.internal }
    )
    .filter(d => !d.internal);

  const dirs: { name: string; root: string }[] = [];
  for (const root of publicRoots) {
    if (!fs.existsSync(root.path)) continue;
    const subDirs = fs
      .readdirSync(root.path)
      .filter(f => fs.statSync(path.join(root.path, f)).isDirectory())
      .filter(f => fs.existsSync(path.join(root.path, f, "index.ts")))
      .sort();
    for (const name of subDirs) dirs.push({ name, root: root.path });
  }

  const importLines = dirs.map(({ name }) => `import './${name}/index';`);

  const typeLines: string[] = [];
  for (const { name, root } of dirs) {
    const filePath = path.join(root, name, "index.ts");
    const src = fs.readFileSync(filePath, "utf-8");
    const names = parseIndexExports(src, filePath);
    if (names.length > 0) {
      typeLines.push(`export { ${names.join(", ")} } from "./${name}";`);
    }
  }

  const generated = [
    IMPORTS_START,
    ...importLines,
    IMPORTS_END,
    TYPES_START,
    ...typeLines,
    TYPES_END,
  ];

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
      ...lines.slice(0, markers.importsStart),
      IMPORTS_START,
      ...importLines,
      IMPORTS_END,
      ...lines.slice(markers.importsEnd + 1, markers.typesStart),
      TYPES_START,
      ...typeLines,
      TYPES_END,
      ...lines.slice(markers.typesEnd + 1),
    ];
  } else {
    guardNoSentinel(lines, entryPath, generated);
    result = generated;
    console.log(`✓ 聚合入口无哨兵标记且无手工内容，已全量重建 ${entryPath}`);
  }
  while (result.length > 0 && result[result.length - 1] === "") result.pop();
  fs.writeFileSync(entryPath, result.join("\n") + "\n");
}
