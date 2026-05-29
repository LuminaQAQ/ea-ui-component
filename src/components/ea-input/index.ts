import EaFormAssociatedBase from "@core/EaFormAssociatedBase";
import { createBEM } from "@utils/bem";
import { CustomElement, attribute, property, query, listen } from "@decorator";
import { html } from "@utils/html";
import { Enum } from "@utils/Enum";
import { EaInputClearEvent } from "./events/EaClearEvent";
import { EaInputInputEvent } from "./events/EaInputInputEvent";
import { EaInputFocusEvent } from "./events/EaInputFocusEvent";
import { EaInputBlurEvent } from "./events/EaInputBlurEvent";
import { EaInputChangeEvent } from "./events/EaInputChangeEvent";
import stylesheet from "./index.scss?inline";
import "@/components/ea-icon/index";

const TAG_NAME = "ea-input" as const;
const bem = createBEM(TAG_NAME);

const INPUT_TYPES = [
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
] as const;

export type InputType = (typeof INPUT_TYPES)[number];

export type InputSize = "large" | "default" | "small";

export type ResizeType = "none" | "both" | "horizontal" | "vertical";

/**
 * @summary 输入框组件，支持多种输入类型、可清空、密码显示切换、字数统计等功能。
 * @status stable
 * @since 3.0
 *
 * @dependency ea-icon
 *
 * @slot prepend - 前置内容插槽。
 * @slot prefix - 前缀图标插槽。
 * @slot suffix - 后缀图标插槽。
 * @slot append - 后置内容插槽。
 *
 * @event input - 输入值变化时触发，detail: `{ value: string }`。
 * @event change - 值提交变化时触发，detail: `{ value: string }`。
 * @event ea-clear - 清空输入框时触发，detail: `{ oldValue: string }`。
 * @event focus - 获得焦点时触发。
 * @event blur - 失去焦点时触发。
 *
 * @csspart container - 容器元素。
 * @csspart label - 标签元素。
 * @csspart region - 区域元素。
 * @csspart prepend - 前置内容元素。
 * @csspart inner - 内部容器元素。
 * @csspart prefix - 前缀元素。
 * @csspart original-wrapper - 原始输入框包装器元素。
 * @csspart original - 原始输入框元素。
 * @csspart suffix - 后缀元素。
 * @csspart clear-icon - 清除图标元素。
 * @csspart show-password-icon - 显示密码图标元素。
 * @csspart suffix-icon - 后缀图标元素。
 * @csspart count - 字数统计元素。
 * @csspart append - 后置内容元素。
 *
 * @cssproperty --ea-input-height - 输入框高度。
 * @cssproperty --ea-input-font-size - 输入框字体大小。
 * @cssproperty --ea-input-border-color - 输入框边框颜色。
 * @cssproperty --ea-input-border-focus-color - 输入框聚焦边框颜色。
 * @cssproperty --ea-input-border-invalid-color - 输入框无效边框颜色。
 * @cssproperty --ea-input-border-radius - 输入框圆角。
 * @cssproperty --ea-input-padding - 输入框内边距。
 * @cssproperty --ea-input-text-color - 输入框文字颜色。
 * @cssproperty --ea-input-transition - 过渡动画时长。
 * @cssproperty --ea-input-icon-color - 图标颜色。
 * @cssproperty --ea-input-resize - 文本域调整大小方式。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaInput extends EaFormAssociatedBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @query(bem.ce("prepend"))
  private _prepend!: HTMLElement;

  @query(bem.ce("inner"))
  private _inner!: HTMLElement;

  @query('slot[name="prefix"]')
  private _prefixSlot!: HTMLElement;

  @query(bem.ce("original-wrapper"))
  private _originalWrapper!: HTMLElement;

  @query(bem.ce("original"))
  private _original!: HTMLInputElement | HTMLTextAreaElement;

  @query(bem.ce("suffix"))
  private _suffix!: HTMLElement;

  @query(bem.ce("suffix-icon"))
  private _suffixIcon!: HTMLElement;

  @query(bem.ce("clear-icon"))
  private _clearIcon!: HTMLElement;

  @query(bem.ce("show-password-icon"))
  private _showPasswordIcon!: HTMLElement;

  @query(bem.ce("word-count"))
  private _wordCount!: HTMLElement;

  @query(bem.ce("append"))
  private _append!: HTMLElement;

  @query(bem.ce("form-label"))
  private _label!: HTMLElement;

  @property({ type: Boolean, default: false })
  _isFocus: boolean = false;

  @property({ type: Number, default: 0 })
  _originTextareaHeight: number = 0;

  private _originalAbortController: AbortController | null = null;

  @attribute({
    type: String,
    default: "",
    observer(this: EaInput, newVal: string) {
      this._label.textContent = newVal;
    },
  })
  label: string = "";

  @attribute({
    type: Enum(INPUT_TYPES),
    default: "text",
    observer(this: EaInput, newVal: InputType, oldVal: InputType) {
      const oldIsTextarea = oldVal === "textarea";
      const newIsTextarea = newVal === "textarea";

      if (oldIsTextarea !== newIsTextarea) {
        this._renderOriginal(newVal);
      } else if (!newIsTextarea && this._original instanceof HTMLInputElement) {
        this._original.type = newVal;
      }

      if (this.showPassword && !newIsTextarea) {
        if (newVal === "text") {
          this._showPasswordIcon.setAttribute("name", "eye");
        } else if (newVal === "password") {
          this._showPasswordIcon.setAttribute("name", "eye-slash");
        }
      }

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

      if (this.showWordLimit && this.maxlength) {
        this._updateWordCount();
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

      if (newVal) {
        if (this.type === "text") {
          this._showPasswordIcon.setAttribute("name", "eye");
        } else if (this.type === "password") {
          this._showPasswordIcon.setAttribute("name", "eye-slash");
        }
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
          `<ea-icon class="${bem.e("prefix-icon")}" part="prefix-icon" name="${newVal}"></ea-icon>`
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
          `<ea-icon class="${bem.e("suffix-icon-item")}" part="suffix-icon" name="${newVal}"></ea-icon>`
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
        this._updateWordCount();
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
    observer(this: EaInput, _newVal: boolean) {
      if (this.type !== "textarea") return;

      void this._original.clientHeight;

      this._originTextareaHeight = this._original.scrollHeight;
    },
  })
  autosize: boolean = false;

  @attribute({
    type: Number,
    default: 0,
  })
  minRows: number | string | null = null;

  @attribute({
    type: Number,
    default: 0,
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
      this._original.setAttribute("aria-label", newVal);
    },
  })
  ariaLabel!: string;

  @attribute({
    type: String,
    default: "",
    observer(this: EaInput, newVal: string) {
      this._original.tabIndex = newVal ? parseInt(newVal) : 0;
    },
  })
  tabindex: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaInput, newVal: string) {
      this._original.inputMode = newVal;
    },
  })
  inputmode: string = "";

  get validationTarget() {
    return this._original;
  }

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
        focus: this._isFocus,
        disabled: this.disabled,
        clearable: clearable,
      }
    );

    if (this._container) this._container.className = className;

    return className;
  }

  private _renderOriginal(type: InputType): void {
    const id =
      this.getAttribute("id") || Math.random().toString(36).substring(2, 7);
    const tpl =
      type === "textarea"
        ? `<textarea id="${id}" class="${bem.e("original")}" part="original"></textarea>`
        : `<input id="${id}" class="${bem.e("original")}" type="${type}" part="original" />`;

    this._originalWrapper.innerHTML = html(tpl);

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

    if (this.ariaLabel) {
      this._original.setAttribute("aria-label", this.ariaLabel);
    }
    if (this.tabindex) {
      this._original.tabIndex = this.tabindex ? parseInt(this.tabindex) : 0;
    }
  }

  html(): string {
    const id =
      (this as any).getAttribute("id") ||
      Math.random().toString(36).substring(2, 7);
    const tpl =
      this.type === "textarea"
        ? `<textarea id="${id}" class="${bem.e("original")}" part="original"></textarea>`
        : `<input id="${id}" class="${bem.e("original")}" type="${this.type || "text"}" part="original" />`;

    return `
      <label class="${bem()}" part="container">
        <span class="${bem.e("form-label")}" part="label"></span>
        <section class="${bem.e("region")}" part="region">
          <div class="${bem.e("prepend")}" part="prepend">
            <slot name="prepend"></slot>
          </div>
          <div class="${bem.e("inner")}" part="inner">
            <span class="${bem.e("prefix")}" part="prefix">
              <slot name="prefix"></slot>
            </span>
            <span class="${bem.e("original-wrapper")}" part="original-wrapper">
              ${tpl}
            </span>
            <span class="${bem.e("suffix")}" part="suffix">
              <ea-icon class="${bem.e("clear-icon")}" name="xmark" part="clear-icon"></ea-icon>
              <ea-icon class="${bem.e("show-password-icon")}" name="eye-slash" part="show-password-icon"></ea-icon>
              <span class="${bem.e("suffix-icon")}" part="suffix-icon">
                <slot name="suffix"></slot>
              </span>
              <span class="${bem.e("word-count")}" part="count"></span>
            </span>
          </div>
          <div class="${bem.e("append")}" part="append">
            <slot name="append"></slot>
          </div>
        </section>
      </label>
    `;
  }

  focus(options?: FocusOptions) {
    this._isFocus = true;
    this._original.focus(options);
  }

  blur() {
    this._isFocus = false;
    this._original.blur();
  }

  clear() {
    this.value = "";
    this._original.value = "";
    if (this.showWordLimit && this.maxlength) {
      this._updateWordCount();
    }
  }

  select() {
    this._original.select();
  }

  setRangeText(
    replacement: string,
    start: number,
    end: number,
    selectMode: "select" | "start" | "end" | "preserve" = "preserve"
  ): void {
    if (this._original instanceof HTMLInputElement) {
      this._original.setRangeText(replacement, start, end, selectMode);
    } else if (this._original instanceof HTMLTextAreaElement) {
      this._original.setRangeText(replacement, start, end, selectMode);
    }
    this.value = this._original.value;
  }

  setSelectionRange(
    selectionStart: number,
    selectionEnd: number,
    selectionDirection?: "forward" | "backward" | "none"
  ): void {
    this._original.setSelectionRange(
      selectionStart,
      selectionEnd,
      selectionDirection
    );
  }

  showPicker(): void {
    if (
      this._original instanceof HTMLInputElement &&
      "showPicker" in this._original
    ) {
      (this._original as any).showPicker();
    }
  }

  stepDown(n?: number): void {
    if (this._original instanceof HTMLInputElement) {
      try {
        this._original.stepDown(n);
        this.value = this._original.value;
      } catch {}
    }
  }

  stepUp(n?: number): void {
    if (this._original instanceof HTMLInputElement) {
      try {
        this._original.stepUp(n);
        this.value = this._original.value;
      } catch {}
    }
  }

  @listen("click", bem.ce("clear-icon"))
  private _handleClearIconClick(): void {
    if (!this.clearable) return;

    const oldValue = this.value;

    this.clear();

    if (
      this.showWordLimit &&
      (this.type === "textarea" || this.type === "text")
    ) {
      this._updateWordCount();
    }

    this.focus();

    this.dispatchEvent(new EaInputClearEvent({ oldValue }));
  }

  @listen("click", bem.ce("show-password-icon"))
  private _handleShowPasswordIconClick(): void {
    if (!this.showPassword) return;

    if (this.type === "password") {
      this.type = "text";
    } else if (this.type === "text") {
      this.type = "password";
    }

    this.focus();
  }

  private _handleInput(e: Event): void {
    const { value } = e.target as HTMLInputElement;
    this.value = value;
    this.dispatchEvent(new EaInputInputEvent({ value }));
  }

  private _handleFocus(): void {
    this._isFocus = true;
    this.updateContainerClasslist();
    this.dispatchEvent(new EaInputFocusEvent());
  }

  private _handleBlur(): void {
    this._isFocus = false;
    this.updateContainerClasslist();
    this.dispatchEvent(new EaInputBlurEvent());
  }

  private _handleAutosize(e: Event): void {
    if (!this.autosize || this.type !== "textarea") return;

    const lineHeight = this._originTextareaHeight / this.rows;

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

    this._original.style.height = `${this._originTextareaHeight}px`;
    void this._original.scrollHeight;
    this._original.style.height = `${(e.target as HTMLElement).scrollHeight + 2}px`;
  }

  private _handleChange(e: Event): void {
    const { value } = e.target as HTMLInputElement;
    this.value = value;
    this.dispatchEvent(new EaInputChangeEvent({ value }));
  }

  /** 更新字数统计 */
  private _updateWordCount(): void {
    if (!this.showWordLimit || !this.maxlength) return;

    this._wordCount.textContent = `${this._original.value.length} / ${this.maxlength}`;
  }

  $mount(): void {
    this.updateContainerClasslist();
    this._bindOriginalEvents();
  }

  private _bindOriginalEvents(): void {
    if (this._originalAbortController) {
      this._originalAbortController.abort();
    }
    this._originalAbortController = new AbortController();
    const { signal } = this._originalAbortController;

    this._originalWrapper.addEventListener(
      "input",
      (e: Event) => {
        const target = e.target as HTMLElement;
        if (!target.classList.contains(bem.e("original"))) return;
        e.stopPropagation();
        this._handleInput(e);
        this._handleAutosize(e);
      },
      { signal }
    );

    this._originalWrapper.addEventListener(
      "focusin",
      (e: FocusEvent) => {
        const target = e.target as HTMLElement;
        if (!target.classList.contains(bem.e("original"))) return;
        e.stopPropagation();
        this._handleFocus();
      },
      { signal }
    );

    this._originalWrapper.addEventListener(
      "focusout",
      (e: FocusEvent) => {
        const target = e.target as HTMLElement;
        if (!target.classList.contains(bem.e("original"))) return;
        e.stopPropagation();
        this._handleBlur();
      },
      { signal }
    );

    this._originalWrapper.addEventListener(
      "change",
      (e: Event) => {
        const target = e.target as HTMLElement;
        if (!target.classList.contains(bem.e("original"))) return;
        e.stopPropagation();
        this._handleChange(e);
      },
      { signal }
    );
  }

  $beforeUnmount(): void {
    if (this._originalAbortController) {
      this._originalAbortController.abort();
      this._originalAbortController = null;
    }
  }

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

  checkValidity(): boolean {
    this.updateValidity();
    return this.internals?.validity?.valid ?? true;
  }

  reportValidity(): boolean {
    this.updateValidity();
    return this.internals?.reportValidity() ?? true;
  }
}
