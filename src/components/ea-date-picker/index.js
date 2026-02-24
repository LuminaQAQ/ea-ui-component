import { namespace } from "@/directives/namespace";
import Base from "@components/Base.js";
import stylesheet from "./index.scss?inline";

import "@/components/ea-calendar/index.js";
import "@/components/ea-input/index.js";
import "@/components/ea-button/index.js";

import dayjs from "dayjs";
import "dayjs/locale/zh-cn";

export class EaDatePicker extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #inputWrap;
  /** @type {HTMLElement} */
  #inputElement;
  /** @type {HTMLElement} */
  #dropdownWrap;
  /** @type {HTMLElement} */
  #calendarElement;
  /** @type {HTMLElement} */
  #customHeader;
  /** @type {HTMLElement} */
  #calendarBody;
  /** @type {HTMLElement} */
  #yearBtn;
  /** @type {HTMLElement} */
  #monthBtn;
  /** @type {HTMLElement} */
  #prevYearBtn;
  /** @type {HTMLElement} */
  #prevMonthBtn;
  /** @type {HTMLElement} */
  #nextMonthBtn;
  /** @type {HTMLElement} */
  #nextYearBtn;

  /** @type {AbortController} */
  #abortController = new AbortController();

  #states = {
    currentDate: dayjs(),
    viewMode: "day", // 'day' | 'month' | 'year'
    selectedYear: null,
    selectedMonth: null,
  };

  static get observedAttributes() {
    return [...super.observedAttributes];
  }

  state = this.properties({
    name: {
      type: String,
      default: "datePicker",
    },
    width: {
      type: String,
      default: "280px",
      observer: newVal => {
        this.#container.style.width = newVal;
        this.#dropdownWrap.style.width = newVal;
        this.style.display = "inline-block";
        this.style.width = newVal;
      },
    },
    value: {
      type: String,
      default: "",
      observer: newVal => {
        let dateValue = newVal;
        if (isNaN(new Date(newVal)) && newVal !== "") {
          const date = new Date(Date.now());
          dateValue = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        }
        this.#inputElement.value = dateValue;
        if (dateValue) {
          this.#states.currentDate = dayjs(dateValue);
          this.#states.selectedYear = this.#states.currentDate.year();
          this.#states.selectedMonth = this.#states.currentDate.month() + 1;
        }
      },
    },
    placeholder: {
      type: String,
      default: "",
      observer: newVal => {
        this.#inputElement.placeholder = newVal;
      },
    },
    disabled: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.#inputElement.disabled = newVal;
        this.updateContainerClasslist();
      },
    },
    align: {
      type: ["left", "center", "right"],
      default: "left",
      observer: newVal => {
        const inputOriginal = this.#inputElement.shadowRoot?.querySelector(
          '.ea-input__original, input[type="text"]'
        );
        if (inputOriginal) {
          inputOriginal.style.textAlign = newVal;
        }
      },
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist(
      "ea-date-picker",
      {},
      {
        disabled: this.disabled,
        open: this.#container?.classList.contains("is-open"),
      }
    );

    this.#container.className = className;

    return className;
  }

  constructor() {
    super();

    this.stylesheet = stylesheet;

    this.$render();
  }

  /**
   * 渲染组件
   */
  $render() {
    const ns = namespace("date-picker");
    this.ns = ns;

    this.shadowRoot.innerHTML = this.html(`
      <div class='${ns.b()}' part='container'>
        <div class='${ns.e("input-wrap")}' part='input-wrap'>
          <ea-input class="${ns.e("input")}" part='input' prefix-icon="icon-calendar-times-o" readonly></ea-input>
        </div>
        <div class='${ns.e("dropdown-wrap")}' part='dropdown-wrap'>
          <div class='${ns.e("calendar-wrapper")}'>
            <div class='${ns.e("custom-header")}' part='custom-header'>
              <div class='${ns.e("header-left")}'>
                <ea-button class='${ns.e("header-btn")} ${ns.e("btn-prev-year")}' aria-label="Previous year" text>«</ea-button>
                <ea-button class='${ns.e("header-btn")} ${ns.e("btn-prev-month")}' aria-label="Previous month" text>‹</ea-button>
              </div>
              <div class='${ns.e("header-center")}'>
                <span class='${ns.e("header-year")}' part='header-year'></span>
                <span class='${ns.e("header-month")}' part='header-month'></span>
              </div>
              <div class='${ns.e("header-right")}'>
                <ea-button class='${ns.e("header-btn")} ${ns.e("btn-next-month")}' aria-label="Next month" text>›</ea-button>
                <ea-button class='${ns.e("header-btn")} ${ns.e("btn-next-year")}' aria-label="Next year" text>»</ea-button>
              </div>
            </div>
            <div class='${ns.e("calendar-body")}' part='calendar-body'>
              <ea-calendar class="${ns.e("calendar")}" size="small" part='calendar'></ea-calendar>
            </div>
            <div class='${ns.e("year-panel")}' part='year-panel'></div>
            <div class='${ns.e("month-panel")}' part='month-panel'></div>
          </div>
        </div>
      </div>
    `);

    this.#container = this.shadowRoot.querySelector(ns.cb());
    this.#inputWrap = this.shadowRoot.querySelector(ns.ce("input-wrap"));
    this.#inputElement = this.shadowRoot.querySelector(ns.ce("input"));
    this.#dropdownWrap = this.shadowRoot.querySelector(ns.ce("dropdown-wrap"));
    this.#calendarElement = this.shadowRoot.querySelector(ns.ce("calendar"));
    this.#customHeader = this.shadowRoot.querySelector(ns.ce("custom-header"));
    this.#calendarBody = this.shadowRoot.querySelector(ns.ce("calendar-body"));
    this.#yearBtn = this.shadowRoot.querySelector(ns.ce("header-year"));
    this.#monthBtn = this.shadowRoot.querySelector(ns.ce("header-month"));
    this.#prevYearBtn = this.shadowRoot.querySelector(ns.ce("btn-prev-year"));
    this.#prevMonthBtn = this.shadowRoot.querySelector(ns.ce("btn-prev-month"));
    this.#nextMonthBtn = this.shadowRoot.querySelector(ns.ce("btn-next-month"));
    this.#nextYearBtn = this.shadowRoot.querySelector(ns.ce("btn-next-year"));
  }

  /**
   * 更新header显示
   */
  #updateHeaderDisplay = () => {
    const ns = this.ns;
    const year = this.#states.currentDate.year();
    const month = this.#states.currentDate.month() + 1;

    if (this.#states.viewMode === "year") {
      const decadeStart = Math.floor(year / 10) * 10;
      const decadeEnd = decadeStart + 9;
      this.#yearBtn.textContent = `${decadeStart} ~ ${decadeEnd}`;
      this.#monthBtn.textContent = "";
    } else if (this.#states.viewMode === "month") {
      this.#yearBtn.textContent = year;
      this.#monthBtn.textContent = "";
    } else {
      this.#yearBtn.textContent = year;
      this.#monthBtn.textContent = month < 10 ? `0${month}` : month;
    }
  };

  /**
   * 切换到年份选择模式
   */
  #switchToYearMode = () => {
    this.#states.viewMode = "year";
    this.#updateHeaderDisplay();
    this.#renderYearPanel();
    this.#calendarBody.style.display = "none";
    this.shadowRoot.querySelector(this.ns.ce("year-panel")).style.display =
      "grid";
    this.shadowRoot.querySelector(this.ns.ce("month-panel")).style.display =
      "none";
    this.#updateHeaderButtons("year");
  };

  /**
   * 切换到月份选择模式
   */
  #switchToMonthMode = () => {
    this.#states.viewMode = "month";
    this.#updateHeaderDisplay();
    this.#renderMonthPanel();
    this.#calendarBody.style.display = "none";
    this.shadowRoot.querySelector(this.ns.ce("year-panel")).style.display =
      "none";
    this.shadowRoot.querySelector(this.ns.ce("month-panel")).style.display =
      "grid";
    this.#updateHeaderButtons("month");
  };

  /**
   * 切换回日期选择模式
   */
  #switchToDayMode = () => {
    this.#states.viewMode = "day";
    this.#updateHeaderDisplay();
    this.#calendarBody.style.display = "block";
    this.shadowRoot.querySelector(this.ns.ce("year-panel")).style.display =
      "none";
    this.shadowRoot.querySelector(this.ns.ce("month-panel")).style.display =
      "none";
    this.#updateHeaderButtons("day");

    // 更新calendar的value
    const dateStr = this.#states.currentDate.format("YYYY-MM-DD");
    this.#calendarElement.setAttribute("value", dateStr);
  };

  /**
   * 更新header按钮
   */
  #updateHeaderButtons = mode => {
    const ns = this.ns;
    const prevYearBtn = this.shadowRoot.querySelector(ns.ce("btn-prev-year"));
    const nextYearBtn = this.shadowRoot.querySelector(ns.ce("btn-next-year"));
    const prevMonthBtn = this.shadowRoot.querySelector(ns.ce("btn-prev-month"));
    const nextMonthBtn = this.shadowRoot.querySelector(ns.ce("btn-next-month"));

    if (mode === "year") {
      prevYearBtn.ariaLabel = "Previous decade";
      nextYearBtn.ariaLabel = "Next decade";

      prevMonthBtn.style.display = "none";
      nextMonthBtn.style.display = "none";
    } else if (mode === "month") {
      prevYearBtn.ariaLabel = "Previous year";
      nextYearBtn.ariaLabel = "Next year";
      prevMonthBtn.style.display = "none";
      nextMonthBtn.style.display = "none";
    } else {
      prevYearBtn.ariaLabel = "Previous year";
      nextYearBtn.ariaLabel = "Next year";
      prevMonthBtn.ariaLabel = "Previous month";
      nextMonthBtn.ariaLabel = "Next month";
      prevMonthBtn.style.display = "inline-flex";
      nextMonthBtn.style.display = "inline-flex";
    }
  };

  /**
   * 渲染年份面板
   */
  #renderYearPanel = () => {
    const ns = this.ns;
    const year = this.#states.currentDate.year();
    const decadeStart = Math.floor(year / 10) * 10;
    const yearPanel = this.shadowRoot.querySelector(ns.ce("year-panel"));

    let html = "";
    for (let i = 0; i < 10; i++) {
      const y = decadeStart + i;
      const isSelected = y === this.#states.selectedYear;
      html += `<button class='${ns.e("year-item")} ${isSelected ? ns.s("selected") : ""}' data-year='${y}'>${y}</button>`;
    }

    yearPanel.innerHTML = html;
  };

  /**
   * 渲染月份面板
   */
  #renderMonthPanel = () => {
    const ns = this.ns;
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthPanel = this.shadowRoot.querySelector(ns.ce("month-panel"));

    let html = "";
    months.forEach((month, index) => {
      const monthNum = index + 1;
      const isSelected =
        monthNum === this.#states.selectedMonth &&
        this.#states.currentDate.year() === this.#states.selectedYear;
      html += `<button class='${ns.e("month-item")} ${isSelected ? ns.s("selected") : ""}' data-month='${monthNum}'>${month}</button>`;
    });

    monthPanel.innerHTML = html;
  };

  /**
   * 上一年按钮点击
   */
  #onPrevYearClick = () => {
    if (this.#states.viewMode === "year") {
      this.#states.currentDate = this.#states.currentDate.subtract(10, "year");
    } else {
      this.#states.currentDate = this.#states.currentDate.subtract(1, "year");
    }
    this.#updateView();
  };

  /**
   * 下一年按钮点击
   */
  #onNextYearClick = () => {
    if (this.#states.viewMode === "year") {
      this.#states.currentDate = this.#states.currentDate.add(10, "year");
    } else {
      this.#states.currentDate = this.#states.currentDate.add(1, "year");
    }
    this.#updateView();
  };

  /**
   * 上个月按钮点击
   */
  #onPrevMonthClick = () => {
    this.#states.currentDate = this.#states.currentDate.subtract(1, "month");
    this.#updateView();
  };

  /**
   * 下个月按钮点击
   */
  #onNextMonthClick = () => {
    this.#states.currentDate = this.#states.currentDate.add(1, "month");
    this.#updateView();
  };

  /**
   * 年份点击事件
   */
  #onYearClick = e => {
    const yearItem = e.target.closest("[data-year]");
    if (!yearItem) return;

    const year = parseInt(yearItem.dataset.year);
    this.#states.selectedYear = year;
    this.#states.currentDate = this.#states.currentDate.year(year);
    this.#switchToMonthMode();
  };

  /**
   * 月份点击事件
   */
  #onMonthClick = e => {
    const monthItem = e.target.closest("[data-month]");
    if (!monthItem) return;

    const month = parseInt(monthItem.dataset.month);
    this.#states.selectedMonth = month;
    this.#states.currentDate = this.#states.currentDate.month(month - 1);
    this.#switchToDayMode();
  };

  /**
   * 更新视图
   */
  #updateView = () => {
    this.#updateHeaderDisplay();

    if (this.#states.viewMode === "year") {
      this.#renderYearPanel();
    } else if (this.#states.viewMode === "month") {
      this.#renderMonthPanel();
    }

    // 始终更新calendar的value以同步显示
    const dateStr = this.#states.currentDate.format("YYYY-MM-DD");
    this.#calendarElement.setAttribute("value", dateStr);
  };

  /**
   * 日历选择事件处理
   * @param {CustomEvent} e
   */
  #onCalendarSelect = e => {
    const { year, month, date, day } = e.detail;
    const dateStr = `${year}-${month}-${date}`;

    this.value = dateStr;
    this.#inputElement.value = dateStr;
    this.#states.selectedYear = year;
    this.#states.selectedMonth = month;
    this.#states.currentDate = dayjs(dateStr);

    this.dispatchEvent(
      new CustomEvent("change", {
        detail: {
          fullDate: dateStr,
          year,
          month,
          date,
          week: day,
        },
      })
    );

    this.#container.classList.remove("is-open");
  };

  /**
   * 切换下拉框显示状态
   */
  #toggleDropdown = () => {
    if (this.disabled) return;
    this.#container.classList.toggle("is-open");
    if (this.#container.classList.contains("is-open")) {
      // 重置到日期视图
      this.#switchToDayMode();
    }
  };

  /**
   * 点击外部关闭下拉
   * @param {MouseEvent} e
   */
  #onWindowClick = e => {
    const path = e.composedPath();
    const isInsideDatePicker =
      path.includes(this) || path.includes(this.shadowRoot);
    if (!isInsideDatePicker) {
      this.#container.classList.remove("is-open");
    }
  };

  /**
   * 绑定事件
   */
  #bindEvents = () => {
    this.#abortController?.abort();
    this.#abortController = new AbortController();

    this.#calendarElement.addEventListener("select", this.#onCalendarSelect, {
      signal: this.#abortController.signal,
    });

    this.#inputElement.addEventListener("click", this.#toggleDropdown, {
      signal: this.#abortController.signal,
    });

    window.addEventListener("click", this.#onWindowClick, {
      signal: this.#abortController.signal,
    });

    // Header按钮事件
    this.#prevYearBtn.addEventListener("click", this.#onPrevYearClick, {
      signal: this.#abortController.signal,
    });
    this.#nextYearBtn.addEventListener("click", this.#onNextYearClick, {
      signal: this.#abortController.signal,
    });
    this.#prevMonthBtn.addEventListener("click", this.#onPrevMonthClick, {
      signal: this.#abortController.signal,
    });
    this.#nextMonthBtn.addEventListener("click", this.#onNextMonthClick, {
      signal: this.#abortController.signal,
    });

    // 年份/月份文本点击事件
    this.#yearBtn.addEventListener("click", this.#switchToYearMode, {
      signal: this.#abortController.signal,
    });

    this.#monthBtn.addEventListener("click", this.#switchToMonthMode, {
      signal: this.#abortController.signal,
    });

    // 年份面板点击事件
    const yearPanel = this.shadowRoot.querySelector(this.ns.ce("year-panel"));
    yearPanel.addEventListener("click", this.#onYearClick, {
      signal: this.#abortController.signal,
    });

    // 月份面板点击事件
    const monthPanel = this.shadowRoot.querySelector(this.ns.ce("month-panel"));
    monthPanel.addEventListener("click", this.#onMonthClick, {
      signal: this.#abortController.signal,
    });
  };

  connectedCallback() {
    super.connectedCallback();

    this.#abortController?.abort();
    this.#abortController = new AbortController();

    this.#updateHeaderDisplay();
    this.#bindEvents();
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
    this.#abortController = null;
  }
}

if (!customElements.get("ea-date-picker")) {
  customElements.define("ea-date-picker", EaDatePicker);
}
