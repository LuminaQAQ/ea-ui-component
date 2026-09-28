/**
 * 将驼峰命名转换为连字符命名
 * @param camelCase 驼峰命名的字符串
 * @returns 连字符命名的字符串
 * @example
 * camelToKebab('closeText') // 'close-text'
 * camelToKebab('showIcon') // 'show-icon'
 * camelToKebab('already-kebab') // 'already-kebab'
 */
export function camelToKebab(camelCase: string): string {
  return camelCase.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

/**
 * 将连字符命名转换为驼峰命名
 * @param kebab 连字符命名的字符串
 * @returns 驼峰命名的字符串
 * @example
 * kebabToCamel('close-text') // 'closeText'
 * kebabToCamel('show-icon') // 'showIcon'
 * kebabToCamel('alreadyCamel') // 'alreadyCamel'
 */
export function kebabToCamel(kebab: string): string {
  return kebab.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}
