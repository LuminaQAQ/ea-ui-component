/** 把 IDE 元数据模型转换为 MCP Server 的组件元数据结构 */
import type {
  ComponentMeta as McpComponentMeta,
  EventInfo,
  PropInfo,
  SubComponentInfo,
} from "../../packages/mcp-server/src/types";
import { resolveCategory, topLevelOf } from "./category";
import type {
  AttributeMeta,
  ComponentMeta,
  PropertyMeta,
  ScanResult,
  ValueKind,
} from "./types";

/** 从 @summary 提炼显示名称，如「警告提示组件，用于...」→「警告提示」 */
function extractDisplayName(summary: string, tagName: string): string {
  if (!summary) return tagName;
  const match = summary.match(/^([^，。,\.]+)/);
  if (!match?.[1]) return tagName;
  return match[1].replace(/组件$/, "").trim() || tagName;
}

/** 值类型分类 → MCP 侧的类型标签 */
function toMcpType(kind: ValueKind): string {
  switch (kind) {
    case "boolean":
      return "Boolean";
    case "string":
      return "String";
    case "number":
      return "Number";
    case "enum":
      return "Enum";
    default:
      return "any";
  }
}

/** 把 @attribute 转成 MCP 属性信息 */
function toMcpAttribute(attribute: AttributeMeta): PropInfo {
  return {
    name: attribute.name,
    type: toMcpType(attribute.kind),
    default: attribute.defaultValue,
    required: false,
    description: attribute.description,
    isAttribute: true,
    a11y: attribute.a11y,
    enumValues: attribute.enumValues,
  };
}

/** 把 @property 转成 MCP 属性信息 */
function toMcpProperty(property: PropertyMeta): PropInfo {
  return {
    name: property.name,
    type: toMcpType(property.kind),
    default: property.defaultValue,
    required: false,
    description: property.description,
    isAttribute: false,
    enumValues: property.enumValues,
  };
}

/** 从事件描述里抽出 detail 类型文本 */
function extractDetail(description: string): string {
  const match = description.match(/detail:\s*`([^`]+)`/);
  return match?.[1] ?? "";
}

/** 源码路径转仓库内路径，供 MCP 展示 */
function toSourcePath(sourceFile: string): string {
  const dir = sourceFile.replace(/\/index\.ts$/, "");
  return `packages/components/src/components/${dir}`;
}

/** 汇总子组件：同一顶层目录下、位于 components/ 子目录的其他标签 */
function collectSubComponents(
  component: ComponentMeta,
  all: ComponentMeta[]
): SubComponentInfo[] {
  const top = topLevelOf(component);
  return all
    .filter(candidate => {
      if (candidate.tagName === component.tagName) return false;
      if (topLevelOf(candidate) !== top) return false;
      return candidate.sourceFile.split("/")[1] === "components";
    })
    .map(candidate => ({
      name: candidate.tagName,
      description: candidate.summary,
      sourcePath: candidate.sourceFile.replace(/\/index\.ts$/, ""),
    }));
}

/** 扫描结果 → MCP 组件元数据列表 */
export function toMcpComponents(result: ScanResult): McpComponentMeta[] {
  return result.components.map(component => ({
    name: component.tagName,
    displayName: extractDisplayName(component.summary, component.tagName),
    category: resolveCategory(component),
    status: (component.status || "stable") as McpComponentMeta["status"],
    since: component.since,
    description: component.summary,
    sourcePath: toSourcePath(component.sourceFile),
    props: [
      ...component.attributes.map(toMcpAttribute),
      ...component.properties.map(toMcpProperty),
    ],
    events: component.events.map<EventInfo>(event => ({
      name: event.name,
      params: event.detailType || extractDetail(event.description),
      description: event.description,
      isCustomEventClass: Boolean(event.className),
      className: event.className,
    })),
    slots: component.slots.map(slot => ({
      name: slot.name === "" ? "default" : slot.name,
      description: slot.description,
    })),
    cssVars: component.cssProperties.map(item => ({
      name: item.name,
      default: item.defaultValue,
      description: item.description,
    })),
    cssParts: component.cssParts.map(item => ({
      name: item.name,
      description: item.description,
    })),
    subComponents: collectSubComponents(component, result.components),
    dependencies: component.dependencies,
  }));
}
