import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";
import EaUtils from "@/utils/Utils";

export class EaOption extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {AbortController} */
  #abortController = new AbortController();

  static get observedAttributes() {
    return [...super.observedAttributes, "value"];
  }

  state = this.properties({
    value: {
      type: {
        Number: () => this.getAttrNumber("value", null),
        Boolean: () =>
          EaUtils.Boolean.isBoolean(this.getAttrBoolean("value", null)),
        String: () => this.getAttrString("value", "") || true,
      },
      default: "",
      observer: newVal => {},
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist("ea-option", {
      // ['--' + this.type]: this.type,
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
      <div class='ea-option' part='container'>
        <slot></slot>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-option");
  }

  connectedCallback() {
    super.connectedCallback();

    this.#abortController?.abort();
    this.#abortController = new AbortController();

    this.addEventListener(
      "click",
      e => {
        e.preventDefault();

        this.emit("ea-option-click", {
          detail: {
            value: this.value,
            target: e.target,
          },
          bubbles: true,
          composed: true,
        });
      },
      { signal: this.#abortController.signal }
    );
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
  }
}

if (!window.customElements.get("ea-option")) {
  window.customElements.define("ea-option", EaOption);
}
