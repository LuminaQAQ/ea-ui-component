import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";

export class EaSkeletonItem extends Base {
  /** @type {HTMLElement} */
  #container;

  static get observedAttributes() {
    return [...super.observedAttributes, "variant", "animated"];
  }

  state = this.properties({
    variant: {
      type: [
        "p",
        "text",
        "h1",
        "h3",
        "caption",
        "button",
        "image",
        "circle",
        "rect",
      ],
      default: "p",
      observer: (newVal) => {
        this.updateContainerClasslist();
      },
    },
    animated: {
      type: Boolean,
      default: false,
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
    const className = this.computedClasslist(
      "ea-skeleton-item",
      {
        ["--" + this.variant]: this.variant,
      },
      {
        animated: this.animated,
      }
    );

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
      <div class='ea-skeleton-item' part='container'>
        <slot></slot>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-skeleton-item");
  }

  connectedCallback() {
    super.connectedCallback();

    this.emit("ea-skeleton-item-ready");
  }
}

if (!window.customElements.get("ea-skeleton-item")) {
  window.customElements.define("ea-skeleton-item", EaSkeletonItem);
}
