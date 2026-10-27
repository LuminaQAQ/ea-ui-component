import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import type {
  AttributeMeta,
  ComponentMeta,
  CssMeta,
  EventMeta,
  MethodMeta,
  PropertyMeta,
  ScanResult,
  SlotMeta,
  ValueKind,
} from "./types";

/** 基础类型标识符 → 值类型分类 */
const PRIMITIVE_KINDS: Record<string, ValueKind> = {
  Boolean: "boolean",
  String: "string",
  Number: "number",
};

/** 不作为组件 API 展示的方法 */
const HIDDEN_METHODS = new Set([
  // 自定义元素生命周期
  "connectedCallback",
  "disconnectedCallback",
  "adoptedCallback",
  "attributeChangedCallback",
  // 表单关联生命周期
  "formAssociatedCallback",
  "formDisabledCallback",
  "formResetCallback",
  "formStateRestoreCallback",
  // 渲染与更新
  "html",
  "render",
  "updateContainerClasslist",
  // 基类通用能力
  "emit",
]);

/** 单个文件的扫描上下文 */
interface FileContext {
  sf: ts.SourceFile;
  /** 本文件顶层 const 声明（标识符 → 初始化表达式） */
  consts: Map<string, ts.Expression>;
}

/** 全局扫描上下文 */
interface ScanContext {
  /** 类名 → 声明位置，支持跨文件查找 */
  classIndex: Map<string, { ctx: FileContext; node: ts.ClassDeclaration }>;
  /** src/constants 下的全局常量 */
  globalConsts: Map<string, ts.Expression>;
  warnings: string[];
}

/** 递归收集源文件（排除声明文件与测试） */
function collectSourceFiles(dir: string): string[] {
  const out: string[] = [];
  const walk = (current: string): void => {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === "test" || entry.name === "node_modules") continue;
        walk(full);
      } else if (
        entry.name.endsWith(".ts") &&
        !entry.name.endsWith(".d.ts") &&
        !entry.name.includes(".test.")
      ) {
        out.push(full);
      }
    }
  };
  walk(dir);
  return out;
}

/** 解析文件并缓存顶层 const */
function createFileContext(file: string): FileContext {
  const sf = ts.createSourceFile(
    file,
    fs.readFileSync(file, "utf-8"),
    ts.ScriptTarget.Latest,
    true
  );
  const consts = new Map<string, ts.Expression>();
  for (const stmt of sf.statements) {
    if (!ts.isVariableStatement(stmt)) continue;
    if (!(stmt.declarationList.flags & ts.NodeFlags.Const)) continue;
    for (const decl of stmt.declarationList.declarations) {
      if (ts.isIdentifier(decl.name) && decl.initializer) {
        consts.set(decl.name.text, decl.initializer);
      }
    }
  }
  return { sf, consts };
}

/** 剥掉 as const / 类型断言，拿到真实表达式 */
function unwrapExpression(expr: ts.Expression): ts.Expression {
  let current = expr;
  while (
    ts.isAsExpression(current) ||
    ts.isParenthesizedExpression(current) ||
    ts.isTypeAssertionExpression(current)
  ) {
    current = current.expression;
  }
  return current;
}

/** 解析表达式为字符串数组（支持数组字面量、展开、常量引用） */
function resolveStringArray(
  expr: ts.Expression,
  ctx: FileContext,
  scan: ScanContext,
  depth = 0
): string[] | null {
  if (depth > 8) return null;
  const node = unwrapExpression(expr);

  if (ts.isArrayLiteralExpression(node)) {
    const values: string[] = [];
    for (const element of node.elements) {
      if (ts.isStringLiteral(element)) {
        values.push(element.text);
      } else if (ts.isSpreadElement(element)) {
        const spread = resolveStringArray(element.expression, ctx, scan, depth + 1);
        if (spread) values.push(...spread);
      } else if (ts.isAsExpression(element)) {
        const inner = unwrapExpression(element);
        if (ts.isStringLiteral(inner)) values.push(inner.text);
      }
    }
    return values;
  }

  if (ts.isIdentifier(node)) {
    const local = ctx.consts.get(node.text);
    if (local) return resolveStringArray(local, ctx, scan, depth + 1);
    const global = scan.globalConsts.get(node.text);
    if (global) return resolveStringArray(global, ctx, scan, depth + 1);
  }

  return null;
}

