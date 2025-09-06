import { EaOverlay } from "@/common/ea-overlay";

import stylesheet from "./index.scss?inline";

export class EaMessageBoxElement extends EaOverlay {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #header;
  /** @type {HTMLElement} */
  #title;
  /** @type {HTMLElement} */
  #typeIcon;
  /** @type {HTMLElement} */
  #closeIcon;
  /** @type {HTMLElement} */
  #content;
  /** @type {HTMLElement} */
  #footer;
  /** @type {HTMLElement} */
  #confirmButton;
  /** @type {HTMLElement} */
  #cancelButton;
  /** @type {AbortController} */
  #abortController;

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "boxType",
      "visible",
      "dangerouslyUseHTMLString",
      "title",
      "message",
      "type",
      "icon",
      "showClose",
      "closeIcon",
      "showCancelButton",
      "showConfirmButton",
      "cancelButtonText",
      "confirmButtonText",
      "closeOnClickModal",
      "center",
      "roundButton",
      "buttonSize",
      "closeOnPressEscape",
    ].map((s) =>
      s
        .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
        .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
        .toLowerCase()
    );
  }

  state = this.properties({
    boxType: {
      type: ["alert", "confirm", "prompt"],
      default: "alert",
      observer: async (newVal) => {
        const contentContainer = this.shadowRoot.querySelector(
          ".ea-overlay__content"
        );
        this.#initVariant[this["box-type"]](contentContainer);
      },
    },
    visible: {
      type: Boolean,
      default: false,
      observer: async (newVal) => {
        this.status = newVal;
        this.#container.className = this.updateContainerClasslist();
      },
    },
    dangerouslyUseHTMLString: {
      type: Boolean,
      default: false,
      observer: (newVal) => {},
    },
    title: {
      type: String,
      default: "",
      observer: (newVal) => {
        this.#title.textContent = newVal;
      },
    },
    message: {
      type: String,
      default: "",
      observer: (newVal) => {
        if (this.dangerouslyUseHTMLString) {
          this.#content.innerHTML = newVal;
        } else {
          this.#content.textContent = newVal;
        }
      },
    },
    type: {
      type: ["primary", "success", "info", "warning", "error"],
      default: "",
      observer: (newVal) => {
        const iconType = {
          primary: "info",
          success: "ok-circled",
          info: "info",
          warning: "attention-alt",
          error: "cancel-circled",
        };
        this.icon = `icon-${iconType[newVal]}`;

        this.#container.className = this.updateContainerClasslist();
      },
    },
    icon: {
      type: String,
      default: "",
      observer: (newVal) => {
        if (this.#typeIcon) this.#typeIcon.icon = newVal;
      },
    },
    closeIcon: {
      type: String,
      default: "icon-cancel",
      observer: (newVal) => {
        this.#closeIcon.icon = newVal;
      },
    },
    showClose: {
      type: Boolean,
      default: true,
      observer: (newVal) => {
        this.#closeIcon.style.display = newVal ? "block" : "none";
      },
    },
    showCancelButton: {
      type: Boolean,
      default: false,
      observer: (newVal) => {
        if (this.#cancelButton)
          this.#cancelButton.style.display = newVal ? "inline-block" : "none";
      },
    },
    showConfirmButton: {
      type: Boolean,
      default: true,
      observer: (newVal) => {
        if (this.#confirmButton)
          this.#confirmButton.style.display = newVal ? "inline-block" : "none";
      },
    },
    confirmButtonText: {
      type: String,
      default: "OK",
      observer: (newVal) => {
        this.#confirmButton.textContent = newVal;
      },
    },
    closeOnPressEscape: {
      type: Boolean,
      default: false,
      observer: (newVal) => {},
    },
    center: {
      type: Boolean,
      default: false,
      observer: (newVal) => {
        this.#container.className = this.updateContainerClasslist();
      },
    },
    roundButton: {
      type: Boolean,
      default: false,
      observer: (newVal) => {
        if (this.#confirmButton)
          this.#confirmButton.setAttribute("round", newVal);
        if (this.#cancelButton)
          this.#cancelButton.setAttribute("round", newVal);
      },
    },
    buttonSize: {
      type: ["small", "medium", "large"],
      default: "medium",
      observer: (newVal) => {
        if (this.#confirmButton)
          this.#confirmButton.setAttribute("size", newVal);
        if (this.#cancelButton) this.#cancelButton.setAttribute("size", newVal);
      },
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    return `${super.updateContainerClasslist()} ${this.computedClasslist(
      "ea-message-box",
      {
        ["--visible"]: this.visible,
        ["--center"]: this.center,
        [`--${this.type}`]: this.type,
      }
    )}`;
  }

  #dispatchBubblesEvent = (customEventName, detail) => {
    this.dispatchEvent(
      new CustomEvent(customEventName, {
        detail,
        bubbles: true,
        composed: true,
      })
    );
  };

  #initVariant = {
    alert: (container) => {
      container.innerHTML = `
            <div class='ea-message-alert-box' part='container'>
                <header class="ea-message-alert-box__header" part="header">
                    <div class="ea-message-alert-box__title-container">
                        <ea-icon class="ea-message-confirm-box__type-icon" part="type-icon"></ea-icon>
                        <span class="ea-message-alert-box__title" part="title"></span>
                    </div>
                    <ea-icon class="ea-message-alert-box__icon-close" icon="icon-cancel" part='close-icon'></ea-icon>
                </header>
                <main class="ea-message-alert-box__content" part="content"></main>
                <footer class="ea-message-alert-box__footer" part="footer">
                    <ea-button class="ea-message-alert-box__button" type="primary">OK</ea-button>
                </footer>
            </div>
    `;

      this.#container = this.shadowRoot.querySelector(".ea-overlay");
      this.#header = this.shadowRoot.querySelector(
        ".ea-message-alert-box__header"
      );
      this.#typeIcon = this.shadowRoot.querySelector(
        ".ea-message-alert-box__type-icon"
      );
      this.#title = this.shadowRoot.querySelector(
        ".ea-message-alert-box__title"
      );
      this.#closeIcon = this.shadowRoot.querySelector(
        ".ea-message-alert-box__icon-close"
      );
      this.#content = this.shadowRoot.querySelector(
        ".ea-message-alert-box__content"
      );
      this.#footer = this.shadowRoot.querySelector(
        ".ea-message-alert-box__footer"
      );
      this.#confirmButton = this.shadowRoot.querySelector(
        ".ea-message-alert-box__button"
      );
    },
    confirm: (container) => {
      container.innerHTML = `
                <div class='ea-message-confirm-box' part='container'>
                    <header class="ea-message-confirm-box__header" part="header">
                        <div class="ea-message-confirm-box__title-container">
                            <ea-icon class="ea-message-confirm-box__type-icon" part="type-icon"></ea-icon>
                            <span class="ea-message-confirm-box__title" part="title"></span>
                        </div>
                        <ea-icon class="ea-message-confirm-box__icon-close" icon="icon-cancel" part='close-icon'></ea-icon>
                    </header>
                    <main class="ea-message-confirm-box__content" part="content"></main>
                    <footer class="ea-message-confirm-box__footer" part="footer">
                        <ea-button class="ea-message-confirm-box__cancel-button">Cancel</ea-button>
                        <ea-button class="ea-message-confirm-box__confirm-button" type="primary">OK</ea-button>
                    </footer>
                </div>
            `;

      this.#container = this.shadowRoot.querySelector(".ea-overlay");
      this.#header = this.shadowRoot.querySelector(
        ".ea-message-confirm-box__header"
      );
      this.#title = this.shadowRoot.querySelector(
        ".ea-message-confirm-box__title"
      );
      this.#typeIcon = this.shadowRoot.querySelector(
        ".ea-message-confirm-box__type-icon"
      );
      this.#closeIcon = this.shadowRoot.querySelector(
        ".ea-message-confirm-box__icon-close"
      );
      this.#content = this.shadowRoot.querySelector(
        ".ea-message-confirm-box__content"
      );
      this.#footer = this.shadowRoot.querySelector(
        ".ea-message-confirm-box__footer"
      );
      this.#cancelButton = this.shadowRoot.querySelector(
        ".ea-message-confirm-box__cancel-button"
      );
      this.#confirmButton = this.shadowRoot.querySelector(
        ".ea-message-confirm-box__confirm-button"
      );
    },
    prompt: (container) => {
      container.innerHTML = `
                <div class='ea-message-confirm-box' part='container'>
                    <header class="ea-message-confirm-box__header" part="header">
                        <div class="ea-message-confirm-box__title-container">
                            <ea-icon class="ea-message-confirm-box__type-icon" part="type-icon"></ea-icon>
                            <span class="ea-message-confirm-box__title" part="title"></span>
                        </div>
                        <ea-icon class="ea-message-confirm-box__icon-close" icon="icon-cancel" part='close-icon'></ea-icon>
                    </header>
                    <main class="ea-message-confirm-box__content" part="content">
                        <div class="ea-message-confirm-box__description"></div>
                        <ea-input class="ea-message-confirm-box__input" part="input"></ea-input>
                    </main>
                    <footer class="ea-message-confirm-box__footer" part="footer">
                        <ea-button class="ea-message-confirm-box__cancel-button">Cancel</ea-button>
                        <ea-button class="ea-message-confirm-box__confirm-button" type="primary">OK</ea-button>
                    </footer>
                </div>
            `;

      this.#container = this.shadowRoot.querySelector(".ea-overlay");
      this.#header = this.shadowRoot.querySelector(
        ".ea-message-confirm-box__header"
      );
      this.#title = this.shadowRoot.querySelector(
        ".ea-message-confirm-box__title"
      );
      this.#typeIcon = this.shadowRoot.querySelector(
        ".ea-message-confirm-box__type-icon"
      );
      this.#closeIcon = this.shadowRoot.querySelector(
        ".ea-message-confirm-box__icon-close"
      );
      this.#content = this.shadowRoot.querySelector(
        ".ea-message-confirm-box__content"
      );
      this.#footer = this.shadowRoot.querySelector(
        ".ea-message-confirm-box__footer"
      );
      this.#cancelButton = this.shadowRoot.querySelector(
        ".ea-message-confirm-box__cancel-button"
      );
      this.#confirmButton = this.shadowRoot.querySelector(
        ".ea-message-confirm-box__confirm-button"
      );
    },
  };

  connectedCallback() {
    this.setAttribute("role", "dialog");
    this["content-width"] = "100%";
    this["content-max-width"] = "420px";
    this["content-height"] = "auto";

    super.connectedCallback();

    this.assignedStyle(stylesheet);

    this.#abortController = new AbortController();

    if (this.#confirmButton)
      this.#confirmButton.addEventListener(
        "click",
        () => {
          this.#dispatchBubblesEvent("confirm");
        },
        { once: true, signal: this.#abortController.signal }
      );

    if (this["show-close"])
      this.#closeIcon.addEventListener(
        "click",
        () => {
          this.#dispatchBubblesEvent("cancel");
        },
        { once: true, signal: this.#abortController.signal }
      );

    if (this.#cancelButton)
      this.#cancelButton.addEventListener(
        "click",
        () => {
          this.#dispatchBubblesEvent("cancel");
        },
        { once: true, signal: this.#abortController.signal }
      );

    if (this["close-on-press-escape"])
      this.addEventListener(
        "keydown",
        (e) => {
          if (e.key === "Escape") this.#dispatchBubblesEvent("cancel");
        },
        { once: true, signal: this.#abortController.signal }
      );

    this.addEventListener(
      "close",
      () => {
        this.#dispatchBubblesEvent("cancel");
      },
      { once: true, signal: this.#abortController.signal }
    );
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
  }
}

if (!window.customElements.get("ea-message-box")) {
  window.customElements.define("ea-message-box", EaMessageBoxElement);
}
