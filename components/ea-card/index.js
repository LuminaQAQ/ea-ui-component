// @ts-nocheck
import Base from '../Base.js';

import { stylesheet } from './src/style/stylesheet.js';

class EaCard extends Base {
  #wrap;

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });

    shadowRoot.innerHTML = `
      <div class="ea-card_wrap" part="container">
        <div class="ea-card_header" part="header">
          <slot name="header"></slot>
        </div>
        <div class="ea-card_content" part="content">
          <slot></slot>
        </div>
      </div>
    `;

    this.#wrap = shadowRoot.querySelector('.ea-card_wrap');

    this.build(shadowRoot, stylesheet);
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