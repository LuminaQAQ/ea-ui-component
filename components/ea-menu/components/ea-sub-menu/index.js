import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";
import { timeout } from "@/utils/timeout";

export class EaSubMenu extends Base {
  /** @type {HTMLElement | null} */
  #hostMenu;

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
    const mode = this.#hostMenu?.mode || "vertical";

    const className = this.computedClasslist(
      "ea-sub-menu",
      {
        ["--" + mode]: mode,
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
    const hostMenu = this.closest("ea-menu");

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

    this.#hostMenu = hostMenu;
    this.#container = this.shadowRoot.querySelector(".ea-sub-menu");
    this.#titleEl = this.shadowRoot.querySelector(".ea-sub-menu__title");
    this.#contentEl = this.shadowRoot.querySelector(".ea-sub-menu__content");

    this.updateContainerClasslist();
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

    target.setAttribute("active", "true");
  };

  /**
   * 鼠标悬停事件
   * @param {MouseEvent} e
   */
  #onHoverEvent = (e) => {
    this.#dropdownAbortController?.abort();
    this.#dropdownAbortController = new AbortController();

    this.open = true;

    const onLeaveEvent = (e) => {
      this.open = false;
      this.#dropdownAbortController?.abort();
    };

    this.addEventListener("mouseleave", onLeaveEvent, {
      signal: this.#dropdownAbortController.signal,
    });
  };

  connectedCallback() {
    super.connectedCallback();

    const mode = this.#hostMenu?.mode || "vertical";

    this.addEventListener("click", this.#onMenuItemClick, {
      signal: this.#abortController.signal,
    });

    if (mode === "vertical") {
      this.#titleEl.addEventListener(
        "click",
        (e) => {
          this.open = !this.open;

          if (!this.open) {
            this.#contentEl.style.setProperty(
              "--ea-sub-menu-transition",
              "none"
            );
            void this.#contentEl.offsetHeight;
            this.#contentEl.style.height = `${this.#contentEl.scrollHeight}px`;
            void this.#contentEl.offsetHeight;
            this.#contentEl.style.removeProperty("--ea-sub-menu-transition");
          }

          this.#contentEl.style.height = `${
            this.open ? this.#contentEl.scrollHeight : 0
          }px`;

          this.#contentEl.addEventListener(
            "transitionend",
            () => {
              this.#contentEl.style.height = this.open ? "100%" : 0;
            },
            { once: true }
          );
        },
        {
          signal: this.#abortController.signal,
        }
      );
    } else {
      this.addEventListener("mouseenter", this.#onHoverEvent, {
        signal: this.#abortController.signal,
      });
    }
  }

  $beforeUnmounted() {
    this.#abortController.abort();
  }
}

if (!window.customElements.get("ea-sub-menu")) {
  window.customElements.define("ea-sub-menu", EaSubMenu);
}
