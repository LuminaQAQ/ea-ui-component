import { EaFormAssociatedBase } from "@core/EaFormAssociatedBase";
import { createBEM } from "@utils/bem";
import { CustomElement, attribute, query, listen } from "@decorator";
import { Enum } from "@utils/Enum";
import { EaRadioChangeEvent } from "../../events/EaRadioChangeEvent";
import { EaRadioFocusEvent } from "../../events/EaRadioFocusEvent";
import { EaRadioBlurEvent } from "../../events/EaRadioBlurEvent";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-radio" as const;
const bem = createBEM(TAG_NAME);

export type RadioSize = "small" | "default" | "large";

/**
 * @summary 单选框组件，用于在多个备选项中进行单选，支持禁用、边框和多种尺寸。
 * @status stable
 * @since 3.0
 *
 * @slot default - 默认插槽，用于单选框标签内容。
 *
 * @event change - 选中状态变化时触发，detail: `{ value: string, checked: boolean }`。
 * @event focus - 获得焦点时触发，detail: `{ value: string, checked: boolean }`。
 * @event blur - 失去焦点时触发，detail: `{ value: string, checked: boolean }`。
 *
 * @csspart container - 外层 label 容器。
 * @csspart original - 原生 radio 元素。
 * @csspart input - 伪单选框元素。
 * @csspart label - 标签容器元素。
 *
 * @cssproperty --ea-radio-input-size-large - 大号单选框尺寸。
 * @cssproperty --ea-radio-input-size-default - 默认单选框尺寸。
 * @cssproperty --ea-radio-input-size-small - 小号单选框尺寸。
 * @cssproperty --ea-radio-inner-size-large - 大号内部圆点尺寸。
 * @cssproperty --ea-radio-inner-size-default - 默认内部圆点尺寸。
 * @cssproperty --ea-radio-inner-size-small - 小号内部圆点尺寸。
 * @cssproperty --ea-radio-space - 间距。
 * @cssproperty --ea-radio-border - 边框样式。
 * @cssproperty --ea-radio-border-radius - 边框圆角。
 * @cssproperty --ea-radio-border-hover - 悬停/选中边框颜色。
 * @cssproperty --ea-radio-inner-background - 内部圆点背景颜色。
 * @cssproperty --ea-radio-disabled-color - 禁用颜色。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaRadio extends EaFormAssociatedBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @query(bem.ce("original"))
  private _original!: HTMLInputElement;

  @query(bem.ce("inner"))
  private _innerEl!: HTMLElement;

  @query(bem.ce("label"))
  private _labelSlot!: HTMLElement;

  private _isFocus: boolean = false;

  @attribute({
    type: Enum(["small", "default", "large"]),
    default: "default",
    observer(this: EaRadio) {
      this.updateContainerClasslist();
    },
  })
  size: RadioSize = "default";

  @attribute({
    type: String,
    default: "",
    observer(this: EaRadio, newVal: string) {
      if (this._original) this._original.value = newVal;
    },
  })
  value: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaRadio, newVal: string) {
      if (this._labelSlot) this._labelSlot.textContent = newVal;
    },
  })
  label: string = "";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaRadio, newVal: boolean) {
      if (this._original) this._original.checked = newVal;

      if (newVal) {
        this.setValue(this.value);
      } else {
        this.removeValue();
      }

      this.updateContainerClasslist();
    },
  })
  checked: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaRadio, newVal: boolean) {
      if (this._original) this._original.disabled = newVal;
      this.updateContainerClasslist();
    },
  })
  disabled: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaRadio) {
      this.updateContainerClasslist();
    },
  })
  border: boolean = false;

  updateContainerClasslist(): string {
    const className = bem(
      { [this.size]: true },
      {
        checked: this.checked,
        disabled: this.disabled,
        border: this.border,
        focus: this._isFocus,
      }
    );

    if (this._container) this._container.className = className;

    return className;
  }

  html(): string {
    return `
      <label class="${this.updateContainerClasslist()}" part="container">
        <span class="${bem.e("input")}" part="input-wrap">
          <span class="${bem.e("inner")}" part="input" tabindex="0"></span>
          <input class="${bem.e("original")}" type="radio" part="original"
            name="${this.name || ""}"
            value="${this.value || ""}"
            ${this.checked ? "checked" : ""}
            ${this.disabled ? "disabled" : ""} />
        </span>
        <span class="${bem.e("label")}" part="label">
          <slot>${this.label || ""}</slot>
        </span>
      </label>
    `;
  }

  /** 派发 change 事件 */
  private _dispatchChangeEvent = () => {
    this.dispatchEvent(
      new EaRadioChangeEvent({
        value: this.value,
        checked: Boolean(this.checked),
      })
    );
  };

  @listen("change", bem.ce("original"))
  private _handleChangeEvent = (e: Event): void => {
    e.stopPropagation();
    this.checked = this._original.checked;
    this._dispatchChangeEvent();
  };

  @listen("keydown")
  private _handleKeydownEvent = (e: KeyboardEvent): void => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this._original.checked = true;
      this.checked = true;
      this._dispatchChangeEvent();
    }
  };

  @listen("focus", bem.ce("inner"))
  private _handleFocusEvent = (): void => {
    this._isFocus = true;
    this.updateContainerClasslist();
    this.dispatchEvent(
      new EaRadioFocusEvent({
        value: this.value,
        checked: this.checked,
      })
    );
  };

  @listen("blur", bem.ce("inner"))
  private _handleBlurEvent = (): void => {
    this._isFocus = false;
    this.updateContainerClasslist();
    this.dispatchEvent(
      new EaRadioBlurEvent({
        value: this.value,
        checked: this.checked,
      })
    );
  };

  /** 获取焦点 */
  focus(): void {
    this._innerEl?.focus();
  }

  /** 失去焦点 */
  blur(): void {
    this._innerEl?.blur();
  }

  formResetCallback(): void {
    this.checked = false;
    this.setValidity({});
  }

  $mount(): void {
    this.updateContainerClasslist();
  }

  $updated(): void {
    this.updateContainerClasslist();
  }

  get validationTarget() {
    return this._container;
  }

  /** 更新表单验证状态，required 时必须选中 */
  updateValidity() {
    const anchor = this._container ?? undefined;

    if (this.required && !this.checked) {
      this.internals?.setValidity(
        { valueMissing: true },
        "请选择一个选项",
        anchor
      );
    } else {
      this.internals?.setValidity({}, "", anchor);
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
