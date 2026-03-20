import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";

export class EaStep extends Base {
  /** @type {HTMLElement} */
  get #hostContextSteps() {
    try {
      return this.closest("ea-steps");
    } catch {
      return null;
    }
  }

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
      observer: newVal => {
        this.#titleSlot.textContent = newVal;
      },
    },
    description: {
      type: String,
      default: "",
      observer: newVal => {
        this.#descriptionSlot.textContent = newVal;
      },
    },
    icon: {
      type: String,
      default: "",
      observer: newVal => {
        this.#stepIcon.setAttribute("name", newVal);
      },
    },
    status: {
      type: ["", "wait", "process", "finish", "error", "success"],
      default: "",
      observer: newVal => {
        this.updateContainerClasslist();
        if (this.icon) return;

        this.#updateStatus(newVal);
      },
    },
    index: {
      type: Number,
      default: () => {
        const list = this.#hostContextSteps?.querySelectorAll("ea-step");
        return list ? Array.from(list).indexOf(this) : 0;
      },
      observer: () => {},
    },
    simple: {
      type: Boolean,
      default: () => !!this.#hostContextSteps?.hasAttribute("simple"),
      observer: () => {},
    },
    "align-center": {
      type: Boolean,
      default: () => !!this.#hostContextSteps?.hasAttribute("align-center"),
      observer: () => {
        this.updateContainerClasslist();
      },
    },
    direction: {
      type: ["vertical", "horizontal"],
      default: () =>
        this.#hostContextSteps?.getAttribute("direction") || "horizontal",
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
      "ea-step",
      {
        ["--" + this.direction]: this.direction,
      },
      {
        [this.status]: this.status,
        "align-center": this["align-center"],
        icon: this.icon,
        simple: this.simple,
        last: (() => {
          const list = this.#hostContextSteps?.querySelectorAll("ea-step");
          return list ? list.length - 1 === this.index : false;
        })(),
        first: this.index === 0,
      }
    );

    if (this.#container) this.#container.className = className;

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
              <ea-icon class="ea-step__icon" part="icon"></ea-icon>
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
        <span class="ea-step__simple-arrow" part="simple-arrow">
          <slot name="simple-arrow"></slot>
        </span>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-step");
    this.#iconSlot = this.shadowRoot.querySelector('slot[name="icon"]');
    this.#stepIcon = this.shadowRoot.querySelector(".ea-step__icon");
    this.#titleSlot = this.shadowRoot.querySelector('slot[name="title"]');
    this.#descriptionSlot = this.shadowRoot.querySelector(
      'slot[name="description"]'
    );

    this.updateContainerClasslist();
  }

  /**
   * 更新步骤状态
   * @param {string} status 活动步骤状态
   */
  #updateStatus = (status = this.status) => {
    if (status === this.#hostContextSteps?.getAttribute("finish-status")) {
      this.#stepIcon.setAttribute("name", "check");
      this.#stepIcon.textContent = "";
    } else {
      this.#stepIcon.setAttribute("name", "");
      this.#stepIcon.textContent = this.index + 1;
    }
  };

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
