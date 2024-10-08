// @ts-nocheck
import Base from '../Base.js';
import '../ea-icon/index.js'
import { createSlotElement, createElement } from '../../utils/createElement.js';
import { timeout } from '../../utils/timeout.js';

import "../ea-input/index.js"
import '../ea-button/ea-button.js'

const stylesheet = `
@import url('/ea_ui_component/icon/index.css');

.ea-time-picker_wrap {
  position: relative;
}
.ea-time-picker_wrap .ea-time-picker_dropdown-wrap {
  position: absolute;
  bottom: -12px;
  left: 0;
  transform-origin: center top;
  transform: translateY(100%) scaleY(0);
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 2;
}
.ea-time-picker_wrap .ea-time-picker_dropdown-wrap::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0.5rem;
  border: 0.5rem solid transparent;
  border-bottom-color: #fff;
  transform: translateY(-100%);
}
.ea-time-picker_wrap .ea-time-picker_dropdown-wrap .ea-time-picker_dropdown-inner-wrap {
  display: flex;
  position: relative;
  margin: 1rem 0;
}
.ea-time-picker_wrap .ea-time-picker_dropdown-wrap .ea-time-picker_dropdown-inner-wrap::before, .ea-time-picker_wrap .ea-time-picker_dropdown-wrap .ea-time-picker_dropdown-inner-wrap::after {
  content: "";
  position: absolute;
  left: 0;
  transform: translateY(-50%);
  width: 100%;
}
.ea-time-picker_wrap .ea-time-picker_dropdown-wrap .ea-time-picker_dropdown-inner-wrap::before {
  top: calc(50% - 16px);
  border-bottom: 1px solid #e4e7ed;
}
.ea-time-picker_wrap .ea-time-picker_dropdown-wrap .ea-time-picker_dropdown-inner-wrap::after {
  top: calc(50% + 16px);
  border-bottom: 1px solid #e4e7ed;
}
.ea-time-picker_wrap .ea-time-picker_dropdown-wrap .ea-time-picker_dropdown-inner-wrap .ea-time-picker_dropdown-inner {
  flex: 1;
  max-height: 190px;
  box-sizing: border-box;
  padding: 5rem 0;
  text-align: center;
  overflow: auto;
  scrollbar-width: none;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 0px;
  list-style-type: none;
}
.ea-time-picker_wrap .ea-time-picker_dropdown-wrap .ea-time-picker_dropdown-inner-wrap .ea-time-picker_dropdown-inner .ea-time-picker_dropdown-item {
  height: 32px;
  line-height: 32px;
  font-size: 12px;
  color: #606266;
  transition: color 0.3s;
}
.ea-time-picker_wrap .ea-time-picker_dropdown-wrap .ea-time-picker_dropdown-inner-wrap .ea-time-picker_dropdown-inner .ea-time-picker_dropdown-item.is-active {
  color: #409eff;
}
.ea-time-picker_wrap .ea-time-picker_dropdown-wrap .ea-time-picker_dropdown-inner-wrap .ea-time-picker_dropdown-inner .ea-time-picker_dropdown-item.is-disabled {
  color: #c0c4cc;
}
.ea-time-picker_wrap .ea-time-picker_dropdown-wrap .ea-time-picker_dropdown-button-group {
  text-align: right;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
.ea-time-picker_wrap.is-open .ea-time-picker_dropdown-wrap {
  transform: translateY(100%) scaleY(1);
}
.ea-time-picker_wrap.with-transition .ea-time-picker_dropdown-wrap {
  transition: transform 0.3s ease-in-out;
}
`;

export class EaTimePicker extends Base {
    #container;
    #timePickerInput;

    #dropdownWrap;
    #timePickerHourWrap;
    #timePickerMinuteWrap;
    #timePickerSecondWrap;

    #timePickerIsInit = false;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });

