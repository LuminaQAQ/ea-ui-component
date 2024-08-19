// @ts-nocheck
import Base from '../Base.js';
import '../ea-icon/index.js'
import { createSlotElement, createElement } from '../../utils/createElement.js';
import { timeout } from '../../utils/timeout.js';
import { Validator } from "../../utils/Validator.js";

import "../ea-form-item/index.js"
import '../ea-button/index.js'

const stylesheet = `

`;

export class EaForm extends Base {
    #container;

    #rules;

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

    // ------- rules 校验规则 -------
    // #region
    get rules() {
        return this.#rules || {};
    }

    set rules(value) {
        this.#rules = value;

        const formItems = this.querySelectorAll('ea-form-item');
        const valueItems = this.querySelectorAll('[data-ea-component]');
        valueItems.forEach((input, index) => {
            formItems[index].rule = value[input.name];
            formItems[index].validateEvent();
        });
    }
    // #endregion
    // ------- end -------

    validate() {
        const formItems = this.querySelectorAll('ea-form-item');
        const valueItems = this.querySelectorAll('[data-ea-component]');

        let isValid = [];

        valueItems.forEach((input, index) => {
            if (!Validator.required(input.value)) {
                formItems[index].isInvalid = true;
                input.isInvalid = true;
                isValid.push(input.name);
            } else {
                formItems[index].isInvalid = false;
            }
        });

        return isValid;
    }

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