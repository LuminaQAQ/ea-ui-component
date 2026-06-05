import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, property, query } from "@decorator";
import dayjs from "dayjs";
import { timeout } from "@utils/timeout";
import { parseToDate } from "@utils/parseTime";
import { EaCountdownChangeEvent } from "./events/EaCountdownChangeEvent";
import { EaCountdownFinishEvent } from "./events/EaCountdownFinishEvent";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-countdown" as const;
const bem = createBEM(TAG_NAME);

/**
 * @summary 倒计时组件，用于显示剩余时间，支持多种时间格式和自定义刷新间隔。
 * @status stable
 * @since 3.0
 *
 * @slot title - 自定义标题内容。
 * @slot prefix - 自定义前缀内容。
 * @slot default - 默认插槽，用于自定义倒计时显示内容。
 * @slot suffix - 自定义后缀内容。
 *
 * @event ea-change - 倒计时每次刷新时触发，detail: `{ value: number, displayValue: string }`。
 * @event ea-finish - 倒计时结束时触发，detail: `{ value: number, displayValue: string }`。
 *
 * @csspart container - 容器元素。
 * @csspart title - 标题元素。
 * @csspart content - 内容区域元素。
 * @csspart prefix - 前缀元素。
 * @csspart number - 倒计时数值元素。
 * @csspart suffix - 后缀元素。
 *
 * @cssproperty --ea-countdown-title-size - 标题字号。
 * @cssproperty --ea-countdown-title-color - 标题颜色。
 * @cssproperty --ea-countdown-number-size - 数值字号。
 * @cssproperty --ea-countdown-number-color - 数值颜色。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaCountdown extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @query(bem.ce("header"))
  private _header!: HTMLElement;

  @query(bem.ce("number"))
  private _number!: HTMLElement;

  private _timer: ReturnType<typeof setInterval> | null = null;

  private _alignTimeout: number | null = null;

  @attribute({
    type: String,
    default: "",
    observer(this: EaCountdown, newVal: string) {
      this._handleValueChange(newVal);
    },
  })
  value: string = "";

  @attribute({
    type: String,
    default: "HH:mm:ss",
  })
  format: string = "HH:mm:ss";

  @attribute({
    type: Number,
    default: 1000,
  })
  refreshInterval: number = 1000;

  @attribute({
    type: String,
    default: "",
    observer(this: EaCountdown, newVal: string) {
      this._header.textContent = newVal;
    },
  })
  heading: string = "";

  @property({ type: String, default: "" })
  displayValue: string = "";

  /** 处理 value 属性变化，清理旧定时器并启动新倒计时 */
  private _handleValueChange(newVal: string): void {
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }

    if (this._alignTimeout) {
      clearTimeout(this._alignTimeout);
      this._alignTimeout = null;
    }

    const targetDate = parseToDate(newVal) || newVal;

    const handleValueUpdate = () => {
      const { diff, currentTime, displayValue } = this._getDiffTime(
        targetDate,
        this.format
      );

      this._number.textContent = displayValue;
      this.displayValue = displayValue;

      this.dispatchEvent(
        new EaCountdownChangeEvent({ value: currentTime, displayValue })
      );

      if (diff <= 0 || !diff) {
        if (this._alignTimeout) {
          clearTimeout(this._alignTimeout);
          this._alignTimeout = null;
        }

        if (this._timer) {
          clearInterval(this._timer);
          this._timer = null;
        }

        this.dispatchEvent(
          new EaCountdownFinishEvent({ value: currentTime, displayValue })
        );
      }
    };

    handleValueUpdate();

    const refresh = Number(this.refreshInterval) || 1000;
    const now = Date.now();
    let delay = refresh - (now % refresh);
    if (delay === 0) delay = refresh;

    this._alignTimeout = timeout(() => {
      this._alignTimeout = null;
      handleValueUpdate();
      this._timer = setInterval(handleValueUpdate, refresh);
    }, delay);
  }

  /** 计算目标时间与当前时间的差值，并格式化显示 */
  private _getDiffTime = (
    date: string | Date,
    format: string
  ): { currentTime: number; diff: number; displayValue: string } => {
    const now = dayjs();
    const end = dayjs(date as dayjs.ConfigType);
    const diff = end.valueOf() - now.valueOf();
    const pad = (num: number, len: number = 2): string =>
      `${num}`.padStart(len, "0");

    if (diff <= 0 || end.isBefore(now) || !diff)
      return {
        currentTime: now.valueOf(),
        diff,
        displayValue: "00:00:00",
      };

    let years = end.diff(now, "year");
    let cursor = now.add(years, "year");
    if (cursor.isAfter(end)) {
      years -= 1;
      cursor = now.add(years, "year");
    }

    let months = end.diff(cursor, "month");
    cursor = cursor.add(months, "month");

    let days = end.diff(cursor, "day");
    cursor = cursor.add(days, "day");

    let hours = end.diff(cursor, "hour");
    cursor = cursor.add(hours, "hour");

    let minutes = end.diff(cursor, "minute");
    cursor = cursor.add(minutes, "minute");

    let seconds = end.diff(cursor, "second");
    cursor = cursor.add(seconds, "second");

    let milliseconds = end.diff(cursor, "millisecond");

    if (!format.includes("YY") && format.includes("MM")) {
      months = Math.floor(end.diff(now, "month", true));
    }

    if (!format.includes("MM") && format.includes("DD")) {
      days = Math.floor(end.diff(now, "day", true));
    }

    if (!format.includes("DD") && format.includes("HH")) {
      hours = Math.floor(end.diff(now, "hour", true));
    }

    if (!format.includes("HH") && format.includes("mm")) {
      minutes = Math.floor(end.diff(now, "minute", true));
    }

    if (!format.includes("mm") && format.includes("ss")) {
      seconds = Math.floor(end.diff(now, "second", true));
    }

    if (!format.includes("ss") && format.includes("SSS")) {
      milliseconds = Math.floor(end.diff(now, "millisecond", true));
    }

    return {
      currentTime: now.valueOf(),
      diff,
      displayValue: format
        .replace("YYYY", pad(years))
        .replace("MM", pad(months))
        .replace("DD", pad(days))
        .replace("HH", pad(hours))
        .replace("mm", pad(minutes))
        .replace("ss", pad(seconds))
        .replace("SSS", pad(milliseconds, 3))
        .replace(/\[|\]/g, ""),
    };
  };

  updateContainerClasslist(): string {
    const className = bem();
    this._container.className = className;
    return className;
  }

  html(): string {
    return `
      <div class='${bem()}' part='container'>
        <header class='${bem.e("header")}' part='title'>
          <slot name='title'></slot>
        </header>
        <main class='${bem.e("content")}' part='content'>
          <span class='${bem.e("prefix")}' part='prefix'>
            <slot name='prefix'></slot>
          </span>
          <span class='${bem.e("number")}' part='number' aria-live="polite" aria-atomic="true">
            <slot></slot>
          </span>
          <span class='${bem.e("suffix")}' part='suffix'>
            <slot name='suffix'></slot>
          </span>
        </main>
      </div>
    `;
  }

  $mount(): void {
    this.updateContainerClasslist();
  }

  $beforeUnmount(): void {
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }

    if (this._alignTimeout) {
      clearTimeout(this._alignTimeout);
      this._alignTimeout = null;
    }
  }
}

export default EaCountdown;
