import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";
import { timeout } from "@/utils/timeout";

export class EaAlert extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #alertIcon;
  /** @type {HTMLElement} */
  #alertContent;
  /** @type {HTMLSlotElement} */
  #iconSlot;
  /** @type {HTMLElement} */
  #alertTitle;
  /** @type {HTMLElement} */
  #alertDescription;
  /** @type {HTMLElement} */
  #alertCloseBtn;

  /** @type {AbortController} */
  #abortController;

  static get observedAttributes() {
    return [
      "title",
      "description",
      "type",
      "effect",
      "closable",
      "close-text",
      "show-icon",
      "center",
      "description",
      "show-after",
      "hide-after",
      "auto-close",
    ];
  }

  state = this.properties({
    title: {
      type: String,
      default: "",
      observer: newVal => {
        this.#alertTitle.innerHTML = newVal;
      },
    },
    description: {
      type: String,
      default: "",
      observer: newVal => {
        this.#alertDescription.innerHTML = newVal ? newVal : `<slot></slot>`;
      },
    },
    type: {
      type: ["primary", "info", "success", "warning", "error"],
      default: "info",
      observer: newVal => {
        this.updateContainerClasslist();
      },
    },
    effect: {
      type: ["light", "dark"],
      default: "light",
      observer: newVal => {
        this.updateContainerClasslist();
      },
    },
    "close-text": {
      type: String,
      default: "",
      observer: newVal => {
        try {
          this.#alertCloseBtn.textContent = newVal;
        } catch (error) {}
      },
    },
    closable: {
      type: Boolean,
      default: true,
      observer: newVal => {
        this.#abortController?.abort();

        this.#alertCloseBtn.innerHTML = newVal
          ? this["close-text"]
            ? this["close-text"]
            : `<ea-icon class="ea-alert__close-icon" name="xmark" part="close-icon"></ea-icon>`
          : "";

        if (newVal) {
          this.#abortController = new AbortController();
          this.#alertCloseBtn.addEventListener("click", this.#closeEvent, {
            signal: this.#abortController.signal,
          });
        }
      },
    },
    "show-icon": {
      type: Boolean,
      default: false,
      observer: () => {
        const faIconType = {
          primary: "circle-info",
          success: "circle-check",
          info: "circle-info",
          warning: "triangle-exclamation",
          error: "circle-xmark",
        };

        this.#alertIcon.innerHTML = `<ea-icon class="ea-alert__icon" name="${
          faIconType[this.type]
        }" part="icon"></ea-icon>`;
      },
    },
    center: {
      type: Boolean,
      default: false,
      observer: () => {
        this.updateContainerClasslist();
      },
    },
    "show-after": {
      type: Number,
      default: 0,
      observer: newVal => {
        newVal = Math.abs(newVal);
        this.#container.classList.toggle("ea-alert--hide", newVal > 0);

        timeout(() => {
          this.emit("open");

          this.#container.classList.remove("ea-alert--hide");
        }, newVal);
      },
    },
    "hide-after": {
      type: Number,
      default: 300,
      observer: newVal => {},
    },
    "auto-close": {
      type: Number,
      default: 0,
      observer: newVal => {
        if (newVal && this.isMounted)
          timeout(() => this.#closeEvent(), this["auto-close"]);
      },
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist("ea-alert", {
      ["--" + this.type]: this.type,
      ["--" + this.effect]: this.effect,
      ["--center"]: this.center,
    });

    this.#container.className = className;

    return className;
  }

  constructor() {
    super();

    this.$render();

    this.stylesheet = stylesheet;
  }

  $render() {
    this.shadowRoot.innerHTML = `
      <div class='ea-alert' part='container'>
        <span class="ea-alert__icon-wrap" part='icon-wrap'>
          <slot name='icon'></slot>
        </span>
        <div class="ea-alert__content" part='content-wrap'>
          <span class="ea-alert__title" part='title'>
            <slot name="title"></slot>
          </span>
          <p class="ea-alert__description" part='description'>
            <slot></slot>
          </p>
          <span class="ea-alert__close-btn" part="close-btn">
            ${
              this.closable
                ? this["close-text"]
                  ? this["close-text"]
                  : `<ea-icon class="ea-alert__close-icon" name="xmark" part="close-icon"></ea-icon>`
                : ""
            }
          </span>
        </div>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-alert");
    this.#alertIcon = this.shadowRoot.querySelector(
      ".ea-alert__icon-wrap slot[name=icon]"
    );
    this.#alertContent = this.shadowRoot.querySelector(".ea-alert__content");
    this.#alertTitle = this.shadowRoot.querySelector(
      ".ea-alert__title slot[name=title]"
    );
    this.#alertDescription = this.shadowRoot.querySelector(
      ".ea-alert__description slot"
    );
    this.#alertCloseBtn = this.shadowRoot.querySelector(".ea-alert__close-btn");
  }

  /**
   * 关闭事件
   */
  #closeEvent = () => {
    timeout(() => {
      this.#container.classList.add("ea-alert--before-close");

      /**
       * 过渡结束事件
       */
      const onTransitionEnd = () => {
        this.emit("close", {
          detail: {
            visible: false,
          },
        });
        this.remove();
      };

      this.#container.addEventListener("transitionend", onTransitionEnd, {
        once: true,
      });
    }, this["hide-after"]);
  };

  connectedCallback() {
    super.connectedCallback();

    this.#abortController?.abort();

    if (this.closable) {
      this.#abortController = new AbortController();
      this.#alertCloseBtn.addEventListener("click", this.#closeEvent, {
        signal: this.#abortController.signal,
      });
    }
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
  }
}

if (!window.customElements.get("ea-alert")) {
  window.customElements.define("ea-alert", EaAlert);
}
