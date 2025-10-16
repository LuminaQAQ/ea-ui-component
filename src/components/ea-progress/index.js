import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";

export class EaProgress extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #track;
  /** @type {HTMLElement} */
  #path;
  /** @type {HTMLElement} */
  #text;

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "percentage",
      "status",
      "stroke-width",
      "text-inside",
      "color",
    ];
  }

  state = this.properties({
    percentage: {
      type: Number,
      default: 0,
      observer: (newVal) => {
        if (newVal < 0) return (this.percentage = 0);
        else if (newVal > 100) return (this.percentage = 100);

        const strategies = {
          line: () => newVal + "%",
          circle: () => (302 * (100 - newVal)) / 100 + "px",
          dashboard: () => (152 * (100 - newVal)) / 100 + 100 + "px",
        };

        const statusIcon = {
          success: "icon-ok-circled",
          warning: "icon-attention-circled",
          exception: "icon-cancel-circled",
        };

        this.#container.style.setProperty(
          "--ea-progress-percentage",
          strategies[this.type]()
        );

        // TODO: 兼容其他type和status
        if (
          ["success", "exception", "warning"].includes(this.status) &&
          !this["text-inside"]
        ) {
          this.#text.innerHTML = `<ea-icon class="ea-progress__status" icon="${
            statusIcon[this.status]
          }" part="status-icon"></ea-icon>`;
        } else {
          this.#text.textContent = strategies[this.type]();
        }
      },
    },
    type: {
      type: ["line", "circle", "dashboard"],
      default: "line",
      observer: (newVal) => {},
    },
    status: {
      type: ["success", "exception", "warning"],
      default: "",
      observer: (newVal) => {
        this.updateContainerClasslist();
      },
    },
    "stroke-width": {
      type: String,
      default: "8px",
      observer: (newVal) => {
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
      observer: (newVal) => {
        try {
          if (newVal) this.#path.appendChild(this.#text);
        } catch (error) {}

        this.updateContainerClasslist();
      },
    },
    color: {
      type: {
        Array: () => Array.isArray(this.color),
        String: () => typeof this.color === "string",
      },
      default: [],
      observer: (newVal) => {
        console.log(
          JSON.parse([
            { color: "#f56c6c", percentage: 20 },
            { color: "#e6a23c", percentage: 40 },
            { color: "#5cb87a", percentage: 60 },
            { color: "#1989fa", percentage: 80 },
            { color: "#6f7ad3", percentage: 100 },
          ])
        );
      },
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist("ea-progress", {
      ["--" + this.status]: this.status,
      ["--text-inside"]: this["text-inside"],
    });

    this.#container.className = className;

    return className;
  }

  constructor() {
    super();

    this.stylesheet = stylesheet;

    this.$render();
  }

  $render() {
    this.shadowRoot.innerHTML = `
      <div class='ea-progress' part='container'>
        <section class="ea-progress__track" part="track">
            <section class="ea-progress__path" part="path"></section>
        </section>
        <section class="ea-progress__percentage" part="percentage"></section>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-progress");
    this.#track = this.shadowRoot.querySelector(".ea-progress__track");
    this.#path = this.shadowRoot.querySelector(".ea-progress__path");
    this.#text = this.shadowRoot.querySelector(".ea-progress__percentage");
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

if (!window.customElements.get("ea-progress")) {
  window.customElements.define("ea-progress", EaProgress);
}
