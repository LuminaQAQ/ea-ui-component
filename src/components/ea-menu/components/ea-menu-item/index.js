import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";

export class EaMenuItem extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {AbortController} */
  #abortController = new AbortController();

  static get observedAttributes() {
    return [...super.observedAttributes, "index", "disabled", "active"];
  }

  state = this.properties({
    index: {
      type: String,
      default: "",
      observer: (newVal) => {},
    },
    disabled: {
      type: Boolean,
      default: false,
      observer: (newVal) => {
        // this.#container.classList.toggle("is-disabled", newVal);
        this.updateContainerClasslist();
      },
    },
    active: {
      type: Boolean,
      default: false,
      observer: (newVal) => {
        // this.#container.classList.toggle("is-active", newVal);
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
      "ea-menu-item",
      {
        // ['--' + this.type]: this.type,
      },
      {
        disabled: this.disabled,
        active: this.active,
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
      <li class='ea-menu-item' role="menuitem" part='container'>
        <slot></slot>
      </li>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-menu-item");
  }

  connectedCallback() {
    super.connectedCallback();
  }

  $beforeUnmounted() {
    this.#abortController.abort();
  }
}

if (!window.customElements.get("ea-menu-item")) {
  window.customElements.define("ea-menu-item", EaMenuItem);
}
