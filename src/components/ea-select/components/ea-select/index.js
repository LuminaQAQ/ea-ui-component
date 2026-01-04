import FormAssociatedBase from "@/core/FormBase";
import "@components/ea-input/index.js";

import stylesheet from "./index.scss?inline";
import EaUtils from "@/utils/Utils";

export class EaSelect extends FormAssociatedBase {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #input;
  /** @type {HTMLElement} */
  #dropdown;

  /** @type {AbortController} */
  #abortController = new AbortController();

  #AbortControllerStates = {
    /** @type {AbortController|null} */
    closeAbortController: null,
  };

  #states = {
    isFocus: false,
  };

  static get observedAttributes() {
    return [...super.observedAttributes, "name", "value", "placeholder"];
  }

  state = this.properties({
    name: {
      type: String,
      default: "",
      observer: newVal => {
        this.setAttribute("name", newVal);
      },
    },
    placeholder: {
      type: String,
      default: "",
      observer: async newVal => {
        await customElements.whenDefined("ea-input");

        this.#input.placeholder = newVal;
      },
    },
  });

  propStates = this.properties({
    value: {
      props: true,
      type: {
        String: () => typeof this.props?.value === "string",
        Number: () => typeof this.props?.value === "number",
        Boolean: () => typeof this.props?.value === "boolean",
        Array: () => this.multiple && Array.isArray(this.props?.value),
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

  /**
   * 显示下拉框
   */
  show = () => {
    this.#states.isFocus = true;
    this.updateContainerClasslist();
  };

  /**
   * 隐藏下拉框
   */
  hide = () => {
    this.#states.isFocus = false;
    this.updateContainerClasslist();
  };

  async connectedCallback() {
    super.connectedCallback();

    await customElements.whenDefined("ea-input");
    await customElements.whenDefined("ea-option");

    this.#abortController?.abort();
    this.#abortController = new AbortController();

    if (!this.name) this.name = crypto.randomUUID();

    this.#input.addEventListener(
      "focus",
      () => {
        this.#AbortControllerStates.closeAbortController?.abort();
        this.#AbortControllerStates.closeAbortController =
          new AbortController();

        this.show();

        document.addEventListener(
          "click",
          e => {
            if (this.contains(e.target)) return;

            this.hide();

            this.#AbortControllerStates.closeAbortController?.abort();
          },
          { signal: this.#AbortControllerStates.closeAbortController.signal }
        );
      },
      {
        signal: this.#abortController.signal,
      }
    );

    this.addEventListener(
      "ea-option-click",
      e => {
        e.preventDefault();
        e.stopImmediatePropagation();

        const { label, value, target } = e.detail;

        if (!this.multiple) {
          this.hide();
        }

        this.value = value;
        this.#input.value = label || value;

        this.querySelectorAll("ea-option").forEach(option => {
          option.toggleAttribute("active", option === target);
        });
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
