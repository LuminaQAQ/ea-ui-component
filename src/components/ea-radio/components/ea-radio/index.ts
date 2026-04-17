import { EaFormAssociatedBase } from "@core/EaFormAssociatedBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { listen } from "@decorator/listen";
import { createBEM } from "@utils/bem";
import { Enum } from "@/utils/Enum";
import stylesheet from "./index.scss?inline";
import { query } from "@/decorator";

const TAG_NAME = "ea-radio" as const;
const bem = createBEM(TAG_NAME);

export type RadioSize = "" | "large" | "default" | "small";

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaRadio extends EaFormAssociatedBase {
  @query(".ea-radio__original")
  _original!: HTMLInputElement;
  // ==================== 属性定义 ====================

  @attribute({
    type: Enum(["", "large", "default", "small"]),
    default: "",
    observer(this: EaRadio) {
      this.updateContainerClasslist();
    },
  })
  size: RadioSize = "";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaRadio, newVal: boolean) {
      this._original.checked = newVal;

      if (newVal) {
        this.setValue(this.value);
      } else {
        this.removeValue();
      }

      this.updateContainerClasslist();
    },
  })
  checked: boolean = false;

  @attribute({
    type: String,
    default: "",
  })
  name: string = "";

  @attribute({
    type: String,
    default: "",
  })
  value: string = "";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaRadio, newVal: boolean) {
      this._original.disabled = newVal;

      this.updateContainerClasslist();
    },
  })
  disabled: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaRadio) {
      this.updateContainerClasslist();
    },
  })
  border: boolean = false;

  @attribute({
    type: String,
    default: "",
  })
  label: string = "";

  // ==================== 渲染方法 ====================

  updateContainerClasslist(): string {
    const className = bem(
      { [this.size]: !!this.size },
      { checked: this.checked, disabled: this.disabled, border: this.border }
    );

    const container = this.shadowRoot?.querySelector(".ea-radio");
    if (container) {
      container.className = className;
    }

    return className;
  }

  html(): string {
    return `
      <label class="${bem()}" part="container">
        <span class="${bem.e("input")}" part="input-wrap">
          <span class="${bem.e("inner")}" part="input"></span>
          <input class="${bem.e("original")}" type="radio"
            name="${this.name || ""}"
            value="${this.value || ""}"
            ${this.checked ? "checked" : ""}
            ${this.disabled ? "disabled" : ""} />
        </span>
        <span class="${bem.e("label")}" part="label-wrap">
          <slot>${this.label || ""}</slot>
        </span>
      </label>
    `;
  }

  // ==================== 事件处理 ====================

  /**
   * radio change 事件
   */
  @listen("change", ".ea-radio__original")
  private _onCheckedChangeEvent(e: Event): void {
    e.stopImmediatePropagation();

    if (!this.closest("ea-radio-group")) {
      const sameGroupRadio = document.querySelectorAll(
        `ea-radio[name="${this.name}"]`
      );

      sameGroupRadio.forEach(radio => {
        radio.toggleAttribute("checked", radio === this);
      });
    }

    this.emit("change", {
      detail: {
        value: this.value,
      },
      bubbles: true,
    });
  }

  // ==================== 生命周期 ====================

  $mount(): void {
    if (!this.name)
      this.setAttribute("name", Math.random().toString(36).substring(2, 15));

    this.updateContainerClasslist();
  }
}
