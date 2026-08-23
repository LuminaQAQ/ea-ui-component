import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender";

// Mock window.matchMedia for jsdom
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

import "../components/ea-effects/index";

describe("EaEffects", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe("Basic Functionality", () => {
    it("应该正确渲染 ea-effects 组件", async () => {
      const el = document.createElement("ea-effects");
      container.appendChild(el);

      await waitForRender();

      expect(el).toBeDefined();
      expect(el.shadowRoot).toBeDefined();
    });

    it("应该包含 .ea-effects 容器元素", async () => {
      const el = document.createElement("ea-effects");
      container.appendChild(el);

      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-effects");
      expect(containerEl).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const el = document.createElement("ea-effects");
      container.appendChild(el);

      await waitForRender();

      expect(el.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("应该支持 slot 内容", async () => {
      const el = document.createElement("ea-effects");
      el.innerHTML = "<div>Content</div>";
      container.appendChild(el);

      await waitForRender();

      const slot = el.shadowRoot.querySelector("slot");
      expect(slot).toBeDefined();
      expect(el.textContent).toBe("Content");
    });
  });

  describe("Effect Attribute", () => {
    it("默认 effect 应该是空字符串", async () => {
      const el = document.createElement("ea-effects");
      container.appendChild(el);

      await waitForRender();

      expect(el.effect).toBe("");
    });

    it("应该正确设置 effect 属性", async () => {
      const el = document.createElement("ea-effects");
      el.setAttribute("effect", "fade");
      container.appendChild(el);

      await waitForRender();

      expect(el.effect).toBe("fade");
    });

    it("effect 变化时应该更新容器类名", async () => {
      const el = document.createElement("ea-effects");
      container.appendChild(el);

      await waitForRender();

      el.setAttribute("effect", "fade");
      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-effects");
      expect(containerEl.classList.contains("ea-effects--fade")).toBe(true);
    });

    it("应该支持 zoom-center 效果", async () => {
      const el = document.createElement("ea-effects");
      el.setAttribute("effect", "zoom-center");
      container.appendChild(el);

      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-effects");
      expect(containerEl.classList.contains("ea-effects--zoom-center")).toBe(
        true
      );
    });

    it("应该支持 slide-top 效果", async () => {
      const el = document.createElement("ea-effects");
      el.setAttribute("effect", "slide-top");
      container.appendChild(el);

      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-effects");
      expect(containerEl.classList.contains("ea-effects--slide-top")).toBe(
        true
      );
    });

    it("应该支持 flip-x 效果", async () => {
      const el = document.createElement("ea-effects");
      el.setAttribute("effect", "flip-x");
      container.appendChild(el);

      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-effects");
      expect(containerEl.classList.contains("ea-effects--flip-x")).toBe(true);
    });
  });

  describe("Visible Attribute", () => {
    it("默认 visible 应该是 true", async () => {
      const el = document.createElement("ea-effects");
      container.appendChild(el);

      await waitForRender();

      expect(el.visible).toBe(true);
    });

    it("设置 visible=false 应该隐藏内容", async () => {
      const el = document.createElement("ea-effects");
      el.setAttribute("visible", "false");
      el.innerHTML = "<div>Content</div>";
      container.appendChild(el);

      await waitForRender();

      expect(el.visible).toBe(false);
    });

    it("visible 从 true 变为 false 应该触发 hide", async () => {
      const el = document.createElement("ea-effects");
      el.setAttribute("effect", "fade");
      container.appendChild(el);

      await waitForRender();

      el.visible = false;
      await waitForRender();

      expect(el.visible).toBe(false);
    });

    it("visible 从 false 变为 true 应该触发 show", async () => {
      const el = document.createElement("ea-effects");
      el.setAttribute("visible", "false");
      container.appendChild(el);

      await waitForRender();

      el.visible = true;
      await waitForRender();

      expect(el.visible).toBe(true);
    });
  });

  describe("Duration Attribute", () => {
    it("默认 duration 应该是空字符串", async () => {
      const el = document.createElement("ea-effects");
      container.appendChild(el);

      await waitForRender();

      expect(el.duration).toBe("");
    });

    it("应该正确设置 duration 属性", async () => {
      const el = document.createElement("ea-effects");
      el.setAttribute("duration", "1s");
      container.appendChild(el);

      await waitForRender();

      expect(el.duration).toBe("1s");
    });

    it("duration 变化时应该更新 CSS 自定义属性", async () => {
      const el = document.createElement("ea-effects");
      container.appendChild(el);

      await waitForRender();

      el.setAttribute("duration", "2s");
      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-effects");
      expect(containerEl.style.getPropertyValue("--ea-effects-duration")).toBe(
        "2s"
      );
    });
  });

  describe("Delay Attribute", () => {
    it("默认 delay 应该是空字符串", async () => {
      const el = document.createElement("ea-effects");
      container.appendChild(el);

      await waitForRender();

      expect(el.delay).toBe("");
    });

    it("应该正确设置 delay 属性", async () => {
      const el = document.createElement("ea-effects");
      el.setAttribute("delay", "0.5s");
      container.appendChild(el);

      await waitForRender();

      expect(el.delay).toBe("0.5s");
    });

    it("delay 变化时应该更新 CSS 自定义属性", async () => {
      const el = document.createElement("ea-effects");
      container.appendChild(el);

      await waitForRender();

      el.setAttribute("delay", "0.5s");
      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-effects");
      expect(containerEl.style.getPropertyValue("--ea-effects-delay")).toBe(
        "0.5s"
      );
    });
  });

  describe("TimingFunction Attribute", () => {
    it("默认 timingFunction 应该是空字符串", async () => {
      const el = document.createElement("ea-effects");
      container.appendChild(el);

      await waitForRender();

      expect(el.timingFunction).toBe("");
    });

    it("应该正确设置 timing-function 属性", async () => {
      const el = document.createElement("ea-effects");
      el.setAttribute("timing-function", "linear");
      container.appendChild(el);

      await waitForRender();

      expect(el.timingFunction).toBe("linear");
    });

    it("timing-function 变化时应该更新 CSS 自定义属性", async () => {
      const el = document.createElement("ea-effects");
      container.appendChild(el);

      await waitForRender();

      el.setAttribute("timing-function", "ease-in");
      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-effects");
      expect(
        containerEl.style.getPropertyValue("--ea-effects-timing-function")
      ).toBe("ease-in");
    });
  });

  describe("Iteration Attribute", () => {
    it("默认 iteration 应该是 1", async () => {
      const el = document.createElement("ea-effects");
      container.appendChild(el);

      await waitForRender();

      expect(el.iteration).toBe(1);
    });

    it("应该正确设置 iteration 属性", async () => {
      const el = document.createElement("ea-effects");
      el.setAttribute("iteration", "3");
      container.appendChild(el);

      await waitForRender();

      expect(el.iteration).toBe(3);
    });

    it("iteration 变化时应该更新 CSS 自定义属性", async () => {
      const el = document.createElement("ea-effects");
      container.appendChild(el);

      await waitForRender();

      el.setAttribute("iteration", "2");
      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-effects");
      expect(
        containerEl.style.getPropertyValue("--ea-effects-iteration-count")
      ).toBe("2");
    });
  });

  describe("Trigger Attribute", () => {
    it("默认 trigger 应该是 manual", async () => {
      const el = document.createElement("ea-effects");
      container.appendChild(el);

      await waitForRender();

      expect(el.trigger).toBe("manual");
    });

    it("应该正确设置 trigger 属性", async () => {
      const el = document.createElement("ea-effects");
      el.setAttribute("trigger", "click");
      container.appendChild(el);

      await waitForRender();

      expect(el.trigger).toBe("click");
    });

    it("trigger=click 时点击容器应该切换 visible", async () => {
      const el = document.createElement("ea-effects");
      el.setAttribute("trigger", "click");
      el.setAttribute("effect", "fade");
      container.appendChild(el);

      await waitForRender();

      expect(el.visible).toBe(true);

      const containerEl = el.shadowRoot.querySelector(".ea-effects");
      containerEl.click();
      await waitForRender();

      expect(el.visible).toBe(false);
    });

    it("trigger=manual 时点击容器不应切换 visible", async () => {
      const el = document.createElement("ea-effects");
      el.setAttribute("trigger", "manual");
      el.setAttribute("effect", "fade");
      container.appendChild(el);

      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-effects");
      containerEl.click();
      await waitForRender();

      expect(el.visible).toBe(true);
    });

    it("trigger=hover 时 mouseenter 应该设置 visible=true", async () => {
      const el = document.createElement("ea-effects");
      el.setAttribute("trigger", "hover");
      el.setAttribute("visible", "false");
      el.setAttribute("effect", "fade");
      container.appendChild(el);

      await waitForRender();

      expect(el.visible).toBe(false);

      const containerEl = el.shadowRoot.querySelector(".ea-effects");
      containerEl.dispatchEvent(
        new MouseEvent("mouseenter", { bubbles: true })
      );
      await waitForRender();

      expect(el.visible).toBe(true);
    });

    it("trigger=hover 时 mouseleave 应该设置 visible=false", async () => {
      const el = document.createElement("ea-effects");
      el.setAttribute("trigger", "hover");
      el.setAttribute("effect", "fade");
      container.appendChild(el);

      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-effects");
      containerEl.dispatchEvent(
        new MouseEvent("mouseleave", { bubbles: true })
      );
      await waitForRender();

      expect(el.visible).toBe(false);
    });

    it("trigger 变化时应该重建监听器", async () => {
      const el = document.createElement("ea-effects");
      el.setAttribute("trigger", "manual");
      el.setAttribute("effect", "fade");
      container.appendChild(el);

      await waitForRender();

      el.setAttribute("trigger", "click");
      await waitForRender();

      expect(el.trigger).toBe("click");

      const containerEl = el.shadowRoot.querySelector(".ea-effects");
      containerEl.click();
      await waitForRender();

      expect(el.visible).toBe(false);
    });
  });

  describe("ScrollOnce Attribute", () => {
    it("默认 scrollOnce 应该是 true", async () => {
      const el = document.createElement("ea-effects");
      container.appendChild(el);

      await waitForRender();

      expect(el.scrollOnce).toBe(true);
    });

    it("应该正确设置 scroll-once 属性", async () => {
      const el = document.createElement("ea-effects");
      el.setAttribute("scroll-once", "false");
      container.appendChild(el);

      await waitForRender();

      expect(el.scrollOnce).toBe(false);
    });
  });

  describe("ScrollTarget Attribute", () => {
    it("默认 scrollTarget 应该是空字符串", async () => {
      const el = document.createElement("ea-effects");
      container.appendChild(el);

      await waitForRender();

      expect(el.scrollTarget).toBe("");
    });

    it("应该正确设置 scroll-target 属性", async () => {
      const el = document.createElement("ea-effects");
      el.setAttribute("scroll-target", "#test");
      container.appendChild(el);

      await waitForRender();

      expect(el.scrollTarget).toBe("#test");
    });
  });

  describe("Methods", () => {
    it("show() 应该触发进入动画", async () => {
      const el = document.createElement("ea-effects");
      el.setAttribute("effect", "fade");
      container.appendChild(el);

      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-effects");

      el.show();
      await waitForRender();

      expect(containerEl.classList.contains("ea-effects--fade-enter")).toBe(
        true
      );
    });

    it("hide() 应该触发离开动画", async () => {
      const el = document.createElement("ea-effects");
      el.setAttribute("effect", "fade");
      container.appendChild(el);

      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-effects");

      el.hide();
      await waitForRender();

      expect(
        containerEl.classList.contains("ea-effects--fade-before-leave")
      ).toBe(true);
    });

    it("toggle() 应该切换 visible 状态", async () => {
      const el = document.createElement("ea-effects");
      el.setAttribute("effect", "fade");
      container.appendChild(el);

      await waitForRender();

      expect(el.visible).toBe(true);

      el.toggle();
      await waitForRender();

      expect(el.visible).toBe(false);

      el.toggle();
      await waitForRender();

      expect(el.visible).toBe(true);
    });

    it("reset() 应该清除过渡类名", async () => {
      const el = document.createElement("ea-effects");
      el.setAttribute("effect", "fade");
      container.appendChild(el);

      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-effects");
      containerEl.classList.add("ea-effects--fade-before-enter");

      el.reset();
      await waitForRender();

      expect(
        containerEl.classList.contains("ea-effects--fade-before-enter")
      ).toBe(false);
    });
  });

  describe("BEM Class Names", () => {
    it("默认应该有 ea-effects class", async () => {
      const el = document.createElement("ea-effects");
      container.appendChild(el);

      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-effects");
      expect(containerEl.classList.contains("ea-effects")).toBe(true);
    });

    it("effect=zoom-center 应该添加 ea-effects--zoom-center class", async () => {
      const el = document.createElement("ea-effects");
      el.setAttribute("effect", "zoom-center");
      container.appendChild(el);

      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-effects");
      expect(containerEl.classList.contains("ea-effects--zoom-center")).toBe(
        true
      );
    });

    it("effect=slide-top 应该添加 ea-effects--slide-top class", async () => {
      const el = document.createElement("ea-effects");
      el.setAttribute("effect", "slide-top");
      container.appendChild(el);

      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-effects");
      expect(containerEl.classList.contains("ea-effects--slide-top")).toBe(
        true
      );
    });

    it("effect 变化时容器类名应该更新", async () => {
      const el = document.createElement("ea-effects");
      container.appendChild(el);

      await waitForRender();

      el.setAttribute("effect", "fade");
      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-effects");
      expect(containerEl.classList.contains("ea-effects--fade")).toBe(true);
      expect(containerEl.classList.contains("ea-effects--zoom-center")).toBe(
        false
      );
    });
  });

  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const el = document.createElement("ea-effects");
      el.innerHTML = "<div>Content</div>";
      container.appendChild(el);

      await waitForRender();

      expect(el.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("组件断开连接后应该正常移除", () => {
      const el = document.createElement("ea-effects");
      container.appendChild(el);

      el.remove();

      expect(container.contains(el)).toBe(false);
    });

    it("动态修改 effect 应该触发复位", async () => {
      const el = document.createElement("ea-effects");
      el.setAttribute("effect", "fade");
      container.appendChild(el);

      await waitForRender();

      el.setAttribute("effect", "zoom-center");
      await waitForRender();

      expect(el.effect).toBe("zoom-center");
      const containerEl = el.shadowRoot.querySelector(".ea-effects");
      expect(containerEl.classList.contains("ea-effects--zoom-center")).toBe(
        true
      );
    });
  });

  describe("Edge Cases", () => {
    it("空 ea-effects 应该正常渲染", async () => {
      const el = document.createElement("ea-effects");
      container.appendChild(el);

      await waitForRender();

      expect(el.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("无 effect 属性时不应添加任何效果类名", async () => {
      const el = document.createElement("ea-effects");
      container.appendChild(el);

      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-effects");
      expect(containerEl.className.trim()).toBe("ea-effects");
    });

    it("show() 和 hide() 在没有 effect 时不应报错", async () => {
      const el = document.createElement("ea-effects");
      container.appendChild(el);

      await waitForRender();

      expect(() => {
        el.show();
        el.hide();
      }).not.toThrow();
    });

    it("多次调用 toggle() 不应报错", async () => {
      const el = document.createElement("ea-effects");
      container.appendChild(el);

      await waitForRender();

      expect(() => {
        el.toggle();
        el.toggle();
        el.toggle();
      }).not.toThrow();
    });

    it("同时设置多个 CSS 属性应该正确应用", async () => {
      const el = document.createElement("ea-effects");
      el.setAttribute("duration", "0.5s");
      el.setAttribute("delay", "0.1s");
      el.setAttribute("timing-function", "ease-out");
      el.setAttribute("iteration", "2");
      container.appendChild(el);

      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-effects");
      expect(containerEl.style.getPropertyValue("--ea-effects-duration")).toBe(
        "0.5s"
      );
      expect(containerEl.style.getPropertyValue("--ea-effects-delay")).toBe(
        "0.1s"
      );
      expect(
        containerEl.style.getPropertyValue("--ea-effects-timing-function")
      ).toBe("ease-out");
      expect(
        containerEl.style.getPropertyValue("--ea-effects-iteration-count")
      ).toBe("2");
    });
  });
});
