import { describe, it, expect, beforeEach, afterEach } from "vitest";

// 导入 ea-result 组件
import "../components/ea-result/index.js";

describe("EaResult Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  /**
   * 基础功能测试
   */
  describe("Basic Functionality", () => {
    it("应该正确渲染组件", async () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(result.shadowRoot).toBeTruthy();
      expect(result.shadowRoot.querySelector(".ea-result")).toBeTruthy();
    });

    it("应该支持 CSS Parts", async () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(result.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
      expect(result.shadowRoot.querySelector('[part="icon-wrap"]')).toBeTruthy();
      expect(result.shadowRoot.querySelector('[part="icon"]')).toBeTruthy();
      expect(result.shadowRoot.querySelector('[part="title"]')).toBeTruthy();
      expect(result.shadowRoot.querySelector('[part="sub-title"]')).toBeTruthy();
      expect(result.shadowRoot.querySelector('[part="extra"]')).toBeTruthy();
    });

    it("应该包含所有必要的 DOM 元素", async () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(result.shadowRoot.querySelector(".ea-result__icon-wrap")).toBeTruthy();
      expect(result.shadowRoot.querySelector(".ea-result__title")).toBeTruthy();
      expect(result.shadowRoot.querySelector(".ea-result__sub-title")).toBeTruthy();
      expect(result.shadowRoot.querySelector(".ea-result__extra")).toBeTruthy();
    });
  });

  /**
   * Title 属性测试
   */
  describe("Title Attribute", () => {
    it("应该支持 title 属性", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("title", "Test Title");
      container.appendChild(result);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(result.title).toBe("Test Title");
    });

    it("title 应该渲染到 slot 中", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("title", "Test Title");
      container.appendChild(result);

      await new Promise(resolve => setTimeout(resolve, 50));

      const titleSlot = result.shadowRoot.querySelector('.ea-result__title slot');
      expect(titleSlot.textContent).toBe("Test Title");
    });

    it("应该支持通过 title slot 自定义内容", async () => {
      const result = document.createElement("ea-result");
      result.innerHTML = `
        <span slot="title">Custom Title</span>
      `;
      container.appendChild(result);

      await new Promise(resolve => setTimeout(resolve, 50));

      const titleSlot = result.shadowRoot.querySelector('.ea-result__title slot');
      expect(titleSlot).toBeTruthy();
    });
  });

  /**
   * Sub-title 属性测试
   */
  describe("Sub-title Attribute", () => {
    it("应该支持 sub-title 属性", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("sub-title", "Test Subtitle");
      container.appendChild(result);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(result["sub-title"]).toBe("Test Subtitle");
    });

    it("sub-title 应该渲染到 slot 中", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("sub-title", "Test Subtitle");
      container.appendChild(result);

      await new Promise(resolve => setTimeout(resolve, 50));

      const subTitleSlot = result.shadowRoot.querySelector('.ea-result__sub-title slot');
      expect(subTitleSlot.textContent).toBe("Test Subtitle");
    });

    it("应该支持通过 sub-title slot 自定义内容", async () => {
      const result = document.createElement("ea-result");
      result.innerHTML = `
        <span slot="sub-title">Custom Subtitle</span>
      `;
      container.appendChild(result);

      await new Promise(resolve => setTimeout(resolve, 50));

      const subTitleSlot = result.shadowRoot.querySelector('.ea-result__sub-title slot');
      expect(subTitleSlot).toBeTruthy();
    });
  });

  /**
   * Type 属性测试
   */
  describe("Type Attribute", () => {
    it("默认 type 应该是空字符串", async () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(result.type === "" || result.type === null).toBe(true);
    });

    it("应该支持 success 类型", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("type", "success");
      container.appendChild(result);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(result.type).toBe("success");
      const containerEl = result.shadowRoot.querySelector(".ea-result");
      expect(containerEl.classList.contains("ea-result--success")).toBe(true);
    });

    it("应该支持 warning 类型", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("type", "warning");
      container.appendChild(result);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(result.type).toBe("warning");
      const containerEl = result.shadowRoot.querySelector(".ea-result");
      expect(containerEl.classList.contains("ea-result--warning")).toBe(true);
    });

    it("应该支持 error 类型", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("type", "error");
      container.appendChild(result);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(result.type).toBe("error");
      const containerEl = result.shadowRoot.querySelector(".ea-result");
      expect(containerEl.classList.contains("ea-result--error")).toBe(true);
    });

    it("应该支持 info 类型", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("type", "info");
      container.appendChild(result);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(result.type).toBe("info");
      const containerEl = result.shadowRoot.querySelector(".ea-result");
      expect(containerEl.classList.contains("ea-result--info")).toBe(true);
    });

    it("应该支持 primary 类型", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("type", "primary");
      container.appendChild(result);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(result.type).toBe("primary");
      const containerEl = result.shadowRoot.querySelector(".ea-result");
      expect(containerEl.classList.contains("ea-result--primary")).toBe(true);
    });
  });

  /**
   * Icon 属性测试
   */
  describe("Icon Attribute", () => {
    it("应该支持 icon 属性", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("icon", "custom-icon");
      container.appendChild(result);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(result.icon).toBe("custom-icon");
    });

    it("type 应该自动设置对应的图标", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("type", "success");
      container.appendChild(result);

      await new Promise(resolve => setTimeout(resolve, 50));

      const icon = result.shadowRoot.querySelector(".ea-result__default-icon");
      expect(icon).toBeTruthy();
      expect(icon.getAttribute("name")).toBeTruthy();
    });

    it("应该支持通过 icon slot 自定义图标", async () => {
      const result = document.createElement("ea-result");
      result.innerHTML = `
        <div slot="icon">Custom Icon</div>
      `;
      container.appendChild(result);

      await new Promise(resolve => setTimeout(resolve, 50));

      const iconSlot = result.shadowRoot.querySelector('slot[name="icon"]');
      expect(iconSlot).toBeTruthy();
    });
  });

  /**
   * Extra Slot 测试
   */
  describe("Extra Slot", () => {
    it("应该支持 extra slot", async () => {
      const result = document.createElement("ea-result");
      result.innerHTML = `
        <div slot="extra">
          <button>Back</button>
        </div>
      `;
      container.appendChild(result);

      await new Promise(resolve => setTimeout(resolve, 50));

      const extraSlot = result.shadowRoot.querySelector('slot[name="extra"]');
      expect(extraSlot).toBeTruthy();
    });

    it("extra slot 应该能包含按钮", async () => {
      const result = document.createElement("ea-result");
      result.innerHTML = `
        <div slot="extra">
          <button id="back-btn">Back</button>
          <button id="retry-btn">Retry</button>
        </div>
      `;
      container.appendChild(result);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(result.querySelector("#back-btn")).toBeTruthy();
      expect(result.querySelector("#retry-btn")).toBeTruthy();
    });
  });

  /**
   * 边界条件测试
   */
  describe("Edge Cases", () => {
    it("应该处理空属性", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("title", "");
      result.setAttribute("sub-title", "");
      container.appendChild(result);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(result.shadowRoot.querySelector(".ea-result")).toBeTruthy();
    });

    it("应该处理同时设置 type 和 icon", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("type", "success");
      result.setAttribute("icon", "custom-icon");
      container.appendChild(result);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(result.type).toBe("success");
      expect(result.icon).toBe("custom-icon");
    });

    it("应该处理特殊字符的 title", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("title", "<script>alert('xss')</script>");
      container.appendChild(result);

      await new Promise(resolve => setTimeout(resolve, 50));

      const titleSlot = result.shadowRoot.querySelector('.ea-result__title slot');
      expect(titleSlot.textContent).toBe("<script>alert('xss')</script>");
    });

    it("应该处理长文本内容", async () => {
      const result = document.createElement("ea-result");
      const longTitle = "A".repeat(1000);
      result.setAttribute("title", longTitle);
      container.appendChild(result);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(result.title).toBe(longTitle);
    });
  });

  /**
   * 生命周期测试
   */
  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("title", "Test");
      result.setAttribute("sub-title", "Subtitle");
      container.appendChild(result);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(result.shadowRoot).toBeTruthy();
      expect(result.shadowRoot.querySelector(".ea-result")).toBeTruthy();
    });

    it("组件断开连接后应该正常移除", async () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      await new Promise(resolve => setTimeout(resolve, 50));

      result.remove();

      expect(result.isConnected).toBe(false);
    });

    it("应该支持属性动态更新", async () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(result.type === "" || result.type === null).toBe(true);

      result.setAttribute("type", "success");

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(result.type).toBe("success");
      const containerEl = result.shadowRoot.querySelector(".ea-result");
      expect(containerEl.classList.contains("ea-result--success")).toBe(true);
    });

    it("动态更新 title 应该反映在 UI 上", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("title", "Initial Title");
      container.appendChild(result);

      await new Promise(resolve => setTimeout(resolve, 50));

      result.setAttribute("title", "Updated Title");

      await new Promise(resolve => setTimeout(resolve, 50));

      const titleSlot = result.shadowRoot.querySelector('.ea-result__title slot');
      expect(titleSlot.textContent).toBe("Updated Title");
    });
  });
});
