import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import { Enum } from "@/utils/Enum";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-splitter-panel" as const;
const bem = createBEM(TAG_NAME);

export type SplitterLayoutType = "horizontal" | "vertical";

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaSplitterPanel extends EaBase {
  // ==================== DOM 元素引用 ====================

  @query(".ea-splitter-panel")
  private _container!: HTMLElement;

  // ==================== 属性定义 ====================

  @attribute({
    type: String,
    default: "",
    observer(this: EaSplitterPanel, newVal: string) {
      if (!CSS.supports("width", newVal)) return;
      this.style.setProperty("--ea-splitter-panel-size", newVal);
    },
  })
  size: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaSplitterPanel, newVal: string) {
      if (!CSS.supports("width", newVal)) return;
      this.style.setProperty("--ea-splitter-panel-min-size", newVal);
    },
  })
  min: string = "";

  @attribute({
    type: Enum(["horizontal", "vertical"] as const),
    default: "horizontal",
  })
  layout: SplitterLayoutType = "horizontal";

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
      <div class="${this.updateContainerClasslist()}" part="container">
        <slot></slot>
      </div>
    `;
  }
}
