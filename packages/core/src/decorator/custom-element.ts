import parseAttributeValue, {
  parseDefaultValue,
} from "../utils/parseAttributeValue";
import { StylesheetCache } from "../stores";
import { finalize, resolveDefault } from "../schema";
import type { ClassMeta, DeclaredType, PropertyDecl } from "../schema";
import { html } from "../utils/html";
import { reportError } from "../utils/diagnostics";
import type { EaElement, EaElementConstructor } from "../types/index";
import {
  GlobalCustomElements,
  GlobalHTMLElement,
  isDevelopment,
} from "@utils/env";
import { setHTML } from "@utils/html";

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
 * 记录被显式设置为 false 的布尔属性
 * 键：组件实例
 * 值：被显式置为 false 的属性名集合
 */
const BooleanFalseAttrsMap: WeakMap<
  GlobalHTMLElement,
  Set<string>
> = new WeakMap();

/**
 * 已完成字段初值捕获的类元数据，每个类只捕获一次
 */
const CapturedMetas = new WeakSet<ClassMeta>();

/**
 * 获取自定义元素类的原型链（不含 HTMLElement），按基类到派生类排序
 * @param customElementClass 自定义元素类
 * @returns 原型链上的类数组
 */
function getClassChain(customElementClass: any): any[] {
  const chain: any[] = [];
  let current: any = customElementClass;
  while (current && current !== GlobalHTMLElement) {
    chain.unshift(current);
    current = Object.getPrototypeOf(current);
  }
  return chain;
}

/**
 * 创建属性的 getter 函数（映射到 HTML attribute）
 * @param attrName 读取的 attribute 名
 * @param defaultValue 默认值
 * @param type 属性类型
 */
function createAttributeGetter(
  attrName: string,
  defaultValue: any,
  type: DeclaredType
) {
  return function (this: EaElement & GlobalHTMLElement) {
    const attrValue = this.getAttribute(attrName);

    if (type === Boolean) {
      if (attrValue !== null) {
        return attrValue === "true" || attrValue === "";
      }
      if (this.isConnected) {
        return false;
      }
      return parseDefaultValue(this, defaultValue);
    } else if (attrValue !== null) {
      return parseAttributeValue(this, attrValue, type, defaultValue);
    }

    return parseDefaultValue(this, defaultValue);
  };
}

/**
 * 创建属性的 setter 函数（映射到 HTML attribute）
 * @param attrName 要读写的 attribute 名
 */
function createAttributeSetter(attrName: string) {
  return function (this: EaElement & GlobalHTMLElement, newVal: any) {
    if (!(this instanceof GlobalHTMLElement)) return;

    if (typeof newVal === "boolean") {
      if (newVal) {
        this.setAttribute(attrName, "");
        BooleanFalseAttrsMap.get(this)?.delete(attrName);
      } else {
        this.removeAttribute(attrName);
        let marked = BooleanFalseAttrsMap.get(this);
        if (!marked) {
          marked = new Set();
          BooleanFalseAttrsMap.set(this, marked);
        }
        marked.add(attrName);
      }
    } else {
      this.setAttribute(attrName, String(newVal));
    }
  };
}

/**
 * 生成纯 JS 属性的内部存储键
 * @param name 属性名
 * @returns 内部存储键
 */
function getPropertyStorageKey(name: string): string {
  return `__prop_${name}`;
}

/**
 * 创建属性的 getter 函数（不映射到 HTML attribute，仅作为 JS 属性）
 * @param name 属性名
 * @param defaultValue 默认值
 */
function createPropertyGetter(name: string, defaultValue: any) {
  const storageKey = getPropertyStorageKey(name);
  return function (this: any) {
    return storageKey in this ? this[storageKey] : defaultValue;
  };
}

/**
 * 创建属性的 setter 函数（不映射到 HTML attribute，仅作为 JS 属性）
 * @param name 属性名
 * @param observer 可选的观察者回调
 * @param decl 属性声明，用于声明式 a11y / forward 同步
 */
