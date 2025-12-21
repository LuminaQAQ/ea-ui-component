import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";
import { emptyStatusSVG } from "./assets/emptyStatusSVG";

export class EaEmpty extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #placeholder;
  /** @type {HTMLElement} */
  #description;
  /** @type {HTMLElement} */
  #bottom;

  static get observedAttributes() {
    return [...super.observedAttributes, "image", "image-size", "description"];
  }

  state = this.properties({
    image: {
      type: String,
      default: "",
      observer: (newVal) => {
        this.#placeholder.innerHTML = `<img class="ea-empty__image" src="${newVal}" alt="empty image" part="image" />`;
      },
    },
    "image-size": {
      type: String,
      default: "",
      observer: (newVal) => {
        if (!CSS.supports("--ea-empty-size", newVal))
          return console.warn(
            `[ea-empty] The size value ${newVal} is not supported.`
          );

        this.style.setProperty("--ea-empty-size", newVal);
      },
    },
    description: {
      type: String,
      default: "",
      observer: (newVal) => {
        this.#description.textContent = newVal;
      },
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    return this.computedClasslist("ea-empty", {
      // ['--' + this.type]: this.type,
    });
  }

  constructor() {
    super();

    this.stylesheet = stylesheet;

    this.$render();
  }

  $render() {
    this.shadowRoot.innerHTML = `
      <div class='ea-empty' part='container'>
        <div class="ea-empty__placeholder" part="placeholder">
            <slot name="image">
                <section class="ea-empty__default">${emptyStatusSVG}</section>
            </slot>
        </div>
        <div class="ea-empty__description" part="description">
            <slot name="description">No Data</slot>
        </div>
        <div class="ea-empty__bottom" part="bottom">
            <slot></slot>
        </div>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-empty");
    this.#placeholder = this.shadowRoot.querySelector(".ea-empty__placeholder");
    this.#description = this.shadowRoot.querySelector(".ea-empty__description");
    this.#bottom = this.shadowRoot.querySelector(".ea-empty__bottom");
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

if (!window.customElements.get("ea-empty")) {
  window.customElements.define("ea-empty", EaEmpty);
}
