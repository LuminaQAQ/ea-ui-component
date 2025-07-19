import Base from '../Base.js'

import stylesheet from './index.scss?inline';

export class EaText extends Base {
    observedProps = ["type", "size", "truncated", "line-clamp"];

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
            observer: (newVal) => {
                this.setAttribute('title', newVal);
            }
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
                this.title = this.innerText || '';
                this.style.setProperty('--ea-text-line-clamp', newVal)
                this.#container.className = this.updateContainerClasslist()
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
                ['--' + this.state.type]: this.state.type,
                ['--' + this.state.size]: this.state.size,
                ['--truncated']: this.state.truncated,
                ['--line-clamp']: this.state["line-clamp"] > 0,
            }
        );
    }

    constructor() {
        super();

        this.stylesheet = stylesheet;
    }

    // ------- title -------
    // #region
    get title() {
        return this.state.title;
    }

    set title(value) {
        this.state.title = value;
    }
    // #endregion
    // ------- end -------

    // ------- type -------
    // #region
    get type() {
        return this.state.type;
    }

    set type(value) {
        this.state.type = value;
    }
    // #endregion
    // ------- end -------

    // ------- tag -------
    // #region
    get tag() {
        return this.state.tag;
    }

    set tag(value) {
        this.state.tag = value;
    }
    // #endregion
    // ------- end -------

    // ------- size -------
    // #region
    get size() {
        return this.state.size;
    }

    set size(value) {
        this.state.size = value;
    }
    // #endregion
    // ------- end -------

    // ------- truncated -------
    // #region
    get truncated() {
        return this.state.truncated;
    }

    set truncated(value) {
        this.state.truncated = value;
    }
    // #endregion
    // ------- end -------

    // ------- "line-clamp" -------
    // #region
    get "line-clamp"() {
        return this.state["line-clamp"];
    }

    set "line-clamp"(value) {
        this.state["line-clamp"] = value;
    }
    // #endregion
    // ------- end -------

    $mounted() {
        this.tag = this.getAttribute('tag');


        this.shadowRoot.innerHTML = `
            <${this.tag} class="ea-text" part="container">
                <slot></slot>
            </${this.tag}>
        `;

        this.#container = this.shadowRoot.querySelector('.ea-text');

        this.type = this.getAttribute('type');
        this.size = this.getAttribute('size');
        this.truncated = this.getAttrBoolean('truncated');
        this["line-clamp"] = this.getAttrNumber('line-clamp');
    }
}

if (!window.customElements.get('ea-text')) {
    window.customElements.define('ea-text', EaText);
}