        shadowRoot.innerHTML = `
            <div class='ea-time-picker_wrap' part='container'>
                <ea-input part='input' autocomplete="off" readonly prefix-icon="icon-clock"></ea-input>
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

    // ------- name 属性 -------
    // #region
    get name() {
        return this.getAttribute('name') || 'timePicker';
    }

    set name(value) {
        this.setAttribute('name', value);
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

    // ------- value 时间 -------
    // #region
    get value() {
        return this.time;
    }

    set value(value) {
        this.time = value;
    }
    // #endregion
    // ------- end -------

    // ------- disabled 禁用 -------
    // #region
    get disabled() {
        return this.getAttrBoolean('disabled') || false;
    }

    set disabled(value) {
        this.setAttribute('disabled', value);

        this.#timePickerInput.disabled = value;
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

        this.#timePickerInput.shadowRoot.querySelector('input').style.textAlign = value;
    }
    // #endregion
    // ------- end -------

    // ------- limit-range-start 限制起始时间 -------
    // #region
    get limitRangeStart() {
        const attr = this.getAttribute('limit-range-start');
        if (!attr) return "00:00:00";
        else {
            const [hour, minute, second] = this.getAttribute('limit-range-start')?.split(':');
            return `${this.#handleLessThanTen(hour)}:${this.#handleLessThanTen(minute)}:${this.#handleLessThanTen(second)}`;
        }
    }

    set limitRangeStart(value) {
        this.setAttribute('limit-range-start', value);
    }
    // #endregion
    // ------- end -------

    // ------- limit-range-end 限制结束时间 -------
    // #region
    get limitRangeEnd() {
        const attr = this.getAttribute('limit-range-end');
        if (!attr) return "23:59:59"
        else {
            const [hour, minute, second] = this.getAttribute('limit-range-end')?.split(':');
            return `${this.#handleLessThanTen(hour)}:${this.#handleLessThanTen(minute)}:${this.#handleLessThanTen(second)}`;
        }
    }

    set limitRangeEnd(value) {
        this.setAttribute('limit-range-end', value);
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

            if (this.#timePickerIsInit) this.dispatchEvent(new CustomEvent('change', { detail: { time: this.time } }));

            this.#timePickerInput.value = `${this.hour}:${this.minute}:${this.second}`;
            this.time = `${this.hour}:${this.minute}:${this.second}`;

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
        const [startHour, startMinute, startSecond] = this.limitRangeStart.split(':');
        const [endHour, endMinute, endSecond] = this.limitRangeEnd.split(':');

        const todayDate = new Date();
        const startDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate(), startHour, startMinute, startSecond);
        const endDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate(), endHour, endMinute, endSecond);
        if (startDate > endDate) throw new Error('limit-range-start must be less than limit-range-end');

        const initTimeItem = (startTime, endTime, wrap, type) => {
            startTime = Number(startTime);
            endTime = Number(endTime);
            let start = 0;
            let end = 0;

            switch (type) {
                case 'hour':
                    start = 0;
                    end = 23;
                    break;
                default:
                    start = 0;
                    end = 59;
                    if (!String(startTime).localeCompare(endTime) && (startHour !== endHour)) endTime = endTime === 0 ? 59 : endTime;
            }

            for (let i = start; i <= end; i++) {
                const li = createElement('li', 'ea-time-picker_dropdown-item');
                li.innerText = this.#handleLessThanTen(i);
                wrap.appendChild(li);

                if (i >= startTime && i <= endTime) this.#handleTimeItemClickEvent(li, i, wrap, type);
                else li.classList.add('is-disabled');
            }
        }

        initTimeItem(startHour, endHour, this.#timePickerHourWrap, 'hour');
        initTimeItem(startMinute, endMinute, this.#timePickerMinuteWrap, 'minute');
        initTimeItem(startSecond, endSecond, this.#timePickerSecondWrap, 'second');

        this.#handleTimeWrapScroll(this.#timePickerHourWrap);
        this.#handleTimeWrapScroll(this.#timePickerMinuteWrap);
        this.#handleTimeWrapScroll(this.#timePickerSecondWrap);
    }

    #initToggleDropdownWrapShow() {
        let timePickerIsInit = false;

        const dropdownWrapInitCallback = () => {
            this.time = this.time;
            timePickerIsInit = true;
            this.#timePickerIsInit = true;
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
        this.name = this.name;

        this.width = this.width;

        this.disabled = this.disabled;

        this.align = this.align;

        this.limitRangeStart = this.limitRangeStart;
        this.limitRangeEnd = this.limitRangeEnd;

        this.#initElementsStyle();
        this.#initTimerPickerTimeItem();

        this.time = this.time;
        this.#timePickerInput.value = `${this.hour}:${this.minute}:${this.second}`;

        this.#initToggleDropdownWrapShow();

        this.setAttribute('data-ea-component', true);
    }

    connectedCallback() {
        this.#init();
    }
}

if (!customElements.get('ea-time-picker')) {
    customElements.define('ea-time-picker', EaTimePicker);
}