import Base from "../Base.js";

import stylesheet from "./index.scss?inline";

export class EaLink extends Base {
  static get observedAttributes() {
    return ["type", "disabled", "underline", "href", "icon"];
  }

  /** @type {HTMLAnchorElement} */
  #container;
  /** @type {HTMLElement} */
  #icon;

  /**
   * @typedef {Object} LinkState
   * @property {string} type
   * @property {Boolean} disabled
   * @property {Boolean} underline
   * @property {string} href
   * @property {string} icon
   */

  /** @type {LinkState} */
  state = this.properties({
    type: {
      type: ["normal", "primary", "success", "info", "warning", "danger"],
      default: "normal",
      observer: newVal => {
        this.#container.className = this.updateContainerClasslist();
      },
    },
    disabled: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.#container.className = this.updateContainerClasslist();
      },
    },
    underline: {
      type: ["always", "hover", "never"],
      default: "",
      observer: newVal => {
        this.#container.className = this.updateContainerClasslist();
      },
    },
    href: {
      type: String,
      default: "",
      observer: newVal => {
        this.#container.href = newVal;
      },
    },
    icon: {
      type: String,
      default: "",
      observer: newVal => {
        this.#icon.setAttribute("name", newVal);
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
      "ea-link",
      {
        ["--" + this.type]: this.type,
        ["--underline-" + this.underline]: this.underline,
        "--disabled": this.disabled,
      },
      { icon: this.icon?.length }
    );
  }

  constructor() {
    super();

    this.stylesheet = stylesheet;

    this.$render();
  }

  $render() {
    this.shadowRoot.innerHTML = `
      <a class="ea-link" part="container" tabindex="-1">
        <ea-icon class="ea-link__icon" part="icon"></ea-icon>
        <slot></slot>
      </a>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-link");
    this.#icon = this.shadowRoot.querySelector(".ea-link__icon");
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

if (!window.customElements.get("ea-link")) {
  window.customElements.define("ea-link", EaLink);
}
