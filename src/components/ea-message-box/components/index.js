import { EaOverlay } from "@/common/ea-overlay";
import { EaInput } from "@/components/ea-input";

import stylesheet from "./index.scss?inline";
import { timeout } from "@/utils/timeout";
import EaUtils from "@/utils/Utils";

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
  #description;
  /** @type {HTMLInputElement} */
  #input;
  /** @type {HTMLElement} */
  #invalidMessage;
  /** @type {HTMLElement} */
  #footer;
  /** @type {HTMLElement} */
  #confirmButton;
  /** @type {HTMLElement} */
  #cancelButton;
  /** @type {AbortController} */
  #abortController;

  #states = {
    inputPattern: null,
    dangerouslyUseHTMLString: false,
  };

  // ------- inputPattern -------
  // #region
  get inputPattern() {
    return this.#states.inputPattern;
  }

  set inputPattern(value) {
    this.#states.inputPattern = value;
  }
  // #endregion
  // ------- end -------

  // ------- dangerouslyUseHTMLString -------
  // #region
  get dangerouslyUseHTMLString() {
    return this.#states.dangerouslyUseHTMLString;
  }

  set dangerouslyUseHTMLString(value) {
    this.#states.dangerouslyUseHTMLString = value;
  }
  // #endregion
  // ------- end -------

  static get observedAttributes() {
    return EaUtils.arrayToLowerCamelCase([
      ...super.observedAttributes,
      "boxType",
      "visible",
      // "dangerouslyUseHTMLString",
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

      "showInput",
      "inputPlaceholder",
      "inputType",
      "inputValue",
      // "inputPattern",
      "inputErrorMessage",
    ]);
  }

  state = this.properties({
    boxType: {
      type: ["alert", "confirm", "prompt", "personalized"],
      default: "personalized",
      observer: async (newVal) => {
        const contentContainer = this.shadowRoot.querySelector(
          ".ea-overlay__content"
        );
        this.#initVariant(newVal, contentContainer);
        this.#container.className = this.updateContainerClasslist();
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
    // dangerouslyUseHTMLString: {
    //   type: Boolean,
    //   default: false,
    //   observer: (newVal) => {},
    // },
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

    inputPlaceholder: {
      type: String,
      default: "",
      observer: (newVal) => {
        if (this.#input) this.#input.placeholder = newVal;
      },
    },
    inputType: {
      type: String,
      default: "text",
      observer: (newVal) => {
        if (this.#input) this.#input.type = newVal;
      },
    },
    inputValue: {
      type: String,
      default: "",
      observer: (newVal) => {
        if (this.#input) this.#input.value = newVal;
      },
    },
    inputErrorMessage: {
      type: String,
      default: "",
      observer: (newVal) => {
        if (this.#input && this.inputPattern)
          this.#invalidMessage.textContent = newVal;
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
      },
      {
        invalid: this.#input && this.#input?.invalid,
        [`${this["box-type"]}-box`]: this["box-type"],
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

  #initVariant = (type, container) => {
    container.innerHTML = `
      <div class="ea-message-box-main" part="container">
        <header class="ea-message-box-main__header" part="header">
          <div class="ea-message-box-main__title-container">
            <ea-icon class="ea-message-box-main__type-icon" part="type-icon"></ea-icon>
            <span class="ea-message-box-main__title" part="title"></span>
          </div>
          <ea-icon class="ea-message-box-main__icon-close" icon="icon-cancel" part="close-icon"></ea-icon>
        </header>
        <main class="ea-message-box-main__content" part="content">
          <div class="ea-message-box-main__description"></div>
          <ea-input class="ea-message-box-main__input" part="input"></ea-input>
          <div class="ea-message-box-main__invalid-message"></div>
        </main>
        <footer class="ea-message-box-main__footer" part="footer">
          <ea-button class="ea-message-box-main__cancel-button">Cancel</ea-button>
          <ea-button class="ea-message-box-main__confirm-button" type="primary">OK</ea-button>
        </footer>
      </div>
    `;
    this.#container = this.shadowRoot.querySelector(".ea-overlay");
    this.#header = this.shadowRoot.querySelector(
      ".ea-message-box-main__header"
    );
    this.#title = this.shadowRoot.querySelector(".ea-message-box-main__title");
    this.#typeIcon = this.shadowRoot.querySelector(
      ".ea-message-box-main__type-icon"
    );
    this.#closeIcon = this.shadowRoot.querySelector(
      ".ea-message-box-main__icon-close"
    );
    this.#content = this.shadowRoot.querySelector(
      ".ea-message-box-main__content"
    );
    this.#footer = this.shadowRoot.querySelector(
      ".ea-message-box-main__footer"
    );
    this.#cancelButton = this.shadowRoot.querySelector(
      ".ea-message-box-main__cancel-button"
    );
    this.#confirmButton = this.shadowRoot.querySelector(
      ".ea-message-box-main__confirm-button"
    );
    this.#description = this.shadowRoot.querySelector(
      ".ea-message-box-main__description"
    );
    this.#input = this.shadowRoot.querySelector(".ea-message-box-main__input");
    this.#invalidMessage = this.shadowRoot.querySelector(
      ".ea-message-box-main__invalid-message"
    );

    if (this.#input) {
      timeout(() => {
        this.#input.focus();
      }, 0);
    }
  };

  /**
   * 处理带有匹配规则的输入框输入
   * @returns {Promise<boolean>} Promise.
   */
  #handleInputPattern = () =>
    new Promise((resolve, reject) => {
      if (!this.#input || !this.inputPattern) return resolve(true);

      const isValid = this.inputPattern.test(this.#input.value);
      this.#container.classList.toggle("is-invalid", !isValid);

      if (isValid) resolve(true);
      else
        reject(
          new Error(
            `[EaMessageBox] ${
              this["input-error-message"] || "input pattern is not valid."
            }`
          )
        );
    });

  /**
   * 初始化确认事件
   */
  #initConfirmEvent = async () => {
    try {
      await this.#handleInputPattern();
      this.#dispatchBubblesEvent("confirm");
      this.hide();
    } catch (error) {}
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
      this.#confirmButton.addEventListener("click", this.#initConfirmEvent, {
        signal: this.#abortController.signal,
      });

    if (this["show-close"])
      this.#closeIcon.addEventListener(
        "click",
        () => {
          this.hide();
          this.#dispatchBubblesEvent("cancel");
        },
        { once: true, signal: this.#abortController.signal }
      );

    if (this.#cancelButton)
      this.#cancelButton.addEventListener(
        "click",
        () => {
          this.hide();
          this.#dispatchBubblesEvent("cancel");
        },
        { once: true, signal: this.#abortController.signal }
      );

    if (this["close-on-press-escape"])
      this.addEventListener(
        "keydown",
        (e) => {
          if (e.key === "Escape") {
            this.hide();
            this.#dispatchBubblesEvent("cancel");
          }
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
