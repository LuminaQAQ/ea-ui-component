import Base from "../../../Base.js";

import stylesheet from "./index.scss?inline";

export class EaRow extends Base {
  static get observedAttributes() {
    return ["gutter", "justify", "align", "tag"];
  }

  /**
   * @typedef {Object} State
   * @property {string} gutter - 列类型
   * @property {string} justify - 列对齐方式
   * @property {string} align - 列对齐方式
   */
  /** @type {State} */
  state = this.properties({
    gutter: {
      type: Number,
      default: 0,
      observer: newVal => {
        this.style.setProperty("--ea-row-gutter", newVal / 2 + "px");
      },
    },
    justify: {
      type: [
        "start",
        "end",
        "center",
        "space-around",
        "space-between",
        "space-evenly",
      ],
      default: "start",
      observer: newVal => {
        this.style.setProperty("--ea-row-justify", newVal);
      },
    },
    align: {
      type: ["top", "middle", "bottom"],
      default: "",
      observer: newVal => {},
    },
    tag: {
      type: String,
      default: "div",
      observer: newVal => {},
    },
  });

  constructor() {
    super();
    this.stylesheet = stylesheet;

    this.$render();
  }

  $render() {
    this.shadowRoot.innerHTML = `
            <${this.tag} class="ea-row" part="container">
                <slot></slot>
            </${this.tag}>
        `;
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

if (!window.customElements.get("ea-row")) {
  window.customElements.define("ea-row", EaRow);
}
