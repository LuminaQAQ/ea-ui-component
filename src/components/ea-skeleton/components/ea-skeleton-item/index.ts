import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import { Enum } from "@/utils/Enum";
import { html } from "@/utils/html";
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

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaSkeletonItem extends EaBase {
  // ==================== DOM 元素引用 ====================

  @query(bem.cb())
  private _container!: HTMLElement;

  // ==================== 属性定义 ====================

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

  // ==================== 方法 ====================

  updateContainerClasslist(): string {
    const className = bem(
      { [this.variant]: true },
      { animated: this.animated }
    );

    this._container.className = className;

    return className;
  }

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
