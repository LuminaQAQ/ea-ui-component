import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";

export class EaSteps extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLSlotElement} */
  #defaultSlot;

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
      observer: newVal => {
        this.style.setProperty("--ea-step-tail-spacing", newVal);
      },
    },
    //   TODO: 没写😋
    // direction: {
    //   type: ["vertical", "horizontal"],
    //   default: "horizontal",
    //   observer: (newVal) => {
    //     this.updateContainerClasslist();
    //   },
    // },
    active: {
      type: Number,
      default: 0,
      observer: newVal => {
        this.#updateStepStatus(newVal);
      },
    },
    "process-status": {
      type: ["wait", "process", "finish", "error", "success"],
      default: "process",
      observer: () => {},
    },
    "finish-status": {
      type: ["wait", "process", "finish", "error", "success"],
      default: "finish",
      observer: () => {},
    },
    "align-center": {
      type: Boolean,
      default: false,
      observer: () => {},
    },
    simple: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.#updateSimpleStatus(newVal);
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
      "ea-steps",
      {
        // ["--" + this.direction]: this.direction,
      },
      {
        simple: this.simple,
        "align-center": this["align-center"],
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
      <div class='ea-steps' part='container'>
        <slot></slot>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-steps");
    this.#defaultSlot = this.shadowRoot.querySelector("slot");
  }

  /**
   * 更新步骤状态
   * @param {number} active
   */
  #updateStepStatus = active => {
    /** @type {HTMLElement[]} */
    const stepItems = [...this.querySelectorAll("ea-step")];

    stepItems.forEach(item => {
      if (item.index < active) {
        item.setAttribute("status", this["finish-status"]);
      } else if (item.index > active) {
        item.setAttribute("status", "wait");
      } else {
        item.setAttribute("status", this["process-status"]);
      }
    });
  };

  /**
   * 更新简单步骤状态
   * @param {boolean} isSimple
   */
  #updateSimpleStatus = (isSimple = this.simple) => {
    /** @type {HTMLElement[]} */
    const steps = [...this.querySelectorAll("ea-step")];
    if (isSimple) {
      steps.forEach(item => {
        try {
          item.querySelector('[slot="simple-arrow"]')?.remove();
        } catch {
          /* empty */
        }

        try {
          const arrow = document.createElement("ea-icon");
          arrow.setAttribute("slot", "simple-arrow");
          arrow.setAttribute("icon", "icon-angle-right");
          arrow.part = "simple-arrow";
          item.appendChild(arrow);
        } catch {
          /* empty */
        }
      });
    } else {
      steps.forEach(item => {
        try {
          item.querySelector('[slot="simple-arrow"]')?.remove();
        } catch {
          /* empty */
        }
      });
    }
  };

  /**
   * 处理 slot 变化
   * 更新所有子 ea-step 组件的 index、first、last 状态和 status
   */
  #handleSlotChange = () => {
    /** @type {HTMLElement[]} */
    const steps = [...this.querySelectorAll("ea-step")];

    steps.forEach((step, index) => {
      step.index = index;
      step.toggleAttribute("first", index === 0);
      step.toggleAttribute("last", index === steps.length - 1);
    });

    this.#updateStepStatus(this.active);

    this.#updateSimpleStatus();
  };

  connectedCallback() {
    super.connectedCallback();

    this.#abortController?.abort();
    this.#abortController = new AbortController();

    this.#defaultSlot.addEventListener(
      "slotchange",
      () => {
        this.#handleSlotChange();
      },
      { signal: this.#abortController.signal }
    );
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
  }
}

if (!window.customElements.get("ea-steps")) {
  window.customElements.define("ea-steps", EaSteps);
}
