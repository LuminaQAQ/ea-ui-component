import ts from "typescript";
import fs from "node:fs";
import path from "node:path";
import type { ComponentMeta, EventInfo } from "../types.js";
import { parseJSDoc } from "./jsdoc-parser.js";
import { parseDecorators, type GlobalConstantsMap } from "./decorator-parser.js";
import { parseEvents } from "./event-parser.js";
import { parseScss, mergeCSSVarsWithJSDoc } from "./scss-parser.js";
import { parseDependencies } from "./dependency-parser.js";

/** 全局常量缓存（从 src/constants/ 解析） */
let _globalConstantsCache: GlobalConstantsMap | null = null;

/**
 * 解析 src/constants/ 目录下的全局常量
 * 目前主要解析 VARIANT_TYPES
 */
function loadGlobalConstants(projectRoot: string): GlobalConstantsMap {
  if (_globalConstantsCache) return _globalConstantsCache;

  const constants: GlobalConstantsMap = {};

  // 解析 src/constants/variant.ts
  const variantPath = path.join(projectRoot, "src/constants/variant.ts");
  if (fs.existsSync(variantPath)) {
    const content = fs.readFileSync(variantPath, "utf-8");
    const sourceFile = ts.createSourceFile(
      variantPath,
      content,
      ts.ScriptTarget.Latest,
      true
    );

    ts.forEachChild(sourceFile, (node) => {
      if (
        ts.isVariableStatement(node) &&
        node.declarationList.flags & ts.NodeFlags.Const
      ) {
        for (const decl of node.declarationList.declarations) {
          if (!ts.isIdentifier(decl.name) || !decl.initializer) continue;

          // 处理 as const：initializer 可能是 AsExpression，需要取其 expression
          let init: ts.Expression = decl.initializer;
          while (ts.isAsExpression(init)) {
            init = init.expression;
          }

          if (ts.isArrayLiteralExpression(init)) {
            const values: string[] = [];
            for (const elem of init.elements) {
              if (ts.isStringLiteral(elem)) {
                values.push(elem.text);
              }
            }
            if (values.length > 0) {
              constants[decl.name.text] = values;
            }
          }
        }
      }
    });
  }

  _globalConstantsCache = constants;
  return constants;
}

/**
 * 解析单个组件目录，输出完整 ComponentMeta
 * 支持两种目录结构：
 * 1. 简单组件：src/components/ea-alert/index.ts
 * 2. 复合组件：src/components/ea-table/components/ea-table/index.ts
 */
export function parseComponent(
  componentDir: string,
  projectRoot: string
): ComponentMeta {
  const dirName = path.basename(componentDir);
  const relativePath = path.relative(projectRoot, componentDir).replace(
    /\\/g,
    "/"
  );

  // 查找主组件源文件
  const mainSourcePath = findMainSourceFile(componentDir);

  if (!mainSourcePath) {
    return createEmptyMeta(dirName, relativePath, "未找到主组件源文件");
  }

  try {
    const sourceContent = fs.readFileSync(mainSourcePath, "utf-8");
    const sourceFile = ts.createSourceFile(
      mainSourcePath,
      sourceContent,
      ts.ScriptTarget.Latest,
      true
    );

    // 1. 解析 JSDoc
    const jsDocResult = parseJSDoc(sourceFile);

    // 2. 解析装饰器（注入全局常量，如 VARIANT_TYPES）
    const globalConstants = loadGlobalConstants(projectRoot);
    const decoratorResult = parseDecorators(sourceFile, globalConstants);

    // 3. 解析事件
    const eventResults = parseEvents(componentDir, sourceFile);

    // 4. 合并 JSDoc 事件和事件类/emit 事件
    const mergedEvents = mergeEvents(jsDocResult.events, eventResults);

    // 5. 解析 SCSS
    const scssVars = parseScss(componentDir);
    const cssVars = mergeCSSVarsWithJSDoc(scssVars, jsDocResult.cssVars);

    // 6. 解析依赖
    const depResult = parseDependencies(
      componentDir,
      sourceFile,
      jsDocResult.dependencies
    );

    // 确定标签名
    const tagName = decoratorResult.tagName || dirName;

    // 确定显示名称
    const displayName = extractDisplayName(jsDocResult.summary, tagName);

    return {
      name: tagName,
      displayName,
      category: depResult.category,
      status: jsDocResult.status,
      since: jsDocResult.since,
      description: jsDocResult.summary,
      sourcePath: relativePath,
      props: [...decoratorResult.attributes, ...decoratorResult.properties],
      events: mergedEvents,
      slots: jsDocResult.slots,
      cssVars,
      cssParts: jsDocResult.cssParts,
      subComponents: depResult.subComponents,
      dependencies: depResult.dependencies,
    };
  } catch (error: any) {
    return createEmptyMeta(dirName, relativePath, `解析失败: ${error.message}`);
  }
}

