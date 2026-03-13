import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";

import { componentSizes, componentTypes } from "@/utils/Variables";
import EaUtils from "@/utils/Utils";
import { EaTagRemoveEvent } from "../../events/EaTagRemoveEvent";

export class EaTag extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement | null} */
  #closeIcon;
  /** @type {AbortController} */
  #closableAbortController;

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "type",
      "closable",
      "disable-transitions",
      "color",
      "size",
      "effect",
      "round",
    ];
  }

  state = this.properties({
    type: {
      type: ["primary", "info", "success", "warning", "danger"],
      default: "primary",
      observer: newVal => {
        this.updateContainerClasslist();
      },
    },
    closable: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.#closableAbortController?.abort();

        this.#closeIcon.setAttribute("closable", newVal ? "icon-cancel" : "");

        this.updateContainerClasslist();

        if (newVal) {
          this.#closableAbortController = new AbortController();
          this.#closeIcon.addEventListener("click", this.#onTagRemoveEvent, {
            signal: this.#closableAbortController.signal,
          });
        }
      },
    },
    "disable-transitions": {
      type: Boolean,
      default: false,
      observer: newVal => {},
    },
    color: {
      type: String,
      default: "",
      observer: newVal => {
        if (newVal && CSS.supports("background", newVal))
          this.#container.style.background = newVal;
        else this.#container.style.background = "";

        if (!CSS.supports("background", newVal))
          return console.warn(
            `[EaTag] The color value ${newVal} is not supported.`
          );
      },
    },
    size: {
      type: componentSizes,
      default: "default",
      observer: newVal => {
        this.updateContainerClasslist();
      },
    },
    effect: {
      type: ["dark", "light", "plain"],
      default: "light",
      observer: newVal => {
        this.updateContainerClasslist();
      },
    },
    round: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.updateContainerClasslist();
      },
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
        <ea-icon class="ea-tag__close" part="close-icon" icon="icon-cancel"></ea-icon>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-tag");
    this.#closeIcon = this.shadowRoot.querySelector(".ea-tag__close");

    this.updateContainerClasslist();
  }

  /**
   * 标签移除事件
   */
  #onTagRemoveEvent = async () => {
    if (!this["disable-transitions"]) {
      this.#container.classList.add("before-close");
      await EaUtils.EaElement.addAsyncEventListener(
        this.#container,
        "transitionend"
      );
    }

    this.dispatchEvent(new EaTagRemoveEvent({ text: this.textContent }));

    this.remove();
  };

  connectedCallback() {
    super.connectedCallback();
  }

  $beforeUnmounted() {
    this.#closableAbortController?.abort();
  }
}

if (!window.customElements.get("ea-tag")) {
  window.customElements.define("ea-tag", EaTag);
}
