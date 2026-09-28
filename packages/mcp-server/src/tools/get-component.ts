import type { ComponentMeta } from "../types.js";

/**
 * get_component Tool：获取单个组件的完整信息
 */
export function getComponent(
  components: ComponentMeta[],
  name: string,
  detail: "summary" | "full" = "full"
): { data: any; error?: string } {
  const comp = components.find((c) => c.name === name);

  if (!comp) {
    return {
      data: null,
      error: `组件 "${name}" 不存在`,
    };
  }

  if (detail === "summary") {
    return {
      data: {
        name: comp.name,
        displayName: comp.displayName,
        category: comp.category,
        status: comp.status,
        since: comp.since,
        description: comp.description,
        props: comp.props.map((p) => ({
          name: p.name,
          type: p.type,
          default: p.default,
          isAttribute: p.isAttribute,
        })),
        examples: comp.examples?.slice(0, 3).map((e) => ({
          title: e.title,
          type: e.type,
        })) || [],
      },
    };
  }

  return { data: comp };
}
