import Base from "@/components/Base";
import stylesheet from "./index.scss?inline";

export class EaHeader extends Base {
  static get observedAttributes() {
    return ["height"];
  }

  /**
   * @typedef {Object} State
   * @property {string} height
   */
  /** @type {State} */
  state = this.properties({
    height: {
      type: String,
      default: "60px",
      observer: newVal => {
        if (newVal && CSS.supports("height", newVal))
          this.style.setProperty("--ea-header-height", newVal);
        else if (newVal) this.style.setProperty("--ea-header-height", "60px");
        else this.style.setProperty("--ea-header-height", "auto");
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
      <header class="ea-header" part="container">
        <slot></slot>
      </header>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

if (!window.customElements.get("ea-header")) {
  window.customElements.define("ea-header", EaHeader);
}
