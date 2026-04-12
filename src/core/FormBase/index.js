import Base from "@core/EaBase";

export default class FormAssociatedBase extends Base {
  static formAssociated = true;

  /** @type {AbortController} */
  #abortController;

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "name",
      "value",
      "disabled",

      "required",
      "pattern",
      "minlength",
      "maxlength",
      "min",
      "max",

      "validation-message",
    ];
  }

  state = this.properties({
    form: {
      type: HTMLFormElement,
      default: () => this.internals.form,
    },
    name: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: () => this.localName,
    },
    validity: {
      type: String,
      default: () => this.internals.validity,
    },
    validationMessage: {
      type: String,
      default: () => this.internals.validationMessage,
    },
    willValidate: {
      type: String,
      default: () => this.internals.willValidate,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: null,
      default: "",
      observer: newVal => {
        this.internals.setFormValue(newVal);
      },
    },
    required: {
      type: Boolean,
      default: false,
    },

    "validation-message": {
      type: String,
      default: "",
    },

    required: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.validationTarget.toggleAttribute("required", newVal);
      },
    },
    minlength: {
      type: Number,
      default: 0,
      observer: newVal => {
        this.validationTarget.setAttribute("minlength", newVal);
      },
    },
    maxlength: {
      type: Number,
      default: 0,
      observer: newVal => {
        this.validationTarget.setAttribute("maxlength", newVal);
      },
    },
    min: {
      type: Number,
      default: 0,
      observer: newVal => {
        this.validationTarget.setAttribute("min", newVal);
      },
    },
    max: {
      type: Number,
      default: 0,
      observer: newVal => {
        this.validationTarget.setAttribute("max", newVal);
      },
    },
    pattern: {
      type: String,
      default: "",
      observer: newVal => {
        this.validationTarget.setAttribute("pattern", newVal);
      },
    },
  });

  constructor() {
    super();
    this.internals = this.attachInternals();
  }

  get labels() {
    return this.internals.labels;
  }

  /**
   * @abstract 获取验证目标元素，需子组件实现
   * @returns {HTMLElement}
   */
  get validationTarget() {
    return undefined;
  }

  getForm = () => {
    return this.internals.form;
  };

  setValue = value => {
    if (this.internals && typeof this.internals.setFormValue === "function") {
      this.internals.setFormValue(value);
    }
  };

  removeValue = () => {
    if (this.internals && typeof this.internals.setFormValue === "function") {
      this.internals.setFormValue(null);
    }
  };

  /**
   * 更新表单验证状态
   * 使用内部 input 元素的 validity 状态
   */
  updateValidity() {
    if (this.tagName === "EA-BUTTON") return;

    const formControl = this.validationTarget;

    if (formControl && formControl.validity) {
      if (formControl.validity.valid) {
        this.resetCustomValidity();
      } else {
        const flags = {};
        for (const key in formControl.validity) {
          if (formControl.validity[key] && key !== "valid") {
            flags[key] = true;
          }
        }

        this.setValidity(
          flags,
          this["validation-message"] || formControl.validationMessage
        );

        if (
          this.internals &&
          typeof this.internals.reportValidity === "function"
        ) {
          this.internals.reportValidity();
        }
      }
    }
  }

  /**
   * 检查表单字段是否有效
   * @returns {boolean} 如果字段有效返回 true，否则返回 false
   */
  checkValidity() {
    if (this.tagName === "EA-BUTTON") return;

    this.updateValidity();
    return this.validationTarget?.checkValidity();
  }

  /**
   * 报告表单字段的验证状态
   * @returns {boolean} 如果字段有效返回 true，否则返回 false
   */
  reportValidity() {
    if (this.tagName === "EA-BUTTON") return;

    this.updateValidity();
    return this.validationTarget?.reportValidity();
  }

  /**
   * 设置自定义验证错误消息
   * @param {string} message - 自定义错误消息
   * @param {object} flags - 验证状态标志
   */
  setValidity(flags = {}, message = "") {
    const hasError = Object.values(flags).some(v => v === true);

    if (message) {
      flags.customError = true;
    } else if (hasError) {
      message = this.validationTarget?.validationMessage || "";
    }

    if (this.internals && typeof this.internals.setValidity === "function") {
      this.internals.setValidity(flags, message, this.validationTarget);
    }
  }

  /**
   * 设置自定义验证错误消息
   * @param {string} message - 自定义错误消息，空字符串表示清除错误
   */
  setCustomValidity(message) {
    if (this.tagName === "EA-BUTTON") return;

    if (
      this.validationTarget &&
      this.validationTarget !== this &&
      typeof this.validationTarget.setCustomValidity === "function"
    ) {
      this.validationTarget.setCustomValidity(message);
    }

    if (this.internals && typeof this.internals.setValidity === "function") {
      if (message) {
        this.internals.setValidity(
          { customError: true },
          message,
          this.validationTarget
        );
      } else {
        this.internals.setValidity({}, "", this.validationTarget);
      }
    }
  }

  /**
   * 重置自定义验证错误消息
   */
  resetCustomValidity() {
    if (this.internals && typeof this.internals.setValidity === "function") {
      this.internals.setValidity({}, "", this.validationTarget);
    }

    if (
      this.validationTarget &&
      this.validationTarget !== this &&
      typeof this.validationTarget.setCustomValidity === "function"
    ) {
      this.validationTarget.setCustomValidity("");
    }
  }

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#abortController?.abort();
  }

  /**
   * 表单关联回调，处理表单提交事件
   * @param {HTMLFormElement} form - 关联的表单元素
   */
  formAssociatedCallback(form) {
    if (form) {
      this.#abortController?.abort();
      this.#abortController = new AbortController();

      form.addEventListener(
        "submit",
        e => {
          this.setCustomValidity("");

          this.updateValidity();

          if (!this.checkValidity() && this.tagName !== "EA-BUTTON") {
            e.preventDefault();
            e.stopImmediatePropagation();
            this.reportValidity();
          }
        },
        { signal: this.#abortController.signal }
      );
    }
  }

  /**
   * 表单禁用回调，处理表单禁用状态变化
   * @param {boolean} disabled - 表单是否禁用
   */
  formDisabledCallback(disabled) {
    this.disabled = disabled;
    this.updateValidity();
  }

  /**
   * 表单重置回调，处理表单重置事件
   */
  formResetCallback() {
    this.value = null;
    this.setValidity({});
  }
}
