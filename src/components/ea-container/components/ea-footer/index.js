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
    }
}

if (!window.customElements.get('ea-footer')) {
    window.customElements.define('ea-footer', EaFooter);
}