/** 解析表达式为字符串值（支持常量引用） */
function resolveStringValue(
  expr: ts.Expression,
  ctx: FileContext,
  scan: ScanContext,
  depth = 0
): string | null {
  if (depth > 8) return null;
  const node = unwrapExpression(expr);

  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return node.text;
  }

  if (ts.isIdentifier(node)) {
    const local = ctx.consts.get(node.text);
    if (local) return resolveStringValue(local, ctx, scan, depth + 1);
    const global = scan.globalConsts.get(node.text);
    if (global) return resolveStringValue(global, ctx, scan, depth + 1);
  }

  return null;
}

/** 解析装饰器选项里的 type，得到值类型与枚举候选 */
function resolveTypeOption(
  expr: ts.Expression,
  ctx: FileContext,
  scan: ScanContext,
  depth = 0
): { kind: ValueKind; enumValues?: string[] } {
  if (depth > 8) return { kind: "unknown" };
  const node = unwrapExpression(expr);

  // Enum(...) 调用
  if (ts.isCallExpression(node)) {
    const callee = ts.isIdentifier(node.expression) ? node.expression.text : "";
    const arg = node.arguments[0];
    if (callee === "Enum" && arg) {
      const values = resolveStringArray(arg, ctx, scan, depth + 1);
      return values && values.length
        ? { kind: "enum", enumValues: values }
        : { kind: "enum" };
    }
    return { kind: "unknown" };
  }

  // 基础类型：Boolean / String / Number
  if (ts.isIdentifier(node)) {
    const primitive = PRIMITIVE_KINDS[node.text];
    if (primitive) return { kind: primitive };
    const values = resolveStringArray(node, ctx, scan, depth + 1);
    if (values && values.length) return { kind: "enum", enumValues: values };
    return { kind: "unknown" };
  }

  // 数组字面量（含 as const 场景）
  if (ts.isArrayLiteralExpression(node)) {
    const values = resolveStringArray(node, ctx, scan, depth + 1);
    if (values && values.length) return { kind: "enum", enumValues: values };
  }

  return { kind: "unknown" };
}

/** 解析默认值为展示文本：字符串补引号，常量先还原 */
function resolveDefaultText(
  expr: ts.Expression,
  ctx: FileContext,
  scan: ScanContext
): string {
  const node = unwrapExpression(expr);
  const str = resolveStringValue(node, ctx, scan);
  if (str !== null) return `"${str}"`;
  if (ts.isNumericLiteral(node)) return node.text;
  const text = node.getText(ctx.sf);
  // 引用全大写常量但无法还原时，保留原文避免误导
  return text;
}

/** 取节点 JSDoc 原文（不含注释标记） */
function getJsDocText(node: ts.Node, sf: ts.SourceFile): string {
  const jsDocs = ts.getJSDocCommentsAndTags(node) as ts.JSDoc[];
  const doc = jsDocs.find(item => ts.isJSDoc(item));
  if (!doc) return "";
  const raw = doc.getText(sf);
  return raw.replace(/^\/\*\*/, "").replace(/\*\/$/, "");
}

/** JSDoc 解析结果 */
interface ParsedJsDoc {
  /** 首段说明（或 @summary） */
  summary: string;
  /** 标签名 → 文本（同名标签聚合为数组） */
  tags: Map<string, string[]>;
}

