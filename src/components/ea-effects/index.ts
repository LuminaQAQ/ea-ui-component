import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query } from "@decorator";
import { html } from "@utils/html";
import { Enum } from "@utils/Enum";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-effects" as const;
const bem = createBEM(TAG_NAME);

/**
 * @summary 动画效果组件，用于为子元素添加进入/离开动画效果，支持缩放、淡入淡出、滑动、翻转等多种效果。
 * @status stable
 * @since 3.0
 *
 * @slot default - 默认插槽，需要应用动画效果的内容。
 *
 * @csspart container - 动画容器元素。
 *
 * @cssproperty --ea-effects-duration - 动画持续时间，默认值 `0.3s`。
 * @cssproperty --ea-effects-delay - 动画延迟时间，默认值 `0`。
 * @cssproperty --ea-effects-timing-function - 动画缓动函数，默认值 `ease-in-out`。
 * @cssproperty --ea-effects-iteration-count - 动画播放次数，默认值 `1`。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaEffects extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  private _isInitialVisible = true;

  private _startController: AbortController | null = null;
  private _endController: AbortController | null = null;
  private _isPlaying = false;

  private _reduceMotion = false;
  private _reduceMotionMediaQuery: MediaQueryList | null = null;
  private _reduceMotionController: AbortController | null = null;

  private _triggerController: AbortController | null = null;
  private _scrollObserver: IntersectionObserver | null = null;

  @attribute({
    type: String,
    default: "",
    observer(this: EaEffects, newVal: string, oldVal: string) {
      if (newVal !== oldVal) {
        this.updateContainerClasslist();
        this.reset();
        this.visible ? this.show() : this.hide();
      }
    },
  })
  effect: string = "";

  @attribute({
    type: Boolean,
    default: true,
    observer(this: EaEffects, newVal: boolean) {
      newVal ? this.show() : this.hide();
    },
  })
  visible: boolean = true;

  @attribute({
    type: String,
    default: "",
    observer(this: EaEffects, newVal: string) {
      this._container?.style.setProperty("--ea-effects-duration", newVal || "");
    },
  })
  duration: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaEffects, newVal: string) {
      this._container?.style.setProperty("--ea-effects-delay", newVal || "");
    },
  })
  delay: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaEffects, newVal: string) {
      this._container?.style.setProperty(
        "--ea-effects-timing-function",
        newVal || ""
      );
    },
  })
  timingFunction: string = "";

  @attribute({
    type: Number,
    default: 1,
    observer(this: EaEffects, newVal: number) {
      this._container?.style.setProperty(
        "--ea-effects-iteration-count",
        String(newVal)
      );
    },
  })
  iteration: number = 1;

  @attribute({
    type: Enum(["hover", "click", "manual", "scroll"]),
    default: "manual",
    observer(this: EaEffects, newVal: "hover" | "click" | "manual" | "scroll") {
      this._rebuildTriggerListeners();
    },
  })
  trigger: "hover" | "click" | "manual" | "scroll" = "manual";

  @attribute({ type: Boolean, default: true })
  scrollOnce: boolean = true;

  @attribute({ type: String, default: "" })
  scrollTarget: string = "";

  /** 重置动画状态，清除所有过渡类名和样式 */
  reset(): void {
    this._startController?.abort();
    this._endController?.abort();
    this._startController = null;
    this._endController = null;
    this._isPlaying = false;

    if (this._container) {
      const effect = this.effect;
      this._container.classList.remove(
        bem.m(`${effect}-before-enter`),
        bem.m(`${effect}-enter`),
        bem.m(`${effect}-before-leave`),
        bem.m(`${effect}-leave`)
      );

      this._container.style.removeProperty("display");
    }
  }

  /** 显示内容，触发进入动画 */
  show(): void {
    this.reset();

    this.style.removeProperty("display");

    if (!this.effect) return;

    if (this._reduceMotion) {
      this._container?.style.removeProperty("display");
      this._container?.classList.remove(bem.m(`${this.effect}-leave`));
      return;
    }

    this._startController = new AbortController();
    this._isPlaying = true;

    this._container.classList.add(bem.m(`${this.effect}-before-enter`));
    void this._container.offsetWidth;

    this._container.classList.remove(bem.m(`${this.effect}-before-enter`));
    this._container.classList.add(bem.m(`${this.effect}-enter`));
    void this._container.offsetWidth;

    this._container.addEventListener(
      "transitionend",
      () => {
        this._isPlaying = false;
        this._startController?.abort();
        this._startController = null;
      },
      { once: true, signal: this._startController.signal }
    );
  }

  /** 隐藏内容，触发离开动画 */
  hide(): void {
    this.reset();

    if (!this.effect) return;

    if (this._reduceMotion) {
      this._container?.style.setProperty("display", "none");
      return;
    }

    this._endController = new AbortController();
    this._isPlaying = true;

    this._container.classList.add(bem.m(`${this.effect}-before-leave`));
    void this._container.offsetWidth;

    this._container.addEventListener(
      "transitionend",
      () => {
        this._container.classList.remove(bem.m(`${this.effect}-before-leave`));
        this._container.classList.add(bem.m(`${this.effect}-leave`));
        this._isPlaying = false;
        this._endController?.abort();
        this._endController = null;
      },
      { once: true, signal: this._endController.signal }
    );
  }

  /** 切换可见状态 */
  toggle(): void {
    this.visible = !this.visible;
  }

  /** 更新容器类名 */
  updateContainerClasslist(): string {
    const className = bem({
      [this.effect]: !!this.effect,
    });

    if (this._container) {
      this._container.className = className;
    }

    return className;
  }

  html(): string {
    return `
      <div class="${this.updateContainerClasslist()}" part="container">
        <slot></slot>
      </div>
    `;
  }

  /**
   * 响应 prefers-reduced-motion 媒体查询变化
   * @param e - 媒体查询事件
   */
  private _onReduceMotionChange = (e: MediaQueryListEvent) => {
    this._reduceMotion = e.matches;
    this.visible ? this.show() : this.hide();
  };

  /** 重建触发器事件监听，根据 trigger 属性值切换不同的交互模式 */
  private _rebuildTriggerListeners(): void {
    this._triggerController?.abort();
    this._triggerController = new AbortController();
    const signal = this._triggerController.signal;

    switch (this.trigger) {
      case "hover":
        this._container.addEventListener(
          "mouseenter",
          () => {
            this.visible = true;
          },
          { signal }
        );
        this._container.addEventListener(
          "mouseleave",
          () => {
            this.visible = false;
          },
          { signal }
        );
        break;

      case "click":
        this._container.addEventListener(
          "click",
          () => {
            this.visible = !this.visible;
          },
          { signal }
        );
        break;

      case "scroll": {
        this.visible = false;

        const observeTarget = this.scrollTarget
          ? document.querySelector(this.scrollTarget)
          : this.parentElement;

        const observer = new IntersectionObserver(
          entries => {
            const entry = entries[0];
            if (entry.isIntersecting) {
              this.visible = true;
              if (this.scrollOnce) {
                observer.disconnect();
              }
            } else {
              if (!this.scrollOnce) {
                this.visible = false;
              }
            }
          },
          { threshold: 0.1 }
        );

        observer.observe(observeTarget || this);
        this._scrollObserver = observer;

        this._triggerController?.signal.addEventListener("abort", () => {
          observer.disconnect();
        });

        break;
      }

      case "manual":
      default:
        break;
    }
  }

  $mount(): void {
    this._reduceMotionController?.abort();

    this._reduceMotionMediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    this._reduceMotion = this._reduceMotionMediaQuery.matches;

    this._reduceMotionController = new AbortController();
    this._reduceMotionMediaQuery.addEventListener(
      "change",
      this._onReduceMotionChange,
      { signal: this._reduceMotionController.signal }
    );
  }

  $beforeUnmount(): void {
    this._reduceMotionController?.abort();
    this._startController?.abort();
    this._endController?.abort();

    this._scrollObserver?.disconnect();

    this._reduceMotionController = null;
    this._startController = null;
    this._endController = null;
  }
}
