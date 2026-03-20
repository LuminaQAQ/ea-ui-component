import Base from "../../../Base.js";

import stylesheet from "./index.scss?inline";

export class EaAside extends Base {
  /** @type {HTMLElement} */
  #container;

  static get observedAttributes() {
    return ["width"];
  }

  /**
   * @typedef {Object} State
   */
  /** @type {State} */
  state = this.properties({
    width: {
      type: String,
      default: "300px",
      observer: newVal => {
        this.style.setProperty("--ea-aside-width", newVal);
      },
    },
  });

  constructor() {
    super();

    this.stylesheet = stylesheet;

    this.$render();
  }

  $render() {
    this.shadowRoot.innerHTML = `
            <aside class="ea-aside" part="container">
                <slot></slot>
            </aside>
        `;

    this.#container = this.shadowRoot.querySelector(".ea-aside");
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

if (!window.customElements.get("ea-aside")) {
  window.customElements.define("ea-aside", EaAside);
}
