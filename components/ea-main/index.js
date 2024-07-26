// @ts-nocheck
import Base from '../Base.js';
import '../ea-icon/index.js'

import { createElement, createSlotElement } from "../../utils/createElement.js"

const stylesheet = `

`;

export class EaMain extends Base {
    #wrap;
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('main');
        wrap.className = 'ea-main_wrap';
        wrap.part = 'wrap';

        const slot = createSlotElement();
        wrap.appendChild(slot);

        this.#wrap = wrap;

        this.build(shadowRoot, stylesheet);
        this.shadowRoot.appendChild(wrap);

        this.style.flex = '1 0 auto';
    }

    #init() {
        const that = this;
    }

    connectedCallback() {
        this.#init();
    }
}

if (!customElements.get('ea-main')) {
    customElements.define('ea-main', EaMain);
}