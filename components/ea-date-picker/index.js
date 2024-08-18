// @ts-nocheck
import Base from '../Base.js';
import '../ea-icon/index.js'
import { createSlotElement, createElement } from '../../utils/createElement.js';
import { timeout } from '../../utils/timeout.js';

import "../ea-calendar/index.js"
import "../ea-input/index.js"

const stylesheet = `
.ea-date-picker_wrap .ea-date-picker_input-wrap {
  position: relative;
}
.ea-date-picker_wrap .ea-date-picker_dropdown-wrap {
  position: absolute;
  background-color: #fff;
  transform-origin: top center;
  transform: scaleY(0);
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
  z-index: 2;
}
.ea-date-picker_wrap.is-open .ea-date-picker_dropdown-wrap {
  transform: scaleY(1);
}
.ea-date-picker_wrap.with-transition .ea-date-picker_dropdown-wrap {
  transition: transform 0.3s;
}
`;

export class EaDatePicker extends Base {
    #container;

    #calendarWrap;
    #calendarElement;

    #calendarInput;
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });

        shadowRoot.innerHTML = `
            <div class='ea-date-picker_wrap' part='container'>
                <div class='ea-date-picker_input-wrap' part='input-wrap'>
                    <ea-input class="ea-date-picker_input" part='input' prefix-icon="icon-calendar-times-o" readonly></ea-input>
                </div>
                <div class='ea-date-picker_dropdown-wrap' part='dropdown-wrap'>
                    <ea-calendar class="ea-date-picker_calendar" size="mini"></ea-calendar>
                </div>
            </div>
        `;

        this.#container = shadowRoot.querySelector('.ea-date-picker_wrap');

        this.#calendarWrap = shadowRoot.querySelector('.ea-date-picker_dropdown-wrap');
        this.#calendarElement = shadowRoot.querySelector('.ea-date-picker_calendar');

        this.#calendarInput = shadowRoot.querySelector('.ea-date-picker_input');

        this.build(shadowRoot, stylesheet);
    }

    // ------- name 名称 -------
    // #region
    get name() {
        return this.getAttribute('name') || 'datePicker';
    }

    set name(val) {
        this.setAttribute('name', val);
    }
    // #endregion
    // ------- end -------

    // ------- width 宽度 -------
    // #region
    get width() {
        return this.getAttribute('width') || '200px';
    }

    set width(val) {
        this.setAttribute('width', val);

        this.#container.style.width = val;
        this.#calendarWrap.style.width = val;
        this.style.display = 'inline-block';
        this.style.width = val;
    }
    // #endregion
    // ------- end -------

    // ------- value 日期值 -------
    // #region
    get value() {
        return this.getAttribute('value') || '';
    }

    set value(val) {
        if (isNaN(new Date(val)) && val !== '') {
            const date = new Date(Date.now());
            val = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        }

        this.setAttribute('value', val);
        this.#calendarInput.value = val;
    }
    // #endregion
    // ------- end -------

    // ------- placeholder 占位符 -------
    // #region
    get placeholder() {
        return this.getAttribute('placeholder') || '';
    }

    set placeholder(val) {
        this.setAttribute('placeholder', val);

        this.#calendarInput.placeholder = val;
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

        this.#calendarInput.disabled = val;
    }
    // #endregion
    // ------- end -------

    // ------- align 对齐方式 -------
    // #region
    get align() {
        return this.getAttribute('align') || 'left';
    }

    set align(value) {
        this.setAttribute('align', value);

        this.#calendarInput.shadowRoot.querySelector('input').style.textAlign = value;
    }
    // #endregion
    // ------- end -------

    #init() {
        this.name = this.name;

        this.width = this.width;

        this.value = this.value;

        this.placeholder = this.placeholder;

        this.disabled = this.disabled;

        this.align = this.align;

        this.#calendarElement.addEventListener('select', (e) => {
            const { year, month, date, day } = e.detail;
            this.value = `${year}-${month}-${date}`;
            this.#calendarInput.value = `${year}-${month}-${date}`;

            this.dispatchEvent(new CustomEvent('change', {
                detail: {
                    fulllDate: `${year}-${month}-${date}`,
                    year,
                    month,
                    date,
                    week: day,
                },
            }));
        });

        this.#calendarInput.addEventListener('focus', () => {
            this.#container.classList.add('is-open');
        });

        window.addEventListener('click', (e) => {
            if (!this.contains(e.target)) {
                this.#container.classList.remove('is-open');
            } else {
                this.#calendarInput.shadowRoot.querySelector('.ea-input_inner').focus();
            }
        });

        timeout(() => {
            this.#container.classList.add('with-transition');
        }, 300);

        this.setAttribute('data-ea-component', true);
    }

    connectedCallback() {
        this.#init();
    }
}

if (!customElements.get('ea-date-picker')) {
    customElements.define('ea-date-picker', EaDatePicker);
}