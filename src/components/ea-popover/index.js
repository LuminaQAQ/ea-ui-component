import { EaPopper } from "@common/ea-popper/index.js";

import stylesheet from "./index.scss?inline";

export class EaPopover extends EaPopper {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #originalPopper;
  /** @type {HTMLElement} */
  #referenceElement;
  /** @type {HTMLElement} */
  #titleElement;
  /** @type {HTMLElement} */
  #contentElement;
  /** @type {AbortController} */
  #abortController;

  #isMounted;

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "trigger",
      "title",
      "content",
      "visible",
    ];
  }

  state = this.properties({
    trigger: {
      type: ["click", "focus", "hover", "contextmenu", "customized"],
      default: "hover",
      observer: newVal => {},
    },
    visible: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.status = newVal;
      },
    },
    title: {
      type: String,
      default: "",
      observer: newVal => {
        if (!this.#titleElement) {
          const titleElement = document.createElement("div");
          const contentSlot = this.#originalPopper.querySelector("slot");
          titleElement.classList.add("ea-popover__title");
          titleElement.part = "title";
          titleElement.innerText = newVal;

          this.#originalPopper.insertBefore(titleElement, contentSlot);

          this.#titleElement = titleElement;
        } else {
          this.#titleElement.innerText = newVal;
        }
      },
    },
    content: {
      type: String,
      default: "",
      observer: newVal => {
        if (!this.#contentElement) {
          const contentElement = document.createElement("div");
          const contentSlot = this.#originalPopper.querySelector("slot");
          contentElement.classList.add("ea-popover__content");
          contentElement.part = "content";
          contentElement.innerText = newVal;

          this.#originalPopper.appendChild(contentElement);

          this.#contentElement = contentElement;
          contentSlot.remove();
        } else {
          this.#contentElement.innerText = newVal;
        }
      },
    },
  });

  constructor() {
    super();

    this.#container = this.shadowRoot.querySelector(".ea-popper");
    this.#originalPopper = this.shadowRoot.querySelector(
      ".ea-popper__original"
    );
    this.#referenceElement = this.shadowRoot.querySelector(
      ".ea-popper__reference"
    );
  }

  #triggerEventStrategies = {
    hover: () => {
      this.addEventListener(
        "mouseover",
        e => {
          this.show();

          this.addEventListener(
            "mouseout",
            e => {
              this.hide();
            },
            { once: true }
          );
        },
        { signal: this.#abortController.signal }
      );
    },
    click: () => {
      this.addEventListener("click", () => {
        this.toggle();
      });
    },
    focus: () => {
      this.addEventListener("focus", () => {
        this.show();

        this.addEventListener("blur", e => {
          this.hide();
        });
      });
    },
    contextmenu: () => {
      this.addEventListener("contextmenu", e => {
        e.preventDefault();
        const controller = new AbortController();
        this.show();

        window.addEventListener(
          "click",
          e => {
            const isThis = this.contains(e.target);
            if (!isThis) {
              this.hide();
              controller.abort();
            }
          },
          { signal: controller.signal }
        );
      });
    },
  };

  #init = () => {
    const abortController = new AbortController();
    this.#abortController = abortController;

    this.assignedStyle(stylesheet);
  };

  #initTriggerEvent = () => {
    if (this.trigger === "customized") return;

    const isExist = Object.keys(this.#triggerEventStrategies).find(
      key => this.trigger === key
    );
    this.#triggerEventStrategies[isExist || "hover"]?.();

    if (!isExist)
      console.warn(`[EaPopper] trigger event ${this.trigger} is not exist`);
  };

  connectedCallback() {
    super.connectedCallback();

    this.#init();
    this.#initTriggerEvent();
  }

  $beforeUnmounted() {
    super.$beforeUnmounted();
    this.#abortController?.abort();
  }
}

if (!window.customElements.get("ea-popover")) {
  window.customElements.define("ea-popover", EaPopover);
}
