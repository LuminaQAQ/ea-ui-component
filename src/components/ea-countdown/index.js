import { EaStatistic } from "@components/ea-statistic/index";

import dayjs from "dayjs";
import { timeout } from "@/utils/timeout";
import { EaCountdownFinishEvent } from "./events/EaCountdownFinishEvent";

export class EaCountdown extends EaStatistic {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #title;
  /** @type {HTMLElement} */
  #number;
  /** @type {HTMLElement} */
  #prefix;
  /** @type {HTMLElement} */
  #suffix;

  #timer = null;
  #alignTimeout = null;

  #states = {
    displayValue: "",
  };

  // ------- displayValue -------
  // #region
  get displayValue() {
    return this.#states.displayValue;
  }

  set displayValue(value) {
    this.#states.displayValue = value;
  }
  // #endregion
  // ------- end -------

  static get observedAttributes() {
    return [...super.observedAttributes, "value", "format", "refresh-interval"];
  }

  state = this.properties({
    value: {
      type: Date,
      default: "",
      observer: newVal => {
        if (this.#timer) {
          clearInterval(this.#timer);
          this.#timer = null;
        }

        if (this.#alignTimeout) {
          clearTimeout(this.#alignTimeout);
          this.#alignTimeout = null;
        }

        const handleValueUpdate = () => {
          const { diff, currentTime, displayValue } = this.#getDiffTime(
            newVal,
            this.format
          );

          this.#number.textContent = displayValue;

          this.emit("change", { detail: { value: currentTime, displayValue } });

          if (diff <= 0 || !diff) {
            if (this.#alignTimeout) {
              clearTimeout(this.#alignTimeout);
              this.#alignTimeout = null;
            }

            if (this.#timer) {
              clearInterval(this.#timer);
              this.#timer = null;
            }

            this.dispatchEvent(
              new EaCountdownFinishEvent({ value: currentTime, displayValue })
            );
          }
        };

        handleValueUpdate();

        const refresh = Number(this["refresh-interval"]) || 1000;
        const now = Date.now();
        let delay = refresh - (now % refresh);
        if (delay === 0) delay = refresh;

        this.#alignTimeout = timeout(() => {
          this.#alignTimeout = null;
          handleValueUpdate();
          this.#timer = setInterval(handleValueUpdate, refresh);
        }, delay);
      },
    },
    format: {
      type: String,
      default: "HH:mm:ss",
      observer: newVal => {},
    },
    "refresh-interval": {
      type: Number,
      default: 1000,
      /**  @param {Number} newVal */
      observer: newVal => {},
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist("ea-countdown", {
      // ['--' + this.type]: this.type,
    });

    this.#container.className = className;

    return className;
  }

  constructor() {
    super();

    this.#container = this.shadowRoot.querySelector(".ea-statistic");
    this.#title = this.shadowRoot.querySelector(".ea-statistic__number slot");
    this.#number = this.shadowRoot.querySelector(".ea-statistic__number");
    this.#prefix = this.shadowRoot.querySelector(".ea-statistic__prefix slot");
    this.#suffix = this.shadowRoot.querySelector(".ea-statistic__suffix slot");
  }

  /**
   * 获取时间差
   * @param {dayjs} date
   * @param {string} format
   * @return {{currentTime: number, diff: number, displayValue: string}}
   */
  #getDiffTime = (date, format) => {
    const now = dayjs();
    const end = dayjs(date);
    const diff = end.valueOf() - now.valueOf();
    const pad = (num, len = 2) => `${num}`.padStart(len, "0");

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

  connectedCallback() {
    super.connectedCallback();
  }

  $beforeUnmounted() {
    clearInterval(this.#timer);
  }
}

if (!window.customElements.get("ea-countdown")) {
  window.customElements.define("ea-countdown", EaCountdown);
}
