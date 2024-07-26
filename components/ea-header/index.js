// @ts-nocheck
import Base from '../Base.js';
import '../ea-icon/index.js'

import { createElement, createSlotElement } from "../../utils/createElement.js"

const stylesheet = `
.ea-header_wrap {
  box-sizing: border-box;
  padding: 0 20px;
  height: 60px;
  color: #333;
}
`;

export class EaHeader extends Base {
    #wrap;
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('header');
        wrap.className = 'ea-header_wrap';
        wrap.part = 'wrap';

        const slot = createSlotElement();
        wrap.appendChild(slot);

        this.#wrap = wrap;

        this.build(shadowRoot, stylesheet);
        this.shadowRoot.appendChild(wrap);
    }

    // ------- height 顶栏高度 -------
    // #region
    get height() {
        return this.getAttrNumber('height') || 60;
    }

    set height(value) {
        this.setAttribute('height', value);

        this.#wrap.style.height = `${value}px`;
        this.#wrap.style.lineHeight = `${value}px`;
    }
    // #endregion
    // ------- end -------

    #init() {
        const that = this;

        this.height = this.height;
    }

    connectedCallback() {
        this.#init();
    }
}

if (!customElements.get('ea-header')) {
    customElements.define('ea-header', EaHeader);
}