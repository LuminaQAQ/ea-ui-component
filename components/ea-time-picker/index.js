// @ts-nocheck
import Base from '../Base.js';
import '../ea-icon/index.js'
import { createSlotElement, createElement } from '../../utils/createElement.js';
import { timeout } from '../../utils/timeout.js';

import "../ea-input/index.js"
import '../ea-button/index.js'

const stylesheet = `

`;

export class EaTimePicker extends Base {
    #container;
    #timePickerInput;

    #dropdownWrap;
    #timePickerHourWrap;
    #timePickerMinuteWrap;
    #timePickerSecondWrap;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });

        shadowRoot.innerHTML = `
            <div class='ea-time-picker_wrap' part='container'>
                <ea-icon class="ea-time-picker_icon" icon="icon-clock"></ea-icon>
                <ea-input part='input' autocomplete="off" readonly></ea-input>
                <div class="ea-time-picker_dropdown-wrap" part='dropdown-wrap'>
                    <div class="ea-time-picker_dropdown-inner-wrap">
                        <ul class="ea-time-picker_dropdown-inner ea-time-picker_dropdown-inner-hour" part='dropdown-inner'>
                        </ul>
                        <ul class="ea-time-picker_dropdown-inner ea-time-picker_dropdown-inner-minute" part='dropdown-inner'>
                        </ul>
                        <ul class="ea-time-picker_dropdown-inner ea-time-picker_dropdown-inner-second" part='dropdown-inner'>
                        </ul>
                    </div>
                </div>
            </div>
        `;

        this.#container = shadowRoot.querySelector('.ea-time-picker_wrap');
        this.#timePickerInput = shadowRoot.querySelector('ea-input');

        this.#dropdownWrap = shadowRoot.querySelector('.ea-time-picker_dropdown-wrap');
        this.#timePickerHourWrap = shadowRoot.querySelector('.ea-time-picker_dropdown-inner-hour');
        this.#timePickerMinuteWrap = shadowRoot.querySelector('.ea-time-picker_dropdown-inner-minute');
        this.#timePickerSecondWrap = shadowRoot.querySelector('.ea-time-picker_dropdown-inner-second');

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

    // ------- time 时间 -------
    // #region
    get time() {
        return this.getAttribute('time') || '00:00:00';
    }

    set time(value) {
        this.setAttribute('time', value);

        const [hour, minute, second] = value.split(':');

        this.hour = hour;
        this.minute = minute;
        this.second = second;
    }
    // #endregion
    // ------- end -------

    // ------- hour 小时 -------
    // #region
    get hour() {
        const attr = this.getAttrNumber('hour');
        return this.#handleLessThanTen(attr);
    }

    set hour(value) {
        this.setAttribute('hour', value);

        this.#handleTimeItemPicker(this.#timePickerHourWrap, value);
    }
    // #endregion
    // ------- end -------

    // ------- minute 分钟 -------
    // #region
    get minute() {
        const attr = this.getAttrNumber('minute');
        return this.#handleLessThanTen(attr);
    }

    set minute(value) {
        this.setAttribute('minute', value);

        this.#handleTimeItemPicker(this.#timePickerMinuteWrap, value);
    }
    // #endregion
    // ------- end -------

    // ------- second 秒 -------
    // #region
    get second() {
        const attr = this.getAttrNumber('second');
        return this.#handleLessThanTen(attr);
    }

    set second(value) {
        this.setAttribute('second', value);

        this.#handleTimeItemPicker(this.#timePickerSecondWrap, value);
    }
    // #endregion
    // ------- end -------

