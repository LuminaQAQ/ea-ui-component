import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender";

import "../components/ea-carousel/index";

function createCarousel(itemCount = 3, attrs = {}) {
  const carousel = document.createElement("ea-carousel");
  for (let i = 0; i < itemCount; i++) {
    const item = document.createElement("ea-carousel-item");
    item.textContent = `Item ${i + 1}`;
    carousel.appendChild(item);
  }
  Object.entries(attrs).forEach(([key, value]) => {
    if (value === false) {
      carousel.removeAttribute(key);
    } else if (typeof value === "boolean") {
      carousel.toggleAttribute(key, value);
    } else {
      carousel.setAttribute(key, String(value));
    }
  });
  return carousel;
}

function getContent(carousel) {
  return carousel.shadowRoot.querySelector(".ea-carousel__content");
}

function getIndicators(carousel) {
  return carousel.shadowRoot.querySelectorAll(".ea-carousel__indicator");
}

function getContainer(carousel) {
  return carousel.shadowRoot.querySelector(".ea-carousel");
}

async function simulateTransitionEnd(carousel) {
  const content = getContent(carousel);
  content.dispatchEvent(new Event("transitionend"));
  await waitForRender();
}

describe("EaCarousel", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe("Basic Rendering", () => {
    it("should render ea-carousel with shadow DOM", async () => {
      const carousel = createCarousel(3);
      container.appendChild(carousel);
      await waitForRender();

      expect(carousel.shadowRoot).toBeDefined();
      expect(carousel.shadowRoot.querySelector(".ea-carousel")).toBeTruthy();
    });

    it("should render ea-carousel-item with shadow DOM", async () => {
      const item = document.createElement("ea-carousel-item");
      container.appendChild(item);
      await waitForRender();

      expect(item.shadowRoot).toBeDefined();
      expect(item.shadowRoot.querySelector(".ea-carousel-item")).toBeTruthy();
    });

    it("should contain a default slot in ea-carousel-item", async () => {
      const item = document.createElement("ea-carousel-item");
      container.appendChild(item);
      await waitForRender();

      const slot = item.shadowRoot.querySelector("slot");
      expect(slot).toBeTruthy();
    });

    it("should contain required CSS parts", async () => {
      const carousel = createCarousel(3);
      container.appendChild(carousel);
      await waitForRender();

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

    it("should contain left and right arrow buttons", async () => {
      const carousel = createCarousel(3);
      container.appendChild(carousel);
      await waitForRender();

      expect(carousel.shadowRoot.querySelector(".arrow-left")).toBeTruthy();
      expect(carousel.shadowRoot.querySelector(".arrow-right")).toBeTruthy();
    });

    it("should contain indicator wrap element", async () => {
      const carousel = createCarousel(3);
      container.appendChild(carousel);
      await waitForRender();

      expect(
        carousel.shadowRoot.querySelector(".ea-carousel__indicator-wrap")
      ).toBeTruthy();
    });

    it("should contain clone slots in content", async () => {
      const carousel = createCarousel(3);
      container.appendChild(carousel);
      await waitForRender();

      const content = getContent(carousel);
      expect(content.querySelector('slot[name="clone-first"]')).toBeTruthy();
      expect(content.querySelector('slot[name="clone-last"]')).toBeTruthy();
      expect(content.querySelector("slot:not([name])")).toBeTruthy();
    });
  });

  describe("Height Attribute", () => {
    it("should default to '100%'", async () => {
      const carousel = createCarousel(3);
      container.appendChild(carousel);
      await waitForRender();

      expect(carousel.height).toBe("100%");
      expect(carousel.getAttribute("height") || "100%").toBe("100%");
    });

    it("should set --ea-carousel-height CSS property", async () => {
      const carousel = createCarousel(3, { height: "300px" });
      container.appendChild(carousel);
      await waitForRender();

      expect(carousel.style.getPropertyValue("--ea-carousel-height")).toBe(
        "300px"
      );
    });

    it("should update --ea-carousel-height when height changes", async () => {
      const carousel = createCarousel(3);
      container.appendChild(carousel);
      await waitForRender();

      carousel.setAttribute("height", "500px");
      await waitForRender();

      expect(carousel.style.getPropertyValue("--ea-carousel-height")).toBe(
        "500px"
      );
    });

    it("should accept percentage values", async () => {
      const carousel = createCarousel(3, { height: "50%" });
      container.appendChild(carousel);
      await waitForRender();

      expect(carousel.style.getPropertyValue("--ea-carousel-height")).toBe(
        "50%"
      );
    });

    it("should accept vh values", async () => {
      const carousel = createCarousel(3, { height: "80vh" });
      container.appendChild(carousel);
      await waitForRender();

      expect(carousel.style.getPropertyValue("--ea-carousel-height")).toBe(
        "80vh"
      );
    });
  });

  describe("Direction Attribute", () => {
    it("should default to 'horizontal'", async () => {
      const carousel = createCarousel(3);
      container.appendChild(carousel);
      await waitForRender();

      expect(carousel.direction).toBe("horizontal");
      expect(carousel.getAttribute("direction") || "horizontal").toBe(
        "horizontal"
      );
    });

    it("should apply horizontal class by default", async () => {
      const carousel = createCarousel(3);
      container.appendChild(carousel);
      await waitForRender();

      const containerEl = getContainer(carousel);
      expect(containerEl.classList.contains("ea-carousel--horizontal")).toBe(
        true
      );
    });

    it("should apply vertical class when direction='vertical'", async () => {
      const carousel = createCarousel(3, { direction: "vertical" });
      container.appendChild(carousel);
      await waitForRender();

      const containerEl = getContainer(carousel);
      expect(containerEl.classList.contains("ea-carousel--vertical")).toBe(
        true
      );
      expect(containerEl.classList.contains("ea-carousel--horizontal")).toBe(
        false
      );
    });

    it("should switch class when direction changes dynamically", async () => {
      const carousel = createCarousel(3);
      container.appendChild(carousel);
      await waitForRender();

      carousel.setAttribute("direction", "vertical");
      await waitForRender();

      const containerEl = getContainer(carousel);
      expect(containerEl.classList.contains("ea-carousel--vertical")).toBe(
        true
      );
      expect(containerEl.classList.contains("ea-carousel--horizontal")).toBe(
        false
      );
    });

    it("should hide arrows in vertical direction", async () => {
      const carousel = createCarousel(3, { direction: "vertical" });
      container.appendChild(carousel);
      await waitForRender();

      carousel.next();
      expect(carousel.getAttribute("index")).toBe("1");
    });
  });

  describe("Index Attribute", () => {
    it("should default to 0", async () => {
      const carousel = createCarousel(3);
      container.appendChild(carousel);
      await waitForRender();

      expect(carousel.index).toBe(0);
      expect(carousel.getAttribute("index") || "0").toBe("0");
    });

    it("should set index via attribute", async () => {
      const carousel = createCarousel(3, { index: "1" });
      container.appendChild(carousel);
      await waitForRender();

      expect(carousel.index).toBe(1);
      expect(carousel.getAttribute("index")).toBe("1");
    });

    it("should update position when index changes", async () => {
      const carousel = createCarousel(3);
      container.appendChild(carousel);
      await waitForRender();

      carousel.setAttribute("index", "2");
      await waitForRender();

      const transform = carousel.style.getPropertyValue(
        "--ea-carousel-transform"
      );
      expect(transform).toBeTruthy();
      expect(transform).not.toBe("translateX(0px)");
    });

    it("should emit 'ea-change' event when index changes", async () => {
      const carousel = createCarousel(3);
      container.appendChild(carousel);
      await waitForRender();

      const changeHandler = vi.fn();
      carousel.addEventListener("ea-change", changeHandler);

      carousel.setAttribute("index", "1");
      await waitForRender();

      expect(changeHandler).toHaveBeenCalledTimes(1);
      expect(changeHandler.mock.calls[0][0].detail).toEqual({
        current: 1,
        prev: 0,
      });
    });

    it("should emit 'ea-change' event with correct prev and current", async () => {
      const carousel = createCarousel(3, { index: "1" });
      container.appendChild(carousel);
      await waitForRender();

      const changeHandler = vi.fn();
      carousel.addEventListener("ea-change", changeHandler);

      carousel.setAttribute("index", "2");
      await waitForRender();

      expect(changeHandler).toHaveBeenCalledTimes(1);
      expect(changeHandler.mock.calls[0][0].detail).toEqual({
        current: 2,
        prev: 1,
      });
    });

    it("should emit 'ea-change' event when looping forward", async () => {
      const carousel = createCarousel(3, { index: "2" });
      container.appendChild(carousel);
      await waitForRender();

      const changeHandler = vi.fn();
      carousel.addEventListener("ea-change", changeHandler);

      carousel.next();
      await waitForRender();

      expect(changeHandler).toHaveBeenCalledTimes(1);
      expect(changeHandler.mock.calls[0][0].detail).toEqual({
        current: 0,
        prev: 2,
      });
    });

    it("should emit 'ea-change' event when looping backward", async () => {
      const carousel = createCarousel(3, { index: "0" });
      container.appendChild(carousel);
      await waitForRender();

      const changeHandler = vi.fn();
      carousel.addEventListener("ea-change", changeHandler);

      carousel.prev();
      await waitForRender();

      expect(changeHandler).toHaveBeenCalledTimes(1);
      expect(changeHandler.mock.calls[0][0].detail).toEqual({
        current: 2,
        prev: 0,
      });
    });
  });

  describe("Trigger Attribute", () => {
    it("should default to 'hover'", async () => {
      const carousel = createCarousel(3);
      container.appendChild(carousel);
      await waitForRender();

      expect(carousel.trigger).toBe("hover");
      expect(carousel.getAttribute("trigger") || "hover").toBe("hover");
    });

    it("should accept 'click' value", async () => {
      const carousel = createCarousel(3, { trigger: "click" });
      container.appendChild(carousel);
      await waitForRender();

      expect(carousel.trigger).toBe("click");
      expect(carousel.getAttribute("trigger")).toBe("click");
    });

    it("should switch trigger dynamically", async () => {
      const carousel = createCarousel(3);
      container.appendChild(carousel);
      await waitForRender();

      carousel.setAttribute("trigger", "click");
      await waitForRender();

      expect(carousel.trigger).toBe("click");
    });
  });

  describe("Interval Attribute", () => {
    it("should default to 3000", async () => {
      const carousel = createCarousel(3);
      container.appendChild(carousel);
      await waitForRender();

      expect(carousel.interval).toBe(3000);
    });

    it("should accept custom interval", async () => {
      const carousel = createCarousel(3, { interval: "5000" });
      container.appendChild(carousel);
      await waitForRender();

      expect(carousel.interval).toBe(5000);
    });

    it("should update interval dynamically", async () => {
      const carousel = createCarousel(3);
      container.appendChild(carousel);
      await waitForRender();

      carousel.setAttribute("interval", "2000");
      await waitForRender();

      expect(carousel.interval).toBe(2000);
    });
  });

  describe("Arrow Attribute", () => {
    it("should default to 'hover'", async () => {
      const carousel = createCarousel(3);
      container.appendChild(carousel);
      await waitForRender();

      expect(carousel.arrow).toBe("hover");
      expect(carousel.getAttribute("arrow") || "hover").toBe("hover");
    });

    it("should apply arrow-always class when arrow='always'", async () => {
      const carousel = createCarousel(3, { arrow: "always" });
      container.appendChild(carousel);
      await waitForRender();

      const containerEl = getContainer(carousel);
      expect(containerEl.classList.contains("is-arrow-always")).toBe(true);
    });

    it("should apply arrow-never class when arrow='never'", async () => {
      const carousel = createCarousel(3, { arrow: "never" });
      container.appendChild(carousel);
      await waitForRender();

      const containerEl = getContainer(carousel);
      expect(containerEl.classList.contains("is-arrow-never")).toBe(true);
    });

    it("should show arrows on mouseenter when arrow='hover'", async () => {
      const carousel = createCarousel(3);
      container.appendChild(carousel);
      await waitForRender();

      const containerEl = getContainer(carousel);
      containerEl.dispatchEvent(
        new MouseEvent("mouseenter", { bubbles: true })
      );
      await waitForRender();

      expect(containerEl.classList.contains("is-arrow-hover")).toBe(true);
    });

    it("should hide arrows on mouseleave when arrow='hover'", async () => {
      const carousel = createCarousel(3);
      container.appendChild(carousel);
      await waitForRender();

      const containerEl = getContainer(carousel);
      containerEl.dispatchEvent(
        new MouseEvent("mouseenter", { bubbles: true })
      );
      await waitForRender();
      expect(containerEl.classList.contains("is-arrow-hover")).toBe(true);

      containerEl.dispatchEvent(
        new MouseEvent("mouseleave", { bubbles: true })
      );
      await waitForRender();
      expect(containerEl.classList.contains("is-arrow-hover")).toBe(false);
    });

    it("should switch arrow class dynamically", async () => {
      const carousel = createCarousel(3);
      container.appendChild(carousel);
      await waitForRender();

      carousel.setAttribute("arrow", "always");
      await waitForRender();

      const containerEl = getContainer(carousel);
      expect(containerEl.classList.contains("is-arrow-always")).toBe(true);
    });
  });

  describe("Autoplay Attribute", () => {
    it("should default to true", async () => {
      const carousel = createCarousel(3);
      container.appendChild(carousel);
      await waitForRender();

      expect(carousel.autoplay).toBe(true);
    });

    it("should accept false value", async () => {
      const carousel = createCarousel(3);
      container.appendChild(carousel);
      await waitForRender();

      carousel.autoplay = false;
      await waitForRender();

      expect(carousel.autoplay).toBe(false);
    });

    it("should toggle autoplay dynamically", async () => {
      const carousel = createCarousel(3);
      container.appendChild(carousel);
      await waitForRender();

      carousel.autoplay = false;
      await waitForRender();

      expect(carousel.autoplay).toBe(false);
    });
  });

  describe("Loop Attribute", () => {
    it("should default to true", async () => {
      const carousel = createCarousel(3);
      container.appendChild(carousel);
      await waitForRender();

      expect(carousel.loop).toBe(true);
    });

    it("should accept false value", async () => {
      const carousel = createCarousel(3);
      container.appendChild(carousel);
      await waitForRender();

      carousel.loop = false;
      await waitForRender();

      expect(carousel.loop).toBe(false);
    });

    it("should toggle loop dynamically", async () => {
      const carousel = createCarousel(3);
      container.appendChild(carousel);
      await waitForRender();

      carousel.loop = false;
      await waitForRender();

      expect(carousel.loop).toBe(false);
    });
  });

  describe("PauseOnHover Attribute", () => {
    it("should default to true", async () => {
      const carousel = createCarousel(3);
      container.appendChild(carousel);
      await waitForRender();

      expect(carousel.pauseOnHover).toBe(true);
    });

    it("should accept false value", async () => {
      const carousel = createCarousel(3);
      container.appendChild(carousel);
      await waitForRender();

      carousel.pauseOnHover = false;
      await waitForRender();

      expect(carousel.pauseOnHover).toBe(false);
    });
  });

  describe("IndicatorPosition Attribute", () => {
    it("should default to empty string (inside)", async () => {
      const carousel = createCarousel(3);
      container.appendChild(carousel);
      await waitForRender();

      expect(carousel.indicatorPosition).toBe("");
      const containerEl = getContainer(carousel);
      expect(containerEl.classList.contains("is-none-indicator")).toBe(false);
      expect(containerEl.classList.contains("is-outside-indicator")).toBe(
        false
      );
    });

    it("should hide indicators when indicator-position='none'", async () => {
      const carousel = createCarousel(3, { "indicator-position": "none" });
      container.appendChild(carousel);
      await waitForRender();

      const containerEl = getContainer(carousel);
      expect(containerEl.classList.contains("is-none-indicator")).toBe(true);
    });

    it("should show outside indicators when indicator-position='outside'", async () => {
      const carousel = createCarousel(3, { "indicator-position": "outside" });
      container.appendChild(carousel);
      await waitForRender();

      const containerEl = getContainer(carousel);
      expect(containerEl.classList.contains("is-outside-indicator")).toBe(true);
    });

    it("should switch indicator position dynamically", async () => {
      const carousel = createCarousel(3);
      container.appendChild(carousel);
      await waitForRender();

      carousel.setAttribute("indicator-position", "outside");
      await waitForRender();

      const containerEl = getContainer(carousel);
      expect(containerEl.classList.contains("is-outside-indicator")).toBe(true);
    });
  });

  describe("Navigation - next()", () => {
    it("should move to next item", async () => {
      const carousel = createCarousel(3, { index: "0" });
      container.appendChild(carousel);
      await waitForRender();

      carousel.next();
      expect(carousel.getAttribute("index")).toBe("1");
    });

    it("should set pause state during transition", async () => {
      const carousel = createCarousel(3, { index: "0" });
      container.appendChild(carousel);
      await waitForRender();

      carousel.next();
      expect(carousel.getAttribute("index")).toBe("1");

      carousel.next();
      expect(carousel.getAttribute("index")).toBe("1");
    });

    it("should allow next after transitionend", async () => {
      const carousel = createCarousel(3, { index: "0" });
      container.appendChild(carousel);
      await waitForRender();

      carousel.next();
      expect(carousel.getAttribute("index")).toBe("1");

      await simulateTransitionEnd(carousel);

      carousel.next();
      expect(carousel.getAttribute("index")).toBe("2");
    });

    it("should go to clone-first when on last item (loop)", async () => {
      const carousel = createCarousel(3, { index: "2" });
      container.appendChild(carousel);
      await waitForRender();

      carousel.next();
      expect(carousel.getAttribute("index")).toBe("3");
    });

    it("should reset to first item after transitionend on clone-first", async () => {
      const carousel = createCarousel(3, { index: "2" });
      container.appendChild(carousel);
      await waitForRender();

      carousel.next();
      expect(carousel.getAttribute("index")).toBe("3");

      await simulateTransitionEnd(carousel);

      expect(carousel.getAttribute("index")).toBe("0");
    });
  });

  describe("Navigation - prev()", () => {
    it("should move to previous item", async () => {
      const carousel = createCarousel(3, { index: "2" });
      container.appendChild(carousel);
      await waitForRender();

      carousel.prev();
      expect(carousel.getAttribute("index")).toBe("1");
    });

    it("should set pause state during transition", async () => {
      const carousel = createCarousel(3, { index: "2" });
      container.appendChild(carousel);
      await waitForRender();

      carousel.prev();
      expect(carousel.getAttribute("index")).toBe("1");

      carousel.prev();
      expect(carousel.getAttribute("index")).toBe("1");
    });

    it("should allow prev after transitionend", async () => {
      const carousel = createCarousel(3, { index: "2" });
      container.appendChild(carousel);
      await waitForRender();

      carousel.prev();
      expect(carousel.getAttribute("index")).toBe("1");

      await simulateTransitionEnd(carousel);

      carousel.prev();
      expect(carousel.getAttribute("index")).toBe("0");
    });

    it("should go to clone-last when on first item (loop)", async () => {
      const carousel = createCarousel(3, { index: "0" });
      container.appendChild(carousel);
      await waitForRender();

      carousel.prev();
      expect(carousel.getAttribute("index")).toBe("-1");
    });

    it("should reset to last item after transitionend on clone-last", async () => {
      const carousel = createCarousel(3, { index: "0" });
      container.appendChild(carousel);
      await waitForRender();

      carousel.prev();
      expect(carousel.getAttribute("index")).toBe("-1");

      await simulateTransitionEnd(carousel);

      expect(carousel.getAttribute("index")).toBe("2");
    });
  });

  describe("Arrow Click Navigation", () => {
    it("should call prev() on left arrow click", async () => {
      const carousel = createCarousel(3, { index: "1" });
      container.appendChild(carousel);
      await waitForRender();

      const leftArrow = carousel.shadowRoot.querySelector(".arrow-left");
      leftArrow.click();

      expect(carousel.getAttribute("index")).toBe("0");
    });

    it("should call next() on right arrow click", async () => {
      const carousel = createCarousel(3, { index: "1" });
      container.appendChild(carousel);
      await waitForRender();

      const rightArrow = carousel.shadowRoot.querySelector(".arrow-right");
      rightArrow.click();

      expect(carousel.getAttribute("index")).toBe("2");
    });

    it("should ignore arrow clicks when arrow='never'", async () => {
      const carousel = createCarousel(3, { index: "1", arrow: "never" });
      container.appendChild(carousel);
      await waitForRender();

      const rightArrow = carousel.shadowRoot.querySelector(".arrow-right");
      rightArrow.click();

      expect(carousel.getAttribute("index")).toBe("1");
    });

    it("should ignore arrow clicks when direction='vertical'", async () => {
      const carousel = createCarousel(3, { index: "1", direction: "vertical" });
      container.appendChild(carousel);
      await waitForRender();

      const rightArrow = carousel.shadowRoot.querySelector(".arrow-right");
      rightArrow.click();

      expect(carousel.getAttribute("index")).toBe("1");
    });
  });

  describe("Indicators", () => {
    it("should generate indicators based on item count", async () => {
      const carousel = createCarousel(3);
      container.appendChild(carousel);
      await waitForRender();

      const indicators = getIndicators(carousel);
      expect(indicators.length).toBe(3);
    });

    it("should generate correct number of indicators for different counts", async () => {
      const carousel = createCarousel(5);
      container.appendChild(carousel);
      await waitForRender();

      const indicators = getIndicators(carousel);
      expect(indicators.length).toBe(5);
    });

    it("should mark first indicator as active by default", async () => {
      const carousel = createCarousel(3);
      container.appendChild(carousel);
      await waitForRender();

      const indicators = getIndicators(carousel);
      expect(indicators[0].classList.contains("is-active")).toBe(true);
    });

    it("should update active indicator when index changes", async () => {
      const carousel = createCarousel(3);
      container.appendChild(carousel);
      await waitForRender();

      carousel.setAttribute("index", "1");
      await waitForRender();

      const indicators = getIndicators(carousel);
      expect(indicators[0].classList.contains("is-active")).toBe(false);
      expect(indicators[1].classList.contains("is-active")).toBe(true);
    });

    it("should navigate to item on indicator click", async () => {
      const carousel = createCarousel(3, { trigger: "click" });
      container.appendChild(carousel);
      await waitForRender();

      const indicators = getIndicators(carousel);
      indicators[2].dispatchEvent(new Event("click", { bubbles: true }));
      await waitForRender();

      expect(carousel.getAttribute("index")).toBe("2");
    });

    it("should navigate to item on indicator hover when trigger='hover'", async () => {
      const carousel = createCarousel(3);
      container.appendChild(carousel);
      await waitForRender();

      const indicators = getIndicators(carousel);
      indicators[1].dispatchEvent(
        new MouseEvent("mouseover", { bubbles: true })
      );
      await waitForRender();

      expect(carousel.getAttribute("index")).toBe("1");
    });

    it("should have correct data-index attributes", async () => {
      const carousel = createCarousel(3);
      container.appendChild(carousel);
      await waitForRender();

      const indicators = getIndicators(carousel);
      indicators.forEach((indicator, i) => {
        expect(indicator.getAttribute("data-index")).toBe(String(i));
      });
    });

    it("should update indicators when items are added dynamically", async () => {
      const carousel = createCarousel(2);
      container.appendChild(carousel);
      await waitForRender();

      let indicators = getIndicators(carousel);
      expect(indicators.length).toBe(2);

      const newItem = document.createElement("ea-carousel-item");
      newItem.textContent = "Item 3";
      carousel.appendChild(newItem);
      carousel.$mount();
      await waitForRender();

      indicators = getIndicators(carousel);
      expect(indicators.length).toBe(3);
    });

    it("should update indicators when items are removed", async () => {
      const carousel = createCarousel(3);
      container.appendChild(carousel);
      await waitForRender();

      let indicators = getIndicators(carousel);
      expect(indicators.length).toBe(3);

      const items = carousel.querySelectorAll("ea-carousel-item:not([slot])");
      items[2].remove();
      carousel.$mount();
      await waitForRender();

      indicators = getIndicators(carousel);
      expect(indicators.length).toBe(2);
    });
  });

  describe("Clone Items", () => {
    it("should create clone-first and clone-last items", async () => {
      const carousel = createCarousel(3);
      container.appendChild(carousel);
      await waitForRender();

      const cloneFirst = carousel.querySelector(
        'ea-carousel-item[slot="clone-first"]'
      );
      const cloneLast = carousel.querySelector(
        'ea-carousel-item[slot="clone-last"]'
      );
      expect(cloneFirst).toBeTruthy();
      expect(cloneLast).toBeTruthy();
    });

    it("should clone content of first item for clone-first", async () => {
      const carousel = createCarousel(3);
      container.appendChild(carousel);
      await waitForRender();

      const cloneFirst = carousel.querySelector(
        'ea-carousel-item[slot="clone-first"]'
      );
      const firstItem = carousel.querySelector("ea-carousel-item:not([slot])");
      expect(cloneFirst.textContent).toBe(firstItem.textContent);
    });

    it("should clone content of last item for clone-last", async () => {
      const carousel = createCarousel(3);
      container.appendChild(carousel);
      await waitForRender();

      const cloneLast = carousel.querySelector(
        'ea-carousel-item[slot="clone-last"]'
      );
      const items = carousel.querySelectorAll("ea-carousel-item:not([slot])");
      const lastItem = items[items.length - 1];
      expect(cloneLast.textContent).toBe(lastItem.textContent);
    });

    it("should sync clone content when original item changes", async () => {
      const carousel = createCarousel(3);
      container.appendChild(carousel);
      await waitForRender();

      const firstItem = carousel.querySelector("ea-carousel-item:not([slot])");
      firstItem.textContent = "Updated First";
      await waitForRender(200);

      const cloneFirst = carousel.querySelector(
        'ea-carousel-item[slot="clone-first"]'
      );
      expect(cloneFirst.textContent).toBe("Updated First");
    });

    it("should remove old clones before creating new ones on remount", async () => {
      const carousel = createCarousel(3);
      container.appendChild(carousel);
      await waitForRender();

      carousel.$mount();
      await waitForRender();

      const clones = carousel.querySelectorAll(
        'ea-carousel-item[slot^="clone-"]'
      );
      expect(clones.length).toBe(2);
    });
  });

  describe("Transition Handling", () => {
    it("should disable transition during loop reset", async () => {
      const carousel = createCarousel(3, { index: "2" });
      container.appendChild(carousel);
      await waitForRender();

      carousel.next();
      expect(carousel.getAttribute("index")).toBe("3");

      await simulateTransitionEnd(carousel);

      expect(carousel.getAttribute("index")).toBe("0");
    });

    it("should re-enable transition after loop reset", async () => {
      const carousel = createCarousel(3, { index: "2" });
      container.appendChild(carousel);
      await waitForRender();

      carousel.next();
      await simulateTransitionEnd(carousel);

      carousel.next();
      expect(carousel.getAttribute("index")).toBe("1");
    });

    it("should handle backward loop transition correctly", async () => {
      const carousel = createCarousel(3, { index: "0" });
      container.appendChild(carousel);
      await waitForRender();

      carousel.prev();
      expect(carousel.getAttribute("index")).toBe("-1");

      await simulateTransitionEnd(carousel);

      expect(carousel.getAttribute("index")).toBe("2");
    });

    it("should allow navigation after full loop cycle", async () => {
      const carousel = createCarousel(3, { index: "2" });
      container.appendChild(carousel);
      await waitForRender();

      carousel.next();
      await simulateTransitionEnd(carousel);
      expect(carousel.getAttribute("index")).toBe("0");

      carousel.next();
      await simulateTransitionEnd(carousel);
      expect(carousel.getAttribute("index")).toBe("1");

      carousel.next();
      await simulateTransitionEnd(carousel);
      expect(carousel.getAttribute("index")).toBe("2");
    });
  });

  describe("Autoplay Behavior", () => {
    it("should start autoplay on mount by default", async () => {
      const carousel = createCarousel(3, { interval: "50" });
      container.appendChild(carousel);
      await waitForRender();

      await new Promise(resolve => setTimeout(resolve, 100));
      expect(carousel.getAttribute("index")).toBe("1");
    });

    it("should not autoplay when autoplay is false", async () => {
      const carousel = createCarousel(3, { interval: "500" });
      container.appendChild(carousel);
      await waitForRender(0);

      carousel.autoplay = false;
      await waitForRender();

      await new Promise(resolve => setTimeout(resolve, 600));
      expect(carousel.getAttribute("index") || "0").toBe("0");
    });

    it("should respect custom interval", async () => {
      const carousel = createCarousel(3, { interval: "500" });
      container.appendChild(carousel);
      await waitForRender();

      await new Promise(resolve => setTimeout(resolve, 200));
      expect(carousel.getAttribute("index") || "0").toBe("0");

      await new Promise(resolve => setTimeout(resolve, 500));
      expect(carousel.getAttribute("index")).toBe("1");
    });

    it("should pause autoplay on mouseenter when pauseOnHover is true", async () => {
      const carousel = createCarousel(3, { interval: "500" });
      container.appendChild(carousel);
      await waitForRender();

      const containerEl = getContainer(carousel);
      containerEl.dispatchEvent(
        new MouseEvent("mouseenter", { bubbles: true })
      );
      await waitForRender();

      await new Promise(resolve => setTimeout(resolve, 600));
      expect(carousel.getAttribute("index") || "0").toBe("0");
    });

    it("should resume autoplay on mouseleave when pauseOnHover is true", async () => {
      const carousel = createCarousel(3, { interval: "50" });
      container.appendChild(carousel);
      await waitForRender();

      const containerEl = getContainer(carousel);
      containerEl.dispatchEvent(
        new MouseEvent("mouseenter", { bubbles: true })
      );
      await waitForRender();

      containerEl.dispatchEvent(
        new MouseEvent("mouseleave", { bubbles: true })
      );
      await waitForRender();

      await new Promise(resolve => setTimeout(resolve, 100));
      expect(carousel.getAttribute("index")).toBe("1");
    });

    it("should not pause on hover when pauseOnHover is false", async () => {
      const carousel = createCarousel(3, { interval: "50" });
      container.appendChild(carousel);
      await waitForRender();

      carousel.pauseOnHover = false;
      await waitForRender();

      const containerEl = getContainer(carousel);
      containerEl.dispatchEvent(
        new MouseEvent("mouseenter", { bubbles: true })
      );
      await waitForRender();

      await new Promise(resolve => setTimeout(resolve, 100));
      expect(carousel.getAttribute("index")).toBe("1");
    });

    it("should restart autoplay after manual navigation and transitionend", async () => {
      const carousel = createCarousel(3, { index: "0", interval: "50" });
      container.appendChild(carousel);
      await waitForRender();

      carousel.next();
      await simulateTransitionEnd(carousel);

      await new Promise(resolve => setTimeout(resolve, 100));
      expect(carousel.getAttribute("index")).toBe("2");
    });
  });

  describe("Events", () => {
    it("should emit 'ea-change' event with bubbles and composed", async () => {
      const carousel = createCarousel(3);
      container.appendChild(carousel);
      await waitForRender();

      const changeHandler = vi.fn();
      container.addEventListener("ea-change", changeHandler);

      carousel.setAttribute("index", "1");
      await waitForRender();

      expect(changeHandler).toHaveBeenCalledTimes(1);
    });

    it("should emit 'ea-change' event with correct detail on loop forward", async () => {
      const carousel = createCarousel(3, { index: "2" });
      container.appendChild(carousel);
      await waitForRender();

      const changeHandler = vi.fn();
      carousel.addEventListener("ea-change", changeHandler);

      carousel.next();
      await waitForRender();

      expect(changeHandler).toHaveBeenCalledTimes(1);
      expect(changeHandler.mock.calls[0][0].detail.current).toBe(0);
      expect(changeHandler.mock.calls[0][0].detail.prev).toBe(2);
    });

    it("should emit 'ea-change' event with correct detail on loop backward", async () => {
      const carousel = createCarousel(3, { index: "0" });
      container.appendChild(carousel);
      await waitForRender();

      const changeHandler = vi.fn();
      carousel.addEventListener("ea-change", changeHandler);

      carousel.prev();
      await waitForRender();

      expect(changeHandler).toHaveBeenCalledTimes(1);
      expect(changeHandler.mock.calls[0][0].detail.current).toBe(2);
      expect(changeHandler.mock.calls[0][0].detail.prev).toBe(0);
    });

    it("should emit 'ea-change' event when index attribute is set", async () => {
      const changeHandler = vi.fn();
      const carousel = createCarousel(3);
      carousel.addEventListener("ea-change", changeHandler);
      container.appendChild(carousel);
      await waitForRender();

      changeHandler.mockClear();

      carousel.setAttribute("index", "0");
      await waitForRender();

      expect(changeHandler).toHaveBeenCalledTimes(1);
    });
  });

  describe("CSS Classes", () => {
    it("should apply correct direction class", async () => {
      const carousel = createCarousel(3);
      container.appendChild(carousel);
      await waitForRender();

      const containerEl = getContainer(carousel);
      expect(containerEl.classList.contains("ea-carousel--horizontal")).toBe(
        true
      );
    });

    it("should apply arrow class on mouseenter", async () => {
      const carousel = createCarousel(3);
      container.appendChild(carousel);
      await waitForRender();

      const containerEl = getContainer(carousel);
      containerEl.dispatchEvent(
        new MouseEvent("mouseenter", { bubbles: true })
      );
      await waitForRender();

      expect(containerEl.classList.contains("is-arrow-hover")).toBe(true);
    });

    it("should apply none-indicator class", async () => {
      const carousel = createCarousel(3, { "indicator-position": "none" });
      container.appendChild(carousel);
      await waitForRender();

      const containerEl = getContainer(carousel);
      expect(containerEl.classList.contains("is-none-indicator")).toBe(true);
    });

    it("should apply outside-indicator class", async () => {
      const carousel = createCarousel(3, { "indicator-position": "outside" });
      container.appendChild(carousel);
      await waitForRender();

      const containerEl = getContainer(carousel);
      expect(containerEl.classList.contains("is-outside-indicator")).toBe(true);
    });

    it("should combine multiple classes correctly", async () => {
      const carousel = createCarousel(3, {
        direction: "vertical",
        arrow: "always",
        "indicator-position": "outside",
      });
      container.appendChild(carousel);
      await waitForRender();

      const containerEl = getContainer(carousel);
      expect(containerEl.classList.contains("ea-carousel--vertical")).toBe(
        true
      );
      expect(containerEl.classList.contains("is-arrow-always")).toBe(true);
      expect(containerEl.classList.contains("is-outside-indicator")).toBe(true);
    });
  });

  describe("Resize Handling", () => {
    it("should update position on window resize", async () => {
      const carousel = createCarousel(3);
      container.appendChild(carousel);
      await waitForRender();

      const initialTransform = carousel.style.getPropertyValue(
        "--ea-carousel-transform"
      );

      window.dispatchEvent(new Event("resize"));
      await waitForRender(200);

      const newTransform = carousel.style.getPropertyValue(
        "--ea-carousel-transform"
      );
      expect(newTransform).toBeTruthy();
    });
  });

  describe("Slot Change", () => {
    it("should reinitialize on slot change", async () => {
      const carousel = createCarousel(3);
      container.appendChild(carousel);
      await waitForRender();

      const indicators = getIndicators(carousel);
      expect(indicators.length).toBe(3);

      const newItem = document.createElement("ea-carousel-item");
      newItem.textContent = "New Item";
      carousel.appendChild(newItem);

      const slot = getContent(carousel).querySelector("slot:not([name])");
      slot.dispatchEvent(new Event("slotchange"));
      await waitForRender();

      const updatedIndicators = getIndicators(carousel);
      expect(updatedIndicators.length).toBe(4);
    });

    it("should reset index to 0 on slot change", async () => {
      const carousel = createCarousel(3, { index: "2" });
      container.appendChild(carousel);
      await waitForRender();

      expect(carousel.getAttribute("index")).toBe("2");

      const newItem = document.createElement("ea-carousel-item");
      newItem.textContent = "New Item";
      carousel.appendChild(newItem);

      const slot = getContent(carousel).querySelector("slot:not([name])");
      slot.dispatchEvent(new Event("slotchange"));
      await waitForRender();

      expect(carousel.getAttribute("index")).toBe("0");
    });
  });

  describe("Lifecycle", () => {
    it("should initialize correctly on mount", async () => {
      const carousel = createCarousel(3);
      container.appendChild(carousel);
      await waitForRender();

      expect(carousel.shadowRoot.querySelector(".ea-carousel")).toBeTruthy();
      expect(getContent(carousel)).toBeTruthy();
      expect(getIndicators(carousel).length).toBe(3);
    });

    it("should clean up on unmount", async () => {
      const carousel = createCarousel(3);
      container.appendChild(carousel);
      await waitForRender();

      expect(() => {
        carousel.$beforeUnmount();
      }).not.toThrow();
    });

    it("should clean up abort controllers on unmount", async () => {
      const carousel = createCarousel(3);
      container.appendChild(carousel);
      await waitForRender();

      carousel.$beforeUnmount();
      carousel.remove();

      expect(carousel.isConnected).toBe(false);
    });

    it("should support remount after unmount", async () => {
      const carousel = createCarousel(3);
      container.appendChild(carousel);
      await waitForRender();

      carousel.remove();
      await waitForRender();

      container.appendChild(carousel);
      await waitForRender();

      expect(carousel.shadowRoot.querySelector(".ea-carousel")).toBeTruthy();
    });
  });

  describe("Edge Cases", () => {
    it("should handle no carousel items gracefully", async () => {
      const carousel = document.createElement("ea-carousel");
      container.appendChild(carousel);
      await waitForRender();

      const items = carousel.querySelectorAll("ea-carousel-item:not([slot])");
      expect(items.length).toBe(0);

      const indicators = getIndicators(carousel);
      expect(indicators.length).toBe(0);
    });

    it("should handle single carousel item", async () => {
      const carousel = createCarousel(1);
      container.appendChild(carousel);
      await waitForRender();

      const items = carousel.querySelectorAll("ea-carousel-item:not([slot])");
      expect(items.length).toBe(1);

      const indicators = getIndicators(carousel);
      expect(indicators.length).toBe(1);
    });

    it("should handle single item navigation", async () => {
      const carousel = createCarousel(1);
      container.appendChild(carousel);
      await waitForRender();

      carousel.next();
      expect(carousel.getAttribute("index")).toBe("1");

      await simulateTransitionEnd(carousel);
      expect(carousel.getAttribute("index")).toBe("0");
    });

    it("should handle rapid navigation blocked by pause state", async () => {
      const carousel = createCarousel(3, { index: "0" });
      container.appendChild(carousel);
      await waitForRender();

      carousel.next();
      carousel.next();
      carousel.next();

      expect(carousel.getAttribute("index")).toBe("1");
    });

    it("should handle setting index to same value", async () => {
      const carousel = createCarousel(3, { index: "1" });
      container.appendChild(carousel);
      await waitForRender();

      carousel.setAttribute("index", "1");
      await waitForRender();

      expect(carousel.getAttribute("index")).toBe("1");
    });

    it("should handle large number of items", async () => {
      const carousel = createCarousel(20);
      container.appendChild(carousel);
      await waitForRender();

      const indicators = getIndicators(carousel);
      expect(indicators.length).toBe(20);
    });

    it("should handle dynamic item content update via MutationObserver", async () => {
      const carousel = createCarousel(3);
      container.appendChild(carousel);
      await waitForRender();

      const firstItem = carousel.querySelector("ea-carousel-item:not([slot])");
      const span = document.createElement("span");
      span.textContent = "Updated";
      firstItem.appendChild(span);
      await waitForRender(200);

      const cloneFirst = carousel.querySelector(
        'ea-carousel-item[slot="clone-first"]'
      );
      expect(cloneFirst.innerHTML).toBe(firstItem.innerHTML);
    });

    it("should handle removing all items", async () => {
      const carousel = createCarousel(3);
      container.appendChild(carousel);
      await waitForRender();

      const items = carousel.querySelectorAll("ea-carousel-item:not([slot])");
      items.forEach(item => item.remove());
      carousel.$mount();
      await waitForRender();

      const indicators = getIndicators(carousel);
      expect(indicators.length).toBe(0);
    });

    it("should handle setting index via property", async () => {
      const carousel = createCarousel(3);
      container.appendChild(carousel);
      await waitForRender();

      carousel.index = 2;
      await waitForRender();

      expect(carousel.getAttribute("index")).toBe("2");
    });

    it("should handle setting direction via property", async () => {
      const carousel = createCarousel(3);
      container.appendChild(carousel);
      await waitForRender();

      carousel.direction = "vertical";
      await waitForRender();

      expect(carousel.getAttribute("direction")).toBe("vertical");
      const containerEl = getContainer(carousel);
      expect(containerEl.classList.contains("ea-carousel--vertical")).toBe(
        true
      );
    });
  });
});
