import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import { listen } from "@decorator/listen";
import { property } from "@decorator/property";
import { html } from "@utils/html";
import stylesheet from "./index.scss?inline";
import { Enum } from "@/utils/Enum";

const TAG_NAME = "ea-notification" as const;
const bem = createBEM(TAG_NAME);

const NOTIFICATION_TYPES = [
  "primary",
  "success",
  "warning",
  "info",
  "error",
] as const;
type NotificationType = (typeof NOTIFICATION_TYPES)[number];

const ICON_TYPES: Record<NotificationType, string> = {
  success: "circle-check",
  error: "circle-xmark",
  warning: "triangle-exclamation",
  info: "circle-info",
  primary: "circle-info",
};

const PLACEMENT_TYPES = [
  "top-right",
  "top-left",
  "bottom-right",
  "bottom-left",
] as const;
type PlacementType = (typeof PLACEMENT_TYPES)[number];

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaNotificationElement extends EaBase {
  // ==================== DOM 元素引用 ====================

  @query(".ea-notification")
  private _container!: HTMLElement;

  @query(".ea-notification__icon")
  private _notificationIcon!: HTMLElement;

  @query(".ea-notification__title")
  private _title!: HTMLElement;

  @query(".ea-notification__close-icon")
  private _closeIcon!: HTMLElement;

  @query(".ea-notification__main")
  private _main!: HTMLElement;

  private _transitionAbortController?: AbortController;

  // ==================== 属性定义 ====================

  @attribute({
    type: Enum(NOTIFICATION_TYPES),
    default: "info",
    observer(this: EaNotificationElement, newVal: NotificationType) {
      this._notificationIcon.setAttribute(
        "name",
        this.icon || ICON_TYPES[newVal]
      );
      this.updateContainerClasslist();
    },
  })
  type: NotificationType = "info";

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
        this.emit("show");

        void this._container.offsetWidth;

        this._container.classList.add("ea-notification--is-show");

        this._container.addEventListener(
          "transitionend",
          () => {
            this.emit("shown");
          },
          { once: true, signal: this._transitionAbortController.signal }
        );
      } else {
        this._handleHide();

        this._container.classList.add("ea-notification--before-hide");
        this.emit("hide");

        this._container.addEventListener(
          "transitionend",
          () => {
            this.updateContainerClasslist();
            this.emit("hidden");
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
        newVal || ICON_TYPES[this.type]
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

  // ==================== 方法 ====================

  updateContainerClasslist(): string {
    const className = bem(
      {
        [this.type]: true,
        [this.placement]: true,
        visible: this.visible,
        "show-close": this.showClose,
      },
      {}
    );

    if (this._container) this._container.className = className;

    return className;
  }

  html(): string {
    return `
      <div class="${this.updateContainerClasslist()}" part="container">
        <ea-icon class="${bem.e("icon")}" name="${ICON_TYPES[this.type]}" part="icon"></ea-icon>
        <div class="${bem.e("content")}">
          <header class="${bem.e("header")}" part="header">
            <h2 class="${bem.e("title")}" part="title"> </h2>
            <ea-icon class="${bem.e("close-icon")}" name="xmark" part="close-icon"></ea-icon>
          </header>
          <main class="${bem.e("main")}" part="main"> </main>
        </div>
      </div>
    `;
  }

  close(): void {
    this.visible = false;
    this.emit("close");
  }

  private _initPosition(): void {
    const eaNotificationList = document.querySelectorAll<HTMLElement>(
      `ea-notification[placement="${this.placement}"]`
    );

    if (eaNotificationList.length <= 1) return;

    const lastEl = eaNotificationList[eaNotificationList.length - 2];
    const lastPosition = lastEl.style.getPropertyValue("--ea-notification-y");

    const lastEaNotification = lastEl.shadowRoot?.querySelector(
      ".ea-notification"
    ) as HTMLElement;
    if (!lastEaNotification) return;

    const lastEaNotificationRect = lastEaNotification.getBoundingClientRect();

    this.style.setProperty(
      "--ea-notification-y",
      `${Number(lastPosition.replace("px", "")) + lastEaNotificationRect.height + 8}px`
    );
  }

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

  // ==================== 事件处理 ====================

  @listen("click", ".ea-notification__close-icon")
  private _handleCloseIconClick(): void {
    if (!this.showClose) return;
    this.close();
  }

  // ==================== 生命周期 ====================

  $mount(): void {
    this.updateContainerClasslist();
  }

  $beforeUnmount(): void {
    this._transitionAbortController?.abort();
  }
}