    #handleLessThanTen(num, defaultNum = '00') {
        num = Number(num);
        return num < 10 ? `0${num}` : (num || defaultNum);
    }

    #handleTimeItemPicker(wrap, value) {
        wrap.querySelectorAll('li').forEach(li => {
            if (Number(li.innerText) === Number(this.#handleLessThanTen(value))) li.click();
        });
    }

    #initElementsStyle() {
        const input = this.#timePickerInput.shadowRoot.querySelector('.ea-input_inner');
        input.style.paddingLeft = "2.5rem";
        this.#dropdownWrap.style.width = this.#timePickerInput.getBoundingClientRect().width + "px";

        timeout(() => {
            this.#container.classList.add('with-transition');
        }, 50);
    }

    #handleTimeItemClickEvent(li, index, timeItemWrap, type) {
        li.addEventListener('click', () => {
            const lis = timeItemWrap.querySelectorAll('li');
            lis.forEach(li => {
                li.classList.remove('is-active');
            });
            li.classList.add('is-active');

            const value = this.#handleLessThanTen(index);
            switch (type) {
                case 'hour':
                    this.hour = value;
                    break;
                case 'minute':
                    this.minute = value;
                    break;
                case 'second':
                    this.second = value;
                    break;
            }

            this.#timePickerInput.value = `${this.hour}:${this.minute}:${this.second}`;

            const top = li.getBoundingClientRect().height * index;
            timeItemWrap.scrollTo({
                top,
                behavior: 'smooth',
            });
        });
    }

    #handleTimeWrapScroll(wrap) {
        wrap.addEventListener('wheel', () => {
            timeout(() => {
                const lis = wrap.querySelectorAll('li');
                const height = lis[0].getBoundingClientRect().height;
                const { scrollTop } = wrap
                const index = Math.floor(scrollTop / height);

                if (lis[index]) lis[index].click();
            }, 100);
        });
    }

    #initTimerPickerTimeItem() {
        for (let i = 0; i < 24; i++) {
            const li = createElement('li', 'ea-time-picker_dropdown-item');
            li.innerText = this.#handleLessThanTen(i);
            this.#timePickerHourWrap.appendChild(li);

            this.#handleTimeItemClickEvent(li, i, this.#timePickerHourWrap, 'hour');
        }

        for (let i = 0; i <= 59; i++) {
            const minLi = createElement('li', 'ea-time-picker_dropdown-item');
            const secLi = createElement('li', 'ea-time-picker_dropdown-item');
            minLi.innerText = this.#handleLessThanTen(i);
            secLi.innerText = this.#handleLessThanTen(i);
            this.#timePickerMinuteWrap.appendChild(minLi);
            this.#timePickerSecondWrap.appendChild(secLi);

            this.#handleTimeItemClickEvent(minLi, i, this.#timePickerMinuteWrap, 'minute');
            this.#handleTimeItemClickEvent(secLi, i, this.#timePickerSecondWrap, 'second');
        }

        this.#handleTimeWrapScroll(this.#timePickerHourWrap);
        this.#handleTimeWrapScroll(this.#timePickerMinuteWrap);
        this.#handleTimeWrapScroll(this.#timePickerSecondWrap);
    }

    #initToggleDropdownWrapShow() {
        let timePickerIsInit = false;

        const dropdownWrapInitCallback = () => {
            this.time = this.time;
            timePickerIsInit = true;
            this.#dropdownWrap.removeEventListener('transitionend', dropdownWrapInitCallback);
        }
        this.#timePickerInput.addEventListener('focus', () => {
            this.#container.classList.add('is-open');

            if (!timePickerIsInit) this.#dropdownWrap.addEventListener('transitionend', dropdownWrapInitCallback);
        });

        window.addEventListener('click', (e) => {
            if (!this.contains(e.target)) {
                this.#container.classList.remove('is-open');
            } else {
                this.#timePickerInput.shadowRoot.querySelector('.ea-input_inner').focus();
            }
        });
    }

    #init() {

        this.width = this.width;

        this.#initElementsStyle();
        this.#initTimerPickerTimeItem();

        this.time = this.time;
        this.#timePickerInput.value = `${this.hour}:${this.minute}:${this.second}`;

        this.#initToggleDropdownWrapShow();
    }

    connectedCallback() {
        this.#init();
    }
}

if (!customElements.get('ea-time-picker')) {
    customElements.define('ea-time-picker', EaTimePicker);
}