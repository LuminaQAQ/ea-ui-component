// @ts-nocheck
import { createSlotElement } from '../../utils/createElement.js';
import Base from '../Base.js';
import '../ea-icon/index.js';

const stylesheet = `
.ea-footer_wrap {
  box-sizing: border-box;
  padding: 0 20px;
  height: 60px;
  color: #333;
}
`;

export class EaFooter extends Base {
    #wrap;
    #slot;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('div');
        wrap.className = 'ea-footer_wrap';
        wrap.part = 'wrap';

        const slot = createSlotElement();
        wrap.appendChild(slot);

        this.#wrap = wrap;
        this.#slot = slot;

        this.build(shadowRoot, stylesheet);
        this.shadowRoot.appendChild(wrap);
    }

    // ------- height 底栏高度 -------
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

if (!customElements.get('ea-footer')) {
    customElements.define('ea-footer', EaFooter);
}