/** 逐行解析 JSDoc，提取描述与自定义标签 */
function parseJsDoc(text: string): ParsedJsDoc {
  const tags = new Map<string, string[]>();
  const descLines: string[] = [];
  let currentTag: string | null = null;
  let currentText: string[] = [];

  const flush = (): void => {
    if (!currentTag) return;
    const value = currentText.join(" ").trim();
    const list = tags.get(currentTag) ?? [];
    list.push(value);
    tags.set(currentTag, list);
  };

  for (const rawLine of text.split("\n")) {
    const line = rawLine.replace(/^\s*\*?\s?/, "").trimEnd();
    const match = /^@(\w+)\s*(.*)$/.exec(line.trim());
    if (match) {
      flush();
      currentTag = match[1] ?? "";
      currentText = match[2] ? [match[2]] : [];
    } else if (currentTag) {
      if (line) currentText.push(line.trim());
    } else if (line) {
      descLines.push(line.trim());
    }
  }
  flush();

  const summary = (tags.get("summary")?.[0] ?? descLines.join(" ")).trim();
  return { summary, tags };
}

/** 解析 `名称 - 描述` 形式的标签文本 */
function splitNameAndDesc(text: string): { name: string; description: string } {
  const index = text.indexOf(" - ");
  if (index < 0) return { name: text.trim(), description: "" };
  return {
    name: text.slice(0, index).trim(),
    description: text.slice(index + 3).trim(),
  };
}

/** 从 JSDoc 标签构建插槽列表 */
function buildSlots(doc: ParsedJsDoc): SlotMeta[] {
  return (doc.tags.get("slot") ?? []).map(item => {
    const { name, description } = splitNameAndDesc(item);
    return { name: name === "default" ? "" : name, description };
  });
}

/** 事件类信息（从 events/ 目录解析） */
interface EventClassInfo {
  /** 事件类名 */
  className: string;
  /** 事件名（来自 constructor 里的 super 调用） */
  eventName: string;
  /** detail 属性类型文本 */
  detailType: string;
}

/** 递归查找所有 events 目录 */
function findEventDirs(root: string): string[] {
  const dirs: string[] = [];
  const walk = (current: string): void => {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const full = path.join(current, entry.name);
      if (entry.name === "events") {
        dirs.push(full);
      } else {
        walk(full);
      }
    }
  };
  walk(root);
  return dirs;
}

/** 从 constructor 里的 super("事件名", ...) 提取事件名 */
function findSuperEventName(node: ts.ClassDeclaration): string | null {
  for (const member of node.members) {
    if (!ts.isConstructorDeclaration(member) || !member.body) continue;
    for (const stmt of member.body.statements) {
      if (!ts.isExpressionStatement(stmt)) continue;
      const expr = stmt.expression;
      if (!ts.isCallExpression(expr)) continue;
      if (expr.expression.kind !== ts.SyntaxKind.SuperKeyword) continue;
      const arg = expr.arguments[0];
      if (arg && ts.isStringLiteral(arg)) return arg.text;
    }
  }
  return null;
}

/** 取类上 detail 属性的类型文本 */
function findDetailType(node: ts.ClassDeclaration, sf: ts.SourceFile): string {
  for (const member of node.members) {
    if (!ts.isPropertyDeclaration(member)) continue;
    if (member.name.getText(sf) !== "detail") continue;
    return member.type?.getText(sf) ?? "";
  }
  return "";
}

/** 扫描全部 events 目录，建立「目录 → 事件类」索引 */
function collectEventClasses(
  componentsDir: string
): Map<string, EventClassInfo[]> {
  const byDir = new Map<string, EventClassInfo[]>();

  for (const dir of findEventDirs(componentsDir)) {
    const list: EventClassInfo[] = [];

    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (!entry.isFile()) continue;
      if (!entry.name.endsWith(".ts") || entry.name.endsWith(".d.ts")) continue;

      const file = path.join(dir, entry.name);
      const sf = ts.createSourceFile(
        file,
        fs.readFileSync(file, "utf-8"),
        ts.ScriptTarget.Latest,
        true
      );

      for (const stmt of sf.statements) {
        if (!ts.isClassDeclaration(stmt) || !stmt.name) continue;

        // 只收 Event / CustomEvent 派生类
        const heritage = stmt.heritageClauses?.find(
          clause => clause.token === ts.SyntaxKind.ExtendsKeyword
        );
        const baseName = heritage?.types[0]?.expression.getText(sf) ?? "";
        if (!/(?:^|\.)(?:Custom)?Event$/.test(baseName)) continue;

        const eventName = findSuperEventName(stmt);
        if (!eventName) continue;

        const info: EventClassInfo = {
          className: stmt.name.text,
          eventName,
          detailType: findDetailType(stmt, sf),
        };
        list.push(info);
      }
    }

    byDir.set(dir, list);
  }

  return byDir;
}

