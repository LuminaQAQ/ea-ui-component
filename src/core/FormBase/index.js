import Base from "@/components/Base";

export default class FormAssociatedBase extends Base {
  static formAssociated = true;

  state = this.properties({
    form: {
      type: HTMLFormElement,
      default: () => this.internals.form,
      observer: newVal => {},
    },
    name: {
      type: String,
      default: "",
      observer: newVal => {},
    },
    type: {
      type: String,
      default: () => this.localName,
      observer: newVal => {},
    },
    validity: {
      type: String,
      default: () => this.internals.validity,
      observer: newVal => {},
    },
    validationMessage: {
      type: String,
      default: () => this.internals.validationMessage,
      observer: newVal => {},
    },
    willValidate: {
      type: String,
      default: () => this.internals.willValidate,
      observer: newVal => {},
    },

    /** @abstract 依组件需求实现 */
    value: {
      type: null,
      default: "",
      observer: newVal => {
        this.internals.setFormValue(newVal, "value");
      },
    },
  });

  constructor() {
    super();

    /** @type {ElementInternals} */
    this.internals = this.attachInternals();
  }

  getForm() {
    return this.internals.form;
  }

  /**
   * 设置表单值
   * @param {string} value
   * @param {string} [state]
   */
  setValue(value, state) {
    this.internals.setFormValue(value);
  }

  /**
   * 移除表单值
   */
  removeValue() {
    this.internals.setFormValue(null);
  }

  checkValidity() {
    return this.internals.checkValidity();
  }
  reportValidity() {
    return this.internals.reportValidity();
  }

  updateValidity() {
    if (this.disabled) return;

    // TODO: 等表单组件都完成后，写form的时候再写
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.internals.form) {
      this.internals.form.addEventListener("submit", e => {
        e.preventDefault();
      });
    }
  }

  /**
   * @abstract 表单元素关联到该元素时调用，或从一个表单元素解除关联该元素时
   * @param {ElementInternals} form
   * @returns {void}
   */
  formAssociatedCallback(form) {
    this.internals.form.onsubmit = e => {
      e.preventDefault();
    };
  }

  /**
   * @abstract 禁用状态更新时
   * @param {Boolean} disabled
   * @returns {void}
   */
  formDisabledCallback(disabled) {}

  /**
   * @abstract 表单被重置后调用
   */
  formResetCallback() {}

  /**
   * @abstract 表单被重置后调用
   * - `mode` 参数是 `autocomplete` 调用
   * - 当浏览器恢复该元素状态时（例如，一次导航后，或当浏览器重启时），在此情形下 `mode` 参数是 `restore`
   * @param {any} state
   * @param {'autocomplete' | 'restore'} mode
   */
  formStateRestoreCallback(state, mode) {
    this.value = state;
  }
}
