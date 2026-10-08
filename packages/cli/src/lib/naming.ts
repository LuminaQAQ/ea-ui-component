/** 组件名规范：ea- 前缀 + kebab-case */
export const EA_NAME_RE = /^ea-[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** kebab-case → PascalCase（ea-color-picker → EaColorPicker） */
export function toPascalCase(kebab: string): string {
  return kebab.replace(/(?:^|-)([a-z0-9])/g, (_, c: string) => c.toUpperCase());
}