/** 定位组件对应的事件类目录：同级 events 优先，其次顶层组件目录 */
function resolveEventDir(file: string, componentsDir: string): string | null {
  const sameLevel = path.join(path.dirname(file), "events");
  if (fs.existsSync(sameLevel)) return sameLevel;

  const relative = path.relative(componentsDir, file).replace(/\\/g, "/");
  const top = relative.split("/")[0];
  if (!top) return null;

  const topEvents = path.join(componentsDir, top, "events");
  return fs.existsSync(topEvents) ? topEvents : null;
}

/** 从 JSDoc 标签构建事件列表，并合并独立事件类信息 */
function buildEvents(
  doc: ParsedJsDoc,
  infos: EventClassInfo[]
): EventMeta[] {
  const byName = new Map(infos.map(info => [info.eventName, info]));
  return (doc.tags.get("event") ?? [])
    .map(item => splitNameAndDesc(item))
    .filter(item => item.name)
    .map(item => {
      const eventClass = byName.get(item.name);
      return {
        name: item.name,
        description: item.description,
        className: eventClass?.className,
        detailType: eventClass?.detailType,
      };
    });
}

/** 从 JSDoc 标签构建 CSS 变量 / Part 列表 */
function buildCssList(items: string[] | undefined): CssMeta[] {
  return (items ?? [])
    .map(item => splitNameAndDesc(item))
    .filter(item => item.name)
    .map(item => ({ name: item.name, description: item.description }));
}

/** 读取装饰器名称（支持 `@attr()` / `@ns.attr()`） */
function getDecoratorName(decorator: ts.Decorator): string {
  let expr: ts.Expression = decorator.expression;
  if (ts.isCallExpression(expr)) expr = expr.expression;
  if (ts.isIdentifier(expr)) return expr.text;
  if (ts.isPropertyAccessExpression(expr)) return expr.name.text;
  return "";
}

/** 取装饰器第一个参数对象 */
function getDecoratorOptions(
  decorator: ts.Decorator
): ts.ObjectLiteralExpression | null {
  if (!ts.isCallExpression(decorator.expression)) return null;
  const arg = decorator.expression.arguments[0];
  return arg && ts.isObjectLiteralExpression(arg) ? arg : null;
}

/** 在对象字面量里按属性名取初始化表达式 */
function getOptionValue(
  options: ts.ObjectLiteralExpression,
  key: string
): ts.Expression | null {
  for (const prop of options.properties) {
    if (!ts.isPropertyAssignment(prop)) continue;
    if (prop.name.getText() === key) return prop.initializer;
  }
  return null;
}

/** 解析 a11y 配置 */
function parseA11y(
  options: ts.ObjectLiteralExpression,
  ctx: FileContext,
  scan: ScanContext
): AttributeMeta["a11y"] {
  const a11yExpr = getOptionValue(options, "a11y");
  if (!a11yExpr || !ts.isObjectLiteralExpression(a11yExpr)) return undefined;

  const ariaExpr = getOptionValue(a11yExpr, "ariaAttr");
  if (!ariaExpr) return undefined;
  const ariaAttr = resolveStringValue(ariaExpr, ctx, scan);
  if (!ariaAttr) return undefined;

  const targetExpr = getOptionValue(a11yExpr, "target");
  const target = targetExpr ? resolveStringValue(targetExpr, ctx, scan) : null;
  return target ? { ariaAttr, target } : { ariaAttr };
}

