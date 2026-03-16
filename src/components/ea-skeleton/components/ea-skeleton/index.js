import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";
import EaUtils from "@/utils/Utils";

export class EaSkeleton extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLSlotElement} */
  #defaultSlot;
  /** @type {HTMLSlotElement} */
  #templateSlot;

  /** @type {AbortController} */
  #abortController;

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
      observer: async newVal => {
        await this.#ensureChildrenReady();
        this.#initDefaultSkeleton(newVal);
        this.#updateAnimatedStatus(this.animated);
      },
    },
    animated: {
      type: Boolean,
      default: false,
      observer: async newVal => {
        await this.#ensureChildrenReady();
        this.#updateAnimatedStatus(newVal);
      },
    },
    count: {
      type: Number,
      default: 1,
      observer: async newVal => {
        await this.#ensureChildrenReady();

        const elements = this.#getTemplateElements();
        const fragment = this.#renderTemplates(newVal, elements);

        const [first] = elements;
        const hasMultiple = elements.length > 1;
        const isSkeletonItem = first?.tagName === "EA-SKELETON-ITEM";

        if (hasMultiple || isSkeletonItem) {
          elements.forEach(el => el.remove());
          this.appendChild(fragment);
        } else {
          first.innerHTML = "";
          first.appendChild(fragment);
        }
      },
    },
    "throttle-leading": {
      type: Number,
      default: 0,
      observer: () => {},
    },
    "throttle-trailing": {
      type: Number,
      default: 0,
      observer: () => {},
    },
    loading: {
      type: Boolean,
      default: true,
      observer: newVal => {
        if (this["throttle-trailing"] || this["throttle-leading"]) {
          try {
            clearTimeout(this.#states.loadingThrottle);
            this.#states.loadingThrottle = null;
          } catch {
            /* empty */
          }
        }

        this.#states.loadingThrottle = EaUtils.timeout(
          () => {
            this.updateContainerClasslist();
          },
          (newVal ? this["throttle-trailing"] : this["throttle-leading"]) || 0
        );
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
      {},
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

    this.updateContainerClasslist();
  }

  /**
   * 子元素定义
   */
  async #ensureChildrenReady() {
    if (this.#states.isChildrenReady) return;
    await customElements.whenDefined("ea-skeleton-item");
    this.#states.isChildrenReady = true;
  }

  /**
   * 获取模板元素
   * @returns {HTMLElement[]}
   */
  #getTemplateElements() {
    const slotted = [...this.querySelectorAll("[slot='template']")];
    return slotted.length ? slotted : [this.#templateSlot];
  }

  /**
   * 克隆模板元素
   * @param {HTMLElement[]} elements
   * @returns {DocumentFragment}
   */
  #cloneTemplate(elements) {
    if (this.#states.templateNode) return this.#states.templateNode;

    const fragment = document.createDocumentFragment();
    elements.forEach(el => fragment.appendChild(el.cloneNode(true)));
    this.#states.templateNode = fragment;
    return fragment;
  }

  /**
   * 渲染模板元素
   * @param {number} count
   * @param {HTMLElement[]} elements
   * @returns {DocumentFragment}
   */
  #renderTemplates(count, elements) {
    const template = this.#cloneTemplate(elements);
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
      fragment.appendChild(template.cloneNode(true));
    }

    return fragment;
  }

  /**
   * 初始化默认骨架屏
   * @param {Number} rows
   * @returns
   */
  #initDefaultSkeleton = (rows = this.rows) => {
    const children = this.querySelectorAll("ea-skeleton-item");
    if (children.length) return;

    this.#templateSlot.innerHTML = this.html(`
      ${Array.from({ length: rows })
        .map(() =>
          EaUtils.EaElement.h("ea-skeleton-item", null, {
            variant: "p",
            animated: this.animated,
          })
        )
        .join("")}`);
  };

  /**
   * 更新动画状态
   * @param {boolean} isAnimated
   */
  #updateAnimatedStatus = isAnimated => {
    /** @type {HTMLElement[]} */
    const children = this.#templateSlot
      .assignedElements()
      .filter(el => el.tagName.toLocaleLowerCase() === "ea-skeleton-item")
      .concat([...this.#templateSlot.querySelectorAll("ea-skeleton-item")]);
    children.forEach(child => child.toggleAttribute("animated", isAnimated));
  };

  async connectedCallback() {
    super.connectedCallback();

    this.#abortController?.abort();
    this.#abortController = new AbortController();

    const onTemplateSlotChange = () => {
      this.#updateAnimatedStatus(this.animated);
    };

    this.#initDefaultSkeleton();

    this.#templateSlot.addEventListener("slotchange", onTemplateSlotChange, {
      signal: this.#abortController.signal,
    });
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
  }
}

if (!window.customElements.get("ea-skeleton")) {
  window.customElements.define("ea-skeleton", EaSkeleton);
}
