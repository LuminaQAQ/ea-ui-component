import {
  CATEGORY_LABELS,
  resolveCategory,
  topLevelOf,
  type ComponentCategory,
} from "./category";
import { buildComponentDoc } from "./emit-standard";
import type { ComponentMeta } from "./types";

/** 分类展示顺序 */
const CATEGORY_ORDER: ComponentCategory[] = [
  "basic",
  "form",
  "data-display",
  "navigation",
  "feedback",
  "foundation",
];

/** 指南页链接 */
const GUIDE_LINKS: { title: string; path: string }[] = [
  { title: "安装", path: "install" },
  { title: "使用指南", path: "Usage" },
  { title: "主题定制", path: "theme" },
  { title: "MCP Server", path: "mcp-server" },
  { title: "IDE 类型提示", path: "ide-support" },
];

/** llms 产物生成参数 */
export interface LlmsOptions {
  /** 站点地址，末尾带斜杠 */
  siteUrl: string;
  /** 站点标题 */
  siteName: string;
  /** 项目简介 */
  description: string;
  /** 已有独立文档页的标签集合 */
  documentedTags: Set<string>;
  /** 生成日期 */
  generatedAt: string;
}

/** 标签对应的文档地址，无独立文档页时回退到顶层组件页 */
function resolveDocUrl(component: ComponentMeta, options: LlmsOptions): string {
  const tag = options.documentedTags.has(component.tagName)
    ? component.tagName
    : topLevelOf(component);
  return `${options.siteUrl}${tag}`;
}

/** 生成 llms.txt 组件索引 */
export function emitLlmsTxt(
  components: ComponentMeta[],
  options: LlmsOptions
): string {
  const lines: string[] = [
    `# ${options.siteName}`,
    "",
    `> ${options.description}`,
    "",
    `共 ${components.length} 个自定义元素标签，按分类列出，链接指向对应组件的文档页。`,
  ];

  for (const category of CATEGORY_ORDER) {
    const items = components.filter(item => resolveCategory(item) === category);
    if (items.length === 0) continue;

    lines.push("", `## ${CATEGORY_LABELS[category]}`, "");
    for (const item of items) {
      const summary = item.summary ? `: ${item.summary}` : "";
      lines.push(`- [${item.tagName}](${resolveDocUrl(item, options)})${summary}`);
    }
  }

  lines.push("", "## 指南", "");
  for (const guide of GUIDE_LINKS) {
    lines.push(`- [${guide.title}](${options.siteUrl}guide/${guide.path})`);
  }

  return `${lines.join("\n")}\n`;
}

/** 生成 llms-full.txt 完整组件 API */
export function emitLlmsFullTxt(
  components: ComponentMeta[],
  options: LlmsOptions
): string {
  const lines: string[] = [
    `# ${options.siteName} 组件 API`,
    "",
    `> ${options.description}`,
    "",
    `生成时间：${options.generatedAt}`,
    "",
    `全部标签：${components.map(item => item.tagName).join(", ")}`,
  ];

  for (const component of components) {
    lines.push(
      "",
      "---",
      "",
      `## ${component.tagName}`,
      "",
      `文档：${resolveDocUrl(component, options)}`,
      "",
      buildComponentDoc(component, 3)
    );
  }

  return `${lines.join("\n")}\n`;
}
