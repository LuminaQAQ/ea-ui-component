// @ts-nocheck
import { timeout } from "../utils/timeout";
import variable from "../themes/variable.scss?inline";
import "./ea-icon/index.js";
import EaUtils from "@/utils/Utils";

export default class Base extends HTMLElement {
  #stateConfigs = {};

  isMounted = true;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    /** @type {HTMLElement} */
    this.shadowRoot;

    String.prototype.toLowerCamelCase = this.toLowerCamelCase;
  }

  /**
   * 样式导入
   * @param {string} stylesheet 静态样式（vite:`xxx.css?inline`）
   */
  adoptedStyle(stylesheet) {
    const sheet = new CSSStyleSheet();
    const variableSheet = new CSSStyleSheet();
    sheet.replaceSync(stylesheet);
    variableSheet.replaceSync(variable);

    this.shadowRoot.adoptedStyleSheets = [sheet, variableSheet];
  }

  assignedStyle(stylesheet) {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(stylesheet);

    this.shadowRoot.adoptedStyleSheets = [
      ...this.shadowRoot.adoptedStyleSheets,
      sheet,
    ];
  }

  /**
   * 计算classlist
   * @param {string} block 块级元素名称
   * @param {object} classListObj classList对象
   * @param {object} stateClassListObj 状态classList对象
   * @returns {string} classList
   */
  computedClasslist(
    block = "",
    modifierClassListObj = {},
    stateClassListObj = {}
  ) {
    return [
      block,
      ...Object.entries(modifierClassListObj)
        .filter(([, value]) => value)
        .map(([key]) => block + key),
      ...Object.entries(stateClassListObj)
        .filter(([, value]) => value)
        .map(([key]) => `is-${key}`),
    ].join(" ");
  }

  /**
   * 创建响应式数据配置
   * @param {Object.<string, {
   *   type: (Function|Array<*>),
   *   default: any,
   *   observer?: (newVal: any, oldVal?: any) => void
   * }>} states 配置对象，每个 key 是一个响应式字段名
   * @returns {void}
   */
  properties(states) {
    const parseType = (type) => {
      if (type === Boolean) {
        type = "Boolean";
      }

      if (type === Number) {
        type = "Number";
      }

      if (type === String || Array.isArray(type)) {
        type = "String";
      }

      if (type === RegExp) {
        type = "RegExp";
      }

      return type;
    };

    const parseValue = (key, rawValue) => {
      const config = states[key];
      const type = config?.type;

      if (type === Boolean) {
        return rawValue === "" || rawValue === "true" || rawValue === true;
      }

      if (type === Number) {
        const num = Number(rawValue);
        return isNaN(num) ? config.default : num;
      }

      if (Array.isArray(type)) {
        return type.includes(rawValue) ? rawValue : config.default;
      }

      if (type === RegExp) {
        return rawValue.match(type) ? JSON.stringify(rawValue) : config.default;
      }

      return rawValue || config?.default;
    };

    for (const [key, config] of Object.entries(states)) {
      const realKey = EaUtils.String.toLowerCamelCase(key);
      this.#stateConfigs[realKey] = config;

      Object.defineProperty(this, realKey, {
        get: () => {
          const type = parseType(config.type);

          return this[`getAttr${type}`](realKey, config.default);
        },
        set: (value) => {
          this.setAttr(realKey, parseValue(realKey, value));
        },
      });
    }
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (newVal === oldVal || !this.isMounted) return;

    // if (name === "loading-full") {

    //     try {
    //         const loadingIcon = this.shadowRoot.querySelectorAll(`[part="loading-full"]`);
    //         if (loadingIcon?.length > 0) {
    //             loadingIcon?.forEach((item) => item.remove());
    //         }

    //         if (value) {
    //             const loadingIcon = document.createElement("ea-icon");
    //             loadingIcon.id = "ea-loading-icon";
    //             loadingIcon.icon = "icon-spin6 animate-spin";
    //             loadingIcon.part = "loading-full";
    //             this.shadowRoot.insertBefore(loadingIcon, this.shadowRoot.firstChild);
    //         }
    //     } catch (error) { }

    //     return;
    // }

    try {
      this.#stateConfigs[name]?.observer?.(this[name]);
    } catch (e) {
      if (process.env.NODE_ENV === "development" && this.isMounted) {
        console.error(e);
      }
    }
  }

  // ------- loading-full 属性 -------
  // #region
  get "loading-full"() {
    return this.getAttrBoolean("loading-full") || false;
  }

  set "loading-full"(value) {
    this.toggleAttribute("loading-full", value);
    if (!this.getAttrBoolean("disabled"))
      this.toggleAttribute("disabled", value);
  }
  // #endregion
  // ------- end -------

  /** @abstract 组件渲染 */
  $render() {}

  /** @abstract 组件销毁前调用 */
  $beforeUnmounted() {}

  /** @abstract 组件销毁后调用 */
  $unmounted() {}

  /**
   *
   * @param {Object} data
   * @param {any} data.key 键
   * @param {any} data.newVal 值
   * @param {any} data.oldVal 旧值
   */
  $updated(data) {
    this.dispatchEvent(
      new CustomEvent("updated", {
        detail: data,
        bubbles: false,
        composed: true,
      })
    );
  }

  connectedCallback() {
    this.adoptedStyle(this.stylesheet);
    this.tabIndex = 0;
    this["loading-full"] = this["loading-full"];

    this.addEventListener("keydown", (e) => {
      //   console.log(e.key, e.ctrlKey);
    });
  }

  disconnectedCallback() {
    // 组件销毁前
    this.$beforeUnmounted?.();
    this.dispatchEvent(
      new CustomEvent("beforeUnmount", {
        detail: this,
        bubbles: false,
        composed: true,
      })
    );

    // 组件销毁
    this.$unmounted?.();
    this.dispatchEvent(
      new CustomEvent("unmounted", {
        detail: this,
        bubbles: false,
        composed: true,
      })
    );

    this.remove();
    this.state = null;
  }

  /**
   * 设置属性值，并切换className
   * @param {string} attr 属性名
   * @param {boolean} flag 属性值
   */
  toggleAttribute(attr, flag) {
    if (flag) {
      this.setAttribute(attr, flag);
    } else {
      if (this.hasAttribute(attr)) this.removeAttribute(attr);
    }
  }

  /**
   * 设置属性值
   * @param {string} attr 属性名
   * @param {boolean} flag 属性值
   */
  toggleAttr(attr, flag) {
    if (flag) {
      this.setAttribute(attr, flag);
    } else {
      this.removeAttribute(attr);
    }
  }

  /**
   * 获取属性值，并转换为布尔值
   * @param {string} attrName 属性名
   * @returns {boolean}
   */
  getAttrBoolean(attrName, defaultValue) {
    const attr = this.getAttribute(attrName);
    const isTrue = attr === "true" || attr === "";
    const isFasle = attr === "false";

    return isTrue ? true : isFasle ? false : defaultValue;
  }

  /**
   * 获取属性值，并转换为数字
   * @param {string} attrName 属性名
   * @returns {number}
   */
  getAttrNumber(attrName, defaultValue) {
    const attr = this.getAttribute(attrName);

    return attr ? Number(attr) : defaultValue || 0;
  }

  getAttrString(attrName, defaultValue) {
    const attr = this.getAttribute(attrName);

    return attr ? attr : defaultValue || "";
  }

  getAttrRegExp(attrName, defaultValue) {
    const attr = this.getAttribute(attrName);

    return attr ? new RegExp(attr) : defaultValue || null;
  }

  setAttr(attrName, value) {
    if (value || this.#stateConfigs[attrName].default) {
      this.setAttribute(attrName, value);
    } else {
      this.removeAttribute(attrName);
    }
  }

  /**
   * 触发事件
   * @param {String} eventName
   * @param {CustomEventInit} options
   */
  dispatchEvent(eventName, options) {
    super.dispatchEvent(new CustomEvent(eventName, options));
  }
}
