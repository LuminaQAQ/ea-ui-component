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
  return function (
    targetOrValue: any,
    propertyKeyOrContext: string | symbol | ClassFieldDecoratorContext
  ) {
    const isNewDecoratorApi =
      propertyKeyOrContext &&
      typeof propertyKeyOrContext === "object" &&
      "addInitializer" in propertyKeyOrContext;

    if (isNewDecoratorApi) {
      // 新版装饰器
      const context = propertyKeyOrContext as ClassFieldDecoratorContext;
      const name = context.name;

      context.addInitializer(function (this: any) {
        Object.defineProperty(this, name, {
          get: function (
            this: EaElement & HTMLElement
          ): Element | null {
            return this.shadowRoot?.querySelector(selector) ?? null;
          },
          enumerable: true,
          configurable: true,
        });
      });

      return undefined;
    } else {
      // 旧版装饰器
      const target = targetOrValue;
      const propertyKey = propertyKeyOrContext as string | symbol;

      const getter = function (
        this: EaElement & HTMLElement
      ): Element | null {
        return this.shadowRoot?.querySelector(selector) ?? null;
      };

      Object.defineProperty(target, propertyKey, {
        get: getter,
        enumerable: true,
        configurable: true,
      });
    }
  };
}

/**
 * @description 自动从 shadowRoot 中查询所有匹配 DOM 元素的装饰器
 * 兼容旧版和新版装饰器 API
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
  return function (
    targetOrValue: any,
    propertyKeyOrContext: string | symbol | ClassFieldDecoratorContext
  ) {
    // 检测是否为新版装饰器 API
    const isNewDecoratorApi =
      propertyKeyOrContext &&
      typeof propertyKeyOrContext === "object" &&
      "addInitializer" in propertyKeyOrContext;

    if (isNewDecoratorApi) {
      // 新版装饰器 API (TypeScript 5.0+)
      const context = propertyKeyOrContext as ClassFieldDecoratorContext;
      const name = context.name;

      context.addInitializer(function (this: any) {
        Object.defineProperty(this, name, {
          get: function (
            this: EaElement & HTMLElement
          ): NodeListOf<Element> | null {
            return this.shadowRoot?.querySelectorAll(selector) ?? null;
          },
          enumerable: true,
          configurable: true,
        });
      });

      return undefined;
    } else {
      // 旧版装饰器 API (experimentalDecorators)
      const target = targetOrValue;
      const propertyKey = propertyKeyOrContext as string | symbol;

      const getter = function (
        this: EaElement & HTMLElement
      ): NodeListOf<Element> | null {
        return this.shadowRoot?.querySelectorAll(selector) ?? null;
      };

      Object.defineProperty(target, propertyKey, {
        get: getter,
        enumerable: true,
        configurable: true,
      });
    }
  };
}

export default query;
