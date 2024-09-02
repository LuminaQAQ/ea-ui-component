// @ts-nocheck
import Base from '../Base.js';

import { stylesheet } from './src/style/stylesheet.js';

export class EaSwitch extends Base {
    #wrap;
    #input;

    #labelLeft;
    #inputCore;
    #labelRight;
    
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
            <label class="ea-switch_wrap" part="container">
                <input class="ea-switch_input" part="input" type="checkbox">
                <span class="ea-switch_label ea-switch_label--left" part="label-left"></span>
                <span class="ea-switch_core" part="switch"></span>
                <span class="ea-switch_label ea-switch_label--right" part="label-right"></span>
            </label>
        `;

        this.#wrap = shadowRoot.querySelector('.ea-switch_wrap');
        this.#input = shadowRoot.querySelector('.ea-switch_input');
        this.#labelLeft = shadowRoot.querySelector('.ea-switch_label--left');
        this.#inputCore = shadowRoot.querySelector('.ea-switch_core');
        this.#labelRight = shadowRoot.querySelector('.ea-switch_label--right');

        this.build(shadowRoot, stylesheet);
    }

    // ------- name 属性 -------
    // #region
    get name() {
        return this.getAttribute('name') || 'ea-switch';
    }

    set name(value) {
        this.setAttribute('name', value);

        this.#wrap.setAttribute('for', value);
        this.#input.setAttribute('name', value);
        this.#input.setAttribute('id', value);
    }
    // #endregion
    // ------- end -------

    // ------- value 属性 -------
    // #region
    get value() {
        if (this.inactiveText && !this.checked) return this.inactiveText;
        else if (this.activeText && this.checked) return this.activeText;
        return this.checked;
    }

    set value(value) {
        this.#input.value = value;
    }
    // #endregion
    // ------- end -------

    // ------- inactive-text 关闭时选项 -------
    // #region
    get inactiveText() {
        return this.getAttribute('inactive-text') || '';
    }

    set inactiveText(value) {
        if (!value) return;

        this.setAttribute('inactive-text', value);
        this.#labelLeft.innerText = value;
    }
    // #endregion
    // ------- end -------

    // ------- active-text 开启时选项 -------
    // #region
    get activeText() {
        return this.getAttribute('active-text') || '';
    }

    set activeText(value) {
        if (!value) return;

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
        this.#wrap.classList.toggle('disabled', value);
    }
    // #endregion
    // ------- end -------

    // ------- inactive-color 关闭时颜色 -------
    // #region
    get inactiveColor() {
        return this.getAttribute('inactive-color') || '';
    }

    set inactiveColor(value) {
        if (!value) return;

        this.style.setProperty('--inactive-checkbox-bgc', value);
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

        this.style.setProperty('--active-checkbox-bgc', value);
    }
    // #endregion
    // ------- end -------

    connectedCallback() {
        this.setAttribute('data-ea-component', true);

        this.name = this.name;

        this.value = this.value

        // 设置勾选值
        this.checked = this.checked;

        // 设置开启/关闭值
        this.inactiveText = this.inactiveText;
        this.activeText = this.activeText;

        // 设置禁用
        this.disabled = this.disabled;

        this.inactiveColor = this.inactiveColor;
        this.activeColor = this.activeColor;

        this.#input.addEventListener('change', (e) => {
            e.preventDefault();
            e.stopPropagation();

            this.checked = e.target.checked;

            this.dispatchEvent(new CustomEvent("change", {
                detail: {
                    checked: this.checked,
                    value: this.value,
                },
            }))
        });
    }
}

if (!customElements.get('ea-switch')) {
    customElements.define('ea-switch', EaSwitch);
}