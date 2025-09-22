import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";

export class EaCarousel extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #content;
  /** @type {HTMLElement} */
  #indicatorWrap;

  #states = {
    originLength: 0,
    timer: null,
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
        const length = this.querySelectorAll("ea-carousel-item").length - 1;

        if (newVal < 0) return (this.index = (newVal % length) + length);
        else if (newVal > length)
          return (this.index = (newVal % length) - length);

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

  #renderIndicators = () => {
    const indicators = [
      ...this.shadowRoot.querySelectorAll(".ea-carousel__indicator"),
    ];

    indicators[this.index].classList.add("is-active");
    indicators.forEach((indicator, index) => {
      indicator.addEventListener(this.trigger, () => {
        this.index = index % (this.#states.originLength + 2);

        indicators.forEach((item) => {
          item.classList.remove("is-active");
        });
        indicator.classList.add("is-active");
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
  }

  /**
   * 清除轮播图自动播放
   */
  #handleTimerClear() {
    if (this.#states.timer) clearInterval(this.#states.timer);
  }

  /**
   * 处理轮播图自动播放
   */
  #handleAutoPlay() {
    this.#states.timer = setInterval(() => {
      this.next();
    }, this.duration);
  }

  #turnOnTransition = () => {
    this.style.removeProperty("--ea-carousel-transition");
  };

  #turnOffTransition = () => {
    this.style.setProperty("--ea-carousel-transition", "none");
  };

  /**
   * 上一张轮播图
   */
  prev = () => {
    this.index = (this.index - 1) % this.#states.originLength;
  };

  /**
   * 下一张轮播图
   */
  next() {
    this.index = (this.index + 1) % this.#states.originLength;
  }

  $render() {
    // this.#turnOffTransition();
    const carouselItems = [...this.querySelectorAll("ea-carousel-item")];

    this.shadowRoot.innerHTML = `
      <div class='ea-carousel' part='container'>
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

    this.#renderIndicators();
    this.#initCarouselItem();
  }

  connectedCallback() {
    super.connectedCallback();
    // this.#turnOnTransition();
  }
}

if (!window.customElements.get("ea-carousel")) {
  window.customElements.define("ea-carousel", EaCarousel);
}
