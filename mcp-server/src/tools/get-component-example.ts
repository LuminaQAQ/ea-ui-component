import fs from "node:fs";
import path from "node:path";
import type { ComponentExample } from "../types.js";

/**
 * get_component_example Tool：获取组件的使用示例代码
 */
export function getComponentExample(
  docsDir: string,
  componentName: string,
  exampleType: "basic" | "advanced" | "all" = "all"
): ComponentExample[] {
  const examples: ComponentExample[] = [];

  // 查找组件文档文件
  const possiblePaths = [
    path.join(docsDir, `${componentName}.md`),
    path.join(docsDir, "components", `${componentName}.md`),
  ];

  let docPath: string | null = null;
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      docPath = p;
      break;
    }
  }

  if (!docPath) return examples;

  const content = fs.readFileSync(docPath, "utf-8");

  // 提取 ::: details 标题 中的代码块
  const detailsRegex = /:::details\s+([^\n]+)\n([\s\S]*?):::/g;
  let match: RegExpExecArray | null;

  while ((match = detailsRegex.exec(content)) !== null) {
    const title = match[1].trim();
    const body = match[2];

    // 提取 HTML 代码块
    const codeMatch = body.match(/```html\n([\s\S]*?)```/);
    if (!codeMatch) continue;

    const code = codeMatch[1].trim();

    // 判断示例类型
    const isBasic =
      title.includes("基础") ||
      title.includes("基本") ||
      title.includes("简单") ||
      title.toLowerCase().includes("basic");
    const type = isBasic ? "basic" : "advanced";

    if (exampleType !== "all" && exampleType !== type) continue;

    examples.push({
      title,
      description: "",
      code,
      type,
    });
  }

  return examples;
}
