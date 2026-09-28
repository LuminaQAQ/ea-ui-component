import type { ComponentMeta, ComponentExample } from "../types.js";

/**
 * get_component_example Tool：获取组件的使用示例代码
 * 从预提取的缓存中读取，不再依赖 docs 目录
 */
export function getComponentExample(
  components: ComponentMeta[],
  componentName: string,
  exampleType: "basic" | "advanced" | "all" = "all"
): ComponentExample[] {
  const comp = components.find((c) => c.name === componentName);
  if (!comp) return [];
  if (!comp.examples) return [];

  if (exampleType === "all") return comp.examples;
  return comp.examples.filter((e) => e.type === exampleType);
}
