// @ts-nocheck
import Base from '../Base.js';
import '../ea-icon/index.js'
import { createSlotElement, createElement } from '../../utils/createElement.js';

import "../ea-option/index.js"
import '../ea-option-gropu/index.js'
import "../ea-input/index.js"

const stylesheet = `
@import url('/ea_ui_component/icon/index.css');

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
.ea-select_wrap .ea-select_dropdown-wrap .ea-select_dropdown-empty {
  padding: 10px 0;
  margin: 0;
  text-align: center;
  color: #999;
  font-size: 14px;
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
    #noResultWrap;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });

        shadowRoot.innerHTML = `
            <div class="ea-select_wrap" part="container">
                <div class="ea-select_input-wrap">
                    <ea-input type="text" part="input" readonly autocomplete="off"></ea-input>
                    <span class="ea-select_dropdown-icon">
                        <i part="icon" class="icon-angle-down" style="color: #c0c4cc;"></i>
                    </span>
                </div>
                <div class="ea-select_dropdown-wrap">
                    <slot></slot>
                    <slot name="empty" class="ea-select_dropdown-empty" style="display: none;">
                        <p>暂无数据</p>
                    </slot>
                </div>
            </div>
        `;


        this.#container = this.shadowRoot.querySelector('.ea-select_wrap');
        this.#selectInput = this.shadowRoot.querySelector('ea-input');
        this.#dropdownIcon = this.shadowRoot.querySelector('.ea-select_dropdown-icon');
        this.#dropdownWrap = this.shadowRoot.querySelector('.ea-select_dropdown-wrap');
        this.#noResultWrap = this.shadowRoot.querySelector('.ea-select_dropdown-empty');

        this.build(shadowRoot, stylesheet);
    }

    // ------- name 若与 form 组合使用，则 form 的返回值中. 该键名为该name -------
    // #region
    get name() {
        return this.getAttribute('name') || 'select';
    }

    set name(val) {
        this.setAttribute('name', val);
    }
    // #endregion
    // ------- end -------

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
        const value = this.selection;
        if (this.multiple) return value.split(',') || [];
        else return this.selection;
    }
    // #endregion
    // ------- end -------

    // ------- selection 选中项 -------
    // #region
    get selection() {
        return this.getAttribute('selection') || '';
    }

    set selection(val) {
        this.setAttribute('selection', val);

        this.#selectInput.value = val;
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
        this.setAttribute('clearable', val);

        if (val) {
            const icon = this.#dropdownIcon.querySelector('i');
            this.#dropdownIcon.addEventListener('mouseenter', (e) => {
                icon.className = 'icon-cancel-circled2';
            });

            this.#dropdownIcon.addEventListener('mouseleave', (e) => {
                icon.className = 'icon-angle-down';
            });

            this.#dropdownIcon.addEventListener('click', (e) => {
                this.dispatchEvent(new CustomEvent('clear', {
                    detail: {
                        originValue: this.selection
                    }
                }));

                this.querySelectorAll('ea-option').forEach(option => {
                    option.checked = false;
                });
                this.selection = '';
            });

        }
    }
    // #endregion
    // ------- end -------

    // ------- filterable 是否可搜索 -------
    // #region
    get filterable() {
        return this.getAttrBoolean('filterable') || false;
    }

    set filterable(val) {
        this.setAttribute('filterable', val);

        this.#selectInput.readonly = val === false;

        if (val) {
            this.#selectInput.addEventListener('change', (e) => {
                const options = this.querySelectorAll('ea-option');
                const { value } = e.detail;

                options.forEach(option => {
                    option.style.display = option.value.includes(value) ? 'block' : 'none';
                });
                let isAllHidden = Array.from(options).every(option => {
                    return option.style.display === 'block' ? false : true;
                });

                this.#noResultWrap.style.display = isAllHidden ? 'block' : 'none';
            });
        }
    }
    // #endregion
    // ------- end -------

    // ------- multiple 是否多选 -------
    // #region
    get multiple() {
        return this.getAttrBoolean('multiple') || false;
    }

    set multiple(val) {
        this.setAttribute('multiple', val);
    }
    // #endregion
    // ------- end -------

    #handleOptionChecked() {
        const options = this.querySelectorAll('ea-option');

        options.forEach(option => {
            if (!option.disabled) {
                option.addEventListener('click', (e) => {
                    if (this.multiple) {
                        option.checked = !option.checked;

                        if (!option.checked) {
                            const choise = this.selection.split(',');
                            choise.splice(choise.indexOf(option.value), 1);
                            this.selection = choise.join(',');
                        } else {
                            this.selection = this.selection ? this.selection + ',' + option.value : option.value;
                        }
                    } else {
                        this.#selectInput.value = option.value;
                        this.selection = option.value;

                        options.forEach(item => {
                            item.checked = false;
                        });
                        option.checked = true;
                    }
                    this.dispatchEvent(new CustomEvent('change', {
                        detail: {
                            value: this.selection
                        }
                    }));
                });
            }
        });
    }

    #initDropdownWrapOpen() {
        this.#selectInput.addEventListener('focus', (e) => {
            this.#container.classList.add('is-open');

            this.dispatchEvent(new CustomEvent('visible-change', {
                detail: {
                    visible: true,
                }
            }));
        });

        this.#selectInput.addEventListener('blur', (e) => {
            let timer = setTimeout(() => {
                clearTimeout(timer);
                timer = null;
                this.#container.classList.remove('is-open');
            }, 100);

            this.dispatchEvent(new CustomEvent('visible-change', {
                detail: {
                    visible: false,
                }
            }));
        });
    }

    #init() {
        this.setAttribute('data-ea-component', true);
        this.#dropdownWrap.style.width = this.width;

        this.name = this.name;

        this.width = this.width;

        this.selection = this.selection;

        this.placeholder = this.placeholder;

        this.disabled = this.disabled;

        this.clearable = this.clearable;

        this.filterable = this.filterable;

        this.multiple = this.multiple;

        this.#initDropdownWrapOpen();
        this.#handleOptionChecked();

        let timer = setTimeout(() => {
            clearTimeout(timer);
            timer = null;
            this.#container.classList.add('with-transition');
        }, 20);
    }

    connectedCallback() {
        this.#init();
    }
}

if (!customElements.get('ea-select')) {
    customElements.define('ea-select', EaSelect);
}