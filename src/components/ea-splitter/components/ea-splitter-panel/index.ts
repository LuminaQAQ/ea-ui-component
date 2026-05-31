import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query } from "@decorator";
import { Enum } from "@utils/Enum";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-splitter-panel" as const;
const bem = createBEM(TAG_NAME);

export type SplitterLayoutType = "horizontal" | "vertical";

/**
 * @summary 分隔面板子组件，用于放置在 ea-splitter 中作为各区域的内容容器。
 * @status stable
 * @since 3.0
 *
 * @slot default - 默认插槽，用于面板内容。
 *
 * @csspart container - 容器元素。
 *
 * @cssproperty --ea-splitter-panel-size - 面板大小。
 * @cssproperty --ea-splitter-panel-min-size - 面板最小尺寸。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaSplitterPanel extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

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

  /** 更新容器类名 */
  updateContainerClasslist(): string {
    return bem();
  }

  /** 渲染模板 */
  html(): string {
    return `
      <div class="${this.updateContainerClasslist()}" part="container">
        <slot></slot>
      </div>
    `;
  }
}
