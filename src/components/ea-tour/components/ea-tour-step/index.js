import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";

export class EaTourStep extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #title;

  static get observedAttributes() {
    return [...super.observedAttributes, "title"];
  }

  state = this.properties({
    title: {
      type: String,
      default: "",
      observer: (newVal) => {
        this.#title.textContent = newVal;
      },
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist("ea-tour-step", {
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
      <div class='ea-tour-step' part='container'>
        <header class='ea-tour-step__title' part='title'>
          <slot name='title'></slot>
        </header>
        <main class='ea-tour-step__content' part='content'>
            <slot></slot>
        </main>
        <footer class='ea-tour-step__footer' part='footer'>
            <slot></slot>
        </footer>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-tour-step");
    this.#title = this.shadowRoot.querySelector(".ea-tour-step__title slot");
  }

  connectedCallback() {
    super.connectedCallback();

    this.emit("ea-tour-step-ready");
  }
}

if (!window.customElements.get("ea-tour-step")) {
  window.customElements.define("ea-tour-step", EaTourStep);
}
