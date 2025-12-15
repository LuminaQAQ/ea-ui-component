import FormAssociatedBase from "@/core/FormBase";

import stylesheet from "./index.scss?inline";

export class EaCheckbox extends FormAssociatedBase {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #original;
  /** @type {HTMLElement} */
  #innerEl;
  /** @type {HTMLElement} */
  #labelSlot;

  /** @type {AbortController} */
  #abortController = new AbortController();

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "value",
      "label",
      "name",
      "checked",
      "disabled",
      "indeterminate",
    ];
  }

  state = this.properties({
    value: {
      type: String,
      default: "",
      observer: newVal => {
        this.#original.value = newVal;

        this.#updateCheckboxValue();
      },
    },
    label: {
      type: String,
      default: "",
      observer: newVal => {
        this.#labelSlot.textContent = newVal;
      },
    },
    checked: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.#original.checked = newVal;

        this.#updateCheckboxValue();

        this.updateContainerClasslist();
      },
    },
    disabled: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.#original.disabled = newVal;

        this.updateContainerClasslist();
      },
    },
    indeterminate: {
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
      "ea-checkbox",
      {
        // ["--" + this.type]: this.type,
      },
      {
        checked: this.checked,
        disabled: this.disabled,
        indeterminate: this.indeterminate,
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
    const randomId = Math.random().toString(36).substring(2, 15);

    this.shadowRoot.innerHTML = `
      <label class="ea-checkbox" part="container" for="${
        this.getAttribute("id") || randomId
      }">
        <input id="${
          this.getAttribute("id") || randomId
        }" type="checkbox" class="ea-checkbox__orignal" part="orignal" />
        <span class="ea-checkbox__inner" part="input" tabindex="1"></span>
        <span class="ea-checkbox__label" part="label" tabindex="1">
          <slot></slot>
        </span>
      </label>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-checkbox");
    this.#labelSlot = this.shadowRoot.querySelector(".ea-checkbox__label");
    this.#innerEl = this.shadowRoot.querySelector(".ea-checkbox__inner");
    this.#original = this.shadowRoot.querySelector(".ea-checkbox__orignal");
  }

  // TODO:
  #updateCheckboxValue = () => {
    const checkboxList = [document.querySelectorAll(`[name="${this.name}"]`)];

    if (this.checked)
      this.setValue(this.value || this.hasAttribute("checked"), "value");
    else this.setValue(null, "value");
  };

  connectedCallback() {
    super.connectedCallback();

    // this.tabIndex = 0;

    this.#abortController?.abort();
    this.#abortController = new AbortController();

    this.#original.addEventListener(
      "change",
      () => {
        this.checked = this.#original.checked;
        this.emit("change", {
          detail: {
            value: this.value,
            checked: Boolean(this.checked),
          },
          bubbles: true,
        });
      },
      { signal: this.#abortController.signal }
    );

    this.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        this.#original.checked = !this.checked;
        this.#original.dispatchEvent(new Event("change"));
      }
    });
  }

  $beforeUnmounted() {
    this.#abortController.abort();
  }
}

if (!window.customElements.get("ea-checkbox")) {
  window.customElements.define("ea-checkbox", EaCheckbox);
}
