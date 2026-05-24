import { EaFormAssociatedBase } from "@core/EaFormAssociatedBase";
import { attribute } from "@decorator/attribute";
import { property } from "@decorator/property";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import { listen } from "@decorator/listen";
import { createBEM } from "@utils/bem";
import { Enum } from "@/utils/Enum";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-checkbox-group" as const;
const bem = createBEM(TAG_NAME);

export type CheckboxGroupSize = "small" | "default" | "large";

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaCheckboxGroup extends EaFormAssociatedBase {
  // ==================== DOM 元素引用 ====================

  @query(".ea-checkbox-group")
  private _container!: HTMLElement;

  @query("slot")
  private _defaultSlot!: HTMLSlotElement;

  @query(".ea-checkbox-group__form-label")
  private _label!: HTMLElement;

  /** @type {AbortController} */
  private _abortController?: AbortController;

  // ==================== 属性定义 ====================

  @attribute({
    type: String,
    default: "",
    observer(this: EaCheckboxGroup, newVal: string) {
      if (this._label) {
        this._label.textContent = newVal;
      }
    },
  })
  label: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaCheckboxGroup) {
      this._updateCheckboxChildrenName();
    },
  })
  name: string = "";

  @property({
    type: Array,
    default: [],
    observer(this: EaCheckboxGroup) {
      this._updateCheckboxChildrenValue();
      this._updateLimitStatus();
    },
  })
  value: any[] = [];

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaCheckboxGroup, newVal: boolean) {
      this.querySelectorAll("ea-checkbox").forEach(checkbox => {
        checkbox.toggleAttribute("disabled", newVal);
      });
    },
  })
  disabled: boolean = false;

  @attribute({
    type: Number,
    default: 0,
    observer(this: EaCheckboxGroup) {
      this._updateLimitStatus();
    },
  })
  min: number = 0;

  @attribute({
    type: Number,
    default: Infinity,
    observer(this: EaCheckboxGroup) {
      this._updateLimitStatus();
    },
  })
  max: number = Infinity;

  @attribute({
    type: Enum(["small", "default", "large"]),
    default: "",
    observer(this: EaCheckboxGroup) {
      this._updateChildrenSize();
    },
  })
  size: CheckboxGroupSize = "";

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
    const className = bem();

    if (this._container) this._container.className = className;

    return className;
  }

  /**
   * 渲染模板
   */
  html(): string {
    return `
      <label class='ea-checkbox-group__form-label' part='form-label'></label>
      <div class='${this.updateContainerClasslist()}' part='container'>
        <slot></slot>
      </div>
    `;
  }

  /**
   * 更新子组件的 name 属性
   */
  private _updateCheckboxChildrenName = () => {
    this.querySelectorAll("ea-checkbox").forEach(checkbox => {
      checkbox.setAttribute("name", this.name);
    });
  };

  /**
   * 更新子组件的初始勾选状态
   */
  private _updateCheckboxChildrenValue = () => {
    this.querySelectorAll("ea-checkbox").forEach(checkbox => {
      const isChecked = this.value.includes(checkbox.getAttribute("value"));
      checkbox.toggleAttribute("checked", isChecked);
    });
  };

  /**
   * 更新子组件值
   * @param {Boolean} isChecked
   * @param {any} updateValue
   */
  private _updateGroupValue = (isChecked: boolean, updateValue: any) => {
    if (isChecked) {
      const hasValue = this.value.some((item: any) => item === updateValue);

      if (!hasValue) this.value.push(updateValue);
    } else {
      this.value = this.value.filter((item: any) => item !== updateValue);
    }
  };

  /**
   * 更新子组件在带有 Min 下的禁用状态
   */
  private _updateMinValueStatus = () => {
    this.querySelectorAll("ea-checkbox").forEach(item => {
      const isChecked = item.hasAttribute("checked");
      item.toggleAttribute("limit-disabled", isChecked);
    });
  };

  /**
   * 更新子组件在带有 Max 下的禁用状态
   */
  private _updateMaxValueStatus = () => {
    this.querySelectorAll("ea-checkbox").forEach(item => {
      const isChecked = item.hasAttribute("checked");
      item.toggleAttribute("limit-disabled", !isChecked);
    });
  };

  /**
   * 还原子组件的禁用状态
   */
  private _restoreLimitValueStatus = () => {
    this.querySelectorAll("ea-checkbox").forEach(item => {
      item.toggleAttribute("limit-disabled", false);
    });
  };

  /**
   * 更新子组件的禁用状态
   */
  private _updateLimitStatus = () => {
    if (this.value.length <= this.min) {
      this._updateMinValueStatus();
    } else if (this.value.length >= this.max) {
      this._updateMaxValueStatus();
    } else if (this.max < Infinity && this.min === 0) {
      this._restoreLimitValueStatus();
    } else {
      this._restoreLimitValueStatus();
    }
  };

  /**
   * 更新子组件的尺寸
   */
  private _updateChildrenSize = () => {
    this.querySelectorAll("ea-checkbox").forEach(checkbox => {
      checkbox.setAttribute("size", this.size);
    });
  };

  // ==================== 事件处理 ====================

  private _onSlotChange = (): void => {
    this._updateCheckboxChildrenName();
    this._updateCheckboxChildrenValue();
    this._updateLimitStatus();
  };

  private _onChange = (e: CustomEvent): void => {
    const { checked, value } = e.detail;
    this._updateGroupValue(checked, value);
    this._updateLimitStatus();
  };

  // ==================== 生命周期 ====================

  $mount(): void {
    if (!this.name) this.name = Math.random().toString(36).substring(2, 15);

    this.updateContainerClasslist();

    // 初始化 label
    if (this._label && this.label) {
      this._label.textContent = this.label;
    }

    // 手动绑定事件
    if (this._defaultSlot) {
      this._defaultSlot.addEventListener("slotchange", this._onSlotChange);
    }

    this.addEventListener("change", this._onChange);

    queueMicrotask(() => {
      this._updateCheckboxChildrenName();
      this._updateCheckboxChildrenValue();
      this._updateLimitStatus();
    });
  }

  $beforeUnmount(): void {
    this._abortController?.abort();
  }

  /**
   * 获取验证目标元素
   * 返回第一个 ea-checkbox
   * @returns {HTMLElement}
   */
  get validationTarget() {
    const firstCheckbox = this.querySelector("ea-checkbox");
    return firstCheckbox || this._container;
  }

  /**
   * 更新表单验证状态
   */
  updateValidity() {
    const hasValue = Array.isArray(this.value) && this.value.length > 0;
    const anchor = this.validationTarget ?? undefined;

    if (this.required && !hasValue) {
      this.internals?.setValidity(
        { valueMissing: true },
        "请至少选择一个选项",
        anchor
      );
    } else {
      this.internals?.setValidity({}, "", anchor);
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
