import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";
import { timeout } from "@/utils/timeout";

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

  /** @type {AbortController} */
  #abortController;

  #states = {
    originLength: 0,
    timer: null,
    pause: false,
    isMouseEnter: false,
  };

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "height",
      "index",
      "trigger",
      "autoplay",
      "interval",
      // "indicator-position",
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
        this.className = this.updateContainerClasslist();
      },
    },
    index: {
      type: Number,
      default: 0,
      observer: (newVal) => {
        this.#updateCarouselPosition(newVal);
      },
    },
    trigger: {
      type: ["click", "hover"],
      default: "click",
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
      observer: (newVal) => {},
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
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    return this.computedClasslist("ea-carousel", {
      ["--" + this.direction]: this.direction,
    });
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
      indicator.addEventListener(this.trigger, () => {
        if (this.index === index) return;
        this.index = index;

        indicator.classList.toggle("is-active", index === this.index);
      });
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

    this.#updateCarouselPosition();
  }

  #updateCarouselPosition(index = 0) {
    const { width, height } = this.#container.getBoundingClientRect();
    const direction = this.direction === "horizontal" ? `X` : `Y`;
    const step = this.direction === "horizontal" ? width : height;

    this.style.setProperty(
      "--ea-carousel-transform",
      `translate${direction}(-${(index + 1) * step}px)`
    );

    this.#updataIndicatorPosition();
  }

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
        <section class="ea-carousel__arrow-wrap" part="arrow-wrap">
          <span class="ea-carousel__arrow arrow-left" part="arrow-left">&lt;</span>
          <span class="ea-carousel__arrow arrow-right" part="arrow-right">&gt;</span>
        </section>
        <ul class="ea-carousel__content" part="content">
            <slot></slot>
        </ul>
        <footer class="ea-carousel__indicator-wrap" part="indicator-wrap">
          ${carouselItems
            .map(
              (_) =>
                `<div class='ea-carousel__indicator' part='indicator' tabindex="1"></div>`
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

    this.#renderIndicators();
    this.#initCarouselItem();
    if (this.autoplay) this.#handleAutoPlay();
    this.#arrowLeft.addEventListener("click", this.prev);
    this.#arrowRight.addEventListener("click", this.next);
    this.#container.addEventListener("mouseenter", () => {
      this.#states.isMouseEnter = true;
      this.#handleTimerClear();

      this.#container.addEventListener(
        "mouseleave",
        () => {
          this.#states.isMouseEnter = false;
          this.#handleAutoPlay();
        },
        {
          once: true,
        }
      );
    });
  }

  connectedCallback() {
    super.connectedCallback();
    this.#turnOnTransition();

    this.#content.addEventListener("transitionend", () => {
      this.#turnOffTransition();
      if (this.autoplay && !this.#states.isMouseEnter) this.#handleTimerClear();

      this.index = this.#handleIndexOverflow();

      if (this.autoplay && !this.#states.isMouseEnter) this.#handleAutoPlay();
      this.#turnOnTransition();
      this.#states.pause = false;
    });
  }
}

if (!window.customElements.get("ea-carousel")) {
  window.customElements.define("ea-carousel", EaCarousel);
}
