// @ts-nocheck
import Base from '../Base.js';
import '../ea-icon/index.js'

import { stylesheet } from './src/style/stylesheet.js';

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

    connectedCallback() {
        this.value = this.value;

        this.disabled = this.disabled;
    }
}

if (!customElements.get('ea-option')) {
    customElements.define('ea-option', EaOption);
}