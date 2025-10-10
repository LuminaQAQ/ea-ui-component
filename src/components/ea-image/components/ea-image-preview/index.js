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
  /** @type {HTMLElement} */
  #closeIcon;
  /** @type {HTMLElement} */
  #prevIcon;
  /** @type {HTMLElement} */
  #nextIcon;
  /** @type {HTMLElement} */
  #zoomInIcon;
  /** @type {HTMLElement} */
  #zoomOutIcon;
  /** @type {HTMLElement} */
  #rotateLeftIcon;
  /** @type {HTMLElement} */
  #rotateRightIcon;

  /** @type {AbortController} */
  #imgAbortController;
  /** @type {AbortController} */
  #abortController;

  #states = {
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
        this.index = this["initial-index"];
      },
    },
    index: {
      type: Number,
      default: () => this["initial-index"],
      observer: (newVal) => {
        if (this.infinite) {
          if (!this["url-list"].length) return;

          this;
        }

        const src = this.#states.urlList[newVal];
        this.#imgContent.innerHTML = "";

        if (src) {
          this.#imgContent.innerHTML = EaUtils.EaElement.h(
            "ea-image",
            "ea-image-preview__img",
            {
              src,
              fit: "contain",
            },
            `
              <slot name="viewer-error" slot="error"></slot>
            `
          );

          const img = this.#imgContent.querySelector(".ea-image-preview__img");
          this.#imgAbortController?.abort();
          this.#imgAbortController = new AbortController();
          img.addEventListener(
            "error",
            (e) => {
              this.#states.status = "error";
              this.#container.classList.add("ea-image-preview--error");
              this.#imgAbortController.abort();
            },
            {
              once: true,
              signal: this.#imgAbortController.signal,
            }
          );
          img.addEventListener(
            "load",
            () => {
              this.#states.status = "success";
              this.classList.add("ea-image-preview--success");
              this.#imgAbortController.abort();
            },
            {
              once: true,
              signal: this.#imgAbortController.signal,
            }
          );
        }
      },
    },
    "zoom-rate": {
      type: Number,
      default: 0.2,
      observer: (newVal) => {},
    },
    infinite: {
      type: Boolean,
      default: true,
      observer: (newVal) => {},
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

    this.#container.innerHTML =
      this.#container.innerHTML +
      `
      <header class="ea-image-preview__header" part="header">
        <ea-icon class="ea-image-preview__icon close-icon" icon="icon-cancel" part="icon close-icon"></ea-icon>
      </header>
      <main class="ea-image-preview__main" part="main">
        <ea-icon class="ea-image-preview__icon prev-icon" icon="icon-angle-left" part="icon prev-icon"></ea-icon>
        <ea-icon class="ea-image-preview__icon next-icon" icon="icon-angle-right" part="icon next-icon"></ea-icon>
      </main>
      <footer class="ea-image-preview__footer">
        <section class="ea-image-preview__progress">
          <slot name="progress"></slot>
        </section>
        <section class="ea-image-preview__toolbar" part="toolbar">
          <ea-icon class="ea-image-preview__icon zoom-out-icon" icon="icon-zoom-out" part="icon zoom-out-icon"></ea-icon>
          <ea-icon class="ea-image-preview__icon zoom-in-icon" icon="icon-zoom-in" part="icon zoom-in-icon"></ea-icon>
          <ea-icon class="ea-image-preview__icon rotate-left-icon" icon="icon-ccw" part="icon rotate-left-icon"></ea-icon>
          <ea-icon class="ea-image-preview__icon rotate-right-icon" icon="icon-cw" part="icon rotate-right-icon"></ea-icon>
          <slot name="toolbar"></slot>
        </section>
      </footer>
    `;

    this.#content = this.shadowRoot.querySelector(".ea-overlay__content");
    this.#mask = this.shadowRoot.querySelector(".ea-overlay__mask");
    this.#imgContent = this.shadowRoot.querySelector(".ea-overlay__content");
    this.#closeIcon = this.shadowRoot.querySelector(".close-icon");
    this.#prevIcon = this.shadowRoot.querySelector(".prev-icon");
    this.#nextIcon = this.shadowRoot.querySelector(".next-icon");
    this.#zoomInIcon = this.shadowRoot.querySelector(".zoom-in-icon");
    this.#zoomOutIcon = this.shadowRoot.querySelector(".zoom-out-icon");
    this.#rotateLeftIcon = this.shadowRoot.querySelector(".rotate-left-icon");
    this.#rotateRightIcon = this.shadowRoot.querySelector(".rotate-right-icon");
  }

  connectedCallback() {
    super.connectedCallback();
    this.assignedStyle(stylesheet);

    this.#abortController = new AbortController();

    // this.index = this.index;

    // console.log(this);

    this.#closeIcon.addEventListener(
      "click",
      () => {
        this.hide();
        this.visible = false;
      },
      {
        signal: this.#abortController.signal,
      }
    );

    this.#prevIcon.addEventListener(
      "click",
      () => {
        this.index--;
      },
      {
        signal: this.#abortController.signal,
      }
    );

    this.#nextIcon.addEventListener(
      "click",
      () => {
        this.index++;
      },
      {
        signal: this.#abortController.signal,
      }
    );

    this.#zoomInIcon.addEventListener("click", () => {
      const currentZoom = parseFloat(
        this.#imgContent.style.getPropertyValue("--ea-image-preview-scale") || 1
      ).toFixed(3);

      this.#imgContent.style.setProperty(
        "--ea-image-preview-scale",
        Number(currentZoom) + this["zoom-rate"]
      );
    });

    this.#zoomOutIcon.addEventListener("click", () => {
      const currentZoom = parseFloat(
        this.#imgContent.style.getPropertyValue("--ea-image-preview-scale") || 1
      ).toFixed(3);

      if (Number(currentZoom) > this["zoom-rate"])
        this.#imgContent.style.setProperty(
          "--ea-image-preview-scale",
          Number(currentZoom) - this["zoom-rate"]
        );
    });

    this.#rotateLeftIcon.addEventListener("click", () => {
      const currentRotate = Number(
        this.#imgContent.style
          .getPropertyValue("--ea-image-preview-rotate")
          .split("deg")[0] || 0
      );

      this.#imgContent.style.setProperty(
        "--ea-image-preview-rotate",
        currentRotate - 90 + "deg"
      );
    });
    this.#rotateRightIcon.addEventListener("click", () => {
      const currentRotate = Number(
        this.#imgContent.style
          .getPropertyValue("--ea-image-preview-rotate")
          .split("deg")[0] || 0
      );

      this.#imgContent.style.setProperty(
        "--ea-image-preview-rotate",
        currentRotate + 90 + "deg"
      );
    });

    this.dispatchEvent("ea-image-ready");
  }

  $beforeUnmounted() {
    this.#abortController.abort();
  }
}

if (!window.customElements.get("ea-image-preview")) {
  window.customElements.define("ea-image-preview", EaImagePreview);
}
