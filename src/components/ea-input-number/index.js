import FormAssociatedBase from "@/core/FormBase";
import stylesheet from "./index.scss?inline";
import { EaInputNumberChangeEvent } from "./events/EaInputNumberChangeEvent";

export class EaInputNumber extends FormAssociatedBase {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLInputElement} */
  #inputEl;
  /** @type {HTMLElement} */
  #operatorMinus;
  /** @type {HTMLElement} */
  #operatorPlus;
  /** @type {HTMLLabelElement} */
  #label;

  /** @type {AbortController} */
  #abortController = new AbortController();

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "value",
      "label",
      "value-on-clear",

      "min",
      "max",
      "required",

      "step",
      "step-strictly",

      "precision",
      "size",
      "name",
      "align",
      "placeholder",
      "inputmode",

      "readonly",
      "disabled",
      "controls",
    ];
  }

  /**
   * 获取验证目标元素
   * @returns {HTMLElement}
   */
  get validationTarget() {
    return this.#inputEl;
  }

  /**
   * 表单重置回调，处理表单重置事件
   */
  formResetCallback() {
    this.value = this.min;
    this.internals.setValidity({});
  }

  state = this.properties({
    label: {
      type: String,
      default: "",
      observer: async newVal => {
        this.#label.textContent = newVal;
      },
    },
    value: {
      type: Number,
      default: 0,
      /** @param {number} newVal */
      observer: (newVal, oldVal) => {
        newVal = Number(newVal).toFixed(this.precision);
        oldVal = Number(oldVal).toFixed(this.precision);

        this.#inputEl.value = newVal;
        this.setValue(newVal);

        if (newVal >= this.max) this.isMax = true;
        else this.isMax = false;

        if (newVal <= this.min) this.isMin = true;
        else this.isMin = false;

        this.dispatchEvent(
          new EaInputNumberChangeEvent({
            currentValue: Number(newVal),
            oldValue: Number(oldVal),
          })
        );

        this.updateContainerClasslist();
      },
    },

    min: {
      type: Number,
      default: Number.MIN_SAFE_INTEGER,
      observer: newVal => {
        if (this.#inputEl) this.#inputEl.min = newVal;
      },
    },
    max: {
      type: Number,
      default: Number.MAX_SAFE_INTEGER,
      observer: newVal => {
        if (this.#inputEl) this.#inputEl.max = newVal;
      },
    },
    required: {
      type: Boolean,
      default: false,
      observer: newVal => {
        if (this.#inputEl) this.#inputEl.required = newVal;
      },
    },
    step: {
      type: Number,
      default: 1,
      observer: () => {},
    },
    "step-strictly": {
      type: Boolean,
      default: false,
      observer: () => {},
    },
    precision: {
      type: Number,
      default: 0,
      observer: () => {},
    },
    size: {
      type: ["large", "default", "small"],
      default: "",
      observer: () => {
        this.updateContainerClasslist();
      },
    },
    readonly: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.#inputEl.readOnly = newVal;
      },
    },
    disabled: {
      type: Boolean,
      default: false,
      observer: () => {
        this.updateContainerClasslist();
      },
    },
    controls: {
      type: Boolean,
      default: true,
      observer: () => {
        this.updateContainerClasslist();
      },
    },
    "value-on-clear": {
      type: Number,
      default: "",
      observer: () => {},
    },
    align: {
      type: ["left", "center", "right"],
      default: "center",
      observer: () => {
        this.updateContainerClasslist();
      },
    },
    name: {
      type: String,
      default: "",
      observer: newVal => {
        this.#inputEl.setAttribute("name", newVal);
        this.#inputEl.setAttribute("id", newVal);
      },
    },
    placeholder: {
      type: String,
      default: "",
      observer: newVal => {
        this.#inputEl.setAttribute("placeholder", newVal);
      },
    },
    inputmode: {
      type: String,
      default: "",
      observer: newVal => {
        this.#inputEl.setAttribute("inputmode", newVal);
      },
    },
  });

  componentStatusState = this.properties({
    defaultValue: {
      props: true,
      type: Number,
      default: this.getAttrNumber("value", 0).toFixed(this.precision),
      observer: () => {},
    },
    isFocus: {
      props: true,
      type: Boolean,
      default: false,
      observer: () => {
        this.updateContainerClasslist();
      },
    },
    isMin: {
      props: true,
      type: Boolean,
      default: false,
      observer: () => {
        this.updateContainerClasslist();
      },
    },
    isMax: {
      props: true,
      type: Boolean,
      default: false,
      observer: () => {
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
      "ea-input-number",
      {
        ["--" + this.align]: this.align,
        ["--" + this.size]: this.size,
      },
      {
        focus: this.isFocus,
        min: this.isMin,
        max: this.isMax,
        disabled: this.disabled,
        "no-controls": !this.controls,
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
      <label class="ea-input-number" part="container">
        <span class="ea-input-number__form-label" part="label"></span>
        <section class="ea-input-number__region" part="region">
          <ea-icon class="ea-input-number__operator decrease" part="decrease" icon="icon-minus"></ea-icon>
          <span class="ea-input-number__prefix" part="prefix">
            <slot name="prefix"></slot>
          </span>
          <input class="ea-input-number__inner" part="input" type="number" />
          <span class="ea-input-number__suffix" part="suffix">
            <slot name="suffix"></slot>
          </span>
          <ea-icon class="ea-input-number__operator increase" part="increase" icon="icon-plus"></ea-icon>
        </section>
      </label>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-input-number");
    this.#label = this.shadowRoot.querySelector(".ea-input-number__form-label");
    this.#inputEl = this.shadowRoot.querySelector(".ea-input-number__inner");
    this.#operatorMinus = this.shadowRoot.querySelector(
      ".ea-input-number__operator.decrease"
    );
    this.#operatorPlus = this.shadowRoot.querySelector(
      ".ea-input-number__operator.increase"
    );

    this.updateContainerClasslist();
  }

  /**
   * 获取焦点
   */
  focus = () => {
    this.#inputEl.focus();
  };

  /**
   * 失去焦点
   */
  blur = () => {
    this.#inputEl.blur();
  };

  /**
   * 处理数值的安全边界
   * @param {Number} value
   * @param {Object} param1
   * @param {Number} [param1.precision]
   * @param {Number} [param1.min]
   * @param {Number} [param1.max]
   * @param {Number | String} [param1.defaultValue]
   */
  #handleSanitizeNumber = (
    value = this.value,
    { precision, min, max, defaultValue }
  ) => {
    value = Number(value);

    if (isNaN(value) || !Number.isFinite(value))
      return defaultValue?.toFixed(precision) || "";

    if (value < min) value = min;
    else if (value > max) value = max;

    return value.toFixed(precision);
  };

  /**
   * 加
   */
  #handleValuePlus = () => {
    this.setAttribute(
      "value",
      this.#handleSanitizeNumber(this.value - this.step, {
        precision: this.precision,
        min: this.min,
        max: this.max,
        defaultValue: this.defaultValue,
      })
    );
  };

  /**
   * 减
   */
  #handleValueMinus = () => {
    this.setAttribute(
      "value",
      this.#handleSanitizeNumber(this.value + this.step, {
        precision: this.precision,
        min: this.min,
        max: this.max,
        defaultValue: this.defaultValue,
      })
    );
  };

  /**
   * 当用户可能进行过手动输入时，进行输入框值校验
   */
  #ensureInputValueIsCorrect = e => {
    let correctValue = this.#handleSanitizeNumber(e.target.value, {
      precision: this.precision,
      min: this.min,
      max: this.max,
      defaultValue: this.defaultValue,
    });

    if (this["step-strictly"] && Number(correctValue) % this.step !== 0) {
      correctValue = this.#handleSanitizeNumber(
        Number(correctValue) + (correctValue % this.step),
        {
          precision: this.precision,
          min: this.min,
          max: this.max,
          defaultValue: this.defaultValue,
        }
      );
    }

    this.setAttribute("value", correctValue);

    if (correctValue !== e.target.value) e.target.value = correctValue;

    this.isFocus = false;
  };

  connectedCallback() {
    super.connectedCallback();

    this.value = this.getAttrNumber("value", 0).toFixed(this.precision);
    if (!this.name)
      this.setAttribute("name", Math.random().toString(36).substring(2, 15));

    this.#abortController?.abort();
    this.#abortController = new AbortController();

    // 增加 的 事件
    const increaseEvent = () => {
      if (this.disabled || !this.controls) return;
      this.#handleValuePlus();
    };

    // 减少 的 事件
    const decreaseEvent = () => {
      if (this.disabled || !this.controls) return;
      this.#handleValueMinus();
    };

    this.#operatorMinus.addEventListener("click", increaseEvent, {
      signal: this.#abortController.signal,
    });
    this.#operatorPlus.addEventListener("click", decreaseEvent, {
      signal: this.#abortController.signal,
    });
    this.#inputEl.addEventListener("blur", this.#ensureInputValueIsCorrect, {
      signal: this.#abortController.signal,
    });

    this.#inputEl.addEventListener(
      "focus",
      () => {
        this.isFocus = true;
      },
      {
        signal: this.#abortController.signal,
      }
    );
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
  }
}

if (!window.customElements.get("ea-input-number")) {
  window.customElements.define("ea-input-number", EaInputNumber);
}
