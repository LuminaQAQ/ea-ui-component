import { EaOverlay } from "@/common/ea-overlay";
import { EaOverlayClosedEvent } from "@/common/ea-overlay/events/EaOverlayClosedEvent";
import { CustomElement, attribute, query, listen } from "@decorator";
import { createBEM } from "@utils/bem";
import stylesheet from "./index.scss?inline";
import "@/components/ea-icon/index";

const TAG_NAME = "ea-dialog" as const;
const bem = createBEM(TAG_NAME);

/**
 * @summary 对话框组件，用于弹出交互层，显示重要信息或要求用户确认/输入，支持拖拽、全屏、居中等模式。
 * @status stable
 * @since 3.0
 *
 * @dependency ea-icon
 *
 * @slot default - 对话框主体内容。
 * @slot header - 自定义头部内容。
 * @slot footer - 自定义底部内容。
 *
 * @event ea-open - 对话框打开时触发。
 * @event ea-opened - 对话框打开动画结束时触发。
 * @event ea-close - 对话框关闭时触发。
 * @event ea-closed - 对话框关闭动画结束时触发。
 *
 * @csspart container - 对话框容器元素。
 * @csspart header - 头部元素。
 * @csspart heading - 标题文本元素。
 * @csspart close-icon - 关闭图标元素。
 * @csspart content - 主体内容元素。
 * @csspart footer - 底部元素。
 *
 * @cssproperty --ea-dialog-padding - 对话框内边距。
 * @cssproperty --ea-dialog-padding-primary - 对话框次级内边距。
 * @cssproperty --ea-dialog-box-shadow - 对话框阴影。
 * @cssproperty --ea-dialog-border-radius - 对话框圆角。
 * @cssproperty --ea-dialog-heading-font-size - 标题字号。
 * @cssproperty --ea-dialog-close-icon-size - 关闭图标尺寸。
 * @cssproperty --ea-dialog-content-font-size - 内容字号。
 * @cssproperty --ea-dialog-heading-color - 标题颜色。
 * @cssproperty --ea-dialog-close-icon-color - 关闭图标颜色。
 * @cssproperty --ea-dialog-content-color - 内容颜色。
 * @cssproperty --ea-dialog-bg-color - 对话框背景色。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaDialog extends EaOverlay {
  private static _idCounter = 0;

  // ==================== DOM 元素引用 ====================

  @query(bem.ce("header"))
  private _header!: HTMLElement;

  @query(bem.ce("heading"))
  private _heading!: HTMLElement;

  @query(bem.ce("close-icon"))
  private _closeIcon!: HTMLElement;

  @query(bem.ce("content"))
  private _content!: HTMLElement;

  // ==================== 属性定义 ====================

  @attribute({
    type: String,
    default: "",
    observer(this: EaDialog, newVal: string) {
      if (this._heading) this._heading.textContent = newVal;
      this._updateAriaLabelledBy();
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
    a11y: {
      ariaAttr: "inert",
      target: ".ea-dialog__close-icon",
      map: v => v ? null : "",
    },
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

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaDialog) {
      this._updateRole();
    },
  })
  alertdialog: boolean = false;

  @attribute({
    type: String,
    default: "",
    observer(this: EaDialog) {
      this._updateAriaDescribedBy();
    },
  })
  description: string = "";

  // ==================== 方法 ====================

  html(): string {
    const tpl = document.createElement("template");
    tpl.innerHTML = super.html();

    const contentContainer = tpl.content.querySelector(".ea-overlay__content")!;

    contentContainer.innerHTML = `
      <div class='${bem()}' part='container'>
        <header class='${bem.e("header")}' part='header'>
          <slot name="header">
            <span class='${bem.e("heading")}' part='heading'></span>
            <ea-icon class='${bem.e("close-icon")}' name='xmark' part='close-icon' tabindex='0' role='button' aria-label='Close'></ea-icon>
          </slot>
        </header>
        <main class='${bem.e("content")}' part='content'>
          <slot></slot>
        </main>
        <footer class='${bem.e("footer")}' part='footer'>
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

  // ==================== 事件处理 ====================

  /**
   * 处理拖拽开始
   */
  @listen("mousedown", bem.ce("header"))
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

  /**
   * 处理关闭图标点击事件
   */
  @listen("click", bem.ce("close-icon"))
  private _handleCloseIconClick(): void {
    if (!this.showClose) return;
    this.visible = false;
  }

  // ==================== 生命周期 ====================

  /** 根据 alertdialog 属性更新 role */
  private _updateRole(): void {
    const role = this.alertdialog ? "alertdialog" : "dialog";
    try {
      this.setAttribute("role", role);
    } catch {
      this.role = role;
    }
  }

  /** 更新 aria-labelledby 指向标题元素 */
  private _updateAriaLabelledBy(): void {
    if (this._heading && this.heading) {
      if (!this._heading.id) {
        this._heading.id = `ea-dialog-heading-${EaDialog._idCounter++}`;
      }
      this.setAttribute("aria-labelledby", this._heading.id);
    } else if (this.heading) {
      this.setAttribute("aria-label", this.heading);
      this.removeAttribute("aria-labelledby");
    } else {
      this.removeAttribute("aria-label");
      this.removeAttribute("aria-labelledby");
    }
  }

  /** 更新 aria-describedby 指向描述内容 */
  private _updateAriaDescribedBy(): void {
    if (this.description && this._content) {
      if (!this._content.id) {
        this._content.id = `ea-dialog-desc-${EaDialog._idCounter++}`;
      }
      this.setAttribute("aria-describedby", this._content.id);
    } else {
      this.removeAttribute("aria-describedby");
    }
  }

  $mount(): void {
    super.$mount?.();

    this._updateRole();

    this.setAttribute("aria-modal", "true");

    this.updateContainerClasslist();
  }

  $mounted(): void {
    this._updateAriaLabelledBy();
    this._updateAriaDescribedBy();
  }

  @listen("ea-closed")
  private _handleClosed(e: EaOverlayClosedEvent): void {
    if (e.target !== this) return;
    this.hide();
  }
}
