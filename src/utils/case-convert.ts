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

/**
 * 判断字符串是否为驼峰命名
 * @param str 要判断的字符串
 * @returns 是否为驼峰命名
 */
export function isCamelCase(str: string): boolean {
  return /[A-Z]/.test(str) && !str.includes("-");
}

/**
 * 判断字符串是否为连字符命名
 * @param str 要判断的字符串
 * @returns 是否为连字符命名
 */
export function isKebabCase(str: string): boolean {
  return str.includes("-");
}

/**
 * 标准化属性名，统一转换为连字符命名
 * @param name 原始属性名
 * @returns 连字符命名的属性名
 */
export function normalizeAttributeName(name: string): string {
  if (isKebabCase(name)) {
    return name.toLowerCase();
  }
  return camelToKebab(name);
}
