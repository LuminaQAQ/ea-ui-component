import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";
import EaUtils from "@/utils/Utils";

export class EaInput extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #prepend;
  /** @type {HTMLElement} */
  #inner;
  /** @type {HTMLElement} */
  #prefix;
  /** @type {HTMLInputElement} */
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
  #append;

  /** @type {AbortController} */
  #abortController;

  static get observedAttributes() {
    return EaUtils.arrayToLowerCamelCase([
      "type",
      "disabled",
      "value",
      "placeholder",
      "maxlength",
      "minlength",
      // "show-word-limit",
      "clearable",
      "clearIcon",
      "showPassword",
      "disabled",
      "prefixIcon",
      "suffixIcon",

      "rows",
    ]);
  }

  #states = {
    isFocus: false,
    isMouseenter: false,
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
      observer: (newVal) => {
        if (newVal !== "textarea") this.#original.type = newVal;
        this.#container.className = this.updateContainerClasslist();
      },
    },
    value: {
      type: String,
      default: "",
      observer: (newVal) => {
        this.#original.value = newVal;

        if (this.clearable)
          this.#container.className = this.updateContainerClasslist();
      },
    },
    placeholder: {
      type: String,
      default: "",
      observer: (newVal) => {
        this.#original.placeholder = newVal;
      },
    },
    maxlength: {
      type: Number,
      default: 0,
      observer: (newVal) => {
        this.#original.maxLength = newVal;
      },
    },
    minlength: {
      type: Number,
      default: 0,
      observer: (newVal) => {
        this.#original.minLength = newVal;
      },
    },
    // "show-word-limit": {
    //   type: Boolean,
    //   default: false,
    //   observer: (newVal) => {
    //     if (this.type === "textarea" || this.type === "text")
    //       this.#container.className = this.updateContainerClasslist();
    //   },
    // },
    clearable: {
      type: Boolean,
      default: false,
      observer: (newVal) => {},
    },
    clearIcon: {
      type: String,
      default: "icon-cancel",
      observer: (newVal) => {
        if (this.clearable) this.#clearIcon.icon = newVal;
      },
    },
    disabled: {
      type: Boolean,
      default: false,
      observer: (newVal) => {
        this.#container.className = this.updateContainerClasslist();
        this.#original.disabled = newVal;
      },
    },
    showPassword: {
      type: Boolean,
      default: false,
      observer: (newVal) => {
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
      observer: (newVal) => {
        if (newVal)
          this.#prefix.innerHTML = `<ea-icon class="ea-input__prefix-icon" part="prefix-icon" icon="${newVal}"></ea-icon>`;
      },
    },
    suffixIcon: {
      type: String,
      default: "",
      observer: (newVal) => {
        if (newVal)
          this.#suffixIcon.innerHTML = `<ea-icon class="ea-input__suffix-icon" part="suffix-icon" icon="${newVal}"></ea-icon>`;
      },
    },

    rows: {
      type: Number,
      default: 2,
      observer: (newVal) => {
        if (this.type !== "textarea") return;

        this.#original.rows = newVal;
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
        ["--textarea"]: this.type === "textarea",
        ["--clearable"]: this.clearable && this.value,
        ["--show-password"]: this["show-password"],
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
                        ? '<textarea id="original" class="ea-input__original" part="original"></textarea>'
                        : '<input id="original" class="ea-input__original" type="text" part="original" autocomplete="off" />'
                    }
                    <span class="ea-input__suffix" part="suffix">
                      <span class="ea-input__suffix-icon" part="suffix-icon">
                        <slot name="suffix"></slot>
                      </span>
                      <ea-icon class="ea-input__clear-icon" icon="icon-cancel" part="clear-icon"></ea-icon>
                      <ea-icon class="ea-input__show-password-icon" icon="icon-eye-off" part="show-password-icon"></ea-icon>
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
  #initFocusEvent = (e) => {
    this.#states.isFocus = true;
    this.#container.className = this.updateContainerClasslist();
    this.dispatchEvent("focus");
  };

  /**
   * 输入框失去焦点时触发
   * @param {FocusEvent} e 事件对象
   */
  #initBlurEvent = (e) => {
    this.#states.isFocus = false;
    this.#container.className = this.updateContainerClasslist();
    this.dispatchEvent("blur");
  };

  /**
   * 输入框内容发生改变时触发
   * @param {InputEvent} e 事件对象
   */
  #initInputEvent = (e) => {
    const { value } = e.target;
    this.value = value;
    this.dispatchEvent("input", {
      detail: {
        value,
      },
    });
  };

  /**
   * 键盘按下时触发
   * @param {KeyboardEvent} e 事件对象
   */
  #initKeydownEvent = (e) => {
    this.dispatchEvent("keydown", {
      detail: {
        value: e.target.value,
      },
    });
  };

  /**
   * 鼠标进入时触发
   * @param {MouseEvent} e 事件对象
   */
  #initMouseenterEvent = (e) => {
    this.dispatchEvent("mouseenter");
  };

  /**
   * 鼠标离开时触发
   * @param { MouseEvent } e 事件对象
   */
  #initMouseleaveEvent = (e) => {
    this.dispatchEvent("mouseleave");
  };

  /**
   * 输入法开始输入时触发
   * @param {CompositionEvent} e 事件对象
   */
  #initCompositionstartEvent = (e) => {
    this.dispatchEvent("compositionstart", {
      detail: {
        value: e.target.value,
      },
    });
  };

  /**
   * 输入法输入时触发
   * @param {CompositionEvent} e 事件对象
   */
  #initCompositionupdateEvent = (e) => {
    this.dispatchEvent("compositionupdate", {
      detail: {
        value: e.target.value,
      },
    });
  };

  /**
   * 输入法完成输入时触发
   * @param {CompositionEvent} e 事件对象
   */
  #initCompositionendEvent = (e) => {
    this.dispatchEvent("compositionend", {
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

  connectedCallback() {
    super.connectedCallback();
    this.#abortController = new AbortController();

    this.#initBasicEvent();

    if (this.clearable) {
      this.#clearIcon.addEventListener("click", this.#initClearIconClickEvent, {
        signal: this.#abortController.signal,
      });
    }

    if (this["show-password"]) {
      this.#showPasswordIcon.addEventListener(
        "click",
        this.#initShowPasswordIconClickEvent,
        {
          signal: this.#abortController.signal,
        }
      );
    }
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
  }
}

if (!window.customElements.get("ea-input")) {
  window.customElements.define("ea-input", EaInput);
}
