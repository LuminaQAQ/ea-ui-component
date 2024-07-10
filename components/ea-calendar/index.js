// @ts-nocheck
import Base from '../Base.js';
import { createElement, createSlotElement } from '../../utils/createElement.js';

import "../ea-button-group/index.js";
import "../ea-button/index.js";
import "../ea-descriptions/index.js";
import "../ea-descriptions-item/index.js";

const stylesheet = `
.ea-calendar_wrap {
  padding: 12px 20px 35px;
}
.ea-calendar_wrap .ea-calendar-header_wrap {
  border-bottom: 1px solid #ebeef5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.5rem;
}
.ea-calendar_wrap .ea-calendar-header_wrap .ea-calendar-header_changer .ea-calendar-header_sg-changer {
  border: 1px solid #ebeef5;
  border-left: 0px none transparent;
}
.ea-calendar_wrap .ea-calendar-header_wrap .ea-calendar-header_changer .ea-calendar-header_sg-changer:first-child {
  border-left: 1px solid #ebeef5;
}
.ea-calendar_wrap .ea-calendar_calendar-wrap .ea-calendar_table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
}
.ea-calendar_wrap .ea-calendar_calendar-wrap .ea-calendar_table th {
  font-weight: 400;
  color: #606266;
  padding: 12px 0;
}
.ea-calendar_wrap .ea-calendar_calendar-wrap .ea-calendar_table td {
  border-right: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;
}
.ea-calendar_wrap .ea-calendar_calendar-wrap .ea-calendar_table td.is-selected {
  color: #1989fa;
  background-color: #f2f8fe;
}
.ea-calendar_wrap .ea-calendar_calendar-wrap .ea-calendar_table td.is-today {
  color: #1989fa;
}
.ea-calendar_wrap .ea-calendar_calendar-wrap .ea-calendar_table td.is-disabled {
  pointer-events: none;
  color: #c0c4cc;
}
.ea-calendar_wrap .ea-calendar_calendar-wrap .ea-calendar_table td span {
  display: block;
  box-sizing: border-box;
  height: 85px;
  padding: 8px;
}
.ea-calendar_wrap .ea-calendar_calendar-wrap .ea-calendar_table td span .calendar-description {
  margin-top: auto;
}
.ea-calendar_wrap .ea-calendar_calendar-wrap .ea-calendar_table tr:first-child td {
  border-top: 1px solid #ebeef5;
}
.ea-calendar_wrap .ea-calendar_calendar-wrap .ea-calendar_table tr td:first-child {
  border-left: 1px solid #ebeef5;
  border-top: 1px solid #ebeef5;
}
`;

/**
 * 创建一个具有特定文本和类名的元素。
 * 
 * 此函数专为创建具有特定样式和文本的按钮元素而设计，用于日历头部的改变功能。
 * 它通过传入的文本和类名参数，生成一个具有相应属性的元素，并返回该元素。
 * 
 * @param {string} text - 按钮元素的显示文本。
 * @param {string} className - 按钮元素的类名，用于应用特定的样式。
 * @returns {HTMLElement} - 返回创建的具有指定文本和类名的按钮元素。
 */
const createChangerElement = (text, className) => {
    // 创建一个具有特定类名的元素，类名包括一个基础类和一个由传入的className参数动态组成的类。
    const el = createElement('ea-button', `ea-calendar-header_sg-changer ea-calendar-header_changer-${className}`);
    // 设置元素的内部文本为传入的text参数。
    el.innerText = text;
    // 设置元素的尺寸为小号。
    el.size = "small";

    // 返回创建的元素。
    return el;
}

/**
 * 创建一个包含一周七天的表头thead元素。
 * 
 * 该函数通过动态创建元素的方式，构建一个包含一周七天名称的表头。使用map函数遍历一周的天数，
 * 为每一天创建一个th元素，并设置其innerText为对应的天数名称。然后将这些th元素添加到一个tr元素中，
 * 最后将tr元素添加到thead中，完成一周七天表头的创建。
 * 
 * @returns {HTMLElement} 返回创建好的thead元素。
 */
const createThead = (weekArr = ["一", "二", "三", "四", "五", "六", "日"]) => {
    // 创建tr元素
    const tr = createElement('tr');

    // 使用map函数遍历一周的天数，为每一天创建一个th元素
    const ths = weekArr.map(item => {
        // 创建th元素
        const th = createElement('th');
        // 设置th元素的文本内容为当前遍历的天数名称
        th.innerText = item;

        return th;
    });

    // 将所有th元素添加到tr元素中
    tr.append(...ths);

    // 返回创建好的thead元素
    return tr;
}

