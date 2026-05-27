import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import { listen } from "@decorator/listen";
import { property } from "@decorator/property";
import { html } from "@utils/html";
import stylesheet from "./index.scss?inline";
import { Enum } from "@/utils/Enum";
import "@/components/ea-icon/index";

const TAG_NAME = "ea-message" as const;
const bem = createBEM(TAG_NAME);

const MESSAGE_TYPES = [
  "primary",
  "success",
  "warning",
  "info",
  "error",
] as const;
type MessageType = (typeof MESSAGE_TYPES)[number];

const ICON_TYPES: Record<MessageType, string> = {
  success: "circle-check",
  error: "circle-xmark",
  warning: "triangle-exclamation",
  info: "circle-info",
  primary: "circle-info",
};

const PLACEMENT_TYPES = [
  "top",
  "top-left",
  "top-right",
  "bottom",
  "bottom-left",
  "bottom-right",
  "middle",
] as const;
type PlacementType = (typeof PLACEMENT_TYPES)[number];

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaMessageElement extends EaBase {
  // ==================== DOM 元素引用 ====================

  @query(".ea-message")
  private _container!: HTMLElement;

  @query(".ea-message__icon")
  private _messageIcon!: HTMLElement;

  @query(".ea-message__content")
  private _messageContent!: HTMLElement;

  @query(".ea-message__icon-close")
  private _messageCloseIcon!: HTMLElement;

  private _transitionAbortController?: AbortController;
  private _closeAbortController?: AbortController;

  // ==================== 属性定义 ====================

  @attribute({
    type: Enum(MESSAGE_TYPES),
    default: "info",
    observer(this: EaMessageElement, newVal: MessageType) {
      this._messageIcon.setAttribute("name", this.icon || ICON_TYPES[newVal]);
      this.updateContainerClasslist();
    },
  })
  type: MessageType = "info";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaMessageElement, newVal: boolean) {
      this._transitionAbortController?.abort();
      this._transitionAbortController = new AbortController();

      if (newVal) {
        this._initPosition();
        this.updateContainerClasslist();
        this.emit("show");

        void this._container.offsetWidth;

        this._container.classList.add("ea-message--is-show");

        this._container.addEventListener(
          "transitionend",
          () => {
            this.emit("shown");
          },
          { once: true, signal: this._transitionAbortController.signal }
        );
      } else {
        this._handleHide();

        this._container.classList.add("ea-message--before-hide");
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
    observer(this: EaMessageElement, newVal: string) {
      if (this.dangerouslyUseHTMLString) {
        this._messageContent.innerHTML = html(newVal);
      } else {
        this._messageContent.textContent = newVal;
      }
    },
  })
  message: string = "";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaMessageElement, newVal: boolean) {
      this.updateContainerClasslist();

      this._closeAbortController?.abort();

      if (newVal) {
        this._closeAbortController = new AbortController();
        this._messageCloseIcon.addEventListener("click", this._onCloseClick, {
          signal: this._closeAbortController.signal,
        });
      }
    },
  })
  showClose: boolean = false;

  @attribute({
    type: Enum(PLACEMENT_TYPES),
    default: "top",
    observer(this: EaMessageElement) {
      this.updateContainerClasslist();
    },
  })
  placement: PlacementType = "top";

  @attribute({
    type: String,
    default: "",
    observer(this: EaMessageElement, newVal: string) {
      this._messageIcon.setAttribute("name", newVal || ICON_TYPES[this.type]);
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

  /**
   * 更新容器类名
   */
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

  /**
   * 渲染模板
   */
  html(): string {
    return `
      <div class="${this.updateContainerClasslist()}" part="container">
        <ea-icon class="${bem.e("icon")}" name="${ICON_TYPES[this.type]}" part="icon"></ea-icon>
        <div class="${bem.e("content")}" part="content-wrap"></div>
        <ea-icon class="${bem.e("icon-close")}" name="xmark" part="close-icon"></ea-icon>
      </div>
    `;
  }

  /**
   * 关闭消息（公共方法）
   */
  close(): void {
    this.visible = false;
    this.emit("close");
  }

  /**
   * 关闭按钮点击事件处理
   */
  private _onCloseClick = () => {
    this.close();
  };

  /**
   * 初始化消息位置
   */
  private _initPosition(): void {
    const eaMessageList = document.querySelectorAll<HTMLElement>(
      `ea-message[placement="${this.placement}"]`
    );

    if (eaMessageList.length <= 1) return;

    const lastEl = eaMessageList[eaMessageList.length - 2];
    const lastPosition = lastEl.style.getPropertyValue("--ea-message-y");

    const lastEaMessage = lastEl.shadowRoot?.querySelector(
      ".ea-message"
    ) as HTMLElement;
    if (!lastEaMessage) return;

    const lastEaMessageRect = lastEaMessage.getBoundingClientRect();

    this.style.setProperty(
      "--ea-message-y",
      `${Number(lastPosition.replace("px", "")) + lastEaMessageRect.height + 8}px`
    );
  }

  /**
   * 隐藏消息
   */
  private _handleHide(): void {
    const eaMessageList = [
      ...document.querySelectorAll<HTMLElement>(
        `ea-message[placement="${this.placement}"]`
      ),
    ];
    const thisIndex = eaMessageList.findIndex(el => el === this);
    const els = eaMessageList.slice(thisIndex + 1);
    const height = this._container.getBoundingClientRect().height;

    els.forEach(message => {
      const posi = Number(
        message.style.getPropertyValue("--ea-message-y").replace("px", "")
      );
      message.style.setProperty("--ea-message-y", `${posi - height - 8}px`);
    });
  }

  // ==================== 事件处理 ====================

  @listen("click", ".ea-message__icon-close")
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
    this._closeAbortController?.abort();
  }
}
