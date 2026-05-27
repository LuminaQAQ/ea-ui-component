import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query, listen } from "@decorator";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-backtop" as const;
const bem = createBEM(TAG_NAME);

/**
 * @summary 回到顶部组件，用于快速返回页面顶部的操作按钮，支持自定义滚动目标、显示阈值和平滑滚动。
 * @status stable
 * @since 3.0
 *
 * @slot default - 默认插槽，用于自定义按钮内容。
 *
 * @csspart container - 容器元素。
 *
 * @cssproperty --ea-backtop-right - 距右侧距离。
 * @cssproperty --ea-backtop-bottom - 距底部距离。
 * @cssproperty --ea-backtop-size - 按钮尺寸。
 * @cssproperty --ea-backtop-border-radius - 按钮圆角。
 * @cssproperty --ea-backtop-font-size - 图标字体大小。
 * @cssproperty --ea-backtop-color - 图标颜色。
 * @cssproperty --ea-backtop-background-color - 背景颜色。
 * @cssproperty --ea-backtop-box-shadow - 阴影。
 * @cssproperty --ea-backtop-transition - 过渡动画时长。
 * @cssproperty --ea-backtop-z-index - 层级。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaBacktop extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  private _beforeLeaveAbortController?: AbortController;

  private _targetScrollAbortController?: AbortController;

  @attribute({
    type: String,
    default: "window",
  })
  target: string = "window";

  @attribute({
    type: Number,
    default: 200,
  })
  visibilityHeight: number = 200;

  @attribute({
    type: String,
    default: "40px",
    observer(this: EaBacktop, newVal: string) {
      this.style.setProperty("--ea-backtop-right", newVal);
    },
  })
  right: string = "40px";

  @attribute({
    type: String,
    default: "40px",
    observer(this: EaBacktop, newVal: string) {
      this.style.setProperty("--ea-backtop-bottom", newVal);
    },
  })
  bottom: string = "40px";

  @attribute({
    type: Boolean,
    default: true,
  })
  smooth: boolean = true;

  /**
   * 更新容器类名
   */
  updateContainerClasslist(): string {
    const scrollTop = this._getCurrentScrollTop();
    const className = bem({}, { visible: scrollTop > this.visibilityHeight });

    if (this._container) {
      this._container.className = className;
    }

    return className;
  }

  /**
   * 获取当前滚动位置
   * @returns 当前滚动高度
   */
  private _getCurrentScrollTop(): number {
    const el = document.querySelector(this.target);
    return el ? (el as HTMLElement).scrollTop : window.scrollY;
  }

  /**
   * 滚动事件处理
   */
  private _handleScroll(): void {
    const scrollTop = this._getCurrentScrollTop();

    if (scrollTop > this.visibilityHeight) {
      this._container.classList.add(bem.s("before-enter"));
      void this._container.offsetWidth;
      this.updateContainerClasslist();
    } else {
      this._beforeLeaveAbortController?.abort();
      this._beforeLeaveAbortController = new AbortController();

      this._container.classList.add(bem.s("before-leave"));
      this._container.addEventListener(
        "transitionend",
        () => {
          this.updateContainerClasslist();
        },
        { once: true, signal: this._beforeLeaveAbortController.signal }
      );
    }
  }

  /**
   * 绑定自定义目标的滚动监听
   */
  private _bindTargetScroll(): void {
    this._targetScrollAbortController?.abort();
    this._targetScrollAbortController = new AbortController();

    if (this.target !== "window") {
      const el = document.querySelector(this.target);
      if (el) {
        el.addEventListener("scroll", () => this._handleScroll(), {
          signal: this._targetScrollAbortController.signal,
        });
      }
    }
  }

  /**
   * 渲染模板
   */
  html(): string {
    return `
      <div class="${bem()}" part="container">
        <slot></slot>
      </div>
    `;
  }

  @listen("click")
  private _handleClick(): void {
    const el = document.querySelector(this.target) || window;

    el.scrollTo({
      top: 0,
      behavior: this.smooth ? "smooth" : "auto",
    });
  }

  @listen("scroll", "window")
  private _onWindowScroll(): void {
    if (this.target === "window") {
      this._handleScroll();
    }
  }

  $mount(): void {
    this.updateContainerClasslist();
    this._bindTargetScroll();
    this._handleScroll();
  }

  $beforeUnmount(): void {
    this._beforeLeaveAbortController?.abort();
    this._targetScrollAbortController?.abort();
  }
}
