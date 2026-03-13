import Base from "@components/Base.js";

import { componentTypes } from "@/utils/Variables";

import stylesheet from "./index.scss?inline";

export class EaCheckTag extends Base {
  /** @type {HTMLElement} */
  #container;

  /** @type {AbortController} */
  #abortController;

  static get observedAttributes() {
    return [...super.observedAttributes, "checked", "disabled", "type"];
  }

  state = this.properties({
    checked: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.updateContainerClasslist();
      },
    },
    disabled: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.updateContainerClasslist();
      },
    },
    type: {
      type: ["primary", "info", "success", "warning", "danger"],
      default: "primary",
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
      "ea-check-tag",
      {
        ["--" + this.type]: this.type && this.checked,
      },
      {
        disabled: this.disabled,
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
      <div class='ea-check-tag' part='container'>
        <slot></slot>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-check-tag");
  }

  /**
   * 点击切换选中状态
   */
  #onCheckChangeEvent = () => {
    if (this.disabled) return;

    this.checked = !this.checked;
    this.emit("change", { detail: { checked: this.checked } });
  };

  connectedCallback() {
    super.connectedCallback();

    this.#abortController?.abort();
    this.#abortController = new AbortController();

    this.#container.addEventListener("click", this.#onCheckChangeEvent, {
      signal: this.#abortController.signal,
    });
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
  }
}

if (!window.customElements.get("ea-check-tag")) {
  window.customElements.define("ea-check-tag", EaCheckTag);
}
