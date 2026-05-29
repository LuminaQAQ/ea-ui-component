import { EaOverlay } from "@/common/ea-overlay";
import { EaOverlayClosedEvent } from "@/common/ea-overlay/events/EaOverlayClosedEvent";
import { CustomElement, attribute, query, listen, property } from "@decorator";
import { createBEM } from "@utils/bem";
import { Enum } from "@utils/Enum";
import stylesheet from "./index.scss?inline";
import "@/components/ea-icon/index";

const TAG_NAME = "ea-drawer" as const;
const bem = createBEM(TAG_NAME);
const bemMain = createBEM("ea-drawer-main");

const DIRECTION_TYPES = ["rtl", "ltr", "ttb", "btt"] as const;
type DirectionType = (typeof DIRECTION_TYPES)[number];

/**
 * @summary 抽屉组件，用于从屏幕边缘滑出的临时面板，支持多方向打开、头部控制、关闭拦截等功能。
 * @status stable
 * @since 3.0
 *
 * @dependency ea-icon
 *
 * @slot default - 抽屉主体内容。
 * @slot title - 自定义标题内容。
 * @slot footer - 自定义底部内容。
 *
 * @event ea-open - 抽屉打开时触发。
 * @event ea-opened - 抽屉打开动画结束时触发。
 * @event ea-close - 抽屉关闭时触发。
 * @event ea-closed - 抽屉关闭动画结束时触发。
 *
 * @csspart container - 抽屉容器元素。
 * @csspart header - 头部元素。
 * @csspart heading - 标题文本元素。
 * @csspart close-icon - 关闭图标元素。
 * @csspart content - 主体内容元素。
 * @csspart footer - 底部元素。
 *
 * @cssproperty --ea-drawer-size - 抽屉尺寸（宽度或高度，取决于方向）。
 * @cssproperty --ea-drawer-padding - 抽屉内边距。
 * @cssproperty --ea-drawer-heading-color - 标题颜色。
 * @cssproperty --ea-drawer-close-icon-color - 关闭图标颜色。
 * @cssproperty --ea-drawer-content-color - 内容颜色。
 * @cssproperty --ea-drawer-bg-color - 抽屉背景色。
 * @cssproperty --ea-drawer-heading-font-size - 标题字号。
 * @cssproperty --ea-drawer-close-icon-size - 关闭图标尺寸。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaDrawer extends EaOverlay {
  @query(".ea-overlay")
  private _container!: HTMLElement;

  @query(bemMain.ce("header"))
  private _header!: HTMLElement;

  @query(bemMain.ce("heading"))
  private _heading!: HTMLElement;

  @attribute({
    type: Enum(DIRECTION_TYPES),
    default: "rtl",
    observer(this: EaDrawer) {
      this.updateContainerClasslist();
    },
  })
  direction: DirectionType = "rtl";

  @attribute({
    type: Boolean,
    default: true,
    observer(this: EaDrawer) {
      this.updateContainerClasslist();
    },
  })
  withHeader: boolean = true;

  @attribute({
    type: String,
    default: "",
    observer(this: EaDrawer, newVal: string) {
      if (this._heading) this._heading.textContent = newVal;
    },
  })
  heading: string = "";

  @attribute({
    type: Boolean,
    default: true,
    observer(this: EaDrawer) {
      this.updateContainerClasslist();
    },
  })
  showClose: boolean = true;

  @attribute({
    type: String,
    default: "30%",
    observer(this: EaDrawer, newVal: string) {
      this.style.setProperty("--ea-drawer-size", newVal);
    },
  })
  size: string = "30%";

  @property({
    type: Function,
    default: null,
  })
  beforeClose: ((done: () => void) => void) | null = null;

  html(): string {
    const tpl = document.createElement("template");
    tpl.innerHTML = super.html();

    const contentContainer = tpl.content.querySelector(".ea-overlay__content")!;

    contentContainer.innerHTML = `
      <div class='${bemMain()}' part='container'>
        <header class='${bemMain.e("header")}' part='header'>
          <slot name="title">
            <span class='${bemMain.e("heading")}' part='heading'></span>
            <ea-icon class='${bemMain.e("close-icon")}' name='xmark' part='close-icon'></ea-icon>
          </slot>
        </header>
        <main class='${bemMain.e("content")}' part='content'>
          <slot></slot>
        </main>
        <footer class='${bemMain.e("footer")}' part='footer'>
          <slot name='footer'></slot>
        </footer>
      </div>
    `;

    return tpl.innerHTML;
  }

  /**
   * 更新容器类名
   */
  updateContainerClasslist(): string {
    const className = bem(
      { [this.direction]: true },
      {
        "close-hidden": !this.showClose,
        "header-hidden": !this.withHeader,
      }
    );

    const parentClassName = super.updateContainerClasslist();

    const fullClassName = `${parentClassName} ${className}`.trim();

    if (this._container) this._container.className = fullClassName;

    return fullClassName;
  }

  /**
   * 处理关闭图标点击事件
   */
  @listen("click", bemMain.ce("close-icon"))
  private _handleCloseIconClick(): void {
    if (!this.showClose) return;
    this.hide();
  }

  /**
   * 处理关闭动画结束事件
   */
  @listen("ea-closed")
  private _handleClosed(e: EaOverlayClosedEvent): void {
    if (e.target !== this) return;
    this.hide();
  }

  $mount(): void {
    super.$mount?.();

    try {
      this.setAttribute("role", "dialog");
    } catch {
      this.role = "dialog";
    }

    this.updateContainerClasslist();
  }

  $beforeUnmount(): void {
    super.$beforeUnmount?.();
  }
}
