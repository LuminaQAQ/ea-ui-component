// @ts-nocheck
import Base from "../Base.js";
import "../ea-icon/index.js"

import { ButtonComm } from "./src/components/ButtonComm.js";
import { HrefComm } from "./src/components/HrefComm.js";

import { stylesheet } from "./src/style/stylesheet.js";

export class EaButton extends Base {
  #buttonType = "button";

  #wrap;

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });

    const hrefAttr = this.getAttribute('href')
    if (hrefAttr) {
      shadowRoot.innerHTML = HrefComm;
      this.#buttonType = "a";
    } else {
      shadowRoot.innerHTML = ButtonComm;
      this.#buttonType = "button";
    }

    this.#wrap = shadowRoot.querySelector('.ea-button');

    this.build(shadowRoot, stylesheet);
  }

  get BUTTON_STYLE() {
    return ['plain', 'round'];
  }

  get BUTTON_TYPE() {
    return ['normal', 'primary', 'success', 'warning', 'danger', 'text'];
  }

  get BUTTON_SIZE() {
    return ['medium', 'small', 'mini'];
  }


  // ------- 禁用 -------
  // #region
  get disabled() {
    return this.getAttrBoolean('disabled');
  }

  set disabled(value) {
    this.toggleAttr('disabled', value);
    this.#wrap.classList.toggle('disabled', value);
  }
  // #endregion
  // ------- end -------

  // ------- 按钮样式 -------
  // #region
  get plain() {
    return this.getAttrBoolean('plain');
  }
  set plain(value) {
    this.toggleAttr('plain', value);
    this.#wrap.classList.toggle('plain', value);
  }

  get round() {
    return this.getAttrBoolean('round');
  }
  set round(value) {
    this.toggleAttr('round', value);

    this.#wrap.classList.toggle('round', value);
  }
  // #endregion
  // ------- end -------

  // ------- type属性 -------
  // #region
  get type() {
    const attr = this.getAttribute('type');
    return this.BUTTON_TYPE.includes(attr) ? attr : 'normal';
  }

  set type(value) {
    this.setAttribute('type', value);
    this.#wrap.classList.add(value);
  }
  // #endregion
  // ------- end -------

  // ------- 按钮大小 -------
  // #region
  get size() {
    const attr = this.getAttribute('size');
    return this.BUTTON_SIZE.includes(attr) ? attr : 'medium';
  }
  set size(value) {
    this.toggleAttr('size', value);
    this.#wrap.classList.add(value);
  }
  // #endregion
  // ------- end -------

  // ------- 按钮加载 -------
  // #region
  get loading() {
    return this.getAttrBoolean('loading');
  }

  set loading(value) {
    this.toggleAttr('loading', value);

    this.disabled = value;

    if (value) {
      const i = document.createElement('ea-icon');
      i.id = 'ea-loading-icon';
      i.icon = 'icon-spin6 animate-spin';

      this.#wrap.insertBefore(i, this.#wrap.firstChild)
    } else {
      const loadingIcon = this.#wrap.querySelector('#ea-loading-icon');
      if (loadingIcon) loadingIcon.remove();
    }
  }
  // #endregion
  // ------- end -------

  // ------- 图标按钮 -------
  // #region
  get icon() {
    return this.getAttribute('icon') || '';
  }

  set icon(value) {
    this.setAttribute('icon', value);

    if (value && !this.#wrap.querySelector('ea-icon')) {
      const eaIcon = document.createElement('ea-icon');
      eaIcon.icon = value;
      eaIcon.part = "icon";

      this.#wrap.insertBefore(eaIcon, this.#wrap.firstChild);
    }
  }
  // #endregion
  // ------- end -------

  // ------- 链接按钮 -------
  // #region
  get href() {
    return this.getAttribute('href') || '';
  }

  set href(value) {
    if (this.#buttonType === "button") return;

    this.setAttribute('href', value);
    this.#wrap.setAttribute('href', value);
  }
  // #endregion
  // ------- end -------

  connectedCallback() {
    // 按钮样式
    this.plain = this.plain;
    this.round = this.round;

    // 按钮种类
    this.type = this.type;

    // 按钮大小
    this.size = this.size;

    // 图标
    this.icon = this.icon;

    // 禁用
    this.disabled = this.disabled;

    // 链接
    this.href = this.href;

    if (this.loading) this.loading = this.loading;
  }
}

if (!window.customElements.get("ea-button")) {
  window.customElements.define("ea-button", EaButton);
}