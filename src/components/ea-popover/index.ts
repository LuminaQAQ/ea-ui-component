import { EaPopper } from "@common/ea-popper/index";
import { createBEM } from "@utils/bem";
import { CustomElement, attribute, query } from "@decorator";
import { Enum } from "@utils/Enum";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-popover" as const;
const bem = createBEM(TAG_NAME);

const TRIGGER_TYPES = [
  "click",
  "focus",
  "hover",
  "contextmenu",
  "customized",
] as const;

type TriggerType = (typeof TRIGGER_TYPES)[number];

/**
 * @summary 弹出框组件，基于 EaPopper 扩展，支持标题、内容和多种触发方式。
 * @status stable
 * @since 3.0
 *
 * @slot default - Popover 内容插槽。
 * @slot reference - 触发 Popover 显示的 HTML 元素插槽。
 *
 * @event ea-show - 开启 Popover 时触发。
 * @event ea-shown - 开启 Popover 的动画结束时触发。
 * @event ea-hide - 关闭 Popover 时触发。
 * @event ea-hidden - 关闭 Popover 的动画结束时触发。
 *
 * @csspart container - Popover 外层容器。
 * @csspart reference - 触发 Popover 显示的 HTML 元素的父容器。
 * @csspart original - Popover 内容容器。
 * @csspart title - Popover 标题容器。
 * @csspart content - Popover 内容容器。
 *
 * @cssproperty --ea-popover-title-color - 标题颜色。
 * @cssproperty --ea-popover-title-font-size - 标题字体大小。
 * @cssproperty --ea-popover-content-color - 内容颜色。
 * @cssproperty --ea-popover-content-font-size - 内容字体大小。
 * @cssproperty --ea-popover-box-shadow - 阴影。
 * @cssproperty --ea-popover-border-radius - 圆角。
 * @cssproperty --ea-popover-z-index - 层级。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaPopover extends EaPopper {
  @query(bem.ce("title"))
  private _titleElement!: HTMLElement;

  @query(bem.ce("content"))
  private _contentElement!: HTMLElement;

  private _triggerAbortController?: AbortController;
  private _contextmenuAbortController?: AbortController;

  @attribute({
    type: Enum(TRIGGER_TYPES),
    default: "hover",
    observer(this: EaPopover) {
      this._initTriggerEvent();
    },
  })
  trigger: TriggerType = "hover";

  @attribute({
    type: String,
    default: "",
    observer(this: EaPopover, newVal: string) {
      if (this._titleElement) {
        this._titleElement.textContent = newVal;
      }
      this.updateContainerClasslist();
    },
  })
  heading: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaPopover, newVal: string) {
      if (this._contentElement) {
        this._contentElement.textContent = newVal;
      }
      this.updateContainerClasslist();
    },
  })
  content: string = "";

  updateContainerClasslist(): string {
    const originClasslist = super.updateContainerClasslist();
    const className = `${originClasslist} ${bem(
      {},
      {
        "has-heading": !!this.heading,
        "has-content": !!this.content,
      }
    )}`;

    if (this._container) {
      this._container.className = className;
    }

    return className;
  }

  /** 初始化触发事件监听 */
  private _initTriggerEvent(): void {
    this._triggerAbortController?.abort();
    this._triggerAbortController = new AbortController();

    if (this.trigger === "customized") return;

    const strategy = this._triggerEventStrategies[this.trigger];
    if (strategy) {
      strategy();
    } else {
      console.warn(`[EaPopover] trigger event ${this.trigger} is not exist`);
      this._triggerEventStrategies["hover"]();
    }
  }

  /** 触发事件策略映射 */
  private _triggerEventStrategies: Record<TriggerType, () => void> = {
    hover: () => {
      this.addEventListener(
        "mouseover",
        () => {
          this.show();

          this.addEventListener(
            "mouseout",
            () => {
              this.hide();
            },
            { once: true, signal: this._triggerAbortController!.signal }
          );
        },
        { signal: this._triggerAbortController!.signal }
      );
    },
    click: () => {
      this.addEventListener(
        "click",
        () => {
          this.toggle();
        },
        { signal: this._triggerAbortController!.signal }
      );
    },
    focus: () => {
      this.addEventListener(
        "focus",
        () => {
          this.show();

          this.addEventListener(
            "blur",
            () => {
              this.hide();
            },
            { signal: this._triggerAbortController!.signal }
          );
        },
        { signal: this._triggerAbortController!.signal }
      );
    },
    contextmenu: () => {
      this.addEventListener(
        "contextmenu",
        (e: MouseEvent) => {
          e.preventDefault();

          this._contextmenuAbortController?.abort();
          this._contextmenuAbortController = new AbortController();

          this.show();

          window.addEventListener(
            "click",
            (e: MouseEvent) => {
              const isThis = this.contains(e.target as Node);
              if (!isThis) {
                this.hide();
                this._contextmenuAbortController?.abort();
              }
            },
            { signal: this._contextmenuAbortController.signal }
          );
        },
        { signal: this._triggerAbortController!.signal }
      );
    },
    customized: () => {},
  };

  html(): string {
    return `
      <div class="${this.updateContainerClasslist()}" part="container" tabindex="-1">
        <div class="ea-popper__reference" part="reference" tabindex="-1">
          <div class="ea-popper__original" part="original" tabindex="0">
            <div class="${bem.e("title")}" part="title"></div>
            <slot></slot>
            <div class="${bem.e("content")}" part="content"></div>
          </div>
          <slot name="reference"></slot>
        </div>
      </div>
    `;
  }

  $mount(): void {
    super.$mount();
    this._initTriggerEvent();

    if (this.heading && this._titleElement) {
      this._titleElement.textContent = this.heading;
    }
    if (this.content && this._contentElement) {
      this._contentElement.textContent = this.content;
    }
  }

  $beforeUnmount(): void {
    super.$beforeUnmount();
    this._triggerAbortController?.abort();
    this._contextmenuAbortController?.abort();
  }
}
