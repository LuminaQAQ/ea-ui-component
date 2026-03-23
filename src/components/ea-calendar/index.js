import { namespace } from "@/directives/namespace";
import Base from "@components/Base.js";
import stylesheet from "./index.scss?inline";
import "@/components/ea-button/index";
import "@/components/ea-select/index";
import { i18nManager } from "@/utils/I18nManager";
import EaUtils from "@/utils/Utils";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";

/**
 * @typedef DayOption
 * @property {number[]} lastMonRemainingDays
 * @property {number[]} currentMonDays
 * @property {number[]} nextMonRemainingDays
 */

export class EaCalendar extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #header;
  /** @type {HTMLElement} */
  #title;
  /** @type {HTMLElement} */
  #controllerWrapper;
  /** @type {HTMLTableElement} */
  #body;
  /** @type {HTMLTableSectionElement} */
  #thead;
  /** @type {HTMLTableSectionElement} */
  #tbody;

  /** @type {AbortController} */
  #abortController = new AbortController();

  #AbortControllerStates = {
    /** @type {AbortController | null} */
    dateChangeAbortController: null,
  };

  #states = {
    isEaSelectImported: false,
    isEaButtonImported: false,
    displayDate: dayjs(),
  };

  static get observedAttributes() {
    return [...super.observedAttributes, "value", "controller-type"];
  }

  state = this.properties({
    "controller-type": {
      type: ["button", "select"],
      default: "button",
      observer: newVal => {
        this.#handleControllerRender(newVal);
      },
    },
  });

  // ------- value -------
  // #region
  get value() {
    return this.#states.displayDate;
  }

  set value(value) {
    this.setAttribute("value", dayjs(value));
  }
  // #endregion
  // ------- end -------

  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);

    if (newVal === oldVal) return;

    if (name === "value") {
      this.#states.displayDate = dayjs(newVal);
      this.#updateCalendarDays(this.#states.displayDate);
    }
  }

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist("ea-calendar", {
      // ['--' + this.type]: this.type,
    });

    this.#container.className = className;

    return className;
  }

  constructor() {
    super();

    this.stylesheet = stylesheet;

    this.$render();
  }

  /**
   * 今天按钮点击时的事件
   */
  #onTodayBtnClickEvent = () => {
    i18nManager.locale = this.locale;
    dayjs.locale(this.locale.toLowerCase());

    const today = dayjs();

    this.#states.displayDate = today;

    this.#title.textContent = `${today.get("year")} ${i18nManager.t("calendar.months")[today.get("month")]}`;

    this.value = today;
  };

  /**
   * controller-type 的渲染器
   * @param {'button' | 'select'} [controllerType] 控制器类型
   * @return {string} 属性值
   */
  #handleControllerRender = async (
    controllerType = this["controller-type"]
  ) => {
    i18nManager.locale = this.locale;
    dayjs.locale(this.locale.toLowerCase());

    const ns = this.ns;

    const currentYear = this.#states.displayDate.get("year");

    const controllerTypeStrategies = {
      button: () =>
        this.html(`
        <ea-button-group class='${ns.e("controller-group")}' part='controller-group' size="small">
          <ea-button class='${ns.e("controller")} ${ns.e("controller-prev")}' part='controller prev'>
            ${i18nManager.t("calendar.prevMonth")}
          </ea-button>
          <ea-button class='${ns.e("controller")} ${ns.e("controller-today")}' part='controller current'>
            ${i18nManager.t("calendar.today")}
          </ea-button>
          <ea-button class='${ns.e("controller")} ${ns.e("controller-next")}' part='controller next'>
            ${i18nManager.t("calendar.nextMonth")}
          </ea-button>
        </ea-button-group>
      `),
      select: () => {
        const yearOptions = Array.from(
          { length: 20 },
          (_, i) =>
            `<ea-option value="${currentYear - 10 + i}">${currentYear - 10 + i}</ea-option>`
        ).join("");
        const monthOptions = Array.from(
          { length: 12 },
          (_, i) => `<ea-option value="${i + 1}">${i + 1}</ea-option>`
        ).join("");

        return this.html(`
          <section class='${ns.e("controller-group")}' part='controller-group'>
            <ea-select class='${ns.e("controller")} ${ns.e("controller-year")}' part='controller year' placeholder='${i18nManager.t("calendar.selectYear")}' size="small">
              ${yearOptions}
            </ea-select>
            <ea-select class='${ns.e("controller")} ${ns.e("controller-month")}' part='controller month' placeholder='${i18nManager.t("calendar.selectMonth")}' size="small">
              ${monthOptions}
            </ea-select>
            <ea-button class='${ns.e("controller")} ${ns.e("controller-today")}' part='controller current' size="small">
              ${i18nManager.t("calendar.today")}
            </ea-button>
          </section>
        `);
      },
    };

    this.#AbortControllerStates.dateChangeAbortController?.abort();
    this.#AbortControllerStates.dateChangeAbortController =
      new AbortController();

    this.#controllerWrapper.innerHTML =
      controllerTypeStrategies[controllerType]();

    if (controllerType === "select") {
      this.#initSelectControllerEvent();
    } else {
      this.#initButtonControllerEvent();
    }

    const todayBtn = this.shadowRoot.querySelector(ns.ce("controller-today"));
    if (todayBtn) {
      todayBtn.addEventListener("click", this.#onTodayBtnClickEvent, {
        signal: this.#AbortControllerStates.dateChangeAbortController.signal,
      });
    }
  };

  /**
   * 初始化控制器为 button 的事件
   */
  #initButtonControllerEvent = async () => {
    if (!this.#states.isEaButtonImported) {
      await customElements.whenDefined("ea-button");
      this.#states.isEaButtonImported = true;
    }

    const ns = this.ns;

    const prevBtn = this.shadowRoot.querySelector(ns.ce("controller-prev"));
    const nextBtn = this.shadowRoot.querySelector(ns.ce("controller-next"));

    /** 上个月 */
    const onPrevMonthBtnClickEvent = () => {
      this.value = this.#states.displayDate.subtract(1, "month").set("date", 1);
    };

    /** 下个月 */
    const onNextMonthBtnClickEvent = () => {
      this.value = this.#states.displayDate.add(1, "month").set("date", 1);
    };

    if (prevBtn) {
      prevBtn.addEventListener("click", onPrevMonthBtnClickEvent, {
        signal: this.#AbortControllerStates.dateChangeAbortController.signal,
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", onNextMonthBtnClickEvent, {
        signal: this.#AbortControllerStates.dateChangeAbortController.signal,
      });
    }
  };

  /**
   * 初始化控制器为 select 的事件
   */
  #initSelectControllerEvent = async () => {
    if (!this.#states.isEaSelectImported) {
      await customElements.whenDefined("ea-select");
      this.#states.isEaSelectImported = true;
    }

    const ns = this.ns;

    const currentYear = this.#states.displayDate.get("year");
    const currentMonth = this.#states.displayDate.get("month") + 1;

    const yearEl = this.shadowRoot.querySelector(ns.ce("controller-year"));
    const monthEl = this.shadowRoot.querySelector(ns.ce("controller-month"));

    /**
     * 年份改变事件
     * @param {CustomEvent} e
     */
    const onYearChangeEvent = e => {
      e.stopImmediatePropagation();
      const newYear = parseInt(e.target.value);
      const currentMonth = this.#states.displayDate.get("month") + 1;
      this.value = dayjs(`${newYear}-${currentMonth}-01`);
    };

    /**
     * 月份改变事件
     * @param {CustomEvent} e
     */
    const onMonthChangeEvent = e => {
      e.stopImmediatePropagation();
      const currentYear = this.#states.displayDate.get("year");
      const newMonth = parseInt(e.target.value).toString().padStart(2, "0");
      this.value = dayjs(`${currentYear}-${newMonth}-01`);
    };

    if (yearEl) yearEl.value = currentYear;
    if (monthEl) monthEl.value = currentMonth;

    await EaUtils.sleep(0);

    yearEl.addEventListener("change", onYearChangeEvent, {
      signal: this.#AbortControllerStates.dateChangeAbortController.signal,
    });

    monthEl.addEventListener("change", onMonthChangeEvent, {
      signal: this.#AbortControllerStates.dateChangeAbortController.signal,
    });
  };

  /**
   * 处理周渲染
   * @param {Array} weekList
   * @return {String}
   */
  #getWeekHTMLString = weekList => {
    return weekList
      .map(day => `<th class='${this.ns.e("th")}' part='th'>${day}</th>`)
      .join("");
  };

  /**
   * 渲染日历天数
   * @param {dayjs.Dayjs} date
   */
  #updateCalendarDays(date) {
    i18nManager.locale = this.locale;
    dayjs.locale(this.locale.toLowerCase());

    const currentYear = date.get("year");
    const currentMonth = date.get("month");

    this.#title.textContent = `${currentYear} ${i18nManager.t("calendar.months")[currentMonth]}`;

    this.#tbody.innerHTML = this.#getDayHTMLString();
  }

  /**
   * 处理tbody点击事件
   * @param {MouseEvent} e
   */
  #onDayCellClickEvent = e => {
    let target = e.target.closest(this.ns.ce("day"));

    if (!target || target === this.#tbody) return;

    const yearData = parseInt(target.dataset.year);
    const monthData = parseInt(target.dataset.month);
    const dateData = parseInt(target.dataset.date);

    const selectedDate = dayjs(`${yearData}-${monthData}-${dateData}`);

    this.value = selectedDate;

    this.emit("select", {
      detail: {
        year: yearData,
        month: monthData,
        date: dateData,
        day: selectedDate.day(),
        fullDate: `${yearData}-${monthData}-${dateData}`,
      },
      bubbles: true,
      composed: true,
    });
  };

  /**
   * 获取日期数组
   * @param {dayjs.Dayjs} [refDate] 参考日期，默认为当前日期
   * @return {DayOption}
   */
  #getDayOption = (refDate = dayjs()) => {
    const currentDate = refDate;

    const lastMonDate = currentDate.subtract(1, "month");
    const lastMonTotalDays = lastMonDate.daysInMonth();

    const currentMonFirstDay = currentDate.startOf("month").day();
    const currentMonLastDay = currentDate.endOf("month").day();
    const currentMonTotalDays = currentDate.daysInMonth();

    const weekStart = currentDate.startOf("week").get("day");

    const lastMonRemainingDays = Array.from(
      { length: currentMonFirstDay - weekStart },
      (_, i) => lastMonTotalDays - i
    ).reverse();
    const currentMonDays = Array.from(
      { length: currentMonTotalDays },
      (_, i) => i + 1
    );
    const nextMonRemainingDays = Array.from(
      { length: 6 - currentMonLastDay + weekStart },
      (_, i) => i + 1
    );

    return { lastMonRemainingDays, currentMonDays, nextMonRemainingDays };
  };

  /**
   * 查找指定日期的单元格
   * @param {Number} year
   * @param {Number} month
   * @param {Number} date
   */
  #findDateCell = (year, month, date) => {
    return this.#tbody.querySelector(
      `td[data-year="${year}"][data-month="${month}"][data-date="${date}"]`
    );
  };

  /**
   * 判断是否是今天
   */
  #isToday(year, month, date) {
    const now = dayjs();
    return (
      year === now.get("year") &&
      month === now.get("month") &&
      date === now.get("date")
    );
  }

  /**
   * 处理天渲染
   * @returns {String}
   */
  #getDayHTMLString = () => {
    const ns = this.ns;

    const date = this.#states.displayDate;
    const currentYear = date.get("year");
    const currentMonth = date.get("month") + 1;

    const { lastMonRemainingDays, currentMonDays, nextMonRemainingDays } =
      this.#getDayOption(date);

    /**
     * 渲染日历项
     * @param {'last-mon' | 'current-mon' | 'next-mon'} dayType
     * @param {any} content
     * @param {boolean} [isSelected]
     * @returns {string}
     */
    const cellRenderer = (
      dayType,
      content,
      option = { isSelected: false, isToday: false, isCurrent: false }
    ) => {
      let year;
      let month;

      if (dayType === "last-mon") {
        const m = date.subtract(1, "month");
        year = m.get("year");
        month = m.get("month") + 1;
      } else if (dayType === "current-mon") {
        year = currentYear;
        month = currentMonth;
      } else {
        const m = date.add(1, "month");
        year = m.get("year");
        month = m.get("month") + 1;
      }

      return EaUtils.EaElement.h(
        "td",
        null,
        {
          class: [
            ns.e("day"),
            ns.s(dayType),
            option.isSelected ? ns.s("selected") : "",
            option.isToday ? ns.s("today") : "",
            option.isCurrent ? ns.s("current") : "",
          ],
          part: ["day", dayType],
          "data-year": year,
          "data-month": month,
          "data-date": content,
        },
        content
      );
    };

    const lastMon = lastMonRemainingDays.map(content =>
      cellRenderer("last-mon", content)
    );
    const currentMon = currentMonDays.map(content =>
      cellRenderer("current-mon", content, {
        isToday: content === date.get("date"),
        isCurrent: content === date.get("date"),
      })
    );
    const nextMon = nextMonRemainingDays.map(content =>
      cellRenderer("next-mon", content)
    );

    const calendarDays = lastMon
      .concat(currentMon)
      .concat(nextMon)
      .reduce((acc, day, i) => {
        if (i % 7 === 0) acc.push([]);

        acc[acc.length - 1].push(day);

        return acc;
      }, [])
      .map(row => `<tr class="${ns.e("row")}">${row.join("")}</tr>`)
      .join("");

    return calendarDays;
  };

  $render() {
    const ns = namespace("calendar");

    const date = new Date();

    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();

    i18nManager.locale = this.locale;
    dayjs.locale(this.locale);

    this.ns = ns;

    this.shadowRoot.innerHTML = this.html(`
      <div class='${ns.b()}' part='container'>
        <header class='${ns.e("header")}' part='header'>
          <slot name="header">
            <span class='${ns.e("title")}' part='title'>
              ${currentYear} ${i18nManager.t("calendar.months")[currentMonth]}
            </span>
            <section class='${ns.e("controller-wrapper")}' part='controller-wrapper'>
            </section>
          </slot>
        </header>
        <table class='${ns.e("body")}' part='body'>
          <thead class='${ns.e("thead")}' part='thead'>
            <tr class='${ns.e("week")}' part='thead-tr tr'>
              ${this.#getWeekHTMLString(i18nManager.t("calendar.weekDays"))}
            </tr>
          </thead>
          <tbody class='${ns.e("tbody")}' part='tbody'>${this.#getDayHTMLString()}</tbody>
        </table>
      </div>
    `);

    this.#container = this.shadowRoot.querySelector(ns.cb());
    this.#header = this.shadowRoot.querySelector(ns.ce("header"));
    this.#title = this.shadowRoot.querySelector(ns.ce("title"));
    this.#controllerWrapper = this.shadowRoot.querySelector(
      ns.ce("controller-wrapper")
    );

    this.#body = this.shadowRoot.querySelector(ns.ce("body"));
    this.#thead = this.shadowRoot.querySelector(ns.ce("thead"));
    this.#tbody = this.shadowRoot.querySelector(ns.ce("tbody"));
  }

  $updateLocalization(locale) {
    i18nManager.locale = locale;
    dayjs.locale(this.locale.toLowerCase());

    const ns = this.ns;

    const prev = this.shadowRoot.querySelector(ns.ce("controller-prev"));
    const today = this.shadowRoot.querySelector(ns.ce("controller-today"));
    const next = this.shadowRoot.querySelector(ns.ce("controller-next"));
    const year = this.shadowRoot.querySelector(ns.ce("controller-year"));
    const month = this.shadowRoot.querySelector(ns.ce("controller-month"));

    const date = this.#states.displayDate;
    const currentYear = date.get("year");
    const currentMonth = date.get("month");
    const currentDate = date.get("date");

    const { lastMonRemainingDays, currentMonDays, nextMonRemainingDays } =
      this.#getDayOption(date);
    const days = lastMonRemainingDays
      .concat(currentMonDays)
      .concat(nextMonRemainingDays);

    const week = i18nManager.t("calendar.weekDays");
    /** @type {HTMLTableCellElement[]<NodeListOf>} */
    const ths = this.#thead.querySelectorAll(".ea-calendar__th");
    /** @type {HTMLTableCellElement[]<NodeListOf>} */
    const tds = [...this.#tbody.querySelectorAll(".ea-calendar__day")];

    if (prev) prev.textContent = i18nManager.t("calendar.prevMonth");
    if (today) today.textContent = i18nManager.t("calendar.today");
    if (next) next.textContent = i18nManager.t("calendar.nextMonth");
    if (year) year.placeholder = i18nManager.t("calendar.selectYear");
    if (month) month.placeholder = i18nManager.t("calendar.selectMonth");

    this.#title.textContent = `${currentYear} ${i18nManager.t("calendar.months")[currentMonth]}`;

    ths.forEach((th, index) => {
      th.textContent = week[index];
    });

    tds.forEach((td, index) => {
      const newDate = days[index];

      const isToday = this.#isToday(currentYear, currentMonth, newDate);

      /** @type {number} */
      let yearValue;
      /** @type {number} */
      let monthValue;
      /** @type {'last' | 'current' | 'next'} */
      let monthType;

      if (index < lastMonRemainingDays.length) {
        const tempMonth = date.subtract(1, "month");

        yearValue = tempMonth.get("year");
        monthValue = tempMonth.get("month") + 1;
        monthType = "last";
      } else if (index < lastMonRemainingDays.length + currentMonDays.length) {
        yearValue = currentYear;
        monthValue = currentMonth + 1;
        monthType = "current";
      } else {
        const tempMonth = date.add(1, "month");

        yearValue = tempMonth.get("year");
        monthValue = tempMonth.get("month") + 1;
        monthType = "next";
      }

      td.dataset.year = yearValue;
      td.dataset.month = monthValue;
      td.dataset.date = newDate;
      td.textContent = newDate;

      td.classList.toggle("is-today", isToday);
      td.classList.toggle("is-current", isToday);

      td.classList.toggle("is-last-mon", monthType === "last");
      td.classList.toggle("is-current-mon", monthType === "current");
      td.classList.toggle("is-next-mon", monthType === "next");

      if (td.part) {
        td.part.toggle("last-mon", monthType === "last");
        td.part.toggle("current-mon", monthType === "current");
        td.part.toggle("next-mon", monthType === "next");
      }
    });

    const currentTd = tds.some(td => td.classList.contains("is-current"));
    if (!currentTd) {
      const td = this.#findDateCell(currentYear, currentMonth + 1, currentDate);
      if (td) td.classList.add("is-current");
    }
  }

  connectedCallback() {
    super.connectedCallback();

    this.#abortController?.abort();
    this.#abortController = new AbortController();

    this.#handleControllerRender();

    this.#tbody.addEventListener("click", this.#onDayCellClickEvent, {
      signal: this.#abortController.signal,
    });
  }

  $beforeUnmounted() {
    this.#abortController?.abort();

    for (const key in this.#AbortControllerStates) {
      this.#AbortControllerStates[key]?.abort();
      this.#AbortControllerStates[key] = null;
    }
  }
}

if (!window.customElements.get("ea-calendar")) {
  window.customElements.define("ea-calendar", EaCalendar);
}
