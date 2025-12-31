import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";

export class EaDescriptionsItem extends Base {
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "label",
      "colspan",
      "rowspan",
      "align",
      "label-align",
      "width",
      "label-width",
      "label-part",
      "content-part",
    ];
  }

  state = this.properties({
    label: {
      type: String,
      default: "",
      observer: () => {},
    },
    colspan: {
      type: Number,
      default: 1,
      observer: () => {},
    },
    rowspan: {
      type: Number,
      default: 1,
      observer: () => {},
    },
    align: {
      type: ["left", "center", "right"],
      default: "",
      observer: () => {},
    },
    "label-align": {
      type: ["left", "center", "right"],
      default: "",
      observer: () => {},
    },
    width: {
      type: String,
      default: "",
      observer: () => {},
    },
    "label-width": {
      type: String,
      default: "",
      observer: () => {},
    },
    "label-part": {
      type: String,
      default: "",
      observer: () => {},
    },
    "content-part": {
      type: String,
      default: "",
      observer: () => {},
    },
  });

  constructor() {
    super();

    this.stylesheet = stylesheet;

    this.$render();
  }

  $render() {
    this.shadowRoot.innerHTML = `
      <div class='ea-descriptions-item' part='container'>
        <slot></slot>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();

    this.emit("ea-descriptions-item-ready", {
      bubbles: true,
      composed: true,
    });
  }
}

if (!window.customElements.get("ea-descriptions-item")) {
  window.customElements.define("ea-descriptions-item", EaDescriptionsItem);
}
