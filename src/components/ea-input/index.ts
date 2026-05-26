import { EaFormAssociatedBase } from "@core/EaFormAssociatedBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import { listen } from "@decorator/listen";
import { createBEM } from "@utils/bem";
import { html } from "@utils/html";
import { Enum } from "@/utils/Enum";
import { EaClearEvent } from "./events/EaClearEvent";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-input" as const;
const bem = createBEM(TAG_NAME);

// ==================== 类型定义 ====================

export type InputType =
  | "textarea"
  | "text"
  | "button"
  | "checkbox"
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "hidden"
  | "image"
  | "month"
  | "number"
  | "password"
  | "radio"
  | "range"
  | "reset"
  | "search"
  | "submit"
  | "tel"
  | "time"
  | "url"
  | "week";

export type InputSize = "large" | "default" | "small";

export type ResizeType = "none" | "both" | "horizontal" | "vertical";

// ==================== 组件类 ====================

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaInput extends EaFormAssociatedBase {
  // ==================== DOM 元素引用 ====================

  @query(".ea-input")
  private _container!: HTMLElement;

  @query(".ea-input__prepend")
  private _prepend!: HTMLElement;

  @query(".ea-input__inner")
  private _inner!: HTMLElement;

  @query('slot[name="prefix"]')
  private _prefixSlot!: HTMLElement;

  @query(".ea-input__original-wrapper")
  private _originalWrapper!: HTMLElement;

  @query(".ea-input__original")
  private _original!: HTMLInputElement | HTMLTextAreaElement;

  @query(".ea-input__suffix")
  private _suffix!: HTMLElement;

  @query(".ea-input__suffix-icon")
  private _suffixIcon!: HTMLElement;

  @query(".ea-input__clear-icon")
  private _clearIcon!: HTMLElement;

  @query(".ea-input__show-password-icon")
  private _showPasswordIcon!: HTMLElement;

  @query(".ea-input__word-count")
  private _wordCount!: HTMLElement;

  @query(".ea-input__append")
  private _append!: HTMLElement;

  @query(".ea-input__form-label")
  private _label!: HTMLElement;

  /** @type {AbortController} */
  private _abortController?: AbortController | null;

  private _states = {
    isFocus: false,
    isMouseenter: false,
    originTextareaHeight: 0,
  };

  // ==================== 属性定义 ====================

  @attribute({
    type: String,
    default: "",
    observer(this: EaInput, newVal: string) {
      this._label.textContent = newVal;
    },
  })
  label: string = "";

  @attribute({
    type: Enum([
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
    ]),
    default: "text",
    observer(this: EaInput, newVal: InputType) {
      this._renderOriginal(newVal);
      this.updateContainerClasslist();
    },
  })
  type: InputType = "text";

  @attribute({
    type: Enum(["large", "default", "small"]),
    default: "default",
    observer(this: EaInput) {
      this.updateContainerClasslist();
    },
  })
  size: InputSize = "default";

  @attribute({
    type: String,
    default: "",
    observer(this: EaInput, newVal: string | null) {
      newVal = typeof newVal === "string" && newVal === "" ? null : newVal;

      this._original.value = newVal || "";
      this.setValue(newVal);

      this.resetCustomValidity();

      if (this.clearable || this.showPassword) {
        this.updateContainerClasslist();
      }
    },
  })
  value: string = "";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaInput, newVal: boolean) {
      this._original.required = newVal;
    },
  })
  required: boolean = false;

  @attribute({
    type: String,
    default: "",
    observer(this: EaInput, newVal: string) {
      this._original.placeholder = newVal;
    },
  })
  placeholder: string = "";

  @attribute({
    type: Number,
    default: undefined,
    observer(this: EaInput, newVal: number) {
      if (this.hasAttribute("maxlength")) this._original.maxLength = newVal;
    },
  })
  maxlength: number | null = null;

  @attribute({
    type: Number,
    default: undefined,
    observer(this: EaInput, newVal: number) {
      if (newVal > 0) this._original.minLength = newVal;
    },
  })
  minlength: number | null = null;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaInput) {
      this.updateContainerClasslist();
    },
  })
  clearable: boolean = false;

  @attribute({
    type: String,
    default: "xmark",
    observer(this: EaInput, newVal: string) {
      if (this.clearable) this._clearIcon.setAttribute("name", newVal);
    },
  })
  clearIcon: string = "xmark";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaInput, newVal: boolean) {
      this._original.disabled = newVal;
      this.updateContainerClasslist();
    },
  })
  disabled: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaInput, newVal: boolean) {
      if (this.type === "textarea") return;

      if (this.type === "text") {
        this._showPasswordIcon.setAttribute("name", "eye");
      } else if (this.type === "password") {
        this._showPasswordIcon.setAttribute("name", "eye-slash");
      }

      this.updateContainerClasslist();
    },
  })
  showPassword: boolean = false;

  @attribute({
    type: String,
    default: "",
    observer(this: EaInput, newVal: string) {
      if (newVal)
        this._prefixSlot.innerHTML = html(
          `<ea-icon class="ea-input__prefix-icon" part="prefix-icon" name="${newVal}"></ea-icon>`
        );
    },
  })
  prefixIcon: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaInput, newVal: string) {
      if (newVal)
        this._suffixIcon.innerHTML = html(
          `<ea-icon class="ea-input__suffix-icon" part="suffix-icon" name="${newVal}"></ea-icon>`
        );
    },
  })
  suffixIcon: string = "";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaInput, newVal: boolean) {
      if (this.type !== "textarea" && this.type !== "text") return;

      if (newVal && this.hasAttribute("maxlength")) {
        this._onWordLimitTextShouldUpdate();
      }

      this.updateContainerClasslist();
    },
  })
  showWordLimit: boolean = false;

  @attribute({
    type: Number,
    default: 2,
    observer(this: EaInput, newVal: number) {
      if (this.type !== "textarea") return;

      if (this._original instanceof HTMLTextAreaElement) {
        this._original.rows = newVal;
      }
    },
  })
  rows: number = 2;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaInput, newVal: boolean) {
      if (this.type !== "textarea") return;

      void this._original.clientHeight;

      this._states.originTextareaHeight = this._original.scrollHeight;
    },
  })
  autosize: boolean = false;

  @attribute({
    type: Number,
    default: 0,
    observer(this: EaInput, newVal: number) {},
  })
  minRows: number | string | null = null;

  @attribute({
    type: Number,
    default: 0,
    observer(this: EaInput, newVal: number) {},
  })
  maxRows: number | string | null = null;

  @attribute({
    type: String,
    default: "off",
    observer(this: EaInput, newVal: AutoFill) {
      this._original.autocomplete = newVal;
    },
  })
  autocomplete: AutoFill = "off";

  @attribute({
    type: String,
    default: "",
    observer(this: EaInput, newVal: string) {
      this._original.name = newVal;
    },
  })
  name: string = "";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaInput, newVal: boolean) {
      this._original.readOnly = newVal;
    },
  })
  readonly: boolean = false;

  @attribute({
    type: Number,
    default: Number.MAX_SAFE_INTEGER,
    observer(this: EaInput, newVal: string) {
      if (this._original instanceof HTMLInputElement) {
        this._original.max = newVal;
      }
    },
  })
  max: number | string | null = null;

  @attribute({
    type: Number,
    default: Number.MIN_SAFE_INTEGER,
    observer(this: EaInput, newVal: string) {
      if (this._original instanceof HTMLInputElement) {
        this._original.min = newVal;
      }
    },
  })
  min: number | string | null = null;

  @attribute({
    type: Number,
    default: 1,
    observer(this: EaInput, newVal: string) {
      if (this._original instanceof HTMLInputElement) {
        this._original.step = newVal;
      }
    },
  })
  step: number | string = 1;

  @attribute({
    type: String,
    default: "",
    observer(this: EaInput, newVal: string) {
      if (this._original instanceof HTMLInputElement) {
        if (newVal) {
          this._original.pattern = newVal;
        } else {
          this._original.removeAttribute("pattern");
        }
      }
    },
  })
  pattern: string | null = null;

  @attribute({
    type: Enum(["none", "both", "horizontal", "vertical"]),
    default: "vertical",
    observer(this: EaInput, newVal: ResizeType) {},
  })
  resize: ResizeType = "vertical";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaInput, newVal: boolean) {
      this._original.autofocus = newVal;
    },
  })
  autofocus: boolean = false;

  @attribute({
    type: String,
    default: "",
    observer(this: EaInput, newVal: string) {
      this._original.setAttribute("form", newVal);
    },
  })
  form: HTMLFormElement | null = null;

  @attribute({
    type: String,
    default: "",
    observer(this: EaInput, newVal: string) {
      this._original.setAttribute("aria-label", newVal);
    },
  })
  ariaLabel: string | null = null;

  @attribute({
    type: String,
    default: "",
    observer(this: EaInput, newVal: string) {
      this._original.tabIndex = newVal ? parseInt(newVal) : 0;
    },
  })
  tabindex: string | null = null;

  @attribute({
    type: String,
    default: "",
    observer(this: EaInput, newVal: string) {
      this._original.inputMode = newVal;
    },
  })
  inputmode: string = "";

  /**
   * 获取验证目标元素
   * @returns {HTMLElement}
   */
  get validationTarget() {
    return this._original;
  }

  /**
   * 更新容器类名
   */
  updateContainerClasslist(): string {
    const isTextarea = this.type === "textarea";
    const isText = this.type === "text";
    const hasPrepend =
      !isTextarea && (this as any).querySelector("[slot=prepend]");
    const hasAppend =
      !isTextarea && (this as any).querySelector("[slot=append]");
    const showPassword =
      this.showPassword &&
      this.value &&
      !isTextarea &&
      (this.type === "password" || this.type === "text");
    const showWordLimit = this.showWordLimit && (isTextarea || isText);
    const clearable = this.clearable && this.value?.length && !isTextarea;
    const hasSize = !isTextarea && this.size !== "default";

    const className = bem(
      {
        textarea: isTextarea,
        "show-password": showPassword,
        "show-word-limit": showWordLimit,
        "has-prepend": hasPrepend,
        "has-append": hasAppend,
        ["size-" + this.size]: hasSize,
      },
      {
        focus: this._states.isFocus,
        disabled: this.disabled,
        clearable: clearable,
      }
    );

    if (this._container) this._container.className = className;

    return className;
  }

  constructor() {
    super();
  }

  /**
   * 渲染原始输入元素
   * @param type 输入类型
   */
  private _renderOriginal(type: InputType): void {
    const id =
      this.getAttribute("id") || Math.random().toString(36).substring(2, 7);
    const tpl =
      type === "textarea"
        ? `<textarea id="${id}" class="ea-input__original" part="original"></textarea>`
        : `<input id="${id}" class="ea-input__original" type="${type}" part="original" />`;

    this._originalWrapper.innerHTML = html(tpl);

    // 初始化原始输入元素的属性
    this._original.value = this.value;
    this._original.disabled = this.disabled;
    this._original.readOnly = this.readonly;
    this._original.placeholder = this.placeholder;
    this._original.required = this.required;
    this._original.autocomplete = this.autocomplete;
    this._original.autofocus = this.autofocus;
    this._original.name = this.name;

    if (this.maxlength && this.maxlength > 0) {
      this._original.maxLength = this.maxlength as number;
    }
    if (this.minlength && this.minlength > 0) {
      this._original.minLength = this.minlength as number;
    }

    if (type !== "textarea") {
      const inputElement = this._original as HTMLInputElement;
      inputElement.max = this.max as string;
      inputElement.min = this.min as string;
      inputElement.step = this.step as string;
      if (this.pattern) {
        inputElement.pattern = this.pattern as string;
      }
    }

    if (this.form) {
      this._original.setAttribute("form", this.form?.id || "");
    }
    if (this.ariaLabel) {
      this._original.setAttribute("aria-label", this.ariaLabel || "");
    }
    if (this.tabindex) {
      this._original.tabIndex = this.tabindex ? parseInt(this.tabindex) : 0;
    }

    this._initBasicEvent();
  }

  /**
   * 渲染模板
   */
  html(): string {
    const id =
      (this as any).getAttribute("id") ||
      Math.random().toString(36).substring(2, 7);
    const tpl =
      this.type === "textarea"
        ? `<textarea id="${id}" class="ea-input__original" part="original"></textarea>`
        : `<input id="${id}" class="ea-input__original" type="${this.type || "text"}" part="original" />`;

    return `
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
              ${tpl}
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
      </label>
    `;
  }

  /**
   * 获取焦点
   */
  focus() {
    this._states.isFocus = true;
    this._original.focus();
  }

  /**
   * 失去焦点
   */
  blur() {
    this._states.isFocus = false;
    this._original.blur();
  }

  /**
   * 清空输入框内容
   */
  clear() {
    this.value = "";
    this._original.value = "";
    if (this.showWordLimit && this.maxlength) {
      this._onWordLimitTextShouldUpdate();
    }
  }

  /**
   * 选中输入框内容
   */
  select() {
    this._original.select();
  }

  /**
   * 输入框内容发生改变时触发
   * @param {FocusEvent} e 事件对象
   */
  private _onFocusEvent = (e: Event): void => {
    this._states.isFocus = true;
    this.updateContainerClasslist();
  };

  /**
   * 输入框失去焦点时触发
   * @param {FocusEvent} e 事件对象
   */
  private _onBlurEvent = (e: Event): void => {
    this._states.isFocus = false;
    this.updateContainerClasslist();
  };

  /**
   * 输入框内容发生改变时触发
   * @param {InputEvent} e 事件对象
   */
  private _onInputEvent = (e: Event): void => {
    const { value } = e.target as HTMLInputElement;
    this.value = value;
    this.dispatchEvent(new CustomEvent("input", { detail: value }));
  };

  /**
   * 初始化基本事件
   */
  private _initBasicEvent = (): void => {
    this._abortController?.abort();
    this._abortController = new AbortController();

    this._original.addEventListener("focus", this._onFocusEvent, {
      signal: this._abortController.signal,
    });
    this._original.addEventListener("blur", this._onBlurEvent, {
      signal: this._abortController.signal,
    });
    this._original.addEventListener("input", this._onInputEvent, {
      signal: this._abortController.signal,
    });
  };

  /**
   * 清空按钮点击时触发
   */
  @listen("click", ".ea-input__clear-icon")
  private _onClearIconClickEvent(): void {
    if (!this.clearable) return;

    const oldValue = this.value;

    this.clear();

    if (
      this.showWordLimit &&
      (this.type === "textarea" || this.type === "text")
    ) {
      this._onWordLimitTextShouldUpdate();
    }

    this.focus();

    this.dispatchEvent(new EaClearEvent({ oldValue }));
  }

  /**
   * 显示密码按钮点击时触发
   */
  @listen("click", ".ea-input__show-password-icon")
  private _onShowPasswordIconClickEvent(): void {
    if (!this.showPassword) return;

    if (this.type === "password") {
      this.type = "text";
      this._showPasswordIcon.setAttribute("name", "eye");
    } else if (this.type === "text") {
      this.type = "password";
      this._showPasswordIcon.setAttribute("name", "eye-slash");
    }

    this.focus();
  }

  /**
   * 自动调整高度
   */
  @listen("input", ".ea-input__original")
  private _onAutosizeEvent(e: Event): void {
    if (!this.autosize || this.type !== "textarea") return;

    const lineHeight = this._states.originTextareaHeight / this.rows;

    if (
      (this.minRows as number) > 0 &&
      this._original.scrollHeight < (this.minRows as number) * lineHeight
    )
      return;

    if (
      (this.maxRows as number) > 0 &&
      this._original.scrollHeight > (this.maxRows as number) * lineHeight
    )
      return;

    this._original.style.height = `${this._states.originTextareaHeight}px`;
    void this._original.scrollHeight;
    this._original.style.height = `${(e.target as HTMLElement).scrollHeight + 2}px`;
  }

  /**
   * 当包含 show-word-limit 属性时，更新字数统计
   */
  @listen("input", ".ea-input__original")
  private _onWordLimitTextShouldUpdate(): void {
    if (!this.showWordLimit || !this.maxlength) return;

    this._wordCount.textContent = `${this._original.value.length} / ${this.maxlength}`;
  }

  $mount() {
    this.updateContainerClasslist();
    this._initBasicEvent();
  }

  $beforeUnmount() {
    this._abortController?.abort();
    this._abortController = null;
  }

  /**
   * 更新表单验证状态
   */
  updateValidity() {
    super.updateValidity();

    const value = this.value || "";
    if (
      (this.minlength as number) > 0 &&
      value.length > 0 &&
      value.length < (this.minlength as number)
    ) {
      this.internals?.setValidity(
        { tooShort: true },
        `请至少输入 ${this.minlength as number} 个字符`,
        this._original
      );

      this.internals?.reportValidity();
    }

    if (
      (this.maxlength as number) > 0 &&
      value.length > (this.maxlength as number)
    ) {
      this.internals?.setValidity(
        { tooLong: true },
        `请最多输入 ${this.maxlength as number} 个字符`,
        this._original
      );

      this.internals?.reportValidity();
    }
  }

  /**
   * 检查表单字段的有效性
   */
  checkValidity(): boolean {
    this.updateValidity();
    return this.internals?.validity?.valid ?? true;
  }

  /**
   * 报告表单字段的有效性（显示验证提示）
   */
  reportValidity(): boolean {
    this.updateValidity();
    return this.internals?.reportValidity() ?? true;
  }
}
