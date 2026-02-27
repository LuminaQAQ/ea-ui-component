import Base from "@/components/Base";

/**
 * 获取验证消息
 * 优先使用原生 input 的验证消息
 * @param {FormAssociatedBase} element
 * @param {string} fallbackMessage
 * @returns {string}
 */
const getValidationMessage = (element, fallbackMessage) => {
  const validationTarget = element.validationTarget;
  if (validationTarget && validationTarget.validationMessage) {
    return validationTarget.validationMessage;
  }
  return element.validationMessage || fallbackMessage;
};

/**
 * 验证器接口
 * @typedef {Object} Validator
 * @property {string[]} [observedAttributes] - 观察的属性列表
 * @property {function(FormAssociatedBase): {message: string, isValid: boolean, invalidKeys: string[]}} checkValidity - 验证函数
 * @property {string|function(FormAssociatedBase): string} [message] - 错误消息
 */

/**
 * 自定义错误验证器
 * @returns {Validator}
 */
const CustomErrorValidator = () => ({
  observedAttributes: ["custom-error"],
  checkValidity(element) {
    const hasCustomError = Boolean(element.customError);
    return {
      isValid: !hasCustomError,
      message: element.customError || "",
      invalidKeys: hasCustomError ? ["customError"] : [],
    };
  },
});

/**
 * 必填验证器
 * @returns {Validator}
 */
const RequiredValidator = () => ({
  observedAttributes: ["required"],
  checkValidity(element) {
    const isRequired = element.required;
    const value = element.value;
    const isEmpty =
      value === "" ||
      value === null ||
      value === undefined ||
      (Array.isArray(value) && value.length === 0);

    if (isRequired && isEmpty) {
      return {
        isValid: false,
        message: getValidationMessage(element, "请填写此字段。"),
        invalidKeys: ["valueMissing"],
      };
    }

    return { isValid: true, message: "", invalidKeys: [] };
  },
});

/**
 * 最小长度验证器
 * @returns {Validator}
 */
const MinLengthValidator = () => ({
  observedAttributes: ["minlength"],
  checkValidity(element) {
    const minlength = element.minlength;
    const value = element.value;

    if (minlength && typeof value === "string" && value.length < minlength) {
      return {
        isValid: false,
        message: getValidationMessage(
          element,
          `请将此字段的长度调整为 ${minlength} 个字符或更多（当前为 ${value.length} 个字符）。`
        ),
        invalidKeys: ["tooShort"],
      };
    }

    return { isValid: true, message: "", invalidKeys: [] };
  },
});

/**
 * 最大长度验证器
 * @returns {Validator}
 */
const MaxLengthValidator = () => ({
  observedAttributes: ["maxlength"],
  checkValidity(element) {
    const maxlength = element.maxlength;
    const value = element.value;

    if (maxlength && typeof value === "string" && value.length > maxlength) {
      return {
        isValid: false,
        message: getValidationMessage(
          element,
          `请将此字段的长度调整为 ${maxlength} 个字符或更少（当前为 ${value.length} 个字符）。`
        ),
        invalidKeys: ["tooLong"],
      };
    }

    return { isValid: true, message: "", invalidKeys: [] };
  },
});

/**
 * 最小值验证器
 * @returns {Validator}
 */
const MinValidator = () => ({
  observedAttributes: ["min"],
  checkValidity(element) {
    const min = element.min;
    const value = element.value;

    if (min !== undefined && min !== null && min !== "") {
      const numValue = Number(value);
      const numMin = Number(min);

      if (!isNaN(numValue) && !isNaN(numMin) && numValue < numMin) {
        return {
          isValid: false,
          message: getValidationMessage(element, `值必须大于或等于 ${min}。`),
          invalidKeys: ["rangeUnderflow"],
        };
      }
    }

    return { isValid: true, message: "", invalidKeys: [] };
  },
});

/**
 * 最大值验证器
 * @returns {Validator}
 */
