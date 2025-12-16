import FormAssociatedBase from "@/core/FormBase";

import stylesheet from "./index.scss?inline";

export class EaSwitch extends FormAssociatedBase {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #originalInput;
  /** @type {HTMLElement} */
  #innerInput;
  /** @type {HTMLElement} */
  #labelRight;
  /** @type {HTMLElement} */
  #labelLeft;

  /** @type {AbortController} */
  #abortController;

  static get observedAttributes() {
    return [
      ...super.observedAttributes,

      "name",
      "value",
      "active-value",
      "inactive-value",

      // "size",
      // "width",
      "inactive-text",
      "inactive-color",
      "active-text",
      "active-color",

      "checked",
      "disabled",

      // "loading",
    ];
  }

  state = this.properties({
    name: {
      type: String,
      default: "",
      observer: newVal => {
        this.#container.setAttribute("for", newVal);
        this.#originalInput.setAttribute("name", newVal);
        this.#originalInput.setAttribute("id", newVal);
      },
    },
    value: {
      type: String,
      default: "",
      observer: newVal => {
        this.#originalInput.setAttribute("value", newVal);
      },
    },
    "active-value": {
      type: {
        Number: () =>
          this.hasAttribute("active-value") &&
          (this.getAttrNumber("active-value") ||
            this.getAttrNumber("active-value") === 0),
        String: () =>
          this.hasAttribute("active-value") &&
          (this.getAttrString("active-value") ||
            this.getAttrString("active-value") === ""),
        Boolean: () =>
          this.hasAttribute("active-value") ||
          !this.hasAttribute("active-value"),
      },
      default: true,
      observer: () => {},
    },
    "inactive-value": {
      type: {
        Number: () =>
          this.hasAttribute("active-value") &&
          (this.getAttrNumber("active-value") ||
            this.getAttrNumber("active-value") === 0),
        String: () =>
          this.hasAttribute("active-value") &&
          (this.getAttrString("active-value") ||
            this.getAttrString("active-value") === ""),
        Boolean: () =>
          this.hasAttribute("active-value") ||
          !this.hasAttribute("active-value"),
      },
      default: () => false,
      observer: () => {},
    },

    "inactive-text": {
      type: String,
      default: "",
      observer: newVal => {
        this.#labelLeft.innerText = newVal;
      },
    },
    "inactive-color": {
      type: String,
      default: "",
      observer: newVal => {
        this.style.setProperty("--ea-switch-inactive-checkbox-bgc", newVal);
      },
    },
    "active-text": {
      type: String,
      default: "",
      observer: newVal => {
        this.#labelRight.innerText = newVal;
      },
    },
    "active-color": {
      type: String,
      default: "",
      observer: newVal => {
        this.style.setProperty("--ea-switch-active-checkbox-bgc", newVal);
      },
    },

    checked: {
      type: Boolean,
      default: false,
      observer: newVal => {
        newVal = Boolean(newVal);

        this.#originalInput.toggleAttribute("checked", newVal);

        this.setValue(newVal ? this["active-value"] : this["inactive-value"]);

        this.#container.className = this.updateContainerClasslist();
      },
    },
    disabled: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.#originalInput.toggleAttribute("disabled", newVal);
        this.#container.className = this.updateContainerClasslist();
      },
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    return this.computedClasslist("ea-switch", {
      ["--checked"]: this.checked,
      ["--disabled"]: this.disabled,
    });
  }

  constructor() {
    super();

    this.stylesheet = stylesheet;

    this.$render();
  }

  $render() {
    this.shadowRoot.innerHTML = `
            <label class="ea-switch" part="container">
                <input class="ea-switch__original" type="checkbox">
                <span class="ea-switch__label label-left" part="label-left"></span>
                <span class="ea-switch__inner" part="switch"></span>
                <span class="ea-switch__label label-right" part="label-right"></span>
            </label>
        `;

    this.#container = this.shadowRoot.querySelector(".ea-switch");
    this.#originalInput = this.shadowRoot.querySelector(".ea-switch__original");
    this.#innerInput = this.shadowRoot.querySelector(".ea-switch__inner");
    this.#labelLeft = this.shadowRoot.querySelector(
      ".ea-switch__label.label-left"
    );
    this.#labelRight = this.shadowRoot.querySelector(
      ".ea-switch__label.label-right"
    );
  }

  #changeEvent = e => {
    e.preventDefault();
    e.stopPropagation();

    this.checked = e.target.checked;
    const value = this.checked
      ? this["active-text"]
        ? this["active-text"]
        : this.checked
      : this["inactive-text"]
        ? this["inactive-text"]
        : this.checked;
    this.value = value;

    this.emit("change", {
      detail: {
        checked: this.checked,
        value: value,
      },
    });
  };

  connectedCallback() {
    super.connectedCallback();

    this.#abortController?.abort();
    this.#abortController = new AbortController();
    this.setValue(this.checked ? this["active-value"] : this["inactive-value"]);

    this.#originalInput.addEventListener("change", this.#changeEvent, {
      signal: this.#abortController.signal,
    });
  }

  $unmounted() {
    this.#abortController.abort();
  }
}

if (!window.customElements.get("ea-switch")) {
  window.customElements.define("ea-switch", EaSwitch);
}
