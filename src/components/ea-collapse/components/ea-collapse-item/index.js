import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";

export class EaCollapseItem extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #titleWrap;
  /** @type {HTMLElement} */
  #title;
  /** @type {HTMLSlotElement} */
  #titleSlot;
  /** @type {HTMLElement} */
  #titleIcon;
  /** @type {HTMLElement} */
  #content;

  /** @type {AbortController} */
  #abortController;

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "title",
      "name",
      "disabled",
      "expand-icon-position",

      "active",
    ];
  }

  state = this.properties({
    title: {
      type: String,
      default: "",
      observer: newVal => {
        this.#titleSlot.textContent = newVal;
      },
    },
    name: {
      type: String,
      default: "",
      observer: () => {},
    },
    "expand-icon-position": {
      type: ["left", "right"],
      default: "right",
      observer: () => {
        this.updateContainerClasslist();
      },
    },
    disabled: {
      type: Boolean,
      default: false,
      observer: () => {
        this.updateContainerClasslist();
      },
    },

    active: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.#updateCollapseHeight(newVal);
      },
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist(
      "ea-collapse-item",
      {
        [`--indicator-` + this["expand-icon-position"]]:
          this["expand-icon-position"],
      },
      {
        disabled: this.disabled,
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
      <div class='ea-collapse-item' part='container'>
        <div class="ea-collapse-item__title-wrap" part="title-wrap">
          <span class="ea-collapse-item__title" part="title">
            <slot name="title"></slot>
          </span>
          <span class="ea-collapse-item__indicator" part="indicator">
            <slot name="icon">
              <ea-icon class="default-expand-icon" icon="icon-angle-down" part="icon"></ea-icon>
            </slot>
          </span>
        </div>
        <div class="ea-collapse-item__content" part="content-wrap">
          <slot></slot>
        </div>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-collapse-item");
    this.#titleWrap = this.shadowRoot.querySelector(
      ".ea-collapse-item__title-wrap"
    );
    this.#title = this.shadowRoot.querySelector(".ea-collapse-item__title");
    this.#titleSlot = this.shadowRoot.querySelector(
      ".ea-collapse-item__title slot"
    );
    this.#titleIcon = this.shadowRoot.querySelector(
      ".ea-collapse-item__title-icon"
    );
    this.#content = this.shadowRoot.querySelector(".ea-collapse-item__content");

    this.updateContainerClasslist();
  }

  /**
   * 更新折叠面板高度
   * @param {boolean} isActive
   */
  #updateCollapseHeight = (isActive = this.active) => {
    queueMicrotask(() => {
      this.#container.style.setProperty(
        "--ea-collapse-item-content-height",
        isActive ? `${this.#content.scrollHeight}px` : "0"
      );
    });
  };

  /**
   * 折叠面板 展开/收起 事件处理
   * @param {Event} e
   */
  #onCollapseEvent = e => {
    e.preventDefault();
    e.stopImmediatePropagation();

    if (this.disabled) return;

    this.emit("collapse-item-click", {
      detail: {
        name: this.name,
        el: this,
      },
      bubbles: true,
      cancelable: true,
    });
  };

  connectedCallback() {
    super.connectedCallback();

    this.#abortController?.abort();
    this.#abortController = new AbortController();

    this.#titleWrap.addEventListener("click", this.#onCollapseEvent, {
      signal: this.#abortController.signal,
    });

    const defaultSlot = this.shadowRoot.querySelector("slot:not([name])");
    if (defaultSlot) {
      defaultSlot.addEventListener(
        "slotchange",
        () => {
          this.#container.style.setProperty(
            "--ea-collapse-item-content-height",
            "auto"
          );
          this.#updateCollapseHeight();
        },
        {
          signal: this.#abortController.signal,
        }
      );
    }
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
  }
}

if (!window.customElements.get("ea-collapse-item")) {
  window.customElements.define("ea-collapse-item", EaCollapseItem);
}
