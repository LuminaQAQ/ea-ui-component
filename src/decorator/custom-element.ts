import parseAttributeValue from "@/utils/parseAttributeValue.js";
import { ElementAttributesMap } from "./attribute.js";
import type {
  AttributeOptions,
  EaElementConstructor,
  ShadowRootElement,
} from "@mytypes/index";

/**
 * @description ea-ui 自定义元素装饰器选项
 */
interface CustomElementOptions {
  /** @description 是否自动注册自定义元素，默认为 true */
  autoDefine?: boolean;
  /** @description 自定义元素的默认值 */
  default?: any;
}

/**
 * @description ea-ui 自定义元素装饰器函数类型
 */
type CustomElementDecorator = (
  customElementConstructor: EaElementConstructor,
  context?: DecoratorContext
) => void;

/**
 * 创建属性的 getter 函数
 */
function createGetter(
  defaultValue: any,
  name: string,
  type: AttributeOptions["type"]
) {
  return function (this: ShadowRootElement) {
    const attrValue = this.getAttribute(name);

    if (attrValue !== null) {
      return parseAttributeValue(attrValue, type);
    }

    return defaultValue;
  };
}

/**
 * 创建属性的 setter 函数
 */
function createSetter(name: string) {
  return function (this: ShadowRootElement, newVal: any) {
    if (!(this instanceof HTMLElement)) return;

    this.setAttribute(name, String(newVal));
  };
}

/**
 * @description ea-ui 自定义元素的 `注册` 装饰器
 * @param elementName 自定义元素的标签名
 *
 * ```ts
 * @CustomElement("ea-element")
 * class EaElement extends HTMLElement {
 *  // ...
 * }
 * ```
 */
function CustomElement(
  elementName: string,
  options: CustomElementOptions = {}
): CustomElementDecorator {
  const { autoDefine = true } = options;

  return (
    CustomElementClass: EaElementConstructor,
    _context?: DecoratorContext
  ) => {
    const propertyOptions = ElementAttributesMap.get(CustomElementClass.name);

    const superAttributes = CustomElementClass.observedAttributes || [];
    const attributeNames = Object.keys(propertyOptions || {});
    const observedAttributes = [
      ...new Set([...superAttributes, ...attributeNames]),
    ];

    class EaCustomElement extends CustomElementClass {
      static get observedAttributes() {
        return observedAttributes;
      }

      constructor() {
        super();

        if (propertyOptions) {
          Object.keys(propertyOptions).forEach(name => {
            const { type, default: defaultValue } = propertyOptions[name];

            if (Object.getOwnPropertyDescriptor(this, name)) {
              delete (this as any)[name];
            }

            Object.defineProperty(this, name, {
              get: createGetter(defaultValue, name, type),
              set: createSetter(name),
              configurable: true,
              enumerable: true,
            });
          });
        }
      }

      connectedCallback() {
        super.connectedCallback();
      }

      async attributeChangedCallback(
        name: string,
        oldVal: string | null,
        newVal: string | null
      ): Promise<void> {
        await super.attributeChangedCallback(name, oldVal, newVal);

        try {
          if (!propertyOptions) return;
          if (!propertyOptions[name]) return;

          await customElements.whenDefined(elementName);

          propertyOptions[name].observer?.call(this, newVal, oldVal);
        } catch (e) {
          // eslint-disable-next-line no-undef
          if (process.env.NODE_ENV === "development") {
            console.error(e, this);
          }
        }
      }
    }

    if (autoDefine && !window.customElements.get(elementName)) {
      window.customElements.define(elementName, EaCustomElement);
    }
  };
}

export { CustomElement };