const MaxValidator = () => ({
  observedAttributes: ["max"],
  checkValidity(element) {
    const max = element.max;
    const value = element.value;

    if (max !== undefined && max !== null && max !== "") {
      const numValue = Number(value);
      const numMax = Number(max);

      if (!isNaN(numValue) && !isNaN(numMax) && numValue > numMax) {
        return {
          isValid: false,
          message: getValidationMessage(element, `值必须小于或等于 ${max}。`),
          invalidKeys: ["rangeOverflow"],
        };
      }
    }

    return { isValid: true, message: "", invalidKeys: [] };
  },
});

/**
 * 模式验证器（正则表达式）
 * @returns {Validator}
 */
const PatternValidator = () => ({
  observedAttributes: ["pattern"],
  checkValidity(element) {
    const pattern = element.pattern;
    const value = element.value;

    if (pattern && typeof value === "string" && value !== "") {
      const regex = new RegExp(pattern);
      if (!regex.test(value)) {
        return {
          isValid: false,
          message: getValidationMessage(element, "请按要求的格式填写。"),
          invalidKeys: ["patternMismatch"],
        };
      }
    }

    return { isValid: true, message: "", invalidKeys: [] };
  },
});

/**
 * 步骤验证器
 * @returns {Validator}
 */
const StepValidator = () => ({
  observedAttributes: ["step"],
  checkValidity(element) {
    const step = element.step;
    const value = element.value;
    const min = element.min;

    if (step && step !== "any" && value !== "" && value !== null) {
      const numValue = Number(value);
      const numStep = Number(step);
      const numMin = min ? Number(min) : 0;

      if (!isNaN(numValue) && !isNaN(numStep) && numStep > 0) {
        const remainder = (numValue - numMin) % numStep;
        if (Math.abs(remainder) > 1e-10) {
          return {
            isValid: false,
            message: getValidationMessage(element, `值必须是 ${step} 的倍数。`),
            invalidKeys: ["stepMismatch"],
          };
        }
      }
    }

    return { isValid: true, message: "", invalidKeys: [] };
  },
});

/**
 * 类型验证器（email, url, number 等）
 * @returns {Validator}
 */
const TypeValidator = () => ({
  observedAttributes: ["type"],
  checkValidity(element) {
    const type = element.type;
    const value = element.value;

    if (!value || value === "") {
      return { isValid: true, message: "", invalidKeys: [] };
    }

    switch (type) {
      case "email": {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return {
            isValid: false,
            message: getValidationMessage(
              element,
              '请在电子邮件地址中包含 "@" 和 "."。'
            ),
            invalidKeys: ["typeMismatch"],
          };
        }
        break;
      }
      case "url": {
        try {
          new URL(value);
        } catch {
          return {
            isValid: false,
            message: getValidationMessage(element, "请输入有效的网址。"),
            invalidKeys: ["typeMismatch"],
          };
        }
        break;
      }
      case "number": {
        const numValue = Number(value);
        if (isNaN(numValue)) {
          return {
            isValid: false,
            message: getValidationMessage(element, "请输入有效的数字。"),
            invalidKeys: ["typeMismatch"],
          };
        }
        break;
      }
    }

    return { isValid: true, message: "", invalidKeys: [] };
  },
});

export default class FormAssociatedBase extends Base {
  static formAssociated = true;

  /**
   * 静态验证器列表
   * 子类可以通过覆盖此属性来添加自定义验证器
   */
  static get validators() {
    return [
      CustomErrorValidator(),
      RequiredValidator(),
      MinLengthValidator(),
      MaxLengthValidator(),
      MinValidator(),
      MaxValidator(),
      PatternValidator(),
      StepValidator(),
      TypeValidator(),
    ];
  }

  /**
   * 合并父类和当前类的 observedAttributes
   */
  static get observedAttributes() {
    const parentAttrs = new Set(super.observedAttributes || []);

    // 添加验证器观察的属性
    for (const validator of this.validators) {
      if (!validator.observedAttributes) continue;
      for (const attr of validator.observedAttributes) {
        parentAttrs.add(attr);
      }
    }

    // 添加表单相关属性
    [
      "name",
      "disabled",
      "required",
      "minlength",
      "maxlength",
      "min",
      "max",
      "pattern",
      "step",
      "type",
      "custom-error",
    ].forEach(attr => parentAttrs.add(attr));

    return [...parentAttrs];
  }

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

