import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { waitForRender } from "./utils/waitForRender";

import "../components/ea-divider/index";

describe("EaDivider", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe("Basic Functionality", () => {
    it("应该正确渲染 ea-divider 组件", async () => {
      const el = document.createElement("ea-divider");
      container.appendChild(el);

      await waitForRender();

      expect(el).toBeDefined();
      expect(el.shadowRoot).toBeDefined();
    });

    it("应该包含 .ea-divider 容器元素", async () => {
      const el = document.createElement("ea-divider");
      container.appendChild(el);

      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-divider");
      expect(containerEl).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const el = document.createElement("ea-divider");
      container.appendChild(el);

      await waitForRender();

      expect(
        el.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
    });

    it("应该包含 line CSS Part", async () => {
      const el = document.createElement("ea-divider");
      container.appendChild(el);

      await waitForRender();

      const lines = el.shadowRoot.querySelectorAll('.ea-divider__line');
      expect(lines.length).toBe(2);
    });

    it("应该包含 content CSS Part", async () => {
      const el = document.createElement("ea-divider");
      container.appendChild(el);

      await waitForRender();

      expect(
        el.shadowRoot.querySelector('[part="content"]')
      ).toBeTruthy();
    });

    it("应该包含 role='separator' 属性", async () => {
      const el = document.createElement("ea-divider");
      container.appendChild(el);

      await waitForRender();

      const containerEl = el.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.getAttribute("role")).toBe("separator");
    });
  });

  describe("Variant Attribute", () => {
    it("默认 variant 应该是空字符串", async () => {
      const el = document.createElement("ea-divider");
      container.appendChild(el);

      await waitForRender();

      expect(el.variant).toBe("");
    });

    it("应该正确设置 variant 属性", async () => {
      const el = document.createElement("ea-divider");
      el.setAttribute("variant", "dashed");
      container.appendChild(el);

      await waitForRender();

      expect(el.variant).toBe("dashed");
    });

    it("variant 变化时应该更新 CSS 自定义属性", async () => {
      const el = document.createElement("ea-divider");
      container.appendChild(el);

      await waitForRender();

      el.setAttribute("variant", "dashed");
      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-divider");
      expect(
        containerEl.style.getPropertyValue("--ea-divider-border-style")
      ).toBe("dashed");
    });
  });

  describe("ContentPosition Attribute", () => {
    it("默认 contentPosition 应该是 center", async () => {
      const el = document.createElement("ea-divider");
      container.appendChild(el);

      await waitForRender();

      expect(el.contentPosition).toBe("center");
    });

    it("应该正确设置 content-position 属性为 start", async () => {
      const el = document.createElement("ea-divider");
      el.setAttribute("content-position", "start");
      container.appendChild(el);

      await waitForRender();

      expect(el.contentPosition).toBe("start");
    });

    it("应该正确设置 content-position 属性为 end", async () => {
      const el = document.createElement("ea-divider");
      el.setAttribute("content-position", "end");
      container.appendChild(el);

      await waitForRender();

      expect(el.contentPosition).toBe("end");
    });
  });

  describe("Direction Attribute", () => {
    it("默认 direction 应该是 horizontal", async () => {
      const el = document.createElement("ea-divider");
      container.appendChild(el);

      await waitForRender();

      expect(el.direction).toBe("horizontal");
    });

    it("应该正确设置 direction 属性为 vertical", async () => {
      const el = document.createElement("ea-divider");
      el.setAttribute("direction", "vertical");
      container.appendChild(el);

      await waitForRender();

      expect(el.direction).toBe("vertical");
    });
  });

  describe("Slot Content", () => {
    it("无插槽内容时应该添加 is-empty 类名", async () => {
      const el = document.createElement("ea-divider");
      container.appendChild(el);

      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-divider");
      expect(containerEl.classList.contains("is-empty")).toBe(true);
    });

    it("有插槽内容时不应该有 is-empty 类名", async () => {
      const el = document.createElement("ea-divider");
      el.textContent = "Text Content";
      container.appendChild(el);

      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-divider");
      expect(containerEl.classList.contains("is-empty")).toBe(false);
    });

    it("插槽内容动态变化时应该更新类名", async () => {
      const el = document.createElement("ea-divider");
      container.appendChild(el);

      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-divider");
      expect(containerEl.classList.contains("is-empty")).toBe(true);

      el.textContent = "New Content";
      el.dispatchEvent(new Event("slotchange", { bubbles: true }));
      await waitForRender();

      expect(containerEl.classList.contains("is-empty")).toBe(false);
    });
  });

  describe("BEM Class Names", () => {
    it("应该包含 ea-divider class", async () => {
      const el = document.createElement("ea-divider");
      container.appendChild(el);

      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-divider");
      expect(containerEl).toBeTruthy();
    });

    it("content-position=start 时应该添加 ea-divider--start class", async () => {
      const el = document.createElement("ea-divider");
      el.setAttribute("content-position", "start");
      container.appendChild(el);

      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-divider");
      expect(containerEl.classList.contains("ea-divider--start")).toBe(true);
    });

    it("direction=vertical 时应该添加 ea-divider--vertical class", async () => {
      const el = document.createElement("ea-divider");
      el.setAttribute("direction", "vertical");
      container.appendChild(el);

      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-divider");
      expect(containerEl.classList.contains("ea-divider--vertical")).toBe(true);
    });
  });

  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const el = document.createElement("ea-divider");
      container.appendChild(el);

      await waitForRender();

      expect(el.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
      expect(
        el.shadowRoot.querySelectorAll('.ea-divider__line').length
      ).toBe(2);
      expect(el.shadowRoot.querySelector('[part="content"]')).toBeTruthy();
    });

    it("组件断开连接后应该正常移除", () => {
      const el = document.createElement("ea-divider");
      container.appendChild(el);

      el.remove();

      expect(container.contains(el)).toBe(false);
    });
  });
});