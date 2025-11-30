import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";

export class EaSteps extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {AbortController} */
  #abortController = new AbortController();

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "space",
      "direction",
      "active",
      "process-status",
      "finish-status",
      "align-center",
      "simple",
    ];
  }

  state = this.properties({
    space: {
      type: String,
      default: "50%",
      observer: (newVal) => {},
    },
    direction: {
      type: ["vertical", "horizontal"],
      default: "horizontal",
      observer: (newVal) => {},
    },
    active: {
      type: Number,
      default: 0,
      observer: (newVal) => {
        this.#updateStepStatus(newVal);
      },
    },
    "process-status": {
      type: ["wait", "process", "finish", "error", "success"],
      default: "process",
      observer: (newVal) => {},
    },
    "finish-status": {
      type: ["wait", "process", "finish", "error", "success"],
      default: "finish",
      observer: (newVal) => {},
    },
    "align-center": {
      type: Boolean,
      default: false,
      observer: (newVal) => {},
    },
    simple: {
      type: Boolean,
      default: false,
      observer: (newVal) => {},
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist("ea-steps", {
      // ['--' + this.type]: this.type,
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
      <div class='ea-steps' part='container'>
        <slot></slot>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-steps");
  }

  /**
   * 更新步骤状态
   * @param {number} active
   */
  #updateStepStatus = (active) => {
    /** @type {HTMLElement[]} */
    const stepItems = [...this.querySelectorAll("ea-step")];

    stepItems.forEach((item) => {
      if (item.index < active) {
        item.setAttribute("status", this["finish-status"]);
      } else if (item.index > active) {
        item.setAttribute("status", "wait");
      } else {
        item.setAttribute("status", this["process-status"]);
      }
    });
  };

  connectedCallback() {
    super.connectedCallback();
  }

  $beforeUnmounted() {
    this.#abortController.abort();
  }
}

if (!window.customElements.get("ea-steps")) {
  window.customElements.define("ea-steps", EaSteps);
}