function createPropertySetter(
  name: string,
  observer?: (newVal: any, oldVal: any) => void,
  decl?: PropertyDecl
) {
  const storageKey = getPropertyStorageKey(name);
  return function (this: any, newVal: any) {
    const oldVal = this[storageKey];
    this[storageKey] = newVal;

    this._beginUpdate?.();

    let observerResult: unknown;

    try {
      if (observer) {
        observerResult = observer.call(this, newVal, oldVal);
      }

      if (decl) {
        applyDeclaredSync(this, decl, newVal);
      }

      this.requestUpdate?.(name, oldVal, newVal);
    } catch (e) {
      this._endUpdate?.();
      throw e;
    }

    if (
      observerResult &&
      typeof (observerResult as Promise<void>).then === "function"
    ) {
      return (observerResult as Promise<void>).finally(() =>
        this._endUpdate?.()
      );
    }

    this._endUpdate?.();
  };
}

/**
 * 解析属性同步的目标元素
 * @param instance 组件实例
 * @param target ':host'（默认）、同名实例成员或选择器
 * @returns 目标元素
 */
function resolveTargetElement(instance: any, target?: string): any {
  if (!target || target === ":host") return instance;

  const member = instance[target];
  if (member instanceof GlobalHTMLElement) return member;

  return instance.shadowRoot?.querySelector(target) ?? null;
}

/**
 * 把一个值同步为元素的属性
 * @param instance 组件实例
 * @param target 目标元素描述
 * @param attr 属性名
 * @param value 当前值
 * @param map 值映射函数，返回 null 时移除属性
 * @param sourceAttr 源属性名，用于避开回写自身
 */
function forwardAttribute(
  instance: any,
  target: string | undefined,
  attr: string,
  value: any,
  map?: (val: any) => string | null,
  sourceAttr?: string
): void {
  const targetEl = resolveTargetElement(instance, target);
  if (!targetEl) return;

  // 转发回自身的同名属性会重复触发回调
  if (targetEl === instance && attr === sourceAttr) return;

  const next = value == null ? null : map ? map(value) : String(value);

  if (next == null) {
    targetEl.removeAttribute(attr);
  } else {
    targetEl.setAttribute(attr, next);
  }
}

/**
 * 按声明同步属性值
 * `a11y` 与 `forward` 共用同一条转发链路，避免两处歧义
 * @param instance 组件实例
 * @param decl 属性声明
 * @param value 当前值
 * @param sourceAttr 源属性名，避免回写自身
 */
function applyDeclaredSync(
  instance: any,
  decl: PropertyDecl,
  value: any,
  sourceAttr?: string
): void {
  if (decl.a11y) {
    forwardAttribute(
      instance,
      decl.a11y.target,
      decl.a11y.ariaAttr,
      value,
      decl.a11y.map,
      sourceAttr
    );
  }

  if (decl.forward) {
    forwardAttribute(
      instance,
      decl.forward.target,
      decl.forward.attr,
      value,
      decl.forward.map,
      sourceAttr
    );
  }
}

/**
 * 首次同步声明式 a11y 属性
 * 目标元素可能刚由 `mount()` 建好，构造期同步会空跑
 * @param instance 组件实例
 * @param meta 类元数据
 */
function syncAllDeclared(instance: any, meta: ClassMeta): void {
  for (const [name, entry] of meta.props) {
    if (!entry.decl.a11y) continue;

    applyDeclaredSync(instance, { a11y: entry.decl.a11y }, instance[name]);
  }
}

/**
 * 定义响应式属性（映射到 HTML attribute）
 * @param instance 组件实例
 * @param name 属性名
 * @param attrName 观察的 attribute 名
 * @param type 属性类型
 * @param defaultValue 默认值
 */
function defineReactiveAttribute(
  instance: any,
  name: string,
  attrName: string,
  type: DeclaredType,
  defaultValue: any
): void {
  if (Object.getOwnPropertyDescriptor(instance, name)) {
    delete instance[name];
  }

  Object.defineProperty(instance, name, {
    get: createAttributeGetter(attrName, defaultValue, type),
    set: createAttributeSetter(attrName),
    configurable: true,
    enumerable: true,
  });
}

