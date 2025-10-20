import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";
import EaUtils from "@/utils/Utils";

export class EaSkeleton extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #defaultSlot;
  /** @type {HTMLElement} */
  #templateSlot;

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "rows",
      "animated",
      "count",
      "loading",
      "throttle",
      "throttle-trailing",
      "throttle-leading",
    ];
  }

  #states = {
    isChildrenReady: false,
    templateNode: null,
    loadingThrottle: null,
  };

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
        const children = [...this.querySelectorAll("ea-skeleton-item")];
        children.forEach((child) => child.setAttribute("animated", newVal));
      },
    },
    count: {
      type: Number,
      default: 1,
      observer: async (newVal) => {
        if (!this.#states.isChildrenReady) {
          await this.#waitChildrenReady();
          this.#states.isChildrenReady = true;
        }

        /** @type {HTMLElement[] | import("../ea-skeleton-item").EaSkeletonItem[]} */
        let container = [...this.querySelectorAll("[slot='template']")];
        if (!container.length) container = [this.#templateSlot];
        if (!this.#states.templateNode) {
          const fragment = document.createDocumentFragment();
          container.forEach((el) => {
            fragment.appendChild(el.cloneNode(true));
          });
          this.#states.templateNode = fragment;
        }

        const realFragment = document.createDocumentFragment();

        for (let i = 0; i < newVal; i++) {
          const clone = this.#states.templateNode.cloneNode(true);
          realFragment.appendChild(clone);
        }
        if (container.length > 1) {
          container.forEach((el) => {
            el.remove();
          });

          this.appendChild(realFragment);
        } else if (
          container.length === 1 &&
          container[0].tagName === "EA-SKELETON-ITEM"
        ) {
          container[0]?.remove();
          this.appendChild(realFragment);
        } else {
          container[0].innerHTML = "";
          container[0].appendChild(realFragment);
        }
      },
    },
    "throttle-leading": {
      type: Number,
      default: 0,
      observer: (newVal) => {},
    },
    "throttle-trailing": {
      type: Number,
      default: 0,
      observer: (newVal) => {},
    },
    loading: {
      type: Boolean,
      default: true,
      observer: (newVal) => {
        if (this["throttle-trailing"] || this["throttle-leading"]) {
          try {
            clearTimeout(this.#states.loadingThrottle);
            this.#states.loadingThrottle = null;
          } catch (error) {}
        }

        this.#states.loadingThrottle = EaUtils.timeout(() => {
          this.updateContainerClasslist();
        }, (newVal ? this["throttle-trailing"] : this["throttle-leading"]) || 0);
      },
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist(
      "ea-skeleton",
      {
        // ['--' + this.type]: this.type,
      },
      {
        loading: this.loading,
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

  /**
   *
   * @param {Number} rows
   * @returns
   */
  #initDefaultSkeleton = (rows = this.rows) => {
    const children = this.querySelectorAll("ea-skeleton-item");
    if (children.length) return;

    this.#templateSlot.innerHTML = `
      ${Array.from({ length: rows })
        .map(() =>
          EaUtils.EaElement.h("ea-skeleton-item", null, {
            variant: "p",
            animated: this.animated,
          })
        )
        .join("")}`;
  };

  #waitChildrenReady = () =>
    new Promise(async (resolve) => {
      const children = [...this.querySelectorAll("ea-skeleton-item")];
      await Promise.all(
        children.map((item) =>
          EaUtils.EaElement.addAsyncEventListener(
            item,
            "ea-skeleton-item-ready"
          )
        )
      );

      resolve();
    });

  async $render() {
    this.shadowRoot.innerHTML = `
      <div class='ea-skeleton' part='container'>
        <slot id="default"></slot>
        <slot id="template" name="template"></slot>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-skeleton");
    this.#defaultSlot = this.shadowRoot.querySelector("#default");
    this.#templateSlot = this.shadowRoot.querySelector("#template");

    this.#initDefaultSkeleton();
    this.updateContainerClasslist();
  }

  async connectedCallback() {
    super.connectedCallback();
  }
}

if (!window.customElements.get("ea-skeleton")) {
  window.customElements.define("ea-skeleton", EaSkeleton);
}
