import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender";

global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

import "../components/ea-affix/index";

describe("EaAffix", () => {
  let container;
  let originalScrollY;
  let originalInnerHeight;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);

    originalScrollY = window.scrollY;
    originalInnerHeight = window.innerHeight;

    Object.defineProperty(window, "scrollY", { value: 0, writable: true });
    Object.defineProperty(window, "innerHeight", {
      value: 800,
      writable: true,
    });
  });

  afterEach(() => {
    Object.defineProperty(window, "scrollY", {
      value: originalScrollY,
      writable: true,
    });
    Object.defineProperty(window, "innerHeight", {
      value: originalInnerHeight,
      writable: true,
    });
    container.remove();
  });

  describe("Basic Functionality", () => {
    it("应该正确渲染 ea-affix 组件", async () => {
      const el = document.createElement("ea-affix");
      container.appendChild(el);

      await waitForRender();

      expect(el).toBeDefined();
      expect(el.shadowRoot).toBeDefined();
    });

    it("应该包含 .ea-affix 容器元素", async () => {
      const el = document.createElement("ea-affix");
      container.appendChild(el);

      await waitForRender();

      expect(el.shadowRoot.querySelector(".ea-affix")).toBeTruthy();
    });

    it("应该包含 container CSS Part", async () => {
      const el = document.createElement("ea-affix");
      container.appendChild(el);

      await waitForRender();

      expect(el.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("应该包含 slot 元素且透传内容", async () => {
      const el = document.createElement("ea-affix");
      el.innerHTML = '<button class="demo-btn">Affix</button>';
      container.appendChild(el);

      await waitForRender();

      expect(el.shadowRoot.querySelector("slot")).toBeTruthy();
      expect(el.textContent).toContain("Affix");
    });
  });

  describe("Offset Attribute", () => {
    it("默认 offset 应该是 0", async () => {
      const el = document.createElement("ea-affix");
      container.appendChild(el);

      await waitForRender();

      expect(el.offset).toBe(0);
    });

    it("应该正确设置 offset 属性", async () => {
      const el = document.createElement("ea-affix");
      el.setAttribute("offset", "120");
      container.appendChild(el);

      await waitForRender();

      expect(el.offset).toBe(120);
    });
  });

  describe("Target Attribute", () => {
    it("默认 target 应该是空字符串", async () => {
      const el = document.createElement("ea-affix");
      container.appendChild(el);

      await waitForRender();

      expect(el.target).toBe("");
    });

    it("应该正确设置 target 属性", async () => {
      const target = document.createElement("div");
      target.className = "affix-target";
      document.body.appendChild(target);

      const el = document.createElement("ea-affix");
      el.setAttribute("target", ".affix-target");
      container.appendChild(el);

      await waitForRender();

      expect(el.target).toBe(".affix-target");

      target.remove();
    });
  });

  describe("Position Attribute", () => {
    it("默认 position 应该是 top", async () => {
      const el = document.createElement("ea-affix");
      container.appendChild(el);

      await waitForRender();

      expect(el.position).toBe("top");
    });

    it("应该正确设置 position 属性", async () => {
      const el = document.createElement("ea-affix");
      el.setAttribute("position", "bottom");
      container.appendChild(el);

      await waitForRender();

      expect(el.position).toBe("bottom");
    });
  });

  describe("BEM Class Names", () => {
    it("挂载后容器应包含基础类名", async () => {
      const el = document.createElement("ea-affix");
      container.appendChild(el);

      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-affix");
      expect(containerEl.classList.contains("ea-affix")).toBe(true);
    });

    it("position 为 top 时容器应包含 modifier 类名", async () => {
      const el = document.createElement("ea-affix");
      el.setAttribute("position", "top");
      container.appendChild(el);

      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-affix");
      expect(containerEl.classList.contains("ea-affix--top")).toBe(true);
    });

    it("position 为 bottom 时容器应包含 modifier 类名", async () => {
      const el = document.createElement("ea-affix");
      el.setAttribute("position", "bottom");
      container.appendChild(el);

      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-affix");
      expect(containerEl.classList.contains("ea-affix--bottom")).toBe(true);
    });
  });

  describe("Scroll Behavior", () => {
    it("组件顶部未超过 offset 时不应固定", async () => {
      const el = document.createElement("ea-affix");
      el.setAttribute("offset", "120");
      container.appendChild(el);

      vi.spyOn(el, "getBoundingClientRect").mockReturnValue({
        top: 200,
        bottom: 240,
        left: 10,
        width: 100,
        height: 40,
      });

      window.dispatchEvent(new Event("scroll"));
      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-affix");
      expect(containerEl.classList.contains("is-affix")).toBe(false);
    });

    it("组件顶部超过 offset 后应固定", async () => {
      const el = document.createElement("ea-affix");
      el.setAttribute("offset", "120");
      container.appendChild(el);

      vi.spyOn(el, "getBoundingClientRect").mockReturnValue({
        top: 100,
        bottom: 140,
        left: 10,
        width: 100,
        height: 40,
      });

      window.dispatchEvent(new Event("scroll"));
      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-affix");
      expect(containerEl.classList.contains("is-affix")).toBe(true);
    });

    it("固定后应设置 x/y 变量", async () => {
      const el = document.createElement("ea-affix");
      el.setAttribute("offset", "120");
      container.appendChild(el);

      vi.spyOn(el, "getBoundingClientRect").mockReturnValue({
        top: 100,
        bottom: 140,
        left: 10,
        width: 100,
        height: 40,
      });

      window.dispatchEvent(new Event("scroll"));
      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-affix");
      expect(containerEl.style.getPropertyValue("--ea-affix-x")).toBe("10px");
      expect(containerEl.style.getPropertyValue("--ea-affix-y")).toBe("120px");
    });

    it("未固定时不应设置 x/y 变量", async () => {
      const el = document.createElement("ea-affix");
      el.setAttribute("offset", "120");
      container.appendChild(el);

      vi.spyOn(el, "getBoundingClientRect").mockReturnValue({
        top: 300,
        bottom: 340,
        left: 10,
        width: 100,
        height: 40,
      });

      window.dispatchEvent(new Event("scroll"));
      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-affix");
      expect(containerEl.style.getPropertyValue("--ea-affix-x")).toBe("");
      expect(containerEl.style.getPropertyValue("--ea-affix-y")).toBe("");
    });

    it("position 为 bottom 且接近底部时应固定", async () => {
      const el = document.createElement("ea-affix");
      el.setAttribute("position", "bottom");
      el.setAttribute("offset", "20");
      container.appendChild(el);

      vi.spyOn(el, "getBoundingClientRect").mockReturnValue({
        top: 740,
        bottom: 780,
        left: 10,
        width: 100,
        height: 40,
      });

      window.dispatchEvent(new Event("scroll"));
      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-affix");
      expect(containerEl.classList.contains("is-affix")).toBe(true);
    });

    it("window resize 事件应触发状态重算", async () => {
      const el = document.createElement("ea-affix");
      el.setAttribute("offset", "120");
      container.appendChild(el);

      vi.spyOn(el, "getBoundingClientRect").mockReturnValue({
        top: 100,
        bottom: 140,
        left: 10,
        width: 100,
        height: 40,
      });

      window.dispatchEvent(new Event("resize"));
      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-affix");
      expect(containerEl.classList.contains("is-affix")).toBe(true);
    });
  });

  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const el = document.createElement("ea-affix");
      container.appendChild(el);

      await waitForRender();

      expect(el.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("组件断开连接后应该正常移除", () => {
      const el = document.createElement("ea-affix");
      container.appendChild(el);

      el.remove();

      expect(container.contains(el)).toBe(false);
    });
  });
});
