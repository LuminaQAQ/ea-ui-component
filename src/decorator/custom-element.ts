import parseAttributeValue from "@/utils/parseAttributeValue";
import { ElementAttributesMap, ElementPropertiesMap } from "@/stores";
import { html } from "@/utils/html";
import { camelToKebab, kebabToCamel } from "@/utils/case-convert";
import type {
  AttributeOptions,
  PropertyOptions,
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
  /** @description 自定义元素的额外属性 */
  extraAttr?: string | string[];
  /** @description 自定义元素的默认值 */
  default?: any;
}

/**
 * @description ea-ui 自定义元素装饰器函数类型
 */
type CustomElementDecorator = (
  customElementConstructor: EaElementConstructor,
  context?: DecoratorContext | undefined
) => void;

/**
 * 查找属性配置，支持驼峰命名和连字符命名的自动转换
 * @param options 属性配置映射
 * @param name 属性名（可能是驼峰命名或连字符命名）
 * @returns 找到的属性配置和实际属性名
 */
function findPropertyOption(
  options: Record<string, AttributeOptions>,
  name: string
): {
  option: AttributeOptions | undefined;
  actualName: string;
} {
  // 1. 直接匹配
  if (options[name]) {
    return { option: options[name], actualName: name };
  }

  // 2. 尝试将连字符命名转换为驼峰命名后匹配
  const camelName = kebabToCamel(name);
  if (options[camelName]) {
    return { option: options[camelName], actualName: camelName };
  }

  // 3. 尝试将驼峰命名转换为连字符命名后匹配
  const kebabName = camelToKebab(name);
  if (options[kebabName]) {
    return { option: options[kebabName], actualName: kebabName };
  }

  return { option: undefined, actualName: name };
}

/**
 * 创建属性的 getter 函数（映射到 HTML attribute）
 * @param defaultValue 默认值
 * @param name 属性名（可能是驼峰命名）
 * @param type 属性类型
 */
function createAttributeGetter(
  defaultValue: any,
  name: string,
  type: AttributeOptions["type"] | PropertyOptions["type"]
) {
  // 将属性名转换为连字符命名（HTML 属性名）
  const attrName = camelToKebab(name);

  return function (this: EaElement & HTMLElement) {
    const attrValue = this.getAttribute(attrName);

    if (attrValue !== null) {
      return parseAttributeValue(attrValue, type);
    }

    return defaultValue;
  };
}

/**
 * 创建属性的 setter 函数（映射到 HTML attribute）
 * @param name 属性名（可能是驼峰命名）
 */
function createAttributeSetter(name: string) {
  // 将属性名转换为连字符命名（HTML 属性名）
  const attrName = camelToKebab(name);

  return function (this: EaElement & HTMLElement, newVal: any) {
    if (!(this instanceof HTMLElement)) return;

    if (typeof newVal === "boolean") {
      this.toggleAttribute(attrName, newVal);
    } else {
      this.setAttribute(attrName, String(newVal));
    }
  };
}

/**
 * 创建属性的 getter 函数（不映射到 HTML attribute，仅作为 JS 属性）
 * @param name 属性名
 * @param defaultValue 默认值
 */
function createPropertyGetter(name: string, defaultValue: any) {
  const privateName = `__prop_${name}`;
  return function (this: any) {
    return privateName in this ? this[privateName] : defaultValue;
  };
}

/**
 * 创建属性的 setter 函数（不映射到 HTML attribute，仅作为 JS 属性）
 * @param name 属性名
 * @param observer 可选的观察者回调
 */
function createPropertySetter(
  name: string,
  observer?: (newVal: any, oldVal: any) => void
) {
  return function (this: any, newVal: any) {
    const privateName = `__prop_${name}`;
    const oldVal = this[privateName];
    this[privateName] = newVal;

    // 调用观察者回调
    if (observer) {
      observer.call(this, newVal, oldVal);
    }
  };
}

/**
 * 定义响应式属性（映射到 HTML attribute）
 * @param instance 组件实例
 * @param name 属性名
 * @param type 属性类型
 * @param defaultValue 默认值
 */
function defineReactiveAttribute(
  instance: any,
  name: string,
  type: AttributeOptions["type"] | PropertyOptions["type"],
  defaultValue: any
): void {
  // 删除已有属性
  if (Object.getOwnPropertyDescriptor(instance, name)) {
    delete instance[name];
  }

  // 定义响应式属性
  Object.defineProperty(instance, name, {
    get: createAttributeGetter(defaultValue, name, type),
    set: createAttributeSetter(name),
    configurable: true,
    enumerable: true,
  });
}

