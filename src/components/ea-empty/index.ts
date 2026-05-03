import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import stylesheet from "./index.scss?inline";
import { emptyStatusSVG } from "./assets/emptyStatusSVG";
import html from "@/utils/html";

const TAG_NAME = "ea-empty" as const;
const bem = createBEM(TAG_NAME);

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaEmpty extends EaBase {
  // ==================== DOM 元素引用 ====================

  @query(bem.cb())
  private _container!: HTMLElement;

  @query(bem.ce("placeholder") + ' slot[name="image"]')
  private _placeholder!: HTMLElement;

  @query(bem.ce("description") + ' slot[name="description"]')
  private _description!: HTMLElement;

  @query(bem.ce("bottom"))
  private _bottom!: HTMLElement;

  // ==================== 属性定义 ====================

  @attribute({
    type: String,
    default: "",
    observer(this: EaEmpty, newVal: string) {
      if (!newVal) {
        this._placeholder.innerHTML = html(`
          <section class="${bem.e("default")}">${emptyStatusSVG}</section>
        `);
      } else {
        this._placeholder.innerHTML = html(`
          <img class="${bem.e("image")}" src="${newVal}" alt="empty image" part="image" />
        `);
      }
    },
  })
  image: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaEmpty, newVal: string) {
      if (!CSS.supports("width", newVal))
        return console.warn(
          `[ea-empty] The size value ${newVal} is not supported.`
        );

      this.style.setProperty("--ea-empty-size", newVal);
    },
  })
  imageSize: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaEmpty, newVal: string) {
      if (!newVal) {
        this._description.textContent = `No Data`;
      } else {
        this._description.textContent = newVal;
      }
    },
  })
  description: string = "";

  // ==================== 方法 ====================

  html(): string {
    return `
      <div class="${bem()}" part="container">
        <div class="${bem.e("placeholder")}" part="placeholder">
            <slot name="image">
              <section class="${bem.e("default")}">${emptyStatusSVG}</section>
            </slot>
        </div>
        <div class="${bem.e("description")}" part="description">
            <slot name="description">No Data</slot>
        </div>
        <div class="${bem.e("bottom")}" part="bottom">
            <slot></slot>
        </div>
      </div>
    `;
  }
}

export default EaEmpty;
