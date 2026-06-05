import { EaFormAssociatedBase } from "@core/EaFormAssociatedBase";
import { createBEM } from "@utils/bem";
import {
  CustomElement,
  attribute,
  property,
  query,
  children,
  listen,
} from "@decorator";
import { Enum } from "@utils/Enum";
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
    default: "",
    observer(this: EaCheckboxGroup, newVal: string) {
      if (this._label) this._label.textContent = newVal;
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
      this._checkboxItems?.forEach(checkbox => {
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
    type: Enum(["", "small", "default", "large"]),
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

  /** 更新子组件值 */
  private _updateGroupValue = (isChecked: boolean, updateValue: any) => {
    if (isChecked) {
      const hasValue = this.value.some((item: any) => item === updateValue);
      if (!hasValue) this.value.push(updateValue);
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

  @listen("change", undefined, { capture: true })
  private _handleChange = (e: Event): void => {
    if (!(e instanceof EaCheckboxChangeEvent)) return;
    const { checked, value } = e.detail;
    this._updateGroupValue(checked, value);
    this._updateLimitStatus();
  };

  formResetCallback(): void {
    this.value = [];
    this._checkboxItems?.forEach(checkbox => {
      checkbox.toggleAttribute("checked", false);
    });
    this.setValidity({});
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

  get validationTarget() {
    const firstCheckbox = this._checkboxItems?.[0];
    return firstCheckbox || this._container;
  }

  /** 更新表单验证状态 */
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

  checkValidity(): boolean {
    this.updateValidity();
    return this.internals?.validity?.valid ?? true;
  }

  reportValidity(): boolean {
    this.updateValidity();
    return this.internals?.reportValidity() ?? true;
  }
}
