import { EaOverlay } from "@/common/ea-overlay";

import stylesheet from "./index.scss?inline";
import { timeout } from "@/utils/timeout";

export class EaDialog extends EaOverlay {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #overlayContent;
  /** @type {HTMLElement} */
  #header;
  /** @type {HTMLElement} */
  #title;
  /** @type {HTMLElement} */
  #closeIcon;

  /** @type {AbortController} */
  #abortController;

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "visible",
      "title",
      "width",
      "fullscreen",
      "top",
      "modal",
      "center",

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
      "modal-penetrable",

      "draggable",
    ];
  }

  state = this.properties({
    visible: {
      type: Boolean,
      default: false,
      observer: newVal => {
        if (!newVal && this["before-close"] && this.status !== this.visible) {
          return this.#handleBeforeClose();
        }

        if (newVal) {
          timeout(() => {
            this.focus();
          }, 0);
        } else {
          timeout(() => {
            this.blur();
          }, 0);
        }

        this.status = newVal;
      },
    },
    title: {
      type: String,
      default: "",
      observer: newVal => {
        if (this.#title) this.#title.textContent = newVal;
      },
    },
    width: {
      type: String,
      default: "50%",
      observer: newVal => {
        this.style.setProperty("--ea-overlay-content-width", newVal);
      },
    },
    top: {
      type: String,
      default: "50%",
      observer: newVal => {
        this.style.setProperty("--ea-overlay-content-top", newVal);
      },
    },
    center: {
      type: Boolean,
      default: false,
      observer: () => {
        this.#container.className = this.updateContainerClasslist();
      },
    },
    fullscreen: {
      type: Boolean,
      default: false,
      observer: () => {
        this.#container.className = this.updateContainerClasslist();
      },
    },

    "append-to-body": {
      type: Boolean,
      default: false,
      observer: () => {},
    },
    "append-to": {
      type: String,
      default: "body",
      observer: () => {},
    },

    "show-close": {
      type: Boolean,
      default: true,
      observer: newVal => {
        this.#closeIcon.style.display = newVal ? "block" : "none";
      },
    },
    "modal-penetrable": {
      type: Boolean,
      default: false,
      observer: () => {},
    },

    draggable: {
      type: Boolean,
      default: false,
      observer: () => {
        this.#container.className = this.updateContainerClasslist();
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
        "--center": this.center,
        "--draggable": this.draggable,
        "--fullscreen": this.fullscreen,
      },
      {
        dialog: true,
        "modal-penetrable": this["modal-penetrable"] && !this.modal,
      }
    )}`;
  }

  constructor() {
    super();

    const container = this.shadowRoot.querySelector(".ea-overlay__content");

    container.innerHTML = `
      <div class='ea-dialog-main' part='container'>
        <header class='ea-dialog-main__header' part='header'>
          <slot name="header">
            <span class='ea-dialog-main__title' part='title'></span>
            <ea-icon class='ea-dialog-main__close-icon' name='xmark' part='close-icon'></ea-icon>          
          </slot>
        </header>
        <main class='ea-dialog-main__content' part='content'>
            <slot></slot>
        </main>
        <footer class='ea-dialog-main__footer' part='footer'>
            <slot name='footer'></slot>
        </footer>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-overlay");
    this.#overlayContent = container;
    this.#header = this.shadowRoot.querySelector(".ea-dialog-main__header");
    this.#title = this.shadowRoot.querySelector(".ea-dialog-main__title");
    this.#closeIcon = this.shadowRoot.querySelector(
      ".ea-dialog-main__close-icon"
    );

    this.#handleAppendTo();
  }

  /**
   * 通过 append-to 属性，将组件插入到指定元素中
   */
  #handleAppendTo = () => {
    if (this.getAttrString("append-to") && this["append-to"]) {
      const parent = document.querySelector(this["append-to"]);
      parent.appendChild(this);
    } else if (this["append-to-body"]) {
      document.body.appendChild(this);
    }
  };

  /**
   * 重置 dialog 位置
   */
  resetPosition = () => {
    this.#overlayContent.style.left = "var(--ea-overlay-content-left)";
    this.#overlayContent.style.top = "var(--ea-overlay-content-top)";
  };

  /**
   * 打开 dialog
   */
  show = () => {
    this.visible = true;
  };

  /**
   * 关闭 dialog
   */
  hide = () => {
    this.visible = false;
  };

  /**
   * 触发 before-close 事件
   */
  #handleBeforeClose = () => {
    if (this["before-close"]) {
      this.emit("before-close", {
        detail: {
          done: () => (this.status = false),
        },
      });
    } else {
      this.status = false;
    }
  };

  #initDraggableEvent = mousedownEvent => {
    if (
      !this.#header.contains(mousedownEvent.target) ||
      this.#header !== mousedownEvent.target
    )
      return;

    const controller = new AbortController();
    const contentElement = this.shadowRoot.querySelector(
      ".ea-overlay__content"
    );

    window.addEventListener(
      "mousemove",
      e => {
        contentElement.style.left = e.clientX + "px";
        contentElement.style.top = e.clientY + "px";
      },
      {
        signal: controller.signal,
      }
    );

    window.addEventListener(
      "mouseup",
      () => {
        controller.abort();
      },
      { signal: controller.signal }
    );
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

    this.addEventListener("closed", this.hide, {
      signal: this.#abortController.signal,
    });

    if (this["show-close"] && this.#closeIcon)
      this.#closeIcon.addEventListener("click", this.#handleBeforeClose, {
        signal: this.#abortController.signal,
      });

    if (this.draggable && !this.fullscreen)
      this.shadowRoot.addEventListener("mousedown", this.#initDraggableEvent, {
        signal: this.#abortController.signal,
      });
  }

  $beforeUnmounted() {
    this.#abortController.abort();
  }
}

if (!window.customElements.get("ea-dialog")) {
  window.customElements.define("ea-dialog", EaDialog);
}
