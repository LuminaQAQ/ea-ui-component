import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { Enum } from "@/utils/Enum";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-row" as const;
const bem = createBEM(TAG_NAME);

const JUSTIFY_TYPES = [
  "start",
  "end",
  "center",
  "space-around",
  "space-between",
  "space-evenly",
] as const;
type JustifyType = (typeof JUSTIFY_TYPES)[number];

const ALIGN_TYPES = ["top", "middle", "bottom"] as const;
type AlignType = (typeof ALIGN_TYPES)[number];

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaRow extends EaBase {
  // ==================== 属性定义 ====================

  @attribute({
    type: Number,
    default: 0,
    observer(this: EaRow, newVal: number) {
      this.style.setProperty("--ea-row-gutter", newVal / 2 + "px");
    },
  })
  gutter: number = 0;

  @attribute({
    type: Enum(JUSTIFY_TYPES),
    default: "start",
    observer(this: EaRow, newVal: JustifyType) {
      this.style.setProperty("--ea-row-justify", newVal);
    },
  })
  justify: JustifyType = "start";

  @attribute({
    type: Enum(ALIGN_TYPES),
    default: "top",
    observer(this: EaRow, newVal: AlignType) {
      this.style.setProperty("--ea-row-align", newVal);
    },
  })
  align: AlignType = "top";

  @attribute({
    type: String,
    default: "div",
  })
  tag: string = "div";

  // ==================== 方法 ====================

  /**
   * 渲染模板
   */
  html(): string {
    return `
      <${this.tag} class="${bem()}" part="container">
        <slot></slot>
      </${this.tag}>
    `;
  }

  // ==================== 生命周期 ====================

  $mount(): void {
    // 初始化 CSS 变量
    this.style.setProperty("--ea-row-gutter", this.gutter / 2 + "px");
    this.style.setProperty("--ea-row-justify", this.justify);
    this.style.setProperty("--ea-row-align", this.align);
  }
}
