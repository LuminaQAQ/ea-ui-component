import EaFormAssociatedBase from "@core/EaFormAssociatedBase";
import { createBEM } from "@utils/bem";
import { CustomElement, attribute, property, query, listen } from "@decorator";
import { Enum } from "@utils/Enum";
import { EaInputNumberChangeEvent } from "./events/EaInputNumberChangeEvent";
import stylesheet from "./index.scss?inline";
import "@/components/ea-icon/index";

const TAG_NAME = "ea-input-number" as const;
const bem = createBEM(TAG_NAME);

export type InputNumberSize = "large" | "default" | "small";
export type InputNumberAlign = "left" | "center" | "right";

/**
 * @summary 计数器组件，仅允许输入标准的数字值，可定义范围和步进。
 * @status stable
 * @since 3.0
 *
 * @dependency ea-icon
 *
 * @slot prefix - 输入框前置插槽。
 * @slot suffix - 输入框后置插槽。
 *
 * @event ea-change - 值发生变化时触发，detail: `{ currentValue: number, oldValue: number }`。
 * @event focus - 输入框获得焦点时触发。
 * @event blur - 输入框失去焦点时触发。
 *
 * @csspart container - 容器元素。
 * @csspart label - 标签元素。
 * @csspart region - 输入区域容器元素。
 * @csspart decrease - 减号按钮元素。
 * @csspart prefix - 前缀插槽容器元素。
 * @csspart input - 输入框元素。
 * @csspart suffix - 后缀插槽容器元素。
 * @csspart increase - 加号按钮元素。
 *
 * @cssproperty --ea-input-number-width - 组件宽度。
 * @cssproperty --ea-input-number-height - 组件高度。
 * @cssproperty --ea-input-number-font-size - 组件字体大小。
 * @cssproperty --ea-input-number-border-color - 边框颜色。
 * @cssproperty --ea-input-number-text-color - 文字颜色。
 * @cssproperty --ea-input-number-operator-color - 操作按钮颜色。
 * @cssproperty --ea-input-number-operator-bg-color - 操作按钮背景颜色。
 * @cssproperty --ea-input-number-operator-disabled-color - 操作按钮禁用颜色。
 * @cssproperty --ea-input-number-input-disabled-color - 输入框禁用文字颜色。
 * @cssproperty --ea-input-number-input-disabled-bg-color - 输入框禁用背景颜色。
 * @cssproperty --ea-input-number-active-color - 激活状态颜色。
 * @cssproperty --ea-input-number-transition - 过渡动画时长。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaInputNumber extends EaFormAssociatedBase {
  // ==================== DOM 元素引用 ====================

  @query(bem.cb())
  private _container!: HTMLElement;

  @query(bem.ce("form-label"))
  private _label!: HTMLElement;

  @query(bem.ce("inner"))
  private _inputEl!: HTMLInputElement;

  @query(bem.ce("decrease"))
  private _decreaseBtn!: HTMLElement;

  @query(bem.ce("increase"))
  private _increaseBtn!: HTMLElement;

  private _repeatTimer: ReturnType<typeof setTimeout> | null = null;

  private _repeatDelay: number = 400;

  private _repeatInterval: number = 100;

  // ==================== @property 属性 ====================

  @property({ type: Number, default: 0 })
  defaultValue: number = 0;

  @property({ type: Boolean, default: false })
  _isFocus: boolean = false;

  @property({ type: Boolean, default: false })
  _isMin: boolean = false;

  @property({ type: Boolean, default: false })
  _isMax: boolean = false;

  // ==================== @attribute 属性 ====================

  @attribute({
    type: String,
    default: "",
    observer(this: EaInputNumber, newVal: string) {
      this._label.textContent = newVal;
    },
  })
  label: string = "";

  @attribute({
    type: Number,
    default: 0,
    observer(this: EaInputNumber, newVal: number, oldVal: number) {
      const fixedNewVal = Number(newVal).toFixed(this.precision);
      const fixedOldVal = Number(oldVal).toFixed(this.precision);

      this._inputEl.value = fixedNewVal;
      this.setValue(fixedNewVal);

      this._isMax = Number(fixedNewVal) >= this.max;
      this._isMin = Number(fixedNewVal) <= this.min;

      this.dispatchEvent(
        new EaInputNumberChangeEvent({
          currentValue: Number(fixedNewVal),
          oldValue: Number(fixedOldVal),
        })
      );

      this.updateContainerClasslist();
    },
  })
  value: number = 0;

  @attribute({
    type: Number,
    default: Number.MIN_SAFE_INTEGER,
    observer(this: EaInputNumber, newVal: number) {
      if (this._inputEl) this._inputEl.min = String(newVal);
    },
  })
  min: number = Number.MIN_SAFE_INTEGER;

  @attribute({
    type: Number,
    default: Number.MAX_SAFE_INTEGER,
    observer(this: EaInputNumber, newVal: number) {
      if (this._inputEl) this._inputEl.max = String(newVal);
    },
  })
  max: number = Number.MAX_SAFE_INTEGER;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaInputNumber, newVal: boolean) {
      if (this._inputEl) this._inputEl.required = newVal;
    },
  })
  required: boolean = false;

  @attribute({
    type: Number,
    default: 1,
  })
  step: number = 1;

  @attribute({
    type: Boolean,
    default: false,
  })
  stepStrictly: boolean = false;

  @attribute({
    type: Number,
    default: 0,
  })
  precision: number = 0;

  @attribute({
    type: Enum(["large", "default", "small"] as const),
    default: "default",
    observer(this: EaInputNumber) {
      this.updateContainerClasslist();
    },
  })
  size: InputNumberSize = "default";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaInputNumber, newVal: boolean) {
      if (this._inputEl) this._inputEl.readOnly = newVal;
    },
  })
  readonly: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaInputNumber) {
      this.updateContainerClasslist();
    },
  })
  disabled: boolean = false;

  @attribute({
    type: Boolean,
    default: true,
    observer(this: EaInputNumber) {
      this.updateContainerClasslist();
    },
  })
  controls: boolean = true;

  @attribute({
    type: Number,
    default: undefined,
  })
  valueOnClear: number | null = null;

  @attribute({
    type: Enum(["left", "center", "right"] as const),
    default: "center",
    observer(this: EaInputNumber) {
      this.updateContainerClasslist();
    },
  })
  align: InputNumberAlign = "center";

  @attribute({
    type: String,
    default: "",
    observer(this: EaInputNumber, newVal: string) {
      if (this._inputEl) {
        this._inputEl.setAttribute("name", newVal);
        this._inputEl.setAttribute("id", newVal);
      }
    },
  })
  name: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaInputNumber, newVal: string) {
      if (this._inputEl) this._inputEl.setAttribute("placeholder", newVal);
    },
  })
  placeholder: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaInputNumber, newVal: string) {
      if (this._inputEl) this._inputEl.setAttribute("inputmode", newVal);
    },
  })
  inputmode: string = "";

  // ==================== 抽象属性实现 ====================

  get validationTarget() {
    return this._inputEl;
  }

  // ==================== 方法 ====================

  updateContainerClasslist(): string {
    const hasSize = this.size !== "default";

    const className = bem(
      {
        ["size-" + this.size]: hasSize,
        [this.align]: true,
      },
      {
        focus: this._isFocus,
        min: this._isMin,
        max: this._isMax,
        disabled: this.disabled,
        "no-controls": !this.controls,
      }
    );

    if (this._container) this._container.className = className;

    return className;
  }

  html(): string {
    return `
      <label class='${bem()}' part='container'>
        <span class='${bem.e("form-label")}' part='label'></span>
        <section class='${bem.e("region")}' part='region'>
          <ea-icon class='${bem.e("decrease")}' part='decrease' name='minus'></ea-icon>
          <span class='${bem.e("prefix")}' part='prefix'>
            <slot name="prefix"></slot>
          </span>
          <input class='${bem.e("inner")}' part='input' type='number' />
          <span class='${bem.e("suffix")}' part='suffix'>
            <slot name="suffix"></slot>
          </span>
          <ea-icon class='${bem.e("increase")}' part='increase' name='plus'></ea-icon>
        </section>
      </label>
    `;
  }

  focus(options?: FocusOptions) {
    this._inputEl?.focus(options);
  }

  blur() {
    this._inputEl?.blur();
  }

  /**
   * 校验并修正数值，确保在 min/max 范围内并按 precision 格式化
   * @param value - 待校验的数值
   * @param options - 校验选项
   * @returns 修正后的数值字符串
   */
  private _sanitizeNumber(
    value: number = this.value,
    {
      precision,
      min,
      max,
      defaultValue,
    }: {
      precision: number;
      min: number;
      max: number;
      defaultValue?: number;
    }
  ): string {
    value = Number(value);

    if (isNaN(value) || !Number.isFinite(value))
      return defaultValue?.toFixed(precision) || "0";

    if (value < min) value = min;
    else if (value > max) value = max;

    return value.toFixed(precision);
  }

  /** 增加值 */
  private _increase(): void {
    if (this.disabled || !this.controls) return;

    this.value = Number(
      this._sanitizeNumber(this.value + this.step, {
        precision: this.precision,
        min: this.min,
        max: this.max,
        defaultValue: this.defaultValue,
      })
    );
  }

  /** 减少值 */
  private _decrease(): void {
    if (this.disabled || !this.controls) return;

    this.value = Number(
      this._sanitizeNumber(this.value - this.step, {
        precision: this.precision,
        min: this.min,
        max: this.max,
        defaultValue: this.defaultValue,
      })
    );
  }

  /**
   * 校验输入值并修正
   * @param e - blur 事件对象
   */
  private _ensureInputValueIsCorrect(e: Event): void {
    const inputEl = e.target as HTMLInputElement;
    let correctValue = this._sanitizeNumber(
      Number(inputEl.value),
      {
        precision: this.precision,
        min: this.min,
        max: this.max,
        defaultValue: this.defaultValue,
      }
    );

    if (this.stepStrictly && Number(correctValue) % this.step !== 0) {
      correctValue = this._sanitizeNumber(
        Number(correctValue) + (Number(correctValue) % this.step),
        {
          precision: this.precision,
          min: this.min,
          max: this.max,
          defaultValue: this.defaultValue,
        }
      );
    }

    this.value = Number(correctValue);

    if (correctValue !== inputEl.value)
      inputEl.value = correctValue;

    this._isFocus = false;
  }

  // ==================== 事件处理 ====================

  @listen("click", bem.ce("decrease"))
  private _handleDecreaseClick() {
    this._decrease();
  }

  @listen("click", bem.ce("increase"))
  private _handleIncreaseClick() {
    this._increase();
  }

  @listen("pointerdown", bem.ce("decrease"))
  private _handleDecreasePointerDown(e: PointerEvent) {
    if (this.disabled || !this.controls) return;
    e.preventDefault();

    this._startRepeat(() => this._decrease());
  }

  @listen("pointerdown", bem.ce("increase"))
  private _handleIncreasePointerDown(e: PointerEvent) {
    if (this.disabled || !this.controls) return;
    e.preventDefault();

    this._startRepeat(() => this._increase());
  }

  @listen("pointerup", bem.ce("decrease"))
  @listen("pointerup", bem.ce("increase"))
  @listen("pointerleave", bem.ce("decrease"))
  @listen("pointerleave", bem.ce("increase"))
  private _handlePointerUp() {
    this._stopRepeat();
  }

  /**
   * 启动长按重复执行
   * @param action - 要重复执行的函数
   */
  private _startRepeat(action: () => void): void {
    this._stopRepeat();
    action();
    this._repeatTimer = setTimeout(() => {
      this._repeatTimer = setInterval(action, this._repeatInterval);
    }, this._repeatDelay) as unknown as ReturnType<typeof setTimeout>;
  }

  /** 停止长按重复执行 */
  private _stopRepeat(): void {
    if (this._repeatTimer !== null) {
      clearTimeout(this._repeatTimer);
      clearInterval(this._repeatTimer);
      this._repeatTimer = null;
    }
  }

  @listen("focus", bem.ce("inner"))
  private _handleInputFocus() {
    this._isFocus = true;
    this.updateContainerClasslist();
    this.emit("focus");
  }

  @listen("keydown", bem.ce("inner"))
  private _handleKeyDown(e: KeyboardEvent) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;

    if (
      [
        "Backspace",
        "Delete",
        "Tab",
        "Escape",
        "Enter",
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "Home",
        "End",
      ].includes(e.key)
    )
      return;

    if (/^[\d.\-eE]$/.test(e.key)) return;

    e.preventDefault();
  }

  @listen("input", bem.ce("inner"))
  private _handleInput(e: Event) {
    const inputEl = e.target as HTMLInputElement;
    const rawValue = inputEl.value;

    if (rawValue === "" || rawValue === "-" || rawValue === "." || /^-?\d*\.?\d*e?E?$/.test(rawValue)) return;

    if (inputEl.validity.badInput) {
      const fixedValue = Number(this.value).toFixed(this.precision);
      requestAnimationFrame(() => {
        inputEl.value = fixedValue;
      });
    }
  }

  @listen("blur", bem.ce("inner"))
  private _handleInputBlur(e: Event) {
    this._ensureInputValueIsCorrect(e);
    this.emit("blur");
  }

  // ==================== 生命周期 ====================

  formResetCallback() {
    this.value = this.defaultValue;
    this.internals.setValidity({});
  }

  $mount(): void {
    const initValue = this.hasAttribute("value") ? this.value : 0;
    this.value = Number(Number(initValue).toFixed(this.precision));

    this.updateContainerClasslist();
  }

  $beforeUnmount(): void {
    this._stopRepeat();
  }
}
