import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";

export class EaImagePreview extends Base {
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
    return this.computedClasslist("ea-image-preview", {
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
      <div class='ea-image-preview' part='container'>
        <slot></slot>
      </div>
        `;

    this.#container = this.shadowRoot.querySelector(".ea-image-preview");
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

if (!window.customElements.get("ea-image-preview")) {
  window.customElements.define("ea-image-preview", EaImagePreview);
}
