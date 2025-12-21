import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";
import { typesIcon } from "@/utils/Variables";

export class EaResult extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #icon;
  /** @type {HTMLElement} */
  #title;
  /** @type {HTMLElement} */
  #subTitle;
  /** @type {HTMLElement} */
  #extra;

  static get observedAttributes() {
    return [...super.observedAttributes, "type", "title", "sub-title"];
  }

  state = this.properties({
    type: {
      type: ["primary", "success", "warning", "info", "error"],
      default: "",
      observer: (newVal) => {
        this.updateContainerClasslist();
        this.#icon.innerHTML = `<ea-icon class="ea-result__icon" icon="icon-${typesIcon[newVal]}" part="icon"></ea-icon>`;
      },
    },
    title: {
      type: String,
      default: "",
      observer: (newVal) => {
        this.#title.textContent = newVal;
      },
    },
    "sub-title": {
      type: String,
      default: "",
      observer: (newVal) => {
        this.#subTitle.textContent = newVal;
      },
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist("ea-result", {
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
    this.shadowRoot.innerHTML = `
      <div class='ea-result' part='container'>
        <div class="ea-result__icon" part="icon">
          <slot name="icon"></slot>
        </div>
        <div class="ea-result__title" part="title">
          <slot name="title"></slot>
        </div>
        <div class="ea-result__sub-title" part="sub-title">
          <slot name="sub-title"></slot>
        </div>
        <div class="ea-result__extra" part="extra">
          <slot name="extra"></slot>
        </div>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-result");
    this.#icon = this.shadowRoot.querySelector(".ea-result__icon slot");
    this.#title = this.shadowRoot.querySelector(".ea-result__title slot");
    this.#subTitle = this.shadowRoot.querySelector(
      ".ea-result__sub-title slot"
    );
    this.#extra = this.shadowRoot.querySelector(".ea-result__extra slot");
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

if (!window.customElements.get("ea-result")) {
  window.customElements.define("ea-result", EaResult);
}
