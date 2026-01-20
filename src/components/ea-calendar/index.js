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
  };

  static get observedAttributes() {
    return [...super.observedAttributes, "controller-type"];
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
   * controller-type 的渲染器
   * @param {'button' | 'select'} [controllerType] 控制器类型
   * @return {string} 属性值
   */
  #handleControllerRender = async (
    controllerType = this["controller-type"]
  ) => {
    const ns = this.ns;

    const currentYear = new Date().getFullYear();

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
    }
  };

  /**
   * 初始化控制器为 select 的事件
   */
  #initSelectControllerEvent = async () => {
    await customElements.whenDefined("ea-select");

    const ns = this.ns;

    const date = new Date();

    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth() + 1;

    const yearEl = this.shadowRoot.querySelector(ns.ce("controller-year"));
    const monthEl = this.shadowRoot.querySelector(ns.ce("controller-month"));
    const todayEl = this.shadowRoot.querySelector(ns.ce("controller-today"));

    if (yearEl) yearEl.value = currentYear;
    if (monthEl) monthEl.value = currentMonth;

    await EaUtils.sleep(0);

    yearEl.addEventListener(
      "change",
      e => {
        e.stopImmediatePropagation();
        console.log(e.detail);
      },
      {
        signal: this.#AbortControllerStates.dateChangeAbortController.signal,
      }
    );

    monthEl.addEventListener(
      "change",
      e => {
        e.stopImmediatePropagation();
        console.log(e.detail);
      },
      {
        signal: this.#AbortControllerStates.dateChangeAbortController.signal,
      }
    );

    todayEl.addEventListener(
      "click",
      e => {
        e.stopImmediatePropagation();
        console.log(e);
      },
      {
        signal: this.#AbortControllerStates.dateChangeAbortController.signal,
      }
    );
  };

  /**
   * 处理周渲染
   * @param {Array} weekList
   */
  #getWeekHTMLString = weekList => {
    return weekList
      .map(day => `<th class='${this.ns.e("th")}' part='th'>${day}</th>`)
      .join("");
  };

  /**
   * 获取日期数组
   * @return {DayOption}
   */
  #getDayOption = () => {
    const currentDate = dayjs();

    const lastMonDate = currentDate.add(-1, "month");
    const lastMonTotalDays = lastMonDate.daysInMonth();

    const currentMonFirstDay = currentDate.startOf("month").day();
    const currentMonLastDay = currentDate.endOf("month").day();
    const currentMonTotalDays = currentDate.daysInMonth();

    const weekStart = dayjs().startOf("week").get("day");

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
   * 处理天渲染
   * @param {Array} weekList
   * @returns {String}
   */
  #getDayHTMLString = weekList => {
    const ns = this.ns;

    const date = dayjs();
    const currentMonth = date.get("month") + 1;

    const { lastMonRemainingDays, currentMonDays, nextMonRemainingDays } =
      this.#getDayOption();

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
      option = { isSelected: false, isToday: false }
    ) => {
      let month;

      if (dayType === "last-mon") {
        month = date.add(-1, "month").get("month") + 1;
      } else if (dayType === "current-mon") {
        month = currentMonth;
      } else {
        month = date.add(1, "month").get("month") + 1;
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
          ],
          part: ["day", dayType],
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
          <span class='${ns.e("title")}' part='title'>
            ${currentYear} ${i18nManager.t("calendar.months")[currentMonth]}
          </span>
          <section class='${ns.e("controller-wrapper")}' part='controller-wrapper'>
          </section>
        </header>
        <table class='${ns.e("body")}' part='body'>
          <thead class='${ns.e("thead")}' part='thead'>
            <tr class='${ns.e("week")}' part='thead-tr tr'>
              ${this.#getWeekHTMLString(i18nManager.t("calendar.weekDays"))}
            </tr>
          </thead>
          <tbody class='${ns.e("tbody")}' part='tbody'>${this.#getDayHTMLString(i18nManager.t("calendar.weekDays"))}</tbody>
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
    const ns = this.ns;

    const prev = this.shadowRoot.querySelector(ns.ce("controller-prev"));
    const today = this.shadowRoot.querySelector(ns.ce("controller-today"));
    const next = this.shadowRoot.querySelector(ns.ce("controller-next"));
    const year = this.shadowRoot.querySelector(ns.ce("controller-year"));
    const month = this.shadowRoot.querySelector(ns.ce("controller-month"));

    const date = dayjs();
    const currentYear = date.get("year");
    const currentMonth = date.get("month") + 1;
    const todayDate = date.get("date");

    i18nManager.locale = locale;
    dayjs.locale(this.locale.toLowerCase());

    const week = i18nManager.t("calendar.weekDays");
    const { lastMonRemainingDays, currentMonDays, nextMonRemainingDays } =
      this.#getDayOption();
    const days = lastMonRemainingDays
      .concat(currentMonDays)
      .concat(nextMonRemainingDays);
    /** @type {HTMLTableCellElement[]<NodeListOf>} */
    const ths = this.#thead.querySelectorAll(".ea-calendar__th");
    /** @type {HTMLTableCellElement[]<NodeListOf>} */
    const tds = this.#tbody.querySelectorAll(".ea-calendar__day");

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

      let monthValue;
      /** @type {'last' | 'current' | 'next'} */
      let monthType;
      if (index < lastMonRemainingDays.length) {
        monthValue = date.add(-1, "month").get("month") + 1;
        monthType = "last";
      } else if (index < lastMonRemainingDays.length + currentMonDays.length) {
        monthValue = currentMonth;
        monthType = "current";
      } else {
        monthValue = date.add(1, "month").get("month") + 1;
        monthType = "next";
      }

      td.dataset.month = monthValue;
      td.dataset.date = newDate;
      td.textContent = newDate;

      td.classList.toggle("is-today", todayDate === newDate);

      td.classList.toggle("is-last-mon", monthType === "last");
      td.classList.toggle("is-current-mon", monthType === "current");
      td.classList.toggle("is-next-mon", monthType === "next");

      td.part.toggle("last-mon", monthType === "last");
      td.part.toggle("current-mon", monthType === "current");
      td.part.toggle("next-mon", monthType === "next");
    });
  }

  connectedCallback() {
    super.connectedCallback();

    this.#abortController?.abort();
    this.#abortController = new AbortController();

    this.#handleControllerRender();
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
