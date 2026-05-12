import EaBase from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import { createBEM } from "@utils/bem";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-option-group" as const;
const bem = createBEM(TAG_NAME);

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaOptionGroup extends EaBase {
  // ==================== DOM 元素引用 ====================

  @query(bem.cb())
  private _container!: HTMLElement;

  @query(bem.ce("header"))
  private _header!: HTMLElement;

  @query('slot[name="header"]')
  private _headerSlot!: HTMLSlotElement;

  @query(bem.ce("content"))
  private _content!: HTMLElement;

  // ==================== 属性定义 ====================

  @attribute({
    type: String,
    default: "",
    observer(this: EaOptionGroup, newVal: string) {
      if (this._headerSlot) {
        this._headerSlot.textContent = newVal;
      }
    },
  })
  label: string = "";

  /**
   * 渲染模板
   */
  html(): string {
    return `
      <div class='${bem()}' part='container'>
        <header class='${bem.e("header")}' part='header'>
          <slot name='header'></slot>
        </header>
        <section class='${bem.e("content")}' part='content'>
          <slot></slot>
        </section>
      </div>
    `;
  }
}
