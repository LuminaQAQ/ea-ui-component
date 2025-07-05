// @ts-nocheck
import Base from '../Base.js';
import "../ea-icon/index.js"

import { stylesheet } from './src/style/stylesheet.js';

export class EaResult extends Base {
  #wrap;

  #resultIcon;
  #resultTitle;
  #resultSubtitle;
  #resultExtraWrap;

  #resultIconSlot;
  #resultTitleSlot;
  #resultSubtitleSlot;
  #resultExtraSlot;

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
      <div class="ea-result_wrap" part="container">
        <div class="ea-result_icon" part="icon-wrap">
          <slot name="icon"></slot>
        </div>
        <div class="ea-result_title" part="title-wrap">
          <slot name="title"></slot>
        </div>
        <div class="ea-result_subtitle" part="subTitle-wrap">
          <slot name="subTitle"></slot>
        </div>
        <div class="ea-result_extra" part="extra-wrap">
          <slot name="extra"></slot>
        </div>
      </div>
    `;

    this.#wrap = shadowRoot.querySelector('.ea-result_wrap');
    this.#resultIcon = shadowRoot.querySelector('.ea-result_icon');
    this.#resultTitle = shadowRoot.querySelector('.ea-result_title');
    this.#resultSubtitle = shadowRoot.querySelector('.ea-result_subtitle');
    this.#resultExtraWrap = shadowRoot.querySelector('.ea-result_extra');

    this.#resultIconSlot = shadowRoot.querySelector('slot[name="icon"]');
    this.#resultTitleSlot = shadowRoot.querySelector('slot[name="title"]');
    this.#resultSubtitleSlot = shadowRoot.querySelector('slot[name="subTitle"]');
    this.#resultExtraSlot = shadowRoot.querySelector('slot[name="extra"]');

    this.build(shadowRoot, stylesheet);
  }

  // ------- icon 设置自定义icon -------
  // #region
  get icon() {
    return this.getAttribute('icon') || '';
  }

  set icon(value) {
    if (!value) return;
    this.setAttribute('icon', value);

    this.#resultIcon.innerHTML = `<ea-icon icon="${value}"></ea-icon>`;
  }
  // #endregion
  // ------- end -------

  // ------- title 设置标题 -------
  // #region
  get title() {
    return this.getAttribute('title') || '';
  }

  set title(value) {
    if (!value) return;
    this.setAttribute('title', value);

    this.#resultTitle.innerText = value;
  }
  // #endregion
  // ------- end -------

  // ------- sub-title 设置副标题 -------
  // #region
  get subtitle() {
    return this.getAttribute('sub-title') || '';
  }

  set subtitle(value) {
    if (!value) return;
    this.setAttribute('sub-title', value);

    this.#resultSubtitle.innerText = value;
  }
  // #endregion
  // ------- end -------

  connectedCallback() {
    this.icon = this.icon;
    this.title = this.title;
    this.subtitle = this.subtitle;
  }
}

if (!customElements.get('ea-result')) {
  customElements.define('ea-result', EaResult);
}