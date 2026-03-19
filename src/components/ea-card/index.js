import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";

export class EaCard extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #header;
  /** @type {HTMLElement} */
  #footer;

  /** @type {AbortController} */
  #abortController = null;

  static get observedAttributes() {
    return [...super.observedAttributes, "shadow", "header", "footer"];
  }

  #states = {
    isHeaderEmpty: true,
    isFooterEmpty: true,
  };

  state = this.properties({
    shadow: {
      type: ["always", "never", "hover"],
      default: "always",
      observer: () => {
        this.updateContainerClasslist();
      },
    },
    header: {
      type: String,
      default: "",
      observer: newVal => {
        this.#header.innerText = newVal;
      },
    },
    footer: {
      type: String,
      default: "",
      observer: newVal => {
        this.#footer.innerText = newVal;
      },
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist(
      "ea-card",
      {
        [`--${this.shadow}-shadow`]: this.shadow,
      },
      // 因为在 vue 下，某些场景会出现 css 的 ::slotted 选择器无效，因此这里使用 js 来更新空状态
      {
        "header-empty": this.#states.isHeaderEmpty,
        "footer-empty": this.#states.isFooterEmpty,
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
      <div class="ea-card" part="container">
        <div class="ea-card__header" part="header">
          <slot name="header"></slot>
        </div>
        <div class="ea-card__content" part="content">
          <slot></slot>
        </div>
        <div class="ea-card__footer" part="footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-card");
    this.#header = this.shadowRoot.querySelector(
      ".ea-card__header > slot[name='header']"
    );
    this.#footer = this.shadowRoot.querySelector(
      ".ea-card__footer > slot[name='footer']"
    );

    this.updateContainerClasslist();
  }

  /**
   * 更新空状态
   * @param {Event} e 事件
   */
  #updateEmptyStatus = e => {
    /** @type {HTMLSlotElement} */
    const target = e.target;
    let name = target.getAttribute("name") || "";
    name = name
      .split("")
      .map((item, index) =>
        index === 0 ? item.toUpperCase() : item.toLowerCase()
      )
      .join("");

    const isEmpty = target.assignedElements().length === 0;
    this.#states[`is${name}Empty`] = isEmpty;

    this.updateContainerClasslist();
  };

  connectedCallback() {
    super.connectedCallback();

    this.#abortController?.abort();
    this.#abortController = new AbortController();

    this.#header.addEventListener("slotchange", this.#updateEmptyStatus, {
      signal: this.#abortController.signal,
    });

    this.#footer.addEventListener("slotchange", this.#updateEmptyStatus, {
      signal: this.#abortController.signal,
    });
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
  }
}

if (!window.customElements.get("ea-card")) {
  window.customElements.define("ea-card", EaCard);
}
