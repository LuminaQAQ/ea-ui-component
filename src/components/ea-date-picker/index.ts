import { EaFormAssociatedBase } from "@core/EaFormAssociatedBase";
import { attribute } from "@decorator/attribute";
import { property } from "@decorator/property";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import { listen } from "@decorator/listen";
import { createBEM } from "@utils/bem";
import { html } from "@utils/html";
import { Enum } from "@/utils/Enum";
import stylesheet from "./index.scss?inline";

import "@/components/ea-calendar/index.js";
import "@/components/ea-input/index.js";
import "@/components/ea-button/index.js";

import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);
import "dayjs/locale/zh-cn";
import { i18nManager } from "@utils/I18nManager";
import { EaDatePickerPanelChangeEvent } from "./events/EaDatePickerPanelChangeEvent";
import { EaDatePickerVisibleChangeEvent } from "./events/EaDatePickerVisibleChangeEvent";

const TAG_NAME = "ea-date-picker" as const;
const bem = createBEM(TAG_NAME);

export type DatePickerType = "date" | "month" | "year";
export type DatePickerSize = "large" | "default" | "small";
export type DatePickerAlign = "left" | "center" | "right";
export type DatePickerViewMode = "day" | "month" | "year";

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaDatePicker extends EaFormAssociatedBase {
  @query(".ea-date-picker")
  private _container!: HTMLElement;

  @query(".ea-date-picker__input")
  private _inputElement!: HTMLElement;

  @query(".ea-date-picker__dropdown-wrap")
  private _dropdownWrap!: HTMLElement;

  @query(".ea-date-picker__calendar")
  private _calendarElement!: HTMLElement;

  @query(".ea-date-picker__calendar-header")
  private _calendarHeader!: HTMLElement;

  @query(".ea-date-picker__calendar-body")
  private _calendarBody!: HTMLElement;

  @query(".ea-date-picker__header-year")
  private _yearBtn!: HTMLElement;

  @query(".ea-date-picker__header-month")
  private _monthBtn!: HTMLElement;

  @query(".ea-date-picker__btn-prev-year")
  private _prevYearBtn!: HTMLElement;

  @query(".ea-date-picker__btn-prev-month")
  private _prevMonthBtn!: HTMLElement;

  @query(".ea-date-picker__btn-next-month")
  private _nextMonthBtn!: HTMLElement;

  @query(".ea-date-picker__btn-next-year")
  private _nextYearBtn!: HTMLElement;

  @query(".ea-date-picker__year-panel")
  private _yearPanel!: HTMLElement;

  @query(".ea-date-picker__month-panel")
  private _monthPanel!: HTMLElement;

  private _abortController?: AbortController | null;

  private _states = {
    currentDate: dayjs(),
    viewMode: "day" as DatePickerViewMode,
    selectedYear: null as number | null,
    selectedMonth: null as number | null,
  };

  @attribute({
    type: String,
    default: "",
    observer(this: EaDatePicker, newVal: string) {
      this._inputElement.label = newVal;
    },
  })
  label: string = "";

  @attribute({
    type: String,
    default: "auto",
    observer(this: EaDatePicker, newVal: string) {
      this._container.style.setProperty("--ea-date-picker-width", newVal);
    },
  })
  width: string = "auto";

  @attribute({
    type: String,
    default: "",
    observer(this: EaDatePicker, newVal: string) {
      let dateValue = newVal;
      if (isNaN(new Date(newVal).getTime()) && newVal !== "") {
        const date = new Date(Date.now());
        dateValue = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      }
      if (dateValue) {
        this._states.currentDate = dayjs(dateValue);
        this._states.selectedYear = this._states.currentDate.year();
        this._states.selectedMonth = this._states.currentDate.month() + 1;
        this._inputElement.value = this._states.currentDate.format(
          this._getDisplayFormat()
        );
      } else {
        this._inputElement.value = dateValue;
      }
      this.setValue(newVal);
    },
  })
  value: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaDatePicker, newVal: string) {
      this._inputElement.setAttribute("placeholder", newVal);
    },
  })
  placeholder: string = "";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaDatePicker, newVal: boolean) {
      this._inputElement.toggleAttribute("disabled", newVal);
      this.updateContainerClasslist();
    },
  })
  disabled: boolean = false;

  @attribute({
    type: Enum(["left", "center", "right"]),
    default: "left",
    observer(this: EaDatePicker) {
      this.updateContainerClasslist();
    },
  })
  align: DatePickerAlign = "left";

  @attribute({
    type: String,
    default: "YYYY-MM-DD",
  })
  displayFormat: string = "YYYY-MM-DD";

  @attribute({
    type: String,
    default: "YYYY-MM-DD",
  })
  valueFormat: string = "YYYY-MM-DD";

  @attribute({
    type: Enum(["date", "month", "year"]),
    default: "date",
    observer(this: EaDatePicker, newVal: DatePickerType) {
      if (newVal === "year") {
        this._switchToYearMode();
      } else if (newVal === "month") {
        this._switchToMonthMode();
      } else {
        this._switchToDayMode();
      }
    },
  })
  type: DatePickerType = "date";

  @attribute({
    type: Enum(["large", "default", "small"]),
    default: "default",
    observer(this: EaDatePicker, newVal: DatePickerSize) {
      this._inputElement.setAttribute("size", newVal);
      this._yearBtn.setAttribute("size", newVal);
      this._monthBtn.setAttribute("size", newVal);
      this._prevYearBtn.setAttribute("size", newVal);
      this._prevMonthBtn.setAttribute("size", newVal);
      this._nextMonthBtn.setAttribute("size", newVal);
      this._nextYearBtn.setAttribute("size", newVal);

      this.updateContainerClasslist();
    },
  })
  size: DatePickerSize = "default";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaDatePicker, newVal: boolean) {
      this._inputElement.toggleAttribute("required", newVal);
    },
  })
  required: boolean = false;

  updateContainerClasslist(): string {
    const viewMode = this._states?.viewMode || "day";
    const className = bem(
      {
        [this.size]: this.size && this.size !== "default",
      },
      {
        disabled: this.disabled,
        [`align-${this.align}`]: this.align && this.align !== "left",
        open: this._container?.classList.contains("is-open"),
        [`view-${viewMode}`]: true,
      }
    );

    this._container.className = className;

    return className;
  }

  private _getDisplayFormat(): string {
    if (this.hasAttribute("display-format") && this.displayFormat !== "") {
      return this.displayFormat;
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

  html(): string {
    i18nManager.locale = this.locale;
    dayjs.locale(this.locale.toLowerCase());

    const monthsShort = i18nManager.t("calendar.monthsShort");

    return `
      <div class='${bem()}' part='container'>
        <div class='${bem.e("input-wrap")}' part='input-wrap'>
          <ea-input class="${bem.e("input")}" part='input' prefix-icon="calendar-xmark" readonly></ea-input>
        </div>
        <div class='${bem.e("dropdown-wrap")}' part='dropdown-wrap'>
          <div class='${bem.e("calendar-wrapper")}'>
            <div class='${bem.e("calendar-header")}' part='calendar-header'>
              <div class='${bem.e("header-left")}' part='header-left'>
                <ea-button class='${bem.e("header-btn")} ${bem.e("btn-prev-year")}' part='header-btn' aria-label="Previous year" text>«</ea-button>
                <ea-button class='${bem.e("header-btn")} ${bem.e("btn-prev-month")}' part='header-btn' aria-label="Previous month" text>‹</ea-button>
              </div>
              <div class='${bem.e("header-center")}' part='header-center'>
                <ea-button class='${bem.e("header-year")}' part='header-year' aria-label="Year" text></ea-button>
                <ea-button class='${bem.e("header-month")}' part='header-month' aria-label="Month" text></ea-button>
              </div>
              <div class='${bem.e("header-right")}' part='header-right'>
                <ea-button class='${bem.e("header-btn")} ${bem.e("btn-next-month")}' part='header-btn' aria-label="Next month" text>›</ea-button>
                <ea-button class='${bem.e("header-btn")} ${bem.e("btn-next-year")}' part='header-btn' aria-label="Next year" text>»</ea-button>
              </div>
            </div>
            <div class='${bem.e("calendar-body")}' part='calendar-body'>
              <ea-calendar class="${bem.e("calendar")}" size="small" part='calendar'></ea-calendar>
            </div>
            <div class='${bem.e("year-panel")}' part='year-panel'></div>
            <div class='${bem.e("month-panel")}' part='month-panel'>${monthsShort
              .map(
                (month, i) =>
                  `<button class='${bem.e("month-item")}' part='month-item' data-month='${i + 1}'>${month}</button>`
              )
              .join("")}</div>
          </div>
        </div>
      </div>
    `;
  }

  private _updateHeaderDisplay = (): void => {
    const year = this._states.currentDate.year();
    const month = this._states.currentDate.month() + 1;

    if (this._states.viewMode === "year") {
      const decadeStart = Math.floor(year / 10) * 10;
      const decadeEnd = decadeStart + 9;
      this._yearBtn.textContent = `${decadeStart} ~ ${decadeEnd}`;
      this._monthBtn.textContent = "";
    } else if (this._states.viewMode === "month") {
      this._yearBtn.textContent = String(year);
      this._monthBtn.textContent = "";
    } else {
      this._yearBtn.textContent = String(year);
      this._monthBtn.textContent = month < 10 ? `0${month}` : String(month);
    }
  };

  private _switchToYearMode = (): void => {
    this._states.viewMode = "year";
    this._updateHeaderDisplay();
    this._renderYearPanel();
    this.updateContainerClasslist();
    this._updateHeaderButtons("year");

    this.dispatchEvent(
      new EaDatePickerPanelChangeEvent({
        date: this._states.currentDate.toDate(),
        mode: "year",
        view: "year-panel",
      })
    );
  };

  private _switchToMonthMode = (): void => {
    this._states.viewMode = "month";
    this._updateHeaderDisplay();
    this._renderMonthPanel();
    this.updateContainerClasslist();
    this._updateHeaderButtons("month");

    this.dispatchEvent(
      new EaDatePickerPanelChangeEvent({
        date: this._states.currentDate.toDate(),
        mode: "month",
        view: "month-panel",
      })
    );
  };

  private _switchToDayMode = (): void => {
    this._states.viewMode = "day";
    this._updateHeaderDisplay();

    this.updateContainerClasslist();
    this._updateHeaderButtons("day");

    const dateStr = this._states.currentDate.format("YYYY-MM-DD");
    this._calendarElement.setAttribute("value", dateStr);

    this.dispatchEvent(
      new EaDatePickerPanelChangeEvent({
        date: this._states.currentDate.toDate(),
        mode: "month",
        view: "day-panel",
      })
    );
  };

  private _updateHeaderButtons = (mode: DatePickerViewMode): void => {
    if (mode === "year") {
      this._prevYearBtn.ariaLabel = "Previous decade";
      this._nextYearBtn.ariaLabel = "Next decade";
    } else if (mode === "month") {
      this._prevYearBtn.ariaLabel = "Previous year";
      this._nextYearBtn.ariaLabel = "Next year";
    } else {
      this._prevYearBtn.ariaLabel = "Previous year";
      this._nextYearBtn.ariaLabel = "Next year";
      this._prevMonthBtn.ariaLabel = "Previous month";
      this._nextMonthBtn.ariaLabel = "Next month";
    }
  };

  private _renderYearPanel = (): void => {
    const year = this._states.currentDate.year();
    const decadeStart = Math.floor(year / 10) * 10;
    const yearPanel = this._yearPanel;

    let yearHtml = Array.from({ length: 10 }, (_, i) => {
      const y = decadeStart + i;
      const isSelected = y === this._states.selectedYear;
      return `<button class='${bem.e("year-item")} ${isSelected ? bem.s("selected") : ""}' data-year='${y}' part='year-item'>${y}</button>`;
    }).join("");

    yearPanel.innerHTML = html(yearHtml);
  };

  private _renderMonthPanel = (): void => {
    const monthItems = this._monthPanel.querySelectorAll(
      `.${bem.e("month-item")}`
    );

    monthItems.forEach(item => {
      const monthNum = parseInt((item as HTMLElement).dataset.month!, 10);
      const isSelected =
        monthNum === this._states.selectedMonth &&
        this._states.currentDate.year() === this._states.selectedYear;

      item.classList.toggle(bem.s("selected"), isSelected);
    });
  };

  $updateLocalization(locale: string): void {
    i18nManager.locale = locale;
    dayjs.locale(locale.toLowerCase());

    const monthsShort = i18nManager.t("calendar.monthsShort");
    const monthItems = this._monthPanel.querySelectorAll(
      `.${bem.e("month-item")}`
    );

    monthItems.forEach((item, index) => {
      if (monthsShort[index]) {
        item.textContent = monthsShort[index];
      }
    });
  }

  private _onPrevYearClick = (): void => {
    if (this._states.viewMode === "year") {
      this._states.currentDate = this._states.currentDate.subtract(10, "year");
    } else {
      this._states.currentDate = this._states.currentDate.subtract(1, "year");
    }
    this._updateView();
  };

  private _onNextYearClick = (): void => {
    if (this._states.viewMode === "year") {
      this._states.currentDate = this._states.currentDate.add(10, "year");
    } else {
      this._states.currentDate = this._states.currentDate.add(1, "year");
    }
    this._updateView();
  };

  private _onPrevMonthClick = (): void => {
    this._states.currentDate = this._states.currentDate.subtract(1, "month");
    this._updateView();
  };

  private _onNextMonthClick = (): void => {
    this._states.currentDate = this._states.currentDate.add(1, "month");
    this._updateView();
  };

  private _onYearClick = (e: Event): void => {
    const target = e.target as HTMLElement;
    const yearItem = target.closest("[data-year]");
    if (!yearItem) return;

    const year = parseInt((yearItem as HTMLElement).dataset.year!);
    this._states.selectedYear = year;
    this._states.currentDate = this._states.currentDate.year(year);

    if (this.type === "year") {
      this._handleYearSelect(year);
    } else {
      this._switchToMonthMode();
    }
  };

  private _handleYearSelect = (year: number): void => {
    const selectedDate = this._states.currentDate;
    const displayValue = selectedDate.format(this._getDisplayFormat());
    const valueStr = selectedDate.format(this.valueFormat);

    this._inputElement.value = displayValue;
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

    this._closeDropdown();
  };

  private _onMonthClick = (e: Event): void => {
    const target = e.target as HTMLElement;
    const monthItem = target.closest("[data-month]");
    if (!monthItem) return;

    const month = parseInt((monthItem as HTMLElement).dataset.month!);
    this._states.selectedMonth = month;
    this._states.currentDate = this._states.currentDate.month(month - 1);

    if (this.type === "month") {
      this._handleMonthSelect(month);
    } else {
      this._switchToDayMode();
    }
  };

  private _handleMonthSelect = (month: number): void => {
    const selectedDate = this._states.currentDate;
    const displayValue = selectedDate.format(this._getDisplayFormat());
    const valueStr = selectedDate.format(this.valueFormat);

    this._inputElement.value = displayValue;
    this.setAttribute("value", valueStr);

    this.emit("change", {
      detail: {
        fullDate: valueStr,
        year: this._states.selectedYear,
        month,
        date: null,
        week: null,
      },
    });

    this._closeDropdown();
  };

  private _updateView = (): void => {
    this._updateHeaderDisplay();

    if (this._states.viewMode === "year") {
      this._renderYearPanel();
    } else if (this._states.viewMode === "month") {
      this._renderMonthPanel();
    }

    const dateStr = this._states.currentDate.format("YYYY-MM-DD");
    this._calendarElement.setAttribute("value", dateStr);
  };

  @listen("select", ".ea-date-picker__calendar")
  private _onCalendarSelect(e: Event): void {
    const detail = (e as CustomEvent).detail;
    const { year, month, date, day } = detail;
    const selectedDate = dayjs(`${year}-${month}-${date}`);

    this._states.selectedYear = year;
    this._states.selectedMonth = month;
    this._states.currentDate = selectedDate;

    const displayValue = selectedDate.format(this._getDisplayFormat());
    const valueStr = selectedDate.format(this.valueFormat);

    this._inputElement.value = displayValue;
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

    this._closeDropdown();
  }

  @listen("click", ".ea-date-picker__input")
  private _onInputClick(): void {
    this._toggleDropdown();
  }

  @listen("focus", ".ea-date-picker__input")
  private _onInputFocus(): void {
    this.emit("focus");
  }

  @listen("blur", ".ea-date-picker__input")
  private _onInputBlur(): void {
    this.emit("blur");
  }

  @listen("click", "window")
  private _onWindowClick(e: MouseEvent): void {
    const path = e.composedPath();
    const isInsideDatePicker =
      path.includes(this) || path.includes(this.shadowRoot!);
    if (!isInsideDatePicker) {
      this._closeDropdown();
    }
  }

  @listen("click", ".ea-date-picker__btn-prev-year")
  private _handlePrevYearClick(): void {
    this._onPrevYearClick();
  }

  @listen("click", ".ea-date-picker__btn-next-year")
  private _handleNextYearClick(): void {
    this._onNextYearClick();
  }

  @listen("click", ".ea-date-picker__btn-prev-month")
  private _handlePrevMonthClick(): void {
    this._onPrevMonthClick();
  }

  @listen("click", ".ea-date-picker__btn-next-month")
  private _handleNextMonthClick(): void {
    this._onNextMonthClick();
  }

  @listen("click", ".ea-date-picker__header-year")
  private _handleYearBtnClick(): void {
    this._switchToYearMode();
  }

  @listen("click", ".ea-date-picker__header-month")
  private _handleMonthBtnClick(): void {
    this._switchToMonthMode();
  }

  @listen("click", ".ea-date-picker__year-panel")
  private _handleYearPanelClick(e: Event): void {
    this._onYearClick(e);
  }

  @listen("click", ".ea-date-picker__month-panel")
  private _handleMonthPanelClick(e: Event): void {
    this._onMonthClick(e);
  }

  private _openDropdown = (): void => {
    if (this.disabled) return;
    const wasOpen = this._container.classList.contains("is-open");
    this._container.classList.add("is-open");

    if (!wasOpen) {
      this.dispatchEvent(new EaDatePickerVisibleChangeEvent({ visible: true }));
    }

    if (this.type === "year") {
      this._switchToYearMode();
    } else if (this.type === "month") {
      this._switchToMonthMode();
    } else {
      this._switchToDayMode();
    }
  };

  private _closeDropdown = (): void => {
    const wasOpen = this._container.classList.contains("is-open");
    this._container.classList.remove("is-open");

    if (wasOpen) {
      this.dispatchEvent(
        new EaDatePickerVisibleChangeEvent({ visible: false })
      );
    }
  };

  private _toggleDropdown = (): void => {
    if (this.disabled) return;
    if (this._container.classList.contains("is-open")) {
      this._closeDropdown();
    } else {
      this._openDropdown();
    }
  };

  focus(): void {
    this._inputElement.focus();
  }

  blur(): void {
    this._inputElement.blur();
  }

  handleOpen(): void {
    this._openDropdown();
  }

  handleClose(): void {
    this._closeDropdown();
  }

  get validationTarget(): HTMLElement {
    return this._inputElement;
  }

  updateValidity(): void {
    const hasValue = this.value !== "" && this.value != null;

    if (this.required && !hasValue) {
      this.internals.setValidity({ valueMissing: true }, "请选择日期", this);
    } else {
      this.internals.setValidity({}, "", this);
    }
  }

  checkValidity(): boolean {
    this.updateValidity();
    return this.internals.validity.valid;
  }

  reportValidity(): boolean {
    this.updateValidity();
    return this.internals.reportValidity();
  }

  $mount(): void {
    this.updateContainerClasslist();
    this._updateHeaderDisplay();
  }

  $beforeUnmount(): void {
    this._abortController?.abort();
    this._abortController = null;
  }
}
