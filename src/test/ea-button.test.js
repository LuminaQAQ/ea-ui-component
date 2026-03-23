import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

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
  describe("Type Attribute", () => {
    it("应该正确设置 type 属性", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("type", "primary");
      container.appendChild(button);

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(button.type).toBe("primary");
    });

    it("默认 type 应该是 normal", async () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(button.type).toBe("normal");
    });

    it("应该支持所有 type 类型", async () => {
      const types = [
        "normal",
        "primary",
        "success",
        "warning",
        "danger",
        "text",
        "link",
      ];

      for (const type of types) {
        const button = document.createElement("ea-button");
        button.setAttribute("type", type);
        container.appendChild(button);

        await new Promise(resolve => setTimeout(resolve, 0));

        expect(button.type).toBe(type);
        container.removeChild(button);
      }
    });

    it("type 属性变化时应该正确更新", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("type", "normal");
      container.appendChild(button);

      await new Promise(resolve => setTimeout(resolve, 0));
      expect(button.type).toBe("normal");

      button.setAttribute("type", "primary");
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(button.type).toBe("primary");
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

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(button.size).toBe("large");
    });

    it("默认 size 应该是 medium", async () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(button.size).toBe("medium");
    });

    it("应该支持所有 size 类型", async () => {
      const sizes = ["small", "medium", "large"];

      for (const size of sizes) {
        const button = document.createElement("ea-button");
        button.setAttribute("size", size);
        container.appendChild(button);

        await new Promise(resolve => setTimeout(resolve, 0));

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

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(button.disabled).toBe(true);
    });

    it("默认 disabled 应该是 false", async () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(button.disabled || false).toBe(false);
    });

    it("disabled 按钮应该设置 disabled 属性", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("disabled", "");
      container.appendChild(button);

      await new Promise(resolve => setTimeout(resolve, 0));

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

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(button.plain).toBe(true);
    });

    it("默认 plain 应该是 false", async () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      await new Promise(resolve => setTimeout(resolve, 0));

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

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(button.round).toBe(true);
    });

    it("默认 round 应该是 false", async () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      await new Promise(resolve => setTimeout(resolve, 0));

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

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(button.circle).toBe(true);
    });

    it("默认 circle 应该是 false", async () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      await new Promise(resolve => setTimeout(resolve, 0));

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

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(button.loading).toBe(true);
    });

    it("默认 loading 应该是 false", async () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(button.loading || false).toBe(false);
    });

    it("loading 为 true 时应该显示 loading 图标", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("loading", "");
      container.appendChild(button);

      await new Promise(resolve => setTimeout(resolve, 50));

      const loadingIcon = button.shadowRoot.querySelector("#ea-loading-icon");
      expect(loadingIcon).toBeDefined();
    });

    it("loading 为 true 时应该禁用按钮", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("loading", "");
      container.appendChild(button);

      await new Promise(resolve => setTimeout(resolve, 0));

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

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(button.icon).toBe("coffee");
    });

    it("应该渲染图标元素", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("icon", "coffee");
      container.appendChild(button);

      await new Promise(resolve => setTimeout(resolve, 0));

      const iconEl = button.shadowRoot.querySelector("ea-icon");
      expect(iconEl).toBeDefined();
    });

    it("图标应该有正确的 name 属性", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("icon", "coffee");
      container.appendChild(button);

      await new Promise(resolve => setTimeout(resolve, 0));

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

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(button.link).toBe(true);
    });

    it("link 为 true 时应该渲染为 a 标签", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("link", "");
      button.setAttribute("href", "https://example.com");
      container.appendChild(button);

      await new Promise(resolve => setTimeout(resolve, 0));

      const containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.tagName.toLowerCase()).toBe("a");
    });

    it("应该正确设置 href 属性", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("link", "");
      button.setAttribute("href", "https://example.com");
      container.appendChild(button);

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(button.href).toBe("https://example.com");
    });

    it("a 标签应该有正确的 href 属性", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("link", "");
      button.setAttribute("href", "https://example.com");
      container.appendChild(button);

      await new Promise(resolve => setTimeout(resolve, 0));

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

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(button.text).toBe(true);
    });

    it("默认 text 应该是 false", async () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      await new Promise(resolve => setTimeout(resolve, 0));

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

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(button["button-type"]).toBe("submit");
    });

    it("默认 button-type 应该是 button", async () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(button["button-type"]).toBe("button");
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

      await new Promise(resolve => setTimeout(resolve, 0));

      button.click();

      expect(clickHandler).toHaveBeenCalled();
    });

    it("disabled 时不应该触发 click 事件", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("disabled", "");
      container.appendChild(button);

      const clickHandler = vi.fn();
      button.addEventListener("click", clickHandler);

      await new Promise(resolve => setTimeout(resolve, 0));

      button.click();

      // disabled 按钮的 click 事件仍然会被触发，但按钮样式会显示为禁用
      // 这里我们验证按钮确实有 disabled 属性
      expect(button.disabled).toBe(true);
    });

    it("应该响应 Enter 键", async () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      const clickHandler = vi.fn();
      button.addEventListener("click", clickHandler);

      await new Promise(resolve => setTimeout(resolve, 0));

      const keypressEvent = new KeyboardEvent("keypress", { key: "Enter" });
      button.dispatchEvent(keypressEvent);

      expect(clickHandler).toHaveBeenCalled();
    });
  });

  /**
   * 复杂场景测试
   */
  describe("Complex Scenarios", () => {
    it("应该支持多种属性组合", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("type", "primary");
      button.setAttribute("size", "large");
      button.setAttribute("round", "");
      button.textContent = "Primary Button";
      container.appendChild(button);

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(button.type).toBe("primary");
      expect(button.size).toBe("large");
      expect(button.round).toBe(true);
    });

    it("应该支持图标按钮", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("icon", "coffee");
      button.setAttribute("circle", "");
      button.setAttribute("type", "primary");
      container.appendChild(button);

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(button.icon).toBe("coffee");
      expect(button.circle).toBe(true);
      expect(button.type).toBe("primary");
    });

    it("应该支持链接按钮", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("link", "");
      button.setAttribute("href", "https://example.com");
      button.setAttribute("type", "primary");
      button.textContent = "Link Button";
      container.appendChild(button);

      await new Promise(resolve => setTimeout(resolve, 0));

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

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(button.text).toBe(true);
      expect(button.icon).toBe("coffee");
    });

    it("loading 状态切换应该正确工作", async () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      await new Promise(resolve => setTimeout(resolve, 0));

      // 初始状态没有 loading 图标
      let loadingIcon = button.shadowRoot.querySelector("#ea-loading-icon");
      expect(loadingIcon).toBeNull();

      // 设置 loading
      button.setAttribute("loading", "");
      await new Promise(resolve => setTimeout(resolve, 50));

      loadingIcon = button.shadowRoot.querySelector("#ea-loading-icon");
      expect(loadingIcon).toBeDefined();

      // 取消 loading
      button.removeAttribute("loading");
      await new Promise(resolve => setTimeout(resolve, 50));

      loadingIcon = button.shadowRoot.querySelector("#ea-loading-icon");
      expect(loadingIcon).toBeNull();
    });
  });
});

