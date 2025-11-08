import dayjs from "dayjs";
import { EaStatistic } from "../ea-statistic";
import stylesheet from "./index.scss?inline";

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

  static get observedAttributes() {
    return [...super.observedAttributes, "value", "format"];
  }

  state = this.properties({
    value: {
      type: Date,
      default: "",
      observer: (newVal) => {
        if (this.#timer) clearInterval(this.#timer);

        let value = dayjs(newVal).unix();

        this.#number.textContent = dayjs(value).format(this.format);

        // TODO: 处理 倒计时更新
        this.#timer = setInterval(() => {
          value--;
          console.log(value);

          this.#number.textContent = dayjs(value).format(this.format);
        }, 1000);
      },
    },
    format: {
      type: String,
      default: "HH:mm:ss",
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
