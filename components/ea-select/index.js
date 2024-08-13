// @ts-nocheck
import Base from '../Base.js';
import '../ea-icon/index.js'
import { createSlotElement, createElement } from '../../utils/createElement.js';

const stylesheet = `

`;

export class EaSelect extends Base {
    #container;
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });

        shadowRoot.innerHTML = `
            <div class="ea-select_wrap" part="container">
                <slot></slot>
            </div>
        `;

        this.#container = shadowRoot.querySelector('.ea-select_wrap');

        this.build(shadowRoot, stylesheet);
    }

    #init() {
        const that = this;
    }

    connectedCallback() {
        this.#init();
    }
}

if (!customElements.get('ea-select')) {
    customElements.define('ea-select', EaSelect);
}