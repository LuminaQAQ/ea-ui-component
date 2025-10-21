import Base from "@components/Base.js";

import { componentTypes } from "@/utils/Variables";

import stylesheet from "./index.scss?inline";

export class EaCheckTag extends Base {
  /** @type {HTMLElement} */
  #container;

  static get observedAttributes() {
    return [...super.observedAttributes, "checked", "disabled", "type"];
  }

  state = this.properties({
    checked: {
      type: Boolean,
      default: false,
      observer: (newVal) => {
        this.updateContainerClasslist();
      },
    },
    disabled: {
      type: Boolean,
      default: false,
      observer: (newVal) => {
        this.updateContainerClasslist();
      },
    },
    type: {
      type: componentTypes,
      default: "primary",
      observer: (newVal) => {
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

    this.#container.addEventListener("click", () => {
      if (this.disabled) return;

      this.checked = !this.checked;
      this.emit("change", { detail: { checked: this.checked } });
    });
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

if (!window.customElements.get("ea-check-tag")) {
  window.customElements.define("ea-check-tag", EaCheckTag);
}
