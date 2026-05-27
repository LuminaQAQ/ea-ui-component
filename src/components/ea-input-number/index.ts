import { EaFormAssociatedBase } from "@core/EaFormAssociatedBase";
import { attribute } from "@decorator/attribute";
import { property } from "@decorator/property";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import { listen } from "@decorator/listen";
import { createBEM } from "@utils/bem";
import { Enum } from "@/utils/Enum";
import { EaInputNumberChangeEvent } from "./events/EaInputNumberChangeEvent";
import stylesheet from "./index.scss?inline";
import "@/components/ea-icon/index";

const TAG_NAME = "ea-input-number" as const;
const bem = createBEM(TAG_NAME);

export type InputNumberSize = "large" | "default" | "small" | "";
export type InputNumberAlign = "left" | "center" | "right";

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaInputNumber extends EaFormAssociatedBase {
  // ==================== DOM 元素引用 ====================

  @query(".ea-input-number")
  private _container!: HTMLElement;

  @query(".ea-input-number__form-label")
  private _label!: HTMLElement;

  @query(".ea-input-number__inner")
  private _inputEl!: HTMLInputElement;

  @query(".ea-input-number__operator.decrease")
  private _operatorMinus!: HTMLElement;

  @query(".ea-input-number__operator.increase")
  private _operatorPlus!: HTMLElement;

  private _abortController?: AbortController | null;

  // ==================== @property 属性（props: true，不映射到 HTML attribute）====================

  @property({
    type: Number,
    default: 0,
    observer(this: EaInputNumber) {
      this.updateContainerClasslist();
    },
  })
  defaultValue: number = 0;

  @property({
    type: Boolean,
    default: false,
    observer(this: EaInputNumber) {
      this.updateContainerClasslist();
    },
  })
  isFocus: boolean = false;

  @property({
    type: Boolean,
    default: false,
    observer(this: EaInputNumber) {
      this.updateContainerClasslist();
    },
  })
  isMin: boolean = false;

  @property({
    type: Boolean,
    default: false,
    observer(this: EaInputNumber) {
      this.updateContainerClasslist();
    },
  })
  isMax: boolean = false;

  // ==================== @attribute 属性（映射到 HTML attribute）====================

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

      if (Number(fixedNewVal) >= this.max) this.isMax = true;
      else this.isMax = false;

      if (Number(fixedNewVal) <= this.min) this.isMin = true;
      else this.isMin = false;

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
    type: Enum(["large", "default", "small"]),
    default: "",
    observer(this: EaInputNumber) {
      this.updateContainerClasslist();
    },
  })
  size: InputNumberSize = "";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaInputNumber, newVal: boolean) {
      this._inputEl.readOnly = newVal;
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
    default: "",
  })
  valueOnClear: number | string = "";

  @attribute({
    type: Enum(["left", "center", "right"]),
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
      this._inputEl.setAttribute("name", newVal);
      this._inputEl.setAttribute("id", newVal);
    },
  })
  name: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaInputNumber, newVal: string) {
      this._inputEl.setAttribute("placeholder", newVal);
    },
  })
  placeholder: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaInputNumber, newVal: string) {
      this._inputEl.setAttribute("inputmode", newVal);
    },
  })
  inputmode: string = "";

  // ==================== 抽象属性实现 ====================

  get validationTarget() {
    return this._inputEl;
  }

  // ==================== 方法 ====================

  updateContainerClasslist(): string {
    const className = bem(
      {
        [this.align]: this.align ? true : false,
        [this.size]: this.size ? true : false,
      },
      {
        focus: this.isFocus,
        min: this.isMin,
        max: this.isMax,
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
          <ea-icon class='${bem.e("operator")} decrease' part='decrease' name='minus'></ea-icon>
          <span class='${bem.e("prefix")}' part='prefix'>
            <slot name="prefix"></slot>
          </span>
          <input class='${bem.e("inner")}' part='input' type='number' />
          <span class='${bem.e("suffix")}' part='suffix'>
            <slot name="suffix"></slot>
          </span>
          <ea-icon class='${bem.e("operator")} increase' part='increase' name='plus'></ea-icon>
        </section>
      </label>
    `;
  }

  focus() {
    this._inputEl?.focus();
  }

  blur() {
    this._inputEl?.blur();
  }

  private _handleSanitizeNumber(
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
      return defaultValue?.toFixed(precision) || "";

    if (value < min) value = min;
    else if (value > max) value = max;

    return value.toFixed(precision);
  }

  private _handleValuePlus = (): void => {
    if (this.disabled || !this.controls) return;

    this.value = Number(
      this._handleSanitizeNumber(this.value - this.step, {
        precision: this.precision,
        min: this.min,
        max: this.max,
        defaultValue: this.defaultValue,
      })
    );
  };

  private _handleValueMinus = (): void => {
    if (this.disabled || !this.controls) return;

    this.value = Number(
      this._handleSanitizeNumber(this.value + this.step, {
        precision: this.precision,
        min: this.min,
        max: this.max,
        defaultValue: this.defaultValue,
      })
    );
  };

  private _ensureInputValueIsCorrect = (e: Event): void => {
    let correctValue = this._handleSanitizeNumber(
      Number((e.target as HTMLInputElement).value),
      {
        precision: this.precision,
        min: this.min,
        max: this.max,
        defaultValue: this.defaultValue,
      }
    );

    if (this.stepStrictly && Number(correctValue) % this.step !== 0) {
      correctValue = this._handleSanitizeNumber(
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

    if (correctValue !== (e.target as HTMLInputElement).value)
      (e.target as HTMLInputElement).value = correctValue;

    this.isFocus = false;
  };

  // ==================== 事件处理 ====================

  @listen("click", ".ea-input-number__operator.decrease")
  private _onDecreaseClick() {
    this._handleValuePlus();
  }

  @listen("click", ".ea-input-number__operator.increase")
  private _onIncreaseClick() {
    this._handleValueMinus();
  }

  @listen("focus", ".ea-input-number__inner")
  private _onInputFocus() {
    this.isFocus = true;
  }

  @listen("keydown", ".ea-input-number__inner")
  private _onKeyDown(e: KeyboardEvent) {
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

  @listen("input", ".ea-input-number__inner")
  private _onInput(e: Event) {
    const inputEl = e.target as HTMLInputElement;
    if (inputEl.validity.badInput) {
      const fixedValue = Number(this.value).toFixed(this.precision);
      requestAnimationFrame(() => {
        inputEl.value = fixedValue;
      });
    }
  }

  @listen("blur", ".ea-input-number__inner")
  private _onInputBlur(e: Event) {
    this._ensureInputValueIsCorrect(e);
  }

  // ==================== 生命周期 ====================

  formResetCallback() {
    this.value = this.min;
    this.internals.setValidity({});
  }

  $mount(): void {
    const initValue = this.hasAttribute("value") ? this.value : 0;
    this.value = Number(Number(initValue).toFixed(this.precision));

    this.updateContainerClasslist();

    if (!this.name)
      this.setAttribute("name", Math.random().toString(36).substring(2, 15));
  }

  $beforeUnmount(): void {
    this._abortController?.abort();
    this._abortController = null;
  }
}
