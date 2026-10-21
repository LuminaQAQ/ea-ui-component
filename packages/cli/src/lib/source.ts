import * as ts from "typescript";

/** 解析源码为 TS AST（宽松模式，不因类型错误中断） */
export function parseSource(
  src: string,
  fileName = "source.ts"
): ts.SourceFile {
  return ts.createSourceFile(fileName, src, ts.ScriptTarget.Latest, true);
}

/** 顶层节点是否带 export 修饰符（含 export default class） */
function isExported(node: ts.Node): boolean {
  const mods = ts.canHaveModifiers(node) ? ts.getModifiers(node) : undefined;
  return mods?.some(m => m.kind === ts.SyntaxKind.ExportKeyword) ?? false;
}

/** 顶层类声明的名字；onlyExported=true 时只收导出类 */
export function findClassNames(src: string, onlyExported = false): string[] {
  const sf = parseSource(src);
  const names: string[] = [];
  for (const st of sf.statements) {
    if (!ts.isClassDeclaration(st) || !st.name) continue;
    if (onlyExported && !isExported(st)) continue;
    names.push(st.name.text);
  }
  return names;
}

/** 装饰器名（支持 @X、@X(...)、@ns.X(...) 形式） */
function decoratorName(dec: ts.Decorator): string | null {
  let expr: ts.Expression = dec.expression;
  if (ts.isCallExpression(expr)) expr = expr.expression;
  if (ts.isIdentifier(expr)) return expr.text;
  if (ts.isPropertyAccessExpression(expr)) return expr.name.text;
  return null;
}

/** 是否存在名为 CustomElement 的类装饰器（AST 判定，避开注释/字符串误判） */
export function hasCustomElementDecorator(src: string): boolean {
  const sf = parseSource(src);
  let found = false;
  const visit = (node: ts.Node): void => {
    if (found) return;
    if (ts.isClassDeclaration(node) && ts.canHaveDecorators(node)) {
      const decorators = ts.getDecorators(node) ?? [];
      if (decorators.some(d => decoratorName(d) === "CustomElement")) {
        found = true;
        return;
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  return found;
}

/** 顶层 import / `export ... from` 的模块说明符文本 */
export function findModuleSpecifiers(src: string): string[] {
  const sf = parseSource(src);
  const out: string[] = [];
  for (const st of sf.statements) {
    const spec =
      ts.isImportDeclaration(st) || ts.isExportDeclaration(st)
        ? st.moduleSpecifier
        : undefined;
    if (spec && ts.isStringLiteralLike(spec)) out.push(spec.text);
  }
  return out;
}

/** 薄根出口：引用 ./components/… 且无（导出）类实现 */
export function isThinBarrel(src: string): boolean {
  return (
    findModuleSpecifiers(src).some(s => s.startsWith("./components/")) &&
    findClassNames(src, true).length === 0
  );
}

/** 薄根中从 ./components/… 具名导入的主类名（无则空串） */
export function findBarrelMainClass(src: string): string {
  const sf = parseSource(src);
  for (const st of sf.statements) {
    if (!ts.isImportDeclaration(st)) continue;
    const spec = st.moduleSpecifier;
    if (!ts.isStringLiteralLike(spec) || !spec.text.startsWith("./components/"))
      continue;
    const bindings = st.importClause?.namedBindings;
    if (
      bindings &&
      ts.isNamedImports(bindings) &&
      bindings.elements.length > 0
    ) {
      return bindings.elements[0].name.text;
    }
  }
  return "";
}

/** 0 基行号：最后一个引用 ./components/… 的 import 行；无则最后一条 import；无 import 返回 -1 */
export function findComponentsImportLine(src: string): number {
  const sf = parseSource(src);
  let lastComponents = -1;
  let lastImport = -1;
  for (const st of sf.statements) {
    if (!ts.isImportDeclaration(st)) continue;
    const line = sf.getLineAndCharacterOfPosition(st.getStart(sf)).line;
    lastImport = line;
    const spec = st.moduleSpecifier;
    if (ts.isStringLiteralLike(spec) && spec.text.startsWith("./components/"))
      lastComponents = line;
  }
  return lastComponents >= 0 ? lastComponents : lastImport;
}

/** 0 基行号：顶层本地具名导出 `export { ... }`（无 moduleSpecifier）；无则 -1 */
export function findLocalNamedExportLine(src: string): number {
  const sf = parseSource(src);
  for (const st of sf.statements) {
    if (
      ts.isExportDeclaration(st) &&
      !st.moduleSpecifier &&
      st.exportClause &&
      ts.isNamedExports(st.exportClause)
    ) {
      return sf.getLineAndCharacterOfPosition(st.getStart(sf)).line;
    }
  }
  return -1;
}

/** 0 基行号：`export default { ... }` 对象导出；无则 -1 */
export function findDefaultObjectExportLine(src: string): number {
  const sf = parseSource(src);
  for (const st of sf.statements) {
    if (
      ts.isExportAssignment(st) &&
      !st.isExportEquals &&
      ts.isObjectLiteralExpression(st.expression)
    ) {
      return sf.getLineAndCharacterOfPosition(st.getStart(sf)).line;
    }
  }
  return -1;
}

/** 无法自动改写的动态相对导入（import(...) / require(...)），返回调用表达式原文 */
export function findDynamicRelativeImports(src: string): string[] {
  const sf = parseSource(src);
  const hits: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node)) {
      const isDynamicImport =
        node.expression.kind === ts.SyntaxKind.ImportKeyword;
      const isRequire =
        ts.isIdentifier(node.expression) && node.expression.text === "require";
      const arg = node.arguments[0];
      if (
        (isDynamicImport || isRequire) &&
        arg &&
        ts.isStringLiteralLike(arg) &&
        (arg.text.startsWith("./") || arg.text.startsWith("../"))
      ) {
        hits.push(node.getText(sf));
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  return hits;
}

/** 相对说明符深度下移：./x → ../../x、../x → ../../../x；同目录 scss 不改写 */
function shiftRelativeSpec(spec: string): string {
  if (spec === "./index.scss?inline") return spec;
  if (spec.startsWith("./")) return `../../${spec.slice(2)}`;
  if (spec.startsWith("../")) return `../../${spec}`;
  return spec;
}

/**
 * 静态 import / export ... from 的相对说明符深度 +2（按 AST 定位 string 字面量位置，
 * 仅替换真正的模块说明符，避开注释、JSDoc 示例串与模板字符串）。
 */
export function rewriteRelativeSpecifierDepths(src: string): {
  text: string;
  changed: string[];
} {
  const sf = parseSource(src);
  const edits: { start: number; end: number; prev: string; next: string }[] =
    [];

  for (const st of sf.statements) {
    const spec =
      ts.isImportDeclaration(st) || ts.isExportDeclaration(st)
        ? st.moduleSpecifier
        : undefined;
    if (!spec || !ts.isStringLiteralLike(spec)) continue;
    const next = shiftRelativeSpec(spec.text);
    if (next === spec.text) continue;
    edits.push({
      start: spec.getStart(sf),
      end: spec.getEnd(),
      prev: spec.text,
      next,
    });
  }

  if (edits.length === 0) return { text: src, changed: [] };
  let out = src;
  const changed: string[] = [];
  for (const e of edits.sort((a, b) => b.start - a.start)) {
    const quote = src[e.start];
    out =
      out.slice(0, e.start) + `${quote}${e.next}${quote}` + out.slice(e.end);
    changed.push(`${e.prev} → ${e.next}`);
  }
  return { text: out, changed };
}
