// @ts-nocheck
import Base from '../Base.js';

import { stylesheet } from './src/style/stylesheet.js';

export class EaBadge extends Base {
  #wrap;
  #badgeWrap;

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
        <div class="ea-badge_wrap" part='container'>
            <slot></slot>
            <sup class="ea-badge_content" part='content'></sup>
        </div>
    `;

    this.#wrap = shadowRoot.querySelector('.ea-badge_wrap');
    this.#badgeWrap = shadowRoot.querySelector('.ea-badge_content');

    this.build(shadowRoot, stylesheet);
  }

  // ------- value 徽章内的值 -------
  // #region
  get value() {
    return this.getAttribute('value') || '';
  }

  set value(value) {
    this.setAttribute('value', value);

    this.#badgeWrap.innerHTML = value;
  }
  // #endregion
  // ------- end -------

  // ------- type 样式类型 -------
  // #region
  get type() {
    return this.getAttribute('type') || 'normal';
  }

  set type(value) {
    this.setAttribute('type', value);

    this.#badgeWrap.classList.add(value);
  }
  // #endregion
  // ------- end -------

  // ------- max 最大值 -------
  // #region
  get max() {
    return this.getAttrNumber('max') || Infinity;
  }

  set max(value) {
    if (value === Infinity) return;

    value = parseInt(value);

    this.setAttribute('max', value);

    if (this.value > value) {
      this.value = value + '+';
    }
  }
  // #endregion
  // ------- end -------

  // ------- is-dot 是否为点状徽章 -------
  // #region
  get isDot() {
    return this.getAttrBoolean('is-dot') || false;
  }

  set isDot(value) {
    this.toggleAttr('is-dot', value);

    this.#badgeWrap.innerText = value ? '' : this.value;
    this.#badgeWrap.classList.toggle('dot', value);
  }
  // #endregion
  // ------- end -------

  connectedCallback() {
    this.value = this.value;

    this.type = this.type;

    this.max = this.max;

    this.isDot = this.isDot;
  }
}

if (!customElements.get('ea-badge')) {
  customElements.define('ea-badge', EaBadge);
}