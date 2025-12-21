import Base from '../Base.js'

import stylesheet from './index.scss?inline';

export class EaText extends Base {
    static get observedAttributes() {
        return ["title", "type", "size", "truncated", "line-clamp", "tag"];
    }

    /** @type {HTMLElement} */
    #container;

    /** 
     * @typedef {Object} State
     * @property {string} title - 标题
     * @property {string} type - 文本类型
     * @property {string} size - 文本大小
     * @property {boolean} truncated - 文本是否截断
     * @property {number} line-clamp - 截断的行数
     * @property {string} tag - 文本标签 
     */
    /** @type {State} */
    state = this.properties({
        title: {
            type: String,
            default: '',
            observer: (newVal) => { }
        },
        type: {
            type: ['normal', 'primary', 'success', 'warning', 'danger', 'info'],
            default: 'normal',
            observer: (newVal) => {
                this.#container.className = this.updateContainerClasslist()
            }
        },
        size: {
            type: ['large', 'medium', 'small'],
            default: 'medium',
            observer: (newVal) => {
                this.#container.className = this.updateContainerClasslist()
            }
        },
        truncated: {
            type: Boolean,
            default: false,
            observer: (newVal) => {
                this.title = this.innerText || '';
                this.#container.className = this.updateContainerClasslist()
            }
        },
        "line-clamp": {
            type: Number,
            default: 0,
            observer: (newVal) => {
                if (newVal > 0) this.style.setProperty('--ea-text-line-clamp', newVal)
                this.#container.className = this.updateContainerClasslist()
                this.title = this.innerText || '';
            }
        },
        tag: {
            type: String,
            default: 'span',
            observer: (newVal) => { }
        }
    })

    /**
     * 获取 classlist 列表
     * @return {string} 属性值
     */
    updateContainerClasslist() {
        return this.computedClasslist('ea-text',
            {
                ['--' + this.type]: this.type,
                ['--' + this.size]: this.size,
                ['--truncated']: this.truncated,
                ['--line-clamp']: this["line-clamp"] > 0,
            }
        );
    }

    constructor() {
        super();

        this.isMounted = false;

        this.stylesheet = stylesheet;
    }

    $render() {
        this.shadowRoot.innerHTML = `
            <${this.tag} class="ea-text" part="container">
                <slot></slot>
            </${this.tag}>
        `;

        this.#container = this.shadowRoot.querySelector('.ea-text')

        this.isMounted = true;
    }

    connectedCallback() {
        super.connectedCallback();

        this.$render();

        this.tag = this.tag;
        this.title = this.title;
        this.type = this.type;
        this.size = this.size;
        this.truncated = this.truncated;
        this["line-clamp"] = this['line-clamp'];
    }
}

if (!window.customElements.get('ea-text')) {
    window.customElements.define('ea-text', EaText);
}