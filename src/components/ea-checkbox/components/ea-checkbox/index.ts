import { EaFormAssociatedBase } from "@core/EaFormAssociatedBase";
import { createBEM } from "@utils/bem";
import { CustomElement, attribute, query, listen } from "@decorator";
import { Enum } from "@utils/Enum";
import { EaCheckboxBlurEvent } from "../../events/EaCheckboxBlurEvent";
import { EaCheckboxChangeEvent } from "../../events/EaCheckboxChangeEvent";
import { EaCheckboxFocusEvent } from "../../events/EaCheckboxFocusEvent";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-checkbox" as const;
const bem = createBEM(TAG_NAME);

export type CheckboxSize = "small" | "default" | "large";

/**
 * @summary 多选框组件，用于在多个备选项中进行多选，支持禁用、半选、边框等状态。
 * @status stable
 * @since 3.0
 *
 * @slot default - 默认插槽，用于多选框标签内容。
 *
 * @event change - 选中状态变化时触发，detail: `{ value: string, checked: boolean }`。
 * @event focus - 获得焦点时触发，detail: `{ value: string, checked: boolean }`。
 * @event blur - 失去焦点时触发，detail: `{ value: string, checked: boolean }`。
 *
 * @csspart container - 外层 label 容器。
 * @csspart original - 原生 checkbox 元素。
 * @csspart input - 伪复选框元素。
 * @csspart label - 标签容器元素。
 *
 * @cssproperty --ea-checkbox-size - 复选框尺寸。
 * @cssproperty --ea-checkbox-spacing - 内边距。
 * @cssproperty --ea-checkbox-font-size - 字体大小。
 * @cssproperty --ea-checkbox-box-spacing - 复选框与标签间距。
 * @cssproperty --ea-checkbox-box-bg-color - 选中背景颜色。
 * @cssproperty --ea-checkbox-box-bg-disabled-color - 禁用背景颜色。
 * @cssproperty --ea-checkbox-box-border-color - 边框颜色。
 * @cssproperty --ea-checkbox-box-border-disabled-color - 禁用边框颜色。
 * @cssproperty --ea-checkbox-box-border-active-color - 选中边框颜色。
 * @cssproperty --ea-checkbox-check-color - 勾选颜色。
 * @cssproperty --ea-checkbox-check-disabled-color - 禁用勾选颜色。
 * @cssproperty --ea-checkbox-label-color - 选中标签颜色。
 * @cssproperty --ea-checkbox-disabled-color - 禁用标签颜色。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaCheckbox extends EaFormAssociatedBase {
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
    observer(this: EaCheckbox) {
      this.updateContainerClasslist();
    },
  })
  size: CheckboxSize = "default";

  @attribute({
    type: String,
    default: "",
    observer(this: EaCheckbox, newVal: string) {
      if (this._original) this._original.value = newVal;
      this._updateCheckboxValue();
    },
  })
  value: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaCheckbox, newVal: string) {
      if (this._labelSlot) this._labelSlot.textContent = newVal;
    },
  })
  label: string = "";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaCheckbox, newVal: boolean) {
      if (this._original) this._original.checked = newVal;
      this._updateCheckboxValue();
      this.updateContainerClasslist();
    },
  })
  checked: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaCheckbox, newVal: boolean) {
      if (this._original) this._original.disabled = newVal;
      this.updateContainerClasslist();
    },
  })
  disabled: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaCheckbox) {
      this.updateContainerClasslist();
    },
  })
  indeterminate: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaCheckbox) {
      this.updateContainerClasslist();
    },
  })
  border: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaCheckbox, newVal: boolean) {
      if (this._original) this._original.disabled = newVal;
      this.updateContainerClasslist();
    },
  })
  limitDisabled: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaCheckbox, newVal: boolean) {
      if (this._original) this._original.toggleAttribute("required", newVal);
    },
  })
  required: boolean = false;

  updateContainerClasslist(): string {
    const className = bem(
      { [this.size]: true },
      {
        checked: this.checked,
        disabled: this.disabled,
        indeterminate: this.indeterminate,
        "limit-disabled": this.limitDisabled,
        border: this.border,
        focus: this._isFocus,
      }
    );

    if (this._container) this._container.className = className;

    return className;
  }

  html(): string {
    const id =
      this.getAttribute("id") || Math.random().toString(36).substring(2, 15);

    return `
      <label class="${this.updateContainerClasslist()}" part="container" for="${id}">
        <input
          id="${id}"
          type="checkbox"
          class="${bem.e("original")}"
          part="original"
          value="${this.value}"
          ${this.checked ? "checked" : ""}
          ${this.disabled ? "disabled" : ""}
          ${this.required ? "required" : ""}
        />
        <span class="${bem.e("inner")}" part="input" tabindex="0"></span>
        <span class="${bem.e("label")}" part="label">
          <slot>${this.label || ""}</slot>
        </span>
      </label>
    `;
  }

  /** 更新 checkbox 表单值 */
  private _updateCheckboxValue = () => {
    const value = this.value || this.hasAttribute("checked");
    if (this.checked) this.setValue(value as string);
    else this.setValue(null);
  };

  /** 派发 change 事件 */
  private _dispatchChangeEvent = () => {
    this.dispatchEvent(
      new EaCheckboxChangeEvent({
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
      this._original.checked = !this.checked;
      this.checked = this._original.checked;
      this._dispatchChangeEvent();
    }
  };

  @listen("focus", bem.ce("inner"))
  private _handleFocusEvent = (): void => {
    this._isFocus = true;
    this.updateContainerClasslist();
    this.dispatchEvent(
      new EaCheckboxFocusEvent({
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
      new EaCheckboxBlurEvent({
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

  /** 切换选中状态 */
  toggle(): void {
    this.checked = !this.checked;
    this._dispatchChangeEvent();
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
      this.internals?.setValidity({ valueMissing: true }, "请勾选此项", anchor);
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
