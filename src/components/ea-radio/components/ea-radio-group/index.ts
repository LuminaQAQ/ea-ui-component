import { EaFormAssociatedBase } from "@core/EaFormAssociatedBase";
import { createBEM } from "@utils/bem";
import {
  CustomElement,
  attribute,
  query,
  children,
  listen,
} from "@decorator";
import { Enum } from "@utils/Enum";
import { EaRadioChangeEvent } from "../../events/EaRadioChangeEvent";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-radio-group" as const;
const bem = createBEM(TAG_NAME);

export type RadioGroupSize = "" | "small" | "default" | "large";

/**
 * @summary 单选框组组件，用于将多个单选框绑定到同一个值，支持禁用和尺寸控制。
 * @status stable
 * @since 3.0
 *
 * @dependency ea-radio
 *
 * @slot default - 默认插槽，用于放置 ea-radio 子组件。
 *
 * @csspart container - 外层容器。
 * @csspart form-label - 表单标签元素。
 *
 * @cssproperty --ea-radio-group-gap - 子组件间距。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaRadioGroup extends EaFormAssociatedBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @query(bem.ce("form-label"))
  private _label!: HTMLElement;

  @children("ea-radio")
  private _radioItems!: NodeListOf<HTMLElement>;

  @attribute({
    type: String,
    default: "",
    observer(this: EaRadioGroup, newVal: string) {
      if (this._label) this._label.textContent = newVal;
    },
  })
  label: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaRadioGroup) {
      this._updateRadioChildrenName();
    },
  })
  name: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaRadioGroup) {
      this._updateRadioChildrenValue();
      this.setValue(this.value);
    },
  })
  value: string = "";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaRadioGroup, newVal: boolean) {
      this._radioItems?.forEach(radio => {
        radio.toggleAttribute("disabled", newVal);
      });
    },
  })
  disabled: boolean = false;

  @attribute({
    type: Enum(["", "small", "default", "large"]),
    default: "",
    observer(this: EaRadioGroup) {
      this._updateChildrenSize();
    },
  })
  size: RadioGroupSize = "";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaRadioGroup, newVal: boolean) {
      this._radioItems?.forEach(radio => {
        radio.toggleAttribute("border", newVal);
      });
    },
  })
  border: boolean = false;

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
    return `
      <label class="${bem.e("form-label")}" part="form-label"></label>
      <div class="${this.updateContainerClasslist()}" part="container" role="radiogroup">
        <slot></slot>
      </div>
    `;
  }

  /** 更新子组件的 name 属性 */
  private _updateRadioChildrenName = () => {
    this._radioItems?.forEach(radio => {
      radio.setAttribute("name", this.name);
    });
  };

  /** 更新子组件的初始选中状态 */
  private _updateRadioChildrenValue = () => {
    this._radioItems?.forEach(radio => {
      const radioValue = radio.getAttribute("value");
      radio.toggleAttribute("checked", this.value === radioValue);
    });
  };

  /** 更新子组件的尺寸 */
  private _updateChildrenSize = () => {
    if (!this.size) return;
    this._radioItems?.forEach(radio => {
      if (!radio.getAttribute("size")) radio.setAttribute("size", this.size);
    });
  };

  @listen("slotchange", "shadowRoot")
  private _handleSlotChange = (): void => {
    this._updateRadioChildrenName();
    this._updateRadioChildrenValue();
  };

  @listen("change", undefined, { capture: true })
  private _handleChange = (e: Event): void => {
    if (!(e instanceof EaRadioChangeEvent)) return;
    const { value } = e.detail;
    this.value = value;
  };

  formResetCallback(): void {
    this.value = "";
    this._radioItems?.forEach(radio => {
      radio.toggleAttribute("checked", false);
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
      this._updateRadioChildrenName();
      this._updateRadioChildrenValue();
    });
  }

  get validationTarget() {
    const checkedRadio = this._radioItems
      ? Array.from(this._radioItems).find(r => r.hasAttribute("checked"))
      : null;
    return checkedRadio || this._radioItems?.[0] || this._container;
  }

  /** 更新表单验证状态 */
  updateValidity() {
    const hasValue = this.value !== "" && this.value != null;
    const anchor = this.validationTarget ?? undefined;

    if (this.required && !hasValue) {
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
