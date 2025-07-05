// @ts-nocheck

export default class Base extends HTMLElement {
    static get observedAttributes() {
        return this.observedProps;
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    /**
     * 样式导入
     * @param {string} stylesheet 静态样式（vite:`xxx.css?inline`）
     */
    adoptedStyle(stylesheet) {
        const sheet = new CSSStyleSheet();
        sheet.replaceSync(stylesheet);
        this.shadowRoot.adoptedStyleSheets = [sheet];
    }

    /**
     * 响应式数据
     * @param {Object} states 需要被响应式的数据
     * @returns {states} 返回被代理后的值
     */
    properties(states) {
        const _this = this;
        const _states = {};

        for (const [key, config] of Object.entries(states)) {
            _states[key] = config?.value;
        }

        return new Proxy(_states, {
            get(target, key) {
                let value;

                switch (states[key]?.type) {
                    case Boolean: value = _this.getAttrBoolean(key); break;
                    case Number: value = _this.getAttrNumber(key); break;
                    default: value = _this.getAttribute(key); break;
                }

                return value || states[key]?.default;
            },
            set(target, key, value) {
                value = value || states[key]?.default;

                if (target[key] === value) return true;

                _this.$updated({ key, newVal: value, oldVal: target[key] });

                _this.setAttribute(key, value);
                target[key] = value;
                states[key]?.observer(value);

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
        if (oldVal === newVal) return;

        this.state[name] = newVal;
        this.$updated({
            key: name,
            newVal,
            oldVal,
        });
    }

    connectedCallback() {
        setTimeout(() => {
            // 组件挂载前
            this.$beforeMounted?.();
            this.dispatchEvent(new CustomEvent('beforeMount', {
                detail: this,
                bubbles: false,
                composed: true,
            }));

            // 组件挂载后
            this.$mounted?.();
            this.dispatchEvent(new CustomEvent('mounted', {
                detail: this,
                bubbles: false,
                composed: true,
            }));
        }, 0);
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