import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import { Enum } from "@/utils/Enum";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-splitter-bar" as const;
const bem = createBEM(TAG_NAME);

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaSplitterBar extends EaBase {
  // ==================== DOM 元素引用 ====================

  @query(".ea-splitter-bar")
  private _container!: HTMLElement;

  // ==================== 属性定义 ====================

  @attribute({
    type: Enum(["horizontal", "vertical"] as const),
    default: "horizontal",
  })
  layout: "horizontal" | "vertical" = "horizontal";

  // ==================== 方法 ====================

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist(): string {
    return bem();
  }

  /**
   * 渲染模板
   */
  html(): string {
    return `
      <div class="${this.updateContainerClasslist()}" part="container"></div>
    `;
  }
}
