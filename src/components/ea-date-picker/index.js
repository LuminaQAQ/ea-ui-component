import { namespace } from "@/directives/namespace";
import EaFormAssociatedBase from "@core/EaFormAssociatedBase";
import stylesheet from "./index.scss?inline";

import "@/components/ea-calendar/index.js";
import "@/components/ea-input/index.js";
import "@/components/ea-button/index.js";

import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);
import "dayjs/locale/zh-cn";
import { EA_COMPONENT_SIZES } from "@/utils/Variables";
import EaUtils from "@/utils/Utils";
import { i18nManager } from "@/utils/I18nManager";
import { EaDatePickerPanelChangeEvent } from "./events/EaDatePickerPanelChangeEvent";
import { EaDatePickerVisibleChangeEvent } from "./events/EaDatePickerVisibleChangeEvent";

export class EaDatePicker extends EaFormAssociatedBase {
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
  #calendarHeader;
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
  /** @type {HTMLElement} */
  #yearPanel;
  /** @type {HTMLElement} */
  #monthPanel;

  /** @type {AbortController} */
  #abortController = new AbortController();

  #states = {
    currentDate: dayjs(),
    /** @type {'day' | 'month' | 'year'} */
    viewMode: "day",
    selectedYear: null,
    selectedMonth: null,
  };

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "label",
      "width",
      "value",
      "placeholder",
      "disabled",
      "align",
      "display-format",
      "value-format",
      "size",
      "required",
    ];
  }

  state = this.properties({
    label: {
      type: String,
      default: "",
      observer: async newVal => {
        await customElements.whenDefined("ea-input");
        this.#inputElement.label = newVal;
      },
    },
    width: {
      type: String,
      default: "auto",
      observer: newVal => {
        this.#container.style.setProperty("--ea-date-picker-width", newVal);
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
        if (dateValue) {
          this.#states.currentDate = dayjs(dateValue);
          this.#states.selectedYear = this.#states.currentDate.year();
          this.#states.selectedMonth = this.#states.currentDate.month() + 1;
          this.#inputElement.value = this.#states.currentDate.format(
            this.#getDisplayFormat()
          );
        } else {
          this.#inputElement.value = dateValue;
        }
        // 同步表单值
        this.setValue(newVal);
      },
    },
    placeholder: {
      type: String,
      default: "",
      observer: newVal => {
        this.#inputElement.setAttribute("placeholder", newVal);
      },
    },
    disabled: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.#inputElement.toggleAttribute("disabled", newVal);
        this.updateContainerClasslist();
      },
    },
    align: {
      type: ["left", "center", "right"],
      default: "left",
      observer: () => {
        this.updateContainerClasslist();
      },
    },
    "display-format": {
      type: String,
      default: "YYYY-MM-DD",
    },
    "value-format": {
      type: String,
      default: "YYYY-MM-DD",
    },
    type: {
      type: ["date", "month", "year"],
      default: "date",
      observer: newVal => {
        if (newVal === "year") {
          this.#switchToYearMode();
        } else if (newVal === "month") {
          this.#switchToMonthMode();
        } else {
          this.#switchToDayMode();
        }
      },
    },
    size: {
      type: EA_COMPONENT_SIZES,
      default: "default",
      observer: newVal => {
        this.#inputElement.setAttribute("size", newVal);
        this.#yearBtn.setAttribute("size", newVal);
        this.#monthBtn.setAttribute("size", newVal);
        this.#prevYearBtn.setAttribute("size", newVal);
        this.#prevMonthBtn.setAttribute("size", newVal);
        this.#nextMonthBtn.setAttribute("size", newVal);
        this.#nextYearBtn.setAttribute("size", newVal);

        this.updateContainerClasslist();
      },
    },
    required: {
      type: Boolean,
      default: false,
      observer: async newVal => {
        await customElements.whenDefined("ea-input");
        this.#inputElement.toggleAttribute("required", newVal);
      },
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const viewMode = this.#states?.viewMode || "day";
    const className = this.computedClasslist(
      "ea-date-picker",
      {
        [`--${this.size}`]: this.size,
      },
      {
        disabled: this.disabled,
        [`align-${this.align}`]: this.align,
        open: this.#container?.classList.contains("is-open"),
        [`view-${viewMode}`]: viewMode,
      }
    );

    this.#container.className = className;

    return className;
  }

  /**
   * 获取实际的显示格式
   * 如果用户设置了自定义格式，则使用自定义格式
   * 否则根据type使用默认格式
   * @return {string} 显示格式
   */
  #getDisplayFormat() {
    const userFormat = this["display-format"];
    if (this.hasAttribute("display-format") && this["display-format"] !== "") {
      return userFormat;
    }

    switch (this.type) {
      case "year":
        return "YYYY";
      case "month":
        return "YYYY-MM";
      default:
        return "YYYY-MM-DD";
    }
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

    i18nManager.locale = this.locale;
    dayjs.locale(this.locale.toLowerCase());

    const monthsShort = i18nManager.t("calendar.monthsShort");

    this.shadowRoot.innerHTML = this.html(`
      <div class='${ns.b()}' part='container'>
        <div class='${ns.e("input-wrap")}' part='input-wrap'>
          <ea-input class="${ns.e("input")}" part='input' prefix-icon="calendar-xmark" readonly></ea-input>
        </div>
        <div class='${ns.e("dropdown-wrap")}' part='dropdown-wrap'>
          <div class='${ns.e("calendar-wrapper")}'>
            <div class='${ns.e("calendar-header")}' part='calendar-header'>
              <div class='${ns.e("header-left")}' part='header-left'>
                <ea-button class='${ns.e("header-btn")} ${ns.e("btn-prev-year")}' part='header-btn' aria-label="Previous year" text>«</ea-button>
                <ea-button class='${ns.e("header-btn")} ${ns.e("btn-prev-month")}' part='header-btn' aria-label="Previous month" text>‹</ea-button>
              </div>
              <div class='${ns.e("header-center")}' part='header-center'>
                <ea-button class='${ns.e("header-year")}' part='header-year'  aria-label="Year" text></ea-button>
                <ea-button class='${ns.e("header-month")}' part='header-month' aria-label="Month" text></ea-button>
              </div>
              <div class='${ns.e("header-right")}' part='header-right'>
                <ea-button class='${ns.e("header-btn")} ${ns.e("btn-next-month")}' part='header-btn' aria-label="Next month" text>›</ea-button>
                <ea-button class='${ns.e("header-btn")} ${ns.e("btn-next-year")}' part='header-btn' aria-label="Next year" text>»</ea-button>
              </div>
            </div>
            <div class='${ns.e("calendar-body")}' part='calendar-body'>
              <ea-calendar class="${ns.e("calendar")}" size="small" part='calendar'></ea-calendar>
            </div>
            <div class='${ns.e("year-panel")}' part='year-panel'></div>
            <div class='${ns.e("month-panel")}' part='month-panel'>${monthsShort
              .map(
                (month, i) =>
                  `<button class='${ns.e("month-item")}' part='month-item' data-month='${i + 1}'>${month}</button>`
              )
              .join("")}</div>
          </div>
        </div>
      </div>
    `);

    this.#container = this.shadowRoot.querySelector(ns.cb());
    this.#inputWrap = this.shadowRoot.querySelector(ns.ce("input-wrap"));
    this.#inputElement = this.shadowRoot.querySelector(ns.ce("input"));
    this.#dropdownWrap = this.shadowRoot.querySelector(ns.ce("dropdown-wrap"));
    this.#calendarElement = this.shadowRoot.querySelector(ns.ce("calendar"));
    this.#calendarHeader = this.shadowRoot.querySelector(
      ns.ce("calendar-header")
    );
    this.#calendarBody = this.shadowRoot.querySelector(ns.ce("calendar-body"));
    this.#yearBtn = this.shadowRoot.querySelector(ns.ce("header-year"));
    this.#monthBtn = this.shadowRoot.querySelector(ns.ce("header-month"));
    this.#prevYearBtn = this.shadowRoot.querySelector(ns.ce("btn-prev-year"));
    this.#prevMonthBtn = this.shadowRoot.querySelector(ns.ce("btn-prev-month"));
    this.#nextMonthBtn = this.shadowRoot.querySelector(ns.ce("btn-next-month"));
    this.#nextYearBtn = this.shadowRoot.querySelector(ns.ce("btn-next-year"));
    this.#yearPanel = this.shadowRoot.querySelector(ns.ce("year-panel"));
    this.#monthPanel = this.shadowRoot.querySelector(ns.ce("month-panel"));
  }

  /**
   * 更新header显示
   */
  #updateHeaderDisplay = () => {
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
    this.updateContainerClasslist();
    this.#updateHeaderButtons("year");

    this.dispatchEvent(
      new EaDatePickerPanelChangeEvent({
        date: this.#states.currentDate.toDate(),
        mode: "year",
        view: "year-panel",
      })
    );
  };

  /**
   * 切换到月份选择模式
   */
  #switchToMonthMode = () => {
    this.#states.viewMode = "month";
    this.#updateHeaderDisplay();
    this.#renderMonthPanel();
    this.updateContainerClasslist();
    this.#updateHeaderButtons("month");

    this.dispatchEvent(
      new EaDatePickerPanelChangeEvent({
        date: this.#states.currentDate.toDate(),
        mode: "month",
        view: "month-panel",
      })
    );
  };

  /**
   * 切换回日期选择模式
   */
  #switchToDayMode = () => {
    this.#states.viewMode = "day";
    this.#updateHeaderDisplay();

    this.updateContainerClasslist();
    this.#updateHeaderButtons("day");

    const dateStr = this.#states.currentDate.format("YYYY-MM-DD");
    this.#calendarElement.setAttribute("value", dateStr);

    this.dispatchEvent(
      new EaDatePickerPanelChangeEvent({
        date: this.#states.currentDate.toDate(),
        mode: "month",
        view: "day-panel",
      })
    );
  };

  /**
   * 更新header按钮
   * @param {'year' | 'month' | 'day'} mode
   */
  #updateHeaderButtons = mode => {
    if (mode === "year") {
      this.#prevYearBtn.ariaLabel = "Previous decade";
      this.#nextYearBtn.ariaLabel = "Next decade";
    } else if (mode === "month") {
      this.#prevYearBtn.ariaLabel = "Previous year";
      this.#nextYearBtn.ariaLabel = "Next year";
    } else {
      this.#prevYearBtn.ariaLabel = "Previous year";
      this.#nextYearBtn.ariaLabel = "Next year";
      this.#prevMonthBtn.ariaLabel = "Previous month";
      this.#nextMonthBtn.ariaLabel = "Next month";
    }
  };

  /**
   * 渲染年份面板
   */
  #renderYearPanel = () => {
    const ns = this.ns;
    const year = this.#states.currentDate.year();
    const decadeStart = Math.floor(year / 10) * 10;
    const yearPanel = this.#yearPanel;

    let html = Array.from({ length: 10 }, (_, i) => {
      const y = decadeStart + i;
      const isSelected = y === this.#states.selectedYear;
      return EaUtils.EaElement.h(
        "button",
        null,
        {
          class: `${ns.e("year-item")} ${isSelected ? ns.s("selected") : ""}`,
          "data-year": y,
          part: "year-item",
        },
        y
      );
    }).join("");

    yearPanel.innerHTML = this.html(html);
  };

  /**
   * 更新本地化
   * @param {string} locale
   */
  $updateLocalization(locale) {
    i18nManager.locale = locale;
    dayjs.locale(locale.toLowerCase());

    const ns = this.ns;
    const monthsShort = i18nManager.t("calendar.monthsShort");
    const monthItems = this.#monthPanel.querySelectorAll(
      `.${ns.e("month-item")}`
    );

    monthItems.forEach((item, index) => {
      if (monthsShort[index]) {
        item.textContent = monthsShort[index];
      }
    });
  }

  /**
   * 渲染月份面板
   */
  #renderMonthPanel = () => {
    const ns = this.ns;
    const monthItems = this.#monthPanel.querySelectorAll(
      `.${ns.e("month-item")}`
    );

    monthItems.forEach(item => {
      const monthNum = parseInt(item.dataset.month, 10);
      const isSelected =
        monthNum === this.#states.selectedMonth &&
        this.#states.currentDate.year() === this.#states.selectedYear;

      item.classList.toggle(ns.s("selected"), isSelected);
    });
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

    if (this.type === "year") {
      this.#handleYearSelect(year);
    } else {
      this.#switchToMonthMode();
    }
  };

  /**
   * 处理年份选择（type=year）
   */
  #handleYearSelect = year => {
    const selectedDate = this.#states.currentDate;
    const displayValue = selectedDate.format(this.#getDisplayFormat());
    const valueStr = selectedDate.format(this["value-format"]);

    this.#inputElement.value = displayValue;
    this.setAttribute("value", valueStr);

    this.emit("change", {
      detail: {
        fullDate: valueStr,
        year,
        month: null,
        date: null,
        week: null,
      },
    });

    this.#closeDropdown();
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

    if (this.type === "month") {
      this.#handleMonthSelect(month);
    } else {
      this.#switchToDayMode();
    }
  };

  /**
   * 处理月份选择（type=month）
   */
  #handleMonthSelect = month => {
    const selectedDate = this.#states.currentDate;
    const displayValue = selectedDate.format(this.#getDisplayFormat());
    const valueStr = selectedDate.format(this["value-format"]);

    this.#inputElement.value = displayValue;
    this.setAttribute("value", valueStr);

    this.emit("change", {
      detail: {
        fullDate: valueStr,
        year: this.#states.selectedYear,
        month,
        date: null,
        week: null,
      },
    });

    this.#closeDropdown();
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

    const dateStr = this.#states.currentDate.format("YYYY-MM-DD");
    this.#calendarElement.setAttribute("value", dateStr);
  };

  /**
   * 日历选择事件处理
   * @param {CustomEvent} e
   */
  #onCalendarSelect = e => {
    const { year, month, date, day } = e.detail;
    const selectedDate = dayjs(`${year}-${month}-${date}`);

    this.#states.selectedYear = year;
    this.#states.selectedMonth = month;
    this.#states.currentDate = selectedDate;

    const displayValue = selectedDate.format(this.#getDisplayFormat());
    const valueStr = selectedDate.format(this["value-format"]);

    this.#inputElement.value = displayValue;
    this.setAttribute("value", valueStr);

    this.emit("change", {
      detail: {
        fullDate: valueStr,
        year,
        month,
        date,
        week: day,
      },
    });

    this.#closeDropdown();
  };

  /**
   * 打开下拉框
   */
  #openDropdown = () => {
    if (this.disabled) return;
    const wasOpen = this.#container.classList.contains("is-open");
    this.#container.classList.add("is-open");

    if (!wasOpen) {
      this.dispatchEvent(new EaDatePickerVisibleChangeEvent({ visible: true }));
    }

    if (this.type === "year") {
      this.#switchToYearMode();
    } else if (this.type === "month") {
      this.#switchToMonthMode();
    } else {
      this.#switchToDayMode();
    }
  };

  /**
   * 关闭下拉框
   */
  #closeDropdown = () => {
    const wasOpen = this.#container.classList.contains("is-open");
    this.#container.classList.remove("is-open");

    if (wasOpen) {
      this.dispatchEvent(
        new EaDatePickerVisibleChangeEvent({ visible: false })
      );
    }
  };

  /**
   * 切换下拉框显示状态
   */
  #toggleDropdown = () => {
    if (this.disabled) return;
    if (this.#container.classList.contains("is-open")) {
      this.#closeDropdown();
    } else {
      this.#openDropdown();
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
      this.#closeDropdown();
    }
  };

  /**
   * 输入框焦点事件
   */
  #onInputFocus = () => {
    this.emit("focus");
  };

  /**
   * 输入框失焦事件
   */
  #onInputBlur = () => {
    this.emit("blur");
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

    this.#inputElement.addEventListener("focus", this.#onInputFocus, {
      signal: this.#abortController.signal,
    });

    this.#inputElement.addEventListener("blur", this.#onInputBlur, {
      signal: this.#abortController.signal,
    });

    window.addEventListener("click", this.#onWindowClick, {
      signal: this.#abortController.signal,
    });

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

    this.#yearBtn.addEventListener("click", this.#switchToYearMode, {
      signal: this.#abortController.signal,
    });

    this.#monthBtn.addEventListener("click", this.#switchToMonthMode, {
      signal: this.#abortController.signal,
    });

    const yearPanel = this.shadowRoot.querySelector(this.ns.ce("year-panel"));
    yearPanel.addEventListener("click", this.#onYearClick, {
      signal: this.#abortController.signal,
    });

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

  /**
   * 使组件获取焦点
   * @return {void}
   */
  focus = () => {
    this.#inputElement.focus();
  };

  /**
   * 使组件失去焦点
   * @return {void}
   */
  blur = () => {
    this.#inputElement.blur();
  };

  /**
   * 打开日期选择器弹窗
   * @return {void}
   */
  handleOpen = () => {
    this.#openDropdown();
  };

  /**
   * 关闭日期选择器弹窗
   * @return {void}
   */
  handleClose = () => {
    this.#closeDropdown();
  };

  $beforeUnmounted() {
    this.#abortController?.abort();
    this.#abortController = null;
  }

  /**
   * 获取验证目标元素
   * @returns {HTMLElement}
   */
  get validationTarget() {
    return this.#inputElement;
  }

  /**
   * 更新表单验证状态
   */
  updateValidity() {
    const hasValue = this.value !== "" && this.value != null;

    if (this.required && !hasValue) {
      this.internals.setValidity({ valueMissing: true }, "请选择日期", this);
    } else {
      this.internals.setValidity({}, "", this);
    }
  }

  /**
   * 检查表单字段的有效性
   * @returns {boolean}
   */
  checkValidity() {
    this.updateValidity();
    return this.internals.validity.valid;
  }

  /**
   * 报告表单字段的有效性（显示验证提示）
   * @returns {boolean}
   */
  reportValidity() {
    this.updateValidity();
    return this.internals.reportValidity();
  }
}

if (!customElements.get("ea-date-picker")) {
  customElements.define("ea-date-picker", EaDatePicker);
}
