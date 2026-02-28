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
      "size",
      "value",
      "label",
      "name",
      "checked",
      "disabled",
      "indeterminate",
      "border",
      "limit-disabled",
      "required",
    ];
  }

  state = this.properties({
    size: {
      type: ["small", "default", "large"],
      default: "",
      observer: newVal => {
        this.updateContainerClasslist();
      },
    },
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
    border: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.updateContainerClasslist();
      },
    },

    "limit-disabled": {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.#original.disabled = newVal;

        this.updateContainerClasslist();
      },
    },
    required: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.#original.toggleAttribute("required", newVal);
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
        ["--" + this.size]: this.size,
      },
      {
        checked: this.checked,
        disabled: this.disabled,
        indeterminate: this.indeterminate,
        "limit-disabled": this["limit-disabled"],
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

  /**
   * 更新 checkbox 值
   */
  #updateCheckboxValue = () => {
    if (this.checked)
      this.setValue(this.value || this.hasAttribute("checked"), "value");
    else this.setValue(null, "value");
  };

  /**
   * 派发 change 事件
   */
  #dispatchChangeEvent = () => {
    this.emit("change", {
      detail: {
        value: this.value,
        checked: Boolean(this.checked),
      },
      bubbles: true,
    });
  };

  /**
   * change 事件
   */
  #onChangeEvent = () => {
    this.checked = this.#original.checked;

    this.#dispatchChangeEvent();
  };

  /**
   * enter 事件
   */
  #onEnterEvent = e => {
    if (e.key === "Enter") {
      this.#original.checked = !this.checked;

      this.#dispatchChangeEvent();
    }
  };

  connectedCallback() {
    super.connectedCallback();

    this.#abortController?.abort();
    this.#abortController = new AbortController();

    this.#original.addEventListener("change", this.#onChangeEvent, {
      signal: this.#abortController.signal,
    });

    this.addEventListener("keydown", this.#onEnterEvent, {
      signal: this.#abortController.signal,
    });
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
  }

  /**
   * 获取验证目标元素
   * @returns {HTMLElement}
   */
  get validationTarget() {
    return this.#container;
  }

  /**
   * 更新表单验证状态
   * checkbox 的验证逻辑：当 required 为 true 时，必须处于选中状态
   */
  updateValidity() {
    if (this.required && !this.checked) {
      this.internals.setValidity(
        { valueMissing: true },
        "请勾选此项",
        this.#container
      );
    } else {
      this.internals.setValidity({}, "", this.#container);
    }
  }

  /**
   * 检查表单字段的有效性
   * @returns {boolean}
   */
  checkValidity() {
    this.updateValidity();
    return this.internals.validity.valid;
  }

  /**
   * 报告表单字段的有效性（显示验证提示）
   * @returns {boolean}
   */
  reportValidity() {
    this.updateValidity();
    return this.internals.reportValidity();
  }
}

if (!window.customElements.get("ea-checkbox")) {
  window.customElements.define("ea-checkbox", EaCheckbox);
}
