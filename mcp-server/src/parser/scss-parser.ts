import fs from "node:fs";
import path from "node:path";
import type { CSSVarInfo } from "../types.js";

/**
 * 解析组件 SCSS 文件，提取 :host 中的 CSS 自定义属性
 */
export function parseScss(componentDir: string): CSSVarInfo[] {
  const scssPath = path.join(componentDir, "index.scss");

  if (!fs.existsSync(scssPath)) return [];

  const content = fs.readFileSync(scssPath, "utf-8");
  return extractCSSVarsFromScss(content);
}

/**
 * 从 SCSS 内容中提取 CSS 自定义属性
 * 匹配 :host 块中 --#{$name}- 前缀的变量定义
 */
function extractCSSVarsFromScss(content: string): CSSVarInfo[] {
  const vars: CSSVarInfo[] = [];
  const seenNames = new Set<string>();

  // 提取 $name 变量值（组件名）
  const nameMatch = content.match(/\$name:\s*(ea-[\w-]+)/);
  const componentName = nameMatch ? nameMatch[1] : "";

  // 提取 :host 块内容
  const hostBlocks = extractHostBlocks(content);

  for (const block of hostBlocks) {
    // 匹配 --ea-xxx: value; 或 --#{\$name}-xxx: value;
    const varRegex = /--([\w-]+(?:\#[\{]\$name[\}]-[\w-]+)?):\s*([^;]+);/g;

    let match: RegExpExecArray | null;
    while ((match = varRegex.exec(block)) !== null) {
      let varName = match[1];
      const varValue = match[2].trim();

      // 处理 #{$name}- 插值语法
      if (componentName) {
        varName = varName
          .replace(/#\{\$name\}-/, `${componentName}-`)
          .replace(/#\{\$name\}/, componentName);
      }

      // 确保 -- 前缀
      const fullVarName = varName.startsWith("--") ? varName : `--${varName}`;

      // 只收集组件级变量（以 --ea- 开头）
      if (!fullVarName.startsWith("--ea-")) continue;
      if (seenNames.has(fullVarName)) continue;

      seenNames.add(fullVarName);
      vars.push({
        name: fullVarName,
        default: varValue,
        description: "",
      });
    }
  }

  return vars;
}

/**
 * 提取 :host 块的内容（处理嵌套大括号）
 */
function extractHostBlocks(content: string): string[] {
  const blocks: string[] = [];

  // 找到所有 :host 块
  const hostRegex = /:host(?:\([^)]*\))?\s*\{/g;
  let hostMatch: RegExpExecArray | null;

  while ((hostMatch = hostRegex.exec(content)) !== null) {
    const startIndex = hostMatch.index + hostMatch[0].length;
    const block = extractBalancedBlock(content, startIndex);
    if (block) {
      blocks.push(block);
    }
  }

  return blocks;
}

/**
 * 从指定位置提取平衡的大括号内容
 */
function extractBalancedBlock(
  content: string,
  startIndex: number
): string | null {
  let depth = 1;
  let i = startIndex;

  while (i < content.length && depth > 0) {
    if (content[i] === "{") {
      depth++;
    } else if (content[i] === "}") {
      depth--;
    }
    i++;
  }

  if (depth !== 0) return null;
  return content.substring(startIndex, i - 1);
}

/**
 * 合并 SCSS 提取的 CSS 变量与 JSDoc 的描述
 */
export function mergeCSSVarsWithJSDoc(
  scssVars: CSSVarInfo[],
  jsDocVars: CSSVarInfo[]
): CSSVarInfo[] {
  const jsDocMap = new Map<string, string>();
  for (const v of jsDocVars) {
    jsDocMap.set(v.name, v.description);
  }

  // 以 SCSS 提取的变量为基准，补充 JSDoc 描述
  const merged = scssVars.map((v) => ({
    ...v,
    description: jsDocMap.get(v.name) || v.description || "",
  }));

  // 添加 JSDoc 中有但 SCSS 中没有的变量
  const scssNames = new Set(scssVars.map((v) => v.name));
  for (const v of jsDocVars) {
    if (!scssNames.has(v.name)) {
      merged.push(v);
    }
  }

  return merged;
}
