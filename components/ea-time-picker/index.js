// @ts-nocheck
import Base from '../Base.js';
import '../ea-icon/index.js'
import { createSlotElement, createElement } from '../../utils/createElement.js';
import { timeout } from '../../utils/timeout.js';

import "../ea-input/index.js"

const stylesheet = `

`;

export class EaTimePicker extends Base {
    #container;
    #timePickerInput;
    #dropdownWrap;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });

        shadowRoot.innerHTML = `
            <div class='ea-time-picker_wrap' part='container'>
                <ea-icon class="ea-time-picker_icon" icon="icon-clock"></ea-icon>
                <ea-input part='input' autocomplete="off" readonly></ea-input>
                <div class="ea-time-picker_dropdown-wrap" part='dropdown-wrap'></div>
            </div>
        `;

        this.#container = shadowRoot.querySelector('.ea-time-picker_wrap');
        this.#timePickerInput = shadowRoot.querySelector('ea-input');
        this.#dropdownWrap = shadowRoot.querySelector('.ea-time-picker_dropdown-wrap');

        this.build(shadowRoot, stylesheet);
    }

    // ------- width 宽度 -------
    // #region
    get width() {
        return this.getAttribute('width') || "200px";
    }

    set width(value) {
        this.setAttribute('width', value);

        this.#container.style.width = value;
    }
    // #endregion
    // ------- end -------

    #initElementsStyle() {
        const input = this.#timePickerInput.shadowRoot.querySelector('.ea-input_inner');
        input.style.paddingLeft = "2.5rem";
        this.#dropdownWrap.style.width = this.#timePickerInput.getBoundingClientRect().width + "px";

        timeout(() => {
            this.#container.classList.add('with-transition');
        }, 50);
    }

    #init() {
        this.width = this.width;

        this.#timePickerInput.addEventListener('focus', () => {
            this.#container.classList.add('is-open');
        });

        this.#timePickerInput.addEventListener('blur', () => {
            this.#container.classList.remove('is-open');
        });

        this.#initElementsStyle();
    }

    connectedCallback() {
        this.#init();
    }
}

if (!customElements.get('ea-time-picker')) {
    customElements.define('ea-time-picker', EaTimePicker);
}