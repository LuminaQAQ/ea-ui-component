import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";

export class EaCard extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #header;
  /** @type {HTMLElement} */
  #footer;

  static get observedAttributes() {
    return [...super.observedAttributes, "shadow", "header", "footer"];
  }

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
    const className = this.computedClasslist("ea-card", {
      [`--${this.shadow}-shadow`]: this.shadow,
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
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

if (!window.customElements.get("ea-card")) {
  window.customElements.define("ea-card", EaCard);
}
