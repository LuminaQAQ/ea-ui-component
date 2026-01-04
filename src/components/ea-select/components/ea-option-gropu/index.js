import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";

export class EaOptionGroup extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {AbortController} */
  #abortController = new AbortController();

  static get observedAttributes() {
    return [...super.observedAttributes];
  }

  state = this.properties({
    type: {
      // type: ,
      default: "",
      observer: newVal => {},
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist("ea-option-group", {
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
      <div class='ea-option-group' part='container'>
        <slot></slot>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-option-group");
  }

  connectedCallback() {
    super.connectedCallback();
    this.#abortController?.abort();
    this.#abortController = new AbortController();
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
  }
}

if (!window.customElements.get("ea-option-group")) {
  window.customElements.define("ea-option-group", EaOptionGroup);
}