    // 约束验证属性
    required: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.updateValidity();
        this.setCustomStates();
      },
    },
    minlength: {
      type: Number,
      default: 0,
      observer: newVal => {
        this.updateValidity();
      },
    },
    maxlength: {
      type: Number,
      default: 0,
      observer: newVal => {
        this.updateValidity();
      },
    },
    min: {
      type: String,
      default: "",
      observer: newVal => {
        this.updateValidity();
      },
    },
    max: {
      type: String,
      default: "",
      observer: newVal => {
        this.updateValidity();
      },
    },
    pattern: {
      type: String,
      default: "",
      observer: newVal => {
        this.updateValidity();
      },
    },
    step: {
      type: String,
      default: "",
      observer: newVal => {
        this.updateValidity();
      },
    },
    disabled: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.updateValidity();
        this.setCustomStates();
      },
    },

    /** @abstract 依组件需求实现 */
    value: {
      type: null,
      default: "",
      observer: newVal => {
        this.internals.setFormValue(newVal, "value");
        this.valueHasChanged = true;
        this.updateValidity();
      },
    },

    // 自定义错误消息
    customError: {
      type: String,
      default: "",
      observer: newVal => {
        this.setCustomValidity(newVal);
      },
    },
  });

  constructor() {
    super();

    /** @type {ElementInternals} */
    this.internals = this.attachInternals();

    // 实例级别的验证器
    this.validators = [];

    // 用户交互状态
    this.hasInteracted = false;
    this.valueHasChanged = false;

    // 已发出的事件列表
    this.emittedEvents = [];

    // 假设交互发生的事件
    this.assumeInteractionOn = ["input", "change", "blur"];

    // 监听 invalid 事件
    this.addEventListener("invalid", this.#emitInvalid);
  }

  /**
   * 获取所有验证器（静态 + 实例）
   */
  get allValidators() {
    const staticValidators = this.constructor.validators || [];
    return [...staticValidators, ...this.validators];
  }

  /**
   * 获取标签列表
   */
  get labels() {
    return this.internals.labels;
  }

  /**
   * 获取验证目标元素
   * 子类可以覆盖此方法来指定验证提示的锚定元素
   */
  get validationTarget() {
    return undefined;
  }

  /**
   * 发出 invalid 事件处理
   */
  #emitInvalid = e => {
    if (e.target !== this) return;

    // invalid 事件算作用户交互
    this.hasInteracted = true;
    this.setCustomStates();
  };

  /**
   * 处理用户交互
   */
  #handleInteraction = event => {
    const emittedEvents = this.emittedEvents;
    if (!emittedEvents.includes(event.type)) {
      emittedEvents.push(event.type);
    }

    // 当所有关联事件都已发出时，标记为用户已交互
    if (emittedEvents.length === this.assumeInteractionOn?.length) {
      this.hasInteracted = true;
      this.setCustomStates();
    }
  };

  /**
   * 设置自定义状态
   */
  setCustomStates() {
    const isRequired = Boolean(this.required);
    const isValid = this.internals.validity.valid;
    const hasInteracted = this.hasInteracted;

    // 检查浏览器是否支持 CustomStateSet
    if (this.internals.states) {
      try {
        this.internals.states.set("required", isRequired);
        this.internals.states.set("optional", !isRequired);
        this.internals.states.set("invalid", !isValid);
        this.internals.states.set("valid", isValid);
        this.internals.states.set("user-invalid", !isValid && hasInteracted);
        this.internals.states.set("user-valid", isValid && hasInteracted);
        this.internals.states.set("disabled", this.disabled);
      } catch (e) {
        // 浏览器不支持 CustomStateSet，静默处理
      }
    }
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
    this.internals.setFormValue(value, state);
  }

  /**
   * 移除表单值
   */
  removeValue() {
    this.internals.setFormValue(null);
  }

  /**
   * 检查有效性
   */
  checkValidity() {
    this.updateValidity();
    return this.internals.checkValidity();
  }

  /**
   * 报告有效性（显示验证提示）
   */
  reportValidity() {
    this.updateValidity();
    this.hasInteracted = true;
    this.setCustomStates();
    return this.internals.reportValidity();
  }

  /**
   * 设置自定义有效性消息
   * @param {string} message
   */
  setCustomValidity(message) {
    if (!message) {
      this.customError = "";
      this.setValidity({});
      return;
    }

    this.customError = message;
    this.setValidity({ customError: true }, message, this.validationTarget);
  }

  /**
   * 设置有效性状态
   * @param {ValidityStateFlags} flags
   * @param {string} [message]
   * @param {HTMLElement} [anchor]
   */
  setValidity(flags, message, anchor) {
    const targetAnchor = anchor || this.validationTarget;
    this.internals.setValidity(flags, message, targetAnchor || undefined);
    this.setCustomStates();
  }

  /**
   * 重置有效性状态
   */
  resetValidity() {
    this.setCustomValidity("");
    this.setValidity({});
  }

  /**
   * 更新有效性状态
   */
  updateValidity() {
    if (this.disabled || this.hasAttribute("disabled") || !this.willValidate) {
      this.resetValidity();
      return;
    }

    const validators = this.allValidators;

    if (!validators?.length) {
      return;
    }

    const flags = {
      customError: Boolean(this.customError),
    };

    const formControl = this.validationTarget;
    let finalMessage = "";

    for (const validator of validators) {
      const { isValid, message, invalidKeys } = validator.checkValidity(this);

      if (isValid) continue;

      if (!finalMessage) {
        finalMessage = message;
      }

      if (invalidKeys?.length > 0) {
        invalidKeys.forEach(key => {
          flags[key] = true;
        });
      }
    }

    // 如果有自定义验证器返回的错误消息，使用它
    // 否则使用原生 input 的验证消息
    if (!finalMessage && formControl && formControl.validationMessage) {
      finalMessage = formControl.validationMessage;
    } else if (!finalMessage) {
      finalMessage = this.internals.validationMessage;
    }

    this.setValidity(flags, finalMessage, formControl);
  }

  connectedCallback() {
    super.connectedCallback();

    // 初始化交互事件监听
    this.assumeInteractionOn.forEach(event => {
      this.addEventListener(event, this.#handleInteraction);
    });

    // 初始化验证状态
    this.updateValidity();
    this.setCustomStates();

    if (this.internals.form) {
      this.internals.form.addEventListener("submit", e => {
        // 不阻止默认行为，让表单正常提交
      });
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback?.();

    // 清理事件监听
    this.assumeInteractionOn.forEach(event => {
      this.removeEventListener(event, this.#handleInteraction);
    });
    this.removeEventListener("invalid", this.#emitInvalid);
  }

  /**
   * 表单关联回调
   * @param {HTMLFormElement} form
   */
  formAssociatedCallback(form) {
    if (form) {
      this.updateValidity();
    }
  }

  /**
   * 表单禁用状态回调
   * @param {boolean} disabled
   */
  formDisabledCallback(disabled) {
    this.disabled = disabled;
    this.updateValidity();
    this.setCustomStates();
  }

  /**
   * 表单重置回调
   */
  formResetCallback() {
    this.resetValidity();
    this.hasInteracted = false;
    this.valueHasChanged = false;
    this.emittedEvents = [];
    this.updateValidity();
    this.setCustomStates();
  }

  /**
   * 表单状态恢复回调
   * @param {any} state
   * @param {'autocomplete' | 'restore'} mode
   */
  formStateRestoreCallback(state, mode) {
    this.value = state;

    if (mode === "restore") {
      this.resetValidity();
    }

    this.updateValidity();
  }
}
