/**
 * BEM 类名生成器
 * @param block 块名
 * @returns 返回 BEM 命名空间的函数
 *
 * @example
 * const bem = createBEM('ea-alert');
 *
 * // 基础类名
 * bem()                          // 'ea-alert'
 * bem.b()                        // 'ea-alert'
 * bem.cb()                       // '.ea-alert'
 *
 * // 元素类名 (block__element)
 * bem.e('content')               // 'ea-alert__content'
 * bem.ce('content')              // '.ea-alert__content'
 *
 * // 修饰符类名 (block--modifier)
 * bem({ primary: true })         // 'ea-alert ea-alert--primary'
 * bem({ effect: 'light' })       // 'ea-alert ea-alert--effect-light'
 * bem.m('primary', 'large')      // 'ea-alert--primary ea-alert--large'
 * bem.cm('primary')              // '.ea-alert--primary'
 *
 * // 状态类名 (is-state)
 * bem({}, { center: true })      // 'ea-alert is-center'
 * bem.s('active', 'disabled')    // 'is-active is-disabled'
 * bem.cs('active')               // '.is-active'
 *
 * // 组合使用
 * bem({ primary: true }, { center: true })  // 'ea-alert ea-alert--primary is-center'
 */
export function createBEM(block: string) {
  // 生成元素类名
  const element = (elementName: string) => `${block}__${elementName}`;

  // 生成带选择器前缀的元素类名
  const elementSelector = (elementName: string) => `.${block}__${elementName}`;

  // 生成修饰符类名
  const modifier = (...modifierNames: string[]) =>
    modifierNames.map(name => `${block}--${name}`).join(" ");

  // 生成带选择器前缀的修饰符类名
  const modifierSelector = (...modifierNames: string[]) =>
    modifierNames.map(name => `.${block}--${name}`).join(" ");

  // 生成状态类名
  const state = (...stateNames: string[]) =>
    stateNames.map(name => `is-${name}`).join(" ");

  // 生成带选择器前缀的状态类名
  const stateSelector = (...stateNames: string[]) =>
    stateNames.map(name => `.is-${name}`).join(" ");

  // 主函数：生成带修饰符和状态的块类名
  function bem(
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
  }

  // 附加方法
  bem.b = () => block;
  bem.cb = () => `.${block}`;
  bem.e = element;
  bem.ce = elementSelector;
  bem.m = modifier;
  bem.cm = modifierSelector;
  bem.s = state;
  bem.cs = stateSelector;

  return bem;
}

export default createBEM;
