import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement } from "@decorator";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-carousel-item" as const;
const bem = createBEM(TAG_NAME);

/**
 * @summary 走马灯子项组件，用于放置轮播内容。
 * @status stable
 * @since 3.0
 *
 * @slot default - 默认插槽，放置轮播项内容。
 *
 * @csspart container - 轮播项外层容器。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaCarouselItem extends EaBase {
  /** 渲染模板 */
  html(): string {
    return `
      <div class='${bem()}' part='container'>
        <slot></slot>
      </div>
    `;
  }
}
