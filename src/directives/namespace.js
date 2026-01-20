/**
 * @typedef Namespace
 * @property {() => string} b - 获取BEM类名
 * @property {() => string} cb - 获取BEM类名
 * @property {(elementName) => string} e - 获取元素类名
 * @property {(elementName) => string} ce - 获取元素修饰类名
 * @property {(modifierName) => string} m - 获取修饰类名
 * @property {(modifierName) => string} cm - 获取修饰类名
 * @property {(stateName) => string} s - 获取状态类名
 * @property {(stateName) => string} cs - 获取状态类名
 */

/**
 * @param {string} name - 组件的基本名称
 * @returns {Namespace} 包含BEM类名生成方法的对象
 */
export const namespace = name => {
  const block = `ea-${name}`;

  return {
    b: () => block,
    cb: () => `.${block}`,
    e: elementName => `${block}__${elementName}`,
    ce: elementName => `.${block}__${elementName}`,
    m: modifierName => `${block}--${modifierName}`,
    cm: modifierName => `.${block}--${modifierName}`,
    s: stateName => `is-${stateName}`,
    cs: stateName => `.is-${stateName}`,
  };
};
