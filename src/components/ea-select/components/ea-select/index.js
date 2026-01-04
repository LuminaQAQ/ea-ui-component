import FormAssociatedBase from "@/core/FormBase";
import "@components/ea-input/index.js";

import stylesheet from "./index.scss?inline";

export class EaSelect extends FormAssociatedBase {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #input;
  /** @type {HTMLElement} */
  #dropdown;

  /** @type {AbortController} */
  #abortController = new AbortController();

  #states = {
    isFocus: false,
  };

  static get observedAttributes() {
    return [...super.observedAttributes, "value"];
  }

  state = this.properties({
    // value: {
    //   type: String,
    //   default: "",
    //   observer: newVal => {},
    // },
  });

  propStates = this.properties({
    value: {
      props: true,
      type: {
        String: () => typeof this.props?.value === "string",
        Number: () => typeof this.props?.value === "number",
        Boolean: () => typeof this.props?.value === "boolean",
        Array: () => Array.isArray(this.props?.value),
        Object: () =>
          typeof this.props?.value === "object" && this.props?.value !== null,
      },
      default: "",
      observer: newVal => {
        this.setValue(newVal);
      },
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist(
      "ea-select",
      {
        // ['--' + this.type]: this.type,
      },
      {
        focus: this.#states.isFocus,
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
      <div class='ea-select' part='container'>
        <ea-input class="ea-select__input" part="input" readonly>
          <ea-icon class="ea-select__dropdown-icon" part="dropdown-icon" slot="suffix" icon='icon-angle-down'></ea-icon>
        </ea-input>
        <section class="ea-select__dropdown" part="dropdown">
          <slot></slot>
        </section>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-select");
    this.#input = this.shadowRoot.querySelector(".ea-select__input");
    this.#dropdown = this.shadowRoot.querySelector(".ea-select__dropdown");
  }

  async connectedCallback() {
    super.connectedCallback();

    await customElements.whenDefined("ea-input");

    this.#abortController?.abort();
    this.#abortController = new AbortController();

    document.addEventListener(
      "click",
      e => {
        e.preventDefault();
        e.stopImmediatePropagation();

        if (!this.multiple) {
          this.#states.isFocus =
            this.contains(e.target) &&
            e.target.tagName.toLowerCase() !== "ea-option";
        } else {
          this.#states.isFocus = this.contains(e.target);
        }

        this.updateContainerClasslist();
      },
      { signal: this.#abortController.signal }
    );

    this.addEventListener(
      "ea-option-click",
      e => {
        e.preventDefault();
        e.stopImmediatePropagation();

        const { value, target } = e.detail;

        if (!this.multiple) {
          this.#states.isFocus = false;
          this.updateContainerClasslist();
        }

        this.value = value;
        this.#input.value = value;
      },
      { signal: this.#abortController.signal }
    );
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
  }
}

if (!window.customElements.get("ea-select")) {
  window.customElements.define("ea-select", EaSelect);
}
