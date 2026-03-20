import Base from "@components/Base.js";
import { circleItem } from "./components/circleItem";
import { dashboardItem } from "./components/dashboardItem";

import stylesheet from "./index.scss?inline";

export class EaProgress extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #track;
  /** @type {HTMLElement} */
  #path;
  /** @type {HTMLElement} */
  #percentageWrapper;
  /** @type {HTMLElement} */
  #text;

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "type",
      "percentage",
      "status",
      "stroke-width",
      "text-inside",
      "indeterminate",
      "duration",
      "striped",
      "striped-flow",
      // "width",
      "show-text",
    ];
  }

  propState = this.properties({
    color: {
      props: true,
      type: {
        Array: () => this.props?.color?.length > 0,
        Function: () => typeof this.props?.color === "function",
        String: () =>
          typeof this.getAttribute("color") === "string" ||
          typeof this.props?.color === "string",
      },
      default: () => this.getAttribute("color") || "",
      observer: newVal => {
        this.#handleColorChange(newVal, newVal);
      },
    },
  });

  state = this.properties({
    percentage: {
      type: Number,
      default: 0,
      observer: newVal => {
        this.#updatePercentage(newVal);
      },
    },
    type: {
      type: ["line", "circle", "dashboard"],
      default: "line",
      observer: () => {
        this.$render();
        this.updateContainerClasslist();
        this.#updatePercentage();
      },
    },
    status: {
      type: ["success", "exception", "warning"],
      default: "",
      observer: () => {
        this.updateContainerClasslist();
        this.#updateStatusText();
      },
    },
    "stroke-width": {
      type: String,
      default: "8px",
      observer: newVal => {
        if (!CSS.supports("width", newVal))
          return console.warn(
            `[EaProgress] The width value ${newVal} is not supported.`
          );

        this.#container.style.setProperty("--ea-progress-stroke-width", newVal);
      },
    },
    "text-inside": {
      type: Boolean,
      default: false,
      observer: newVal => {
        try {
          if (newVal) {
            this.#path.appendChild(this.#text);
          } else {
            this.#percentageWrapper.appendChild(this.#text);
          }
        } catch {
          /* empty */
        }

        this.updateContainerClasslist();
      },
    },
    indeterminate: {
      type: Boolean,
      default: false,
      observer: () => {
        this.updateContainerClasslist();
      },
    },
    duration: {
      type: Number,
      default: 3,
      observer: newVal => {
        this.#container.style.setProperty(
          "--ea-progress-animation-duration",
          `${newVal}s`
        );
      },
    },
    striped: {
      type: Boolean,
      default: false,
      observer: () => {
        this.updateContainerClasslist();
      },
    },
    "striped-flow": {
      type: Boolean,
      default: false,
      observer: () => {
        this.updateContainerClasslist();
      },
    },
    size: {
      type: String,
      default: "126px",
      observer: newVal => {
        if (this.type === "line") return;

        this.#container.style.setProperty("--ea-progress-size", newVal);
      },
    },
    "show-text": {
      type: Boolean,
      default: true,
      observer: () => {
        this.updateContainerClasslist();
      },
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist(
      "ea-progress",
      {
        ["--" + this.status]: this.status,
        ["--text-inside"]: this["text-inside"],
        ["--striped"]: this.striped,
      },
      {
        [this.type]: this.type,
        indeterminate: this.indeterminate && this.type === "line",
        "striped-flow": this["striped-flow"],
        "show-text": this["show-text"],
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

  $render() {
    const itemOptions = {
      line: `
        <div class='ea-progress' part='container'>
          <section class="ea-progress__track" part="track">
            <section class="ea-progress__path" part="path"></section>
          </section>
          <section class="ea-progress__percentage-wrapper" part="percentage">
            <slot class="ea-progress__percentage"></slot>
          </section>
        </div>
      `,
      circle: circleItem,
      dashboard: dashboardItem,
    };

    this.shadowRoot.innerHTML = `
      <div class='ea-progress' part='container'>
        ${itemOptions[this.type]}
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-progress");
    this.#track = this.shadowRoot.querySelector(".ea-progress__track");
    this.#path = this.shadowRoot.querySelector(".ea-progress__path");
    this.#percentageWrapper = this.shadowRoot.querySelector(
      ".ea-progress__percentage-wrapper"
    );
    this.#text = this.shadowRoot.querySelector(".ea-progress__percentage");

    this.updateContainerClasslist();
  }

  /**
   * 处理颜色变化
   * @param {string | string[] | function} color 颜色值或函数
   * @param {number} [percentage] 百分比
   */
  #handleColorChange = (color, percentage = this.percentage) => {
    if (!color || typeof color === "undefined") return;

    if (Array.isArray(color)) {
      let nearItem = color[0];

      for (let i = 0; i < color.length; i++) {
        const item = color[i];

        if (percentage <= item.percentage) {
          nearItem = item;

          break;
        }
      }

      this.#path.style.setProperty("--ea-progress-path-color", nearItem?.color);
    } else if (typeof color === "string") {
      this.#path.style.setProperty("--ea-progress-path-color", color);
    } else if (typeof color === "function") {
      this.#path.style.setProperty(
        "--ea-progress-path-color",
        color(percentage)
      );
    }
  };

  /**
   * 更新状态文本/图标
   */
  #updateStatusText() {
    const statusIcon = {
      success: "circle-check",
      warning: "triangle-exclamation",
      exception: "circle-xmark",
    };

    if (
      ["success", "exception", "warning"].includes(this.status) &&
      !this["text-inside"]
    ) {
      this.#text.innerHTML = `<ea-icon class="ea-progress__status" name="${
        statusIcon[this.status]
      }" part="status-icon"></ea-icon>`;
    } else {
      this.#text.textContent = this.percentage + "%";
    }
  }

  /**
   * 更新进度条百分比
   * @param {number} [newVal] 新的百分比值
   */
  #updatePercentage(newVal = this.percentage) {
    if (newVal < 0) return (this.percentage = 0);
    else if (newVal > 100) return (this.percentage = 100);

    const percentageSlot = this.querySelector("[data-percentage]");
    const strategies = {
      line: () => newVal + "%",
      circle: () => 302 * ((100 - newVal) / 100) + "px",
      dashboard: () => {
        const width = Number(this["stroke-width"].replace("px", ""));
        const r = 49 - width / 2;
        const C = 2 * Math.PI * r;
        const progress = (100 - newVal) / 100;

        this.#path.style.strokeDasharray = C * (270 / 360) + "px";
        this.#track.style.strokeDasharray = C * (270 / 360) + "px";

        return C * (270 / 360) * progress + "px";
      },
    };

    this.#container.style.setProperty(
      "--ea-progress-percentage",
      strategies[this.type]()
    );

    this.#updateStatusText();

    if (percentageSlot) {
      percentageSlot.textContent = this.percentage;
    }

    this.#handleColorChange(this.color, newVal);

    this.emit("change", {
      detail: {
        percentage: newVal,
      },
    });
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

if (!window.customElements.get("ea-progress")) {
  window.customElements.define("ea-progress", EaProgress);
}
