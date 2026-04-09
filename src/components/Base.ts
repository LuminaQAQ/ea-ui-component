import { html } from "@/directives/html";
import variable from "@/themes/variables.scss?inline";
import "./ea-icon/index";
import EaUtils from "@/utils/Utils";
import { customElement } from "@/decorator/custom-element";
import { attribute, propertyMap } from "@/decorator/attribute";
import {
  EaBaseElementConstructor,
  AttributeOptions,
  ShadowRootElement,
} from "@/types";
import { parseAttributeValue } from "@/utils/parseAttributeValue";
import { createGetter, createSetter } from "@/utils/propertyHelpers";

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

    // 没有 attribute，返回默认值
    return defaultValue;
  };
}

/**
 * 创建属性的 setter 函数
 */
function createSetter(
  name: string,
  isInitialized: boolean,
  type: AttributeOptions["type"]
) {
  return function (this: ShadowRootElement, newVal: any, oldVal: any) {
    if (!(this instanceof HTMLElement)) return;

    // 转换值为正确类型
    const convertedNewVal =
      newVal !== undefined
        ? parseAttributeValue(String(newVal), type)
        : undefined;
    const convertedOldVal =
      oldVal !== undefined
        ? parseAttributeValue(String(oldVal), type)
        : undefined;

    if (isInitialized) {
      // 已初始化：更新 attribute 并触发 observer
      this.setAttribute(name, String(newVal));

      const cb = this.constructor.__observedAttributesCallback[name];
      if (cb) {
        cb.call(this, convertedNewVal, convertedOldVal);
      }
    } else {
      // 初始化阶段：只更新 attribute，不触发 observer
      this.setAttribute(name, String(newVal));
    }
  };
}

@customElement("ea-base", { autoDefine: false })
export default class Base extends HTMLElement {
  /** @description 观察属性回调映射 */
  static __observedAttributesCallback: EaBaseElementConstructor["__observedAttributesCallback"] =
    {};
  /** @description 观察属性列表 */
  static __observedAttributes: EaBaseElementConstructor["__observedAttributes"] =
    [];

  /** @description 观察属性列表 */
  static get observedAttributes() {
    return this.__observedAttributes;
  }

  /**
   * 语言设置
   * @default "en-US"
   */
  @attribute({
    type: String,
    observer(this: Base, locale: string) {
      this.$updateLocalization(locale);
    },
  })
  locale: string = "en-US";

  /** 组件是否已挂载 */
  isMounted = true;

  /** 内部 props 对象 */
  props: Record<string, any> = {
    locale: "en-US",
  };

  private get _clsName() {
    return this.constructor.name;
  }
  private _isAttrinbuePropertyInitialized = false;

  /** 存储属性的默认值 */
  private _defaultValues: Map<string, any> = new Map();

  /**
   * 收集属性的默认值（从类字段初始化）
   * 在构造函数中调用，保存默认值后删除类字段，避免触发 setter
   */
  private _collectDefaultValues = async () => {
    const propertyOptions = propertyMap.get(this._clsName);

    if (propertyOptions) {
      Object.keys(propertyOptions).forEach(name => {
        const currentValue = (this as any)[name];
        this._defaultValues.set(name, currentValue);

        delete (this as any)[name];

        (this as any)[name];
      });
    }
  };

