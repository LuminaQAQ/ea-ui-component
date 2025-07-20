import Base from '../../../Base.js'

import stylesheet from './index.scss?inline';

export class EaFooter extends Base {
    /** @type {HTMLElement} */
    #container;

    static get observedAttributes() {
        return ['height'];
    }

    /** 
     * @typedef {Object} State
     */
    /** @type {State} */
    state = this.properties({
        height: {
            type: String,
            default: '60px',
            observer: (newVal) => {
                this.style.setProperty('--ea-footer-height', newVal);
            }
        },
    })

    /**
     * 获取 classlist 列表
     * @return {string} 属性值
     */
    updateContainerClasslist() {
        return this.computedClasslist('ea-footer',
            {
                // ['--' + this.state.type]: this.state.type,
            });
    }

    constructor() {
        super();

        this.stylesheet = stylesheet;

        this.$render();
    }

    $render() {
        this.shadowRoot.innerHTML = `
            <footer class="ea-footer" part="container">
                <slot></slot>
            </footer>
        `;

        this.#container = this.shadowRoot.querySelector('.ea-footer');
    }

    connectedCallback() {
        super.connectedCallback();

        this.height = this.height;
    }
}

if (!window.customElements.get('ea-footer')) {
    window.customElements.define('ea-footer', EaFooter);
}