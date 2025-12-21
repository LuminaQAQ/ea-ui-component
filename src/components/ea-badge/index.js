import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";
import EaUtils from "@/utils/Utils";

export class EaBadge extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #content;

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "value",
      "max",
      "is-dot",
      "data-hidden",
      "type",
      "show-zero",
      "color",
      "offset-x",
      "offset-y",
    ];
  }

  state = this.properties({
    value: {
      type: String,
      default: "",
      observer: (newVal) => {
        if (this["is-dot"]) return;

        const contentTextEl = this.shadowRoot.querySelector("[data-value]");
        const contentSlot = this.querySelector("[slot='content']");
        /**
         * 返回实际 value 值
         * @returns {string | number}
         */
        const computedValue = () => {
          if (!this["show-zero"] && Number(newVal) === 0) {
            this.#container.className = this.updateContainerClasslist();
            return "";
          }

          return EaUtils.Number.isNumber(newVal) && newVal > this.max
            ? `${this.max}+`
            : newVal;
        };

        if (contentTextEl) {
          contentTextEl.textContent = computedValue();
        } else if (contentSlot) {
          const template = document.createElement("template");
          const valueEl = contentSlot.querySelector("[data-value]");

          if (valueEl) {
            template.innerHTML = contentSlot.innerHTML;

            const templateValueEl =
              template.content.querySelector("[data-value]");
            templateValueEl.innerText = computedValue();
          }
          this.#content.innerHTML = template.innerHTML;
        } else {
          this.#content.textContent = computedValue();
        }
      },
    },
    max: {
      type: Number,
      default: Infinity,
      observer: (newVal) => {},
    },
    type: {
      type: ["primary", "success", "warning", "danger", "info"],
      default: "danger",
      observer: (newVal) => {
        this.#container.className = this.updateContainerClasslist();
      },
    },
    color: {
      type: String,
      default: "",
      observer: (newVal) => {
        this.style.setProperty(`--ea-badge-color`, newVal);
      },
    },
    "is-dot": {
      type: Boolean,
      default: false,
      observer: (newVal) => {
        this.#container.className = this.updateContainerClasslist();
      },
    },
    "data-hidden": {
      type: Boolean,
      default: false,
      observer: (newVal) => {
        this.#content.ariaHidden = newVal;
        this.#content.hidden = newVal;
        this.#container.className = this.updateContainerClasslist();
      },
    },
    "offset-x": {
      type: Number,
      default: 0,
      observer: (newVal) => {
        this.style.setProperty("--ea-badge-offset-x", -newVal + "px");
      },
    },
    "offset-y": {
      type: Number,
      default: 0,
      observer: (newVal) => {
        this.style.setProperty("--ea-badge-offset-y", newVal + "px");
      },
    },
    "show-zero": {
      type: Boolean,
      default: true,
      observer: (newVal) => {
        this.#container.className = this.updateContainerClasslist();
      },
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    return this.computedClasslist(
      "ea-badge",
      {
        ["--" + this.type]: this.type,
      },
      {
        dot: this["is-dot"],
        hidden:
          this["data-hidden"] ||
          (!this["show-zero"] && Number(this.value) === 0),
      }
    );
  }

  constructor() {
    super();

    this.stylesheet = stylesheet;

    this.$render();
  }

  $render() {
    this.shadowRoot.innerHTML = `
      <div class='ea-badge' part='container'>
        <sup class="ea-badge__content" part='content'></sup>
        <slot></slot>
      </div>
        `;

    this.#container = this.shadowRoot.querySelector(".ea-badge");
    this.#content = this.shadowRoot.querySelector(".ea-badge__content");
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

if (!window.customElements.get("ea-badge")) {
  window.customElements.define("ea-badge", EaBadge);
}
