import { EaFormAssociatedBase } from "@core/EaFormAssociatedBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import { listen } from "@decorator/listen";
import { createBEM } from "@utils/bem";
import { Enum } from "@/utils/Enum";
import stylesheet from "./index.scss?inline";
import { EaCheckboxChangeEvent } from "../../events/EaCheckboxChangeEvent";

const TAG_NAME = "ea-checkbox" as const;
const bem = createBEM(TAG_NAME);

export type CheckboxSize = "small" | "default" | "large";

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaCheckbox extends EaFormAssociatedBase {
  // ==================== DOM 元素引用 ====================

  @query(".ea-checkbox")
  private _container!: HTMLElement;

  @query(".ea-checkbox__orignal")
  private _original!: HTMLInputElement;

  @query(".ea-checkbox__inner")
  private _innerEl!: HTMLElement;

  @query(".ea-checkbox__label")
  private _labelSlot!: HTMLElement;

  /** @type {AbortController} */
  private _abortController?: AbortController;

  // ==================== 属性定义 ====================

  @attribute({
    type: Enum(["small", "default", "large"]),
    default: "",
    observer(this: EaCheckbox) {
      this.updateContainerClasslist();
    },
  })
  size: CheckboxSize = "default";

  @attribute({
    type: String,
    default: "",
    observer(this: EaCheckbox, newVal: string) {
      this._original.value = newVal;
      this._updateCheckboxValue();
    },
  })
  value: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaCheckbox, newVal: string) {
      this._labelSlot.textContent = newVal;
    },
  })
  label: string = "";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaCheckbox, newVal: boolean) {
      this._original.checked = newVal;
      this._updateCheckboxValue();
      this.updateContainerClasslist();
    },
  })
  checked: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaCheckbox, newVal: boolean) {
      this._original.disabled = newVal;
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
      this._original.disabled = newVal;
      this.updateContainerClasslist();
    },
  })
  limitDisabled: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaCheckbox, newVal: boolean) {
      this._original.toggleAttribute("required", newVal);
    },
  })
  required: boolean = false;

  // ==================== 方法 ====================

  /**
   * 更新容器类名
   */
  updateContainerClasslist(): string {
    const className = bem(
      { [this.size]: true },
      {
        checked: this.checked,
        disabled: this.disabled,
        indeterminate: this.indeterminate,
        "limit-disabled": this.limitDisabled,
        border: this.border,
      }
    );

    if (this._container) this._container.className = className;

    return className;
  }

  /**
   * 渲染模板
   */
  html(): string {
    const id =
      this.getAttribute("id") || Math.random().toString(36).substring(2, 15);

    return `
      <label class="${this.updateContainerClasslist()}" part="container" for="${id}">
        <input 
          id="${id}" 
          type="checkbox" 
          class="ea-checkbox__orignal" 
          part="orignal"
          value="${this.value}"
          ${this.checked ? "checked" : ""}
          ${this.disabled ? "disabled" : ""}
          ${this.required ? "required" : ""}
        />
        <span class="ea-checkbox__inner" part="input" tabindex="1"></span>
        <span class="ea-checkbox__label" part="label" tabindex="1">
          <slot>${this.label || ""}</slot>
        </span>
      </label>
    `;
  }

  /**
   * 更新 checkbox 值
   */
  private _updateCheckboxValue = () => {
    const value = this.value || this.hasAttribute("checked");
    if (this.checked) this.setValue(value as string);
    else this.setValue(null);
  };

  /**
   * 派发 change 事件
   */
  private _dispatchChangeEvent = () => {
    this.dispatchEvent(
      new EaCheckboxChangeEvent({
        value: this.value,
        checked: Boolean(this.checked),
      })
    );
  };

  // ==================== 事件处理 ====================

  /**
   * change 事件处理
   */
  @listen("change", ".ea-checkbox__orignal")
  private _onChangeEvent = (): void => {
    this.checked = this._original.checked;
    this._dispatchChangeEvent();
  };

  /**
   * enter 键事件处理
   */
  @listen("keydown")
  private _onEnterEvent = (e: KeyboardEvent): void => {
    if (e.key === "Enter") {
      this._original.checked = !this.checked;
      this._dispatchChangeEvent();
    }
  };

  // ==================== 生命周期 ====================

  $mount(): void {
    // if (this._original) {
    //   this._original.addEventListener("change", this._onChangeEvent);
    // }

    // this.addEventListener("keydown", this._onEnterEvent);

    this.updateContainerClasslist();
  }

  $updated(): void {
    this.updateContainerClasslist();
  }

  $beforeUnmount(): void {
    this._abortController?.abort();
  }

  /**
   * 获取验证目标元素
   * @returns {HTMLElement}
   */
  get validationTarget() {
    return this._container;
  }

  /**
   * 更新表单验证状态
   * checkbox 的验证逻辑：当 required 为 true 时，必须处于选中状态
   */
  updateValidity() {
    if (this.required && !this.checked) {
      this.internals?.setValidity(
        { valueMissing: true },
        "请勾选此项",
        this._container
      );
    } else {
      this.internals?.setValidity({}, "", this._container);
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