/**
 * 在 accessor 安装前捕获字段初值，作为未写 `default` 时的默认值
 *
 * 存在 own descriptor 说明该字段写了初始化器；只读值，不写回宿主 attribute。
 * @param instance 组件实例（字段初始化已完成）
 * @param meta 类元数据
 */
function captureFieldDefaults(instance: any, meta: ClassMeta): void {
  if (CapturedMetas.has(meta)) return;

  CapturedMetas.add(meta);

  for (const name of meta.props.keys()) {
    const descriptor = Object.getOwnPropertyDescriptor(instance, name);

    if (!descriptor || !("value" in descriptor)) continue;

    meta.inferred.set(name, descriptor.value);
  }
}

/**
 * 初始化布尔属性的默认值
 * @param instance 组件实例
 * @param meta 类元数据
 */
function initBooleanDefaults(instance: any, meta: ClassMeta): void {
  for (const [name, entry] of meta.props) {
    const attrName = entry.attributeName;

    if (!attrName || entry.decl.type !== Boolean) continue;
    if (resolveDefault(meta, name) !== true) continue;
    if (BooleanFalseAttrsMap.get(instance)?.has(attrName)) continue;

    if (!instance.hasAttribute(attrName)) {
      instance.toggleAttribute(attrName, true);
    }
  }
}

/**
 * 定义响应式属性（不映射到 HTML attribute，仅作为 JS 属性）
 * @param instance 组件实例
 * @param name 属性名
 * @param defaultValue 默认值
 * @param observer 可选的观察者回调
 * @param decl 属性声明，用于声明式 a11y / forward 同步
 */
function defineReactiveProperty(
  instance: any,
  name: string,
  defaultValue: any,
  observer?: (newVal: any, oldVal: any) => void,
  decl?: PropertyDecl
): void {
  if (Object.getOwnPropertyDescriptor(instance, name)) {
    delete instance[name];
  }

  Object.defineProperty(instance, name, {
    get: createPropertyGetter(name, defaultValue),
    set: createPropertySetter(name, observer, decl),
    configurable: true,
    enumerable: true,
  });

  if (decl?.a11y) {
    // accessor 已安装，取值即默认值；目标不是 :host 时会在挂载后补同步
    applyDeclaredSync(instance, { a11y: decl.a11y }, instance[name]);
  }
}

/**
 * 收集并应用组件样式
 * @param classChain 组件类的原型链
 * @param shadowRoot 组件的 ShadowRoot
 */
