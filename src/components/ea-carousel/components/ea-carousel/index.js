import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";

export class EaCarousel extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #content;
  /** @type {HTMLElement} */
  #arrowLeft;
  /** @type {HTMLElement} */
  #arrowRight;
  /** @type {HTMLElement} */
  #indicatorWrap;
  /** @type {HTMLElement[]} */
  #indicators = [];
  /** @type {HTMLElement[]} */
  #carouselItems;

  /** @type {AbortController} */
  #abortController;

  #states = {
    prevIndex: 0,
    originLength: 0,
    timer: null,
    pause: false,
    isMouseEnter: false,
    isEnd: false,
  };

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "height",
      "index",
      "trigger",
      "autoplay",
      "interval",
      "indicator-position",
      "arrow",
      // "type",
      // "card-scale",
      "loop",
      "direction",
      "pause-on-hover",
      // "motion-blur",
    ];
  }

  state = this.properties({
    height: {
      type: String,
      default: "100%",
      observer: (value) => {
        this.style.setProperty("--ea-carousel-height", value);
      },
    },
    direction: {
      type: ["horizontal", "vertical"],
      default: "horizontal",
      observer: (newVal) => {
        this.#container.className = this.updateContainerClasslist();
      },
    },
    index: {
      type: Number,
      default: 0,
      observer: (newVal, oldVal) => {
        this.#updateCarouselPosition(newVal);
        if (this.#states.isEnd) return (this.#states.isEnd = false);

        /**
         * 因为是通过前后各添加最后和最前的元素来实现的轮播图，
         * 所以会出现 length 和 -1 的index值（transitionend事件处理）
         * 同时还会导致到达这两个值时，会多触发一次不必要且数值错误的事件派发
         * 所以借助 isEnd 来做一个状态锁，来确保轮播图正常切换和仅派发正确值
         */
        if (newVal < 0) {
          newVal = this.#indicators.length - 1;
          oldVal = 0;
          this.#states.isEnd = true;
        } else if (newVal > this.#indicators.length - 1) {
          oldVal = this.#indicators.length - 1;
          newVal = 0;
          this.#states.isEnd = true;
        }

        this.#states.prevIndex = oldVal;

        this.dispatchEvent("change", {
          detail: {
            current: newVal,
            prev: oldVal,
          },
        });
      },
    },
    trigger: {
      type: ["click", "hover"],
      default: "hover",
      observer: (newVal) => {},
    },
    interval: {
      type: Number,
      default: 3000,
      observer: (newVal) => {},
    },
    arrow: {
      type: ["never", "always", "hover"],
      default: "hover",
      observer: (newVal) => {
        this.#container.className = this.updateContainerClasslist();
      },
    },
    autoplay: {
      type: Boolean,
      default: true,
      observer: (newVal) => {},
    },
    loop: {
      type: Boolean,
      default: true,
      observer: (newVal) => {},
    },
    "pause-on-hover": {
      type: Boolean,
      default: true,
      observer: (newVal) => {},
    },
    "indicator-position": {
      type: ["", "none", "outside"],
      default: "",
      observer: (newVal) => {
        this.#container.className = this.updateContainerClasslist();
      },
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    return this.computedClasslist(
      "ea-carousel",
      {
        ["--" + this.direction]: this.direction,
      },
      {
        ["arrow-" + this.arrow]:
          this.arrow === "always" ||
          this.arrow === "never" ||
          this.#states.isMouseEnter,
        [this["indicator-position"] + "-indicator"]: this["indicator-position"],
      }
    );
  }

  constructor() {
    super();

    this.stylesheet = stylesheet;

    this.$render();
  }

  #handleIndexOverflow = () => {
    if (this.index === this.#indicators.length) {
      return 0;
    } else if (this.index === -1) {
      return this.#indicators.length - 1;
    }

    return this.index;
  };

  #renderIndicators = () => {
    const indicators = [
      ...this.shadowRoot.querySelectorAll(".ea-carousel__indicator"),
    ];

    indicators[this.index].classList.add("is-active");
    indicators.forEach((indicator, index) => {
      indicator.addEventListener(
        this.trigger === "hover" ? "mouseenter" : "click",
        () => {
          if (this.index === index) return;
          this.index = index;

          indicator.classList.toggle("is-active", index === this.index);
        }
      );
    });
  };

  /**
   * 初始化 `轮播图元素` 结构
   */
  #initCarouselItem() {
    Array.from(this.childNodes).forEach((item) => {
      if (item.tagName !== "EA-CAROUSEL-ITEM") item.remove();
    });

    const children = this.children;
    const firstChild = children[0].cloneNode(true);
    const lastChild = children[children.length - 1].cloneNode(true);
    this.#states.originLength = children.length;

    this.insertBefore(lastChild, this.firstChild);
    this.appendChild(firstChild);

    queueMicrotask(() => {
      this.#updateCarouselPosition();
    });
  }

  #updateCarouselPosition = (index = 0) => {
    const { width, height } = this.#container.getBoundingClientRect();
    const direction = this.direction === "horizontal" ? `X` : `Y`;
    const step = this.direction === "horizontal" ? width : height;

    this.style.setProperty(
      "--ea-carousel-transform",
      `translate${direction}(-${(index + 1) * step}px)`
    );

    this.#updataIndicatorPosition();
  };

  #updataIndicatorPosition = () => {
    this.#indicators.forEach((item, index) => {
      item.classList.toggle("is-active", index === this.#handleIndexOverflow());
    });
  };

  /**
   * 清除轮播图自动播放
   */
  #handleTimerClear() {
    if (this.#states.timer) {
      clearInterval(this.#states.timer);
      this.#states.timer = null;
    }
  }

  /**
   * 处理轮播图自动播放
   */
  #handleAutoPlay() {
    if (!this.autoplay) return;

    this.#states.timer = setInterval(this.next, this.interval);
  }

  #turnOnTransition = () => {
    void this.clientHeight;
    this.style.removeProperty("--ea-carousel-transition");
  };

  #turnOffTransition = () => {
    this.style.setProperty("--ea-carousel-transition", "none");
  };

  /**
   * 上一张轮播图
   */
  prev = () => {
    if (this.#states.pause) return;

    this.index--;
    this.#states.pause = true;
  };

  /**
   * 下一张轮播图
   */
  next = () => {
    if (this.#states.pause) return;

    this.index++;
    this.#states.pause = true;
  };

  $render() {
    this.#turnOffTransition();
    const carouselItems = [...this.querySelectorAll("ea-carousel-item")];

    this.shadowRoot.innerHTML = `
      <div class='ea-carousel' part='container'>
        <button class="ea-carousel__arrow arrow-left" part="arrow-left">
          <ea-icon icon="icon-angle-left" part="arrow-left-icon"></ea-icon>
        </button>
        <button class="ea-carousel__arrow arrow-right" part="arrow-right">
          <ea-icon icon="icon-angle-right" part="arrow-right-icon"></ea-icon>
        </button>
        <ul class="ea-carousel__content" part="content">
            <slot></slot>
        </ul>
        <footer class="ea-carousel__indicator-wrap" part="indicator-wrap">
          ${carouselItems
            .map(
              (_) =>
                `<button class='ea-carousel__indicator' part='indicator' tabindex="1"></button>`
            )
            .join("")}
        </footer>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-carousel");
    this.#content = this.shadowRoot.querySelector(".ea-carousel__content");
    this.#indicatorWrap = this.shadowRoot.querySelector(
      ".ea-carousel__indicator-wrap"
    );
    this.#arrowLeft = this.shadowRoot.querySelector(
      ".ea-carousel__arrow.arrow-left"
    );
    this.#arrowRight = this.shadowRoot.querySelector(
      ".ea-carousel__arrow.arrow-right"
    );
    this.#indicators = [
      ...this.shadowRoot.querySelectorAll(".ea-carousel__indicator"),
    ];
    this.#carouselItems = carouselItems;

    this.#renderIndicators();
    this.#initCarouselItem();
    this.#handleAutoPlay();
  }

  connectedCallback() {
    super.connectedCallback();

    this.#abortController = new AbortController();

    this.#container.className = this.updateContainerClasslist();
    this.#content.addEventListener(
      "transitionend",
      () => {
        this.#turnOffTransition();
        if (this.autoplay && !this.#states.isMouseEnter)
          this.#handleTimerClear();

        this.index = this.#handleIndexOverflow();

        if (this.autoplay && !this.#states.isMouseEnter) this.#handleAutoPlay();
        this.#turnOnTransition();
        this.#states.pause = false;
      },
      { signal: this.#abortController.signal }
    );

    if (this.arrow !== "never" && this.direction !== "vertical") {
      this.#arrowLeft.addEventListener("click", this.prev, {
        signal: this.#abortController.signal,
      });

      this.#arrowRight.addEventListener("click", this.next, {
        signal: this.#abortController.signal,
      });
    }

    this.#container.addEventListener(
      "mouseenter",
      () => {
        this.#states.isMouseEnter = true;
        if (this["pause-on-hover"]) this.#handleTimerClear();
        this.#container.className = this.updateContainerClasslist();

        this.#container.addEventListener(
          "mouseleave",
          () => {
            this.#states.isMouseEnter = false;
            if (this["pause-on-hover"]) this.#handleAutoPlay();
            this.#container.className = this.updateContainerClasslist();
          },
          {
            signal: this.#abortController.signal,
            once: true,
          }
        );
      },
      {
        signal: this.#abortController.signal,
      }
    );

    window.addEventListener(
      "resize",
      () => {
        this.#updateCarouselPosition(this.index);
      },
      { signal: this.#abortController.signal }
    );

    queueMicrotask(() => {
      this.#turnOnTransition();
    });
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
  }
}

if (!window.customElements.get("ea-carousel")) {
  window.customElements.define("ea-carousel", EaCarousel);
}
