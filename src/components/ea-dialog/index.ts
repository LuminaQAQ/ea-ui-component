import { EaOverlay } from "@/common/ea-overlay";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import { listen } from "@decorator/listen";
import { createBEM } from "@utils/bem";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-dialog" as const;
const bem = createBEM(TAG_NAME);

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaDialog extends EaOverlay {
  // ==================== DOM 元素引用 ====================

  @query(".ea-overlay")
  private _container!: HTMLElement;

  @query(".ea-overlay__content")
  private _overlayContent!: HTMLElement;

  @query(".ea-dialog-main__header")
  private _header!: HTMLElement;

  @query(".ea-dialog-main__heading")
  private _heading!: HTMLElement;

  @query(".ea-dialog-main__close-icon")
  private _closeIcon!: HTMLElement;

  // ==================== 属性定义 ====================

  @attribute({
    type: String,
    default: "",
    observer(this: EaDialog, newVal: string) {
      if (this._heading) this._heading.textContent = newVal;
    },
  })
  heading: string = "";

  @attribute({
    type: String,
    default: "50%",
    observer(this: EaDialog, newVal: string) {
      this.style.setProperty("--ea-overlay-content-width", newVal);
    },
  })
  width: string = "50%";

  @attribute({
    type: String,
    default: "50%",
    observer(this: EaDialog, newVal: string) {
      this.style.setProperty("--ea-overlay-content-top", newVal);
    },
  })
  top: string = "50%";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaDialog) {
      this.updateContainerClasslist();
    },
  })
  center: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaDialog) {
      this.updateContainerClasslist();
    },
  })
  fullscreen: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
  })
  appendToBody: boolean = false;

  @attribute({
    type: Boolean,
    default: true,
    observer(this: EaDialog) {
      this.updateContainerClasslist();
    },
  })
  showClose: boolean = true;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaDialog) {
      this.updateContainerClasslist();
    },
  })
  modalPentrable: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaDialog) {
      this.updateContainerClasslist();
    },
  })
  movable: boolean = false;

  // ==================== 方法 ====================

  html(): string {
    const tpl = document.createElement("template");
    tpl.innerHTML = super.html();

    const contentContainer = tpl.content.querySelector(".ea-overlay__content")!;

    contentContainer.innerHTML = `
      <div class='ea-dialog-main' part='container'>
        <header class='ea-dialog-main__header' part='header'>
          <slot name="header">
            <span class='ea-dialog-main__heading' part='heading'></span>
            <ea-icon class='ea-dialog-main__close-icon' name='xmark' part='close-icon'></ea-icon>          
          </slot>
        </header>
        <main class='ea-dialog-main__content' part='content'>
            <slot></slot>
        </main>
        <footer class='ea-dialog-main__footer' part='footer'>
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
      {
        center: this.center,
        draggable: this.movable,
        fullscreen: this.fullscreen,
      },
      {
        modal: this.modalPentrable,
        "modal-penetrable": this.modalPentrable,
        "close-hidden": !this.showClose,
      }
    );

    const parentClassName = super.updateContainerClasslist();

    const fullClassName = `${parentClassName} ${className}`.trim();

    if (this._container) this._container.className = fullClassName;

    return fullClassName;
  }

  /**
   * 重置对话框位置
   */
  resetPosition(): void {
    this._overlayContent.style.left = "";
    this._overlayContent.style.top = "";
    this.style.removeProperty("--ea-overlay-content-left");
    this.style.removeProperty("--ea-overlay-content-top");
  }

  /**
   * 初始化拖拽事件
   */
  @listen("mousedown", ".ea-dialog-main__header")
  private _handleDragStart(mousedownEvent: MouseEvent): void {
    if (!this.movable || this.fullscreen) return;
    if (!this._header.contains(mousedownEvent.target as Node)) return;
    if (this._closeIcon.contains(mousedownEvent.target as Node)) return;

    const controller = new AbortController();

    const rect = this._overlayContent.getBoundingClientRect();
    const offsetX = mousedownEvent.clientX - rect.left;
    const offsetY = mousedownEvent.clientY - rect.top;

    const onMousemove = (e: MouseEvent) => {
      this._overlayContent.style.left = e.clientX - offsetX + "px";
      this._overlayContent.style.top = e.clientY - offsetY + "px";
    };

    const onMouseup = () => {
      controller.abort();
    };

    window.addEventListener("mousemove", onMousemove, {
      signal: controller.signal,
    });
    window.addEventListener("mouseup", onMouseup, {
      signal: controller.signal,
    });
  }

  // ==================== 事件处理 ====================

  /**
   * 处理关闭图标点击事件
   */
  @listen("click", ".ea-dialog-main__close-icon")
  private _handleCloseIconClick(): void {
    if (!this.showClose) return;
    this.visible = false;
  }

  /**
   * 处理关闭事件
   */
  @listen("closed")
  private _handleClosed(e: CustomEvent): void {
    if (e.target !== this) return;
    this.hide();
  }

  // ==================== 生命周期 ====================

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
