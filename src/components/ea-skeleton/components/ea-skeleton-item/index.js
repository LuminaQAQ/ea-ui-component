import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";
import { skeletonImageSVG } from "./assets/imageSVG";

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
        if (newVal === "image") {
          this.#container.innerHTML = skeletonImageSVG;
        }
        this.updateContainerClasslist();
      },
    },
    animated: {
      type: Boolean,
      default: false,
      observer: () => {
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
      <div class='ea-skeleton-item' part='container'></div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-skeleton-item");
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

if (!window.customElements.get("ea-skeleton-item")) {
  window.customElements.define("ea-skeleton-item", EaSkeletonItem);
}
