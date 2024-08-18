// @ts-nocheck
import Base from '../Base.js';
import '../ea-icon/index.js'
import { createSlotElement, createElement } from '../../utils/createElement.js';
import { timeout } from '../../utils/timeout.js';

import "../ea-form-item/index.js"
import '../ea-button/index.js'

const stylesheet = `

`;

export class EaForm extends Base {
    #container;
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });

        shadowRoot.innerHTML = `
            <form class='ea-form_wrap' part='container'>
                <slot></slot>
            </form>
        `;

        this.#container = shadowRoot.querySelector('.ea-form_wrap');

        this.build(shadowRoot, stylesheet);
    }

    // ------- data 获取form表单的值 -------
    // #region
    get data() {
        const obj = {};
        const formItems = this.querySelectorAll('[data-ea-component]');

        formItems.forEach(input => {
            obj[input.name] = input.value;
        });

        return obj;
    }
    // #endregion
    // ------- end -------

    #init() {
        const formItemsWrap = this.querySelectorAll('ea-form-item');

        const lenArr = Array.from(formItemsWrap).map(item => item.label.length);
        const max = Math.max(...lenArr);

        formItemsWrap.forEach(item => {
            item.shadowRoot.querySelector('.ea-form-item_label-wrap').style.width = `${max * 20}px`;
        });
    }

    connectedCallback() {
        this.#init();
    }
}

if (!customElements.get('ea-form')) {
    customElements.define('ea-form', EaForm);
}