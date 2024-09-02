import Base from '../Base.js'
import "../ea-icon/index.js"

import { stylesheet } from './src/style/stylesheet.js';

export class EaLink extends Base {
  #container;
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
      <div class="ea-link" part="container">
        <slot></slot>
      </div>
    `;

    this.#container = shadowRoot.querySelector('.ea-link');

    this.build(shadowRoot, stylesheet);
  }

  get LINK_TYPE() {
    return ['primary', 'success', 'info', 'warning', 'danger'];
  }

  // ------- href链接 -------
  // #region
  get href() {
    return this.getAttribute('href');
  }

  set href(value) {
    if (!value) return;

    this.setAttribute('href', value);
    this.#container.href = value;
  }
  // #endregion
  // ------- end -------

  // ------- type类型 -------
  // #region
  get type() {
    const attr = this.getAttribute('type');
    return this.LINK_TYPE.includes(attr) ? attr : null;
  }

  set type(value) {
    if (!value) return;

    if (this.LINK_TYPE.includes(value)) this.#container.classList.add(value);
  }
  // #endregion
  // ------- end -------

  // ------- disabled禁用状态 -------
  // #region
  get disabled() {
    return this.getAttrBoolean('disabled');
  }

  set disabled(value) {
    this.setAttribute('disabled', value);
    this.#container.classList.toggle('disabled', value);
    this.style.cursor = value ? 'not-allowed' : 'pointer';
  }
  // #endregion
  // ------- end -------

  // ------- underline下划线 -------
  // #region
  get underline() {
    return this.getAttrBoolean('underline');
  }

  set underline(value) {
    this.#container.classList.toggle('underline', value);
  }
  // #endregion
  // ------- end -------

  // ------- icon图标 -------
  // #region
  get icon() {
    return this.getAttribute('icon');
  }

  set icon(value) {
    if (!value) return;

    const icon = document.createElement('ea-icon');
    icon.icon = value;
    this.#container.insertBefore(icon, this.#container.firstChild);
  }
  // #endregion
  // ------- end -------

  connectedCallback() {
    this.style.display = 'inline-block';

    // 设置链接
    this.href = this.href;

    // 设置类型
    this.type = this.type;

    // 禁用状态
    this.disabled = this.disabled;

    // 设置下划线
    this.underline = this.underline;

    // 图标
    this.icon = this.icon;
  }
}

if (!window.customElements.get("ea-link")) {
  window.customElements.define("ea-link", EaLink);
}