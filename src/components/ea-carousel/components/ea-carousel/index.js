import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";

export class EaCarousel extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #content;
  /** @type {HTMLElement} */
  #indicatorWrap;

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

        const { width, height } = this.#container.getBoundingClientRect();
        const direction = this.direction === "horizontal" ? `X` : `Y`;
        const step = this.direction === "horizontal" ? width : height;

        this.style.setProperty(
          "--ea-carousel-transform",
          `translate${direction}(-${index * step}px)`
        );

        // TODO: 未完成
        try {
          const indicators = this.#indicatorWrap.querySelectorAll(
            `.ea-carousel-item_indicator`
          );
          indicators.forEach((item) => {
            item.classList.remove("ea-carousel-item_indicator--active");
          });
          indicators[index].classList.add("ea-carousel-item_indicator--active");
        } catch (e) {}
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
        this.index = index;

        indicators.forEach((item) => {
          item.classList.remove("is-active");
        });
        indicator.classList.add("is-active");
      });
    });
  };

  $render() {
    const carouselItems = [...this.querySelectorAll("ea-carousel-item")];

    this.shadowRoot.innerHTML = `
      <div class='ea-carousel' part='container'>
        <div class='ea-carousel__content' part='content'>
            <slot></slot>
        </div>
        <div class='ea-carousel__indicator-wrap' part='indicator-wrap'>
          ${carouselItems
            .map(
              (item) =>
                `<div class='ea-carousel__indicator' part='indicator' tabindex="1"></div>`
            )
            .join("")}
        </div>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-carousel");
    this.#content = this.shadowRoot.querySelector(".ea-carousel__content");
    this.#indicatorWrap = this.shadowRoot.querySelector(
      ".ea-carousel__indicator-wrap"
    );

    this.#renderIndicators();
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

if (!window.customElements.get("ea-carousel")) {
  window.customElements.define("ea-carousel", EaCarousel);
}
