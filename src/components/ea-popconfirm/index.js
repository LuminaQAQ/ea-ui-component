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
  #AbortControllerStates = {
    /** @type {AbortController | null} */
    globalClose: null,
    /** @type {AbortController | null} */
    customActions: null,
  };

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
      observer: newVal => {
        this.#titleContent.innerText = newVal;
      },
    },
    visible: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.status = newVal;
      },
    },
    icon: {
      type: String,
      default: "circle-question",
      observer: newVal => {
        this.#titleIcon.name = newVal;
      },
    },
    "icon-color": {
      type: String,
      default: "rgb(255, 153, 0)",
      observer: newVal => {
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
      observer: newVal => {
        this.style.setProperty(
          "--ea-popconfirm-title-icon-display",
          newVal ? "none" : "block"
        );
      },
    },
    "confirm-button-text": {
      type: String,
      default: "确定",
      observer: newVal => {
        this.#confirmButton.textContent = newVal;
      },
    },
    "cancel-button-text": {
      type: String,
      default: "取消",
      observer: newVal => {
        this.#cancelButton.textContent = newVal;
      },
    },
    "confirm-button-type": {
      type: ["normal", "primary", "success", "warning", "danger"],
      default: "primary",
      observer: newVal => {
        this.#confirmButton.type = newVal;
      },
    },
    "cancel-button-type": {
      type: ["normal", "primary", "success", "warning", "danger"],
      default: "normal",
      observer: newVal => {
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
   * 渲染title
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
      ${this.icon ? `<ea-icon name="${this.icon}" part="icon"></ea-icon>` : ""}
      <span class="ea-popconfirm__title-content" part="title-content">${
        this.title
      }</span>
    `;
    this.#originalPopper.appendChild(container);

    return {
      titleContainer: container,
      titleIcon: container.querySelector("ea-icon"),
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
    const slotTemplate = `<slot name="actions">
      <ea-button type="${this["cancel-button-type"]}" class="ea-popconfirm__cancel" size="small" part="cancel-button" text>${this["cancel-button-text"]}</ea-button>
      <ea-button type="${this["confirm-button-type"]}" class="ea-popconfirm__confirm" part="confirm-button" size="small">${this["confirm-button-text"]}</ea-button>
    </slot>`;

    const footer = document.createElement("footer");
    footer.classList.add("ea-popconfirm__footer");
    footer.part = "footer";
    footer.innerHTML = slotTemplate;
    this.#originalPopper.appendChild(footer);

    return {
      footer,
      cancelButton: footer.querySelector(".ea-popconfirm__cancel"),
      confirmButton: footer.querySelector(".ea-popconfirm__confirm"),
    };
  }

  /**
   * 初始化关闭事件
   * @param {HTMLElement} el
   * @param {'cancel' | 'confirm'} closeEventName 关闭事件名称
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

  /**
   * 初始化触发事件
   */
  #initTriggerEvent = () => {
    const referenceSlot = this.#referenceElement.querySelector(
      'slot[name="reference"]'
    );
    const actionSlot = this.#footer.querySelector('slot[name="actions"]');
    referenceSlot.addEventListener(
      "click",
      () => {
        this.open();
      },
      { signal: this.#abortController.signal }
    );

    if (actionSlot.assignedElements().length) {
      this.#initCustomActionsEvent();
    } else {
      this.#initCloseEvent(this.#cancelButton, "cancel");
      this.#initCloseEvent(this.#confirmButton, "confirm");
    }
  };

  /**
   * 初始化自定义 actions slot 的事件监听
   */
  #initCustomActionsEvent = () => {
    const actionsSlot = this.#footer.querySelector('slot[name="actions"]');
    if (!actionsSlot) return;

    this.#AbortControllerStates.customActions?.abort();
    this.#AbortControllerStates.customActions = new AbortController();

    const bindEvents = () => {
      const assignedElements = actionsSlot.assignedElements();
      assignedElements.forEach(el => {
        const cancelBtn =
          el.querySelector?.("[data-cancel]") ||
          (el.matches?.("[data-cancel]") ? el : null);
        const confirmBtn =
          el.querySelector?.("[data-confirm]") ||
          (el.matches?.("[data-confirm]") ? el : null);

        if (cancelBtn) {
          cancelBtn.addEventListener(
            "click",
            () => {
              this.close();

              this.dispatchEvent(new CustomEvent("cancel"));
            },
            { signal: this.#AbortControllerStates.customActions.signal }
          );
        }
        if (confirmBtn) {
          confirmBtn.addEventListener(
            "click",
            () => {
              this.close();
              this.dispatchEvent(new CustomEvent("confirm"));
            },
            { signal: this.#AbortControllerStates.customActions.signal }
          );
        }
      });
    };

    actionsSlot.addEventListener("slotchange", bindEvents, {
      signal: this.#AbortControllerStates.customActions.signal,
    });
  };

  /**
   * 打开 popconfirm
   * @public
   */
  open() {
    /**
     * 点击外部关闭 popconfirm
     * @param {MouseEvent} e
     */
    const onClose = e => {
      const isThis = this.contains(e.target);

      if (!isThis) {
        this.#AbortControllerStates.globalClose?.abort();
        this.hide();
      }
    };

    this.show();

    this.#AbortControllerStates.globalClose?.abort();
    this.#AbortControllerStates.globalClose = new AbortController();

    window.addEventListener("click", onClose, {
      signal: this.#AbortControllerStates.globalClose.signal,
    });
  }

  /**
   * 关闭 popconfirm
   * @public
   */
  close() {
    this.hide();
    this.#AbortControllerStates.globalClose?.abort();
  }

  connectedCallback() {
    super.connectedCallback();

    this.#abortController?.abort();
    this.#abortController = new AbortController();

    this.#originalPopper.querySelector("slot")?.remove();
    this.assignedStyle(stylesheet);

    this.#initTriggerEvent();
  }

  $beforeUnmounted() {
    super.$beforeUnmounted();
    this.#abortController?.abort();

    for (const key in this.#AbortControllerStates) {
      this.#AbortControllerStates[key]?.abort();
    }
  }
}

if (!window.customElements.get("ea-popconfirm")) {
  window.customElements.define("ea-popconfirm", EaPopconfirm);
}