function applyStyles(classChain: any[], shadowRoot: ShadowRoot | null): void {
  if (!shadowRoot) return;

  const allStyles: string[] = [];
  classChain.forEach(cls => {
    const classOptions = cls.customElementOptions;
    if (classOptions?.styles) {
      const classStyles = Array.isArray(classOptions.styles)
        ? classOptions.styles
        : [classOptions.styles];
      allStyles.push(...classStyles);
    }
  });

  const uniqueStyles = [...new Set(allStyles)];

  if (uniqueStyles.length === 0) return;

  if (
    "adoptedStyleSheets" in ShadowRoot.prototype &&
    shadowRoot.adoptedStyleSheets !== undefined
  ) {
    const sheets = uniqueStyles.map(css => StylesheetCache.getOrCreate(css));
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
  element: EaElement & GlobalHTMLElement,
  shadowRoot: ShadowRoot | null
): void {
  if (!shadowRoot) return;

  const template = element.html?.();
  if (!template) return;

  const sanitizedTemplate = html(template);
  const templateEl = document.createElement("template");
  setHTML(templateEl, sanitizedTemplate);

  // 将内容追加到 shadowRoot
  shadowRoot.appendChild(templateEl.content);
}

/**
 * 挂载组件 - 应用样式并渲染模板
 * @param element 组件实例
 * @param classChain 组件类的原型链
 */
function mount(
  element: EaElement & GlobalHTMLElement,
  classChain: any[]
): void {
  const shadowRoot = element.shadowRoot;
  if (!shadowRoot) return;

  setHTML(shadowRoot, "");

  applyStyles(classChain, shadowRoot);
  renderTemplate(element, shadowRoot);
}

/**
 * 解析并声明自定义元素的 observedAttributes
 * 名字来自合并后的元数据，只含小写连字符
 * @param customElementClass 自定义元素类
 * @param options 装饰器选项
 * @param meta 类元数据
 * @returns 观察的属性名列表
 */
function setupObservedAttributes(
  customElementClass: EaElementConstructor,
  options: CustomElementOptions,
  meta: ClassMeta
): string[] {
  const extra = (Array.isArray(options.extraAttr) ? options.extraAttr : [])
    .map(attr => attr.toLowerCase())
    .filter(Boolean);

  const observedAttributes = [...new Set([...meta.observed, ...extra])];

  Object.defineProperty(customElementClass, "observedAttributes", {
    get: () => observedAttributes,
    configurable: true,
    enumerable: true,
  });

  return observedAttributes;
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

    const meta = finalize(CustomElementClass);
    const observedAttributes = setupObservedAttributes(
      CustomElementClass,
      options,
      meta
    );
    const classChain = getClassChain(CustomElementClass);

    class EaCustomElement extends CustomElementClass {
      static get observedAttributes() {
        return observedAttributes;
      }

      constructor() {
        super();

        // 字段初始化已完成、accessor 尚未安装，此时字段初值仍是普通 own property
        captureFieldDefaults(this, meta);

        for (const [name, entry] of meta.props) {
          const attrName = entry.attributeName;
          const defaultValue = resolveDefault(meta, name);

          if (attrName !== null) {
            defineReactiveAttribute(
              this,
              name,
              attrName,
              entry.decl.type,
              defaultValue
            );
          } else {
            defineReactiveProperty(
              this,
              name,
              defaultValue,
              entry.decl.observer,
              entry.decl
            );
          }
        }

        // 每轮更新末尾按声明补同步（目标元素可能刚建好）
        (this as any).$syncDeclared = () => syncAllDeclared(this, meta);
      }

      connectedCallback() {
        initBooleanDefaults(this, meta);

        mount(this, classChain);

        syncAllDeclared(this, meta);

        const parentProto: any = CustomElementClass.prototype;
        if (typeof parentProto.connectedCallback === "function") {
          parentProto.connectedCallback.call(this);
        }
      }

      async attributeChangedCallback(
        name: string,
        oldVal: string | null,
        newVal: string | null
      ): Promise<void> {
        (this as any)._beginUpdate?.();

        try {
          const parentProto: any = CustomElementClass.prototype;
          const actualName = meta.attrToProp.get(name);
          const entry =
            actualName !== undefined ? meta.props.get(actualName) : undefined;

          if (entry && actualName !== undefined) {
            const decl = entry.decl;
            const defaultValue = resolveDefault(meta, actualName);
            let newValue: any;
            let oldValue: any;

            if (decl.type === Boolean) {
              newValue = newVal !== null && newVal !== "false";
              oldValue = oldVal === null ? null : oldVal !== "false";
            } else {
              newValue = parseAttributeValue(
                this,
                newVal,
                decl.type,
                defaultValue
              );
              oldValue =
                oldVal === null
                  ? null
                  : parseAttributeValue(this, oldVal, decl.type, defaultValue);
            }

            if (typeof parentProto.attributeChangedCallback === "function") {
              await parentProto.attributeChangedCallback.call(
                this,
                actualName,
                oldValue,
                newValue
              );
            }

            await decl.observer?.call(this, newValue, oldValue);

            applyDeclaredSync(this, decl, newValue, actualName);
          } else if (
            typeof parentProto.attributeChangedCallback === "function"
          ) {
            await parentProto.attributeChangedCallback.call(
              this,
              name,
              oldVal,
              newVal
            );
          }
        } catch (e) {
          if (isDevelopment()) {
            reportError("custom-element", e, this);
          }
        } finally {
          (this as any)._endUpdate?.();
        }
      }
    }

    if (autoDefine && !GlobalCustomElements.get(elementName)) {
      GlobalCustomElements.define(elementName, EaCustomElement);
    }
  };
}

export { CustomElement };
