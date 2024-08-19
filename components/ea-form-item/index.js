// @ts-nocheck
import Base from '../Base.js';
import '../ea-icon/index.js'
import { createSlotElement, createElement } from '../../utils/createElement.js';
import { timeout } from '../../utils/timeout.js';
import { Validator } from "../../utils/Validator.js";

const stylesheet = `

`;

export class EaFromItem extends Base {
    #rule;

    #container;

    #labelWrap;

    #invalidWrap;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });

        shadowRoot.innerHTML = `
            <div class='ea-form-item_wrap' part='container'>
                <label class="ea-form-item_label-wrap" part='label'>
                    <slot name='label'></slot>
                </label>
                <div class="ea-form-item_content-wrap" part='content-wrap'> 
                    <slot></slot>
                    <span class="ea-form-item_invalid-wrap" part='invalid-wrap'>
                        <slot name='invalid-text'></slot>
                    </span>
                </div>
            </div>
        `;

        this.#container = shadowRoot.querySelector('.ea-form-item_wrap');

        this.#labelWrap = shadowRoot.querySelector('.ea-form-item_label-wrap');

        this.#invalidWrap = shadowRoot.querySelector('.ea-form-item_invalid-wrap');

        this.build(shadowRoot, stylesheet);
    }

    // ------- label 标签 -------
    // #region
    get label() {
        return this.getAttribute('label');
    }

    set label(value) {
        this.setAttribute('label', value);

        const slot = this.#labelWrap.querySelector('slot');

        if (slot.assignedNodes().length === 0) {
            this.#labelWrap.innerHTML = value;
        }
    }
    // #endregion
    // ------- end -------

    // ------- trigger 触发器 -------
    // #region
    get trigger() {
        const attr = this.getAttribute('trigger');
        return ['blur', 'change'].includes(attr) ? attr : 'blur';
    }

    set trigger(value) {
        this.setAttribute('trigger', value);
    }
    // #endregion
    // ------- end -------

    // ------- is-invalid 是否校验失败 -------
    // #region
    get isInvalid() {
        return this.getAttribute('is-invalid') === 'true';
    }

    set isInvalid(value) {
        this.setAttribute('is-invalid', value);

        this.#container.classList.toggle('is-required', value);
    }
    // #endregion
    // ------- end -------

    // ------- rule 校验规则 -------
    // #region
    get rule() {
        return this.#rule;
    }

    set rule(value) {
        this.#rule = value;

        for (const key in value) {
            this[key] = value[key];
        }
    }
    // #endregion
    // ------- end -------


    validateEvent() {
        const formItem = this.querySelector('[data-ea-component]');
        try {
            formItem.addEventListener(this.trigger, (e) => {
                timeout(() => {
                    for (const key in this.#rule) {
                        if (Validator[key]) {
                            if (!Validator[key](formItem.value, this.#rule[key])) {
                                formItem.isInvalid = true;
                                this.#container.classList.add('is-required');

                                break;
                            } else {
                                formItem.isInvalid = false;
                                this.#container.classList.remove('is-required');
                            }
                        }
                    }
                }, 100);
            });
        } catch (error) { }
    }

    #init() {
        this.label = this.label;

        this.trigger = this.trigger;

        timeout(() => {
            this.required = this.required;
            this.#container.classList.add('with-transition');
        }, 50);
    }

    connectedCallback() {
        this.#init();
    }
}

if (!customElements.get('ea-form-item')) {
    customElements.define('ea-form-item', EaFromItem);
}