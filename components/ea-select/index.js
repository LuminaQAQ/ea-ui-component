// @ts-nocheck
import Base from '../Base.js';
import '../ea-icon/index.js'
import { createSlotElement, createElement } from '../../utils/createElement.js';

import "../ea-option/index.js"
import '../ea-option-gropu/index.js'
import "../ea-input/index.js"

const stylesheet = `
.ea-select_wrap {
  position: relative;
}
.ea-select_wrap .ea-select_input-wrap .ea-select_dropdown-icon {
  position: absolute;
  left: calc(100% - 24px);
  top: 50%;
  transform-origin: center;
  transform: translateY(-50%);
}
.ea-select_wrap .ea-select_input-wrap .ea-select_dropdown-icon.is-open {
  transform: translateY(-50%) rotate(180deg);
}
.ea-select_wrap .ea-select_dropdown-wrap {
  position: absolute;
  left: 0;
  bottom: -12px;
  transform: translateY(100%) scaleY(0);
  transform-origin: center top;
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 2035;
}
.ea-select_wrap.is-open .ea-select_input-wrap .ea-select_dropdown-icon {
  transform: translateY(-50%) rotate(180deg);
}
.ea-select_wrap.is-open .ea-select_dropdown-wrap {
  transform: translateY(100%) scaleY(1);
}
.ea-select_wrap.is-disabled {
  pointer-events: none;
  cursor: not-allowed;
}
.ea-select_wrap.with-transition .ea-select_input-wrap .ea-select_dropdown-icon {
  transition: transform 0.3s;
}
.ea-select_wrap.with-transition .ea-select_dropdown-wrap {
  transition: transform 0.3s;
}
`;

export class EaSelect extends Base {
    #container;
    #selectInput;
    #dropdownIcon;
    #dropdownWrap;
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });

        shadowRoot.innerHTML = `
            <div class="ea-select_wrap" part="container">
                <div class="ea-select_input-wrap">
                    <ea-input type="text" part="input" readonly autocomplete="off"></ea-input>
                    <span class="ea-select_dropdown-icon">
                        <ea-icon part="icon" icon="icon-angle-down" color="#c0c4cc"></ea-icon>
                    </span>
                </div>
                <div class="ea-select_dropdown-wrap">
                    <slot></slot>
                </div>
            </div>
        `;

        this.#container = this.shadowRoot.querySelector('.ea-select_wrap');
        this.#selectInput = this.shadowRoot.querySelector('ea-input');
        this.#dropdownIcon = this.shadowRoot.querySelector('.ea-select_dropdown-icon');
        this.#dropdownWrap = this.shadowRoot.querySelector('.ea-select_dropdown-wrap');

        this.build(shadowRoot, stylesheet);
    }

    // ------- width 输入框宽度 -------
    // #region
    get width() {
        return this.getAttribute('width') || '200px';
    }

    set width(val) {
        this.setAttribute('width', val);

        this.#container.style.width = val;
    }
    // #endregion
    // ------- end -------

    // ------- value 选项值 -------
    // #region
    get value() {
        return this.getAttribute('value') || '';
    }

    set value(val) {
        this.setAttribute('value', val);

        this.#selectInput.value = val;
        const options = this.querySelectorAll('ea-option');

        options.forEach(option => {
            option.checked = option.value === val;
        });
    }
    // #endregion
    // ------- end -------

    // ------- palceholder 提示 -------
    // #region
    get placeholder() {
        return this.getAttribute('placeholder') || '';
    }

    set placeholder(val) {
        this.setAttribute('placeholder', val);
        this.#selectInput.placeholder = val;
    }
    // #endregion
    // ------- end -------

    // ------- disabled 禁用 -------
    // #region
    get disabled() {
        return this.getAttrBoolean('disabled') || false;
    }

    set disabled(val) {
        this.toggleAttr('disabled', val);

        this.#selectInput.disabled = val;
    }
    // #endregion
    // ------- end -------

    // ------- clearable 是否可清除 -------
    // #region
    get clearable() {
        return this.getAttrBoolean('clearable') || false;
    }

    set clearable(val) {
        if (!val) return;

        this.setAttribute('clearable', val);

        const icon = this.#dropdownIcon.querySelector('ea-icon');

        this.#dropdownIcon.addEventListener('mouseenter', (e) => {
            icon.icon = 'icon-cancel-circled2';
        });

        this.#dropdownIcon.addEventListener('mouseleave', (e) => {
            icon.icon = 'icon-angle-down';
        });

        this.#dropdownIcon.addEventListener('click', (e) => {
            this.value = '';
        });
    }
    // #endregion
    // ------- end -------

    #initDropdownWrapOpen() {
        this.#selectInput.addEventListener('focus', (e) => {
            this.#container.classList.add('is-open');
        });

        this.#selectInput.addEventListener('blur', (e) => {
            let timer = setTimeout(() => {
                clearTimeout(timer);
                timer = null;
                this.#container.classList.remove('is-open');
            }, 100);
        });
    }

    #init() {
        this.setAttribute('data-ea-component', true);

        this.width = this.width;

        this.value = this.value;

        this.placeholder = this.placeholder;

        this.disabled = this.disabled;

        this.clearable = this.clearable;

        this.#dropdownWrap.style.width = this.width;

        let timer = setTimeout(() => {
            clearTimeout(timer);
            timer = null;
            this.#container.classList.add('with-transition');
        }, 20);

        this.#initDropdownWrapOpen();

        const options = this.querySelectorAll('ea-option');
        options.forEach(option => {
            if (!option.disabled) {
                option.addEventListener('click', (e) => {
                    this.#selectInput.value = option.value;
                    this.value = option.value;

                    options.forEach(item => {
                        item.checked = false;
                    });
                    option.checked = true;
                });
            }
        });
    }

    connectedCallback() {
        this.#init();
    }
}

if (!customElements.get('ea-select')) {
    customElements.define('ea-select', EaSelect);
}