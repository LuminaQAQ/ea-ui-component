import Base from "../../../Base.js"

import stylesheet from './index.scss?inline';

export class EaCol extends Base {
    static get observedAttributes() {
        return ["span", "offset", "push", "pull", "tag"];
    }

    /** 
     * @typedef {Object} State
     * @property {Number} span 列数
     * @property {Number} offset 列偏移
     * @property {Number} push 列向右移动
     * @property {Number} pull 列向左移动
     */
    /** @type {State} */
    state = this.properties({
        span: {
            type: Number,
            default: 24,
            observer: (newVal) => {
                this.style.setProperty('--ea-col-span', newVal);
            }
        },
        offset: {
            type: Number,
            default: 0,
            observer: (newVal) => {
                this.style.setProperty('--ea-col-offset', newVal);
            }
        },
        push: {
            type: Number,
            default: 0,
            observer: (newVal) => {
                this.style.setProperty('--ea-col-push', newVal);
            }
        },
        pull: {
            type: Number,
            default: 0,
            observer: (newVal) => {
                this.style.setProperty('--ea-col-pull', newVal);
            }
        },
        tag: {
            type: String,
            default: 'div',
            observer: (newVal) => {
            }
        },
    })

    constructor() {
        super();
        this.stylesheet = stylesheet;

        this.$render();
    }

    $render() {
        this.shadowRoot.innerHTML = `
            <${this.tag} class="ea-row" part="container">
                <slot></slot>
            </${this.tag}>
        `;
    }

    connectedCallback() {
        super.connectedCallback();
    }
}

if (!window.customElements.get('ea-col')) {
    window.customElements.define('ea-col', EaCol);
}