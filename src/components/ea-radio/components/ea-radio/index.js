import FormAssociatedBase from "@/core/FormBase";

import stylesheet from "./index.scss?inline";

export class EaRadio extends FormAssociatedBase {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #label;
  /** @type {HTMLInputElement} */
  #radio;
  /** @type {AbortController} */
  #abortController;

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "checked",
      "name",
      "value",
      "disabled",
      "border",
      "label",
    ];
  }

  state = this.properties({
    checked: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.#label.toggleAttribute("checked", newVal);
        this.#radio.checked = newVal;

        newVal ? this.setValue(this.value) : this.removeValue();

        this.updateContainerClasslist();
      },
    },
    name: {
      type: String,
      default: "",
      observer: newVal => {
        this.#label.setAttribute("for", newVal);
        this.#radio.setAttribute("id", newVal);
        this.#radio.setAttribute("name", newVal);
      },
    },
    value: {
      type: String,
      default: "",
      observer: newVal => {
        this.#radio.setAttribute("value", newVal);
      },
    },
    disabled: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.#radio.disabled = newVal;
        this.updateContainerClasslist();
      },
    },
    border: {
      type: Boolean,
      default: false,
      observer: () => {
        this.updateContainerClasslist();
      },
    },
    label: {
      type: String,
      default: "",
      observer: newVal => {
        this.#label.textContent = newVal;
      },
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist(
      "ea-radio",
      {},
      {
        checked: this.checked,
        disabled: this.disabled,
        border: this.border,
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
      <label class="ea-radio" part="container" role="radio">
        <span class="ea-radio__input" part="input-wrap">
          <span class="ea-radio__inner" part="input"></span>
          <input class="ea-radio__original" type="radio" />
        </span>
        <span class="ea-radio__label" part="label-wrap">
          <slot></slot>
        </span>
      </label>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-radio");

    this.#label = this.shadowRoot.querySelector(".ea-radio__label");
    this.#radio = this.shadowRoot.querySelector(".ea-radio__original");
  }

  /**
   * radio change 事件
   */
  #changeEvent = () => {
    if (!this.closest("ea-radio-group")) {
      const sameGroupRadio = document.querySelectorAll(
        `ea-radio[name="${this.name}"]`
      );
      sameGroupRadio.forEach(radio => {
        radio.toggleAttribute("checked", radio === this);
      });
    }

    this.emit("change", {
      detail: {
        value: this.value,
        checked: this.checked,
      },
      bubbles: true,
    });
  };

  connectedCallback() {
    super.connectedCallback();

    this.#abortController?.abort();
    this.#abortController = new AbortController();

    if (!this.name)
      this.setAttribute("name", Math.random().toString(36).substring(2, 15));

    this.#radio.addEventListener("change", this.#changeEvent, {
      signal: this.#abortController.signal,
    });
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
  }
}

if (!window.customElements.get("ea-radio")) {
  window.customElements.define("ea-radio", EaRadio);
}
