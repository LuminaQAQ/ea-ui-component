// @ts-nocheck
import Base from '../Base.js';
import '../ea-icon/index.js'
import { createSlotElement, createElement } from '../../utils/createElement.js';

const stylesheet = `

`;

export class EaOption extends Base {
    #container;
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });

        shadowRoot.innerHTML = `
            <div class='ea-option_wrap' part='container'>
                <slot></slot>
            </div>
        `;

        this.#container = shadowRoot.querySelector('.ea-option_wrap');

        this.build(shadowRoot, stylesheet);
    }

    #init() {
        const that = this;
    }

    connectedCallback() {
        this.#init();
    }
}

if (!customElements.get('ea-option')) {
    customElements.define('ea-option', EaOption);
}