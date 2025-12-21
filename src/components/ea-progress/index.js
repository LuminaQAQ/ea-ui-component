import Base from "@components/Base.js";
import { circleItem } from "./components/circleItem";
import { dashboardItem } from "./components/dashboardItem";

import EaUtils from "@/utils/Utils";

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
      "indeterminate",
      "duration",
      "striped",
      "striped-flow",
      "width",
      "show-text",
    ];
  }

  state = this.properties({
    percentage: {
      type: Number,
      default: 0,
      observer: (newVal) => {
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

        const statusIcon = {
          success: "icon-ok-circled",
          warning: "icon-attention-circled",
          exception: "icon-cancel-circled",
        };

        this.#container.style.setProperty(
          "--ea-progress-percentage",
          strategies[this.type]()
        );

        if (
          ["success", "exception", "warning"].includes(this.status) &&
          !this["text-inside"]
        ) {
          this.#text.innerHTML = `<ea-icon class="ea-progress__status" icon="${
            statusIcon[this.status]
          }" part="status-icon"></ea-icon>`;
        } else {
          this.#text.textContent = newVal + "%";
        }

        if (percentageSlot) {
          percentageSlot.textContent = this.percentage;
        }

        if (Array.isArray(this.color)) {
          let nearItem = newVal;

          for (let i = 0; i < this.color.length; i++) {
            const item = this.color[i];

            if (newVal <= item.percentage) {
              nearItem = item;

              break;
            }
          }

          this.#path.style.setProperty(
            "--ea-progress-path-color",
            nearItem.color
          );
        } else if (typeof this.color === "string") {
          this.#path.style.setProperty("--ea-progress-path-color", this.color);
        }

        this.emit("change", {
          detail: {
            percentage: newVal,
          },
        });
      },
    },
    type: {
      type: ["line", "circle", "dashboard"],
      default: "line",
      observer: (newVal) => {
        this.updateContainerClasslist();
      },
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
        Array: () =>
          Array.isArray(EaUtils.JSON.parse(this.getAttrString("color"), true)),
        String: () => typeof this.getAttrString("color") === "string",
      },
      default: "",
      observer: (newVal) => {},
    },
    indeterminate: {
      type: Boolean,
      default: false,
      observer: (newVal) => {},
    },
    duration: {
      type: Number,
      default: 3,
      observer: (newVal) => {
        this.#container.style.setProperty(
          "--ea-progress-animation-duration",
          `${newVal}s`
        );
      },
    },
    striped: {
      type: Boolean,
      default: false,
      observer: (newVal) => {
        this.updateContainerClasslist();
      },
    },
    "striped-flow": {
      type: Boolean,
      default: false,
      observer: (newVal) => {
        this.updateContainerClasslist();
      },
    },
    size: {
      type: String,
      default: "126px",
      observer: (newVal) => {
        if (this.type === "line") return;

        this.#container.style.setProperty("--ea-progress-size", newVal);
      },
    },
    "show-text": {
      type: Boolean,
      default: true,
      observer: (newVal) => {
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
        indeterminate:
          this.indeterminate && this.type === "line" && !this["striped-flow"],
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

  async $render() {
    const itemOptions = {
      line: `
        <div class='ea-progress' part='container'>
          <section class="ea-progress__track" part="track">
              <section class="ea-progress__path" part="path"></section>
          </section>
          <section class="ea-progress__percentage" part="percentage">
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
    this.#text = this.shadowRoot.querySelector(".ea-progress__percentage slot");

    this.updateContainerClasslist();
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

if (!window.customElements.get("ea-progress")) {
  window.customElements.define("ea-progress", EaProgress);
}
