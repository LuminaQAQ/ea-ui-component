import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";

export class EaTab extends Base {
  /** @returns {HTMLElement | null} */
  get #hostTabsContext() {
    try {
      return this.closest("ea-tabs");
    } catch {
      return null;
    }
  }

  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #closeIcon;

  /** @type {AbortController} */
  #abortController = new AbortController();

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "panel",

      "type",
      "disabled",
      "active",
      "tab-position",
      "editable",
      "closable",
    ];
  }

  state = this.properties({
    panel: {
      type: String,
      default: "",
      observer: () => {},
    },
    type: {
      type: ["", "card", "border-card"],
      default: () => this.#hostTabsContext?.getAttribute("type") || "",
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
      observer: () => {
        this.updateContainerClasslist();
      },
    },
    "tab-position": {
      type: ["", "card", "border-card"],
      default: () =>
        this.#hostTabsContext?.getAttribute("tab-position") || "top",
      observer: () => {
        this.updateContainerClasslist();
      },
    },
    editable: {
      type: Boolean,
      default: false,
      observer: () => {
        this.updateContainerClasslist();
      },
    },
    closable: {
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
    let tabEls = this.#hostTabsContext?.querySelectorAll("ea-tab");
    tabEls = tabEls?.length > 0 ? [...tabEls] : [];

    const className = this.computedClasslist(
      "ea-tab",
      {
        ["--" + this.type]:
          this.type === this.#hostTabsContext?.getAttribute("type") || "",
        ["--" + this["tab-position"]]:
          this["tab-position"] ===
            this.#hostTabsContext?.getAttribute("tab-position") || "top",
      },
      {
        disabled: this.disabled,
        active: this.active,
        last: tabEls.slice(-1)[0] === this,
        first: tabEls.slice(0)[0] === this,
        closable: this.closable ? this.closable : this.editable,
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
      <div class='ea-tab' part='container'>
        <slot></slot>
        <ea-icon class="ea-tab__close-icon" icon="icon-cancel" part="close-icon"></ea-icon>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-tab");
    this.#closeIcon = this.shadowRoot.querySelector(".ea-tab__close-icon");

    this.updateContainerClasslist();
  }

  /**
   * 关闭事件，为了避免click事件优先触发。
   * @param {MouseEvent} e
   */
  #onCloseEvent = e => {
    e.preventDefault();
    e.stopImmediatePropagation();

    this.emit("ea-tab-close-icon-click", {
      detail: {
        panel: this.panel,
      },
      bubbles: true,
    });
  };

  connectedCallback() {
    super.connectedCallback();

    this.#abortController?.abort();
    this.#abortController = new AbortController();

    this.#closeIcon.addEventListener("click", this.#onCloseEvent, {
      signal: this.#abortController.signal,
    });
  }

  $beforeUnmounted() {
    this.#abortController.abort();
  }
}

if (!window.customElements.get("ea-tab")) {
  window.customElements.define("ea-tab", EaTab);
}
