import Base from "@/components/Base";

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
    required: {
      type: Boolean,
      default: false,
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
    this.internals.setFormValue(value);
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
        this.internals.setValidity({}, "", formControl);
      } else {
        const flags = {};
        for (const key in formControl.validity) {
          if (formControl.validity[key] && key !== "valid") {
            flags[key] = true;
          }
        }
        this.internals.setValidity(flags, formControl.validationMessage);
        this.internals.reportValidity();
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
   */
  setCustomValidity = message => {
    if (message) {
      this.internals.setValidity(
        { customError: true },
        message,
        this.validationTarget
      );
    } else {
      this.internals.setValidity({});
    }
  };

  connectedCallback() {
    super.connectedCallback();
    this.updateValidity();
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

      this.internals.form.addEventListener(
        "submit",
        e => {
          if (!this.checkValidity()) {
            e.preventDefault();
          }
          this.updateValidity();
          this.reportValidity();
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
    this.value = this.getAttribute("value") || "";
    this.internals.setValidity({});
  }
}
