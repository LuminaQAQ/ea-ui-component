import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";

export class EaMenu extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {AbortController} */
  #abortController = new AbortController();

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "mode",
      "background-color",
      "text-color",
      "active-text-color",
      "collapse",
    ];
  }

  state = this.properties({
    mode: {
      type: ["horizontal", "vertical"],
      default: "vertical",
      observer: (newVal) => {
        this.updateContainerClasslist();
      },
    },
    "background-color": {
      type: String,
      default: "#ffffff",
      observer: (newVal) => {
        this.#container.style.setProperty("--ea-menu-bg-color", newVal);
      },
    },
    "text-color": {
      type: String,
      default: "#303133",
      observer: (newVal) => {
        this.#container.style.setProperty("--ea-menu-text-color", newVal);
      },
    },
    "active-text-color": {
      type: String,
      default: "#409eff",
      observer: (newVal) => {
        this.#container.style.setProperty(
          "--ea-menu-active-text-color",
          newVal
        );
      },
    },
    collapse: {
      type: Boolean,
      default: false,
      observer: (newVal) => {
        // this.#container.classList.toggle("is-collapse", newVal);
      },
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist(
      "ea-menu",
      {
        // ['--' + this.type]: this.type,
        ["--" + this.mode]: this.mode,
      },
      {}
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
      <ul class='ea-menu' role="menubar" part='container'>
        <slot></slot>
      </ul>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-menu");

    this.updateContainerClasslist();
  }

  #onMenuItemClick = (e) => {
    /** @type {HTMLElement[]} */
    const items = [...this.querySelectorAll("ea-menu-item")];
    /** @type {HTMLElement[]} */
    const subMenus = [...this.querySelectorAll("ea-sub-menu")];
    /** @type {HTMLElement | null} */
    const target = e.target.closest("ea-menu-item");
    /** @type {HTMLElement | null} */
    const subMenu = e.target.closest("ea-sub-menu");

    if (subMenu || target) {
      const cb = (item) => item.removeAttribute("active");
      items.forEach(cb);
      subMenus.forEach(cb);
    }

    if (target) target.setAttribute("active", "true");
  };

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener("click", this.#onMenuItemClick, {
      signal: this.#abortController.signal,
    });

    this.addEventListener("ea-sub-menu-click", this.#onMenuItemClick, {
      signal: this.#abortController.signal,
    });
  }

  $beforeUnmounted() {
    this.#abortController.abort();
  }
}

if (!window.customElements.get("ea-menu")) {
  window.customElements.define("ea-menu", EaMenu);
}
