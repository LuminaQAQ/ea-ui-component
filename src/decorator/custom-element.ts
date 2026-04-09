import { propertyMap } from "./attribute.js";
import type { EaCustomElementConstructor } from "@mytypes/index";

/**
 * @description ea-ui 自定义元素装饰器选项
 */
interface CustomElementOptions {
  /** @description 是否自动注册自定义元素，默认为 true */
  autoDefine?: boolean;
}

/**
 * @description ea-ui 自定义元素装饰器函数类型
 */
type CustomElementDecorator = (
  customElementConstructor: EaCustomElementConstructor,
  context?: DecoratorContext
) => void;

/**
 * @description ea-ui 自定义元素的 `注册` 装饰器
 * @param elementName 自定义元素的标签名
 *
 * ```ts
 * @customElement("ts-el")
 * class Person extends HTMLElement {
 *  // ...
 * }
 * ```
 */
function customElement(
  elementName: string,
  options: CustomElementOptions = {}
): CustomElementDecorator {
  const { autoDefine = true } = options;

  return (
    customElementConstructor: EaCustomElementConstructor,
    context?: DecoratorContext
  ) => {
    const clsName = customElementConstructor.name;
    const propertyOptions = propertyMap.get(clsName);

    /**
     * 初始化自定义元素 的 观察属性
     */
    const initialize = () => {
      customElementConstructor.__observedAttributes = [
        ...(customElementConstructor.__observedAttributes || []),
        ...Object.keys(propertyOptions || {}),
      ];

      if (autoDefine && !window.customElements.get(elementName)) {
        window.customElements.define(elementName, customElementConstructor);
      }

      // propertyMap.delete(clsName);
    };

    if (context) {
      context.addInitializer(initialize);
    } else {
      initialize();
    }
  };
}

export { customElement };
