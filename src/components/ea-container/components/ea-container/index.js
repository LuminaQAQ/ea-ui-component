import Base from '../../../Base.js';

import stylesheet from './index.scss?inline';

export class EaContainer extends Base {
    /** @type {HTMLElement} */
    #container;

    static get observedAttributes() {
        return ["direction"];
    }

    /** 
     * @typedef {Object} State
     * @property {string} direction 排列方向
     */
    /** @type {State} */
    state = this.properties({
        direction: {
            type: ['horizontal', 'vertical'],
            default: 'horizontal',
            observer: (newVal) => {
                this.style.setProperty('--ea-container-direction', newVal === 'vertical' ? 'column' : 'row');
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
            <div class="ea-container" part="container">
                <slot></slot>
            </div>
        `;

        this.#container = this.shadowRoot.querySelector('.ea-container');
    }

    connectedCallback() {
        super.connectedCallback();

        const children = [...this.children].map(item => item.tagName.toLowerCase());

        if (children.includes("ea-header") || children.includes("ea-footer")) this.direction = "vertical";
        else this.direction = "horizontal";
    }
}


if (!customElements.get('ea-container')) {
    customElements.define('ea-container', EaContainer);
}