/** 成员是否对外可见（跳过 private / protected / 下划线命名 / 构造器） */
function isPublicMember(member: ts.ClassElement, sf: ts.SourceFile): boolean {
  if (
    ts.isConstructorDeclaration(member) ||
    ts.isClassStaticBlockDeclaration(member)
  ) {
    return false;
  }
  const name = member.name?.getText(sf) ?? "";
  if (!name) return false;
  if (name.startsWith("_") || name.startsWith("#")) return false;
  const modifiers = ts.canHaveModifiers(member) ? ts.getModifiers(member) : undefined;
  return !modifiers?.some(
    item =>
      item.kind === ts.SyntaxKind.PrivateKeyword ||
      item.kind === ts.SyntaxKind.ProtectedKeyword
  );
}

/** 收集单个类上的 @attribute 属性 */
function collectAttributes(
  node: ts.ClassDeclaration,
  ctx: FileContext,
  scan: ScanContext
): AttributeMeta[] {
  const result: AttributeMeta[] = [];
  for (const member of node.members) {
    if (!ts.isPropertyDeclaration(member)) continue;
    if (!isPublicMember(member, ctx.sf)) continue;

    const decorators = ts.canHaveDecorators(member)
      ? ts.getDecorators(member) ?? []
      : [];
    const decorator = decorators.find(d => getDecoratorName(d) === "attribute");
    if (!decorator) continue;

    const name = member.name.getText(ctx.sf);

    const options = getDecoratorOptions(decorator);
    const typeInfo = options
      ? (() => {
          const typeExpr = getOptionValue(options, "type");
          return typeExpr
            ? resolveTypeOption(typeExpr, ctx, scan)
            : { kind: "unknown" as ValueKind };
        })()
      : { kind: "unknown" as ValueKind };

    const defaultExpr = options ? getOptionValue(options, "default") : null;
    const jsdoc = parseJsDoc(getJsDocText(member, ctx.sf));

    result.push({
      name,
      attributeName: name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
      kind: typeInfo.kind,
      enumValues: typeInfo.enumValues,
      defaultValue: defaultExpr
        ? resolveDefaultText(defaultExpr, ctx, scan)
        : undefined,
      description: jsdoc.summary,
      a11y: options ? parseA11y(options, ctx, scan) : undefined,
    });
  }
  return result;
}

/** 收集单个类上的 @property 属性 */
function collectProperties(
  node: ts.ClassDeclaration,
  ctx: FileContext,
  scan: ScanContext
): PropertyMeta[] {
  const result: PropertyMeta[] = [];
  for (const member of node.members) {
    if (!ts.isPropertyDeclaration(member)) continue;
    if (!isPublicMember(member, ctx.sf)) continue;

    const decorators = ts.canHaveDecorators(member)
      ? ts.getDecorators(member) ?? []
      : [];
    if (!decorators.some(d => getDecoratorName(d) === "property")) continue;

    const name = member.name.getText(ctx.sf);

    const options = getDecoratorOptions(
      decorators.find(d => getDecoratorName(d) === "property")!
    );
    const typeExpr = options ? getOptionValue(options, "type") : null;
    const typeInfo = typeExpr
      ? resolveTypeOption(typeExpr, ctx, scan)
      : { kind: "unknown" as ValueKind };
    const defaultExpr = options ? getOptionValue(options, "default") : null;
    const jsdoc = parseJsDoc(getJsDocText(member, ctx.sf));

    result.push({
      name,
      kind: typeInfo.kind,
      enumValues: typeInfo.enumValues,
      defaultValue: defaultExpr
        ? resolveDefaultText(defaultExpr, ctx, scan)
        : undefined,
      description: jsdoc.summary,
    });
  }
  return result;
}

