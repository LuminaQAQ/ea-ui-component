import Base from '../../../Base.js'

import stylesheet from './index.scss?inline';

export class EaHeader extends Base {

    static get observedAttributes() {
        return ['height'];
    }

    /** 
     * @typedef {Object} State
     * @property {string} height
     */
    /** @type {State} */
    state = this.properties({
        height: {
            type: String,
            default: '60px',
            observer: (newVal) => {
                this.style.setProperty('--ea-header-height', newVal);
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
            <header class="ea-header" part="container">
                <slot></slot>
            </header>
        `;
    }

    connectedCallback() {
        super.connectedCallback();

        this.height = this.height;
    }
}

if (!window.customElements.get('ea-header')) {
    window.customElements.define('ea-header', EaHeader);
}