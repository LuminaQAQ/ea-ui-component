import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query } from "@decorator";
import { html } from "@utils/html";
import { Enum } from "@utils/Enum";
import { VARIANT_TYPES, type VariantType } from "@constants/variant";
import stylesheet from "./index.scss?inline";
import "@/components/ea-icon/index";

const TAG_NAME = "ea-timeline-item" as const;
const bem = createBEM(TAG_NAME);

/**
 * @summary 时间线项组件，用于展示单个时间线节点，支持自定义样式、图标和颜色。
 * @status stable
 * @since 3.0
 *
 * @dependency ea-icon
 *
 * @slot default - 默认插槽，放置时间线项的主内容。
 * @slot dot - 自定义节点内容（覆盖 icon 属性）。
 * @slot timestamp - 自定义时间戳内容（覆盖 timestamp 属性）。
 *
 * @csspart container - 外层容器。
 * @csspart left-wrapper - 左侧容器。
 * @csspart dot - 默认的节点容器。
 * @csspart icon-dot - 节点图标。
 * @csspart tail - 时间线线条。
 * @csspart right-wrapper - 右侧容器。
 * @csspart content - 单个时间线的内容。
 * @csspart timestamp - 时间戳。
 *
 * @cssproperty --ea-timeline-item-dot-color - 节点颜色。
 * @cssproperty --ea-timeline-item-tail-color - 时间线线条颜色。
 * @cssproperty --ea-timeline-item-content-color - 内容颜色。
 * @cssproperty --ea-timeline-item-timestamp-color - 时间戳颜色。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaTimelineItem extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @query(bem.ce("dot"))
  private _dot!: HTMLElement;

  @query('slot[name="timestamp"]')
  private _timestampSlot!: HTMLElement;

  @attribute({
    type: Enum(VARIANT_TYPES),
    default: "",
    observer(this: EaTimelineItem) {
      this.updateContainerClasslist();
    },
  })
  variant: VariantType | "" = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaTimelineItem, newVal: string) {
      this._timestampSlot.textContent = newVal;
    },
  })
  timestamp: string = "";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaTimelineItem) {
      this.updateContainerClasslist();
    },
  })
  hideTimestamp: boolean = false;

  @attribute({
    type: String,
    default: "",
    observer(this: EaTimelineItem, newVal: string) {
      if (!newVal) {
        this.style.removeProperty("--ea-timeline-item-dot-color");
        if (this._dot) this._dot.style.borderColor = "";
        return;
      }
      if (!CSS.supports("color", newVal))
        return console.warn(
          `[EaTimelineItem] The color value ${newVal} is not supported.`
        );
      if (!this._dot) return;

      this.style.setProperty("--ea-timeline-item-dot-color", newVal);
      this._dot.style.borderColor = newVal;
    },
  })
  color: string = "";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaTimelineItem) {
      this.updateContainerClasslist();
    },
  })
  hollow: boolean = false;

  @attribute({
    type: String,
    default: "",
    observer(this: EaTimelineItem, newVal: string) {
      if (newVal) {
        this._dot.innerHTML = html(
          `<ea-icon class="${bem.e("icon-dot")}" part="icon-dot" name="${newVal}"></ea-icon>`
        );
      } else {
        this._dot.innerHTML = "";
      }
    },
  })
  icon: string = "";

  @attribute({
    type: Enum(["normal", "large"]),
    default: "",
    observer(this: EaTimelineItem) {
      this.updateContainerClasslist();
    },
  })
  size: "normal" | "large" | "" = "";

  @attribute({
    type: Enum(["top", "bottom"]),
    default: "",
    observer(this: EaTimelineItem) {
      this.updateContainerClasslist();
    },
  })
  placement: "top" | "bottom" | "" = "";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaTimelineItem) {
      this.updateContainerClasslist();
    },
  })
  center: boolean = false;

  /** 更新容器类名列表 */
  updateContainerClasslist(): string {
    const className = bem(
      {
        [this.variant]: !!this.variant,
        [this.size]: !!this.size,
        [this.placement]: !!this.placement,
        center: this.center,
      },
      {
        "hollow-dot": this.hollow,
        "hide-timestamp": this.hideTimestamp,
      }
    );

    if (this._container) {
      this._container.className = className;
    }

    return className;
  }

  html(): string {
    return `
      <div class="${bem()}" part="container" role="listitem">
        <aside class="${bem.e("wrapper")}" part="left-wrapper">
          <slot name="dot">
            <section class="${bem.e("dot")}" part="dot"></section>
          </slot>
          <section class="${bem.e("tail")}" part="tail"></section>
        </aside>
        <main class="${bem.e("wrapper")} ${bem.e("right-wrapper")}" part="right-wrapper">
          <header class="${bem.e("content")}" part="content">
            <slot></slot>
          </header>
          <footer class="${bem.e("timestamp")}" part="timestamp">
            <slot name="timestamp"></slot>
          </footer>
        </main>
      </div>
    `;
  }

  $mount(): void {
    this.updateContainerClasslist();
  }
}

export default EaTimelineItem;
