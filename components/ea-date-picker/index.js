// @ts-nocheck
import Base from '../Base.js';
import '../ea-icon/index.js'
import { createSlotElement, createElement } from '../../utils/createElement.js';
import { timeout } from '../../utils/timeout.js';

import "../ea-calendar/index.js"
import "../ea-input/index.js"

const stylesheet = `

`;

export class EaDatePicker extends Base {
    #container;

    #calendarElement;
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });

        shadowRoot.innerHTML = `
            <div class='ea-date-picker_wrap' part='container'>
                <ea-input class="ea-date-picker_input" part='input'></ea-input>
                <div class='ea-date-picker_dropdown-wrap' part='dropdown-wrap'>
                    <ea-calendar class="ea-date-picker_calendar" size="mini"></ea-calendar>
                </div>
            </div>
        `;

        this.#container = shadowRoot.querySelector('.ea-date-picker_wrap');

        this.#calendarElement = shadowRoot.querySelector('.ea-date-picker_calendar');

        this.build(shadowRoot, stylesheet);
    }

    // ------- width 宽度 -------
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

    #init() {
        this.width = this.width;

        this.#calendarElement.addEventListener('select', (e) => {
            const { year, month, date } = e.detail;
            this.#container.querySelector('.ea-date-picker_input').value = `${year}-${month}-${date}`;
        });
    }

    connectedCallback() {
        this.#init();
    }
}

if (!customElements.get('ea-date-picker')) {
    customElements.define('ea-date-picker', EaDatePicker);
}