import { EaPopper } from "@common/ea-popper/index";
import { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query } from "@decorator";
import { Enum } from "@utils/Enum";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-tooltip" as const;
const bem = createBEM(TAG_NAME);
const popperBem = createBEM("ea-popper");

const TRIGGER_TYPES = [
  "click",
  "focus",
  "hover",
  "contextmenu",
  "customized",
] as const;

type TriggerType = (typeof TRIGGER_TYPES)[number];

const EFFECT_TYPES = ["dark", "light", "customized"] as const;

type EffectType = (typeof EFFECT_TYPES)[number];

/**
 * @summary 文字提示组件，常用于展示鼠标 hover 时的提示信息，支持多种主题、触发方式和位置。
 * @status stable
 * @since 3.0
 *
 * @slot default - Tooltip 内容插槽。
 * @slot reference - 触发 Tooltip 显示的 HTML 元素插槽。
 *
 * @event ea-show - 开启 Tooltip 时触发。
 * @event ea-shown - 开启 Tooltip 的动画结束时触发。
 * @event ea-hide - 关闭 Tooltip 时触发。
 * @event ea-hidden - 关闭 Tooltip 的动画结束时触发。
 *
 * @csspart container - Tooltip 外层容器。
 * @csspart reference - 触发 Tooltip 显示的 HTML 元素的父容器。
 * @csspart original - Tooltip 内容容器。
 * @csspart content - Tooltip 文本内容容器。
 *
 * @cssproperty --ea-tooltip-spacing - Tooltip 内边距。
 * @cssproperty --ea-tooltip-bg-color-dark - 暗色主题背景颜色。
 * @cssproperty --ea-tooltip-color-dark - 暗色主题文字颜色。
 * @cssproperty --ea-tooltip-bg-color-light - 亮色主题背景颜色。
 * @cssproperty --ea-tooltip-color-light - 亮色主题文字颜色。
 * @cssproperty --ea-tooltip-font-size - Tooltip 字体大小。
 * @cssproperty --ea-tooltip-border-radius - Tooltip 圆角。
 * @cssproperty --ea-tooltip-z-index - Tooltip 层级。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaTooltip extends EaPopper {
  @query(bem.ce("content"))
  private _contentElement!: HTMLElement;

  private _triggerAbortController?: AbortController;
  private _contextmenuAbortController?: AbortController;

  @attribute({
    type: Enum(TRIGGER_TYPES),
    default: "hover",
    observer(this: EaTooltip) {
      this._initTriggerEvent();
    },
  })
  trigger: TriggerType = "hover";

  @attribute({
    type: Enum(EFFECT_TYPES),
    default: "dark",
    observer(this: EaTooltip) {
      this.updateContainerClasslist();
    },
  })
  effect: EffectType = "dark";

  @attribute({
    type: String,
    default: "",
    observer(this: EaTooltip, newVal: string) {
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
      {
        [this.effect]: this.effect && this.effect !== "customized",
      },
      {
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
      console.warn(`[EaTooltip] trigger event ${this.trigger} is not exist`);
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
        <div class="${popperBem.e("reference")}" part="reference" tabindex="-1">
          <div class="${popperBem.e("original")}" part="original" tabindex="0">
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
