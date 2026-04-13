import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import { listen } from "@decorator/listen";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-scrollbar" as const;
const bem = createBEM(TAG_NAME);

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaScrollbar extends EaBase {
  // ==================== DOM 元素引用 ====================

  @query(".ea-scrollbar")
  private _container!: HTMLElement;

  @query(".ea-scrollbar__track-horizontal")
  private _horizontalTrack!: HTMLElement;

  @query(".ea-scrollbar__track-vertical")
  private _verticalTrack!: HTMLElement;

  @query(".ea-scrollbar__thumb-horizontal")
  private _horizontalThumb!: HTMLElement;

  @query(".ea-scrollbar__thumb-vertical")
  private _verticalThumb!: HTMLElement;

  @query(".ea-scrollbar__view")
  private _view!: HTMLElement;

  // ==================== 私有状态 ====================

  private _eventController?: AbortController;
  private _isMounted: boolean = false;
  private _dragState?: {
    isHorizontal: boolean;
    startClientX: number;
    startClientY: number;
    startScrollLeft: number;
    startScrollTop: number;
    thumbWidth: number;
    thumbHeight: number;
  };

  // ==================== 属性定义 ====================

  @attribute({
    type: String,
    default: "",
    observer(this: EaScrollbar, newVal: string) {
      if (this._container) {
        this._container.style.height = newVal || "100%";
      }
    },
  })
  height: string = "";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaScrollbar, newVal: boolean) {
      if (this._container) {
        this._container.classList.toggle("ea-scrollbar--native", newVal);
      }
    },
  })
  native: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaScrollbar, newVal: boolean) {
      if (this._container) {
        this._container.classList.toggle("ea-scrollbar--noresize", newVal);
      }
    },
  })
  noresize: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaScrollbar, newVal: boolean) {
      if (this._container) {
        this._container.classList.toggle("ea-scrollbar--always", newVal);
      }
    },
  })
  always: boolean = false;

  // ==================== Getter ====================

  get isMounted(): boolean {
    return this._isMounted;
  }

  // ==================== 方法 ====================

  /**
   * 滚动事件处理
   */
  private _handleScroll(): void {
    if (!this._view || !this._verticalThumb || !this._horizontalThumb) return;

    this._verticalThumb.style.setProperty(
      "--ea-scrollbar-top",
      `${(this._view.scrollTop / this._view.scrollHeight) * 100}%`
    );
    this._horizontalThumb.style.setProperty(
      "--ea-scrollbar-left",
      `${(this._view.scrollLeft / this._view.scrollWidth) * 100}%`
    );

    this.emit("scroll", {
      detail: {
        scrollTop: this._view.scrollTop,
        scrollLeft: this._view.scrollLeft,
      },
    });

    const directions = {
      top: this._view.scrollTop / this._view.scrollHeight <= 0,
      bottom: this._view.scrollTop / this._view.scrollHeight >= 1,
      left: this._view.scrollLeft / this._view.scrollWidth <= 0,
      right: this._view.scrollLeft / this._view.scrollWidth >= 1,
    };

    Object.keys(directions).forEach(direction => {
      if (directions[direction as keyof typeof directions]) {
        this.emit("end-reached", {
          detail: {
            direction,
            scrollTop: this._view.scrollTop,
            scrollLeft: this._view.scrollLeft,
          },
        });
      }
    });
  }

  /**
   * 页面尺寸改变后，调整滚动条样式
   */
  private _handleResize(): void {
    queueMicrotask(() => {
      if (!this._view || !this._verticalThumb || !this._horizontalThumb) return;

      const viewRect = this._view.getBoundingClientRect();
      const verticalThumbHeight = viewRect.height / this._view.scrollHeight;
      const horizontalThumbWidth = viewRect.width / this._view.scrollWidth;

      this._verticalThumb.style.setProperty(
        "--ea-scrollbar-thumb-vertical-height",
        `${verticalThumbHeight * 100}%`
      );
      this._horizontalThumb.style.setProperty(
        "--ea-scrollbar-thumb-horizontal-width",
        `${horizontalThumbWidth * 100}%`
      );

      this._verticalTrack?.classList.toggle(
        "is-show",
        verticalThumbHeight >= 0.999
      );
      this._horizontalTrack?.classList.toggle(
        "is-show",
        horizontalThumbWidth >= 0.999
      );
    });
  }

  /**
   * 处理滚动条拖动
   */
  private _handleThumbDrag = (e: MouseEvent): void => {
    if (!this._dragState || !this._view) return;

    const {
      isHorizontal,
      startClientX,
      startClientY,
      startScrollLeft,
      startScrollTop,
      thumbWidth,
      thumbHeight,
    } = this._dragState;

    if (isHorizontal) {
      const deltaX = e.clientX - startClientX;
      const trackWidth =
        this._horizontalTrack?.getBoundingClientRect().width || 0;
      const scrollRatio = deltaX / (trackWidth - thumbWidth);
      const scrollLeft =
        startScrollLeft +
        scrollRatio * (this._view.scrollWidth - this._view.clientWidth);

      this._view.scrollTo({
        left: Math.max(
          0,
          Math.min(scrollLeft, this._view.scrollWidth - this._view.clientWidth)
        ),
        behavior: "instant",
      });
    } else {
      const deltaY = e.clientY - startClientY;
      const trackHeight =
        this._verticalTrack?.getBoundingClientRect().height || 0;
      const scrollRatio = deltaY / (trackHeight - thumbHeight);
      const scrollTop =
        startScrollTop +
        scrollRatio * (this._view.scrollHeight - this._view.clientHeight);

      this._view.scrollTo({
        top: Math.max(
          0,
          Math.min(scrollTop, this._view.scrollHeight - this._view.clientHeight)
        ),
        behavior: "instant",
      });
    }
  };

  /**
   * 鼠标按下事件
   */
  @listen("mousedown", ".ea-scrollbar__thumb-horizontal")
  @listen("mousedown", ".ea-scrollbar__thumb-vertical")
  private _handleMouseDown(e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();

    if (!this._view) return;

    const isHorizontal = (e.target as HTMLElement) === this._horizontalThumb;

    // 记录拖动初始状态
    this._dragState = {
      isHorizontal,
      startClientX: e.clientX,
      startClientY: e.clientY,
      startScrollLeft: this._view.scrollLeft,
      startScrollTop: this._view.scrollTop,
      thumbWidth: this._horizontalThumb?.getBoundingClientRect().width || 0,
      thumbHeight: this._verticalThumb?.getBoundingClientRect().height || 0,
    };

    // 添加拖动状态类，防止滚动条消失
    this._container?.classList.add("is-dragging");
    if (isHorizontal) {
      this._horizontalThumb?.classList.add("is-active");
    } else {
      this._verticalThumb?.classList.add("is-active");
    }

    const controller = new AbortController();

    window.addEventListener("mousemove", this._handleThumbDrag, {
      signal: controller.signal,
    });

    window.addEventListener(
      "mouseup",
      () => {
        controller.abort();
        this._dragState = undefined;
        this._container?.classList.remove("is-dragging");
        this._horizontalThumb?.classList.remove("is-active");
        this._verticalThumb?.classList.remove("is-active");
      },
      { signal: controller.signal, once: true }
    );
  }

  /**
   * 键盘事件
   */
  @listen("keydown")
  private _handleKeyDown(e: KeyboardEvent): void {
    if (!this._view) return;

    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      this._view.scrollTo({
        top:
          this._view.scrollTop +
          (this._view.scrollHeight / 8) * (e.key === "ArrowUp" ? -1 : 1),
        behavior: "smooth",
      });
    } else if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      this._view.scrollTo({
        left:
          this._view.scrollLeft +
          (this._view.scrollWidth / 8) * (e.key === "ArrowLeft" ? -1 : 1),
        behavior: "smooth",
      });
    }
  }

  /**
   * 滚动到指定位置
   */
  scrollTo(options: ScrollToOptions): void {
    this._view?.scrollTo(options);
  }

  /**
   * 渲染模板
   */
  html(): string {
    return `
      <div class="${bem.b()}" part="container">
        <div class="${bem.e("track-horizontal")}" part="track-horizontal">
          <div class="${bem.e("thumb-horizontal")}" part="thumb"></div>
        </div>
        <div class="${bem.e("track-vertical")}" part="track-vertical">
          <div class="${bem.e("thumb-vertical")}" part="thumb"></div>
        </div>
        <div class="${bem.e("view")}" part="view-container">
          <slot></slot>
        </div>
      </div>
    `;
  }

  // ==================== 生命周期 ====================

  $mount(): void {
    this._isMounted = true;

    // 初始化属性
    this.native = this.native;
    this.noresize = this.noresize;
    this.always = this.always;

    // 初始化事件控制器
    this._eventController = new AbortController();
    const controller = this._eventController;

    // 初始化滚动条尺寸
    this._handleResize();

    // 绑定滚动事件
    this._view?.addEventListener("scroll", () => this._handleScroll(), {
      signal: controller.signal,
    });

    // 绑定 slotchange 事件
    this.shadowRoot?.addEventListener(
      "slotchange",
      () => this._handleResize(),
      {
        signal: controller.signal,
      }
    );

    // 绑定 resize 事件（如果 noresize 为 false）
    if (!this.noresize) {
      window.addEventListener("resize", () => this._handleResize(), {
        signal: controller.signal,
      });
    }

    // 绑定 load 事件
    window.addEventListener("load", () => this._handleResize(), {
      signal: controller.signal,
    });
  }

  $beforeUnmount(): void {
    this._eventController?.abort();
    this._isMounted = false;
  }
}