/** 收集单个类的公开方法（排除框架内部方法） */
function collectMethods(
  node: ts.ClassDeclaration,
  ctx: FileContext
): MethodMeta[] {
  const result: MethodMeta[] = [];
  for (const member of node.members) {
    if (!ts.isMethodDeclaration(member)) continue;
    if (!isPublicMember(member, ctx.sf)) continue;

    const name = member.name.getText(ctx.sf);
    if (name.startsWith("$") || HIDDEN_METHODS.has(name)) continue;

    result.push({
      name,
      params: member.parameters.map(item => item.getText(ctx.sf).trim()).join(", "),
      parameters: member.parameters.map(param => ({
        name: param.name.getText(ctx.sf),
        type: param.type?.getText(ctx.sf) ?? "any",
        optional: !!param.questionToken || !!param.initializer,
        defaultValue: param.initializer?.getText(ctx.sf),
      })),
      returnType: member.type?.getText(ctx.sf) ?? "void",
      description: parseJsDoc(getJsDocText(member, ctx.sf)).summary,
    });
  }
  return result;
}

/** 从 import 语句提取内部组件依赖（@components/ea-xxx 或相对路径） */
function collectImportDependencies(sf: ts.SourceFile): string[] {
  const deps: string[] = [];
  for (const stmt of sf.statements) {
    if (!ts.isImportDeclaration(stmt)) continue;
    const spec = stmt.moduleSpecifier;
    if (!ts.isStringLiteral(spec)) continue;
    const match =
      spec.text.match(/@components\/(ea-[\w-]+)/) ??
      spec.text.match(/(?:\.\/|(?:\.\.\/)+)(ea-[\w-]+)\/index/);
    if (match?.[1]) deps.push(match[1]);
  }
  return deps;
}

/** 合并 JSDoc 声明的依赖与 import 分析结果 */
function mergeDependencies(jsDocDeps: string[], sf: ts.SourceFile): string[] {
  return [...new Set([...jsDocDeps, ...collectImportDependencies(sf)])].sort();
}

/** 沿 extends 链收集属性（基类优先，派生类同名覆盖） */
function collectWithInheritance(
  className: string,
  scan: ScanContext
): {
  attributes: AttributeMeta[];
  properties: PropertyMeta[];
  methods: MethodMeta[];
} {
  const chain: { ctx: FileContext; node: ts.ClassDeclaration }[] = [];
  let current: string | undefined = className;
  const visited = new Set<string>();

  while (current && !visited.has(current)) {
    visited.add(current);
    const entry = scan.classIndex.get(current);
    if (!entry) break;
    chain.unshift(entry);
    const heritage = entry.node.heritageClauses?.find(
      clause => clause.token === ts.SyntaxKind.ExtendsKeyword
    );
    const baseExpr = heritage?.types[0]?.expression;
    current = baseExpr ? baseExpr.getText(entry.ctx.sf) : undefined;
  }

  const attributes = new Map<string, AttributeMeta>();
  const properties = new Map<string, PropertyMeta>();
  const methods = new Map<string, MethodMeta>();
  for (const entry of chain) {
    for (const attr of collectAttributes(entry.node, entry.ctx, scan)) {
      attributes.set(attr.name, attr);
    }
    for (const prop of collectProperties(entry.node, entry.ctx, scan)) {
      properties.set(prop.name, prop);
    }
    for (const method of collectMethods(entry.node, entry.ctx)) {
      methods.set(method.name, method);
    }
  }
  return {
    attributes: [...attributes.values()],
    properties: [...properties.values()],
    methods: [...methods.values()],
  };
}

/** 从源文件路径推导打包产物路径，如 components/ea-button.js */
function toModulePath(file: string, componentsRoot: string): string {
  const rel = path.relative(componentsRoot, file).split(path.sep);
  const top = rel[0] ?? "index";
  return `components/${top}.js`;
}

