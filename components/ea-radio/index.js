import Base from '../Base.js'

import { stylesheet } from './src/style/stylesheet.js';

export class EaRadio extends Base {
  #radio;
  #label;

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });

    shadowRoot.innerHTML = `
      <label class="ea-radio_wrap" part="container">
        <span class="ea-radio-input_wrap" part="input-wrap">
          <span class="ea-radio-input_inner" part="input"></span>
          <input class="ea-radio-input_input" type="radio" />
        </span>
        <span class="ea-radio-label_desc" part="label-wrap">
          <slot></slot>
        </span>
      </label>
    `;

    this.#label = shadowRoot.querySelector('.ea-radio_wrap');
    this.#radio = shadowRoot.querySelector('.ea-radio-input_input');

    this.build(shadowRoot, stylesheet);
  }

  // ------- 选中 -------
  // #region
  get checked() {
    return this.getAttrBoolean('checked');
  }

  set checked(val) {
    this.setAttribute('checked', val);
    this.#label.setAttribute('checked', val);
    this.#radio.checked = val;

    this.#label.classList.toggle('checked', val);
  }
  // #endregion
  // ------- end -------

  // ------- label_for 单选框的唯一键 -------
  // #region
  get name() {
    return this.getAttribute('name');
  }

  set name(val) {
    this.#radio.setAttribute('name', val);
  }
  // #endregion
  // ------- end -------

  // ------- value 单选框的值 -------
  // #region
  get value() {
    return this.getAttribute('value');
  }

  set value(val) {
    this.#label.setAttribute('for', val);
    this.#radio.setAttribute('id', val);
    this.#radio.setAttribute('value', val);
  }
  // #endregion
  // ------- end -------

  // ------- disabled 禁用状态 -------
  // #region
  get disabled() {
    return this.getAttrBoolean('disabled');
  }

  set disabled(val) {
    this.#radio.disabled = val;
    this.#label.setAttribute('disabled', val);
    this.#label.classList.toggle('disabled', val);
  }
  // #endregion
  // ------- end -------

  // ------- border 是否带有边框 -------
  // #region
  get border() {
    return this.getAttrBoolean('border');
  }

  set border(val) {
    this.#label.classList.toggle('border', val);
  }
  // #endregion
  // ------- end -------

  connectedCallback() {
    // radio 的 checked 属性
    this.checked = this.checked;

    // label 的 for 属性
    this.name = this.name;

    // radio 的 value 属性
    this.value = this.value;

    // radio 的 disabled 属性
    this.disabled = this.disabled;

    // border 属性
    this.border = this.border;

    // 监听 change 事件, 修改 checked 属性
    this.#radio.addEventListener('change', (e) => {
      document.querySelectorAll(`ea-radio[name="${this.name}"]`).forEach(btn => {
        const btnInput = btn.shadowRoot.querySelector('input');
        btn.checked = btnInput === this.#radio;
      });

      this.dispatchEvent(new CustomEvent('change', {
        detail: {
          value: this.value,
          checked: this.checked
        }
      }))
    })
  }
}

if (!window.customElements.get("ea-radio")) {
  window.customElements.define("ea-radio", EaRadio);
}