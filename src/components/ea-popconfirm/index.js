import { EaPopper } from "@common/ea-popper/index.js";

import stylesheet from "./index.scss?inline";

export class EaPopconfirm extends EaPopper {
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
  /** @type {HTMLElement} */
  #footer;
  /** @type {HTMLElement} */
  #cancelButton;
  /** @type {HTMLElement} */
  #confirmButton;
  /** @type {HTMLElement} */
  #iconElement;
  /** @type {HTMLElement} */
  #titleContainer;
  /** @type {HTMLElement} */
  #titleIcon;
  /** @type {HTMLElement} */
  #titleContent;
  /** @type {AbortController} */
  #abortController;

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "title",
      "visible",
      "icon",
      "icon-color",
      "hide-icon",
      "confirm-button-text",
      "cancel-button-text",
      "confirm-button-type",
      "cancel-button-type",
    ];
  }

  state = this.properties({
    title: {
      type: String,
      default: "",
      observer: (newVal) => {
        this.#titleContent.innerText = newVal;
      },
    },
    visible: {
      type: Boolean,
      default: false,
      observer: (newVal) => {
        this.status = newVal;
      },
    },
    icon: {
      type: String,
      default: "icon-help",
      observer: (newVal) => {
        this.#titleIcon.icon = newVal;
      },
    },
    "icon-color": {
      type: String,
      default: "rgb(255, 153, 0)",
      observer: (newVal) => {
        if (!CSS.supports("color", newVal))
          return console.warn(
            `[EaPopconfirm] The color value ${newVal} is not supported.`
          );

        this.style.setProperty("--ea-popconfirm-title-icon-color", newVal);
      },
    },
    "hide-icon": {
      type: Boolean,
      default: false,
      observer: (newVal) => {
        this.style.setProperty(
          "--ea-popconfirm-title-icon-display",
          newVal ? "none" : "block"
        );
      },
    },
    "confirm-button-text": {
      type: String,
      default: "确定",
      observer: (newVal) => {
        this.#confirmButton.textContent = newVal;
      },
    },
    "cancel-button-text": {
      type: String,
      default: "取消",
      observer: (newVal) => {
        this.#cancelButton.textContent = newVal;
      },
    },
    "confirm-button-type": {
      type: ["normal", "primary", "success", "warning", "danger"],
      default: "primary",
      observer: (newVal) => {
        this.#confirmButton.type = newVal;
      },
    },
    "cancel-button-type": {
      type: ["normal", "primary", "success", "warning", "danger"],
      default: "normal",
      observer: (newVal) => {
        this.#cancelButton.type = newVal;
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

    const { titleContainer, titleIcon, titleContent } =
      this.#renderTitleContainer();
    const { footer, cancelButton, confirmButton } = this.#renderFooter();
    this.#footer = footer;
    this.#cancelButton = cancelButton;
    this.#confirmButton = confirmButton;
    this.#titleContainer = titleContainer;
    this.#titleIcon = titleIcon;
    this.#titleContent = titleContent;
  }

  /**
   *
   * @returns {{
   * titleContainer: HTMLElement,
   * titleIcon: HTMLElement,
   * titleContent: HTMLElement,
   * }}
   */
  #renderTitleContainer = () => {
    const container = document.createElement("section");
    container.classList.add("ea-popconfirm__title");
    container.part = "title";

    container.innerHTML = `
            ${
              this.icon
                ? `<ea-icon icon="${this.icon}" part="icon"></ea-icon>`
                : ""
            }
            <span class="ea-popconfirm__title-content" part="title-content">${
              this.title
            }</span>
        `;
    this.#originalPopper.appendChild(container);

    return {
      titleContainer: container,
      titleIcon: container?.querySelector("ea-icon"),
      titleContent: container.querySelector(".ea-popconfirm__title-content"),
    };
  };

  /**
   * 渲染footer
   * @return {{
   *  footer: HTMLElement,
   *  cancelButton: HTMLElement,
   *  confirmButton: HTMLElement,
   * }}
   */
  #renderFooter() {
    const slotTemplate = `<slot name="actions"></slot>`;
    const buttonGroupTemplate = `
            <ea-button type="${this["cancel-button-type"]}" class="ea-popconfirm__cancel" size="small" part="cancel-button" text>${this["cancel-button-text"]}</ea-button>
            <ea-button type="${this["confirm-button-type"]}" class="ea-popconfirm__confirm" part="confirm-button" size="small">${this["confirm-button-text"]}</ea-button>
        `;

    const footer = document.createElement("footer");
    footer.classList.add("ea-popconfirm__footer");
    footer.part = "footer";
    footer.innerHTML = this.querySelector(`[slot="actions"]`)
      ? slotTemplate
      : buttonGroupTemplate;
    this.#originalPopper.appendChild(footer);

    return {
      footer,
      cancelButton:
        footer.querySelector(".ea-popconfirm__cancel") ||
        this.querySelector("[data-cancel]"),
      confirmButton:
        footer.querySelector(".ea-popconfirm__confirm") ||
        this.querySelector("[data-confirm]"),
    };
  }

  #init = () => {
    const abortController = new AbortController();
    this.#abortController = abortController;

    this.#originalPopper.querySelector("slot").remove();
    this.assignedStyle(stylesheet);
  };

  /**
   *
   * @param {HTMLElement} el
   * @param {'cancel' | 'confirm'} closeEventName
   */
  #initCloseEvent = (el, closeEventName) => {
    if (!el) return;

    el.addEventListener(
      "click",
      () => {
        this.dispatchEvent(new CustomEvent(closeEventName));

        this.hide();
      },
      { signal: this.#abortController.signal }
    );
  };

  #initTriggerEvent = () => {
    const referenceSlot = this.#referenceElement.querySelector(
      'slot[name="reference"]'
    );
    referenceSlot.addEventListener(
      "click",
      () => {
        const abortController = new AbortController();
        this.toggle();

        window.addEventListener(
          "click",
          (e) => {
            const isThis = this.contains(e.target);

            if (!isThis) {
              abortController.abort();
              this.hide();
            }
          },
          { signal: abortController.signal }
        );
      },
      { signal: this.#abortController.signal }
    );

    this.#initCloseEvent(this.#cancelButton, "cancel");
    this.#initCloseEvent(this.#confirmButton, "confirm");
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

if (!window.customElements.get("ea-popconfirm")) {
  window.customElements.define("ea-popconfirm", EaPopconfirm);
}
