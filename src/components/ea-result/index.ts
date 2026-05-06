import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import { Enum } from "@/utils/Enum";
import { VARIANT_TYPES, VARIANT_ICON_MAP, type VariantType } from "@/constants/variant";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-result" as const;
const bem = createBEM(TAG_NAME);

export type ResultVariant = VariantType | "error";

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaResult extends EaBase {
  // ==================== DOM 元素引用 ====================

  @query(bem.cb())
  private _container!: HTMLElement;

  @query(bem.ce("default-icon"))
  private _icon!: HTMLElement;

  @query(`${bem.ce("title")} slot`)
  private _titleSlot!: HTMLElement;

  @query(`${bem.ce("sub-title")} slot`)
  private _subTitleSlot!: HTMLElement;

  // ==================== 属性定义 ====================

  @attribute({
    type: Enum([...VARIANT_TYPES, "error"]),
    default: "",
    observer(this: EaResult, newVal: string) {
      if (newVal) {
        this._icon.setAttribute("name", VARIANT_ICON_MAP[newVal] || "");
      }
      this.updateContainerClasslist();
    },
  })
  variant: ResultVariant | "" = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaResult, newVal: string) {
      this._titleSlot.textContent = newVal;
    },
  })
  heading: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaResult, newVal: string) {
      this._subTitleSlot.textContent = newVal;
    },
  })
  subTitle: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaResult, newVal: string) {
      if (newVal) {
        this._icon.setAttribute("name", newVal);
      } else {
        this._icon.setAttribute("name", VARIANT_ICON_MAP[this.variant] || "");
      }
    },
  })
  icon: string = "";

  // ==================== 方法 ====================

  updateContainerClasslist(): string {
    const className = bem({ [this.variant]: !!this.variant });

    if (this._container) this._container.className = className;

    return className;
  }

  html(): string {
    return `
      <div class='${bem()}' part='container'>
        <div class="${bem.e("icon")} ${bem.e("icon-wrap")}" part="icon-wrap">
          <slot name="icon">
            <ea-icon class="${bem.e("icon")} ${bem.e("default-icon")}" part="icon"></ea-icon>
          </slot>
        </div>
        <div class="${bem.e("title")}" part="title">
          <slot name="title"></slot>
        </div>
        <div class="${bem.e("sub-title")}" part="sub-title">
          <slot name="sub-title"></slot>
        </div>
        <div class="${bem.e("extra")}" part="extra">
          <slot name="extra"></slot>
        </div>
      </div>
    `;
  }

  // ==================== 生命周期 ====================

  $mount(): void {
    this.updateContainerClasslist();
  }
}
