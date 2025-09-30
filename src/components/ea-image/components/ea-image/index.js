import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";

import { errorImageSVG } from "../../assets/errorImageSVG";

export class EaImage extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLImageElement} */
  #image;
  /** @type {HTMLElement} */
  #error;
  /** @type {HTMLElement} */
  #placeholder;

  #states = {
    /** @type {"loading" | "error" | "success"} */
    imageStatus: "loading",
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
      "lazy",
    ];
  }

  state = this.properties({
    src: {
      type: String,
      default: "",
      observer: (newVal) => {
        const img = new Image();
        img.src = newVal;
        this.updateContainerClasslist();

        img.onload = () => {
          this.#image.setAttribute("src", newVal);
          this.#states.imageStatus = "success";
          this.updateContainerClasslist();
        };

        img.onerror = () => {
          this.#states.imageStatus = "error";
          this.updateContainerClasslist();
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
    lazy: {
      type: Boolean,
      default: false,
      observer: (newVal) => {
        this.#image.setAttribute("loading", newVal ? "lazy" : "eager");
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
    `;

    this.#container = this.shadowRoot.querySelector(".ea-image");
    this.#image = this.shadowRoot.querySelector(".ea-image__image");
    this.#error = this.shadowRoot.querySelector(".ea-image__error");
    this.#placeholder = this.shadowRoot.querySelector(".ea-image__placeholder");
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

if (!window.customElements.get("ea-image")) {
  window.customElements.define("ea-image", EaImage);
}
