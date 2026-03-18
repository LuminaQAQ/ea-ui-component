import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";

export class EaSubMenu extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #titleEl;
  /** @type {HTMLSlotElement} */
  #titleSlot;
  /** @type {HTMLElement} */
  #contentEl;

  /** @type {AbortController} */
  #abortController = new AbortController();
  /** @type {AbortController} */
  #dropdownAbortController = new AbortController();
  /** @type {AbortController} */
  #modeAbortController = new AbortController();

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "active",
      "index",
      "disabled",
      "mode",
      "label",
    ];
  }

  state = this.properties({
    open: {
      props: true,
      type: Boolean,
      default: false,
      observer: () => {
        this.updateContainerClasslist();
      },
    },
    index: {
      type: String,
      default: "",
      observer: () => {},
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
      observer: () => {
        this.updateContainerClasslist();
      },
    },
    mode: {
      type: ["horizontal", "vertical"],
      default: "vertical",
      observer: newVal => {
        this.#handleModeChange(newVal);

        this.updateContainerClasslist();
      },
    },
    label: {
      type: String,
      default: "",
      observer: newVal => {
        this.#titleSlot.textContent = newVal;
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
        ["--" + this.mode]: this.mode,
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
    const isChild = this.parentElement?.closest("ea-sub-menu");

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
    this.#titleSlot = this.shadowRoot.querySelector("slot[name='title']");
    this.#contentEl = this.shadowRoot.querySelector(".ea-sub-menu__content");

    this.updateContainerClasslist();
  }

  /**
   * 菜单项点击事件
   * @param {MouseEvent} e
   */
  #onMenuItemClick = e => {
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
  #onHoverEvent = () => {
    this.#dropdownAbortController?.abort();
    this.#dropdownAbortController = new AbortController();

    this.open = true;

    const onLeaveEvent = () => {
      this.open = false;
      this.#dropdownAbortController?.abort();
    };

    this.addEventListener("mouseleave", onLeaveEvent, {
      signal: this.#dropdownAbortController.signal,
    });
  };

  /**
   * 垂直菜单折叠事件
   */
  #onVerticalCollapseEvent = () => {
    this.open = !this.open;

    if (!this.open) {
      this.#contentEl.style.setProperty("--ea-sub-menu-transition", "none");
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
  };

  /**
   * 菜单模式切换
   * @param {string} [mode]
   */
  #handleModeChange = (mode = this.mode) => {
    this.#modeAbortController?.abort();
    this.#modeAbortController = new AbortController();

    if (mode === "vertical") {
      this.#titleEl.addEventListener("click", this.#onVerticalCollapseEvent, {
        signal: this.#modeAbortController.signal,
      });
    } else {
      this.addEventListener("mouseenter", this.#onHoverEvent, {
        signal: this.#modeAbortController.signal,
      });
    }
  };

  connectedCallback() {
    super.connectedCallback();

    this.#abortController?.abort();
    this.#abortController = new AbortController();

    this.addEventListener("click", this.#onMenuItemClick, {
      signal: this.#abortController.signal,
    });

    this.#handleModeChange();
    this.updateContainerClasslist();
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
    this.#dropdownAbortController?.abort();
    this.#modeAbortController?.abort();
  }
}

if (!window.customElements.get("ea-sub-menu")) {
  window.customElements.define("ea-sub-menu", EaSubMenu);
}
