// @ts-nocheck
import Base from '../Base.js'

const stylesheet = `
:host {
  --margin-right: 1rem;
}

.ea-checkbox_wrap {
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  user-select: none;
  margin-right: var(--margin-right);
}
.ea-checkbox_wrap .ea-checkbox-input_wrap {
  line-height: 1;
  margin-right: 0.5rem;
}
.ea-checkbox_wrap .ea-checkbox-input_wrap .ea-checkbox-input_inner {
  box-sizing: border-box;
  position: relative;
  display: block;
  width: 0.8125rem;
  height: 0.8125rem;
  line-height: 0.8125;
  border-radius: 3px;
  border: 1px solid #ccc;
  transition: background-color 0.2s, border-color 0.2s;
}
.ea-checkbox_wrap .ea-checkbox-input_wrap .ea-checkbox-input_inner::after {
  content: "";
  position: absolute;
  left: 52.5%;
  top: 45%;
  transform: translate(-50%, -50%) rotate(-135deg);
  display: block;
  width: 3px;
  height: 7px;
  opacity: 0;
  transition: opacity 0.2s;
}
.ea-checkbox_wrap .ea-checkbox-input_wrap .ea-checkbox-input_input {
  display: none;
}
.ea-checkbox_wrap .ea-checkbox-label_desc {
  line-height: 1;
  transition: color 0.2s;
}
.ea-checkbox_wrap.checked .ea-checkbox-input_wrap .ea-checkbox-input_inner {
  border-color: #409eff;
  background-color: #409eff;
}
.ea-checkbox_wrap.checked .ea-checkbox-input_wrap .ea-checkbox-input_inner::after {
  opacity: 1;
  border-left: 2px solid white;
  border-top: 2px solid white;
}
.ea-checkbox_wrap.checked .ea-checkbox-label_desc {
  color: #409eff;
}
.ea-checkbox_wrap.disabled .ea-checkbox-input_wrap .ea-checkbox-input_inner {
  border-color: #eeeeee;
  background-color: #eeeeee;
}
.ea-checkbox_wrap.disabled .ea-checkbox-input_wrap .ea-checkbox-input_inner::before {
  background-color: transparent;
}
.ea-checkbox_wrap.disabled .ea-checkbox-label_desc {
  color: #c0c4cc;
}
.ea-checkbox_wrap.disabled[checked=true] .ea-checkbox-input_wrap .ea-checkbox-input_inner::before {
  background-color: #c0c4cc;
}
.ea-checkbox_wrap.indeterminate .ea-checkbox-input_wrap .ea-checkbox-input_inner {
  border-color: #409eff;
  background-color: #409eff;
}
.ea-checkbox_wrap.indeterminate .ea-checkbox-input_wrap .ea-checkbox-input_inner::after {
  opacity: 1;
  left: 50%;
  top: 50%;
  width: 80%;
  height: 3px;
  background-color: white;
  transform: translate(-50%, -50%) rotate(0deg);
}
.ea-checkbox_wrap.indeterminate .ea-checkbox-label_desc {
  color: #409eff;
}
.ea-checkbox_wrap.indeterminate[checked=true] .ea-checkbox-input_wrap .ea-checkbox-input_inner {
  border-color: #409eff;
  background-color: #409eff;
}
.ea-checkbox_wrap.indeterminate[checked=true] .ea-checkbox-input_wrap .ea-checkbox-input_inner::after {
  width: 3px;
  height: 7px;
  left: 52.5%;
  top: 45%;
  transform: translate(-50%, -50%) rotate(-135deg);
  opacity: 1;
  border-left: 2px solid white;
  border-top: 2px solid white;
  background-color: transparent;
}
.ea-checkbox_wrap.indeterminate[checked=true] .ea-checkbox-label_desc {
  color: #409eff;
}
`;

export class EaCheckbox extends Base {
  #checkbox;
  #label;

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
      <label class="ea-checkbox_wrap" part="container">
        <span class="ea-checkbox-input_wrap" part="input-container">
          <span class="ea-checkbox-input_inner" part="input"></span>
          <input type="checkbox" class="ea-checkbox-input_input">
          </input>
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
    this.#checkbox.checked = val;

    this.#label.classList.toggle('checked', val);
    this.setAttribute('checked', val);
    this.#label.setAttribute('checked', val);
    this.#label.classList.toggle('checked', val);

    if (val) this.#label.classList.remove('indeterminate');
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
    this.#checkbox.disabled = val;
    this.#label.toggleAttribute('disabled', val);
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

  // ------- indeterminate 状态 -------
  // #region
  get indeterminate() {
    return this.getAttrBoolean('indeterminate');
  }

  set indeterminate(val) {
    this.setAttribute('indeterminate', val);
    this.#label.classList.toggle('indeterminate', val);

    if (val) {
      this.checked = false;
      this.#label.classList.remove('checked');

      this.setAttribute('indeterminate', true);
    }
  }
  // #endregion
  // ------- end -------

  init() {
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

  connectedCallback() {
    this.init();
  }
}

if (!window.customElements.get("ea-checkbox")) {
  window.customElements.define("ea-checkbox", EaCheckbox);
}