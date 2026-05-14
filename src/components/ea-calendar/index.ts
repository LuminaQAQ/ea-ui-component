import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import { listen } from "@decorator/listen";
import { Enum } from "@/utils/Enum";
import { html } from "@/utils/html";
import stylesheet from "./index.scss?inline";
import { i18nManager } from "@/utils/I18nManager";
import dayjs, { type Dayjs } from "dayjs";
import "dayjs/locale/zh-cn";

// 动态导入依赖组件，避免循环依赖和架构冲突
async function importButtonComponent() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await import("@/components/ea-button/index" as any);
}

async function importSelectComponent() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await import("@/components/ea-select/index" as any);
}

const TAG_NAME = "ea-calendar" as const;
const bem = createBEM(TAG_NAME);

// ==================== 类型定义 ====================

export type ControllerType = "button" | "select";

export interface DayOption {
  lastMonRemainingDays: number[];
  currentMonDays: number[];
  nextMonRemainingDays: number[];
}

export interface CalendarSelectDetail {
  year: number;
  month: number;
  date: number;
  day: number;
  fullDate: string;
}

// ==================== 组件类 ====================

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaCalendar extends EaBase {
  // ==================== DOM 元素引用 ====================

  @query(".ea-calendar")
  private _container!: HTMLElement;

  @query(".ea-calendar__title")
  private _title!: HTMLElement;

  @query(".ea-calendar__controller-wrapper")
  private _controllerWrapper!: HTMLElement;

  @query(".ea-calendar__thead")
  private _thead!: HTMLTableSectionElement;

  @query(".ea-calendar__tbody")
  private _tbody!: HTMLTableSectionElement;

  // ==================== 私有属性 ====================

  private _abortController?: AbortController;
  private _dateChangeAbortController?: AbortController;
  private _isEaSelectImported: boolean = false;
  private _isEaButtonImported: boolean = false;
  private _displayDate: Dayjs = dayjs();

  // ==================== 属性定义 ====================

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

  // ==================== Getter / Setter ====================

  get displayDate(): Dayjs {
    return this._displayDate;
  }

  set displayDate(value: Dayjs | string) {
    const newDate = typeof value === "string" ? dayjs(value) : value;
    this._displayDate = newDate;
    this.value = newDate.format("YYYY-MM-DD");
  }

  // ==================== 方法 ====================

  /**
   * 更新容器类名
   */
  updateContainerClasslist(): string {
    const className = bem();
    if (this._container) {
      this._container.className = className;
    }
    return className;
  }

  /**
   * 今天按钮点击时的事件
   */
  private _onTodayBtnClickEvent = (): void => {
    i18nManager.locale = this.locale;
    dayjs.locale(this.locale.toLowerCase());

    const today = dayjs();
    this._displayDate = today;
    this._title.textContent = `${today.get("year")} ${i18nManager.t("calendar.months")[today.get("month")]}`;
    this.value = today.format("YYYY-MM-DD");
  };

  /**
   * controller-type 的渲染器
   */
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

    // 动态导入依赖组件
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
      todayBtn.addEventListener("click", this._onTodayBtnClickEvent, {
        signal: this._dateChangeAbortController.signal,
      });
    }
  };

  /**
   * 初始化控制器为 button 的事件
   */
  private _initButtonControllerEvent = async (): Promise<void> => {
    if (!this._isEaButtonImported) {
      await customElements.whenDefined("ea-button");
      this._isEaButtonImported = true;
    }

    const prevBtn = this.shadowRoot?.querySelector(bem.ce("controller-prev"));
    const nextBtn = this.shadowRoot?.querySelector(bem.ce("controller-next"));

    /** 上个月 */
    const onPrevMonthBtnClickEvent = (): void => {
      this.displayDate = this._displayDate.subtract(1, "month").set("date", 1);
    };

    /** 下个月 */
    const onNextMonthBtnClickEvent = (): void => {
      this.displayDate = this._displayDate.add(1, "month").set("date", 1);
    };

    if (prevBtn) {
      prevBtn.addEventListener("click", onPrevMonthBtnClickEvent, {
        signal: this._dateChangeAbortController?.signal,
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", onNextMonthBtnClickEvent, {
        signal: this._dateChangeAbortController?.signal,
      });
    }
  };

  /**
   * 初始化控制器为 select 的事件
   */
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

    /**
     * 年份改变事件
     */
    const onYearChangeEvent = (e: Event): void => {
      e.stopImmediatePropagation();
      const newYear = parseInt((e.target as HTMLSelectElement).value);
      const currentMonthValue = this._displayDate.get("month") + 1;
      this.displayDate = dayjs(`${newYear}-${currentMonthValue}-01`);
    };

    /**
     * 月份改变事件
     */
    const onMonthChangeEvent = (e: Event): void => {
      e.stopImmediatePropagation();
      const currentYearValue = this._displayDate.get("year");
      const newMonth = (e.target as HTMLSelectElement).value.padStart(2, "0");
      this.displayDate = dayjs(`${currentYearValue}-${newMonth}-01`);
    };

    if (yearEl) yearEl.value = String(currentYear);
    if (monthEl) monthEl.value = String(currentMonth);

    await new Promise(resolve => setTimeout(resolve, 0));

    yearEl?.addEventListener("change", onYearChangeEvent, {
      signal: this._dateChangeAbortController?.signal,
    });

    monthEl?.addEventListener("change", onMonthChangeEvent, {
      signal: this._dateChangeAbortController?.signal,
    });
  };

  /**
   * 处理周渲染
   */
  private _getWeekHTMLString = (weekList: string[]): string => {
    return weekList
      .map(day => `<th class='${bem.e("th")}' part='th'>${day}</th>`)
      .join("");
  };

  /**
   * 渲染日历天数
   */
  private _updateCalendarDays(date: Dayjs): void {
    i18nManager.locale = this.locale;
    dayjs.locale(this.locale.toLowerCase());

    const currentYear = date.get("year");
    const currentMonth = date.get("month");

    this._title.textContent = `${currentYear} ${i18nManager.t("calendar.months")[currentMonth]}`;

    this._tbody.innerHTML = this._getDayHTMLString();
  }

  /**
   * 处理tbody点击事件
   */
  @listen("click", ".ea-calendar__tbody")
  private _handleDayCellClick(e: MouseEvent): void {
    const target = (e.target as HTMLElement).closest(bem.ce("day"));

    if (!target || target === this._tbody) return;

    const yearData = parseInt((target as HTMLElement).dataset.year || "0");
    const monthData = parseInt((target as HTMLElement).dataset.month || "0");
    const dateData = parseInt((target as HTMLElement).dataset.date || "0");

    const selectedDate = dayjs(`${yearData}-${monthData}-${dateData}`);

    this.displayDate = selectedDate;

    this.emit("select", {
      detail: {
        year: yearData,
        month: monthData,
        date: dateData,
        day: selectedDate.day(),
        fullDate: `${yearData}-${monthData}-${dateData}`,
      } as CalendarSelectDetail,
      bubbles: true,
      composed: true,
    });
  }

  /**
   * 获取日期数组
   */
  private _getDayOption = (refDate: Dayjs = dayjs()): DayOption => {
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
   */
  private _findDateCell = (
    year: number,
    month: number,
    date: number
  ): HTMLElement | null => {
    return this._tbody.querySelector(
      `td[data-year="${year}"][data-month="${month}"][data-date="${date}"]`
    );
  };

  /**
   * 判断是否是今天
   */
  private _isToday(year: number, month: number, date: number): boolean {
    const now = dayjs();
    return (
      year === now.get("year") &&
      month === now.get("month") &&
      date === now.get("date")
    );
  }

  /**
   * 处理天渲染
   */
  private _getDayHTMLString = (): string => {
    const date = this._displayDate;
    const currentYear = date.get("year");
    const currentMonth = date.get("month") + 1;

    const { lastMonRemainingDays, currentMonDays, nextMonRemainingDays } =
      this._getDayOption(date);

    /**
     * 渲染日历项
     */
    const cellRenderer = (
      dayType: "last-mon" | "current-mon" | "next-mon",
      content: number,
      option: {
        isSelected?: boolean;
        isToday?: boolean;
        isCurrent?: boolean;
      } = {}
    ): string => {
      let year: number;
      let month: number;

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

      const classes: string[] = [bem.e("day"), bem.s(dayType)];
      if (option.isSelected) classes.push(bem.s("selected"));
      if (option.isToday) classes.push(bem.s("today"));
      if (option.isCurrent) classes.push(bem.s("current"));

      const parts: string[] = ["day", dayType];

      return `<td class="${classes.join(" ")}" part="${parts.join(" ")}" data-year="${year}" data-month="${month}" data-date="${content}">${content}</td>`;
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
      .reduce<string[][]>((acc, day, i) => {
        if (i % 7 === 0) acc.push([]);
        acc[acc.length - 1].push(day);
        return acc;
      }, [])
      .map(row => `<tr class="${bem.e("row")}">${row.join("")}</tr>`)
      .join("");

    return calendarDays;
  };

  /**
   * 渲染模板
   */
  html(): string {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    i18nManager.locale = this.locale;
    dayjs.locale(this.locale);

    return `
      <div class="${bem.b()}" part="container">
        <header class="${bem.e("header")}" part="header">
          <slot name="header">
            <span class="${bem.e("title")}" part="title">
              ${currentYear} ${i18nManager.t("calendar.months")[currentMonth]}
            </span>
            <section class="${bem.e("controller-wrapper")}" part="controller-wrapper">
            </section>
          </slot>
        </header>
        <table class="${bem.e("body")}" part="body">
          <thead class="${bem.e("thead")}" part="thead">
            <tr class="${bem.e("week")}" part="thead-tr tr">
              ${this._getWeekHTMLString(i18nManager.t("calendar.weekDays"))}
            </tr>
          </thead>
          <tbody class="${bem.e("tbody")}" part="tbody">${this._getDayHTMLString()}</tbody>
        </table>
      </div>
    `;
  }

  /**
   * 更新组件语言
   */
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

  // ==================== 生命周期 ====================

  $mount(): void {
    this._abortController = new AbortController();

    this._handleControllerRender();

    // 初始化显示日期
    if (this.value) {
      this._displayDate = dayjs(this.value);
      this._updateCalendarDays(this._displayDate);
    }
  }

  $beforeUnmount(): void {
    this._abortController?.abort();
    this._dateChangeAbortController?.abort();
  }
}

export default EaCalendar;
