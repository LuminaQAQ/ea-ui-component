// @ts-nocheck
import { timeout } from "../utils/timeout";
import variable from "../themes/variable.scss?inline";
import "./ea-icon/index.js";

export default class Base extends HTMLElement {
    observedProps = [];

    static get observedAttributes() {
        return this.observedProps;
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this._isSyncingAttrToState = false;
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

    /**
     * 计算classlist
     * @param {string} block 块级元素名称
     * @param {object} classListObj classList对象
     * @returns {string} classList
     */
    computedClasslist(block, classListObj) {
        return [
            block,
            ...Object.entries(classListObj)
                .filter(([, value]) => value)
                .map(([key]) => block + key),
        ].join(" ");
    }

    /**
     * 创建响应式数据配置
     * @param {Object.<string, {
     *   type: (Function|Array<*>),
     *   default: any,
     *   observer?: (newVal: any, oldVal?: any) => void
     * }>} states 配置对象，每个 key 是一个响应式字段名
     * @returns {Object} 返回代理后的响应式状态对象
     */
    properties(states) {
        const _this = this;
        const _stateValues = {};

        for (const [key, config] of Object.entries(states)) {
            _stateValues[key] = config.default;
        }

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

            return rawValue ?? config.default;
        };

        const syncToAttr = (key, value) => {
            if (!_this._isSyncingStateToAttr) {
                _this._isSyncingStateToAttr = true;
                _this.toggleAttr(key, value);
                _this._isSyncingStateToAttr = false;
            }
        };

        return new Proxy(_stateValues, {
            get(target, key) {
                return target[key];
            },
            set(target, key, newValue) {
                const config = states[key];
                if (!config) return true;

                const parsedValue = parseValue(key, newValue);
                const oldValue = target[key];

                if (oldValue === parsedValue) return true;

                target[key] = parsedValue;

                syncToAttr(key, parsedValue);
                config.observer?.(parsedValue, oldValue);
                _this.$updated({ key, newVal: parsedValue, oldVal: oldValue });

                return true;
            },
        });
    }

    // ------- loading 属性 -------
    // #region
    get loading() {
        return this.getAttrBoolean("loading") || false;
    }

    set loading(value) {
        this.toggleAttribute("loading", value);
        if (!this.getAttrBoolean("disabled")) this.toggleAttribute("disabled", value);

        try {
            const loadingIcon = this.shadowRoot.querySelectorAll(`[part="loading-icon"]`);
            if (loadingIcon?.length > 0) {
                loadingIcon?.forEach((item) => item.remove());
            }

            if (value) {
                const loadingIcon = document.createElement("ea-icon");
                loadingIcon.id = "ea-loading-icon";
                loadingIcon.icon = "icon-spin6 animate-spin";
                loadingIcon.part = "loading-icon";
                this.shadowRoot.insertBefore(loadingIcon, this.shadowRoot.firstChild);
            }
        } catch (error) { }
    }
    // #endregion
    // ------- end -------

    attributeChangedCallback(name, oldVal, newVal) {
        if (oldVal === newVal || this._isSyncingStateToAttr) return;

        this._isSyncingAttrToState = true;

        if (this.state && name in this.state) {
            this.state[name] = newVal;
        }

        this._isSyncingAttrToState = false;
    }

    /** @abstract 组件挂载前调用 */
    $beforeMounted() { }

    /** @abstract 组件挂载后调用 */
    $mounted() { }

    /** @abstract 组件销毁前调用 */
    $beforeUnmounted() { }

    /** @abstract 组件销毁后调用 */
    $unmounted() { }

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

        this.addEventListener("keydown", (e) => {
            console.log(e.key, e.ctrlKey);
        });

        queueMicrotask(() => {
            // 组件挂载前
            this.$beforeMounted?.();
            this.dispatchEvent(
                new CustomEvent("beforeMount", {
                    detail: this,
                    bubbles: false,
                    composed: true,
                })
            );

            // 组件挂载后
            this.$mounted?.();
            this.dispatchEvent(
                new CustomEvent("mounted", {
                    detail: this,
                    bubbles: false,
                    composed: true,
                })
            );

            this.loading = this.loading;
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
     * @param {string} className class名
     */
    toggleAttribute(attr, flag, className) {
        if (flag) {
            this.setAttribute(attr, flag);

            if (className) this.dom.classList.add(className);
        } else {
            if (this.hasAttribute(attr)) this.removeAttribute(attr);
            if (className) this.dom.classList.remove(className);
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
    getAttrBoolean(attrName) {
        const attr = this.getAttribute(attrName);
        return attr === "true" || attr === "";
    }

    /**
     * 获取属性值，并转换为数字
     * @param {string} attrName 属性名
     * @returns {number}
     */
    getAttrNumber(attrName) {
        const attr = this.getAttribute(attrName);

        return attr ? Number(attr) : 0;
    }
}
