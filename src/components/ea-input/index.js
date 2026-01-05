import FormAssociatedBase from "@/core/FormBase";
import EaUtils from "@/utils/Utils";

import stylesheet from "./index.scss?inline";

export class EaInput extends FormAssociatedBase {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #prepend;
  /** @type {HTMLElement} */
  #inner;
  /** @type {HTMLElement} */
  #prefix;
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

  /** @type {AbortController} */
  #abortController;

  #AbortControllerStates = {
    /** @type {AbortController} */
    clearableController: null,
  };

  static get observedAttributes() {
    return EaUtils.Array.toLowerCamelCase([
      "type",
      "disabled",
      "value",
      "size",
      "placeholder",
      "maxlength",
      "minlength",
      "clearable",
      "clearIcon",
      "showPassword",
      "disabled",
      "prefixIcon",
      "suffixIcon",
      "show-word-limit",

      "rows",
      "autosize",
      "minRows",
      "maxRows",

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
      "validate-event",
      "inputmode",
    ]);
  }

  #states = {
    isFocus: false,
    isMouseenter: false,
    originTextareaHeight: 0,
  };

  state = this.properties({
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
      observer: newVal => {
        if (newVal !== "textarea") this.#original.type = newVal;
        this.#container.className = this.updateContainerClasslist();
      },
    },
    size: {
      type: ["large", "default", "small"],
      default: "default",
      observer: newVal => {
        console.log(newVal);

        this.#container.className = this.updateContainerClasslist();
      },
    },
    value: {
      type: String,
      default: "",
      observer: newVal => {
        this.#original.value = newVal;
        this.setValue(newVal);

        if (this.clearable)
          this.#container.className = this.updateContainerClasslist();
      },
    },
    placeholder: {
      type: String,
      default: "",
      observer: newVal => {
        this.#original.placeholder = newVal;
      },
    },
    maxlength: {
      type: Number,
      default: 0,
      observer: newVal => {
        this.#original.maxLength = newVal;
      },
    },
    minlength: {
      type: Number,
      default: 0,
      observer: newVal => {
        this.#original.minLength = newVal;
      },
    },
    clearable: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.#AbortControllerStates.clearableController?.abort();

        if (newVal) {
          this.#AbortControllerStates.clearableController =
            new AbortController();

          this.#clearIcon.addEventListener(
            "click",
            this.#initClearIconClickEvent,
            {
              signal: this.#AbortControllerStates.clearableController.signal,
            }
          );
        }
      },
    },
    clearIcon: {
      type: String,
      default: "icon-cancel",
      observer: newVal => {
        if (this.clearable) this.#clearIcon.icon = newVal;
      },
    },
    disabled: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.#container.className = this.updateContainerClasslist();
        this.#original.disabled = newVal;
      },
    },
    showPassword: {
      type: Boolean,
      default: false,
      observer: newVal => {
        if (newVal) this.#container.className = this.updateContainerClasslist();

        if (this.type === "text") {
          this.#showPasswordIcon.icon = "icon-eye";
        } else if (this.type === "password") {
          this.#showPasswordIcon.icon = "icon-eye-off";
        }
      },
    },
    prefixIcon: {
      type: String,
      default: "",
      observer: newVal => {
        if (newVal)
          this.#prefix.innerHTML = `<ea-icon class="ea-input__prefix-icon" part="prefix-icon" icon="${newVal}"></ea-icon>`;
      },
    },
    suffixIcon: {
      type: String,
      default: "",
      observer: newVal => {
        if (newVal)
          this.#suffixIcon.innerHTML = `<ea-icon class="ea-input__suffix-icon" part="suffix-icon" icon="${newVal}"></ea-icon>`;
      },
    },

    "show-word-limit": {
      type: Boolean,
      default: false,
      observer: newVal => {
        if (this.type === "textarea" || this.type === "text") {
          if (newVal && this.maxlength) {
            this.#container.className = this.updateContainerClasslist();
            this.#wordCount.textContent = `
            ${this.#original.value.length} / ${this.maxlength}`;
          }
        }
      },
    },

    rows: {
      type: Number,
      default: 2,
      observer: newVal => {
        if (this.type !== "textarea") return;

        this.#original.rows = newVal;
      },
    },
    autosize: {
      type: Boolean,
      default: false,
      observer: newVal => {
        if (this.type !== "textarea") return;
      },
    },
    minRows: {
      type: Number,
      default: 0,
      observer: newVal => {
        if (this.type !== "textarea") return;

        this.#original.minRows = newVal;
      },
    },
    maxRows: {
      type: Number,
      default: 0,
      observer: newVal => {
        if (this.type !== "textarea") return;

        this.#original.maxRows = newVal;
      },
    },

    autocomplete: {
      type: String,
      default: "off",
      observer: newVal => {
        this.#original.autocomplete = newVal;
      },
    },
    name: {
      type: String,
      default: "",
      observer: newVal => {
        this.#original.name = newVal;
      },
    },
    readonly: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.#original.readOnly = newVal;
      },
    },
    max: {
      type: Number,
      default: Infinity,
      observer: newVal => {
        this.#original.max = newVal;
      },
    },
    min: {
      type: Number,
      default: -Infinity,
      observer: newVal => {
        this.#original.min = newVal;
      },
    },
    step: {
      type: Number,
      default: 1,
      observer: newVal => {
        this.#original.step = newVal;
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
      observer: newVal => {
        this.#original.autofocus = newVal;
      },
    },
    form: {
      type: String,
      default: "",
      observer: newVal => {
        this.#original.form = newVal;
      },
    },
    "aria-label": {
      type: String,
      default: "",
      observer: newVal => {
        this.#original.setAttribute("aria-label", newVal);
      },
    },
    tabindex: {
      type: String,
      default: "",
      observer: newVal => {
        this.#original.tabIndex = newVal;
      },
    },
    "validate-event": {
      type: Boolean,
      default: true,
      observer: newVal => {},
    },
    inputmode: {
      type: String,
      default: "",
      observer: newVal => {
        this.#original.inputMode = newVal;
      },
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    return this.computedClasslist(
      "ea-input",
      {
        ["--size-" + this.size]:
          this.type !== "textarea" && this.size !== "default",
        ["--has-prepend"]:
          this.type !== "textarea" && this.querySelector("[slot=prepend]"),
        ["--has-append"]:
          this.type !== "textarea" && this.querySelector("[slot=append]"),
        ["--textarea"]: this.type === "textarea",
        ["--clearable"]:
          this.clearable && this.value && this.type !== "textarea",
        ["--show-password"]: this["show-password"],
        ["--show-word-limit"]:
          this["show-word-limit"] &&
          (this.type === "textarea" || this.type === "text"),
      },
      {
        focus: this.#states.isFocus,
        disabled: this.disabled,
      }
    );
  }

  constructor() {
    super();

    this.stylesheet = stylesheet;

    this.$render();
  }

  $render() {
    this.shadowRoot.innerHTML = `
      <div class="ea-input" part="container">
          <div class="ea-input__prepend" part="prepend">
              <slot name="prepend"></slot>
          </div>
          <div class="ea-input__inner" part="inner">
              <span class="ea-input__prefix" part="prefix">
                <slot name="prefix"></slot>
              </span>
              ${
                this.type === "textarea"
                  ? `<textarea id="${
                      this.id || "original"
                    }" class="ea-input__original" part="original"></textarea>`
                  : `<input id="${
                      this.id || "original"
                    }" class="ea-input__original" type="text" part="original" autocomplete="off" />`
              }
              <span class="ea-input__suffix" part="suffix">
                <span class="ea-input__suffix-icon" part="suffix-icon">
                  <slot name="suffix"></slot>
                </span>
                <ea-icon class="ea-input__clear-icon" icon="icon-cancel" part="clear-icon"></ea-icon>
                <ea-icon class="ea-input__show-password-icon" icon="icon-eye-off" part="show-password-icon"></ea-icon>
                <span class="ea-input__word-count" part="count"></span>
              </span>
          </div>
          <div class="ea-input__append" part="append">
              <slot name="append"></slot>
          </div>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-input");
    this.#prepend = this.shadowRoot.querySelector(".ea-input__prepend");
    this.#inner = this.shadowRoot.querySelector(".ea-input__inner");
    this.#prefix = this.shadowRoot.querySelector(".ea-input__prefix");
    this.#original = this.shadowRoot.querySelector(".ea-input__original");
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
    this.#original.value = "";
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
  #initFocusEvent = e => {
    e.stopPropagation();
    e.stopImmediatePropagation();

    this.#states.isFocus = true;
    this.#container.className = this.updateContainerClasslist();
    this.emit("focus");
  };

  /**
   * 输入框失去焦点时触发
   * @param {FocusEvent} e 事件对象
   */
  #initBlurEvent = e => {
    e.stopPropagation();
    e.stopImmediatePropagation();

    this.#states.isFocus = false;
    this.#container.className = this.updateContainerClasslist();
    this.emit("blur");
  };

  /**
   * 输入框内容发生改变时触发
   * @param {InputEvent} e 事件对象
   */
  #initInputEvent = e => {
    const { value } = e.target;
    this.value = value;
    this.emit("input", {
      detail: {
        value,
      },
    });
  };

  /**
   * 键盘按下时触发
   * @param {KeyboardEvent} e 事件对象
   */
  #initKeydownEvent = e => {
    this.emit("keydown", {
      detail: {
        value: e.target.value,
      },
    });
  };

  /**
   * 鼠标进入时触发
   * @param {MouseEvent} e 事件对象
   */
  #initMouseenterEvent = e => {
    this.emit("mouseenter");
  };

  /**
   * 鼠标离开时触发
   * @param { MouseEvent } e 事件对象
   */
  #initMouseleaveEvent = e => {
    this.emit("mouseleave");
  };

  /**
   * 输入法开始输入时触发
   * @param {CompositionEvent} e 事件对象
   */
  #initCompositionstartEvent = e => {
    this.emit("compositionstart", {
      detail: {
        value: e.target.value,
      },
    });
  };

  /**
   * 输入法输入时触发
   * @param {CompositionEvent} e 事件对象
   */
  #initCompositionupdateEvent = e => {
    this.emit("compositionupdate", {
      detail: {
        value: e.target.value,
      },
    });
  };

  /**
   * 输入法完成输入时触发
   * @param {CompositionEvent} e 事件对象
   */
  #initCompositionendEvent = e => {
    this.emit("compositionend", {
      detail: {
        value: e.target.value,
      },
    });
  };

  /**
   * 初始化基本事件
   */
  #initBasicEvent = () => {
    this.#original.addEventListener("focus", this.#initFocusEvent, {
      signal: this.#abortController.signal,
    });
    this.#original.addEventListener("blur", this.#initBlurEvent, {
      signal: this.#abortController.signal,
    });
    this.#original.addEventListener("input", this.#initInputEvent, {
      signal: this.#abortController.signal,
    });
    this.#original.addEventListener("keydown", this.#initKeydownEvent, {
      signal: this.#abortController.signal,
    });
    this.#original.addEventListener("mouseenter", this.#initMouseenterEvent, {
      signal: this.#abortController.signal,
    });
    this.#original.addEventListener("mouseleave", this.#initMouseleaveEvent, {
      signal: this.#abortController.signal,
    });
    this.#original.addEventListener(
      "compositionstart",
      this.#initCompositionstartEvent,
      {
        signal: this.#abortController.signal,
      }
    );
    this.#original.addEventListener(
      "compositionupdate",
      this.#initCompositionupdateEvent,
      {
        signal: this.#abortController.signal,
      }
    );
    this.#original.addEventListener(
      "compositionend",
      this.#initCompositionendEvent,
      {
        signal: this.#abortController.signal,
      }
    );
  };

  /**
   * 清空按钮点击时触发
   */
  #initClearIconClickEvent = () => {
    this.value = "";

    if (
      this["show-word-limit"] &&
      (this.type === "textarea" || this.type === "text")
    ) {
      this.#wordCount.textContent = `${this.#original.value.length} / ${this.maxlength}`;
    }
    this.focus();
  };

  /**
   * 显示密码按钮点击时触发
   */
  #initShowPasswordIconClickEvent = () => {
    if (this.type === "password") {
      this.type = "text";
      this.#showPasswordIcon.icon = "icon-eye";
    } else if (this.type === "text") {
      this.type = "password";
      this.#showPasswordIcon.icon = "icon-eye-off";
    }

    this.focus();
  };

  /**
   * 初始化`type="text"`的输入框事件
   */
  #initInputElementEvent = () => {
    if (this.type === "textarea") return;

    if (
      this["show-password"] &&
      (this.type === "password" || this.type === "text")
    ) {
      this.#showPasswordIcon.addEventListener(
        "click",
        this.#initShowPasswordIconClickEvent,
        {
          signal: this.#abortController.signal,
        }
      );
    }
  };

  /**
   * 自动调整高度
   */
  #initAutosizeEvent = () => {
    this.#states.originTextareaHeight = this.#original.scrollHeight;
    const lineHeight = this.#states.originTextareaHeight / this.rows;

    this.#original.addEventListener(
      "input",
      e => {
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
      },
      {
        signal: this.#abortController.signal,
      }
    );
  };

  connectedCallback() {
    super.connectedCallback();
    this.#abortController = new AbortController();

    this.#container.className = this.updateContainerClasslist();
    this.#initBasicEvent();
    this.#initInputElementEvent();

    if (this.type === "textarea" && this.autosize) this.#initAutosizeEvent();
    if (
      this["show-word-limit"] &&
      (this.type === "textarea" || this.type === "text")
    )
      this.#original.addEventListener(
        "input",
        () => {
          this.#wordCount.textContent = `
            ${this.#original.value.length} / ${this.maxlength}`;
        },
        {
          signal: this.#abortController.signal,
        }
      );

    this.emit("ea-input-ready");
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
  }
}

if (!window.customElements.get("ea-input")) {
  window.customElements.define("ea-input", EaInput);
}
