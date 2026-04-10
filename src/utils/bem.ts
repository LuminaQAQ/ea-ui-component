/**
 * BEM 类名生成器
 * @param block 块名
 * @returns 返回 BEM 命名空间的函数
 *
 * @example
 * const bem = createBEM('ea-alert');
 *
 * // 基础类名
 * bem() // 'ea-alert'
 *
 * // 带修饰符 (键为修饰符名，值为 true 或字符串值)
 * bem({ primary: true, effect: 'light' }) // 'ea-alert ea-alert--primary ea-alert--effect-light'
 *
 * // 带状态 (is- 前缀)
 * bem({}, { center: true }) // 'ea-alert is-center'
 *
 * // 修饰符 + 状态
 * bem({ primary: true }, { center: true }) // 'ea-alert ea-alert--primary is-center'
 */
export function createBEM(block: string) {
  return function bem(
    modifiers: Record<string, boolean | string | number> = {},
    states: Record<string, boolean | string | number> = {}
  ): string {
    const classes: string[] = [block];

    // 处理修饰符 (block--modifier)
    for (const [key, value] of Object.entries(modifiers)) {
      if (value === true || value === "") {
        classes.push(`${block}--${key}`);
      } else if (value !== false && value !== undefined && value !== null) {
        classes.push(`${block}--${key}-${value}`);
      }
    }

    // 处理状态 (is-state)
    for (const [key, value] of Object.entries(states)) {
      if (value === true || value === "") {
        classes.push(`is-${key}`);
      }
    }

    return classes.join(" ");
  };
}

export default createBEM;
