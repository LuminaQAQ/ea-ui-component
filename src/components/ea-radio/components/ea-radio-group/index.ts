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
    a11y: { ariaAttr: "aria-label", map: v => v || null },
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
      this._updateActiveDescendant();
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
    a11y: { ariaAttr: "aria-required" },
  })
  required: boolean = false;

  updateContainerClasslist(): string {
    const className = bem();

    if (this._container) this._container.className = className;

    return className;
  }

  html(): string {
    return `
      <div class="${this.updateContainerClasslist()}" part="container">
        <label class="${bem.e("form-label")}" part="form-label"></label>
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

  /** 获取非禁用的 radio 列表 */
  private _getEnabledRadios(): HTMLElement[] {
    return Array.from(this._radioItems || []).filter(
      r => !r.hasAttribute("disabled")
    );
  }

  /** 更新 aria-activedescendant 指向当前选中或第一个 radio */
  private _updateActiveDescendant(): void {
    const radios = this._radioItems;
    if (!radios || !radios.length) return;

    const checkedRadio = Array.from(radios).find(r =>
      r.hasAttribute("checked")
    );
    const target = checkedRadio || radios[0];

    if (target?.id) {
      this.setAttribute("aria-activedescendant", target.id);
    }
  }

  @listen("slotchange", "shadowRoot")
  private _handleSlotChange = (): void => {
    this._updateRadioChildrenName();
    this._updateRadioChildrenValue();
    this._updateActiveDescendant();
  };

  @listen("change", undefined, { capture: true })
  private _handleChange = (e: Event): void => {
    if (!(e instanceof EaRadioChangeEvent)) return;
    const { value } = e.detail;
    this.value = value;
  };

  /** 处理键盘导航（aria-activedescendant 模式） */
  @listen("keydown")
  private _handleKeydown = (e: KeyboardEvent): void => {
    const enabledRadios = this._getEnabledRadios();
    if (!enabledRadios.length) return;

    const currentIndex = enabledRadios.findIndex(r =>
      r.hasAttribute("checked")
    );
    let newIndex = currentIndex;

    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        newIndex =
          currentIndex < enabledRadios.length - 1 ? currentIndex + 1 : 0;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        newIndex =
          currentIndex > 0 ? currentIndex - 1 : enabledRadios.length - 1;
        break;
      case " ":
        e.preventDefault();
        if (currentIndex < 0 && enabledRadios[0]) {
          const radioValue = enabledRadios[0].getAttribute("value") || "";
          this.value = radioValue;
          this.dispatchEvent(
            new EaRadioChangeEvent({ value: radioValue, checked: true })
          );
        }
        return;
      default:
        return;
    }

    if (newIndex !== currentIndex && enabledRadios[newIndex]) {
      const radioValue = enabledRadios[newIndex].getAttribute("value") || "";
      this.value = radioValue;
      this.dispatchEvent(
        new EaRadioChangeEvent({ value: radioValue, checked: true })
      );
    }
  };

  formResetCallback(): void {
    this.value = "";
    this._radioItems?.forEach(radio => {
      radio.toggleAttribute("checked", false);
    });
    this.setValidity({});
  }

  $mount(): void {
    this.setAttribute("role", "radiogroup");
    this.tabIndex = 0;

    if (!this.name) this.name = Math.random().toString(36).substring(2, 15);

    this.updateContainerClasslist();

    if (this._label && this.label) {
      this._label.textContent = this.label;
    }

    queueMicrotask(() => {
      this._updateRadioChildrenName();
      this._updateRadioChildrenValue();
      this._updateActiveDescendant();
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
