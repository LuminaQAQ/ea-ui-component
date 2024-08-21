// @ts-nocheck
import Base from '../Base.js';
import { createElement, createSlotElement } from '../../utils/createElement.js';

import "../ea-button-group/index.js";
import "../ea-button/index.js";

import { createChangerElement } from './src/utils/createChangerElement.js';
import { createThead } from './src/utils/createThead.js';
import { getToday, getUserToday } from './src/utils/getDate.js';
import { getUserWeekStart } from './src/utils/getUserWeekStart.js';

import { stylesheet } from './src/style/stylesheet.js';

export class EaCalendar extends Base {
    #container;

    #headerDateWrap;
    #headerDateContent;
    #headerChangerWrap;

    #lastMonthBtn;
    #todayBtn;
    #nextMonthBtn;

    #tableHead;
    #tableContent;
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });

        shadowRoot.innerHTML = `
            <div class='ea-calendar_wrap' part='container'>
                <div class='ea-calendar-header_wrap' part='header-wrap'>
                    <span class='ea-calendar-header_content' part='header-content'></span>
                    <ea-button-group class='ea-calendar-header_changer' part='header-changer'>
                        <ea-button class='ea-calendar-header_sg-changer ea-calendar-header_changer-lastMonth' part='header-changer-lastMonth' size="small">上个月</ea-button>
                        <ea-button class='ea-calendar-header_sg-changer ea-calendar-header_changer-today' part='header-changer-today' size="small">今天</ea-button>
                        <ea-button class='ea-calendar-header_sg-changer ea-calendar-header_changer-nextMonth' part='header-changer-nextMonth' size="small">下个月</ea-button>
                    </ea-button-group>
                </div>
                <div class='ea-calendar_calendar-wrap' part='calendar-wrap'>
                    <table class='ea-calendar_table' part='table'>
                        <thead class='ea-calendar_table-head' part='table-head'></thead>
                        <tbody class='ea-calendar_table-body' part='table-body'></tbody>
                    </table>
                </div>
            </div>
        `;

        this.#container = this.shadowRoot.querySelector('.ea-calendar_wrap');

        this.#headerDateContent = shadowRoot.querySelector('.ea-calendar-header_content');
        this.#headerDateWrap = shadowRoot.querySelector('.ea-calendar-header_wrap');

        this.#headerChangerWrap = shadowRoot.querySelector('.ea-calendar-header_changer');
        this.#lastMonthBtn = shadowRoot.querySelector('.ea-calendar-header_changer-lastMonth');
        this.#todayBtn = shadowRoot.querySelector('.ea-calendar-header_changer-today');
        this.#nextMonthBtn = shadowRoot.querySelector('.ea-calendar-header_changer-nextMonth');

        this.#tableHead = shadowRoot.querySelector('.ea-calendar_table-head');
        this.#tableContent = shadowRoot.querySelector('.ea-calendar_table-body');

        this.build(shadowRoot, stylesheet);
    }

    // ------- week-start 用户传入的每周起始日 -------
    // #region
    get weekStart() {
        return this.getAttribute('week-start') || "一";
    }

    set weekStart(weekStart) {
        this.setAttribute('week-start', weekStart);

        this.#tableHead.innerHTML = createThead(getUserWeekStart(this.week, weekStart)).innerHTML;
    }
    // #endregion
    // ------- end -------

    // ------- date 用户传入日期 -------
    // #region
    get date() {
        const myDate = new Date();

        return this.getAttribute('date') || getToday();
    }

    set date(date) {
        this.setAttribute('date', date);

        this.#headerDateContent.innerHTML = date = isNaN(new Date(date)) ? getToday() : getUserToday(date);

        this.#handleDateChange(this.#tableContent, date, this.weekStart);
    }
    // #endregion
    // ------- end -------

    // ------- size 用户传入尺寸 -------
    // #region
    get size() {
        const attr = this.getAttribute('size');
        return ["mini"].includes(attr) ? attr : "medium";
    }

    set size(size) {
        this.setAttribute('size', size);

        this.#container.classList.add(size);

        if (size === "mini") {
            const prevIcon = createElement("span", "prev-btn");
            prevIcon.innerText = "<";
            const nextIcon = createElement("span", "next-btn");
            nextIcon.innerText = ">";

            this.#lastMonthBtn = prevIcon;
            this.#nextMonthBtn = nextIcon;

            this.#headerDateWrap.insertBefore(prevIcon, this.#headerDateWrap.firstChild);
            this.#headerDateWrap.appendChild(nextIcon);
        }
    }
    // #endregion
    // ------- end -------

    get week() {
        return ["日", "一", "二", "三", "四", "五", "六"];
    }

    /**
     * 处理日历项的选择事件。
     * 当日历项被点击时，此函数被调用。它的目的是切换所点击项的选中状态，并取消其他项的选中状态。
     * @param {HTMLElement} node - 日历项元素节点。这个节点代表日历中的一个日期单元格。
     */
    #handleCalendarItemSelect(node) {
        // 为日历项添加点击事件监听器
        node.addEventListener('click', (e) => {
            // 遍历日历表中的所有单元格，并移除它们的 'is-selected' 类，以取消选中状态
            this.#tableContent.querySelectorAll('td').forEach(el => {
                el.classList.remove('is-selected');
            });

            // 如果当前点击的节点已经选中，则取消选中状态，否则选中当前节点
            if (node.classList.contains('is-selected')) {
                node.classList.remove('is-selected');
            } else {
                node.classList.add('is-selected');
            }

            const myDate = new Date(this.date);
            this.dispatchEvent(new CustomEvent('select', {
                detail: {
                    year: myDate.getFullYear(),
                    month: myDate.getMonth() + 1,
                    date: Number(node.innerText),
                    day: this.week[Number(node.innerText) % 7],
                }
            }));
        });
    }

    #handleMonthChange(flag) {
        const date = new Date(this.date);
        date.setMonth(date.getMonth() + (flag === "next" ? 1 : -1));

        this.date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }

    /**
     * 根据给定的日期更新页面上的日历视图。
     * @param {HTMLElement} content - 用于展示日历的HTML元素。
     * @param {string|number|Date} date - 需要展示的月份的日期对象。
     */
    #handleDateChange(content, date, weekStart = "一") {
        date = isNaN(new Date(date)) ? new Date() : new Date(date);

        // 清空内容区域，为展示新月份做准备
        content.innerHTML = "";

        // 创建当前月份的日期对象
        const userDate = new Date(date);
        // 获取月份，月份从0开始，因此需要加1
        const month = userDate.getMonth() + 1;

        // 初始化当前日期为月份的第一天
        const currentDate = new Date(date);
        currentDate.setDate(1);

        // 计算上个月的最后一天
        const lastDate = new Date(date);
        lastDate.setMonth(month);
        lastDate.setDate(0);

        // 计算下个月的第一天
        const nextDate = new Date(date);
        nextDate.setMonth(month);
        nextDate.setDate(1);

        // 定义星期的中文简写数组
        const weekArr = getUserWeekStart(this.week, weekStart);

        // 构建日历的行，每行7天
        for (let i = 0; i < 6; i++) {
            const tr = createElement('tr');

            // 构建每一天的单元格
            for (let j = 0; j < 7; j++) {
                const { length } = tr.children;
                const td = createElement('td');
                const span = createElement('span');

                // 获取当前日期是星期几
                const day = currentDate.getDay();
                const myDate = new Date();

                // 判断当前单元格应展示哪一天的日期
                if (weekArr[length] === this.week[day] && month === currentDate.getMonth() + 1) {
                    // 如果是当前月的日期，则展示当前月的日期
                    span.innerText = currentDate.getDate();
                    currentDate.setDate(currentDate.getDate() + 1);
                    this.#handleCalendarItemSelect(td);
                } else if (month == currentDate.getMonth()) {
                    // 如果是下个月的日期，则展示下个月的日期
                    span.innerText = currentDate.getDate();
                    currentDate.setDate(currentDate.getDate() + 1);
                    td.classList.add("is-disabled");
                } else {
                    // 如果是上个月的日期，则展示上个月的日期
                    const lastMonthDateStep = j - day + 2;
                    const step = weekArr.findIndex((item, index) => {
                        if (item === "一") return index;
                    })

                    lastDate.setMonth(month - 1);
                    lastDate.setDate(lastMonthDateStep > 0 ? (day + length) - step : lastMonthDateStep);
                    span.innerText = lastDate.getDate();
                    td.classList.add("is-disabled");
                }

                const userToday = new Date(this.date);
                if (currentDate.getFullYear() === myDate.getFullYear() && currentDate.getMonth() === myDate.getMonth() && currentDate.getDate() === myDate.getDate() + 1) {
                    td.classList.add("is-today");
                }

                if (currentDate.getFullYear() === userDate.getFullYear() && currentDate.getMonth() === userDate.getMonth() && currentDate.getDate() === userDate.getDate() + 1) {
                    td.classList.add("is-selected");
                }


                // 将日期单元格添加到行中
                td.appendChild(span);
                tr.appendChild(td);
            }

            // 将行添加到日历表格中
            content.appendChild(tr);
        }
    }


    connectedCallback() {
        const that = this;

        this.weekStart = this.weekStart;

        this.date = this.date;

        this.size = this.size;

        // 上个月按钮
        this.#lastMonthBtn.addEventListener('click', () => {
            this.#handleMonthChange("last");
        });

        // 今天按钮
        this.#todayBtn.addEventListener('click', () => {
            this.date = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
        });

        // 下个月按钮
        this.#nextMonthBtn.addEventListener('click', () => {
            this.#handleMonthChange("next");
        });
    }
}

if (!customElements.get('ea-calendar')) {
    customElements.define('ea-calendar', EaCalendar);
}