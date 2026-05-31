import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query, listen } from "@decorator";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-scrollbar" as const;
const bem = createBEM(TAG_NAME);

/**
 * @summary 滚动条组件，用于替换浏览器原生滚动条，支持自定义滚动条样式。
 * @status stable
 * @since 3.0
 *
 * @slot default - 默认插槽，滚动内容。
 *
 * @event ea-scroll - 滚动时触发，detail: `{ scrollTop: number, scrollLeft: number }`。
 * @event ea-end-reached - 滚动到边界时触发，detail: `{ direction: 'top' | 'bottom' | 'left' | 'right', scrollTop: number, scrollLeft: number }`。
 *
 * @csspart container - 滚动条容器。
 * @csspart track-horizontal - 水平滚动轨道。
 * @csspart track-vertical - 垂直滚动轨道。
 * @csspart thumb-horizontal - 水平滚动滑块。
 * @csspart thumb-vertical - 垂直滚动滑块。
 * @csspart view - 视图容器。
 *
 * @cssproperty --ea-scrollbar-top - 垂直滑块偏移位置。
 * @cssproperty --ea-scrollbar-left - 水平滑块偏移位置。
 * @cssproperty --ea-scrollbar-track-color - 轨道背景颜色。
 * @cssproperty --ea-scrollbar-thumb-color - 滑块背景颜色。
 * @cssproperty --ea-scrollbar-thumb-hover-color - 滑块悬停背景颜色。
 * @cssproperty --ea-scrollbar-track-vertical-height - 垂直轨道高度。
 * @cssproperty --ea-scrollbar-track-vertical-width - 垂直轨道宽度。
 * @cssproperty --ea-scrollbar-thumb-vertical-height - 垂直滑块高度。
 * @cssproperty --ea-scrollbar-thumb-vertical-width - 垂直滑块宽度。
 * @cssproperty --ea-scrollbar-track-horizontal-height - 水平轨道高度。
 * @cssproperty --ea-scrollbar-track-horizontal-width - 水平轨道宽度。
 * @cssproperty --ea-scrollbar-thumb-horizontal-height - 水平滑块高度。
 * @cssproperty --ea-scrollbar-thumb-horizontal-width - 水平滑块宽度。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaScrollbar extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @query(bem.ce("track-horizontal"))
  private _horizontalTrack!: HTMLElement;

  @query(bem.ce("track-vertical"))
  private _verticalTrack!: HTMLElement;

  @query(bem.ce("thumb-horizontal"))
  private _horizontalThumb!: HTMLElement;

  @query(bem.ce("thumb-vertical"))
  private _verticalThumb!: HTMLElement;

  @query(bem.ce("view"))
  private _view!: HTMLElement;

  private _dragState?: {
    isHorizontal: boolean;
    startClientX: number;
    startClientY: number;
    startScrollLeft: number;
    startScrollTop: number;
    thumbWidth: number;
    thumbHeight: number;
  };

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
    observer(this: EaScrollbar) {
      this.updateContainerClasslist();
    },
  })
  native: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaScrollbar) {
      this.updateContainerClasslist();
    },
  })
  noresize: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaScrollbar) {
      this.updateContainerClasslist();
    },
  })
  always: boolean = false;

  updateContainerClasslist(): string {
    const className = bem(
      { native: this.native, noresize: this.noresize, always: this.always },
      {}
    );

    if (this._container) {
      this._container.className = className;
    }

    return className;
  }

  /** 处理滚动事件，更新滑块位置并派发滚动事件 */
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

    this.emit("ea-scroll", {
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
        this.emit("ea-end-reached", {
          detail: {
            direction,
            scrollTop: this._view.scrollTop,
            scrollLeft: this._view.scrollLeft,
          },
        });
      }
    });
  }

  /** 处理尺寸变化，更新滑块大小和轨道可见性 */
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
        "is-hidden",
        verticalThumbHeight >= 0.999
      );
      this._horizontalTrack?.classList.toggle(
        "is-hidden",
        horizontalThumbWidth >= 0.999
      );
    });
  }

  /** 处理滑块拖拽移动 */
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

  /** 处理滑块鼠标按下事件，启动拖拽 */
  @listen("mousedown", bem.ce("thumb-horizontal"))
  @listen("mousedown", bem.ce("thumb-vertical"))
  private _handleMouseDown(e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();

    if (!this._view) return;

    const isHorizontal = (e.target as HTMLElement) === this._horizontalThumb;

    this._dragState = {
      isHorizontal,
      startClientX: e.clientX,
      startClientY: e.clientY,
      startScrollLeft: this._view.scrollLeft,
      startScrollTop: this._view.scrollTop,
      thumbWidth: this._horizontalThumb?.getBoundingClientRect().width || 0,
      thumbHeight: this._verticalThumb?.getBoundingClientRect().height || 0,
    };

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

  /** 处理键盘事件，支持方向键滚动 */
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

  /** 处理视图滚动事件 */
  @listen("scroll", bem.ce("view"))
  private _handleViewScroll(): void {
    this._handleScroll();
  }

  /** 处理插槽内容变化，重新计算滑块尺寸 */
  @listen("slotchange", bem.ce("view"))
  private _handleSlotChange(): void {
    this._handleResize();
  }

  /** 处理窗口尺寸变化 */
  @listen("resize", "window")
  private _handleWindowResize(): void {
    if (this.noresize) return;
    this._handleResize();
  }

  /** 处理窗口加载完成 */
  @listen("load", "window")
  private _handleWindowLoad(): void {
    this._handleResize();
  }

  scrollTo(options?: ScrollToOptions): void;
  scrollTo(x: number, y: number): void;
  scrollTo(optionsOrX?: ScrollToOptions | number, y?: number): void {
    if (typeof optionsOrX === "number") {
      this._view?.scrollTo(optionsOrX, y ?? 0);
    } else {
      this._view?.scrollTo(optionsOrX);
    }
  }

  html(): string {
    return `
      <div class="${bem()}" part="container">
        <div class="${bem.e("track-horizontal")}" part="track-horizontal">
          <div class="${bem.e("thumb-horizontal")}" part="thumb-horizontal"></div>
        </div>
        <div class="${bem.e("track-vertical")}" part="track-vertical">
          <div class="${bem.e("thumb-vertical")}" part="thumb-vertical"></div>
        </div>
        <div class="${bem.e("view")}" part="view">
          <slot></slot>
        </div>
      </div>
    `;
  }

  $mount(): void {
    this.updateContainerClasslist();
    this._handleResize();
    if (this._container) {
      this._container.style.height = this.height || "100%";
    }
  }
}
