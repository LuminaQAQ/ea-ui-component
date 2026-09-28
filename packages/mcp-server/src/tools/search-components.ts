import type { ComponentMeta, ComponentListItem } from "../types.js";

/**
 * search_components Tool：按关键词模糊搜索组件
 */
export function searchComponents(
  components: ComponentMeta[],
  keyword: string,
  category?: string
): { total: number; components: ComponentListItem[] } {
  const lowerKeyword = keyword.toLowerCase();

  let results = components.filter((c) => {
    if (c.name.toLowerCase().includes(lowerKeyword)) return true;
    if (c.displayName.toLowerCase().includes(lowerKeyword)) return true;
    if (c.description.toLowerCase().includes(lowerKeyword)) return true;
    if (c.props.some((p) => p.name.toLowerCase().includes(lowerKeyword)))
      return true;
    return false;
  });

  if (category) {
    results = results.filter((c) => c.category === category);
  }

  return {
    total: results.length,
    components: results.map((c) => ({
      name: c.name,
      displayName: c.displayName,
      category: c.category,
      status: c.status,
      description: c.description,
    })),
  };
}
