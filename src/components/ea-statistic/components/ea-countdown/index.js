import dayjs from "dayjs";
import { EaStatistic } from "../ea-statistic";

import stylesheet from "../../index.scss?inline";

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
      observer: (newVal) => {
        if (this.#timer) {
          clearInterval(this.#timer);
          this.#timer = null;
        }

        const handleValueUpdate = () => {
          const { diff, currentTime, displayValue } = this.#getDiffTime(
            newVal,
            this.format
          );

          this.#number.textContent = displayValue;
          this.emit("change", { detail: { value: currentTime, displayValue } });

          if (diff <= 0 || !diff) {
            clearInterval(this.#timer);
            this.#timer = null;
            this.emit("finish", {
              detail: { value: currentTime, displayValue },
            });
          }
        };

        handleValueUpdate();
        handleValueUpdate();
        this.#timer = setInterval(handleValueUpdate, this["refresh-interval"]);
      },
    },
    format: {
      type: String,
      default: "HH:mm:ss",
      observer: (newVal) => {},
    },
    "refresh-interval": {
      type: Number,
      default: 1000,
      /**  @param {Number} newVal */
      observer: (newVal) => {},
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

    this.stylesheet = stylesheet;

    this.#container = this.shadowRoot.querySelector(".ea-statistic");
    this.#title = this.shadowRoot.querySelector(".ea-statistic__number");
    this.#number = this.shadowRoot.querySelector(".ea-statistic__number");
    this.#prefix = this.shadowRoot.querySelector(".ea-statistic__prefix");
    this.#suffix = this.shadowRoot.querySelector(".ea-statistic__suffix");
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
    const diff = dayjs(end).diff(now);
    const duration = dayjs.duration(diff);
    const pad = (num, len = 2) => `${num}`.padStart(len, "0");

    if (diff <= 0 || end.isBefore(now) || !diff)
      return {
        currentTime: now.valueOf(),
        diff,
        displayValue: "00:00:00",
      };

    let years = duration.years();
    let months = duration.months();
    let days = duration.days();
    let hours = duration.hours();
    let minutes = duration.minutes();
    let seconds = duration.seconds();
    let milliseconds = duration.milliseconds();

    if (!format.includes("YY") && format.includes("MM")) {
      months = Math.floor(duration.asMonths());
    }

    if (!format.includes("MM") && format.includes("DD")) {
      days = Math.floor(duration.asDays());
    }

    if (!format.includes("DD") && format.includes("HH")) {
      hours = Math.floor(duration.asHours());
    }

    if (!format.includes("HH") && format.includes("mm")) {
      minutes = Math.floor(duration.asMinutes());
    }

    if (!format.includes("mm") && format.includes("ss")) {
      seconds = Math.floor(duration.asSeconds());
    }

    if (!format.includes("ss") && format.includes("SSS")) {
      milliseconds = Math.floor(duration.asMilliseconds());
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