/** 扫描全部组件源码，产出统一元数据模型 */
export function scanComponents(options: {
  componentsDir: string;
  coreDir: string;
  constantsDir: string;
}): ScanResult {
  const warnings: string[] = [];
  const componentFiles = collectSourceFiles(options.componentsDir);
  const constantFiles = collectSourceFiles(options.constantsDir);
  const baseFiles = collectSourceFiles(path.join(options.coreDir, "core"));

  const scan: ScanContext = {
    classIndex: new Map(),
    globalConsts: new Map(),
    warnings,
  };

  // 1. 常量表：src/constants 下的字符串与数组常量
  for (const file of constantFiles) {
    const ctx = createFileContext(file);
    for (const [name, expr] of ctx.consts) {
      scan.globalConsts.set(name, expr);
    }
  }

  // 2. 事件类索引：扫描各组件的 events/ 目录
  const eventClasses = collectEventClasses(options.componentsDir);

  // 3. 类索引：组件源码 + core 基类（支持跨文件与继承）
  const fileContexts = new Map<string, FileContext>();
  const indexFile = (file: string): void => {
    const ctx = createFileContext(file);
    fileContexts.set(file, ctx);
    for (const stmt of ctx.sf.statements) {
      if (ts.isClassDeclaration(stmt) && stmt.name) {
        scan.classIndex.set(stmt.name.text, { ctx, node: stmt });
      }
    }
  };
  [...componentFiles, ...baseFiles].forEach(indexFile);

  // 3. 从 declare global 的 HTMLElementTagNameMap 读取标签与类的对应关系
  const components: ComponentMeta[] = [];
  const seenTags = new Set<string>();

  for (const file of componentFiles) {
    const ctx = fileContexts.get(file);
    if (!ctx) continue;

    const visit = (node: ts.Node): void => {
      if (
        ts.isInterfaceDeclaration(node) &&
        node.name.text === "HTMLElementTagNameMap"
      ) {
        for (const member of node.members) {
          if (!ts.isPropertySignature(member)) continue;
          if (!member.name || !ts.isStringLiteral(member.name)) continue;

          const tagName = member.name.text;
          const typeText = member.type?.getText(ctx.sf) ?? "";
          const className = typeText.replace(/\s*<.*$/, "").trim();
          if (!tagName || !className || seenTags.has(tagName)) continue;

          const target = scan.classIndex.get(className);
          if (!target) {
            warnings.push(`${tagName}: 找不到类 ${className} 的定义，已跳过`);
            continue;
          }

          seenTags.add(tagName);
          const doc = parseJsDoc(getJsDocText(target.node, target.ctx.sf));
          const inherited = collectWithInheritance(className, scan);

          // 事件类匹配：同级优先，其次顶层组件目录
          const eventDir = resolveEventDir(file, options.componentsDir);
          const componentEventClasses = eventDir
            ? eventClasses.get(eventDir) ?? []
            : [];
          const events = buildEvents(doc, componentEventClasses);

          // 一致性检查：同级 events 中派发但未在 JSDoc 记录的事件
          const declaredEvents = new Set(events.map(item => item.name));
          const ownEventDir = path.join(path.dirname(file), "events");
          for (const info of eventClasses.get(ownEventDir) ?? []) {
            if (!declaredEvents.has(info.eventName)) {
              warnings.push(
                `${tagName}: 事件类 ${info.className} 派发 "${info.eventName}"，但 JSDoc 未记录`
              );
            }
          }

          components.push({
            tagName,
            className,
            summary: doc.summary,
            status: doc.tags.get("status")?.[0] ?? "",
            since: doc.tags.get("since")?.[0] ?? "",
            modulePath: toModulePath(file, options.componentsDir),
            sourceFile: path
              .relative(options.componentsDir, file)
              .replace(/\\/g, "/"),
            dependencies: mergeDependencies(
              (doc.tags.get("dependency") ?? [])
                .map(item => splitNameAndDesc(item).name)
                .filter(Boolean),
              ctx.sf
            ),
            attributes: inherited.attributes,
            properties: inherited.properties,
            methods: inherited.methods,
            events,
            slots: buildSlots(doc),
            cssProperties: buildCssList(doc.tags.get("cssproperty")),
            cssParts: buildCssList(doc.tags.get("csspart")),
          });
        }
      }
      ts.forEachChild(node, visit);
    };
    visit(ctx.sf);
  }

  components.sort((a, b) => a.tagName.localeCompare(b.tagName));
  return { components, warnings };
}
