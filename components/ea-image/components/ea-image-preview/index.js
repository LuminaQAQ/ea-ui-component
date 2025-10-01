import { EaOverlay } from "@/common/ea-overlay";
import { EaImage } from "../ea-image/index.js";

import stylesheet from "./index.scss?inline";
import EaUtils from "@/utils/Utils.js";

export class EaImagePreview extends EaOverlay {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #content;
  /** @type {HTMLElement} */
  #imgContent;
  /** @type {HTMLElement} */
  #mask;

  /** @type {AbortController} */
  #abortController;

  #states = {
    index: this["initial-index"],
    urlList: [],
    /** @type {"loading" | "success" | "error"} */
    status: "loading",
  };

  static get observedAttributes() {
    return [
      ...super.observedAttributes,

      "visible",
      "index",
      "url-list",
      "z-index",
      "initial-index",
      "close-on-press-escape",
      "infinite",
      "zoom-rate",
      "scale",
      "min-scale",
      "max-scale",
      "show-progress",
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
    "initial-index": {
      type: Number,
      default: 0,
      observer: () => {},
    },
    "url-list": {
      type: Array,
      default: [],
      /** @param {String[]} newVal */
      observer: (newVal) => {
        this.#states.urlList = newVal;
      },
    },
    index: {
      type: Number,
      default: () => this["initial-index"],
      observer: (newVal) => {
        const src = this.#states.urlList[newVal];
        this.#imgContent.innerHTML = "";

        if (src) {
          this.#imgContent.innerHTML = EaUtils.EaElement.h(
            "ea-image",
            "ea-image-preview__img",
            {
              src,
            },
            `
              <slot name="viewer-error" slot="error"></slot>
            `
          );

          const img = this.#imgContent.querySelector(".ea-image-preview__img");
          this.#abortController?.abort();
          this.#abortController = new AbortController();
          img.addEventListener(
            "error",
            (e) => {
              this.#states.status = "error";
              this.#container.classList.add("ea-image-preview--error");
              this.#abortController.abort();
            },
            {
              once: true,
              signal: this.#abortController.signal,
            }
          );
          img.addEventListener(
            "load",
            () => {
              this.#states.status = "success";
              this.classList.add("ea-image-preview--success");
              this.#abortController.abort();
            },
            {
              once: true,
              signal: this.#abortController.signal,
            }
          );
        }
      },
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = `${super.updateContainerClasslist()} ${this.computedClasslist(
      "ea-image-preview",
      {
        ["--" + this.#states.status]: this.#states.status,
      }
    )}`;

    this.#container.className = className;

    return className;
  }

  constructor() {
    super();

    this.#container = this.shadowRoot.querySelector(".ea-overlay");
    this.#content = this.shadowRoot.querySelector(".ea-overlay__content");
    this.#mask = this.shadowRoot.querySelector(".ea-overlay__mask");

    this.#content.innerHTML = `
      <section class="ea-image-preview__placeholder" part="placeholder"> 
      </section>
    `;

    this.#mask.innerHTML = `
      <header class="ea-image-preview__header" part="header">
        <ea-icon class="ea-image-preview__icon" icon="icon-cancel" part="icon"></ea-icon>
      </header>
      <main class="ea-image-preview__main" part="main">
        <ea-icon class="ea-image-preview__icon" icon="icon-angle-left" part="icon"></ea-icon>
        <ea-icon class="ea-image-preview__icon" icon="icon-angle-right" part="icon"></ea-icon>
      </main>
      <footer class="ea-image-preview__footer">
        <section class="ea-image-preview__progress">
          <slot name="progress"></slot>
        </section>
        <section class="ea-image-preview__toolbar" part="toolbar">
          <ea-icon class="ea-image-preview__icon" icon="icon-plus" part="icon"></ea-icon>
          <ea-icon class="ea-image-preview__icon" icon="icon-minus" part="icon"></ea-icon>
          <ea-icon class="ea-image-preview__icon" part="icon">↺</ea-icon>
          <ea-icon class="ea-image-preview__icon" part="icon">↻</ea-icon>
          <slot name="toolbar"></slot>
        </section>
      </footer>
    `;

    this.#imgContent = this.shadowRoot.querySelector(
      ".ea-image-preview__placeholder"
    );
  }

  connectedCallback() {
    super.connectedCallback();
    this.assignedStyle(stylesheet);

    this.index = this.index;
  }
}

if (!window.customElements.get("ea-image-preview")) {
  window.customElements.define("ea-image-preview", EaImagePreview);
}
