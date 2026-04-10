import parseAttributeValue from "@/utils/parseAttributeValue.js";
import { ElementAttributesMap } from "@/stores";
import { html } from "@/utils/html";
import type {
  AttributeOptions,
  EaElement,
  EaElementConstructor,
} from "@/types/index";

/**
 * @description ea-ui 自定义元素装饰器选项
 */
interface CustomElementOptions {
  /** @description 是否自动注册自定义元素，默认为 true */
  autoDefine?: boolean;
  /** @description 自定义元素的样式 */
  styles?: string | string[];
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
  return function (this: EaElement & HTMLElement) {
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
  return function (this: EaElement & HTMLElement, newVal: any) {
    if (!(this instanceof HTMLElement)) return;

    this.setAttribute(name, String(newVal));
  };
}

/**
 * 定义响应式属性
 * @param instance 组件实例
 * @param name 属性名
 * @param type 属性类型
 * @param defaultValue 默认值
 */
function defineReactiveProperty(
  instance: any,
  name: string,
  type: AttributeOptions["type"],
  defaultValue: any
): void {
  // 删除已有属性
  if (Object.getOwnPropertyDescriptor(instance, name)) {
    delete instance[name];
  }

  // 定义响应式属性
  Object.defineProperty(instance, name, {
    get: createGetter(defaultValue, name, type),
    set: createSetter(name),
    configurable: true,
    enumerable: true,
  });
}

/**
 * 收集并应用组件样式
 * @param elementClass 组件类
 * @param shadowRoot 组件的 ShadowRoot
 */
function applyStyles(elementClass: any, shadowRoot: ShadowRoot | null): void {
  if (!shadowRoot) return;

  const allStyles: string[] = [];
  let currentClass: any = elementClass;
  while (currentClass && currentClass !== HTMLElement) {
    const classOptions = currentClass.customElementOptions;
    if (classOptions?.styles) {
      const classStyles = Array.isArray(classOptions.styles)
        ? classOptions.styles
        : [classOptions.styles];
      allStyles.unshift(...classStyles);
    }
    currentClass = Object.getPrototypeOf(currentClass);
  }

  const uniqueStyles = [...new Set(allStyles)];

  if (uniqueStyles.length === 0) return;

  // 支持 adoptedStyleSheets
  if ("adoptedStyleSheets" in shadowRoot) {
    const sheets = uniqueStyles.map(css => {
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(css);
      return sheet;
    });
    shadowRoot.adoptedStyleSheets = sheets;
  } else {
    // Fallback: 使用 style 标签
    uniqueStyles.forEach(css => {
      const styleEl = document.createElement("style");
      styleEl.textContent = css;
      (shadowRoot as HTMLElement).appendChild(styleEl);
    });
  }
}

/**
 * 渲染组件模板到 ShadowRoot
 * @param element 组件实例
 * @param shadowRoot 组件的 ShadowRoot
 */
function renderTemplate(
  element: EaElement & HTMLElement,
  shadowRoot: ShadowRoot | null
): void {
  if (!shadowRoot) return;

  const template = element.html?.();
  if (!template) return;

  // 使用 DOMPurify 清洗 HTML，然后使用 template 元素解析
  const sanitizedTemplate = html(template);
  const templateEl = document.createElement("template");
  templateEl.innerHTML = sanitizedTemplate as string;

  // 将内容追加到 shadowRoot
  shadowRoot.appendChild(templateEl.content);
}

/**
 * 挂载组件 - 应用样式并渲染模板
 * @param element 组件实例
 * @param elementClass 组件类
 */
function mount(element: EaElement & HTMLElement, elementClass: any): void {
  const shadowRoot = element.shadowRoot;
  if (!shadowRoot) return;

  // 应用样式
  applyStyles(elementClass, shadowRoot);

  // 渲染模板
  renderTemplate(element, shadowRoot);
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
    (CustomElementClass as any).customElementOptions = options;

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

        // 定义响应式属性
        if (propertyOptions) {
          Object.keys(propertyOptions).forEach(name => {
            const { type, default: defaultValue } = propertyOptions[name];
            defineReactiveProperty(this, name, type, defaultValue);
          });
        }
      }

      connectedCallback() {
        // 挂载组件（应用样式 + 渲染模板）
        mount(this, CustomElementClass);

        // 调用父类 connectedCallback
        const parent = Object.getPrototypeOf(Object.getPrototypeOf(this));
        if (parent && typeof parent.connectedCallback === "function") {
          parent.connectedCallback.call(this);
        }
      }

      async attributeChangedCallback(
        name: string,
        oldVal: string | null,
        newVal: string | null
      ): Promise<void> {
        try {
          if (!propertyOptions) return;
          if (!propertyOptions[name]) return;

          await customElements.whenDefined(elementName);
          const newValue = parseAttributeValue(
            newVal,
            propertyOptions[name].type
          );
          const oldValue = parseAttributeValue(
            oldVal,
            propertyOptions[name].type
          );

          const parent = Object.getPrototypeOf(Object.getPrototypeOf(this));
          if (parent && typeof parent.attributeChangedCallback === "function") {
            await parent.attributeChangedCallback.call(
              this,
              name,
              oldValue,
              newValue
            );
          }

          propertyOptions[name].observer?.call(this, newValue, oldValue);
        } catch (e) {
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
