import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import { listen } from "@decorator/listen";
import { Enum } from "@/utils/Enum";
import stylesheet from "./index.scss?inline";
import { timeout } from "@/utils/timeout";

const TAG_NAME = "ea-carousel" as const;
const bem = createBEM(TAG_NAME);

export type DirectionType = "horizontal" | "vertical";
export type TriggerType = "click" | "hover";
export type ArrowType = "never" | "always" | "hover";
export type IndicatorPositionType = "" | "none" | "outside";

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaCarousel extends EaBase {
  @query(".ea-carousel")
  private _container!: HTMLElement;

  @query(".ea-carousel__content")
  private _content!: HTMLElement;

  @query(".ea-carousel__indicator-wrap")
  private _indicatorWrap!: HTMLElement;

  private _indicators: HTMLElement[] = [];

  private _abortController?: AbortController | null;

  private _abortControllers: Record<string, AbortController> = {
    triggerAbortControllers: new AbortController(),
  };

  private _itemObserver: MutationObserver | null = null;

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
        emittedNewVal = this._indicators.length - 1;
        emittedOldVal = 0;
        this._states.isEnd = true;
      } else if (newVal > this._indicators.length - 1) {
        emittedOldVal = this._indicators.length - 1;
        emittedNewVal = 0;
        this._states.isEnd = true;
      }

      this._states.prevIndex = emittedOldVal;

      this.emit("change", {
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
    observer(this: EaCarousel, newVal: TriggerType) {
      this._abortControllers.triggerAbortControllers?.abort();
      this._abortControllers.triggerAbortControllers = new AbortController();

      this._indicatorWrap.addEventListener(
        newVal === "hover" ? "mouseover" : "click",
        this._onIndicatorHandleEvent,
        {
          signal: this._abortControllers.triggerAbortControllers.signal,
        }
      );
    },
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

  html(): string {
    return `
      <div class='ea-carousel' part='container'>
        <button class="ea-carousel__arrow arrow-left" part="arrow-left">
          <ea-icon name="angle-left" part="arrow-left-icon"></ea-icon>
        </button>
        <button class="ea-carousel__arrow arrow-right" part="arrow-right">
          <ea-icon name="angle-right" part="arrow-right-icon"></ea-icon>
        </button>
        <ul class="ea-carousel__content" part="content">
            <slot name="clone-last"></slot>
            <slot></slot>
            <slot name="clone-first"></slot>
        </ul>
        <footer class="ea-carousel__indicator-wrap" part="indicator-wrap">
        </footer>
      </div>
    `;
  }

  private _handleIndexOverflow = (): number => {
    if (this.index === this._indicators.length) {
      return 0;
    } else if (this.index === -1) {
      return this._indicators.length - 1;
    }

    return this.index;
  };

  private _renderIndicatorItems = (): void => {
    const carouselItems = Array.from(
      this.querySelectorAll("ea-carousel-item:not([slot])"),
      (_el, i) =>
        `<button class='ea-carousel__indicator' part='indicator' tabindex="1" data-index="${i}"></button>`
    ).join("");

    this._indicatorWrap.innerHTML = carouselItems;

    this._indicators = [
      ...this._indicatorWrap.querySelectorAll(".ea-carousel__indicator"),
    ] as HTMLElement[];
  };

  private _initCarouselItem(): void {
    try {
      const children = this.querySelectorAll("ea-carousel-item:not([slot])");
      if (children.length === 0) return;

      this._states.originLength = children.length;

      const existingClones = this.querySelectorAll(
        'ea-carousel-item[slot^="clone-"]'
      );
      existingClones.forEach(clone => clone.remove());

      const firstChild = children[0].cloneNode(true);
      const lastChild = children[children.length - 1].cloneNode(true);

      (firstChild as HTMLElement).setAttribute("slot", "clone-first");
      (lastChild as HTMLElement).setAttribute("slot", "clone-last");

      this.appendChild(firstChild);
      this.appendChild(lastChild);

      this._setupItemObserver();

      queueMicrotask(() => {
        this._updateCarouselPosition();
      });
    } catch {
      void 0;
    }
  }

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

    const items = this.querySelectorAll("ea-carousel-item:not([slot])");
    items.forEach(item => {
      this._itemObserver!.observe(item, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    });
  }

  private _syncClonedItems(): void {
    const items = this.querySelectorAll("ea-carousel-item:not([slot])");
    if (items.length === 0) return;

    const firstClone = this.querySelector(
      'ea-carousel-item[slot="clone-first"]'
    );
    const lastClone = this.querySelector('ea-carousel-item[slot="clone-last"]');

    if (firstClone && items[0]) {
      firstClone.innerHTML = items[0].innerHTML;
    }

    if (lastClone && items[items.length - 1]) {
      lastClone.innerHTML = items[items.length - 1].innerHTML;
    }
  }

  private _updateCarouselPosition = (index: number = 0): void => {
    const { width, height } = this._container.getBoundingClientRect();
    const direction = this.direction === "horizontal" ? "X" : "Y";
    const step = this.direction === "horizontal" ? width : height;

    this.style.setProperty(
      "--ea-carousel-transform",
      `translate${direction}(-${(index + 1) * step}px)`
    );

    this._updataIndicatorPosition();
  };

  private _updataIndicatorPosition = (): void => {
    this._indicators.forEach((item, index) => {
      item.classList.toggle("is-active", index === this._handleIndexOverflow());
    });
  };

  private _handleTimerClear(): void {
    if (this._states.timer) {
      clearInterval(this._states.timer);
      this._states.timer = null;
    }
  }

  private _handleAutoPlay(): void {
    if (!this.autoplay) return;

    this._handleTimerClear();
    this._states.timer = setInterval(this.next, this.interval);
  }

  private _turnOnTransition = (): void => {
    void this.clientHeight;
    this.style.removeProperty("--ea-carousel-transition");
  };

  private _turnOffTransition = (): void => {
    this.style.setProperty("--ea-carousel-transition", "none");
    void this.clientHeight;
  };

  private _onIndicatorHandleEvent = (e: MouseEvent): void => {
    const indicators = this._indicatorWrap.querySelectorAll(
      ".ea-carousel__indicator"
    );
    const currentIndicator = (e.target as HTMLElement).closest(
      ".ea-carousel__indicator"
    );
    if (!currentIndicator) return;

    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("is-active", indicator === currentIndicator);
      if (indicator === currentIndicator) {
        this.index = index;
      }
    });
  };

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

  private _onArrowShowEvent = (): void => {
    const onArrowHideEvent = (): void => {
      this._states.isMouseEnter = false;
      if (this.pauseOnHover) this._handleAutoPlay();
      this.updateContainerClasslist();
    };

    this._states.isMouseEnter = true;
    if (this.pauseOnHover) this._handleTimerClear();
    this.updateContainerClasslist();

    this._container.addEventListener("mouseleave", onArrowHideEvent, {
      signal: this._abortController!.signal,
      once: true,
    });
  };

  private _onCarouselResizeEvent = (): {
    listener: () => void;
    unsetHandler: () => void;
  } => {
    let resizeTimeout: ReturnType<typeof setTimeout> | null = null;

    return {
      listener: (): void => {
        if (resizeTimeout) clearTimeout(resizeTimeout);
        resizeTimeout = null;
        resizeTimeout = setTimeout(() => {
          this._updateCarouselPosition(this.index);
        }, 100);
      },
      unsetHandler: (): void => {
        if (resizeTimeout) clearTimeout(resizeTimeout);
        resizeTimeout = null;
      },
    };
  };

  private _resizeHandler: {
    listener: () => void;
    unsetHandler: () => void;
  } | null = null;

  private _onSlotChangeEvent = (): void => {
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

    this._updataIndicatorPosition();

    if (this.autoplay) this._handleAutoPlay();

    queueMicrotask(() => {
      this._turnOnTransition();
      this._states.isProcessingSlotChange = false;
    });
  };

  prev = (): void => {
    if (this._states.pause) return;

    this.index--;
    this._states.pause = true;
  };

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

  @listen("transitionend", ".ea-carousel__content")
  private _onTransitionEnd(): void {
    this._onCarouselChangeEndEvent();
  }

  @listen("mouseenter", ".ea-carousel")
  private _onMouseEnter(): void {
    this._onArrowShowEvent();
  }

  $mount(): void {
    this._abortController?.abort();
    this._abortController = new AbortController();
    for (const key in this._abortControllers) {
      this._abortControllers[key]?.abort();
      this._abortControllers[key] = new AbortController();
    }

    this.style.setProperty("--ea-carousel-height", this.height);
    this.updateContainerClasslist();

    this._turnOffTransition();
    this._handleTimerClear();

    this._renderIndicatorItems();
    this._initCarouselItem();
    if (this.autoplay) this._handleAutoPlay();

    this._indicatorWrap.addEventListener(
      this.trigger === "hover" ? "mouseover" : "click",
      this._onIndicatorHandleEvent,
      {
        signal: this._abortControllers.triggerAbortControllers.signal,
      }
    );

    this._resizeHandler = this._onCarouselResizeEvent();
    window.addEventListener("resize", this._resizeHandler.listener, {
      signal: this._abortController.signal,
    });

    this._content
      .querySelector("slot:not([name])")
      ?.addEventListener("slotchange", this._onSlotChangeEvent, {
        signal: this._abortController.signal,
      });

    queueMicrotask(() => {
      this._turnOnTransition();
    });
  }

  $beforeUnmount(): void {
    this._abortController?.abort();

    for (const key in this._abortControllers) {
      this._abortControllers[key]?.abort();
    }

    this._resizeHandler?.unsetHandler();

    this._itemObserver?.disconnect();
    this._itemObserver = null;
  }
}
