import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute } from "@decorator";
import { Enum } from "@utils/Enum";
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
export type JustifyType = (typeof JUSTIFY_TYPES)[number];

const ALIGN_TYPES = ["top", "middle", "bottom"] as const;
export type AlignType = (typeof ALIGN_TYPES)[number];

/**
 * @summary 栅格行组件，基于 24 分栏的 Flex 布局容器，支持列间距、对齐方式和自定义标签。
 * @status stable
 * @since 3.0
 *
 * @dependency ea-col
 *
 * @slot default - 默认插槽，用于放置 ea-col 列组件。
 *
 * @csspart container - 容器元素。
 *
 * @cssproperty --ea-row-gutter - 列间距（半值），默认 0px。
 * @cssproperty --ea-row-justify - 水平排列方式，默认 start。
 * @cssproperty --ea-row-align - 垂直对齐方式，默认 top。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaRow extends EaBase {
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

  html(): string {
    return `
      <${this.tag} class="${bem()}" part="container">
        <slot></slot>
      </${this.tag}>
    `;
  }

  $mount(): void {
    this.style.setProperty("--ea-row-gutter", this.gutter / 2 + "px");
    this.style.setProperty("--ea-row-justify", this.justify);
    this.style.setProperty("--ea-row-align", this.align);
  }
}
