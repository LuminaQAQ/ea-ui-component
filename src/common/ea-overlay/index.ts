import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, property, query, listen } from "@decorator";
import { EaOverlayOpenEvent } from "./events/EaOverlayOpenEvent";
import { EaOverlayOpenedEvent } from "./events/EaOverlayOpenedEvent";
import { EaOverlayCloseEvent } from "./events/EaOverlayCloseEvent";
import { EaOverlayClosedEvent } from "./events/EaOverlayClosedEvent";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-overlay" as const;
const bem = createBEM(TAG_NAME);

/**
 * @summary 遮罩层组件，用于弹窗场景的背景遮罩，支持模态/非模态模式、过渡动画和关闭拦截。
 * @status stable
 * @since 3.0
 *
 * @slot default - 遮罩层内容区域。
 *
 * @event ea-open - 遮罩层打开时触发。
 * @event ea-opened - 遮罩层打开动画结束时触发。
 * @event ea-close - 遮罩层关闭时触发。
 * @event ea-closed - 遮罩层关闭动画结束时触发。
 *
 * @csspart container - 容器元素。
 * @csspart mask - 遮罩层元素。
 * @csspart content - 内容容器元素。
 *
 * @cssproperty --ea-overlay-z-index - 层级。
 * @cssproperty --ea-overlay-background-color - 遮罩层背景颜色。
 * @cssproperty --ea-overlay-content-width - 内容宽度。
 * @cssproperty --ea-overlay-content-max-width - 内容最大宽度。
 * @cssproperty --ea-overlay-content-height - 内容高度。
 * @cssproperty --ea-overlay-transition - 过渡动画时长。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaOverlay extends EaBase {
  @query(bem.cb())
  protected _container!: HTMLElement;

  @query(bem.ce("mask"))
  protected _overlayMask!: HTMLElement;

  @query(bem.ce("content"))
  protected _overlayContent!: HTMLElement;

  private _transitionAbortController?: AbortController;
  private _closingByBeforeClose: boolean = false;
  private _inBeforeClose: boolean = false;
  private _waitingBeforeClose: boolean = false;
  private _appendHandled: boolean = false;
  private _previousFocusElement: HTMLElement | null = null;
  private _isRedirectingFocus: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaOverlay, newVal: boolean) {
      if (this._inBeforeClose) return;
      if (this._waitingBeforeClose) return;

      this._transitionAbortController?.abort();
      this._transitionAbortController = new AbortController();

      if (this._closingByBeforeClose) {
        this._closingByBeforeClose = false;
        this._handleCloseTransition();
        return;
      }

      if (newVal) {
        this._handleOpenTransition();
      } else {
        this._handleCloseRequest();
      }
    },
  })
  visible: boolean = false;

  @attribute({
    type: Boolean,
    default: true,
    observer(this: EaOverlay) {
      this.updateContainerClasslist();
    },
  })
  modal: boolean = true;

  @attribute({
    type: Boolean,
    default: true,
  })
  closeOnClickModal: boolean = true;

  @attribute({
    type: Boolean,
    default: true,
  })
  closeOnPressEscape: boolean = true;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaOverlay) {
      this._appendHandled = false;
      this._handleAppendTo();
    },
  })
  appendToBody: boolean = false;

  @attribute({
    type: String,
    default: "body",
    observer(this: EaOverlay) {
      this._appendHandled = false;
      this._handleAppendTo();
    },
  })
  appendTo: string = "body";

  @attribute({
    type: String,
    default: "",
    observer(this: EaOverlay, newVal: string) {
      this.style.setProperty("--ea-overlay-z-index", newVal);
    },
  })
  zIndex: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaOverlay, newVal: string) {
      this.style.setProperty("--ea-overlay-background-color", newVal);
    },
  })
  backgroundColor: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaOverlay, newVal: string) {
      this.style.setProperty("--ea-overlay-content-width", newVal);
    },
  })
  contentWidth: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaOverlay, newVal: string) {
      this.style.setProperty("--ea-overlay-content-max-width", newVal);
    },
  })
  contentMaxWidth: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaOverlay, newVal: string) {
      this.style.setProperty("--ea-overlay-content-height", newVal);
    },
  })
  contentHeight: string = "";

  @property({
    type: Function,
    default: null,
    observer(this: EaOverlay, newVal: ((done: (cancel?: boolean) => void) => void) | null) {
      if (newVal === null) {
        this._waitingBeforeClose = false;
      }
    },
  })
  beforeClose: ((done: (cancel?: boolean) => void) => void) | null = null;

  updateContainerClasslist(): string {
    const className = bem({ open: this.visible }, { modal: this.modal });

    if (this._container) this._container.className = className;

    return className;
  }

  /** 处理组件追加到指定容器 */
  private _handleAppendTo(): void {
    if (this._appendHandled) return;

    if (
      typeof this.appendTo === "string" &&
      this.appendTo &&
      this.appendTo !== "body"
    ) {
      try {
        const parent = document.querySelector(this.appendTo);
        if (parent && this.parentElement !== parent) {
          this._appendHandled = true;
          parent.appendChild(this);
        }
      } catch {
        if (this.parentElement !== document.body) {
          this._appendHandled = true;
          document.body.appendChild(this);
        }
      }
    } else if (this.appendToBody) {
      if (this.parentElement !== document.body) {
        this._appendHandled = true;
        document.body.appendChild(this);
      }
    }
  }

  /** 处理打开过渡动画 */
  private _handleOpenTransition(): void {
    this.updateContainerClasslist();
    this.dispatchEvent(new EaOverlayOpenEvent());

    // 保存先前焦点元素（必须在焦点移动前同步保存）
    this._previousFocusElement = document.activeElement as HTMLElement;

    requestAnimationFrame(() => {
      this._container.classList.add(bem.s("show"));

      // 下一帧再聚焦，避免 focus() 触发同步重排导致 CSS transition 无法触发
      requestAnimationFrame(() => {
        const first = this.$getFocusableElements("all")[0];
        if (first) {
          first.focus();
        } else {
          this.focus();
        }
      });

      this._container.addEventListener(
        "transitionend",
        () => {
          this.dispatchEvent(new EaOverlayOpenedEvent());
        },
        { signal: this._transitionAbortController!.signal, once: true }
      );
    });
  }

  /** 处理关闭请求，支持 beforeClose 拦截 */
  private _handleCloseRequest(): void {
    if (this.beforeClose && typeof this.beforeClose === "function") {
      this._inBeforeClose = true;
      this._waitingBeforeClose = true;
      let doneCalled = false;

      this.beforeClose((cancel?: boolean) => {
        if (doneCalled) return;
        doneCalled = true;
        this._waitingBeforeClose = false;

        if (cancel) {
          if (!this.visible) {
            this.visible = true;
          }
          return;
        }

        const wasVisible = this.visible;
        this.visible = false;

        if (wasVisible) {
          this._closingByBeforeClose = true;
        } else {
          this._transitionAbortController?.abort();
          this._transitionAbortController = new AbortController();
          this._handleCloseTransition();
        }
      });

      if (!doneCalled) {
        this.visible = true;
      }

      this._inBeforeClose = false;
    } else {
      this._handleCloseTransition();
    }
  }

  /** 处理关闭过渡动画 */
  private _handleCloseTransition(): void {
    this._container.classList.remove(bem.s("show"));
    this._container.classList.add(bem.s("before-close"));
    this.dispatchEvent(new EaOverlayCloseEvent());

    // 立即恢复焦点（不等动画结束，确保焦点不留在隐藏内容上）
    if (this._previousFocusElement) {
      this._previousFocusElement.focus();
      this._previousFocusElement = null;
    }

    this._container.addEventListener(
      "transitionend",
      () => {
        this.updateContainerClasslist();
        this.dispatchEvent(new EaOverlayClosedEvent());
      },
      { signal: this._transitionAbortController!.signal, once: true }
    );
  }

  /** 焦点陷阱：焦点逃逸出弹窗时拉回 */
  @listen("focusin", "document")
  private _handleFocusin(e: FocusEvent): void {
    if (!this.visible || this._isRedirectingFocus) return;

    // 使用 composedPath 检查焦点是否在弹窗内（包括 Shadow DOM）
    if (e.composedPath().includes(this)) return;

    // 焦点逃逸出弹窗，拉回
    this._isRedirectingFocus = true;
    const focusable = this.$getFocusableElements("all");
    if (focusable.length > 0) {
      focusable[0].focus();
    } else {
      this.focus();
    }
    this._isRedirectingFocus = false;
  }

  /** Tab 键边界循环 */
  private _trapFocus(e: KeyboardEvent): void {
    const focusable = this.$getFocusableElements("all");
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    if (e.shiftKey && active === first) {
      e.preventDefault();
      last?.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first?.focus();
    }
  }

  /** 显示遮罩层 */
  show(): void {
    this.visible = true;
  }

  /** 隐藏遮罩层 */
  hide(): void {
    this.visible = false;
  }

  html(): string {
    return `
      <div class="${this.updateContainerClasslist()}" part="container">
        <div class="${bem.e("mask")}" part="mask"></div>
        <div class="${bem.e("content")}" part="content">
          <slot></slot>
        </div>
      </div>
    `;
  }

  @listen("click", bem.ce("mask"))
  protected _handleMaskClick(_e: Event) {
    if (!this.closeOnClickModal) return;

    this.hide();
  }

  @listen("keydown", "document")
  protected _handleKeyDown(e: KeyboardEvent): void {
    if (!this.visible) return;

    if (e.key === "Tab") {
      this._trapFocus(e);
      return;
    }

    if (!this.closeOnPressEscape || e.key !== "Escape") return;
    e.stopImmediatePropagation();
    e.preventDefault();

    this.hide();
  }

  $mount(): void {
    this.tabIndex = -1;
    this._handleAppendTo();
    this.updateContainerClasslist();
  }

  $beforeUnmount(): void {
    this._transitionAbortController?.abort();
  }
}
