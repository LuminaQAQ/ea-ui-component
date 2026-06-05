import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query } from "@decorator";
import { emptyStatusSVG } from "./assets/emptyStatusSVG";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-empty" as const;
const bem = createBEM(TAG_NAME);

/**
 * @summary 空状态组件，用于展示空数据时的占位提示，支持自定义图片、描述文字和底部内容。
 * @status stable
 * @since 3.0
 *
 * @slot image - 自定义图片内容。
 * @slot description - 自定义描述内容。
 * @slot default - 默认插槽，用于底部操作内容。
 *
 * @csspart container - 容器元素。
 * @csspart placeholder - 图片占位容器元素。
 * @csspart image - 自定义图片元素。
 * @csspart default-image-front - 默认 SVG 前景路径元素。
 * @csspart default-image-border - 默认 SVG 边框路径元素。
 * @csspart description - 描述文字容器元素。
 * @csspart bottom - 底部容器元素。
 *
 * @cssproperty --ea-empty-size - 图片区域尺寸。
 * @cssproperty --ea-empty-image-color - 默认图片颜色。
 * @cssproperty --ea-empty-color - 描述文字颜色。
 * @cssproperty --ea-empty-description-font-size - 描述文字字号。
 * @cssproperty --ea-empty-spacing - 元素间距。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaEmpty extends EaBase {
  @query(`${bem.ce("placeholder")} slot[name="image"]`)
  private _imageSlot!: HTMLElement;

  @query(`${bem.ce("description")} slot[name="description"]`)
  private _descriptionSlot!: HTMLElement;

  @attribute({
    type: String,
    default: "",
    observer(this: EaEmpty, newVal: string) {
      this._updateImage(newVal);
    },
  })
  image: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaEmpty, newVal: string) {
      if (!newVal) {
        this.style.removeProperty("--ea-empty-size");
        return;
      }

      if (!CSS.supports("width", newVal)) {
        console.warn(`[ea-empty] The size value ${newVal} is not supported.`);
        return;
      }

      this.style.setProperty("--ea-empty-size", newVal);
    },
  })
  imageSize: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaEmpty, newVal: string) {
      this._updateDescription(newVal);
    },
  })
  description: string = "";

  /** 更新图片区域内容 */
  private _updateImage(imageUrl: string): void {
    if (!imageUrl) {
      this._imageSlot.innerHTML = `<section class="${bem.e("default")}">${emptyStatusSVG}</section>`;
      return;
    }

    const img = document.createElement("img");
    img.className = bem.e("image");
    img.src = imageUrl;
    img.alt = "empty image";
    img.setAttribute("part", "image");
    this._imageSlot.innerHTML = "";
    this._imageSlot.appendChild(img);
  }

  /** 更新描述文字内容 */
  private _updateDescription(text: string): void {
    this._descriptionSlot.textContent = text || "No Data";
  }

  html(): string {
    return `
      <div class="${bem()}" part="container" role="status">
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

  $mount(): void {
    if (this.image) {
      this._updateImage(this.image);
    }
    if (this.description) {
      this._updateDescription(this.description);
    }
  }
}

export default EaEmpty;
