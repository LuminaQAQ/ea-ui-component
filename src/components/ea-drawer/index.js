import { EaOverlay } from "@/common/ea-overlay";

import stylesheet from "./index.scss?inline";
import EaUtils from "@/utils/Utils";
import { timeout } from "@/utils/timeout";

export class EaDrawer extends EaOverlay {
  /** @type {AbortController} */
  #abortController;
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #drawerContainer;
  /** @type {HTMLElement} */
  #header;
  /** @type {HTMLElement} */
  #title;
  /** @type {HTMLElement} */
  #closeIcon;
  /** @type {HTMLElement} */
  #content;
  /** @type {HTMLElement} */
  #footer;

  static get observedAttributes() {
    return EaUtils.Array.toLowerCamelCase([
      ...super.observedAttributes,
      "direction",

      "visible",
      "append-to-body",
      "append-to",
      // "lock-scroll",
      "before-close",
      "close-on-click-modal",
      "close-on-press-escape",
      // "open-delay",
      // "close-delay",
      // "destroy-on-close",
      "modal",
      // "resizable",
      "show-close",
      "size",
      "title",
      "with-header",
      "z-index",

      "header-aria-level ",
    ]);
  }

  state = this.properties({
    direction: {
      type: ["rtl", "ltr", "ttb", "btt"],
      default: "rtl",
      observer: (newVal) => {},
    },
    visible: {
      type: Boolean,
      default: false,
      repeatable: true,
      observer: (newVal) => {
        if (!newVal && this["before-close"] && this.status !== this.visible) {
          return this.#handleBeforeClose();
        }

        if (newVal)
          timeout(() => {
            this.focus();
          }, 0);

        this.status = newVal;
      },
    },

    "with-header": {
      type: Boolean,
      default: true,
      observer: (newVal) => {
        this.#header.style.display = newVal ? "flex" : "none";
      },
    },
    title: {
      type: String,
      default: "",
      observer: (newVal) => {
        if (this["with-header"]) this.#title.textContent = newVal;
      },
    },
    showClose: {
      type: Boolean,
      default: true,
      observer: (newVal) => {
        if (this["with-header"])
          this.#closeIcon.style.display = newVal ? "block" : "none";
      },
    },
    size: {
      type: String,
      default: "30%",
      observer: (newVal) => {
        this.style.setProperty("--ea-drawer-size", newVal);
      },
    },

    "append-to-body": {
      type: Boolean,
      default: false,
      observer: (newVal) => {},
    },
    "close-on-press-escape": {
      type: Boolean,
      default: true,
      observer: (newVal) => {},
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    return `${super.updateContainerClasslist()} ${this.computedClasslist(
      "ea-drawer",
      {
        ["--" + this.direction]: this.direction,
      },
      {
        drawer: true,
      }
    )}`;
  }

  constructor() {
    super();

    const contentContainer = this.shadowRoot.querySelector(
      ".ea-overlay__content"
    );
    this.#initDirectionDrawer(this.direction, contentContainer);

    if (this["append-to-body"]) document.body.appendChild(this);
  }

  #initDirectionDrawer = (type, container) => {
    container.innerHTML = `
      <div class="ea-drawer-main" part="container">
        <header class="ea-drawer-main__header" part="header">
          <span class="ea-drawer-main__title" part="title">
            <slot name="title"></slot>
          </span>
          <ea-icon class="ea-drawer-main__close-icon" icon="icon-cancel" part="close-icon"></ea-icon>
        </header>
        <main class="ea-drawer-main__content" part="content">
          <slot></slot>
        </main>
        <footer class="ea-drawer-main__footer" part="footer">
          <slot name="footer"></slot>
        </footer>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-overlay");
    this.#drawerContainer = this.shadowRoot.querySelector(".ea-drawer-main");
    this.#header = this.shadowRoot.querySelector(".ea-drawer-main__header");
    this.#title = this.shadowRoot.querySelector(".ea-drawer-main__title");
    this.#closeIcon = this.shadowRoot.querySelector(
      ".ea-drawer-main__close-icon"
    );
    this.#content = this.shadowRoot.querySelector(".ea-drawer-main__content");
    this.#footer = this.shadowRoot.querySelector(".ea-drawer-main__footer");
  };

  #handleBeforeClose = () => {
    if (this["before-close"]) {
      this.dispatchEvent("before-close", {
        detail: {
          done: () => (this.status = false),
        },
      });
    } else {
      this.status = false;
    }
  };

  connectedCallback() {
    this.#abortController = new AbortController();

    this.#drawerContainer.ariaModal = true;
    this.#drawerContainer.role = "dialog";
    this["close-on-click-modal"] = this.getAttrBoolean(
      "close-on-click-modal",
      true
    );

    this.addEventListener(
      "closed",
      () => {
        this.visible = false;
      },
      {
        signal: this.#abortController.signal,
      }
    );

    if (this["show-close"])
      this.#closeIcon.addEventListener("click", this.#handleBeforeClose, {
        signal: this.#abortController.signal,
      });

    if (this["close-on-press-escape"]) {
      this.addEventListener(
        "keydown",
        (e) => {
          if (e.key === "Escape") {
            this.#handleBeforeClose();
          }
        },
        { signal: this.#abortController.signal }
      );
    }

    super.connectedCallback();
    this.assignedStyle(stylesheet);
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
  }
}

if (!window.customElements.get("ea-drawer")) {
  window.customElements.define("ea-drawer", EaDrawer);
}
