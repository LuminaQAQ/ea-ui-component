// @ts-nocheck
import Base from '../Base';
import { createElement, createSlotElement } from '../../utils/createElement.js';

const stylesheet = `
@import url('/ea_ui_component/icon/index.css');

.ea-card_wrap {
  border-radius: 4px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  overflow: hidden;
  color: #303133;
  transition: box-shadow 0.3s;
}
.ea-card_wrap.is-always-shadow, .ea-card_wrap.is-hover-shadow:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.ea-card_wrap.is-never-shadow {
  box-shadow: none;
}
.ea-card_wrap .ea-card_content {
  padding: 20px;
}
`;

export class EaCard extends Base {
  #wrap;

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
    const wrap = document.createElement('div');
    wrap.className = 'ea-card_wrap';

    const headerSlot = createSlotElement('header');
    const header = createElement('div', 'ea-card_header', [headerSlot]);
    wrap.appendChild(header);

    const contentSlot = document.createElement('slot');
    const content = createElement('div', 'ea-card_content', [contentSlot]);
    wrap.appendChild(content);

    this.#wrap = wrap;


    this.build(shadowRoot, stylesheet);
    this.shadowRoot.appendChild(wrap);
  }

  // ------- shadow 阴影属性 -------
  // #region
  get shadow() {
    return this.getAttribute('shadow') || "always";
  }

  set shadow(val) {
    this.setAttribute('shadow', val);

    this.#wrap.classList.add(`is-${val}-shadow`);
  }
  // #endregion
  // ------- end -------

  init() {
    const that = this;

    this.shadow = this.shadow;
  }

  connectedCallback() {
    this.init();
  }
}

if (!customElements.get('ea-card')) {
  customElements.define('ea-card', EaCard);
}