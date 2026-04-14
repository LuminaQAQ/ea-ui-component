import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import { listen } from "@decorator/listen";
import { property } from "@decorator/property";
import { timeout } from "@utils/timeout";
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

  // ==================== 属性定义 ====================

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaOverlay, newVal: boolean) {
      if (newVal) {
        this._container.className = this.updateContainerClasslist();
        this.emit("open");

        requestAnimationFrame(() => {
          this._container.classList.add("ea-overlay--is-show");
          this._container.addEventListener(
            "transitionend",
            () => {
              this.emit("opened");
            },
            { once: true }
          );
        });
      } else {
        this._container.classList.add("ea-overlay--before-close");
        this.emit("close");

        this._container.addEventListener(
          "transitionend",
          () => {
            this._container.className = this.updateContainerClasslist();
            this.emit("closed");
          },
          { once: true }
        );
      }
    },
  })
  status: boolean = false;

  @attribute({
    type: Boolean,
    default: true,
    observer(this: EaOverlay) {
      this._container.className = this.updateContainerClasslist();
    },
  })
  modal: boolean = true;

  @attribute({
    type: Boolean,
    default: false,
  })
  closeOnClickModal: boolean = false;

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

  // ==================== 属性（非 HTML 属性）====================

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
    const className = bem(
      { open: this.status },
      { modal: !this.modal }
    );
    return className;
  }

  /**
   * 显示遮罩层
   */
  show(): void {
    this.status = true;
  }

  /**
   * 隐藏遮罩层
   */
  hide(): void {
    this.status = false;
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

    // 检查是否点击的是遮罩层本身，而不是内容区域
    const isContent =
      [...this.children].find(
        (child) => child === e.target || child.contains(e.target as Node)
      ) ||
      this._overlayContent === e.target ||
      this._overlayContent.contains(e.target as Node);
    if (isContent) return;

    if (this.beforeClose) {
      this.beforeClose(() => (this.status = false));
    } else {
      this.status = false;
    }
  }

  // ==================== 生命周期 ====================

  $mount(): void {
    this.updateContainerClasslist();

    document.activeElement?.blur();
    timeout(() => {
      this.focus();
    }, 0);
  }

  $beforeUnmount(): void {
    this._transitionAbortController?.abort();
  }
}
