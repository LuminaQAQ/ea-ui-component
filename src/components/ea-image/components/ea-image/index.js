import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";
import EaUtils from "@/utils/Utils";

export class EaImage extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLImageElement} */
  #image;
  /** @type {HTMLElement} */
  #error;
  /** @type {HTMLElement} */
  #placeholder;
  /** @type {EaImagePreview} */
  #imagePreview;

  /** @type {AbortController} */
  #abortController;

  #states = {
    /** @type {"loading" | "error" | "success"} */
    imageStatus: "loading",
    previewQueue: [],
  };

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "width",
      "height",
      "src",
      "fit",
      "alt",
      "referrerpolicy",
      "crossorigin",
      "loading",
      "lazy",

      "preview",
      "preview-src-list",
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
    src: {
      type: String,
      default: "",
      observer: async (newVal) => {
        const img = new Image();
        this.updateContainerClasslist();

        if (this.lazy) {
          const observer = new IntersectionObserver((entries) => {
            if (entries[0].intersectionRatio <= 0) return;

            observer.disconnect();
            img.src = this.src;
          });

          observer.observe(this);
        } else {
          img.src = newVal;
        }

        img.onload = () => {
          this.#image.setAttribute("src", newVal);
          this.#states.imageStatus = "success";
          this.updateContainerClasslist();

          this.dispatchEvent("load");
        };

        img.onerror = () => {
          this.#states.imageStatus = "error";
          this.updateContainerClasslist();

          this.dispatchEvent("error");
        };
      },
    },
    width: {
      type: String,
      default: "",
      observer: (newVal) => {
        if (!CSS.supports("width", newVal))
          return console.warn(
            `[EaImage] The width value ${newVal} is not supported.`
          );

        this.style.setProperty("--ea-image-width", newVal);
      },
    },
    height: {
      type: String,
      default: "",
      observer: (newVal) => {
        if (!CSS.supports("height", newVal))
          return console.warn(
            `[EaImage] The height value ${newVal} is not supported.`
          );

        this.style.setProperty("--ea-image-height", newVal);
      },
    },
    fit: {
      type: String,
      default: "",
      observer: (newVal) => {
        if (!CSS.supports("object-fit", newVal))
          return console.warn(
            `[EaImage] The object-fit value ${newVal} is not supported.`
          );

        this.style.setProperty("--ea-image-fit", newVal);
      },
    },
    alt: {
      type: String,
      default: "",
      observer: (newVal) => {
        this.#image.alt = newVal;
      },
    },
    loading: {
      type: ["lazy", "eager"],
      default: "eager",
      observer: (newVal) => {
        this.#image.setAttribute("loading", newVal);
      },
    },
    referrerpolicy: {
      type: String,
      default: "",
      observer: (newVal) => {
        this.#image.setAttribute("referrerpolicy", newVal);
      },
    },
    crossorigin: {
      type: String,
      default: "",
      observer: (newVal) => {
        this.#image.setAttribute("sizes", newVal);
      },
    },
    lazy: {
      type: Boolean,
      default: false,
      observer: (newVal) => {},
    },
    preview: {
      type: Boolean,
      default: false,
      observer: async (newVal) => {
        if (newVal) {
          await import("../ea-image-preview/index.js");
        }
      },
    },
    "preview-src-list": {
      type: Array,
      default: [],
      /** @param {String[]} newVal */
      observer: (newVal) => {
        if (!this.preview)
          return console.warn("[EaImage] Preview is not enabled.");

        // console.log(newVal);

        // this.#imagePreview.setAttribute("url-list", newVal);
        // this.#imagePreview.setAttribute("url-list", newVal);

        this.#states.previewQueue.push(
          () => (this.#imagePreview["url-list"] = newVal)
        );
      },
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist("ea-image", {
      [`--${this.#states.imageStatus}`]: this.#states.imageStatus,
    });

    this.#container.className = className;

    return className;
  }

  constructor() {
    super();

    this.stylesheet = stylesheet;

    this.$render();
  }

  $render() {
    this.shadowRoot.innerHTML = `
      <div class='ea-image' part='container'>
        <img class='ea-image__image' part='image' />
        <section class='ea-image__error' part='error'>
          <slot name='error'>FAILED</slot>
        </section>
        <section class='ea-image__placeholder' part='placeholder'>
          <slot name='placeholder'></slot>
        </section>
      </div>
      <ea-image-preview class="ea-image-preview" part='preview'>
      </ea-image-preview>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-image");
    this.#image = this.shadowRoot.querySelector(".ea-image__image");
    this.#error = this.shadowRoot.querySelector(".ea-image__error");
    this.#placeholder = this.shadowRoot.querySelector(".ea-image__placeholder");
    this.#imagePreview = this.shadowRoot.querySelector(".ea-image-preview");
  }

  showPreview = () => {
    // this.#imagePreview.show();
    this.#imagePreview.visible = true;
  };

  connectedCallback() {
    super.connectedCallback();

    if (!this.getAttribute("src")) this.setAttribute("src", "");

    if (this.preview) {
      this.#container.addEventListener("click", () => {
        this.showPreview();
      });

      this.#imagePreview.addEventListener("ea-image-ready", () => {
        this.#states.previewQueue.forEach((fn) => fn());
      });
    }
  }
}

if (!window.customElements.get("ea-image")) {
  window.customElements.define("ea-image", EaImage);
}
