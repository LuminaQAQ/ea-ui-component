import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";

export class EaTabPanel extends Base {
  /** @type {HTMLElement} */
  #hostTabsContext = this.closest("ea-tabs");

  /** @type {HTMLElement} */
  #container;
  /** @type {AbortController} */
  #abortController = new AbortController();

  static get observedAttributes() {
    return [...super.observedAttributes, "name", "type"];
  }

  state = this.properties({
    name: {
      type: String,
      default: "",
      observer: (newVal) => {},
    },
    type: {
      type: ["", "card", "border-card"],
      default: () => this.#hostTabsContext.getAttribute("type") || "",
      observer: (newVal) => {
        this.updateContainerClasslist();
      },
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist("ea-tab-panel", {
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
      <div class='ea-tab-panel' part='container'>
        <slot></slot>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-tab-panel");
  }

  connectedCallback() {
    super.connectedCallback();
  }

  $beforeUnmounted() {
    this.#abortController.abort();
  }
}

if (!window.customElements.get("ea-tab-panel")) {
  window.customElements.define("ea-tab-panel", EaTabPanel);
}
