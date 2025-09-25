import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";

export class EaCollapse extends Base {
  /** @type {HTMLElement} */
  #container;

  static get observedAttributes() {
    return [...super.observedAttributes, "active", "accordion"];
  }

  state = this.properties({
    type: {
      //   type: ,
      default: "",
      observer: (newVal) => {},
    },
    accordion: {
      type: Boolean,
      default: false,
      observer: (newVal) => {},
    },
    active: {
      type: {
        String: () => this.accordion,
        Array: () => !this.accordion,
      },
      default: this.accordion ? "" : [],
      observer: (newVal) => {
        console.log(newVal);
      },
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    return this.computedClasslist("ea-collapse", {
      // ['--' + this.type]: this.type,
    });
  }

  #handleCollapse(flag, activeItemName) {
    
  }

  constructor() {
    super();

    this.stylesheet = stylesheet;

    this.$render();
  }

  $render() {
    this.shadowRoot.innerHTML = `
      <div class='ea-collapse' part='container'>
        <slot></slot>
      </div>
        `;

    this.#container = this.shadowRoot.querySelector(".ea-collapse");
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

if (!window.customElements.get("ea-collapse")) {
  window.customElements.define("ea-collapse", EaCollapse);
}
