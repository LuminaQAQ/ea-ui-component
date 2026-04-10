import type { EaElement } from "@/types/index";

/**
 * @description 自动从 shadowRoot 中查询 DOM 元素的装饰器
 * @param selector CSS 选择器
 * @returns 属性装饰器
 *
 * @example
 * class MyComponent extends Base {
 *   @query('.container')
 *   container!: HTMLElement;
 *
 *   @query('slot[name="icon"]')
 *   iconSlot!: HTMLSlotElement;
 * }
 */
export function query(selector: string) {
  return function (target: any, propertyKey: string | symbol) {
    const getter = function (this: EaElement & HTMLElement): Element | null {
      return this.shadowRoot?.querySelector(selector) ?? null;
    };

    Object.defineProperty(target, propertyKey, {
      get: getter,
      enumerable: true,
      configurable: true,
    });
  };
}

/**
 * @description 自动从 shadowRoot 中查询所有匹配 DOM 元素的装饰器
 * @param selector CSS 选择器
 * @returns 属性装饰器
 *
 * @example
 * class MyComponent extends Base {
 *   @queryAll('.item')
 *   items!: NodeListOf<HTMLElement>;
 * }
 */
export function queryAll(selector: string) {
  return function (target: any, propertyKey: string | symbol) {
    const getter = function (this: EaElement & HTMLElement) {
      return this.shadowRoot?.querySelectorAll(selector) ?? null;
    };

    Object.defineProperty(target, propertyKey, {
      get: getter,
      enumerable: true,
      configurable: true,
    });
  };
}

export default query;
