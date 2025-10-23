import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";

export class EaTour extends Base {
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
    const className = this.computedClasslist("ea-tour", {
      // ['--' + this.type]: this.type,
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
      <div class='ea-tour' part='container'>
        <svg viewbox="0 0 100 100" class='ea-tour__overlay' part='overlay'>
            <clipPath id="mask">
                <rect x="50" y="50" width="50px" height="50px" fill="white"></rect>
            </clipPath>
            <rect x="0" y="0" width="100%" height="100%" fill="black" clip-path="url(#mask)"></rect>
        </svg>
        <slot></slot>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-tour");
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

if (!window.customElements.get("ea-tour")) {
  window.customElements.define("ea-tour", EaTour);
}
