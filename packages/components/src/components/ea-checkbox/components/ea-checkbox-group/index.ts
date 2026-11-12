import { EaFormAssociatedBase } from "@easy-component-ui/core/core/EaFormAssociatedBase";
import { createBEM } from "@easy-component-ui/core/utils/bem";
import {
  CustomElement,
  attribute,
  property,
  query,
  children,
  listen,
} from "@easy-component-ui/core/decorator";
import { Enum } from "@easy-component-ui/core/utils/Enum";
import { EaCheckboxChangeEvent } from "../../events/EaCheckboxChangeEvent";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-checkbox-group" as const;
const bem = createBEM(TAG_NAME);

export type CheckboxGroupSize = "" | "small" | "default" | "large";

/**
 * @summary 多选框组组件，用于将多个多选框绑定到同一个数组，支持 min/max 限制和禁用。
 * @status stable
 * @since 3.0
 *
 * @dependency ea-checkbox
 *
 * @slot default - 默认插槽，用于放置 ea-checkbox 子组件。
 *
 * @csspart container - 外层容器。
 * @csspart form-label - 表单标签元素。
 *
 * @cssproperty --ea-checkbox-group-gap - 子组件间距。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaCheckboxGroup extends EaFormAssociatedBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @query(bem.ce("form-label"))
  private _label!: HTMLElement;

  @children("ea-checkbox")
  private _checkboxItems!: NodeListOf<HTMLElement>;

  @attribute({
    type: String,
    observer(this: EaCheckboxGroup, newVal: string) {
      if (this._label) this._label.textContent = newVal;
    },
  })
  label: string = "";

  @attribute({
    type: String,
    observer(this: EaCheckboxGroup) {
      this._updateCheckboxChildrenName();
    },
  })
  name: string = "";

  @property({
    type: Array,
    observer(this: EaCheckboxGroup) {
      this._updateCheckboxChildrenValue();
      this._updateLimitStatus();
    },
  })
  value: any[] = [];

  @attribute({
    type: Boolean,
    observer(this: EaCheckboxGroup, newVal: boolean) {
      this._checkboxItems?.forEach(checkbox => {
        checkbox.toggleAttribute("disabled", newVal);
      });
    },
  })
  disabled: boolean = false;

  @attribute({
    type: Number,
    observer(this: EaCheckboxGroup) {
      this._updateLimitStatus();
    },
  })
  min: number = 0;

  @attribute({
    type: Number,
    observer(this: EaCheckboxGroup) {
      this._updateLimitStatus();
    },
  })
  max: number = Infinity;

  @attribute({
    type: Enum(["", "small", "default", "large"]),
    observer(this: EaCheckboxGroup) {
      this._updateChildrenSize();
    },
  })
  size: CheckboxGroupSize = "";

  @attribute({
    type: Boolean,
  })
  required: boolean = false;

  updateContainerClasslist(): string {
    const className = bem();

    if (this._container) this._container.className = className;

    return className;
  }

  html(): string {
    const labelId = `${TAG_NAME}-label-${Math.random().toString(36).substring(2, 15)}`;

    return `
      <label id="${labelId}" class="${bem.e("form-label")}" part="form-label"></label>
      <div class="${this.updateContainerClasslist()}" part="container" role="group" aria-labelledby="${labelId}">
        <slot></slot>
      </div>
    `;
  }

  /** 更新子组件的 name 属性 */
  private _updateCheckboxChildrenName = () => {
    this._checkboxItems?.forEach(checkbox => {
      checkbox.setAttribute("name", this.name);
    });
  };

  /** 更新子组件的初始勾选状态 */
  private _updateCheckboxChildrenValue = () => {
    this._checkboxItems?.forEach(checkbox => {
      const isChecked = this.value.includes(checkbox.getAttribute("value"));
      checkbox.toggleAttribute("checked", isChecked);
    });
  };

  /**
   * 更新子组件值
   * 重新赋值而不是原地 push：原地修改不会触发更新，校验状态会滞后一拍
   * @param isChecked 是否勾选
   * @param updateValue 变化的选项值
   */
  private _updateGroupValue = (isChecked: boolean, updateValue: any) => {
    if (isChecked) {
      const hasValue = this.value.some((item: any) => item === updateValue);
      if (!hasValue) this.value = [...this.value, updateValue];
    } else {
      this.value = this.value.filter((item: any) => item !== updateValue);
    }
  };

  /** 更新子组件在 min 限制下的禁用状态 */
  private _updateMinValueStatus = () => {
    this._checkboxItems?.forEach(item => {
      const isChecked = item.hasAttribute("checked");
      item.toggleAttribute("limit-disabled", isChecked);
    });
  };

  /** 更新子组件在 max 限制下的禁用状态 */
  private _updateMaxValueStatus = () => {
    this._checkboxItems?.forEach(item => {
      const isChecked = item.hasAttribute("checked");
      item.toggleAttribute("limit-disabled", !isChecked);
    });
  };

  /** 还原子组件的禁用状态 */
  private _restoreLimitValueStatus = () => {
    this._checkboxItems?.forEach(item => {
      item.toggleAttribute("limit-disabled", false);
    });
  };

  /** 更新子组件的禁用状态 */
  private _updateLimitStatus = () => {
    if (this.value.length <= this.min) {
      this._updateMinValueStatus();
    } else if (this.value.length >= this.max) {
      this._updateMaxValueStatus();
    } else {
      this._restoreLimitValueStatus();
    }
  };

  /** 更新子组件的尺寸 */
  private _updateChildrenSize = () => {
    this._checkboxItems?.forEach(checkbox => {
      checkbox.setAttribute("size", this.size);
    });
  };

  @listen("slotchange", "shadowRoot")
  private _handleSlotChange = (): void => {
    this._updateCheckboxChildrenName();
    this._updateCheckboxChildrenValue();
    this._updateLimitStatus();
  };

  /**
   * 子项勾选变化
   * change 不跨 shadow 传播且值可能原地变化，这里显式重算，否则勾选后仍然报必填
   * @param e 变更事件
   */
  @listen("change", undefined, { capture: true })
  private _handleChange = (e: Event): void => {
    if (!(e instanceof EaCheckboxChangeEvent)) return;
    const { checked, value } = e.detail;
    this._updateGroupValue(checked, value);
    this._updateLimitStatus();
    this.updateValidity();
  };

  /** 表单重置：清空选中值并复位校验状态 */
  formResetCallback(): void {
    this.value = [];
    this._checkboxItems?.forEach(checkbox => {
      checkbox.toggleAttribute("checked", false);
    });
    this.$resetValidity();
  }

  $mount(): void {
    if (!this.name) this.name = Math.random().toString(36).substring(2, 15);

    this.updateContainerClasslist();

    if (this._label && this.label) {
      this._label.textContent = this.label;
    }

    queueMicrotask(() => {
      this._updateCheckboxChildrenName();
      this._updateCheckboxChildrenValue();
      this._updateLimitStatus();
    });
  }

  /** 宿主自身不可聚焦，补 tabindex 让浏览器校验失败时能定位 */
  $mounted(): void {
    super.$mounted();

    if (!this.hasAttribute("tabindex")) this.tabIndex = -1;
  }

  /** 验证目标：首个子选项，无子项时退回容器 */
  get validationTarget() {
    const firstCheckbox = this._checkboxItems?.[0];
    return firstCheckbox || this._container;
  }

  /**
   * 必填文案
   * @param flag 原生 validity 标记
   * @param limit 长度类规则的阀值
   * @returns 校验文案
   */
  protected $validationMessage(flag: string, limit?: number): string {
    if (flag === "valueMissing") return "请至少选择一个选项";
    return super.$validationMessage(flag, limit);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ea-checkbox-group": EaCheckboxGroup;
  }
}
