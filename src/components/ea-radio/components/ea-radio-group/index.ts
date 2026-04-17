import { EaFormAssociatedBase } from "@core/EaFormAssociatedBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import { listen } from "@decorator/listen";
import { createBEM } from "@utils/bem";
import { Enum } from "@/utils/Enum";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-radio-group" as const;
const bem = createBEM(TAG_NAME);

export type RadioGroupSize = "large" | "default" | "small";

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaRadioGroup extends EaFormAssociatedBase {
  // ==================== DOM 元素引用 ====================

  @query(".ea-radio-group")
  private _container!: HTMLElement;

  @query(".ea-radio-group slot")
  private _defaultSlot!: HTMLSlotElement;

  @query(".ea-radio-group__form-label")
  private _label!: HTMLElement;

  // ==================== 属性定义 ====================

  @attribute({
    type: String,
    default: "",
    observer(this: EaRadioGroup, newVal: string) {
      this._label.textContent = newVal;
    },
  })
  label: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaRadioGroup) {
      this._updateGroupName();
    },
  })
  name: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaRadioGroup, newVal: string) {
      this._updateCurrentValue(newVal);
      this.setValue(newVal);
    },
  })
  value: string = "";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaRadioGroup, newVal: boolean) {
      this._updateGroupBorder(newVal);
    },
  })
  border: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaRadioGroup, newVal: boolean) {
      this._updateGroupDisabled(newVal);
    },
  })
  disabled: boolean = false;

  @attribute({
    type: Enum(["large", "default", "small"]),
    default: "default",
    observer(this: EaRadioGroup, newVal: RadioGroupSize) {
      this._updateGroupSize(newVal);
    },
  })
  size: RadioGroupSize = "default";

  @attribute({
    type: Boolean,
    default: false,
  })
  required: boolean = false;

  // ==================== 方法 ====================

  /**
   * 更新容器类名
   */
  updateContainerClasslist(): string {
    const className = bem({});
    if (this._container) this._container.className = className;
    return className;
  }

  /**
   * 渲染模板
   */
  html(): string {
    return `
      <label class="${bem.e("form-label")}" part='form-label'></label>
      <div class='${bem()}' part='container' role='radiogroup'>
        <slot></slot>
      </div>
    `;
  }

  /**
   * 更新 radios name 属性
   */
  private _updateGroupName(): void {
    this.querySelectorAll("ea-radio").forEach(radio => {
      radio.setAttribute("name", this.name);
    });
  }

  /**
   * 更新当前选项
   */
  private _updateCurrentValue(currentValue: string): void {
    this.querySelectorAll("ea-radio").forEach(radio => {
      const radioValue = radio.getAttribute("value");
      radio.toggleAttribute("checked", currentValue === radioValue);
    });
  }

  /**
   * 更新 radios border 属性
   */
  private _updateGroupBorder(isBorder: boolean): void {
    this.querySelectorAll("ea-radio").forEach(radio => {
      radio.toggleAttribute("border", isBorder);
    });
  }

  /**
   * 更新 radios disabled 属性
   */
  private _updateGroupDisabled(isDisabled: boolean): void {
    this.querySelectorAll("ea-radio").forEach(radio => {
      radio.toggleAttribute("disabled", isDisabled);
    });
  }

  /**
   * 批量更新 radios size 属性
   */
  private _updateGroupSize(size: RadioGroupSize): void {
    this.querySelectorAll("ea-radio").forEach(radio => {
      if (!radio.getAttribute("size")) radio.setAttribute("size", size);
    });
  }

  // ==================== 事件处理 ====================

  /**
   * 监听 value 改变
   */
  @listen("change")
  private _onValueChangeEvent(e: Event): void {
    const customEvent = e as CustomEvent;
    this.value = customEvent.detail.value;
  }

  /**
   * 监听 slot 改变
   */
  @listen("slotchange", "slot")
  private _onSlotChangeEvent(): void {
    this._updateCurrentValue(this.value);

    if (this.name) this._updateGroupName();
    if (this.border) this._updateGroupBorder(this.border);
    if (this.disabled) this._updateGroupDisabled(this.disabled);
    if (this.size) this._updateGroupSize(this.size);
  }

  // ==================== 生命周期 ====================

  $mount(): void {
    this.updateContainerClasslist();
  }

  /**
   * 获取验证目标元素
   * 返回当前选中的 ea-radio，如果没有选中则返回第一个 ea-radio
   * @returns {HTMLElement}
   */
  get validationTarget(): HTMLElement {
    const checkedRadio = this.querySelector("ea-radio[checked]");
    if (checkedRadio) return checkedRadio as HTMLElement;

    const firstRadio = this.querySelector("ea-radio");
    return (firstRadio as HTMLElement) || this._container;
  }

  /**
   * 更新表单验证状态
   */
  updateValidity() {
    const hasValue = this.value !== "" && this.value != null;

    if (this.required && !hasValue) {
      this.internals?.setValidity(
        { valueMissing: true },
        "请选择一个选项",
        this
      );
    } else {
      this.internals?.setValidity({}, "", this);
    }
  }

  /**
   * 检查表单字段的有效性
   * @returns {boolean}
   */
  checkValidity(): boolean {
    this.updateValidity();
    return this.internals?.validity?.valid ?? true;
  }

  /**
   * 报告表单字段的有效性（显示验证提示）
   * @returns {boolean}
   */
  reportValidity(): boolean {
    this.updateValidity();
    return this.internals?.reportValidity() ?? true;
  }
}
