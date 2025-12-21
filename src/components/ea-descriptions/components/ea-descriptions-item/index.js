import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";

export class EaDescriptionsItem extends Base {
  /** @type {HTMLElement} */
  #container;

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
      observer: (newVal) => {},
    },
    colspan: {
      type: Number,
      default: 1,
      observer: (newVal) => {},
    },
    rowspan: {
      type: Number,
      default: 1,
      observer: (newVal) => {},
    },
    align: {
      type: ["left", "center", "right"],
      default: "",
      observer: (newVal) => {},
    },
    "label-align": {
      type: ["left", "center", "right"],
      default: "",
      observer: (newVal) => {},
    },
    width: {
      type: String,
      default: "",
      observer: (newVal) => {},
    },
    "label-width": {
      type: String,
      default: "",
      observer: (newVal) => {},
    },
    "label-part": {
      type: String,
      default: "",
      observer: (newVal) => {},
    },
    "content-part": {
      type: String,
      default: "",
      observer: (newVal) => {},
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    return this.computedClasslist("ea-descriptions-item", {
      // ['--' + this.type]: this.type,
    });
  }

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

    this.#container = this.shadowRoot.querySelector(".ea-descriptions-item");
  }

  connectedCallback() {
    super.connectedCallback();

    this.dispatchEvent("ea-descriptions-item-ready", {
      bubbles: true,
      composed: true,
    });
  }
}

if (!window.customElements.get("ea-descriptions-item")) {
  window.customElements.define("ea-descriptions-item", EaDescriptionsItem);
}
