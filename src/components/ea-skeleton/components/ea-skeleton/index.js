import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";
import EaUtils from "@/utils/Utils";

export class EaSkeleton extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #templateSlot;

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "rows",
      "animated",
      "count",
      "loading",
    ];
  }

  state = this.properties({
    rows: {
      type: Number,
      default: 4,
      observer: (newVal) => {},
    },
    animated: {
      type: Boolean,
      default: false,
      observer: (newVal) => {
        this.updateContainerClasslist();
      },
    },
    count: {
      type: Number,
      default: 1,
      observer: (newVal) => {
        // this.initDefaultSkeleton(newVal);
      },
    },
    loading: {
      type: Boolean,
      default: false,
      observer: (newVal) => {
        // this.updateContainerClasslist();
      },
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist("ea-skeleton", {
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

  #initDefaultSkeleton = (rows = this.rows) => {
    const children = this.querySelectorAll("ea-skeleton-item");
    if (children.length) return;

    this.#templateSlot.innerHTML = `
      ${Array.from({ length: rows })
        .map(() => `<ea-skeleton-item variant="p"></ea-skeleton-item>`)
        .join("")}`;
  };

  async $render() {
    this.shadowRoot.innerHTML = `
      <div class='ea-skeleton' part='container'>
        <slot></slot>
        <slot name="template"></slot>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-skeleton");
    this.#templateSlot = this.shadowRoot.querySelector("slot[name='template']");

    const children = [...this.querySelectorAll("ea-skeleton-item")];
    await Promise.all(
      children.map((item) =>
        EaUtils.EaElement.addAsyncEventListener(item, "ea-skeleton-item-ready")
      )
    );

    this.#initDefaultSkeleton();
  }

  async connectedCallback() {
    super.connectedCallback();
  }
}

if (!window.customElements.get("ea-skeleton")) {
  window.customElements.define("ea-skeleton", EaSkeleton);
}
