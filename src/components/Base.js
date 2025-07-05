// @ts-nocheck
import { timeout } from "../utils/timeout";
// import "./ea-icon/index.js"
import variable from "../themes/variable.scss?inline";

export default class Base extends HTMLElement {
    static get observedAttributes() {
        return this.observedProps;
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

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
        const _states = {};

        const getValue = (type, key, value) => {
            let targetValue = value;
            let targetType = type;

            if (type instanceof Array) targetType = Array;
            else if (typeof type === "boolean") targetType = Boolean;

            switch (targetType) {
                case Boolean: {
                    if (value === "true" || value === '') value = true;
                    else if (value === "false") value = false;

                    targetValue = typeof value === "boolean" ? value : _this.getAttrBoolean(key);

                    break;
                }
                case Number: targetValue = _this.getAttrNumber(key); break;
                case Array: targetValue = type.includes(value) ? targetValue : null; break;
                default: targetValue = _this.getAttribute(key); break;
            }

            return targetValue;
        };

        for (const [key, config] of Object.entries(states)) {
            _states[key] = config?.value;
        }

        return new Proxy(_states, {
            get(target, key) {
                const value = getValue(states[key]?.type, key, _states[key]);
                return value || states[key]?.default;
            },
            set(target, key, value) {
                value = getValue(states[key]?.type, key, value) || states[key]?.default;

                if (target[key] === value) return true;

                if (!_this._isSyncingAttrToState) {
                    _this.toggleAttr(key, value);

                    target[key] = value;
                    states[key]?.observer(value);

                    _this.$updated({ key, newVal: value, oldVal: target[key] });
                }

                return true;
            }
        });
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
        this.dispatchEvent(new CustomEvent('updated', {
            detail: data,
            bubbles: false,
            composed: true,
        }));
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (oldVal === newVal || this._isSyncingAttrToState) return;

        this._isSyncingAttrToState = true;
        this.state[name] = newVal;
        this._isSyncingAttrToState = false;

        this.$updated({
            key: name,
            newVal,
            oldVal,
        });
    }

    connectedCallback() {
        // 组件挂载前
        this.$beforeMounted?.();
        this.dispatchEvent(new CustomEvent('beforeMount', {
            detail: this,
            bubbles: false,
            composed: true,
        }));

        this.adoptedStyle(this.stylesheet);
        // 组件挂载后
        this.$mounted?.();
        this.dispatchEvent(new CustomEvent('mounted', {
            detail: this,
            bubbles: false,
            composed: true,
        }));
    }

    disconnectedCallback() {
        // 组件销毁前
        this.$beforeUnmounted?.();
        this.dispatchEvent(new CustomEvent('beforeUnmount', {
            detail: this,
            bubbles: false,
            composed: true,
        }));

        // 组件销毁
        this.$unmounted?.()
        this.dispatchEvent(new CustomEvent('unmounted', {
            detail: this,
            bubbles: false,
            composed: true,
        }));
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
        return attr === 'true' || attr === '';
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