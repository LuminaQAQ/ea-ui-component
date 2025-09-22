import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";

export class EaCarouselItem extends Base {
  /** @type {HTMLElement} */
  #container;

  static get observedAttributes() {
    return [...super.observedAttributes];
  }

  state = this.properties({
    type: {
      //   type: ,
      default: "",
      observer: (newVal) => {},
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    return this.computedClasslist("ea-carousel-item", {
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
      <div class='ea-carousel-item' part='container'>
        <slot></slot>
      </div>
        `;

    this.#container = this.shadowRoot.querySelector(".ea-carousel-item");
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

if (!window.customElements.get("ea-carousel-item")) {
  window.customElements.define("ea-carousel-item", EaCarouselItem);
}
