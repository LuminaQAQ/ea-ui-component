/** WC 全名格式：小写字母开头，至少一段连字符 */
const WC_NAME_RE = /^[a-z][a-z0-9]*(-[a-z0-9]+)+$/;

/**
 * 组件名校验正则工厂：已配置 prefix ⇒ `${prefix}-` + kebab-case；
 * 未配置 ⇒ 退化为纯 WC 全名格式校验（check 读路径零 prefix 可运行）
 */
export function createNameRe(prefix?: string): RegExp {
  if (!prefix) return WC_NAME_RE;
  return new RegExp(`^${prefix}-[a-z0-9]+(?:-[a-z0-9]+)*$`);
}

/** kebab-case → PascalCase（ea-color-picker → EaColorPicker） */
export function toPascalCase(kebab: string): string {
  return kebab.replace(/(?:^|-)([a-z0-9])/g, (_, c: string) => c.toUpperCase());
}
