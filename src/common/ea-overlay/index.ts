import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import { listen } from "@decorator/listen";
import { property } from "@decorator/property";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-overlay" as const;
const bem = createBEM(TAG_NAME);

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaOverlay extends EaBase {
  // ==================== DOM 元素引用 ====================

  @query(".ea-overlay")
  private _container!: HTMLElement;

  @query(".ea-overlay__mask")
  private _overlayMask!: HTMLElement;

  @query(".ea-overlay__content")
  private _overlayContent!: HTMLElement;

  private _transitionAbortController?: AbortController;
  private _closingByBeforeClose: boolean = false;
  private _inBeforeClose: boolean = false;

  // ==================== 属性定义 ====================

  @attribute({
    type: Boolean,
    default: false,
    async observer(this: EaOverlay, newVal: boolean) {
      if (this._inBeforeClose) return;

      this._transitionAbortController?.abort();
      this._transitionAbortController = new AbortController();

      if (newVal) {
        this._handleOpenTransition();
        this._handleFocus();
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
  })
  appendToBody: boolean = false;

  // CSS 变量属性
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

  @attribute({
    type: String,
    default: "",
    observer(this: EaOverlay, newVal: string) {
      this.style.setProperty("--ea-overlay-content-left", newVal);
    },
  })
  contentLeft: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaOverlay, newVal: string) {
      this.style.setProperty("--ea-overlay-content-top", newVal);
    },
  })
  contentTop: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaOverlay, newVal: string) {
      this.style.setProperty("--ea-overlay-content-translate-x", newVal);
    },
  })
  contentTranslateX: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaOverlay, newVal: string) {
      this.style.setProperty("--ea-overlay-content-translate-y", newVal);
    },
  })
  contentTranslateY: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaOverlay, newVal: string) {
      this.style.setProperty("--ea-overlay-content-transform", newVal);
    },
  })
  contentTransform: string = "";

  @property({
    type: Function,
    default: null,
  })
  beforeClose: ((done: () => void) => void) | null = null;

  // ==================== 方法 ====================

  /**
   * 更新容器类名
   */
  updateContainerClasslist(): string {
    const className = bem({ open: this.visible }, { modal: this.modal });

    if (this._container) this._container.className = className;

    return className;
  }

  /**
   * 处理打开过渡
   */
  private _handleOpenTransition(): void {
    this.updateContainerClasslist();
    this.emit("open");
    this._handleFocus();

    requestAnimationFrame(() => {
      this._container.classList.add("ea-overlay--is-show");

      this._container.addEventListener(
        "transitionend",
        () => {
          this.emit("opened");
        },
        { signal: this._transitionAbortController!.signal, once: true }
      );
    });
  }

  /**
   * 处理关闭请求
   */
  private _handleCloseRequest(): void {
    if (this._closingByBeforeClose) {
      this._closingByBeforeClose = false;
      this._handleCloseTransition();
    } else if (this.beforeClose && typeof this.beforeClose === "function") {
      this._inBeforeClose = true;
      let doneCalled = false;

      this.beforeClose(() => {
        doneCalled = true;
        this._closingByBeforeClose = true;
        this.visible = false;

        this._handleCloseTransition();
      });

      if (!doneCalled) {
        this.visible = true;
      }

      this._inBeforeClose = false;
    } else {
      this._handleCloseTransition();
    }
  }

  /**
   * 处理关闭过渡
   */
  private _handleCloseTransition(): void {
    this._container.classList.add("ea-overlay--before-close");
    this.emit("close");

    this._container.addEventListener(
      "transitionend",
      () => {
        this.updateContainerClasslist();
        this.emit("closed");
      },
      { signal: this._transitionAbortController!.signal, once: true }
    );
  }

  /**
   * 处理聚焦
   */
  private _handleFocus(): void {
    (document.activeElement as HTMLElement)?.blur();

    requestAnimationFrame(() => {
      this.focus();
    });
  }

  /**
   * 显示遮罩层
   */
  show(): void {
    this.visible = true;
  }

  /**
   * 隐藏遮罩层
   */
  hide(): void {
    this.visible = false;
  }

  /**
   * 渲染模板
   */
  html(): string {
    return `
      <div class="${this.updateContainerClasslist()}" part="container">
        <div class="ea-overlay__mask" part="mask"></div>
        <div class="ea-overlay__content" part="content">
          <slot></slot>
        </div>
      </div>
    `;
  }

  // ==================== 事件处理 ====================

  @listen("click", ".ea-overlay__mask")
  private _handleMaskClick(e: Event) {
    if (!this.closeOnClickModal) return;

    const isContent =
      [...this.children].find(
        child => child === e.target || child.contains(e.target as Node)
      ) ||
      this._overlayContent === e.target ||
      this._overlayContent.contains(e.target as Node);
    if (isContent) return;

    this.hide();
  }

  @listen("keydown", "document")
  private _handleKeyDown(e: KeyboardEvent) {
    if (!this.visible || !this.closeOnPressEscape || e.key !== "Escape") return;
    e.stopImmediatePropagation();
    e.preventDefault();

    this.hide();
  }

  // ==================== 生命周期 ====================

  $mount(): void {
    this.updateContainerClasslist();
  }

  $beforeUnmount(): void {
    this._transitionAbortController?.abort();
  }
}
