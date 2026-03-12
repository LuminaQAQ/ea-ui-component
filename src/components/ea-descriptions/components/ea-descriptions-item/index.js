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

  /** @type {MutationObserver | null} */
  #contentObserver = null;

  state = this.properties({
    label: {
      type: String,
      default: "",
      observer: () => {
        this.#notifyParent();
      },
    },
    colspan: {
      type: Number,
      default: 1,
      observer: () => {
        this.#notifyParent();
      },
    },
    rowspan: {
      type: Number,
      default: 1,
      observer: () => {
        this.#notifyParent();
      },
    },
    align: {
      type: ["left", "center", "right"],
      default: "",
      observer: () => {
        this.#notifyParent();
      },
    },
    "label-align": {
      type: ["left", "center", "right"],
      default: "",
      observer: () => {
        this.#notifyParent();
      },
    },
    width: {
      type: String,
      default: "",
      observer: () => {
        this.#notifyParent();
      },
    },
    "label-width": {
      type: String,
      default: "",
      observer: () => {
        this.#notifyParent();
      },
    },
    "label-part": {
      type: String,
      default: "",
      observer: () => {
        this.#notifyParent();
      },
    },
    "content-part": {
      type: String,
      default: "",
      observer: () => {
        this.#notifyParent();
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
      <div class='ea-descriptions-item' part='container'>
        <slot></slot>
      </div>
    `;
  }

  #notifyParent() {
    this.emit("ea-descriptions-item-change", {
      bubbles: true,
      composed: true,
    });
  }

  connectedCallback() {
    super.connectedCallback();

    this.#setupContentObserver();
  }

  #setupContentObserver() {
    this.#contentObserver = new MutationObserver(() => {
      this.#notifyParent();
    });

    this.#contentObserver.observe(this, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }

  $beforeUnmounted() {
    if (this.#contentObserver) {
      this.#contentObserver.disconnect();
      this.#contentObserver = null;
    }
  }
}

if (!window.customElements.get("ea-descriptions-item")) {
  window.customElements.define("ea-descriptions-item", EaDescriptionsItem);
}
