import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";

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
      "hide-on-click-modal",
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
      observer: async newVal => {
        const img = new Image();
        this.updateContainerClasslist();

        if (this.lazy) {
          const observer = new IntersectionObserver(entries => {
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

          this.emit("load");
        };

        img.onerror = () => {
          this.#states.imageStatus = "error";
          this.updateContainerClasslist();

          this.emit("error");
        };
      },
    },
    width: {
      type: String,
      default: "",
      observer: newVal => {
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
      observer: newVal => {
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
      observer: newVal => {
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
      observer: newVal => {
        this.#image.alt = newVal;
      },
    },
    loading: {
      type: ["lazy", "eager"],
      default: "eager",
      observer: newVal => {
        this.#image.setAttribute("loading", newVal);
      },
    },
    referrerpolicy: {
      type: String,
      default: "",
      observer: newVal => {
        this.#image.setAttribute("referrerpolicy", newVal);
      },
    },
    crossorigin: {
      type: String,
      default: "",
      observer: newVal => {
        this.#image.setAttribute("sizes", newVal);
      },
    },
    lazy: {
      type: Boolean,
      default: false,
      observer: () => {},
    },

    preview: {
      type: Boolean,
      default: false,
      observer: async newVal => {
        if (newVal) {
          await import("@/components/ea-image-preview/index.js");
        }
      },
    },
    "hide-on-click-modal": {
      type: Boolean,
      default: false,
      observer: async newVal => {
        if (!this.preview) return;

        await customElements.whenDefined("ea-image-preview");

        this.#imagePreview["hide-on-click-modal"] = newVal;
      },
    },
    "z-index": {
      type: Number,
      default: 2000,
      observer: async newVal => {
        if (!this.preview) return;

        await customElements.whenDefined("ea-image-preview");

        this.#imagePreview["z-index"] = newVal;
      },
    },
    "initial-index": {
      type: Number,
      default: 0,
      observer: async newVal => {
        if (!this.preview) return;

        await customElements.whenDefined("ea-image-preview");

        this.#imagePreview["initial-index"] = newVal;
      },
    },
    "close-on-press-escape": {
      type: Boolean,
      default: true,
      observer: async newVal => {
        if (!this.preview) return;

        await customElements.whenDefined("ea-image-preview");

        this.#imagePreview["close-on-press-escape"] = newVal;
      },
    },
    infinite: {
      type: Boolean,
      default: true,
      observer: async newVal => {
        if (!this.preview) return;

        await customElements.whenDefined("ea-image-preview");

        this.#imagePreview["infinite"] = newVal;
      },
    },
    "zoom-rate": {
      type: Number,
      default: 1.2,
      observer: async newVal => {
        if (!this.preview) return;

        await customElements.whenDefined("ea-image-preview");

        this.#imagePreview["zoom-rate"] = newVal;
      },
    },
    scale: {
      type: Number,
      default: 1,
      observer: async newVal => {
        if (!this.preview) return;

        await customElements.whenDefined("ea-image-preview");

        this.#imagePreview.scale = newVal;
      },
    },
    "min-scale": {
      type: Number,
      default: 0.2,
      observer: async newVal => {
        if (!this.preview) return;

        await customElements.whenDefined("ea-image-preview");

        this.#imagePreview["min-scale"] = newVal;
      },
    },
    "max-scale": {
      type: Number,
      default: 7,
      observer: async newVal => {
        if (!this.preview) return;

        await customElements.whenDefined("ea-image-preview");

        this.#imagePreview["max-scale"] = newVal;
      },
    },
    "show-progress": {
      type: Boolean,
      default: false,
      observer: async newVal => {
        if (!this.preview) return;

        await customElements.whenDefined("ea-image-preview");

        this.#imagePreview["show-progress"] = newVal;
      },
    },
  });

  propState = this.properties({
    previewSrcList: {
      props: true,
      type: Array,
      default: () => [],
      /** @param {String[]} newVal */
      observer: async newVal => {
        if (!this.preview)
          return console.warn("[EaImage] Preview is not enabled.");

        await customElements.whenDefined("ea-image-preview");

        this.#imagePreview.urlList = newVal;
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
        <slot name='progress' slot="progress"></slot>
        <slot name='toolbar' slot="toolbar"></slot>
        <slot name='progress' slot="progress"></slot>
      </ea-image-preview>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-image");
    this.#image = this.shadowRoot.querySelector(".ea-image__image");
    this.#error = this.shadowRoot.querySelector(".ea-image__error");
    this.#placeholder = this.shadowRoot.querySelector(".ea-image__placeholder");
    this.#imagePreview = this.shadowRoot.querySelector(".ea-image-preview");
  }

  /**
   * 设置当前项
   * @param {Number} index
   */
  setActiveItem = index => {
    if (!this.preview) return;

    this.#imagePreview.setActiveItem(index);
  };

  /**
   * 重置预览器的所有状态
   */
  reset = () => {
    if (!this.preview) return;

    this.#imagePreview.reset();
  };

  /**
   * 显示预览（ea-image-preview）
   */
  showPreview = () => {
    this.#imagePreview.visible = true;
  };

  async connectedCallback() {
    super.connectedCallback();

    this.#abortController?.abort();
    this.#abortController = new AbortController();

    if (!this.getAttribute("src")) this.setAttribute("src", "");

    if (this.preview) {
      await customElements.whenDefined("ea-image-preview");

      this.#container.addEventListener(
        "click",
        () => {
          this.showPreview();
        },
        { signal: this.#abortController.signal }
      );
    }
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
  }
}

if (!window.customElements.get("ea-image")) {
  window.customElements.define("ea-image", EaImage);
}
