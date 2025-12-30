import variable from "../themes/variables.scss?inline";
import "./ea-icon/index.js";
import EaUtils from "@/utils/Utils";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

export default class Base extends HTMLElement {
  #stateConfigs = {};

  isMounted = true;
  static get observedAttributes() {
    return [];
  }

  props = {};

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    /** @type {HTMLElement} */
    this.shadowRoot;
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
        .map(([key]) => `${block}${key}`),
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
   *   props?: Boolean,
   *   observer?: (newVal: any, oldVal?: any) => void
   * }>} states 配置对象，每个 key 是一个响应式字段名
   * @returns {void}
   */
  properties = states => {
    const parseType = type => {
      if (type === Boolean) {
        return "Boolean";
      }

      if (type === Number) {
        return "Number";
      }

      if (type === String || Array.isArray(type)) {
        return "String";
      }

      if (type === RegExp) {
        return "RegExp";
      }

      if (type === Date) {
        return "Date";
      }

      if (type === Array) {
        return "Array";
      }

      if (typeof type === "object" && type !== null) {
        try {
          const realType = Object.entries(type).filter(_ =>
            typeof _[1] === "function" ? _[1]() : false
          )[0];

          return realType[0];
        } catch  {
          console.error(
            `[${this.tagName}] Every "type" entry must be a function. Received:`,
            type
          );
        }
      }

      return type;
    };

    const parseDefaultValue = defaultVal =>
      typeof defaultVal === "function"
        ? defaultVal()
        : defaultVal
          ? defaultVal
          : null;

    const parseValue = (key, rawValue) => {
      const config = states[key];
      const type = config?.type;

      if (key === "Array" || type === Array) {
        return rawValue;
      }

      if (type === Boolean) {
        return rawValue === "" || rawValue === "true" || rawValue === true;
      }

      if (type === Number) {
        const num = Number(rawValue);
        return isNaN(num) ? parseDefaultValue(config?.default) : num;
      }

      if (type === Date) {
        return new dayjs(rawValue);
      }

      if (Array.isArray(type)) {
        return type.includes(rawValue)
          ? rawValue
          : parseDefaultValue(config?.default);
      }

      if (type === RegExp) {
        return rawValue.match(type)
          ? JSON.stringify(rawValue)
          : parseDefaultValue(config?.default);
      }

      if (typeof type === "object" && type !== null) {
        const realType = Object.entries(type).filter(_ => _[1]());

        return realType && realType?.length
          ? parseValue(realType[0][0], rawValue)
          : [];
      }

      return rawValue || config?.default;
    };

    for (const [key, config] of Object.entries(states)) {
      const realKey = EaUtils.String.toLowerCamelCase(key);

      this.#stateConfigs[realKey] = config;

      if (Object.getOwnPropertyDescriptor(this, realKey)) {
        delete this[realKey];
      }

      if (config?.props) {
        Object.defineProperty(this, key, {
          get: () => {
            return parseValue(key, this.props?.[key] || config.default);
          },
          set: value => {
            const oldValue = this.props?.[key];
            this.props[key] = value;
            config?.observer?.(value, oldValue);
          },
          configurable: true,
          enumerable: true,
        });
      } else {
        Object.defineProperty(this, realKey, {
          get: () => {
            const type = parseType(config.type);

            return this[`getAttr${type}`](
              realKey,
              parseDefaultValue(config?.default)
            );
          },
          set: value => {
            this.setAttr(realKey, parseValue(realKey, value));
          },
          configurable: true,
          enumerable: true,
        });
      }
    }
  };

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
      if (this.#stateConfigs[name]?.props) return;
      const parseValue = (key, rawValue) => {
        const config = this.#stateConfigs[key];
        const type = config?.type;

        if (key === "Array" || type === Array) {
          return rawValue;
        }

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
          return rawValue.match(type)
            ? JSON.stringify(rawValue)
            : config.default;
        }

        return rawValue || config?.default;
      };

      this.#stateConfigs[name]?.observer?.(
        this[name],
        parseValue(name, oldVal)
      );
    } catch (e) {
      // eslint-disable-next-line no-undef
      if (process.env.NODE_ENV === "development" && this.isMounted) {
        console.error(e, this);
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
    this.emit("updated", {
      detail: data,
      bubbles: false,
      composed: true,
    });
  }

  connectedCallback() {
    this.adoptedStyle(this.stylesheet);
    this.tabIndex = this.getAttrNumber("tabindex") || 0;
    // this["loading-full"] = this["loading-full"];

    // this.addEventListener("keydown", (e) => {
    //   console.log(e.key, e.ctrlKey);
    // });
  }

  disconnectedCallback() {
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

  getAttrArray(attrName, defaultValue = []) {
    const attr = EaUtils.JSON.parse(this.getAttribute(attrName));

    return Array.isArray(attr) ? attr : attr ? [attr] : defaultValue;
  }

  getAttrDate(attrName, defaultValue) {
    /** @type {dayjs.Dayjs | Date | number} */
    let attr = this.getAttrNumber(attrName);

    if (isNaN(attr) || !attr) attr = dayjs(this.getAttrString(attrName));
    else attr = dayjs(attr);

    return attr.isValid() ? attr.valueOf() : defaultValue || null;
  }

  setAttr(attrName, value) {
    if (value || this.#stateConfigs[attrName].default || value === 0) {
      const stringify = EaUtils.JSON.stringify(value);
      this.setAttribute(
        attrName,
        Array.isArray(value) || (typeof value === "object" && value !== null)
          ? stringify
          : value
      );
    } else {
      this.removeAttribute(attrName);
    }
  }

  /**
   * 触发事件
   * @deprecated 使用 emit 代替
   * @param {String} eventName
   * @param {CustomEventInit} options
   */
  dispatchEvent(eventName, options) {
    super.dispatchEvent(new CustomEvent(eventName, options));
  }

  /**
   * 触发事件
   * @param {String} eventName
   * @param {CustomEventInit} options
   */
  emit = (eventName, options) => {
    super.dispatchEvent(new CustomEvent(eventName, options));
  };
}
