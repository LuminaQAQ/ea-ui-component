// @ts-nocheck
import Base from '../Base.js'

import { stylesheet } from './src/style/stylesheet.js';

export class EaCheckbox extends Base {
  #checkbox;
  #label;

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
      <label class="ea-checkbox_wrap" part="container">
        <input type="checkbox" class="ea-checkbox-input_input"/>
        <span class="ea-checkbox-input_wrap" part="input-container">
          <span class="ea-checkbox-input_inner" part="input"></span>
        </span>
        <span class="ea-checkbox-label_desc" part="label-container">
          <slot></slot>
        </span>
      </label>
    `;

    this.#label = shadowRoot.querySelector('.ea-checkbox_wrap');
    this.#checkbox = shadowRoot.querySelector('.ea-checkbox-input_input');

    this.build(shadowRoot, stylesheet);
  }

  // ------- checked 选中 -------
  // #region
  get checked() {
    return this.getAttrBoolean('checked');
  }

  set checked(val) {
    this.setAttribute('checked', val);
    this.#checkbox.checked = val;
  }
  // #endregion
  // ------- end -------

  // ------- name 单选框的唯一键 -------
  // #region
  get name() {
    return this.getAttribute('name') || '';
  }

  set name(val) {
    this.#checkbox.setAttribute('name', val);
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
    this.#checkbox.setAttribute('id', val);
    this.#checkbox.setAttribute('value', val);
  }
  // #endregion
  // ------- end -------

  // ------- disabled 禁用状态 -------
  // #region
  get disabled() {
    return this.getAttrBoolean('disabled');
  }

  set disabled(val) {
    this.setAttribute('disabled', val);
    this.#checkbox.disabled = val;
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

  // ------- indeterminate 状态 -------
  // #region
  get indeterminate() {
    return this.getAttrBoolean('indeterminate');
  }

  set indeterminate(val) {
    this.setAttribute('indeterminate', val);
    this.#checkbox.setAttribute('indeterminate', val);

    if (val) {
      this.checked = false;
      this.#label.classList.remove('checked');

      this.setAttribute('indeterminate', true);
      this.#checkbox.setAttribute('indeterminate', true);
    }
  }
  // #endregion
  // ------- end -------

  connectedCallback() {
    // checkbox 的 checked 属性
    this.checked = this.checked;

    // label 的 for 属性
    this.name = this.name;

    // checkbox 的 value 属性
    this.value = this.value;

    // checkbox 的 disabled 属性
    this.disabled = this.disabled;

    // border 属性
    this.border = this.border;

    // indeterminate 属性
    this.indeterminate = this.indeterminate;

    // 监听 change 事件, 修改 checked 属性
    this.#checkbox.addEventListener('change', (e) => {
      e.preventDefault();
      this.indeterminate = false;
      this.checked = e.target.checked;

      this.dispatchEvent(new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: {
          checked: this.checked,
          value: this.value,
          name: this.name,
        }
      }))
    })
  }
}

if (!window.customElements.get("ea-checkbox")) {
  window.customElements.define("ea-checkbox", EaCheckbox);
}