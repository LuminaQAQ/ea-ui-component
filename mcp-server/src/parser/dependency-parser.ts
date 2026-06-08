import ts from "typescript";
import fs from "node:fs";
import path from "node:path";
import type { SubComponentInfo, ComponentCategory } from "../types.js";

/** 依赖解析结果 */
export interface DependencyParseResult {
  /** 子组件列表 */
  subComponents: SubComponentInfo[];
  /** 依赖的组件标签名列表 */
  dependencies: string[];
  /** 组件分类 */
  category: ComponentCategory;
}

/** VitePress 侧边栏分类映射 */
const CATEGORY_MAP: Record<string, ComponentCategory> = {
  "ea-button": "basic",
  "ea-link": "basic",
  "ea-icon": "basic",
  "ea-text": "basic",
  "ea-scrollbar": "basic",
  "ea-space": "basic",
  "ea-divider": "basic",

  "ea-input": "form",
  "ea-input-number": "form",
  "ea-select": "form",
  "ea-checkbox": "form",
  "ea-radio": "form",
  "ea-switch": "form",
  "ea-slider": "form",
  "ea-rate": "form",
  "ea-color-picker": "form",
  "ea-date-picker": "form",
  "ea-time-picker": "form",
  "ea-transfer": "form",

  "ea-table": "data-display",
  "ea-tag": "data-display",
  "ea-badge": "data-display",
  "ea-progress": "data-display",
  "ea-avatar": "data-display",
  "ea-descriptions": "data-display",
  "ea-statistic": "data-display",
  "ea-skeleton": "data-display",
  "ea-empty": "data-display",
  "ea-image": "data-display",
  "ea-image-preview": "data-display",
  "ea-tree": "data-display",
  "ea-calendar": "data-display",
  "ea-countdown": "data-display",

  "ea-menu": "navigation",
  "ea-tabs": "navigation",
  "ea-breadcrumb": "navigation",
  "ea-pagination": "navigation",
  "ea-steps": "navigation",
  "ea-dropdown": "navigation",
  "ea-page-header": "navigation",

  "ea-alert": "feedback",
  "ea-dialog": "feedback",
  "ea-drawer": "feedback",
  "ea-message": "feedback",
  "ea-message-box": "feedback",
  "ea-notification": "feedback",
  "ea-popconfirm": "feedback",
  "ea-popover": "feedback",
  "ea-tooltip": "feedback",
  "ea-loading": "feedback",
  "ea-result": "feedback",
  "ea-tour": "feedback",

  "ea-layout": "foundation",
  "ea-container": "foundation",
  "ea-card": "foundation",
  "ea-carousel": "foundation",
  "ea-collapse": "foundation",
  "ea-timeline": "foundation",
  "ea-splitter": "foundation",
  "ea-segmented": "foundation",
  "ea-backtop": "foundation",
  "ea-infinite-scroll": "foundation",
  "ea-theme-toggle": "foundation",
};

/**
 * 解析组件的子组件和依赖关系
 */
export function parseDependencies(
  componentDir: string,
  sourceFile: ts.SourceFile,
  jsDocDependencies: string[]
): DependencyParseResult {
  const subComponents = parseSubComponents(componentDir);
  const importDependencies = parseImportDependencies(sourceFile);
  const dependencies = mergeDependencies(jsDocDependencies, importDependencies);
  const category = inferCategory(componentDir);

  return {
    subComponents,
    dependencies,
    category,
  };
}

/**
 * 扫描 components/ 子目录，识别子组件
 */
function parseSubComponents(componentDir: string): SubComponentInfo[] {
  const componentsDir = path.join(componentDir, "components");
  const subComponents: SubComponentInfo[] = [];

  if (!fs.existsSync(componentsDir)) return subComponents;

  const entries = fs.readdirSync(componentsDir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (!entry.name.startsWith("ea-")) continue;

    const subDir = path.join(componentsDir, entry.name);
    const indexPath = path.join(subDir, "index.ts");

    if (!fs.existsSync(indexPath)) continue;

    // 从子组件源码中提取标签名
    const tagName = extractTagNameFromSource(indexPath);
    const relativePath = path.relative(
      path.dirname(componentDir),
      subDir
    ).replace(/\\/g, "/");

    subComponents.push({
      name: tagName || entry.name,
      description: "",
      sourcePath: relativePath,
    });
  }

  return subComponents;
}

/**
 * 从源文件中提取 @CustomElement 的标签名
 */
function extractTagNameFromSource(filePath: string): string | null {
  const content = fs.readFileSync(filePath, "utf-8");

  // 匹配 @CustomElement("ea-xxx") 或 @CustomElement(TAG_NAME)
  const directMatch = content.match(
    /@CustomElement\s*\(\s*["']([\w-]+)["']/
  );
  if (directMatch) return directMatch[1];

  // 匹配 const TAG_NAME = "ea-xxx"
  const constMatch = content.match(
    /const\s+TAG_NAME\s*=\s*["']([\w-]+)["']/
  );
  if (constMatch) return constMatch[1];

  return null;
}

/**
 * 从 import 语句中提取内部组件依赖
 */
function parseImportDependencies(sourceFile: ts.SourceFile): string[] {
  const deps: string[] = [];
  const seen = new Set<string>();

  ts.forEachChild(sourceFile, (node) => {
    if (!ts.isImportDeclaration(node)) return;

    const moduleSpecifier = node.moduleSpecifier;
    if (!ts.isStringLiteral(moduleSpecifier)) return;

    const importPath = moduleSpecifier.text;

    // 匹配 @components/ea-xxx 或 ./xxx/ea-xxx
    const componentMatch = importPath.match(
      /@components\/(ea-[\w-]+)/
    );
    if (componentMatch && !seen.has(componentMatch[1])) {
      seen.add(componentMatch[1]);
      deps.push(componentMatch[1]);
      return;
    }

    // 匹配相对路径中的 ea-xxx/index
    const relativeMatch = importPath.match(
      /(?:\.\/|(?:\.\.\/)+)(ea-[\w-]+)\/index/
    );
    if (relativeMatch && !seen.has(relativeMatch[1])) {
      seen.add(relativeMatch[1]);
      deps.push(relativeMatch[1]);
    }
  });

  return deps;
}

/**
 * 合并 JSDoc 声明的依赖和 import 分析的依赖
 */
function mergeDependencies(
  jsDocDeps: string[],
  importDeps: string[]
): string[] {
  const merged = new Set<string>([...jsDocDeps, ...importDeps]);
  return [...merged].sort();
}

/**
 * 推断组件分类
 */
function inferCategory(componentDir: string): ComponentCategory {
  const dirName = path.basename(componentDir);
  return CATEGORY_MAP[dirName] || "basic";
}
