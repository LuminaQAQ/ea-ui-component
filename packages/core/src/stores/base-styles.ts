/** 注入到每个 ShadowRoot 最前面的基础样式，默认空（不配置即裸样式） */
let baseStyles: readonly string[] = [];

/**
 * 设置基础样式
 * 传入的 CSS 必须是不可变整块，注入时以全文作为缓存键
 * @param css 单个或多个 CSS 文本，空值表示回到裸样式
 */
export function setBaseStyles(css: string | string[] | null | undefined): void {
  const list = Array.isArray(css) ? css : [css];
  const usable = list.filter(
    (item): item is string => typeof item === "string" && item.trim() !== ""
  );

  baseStyles = [...new Set(usable)];
}

/**
 * 读取当前的基础样式
 * @returns 基础样式列表，按注入顺序排列
 */
export function getBaseStyles(): readonly string[] {
  return baseStyles;
}
