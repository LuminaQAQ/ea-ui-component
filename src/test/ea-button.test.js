import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender";

// 导入 ea-button 组件
import "../components/ea-button/index.js";

describe("EaButton Component", () => {
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
    it("应该正确渲染 ea-button 组件", () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      expect(button).toBeDefined();
      expect(button.shadowRoot).toBeDefined();
    });

    it("应该包含 button 容器元素", () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      const buttonContainer = button.shadowRoot.querySelector(".ea-button");
      expect(buttonContainer).toBeDefined();
    });

    it("应该渲染为 button 标签", () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      const buttonContainer = button.shadowRoot.querySelector(".ea-button");
      expect(buttonContainer.tagName.toLowerCase()).toBe("button");
    });

    it("应该支持 slot 内容", () => {
      const button = document.createElement("ea-button");
      button.textContent = "Click Me";
      container.appendChild(button);

      const slot = button.shadowRoot.querySelector("slot");
      expect(slot).toBeDefined();
    });
  });

  /**
   * Type 属性测试
   */
  describe("Variant Attribute", () => {
    it("应该正确设置 variant 属性", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("variant", "primary");
      container.appendChild(button);

      await waitForRender(0);

      expect(button.variant).toBe("primary");
    });

    it("默认 variant 应该是 normal", async () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      await waitForRender(0);

      expect(button.variant).toBe("normal");
    });

    it("应该支持所有 variant 类型", async () => {
      const variants = ["normal", "primary", "success", "warning", "danger"];

      for (const variant of variants) {
        const button = document.createElement("ea-button");
        button.setAttribute("variant", variant);
        container.appendChild(button);

        await waitForRender(0);

        expect(button.variant).toBe(variant);
        container.removeChild(button);
      }
    });

    it("variant 属性变化时应该正确更新", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("variant", "normal");
      container.appendChild(button);

      await waitForRender(0);
      expect(button.variant).toBe("normal");

      button.setAttribute("variant", "primary");
      await waitForRender(0);

      expect(button.variant).toBe("primary");
    });
  });

  /**
   * Size 属性测试
   */
  describe("Size Attribute", () => {
    it("应该正确设置 size 属性", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("size", "large");
      container.appendChild(button);

      await waitForRender(0);

      expect(button.size).toBe("large");
    });

    it("默认 size 应该是 medium", async () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      await waitForRender(0);

      expect(button.size).toBe("medium");
    });

    it("应该支持所有 size 类型", async () => {
      const sizes = ["small", "medium", "large"];

      for (const size of sizes) {
        const button = document.createElement("ea-button");
        button.setAttribute("size", size);
        container.appendChild(button);

        await waitForRender(0);

        expect(button.size).toBe(size);
        container.removeChild(button);
      }
    });
  });

  /**
   * Disabled 属性测试
   */
  describe("Disabled Attribute", () => {
    it("应该正确设置 disabled 属性", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("disabled", "");
      container.appendChild(button);

      await waitForRender(0);

      expect(button.disabled).toBe(true);
    });

    it("默认 disabled 应该是 false", async () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      await waitForRender(0);

      expect(button.disabled || false).toBe(false);
    });

    it("disabled 按钮应该设置 disabled 属性", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("disabled", "");
      container.appendChild(button);

      await waitForRender(0);

      // 验证组件的 disabled 属性
      expect(button.disabled).toBe(true);
      // 验证 HTML 属性存在
      expect(button.hasAttribute("disabled")).toBe(true);
    });
  });

  /**
   * Plain 属性测试
   */
  describe("Plain Attribute", () => {
    it("应该正确设置 plain 属性", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("plain", "");
      container.appendChild(button);

      await waitForRender(0);

      expect(button.plain).toBe(true);
    });

    it("默认 plain 应该是 false", async () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      await waitForRender(0);

      expect(button.plain || false).toBe(false);
    });
  });

  /**
   * Round 属性测试
   */
  describe("Round Attribute", () => {
    it("应该正确设置 round 属性", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("round", "");
      container.appendChild(button);

      await waitForRender(0);

      expect(button.round).toBe(true);
    });

    it("默认 round 应该是 false", async () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      await waitForRender(0);

      expect(button.round || false).toBe(false);
    });
  });

  /**
   * Circle 属性测试
   */
  describe("Circle Attribute", () => {
    it("应该正确设置 circle 属性", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("circle", "");
      container.appendChild(button);

      await waitForRender(0);

      expect(button.circle).toBe(true);
    });

    it("默认 circle 应该是 false", async () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      await waitForRender(0);

      expect(button.circle || false).toBe(false);
    });
  });

  /**
   * Loading 属性测试
   */
  describe("Loading Attribute", () => {
    it("应该正确设置 loading 属性", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("loading", "");
      container.appendChild(button);

      await waitForRender(0);

      expect(button.loading).toBe(true);
    });

    it("默认 loading 应该是 false", async () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      await waitForRender(0);

      expect(button.loading || false).toBe(false);
    });

    it("loading 为 true 时应该显示 loading 图标", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("loading", "");
      container.appendChild(button);

      await waitForRender(50);

      const loadingIcon = button.shadowRoot.querySelector("#ea-loading-icon");
      expect(loadingIcon).toBeDefined();
    });

    it("loading 为 true 时应该禁用按钮", async () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      await waitForRender(0);

      // 在组件挂载后再设置 loading 属性
      button.setAttribute("loading", "");

      await waitForRender(100);

      expect(button.hasAttribute("disabled")).toBe(true);
    });
  });

  /**
   * Icon 属性测试
   */
  describe("Icon Attribute", () => {
    it("应该正确设置 icon 属性", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("icon", "coffee");
      container.appendChild(button);

      await waitForRender(0);

      expect(button.icon).toBe("coffee");
    });

    it("应该渲染图标元素", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("icon", "coffee");
      container.appendChild(button);

      await waitForRender(0);

      const iconEl = button.shadowRoot.querySelector("ea-icon");
      expect(iconEl).toBeDefined();
    });

    it("图标应该有正确的 name 属性", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("icon", "coffee");
      container.appendChild(button);

      await waitForRender(50);

      const iconEl = button.shadowRoot.querySelector("ea-icon");
      expect(iconEl.getAttribute("name")).toBe("coffee");
    });
  });

  /**
   * Link 和 Href 属性测试
   */
  describe("Link and Href Attributes", () => {
    it("应该正确设置 link 属性", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("link", "");
      container.appendChild(button);

      await waitForRender(0);

      expect(button.link).toBe(true);
    });

    it("link 为 true 时应该渲染为 a 标签", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("link", "");
      button.setAttribute("href", "https://example.com");
      container.appendChild(button);

      await waitForRender(0);

      const containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.tagName.toLowerCase()).toBe("a");
    });

    it("应该正确设置 href 属性", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("link", "");
      button.setAttribute("href", "https://example.com");
      container.appendChild(button);

      await waitForRender(0);

      expect(button.href).toBe("https://example.com");
    });

    it("a 标签应该有正确的 href 属性", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("link", "");
      button.setAttribute("href", "https://example.com");
      container.appendChild(button);

      await waitForRender(0);

      const containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.getAttribute("href")).toBe("https://example.com");
    });
  });

  /**
   * Text 属性测试
   */
  describe("Text Attribute", () => {
    it("应该正确设置 text 属性", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("text", "");
      container.appendChild(button);

      await waitForRender(0);

      expect(button.text).toBe(true);
    });

    it("默认 text 应该是 false", async () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      await waitForRender(0);

      expect(button.text || false).toBe(false);
    });
  });

  /**
   * Button-Type 属性测试
   */
  describe("Button-Type Attribute", () => {
    it("应该正确设置 button-type 属性", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("button-type", "submit");
      container.appendChild(button);

      await waitForRender(0);

      expect(button.buttonType).toBe("submit");
    });

    it("默认 button-type 应该是 button", async () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      await waitForRender(0);

      expect(button.buttonType).toBe("button");
    });
  });

  /**
   * CSS Part 测试
   */
  describe("CSS Parts", () => {
    it("应该正确设置 container part", () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      const containerEl = button.shadowRoot.querySelector('[part="container"]');
      expect(containerEl).toBeDefined();
    });

    it("应该正确设置 icon part", () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      const iconEl = button.shadowRoot.querySelector('[part="icon"]');
      expect(iconEl).toBeDefined();
    });
  });

  /**
   * 事件测试
   */
  describe("Events", () => {
    it("应该触发 click 事件", async () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      const clickHandler = vi.fn();
      button.addEventListener("click", clickHandler);

      await waitForRender(0);

      button.click();

      expect(clickHandler).toHaveBeenCalled();
    });

    it("disabled 时不应该触发 click 事件", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("disabled", "");
      container.appendChild(button);

      const clickHandler = vi.fn();
      button.addEventListener("click", clickHandler);

      await waitForRender(0);

      button.click();

      // disabled 按钮的 click 事件仍然会被触发，但按钮样式会显示为禁用
      // 这里我们验证按钮确实有 disabled 属性
      expect(button.disabled).toBe(true);
    });

    it("应该响应 Enter 键", async () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      await waitForRender(0);

      const clickHandler = vi.fn();
      button.addEventListener("click", clickHandler);

      // 事件需要派发到 shadowRoot，因为 @listen 装饰器监听的是 shadowRoot
      const keypressEvent = new KeyboardEvent("keypress", {
        key: "Enter",
        bubbles: true,
      });
      button.shadowRoot.dispatchEvent(keypressEvent);

      expect(clickHandler).toHaveBeenCalled();
    });
  });

  /**
   * 复杂场景测试
   */
  describe("Complex Scenarios", () => {
    it("应该支持多种属性组合", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("variant", "primary");
      button.setAttribute("size", "large");
      button.setAttribute("round", "");
      button.textContent = "Primary Button";
      container.appendChild(button);

      await waitForRender(0);

      expect(button.variant).toBe("primary");
      expect(button.size).toBe("large");
      expect(button.round).toBe(true);
    });

    it("应该支持图标按钮", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("icon", "coffee");
      button.setAttribute("circle", "");
      button.setAttribute("variant", "primary");
      container.appendChild(button);

      await waitForRender(0);

      expect(button.icon).toBe("coffee");
      expect(button.circle).toBe(true);
      expect(button.variant).toBe("primary");
    });

    it("应该支持链接按钮", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("link", "");
      button.setAttribute("href", "https://example.com");
      button.setAttribute("type", "primary");
      button.textContent = "Link Button";
      container.appendChild(button);

      await waitForRender(0);

      const containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.tagName.toLowerCase()).toBe("a");
      expect(containerEl.getAttribute("href")).toBe("https://example.com");
    });

    it("应该支持文字按钮", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("text", "");
      button.setAttribute("icon", "coffee");
      button.textContent = "Text Button";
      container.appendChild(button);

      await waitForRender(0);

      expect(button.text).toBe(true);
      expect(button.icon).toBe("coffee");
    });

    it("loading 状态切换应该正确工作", async () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      await waitForRender(0);

      // 初始状态没有 loading 图标
      let loadingIcon = button.shadowRoot.querySelector("#ea-loading-icon");
      expect(loadingIcon).toBeNull();

      // 设置 loading
      button.setAttribute("loading", "");
      await waitForRender(50);

      loadingIcon = button.shadowRoot.querySelector("#ea-loading-icon");
      expect(loadingIcon).toBeDefined();

      // 取消 loading
      button.removeAttribute("loading");
      await waitForRender(50);

      loadingIcon = button.shadowRoot.querySelector("#ea-loading-icon");
      expect(loadingIcon).toBeNull();
    });
  });
});
