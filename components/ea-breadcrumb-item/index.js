// @ts-nocheck
import Base from '../Base.js';
import '../ea-icon/index.js'
import { createSlotElement, createElement } from '../../utils/createElement.js';

const stylesheet = `
.ea-breadcrumb-item_wrap {
  font-size: 14px;
  color: #606266;
  line-height: 1;
}
.ea-breadcrumb-item_wrap ::slotted(a) {
  text-decoration: none !important;
  font-weight: 600 !important;
  color: #303133 !important;
}
`;

export class EaBreadcrumbItem extends Base {
    #wrap;
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('span');
        wrap.className = 'ea-breadcrumb-item_wrap';
        wrap.part = 'wrap';

        const slot = createSlotElement();
        wrap.appendChild(slot);

        this.#wrap = wrap;

        this.build(shadowRoot, stylesheet);
        this.shadowRoot.appendChild(wrap);
    }

    #init() {
        const that = this;
    }

    connectedCallback() {
        this.#init();
    }
}

if (!customElements.get('ea-breadcrumb-item')) {
    customElements.define('ea-breadcrumb-item', EaBreadcrumbItem);
}