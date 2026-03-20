import { EaOverlay } from "@/common/ea-overlay";

import stylesheet from "./index.scss?inline";
import EaUtils from "@/utils/Utils";
import { timeout } from "@/utils/timeout";

export class EaDrawer extends EaOverlay {
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

  /** @type {AbortController} */
  #abortController;

  #AbortControllerStates = {
    /** @type {AbortController | null} */
    showClose: null,
    /** @type {AbortController | null} */
    closeOnPressEscape: null,
  };

  static get observedAttributes() {
    return EaUtils.Array.toLowerCamelCase([
      ...super.observedAttributes,
      "direction",
      "visible",
      "append-to-body",
      "append-to",
      "close-on-click-modal",
      "close-on-press-escape",
      "modal",
      "show-close",
      "size",
      "title",
      "with-header",
      "z-index",
      "header-aria-level",
    ]);
  }

  state = this.properties({
    direction: {
      type: ["rtl", "ltr", "ttb", "btt"],
      default: "rtl",
    },
    visible: {
      type: Boolean,
      default: false,
      repeatable: true,
      observer: newVal => {
        if (!newVal && this.beforeClose && this.status !== this.visible) {
          this.visible = !newVal;
          this.#handleBeforeClose();
          return;
        }

        if (newVal) {
          timeout(() => this.focus(), 0);
        }

        if (newVal || !this.beforeClose) {
          this.status = newVal;
        }
      },
    },
    "with-header": {
      type: Boolean,
      default: true,
      observer: newVal => {
        this.#header.style.display = newVal ? "flex" : "none";
      },
    },
    title: {
      type: String,
      default: "",
      observer: newVal => {
        if (this["with-header"]) {
          this.#title.textContent = newVal;
        }
      },
    },
    showClose: {
      type: Boolean,
      default: true,
      observer: newVal => {
        this.#AbortControllerStates.showClose?.abort();
        this.#AbortControllerStates.showClose = null;

        if (this["with-header"]) {
          this.#closeIcon.style.display = newVal ? "block" : "none";
        }

        if (newVal) {
          this.#AbortControllerStates.showClose = new AbortController();
          this.#closeIcon.addEventListener("click", this.#handleBeforeClose, {
            signal: this.#AbortControllerStates.showClose.signal,
          });
        }
      },
    },
    size: {
      type: String,
      default: "30%",
      observer: newVal => {
        this.style.setProperty("--ea-drawer-size", newVal);
      },
    },
    "append-to-body": {
      type: Boolean,
      default: false,
    },
    "close-on-press-escape": {
      type: Boolean,
      default: true,
      observer: newVal => {
        this.#AbortControllerStates.closeOnPressEscape?.abort();
        this.#AbortControllerStates.closeOnPressEscape = null;

        if (newVal) {
          this.#AbortControllerStates.closeOnPressEscape =
            new AbortController();

          document.addEventListener("keydown", this.#handleKeydown, {
            signal: this.#AbortControllerStates.closeOnPressEscape.signal,
          });
        }
      },
    },
  });

  funcStates = this.properties({
    beforeClose: {
      rawFunction: true,
      props: true,
      type: Function,
      default: null,
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = `${super.updateContainerClasslist()} ${this.computedClasslist(
      "ea-drawer",
      {
        ["--" + this.direction]: this.direction,
      },
      {
        drawer: true,
      }
    )}`;

    this.#container.className = className;

    return className;
  }

  constructor() {
    super();

    if (this["append-to-body"]) document.body.appendChild(this);

    const contentContainer = this.shadowRoot.querySelector(
      ".ea-overlay__content"
    );
    this.#initDrawerDOM(contentContainer);
  }

  /**
   * 初始化抽屉 DOM 结构
   * @param {HTMLElement} container - 抽屉内容容器
   */
  #initDrawerDOM = container => {
    container.innerHTML = `
      <div class="ea-drawer-main" part="container">
        <header class="ea-drawer-main__header" part="header">
          <span class="ea-drawer-main__title" part="title">
            <slot name="title"></slot>
          </span>
          <ea-icon class="ea-drawer-main__close-icon" name="xmark" part="close-icon"></ea-icon>
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

  /**
   * 处理抽屉关闭前的回调
   */
  #handleBeforeClose = () => {
    if (this.beforeClose) {
      this.beforeClose(() => {
        this.status = false;
        this.visible = false;
      });
    } else {
      this.status = false;
      this.visible = false;
    }
  };

  /**
   * 处理键盘事件
   * @param {KeyboardEvent} e - 键盘事件对象
   */
  #handleKeydown = e => {
    if (e.key === "Escape" && this.visible) {
      this.#handleBeforeClose();
    }
  };

  connectedCallback() {
    this.#abortController?.abort();
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

    if (this["show-close"]) {
      this.#AbortControllerStates.showClose?.abort();
      this.#AbortControllerStates.showClose = new AbortController();
      this.#closeIcon.addEventListener("click", this.#handleBeforeClose, {
        signal: this.#AbortControllerStates.showClose.signal,
      });
    }

    super.connectedCallback();
    this.assignedStyle(stylesheet);
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
    for (const key in this.#AbortControllerStates) {
      this.#AbortControllerStates[key]?.abort();
      this.#AbortControllerStates[key] = null;
    }
  }
}

if (!window.customElements.get("ea-drawer")) {
  window.customElements.define("ea-drawer", EaDrawer);
}
