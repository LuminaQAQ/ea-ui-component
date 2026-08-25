import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query, listen } from "@decorator";
import { Enum } from "@utils/Enum";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-divider" as const;
const bem = createBEM(TAG_NAME);

/**
 * @summary 分隔线组件，用于分隔内容区块，支持水平 / 垂直方向、不同分隔线样式和文案位置。
 * @status stable
 * @since 3.0
 *
 * @slot default - 分隔线中间的自定义文案内容，为空时文案区域隐藏。
 *
 * @csspart container - 容器元素。
 * @csspart content - 文案内容元素。
 * @csspart line - 分隔线元素。
 * @csspart line-start - 分隔线左侧元素。
 * @csspart line-end - 分隔线右侧元素。
 *
 * @cssproperty --ea-divider-border-color - 分隔线边框颜色，默认值 `var(--grey-300)`。
 * @cssproperty --ea-divider-border-style - 分隔线边框样式，默认值 `solid`。
 * @cssproperty --ea-divider-horizontal-spacing - 水平方向上下间距，默认值 `24px`。
 * @cssproperty --ea-divider-vertical-spacing - 垂直方向左右间距，默认值 `var(--spacing-md)`。
 * @cssproperty --ea-divider-text-spacing - 文案左右间距，默认值 `var(--spacing-lg)`。
 * @cssproperty --ea-divider-line-proportion - 文案居左/居右时短边线的比例，默认值 `0.05`。
 * @cssproperty --ea-divider-border-radius - 组件边框圆角，默认值 `var(--border-radius-sm)`。
 * @cssproperty --ea-divider-font-size - 文案字体大小，默认值 `var(--font-size-md)`。
 * @cssproperty --ea-divider-transition - 组件过渡动画，默认值 `var(--transition-fast)`。
 * @cssproperty --ea-divider-text - 文案文字颜色，默认值 `var(--grey-900)`。
 * @cssproperty --ea-divider-bg - 背景颜色，默认值 `var(--color-white)`。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaDivider extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @query("#defaultSlot")
  private _defaultSlot!: HTMLSlotElement;

  @attribute({
    type: String,
    default: "",
    observer(this: EaDivider, newVal: string) {
      this._container?.style.setProperty(
        `--${TAG_NAME}-border-style`,
        newVal || ""
      );
    },
  })
  variant: string = "";

  @attribute({
    type: Enum(["start", "end", "center"]),
    default: "center",
    observer(this: EaDivider, newVal: string) {
      this.updateContainerClasslist();
    },
  })
  contentPosition: "start" | "end" | "center" = "center";

  @attribute({
    type: Enum(["horizontal", "vertical"]),
    default: "horizontal",
    observer(this: EaDivider, newVal: string) {
      this.updateContainerClasslist();
    },
  })
  direction: "horizontal" | "vertical" = "horizontal";

  /**
   * 更新容器类名
   * @returns 更新后的类名字符串
   */
  updateContainerClasslist(): string {
    const className = bem(
      {
        [this.contentPosition]: !!this.contentPosition,
        [this.direction]: !!this.direction,
      },
      {
        empty: this._defaultSlot?.assignedNodes().length <= 0,
      }
    );

    if (this._container) this._container.className = className;

    return className;
  }

  html(): string {
    return `
      <div class="${bem()}" part="container" role="separator">
        <span class="${bem.e("line")} ${bem.m("line-start")}" part="line line-start"></span>
        <span class="${bem.e("content")}" part="content">
          <slot id="defaultSlot"></slot>
        </span>
        <span class="${bem.e("line")} ${bem.m("line-end")}" part="line line-end"></span>
      </div>
    `;
  }

  /**
   * 监听 slot 内容变化，更新空状态类名
   */
  @listen("slotchange", "#defaultSlot")
  private _handleSlotChange(): void {
    this.updateContainerClasslist();
  }

  $mount(): void {
    this.updateContainerClasslist();
  }
}
