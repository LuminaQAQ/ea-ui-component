import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";

export class EaOptionGroup extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLSlotElement} */
  #headerSlot;

  /** @type {AbortController} */
  #abortController = new AbortController();

  static get observedAttributes() {
    return [...super.observedAttributes, "label"];
  }

  state = this.properties({
    label: {
      type: String,
      default: "",
      observer: newVal => {
        this.#headerSlot.textContent = newVal;
      },
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
        <header class='ea-option-group__header' part='header'>
          <slot name='header'></slot>
        </header>
        <section class='ea-option-group__content' part='content'>
          <slot></slot>
        </section>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-option-group");
    this.#headerSlot = this.shadowRoot.querySelector("slot[name='header']");
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