  /**
   * 定义响应式属性
   * 在 constructor 中调用，完成属性定义
   * 实现 attribute 和 property 的双向绑定
   */
  private _defineReactiveProperties = () => {
    const propertyOptions = propertyMap.get(this._clsName);
    if (propertyOptions) {
      console.log(propertyOptions);

      Object.keys(propertyOptions).forEach(name => {
        const { type } = propertyOptions[name];
        const defaultValue = this._defaultValues.get(name);

        // 定义响应式属性
        Object.defineProperty(this, name, {
          get: createGetter(defaultValue, name, type),
          set: createSetter(name, this._isAttrinbuePropertyInitialized, type),
          configurable: true,
          enumerable: true,
        });
      });
    }
  };

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    requestAnimationFrame(() => {
      this._collectDefaultValues();
      this._defineReactiveProperties();
    });
  }

  // ==================== 样式管理 ====================

  /**
   * 采用样式表 - 将样式添加到组件的 Shadow DOM
   * @param stylesheet CSS 样式字符串（vite: `xxx.scss?inline`）
   */
  adoptedStyle(stylesheet: string): void {
    const sheet = new CSSStyleSheet();
    const variableSheet = new CSSStyleSheet();
    sheet.replaceSync(stylesheet);
    variableSheet.replaceSync(variable);

    this.shadowRoot!.adoptedStyleSheets = [sheet, variableSheet];
  }

  /**
   * 追加样式表 - 在现有样式基础上添加新样式
   * @param stylesheet CSS 样式字符串
   */
  assignedStyle(stylesheet: string): void {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(stylesheet);

    this.shadowRoot!.adoptedStyleSheets = [
      ...this.shadowRoot!.adoptedStyleSheets,
      sheet,
    ];
  }

  // ==================== 工具方法 ====================

  /**
   * 计算 CSS 类名列表
   * @param block 块级元素名称
   * @param modifierClassListObj 修饰符类名对象
   * @param stateClassListObj 状态类名对象
   * @returns 合并后的类名字符串
   */
  computedClasslist(
    block = "",
    modifierClassListObj: Record<string, boolean> = {},
    stateClassListObj: Record<string, boolean> = {}
  ): string {
    return [
      block,
      ...Object.entries(modifierClassListObj)
        .filter(([, value]) => value)
        .map(([key]) => `${block}${key}`),
      ...Object.entries(stateClassListObj)
        .filter(([, value]) => value)
        .map(([key]) => `is-${key}`),
    ].join(" ");
  }

  // ==================== 生命周期回调 ====================

  /**
   * 属性变化回调
   * @param name 属性名
   * @param oldVal 旧值
   * @param newVal 新值
   */
  attributeChangedCallback(
    name: string,
    oldVal: string | null,
    newVal: string | null
  ): void {
    // 获取属性配置
    const clsName = this.constructor.name;
    const propertyOptions = propertyMap.get(clsName);
    const attrOption = propertyOptions?.[name];

    // 转换值类型
    const convertedNewVal = attrOption
      ? parseAttributeValue(newVal, attrOption.type)
      : newVal;
    const convertedOldVal = attrOption
      ? parseAttributeValue(oldVal, attrOption.type)
      : oldVal;

    // 触发 observer 回调（等待初始化完成后）
    const cb = (this.constructor as EaBaseElementConstructor)
      .__observedAttributesCallback[name];
    if (cb) {
      // 使用 requestAnimationFrame 确保 DOM 已更新
      requestAnimationFrame(() => {
        cb.call(this, convertedNewVal, convertedOldVal);
      });
    }
  }

  /**
   * 渲染 HTML 模板
   * @param value HTML 字符串
   */
  html(value: string) {
    return html(value);
  }

  // ==================== 抽象方法 ====================

  /**
   * 更新组件语言（子类实现）
   * @param locale 语言代码
   */
  $updateLocalization(locale: string): void {}

  /** 组件渲染（子类实现） */
  $render(): void {}

  /** 组件销毁前调用（子类实现） */
  $beforeUnmounted(): void {}

  /** 组件销毁后调用（子类实现） */
  $unmounted(): void {}

  /**
   * 组件更新回调
   * @param data 更新数据
   */
  $updated(data: { key: any; newVal: any; oldVal?: any }): void {
    this.emit("updated", {
      detail: data,
      bubbles: false,
      composed: true,
    });
  }

  // ==================== 生命周期钩子 ====================

  connectedCallback(): void {
    // @ts-ignore - stylesheet 由子类提供
    this.adoptedStyle(this.stylesheet);
    this.tabIndex = this.getAttrNumber("tabindex") || 0;

    // 标记属性初始化完成，后续 setter 调用将触发 observer
    this._isAttrinbuePropertyInitialized = true;

    this.$render();
  }

  disconnectedCallback(): void {
    // 组件销毁前
    this.$beforeUnmounted?.();
    this.emit("beforeUnmount", {
      detail: this,
      bubbles: false,
      composed: true,
    });

    // 组件销毁
    this.$unmounted?.();
    this.emit("unmounted", {
      detail: this,
      bubbles: false,
      composed: true,
    });
  }

  // ==================== 属性获取方法 ====================

  /**
   * 获取布尔类型属性值
   * @param attrName 属性名
   * @param defaultValue 默认值
   */
  getAttrBoolean(attrName: string, defaultValue = false): boolean {
    const attr = this.getAttribute(attrName);
    if (attr === "true" || attr === "") return true;
    if (attr === "false") return false;
    return defaultValue;
  }

  /**
   * 获取数字类型属性值
   * @param attrName 属性名
   * @param defaultValue 默认值
   */
  getAttrNumber(attrName: string, defaultValue = 0): number {
    const attr = this.getAttribute(attrName);
    const num = Number(attr);
    return !isNaN(num) && attr !== null ? num : defaultValue;
  }

  /**
   * 获取字符串类型属性值
   * @param attrName 属性名
   * @param defaultValue 默认值
   */
  getAttrString(attrName: string, defaultValue = ""): string {
    const attr = this.getAttribute(attrName);
    if (!attr || attr === "null") return defaultValue;
    return attr;
  }

  /**
   * 获取日期类型属性值
   * @param attrName 属性名
   * @param defaultValue 默认值
   */
  getAttrDate(attrName: string, defaultValue?: Date): Date | null {
    const num = this.getAttrNumber(attrName);
    const str = this.getAttrString(attrName);
    const dateValue = num || str;
    const date = new Date(dateValue);
    return isNaN(date.getTime()) ? defaultValue || null : date;
  }

  /**
   * 设置属性值
   * @param attrName 属性名
   * @param value 属性值
   */
  setAttr(attrName: string, value: any): void {
    if (value !== undefined && value !== null && value !== "") {
      const stringify = EaUtils.JSON.stringify(value);
      this.setAttribute(
        attrName,
        Array.isArray(value) || (typeof value === "object" && value !== null)
          ? stringify
          : String(value)
      );
    } else {
      this.removeAttribute(attrName);
    }
  }

  /**
   * 切换属性
   * @param attr 属性名
   * @param flag 是否启用
   */
  toggleAttribute(attr: string, flag: boolean): boolean {
    if (flag) {
      this.setAttribute(attr, "");
      return true;
    } else {
      if (this.hasAttribute(attr)) {
        this.removeAttribute(attr);
        return true;
      }
      return false;
    }
  }

  // ==================== 事件系统 ====================

  /**
   * 触发自定义事件
   * @param eventName 事件名
   * @param options 事件选项
   */
  emit = (eventName: string, options?: CustomEventInit): boolean => {
    return super.dispatchEvent(new CustomEvent(eventName, options));
  };
}
