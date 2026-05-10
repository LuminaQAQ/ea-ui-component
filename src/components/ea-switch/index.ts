import { EaFormAssociatedBase } from "@core/EaFormAssociatedBase";
import { attribute } from "@decorator/attribute";
import { property } from "@decorator/property";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import { listen } from "@decorator/listen";
import { createBEM } from "@utils/bem";
import { Enum } from "@/utils/Enum";
import stylesheet from "./index.scss?inline";
import { EaSwitchChangeEvent } from "./events/EaChangeEvent";

const TAG_NAME = "ea-switch" as const;
const bem = createBEM(TAG_NAME);

export type SwitchSize = "large" | "default" | "small";

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaSwitch extends EaFormAssociatedBase {
  // ==================== DOM 元素引用 ====================

  @query(".ea-switch")
  private _container!: HTMLElement;

  @query(".ea-switch__original")
  private _originalInput!: HTMLInputElement;

  @query(".ea-switch__inner")
  private _innerInput!: HTMLElement;

  @query(".ea-switch__label.label-left slot[name='inactive']")
  private _labelLeftSlot!: HTMLElement;

  @query(".ea-switch__label.label-right slot[name='active']")
  private _labelRightSlot!: HTMLElement;

  @query(".ea-switch__form-label")
  private _label!: HTMLElement;

  private _parsedActiveValue: any = true;
  private _parsedInactiveValue: any = false;

  // ==================== 属性定义 ====================

  @attribute({
    type: String,
    default: "",
    observer(this: EaSwitch, newVal: string) {
      this._label.textContent = newVal;
    },
  })
  label: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaSwitch, newVal: string) {
      this._container.setAttribute("for", newVal);
      this._originalInput.setAttribute("name", newVal);
      this._originalInput.setAttribute("id", newVal);
    },
  })
  name: string = "";

  @attribute({
    // type: String,
    type: {
      Number: (value: string | number) => {
        const parsedValue = Number(value);
        return !isNaN(parsedValue);
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
      this._labelLeftSlot.innerText = newVal;
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
      this._labelRightSlot.innerText = newVal;
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
      this._originalInput.toggleAttribute("disabled", newVal);
      this.updateContainerClasslist();
    },
  })
  disabled: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaSwitch, newVal: boolean) {
      this._originalInput.toggleAttribute("required", newVal);
    },
  })
  required: boolean = false;

  @property({
    type: Function,
    default: null,
  })
  beforeChange: (() => Promise<boolean>) | null = null;

  // ==================== 方法 ====================

  private _parseValue(value: string | null | boolean | undefined): any {
    if (value === "true" || value === true) {
      return true;
    } else if (value === "false" || value === false || value === "") {
      return false;
    } else if (
      value !== null &&
      value !== "" &&
      value !== undefined &&
      !isNaN(Number(value))
    ) {
      return Number(value);
    } else if (typeof value === "string") {
      return value;
    }

    return value === null;
  }

  private _handleValueChange(value: any): void {
    const parsedValue = this._parseValue(value);

    const realValue =
      parsedValue == this._parsedActiveValue
        ? this._parsedActiveValue
        : this._parsedInactiveValue;

    this._originalInput.value = realValue;
    this._originalInput.checked = realValue === this._parsedActiveValue;

    this.setValue(realValue);

    this.updateContainerClasslist();
  }

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist(): string {
    const className = bem(
      {
        [this.size]: true,
      },
      {
        checked: this._parseValue(this.value) === this._parsedActiveValue,
        disabled: this.disabled,
      }
    );

    if (this._container) this._container.className = className;

    return className;
  }

  constructor() {
    super();
  }

  /**
   * 渲染模板
   */
  html(): string {
    return `
      <label class="ea-switch-wrapper" part="wrapper">
        <span class="ea-switch__form-label" part="label form-label"></span>
        <section class="ea-switch" part="container">
          <input class="ea-switch__original" type="checkbox" part="original" />
          <span class="ea-switch__label label-left" part="label-left">
            <slot name="inactive"></slot>
          </span>
          <span class="ea-switch__inner" part="switch"></span>
          <span class="ea-switch__label label-right" part="label-right">
            <slot name="active"></slot>
          </span>
        </section>
      </label>
    `;
  }
  // ==================== 事件处理 ====================

  /**
   * 改变事件 - 更新值并派发事件
   * @param {Event} e
   */
  @listen("change", ".ea-switch__original")
  private _onChangeEvent(e: Event): void {
    const isChecked = (e.target as HTMLInputElement).checked;
    const value = isChecked
      ? this._parsedActiveValue
      : this._parsedInactiveValue;

    this.setAttribute("value", value);
  }

  /**
   * 点击事件 - 触发 beforeChange 回调函数
   * @param {Event} e
   */
  @listen("click", ".ea-switch__original")
  private _onClickEvent(e: Event): void {
    const parser = () => {
      return this._originalInput.checked
        ? this._parsedActiveValue
        : this._parsedInactiveValue;
    };

    if (this.beforeChange && typeof this.beforeChange === "function") {
      e.preventDefault();
      e.stopImmediatePropagation();

      this.beforeChange()
        .then(() => {
          this._originalInput.checked = !this._originalInput.checked;
          this._originalInput.dispatchEvent(new EaSwitchChangeEvent(parser()));
        })
        .catch(() => {});
    } else {
      this._originalInput.dispatchEvent(new EaSwitchChangeEvent(parser()));
    }
  }

  // ==================== 生命周期 ====================

  $mount() {
    if (!this.name)
      this.setAttribute("name", Math.random().toString(36).substring(2, 15));

    this.setValue(
      this._originalInput.checked
        ? this._parsedActiveValue
        : this._parsedInactiveValue
    );

    this.updateContainerClasslist();
  }

  // ==================== 表单验证 ====================

  get validationTarget() {
    return this._container;
  }

  /**
   * 更新表单验证状态
   * switch 的验证逻辑：当 required 为 true 时，必须处于选中状态（value 等于 active-value）
   */
  updateValidity() {
    const isChecked = this.value === this._parsedActiveValue;

    if (this.required && !isChecked) {
      this.internals.setValidity(
        { valueMissing: true },
        "请开启此选项",
        this._container
      );
    } else {
      this.internals.setValidity({}, "", this._container);
    }
  }

  /**
   * 检查表单字段的有效性
   * @returns {boolean}
   */
  checkValidity(): boolean {
    this.updateValidity();
    return this.internals.validity.valid;
  }

  /**
   * 报告表单字段的有效性（显示验证提示）
   * @returns {boolean}
   */
  reportValidity(): boolean {
    return this.internals.reportValidity();
  }
}
