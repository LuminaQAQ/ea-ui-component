import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query, listen } from "@decorator";
import { html } from "@utils/html";
import { Enum } from "@utils/Enum";
import { i18nManager } from "@utils/I18nManager";
import dayjs, { type Dayjs } from "dayjs";
import "dayjs/locale/zh-cn";
import { EaCalendarSelectEvent } from "./events/EaCalendarSelectEvent";
import stylesheet from "./index.scss?inline";

async function importButtonComponent() {
  await import("@/components/ea-button/index");
}

async function importSelectComponent() {
  await import("@/components/ea-select/index");
}

const TAG_NAME = "ea-calendar" as const;
const bem = createBEM(TAG_NAME);

export type ControllerType = "button" | "select";

export interface DayOption {
  prevMonthRemainingDays: number[];
  currentMonthDays: number[];
  nextMonthRemainingDays: number[];
}

export interface CalendarSelectDetail {
  year: number;
  month: number;
  date: number;
  day: number;
  fullDate: string;
}

type DayType = "prev-month" | "current-month" | "next-month";

/**
 * @summary 日历组件，用于显示和选择日期，支持按钮/下拉控制器和国际化。
 * @status stable
 * @since 3.0
 *
 * @dependency ea-button
 * @dependency ea-select
 *
 * @slot header - 自定义头部内容。
 *
 * @event ea-select - 选择日期时触发，detail: `{ year, month, date, day, fullDate }`。
 *
 * @csspart container - 外层容器。
 * @csspart header - 头部容器。
 * @csspart title - 标题部分。
 * @csspart controller-wrapper - 控制器包装器。
 * @csspart controller-group - 控制器组。
 * @csspart controller - 控制器通用部分。
 * @csspart prev - 上一月控制器。
 * @csspart next - 下一月控制器。
 * @csspart current - 当前/今天控制器。
 * @csspart year - 年份选择器。
 * @csspart month - 月份选择器。
 * @csspart body - 主体表格。
 * @csspart thead - 表头。
 * @csspart thead-tr - 表头行。
 * @csspart th - 表头单元格。
 * @csspart tbody - 表体。
 * @csspart row - 日期行。
 * @csspart day - 日期单元格。
 * @csspart prev-month - 上月日期单元格。
 * @csspart current-month - 当月日期单元格。
 * @csspart next-month - 下月日期单元格。
 *
 * @cssproperty --ea-calendar-bg-color - 组件背景颜色。
 * @cssproperty --ea-calendar-border-color - 组件边框颜色。
 * @cssproperty --ea-calendar-border-radius - 组件圆角。
 * @cssproperty --ea-calendar-shadow - 组件阴影。
 * @cssproperty --ea-calendar-header-padding - 头部内边距。
 * @cssproperty --ea-calendar-header-title-font-size - 标题字体大小。
 * @cssproperty --ea-calendar-header-title-font-weight - 标题字体粗细。
 * @cssproperty --ea-calendar-header-title-color - 标题颜色。
 * @cssproperty --ea-calendar-body-padding - 主体内边距。
 * @cssproperty --ea-calendar-thead-bg-color - 表头背景颜色。
 * @cssproperty --ea-calendar-th-color - 表头单元格颜色。
 * @cssproperty --ea-calendar-th-font-weight - 表头单元格字体粗细。
 * @cssproperty --ea-calendar-th-padding - 表头单元格内边距。
 * @cssproperty --ea-calendar-th-border-color - 表头单元格边框颜色。
 * @cssproperty --ea-calendar-day-height - 日期单元格高度。
 * @cssproperty --ea-calendar-day-hover-bg-color - 日期单元格悬停背景颜色。
 * @cssproperty --ea-calendar-day-active-bg-color - 选中日期背景颜色。
 * @cssproperty --ea-calendar-day-active-color - 选中日期文字颜色。
 * @cssproperty --ea-calendar-day-active-border-color - 选中日期边框颜色。
 * @cssproperty --ea-calendar-day-active-hover-bg-color - 选中日期悬停背景颜色。
 * @cssproperty --ea-calendar-day-today-color - 今日日期文字颜色。
 * @cssproperty --ea-calendar-day-today-font-weight - 今日日期字体粗细。
 * @cssproperty --ea-calendar-day-out-of-range-color - 非当月日期文字颜色。
 * @cssproperty --ea-calendar-day-out-of-range-hover-color - 非当月日期悬停文字颜色。
 * @cssproperty --ea-calendar-day-out-of-range-hover-bg-color - 非当月日期悬停背景颜色。
 * @cssproperty --ea-calendar-controller-year-width - 年份选择器宽度。
 * @cssproperty --ea-calendar-controller-month-width - 月份选择器宽度。
 * @cssproperty --ea-calendar-controller-group-gap - 控制器组间距。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaCalendar extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @query(bem.ce("title"))
  private _title!: HTMLElement;

  @query(bem.ce("controller-wrapper"))
  private _controllerWrapper!: HTMLElement;

  @query(bem.ce("thead"))
  private _thead!: HTMLTableSectionElement;

  @query(bem.ce("tbody"))
  private _tbody!: HTMLTableSectionElement;

  private _dateChangeAbortController?: AbortController;
  private _isEaSelectImported: boolean = false;
  private _isEaButtonImported: boolean = false;
  private _displayDate: Dayjs = dayjs();

  @attribute({
    type: String,
    default: "",
    observer(this: EaCalendar, newVal: string) {
      if (newVal) {
        this._displayDate = dayjs(newVal);
        this._updateCalendarDays(this._displayDate);
      }
    },
  })
  value: string = "";

  @attribute({
    type: Enum(["button", "select"] as const),
    default: "button",
    observer(this: EaCalendar, newVal: ControllerType) {
      this._handleControllerRender(newVal);
    },
  })
  controllerType: ControllerType = "button";

  get displayDate(): Dayjs {
    return this._displayDate;
  }

  set displayDate(value: Dayjs | string) {
    const newDate = typeof value === "string" ? dayjs(value) : value;
    this._displayDate = newDate;
    this.value = newDate.format("YYYY-MM-DD");
  }

  updateContainerClasslist(): string {
    const className = bem();
    if (this._container) {
      this._container.className = className;
    }
    return className;
  }

  private _handleTodayClick = (): void => {
    i18nManager.locale = this.locale;
    dayjs.locale(this.locale.toLowerCase());

    const today = dayjs();
    this._displayDate = today;
    this._title.textContent = `${today.get("year")} ${i18nManager.t("calendar.months")[today.get("month")]}`;
    this.value = today.format("YYYY-MM-DD");
  };

  private _handleControllerRender = async (
    controllerType: ControllerType = this.controllerType
  ): Promise<void> => {
    i18nManager.locale = this.locale;
    dayjs.locale(this.locale.toLowerCase());

    const currentYear = this._displayDate.get("year");

    const controllerTypeStrategies: Record<ControllerType, () => string> = {
      button: () =>
        html(`
        <ea-button-group class='${bem.e("controller-group")}' part='controller-group' size="small">
          <ea-button class='${bem.e("controller")} ${bem.e("controller-prev")}' part='controller prev'>
            ${i18nManager.t("calendar.prevMonth")}
          </ea-button>
          <ea-button class='${bem.e("controller")} ${bem.e("controller-today")}' part='controller current'>
            ${i18nManager.t("calendar.today")}
          </ea-button>
          <ea-button class='${bem.e("controller")} ${bem.e("controller-next")}' part='controller next'>
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

        return html(`
          <section class='${bem.e("controller-group")}' part='controller-group'>
            <ea-select class='${bem.e("controller")} ${bem.e("controller-year")}' part='controller year' placeholder='${i18nManager.t("calendar.selectYear")}' size="small">
              ${yearOptions}
            </ea-select>
            <ea-select class='${bem.e("controller")} ${bem.e("controller-month")}' part='controller month' placeholder='${i18nManager.t("calendar.selectMonth")}' size="small">
              ${monthOptions}
            </ea-select>
            <ea-button class='${bem.e("controller")} ${bem.e("controller-today")}' part='controller current' size="small">
              ${i18nManager.t("calendar.today")}
            </ea-button>
          </section>
        `);
      },
    };

    this._dateChangeAbortController?.abort();
    this._dateChangeAbortController = new AbortController();

    if (controllerType === "select") {
      await importSelectComponent();
      await importButtonComponent();
    } else {
      await importButtonComponent();
    }

    this._controllerWrapper.innerHTML = html(
      controllerTypeStrategies[controllerType]()
    );

    if (controllerType === "select") {
      await this._initSelectControllerEvent();
    } else {
      await this._initButtonControllerEvent();
    }

    const todayBtn = this.shadowRoot?.querySelector(bem.ce("controller-today"));
    if (todayBtn) {
      todayBtn.addEventListener("click", this._handleTodayClick, {
        signal: this._dateChangeAbortController.signal,
      });
    }
  };

  private _initButtonControllerEvent = async (): Promise<void> => {
    if (!this._isEaButtonImported) {
      await customElements.whenDefined("ea-button");
      this._isEaButtonImported = true;
    }

    const prevBtn = this.shadowRoot?.querySelector(bem.ce("controller-prev"));
    const nextBtn = this.shadowRoot?.querySelector(bem.ce("controller-next"));

    const onPrevMonthClick = (): void => {
      this.displayDate = this._displayDate.subtract(1, "month").set("date", 1);
    };

    const onNextMonthClick = (): void => {
      this.displayDate = this._displayDate.add(1, "month").set("date", 1);
    };

    if (prevBtn) {
      prevBtn.addEventListener("click", onPrevMonthClick, {
        signal: this._dateChangeAbortController?.signal,
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", onNextMonthClick, {
        signal: this._dateChangeAbortController?.signal,
      });
    }
  };

  private _initSelectControllerEvent = async (): Promise<void> => {
    if (!this._isEaSelectImported) {
      await customElements.whenDefined("ea-select");
      this._isEaSelectImported = true;
    }

    const currentYear = this._displayDate.get("year");
    const currentMonth = this._displayDate.get("month") + 1;

    const yearEl = this.shadowRoot?.querySelector(
      bem.ce("controller-year")
    ) as HTMLSelectElement | null;
    const monthEl = this.shadowRoot?.querySelector(
      bem.ce("controller-month")
    ) as HTMLSelectElement | null;

    /** @param e - 年份改变事件 */
    const onYearChange = (e: Event): void => {
      e.stopImmediatePropagation();
      const newYear = parseInt((e.target as HTMLSelectElement).value);
      const currentMonthValue = this._displayDate.get("month") + 1;
      this.displayDate = dayjs(`${newYear}-${currentMonthValue}-01`);
    };

    /** @param e - 月份改变事件 */
    const onMonthChange = (e: Event): void => {
      e.stopImmediatePropagation();
      const currentYearValue = this._displayDate.get("year");
      const newMonth = (e.target as HTMLSelectElement).value.padStart(2, "0");
      this.displayDate = dayjs(`${currentYearValue}-${newMonth}-01`);
    };

    if (yearEl) yearEl.value = String(currentYear);
    if (monthEl) monthEl.value = String(currentMonth);

    await new Promise(resolve => setTimeout(resolve, 0));

    yearEl?.addEventListener("change", onYearChange, {
      signal: this._dateChangeAbortController?.signal,
    });

    monthEl?.addEventListener("change", onMonthChange, {
      signal: this._dateChangeAbortController?.signal,
    });
  };

  /** @param weekList - 星期名称列表 @param weekFullList - 完整星期名称列表 @returns 星期行 HTML 字符串 */
  private _renderWeekHeader(
    weekList: string[],
    weekFullList: string[]
  ): string {
    return weekList
      .map(
        (day, i) =>
          `<th class='${bem.e("th")}' part='th' scope='col' role='columnheader' aria-colindex='${i + 1}' abbr='${weekFullList[i] || day}'>${day}</th>`
      )
      .join("");
  }

  /** @param date - 要渲染的日期 */
  private _updateCalendarDays(date: Dayjs): void {
    i18nManager.locale = this.locale;
    dayjs.locale(this.locale.toLowerCase());

    const currentYear = date.get("year");
    const currentMonth = date.get("month");

    const hadFocusInGrid = !!this.shadowRoot?.activeElement?.closest(
      bem.ce("tbody")
    );

    this._title.textContent = `${currentYear} ${i18nManager.t("calendar.months")[currentMonth]}`;
    this._tbody.innerHTML = this._renderDayCells();

    const tableEl = this._container.querySelector("table");
    if (tableEl) {
      const totalRows = 1 + this._tbody.querySelectorAll("tr").length;
      tableEl.setAttribute("aria-rowcount", String(totalRows));
    }

    if (hadFocusInGrid) {
      const activeCell = this._tbody.querySelector(
        "td[role='gridcell'][tabindex='0']"
      ) as HTMLTableCellElement | null;
      activeCell?.focus();
    }
  }

  @listen("click", bem.ce("tbody"))
  private _handleDayCellClick(e: MouseEvent): void {
    const target = (e.target as HTMLElement).closest(bem.ce("day"));

    if (!target || target === this._tbody) return;

    const yearData = parseInt((target as HTMLElement).dataset.year || "0");
    const monthData = parseInt((target as HTMLElement).dataset.month || "0");
    const dateData = parseInt((target as HTMLElement).dataset.date || "0");

    const selectedDate = dayjs(`${yearData}-${monthData}-${dateData}`);

    this.displayDate = selectedDate;

    const td = (target as HTMLElement).closest(
      "td[role='gridcell']"
    ) as HTMLTableCellElement | null;
    if (td) {
      const prevFocus = this._tbody.querySelector(
        "td[role='gridcell'][tabindex='0']"
      );
      if (prevFocus && prevFocus !== td)
        prevFocus.setAttribute("tabindex", "-1");
      td.setAttribute("tabindex", "0");
    }

    this.dispatchEvent(
      new EaCalendarSelectEvent({
        year: yearData,
        month: monthData,
        date: dateData,
        day: selectedDate.day(),
        fullDate: `${yearData}-${monthData}-${dateData}`,
      })
    );
  }

  /** 处理日历网格键盘导航 */
  @listen("keydown", bem.ce("tbody"))
  private _handleGridKeydown(e: KeyboardEvent): void {
    const cell = (e.target as HTMLElement).closest("td[role='gridcell']");
    if (!cell) return;

    const allCells = [
      ...this._tbody.querySelectorAll("td[role='gridcell']"),
    ] as HTMLTableCellElement[];
    const currentIndex = allCells.indexOf(cell as HTMLTableCellElement);
    if (currentIndex === -1) return;

    const cols = 7;
    const rows = Math.ceil(allCells.length / cols);
    const currentRow = Math.floor(currentIndex / cols);
    const currentCol = currentIndex % cols;

    let targetIndex = -1;

    switch (e.key) {
      case "ArrowRight":
        if (currentCol < cols - 1) targetIndex = currentIndex + 1;
        break;
      case "ArrowLeft":
        if (currentCol > 0) targetIndex = currentIndex - 1;
        break;
      case "ArrowDown":
        if (currentRow < rows - 1) targetIndex = currentIndex + cols;
        break;
      case "ArrowUp":
        if (currentRow > 0) targetIndex = currentIndex - cols;
        break;
      case "Home":
        targetIndex = currentRow * cols;
        break;
      case "End":
        targetIndex = currentRow * cols + cols - 1;
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        (cell as HTMLElement).click();
        return;
      default:
        return;
    }

    if (targetIndex >= 0 && targetIndex < allCells.length) {
      e.preventDefault();
      this._moveFocus(allCells[currentIndex], allCells[targetIndex]);
    }
  }

  /** @param fromCell - 当前聚焦单元格 @param toCell - 目标聚焦单元格 */
  private _moveFocus(
    fromCell: HTMLTableCellElement,
    toCell: HTMLTableCellElement
  ): void {
    fromCell.setAttribute("tabindex", "-1");
    toCell.setAttribute("tabindex", "0");
    toCell.focus();
  }

  /** @param refDate - 参考日期 @returns 日期数组选项 */
  private _getDayOption(refDate: Dayjs = dayjs()): DayOption {
    const prevMonthDate = refDate.subtract(1, "month");
    const prevMonthTotalDays = prevMonthDate.daysInMonth();

    const currentMonthFirstDay = refDate.startOf("month").day();
    const currentMonthLastDay = refDate.endOf("month").day();
    const currentMonthTotalDays = refDate.daysInMonth();

    const weekStart = refDate.startOf("week").get("day");

    const prevMonthRemainingDays = Array.from(
      { length: currentMonthFirstDay - weekStart },
      (_, i) => prevMonthTotalDays - i
    ).reverse();
    const currentMonthDays = Array.from(
      { length: currentMonthTotalDays },
      (_, i) => i + 1
    );
    const nextMonthRemainingDays = Array.from(
      { length: 6 - currentMonthLastDay + weekStart },
      (_, i) => i + 1
    );

    return { prevMonthRemainingDays, currentMonthDays, nextMonthRemainingDays };
  }

  /** @param year - 年份 @param month - 月份 @param date - 日期 @returns 是否是今天 */
  private _isToday(year: number, month: number, date: number): boolean {
    const now = dayjs();
    return (
      year === now.get("year") &&
      month === now.get("month") + 1 &&
      date === now.get("date")
    );
  }

  /** @returns 日历天数的 HTML 字符串 */
  private _renderDayCells(): string {
    const date = this._displayDate;
    const currentYear = date.get("year");
    const currentMonth = date.get("month") + 1;
    const currentDate = date.get("date");

    const { prevMonthRemainingDays, currentMonthDays, nextMonthRemainingDays } =
      this._getDayOption(date);

    const cellRenderer = (
      dayType: DayType,
      content: number,
      option: {
        isToday?: boolean;
        isActive?: boolean;
      } = {}
    ): string => {
      let year: number;
      let month: number;

      if (dayType === "prev-month") {
        const m = date.subtract(1, "month");
        year = m.get("year");
        month = m.get("month") + 1;
      } else if (dayType === "current-month") {
        year = currentYear;
        month = currentMonth;
      } else {
        const m = date.add(1, "month");
        year = m.get("year");
        month = m.get("month") + 1;
      }

      const classes: string[] = [bem.e("day"), bem.s(dayType)];
      if (option.isToday) classes.push(bem.s("today"));
      if (option.isActive) classes.push(bem.s("active"));

      const parts: string[] = ["day", dayType];

      const ariaAttrs: string = [
        `role="gridcell"`,
        option.isActive ? `aria-selected="true"` : "",
        option.isToday ? `aria-current="date"` : "",
        dayType !== "current-month" ? `aria-disabled="true"` : "",
        `tabindex="${option.isActive ? 0 : -1}"`,
      ]
        .filter(Boolean)
        .join(" ");

      return `<td class="${classes.join(" ")}" part="${parts.join(" ")}" data-year="${year}" data-month="${month}" data-date="${content}" ${ariaAttrs}>${content}</td>`;
    };

    const prevMonth = prevMonthRemainingDays.map(content =>
      cellRenderer("prev-month", content, {
        isActive: this._isActiveDate(
          date.subtract(1, "month").get("year"),
          date.subtract(1, "month").get("month") + 1,
          content
        ),
      })
    );
    const currentMonthCells = currentMonthDays.map(content =>
      cellRenderer("current-month", content, {
        isToday: this._isToday(currentYear, currentMonth, content),
        isActive: content === currentDate,
      })
    );
    const nextMonthCells = nextMonthRemainingDays.map(content =>
      cellRenderer("next-month", content, {
        isActive: this._isActiveDate(
          date.add(1, "month").get("year"),
          date.add(1, "month").get("month") + 1,
          content
        ),
      })
    );

    return prevMonth
      .concat(currentMonthCells)
      .concat(nextMonthCells)
      .reduce<string[][]>((acc, day, i) => {
        if (i % 7 === 0) acc.push([]);
        acc[acc.length - 1].push(day);
        return acc;
      }, [])
      .map((row, i) => {
        const cells = row.map((cell, colIdx) =>
          cell.replace(
            'role="gridcell"',
            `role="gridcell" aria-colindex="${colIdx + 1}"`
          )
        );
        return `<tr class="${bem.e("row")}" role="row" aria-rowindex="${i + 2}">${cells.join("")}</tr>`;
      })
      .join("");
  }

  /** @param year - 年份 @param month - 月份 @param date - 日期 @returns 是否是选中日期 */
  private _isActiveDate(year: number, month: number, date: number): boolean {
    return (
      year === this._displayDate.get("year") &&
      month === this._displayDate.get("month") + 1 &&
      date === this._displayDate.get("date")
    );
  }

  html(): string {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    i18nManager.locale = this.locale;
    dayjs.locale(this.locale);

    const titleId = `${TAG_NAME}-title`;

    return `
      <div class="${bem.b()}" part="container">
        <header class="${bem.e("header")}" part="header">
          <slot name="header">
            <span class="${bem.e("title")}" part="title" id="${titleId}">
              ${currentYear} ${i18nManager.t("calendar.months")[currentMonth]}
            </span>
            <section class="${bem.e("controller-wrapper")}" part="controller-wrapper">
            </section>
          </slot>
        </header>
        <table class="${bem.e("body")}" part="body" role="grid" aria-labelledby="${titleId}" aria-colcount="7">
          <thead class="${bem.e("thead")}" part="thead">
            <tr class="${bem.e("week")}" part="thead-tr tr" role="row" aria-rowindex="1">
              ${this._renderWeekHeader(i18nManager.t("calendar.weekDays"), i18nManager.t("calendar.weekDaysFull") || i18nManager.t("calendar.weekDays"))}
            </tr>
          </thead>
          <tbody class="${bem.e("tbody")}" part="tbody">${this._renderDayCells()}</tbody>
        </table>
      </div>
    `;
  }

  $updateLocalization(locale: string): void {
    i18nManager.locale = locale;
    dayjs.locale(this.locale.toLowerCase());

    this._displayDate = this._displayDate.locale(this.locale.toLowerCase());

    const prev = this.shadowRoot?.querySelector(bem.ce("controller-prev"));
    const today = this.shadowRoot?.querySelector(bem.ce("controller-today"));
    const next = this.shadowRoot?.querySelector(bem.ce("controller-next"));
    const year = this.shadowRoot?.querySelector(bem.ce("controller-year"));
    const month = this.shadowRoot?.querySelector(bem.ce("controller-month"));

    if (prev) prev.textContent = i18nManager.t("calendar.prevMonth");
    if (today) today.textContent = i18nManager.t("calendar.today");
    if (next) next.textContent = i18nManager.t("calendar.nextMonth");
    if (year) (year as any).placeholder = i18nManager.t("calendar.selectYear");
    if (month)
      (month as any).placeholder = i18nManager.t("calendar.selectMonth");

    const week = i18nManager.t("calendar.weekDays");
    const ths = this._thead.querySelectorAll(`.${bem.e("th")}`);
    ths.forEach((th, index) => {
      th.textContent = week[index];
    });

    this._updateCalendarDays(this._displayDate);
  }

  $mount(): void {
    this._handleControllerRender();

    if (this.value) {
      this._displayDate = dayjs(this.value);
      this._updateCalendarDays(this._displayDate);
    }
  }

  $beforeUnmount(): void {
    this._dateChangeAbortController?.abort();
  }
}

export default EaCalendar;
