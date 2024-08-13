// @ts-nocheck
import Base from '../Base.js';
import '../ea-icon/index.js'
import { createSlotElement, createElement } from '../../utils/createElement.js';

import "../ea-option/index.js"
import "../ea-input/index.js"

const stylesheet = `

`;

export class EaSelect extends Base {
    #container;
    #selectInput;
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });

        shadowRoot.innerHTML = `
            <div class="ea-select_wrap" part="container">
                <ea-input type="text" part="input" readonly autocomplete="off">
                <span class="">
                    <slot></slot>
                </span>
                <div class="ea-select_dropdown-wrap">
                    1
                </div>
            </div>
        `;

        this.#container = this.shadowRoot.querySelector('.ea-select_wrap');
        this.#selectInput = this.shadowRoot.querySelector('ea-input');

        this.build(shadowRoot, stylesheet);
    }

    #init() {
        const that = this;

        this.setAttribute('data-ea-component', true);

        this.#selectInput.addEventListener('focus', (e) => {
            console.log(e.detail);
        });
    }

    connectedCallback() {
        this.#init();
    }
}

if (!customElements.get('ea-select')) {
    customElements.define('ea-select', EaSelect);
}