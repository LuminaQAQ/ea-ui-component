import FormAssociatedBase from "@/core/FormBase";
import EaUtils from "@/utils/Utils";

import stylesheet from "./index.scss?inline";
import { EaClearEvent } from "./events/EaClearEvent";

export class EaInput extends FormAssociatedBase {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #prepend;
  /** @type {HTMLElement} */
  #inner;
  /** @type {HTMLElement} */
  #prefixSlot;
  /** @type {HTMLElement} */
  #originalWrapper;
  /** @type {HTMLInputElement | HTMLTextAreaElement} */
  #original;
  /** @type {HTMLElement} */
  #suffix;
  /** @type {HTMLElement} */
  #suffixIcon;
  /** @type {HTMLElement} */
  #clearIcon;
  /** @type {HTMLElement} */
  #showPasswordIcon;
  /** @type {HTMLElement} */
  #wordCount;
  /** @type {HTMLElement} */
  #append;
  /** @type {HTMLElement} */
  #label;

  /** @type {AbortController} */
  #abortController;

  #AbortControllerStates = {
    /** @type {AbortController} */
    clearableController: null,
    /** @type {AbortController} */
    showPasswordController: null,
    /** @type {AbortController} */
    autosizeController: null,
    /** @type {AbortController} */
    wordCountController: null,
  };

  static get observedAttributes() {
    return EaUtils.Array.toLowerCamelCase([
      ...super.observedAttributes,
      "label",
      "type",
      "disabled",
      "value",
      "size",
      "placeholder",
      "maxlength",
      "minlength",
      "clearable",
      "clear-icon",
      "show-password",
      "disabled",
      "prefix-icon",
      "suffix-icon",
      "show-word-limit",

      "rows",
      "autosize",
      "min-rows",
      "max-rows",

      "autocomplete",
      "name",
      "readonly",
      "max",
      "min",
      "step",
      "resize",
      "autofocus",
      "form",
      "aria-label",
      "tabindex",
      "inputmode",
    ]);
  }

  #states = {
    isFocus: false,
    isMouseenter: false,
    originTextareaHeight: 0,

    isOriginalRendered: false,
  };

  #renderedStates = {
    isOriginalRenderedPromise: new Promise(resolve => {
      this.#states = new Proxy(this.#states, {
        set: (target, key, value) => {
          if (key === "isOriginalRendered" && value) {
            resolve(true);
          }
          return Reflect.set(target, key, value);
        },
      });
    }),
  };

  /**
   * 获取验证目标元素
   * @returns {HTMLElement}
   */
  get validationTarget() {
    return this.#original;
  }

  state = this.properties({
    label: {
      type: String,
      default: "",
      observer: async newVal => {
        await this.#renderedStates.isOriginalRenderedPromise;
        this.#label.textContent = newVal;
      },
    },
    type: {
      type: [
        "textarea",
        "text",
        "button",
        "checkbox",
        "color",
        "date",
        "datetime-local",
        "email",
        "file",
        "hidden",
        "image",
        "month",
        "number",
        "password",
        "radio",
        "range",
        "reset",
        "search",
        "submit",
        "tel",
        "time",
        "url",
        "week",
      ],
      default: "text",
      observer: async newVal => {
        this.#renderOriginal(newVal);
        this.updateContainerClasslist();
      },
    },
    size: {
      type: ["large", "default", "small"],
      default: "default",
      observer: newVal => {
        this.updateContainerClasslist();
      },
    },
    value: {
      type: String,
      default: "",
      observer: async newVal => {
        await this.#renderedStates.isOriginalRenderedPromise;

        newVal = typeof newVal === "string" && newVal === "" ? null : newVal;
        this.#original.value = newVal;
        this.setValue(newVal);

        this.resetCustomValidity();

        if (this.clearable || this["show-password"]) {
          this.updateContainerClasslist();
        }
      },
    },
    required: {
      type: Boolean,
      default: false,
      observer: async newVal => {
        await this.#renderedStates.isOriginalRenderedPromise;
        this.#original.required = newVal;
      },
    },
    placeholder: {
      type: String,
      default: "",
      observer: async newVal => {
        await this.#renderedStates.isOriginalRenderedPromise;

        this.#original.placeholder = newVal;
      },
    },
    maxlength: {
      type: Number,
      default: 0,
      observer: async newVal => {
        await this.#renderedStates.isOriginalRenderedPromise;
        this.#original.maxLength = newVal;
      },
    },
    minlength: {
      type: Number,
      default: 0,
      observer: async newVal => {
        await this.#renderedStates.isOriginalRenderedPromise;
        this.#original.minLength = newVal;
      },
    },
    clearable: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.#AbortControllerStates.clearableController?.abort();
        this.updateContainerClasslist();

        if (newVal) {
          this.#AbortControllerStates.clearableController =
            new AbortController();

          this.#clearIcon.addEventListener(
            "click",
            this.#onClearIconClickEvent,
            {
              signal: this.#AbortControllerStates.clearableController.signal,
            }
          );
        }
      },
    },
    "clear-icon": {
      type: String,
      default: "xmark",
      observer: newVal => {
        if (this.clearable) this.#clearIcon.setAttribute("name", newVal);
      },
    },
    disabled: {
      type: Boolean,
      default: false,
      observer: async newVal => {
        await this.#renderedStates.isOriginalRenderedPromise;
        this.#original.disabled = newVal;
        this.updateContainerClasslist();
      },
    },
    "show-password": {
      type: Boolean,
      default: false,
      observer: newVal => {
        if (this.type === "textarea") return;

        this.#AbortControllerStates.showPasswordController?.abort();

        if (this.type === "text") {
          this.#showPasswordIcon.name = "eye";
        } else if (this.type === "password") {
          this.#showPasswordIcon.name = "eye-slash";
        }

        if (newVal && (this.type === "password" || this.type === "text")) {
          this.#AbortControllerStates.showPasswordController =
            new AbortController();

          this.#showPasswordIcon.addEventListener(
            "click",
            this.#onShowPasswordIconClickEvent,
            {
              signal: this.#AbortControllerStates.showPasswordController.signal,
            }
          );
        }

        this.updateContainerClasslist();
      },
    },
    "prefix-icon": {
      type: String,
      default: "",
      observer: newVal => {
        if (newVal)
          this.#prefixSlot.innerHTML = `<ea-icon class="ea-input__prefix-icon" part="prefix-icon" name="${newVal}"></ea-icon>`;
      },
    },
    "suffix-icon": {
      type: String,
      default: "",
      observer: newVal => {
        if (newVal)
          this.#suffixIcon.innerHTML = `<ea-icon class="ea-input__suffix-icon" part="suffix-icon" name="${newVal}"></ea-icon>`;
      },
    },

    "show-word-limit": {
      type: Boolean,
      default: false,
      observer: async newVal => {
        if (this.type !== "textarea" && this.type !== "text") return;

        await this.#renderedStates.isOriginalRenderedPromise;

        this.#AbortControllerStates.wordCountController?.abort();

        if (newVal && this.hasAttribute("maxlength")) {
          this.#AbortControllerStates.wordCountController =
            new AbortController();

          this.#onWordLimitTextShouldUpdate();
          this.#original.addEventListener(
            "input",
            this.#onWordLimitTextShouldUpdate,
            {
              signal: this.#AbortControllerStates.wordCountController.signal,
            }
          );
        }

        this.updateContainerClasslist();
      },
    },

    rows: {
      type: Number,
      default: 2,
      observer: async newVal => {
        if (this.type !== "textarea") return;

        await this.#renderedStates.isOriginalRenderedPromise;

        this.#original.rows = newVal;
      },
    },
    autosize: {
      type: Boolean,
      default: false,
      observer: async newVal => {
        if (this.type !== "textarea") return;

        await this.#renderedStates.isOriginalRenderedPromise;

        this.#AbortControllerStates.autosizeController?.abort();

        void this.#original.clientHeight;

        this.#states.originTextareaHeight = this.#original.scrollHeight;

        if (newVal) {
          this.#AbortControllerStates.autosizeController =
            new AbortController();

          this.#original.addEventListener("input", this.#onAutosizeEvent, {
            signal: this.#AbortControllerStates.autosizeController.signal,
          });
        }
      },
    },
    "min-rows": {
      type: Number,
      default: 0,
      observer: async newVal => {
        if (this.type !== "textarea") return;

        await this.#renderedStates.isOriginalRenderedPromise;

        this.#original.minRows = newVal;
      },
    },
    "max-rows": {
      type: Number,
      default: 0,
      observer: async newVal => {
        if (this.type !== "textarea") return;

        await this.#renderedStates.isOriginalRenderedPromise;

        this.#original.maxRows = newVal;
      },
    },

    autocomplete: {
      type: String,
      default: "off",
      observer: async newVal => {
        await this.#renderedStates.isOriginalRenderedPromise;
        this.#original.autocomplete = newVal;
      },
    },
    name: {
      type: String,
      default: "",
      observer: async newVal => {
        await this.#renderedStates.isOriginalRenderedPromise;
        this.#original.name = newVal;
      },
    },
    readonly: {
      type: Boolean,
      default: false,
      observer: async newVal => {
        await this.#renderedStates.isOriginalRenderedPromise;
        this.#original.readOnly = newVal;
      },
    },
    max: {
      type: Number,
      default: Number.MAX_SAFE_INTEGER,
      observer: async newVal => {
        await this.#renderedStates.isOriginalRenderedPromise;
        this.#original.max = newVal;
      },
    },
    min: {
      type: Number,
      default: Number.MIN_SAFE_INTEGER,
      observer: async newVal => {
        await this.#renderedStates.isOriginalRenderedPromise;
        this.#original.min = newVal;
      },
    },
    step: {
      type: Number,
      default: 1,
      observer: async newVal => {
        await this.#renderedStates.isOriginalRenderedPromise;
        this.#original.step = newVal;
      },
    },
    pattern: {
      type: String,
      default: "",
      observer: async newVal => {
        await this.#renderedStates.isOriginalRenderedPromise;
        this.#original.pattern = newVal;
      },
    },
    resize: {
      type: ["none", "both", "horizontal", "vertical"],
      default: "vertical",
      observer: newVal => {
        this.style.setProperty("--ea-input-resize", newVal);
      },
    },
    autofocus: {
      type: Boolean,
      default: false,
      observer: async newVal => {
        await this.#renderedStates.isOriginalRenderedPromise;
        this.#original.autofocus = newVal;
      },
    },
    form: {
      type: String,
      default: "",
      observer: async newVal => {
        await this.#renderedStates.isOriginalRenderedPromise;
        this.#original.form = newVal;
      },
    },
    "aria-label": {
      type: String,
      default: "",
      observer: async newVal => {
        await this.#renderedStates.isOriginalRenderedPromise;
        this.#original.setAttribute("aria-label", newVal);
      },
    },
    tabindex: {
      type: String,
      default: "",
      observer: async newVal => {
        await this.#renderedStates.isOriginalRenderedPromise;
        this.#original.tabIndex = newVal;
      },
    },
    inputmode: {
      type: String,
      default: "",
      observer: async newVal => {
        await this.#renderedStates.isOriginalRenderedPromise;
        this.#original.inputMode = newVal;
      },
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist(
      "ea-input",
      {
        ["--size-" + this.size]:
          this.type !== "textarea" && this.size !== "default",
        ["--has-prepend"]:
          this.type !== "textarea" && this.querySelector("[slot=prepend]"),
        ["--has-append"]:
          this.type !== "textarea" && this.querySelector("[slot=append]"),
        ["--textarea"]: this.type === "textarea",
        ["--show-password"]:
          this["show-password"] && this.value && this.type !== "textarea",
        ["--show-word-limit"]:
          this["show-word-limit"] &&
          (this.type === "textarea" || this.type === "text"),
      },
      {
        focus: this.#states.isFocus,
        disabled: this.disabled,
        clearable: this.clearable && this.value && this.type !== "textarea",
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

  /**
   * 渲染函数，因为在 vue 环境下 constructor 中，有概率获取不到 type，所以渲染会出问题。
   * 所以最后的办法就是 将与 original 相关的 js 逻辑，需要等待 original 渲染完成之后再执行。
   * @param {String} type
   */
  #renderOriginal = type => {
    const id = this.id || Math.random().toString(36).substring(2, 7);
    const tpl =
      type === "textarea"
        ? `<textarea id="${id}" class="ea-input__original" part="original"></textarea>`
        : `<input id="${id}" class="ea-input__original" type="${type}" part="original" />`;

    this.#originalWrapper.innerHTML = tpl;
    this.#original = this.#originalWrapper.querySelector(".ea-input__original");
    this.#original.value = this.value;

    this.#states.isOriginalRendered = true;
  };

  $render() {
    this.shadowRoot.innerHTML = `
      <label class="ea-input" part="container">
        <span class="ea-input__form-label" part="label"></span>
        <section class="ea-input__region" part="region">
          <div class="ea-input__prepend" part="prepend">
            <slot name="prepend"></slot>
          </div>
          <div class="ea-input__inner" part="inner">
            <span class="ea-input__prefix" part="prefix">
              <slot name="prefix"></slot>
            </span>
            <span class="ea-input__original-wrapper" part="original-wrapper">
            </span>
            <span class="ea-input__suffix" part="suffix">
              <ea-icon class="ea-input__clear-icon" name="xmark" part="clear-icon"></ea-icon>
              <ea-icon class="ea-input__show-password-icon" name="eye-slash" part="show-password-icon"></ea-icon>
              <span class="ea-input__suffix-icon" part="suffix-icon">
                <slot name="suffix"></slot>
              </span>
              <span class="ea-input__word-count" part="count"></span>
            </span>
          </div>
          <div class="ea-input__append" part="append">
            <slot name="append"></slot>
          </div>
        </section>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-input");
    this.#label = this.shadowRoot.querySelector(".ea-input__form-label");
    this.#prepend = this.shadowRoot.querySelector(".ea-input__prepend");
    this.#inner = this.shadowRoot.querySelector(".ea-input__inner");
    this.#prefixSlot = this.shadowRoot.querySelector(
      ".ea-input__prefix slot[name='prefix']"
    );
    this.#originalWrapper = this.shadowRoot.querySelector(
      ".ea-input__original-wrapper"
    );
    this.#suffix = this.shadowRoot.querySelector(".ea-input__suffix");
    this.#suffixIcon = this.shadowRoot.querySelector(".ea-input__suffix-icon");
    this.#clearIcon = this.shadowRoot.querySelector(".ea-input__clear-icon");
    this.#showPasswordIcon = this.shadowRoot.querySelector(
      ".ea-input__show-password-icon"
    );
    this.#wordCount = this.shadowRoot.querySelector(".ea-input__word-count");
    this.#append = this.shadowRoot.querySelector(".ea-input__append");
  }

  /**
   * 获取焦点
   */
  focus() {
    this.#states.isFocus = true;
    this.#original.focus();
  }

  /**
   * 失去焦点
   */
  blur() {
    this.#states.isFocus = false;
    this.#original.blur();
  }

  /**
   * 清空输入框内容
   */
  clear() {
    this.value = "";
    this.#original.value = "";
    if (this["show-word-limit"] && this.maxlength) {
      this.#onWordLimitTextShouldUpdate();
    }
  }

  /**
   * 选中输入框内容
   */
  select() {
    this.#original.select();
  }

  /**
   * 输入框内容发生改变时触发
   * @param {FocusEvent} e 事件对象
   */
  #onFocusEvent = e => {
    this.#states.isFocus = true;
    this.updateContainerClasslist();
  };

  /**
   * 输入框失去焦点时触发
   * @param {FocusEvent} e 事件对象
   */
  #onBlurEvent = e => {
    this.#states.isFocus = false;
    this.updateContainerClasslist();
  };

  /**
   * 输入框内容发生改变时触发
   * @param {InputEvent} e 事件对象
   */
  #onInputEvent = e => {
    const { value } = e.target;
    this.value = value;
  };

  /**
   * 初始化基本事件
   */
  #initBasicEvent = () => {
    this.#original.addEventListener("focus", this.#onFocusEvent, {
      signal: this.#abortController.signal,
    });
    this.#original.addEventListener("blur", this.#onBlurEvent, {
      signal: this.#abortController.signal,
    });
    this.#original.addEventListener("input", this.#onInputEvent, {
      signal: this.#abortController.signal,
    });
  };

  /**
   * 清空按钮点击时触发
   */
  #onClearIconClickEvent = () => {
    const oldValue = this.value;

    this.clear();

    if (
      this["show-word-limit"] &&
      (this.type === "textarea" || this.type === "text")
    ) {
      this.#onWordLimitTextShouldUpdate();
    }

    this.focus();

    this.dispatchEvent(new EaClearEvent({ oldValue }));
  };

  /**
   * 显示密码按钮点击时触发
   */
  #onShowPasswordIconClickEvent = () => {
    if (this.type === "password") {
      this.type = "text";
      this.#showPasswordIcon.name = "eye";
    } else if (this.type === "text") {
      this.type = "password";
      this.#showPasswordIcon.name = "eye-slash";
    }

    this.focus();
  };

  /**
   * 自动调整高度
   * @param {InputEvent} e
   */
  #onAutosizeEvent = e => {
    const lineHeight = this.#states.originTextareaHeight / this.rows;

    if (
      this["min-rows"] > 0 &&
      this.#original.scrollHeight < this["min-rows"] * lineHeight
    )
      return;

    if (
      this["max-rows"] > 0 &&
      this.#original.scrollHeight > this["max-rows"] * lineHeight
    )
      return;

    this.#original.style.height = `${this.#states.originTextareaHeight}px`;
    void this.#original.scrollHeight;
    this.#original.style.height = `${e.target.scrollHeight + 2}px`;
  };

  /**
   * 当包含 show-word-limit 属性时，更新字数统计
   */
  #onWordLimitTextShouldUpdate = () => {
    this.#wordCount.textContent = `${this.#original.value.length} / ${this.maxlength}`;
  };

  connectedCallback() {
    super.connectedCallback();

    this.#abortController?.abort();
    this.#abortController = new AbortController();

    if (!this.hasAttribute("type")) {
      this.type = this.type; // eslint-disable-line no-self-assign
    }

    this.updateContainerClasslist();

    this.#initBasicEvent();
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
    this.#abortController = null;

    for (const key in this.#AbortControllerStates) {
      this.#AbortControllerStates[key]?.abort();
      this.#AbortControllerStates[key] = null;
    }
  }

  /**
   * 更新表单验证状态
   */
  updateValidity() {
    super.updateValidity();

    const value = this.value || "";
    if (
      this.minlength > 0 &&
      value.length > 0 &&
      value.length < this.minlength
    ) {
      this.internals.setValidity(
        { tooShort: true },
        `请至少输入 ${this.minlength} 个字符`,
        this.#original
      );

      this.internals.reportValidity();
    }

    if (this.maxlength > 0 && value.length > this.maxlength) {
      this.internals.setValidity(
        { tooLong: true },
        `请最多输入 ${this.maxlength} 个字符`,
        this.#original
      );

      this.internals.reportValidity();
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

if (!window.customElements.get("ea-input")) {
  window.customElements.define("ea-input", EaInput);
}
