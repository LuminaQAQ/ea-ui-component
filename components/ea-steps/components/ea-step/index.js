import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";

export class EaStep extends Base {
  /** @type {HTMLElement} */
  #hostContextSteps = this.closest("ea-steps");

  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #iconSlot;
  /** @type {HTMLElement} */
  #stepIcon;
  /** @type {HTMLElement} */
  #titleSlot;
  /** @type {HTMLElement} */
  #descriptionSlot;

  /** @type {AbortController} */
  #abortController = new AbortController();

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "title",
      "description",
      "icon",
      "status",
      "index",
      "active",
    ];
  }

  state = this.properties({
    title: {
      type: String,
      default: "",
      observer: (newVal) => {
        this.#titleSlot.textContent = newVal;
      },
    },
    description: {
      type: String,
      default: "",
      observer: (newVal) => {
        this.#descriptionSlot.textContent = newVal;
      },
    },
    icon: {
      type: String,
      default: "",
      observer: (newVal) => {},
    },
    status: {
      type: ["", "wait", "process", "finish", "error", "success"],
      default: "",
      observer: (newVal) => {
        this.updateContainerClasslist();
        if (newVal === this.#hostContextSteps.getAttribute("finish-status")) {
          this.#stepIcon.setAttribute("icon", "icon-ok");
          this.#stepIcon.textContent = "";
        } else {
          this.#stepIcon.setAttribute("icon", "");
          this.#stepIcon.textContent = this.index + 1;
        }
      },
    },
    index: {
      type: Number,
      default: () =>
        Array.from(this.#hostContextSteps.querySelectorAll("ea-step")).indexOf(
          this
        ),
      observer: (newVal) => {},
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist(
      "ea-step",
      {
        // ["--" + ]: this.status,
      },
      {
        [this.status]: this.status,
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
    this.shadowRoot.innerHTML = `
      <div class='ea-step' part='container'>
        <section class="ea-step__head" part="head">
          <div class="ea-step__icon-wrapper" part="icon-wrapper">
            <slot name="icon">
              <ea-icon class="ea-step__icon" part="icon">${
                this.index + 1
              }</ea-icon>
            </slot>
          </div>
          <div class="ea-step__tail" part="tail"></div>
        </section>
        <section class="ea-step__main" part="main">
          <div class="ea-step__title" part="title">
            <slot name="title"></slot>
          </div>
          <div class="ea-step__description" part="description">
            <slot name="description"></slot>
          </div>
        </section>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-step");
    this.#iconSlot = this.shadowRoot.querySelector('slot[name="icon"]');
    this.#stepIcon = this.shadowRoot.querySelector(".ea-step__icon");
    this.#titleSlot = this.shadowRoot.querySelector('slot[name="title"]');
    this.#descriptionSlot = this.shadowRoot.querySelector(
      'slot[name="description"]'
    );
  }

  connectedCallback() {
    super.connectedCallback();
  }

  $beforeUnmounted() {
    this.#abortController.abort();
  }
}

if (!window.customElements.get("ea-step")) {
  window.customElements.define("ea-step", EaStep);
}