/**
 * 定义响应式属性（不映射到 HTML attribute，仅作为 JS 属性）
 * @param instance 组件实例
 * @param name 属性名
 * @param defaultValue 默认值
 * @param observer 可选的观察者回调
 */
function defineReactiveProperty(
  instance: any,
  name: string,
  defaultValue: any,
  observer?: (newVal: any, oldVal: any) => void
): void {
  // 删除已有属性
  if (Object.getOwnPropertyDescriptor(instance, name)) {
    delete instance[name];
  }

  // 定义响应式属性
  Object.defineProperty(instance, name, {
    get: createPropertyGetter(name, defaultValue),
    set: createPropertySetter(name, observer),
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

  if ("adoptedStyleSheets" in shadowRoot) {
    const sheets = uniqueStyles.map(css => {
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(css);
      return sheet;
    });
    shadowRoot.adoptedStyleSheets = sheets;
  } else {
    uniqueStyles.forEach(css => {
      const styleEl = document.createElement("style");
      styleEl.textContent = css;
      shadowRoot.appendChild(styleEl);
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

  shadowRoot.innerHTML = "";

  applyStyles(elementClass, shadowRoot);
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
    _context?: DecoratorContext | undefined
  ) => {
    (CustomElementClass as any).customElementOptions = options;

    // 获取 attribute 装饰器配置（始终映射到 HTML attribute）
    const attributeOptions = ElementAttributesMap.get(CustomElementClass.name);
    // 获取 property 装饰器配置（仅作为 JS 属性，不映射到 HTML attribute）
    const propertyOptions = ElementPropertiesMap.get(CustomElementClass.name);

    const superAttributes = CustomElementClass.observedAttributes || [];
    const attributeNames = Object.keys(attributeOptions || {});

    // 为每个属性名生成连字符命名和驼峰命名两种形式
    const allAttributeNames = attributeNames.flatMap(name => {
      const kebabName = camelToKebab(name);
      const camelName = kebabToCamel(name);
      // 如果原始名已经是连字符命名，还需要添加驼峰形式
      // 如果原始名已经是驼峰命名，还需要添加连字符形式
      const names = [name];
      if (kebabName !== name) names.push(kebabName);
      if (camelName !== name && camelName !== kebabName) names.push(camelName);
      return names;
    });

    const observedAttributes = [
      ...new Set([
        ...superAttributes,
        ...allAttributeNames,
        ...(options.extraAttr || []),
      ]),
    ];

    Object.defineProperty(CustomElementClass, "observedAttributes", {
      get: () => observedAttributes,
      configurable: true,
      enumerable: true,
    });

    class EaCustomElement extends CustomElementClass {
      static get observedAttributes() {
        return observedAttributes;
      }

      constructor() {
        super();

        let current: any = CustomElementClass;
        while (current && current !== HTMLElement) {
          const clsName = current.name;
          const attrs = ElementAttributesMap.get(clsName);
          const props = ElementPropertiesMap.get(clsName);

          if (attrs) {
            Object.keys(attrs).forEach(name => {
              const { type, default: defaultValue } = attrs[name];
              defineReactiveAttribute(this, name, type, defaultValue);
            });
          }

          if (props) {
            Object.keys(props).forEach(name => {
              const { default: defaultValue, observer } = props[name];
              defineReactiveProperty(this, name, defaultValue, observer);
            });
          }

          current = Object.getPrototypeOf(current);
        }
      }

      connectedCallback() {
        // 应用样式 + 渲染模板
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
          let currentClass: any = CustomElementClass;
          let found = false;

          while (currentClass && currentClass !== HTMLElement) {
            const clsAttrs = ElementAttributesMap.get(currentClass.name);

            if (clsAttrs) {
              const { option, actualName } = findPropertyOption(clsAttrs, name);

              if (option) {
                const newValue = parseAttributeValue(newVal, option.type);
                const oldValue = parseAttributeValue(oldVal, option.type);

                const parentProto = Object.getPrototypeOf(
                  Object.getPrototypeOf(this)
                );
                if (
                  parentProto &&
                  typeof parentProto.attributeChangedCallback === "function"
                ) {
                  await parentProto.attributeChangedCallback.call(
                    this,
                    actualName,
                    oldValue,
                    newValue
                  );
                }

                option.observer?.call(this, newValue, oldValue);
                found = true;
                break;
              }
            }

            currentClass = Object.getPrototypeOf(currentClass);
          }

          if (!found) {
            const parentProto = Object.getPrototypeOf(
              Object.getPrototypeOf(this)
            );
            if (
              parentProto &&
              typeof parentProto.attributeChangedCallback === "function"
            ) {
              await parentProto.attributeChangedCallback.call(
                this,
                name,
                oldVal,
                newVal
              );
            }
          }
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
