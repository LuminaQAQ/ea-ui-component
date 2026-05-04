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

  // ==================== 方法 ====================

  updateContainerClasslist(): string {
    const className = bem({
      native: this.native,
      noresize: this.noresize,
      always: this.always,
    });

    if (this._container) {
      this._container.className = className;
    }

    return className;
  }

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

  @listen("mousedown", ".ea-scrollbar__thumb-horizontal")
  @listen("mousedown", ".ea-scrollbar__thumb-vertical")
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

  @listen("scroll", ".ea-scrollbar__view")
  private _handleViewScroll(): void {
    this._handleScroll();
  }

  @listen("slotchange", bem.ce("view"))
  private _handleSlotChange(): void {
    this._handleResize();
  }

  @listen("resize", "window")
  private _handleWindowResize(): void {
    if (this.noresize) return;
    this._handleResize();
  }

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
    this.updateContainerClasslist();
    this._handleResize();
  }
}
