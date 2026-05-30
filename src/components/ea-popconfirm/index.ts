import { EaPopper } from "@common/ea-popper/index";
import { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query, listen } from "@decorator";
import { Enum } from "@utils/Enum";
import { EaPopconfirmConfirmEvent } from "./events/EaPopconfirmConfirmEvent";
import { EaPopconfirmCancelEvent } from "./events/EaPopconfirmCancelEvent";
import "@/components/ea-icon/index";
import "@/components/ea-button/index";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-popconfirm" as const;
const bem = createBEM(TAG_NAME);
const popperBem = createBEM("ea-popper");

const BUTTON_TYPE_OPTIONS = [
  "normal",
  "primary",
  "success",
  "warning",
  "danger",
] as const;

type ButtonType = (typeof BUTTON_TYPE_OPTIONS)[number];

/**
 * @summary 气泡确认框组件，点击元素弹出确认气泡，支持自定义图标、按钮和位置。
 * @status stable
 * @since 3.0
 *
 * @dependency ea-icon
 * @dependency ea-button
 *
 * @slot reference - 触发 Popconfirm 显示的 HTML 元素插槽。
 * @slot actions - 页脚内容插槽，可自定义操作按钮。
 *
 * @event ea-confirm - 点击确认按钮时触发。
 * @event ea-cancel - 点击取消按钮时触发。
 *
 * @csspart container - Popconfirm 外层容器。
 * @csspart reference - 触发 Popconfirm 显示的 HTML 元素的父容器。
 * @csspart original - Popconfirm 弹出内容容器。
 * @csspart title - Popconfirm 标题容器。
 * @csspart icon - Popconfirm 的图标。
 * @csspart title-content - Popconfirm 内容容器。
 * @csspart footer - Popconfirm 底部容器。
 * @csspart cancel-button - Popconfirm 取消按钮。
 * @csspart confirm-button - Popconfirm 确认按钮。
 *
 * @cssproperty --ea-popconfirm-title-icon-color - 标题图标颜色。
 * @cssproperty --ea-popconfirm-title-color - 标题文字颜色。
 * @cssproperty --ea-popconfirm-title-font-size - 标题文字大小。
 * @cssproperty --ea-popconfirm-box-shadow - 容器阴影。
 * @cssproperty --ea-popconfirm-border-radius - 容器圆角。
 * @cssproperty --ea-popconfirm-z-index - 容器层级。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaPopconfirm extends EaPopper {
  @query(`.${bem.e("title")} ea-icon`)
  private _titleIcon!: HTMLElement;

  @query(`.${bem.e("title-content")}`)
  private _titleContent!: HTMLElement;

  @query(`.${bem.e("cancel")}`)
  private _cancelButton!: HTMLElement;

  @query(`.${bem.e("confirm")}`)
  private _confirmButton!: HTMLElement;

  private _globalCloseAbortController?: AbortController;

  @attribute({
    type: String,
    default: "",
    observer(this: EaPopconfirm, newVal: string) {
      if (this._titleContent) {
        this._titleContent.innerText = newVal;
      }
    },
  })
  heading: string = "";

  @attribute({
    type: String,
    default: "circle-question",
    observer(this: EaPopconfirm, newVal: string) {
      if (this._titleIcon) {
        this._titleIcon.setAttribute("name", newVal);
      }
    },
  })
  icon: string = "circle-question";

  @attribute({
    type: String,
    default: "rgb(255, 153, 0)",
    observer(this: EaPopconfirm, newVal: string) {
      if (!CSS.supports("color", newVal))
        return console.warn(
          `[EaPopconfirm] The color value ${newVal} is not supported.`
        );

      this.style.setProperty("--ea-popconfirm-title-icon-color", newVal);
    },
  })
  iconColor: string = "rgb(255, 153, 0)";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaPopconfirm) {
      this.updateContainerClasslist();
    },
  })
  hideIcon: boolean = false;

  @attribute({
    type: String,
    default: "确定",
    observer(this: EaPopconfirm, newVal: string) {
      if (this._confirmButton) {
        this._confirmButton.textContent = newVal;
      }
    },
  })
  confirmButtonText: string = "确定";

  @attribute({
    type: String,
    default: "取消",
    observer(this: EaPopconfirm, newVal: string) {
      if (this._cancelButton) {
        this._cancelButton.textContent = newVal;
      }
    },
  })
  cancelButtonText: string = "取消";

  @attribute({
    type: Enum(BUTTON_TYPE_OPTIONS),
    default: "primary",
    observer(this: EaPopconfirm, newVal: string) {
      if (this._confirmButton) {
        this._confirmButton.setAttribute("variant", newVal);
      }
    },
  })
  confirmButtonType: ButtonType = "primary";

  @attribute({
    type: Enum(BUTTON_TYPE_OPTIONS),
    default: "normal",
    observer(this: EaPopconfirm, newVal: string) {
      if (this._cancelButton) {
        this._cancelButton.setAttribute("variant", newVal);
      }
    },
  })
  cancelButtonType: ButtonType = "normal";

  updateContainerClasslist(): string {
    const className = super.updateContainerClasslist();

    if (this._container) {
      this._container.classList.toggle("is-icon-hidden", this.hideIcon);
    }

    return this._container?.className || className;
  }

  html(): string {
    return `
      <div class="${this.updateContainerClasslist()}" part="container" tabindex="-1">
        <div class="${popperBem.e("reference")}" part="reference" tabindex="-1">
          <div class="${popperBem.e("original")}" part="original" tabindex="0">
            <section class="${bem.e("title")}" part="title">
              <ea-icon name="${this.icon}" part="icon"></ea-icon>
              <span class="${bem.e("title-content")}" part="title-content">${this.heading}</span>
            </section>
            <footer class="${bem.e("footer")}" part="footer">
              <slot name="actions">
                <ea-button variant="${this.cancelButtonType}" class="${bem.e("cancel")}" size="small" part="cancel-button" text>${this.cancelButtonText}</ea-button>
                <ea-button variant="${this.confirmButtonType}" class="${bem.e("confirm")}" part="confirm-button" size="small">${this.confirmButtonText}</ea-button>
              </slot>
            </footer>
          </div>
          <slot name="reference"></slot>
        </div>
      </div>
    `;
  }

  /** 取消按钮点击处理 */
  @listen("click", `.${bem.e("cancel")}`)
  private _handleCancelClick(): void {
    this.dispatchEvent(new EaPopconfirmCancelEvent());
    this.hide();
  }

  /** 确认按钮点击处理 */
  @listen("click", `.${bem.e("confirm")}`)
  private _handleConfirmClick(): void {
    this.dispatchEvent(new EaPopconfirmConfirmEvent());
    this.hide();
  }

  /** 参考元素点击处理 */
  @listen("click", 'slot[name="reference"]')
  private _handleReferenceClick(): void {
    this.open();
  }

  /** 显示 Popconfirm 并注册全局关闭监听 */
  open(): void {
    const onClose = (e: MouseEvent) => {
      const isThis = this.contains(e.target as Node);

      if (!isThis) {
        this._globalCloseAbortController?.abort();
        this.hide();
      }
    };

    this.show();

    this._globalCloseAbortController?.abort();
    this._globalCloseAbortController = new AbortController();

    window.addEventListener("click", onClose, {
      signal: this._globalCloseAbortController.signal,
    });
  }

  /** 隐藏 Popconfirm 并清理全局关闭监听 */
  close(): void {
    this.hide();
    this._globalCloseAbortController?.abort();
  }

  $mount(): void {
    super.$mount();
  }

  $beforeUnmount(): void {
    super.$beforeUnmount();
    this._globalCloseAbortController?.abort();
  }
}
