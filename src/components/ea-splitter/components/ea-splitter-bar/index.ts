import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, property, query } from "@decorator";
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
    a11y: {
      ariaAttr: "aria-orientation",
      map: (v: "horizontal" | "vertical") => (v === "horizontal" ? "vertical" : "horizontal"),
    },
    observer(this: EaSplitterBar) {
      this._container.className = this.updateContainerClasslist();
    },
  })
  layout: "horizontal" | "vertical" = "horizontal";

  @attribute({
    type: String,
    default: "",
    a11y: {
      ariaAttr: "aria-label",
      map: (v: string) => v || null,
    },
  })
  label: string = "";

  @attribute({
    type: Number,
    default: 10,
  })
  step: number = 10;

  @property({
    type: Number,
    default: 50,
    observer(this: EaSplitterBar, newVal: number) {
      this.setAttribute("aria-valuenow", String(newVal));
    },
  })
  valuenow: number = 50;

  @property({
    type: Number,
    default: 0,
    observer(this: EaSplitterBar, newVal: number) {
      this.setAttribute("aria-valuemin", String(newVal));
    },
  })
  valuemin: number = 0;

  @property({
    type: Number,
    default: 100,
    observer(this: EaSplitterBar, newVal: number) {
      this.setAttribute("aria-valuemax", String(newVal));
    },
  })
  valuemax: number = 100;

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

  $mount(): void {
    this.setAttribute("role", "separator");
    this.tabIndex = 0;
    this.setAttribute("aria-valuenow", String(this.valuenow));
    this.setAttribute("aria-valuemin", String(this.valuemin));
    this.setAttribute("aria-valuemax", String(this.valuemax));
  }
}
