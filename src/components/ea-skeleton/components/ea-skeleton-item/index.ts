import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query } from "@decorator";
import { Enum } from "@utils/Enum";
import { html } from "@utils/html";
import { skeletonImageSVG } from "./assets/imageSVG";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-skeleton-item" as const;
const bem = createBEM(TAG_NAME);

const SKELETON_ITEM_VARIANTS = [
  "p",
  "text",
  "h1",
  "h3",
  "caption",
  "button",
  "image",
  "circle",
  "rect",
] as const;

type SkeletonItemVariant = (typeof SKELETON_ITEM_VARIANTS)[number];

/**
 * @summary 骨架屏条目组件，用于渲染不同类型的占位图单元，支持多种变体和动画效果。
 * @status stable
 * @since 3.0
 *
 * @slot default - 默认插槽。
 *
 * @csspart container - 外层容器。
 * @csspart image-svg - 图片占位 SVG 元素（仅 image 变体）。
 *
 * @cssproperty --ea-skeleton-item-color - 占位图背景颜色。
 * @cssproperty --ea-skeleton-item-border-radius - 占位图圆角。
 * @cssproperty --ea-skeleton-item-image-color - 图片占位图颜色。
 * @cssproperty --ea-skeleton-item-circle-size - 圆形变体尺寸。
 * @cssproperty --ea-skeleton-item-animation-color-from - 动画渐变起始颜色。
 * @cssproperty --ea-skeleton-item-animation-color-to - 动画渐变中间颜色。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaSkeletonItem extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @attribute({
    type: Enum(SKELETON_ITEM_VARIANTS),
    default: "p",
    observer(this: EaSkeletonItem, newVal: SkeletonItemVariant) {
      if (newVal === "image") {
        this._container.innerHTML = html(skeletonImageSVG);
      } else {
        this._container.innerHTML = "";
      }
      this.updateContainerClasslist();
    },
  })
  variant: SkeletonItemVariant = "p";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaSkeletonItem) {
      this.updateContainerClasslist();
    },
  })
  animated: boolean = false;

  /** 更新容器类名 */
  updateContainerClasslist(): string {
    const className = bem(
      { [this.variant]: true },
      { animated: this.animated }
    );
    this._container.className = className;
    return className;
  }

  /** 渲染模板 */
  html(): string {
    const imageVariant = this.variant === "image" ? skeletonImageSVG : "";

    return `
      <div class="${bem()}" part="container">${imageVariant}</div>
    `;
  }

  $mount(): void {
    this.updateContainerClasslist();
  }
}

export default EaSkeletonItem;