export class EaCalendar extends Base {
    #wrap;

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

        const headerDateContent = createElement('span', 'ea-calendar-header_content');

        const headerChanger_lastMonth = createChangerElement("上个月", "lastMonth");
        const headerChanger_today = createChangerElement("今天", "today");
        const headerChanger_nextMonth = createChangerElement("下个月", "nextMonth");
        const headerChangerWrap = createElement('ea-button-group', 'ea-calendar-header_changer', [headerChanger_lastMonth, headerChanger_today, headerChanger_nextMonth]);

        const calendarThead = createElement('thead', 'ea-calendar_table-head');
        const calendarTbody = createElement('tbody', 'ea-calendar_table-body');
        const calendarTable = createElement('table', 'ea-calendar_table', [calendarThead, calendarTbody]);
        const calendarWrap = createElement('div', 'ea-calendar_calendar-wrap', [calendarTable]);

        const headerWrap = createElement('div', 'ea-calendar-header_wrap', [headerDateContent, headerChangerWrap]);

        const wrap = createElement('div', 'ea-calendar_wrap', [headerWrap, calendarWrap]);

        this.#wrap = wrap;

        this.#headerDateContent = headerDateContent;

        this.#headerChangerWrap = headerChangerWrap;
        this.#lastMonthBtn = headerChanger_lastMonth;
        this.#todayBtn = headerChanger_today;
        this.#nextMonthBtn = headerChanger_nextMonth;

        this.#tableHead = calendarThead;
        this.#tableContent = calendarTbody;

        this.build(shadowRoot, stylesheet);
        this.shadowRoot.appendChild(wrap);
    }

    getToday() {
        const myDate = new Date();

        return `${myDate.getFullYear()}-${myDate.getMonth() + 1}`
    }

    getUserToday(date) {
        const myDate = new Date(date);

        return `${myDate.getFullYear()}-${myDate.getMonth() + 1}`
    }


    // ------- week-start 用户传入的每周起始日 -------
    // #region
    get weekStart() {
        return this.getAttribute('week-start') || "一";
    }

    set weekStart(weekStart) {
        this.setAttribute('week-start', weekStart);

        this.#tableHead.innerHTML = createThead(this.#getUserWeekStart(this.week, weekStart)).innerHTML;
    }
    // #endregion
    // ------- end -------

    // ------- date 用户传入日期 -------
    // #region
    get date() {
        const myDate = new Date();

        return this.getAttribute('date') || this.getToday();
    }

    set date(date) {
        this.setAttribute('date', date);

        this.#headerDateContent.innerHTML = date = isNaN(new Date(date)) ? this.getToday() : this.getUserToday(date);

        this.#handleDateChange(this.#tableContent, date, this.weekStart);
    }
    // #endregion
    // ------- end -------

    get week() {
        return ["日", "一", "二", "三", "四", "五", "六"];
    }

    /**
     * 
     * @param {Array} weekArr 
     * @param {string} start 
     * @returns 
     */
    #getUserWeekStart(weekArr, start) {
        if (!weekArr.includes(start)) return weekArr;

        const index = weekArr.findIndex((item, index) => {
            if (item === start) return index;
        })

        if (index === 0 || index === -1) return weekArr;

        return weekArr.slice(index).concat(weekArr.slice(0, index));
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
        const weekArr = this.#getUserWeekStart(this.week, weekStart);

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

    /**
     * 初始化日期选择器的按钮事件监听器。
     * 此方法为上个月、今天和下个月按钮添加点击事件监听器，以实现日期的选择和切换。
     * 
     * @private
     */
    #initDateChangersEvent() {
        // 为上个月按钮添加点击事件监听器，点击时调用#handleMonthChange方法，参数为"last"表示切换到上个月
        this.#lastMonthBtn.addEventListener('click', () => {
            this.#handleMonthChange("last");
        });

        // 为今天按钮添加点击事件监听器，点击时设置日期为当前日期
        this.#todayBtn.addEventListener('click', () => {
            this.date = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
        });

        // 为下个月按钮添加点击事件监听器，点击时调用#handleMonthChange方法，参数为"next"表示切换到下个月
        this.#nextMonthBtn.addEventListener('click', () => {
            this.#handleMonthChange("next");
        });
    }

    init() {
        const that = this;

        this.weekStart = this.weekStart;

        this.date = this.date;

        this.#initDateChangersEvent();
    }

    connectedCallback() {
        this.init();
    }
}

if (!customElements.get('ea-calendar')) {
    customElements.define('ea-calendar', EaCalendar);
}