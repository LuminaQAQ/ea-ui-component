import { EaOverlay } from "@/common/ea-overlay";

import stylesheet from "./index.scss?inline";

export class EaDialog extends EaOverlay {
  /** @type {HTMLElement} */
  #container;
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

  /** @type {AbortController} */
  #abortController;

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "visible",
      "title",
      "width",
      //   "fullscreen",
      "top",
      "modal",

      "append-to-body",
      "append-to",

      //   "lock-scroll",

      //   "open-delay",
      //   "close-delay",

      "close-on-click-modal",
      "close-on-press-escape",
      "show-close",
      "close-icon",
      "before-close",
      //   "destroy-on-close",
      "z-index",

      "draggable",
      "center",
    ];
  }

  state = this.properties({
    visible: {
      type: Boolean,
      default: false,
      observer: (newVal) => {
        this.status = newVal;
      },
    },
    title: {
      type: String,
      default: "",
      observer: (newVal) => {
        if (this.#title) this.#title.textContent = newVal;
      },
    },
    width: {
      type: String,
      default: "50%",
      observer: (newVal) => {
        this.style.setProperty("--ea-overlay-content-width", newVal);
      },
    },
    top: {
      type: String,
      default: "50%",
      observer: (newVal) => {
        this.style.setProperty("--ea-overlay-content-top", newVal);
      },
    },

    "append-to-body": {
      type: Boolean,
      default: false,
      observer: (newVal) => {},
    },
    "append-to": {
      type: String,
      default: "body",
      observer: (newVal) => {},
    },

    "show-close": {
      type: Boolean,
      default: true,
      observer: (newVal) => {
        this.#closeIcon.style.display = newVal ? "block" : "none";
      },
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    return `${super.updateContainerClasslist()} ${this.computedClasslist(
      "ea-dialog",
      {
        // ['--' + this.type]: this.type,
      },
      {
        dialog: true,
      }
    )}`;
  }

  constructor() {
    super();

    const container = this.shadowRoot.querySelector(".ea-overlay__content");
    const hasHeaderSlot = [...this.children].find(
      (item) => item.getAttribute("slot") === "header"
    );
    container.innerHTML = `
      <div class='ea-dialog-main' part='container'>
        <header class='ea-dialog-main__header' part='header'>
            ${
              hasHeaderSlot
                ? `<slot name="header"></slot>`
                : `
                <span class='ea-dialog-main__title' part='title'></span>
                <ea-icon class='ea-dialog-main__close-icon' icon='icon-cancel' part='close-icon'></ea-icon>`
            }
        </header>
        <main class='ea-dialog-main__content' part='content'>
            <slot></slot>
        </main>
        <footer class='ea-dialog-main__footer' part='footer'>
            <slot name='footer'></slot>
        </footer>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-dialog-main");
    this.#header = this.shadowRoot.querySelector(".ea-dialog-main__header");
    this.#title = this.shadowRoot.querySelector(".ea-dialog-main__title");
    this.#closeIcon = this.shadowRoot.querySelector(
      ".ea-dialog-main__close-icon"
    );
    this.#content = this.shadowRoot.querySelector(".ea-dialog-main__content");
    this.#footer = this.shadowRoot.querySelector(".ea-dialog-main__footer");

    this.#handleAppendTo();
  }

  #handleAppendTo = () => {
    if (this.getAttrString("append-to") && this["append-to"]) {
      const parent = document.querySelector(this["append-to"]);
      parent.appendChild(this);
    } else if (this["append-to-body"]) {
      document.body.appendChild(this);
    }
  };

  resetPosition = () => {};

  show = () => {
    this.visible = true;
  };

  close = () => {
    this.visible = false;
  };

  connectedCallback() {
    this.#abortController = new AbortController();

    this["close-on-click-modal"] = this.getAttrBoolean(
      "close-on-click-modal",
      true
    );
    this.setAttribute("role", "dialog");

    super.connectedCallback();

    this.assignedStyle(stylesheet);

    this.addEventListener(
      "closed",
      () => {
        this.visible = false;
      },
      { signal: this.#abortController.signal }
    );

    if (this["show-close"] && this.#closeIcon)
      this.#closeIcon.addEventListener(
        "click",
        () => {
          this.dispatchEvent("cancel");
          this.hide();
          //   if (!this.distinguishCancelAndClose) {
          //   } else {
          //     this.dispatchEvent("message-close");
          //   }
        },
        { signal: this.#abortController.signal }
      );
  }

  $beforeUnmounted() {
    this.#abortController.abort();
  }
}

if (!window.customElements.get("ea-dialog")) {
  window.customElements.define("ea-dialog", EaDialog);
}
