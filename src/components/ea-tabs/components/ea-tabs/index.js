import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";

export class EaTabs extends Base {
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
      observer: (newVal) => {},
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist("ea-tabs", {
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

  #initTabAttributes = () => {
    /** @type {HTMLElement[]} */
    const panelEls = [...this.querySelectorAll("ea-tab-panel")];
    /** @type {HTMLElement[]} */
    const tabEls = [...this.querySelectorAll("ea-tab")];

    panelEls.forEach((tab, index) => {
      tab.removeAttribute("active");
    });
    tabEls.forEach((tab, index) => {
      tab.setAttribute("slot", "nav");
    });

    tabEls[0].setAttribute("active", "");
  };

  $render() {
    this.shadowRoot.innerHTML = `
      <div class='ea-tabs' part='container'>
        <nav class='ea-tabs__nav' part='nav'>
          <slot name='nav'></slot>
        </nav>
        <main class='ea-tabs__content' part='content'>
          <slot></slot>
        </main>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-tabs");

    this.#initTabAttributes();
  }

  connectedCallback() {
    super.connectedCallback();
  }

  $beforeUnmounted() {
    this.#abortController.abort();
  }
}

if (!window.customElements.get("ea-tabs")) {
  window.customElements.define("ea-tabs", EaTabs);
}
