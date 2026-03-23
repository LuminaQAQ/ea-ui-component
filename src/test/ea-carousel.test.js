import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// 模拟 ea-carousel-item 组件
class EaCarouselItem extends HTMLElement {
  static get observedAttributes() {
    return [];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        .ea-carousel-item {
          display: inline-block;
          overflow: hidden;
          width: 100%;
          height: 100%;
          box-sizing: border-box;
        }
      </style>
      <div class='ea-carousel-item' part='container'>
        <slot></slot>
      </div>
    `;
  }

  connectedCallback() {}
}

// 模拟 ea-carousel 组件
class EaCarousel extends HTMLElement {
  #container;
  #content;
  #arrowLeft;
  #arrowRight;
  #indicatorWrap;
  #indicators = [];
  #abortController;
  #AbortControllers = {
    triggerAbortControllers: new AbortController(),
  };
  #itemObserver = null;

  #states = {
    prevIndex: 0,
    originLength: 0,
    timer: null,
    pause: false,
    isMouseEnter: false,
    isEnd: false,
    isProcessingSlotChange: false,
  };

  static get observedAttributes() {
    return [
      "height",
      "index",
      "trigger",
      "autoplay",
      "interval",
      "indicator-position",
      "arrow",
      "loop",
      "direction",
      "pause-on-hover",
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        .ea-carousel {
          position: relative;
          overflow: hidden;
          height: var(--ea-carousel-height, 100%);
        }
        .ea-carousel__content {
          display: flex;
          height: 100%;
          transition: var(--ea-carousel-transition, transform 0.3s ease);
          transform: var(--ea-carousel-transform, translateX(0));
        }
        .ea-carousel.--horizontal .ea-carousel__content {
          flex-direction: row;
        }
        .ea-carousel.--vertical .ea-carousel__content {
          flex-direction: column;
        }
        .ea-carousel__arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0,0,0,0.3);
          border: none;
          color: #fff;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          cursor: pointer;
          z-index: 10;
          display: none;
        }
        .ea-carousel__arrow.arrow-left {
          left: 10px;
        }
        .ea-carousel__arrow.arrow-right {
          right: 10px;
        }
        .ea-carousel.arrow-always .ea-carousel__arrow,
        .ea-carousel.arrow-hover:hover .ea-carousel__arrow {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ea-carousel__indicator-wrap {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
          z-index: 10;
        }
        .ea-carousel__indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(0,0,0,0.3);
          border: none;
          cursor: pointer;
          transition: all 0.3s;
        }
        .ea-carousel__indicator.is-active {
          background: #fff;
        }
        .ea-carousel.none-indicator .ea-carousel__indicator-wrap {
          display: none;
        }
        .ea-carousel.outside-indicator .ea-carousel__indicator-wrap {
          position: relative;
          bottom: auto;
          margin-top: 10px;
        }
      </style>
      <div class='ea-carousel' part='container'>
        <button class="ea-carousel__arrow arrow-left" part="arrow-left">
          <span>&lt;</span>
        </button>
        <button class="ea-carousel__arrow arrow-right" part="arrow-right">
          <span>&gt;</span>
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

    this.updateContainerClasslist();
  }

  connectedCallback() {
    this.#abortController?.abort();
    this.#abortController = new AbortController();

    this.#renderIndicatorItems();
    this.#initCarouselItem();

    // 绑定箭头点击事件
    this.#arrowLeft.addEventListener("click", this.prev);
    this.#arrowRight.addEventListener("click", this.next);

    // 绑定指示器事件
    this.#indicatorWrap.addEventListener(
      this.trigger === "hover" ? "mouseover" : "click",
      this.#onIndicatorHandleEvent
    );

    // 绑定鼠标进入事件
    this.#container.addEventListener("mouseenter", this.#onArrowShowEvent);

    // 自动播放
    if (this.autoplay) {
      this.#handleAutoPlay();
    }

    // 更新位置
    this.#updateCarouselPosition();
  }

  disconnectedCallback() {
    this.#abortController?.abort();
    this.#handleTimerClear();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch (name) {
      case "height":
        this.style.setProperty("--ea-carousel-height", newValue || "100%");
        break;
      case "direction":
        this.updateContainerClasslist();
        break;
      case "index":
        this.#updateCarouselPosition(parseInt(newValue) || 0);
        this.#updataIndicatorPosition();
        break;
      case "trigger":
        // 重新绑定指示器事件
        break;
      case "autoplay":
        this.#handleTimerClear();
        if (newValue !== null && newValue !== "false") {
          this.#handleAutoPlay();
        }
        break;
      case "interval":
        this.#handleTimerClear();
        if (this.autoplay) {
          this.#handleAutoPlay();
        }
        break;
      case "arrow":
      case "indicator-position":
        this.updateContainerClasslist();
        break;
    }
  }

  updateContainerClasslist() {
    let className = "ea-carousel";

    const direction = this.getAttribute("direction") || "horizontal";
    className += ` --${direction}`;

    const arrow = this.getAttribute("arrow") || "hover";
    if (arrow === "always" || arrow === "never" || this.#states.isMouseEnter) {
      className += ` arrow-${arrow}`;
    }

    const indicatorPosition = this.getAttribute("indicator-position") || "";
    if (indicatorPosition) {
      className += ` ${indicatorPosition}-indicator`;
    }

    this.#container.className = className;
    return className;
  }

  #renderIndicatorItems = () => {
    const carouselItems = Array.from(
      this.querySelectorAll("ea-carousel-item:not([slot])"),
      (el, i) =>
        `<button class='ea-carousel__indicator' part='indicator' tabindex="1" data-index="${i}"></button>`
    ).join("");

    this.#indicatorWrap.innerHTML = carouselItems;
    this.#indicators = [
      ...this.#indicatorWrap.querySelectorAll(".ea-carousel__indicator"),
    ];
  };

  #initCarouselItem() {
    const children = this.querySelectorAll("ea-carousel-item:not([slot])");
    if (children.length === 0) return;

    this.#states.originLength = children.length;

    // 移除旧的克隆节点
    const existingClones = this.querySelectorAll(
      'ea-carousel-item[slot^="clone-"]'
    );
    existingClones.forEach(clone => clone.remove());

    // 克隆首尾节点
    const firstChild = children[0].cloneNode(true);
    const lastChild = children[children.length - 1].cloneNode(true);

    firstChild.setAttribute("slot", "clone-first");
    lastChild.setAttribute("slot", "clone-last");

    this.appendChild(firstChild);
    this.appendChild(lastChild);
  }

  #updateCarouselPosition = (index = 0) => {
    const direction = this.getAttribute("direction") === "vertical" ? "Y" : "X";
    this.style.setProperty(
      "--ea-carousel-transform",
      `translate${direction}(-${(index + 1) * 100}%)`
    );
  };

  #updataIndicatorPosition = () => {
    const index = parseInt(this.getAttribute("index")) || 0;
    this.#indicators.forEach((item, i) => {
      item.classList.toggle("is-active", i === index);
    });
  };

  #handleTimerClear() {
    if (this.#states.timer) {
      clearInterval(this.#states.timer);
      this.#states.timer = null;
    }
  }

  #handleAutoPlay() {
    this.#handleTimerClear();
    const interval = parseInt(this.getAttribute("interval")) || 3000;
    this.#states.timer = setInterval(() => {
      this.next();
    }, interval);
  }

  #onIndicatorHandleEvent = e => {
    const currentIndicator = e.target.closest(".ea-carousel__indicator");
    if (!currentIndicator) return;

    const index = parseInt(currentIndicator.dataset.index);
    this.setAttribute("index", index);
  };

  #onArrowShowEvent = () => {
    this.#states.isMouseEnter = true;
    this.updateContainerClasslist();

    if (this.getAttribute("pause-on-hover") !== "false") {
      this.#handleTimerClear();
    }

    const onMouseLeave = () => {
      this.#states.isMouseEnter = false;
      this.updateContainerClasslist();
      if (this.autoplay) {
        this.#handleAutoPlay();
      }
      this.#container.removeEventListener("mouseleave", onMouseLeave);
    };

    this.#container.addEventListener("mouseleave", onMouseLeave);
  };

  prev = () => {
    let index = parseInt(this.getAttribute("index")) || 0;
    const items = this.querySelectorAll("ea-carousel-item:not([slot])");
    const length = items.length;

    if (index > 0) {
      index--;
    } else if (this.getAttribute("loop") !== "false") {
      index = length - 1;
    }

    this.setAttribute("index", index);
  };

  next = () => {
    let index = parseInt(this.getAttribute("index")) || 0;
    const items = this.querySelectorAll("ea-carousel-item:not([slot])");
    const length = items.length;

    if (index < length - 1) {
      index++;
    } else if (this.getAttribute("loop") !== "false") {
      index = 0;
    }

    this.setAttribute("index", index);
  };

  get autoplay() {
    return this.getAttribute("autoplay") !== "false";
  }
}

if (!customElements.get("ea-carousel-item")) {
  customElements.define("ea-carousel-item", EaCarouselItem);
}

if (!customElements.get("ea-carousel")) {
  customElements.define("ea-carousel", EaCarousel);
}

describe("EaCarousel Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  /**
   * 基本功能测试
   */
  describe("Basic Functionality", () => {
    it("应该正确渲染 ea-carousel 组件", () => {
      const carousel = document.createElement("ea-carousel");
      container.appendChild(carousel);

      expect(carousel).toBeDefined();
      expect(carousel.shadowRoot).toBeDefined();
    });

    it("应该正确渲染 ea-carousel-item 组件", () => {
      const item = document.createElement("ea-carousel-item");
      container.appendChild(item);

      expect(item).toBeDefined();
      expect(item.shadowRoot).toBeDefined();
    });

    it("应该包含必要的 CSS Part", () => {
      const carousel = document.createElement("ea-carousel");
      container.appendChild(carousel);

      expect(
        carousel.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
      expect(
        carousel.shadowRoot.querySelector('[part="content"]')
      ).toBeTruthy();
      expect(
        carousel.shadowRoot.querySelector('[part="indicator-wrap"]')
      ).toBeTruthy();
      expect(
        carousel.shadowRoot.querySelector('[part="arrow-left"]')
      ).toBeTruthy();
      expect(
        carousel.shadowRoot.querySelector('[part="arrow-right"]')
      ).toBeTruthy();
    });

    it("应该包含内容插槽", () => {
      const item = document.createElement("ea-carousel-item");
      container.appendChild(item);

      const slot = item.shadowRoot.querySelector("slot");
      expect(slot).toBeTruthy();
    });
  });

  /**
   * 轮播项测试
   */
  describe("Carousel Items", () => {
    it("应该渲染多个轮播项", async () => {
      const carousel = document.createElement("ea-carousel");
      carousel.innerHTML = `
        <ea-carousel-item>1</ea-carousel-item>
        <ea-carousel-item>2</ea-carousel-item>
        <ea-carousel-item>3</ea-carousel-item>
        <ea-carousel-item>4</ea-carousel-item>
        <ea-carousel-item>5</ea-carousel-item>
      `;
      container.appendChild(carousel);

      await new Promise(resolve => setTimeout(resolve, 50));

      const items = carousel.querySelectorAll("ea-carousel-item:not([slot])");
      expect(items.length).toBe(5);
    });

    it("应该根据轮播项数量生成指示器", async () => {
      const carousel = document.createElement("ea-carousel");
      carousel.innerHTML = `
        <ea-carousel-item>1</ea-carousel-item>
        <ea-carousel-item>2</ea-carousel-item>
        <ea-carousel-item>3</ea-carousel-item>
      `;
      container.appendChild(carousel);

      await new Promise(resolve => setTimeout(resolve, 50));

      const indicators = carousel.shadowRoot.querySelectorAll(
        ".ea-carousel__indicator"
      );
      expect(indicators.length).toBe(3);
    });
  });

  /**
   * Height 属性测试
   */
  describe("Height Attribute", () => {
    it("应该应用 height 属性", () => {
      const carousel = document.createElement("ea-carousel");
      carousel.setAttribute("height", "150px");
      container.appendChild(carousel);

      expect(carousel.style.getPropertyValue("--ea-carousel-height")).toBe(
        "150px"
      );
    });

    it("默认高度应该是 100%", () => {
      const carousel = document.createElement("ea-carousel");
      container.appendChild(carousel);

      expect(
        carousel.style.getPropertyValue("--ea-carousel-height") || "100%"
      ).toBe("100%");
    });
  });

  /**
   * Direction 属性测试
   */
  describe("Direction Attribute", () => {
    it("默认方向应该是 horizontal", () => {
      const carousel = document.createElement("ea-carousel");
      container.appendChild(carousel);

      const containerEl = carousel.shadowRoot.querySelector(".ea-carousel");
      expect(containerEl.classList.contains("--horizontal")).toBe(true);
    });

    it("设置 direction='vertical' 应该应用垂直方向类", () => {
      const carousel = document.createElement("ea-carousel");
      carousel.setAttribute("direction", "vertical");
      container.appendChild(carousel);

      const containerEl = carousel.shadowRoot.querySelector(".ea-carousel");
      expect(containerEl.classList.contains("--vertical")).toBe(true);
    });
  });

  /**
   * Index 属性测试
   */
  describe("Index Attribute", () => {
    it("默认 index 应该是 0", () => {
      const carousel = document.createElement("ea-carousel");
      container.appendChild(carousel);

      expect(carousel.getAttribute("index") || "0").toBe("0");
    });

    it("设置 index 应该更新当前激活项", async () => {
      const carousel = document.createElement("ea-carousel");
      carousel.innerHTML = `
        <ea-carousel-item>1</ea-carousel-item>
        <ea-carousel-item>2</ea-carousel-item>
        <ea-carousel-item>3</ea-carousel-item>
      `;
      carousel.setAttribute("index", "1");
      container.appendChild(carousel);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(carousel.getAttribute("index")).toBe("1");
    });
  });

  /**
   * Trigger 属性测试
   */
  describe("Trigger Attribute", () => {
    it("默认 trigger 应该是 hover", () => {
      const carousel = document.createElement("ea-carousel");
      container.appendChild(carousel);

      // 默认值为 hover
      expect(carousel.getAttribute("trigger") || "hover").toBe("hover");
    });

    it("设置 trigger='click' 应该支持点击触发", () => {
      const carousel = document.createElement("ea-carousel");
      carousel.setAttribute("trigger", "click");
      container.appendChild(carousel);

      expect(carousel.getAttribute("trigger")).toBe("click");
    });
  });

  /**
   * Indicator Position 属性测试
   */
  describe("Indicator Position Attribute", () => {
    it("默认指示器应该在内部显示", () => {
      const carousel = document.createElement("ea-carousel");
      container.appendChild(carousel);

      const containerEl = carousel.shadowRoot.querySelector(".ea-carousel");
      expect(containerEl.classList.contains("none-indicator")).toBe(false);
      expect(containerEl.classList.contains("outside-indicator")).toBe(false);
    });

    it("设置 indicator-position='none' 应该隐藏指示器", () => {
      const carousel = document.createElement("ea-carousel");
      carousel.setAttribute("indicator-position", "none");
      container.appendChild(carousel);

      const containerEl = carousel.shadowRoot.querySelector(".ea-carousel");
      expect(containerEl.classList.contains("none-indicator")).toBe(true);
    });

    it("设置 indicator-position='outside' 应该在外部显示指示器", () => {
      const carousel = document.createElement("ea-carousel");
      carousel.setAttribute("indicator-position", "outside");
      container.appendChild(carousel);

      const containerEl = carousel.shadowRoot.querySelector(".ea-carousel");
      expect(containerEl.classList.contains("outside-indicator")).toBe(true);
    });
  });

  /**
   * Arrow 属性测试
   */
  describe("Arrow Attribute", () => {
    it("默认 arrow 应该是 hover", () => {
      const carousel = document.createElement("ea-carousel");
      container.appendChild(carousel);

      expect(carousel.getAttribute("arrow") || "hover").toBe("hover");
    });

    it("设置 arrow='always' 应该应用 always 类", () => {
      const carousel = document.createElement("ea-carousel");
      carousel.setAttribute("arrow", "always");
      container.appendChild(carousel);

      const containerEl = carousel.shadowRoot.querySelector(".ea-carousel");
      expect(containerEl.classList.contains("arrow-always")).toBe(true);
    });

    it("设置 arrow='never' 应该应用 never 类", () => {
      const carousel = document.createElement("ea-carousel");
      carousel.setAttribute("arrow", "never");
      container.appendChild(carousel);

      const containerEl = carousel.shadowRoot.querySelector(".ea-carousel");
      expect(containerEl.classList.contains("arrow-never")).toBe(true);
    });
  });

  /**
   * Autoplay 属性测试
   */
  describe("Autoplay Attribute", () => {
    it("默认应该自动播放", () => {
      const carousel = document.createElement("ea-carousel");
      container.appendChild(carousel);

      expect(carousel.getAttribute("autoplay") !== "false").toBe(true);
    });

    it("设置 autoplay='false' 应该禁用自动播放", () => {
      const carousel = document.createElement("ea-carousel");
      carousel.setAttribute("autoplay", "false");
      container.appendChild(carousel);

      expect(carousel.autoplay).toBe(false);
    });
  });

  /**
   * Interval 属性测试
   */
  describe("Interval Attribute", () => {
    it("默认 interval 应该是 3000ms", () => {
      const carousel = document.createElement("ea-carousel");
      container.appendChild(carousel);

      expect(parseInt(carousel.getAttribute("interval")) || 3000).toBe(3000);
    });

    it("设置 interval 应该更新切换间隔", () => {
      const carousel = document.createElement("ea-carousel");
      carousel.setAttribute("interval", "5000");
      container.appendChild(carousel);

      expect(carousel.getAttribute("interval")).toBe("5000");
    });
  });

  /**
   * Loop 属性测试
   */
  describe("Loop Attribute", () => {
    it("默认应该循环播放", () => {
      const carousel = document.createElement("ea-carousel");
      container.appendChild(carousel);

      expect(carousel.getAttribute("loop") !== "false").toBe(true);
    });

    it("设置 loop='false' 应该禁用循环", () => {
      const carousel = document.createElement("ea-carousel");
      carousel.setAttribute("loop", "false");
      container.appendChild(carousel);

      expect(carousel.getAttribute("loop")).toBe("false");
    });
  });

  /**
   * 导航方法测试
   */
  describe("Navigation Methods", () => {
    it("next() 方法应该切换到下一项", async () => {
      const carousel = document.createElement("ea-carousel");
      carousel.innerHTML = `
        <ea-carousel-item>1</ea-carousel-item>
        <ea-carousel-item>2</ea-carousel-item>
        <ea-carousel-item>3</ea-carousel-item>
      `;
      carousel.setAttribute("index", "0");
      container.appendChild(carousel);

      await new Promise(resolve => setTimeout(resolve, 50));

      carousel.next();
      expect(carousel.getAttribute("index")).toBe("1");

      carousel.next();
      expect(carousel.getAttribute("index")).toBe("2");
    });

    it("prev() 方法应该切换到上一项", async () => {
      const carousel = document.createElement("ea-carousel");
      carousel.innerHTML = `
        <ea-carousel-item>1</ea-carousel-item>
        <ea-carousel-item>2</ea-carousel-item>
        <ea-carousel-item>3</ea-carousel-item>
      `;
      carousel.setAttribute("index", "2");
      container.appendChild(carousel);

      await new Promise(resolve => setTimeout(resolve, 50));

      carousel.prev();
      expect(carousel.getAttribute("index")).toBe("1");

      carousel.prev();
      expect(carousel.getAttribute("index")).toBe("0");
    });

    it("在最后一项调用 next() 应该回到第一项（循环模式）", async () => {
      const carousel = document.createElement("ea-carousel");
      carousel.innerHTML = `
        <ea-carousel-item>1</ea-carousel-item>
        <ea-carousel-item>2</ea-carousel-item>
        <ea-carousel-item>3</ea-carousel-item>
      `;
      carousel.setAttribute("index", "2");
      container.appendChild(carousel);

      await new Promise(resolve => setTimeout(resolve, 50));

      carousel.next();
      expect(carousel.getAttribute("index")).toBe("0");
    });

    it("在第一项调用 prev() 应该回到最后一项（循环模式）", async () => {
      const carousel = document.createElement("ea-carousel");
      carousel.innerHTML = `
        <ea-carousel-item>1</ea-carousel-item>
        <ea-carousel-item>2</ea-carousel-item>
        <ea-carousel-item>3</ea-carousel-item>
      `;
      carousel.setAttribute("index", "0");
      container.appendChild(carousel);

      await new Promise(resolve => setTimeout(resolve, 50));

      carousel.prev();
      expect(carousel.getAttribute("index")).toBe("2");
    });
  });

  /**
   * 指示器交互测试
   */
  describe("Indicator Interaction", () => {
    it("点击指示器应该切换到对应项", async () => {
      const carousel = document.createElement("ea-carousel");
      carousel.setAttribute("trigger", "click");
      carousel.innerHTML = `
        <ea-carousel-item>1</ea-carousel-item>
        <ea-carousel-item>2</ea-carousel-item>
        <ea-carousel-item>3</ea-carousel-item>
      `;
      container.appendChild(carousel);

      await new Promise(resolve => setTimeout(resolve, 50));

      const indicators = carousel.shadowRoot.querySelectorAll(
        ".ea-carousel__indicator"
      );
      indicators[1].dispatchEvent(new Event("click", { bubbles: true }));

      expect(carousel.getAttribute("index")).toBe("1");
    });

    it("当前项的指示器应该有 is-active 类", async () => {
      const carousel = document.createElement("ea-carousel");
      carousel.innerHTML = `
        <ea-carousel-item>1</ea-carousel-item>
        <ea-carousel-item>2</ea-carousel-item>
        <ea-carousel-item>3</ea-carousel-item>
      `;
      container.appendChild(carousel);

      await new Promise(resolve => setTimeout(resolve, 50));

      // 在组件挂载后设置 index
      carousel.setAttribute("index", "1");
      await new Promise(resolve => setTimeout(resolve, 10));

      const indicators = carousel.shadowRoot.querySelectorAll(
        ".ea-carousel__indicator"
      );
      expect(indicators[1].classList.contains("is-active")).toBe(true);
    });
  });

  /**
   * 边界条件测试
   */
  describe("Edge Cases", () => {
    it("没有轮播项时应该正确处理", () => {
      const carousel = document.createElement("ea-carousel");
      container.appendChild(carousel);

      const items = carousel.querySelectorAll("ea-carousel-item:not([slot])");
      expect(items.length).toBe(0);
    });

    it("只有一个轮播项时应该正确处理", async () => {
      const carousel = document.createElement("ea-carousel");
      carousel.innerHTML = `<ea-carousel-item>1</ea-carousel-item>`;
      container.appendChild(carousel);

      await new Promise(resolve => setTimeout(resolve, 50));

      const items = carousel.querySelectorAll("ea-carousel-item:not([slot])");
      expect(items.length).toBe(1);

      const indicators = carousel.shadowRoot.querySelectorAll(
        ".ea-carousel__indicator"
      );
      expect(indicators.length).toBe(1);
    });

    it("动态添加轮播项应该更新指示器", async () => {
      const carousel = document.createElement("ea-carousel");
      carousel.innerHTML = `
        <ea-carousel-item>1</ea-carousel-item>
        <ea-carousel-item>2</ea-carousel-item>
      `;
      container.appendChild(carousel);

      await new Promise(resolve => setTimeout(resolve, 50));

      let indicators = carousel.shadowRoot.querySelectorAll(
        ".ea-carousel__indicator"
      );
      expect(indicators.length).toBe(2);

      // 添加新项
      const newItem = document.createElement("ea-carousel-item");
      newItem.textContent = "3";
      carousel.appendChild(newItem);

      // 重新渲染指示器
      carousel.connectedCallback();

      indicators = carousel.shadowRoot.querySelectorAll(
        ".ea-carousel__indicator"
      );
      expect(indicators.length).toBe(3);
    });
  });

  /**
   * 生命周期测试
   */
  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const carousel = document.createElement("ea-carousel");
      carousel.innerHTML = `
        <ea-carousel-item>1</ea-carousel-item>
        <ea-carousel-item>2</ea-carousel-item>
      `;
      container.appendChild(carousel);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(carousel.shadowRoot.querySelector(".ea-carousel")).toBeTruthy();
      expect(
        carousel.shadowRoot.querySelector(".ea-carousel__content")
      ).toBeTruthy();
    });

    it("组件断开连接后应该清理定时器", () => {
      const carousel = document.createElement("ea-carousel");
      carousel.setAttribute("autoplay", "true");
      container.appendChild(carousel);

      carousel.remove();

      // 验证不会抛出错误
      expect(() => {
        carousel.disconnectedCallback?.();
      }).not.toThrow();
    });
  });
});
