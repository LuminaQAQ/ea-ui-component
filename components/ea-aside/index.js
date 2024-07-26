// @ts-nocheck
import { createSlotElement } from '../../utils/createElement.js';
import Base from '../Base.js';
import '../ea-icon/index.js'

const stylesheet = `
.ea-aside_wrap {
  height: 100%;
  overflow: auto;
}
`;

export class EaAside extends Base {
    #wrap;
    #slot;
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('aside');
        wrap.className = 'ea-aside_wrap';
        wrap.part = 'wrap';

        const slot = createSlotElement();
        wrap.appendChild(slot);

        this.#wrap = wrap;
        this.#slot = slot;

        this.build(shadowRoot, stylesheet);
        this.shadowRoot.appendChild(wrap);
    }

    // ------- width 侧边栏宽度 -------
    // #region
    get width() {
        return this.getAttrNumber('width');
    }

    set width(value) {
        this.setAttribute('width', value);

        this.#wrap.style.width = `${value}px`;
    }
    // #endregion
    // ------- end -------

    #init() {
        const that = this;

        this.width = this.width;
    }

    connectedCallback() {
        this.#init();
    }
}

if (!customElements.get('ea-aside')) {
    customElements.define('ea-aside', EaAside);
}