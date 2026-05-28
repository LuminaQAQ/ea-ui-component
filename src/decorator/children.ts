import type { EaElement } from "@/types/index";

/**
 * @description 自动从 Light DOM 中查询所有匹配子元素的装饰器
 * 与 @queryAll（查询 Shadow DOM）互补，用于查询组件的 Light DOM 子元素
 * @param selector CSS 选择器
 * @returns 属性装饰器
 *
 * @example
 * class MyComponent extends Base {
 *   @children('ea-tab-item:not([slot])')
 *   items!: NodeListOf<EaTabItem>;
 * }
 */
export function children(selector: string) {
  return function (
    targetOrValue: any,
    propertyKeyOrContext: string | symbol | ClassFieldDecoratorContext
  ) {
    const isNewDecoratorApi =
      propertyKeyOrContext &&
      typeof propertyKeyOrContext === "object" &&
      "addInitializer" in propertyKeyOrContext;

    if (isNewDecoratorApi) {
      const context = propertyKeyOrContext as ClassFieldDecoratorContext;
      const name = context.name;

      context.addInitializer(function (this: any) {
        Object.defineProperty(this, name, {
          get: function (
            this: EaElement & HTMLElement
          ): NodeListOf<Element> | null {
            return this.querySelectorAll(selector) ?? null;
          },
          enumerable: true,
          configurable: true,
        });
      });

      return undefined;
    } else {
      const target = targetOrValue;
      const propertyKey = propertyKeyOrContext as string | symbol;

      const getter = function (
        this: EaElement & HTMLElement
      ): NodeListOf<Element> | null {
        return this.querySelectorAll(selector) ?? null;
      };

      Object.defineProperty(target, propertyKey, {
        get: getter,
        enumerable: true,
        configurable: true,
      });
    }
  };
}

export default children;
