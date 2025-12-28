import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";

export class EaPageHeader extends Base {
  /** @type {HTMLElement} */
  #backEl;
  /** @type {HTMLSlotElement} */
  #backIconSlot;
  /** @type {HTMLSlotElement} */
  #titleSlot;
  /** @type {HTMLSlotElement} */
  #contentSlot;
  /** @type {AbortController} */
  #abortController = new AbortController();

  static get observedAttributes() {
    return [...super.observedAttributes, "icon", "title", "content"];
  }

  state = this.properties({
    icon: {
      type: String,
      default: "",
      observer: newVal => {
        const iconEl = this.#backIconSlot.querySelector("ea-icon");
        if (iconEl) {
          iconEl.setAttribute("icon", newVal);
        }
      },
    },
    title: {
      type: String,
      default: "",
      observer: newVal => {
        this.#titleSlot.textContent = newVal;
      },
    },
    content: {
      type: String,
      default: "",
      observer: newVal => {
        this.#contentSlot.textContent = newVal;
      },
    },
  });

  constructor() {
    super();

    this.stylesheet = stylesheet;

    this.$render();
  }

  $render() {
    this.shadowRoot.innerHTML = `
      <div class='ea-page-header' part='container'>
        <section class="ea-page-header__breadcrumb" part="breadcrumb">
          <slot name="breadcrumb"></slot>
        </section>
        <section class="ea-page-header__wrapper" part="header-wrapper">
          <div class="ea-page-header__back" part="back">
            <span class="ea-page-header__icon" part="icon">
              <slot name="icon">
                <ea-icon icon="icon-angle-left" part="back-icon"></ea-icon>
              </slot>
            </span>
            <span class="ea-page-header__title" part="title">
                <slot name="title">Back</slot>
            </span>
          </div>
          <ea-icon class="ea-page-header__divider" part="divider">|</ea-icon>
          <div class="ea-page-header__content" part="content">
            <slot name="content"></slot>
          </div>
          <div class="ea-page-header__extra" part="extra">
            <slot name="extra"></slot>
          </div>
        </section>
        <slot></slot>
      </div>
    `;

    this.#backEl = this.shadowRoot.querySelector(".ea-page-header__back");
    this.#backIconSlot = this.shadowRoot.querySelector(
      ".ea-page-header__icon slot[name='icon']"
    );
    this.#titleSlot = this.shadowRoot.querySelector(
      ".ea-page-header__title slot[name='title']"
    );
    this.#contentSlot = this.shadowRoot.querySelector(
      ".ea-page-header__content slot[name='content']"
    );
  }

  /**
   * 点击返回按钮时，派发 back 事件
   */
  #onBackEvent = () => {
    this.emit("back");
  };

  connectedCallback() {
    super.connectedCallback();

    this.#abortController?.abort();
    this.#abortController = new AbortController();

    this.#backEl.addEventListener("click", this.#onBackEvent, {
      signal: this.#abortController.signal,
    });
  }

  $beforeUnmounted() {
    this.#abortController.abort();
  }
}

if (!window.customElements.get("ea-page-header")) {
  window.customElements.define("ea-page-header", EaPageHeader);
}
