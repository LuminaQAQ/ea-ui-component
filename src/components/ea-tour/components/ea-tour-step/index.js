import Base from "@components/Base.js";
import { EaButton } from "@/components/ea-button";

import stylesheet from "./index.scss?inline";
import EaUtils from "@/utils/Utils";

export class EaTourStep extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #title;
  /** @type {EaButton} */
  #previousBtn;
  /** @type {EaButton} */
  #nextBtn;
  /** @type {EaButton} */
  #finishBtn;
  /** @type {EaButton} */
  #closeIcon;

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "title",
      "target",
      "type",
      "placement",
    ];
  }

  state = this.properties({
    title: {
      type: String,
      default: "",
      observer: (newVal) => {
        this.#title.textContent = newVal;
      },
    },
    target: {
      type: String,
      default: "",
      observer: (newVal) => {
        if (newVal === "") return;

        if (!document.querySelector(newVal))
          return console.warn(
            `[EaTour] target ${targetSelector} not a valid element selector.`,
            this
          );
      },
    },
    type: {
      type: ["default", "primary"],
      default: "default",
      observer: (newVal) => {
        this.updateContainerClasslist();
      },
    },
    placement: {
      type: [
        "top",
        "top-start",
        "top-end",
        "bottom",
        "bottom-start",
        "bottom-end",
        "left",
        "left-start",
        "left-end",
        "right",
        "right-start",
        "right-end",
      ],
      default: "bottom",
      observer: (newVal) => {},
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist("ea-tour-step", {
      ["--" + this.type]: this.type,
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
    const parent = this.closest("ea-tour");
    /** @type {HTMLElement[]} */
    const tourItems = [...parent.querySelectorAll("ea-tour-step")];

    this.shadowRoot.innerHTML = `
      <div class='ea-tour-step' part='container'>
        <header class='ea-tour-step__header' part='header'>
          <slot name='header'></slot>
          <ea-icon class='ea-tour-step__close-icon' part='close-icon' icon="icon-cancel"></ea-icon>
        </header>
        <main class='ea-tour-step__content' part='content'>
          <slot></slot>
        </main>
        <footer class='ea-tour-step__footer' part='footer'>
          <div class='ea-tour-step__indicator-group' part='indicator-group'>
            <slot name='indicator'>
              ${tourItems
                .map((item) =>
                  EaUtils.EaElement.h("span", null, {
                    class: [
                      "ea-tour-step__indicator",
                      item === this ? "is-active" : "",
                    ],
                    part: "indicator",
                  })
                )
                .join("")}
            </slot>
          </div>
          <div class='ea-tour-step__switch-group' part='switch-group'>
            <slot name='footer'>
              <ea-button class="ea-tour-step__btn ea-tour-step__previous" ${
                this.type === "primary" ? `type="primary"` : ""
              } part="previous">Previous</ea-button>
              <ea-button class="ea-tour-step__btn ea-tour-step__next" ${
                this.type === "primary" ? "" : `type="primary"`
              } part="next">Next</ea-button>
              <ea-button class="ea-tour-step__btn ea-tour-step__finish" ${
                this.type === "primary" ? "" : `type="primary"`
              } part="finish">Finish</ea-button>
            </slot>
          </div>
        </footer>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-tour-step");
    this.#title = this.shadowRoot.querySelector(".ea-tour-step__header slot");
    this.#nextBtn = this.shadowRoot.querySelector(".ea-tour-step__next");
    this.#previousBtn = this.shadowRoot.querySelector(
      ".ea-tour-step__previous"
    );
    this.#finishBtn = this.shadowRoot.querySelector(".ea-tour-step__finish");
    this.#closeIcon = this.shadowRoot.querySelector(
      ".ea-tour-step__close-icon"
    );

    this.#closeIcon.addEventListener("click", () => {
      this.emit("close", { bubbles: true });
    });

    this.#nextBtn.addEventListener("click", () => {
      this.emit("next", { bubbles: true });
    });
    this.#previousBtn.addEventListener("click", () => {
      this.emit("previous", { bubbles: true });
    });
    this.#finishBtn.addEventListener("click", () => {
      this.emit("finish", { bubbles: true });
    });
  }

  connectedCallback() {
    super.connectedCallback();

    this.emit("ea-tour-step-ready");
  }
}

if (!window.customElements.get("ea-tour-step")) {
  window.customElements.define("ea-tour-step", EaTourStep);
}
