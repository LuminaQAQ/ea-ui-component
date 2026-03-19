import Base from "../../../Base.js";

import stylesheet from "./index.scss?inline";

export class EaContainer extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {SlotElement} */
  #defaultSlot;

  /** @type {AbortController} */
  #abortController;

  static get observedAttributes() {
    return [...super.observedAttributes, "direction"];
  }

  /**
   * @typedef {Object} State
   * @property {string} direction 排列方向
   */
  /** @type {State} */
  state = this.properties({
    direction: {
      type: ["horizontal", "vertical"],
      default: "horizontal",
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
    const className = this.computedClasslist("ea-container", {
      [`--${this.direction}`]: this.direction,
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
        <div class="ea-container" part="container">
            <slot></slot>
        </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-container");
    this.#defaultSlot = this.shadowRoot.querySelector("slot");
  }

  /**
   * 处理槽位变化事件
   */
  #onSlotChange = () => {
    const children = [...this.querySelectorAll("& > *")].map(item =>
      item.tagName.toLowerCase()
    );

    if (this.hasAttribute("direction")) return;

    if (children.includes("ea-header") || children.includes("ea-footer")) {
      this.direction = "vertical";
    } else {
      this.direction = "horizontal";
    }
  };

  connectedCallback() {
    super.connectedCallback();

    this.#abortController?.abort();
    this.#abortController = new AbortController();

    this.#defaultSlot.addEventListener("slotchange", this.#onSlotChange, {
      signal: this.#abortController.signal,
    });
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
  }
}

if (!customElements.get("ea-container")) {
  customElements.define("ea-container", EaContainer);
}
