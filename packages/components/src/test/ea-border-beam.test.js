import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { waitForRender } from "./utils/waitForRender";

import "../components/ea-border-beam/index";

describe("EaBorderBeam", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe("Basic Functionality", () => {
    it("应该正确渲染 ea-border-beam 组件", async () => {
      const el = document.createElement("ea-border-beam");
      container.appendChild(el);

      await waitForRender();

      expect(el).toBeDefined();
      expect(el.shadowRoot).toBeDefined();
    });

    it("应该包含 .ea-border-beam 容器元素", async () => {
      const el = document.createElement("ea-border-beam");
      container.appendChild(el);

      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-border-beam");
      expect(containerEl).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const el = document.createElement("ea-border-beam");
      container.appendChild(el);

      await waitForRender();

      expect(
        el.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
    });

    it("默认应该有 1 个 indicator CSS Part", async () => {
      const el = document.createElement("ea-border-beam");
      container.appendChild(el);

      await waitForRender();

      const indicators = el.shadowRoot.querySelectorAll('[part="indicator"]');
      expect(indicators.length).toBe(1);
    });

    it("应该支持 slot 内容", async () => {
      const el = document.createElement("ea-border-beam");
      el.innerHTML = '<div class="test-content">Slot Content</div>';
      container.appendChild(el);

      await waitForRender();

      const slot = el.shadowRoot.querySelector("slot");
      expect(slot).toBeDefined();
      expect(el.textContent).toContain("Slot Content");
    });
  });

  describe("Count Attribute", () => {
    it("默认 count 应该是 1", async () => {
      const el = document.createElement("ea-border-beam");
      container.appendChild(el);

      await waitForRender();

      expect(el.count).toBe(1);
    });

    it("应该正确设置 count 属性", async () => {
      const el = document.createElement("ea-border-beam");
      el.setAttribute("count", "3");
      container.appendChild(el);

      await waitForRender();

      expect(el.count).toBe(3);
    });

    it("count 变化时应该更新指示器数量", async () => {
      const el = document.createElement("ea-border-beam");
      container.appendChild(el);

      await waitForRender();

      expect(
        el.shadowRoot.querySelectorAll('[part="indicator"]').length
      ).toBe(1);

      el.setAttribute("count", "3");
      await waitForRender();

      const indicators = el.shadowRoot.querySelectorAll('[part="indicator"]');
      expect(indicators.length).toBe(3);
    });

    it("count 减少时应该移除多余的指示器", async () => {
      const el = document.createElement("ea-border-beam");
      el.setAttribute("count", "3");
      container.appendChild(el);

      await waitForRender();

      expect(
        el.shadowRoot.querySelectorAll('[part="indicator"]').length
      ).toBe(3);

      el.setAttribute("count", "1");
      await waitForRender();

      const indicators = el.shadowRoot.querySelectorAll('[part="indicator"]');
      expect(indicators.length).toBe(1);
    });

    it("count 为 0 时应该至少保留 1 个指示器", async () => {
      const el = document.createElement("ea-border-beam");
      el.setAttribute("count", "0");
      container.appendChild(el);

      await waitForRender();

      const indicators = el.shadowRoot.querySelectorAll('[part="indicator"]');
      expect(indicators.length).toBe(1);
    });
  });

  describe("Trigger Attribute", () => {
    it("默认 trigger 应该是空字符串", async () => {
      const el = document.createElement("ea-border-beam");
      container.appendChild(el);

      await waitForRender();

      expect(el.trigger).toBe("");
    });

    it("应该正确设置 trigger 属性", async () => {
      const el = document.createElement("ea-border-beam");
      el.setAttribute("trigger", "hover");
      container.appendChild(el);

      await waitForRender();

      expect(el.trigger).toBe("hover");
    });

    it("trigger=hover 时应该添加 is-trigger-hover 类名", async () => {
      const el = document.createElement("ea-border-beam");
      container.appendChild(el);

      await waitForRender();

      el.setAttribute("trigger", "hover");
      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-border-beam");
      expect(containerEl.classList.contains("is-trigger-hover")).toBe(true);
    });
  });

  describe("Size Attribute", () => {
    it("默认 size 应该是 100", async () => {
      const el = document.createElement("ea-border-beam");
      container.appendChild(el);

      await waitForRender();

      expect(el.size).toBe(100);
    });

    it("应该正确设置 size 属性", async () => {
      const el = document.createElement("ea-border-beam");
      el.setAttribute("size", "56");
      container.appendChild(el);

      await waitForRender();

      expect(el.size).toBe(56);
    });

    it("size 变化时应该更新 CSS 自定义属性", async () => {
      const el = document.createElement("ea-border-beam");
      container.appendChild(el);

      await waitForRender();

      el.setAttribute("size", "56");
      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-border-beam");
      expect(
        containerEl.style.getPropertyValue("--ea-border-beam-indicator-size")
      ).toBe("56px");
    });
  });

  describe("LineWidth Attribute", () => {
    it("默认 lineWidth 应该是 1", async () => {
      const el = document.createElement("ea-border-beam");
      container.appendChild(el);

      await waitForRender();

      expect(el.lineWidth).toBe(1);
    });

    it("应该正确设置 line-width 属性", async () => {
      const el = document.createElement("ea-border-beam");
      el.setAttribute("line-width", "2");
      container.appendChild(el);

      await waitForRender();

      expect(el.lineWidth).toBe(2);
    });

    it("line-width 变化时应该更新 CSS 自定义属性", async () => {
      const el = document.createElement("ea-border-beam");
      container.appendChild(el);

      await waitForRender();

      el.setAttribute("line-width", "3");
      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-border-beam");
      expect(
        containerEl.style.getPropertyValue(
          "--ea-border-beam-indicator-line-width"
        )
      ).toBe("3px");
    });
  });

  describe("Duration Attribute", () => {
    it("默认 duration 应该是 10", async () => {
      const el = document.createElement("ea-border-beam");
      container.appendChild(el);

      await waitForRender();

      expect(el.duration).toBe(10);
    });

    it("应该正确设置 duration 属性", async () => {
      const el = document.createElement("ea-border-beam");
      el.setAttribute("duration", "5");
      container.appendChild(el);

      await waitForRender();

      expect(el.duration).toBe(5);
    });

    it("duration 变化时应该更新 CSS 自定义属性", async () => {
      const el = document.createElement("ea-border-beam");
      container.appendChild(el);

      await waitForRender();

      el.setAttribute("duration", "5");
      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-border-beam");
      expect(
        containerEl.style.getPropertyValue("--ea-border-beam-duration")
      ).toBe("5s");
    });
  });

  describe("StartDelay Attribute", () => {
    it("默认 startDelay 应该是 0", async () => {
      const el = document.createElement("ea-border-beam");
      container.appendChild(el);

      await waitForRender();

      expect(el.startDelay).toBe(0);
    });

    it("应该正确设置 start-delay 属性", async () => {
      const el = document.createElement("ea-border-beam");
      el.setAttribute("start-delay", "2");
      container.appendChild(el);

      await waitForRender();

      expect(el.startDelay).toBe(2);
    });

    it("start-delay 变化时应该更新 CSS 自定义属性", async () => {
      const el = document.createElement("ea-border-beam");
      container.appendChild(el);

      await waitForRender();

      el.setAttribute("start-delay", "2");
      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-border-beam");
      expect(
        containerEl.style.getPropertyValue("--ea-border-beam-start-delay")
      ).toBe("2s");
    });
  });

  describe("CSS Custom Properties", () => {
    it("同时设置多个属性应该正确应用 CSS 自定义属性", async () => {
      const el = document.createElement("ea-border-beam");
      el.setAttribute("size", "56");
      el.setAttribute("line-width", "2");
      el.setAttribute("duration", "5");
      el.setAttribute("start-delay", "1");
      container.appendChild(el);

      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-border-beam");
      expect(
        containerEl.style.getPropertyValue("--ea-border-beam-indicator-size")
      ).toBe("56px");
      expect(
        containerEl.style.getPropertyValue(
          "--ea-border-beam-indicator-line-width"
        )
      ).toBe("2px");
      expect(
        containerEl.style.getPropertyValue("--ea-border-beam-duration")
      ).toBe("5s");
      expect(
        containerEl.style.getPropertyValue("--ea-border-beam-start-delay")
      ).toBe("1s");
    });
  });

  describe("BEM Class Names", () => {
    it("默认应该有 ea-border-beam class", async () => {
      const el = document.createElement("ea-border-beam");
      container.appendChild(el);

      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-border-beam");
      expect(containerEl.classList.contains("ea-border-beam")).toBe(true);
    });

    it("trigger=hover 时应该添加 is-trigger-hover class", async () => {
      const el = document.createElement("ea-border-beam");
      el.setAttribute("trigger", "hover");
      container.appendChild(el);

      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-border-beam");
      expect(containerEl.classList.contains("is-trigger-hover")).toBe(true);
    });
  });

  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const el = document.createElement("ea-border-beam");
      el.innerHTML = "<div>Content</div>";
      container.appendChild(el);

      await waitForRender();

      expect(el.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
      expect(
        el.shadowRoot.querySelectorAll('[part="indicator"]').length
      ).toBe(1);
    });

    it("组件断开连接后应该正常移除", () => {
      const el = document.createElement("ea-border-beam");
      container.appendChild(el);

      el.remove();

      expect(container.contains(el)).toBe(false);
    });

    it("动态修改 count 后 $mounted 不应报错", async () => {
      const el = document.createElement("ea-border-beam");
      el.setAttribute("count", "3");
      container.appendChild(el);

      await waitForRender();

      el.setAttribute("count", "5");
      await waitForRender();

      const indicators = el.shadowRoot.querySelectorAll('[part="indicator"]');
      expect(indicators.length).toBe(5);
    });
  });
});