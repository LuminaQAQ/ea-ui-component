import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, property, query, listen } from "@decorator";
import { html } from "@utils/html";
import { Enum } from "@utils/Enum";
import { VARIANT_ICON_MAP } from "@constants/variant";
import stylesheet from "./index.scss?inline";
import "@/components/ea-icon/index";

const TAG_NAME = "ea-notification" as const;
const bem = createBEM(TAG_NAME);

const NOTIFICATION_VARIANT_TYPES = [
  "primary",
  "success",
  "warning",
  "info",
  "error",
] as const;
export type NotificationVariantType = (typeof NOTIFICATION_VARIANT_TYPES)[number];

const PLACEMENT_TYPES = [
  "top-right",
  "top-left",
  "bottom-right",
  "bottom-left",
] as const;
type PlacementType = (typeof PLACEMENT_TYPES)[number];

/**
 * @summary 通知组件，用于系统级通知或轻量级提醒，支持多种类型、自定义位置和自动关闭。
 * @status stable
 * @since 3.0
 *
 * @dependency ea-icon
 *
 * @slot default - 默认插槽，用于自定义正文内容。
 *
 * @event ea-show - 通知显示时触发。
 * @event ea-shown - 通知显示完毕时触发。
 * @event ea-hide - 通知隐藏时触发。
 * @event ea-hidden - 通知隐藏完毕时触发。
 * @event ea-close - 通知关闭时触发。
 *
 * @csspart container - 通知整体根元素。
 * @csspart icon - 类型图标。
 * @csspart content - 内容区域。
 * @csspart header - 标题区域。
 * @csspart title - 标题文本。
 * @csspart close-icon - 关闭按钮。
 * @csspart main - 正文内容区域。
 *
 * @cssproperty --ea-notification-y - 垂直偏移量。
 * @cssproperty --ea-notification-show-x - 水平显示偏移量。
 * @cssproperty --ea-notification-fade-out-x - 水平隐藏偏移量。
 * @cssproperty --ea-notification-padding - 内边距。
 * @cssproperty --ea-notification-border-color - 边框颜色。
 * @cssproperty --ea-notification-border-radius - 圆角。
 * @cssproperty --ea-notification-box-shadow - 阴影。
 * @cssproperty --ea-notification-width - 宽度。
 * @cssproperty --ea-notification-title-font-size - 标题字号。
 * @cssproperty --ea-notification-message-font-size - 正文字号。
 * @cssproperty --ea-notification-title-color - 标题颜色。
 * @cssproperty --ea-notification-message-color - 正文颜色。
 * @cssproperty --ea-notification-icon-size - 图标尺寸。
 * @cssproperty --ea-notification-transition - 过渡动画时长。
 * @cssproperty --ea-notification-gap - 间距。
 * @cssproperty --ea-notification-offset - 通知间距偏移量。
 * @cssproperty --ea-notification-close-icon-color - 关闭图标颜色。
 * @cssproperty --ea-notification-z-index - 层级。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaNotificationElement extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @query(bem.ce("icon"))
  private _notificationIcon!: HTMLElement;

  @query(bem.ce("title"))
  private _title!: HTMLElement;

  @query(bem.ce("close-icon"))
  private _closeIcon!: HTMLElement;

  @query(bem.ce("main"))
  private _main!: HTMLElement;

  private _transitionAbortController?: AbortController;

  @attribute({
    type: Enum(NOTIFICATION_VARIANT_TYPES),
    default: "info",
    observer(this: EaNotificationElement, newVal: NotificationVariantType) {
      this._notificationIcon.setAttribute(
        "name",
        this.icon || VARIANT_ICON_MAP[newVal]
      );
      this.updateContainerClasslist();
    },
  })
  variant: NotificationVariantType = "info";

  @attribute({
    type: String,
    default: "",
    observer(this: EaNotificationElement, newVal: string) {
      this._title.textContent = newVal;
    },
  })
  heading: string = "";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaNotificationElement, newVal: boolean) {
      this._transitionAbortController?.abort();
      this._transitionAbortController = new AbortController();

      if (newVal) {
        this._initPosition();
        this.updateContainerClasslist();
        this.emit("ea-show");

        void this._container.offsetWidth;

        this._container.classList.add(bem.s("is-show"));

        this._container.addEventListener(
          "transitionend",
          () => {
            this.emit("ea-shown");
          },
          { once: true, signal: this._transitionAbortController.signal }
        );
      } else {
        this._handleHide();

        this._container.classList.add(bem.s("before-hide"));
        this.emit("ea-hide");

        this._container.addEventListener(
          "transitionend",
          () => {
            this.updateContainerClasslist();
            this.emit("ea-hidden");
          },
          { once: true, signal: this._transitionAbortController.signal }
        );
      }
    },
  })
  visible: boolean = false;

  @attribute({
    type: String,
    default: "",
    observer(this: EaNotificationElement, newVal: string) {
      if (this.dangerouslyUseHTMLString) {
        this._main.innerHTML = html(newVal);
      } else {
        this._main.textContent = newVal;
      }
    },
  })
  message: string = "";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaNotificationElement, newVal: boolean) {
      this.updateContainerClasslist();

      if (newVal) {
        this._closeIcon.setAttribute("name", this.closeIcon || "xmark");
      }
    },
  })
  showClose: boolean = false;

  @attribute({
    type: String,
    default: "xmark",
    observer(this: EaNotificationElement, newVal: string) {
      if (this.showClose) {
        this._closeIcon.setAttribute("name", newVal);
      }
    },
  })
  closeIcon: string = "xmark";

  @attribute({
    type: Enum(PLACEMENT_TYPES),
    default: "top-right",
    observer(this: EaNotificationElement) {
      this.updateContainerClasslist();
    },
  })
  placement: PlacementType = "top-right";

  @attribute({
    type: Number,
    default: 0,
    observer(this: EaNotificationElement, newVal: number) {
      this._container.style.setProperty("--z-index", String(newVal));
    },
  })
  zIndex: number = 0;

  @attribute({
    type: String,
    default: "",
    observer(this: EaNotificationElement, newVal: string) {
      this._notificationIcon.setAttribute(
        "name",
        newVal || VARIANT_ICON_MAP[this.variant]
      );
      this.updateContainerClasslist();
    },
  })
  icon: string = "";

  @property({
    type: Boolean,
    default: false,
  })
  dangerouslyUseHTMLString: boolean = false;

  updateContainerClasslist(): string {
    const className = bem(
      {
        [this.variant]: true,
        [this.placement]: true,
      },
      {
        visible: this.visible,
        "show-close": this.showClose,
      }
    );

    if (this._container) this._container.className = className;

    return className;
  }

  html(): string {
    return `
      <div class="${this.updateContainerClasslist()}" part="container">
        <ea-icon class="${bem.e("icon")}" name="${VARIANT_ICON_MAP[this.variant]}" part="icon"></ea-icon>
        <div class="${bem.e("content")}" part="content">
          <header class="${bem.e("header")}" part="header">
            <h2 class="${bem.e("title")}" part="title"> </h2>
            <ea-icon class="${bem.e("close-icon")}" name="xmark" part="close-icon"></ea-icon>
          </header>
          <main class="${bem.e("main")}" part="main"><slot></slot> </main>
        </div>
      </div>
    `;
  }

  close(): void {
    this.visible = false;
    this.emit("ea-close");
  }

  /** 初始化通知位置，计算堆叠偏移 */
  private _initPosition(): void {
    const eaNotificationList = document.querySelectorAll<HTMLElement>(
      `ea-notification[placement="${this.placement}"]`
    );

    if (eaNotificationList.length <= 1) return;

    const lastEl = eaNotificationList[eaNotificationList.length - 2];
    const lastPosition = lastEl.style.getPropertyValue("--ea-notification-y");

    const lastEaNotification = lastEl.shadowRoot?.querySelector(
      `.${bem.b()}`
    ) as HTMLElement;
    if (!lastEaNotification) return;

    const lastEaNotificationRect = lastEaNotification.getBoundingClientRect();

    this.style.setProperty(
      "--ea-notification-y",
      `${Number(lastPosition.replace("px", "")) + lastEaNotificationRect.height + 8}px`
    );
  }

  /** 隐藏时调整后续通知位置 */
  private _handleHide(): void {
    const eaNotificationList = [
      ...document.querySelectorAll<HTMLElement>(
        `ea-notification[placement="${this.placement}"]`
      ),
    ];
    const thisIndex = eaNotificationList.findIndex(el => el === this);
    const els = eaNotificationList.slice(thisIndex + 1);
    const height = this._container.getBoundingClientRect().height;

    els.forEach(notification => {
      const posi = Number(
        notification.style
          .getPropertyValue("--ea-notification-y")
          .replace("px", "")
      );
      notification.style.setProperty(
        "--ea-notification-y",
        `${posi - height - 8}px`
      );
    });
  }

  @listen("click", bem.ce("close-icon"))
  private _handleCloseIconClick(): void {
    if (!this.showClose) return;
    this.close();
  }

  $mount(): void {
    this.updateContainerClasslist();
  }

  $beforeUnmount(): void {
    this._transitionAbortController?.abort();
  }
}
