import { EaFormAssociatedBase } from "@core/EaFormAssociatedBase";
import { createBEM } from "@utils/bem";
import { CustomElement, attribute, property, query, listen } from "@decorator";
import { Enum } from "@utils/Enum";
import { EaSwitchChangeEvent } from "./events/EaSwitchChangeEvent";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-switch" as const;
const bem = createBEM(TAG_NAME);

export type SwitchSize = "large" | "default" | "small";

/**
 * @summary 开关组件，表示两种相互对立的状态间的切换，多用于触发开/关，支持自定义值、尺寸和禁用状态。
 * @status stable
 * @since 3.0
 *
 * @slot active - 打开状态时的内容。
 * @slot inactive - 关闭状态时的内容。
 *
 * @event change - 状态发生变化时触发，detail: `{ value: unknown }`。
 *
 * @csspart wrapper - 外层 label 容器。
 * @csspart label - 表单标签。
 * @csspart form-label - 表单标签（与 label 相同）。
 * @csspart container - 开关内容容器。
 * @csspart original - 原生 checkbox 控件。
 * @csspart label-left - 左侧文字（关闭状态）。
 * @csspart switch - 伪开关控件。
 * @csspart label-right - 右侧文字（打开状态）。
 *
 * @cssproperty --ea-switch-active-bg-color - 打开时的背景色。
 * @cssproperty --ea-switch-inactive-bg-color - 关闭时的背景色。
 * @cssproperty --ea-switch-active-text-color - 打开时的文字颜色。
 * @cssproperty --ea-switch-inactive-text-color - 关闭时的文字颜色。
 * @cssproperty --ea-switch-disabled-bg-color - 禁用时的背景色。
 * @cssproperty --ea-switch-disabled-text-color - 禁用时的文字颜色。
 * @cssproperty --ea-switch-disabled-checked-bg-color - 禁用且选中时的背景色。
 * @cssproperty --ea-switch-disabled-checked-text-color - 禁用且选中时的文字颜色。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaSwitch extends EaFormAssociatedBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @query(bem.ce("original"))
  private _originalInput!: HTMLInputElement;

  @query(bem.ce("label-left"))
  private _labelLeftSlot!: HTMLElement;

  @query(bem.ce("label-right"))
  private _labelRightSlot!: HTMLElement;

  @query(bem.ce("form-label"))
  private _label!: HTMLElement;

  private _parsedActiveValue: unknown = true;
  private _parsedInactiveValue: unknown = false;

  @attribute({
    type: String,
    default: "",
    observer(this: EaSwitch, newVal: string) {
      if (this._label) this._label.textContent = newVal;
    },
  })
  label: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaSwitch, newVal: string) {
      if (this._container) this._container.setAttribute("for", newVal);
      if (this._originalInput) {
        this._originalInput.setAttribute("name", newVal);
        this._originalInput.setAttribute("id", newVal);
      }
    },
  })
  name: string = "";

  @attribute({
    type: {
      Number: (value: string | number) => {
        const parsedValue = Number(value);
        return !isNaN(parsedValue) && value !== "";
      },
      Boolean: (value: string | boolean) => {
        return (
          value === "true" ||
          value === true ||
          value === "false" ||
          value === false ||
          value === ""
        );
      },
      String: (value: string) => {
        return typeof value === "string";
      },
    },
    default: false,
    observer(this: EaSwitch, newVal: number | boolean | string) {
      this._handleValueChange(newVal);
    },
  })
  value: any = false;

  @attribute({
    type: String,
    default: "true",
    observer(this: EaSwitch, newVal: string) {
      this._parsedActiveValue = this._parseValue(newVal);
      this._handleValueChange(this.value);
    },
  })
  activeValue: any = true;

  @attribute({
    type: String,
    default: "false",
    observer(this: EaSwitch, newVal: string) {
      this._parsedInactiveValue = this._parseValue(newVal);
      this._handleValueChange(this.value);
    },
  })
  inactiveValue: any = false;

  @attribute({
    type: Enum(["large", "default", "small"]),
    default: "default",
    observer(this: EaSwitch) {
      this.updateContainerClasslist();
    },
  })
  size: SwitchSize = "default";

  @attribute({
    type: String,
    default: "",
    observer(this: EaSwitch, newVal: string) {
      if (this._labelLeftSlot) this._labelLeftSlot.textContent = newVal;
    },
  })
  inactiveText: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaSwitch, newVal: string) {
      this.style.setProperty("--ea-switch-inactive-bg-color", newVal);
    },
  })
  inactiveColor: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaSwitch, newVal: string) {
      if (this._labelRightSlot) this._labelRightSlot.textContent = newVal;
    },
  })
  activeText: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaSwitch, newVal: string) {
      this.style.setProperty("--ea-switch-active-bg-color", newVal);
    },
  })
  activeColor: string = "";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaSwitch, newVal: boolean) {
      if (this._originalInput) this._originalInput.toggleAttribute("disabled", newVal);
      this.updateContainerClasslist();
    },
  })
  disabled: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaSwitch, newVal: boolean) {
      if (this._originalInput) this._originalInput.toggleAttribute("required", newVal);
    },
  })
  required: boolean = false;

  @property({
    type: Function,
    default: null,
  })
  beforeChange: (() => Promise<boolean>) | null = null;

  /** 解析属性值为实际类型 */
  private _parseValue(value: unknown): unknown {
    if (value === "true" || value === true) return true;
    if (value === "false" || value === false) return false;
    if (typeof value === "number") return value;
    if (typeof value === "string" && value !== "" && !isNaN(Number(value))) return Number(value);
    if (typeof value === "string") return value;
    return false;
  }

  /** 处理 value 属性变化，同步原生 input 状态和表单值 */
  private _handleValueChange(value: unknown): void {
    const parsedValue = this._parseValue(value);
    const realValue =
      parsedValue == this._parsedActiveValue
        ? this._parsedActiveValue
        : this._parsedInactiveValue;

    if (this._originalInput) {
      this._originalInput.value = String(realValue);
      this._originalInput.checked = realValue === this._parsedActiveValue;
    }

    this.setValue(String(realValue));
    this.updateContainerClasslist();
  }

  updateContainerClasslist(): string {
    const className = bem(
      { [this.size]: true },
      {
        checked: this._parseValue(this.value) === this._parsedActiveValue,
        disabled: this.disabled,
      }
    );

    if (this._container) this._container.className = className;

    return className;
  }

  html(): string {
    const id = this.getAttribute("name") || Math.random().toString(36).substring(2, 15);
    const isChecked = this._parseValue(this.value) === this._parsedActiveValue;

    return `
      <label class="${this.updateContainerClasslist()}" part="wrapper" for="${id}">
        <span class="${bem.e("form-label")}" part="label form-label">${this.label}</span>
        <span class="${bem.e("content")}" part="container">
          <input id="${id}" type="checkbox" class="${bem.e("original")}" part="original"
            name="${id}"
            ${isChecked ? "checked" : ""}
            ${this.disabled ? "disabled" : ""}
            ${this.required ? "required" : ""} />
          <span class="${bem.e("label-left")}" part="label-left">
            <slot name="inactive"></slot>
          </span>
          <span class="${bem.e("inner")}" part="switch"></span>
          <span class="${bem.e("label-right")}" part="label-right">
            <slot name="active"></slot>
          </span>
        </span>
      </label>
    `;
  }

  /** 处理原生 input 的 change 事件 */
  @listen("change", bem.ce("original"))
  private _handleChangeEvent(e: Event): void {
    e.stopPropagation();

    const isChecked = (e.target as HTMLInputElement).checked;
    const value = isChecked ? this._parsedActiveValue : this._parsedInactiveValue;

    this.value = String(value);
    this.dispatchEvent(new EaSwitchChangeEvent({ value }));
  }

  /** 处理点击事件，支持 beforeChange 拦截 */
  @listen("click", bem.ce("original"))
  private _handleClickEvent(e: Event): void {
    if (!this.beforeChange || typeof this.beforeChange !== "function") return;

    e.preventDefault();
    e.stopImmediatePropagation();

    this.beforeChange()
      .then(() => {
        this._originalInput.checked = !this._originalInput.checked;
        const isChecked = this._originalInput.checked;
        const value = isChecked ? this._parsedActiveValue : this._parsedInactiveValue;
        this.value = String(value);
        this.dispatchEvent(new EaSwitchChangeEvent({ value }));
      })
      .catch(() => {});
  }

  formResetCallback(): void {
    this.value = false;
    this.setValidity({});
  }

  $mount(): void {
    if (!this.name) {
      this.setAttribute("name", Math.random().toString(36).substring(2, 15));
    }

    this._handleValueChange(this.value);
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
    const isChecked = this._parseValue(this.value) === this._parsedActiveValue;

    if (this.required && !isChecked) {
      this.internals?.setValidity({ valueMissing: true }, "请开启此选项", anchor);
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
