import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query } from "@decorator";
import { Enum } from "@utils/Enum";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-splitter-bar" as const;
const bem = createBEM(TAG_NAME);

/**
 * @summary 分隔条组件，用于在分隔面板之间提供可拖动的分隔线。
 * @status stable
 * @since 3.0
 *
 * @csspart container - 容器元素。
 *
 * @cssproperty --ea-splitter-bar-size - 分隔条尺寸（水平模式为宽度，垂直模式为高度）。
 * @cssproperty --ea-splitter-bar-color - 分隔条默认颜色。
 * @cssproperty --ea-splitter-bar-hover-color - 分隔条悬停颜色。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaSplitterBar extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @attribute({
    type: Enum(["horizontal", "vertical"] as const),
    default: "horizontal",
    observer(this: EaSplitterBar) {
      this._container.className = this.updateContainerClasslist();
    },
  })
  layout: "horizontal" | "vertical" = "horizontal";

  /** 更新容器类名 */
  updateContainerClasslist(): string {
    return bem({ [this.layout]: true });
  }

  /** 渲染模板 */
  html(): string {
    return `
      <div class="${this.updateContainerClasslist()}" part="container"></div>
    `;
  }
}
