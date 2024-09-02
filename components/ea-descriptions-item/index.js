import Base from '../Base.js';

import { stylesheet } from './src/stylesheet.js';

export class EaDescriptionsItem extends Base {
  #wrap;

  #label;

  #labelSlot;

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });

    shadowRoot.innerHTML = `
        <td class="ea-descriptions-item_wrap" part="container">
            <span class="ea-descriptions-item_label" part="label-wrap">
                <slot slot="label"></slot>
            </span>
            <span class="ea-descriptions-item_content" part="content-wrap">
                <slot></slot>
            </span>
        </td>
    `;

    this.#wrap = shadowRoot.querySelector('.ea-descriptions-item_wrap');
    this.#label = shadowRoot.querySelector('.ea-descriptions-item_label');
    this.#labelSlot = shadowRoot.querySelector('slot[name="label"]');

    this.build(shadowRoot, stylesheet);
  }

  // ------- label 该格的标题 -------
  // #region
  get label() {
    return this.getAttribute('label') || '';
  }

  set label(value) {
    this.setAttribute('label', value);

    this.#label.innerHTML = value;
  }
  // #endregion
  // ------- end -------

  // ------- span 该格的大小 -------
  // #region
  get span() {
    return this.getAttrNumber('span') || 1;
  }

  set span(value) {
    this.setAttribute('span', value);
  }
  // #endregion
  // ------- end -------

  connectedCallback() {
    this.label = this.label;

    this.span = this.span;
  }
}

if (!customElements.get('ea-descriptions-item')) {
  customElements.define('ea-descriptions-item', EaDescriptionsItem);
}