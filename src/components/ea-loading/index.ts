import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query } from "@decorator";
import { html } from "@utils/html";
import stylesheet from "./index.scss?inline";
import "@/components/ea-icon/index";
import { EaLoadingService } from "./utils/EaLoadingInstance";

const TAG_NAME = "ea-loading" as const;
const bem = createBEM(TAG_NAME);

/**
 * @summary 加载组件，用于在数据加载过程中展示加载动画，支持区域遮罩、全屏模式和滚动锁定。
 * @status stable
 * @since 3.0
 *
 * @dependency ea-icon
 *
 * @slot default - 需要遮罩的内容区域。
 * @slot spinner - 自定义加载图标内容。
 *
 * @event ea-close - 关闭时触发。
 *
 * @csspart container - 容器元素。
 * @csspart mask - 遮罩层元素。
 * @csspart spinner - 加载图标元素。
 * @csspart text - 加载文本元素。
 * @csspart content-wrap - 内容包裹元素。
 *
 * @cssproperty --ea-loading-spinner-size - 加载图标大小。
 * @cssproperty --ea-loading-spinner-color - 加载图标颜色。
 * @cssproperty --ea-loading-background - 遮罩层背景颜色。
 * @cssproperty --ea-loading-text-color - 加载文本颜色。
 * @cssproperty --ea-loading-text-font-size - 加载文本字号。
 * @cssproperty --ea-loading-text-margin-top - 加载文本顶部间距。
 * @cssproperty --ea-loading-z-index - 全屏模式层级。
 * @cssproperty --ea-loading-transition - 过渡动画时长。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaLoading extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @query(bem.ce("spinner"))
  private _spinnerIcon!: HTMLElement;

  @query(bem.ce("text"))
  private _textEl!: HTMLElement;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaLoading) {
      this.updateContainerClasslist();
      this._handleLock();
    },
  })
  loading: boolean = false;

  @attribute({
    type: String,
    default: "spinner",
    observer(this: EaLoading, newVal: string) {
      if (this._spinnerIcon) {
        this._spinnerIcon.setAttribute("name", newVal);
      }
    },
  })
  spinner: string = "spinner";

  @attribute({
    type: Number,
    default: 0,
    observer(this: EaLoading, newVal: number) {
      if (newVal > 0) {
        this.style.setProperty("--ea-loading-spinner-size", `${newVal}px`);
      } else {
        this.style.removeProperty("--ea-loading-spinner-size");
      }
    },
  })
  spinnerSize: number = 0;

  @attribute({
    type: String,
    default: "hsla(0, 0%, 100%, 0.9)",
    observer(this: EaLoading, newVal: string) {
      this.style.setProperty("--ea-loading-background", newVal);
    },
  })
  background: string = "hsla(0, 0%, 100%, 0.9)";

  @attribute({
    type: String,
    default: "",
    observer(this: EaLoading) {
      this._updateText();
    },
  })
  text: string = "";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaLoading) {
      this.updateContainerClasslist();
      this._handleLock();
    },
  })
  fullscreen: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaLoading) {
      this._handleLock();
    },
  })
  lock: boolean = false;

  /** 更新加载文本内容和可见性 */
  private _updateText(): void {
    if (!this._textEl) return;
    this._textEl.textContent = this.text;
    this._textEl.style.display = this.text ? "" : "none";
  }

  /** 处理滚动锁定 */
  private _handleLock(): void {
    if (this.fullscreen && this.loading && this.lock) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }

  /** 更新容器类名 */
  updateContainerClasslist(): string {
    const className = bem(
      { fullscreen: this.fullscreen && this.loading },
      { loading: this.loading }
    );

    if (this._container) this._container.className = className;

    return className;
  }

  /** 渲染模板 */
  html(): string {
    return `
      <div class="${this.updateContainerClasslist()}" part="container">
        <div class="${bem.e("mask")}" part="mask">
          <slot name="spinner">
            <ea-icon class="${bem.e("spinner")}" name="${this.spinner}" spin part="spinner"></ea-icon>
          </slot>
          <div class="${bem.e("text")}" part="text">${html(this.text)}</div>
        </div>
        <div class="${bem.e("content")}" part="content-wrap">
          <slot></slot>
        </div>
      </div>
    `;
  }

  /** 关闭加载 */
  close(): void {
    this.loading = false;
    this.emit("ea-close");
  }

  $mount(): void {
    this.updateContainerClasslist();
    this._updateText();
    this._handleLock();

    if (this.background !== "hsla(0, 0%, 100%, 0.9)") {
      this.style.setProperty("--ea-loading-background", this.background);
    }

    if (this.spinnerSize > 0) {
      this.style.setProperty("--ea-loading-spinner-size", `${this.spinnerSize}px`);
    }
  }

  $beforeUnmount(): void {
    if (this.lock) {
      document.body.style.overflow = "";
    }
  }
}

declare global {
  interface Window {
    $loading: typeof EaLoadingService;
  }
}

window.$loading = EaLoadingService;

export { EaLoadingService };
