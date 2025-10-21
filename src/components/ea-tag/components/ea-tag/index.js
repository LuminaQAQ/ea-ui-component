import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";

import { componentSizes, componentTypes } from "@/utils/Variables";
import EaUtils from "@/utils/Utils";

export class EaTag extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement | null} */
  #closeIcon;
  /** @type {AbortController} */
  #abortController;

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "type",
      "closable",
      "disable-transitions",
      "hit",
      "color",
      "size",
      "effect",
      "round",
    ];
  }

  state = this.properties({
    type: {
      type: componentTypes,
      default: "primary",
      observer: (newVal) => {
        this.updateContainerClasslist();
      },
    },
    closable: {
      type: Boolean,
      default: false,
      observer: (newVal) => {
        this.updateContainerClasslist();
      },
    },
    "disable-transitions": {
      type: Boolean,
      default: false,
      observer: (newVal) => {},
    },
    hit: {
      type: Boolean,
      default: false,
      observer: (newVal) => {},
    },
    color: {
      type: String,
      default: "",
      observer: (newVal) => {
        if (!CSS.supports("background", newVal))
          return console.warn(
            `[EaTag] The color value ${newVal} is not supported.`
          );
        
        this.#container.style.background = newVal;
      },
    },
    size: {
      type: componentSizes,
      default: "default",
      observer: (newVal) => {
        this.updateContainerClasslist();
      },
    },
    effect: {
      type: ["dark", "light", "plain"],
      default: "light",
      observer: (newVal) => {},
    },
    round: {
      type: Boolean,
      default: false,
      observer: (newVal) => {},
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist(
      "ea-tag",
      {
        ["--" + this.type]: this.type,
        [`--${this.size}-size`]: this.size,
        ["--" + this.effect]: this.effect,
      },
      {
        closable: this.closable,
        round: this.round,
      }
    );

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
      <div class='ea-tag' part='container'>
        <slot></slot>
        ${
          this.closable
            ? `<ea-icon class="ea-tag__close" part="close-icon" icon="icon-cancel"></ea-icon>`
            : ""
        }
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-tag");
    this.#closeIcon = this.shadowRoot.querySelector(".ea-tag__close");

    this.#abortController = new AbortController();

    this.#handleClose();
    this.updateContainerClasslist();
  }

  #handleClose = () => {
    if (!this.closable || !this.#closeIcon) return;

    this.#closeIcon.addEventListener(
      "click",
      async (e) => {
        if (!this["disable-transitions"]) {
          this.#container.classList.add("before-close");
          await EaUtils.EaElement.addAsyncEventListener(
            this.#container,
            "transitionend"
          );
        }

        this.remove();
        this.emit("close", { detail: { text: this.textContent } });
      },
      {
        signal: this.#abortController.signal,
      }
    );
  };

  connectedCallback() {
    super.connectedCallback();
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
  }
}

if (!window.customElements.get("ea-tag")) {
  window.customElements.define("ea-tag", EaTag);
}
