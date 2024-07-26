// @ts-nocheck
import Base from '../Base.js';
import '../ea-icon/index.js'

import { createElement, createSlotElement } from "../../utils/createElement.js"

const stylesheet = `
.ea-main_wrap {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 20px;
  overflow: auto;
  color: #333;
}
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

        this.style.flex = '1';
    }

    #init() {
        const that = this;

        this.style.flex = '1';
    }

    connectedCallback() {
        this.#init();
    }
}

if (!window.customElements.get('ea-main')) {
    customElements.define('ea-main', EaMain);
}