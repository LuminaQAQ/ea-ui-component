import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { listen } from "@decorator/listen";
import { query } from "@decorator/query";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-backtop" as const;
const bem = createBEM(TAG_NAME);

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaBacktop extends EaBase {
  // ==================== DOM 元素引用 ====================

  @query(".ea-backtop")
  private _container!: HTMLElement;

  private _beforeLeaveAbortController?: AbortController;

  // ==================== 属性定义 ====================

  @attribute({
    type: String,
    default: "window",
    observer() {},
  })
  target: string = "window";

  @attribute({
    type: Number,
    default: 200,
    observer() {},
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
    observer() {},
  })
  smooth: boolean = true;

  // ==================== 方法 ====================

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
      this._container.classList.add("before-enter");
      void this._container.offsetWidth;
      this.updateContainerClasslist();
    } else {
      this._beforeLeaveAbortController?.abort();
      this._beforeLeaveAbortController = new AbortController();

      this._container.classList.add("before-leave");
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
   * 渲染模板
   */
  html(): string {
    return `
      <div class="${bem()}" part="container">
        <slot></slot>
      </div>
    `;
  }

  // ==================== 事件处理 ====================

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

  // ==================== 生命周期 ====================

  $mount(): void {
    this.updateContainerClasslist();

    if (this.target !== "window") {
      const el = document.querySelector(this.target);
      if (el) {
        el.addEventListener("scroll", () => this._handleScroll());
      }
    }

    this._handleScroll();
  }

  $beforeUnmount(): void {
    this._beforeLeaveAbortController?.abort();
  }
}