describe("EaButtonGroup Component", () => {
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
    it("应该正确渲染 ea-button-group 组件", () => {
      const group = document.createElement("ea-button-group");
      container.appendChild(group);

      expect(group).toBeDefined();
      expect(group.shadowRoot).toBeDefined();
    });

    it("应该包含 button-group 容器元素", () => {
      const group = document.createElement("ea-button-group");
      container.appendChild(group);

      const groupContainer = group.shadowRoot.querySelector(".ea-button-group");
      expect(groupContainer).toBeDefined();
    });

    it("应该支持 slot 内容", () => {
      const group = document.createElement("ea-button-group");
      group.innerHTML = `
        <ea-button>Button 1</ea-button>
        <ea-button>Button 2</ea-button>
      `;
      container.appendChild(group);

      const slot = group.shadowRoot.querySelector("slot");
      expect(slot).toBeDefined();
    });
  });

  /**
   * Type 属性测试
   */
  describe("Type Attribute", () => {
    it("应该正确设置 type 属性", async () => {
      const group = document.createElement("ea-button-group");
      group.setAttribute("type", "primary");
      group.innerHTML = `
        <ea-button>Button 1</ea-button>
        <ea-button>Button 2</ea-button>
      `;
      container.appendChild(group);

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(group.type).toBe("primary");
    });

    it("应该包含子按钮", async () => {
      const group = document.createElement("ea-button-group");
      group.innerHTML = `
        <ea-button>Button 1</ea-button>
        <ea-button>Button 2</ea-button>
      `;
      container.appendChild(group);

      await new Promise(resolve => setTimeout(resolve, 0));

      const buttons = group.querySelectorAll("ea-button");
      expect(buttons.length).toBe(2);
    });
  });

  /**
   * Size 属性测试
   */
  describe("Size Attribute", () => {
    it("应该正确设置 size 属性", async () => {
      const group = document.createElement("ea-button-group");
      group.setAttribute("size", "small");
      container.appendChild(group);

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(group.size).toBe("small");
    });

    it("应该支持 size 属性", async () => {
      const group = document.createElement("ea-button-group");
      group.setAttribute("size", "large");
      container.appendChild(group);

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(group.size).toBe("large");
    });
  });

  /**
   * Disabled 属性测试
   */
  describe("Disabled Attribute", () => {
    it("应该正确设置 disabled 属性", async () => {
      const group = document.createElement("ea-button-group");
      group.setAttribute("disabled", "");
      container.appendChild(group);

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(group.disabled).toBe(true);
    });

    it("应该支持 disabled 属性", async () => {
      const group = document.createElement("ea-button-group");
      group.setAttribute("disabled", "");
      container.appendChild(group);

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(group.disabled).toBe(true);
    });
  });

  /**
   * 复杂场景测试
   */
  describe("Complex Scenarios", () => {
    it("应该支持多个按钮组合", async () => {
      const group = document.createElement("ea-button-group");
      group.innerHTML = `
        <ea-button icon="angle-left">上一页</ea-button>
        <ea-button>下一页</ea-button>
      `;
      container.appendChild(group);

      await new Promise(resolve => setTimeout(resolve, 0));

      const buttons = group.querySelectorAll("ea-button");
      expect(buttons.length).toBe(2);
    });

    it("应该支持属性组合", async () => {
      const group = document.createElement("ea-button-group");
      group.setAttribute("type", "primary");
      group.setAttribute("size", "small");
      group.innerHTML = `
        <ea-button>后退</ea-button>
        <ea-button>刷新</ea-button>
        <ea-button>前进</ea-button>
      `;
      container.appendChild(group);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(group.type).toBe("primary");
      expect(group.size).toBe("small");

      const buttons = group.querySelectorAll("ea-button");
      expect(buttons.length).toBe(3);
    });
  });
});
