import EaBase, { createBEM } from "@core/EaBase";
import {
  CustomElement,
  attribute,
  query,
  queryAll,
  listen,
  children,
} from "@decorator";
import { html } from "@utils/html";
import { Enum } from "@utils/Enum";
import { timeout } from "@utils/timeout";
import "@/components/ea-icon/index";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-carousel" as const;
const bem = createBEM(TAG_NAME);

export type DirectionType = "horizontal" | "vertical";
export type TriggerType = "click" | "hover";
export type ArrowType = "never" | "always" | "hover";
export type IndicatorPositionType = "" | "none" | "outside";

/**
 * @summary 走马灯组件，在有限空间内循环播放同一类型的内容，支持自动播放、循环、方向切换等功能。
 * @status stable
 * @since 3.0
 *
 * @dependency ea-icon
 *
 * @slot default - 默认插槽，放置 ea-carousel-item 子组件。
 * @slot clone-first - 首项克隆插槽（内部使用）。
 * @slot clone-last - 末项克隆插槽（内部使用）。
 *
 * @event ea-change - 当前索引变化时触发，detail: `{ current: number, prev: number }`。
 *
 * @csspart container - 轮播图外层容器。
 * @csspart content - 轮播图内容容器（滑动承载层）。
 * @csspart indicator-wrap - 指示器容器。
 * @csspart indicator - 单个指示器项。
 * @csspart arrow-left - 左侧切换箭头。
 * @csspart arrow-left-icon - 左侧切换箭头图标。
 * @csspart arrow-right - 右侧切换箭头。
 * @csspart arrow-right-icon - 右侧切换箭头图标。
 *
 * @cssproperty --ea-carousel-height - 轮播图高度。
 * @cssproperty --ea-carousel-transform - 内容容器位移。
 * @cssproperty --ea-carousel-transition - 过渡动画时长。
 * @cssproperty --ea-carousel-indicator-x - 指示器水平位置。
 * @cssproperty --ea-carousel-indicator-y - 指示器垂直位置。
 * @cssproperty --ea-carousel-indicator-spacing - 指示器间距。
 * @cssproperty --ea-carousel-indicator-width - 指示器宽度。
 * @cssproperty --ea-carousel-indicator-height - 指示器高度。
 * @cssproperty --ea-carousel-indicator-color - 指示器颜色。
 * @cssproperty --ea-carousel-indicator-outside-color - 外部指示器颜色。
 * @cssproperty --ea-carousel-indicator-active-color - 激活指示器颜色。
 * @cssproperty --ea-carousel-arrow-x - 箭头水平偏移。
 * @cssproperty --ea-carousel-arrow-size - 箭头尺寸。
 * @cssproperty --ea-carousel-arrow-border-radius - 箭头圆角。
 * @cssproperty --ea-carousel-arrow-color - 箭头背景颜色。
 * @cssproperty --ea-carousel-arrow-hover-color - 箭头悬停背景颜色。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaCarousel extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @query(bem.ce("content"))
  private _content!: HTMLElement;

  @query(bem.ce("indicator-wrap"))
  private _indicatorWrap!: HTMLElement;

  @queryAll(bem.ce("indicator"))
  private _indicatorNodes!: NodeListOf<HTMLElement>;

  @children("ea-carousel-item:not([slot])")
  private _carouselItems!: NodeListOf<HTMLElement>;

  @children('ea-carousel-item[slot^="clone-"]')
  private _cloneItems!: NodeListOf<HTMLElement>;

  private _itemObserver: MutationObserver | null = null;

  private _isMounted = false;

  private _resizeTimeout: ReturnType<typeof setTimeout> | null = null;

  private _states = {
    prevIndex: 0,
    originLength: 0,
    timer: null as ReturnType<typeof setInterval> | null,
    pause: false,
    isMouseEnter: false,
    isEnd: false,
    isProcessingSlotChange: false,
  };

  @attribute({
    type: String,
    default: "100%",
    observer(this: EaCarousel, value: string) {
      this.style.setProperty("--ea-carousel-height", value);
    },
  })
  height: string = "100%";

  @attribute({
    type: Enum(["horizontal", "vertical"]),
    default: "horizontal",
    observer(this: EaCarousel) {
      this.updateContainerClasslist();
    },
  })
  direction: DirectionType = "horizontal";

  @attribute({
    type: Number,
    default: 0,
    observer(this: EaCarousel, newVal: number, oldVal: number) {
      this._updateCarouselPosition(newVal);
      if (this._states.isEnd) {
        this._states.isEnd = false;
        return;
      }

      let emittedNewVal = newVal;
      let emittedOldVal = oldVal;

      if (newVal < 0) {
        emittedNewVal = this._indicatorNodes.length - 1;
        emittedOldVal = 0;
        this._states.isEnd = true;
      } else if (newVal > this._indicatorNodes.length - 1) {
        emittedOldVal = this._indicatorNodes.length - 1;
        emittedNewVal = 0;
        this._states.isEnd = true;
      }

      this._states.prevIndex = emittedOldVal;

      this.emit("ea-change", {
        detail: {
          current: emittedNewVal,
          prev: emittedOldVal,
        },
      });
    },
  })
  index: number = 0;

  @attribute({
    type: Enum(["click", "hover"]),
    default: "hover",
  })
  trigger: TriggerType = "hover";

  @attribute({
    type: Number,
    default: 3000,
    observer(this: EaCarousel) {
      this._handleTimerClear();

      if (this.autoplay) {
        this._handleAutoPlay();
      }
    },
  })
  interval: number = 3000;

  @attribute({
    type: Enum(["never", "always", "hover"]),
    default: "hover",
    observer(this: EaCarousel) {
      this.updateContainerClasslist();
    },
  })
  arrow: ArrowType = "hover";

  @attribute({
    type: Boolean,
    default: true,
    observer(this: EaCarousel, newVal: boolean) {
      this._handleTimerClear();

      if (newVal) {
        this._handleAutoPlay();
      }
    },
  })
  autoplay: boolean = true;

  @attribute({
    type: Boolean,
    default: true,
  })
  loop: boolean = true;

  @attribute({
    type: Boolean,
    default: true,
  })
  pauseOnHover: boolean = true;

  @attribute({
    type: Enum(["", "none", "outside"]),
    default: "",
    observer(this: EaCarousel) {
      this.updateContainerClasslist();
    },
  })
  indicatorPosition: IndicatorPositionType = "";

  /** 更新容器类名 */
  updateContainerClasslist(): string {
    const className = bem(
      { [this.direction]: true },
      {
        [`arrow-${this.arrow}`]:
          this.arrow === "always" ||
          this.arrow === "never" ||
          this._states.isMouseEnter,
        [`${this.indicatorPosition}-indicator`]: !!this.indicatorPosition,
      }
    );

    this._container.className = className;

    return className;
  }

  /** 渲染模板 */
  html(): string {
    return `
      <div class='${bem()}' part='container'>
        <button class="${bem.e("arrow")} arrow-left" part="arrow-left">
          <ea-icon name="angle-left" part="arrow-left-icon"></ea-icon>
        </button>
        <button class="${bem.e("arrow")} arrow-right" part="arrow-right">
          <ea-icon name="angle-right" part="arrow-right-icon"></ea-icon>
        </button>
        <ul class="${bem.e("content")}" part="content">
            <slot name="clone-last"></slot>
            <slot></slot>
            <slot name="clone-first"></slot>
        </ul>
        <footer class="${bem.e("indicator-wrap")}" part="indicator-wrap">
        </footer>
      </div>
    `;
  }

  /** @returns 规范化后的当前索引 */
  private _handleIndexOverflow = (): number => {
    if (this.index === this._indicatorNodes.length) {
      return 0;
    } else if (this.index === -1) {
      return this._indicatorNodes.length - 1;
    }

    return this.index;
  };

  /** 渲染指示器项 */
  private _renderIndicatorItems = (): void => {
    const count = this._carouselItems.length;
    const indicatorButtons = Array.from(
      { length: count },
      (_, i) =>
        `<button class='${bem.e("indicator")}' part='indicator' tabindex="1" data-index="${i}"></button>`
    ).join("");

    this._indicatorWrap.innerHTML = html(indicatorButtons);
  };

  /** 初始化轮播项，创建首尾克隆 */
  private _initCarouselItem(): void {
    try {
      const children = this._carouselItems;
      if (children.length === 0) return;

      this._states.originLength = children.length;

      this._cloneItems.forEach(clone => clone.remove());

      const firstChild = children[0].cloneNode(true);
      const lastChild = children[children.length - 1].cloneNode(true);

      (firstChild as HTMLElement).setAttribute("slot", "clone-first");
      (lastChild as HTMLElement).setAttribute("slot", "clone-last");

      this.appendChild(firstChild);
      this.appendChild(lastChild);

      this._setupItemObserver();

      queueMicrotask(() => {
        this._updateCarouselPosition(this.index);
      });
    } catch {
      void 0;
    }
  }

  /** 设置子元素变更观察器 */
  private _setupItemObserver(): void {
    if (this._itemObserver) {
      this._itemObserver.disconnect();
    }

    this._itemObserver = new MutationObserver(mutations => {
      const shouldUpdate = mutations.some(mutation => {
        return (
          mutation.type === "childList" &&
          !!(mutation.target as Element).closest("ea-carousel-item:not([slot])")
        );
      });

      if (shouldUpdate) {
        this._syncClonedItems();
      }
    });

    const items = this._carouselItems;
    items.forEach(item => {
      this._itemObserver!.observe(item, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    });
  }

  /** 同步克隆项内容 */
  private _syncClonedItems(): void {
    const items = this._carouselItems;
    if (items.length === 0) return;

    const firstClone = this.querySelector(
      'ea-carousel-item[slot="clone-first"]'
    );
    const lastClone = this.querySelector('ea-carousel-item[slot="clone-last"]');

    if (firstClone && items[0]) {
      firstClone.innerHTML = html(items[0].innerHTML);
    }

    if (lastClone && items[items.length - 1]) {
      lastClone.innerHTML = html(items[items.length - 1].innerHTML);
    }
  }

  /** @param index 目标索引，默认为 0 */
  private _updateCarouselPosition = (index: number = 0): void => {
    const { width, height } = this._container.getBoundingClientRect();
    const direction = this.direction === "horizontal" ? "X" : "Y";
    const step = this.direction === "horizontal" ? width : height;

    this.style.setProperty(
      "--ea-carousel-transform",
      `translate${direction}(-${(index + 1) * step}px)`
    );

    this._updateIndicatorPosition();
  };

  /** 更新指示器激活状态 */
  private _updateIndicatorPosition = (): void => {
    this._indicatorNodes.forEach((item, index) => {
      item.classList.toggle("is-active", index === this._handleIndexOverflow());
    });
  };

  /** 清除自动播放定时器 */
  private _handleTimerClear(): void {
    if (this._states.timer) {
      clearInterval(this._states.timer);
      this._states.timer = null;
    }
  }

  /** 启动自动播放 */
  private _handleAutoPlay(): void {
    if (!this.autoplay) return;

    this._handleTimerClear();
    this._states.timer = setInterval(this.next, this.interval);
  }

  /** 开启过渡动画 */
  private _turnOnTransition = (): void => {
    void this.clientHeight;
    this.style.removeProperty("--ea-carousel-transition");
  };

  /** 关闭过渡动画 */
  private _turnOffTransition = (): void => {
    this.style.setProperty("--ea-carousel-transition", "none");
    void this.clientHeight;
  };

  /** @param e 鼠标事件 */
  private _onIndicatorHandleEvent = (e: MouseEvent): void => {
    const currentIndicator = (e.target as HTMLElement).closest(
      bem.ce("indicator")
    );
    if (!currentIndicator) return;

    this._indicatorNodes.forEach((indicator, index) => {
      indicator.classList.toggle("is-active", indicator === currentIndicator);
      if (indicator === currentIndicator) {
        this.index = index;
      }
    });
  };

  /** 轮播切换结束事件处理 */
  private _onCarouselChangeEndEvent = (): void => {
    this._turnOffTransition();

    this._handleTimerClear();

    this.index = this._handleIndexOverflow();

    if (this.autoplay && !this._states.isMouseEnter) this._handleAutoPlay();

    timeout(() => {
      this._turnOnTransition();
      this._states.pause = false;
    }, 0);
  };

  /** 箭头显示事件处理 */
  private _onArrowShowEvent = (): void => {
    this._states.isMouseEnter = true;
    if (this.pauseOnHover) this._handleTimerClear();
    this.updateContainerClasslist();
  };

  /** slot 变更事件处理 */
  private _onSlotChangeEvent = (): void => {
    if (!this._isMounted) return;
    if (this._states.isProcessingSlotChange) return;

    this._states.isProcessingSlotChange = true;

    this._turnOffTransition();

    this._handleTimerClear();

    this._states.prevIndex = 0;
    this._states.originLength = 0;
    this._states.pause = false;
    this._states.isEnd = false;

    this.index = 0;

    this._renderIndicatorItems();
    this._initCarouselItem();

    this._updateIndicatorPosition();

    if (this.autoplay) this._handleAutoPlay();

    queueMicrotask(() => {
      this._turnOnTransition();
      this._states.isProcessingSlotChange = false;
    });
  };

  /** 切换到上一项 */
  prev = (): void => {
    if (this._states.pause) return;

    this.index--;
    this._states.pause = true;
  };

  /** 切换到下一项 */
  next = (): void => {
    if (this._states.pause) return;

    this.index++;
    this._states.pause = true;
  };

  @listen("click", ".arrow-left")
  private _onArrowLeftClick(): void {
    if (this.arrow === "never" || this.direction === "vertical") return;
    this.prev();
  }

  @listen("click", ".arrow-right")
  private _onArrowRightClick(): void {
    if (this.arrow === "never" || this.direction === "vertical") return;
    this.next();
  }

  @listen("transitionend", bem.ce("content"))
  private _onTransitionEnd(): void {
    this._onCarouselChangeEndEvent();
  }

  @listen("mouseenter", bem.cb())
  private _onMouseEnter(): void {
    this._onArrowShowEvent();
  }

  @listen("mouseleave", bem.cb())
  private _onMouseLeave(): void {
    if (!this._states.isMouseEnter) return;
    this._states.isMouseEnter = false;
    if (this.pauseOnHover) this._handleAutoPlay();
    this.updateContainerClasslist();
  }

  @listen("mouseover", "shadowRoot")
  private _handleIndicatorHover(e: MouseEvent): void {
    if (this.trigger !== "hover") return;
    if (!(e.target as HTMLElement).closest(bem.ce("indicator"))) return;
    this._onIndicatorHandleEvent(e);
  }

  @listen("click", "shadowRoot")
  private _handleIndicatorClick(e: MouseEvent): void {
    if (this.trigger !== "click") return;
    if (!(e.target as HTMLElement).closest(bem.ce("indicator"))) return;
    this._onIndicatorHandleEvent(e);
  }

  @listen("resize", "window")
  private _handleResize(): void {
    if (this._resizeTimeout) clearTimeout(this._resizeTimeout);
    this._resizeTimeout = setTimeout(() => {
      this._updateCarouselPosition(this.index);
    }, 100);
  }

  @listen("slotchange", "slot:not([name])")
  private _handleSlotChange(): void {
    this._onSlotChangeEvent();
  }

  $mount(): void {
    this.style.setProperty("--ea-carousel-height", this.height);
    this.updateContainerClasslist();

    this._turnOffTransition();
    this._handleTimerClear();

    this._renderIndicatorItems();
    this._initCarouselItem();
    if (this.autoplay) this._handleAutoPlay();

    queueMicrotask(() => {
      this._turnOnTransition();
    });

    this._isMounted = true;
  }

  $beforeUnmount(): void {
    this._handleTimerClear();

    if (this._resizeTimeout) clearTimeout(this._resizeTimeout);

    this._itemObserver?.disconnect();
    this._itemObserver = null;

    this._isMounted = false;
  }
}
