// @ts-nocheck
import Base from '../Base.js';
import '../ea-icon/index.js'
import { createSlotElement, createElement } from '../../utils/createElement.js';

const stylesheet = `
@import url('/ea_ui_component/icon/index.css');

.ea-option_wrap {
  position: relative;
  padding: 0 20px;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  color: #606266;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}
.ea-option_wrap.is-checked {
  color: #409eff;
  font-weight: 700;
}
.ea-option_wrap.is-disabled {
  color: #c0c4cc;
  pointer-events: none;
  cursor: not-allowed;
}
.ea-option_wrap:hover {
  background-color: #f5f7fa;
}
`;

export class EaOption extends Base {
    #container;
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });

        shadowRoot.innerHTML = `
            <div class='ea-option_wrap' part='container'>
                <slot></slot>
            </div>
        `;

        this.#container = shadowRoot.querySelector('.ea-option_wrap');

        this.build(shadowRoot, stylesheet);
    }

    // ------- value 选项值 -------
    // #region
    get value() {
        return this.getAttribute('value') || '';
    }

    set value(val) {
        this.setAttribute('value', val);
    }
    // #endregion
    // ------- end -------

    // ------- checked 选项是否选中 -------
    // #region
    get checked() {
        return this.getAttrBoolean('checked') || false;
    }

    set checked(val) {
        this.setAttribute('checked', val);

        this.#container.classList.toggle('is-checked', val);
    }
    // #endregion
    // ------- end -------

    // ------- disabled 选项是否禁用 -------
    // #region
    get disabled() {
        return this.getAttrBoolean('disabled') || false;
    }

    set disabled(val) {
        this.setAttribute('disabled', val);

        this.#container.classList.toggle('is-disabled', val);
    }
    // #endregion
    // ------- end -------

    #init() {
        const that = this;

        this.value = this.value;

        this.disabled = this.disabled;

        this.checked = this.checked;
    }

    connectedCallback() {
        this.#init();
    }
}

if (!customElements.get('ea-option')) {
    customElements.define('ea-option', EaOption);
}