/**
 * 查找组件目录下的主源文件
 * 优先查找 components/ 子目录下的 index.ts
 * 其次查找根目录的 index.ts
 */
function findMainSourceFile(componentDir: string): string | null {
  // 复合组件：components/ea-xxx/index.ts
  const componentsDir = path.join(componentDir, "components");
  if (fs.existsSync(componentsDir)) {
    const entries = fs.readdirSync(componentsDir, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isDirectory() || !entry.name.startsWith("ea-")) continue;

      const subIndexPath = path.join(componentsDir, entry.name, "index.ts");
      if (fs.existsSync(subIndexPath)) {
        return subIndexPath;
      }
    }
  }

  // 简单组件：index.ts
  const indexPath = path.join(componentDir, "index.ts");
  if (fs.existsSync(indexPath)) {
    return indexPath;
  }

  return null;
}

/**
 * 合并 JSDoc 事件描述与事件类/emit 提取的事件
 * JSDoc 提供描述，事件类/emit 提供参数类型
 */
function mergeEvents(
  jsDocEvents: EventInfo[],
  parsedEvents: EventInfo[]
): EventInfo[] {
  const jsDocMap = new Map<string, EventInfo>();
  for (const evt of jsDocEvents) {
    jsDocMap.set(evt.name, evt);
  }

  const merged: EventInfo[] = [];
  const seenNames = new Set<string>();

  // 以解析出的事件为基准
  for (const evt of parsedEvents) {
    const jsDocEvt = jsDocMap.get(evt.name);
    seenNames.add(evt.name);

    merged.push({
      name: evt.name,
      params: evt.params || jsDocEvt?.params || "",
      description: jsDocEvt?.description || evt.description || "",
      isCustomEventClass: evt.isCustomEventClass,
      className: evt.className,
    });
  }

  // 添加 JSDoc 中有但解析中没有的事件
  for (const evt of jsDocEvents) {
    if (!seenNames.has(evt.name)) {
      merged.push(evt);
    }
  }

  return merged;
}

/**
 * 从 @summary 提取显示名称
 * 取逗号前的部分，如 "警告提示组件，用于展示..." → "警告提示"
 */
function extractDisplayName(summary: string, tagName: string): string {
  if (!summary) return tagName;

  // 取第一个逗号或句号前的内容
  const match = summary.match(/^([^，。,\.]+)/);
  if (match) {
    let name = match[1];
    // 去掉"组件"后缀
    name = name.replace(/组件$/, "");
    return name;
  }

  return tagName;
}

/**
 * 创建空的 ComponentMeta（解析失败时使用）
 */
function createEmptyMeta(
  dirName: string,
  relativePath: string,
  error: string
): ComponentMeta {
  return {
    name: dirName,
    displayName: dirName,
    category: "basic",
    status: "stable",
    since: "",
    description: "",
    sourcePath: relativePath,
    props: [],
    events: [],
    slots: [],
    cssVars: [],
    cssParts: [],
    subComponents: [],
    dependencies: [],
    parseError: error,
  };
}
