import FormAssociatedBase from "@/core/FormBase";

import stylesheet from "./index.scss?inline";
import { EA_COMPONENT_SIZES } from "@/utils/Variables";

export class EaRadioGroup extends FormAssociatedBase {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLSlotElement} */
  #defaultSlot;
  /** @type {HTMLLabelElement} */
  #label;

  /** @type {AbortController} */
  #abortController;

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "label",
      "name",
      "value",
      "border",
      "disabled",
      "size",
      "required",
    ];
  }

  state = this.properties({
    label: {
      type: String,
      default: "",
      observer: newVal => {
        this.#label.textContent = newVal;
      },
    },
    name: {
      type: String,
      default: "",
      observer: () => {
        this.#updateGroupName();
      },
    },
    value: {
      type: String,
      default: "",
      observer: newVal => {
        this.#updateCurrentValue(newVal);
        this.setValue(newVal);
      },
    },
    border: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.#updateGroupBorder(newVal);
      },
    },
    disabled: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.#updateGroupDisabled(newVal);
      },
    },
    size: {
      type: EA_COMPONENT_SIZES,
      default: "default",
      observer: newVal => {
        this.#updateGroupSize(newVal);
      },
    },
    required: {
      type: Boolean,
      default: false,
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    return this.computedClasslist("ea-radio-group", {});
  }

  constructor() {
    super();

    this.stylesheet = stylesheet;

    this.$render();
  }

  $render() {
    this.shadowRoot.innerHTML = `
      <label class='ea-radio-group__form-label' part='form-label'></label>
      <div class='ea-radio-group' part='container' role='radiogroup'>
        <slot></slot>
      </div>
    `;

    this.#label = this.shadowRoot.querySelector(".ea-radio-group__form-label");
    this.#container = this.shadowRoot.querySelector(".ea-radio-group");
    this.#defaultSlot = this.#container.querySelector("slot");
  }

  /**
   * 更新 radios name 属性
   */
  #updateGroupName = () => {
    this.querySelectorAll("ea-radio").forEach(radio => {
      radio.setAttribute("name", this.name);
    });
  };

  /**
   * 更新当前选项
   * @param {any} currentValue
   */
  #updateCurrentValue = currentValue => {
    this.querySelectorAll("ea-radio").forEach(radio => {
      const radioValue = radio.getAttribute("value");
      radio.toggleAttribute("checked", currentValue === radioValue);
    });
  };

  /**
   * 更新 radios border 属性
   * @param {Boolean} isBorder
   */
  #updateGroupBorder = isBorder => {
    this.querySelectorAll("ea-radio").forEach(radio => {
      radio.toggleAttribute("border", isBorder);
    });
  };

  /**
   * 更新 radios disabled 属性
   * @param {Boolean} isDisabled
   */
  #updateGroupDisabled = isDisabled => {
    this.querySelectorAll("ea-radio").forEach(radio => {
      radio.toggleAttribute("disabled", isDisabled);
    });
  };

  /**
   * 批量更新 radios size 属性
   * @param {'large' | 'default' | 'small'} size
   */
  #updateGroupSize = size => {
    this.querySelectorAll("ea-radio").forEach(radio => {
      if (!radio.getAttribute("size")) radio.setAttribute("size", size);
    });
  };

  connectedCallback() {
    super.connectedCallback();

    this.#abortController?.abort();
    this.#abortController = new AbortController();

    /**
     * 监听 value 改变
     */
    const onValueChangeEvent = e => {
      this.value = e.detail.value;
    };

    /**
     * 监听 slot 改变
     */
    const onSlotChangeEvent = () => {
      this.#updateCurrentValue(this.value);

      if (this.name) this.#updateGroupName();
      if (this.border) this.#updateGroupBorder(this.border);
      if (this.disabled) this.#updateGroupDisabled(this.disabled);
      if (this.size) this.#updateGroupSize(this.size);
    };

    this.addEventListener("change", onValueChangeEvent, {
      signal: this.#abortController.signal,
    });

    this.#defaultSlot.addEventListener("slotchange", onSlotChangeEvent, {
      signal: this.#abortController.signal,
    });
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
  }

  /**
   * 获取验证目标元素
   * 返回当前选中的 ea-radio，如果没有选中则返回第一个 ea-radio
   * @returns {HTMLElement}
   */
  get validationTarget() {
    const checkedRadio = this.querySelector("ea-radio[checked]");
    if (checkedRadio) return checkedRadio;

    const firstRadio = this.querySelector("ea-radio");
    return firstRadio || this.#container;
  }

  /**
   * 更新表单验证状态
   */
  updateValidity() {
    const hasValue = this.value !== "" && this.value != null;

    if (this.required && !hasValue) {
      this.internals.setValidity(
        { valueMissing: true },
        "请选择一个选项",
        this
      );
    } else {
      this.internals.setValidity({}, "", this);
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

if (!window.customElements.get("ea-radio-group")) {
  window.customElements.define("ea-radio-group", EaRadioGroup);
}
