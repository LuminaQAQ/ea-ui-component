import type { ComponentMeta, ComponentListItem } from "../types.js";

/**
 * list_components Tool：列出组件库中所有组件
 */
export function listComponents(components: ComponentMeta[]): {
  components: ComponentListItem[];
} {
  return {
    components: components.map((c) => ({
      name: c.name,
      displayName: c.displayName,
      category: c.category,
      status: c.status,
      description: c.description,
    })),
  };
}
