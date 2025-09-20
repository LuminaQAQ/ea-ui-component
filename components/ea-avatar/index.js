import Base from "@components/Base.js";
import EaUtils from "@/utils/Utils";
import { defaultAvatar, errorAvatar } from "./assets/avatarPlaceholder";

import stylesheet from "./index.scss?inline";

export class EaAvatar extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #content;

  /** @type {AbortController} */
  #srcController;

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "icon",
      "shape",
      "size",
      "src",
      "src-set",
      "alt",
      "fit",
    ];
  }

  state = this.properties({
    icon: {
      type: String,
      default: "",
      observer: (newVal) => {
        this.#content.innerHTML = `<ea-icon icon="${newVal}"></ea-icon>`;
      },
    },
    shape: {
      type: ["circle", "square"],
      default: "circle",
      observer: (newVal) => {
        this.#container.className = this.updateContainerClasslist();
      },
    },
    size: {
      type: String,
      default: "default",
      observer: (newVal) => {
        const isEnumValue = EaUtils.Enum.hasEnum(
          ["default", "small", "large"],
          newVal
        );
        const isCSSValue = CSS.supports("width", newVal);
        if (!isEnumValue && !isCSSValue) {
          this.size = "default";
          return console.warn(
            "[ea-avatar] Please set size to one of [default, small, large] or a valid CSS width value"
          );
        }

        this.style.setProperty(
          "--ea-avatar-size",
          isEnumValue ? `var(--ea-avatar-size-${newVal})` : newVal
        );
      },
    },
    src: {
      type: String,
      default: "",
      observer: (newVal) => {
        this.#srcController?.abort();
        this.#srcController = new AbortController();

        const image = new Image();
        image.src = newVal;

        image.addEventListener(
          "load",
          () => {
            this.#content.innerHTML = `<img class="ea-avatar__img" src="${newVal}" alt="${this.alt}" srcset="${this["src-set"]}" part="img-avatar" />`;
            this.#srcController?.abort();
          },
          { signal: this.#srcController.signal }
        );

        image.addEventListener(
          "error",
          (e) => {
            this.#content.innerHTML = errorAvatar;

            this.dispatchEvent("error", {
              detail: {
                error: e,
              },
            });

            this.#srcController?.abort();
          },
          { signal: this.#srcController.signal }
        );
      },
    },
    "src-set": {
      type: String,
      default: "",
      observer: (newVal) => {
        /** @type {HTMLImageElement} */
        const img = this.shadowRoot.querySelector(".ea-avatar__img");
        if (img) img.srcset = newVal;
      },
    },
    alt: {
      type: String,
      default: "",
      observer: (newVal) => {
        /** @type {HTMLImageElement} */
        const img = this.shadowRoot.querySelector(".ea-avatar__img");
        if (img) img.alt = newVal;
      },
    },
    fit: {
      type: ["fill", "contain", "cover", "none", "scale-down"],
      default: "cover",
      observer: (newVal) => {
        /** @type {HTMLImageElement} */
        const img = this.shadowRoot.querySelector(".ea-avatar__img");
        if (img) img.style.setProperty("--ea-avatar-fit", newVal);
      },
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    return this.computedClasslist("ea-avatar", {
      ["--" + this.shape]: this.shape,
    });
  }

  constructor() {
    super();

    this.stylesheet = stylesheet;

    this.$render();
  }

  $render() {
    this.shadowRoot.innerHTML = `
      <div class="ea-avatar" part='container'>
          <span class="ea-avatar__content" part="avatar">
              <slot></slot>
          </span>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-avatar");
    this.#content = this.shadowRoot.querySelector(".ea-avatar__content");
  }

  connectedCallback() {
    super.connectedCallback();

    this.#container.className = this.updateContainerClasslist();
  }
}

if (!window.customElements.get("ea-avatar")) {
  window.customElements.define("ea-avatar", EaAvatar);
}
