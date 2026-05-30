import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, property, query, listen } from "@decorator";
import { html } from "@utils/html";
import { Enum } from "@utils/Enum";
import {
  VARIANT_TYPES,
  VARIANT_DEFAULT,
  VARIANT_ICON_MAP,
  type VariantType,
} from "@constants/variant";
import { EaMessageCloseEvent } from "../events/EaMessageCloseEvent";
import stylesheet from "./index.scss?inline";
import "@/components/ea-icon/index";

const TAG_NAME = "ea-message" as const;
const bem = createBEM(TAG_NAME);

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

/**
 * @summary 消息提示组件，常用于主动操作后的反馈提示，支持多种状态和可关闭功能。
 * @status stable
 * @since 3.0
 *
 * @dependency ea-icon
 *
 * @event ea-close - 关闭时触发，detail: `{ visible: false }`。
 * @event ea-show - 显示消息时触发。
 * @event ea-shown - 消息显示完毕后触发。
 * @event ea-hide - 隐藏消息时触发。
 * @event ea-hidden - 消息隐藏完毕后触发。
 *
 * @csspart container - 容器元素。
 * @csspart icon - 类型图标元素。
 * @csspart content-wrap - 内容容器元素。
 * @csspart close-icon - 关闭图标元素。
 *
 * @cssproperty --ea-message-z-index - 组件层级。
 * @cssproperty --ea-message-y - 垂直偏移量。
 * @cssproperty --ea-message-fade-out-y - 消失方向偏移。
 * @cssproperty --ea-message-offset - 初始偏移距离。
 * @cssproperty --ea-message-spacing - 内边距。
 * @cssproperty --ea-message-border-color - 边框颜色。
 * @cssproperty --ea-message-border-radius - 圆角大小。
 * @cssproperty --ea-message-min-width - 最小宽度。
 * @cssproperty --ea-message-font-size - 字体大小。
 * @cssproperty --ea-message-transition - 过渡动画时长。
 * @cssproperty --ea-message-gap - 元素间距。
 * @cssproperty --ea-message-close-icon-color - 关闭图标颜色。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaMessageElement extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @query(bem.ce("icon"))
  private _messageIcon!: HTMLElement;

  @query(bem.ce("content"))
  private _messageContent!: HTMLElement;

  @query(bem.ce("close-icon"))
  private _messageCloseIcon!: HTMLElement;

  private _transitionAbortController?: AbortController;

  @attribute({
    type: Enum(VARIANT_TYPES),
    default: VARIANT_DEFAULT,
    observer(this: EaMessageElement, newVal: VariantType) {
      this._messageIcon.setAttribute("name", this.icon || VARIANT_ICON_MAP[newVal]);
      this.updateContainerClasslist();
    },
  })
  variant: VariantType = VARIANT_DEFAULT;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaMessageElement, newVal: boolean) {
      this._transitionAbortController?.abort();
      this._transitionAbortController = new AbortController();

      if (newVal) {
        this._initPosition();
        this.updateContainerClasslist();
        this.emit("ea-show");

        void this._container.offsetWidth;

        this._container.classList.add(bem.s("show"));

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
    observer(this: EaMessageElement) {
      this.updateContainerClasslist();
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
      this._messageIcon.setAttribute("name", newVal || VARIANT_ICON_MAP[this.variant]);
      this.updateContainerClasslist();
    },
  })
  icon: string = "";

  @attribute({
    type: Number,
    default: 0,
    observer(this: EaMessageElement, newVal: number) {
      this.style.setProperty("--ea-message-y", `${newVal}px`);
    },
  })
  offset: number = 0;

  @property({
    type: Boolean,
    default: false,
  })
  dangerouslyUseHTMLString: boolean = false;

  /** 更新容器类名 */
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

  /** 渲染模板 */
  html(): string {
    return `
      <div class="${this.updateContainerClasslist()}" part="container">
        <ea-icon class="${bem.e("icon")}" name="${VARIANT_ICON_MAP[this.variant]}" part="icon"></ea-icon>
        <div class="${bem.e("content")}" part="content-wrap"></div>
        <ea-icon class="${bem.e("close-icon")}" name="xmark" part="close-icon"></ea-icon>
      </div>
    `;
  }

  /** 关闭消息（公共方法） */
  close(): void {
    this.visible = false;
    this.dispatchEvent(new EaMessageCloseEvent({ visible: false }));
  }

  /** 初始化消息位置 */
  private _initPosition(): void {
    const eaMessageList = document.querySelectorAll<HTMLElement>(
      `ea-message[placement="${this.placement}"]`
    );

    if (eaMessageList.length <= 1) return;

    const lastEl = eaMessageList[eaMessageList.length - 2];
    const lastPosition = lastEl.style.getPropertyValue("--ea-message-y");

    const lastEaMessage = lastEl.shadowRoot?.querySelector(
      bem.cb()
    ) as HTMLElement;
    if (!lastEaMessage) return;

    const lastEaMessageRect = lastEaMessage.getBoundingClientRect();

    this.style.setProperty(
      "--ea-message-y",
      `${Number(lastPosition.replace("px", "")) + lastEaMessageRect.height + 8}px`
    );
  }

  /** 隐藏消息时调整后续消息位置 */
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
