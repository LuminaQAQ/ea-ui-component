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
    return [...super.observedAttributes, "type", "title", "sub-title", "icon"];
  }

  state = this.properties({
    type: {
      type: ["primary", "success", "warning", "info", "error"],
      default: "",
      observer: newVal => {
        this.#icon.setAttribute("name", typesIcon[newVal]);
        this.updateContainerClasslist();
      },
    },
    title: {
      type: String,
      default: "",
      observer: newVal => {
        this.#title.textContent = newVal;
      },
    },
    "sub-title": {
      type: String,
      default: "",
      observer: newVal => {
        this.#subTitle.textContent = newVal;
      },
    },
    icon: {
      type: String,
      default: "",
      observer: newVal => {
        if (newVal) this.#icon.setAttribute("name", newVal);
        else this.#icon.setAttribute("name", typesIcon[this.type]);
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
        <div class="ea-result__icon ea-result__icon-wrap" part="icon-wrap">
          <slot name="icon">
            <ea-icon class="ea-result__icon ea-result__default-icon" part="icon"></ea-icon>
          </slot>
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
    this.#icon = this.shadowRoot.querySelector(".ea-result__default-icon");
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
