// @ts-nocheck
import Base from '../Base';

const stylesheet = `
@import url('/ea_ui_component/icon/index.css');

.ea-switch_wrap {
  display: flex;
  align-items: center;
}
.ea-switch_wrap input {
  display: none;
}
.ea-switch_wrap span {
  display: block;
  cursor: default;
}
.ea-switch_wrap .ea-switch_label {
  color: #606266;
  font-size: 0.875rem;
  cursor: pointer;
  transition: color 0.2s;
}
.ea-switch_wrap .ea-switch_label.ea-switch_label--active {
  color: #409eff;
}
.ea-switch_wrap .ea-switch_core {
  position: relative;
  cursor: pointer;
  margin: 0 0.75rem;
  width: 2.5rem;
  height: 1.25rem;
  line-height: 1.25rem;
  background-color: #dcdfe6;
  border-radius: 999px;
  transition: background-color 0.2s;
}
.ea-switch_wrap .ea-switch_core.ea-switch_core--checked {
  background-color: #409eff;
}
.ea-switch_wrap .ea-switch_core::after {
  content: "";
  display: block;
  position: absolute;
  left: 2px;
  top: 50%;
  transform: translate(0, -50%);
  width: 1rem;
  height: 1rem;
  border-radius: 999px;
  background-color: #fff;
  transition: left 0.2s, transform 0.2s;
}
.ea-switch_wrap .ea-switch_core.ea-switch_core--checked::after {
  left: calc(100% - 1rem - 2px);
}
.ea-switch_wrap .ea-switch_core.ea-switch_core--disabled {
  background-color: #c0c4cc;
}
.ea-switch_wrap.ea-switch_wrap--disabled {
  cursor: not-allowed;
}
.ea-switch_wrap.ea-switch_wrap--disabled .ea-switch_label,
.ea-switch_wrap.ea-switch_wrap--disabled .ea-switch_core {
  pointer-events: none;
}
.ea-switch_wrap.ea-switch_wrap--disabled .ea-switch_core {
  background-color: #eff1f5;
}
.ea-switch_wrap.ea-switch_wrap--disabled .ea-switch_label {
  color: #c0c4cc;
}
.ea-switch_wrap.ea-switch_wrap--disabled .ea-switch_label.ea-switch_label--active {
  color: #7ebfff;
}
`;

const inputDom = () => {
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.className = 'ea-switch_input';

    return input;
}

const inputCoreDom = () => {
    const div = document.createElement('span');
    div.className = 'ea-switch_core';

    return div;
}

const labelDom = (posi) => {
    const label = document.createElement('span');
    label.className = `ea-switch_label ea-switch_label--${posi}`;

    return label;
}

export class EaSwitch extends Base {
    #mounted = false;

    #wrap;
    #input;

    #labelLeft;
    #inputCore;
    #labelRight;

    static get observedAttributes() {
        return ['checked'];
    }
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('div');
        wrap.className = 'ea-switch_wrap';

        const input = inputDom();
        const leftLabel = labelDom('left');
        const inputCore = inputCoreDom();
        const rightLabel = labelDom('right');

        wrap.appendChild(input);
        wrap.appendChild(leftLabel);
        wrap.appendChild(inputCore);
        wrap.appendChild(rightLabel);

        this.#wrap = wrap;
        this.#input = input;
        this.#labelLeft = leftLabel;
        this.#inputCore = inputCore;
        this.#labelRight = rightLabel;

        this.build(shadowRoot, stylesheet);
        this.shadowRoot.appendChild(wrap);
    }

    // ------- inactive-text 关闭时选项 -------
    // #region
    get inactiveText() {
        return this.getAttribute('inactive-text');
    }

    set inactiveText(value) {
        this.setAttribute('inactive-text', value);
        this.#labelLeft.innerText = value;
    }
    // #endregion
    // ------- end -------

    // ------- active-text 开启时选项 -------
    // #region
    get activeText() {
        return this.getAttribute('active-text');
    }

    set activeText(value) {
        this.setAttribute('active-text', value);
        this.#labelRight.innerText = value;
    }
    // #endregion
    // ------- end -------

    // ------- checked 选中 -------
    // #region
    get checked() {
        return this.getAttrBoolean('checked');
    }

    set checked(value) {
        this.setAttribute('checked', value);
        this.#input.checked = value;
        this.#input.setAttribute('checked', value);

        if (value) {
            this.#inputCore.classList.add('ea-switch_core--checked');
            this.#labelRight.classList.add('ea-switch_label--active');

            this.#labelLeft.classList.remove('ea-switch_label--active');
        } else {
            this.#inputCore.classList.remove('ea-switch_core--checked');
            this.#labelLeft.classList.add('ea-switch_label--active');

            this.#labelRight.classList.remove('ea-switch_label--active');
        }
    }
    // #endregion
    // ------- end -------

    // ------- disabled 禁用 -------
    // #region
    get disabled() {
        return this.getAttrBoolean('disabled');
    }

    set disabled(value) {
        this.setAttribute('disabled', value);
        this.#input.disabled = value;
        this.#wrap.classList.toggle('ea-switch_wrap--disabled', value);
    }
    // #endregion
    // ------- end -------

    // ------- inactive-color 关闭时颜色 -------
    // #region
    get inactiveColor() {
        return this.getAttribute('inactive-color');
    }

    set inactiveColor(value) {
        if (!value) return;

        this.setAttribute('inactive-color', value);
        if (value) this.#inputCore.style.backgroundColor = value;
    }
    // #endregion
    // ------- end -------

    // ------- active-color 开启时颜色 -------
    // #region
    get activeColor() {
        return this.getAttribute('active-color');
    }

    set activeColor(value) {
        if (!value) return;

        this.setAttribute('active-color', value);
        this.#inputCore.style.backgroundColor = value;
    }
    // #endregion
    // ------- end -------

    handleInputChecked(e) {
        const currentChecked = this.#input.checked;

        if (this.inactiveColor && this.activeColor) {
            this.#inputCore.style.backgroundColor = currentChecked ? this.inactiveColor : this.activeColor;
        } else {
            this.#inputCore.classList.toggle('ea-switch_core--checked', currentChecked);
        }
    }

    init() {
        const that = this;

        // 设置勾选值
        this.checked = this.checked;

        // 设置开启/关闭值
        this.inactiveText = this.inactiveText;
        this.activeText = this.activeText;

        // 设置禁用
        this.disabled = this.disabled;

        // 设置颜色
        if (this.activeColor && this.inactiveColor) {
            if (this.checked) this.activeColor = this.activeColor;
            else this.inactiveColor = this.inactiveColor;
        }


        this.#labelLeft.addEventListener('click', function (e) {
            that.checked = !that.#input.checked;
        });

        this.#labelRight.addEventListener('click', function (e) {
            that.checked = !that.#input.checked;
        });

        this.#inputCore.addEventListener('click', function (e) {
            that.checked = !that.#input.checked;
        });
    }

    connectedCallback() {
        this.init();
        this.#mounted = true;
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (!this.#mounted) return;

        if (name === 'checked') {
            const value = this.checked ? this.activeText : this.inactiveText;
            this.handleInputChecked();

            this.dispatchEvent(new CustomEvent("change", {
                detail: {
                    checked: this.checked,
                    value,
                },
            }))
        }
    }
}

if (!customElements.get('ea-switch')) {
    customElements.define('ea-switch', EaSwitch);
}