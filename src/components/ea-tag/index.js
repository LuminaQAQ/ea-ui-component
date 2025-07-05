// @ts-nocheck
import Base from '../Base.js';

import "../ea-icon/index.js"

import { stylesheet } from './src/style/stylesheet.js';

export class EaTag extends Base {
  #wrap;
  #closeSlot;
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
      <div class="ea-tag_wrap" part="container">
        <slot></slot>
      </div>
    `;

    this.#wrap = shadowRoot.querySelector('.ea-tag_wrap');

    this.build(shadowRoot, stylesheet);
  }

  // ------- type tag类型样式 -------
  // #region
  get type() {
    return this.getAttribute('type') || "default";
  }

  set type(value) {
    this.setAttribute('type', value);
    this.#wrap.classList.add(`ea-tag--${value}`);
  }
  // #endregion
  // ------- end -------

  // ------- closable 是否显示可关闭 -------
  // #region
  get closable() {
    return this.getAttrBoolean('closable');
  }

  set closable(value) {
    this.toggleAttr('closable', value);
  }
  // #endregion
  // ------- end -------

  // ------- effect 不同主题 -------
  // #region
  get effect() {
    return this.getAttribute('effect') || "light";
  }

  set effect(value) {
    if (value === "light") return;

    this.setAttribute('effect', value);
    this.#wrap.classList.add(`ea-tag--${value}`);
  }
  // #endregion
  // ------- end -------
  #initCloseEvent() {
    if (!this.closable) return;

    const closeIcon = document.createElement('ea-icon');
    closeIcon.icon = 'icon-cancel-circled2';
    closeIcon.part = 'close-icon';

    closeIcon.addEventListener('mouseenter', (e) => {
      closeIcon.icon = 'icon-cancel-circled';
    });

    closeIcon.addEventListener('mouseleave', (e) => {
      closeIcon.icon = 'icon-cancel-circled2';
    });

    closeIcon.addEventListener('click', (e) => {
      this.dispatchEvent(new CustomEvent('close', {
        detail: {
          value: this.innerText
        },
        bubbles: true,
      }));
    });

    this.#wrap.appendChild(closeIcon);
  }

  connectedCallback() {
    // 主题
    this.effect = this.effect;

    // tag类型
    this.type = this.type;

    // 显示可关闭
    this.closable = this.closable;
    this.#initCloseEvent();
  }
}

if (!customElements.get('ea-tag')) {
  customElements.define('ea-tag', EaTag);
}