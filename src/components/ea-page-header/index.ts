import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { listen } from "@decorator/listen";
import { query } from "@decorator/query";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-page-header" as const;
const bem = createBEM(TAG_NAME);

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaPageHeader extends EaBase {
  // ==================== DOM 元素引用 ====================

  @query(bem.ce("back"))
  private _backEl!: HTMLElement;

  @query(`${bem.ce("icon")} slot[name="icon"]`)
  private _backIconSlot!: HTMLSlotElement;

  @query(`${bem.ce("heading")} slot[name="title"]`)
  private _titleSlot!: HTMLSlotElement;

  @query(`${bem.ce("content")} slot[name="content"]`)
  private _contentSlot!: HTMLSlotElement;

  // ==================== 属性定义 ====================

  @attribute({
    type: String,
    default: "",
    observer(this: EaPageHeader, newVal: string) {
      const iconEl = this._backIconSlot?.querySelector("ea-icon");
      if (iconEl) {
        iconEl.setAttribute("name", newVal);
      }
    },
  })
  icon: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaPageHeader, newVal: string) {
      if (this._titleSlot) {
        this._titleSlot.textContent = newVal;
      }
    },
  })
  heading: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaPageHeader, newVal: string) {
      if (this._contentSlot) {
        this._contentSlot.textContent = newVal;
      }
    },
  })
  content: string = "";

  // ==================== 方法 ====================

  html(): string {
    return `
      <div class='${bem()}' part='container'>
        <section class="${bem.e("breadcrumb")}" part="breadcrumb">
          <slot name="breadcrumb"></slot>
        </section>
        <section class="${bem.e("wrapper")}" part="header-wrapper">
          <div class="${bem.e("back")}" part="back">
            <span class="${bem.e("icon")}" part="icon">
              <slot name="icon">
                <ea-icon name="angle-left" part="back-icon"></ea-icon>
              </slot>
            </span>
            <span class="${bem.e("heading")}" part="title">
                <slot name="title">Back</slot>
            </span>
          </div>
          <ea-icon class="${bem.e("divider")}" part="divider">|</ea-icon>
          <div class="${bem.e("content")}" part="content">
            <slot name="content"></slot>
          </div>
          <div class="${bem.e("extra")}" part="extra">
            <slot name="extra"></slot>
          </div>
        </section>
        <slot></slot>
      </div>
    `;
  }

  // ==================== 事件处理 ====================

  @listen("click", bem.ce("back"))
  private _handleBackClick(_e: Event) {
    this.emit("back");
  }
}
