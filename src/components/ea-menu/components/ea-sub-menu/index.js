import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";

export class EaSubMenu extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #titleEl;
  /** @type {HTMLElement} */
  #contentEl;

  /** @type {AbortController} */
  #abortController = new AbortController();
  /** @type {AbortController} */
  #dropdownAbortController = new AbortController();

  static get observedAttributes() {
    return [...super.observedAttributes, "active", "index", "disabled"];
  }

  state = this.properties({
    open: {
      props: true,
      type: Boolean,
      default: false,
      observer: (newVal) => {
        this.updateContainerClasslist();
      },
    },
    index: {
      type: String,
      default: "",
      observer: (newVal) => {},
    },
    disabled: {
      type: Boolean,
      default: false,
      observer: (newVal) => {
        this.updateContainerClasslist();
      },
    },
    active: {
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
      "ea-sub-menu",
      {
        // ['--' + this.type]: this.type,
      },
      {
        disabled: this.disabled,
        active: this.active,
        open: this.open,
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
    const isChild = this.parentElement.closest("ea-sub-menu");

    this.shadowRoot.innerHTML = `
      <div class='ea-sub-menu' part='container'>
        <header class='ea-sub-menu__title' part='title'>
          <slot name='title'></slot>
          <ea-icon icon="${
            isChild ? "icon-angle-right" : "icon-angle-down"
          }" class='ea-sub-menu__arrow' part='arrow'></ea-icon>
        </header>
        <ul class='ea-sub-menu__content' part='content'>
          <slot></slot>
        </ul>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-sub-menu");
    this.#titleEl = this.shadowRoot.querySelector(".ea-sub-menu__title");
    this.#contentEl = this.shadowRoot.querySelector(".ea-sub-menu__content");
  }

  /**
   * 菜单项点击事件
   * @param {MouseEvent} e
   */
  #onMenuItemClick = (e) => {
    e.stopImmediatePropagation();
    e.preventDefault();

    const target = e.target.closest("ea-menu-item");
    const isChild =
      this.closest("ea-sub-menu") === this
        ? this.parentElement.closest("ea-sub-menu")
        : this.closest("ea-sub-menu");

    if (!target) return;

    this.emit("ea-sub-menu-click", {
      detail: { index: this.index },
      bubbles: true,
    });

    this.setAttribute("active", "true");
    if (isChild) isChild.setAttribute("active", "true");
  };

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener("click", this.#onMenuItemClick, {
      signal: this.#abortController.signal,
    });

    this.addEventListener(
      "mouseover",
      (e) => {
        this.#dropdownAbortController?.abort();
        this.#dropdownAbortController = new AbortController();

        this.open = true;

        this.addEventListener(
          "mouseout",
          (e) => {
            this.open = false;
            this.#dropdownAbortController?.abort();
          },
          {
            signal: this.#dropdownAbortController.signal,
          }
        );
      },
      {
        signal: this.#abortController.signal,
      }
    );
  }

  $beforeUnmounted() {
    this.#abortController.abort();
  }
}

if (!window.customElements.get("ea-sub-menu")) {
  window.customElements.define("ea-sub-menu", EaSubMenu);
}
