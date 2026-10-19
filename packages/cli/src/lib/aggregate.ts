import fs from "node:fs";
import path from "node:path";
import * as ts from "typescript";
import type { ResolvedEaConfig } from "./config";
import { success } from "./output";

const GENERATED_START = "// @ea-generated:start";
const GENERATED_END = "// @ea-generated:end";

/** 判断声明节点是否带 export 修饰符 */
function hasExportModifier(st: ts.Node): boolean {
  const modifiers = ts.canHaveModifiers(st) ? ts.getModifiers(st) : undefined;
  return modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword) ?? false;
}

/**
 * 提取源码的具名值导出名单（AST 解析）：
 * 收录 class / const / function / enum 的具名值导出与 from 再导出；
 * 跳过 export type / interface / type alias / default；
 * export * 与别名再导出（as）中止报错并打印行号，禁止静默跳过
 */
function parseValueExports(src: string, filePath: string): string[] {
  const sf = ts.createSourceFile(filePath, src, ts.ScriptTarget.Latest, true);
  const lineOf = (node: ts.Node) =>
    sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1;
  const names: string[] = [];

  for (const st of sf.statements) {
    if (ts.isExportDeclaration(st)) {
      if (st.isTypeOnly) continue;
      if (!st.exportClause || !ts.isNamedExports(st.exportClause)) {
        throw new Error(
          `export * 无法展开为具名名单（${filePath}:L${lineOf(st)}）。请改为具名再导出`
        );
      }
      for (const el of st.exportClause.elements) {
        if (el.isTypeOnly) continue;
        if (el.propertyName) {
          throw new Error(
            `export 别名再导出（as）无法自动收录（${filePath}:L${lineOf(el)}）：${el.getText(sf).trim()}。请以原名导出`
          );
        }
        names.push(el.name.text);
      }
      continue;
    }
    if (ts.isExportAssignment(st)) continue;
    if (!hasExportModifier(st)) continue;
    if (
      ts.isClassDeclaration(st) ||
      ts.isFunctionDeclaration(st) ||
      ts.isEnumDeclaration(st)
    ) {
      if (st.name) names.push(st.name.text);
      continue;
    }
    if (ts.isVariableStatement(st)) {
      for (const d of st.declarationList.declarations) {
        if (ts.isIdentifier(d.name)) {
          names.push(d.name.text);
        } else {
          throw new Error(
            `解构导出形态无法自动收录（${filePath}:L${lineOf(d)}）`
          );
        }
      }
      continue;
    }
    if (ts.isInterfaceDeclaration(st) || ts.isTypeAliasDeclaration(st))
      continue;
    throw new Error(
      `未识别的 export 形态（${filePath}:L${lineOf(st)}）：${st.getText(sf).slice(0, 80)}。请调整导出形态或扩展 CLI 解析白名单`
    );
  }
  return names;
}

/**
 * 手工区（标记区之外）导出与生成名单求交集，非空则中止——
 * 防止 regenerate 后同一名字双处导出（TS2300 重复导出构建红）
 */
function assertNoManualConflict(
  manualLines: string[],
  generatedNames: string[],
  entryPath: string
): void {
  let manual: string[];
  try {
    manual = parseValueExports(manualLines.join("\n"), entryPath);
  } catch (e) {
    throw new Error(
      `聚合入口手工区导出解析失败，无法校验与生成名单的冲突：\n${(e as Error).message}`
    );
  }
  const generated = new Set(generatedNames);
  const dup = [...new Set(manual)].filter(n => generated.has(n));
  if (dup.length > 0) {
    throw new Error(
      `聚合入口手工区存在与生成名单重复的导出：${dup.join("、")}。请删除手工区的重复导出（生成名单已从组件 index.ts 收录同名导出）`
    );
  }
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
 * 扫描公开组件目录（跳过 internal）并汇总各 index.ts 的具名值导出，构建聚合
 * 再导出清单与名单（相对 entry 目录、按目录名排序）。解析遇到未识别 export 形态时抛错。
 */
function buildAggregateProjection(config: ResolvedEaConfig): {
  exportLines: string[];
  exportNames: string[];
} {
  const entryDir = path.dirname(config.project.entry);
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
  const exportNames: string[] = [];
  for (const { name, root } of dirs) {
    const filePath = path.join(root, name, "index.ts");
    const src = fs.readFileSync(filePath, "utf-8");
    const names = parseValueExports(src, filePath);
    if (names.length > 0) {
      const rel = path
        .relative(entryDir, path.join(root, name))
        .split(path.sep)
        .join("/");
      const spec = rel.startsWith(".") ? rel : `./${rel}`;
      exportLines.push(`export { ${names.join(", ")} } from "${spec}";`);
      exportNames.push(...names);
    }
  }
  return { exportLines, exportNames };
}

/** 去掉尾部空行 */
function trimTail(lines: string[]): string[] {
  const out = [...lines];
  while (out.length > 0 && out[out.length - 1] === "") out.pop();
  return out;
}

/** 逐元素数组相等 */
function arraysEqual(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  return a.every((v, i) => v === b[i]);
}

/** 聚合入口与目录投影的只读比对结果 */
export interface AggregateDiff {
  /** ok=一致；drift=不一致；error=无法判定；skip=入口尚不存在（交由 add/sync 生成） */
  status: "ok" | "drift" | "error" | "skip";
  message: string;
  expected: string[];
  current: string[];
  /** 投影有、入口无的行 */
  missing: string[];
  /** 入口有、投影无的行 */
  extra: string[];
}

function diff(
  status: AggregateDiff["status"],
  message: string,
  expected: string[] = [],
  current: string[] = []
): AggregateDiff {
  return { status, message, expected, current, missing: [], extra: [] };
}

/**
 * 只读校验聚合入口哨兵区是否与目录投影逐行一致（不写盘）。
 * 入口不存在→skip；有入口无哨兵且投影非空→drift；标记异常/解析失败→error；
 * 哨兵区与投影顺序与内容一致→ok，否则 drift 并给出增删行明细。
 */
export function diffAggregateEntry(config: ResolvedEaConfig): AggregateDiff {
  const entryPath = config.project.entry;
  let projection: { exportLines: string[] };
  try {
    projection = buildAggregateProjection(config);
  } catch (e) {
    return diff("error", `无法计算目录投影：${(e as Error).message}`);
  }
  const expected = trimTail(projection.exportLines);

  if (!fs.existsSync(entryPath)) {
    return diff(
      "skip",
      `聚合入口尚不存在，跳过一致性校验（运行 ea sync 生成）`,
      expected
    );
  }

  const lines = fs.readFileSync(entryPath, "utf-8").split(/\r?\n/);
  let markers: { start: number; end: number } | null;
  try {
    markers = locateMarkers(lines);
  } catch (e) {
    return diff("error", (e as Error).message, expected);
  }

  if (!markers) {
    if (expected.length === 0)
      return diff(
        "ok",
        "聚合入口无生成清单且目录无对外导出，视为一致",
        expected
      );
    return diff(
      "drift",
      `聚合入口 ${entryPath} 缺哨兵标记，无法确认与目录投影一致（运行 ea sync 植入标记并重建）`,
      expected
    );
  }

  const current = trimTail(lines.slice(markers.start + 1, markers.end));
  if (arraysEqual(current, expected))
    return diff("ok", "聚合入口与目录投影一致", expected, current);

  const curSet = new Set(current);
  const expSet = new Set(expected);
  const missing = expected.filter(l => !curSet.has(l));
  const extra = current.filter(l => !expSet.has(l));
  const parts: string[] = [];
  if (missing.length) parts.push(`缺 ${missing.length} 行（目录有、入口无）`);
  if (extra.length) parts.push(`多 ${extra.length} 行（入口有、目录无）`);
  if (!missing.length && !extra.length) parts.push("行顺序不一致");
  return {
    status: "drift",
    message: `聚合入口与目录投影不一致：${parts.join("，")}（运行 ea sync 重建）`,
    expected,
    current,
    missing,
    extra,
  };
}

/**
 * 扫描公开目录汇总具名值导出（buildAggregateProjection），在哨兵分区内重建聚合出口的再导出清单；
 * 分区之外的行（手工内容）原位保留，且手工区导出不得与生成名单重复。
 * 无哨兵时执行 diff 防御：含多余行则中止报错，纯生成形态则全量重建并提示。
 */
export function regenerateAggregateEntry(config: ResolvedEaConfig): void {
  const entryPath = config.project.entry;
  const { exportLines, exportNames } = buildAggregateProjection(config);

  const generated = [GENERATED_START, ...exportLines, GENERATED_END];

  if (!fs.existsSync(entryPath)) {
    fs.writeFileSync(entryPath, generated.join("\n") + "\n");
    success(`✓ 已生成聚合入口 ${entryPath}`);
    return;
  }

  const lines = fs.readFileSync(entryPath, "utf-8").split(/\r?\n/);
  const markers = locateMarkers(lines);

  let result: string[];
  if (markers) {
    assertNoManualConflict(
      [...lines.slice(0, markers.start), ...lines.slice(markers.end + 1)],
      exportNames,
      entryPath
    );
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
    success(`✓ 聚合入口无哨兵标记且无手工内容，已全量重建 ${entryPath}`);
  }
  while (result.length > 0 && result[result.length - 1] === "") result.pop();
  fs.writeFileSync(entryPath, result.join("\n") + "\n");
}
