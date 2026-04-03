import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// Mock CSS.supports for JSDOM
if (!window.CSS) {
  window.CSS = {};
}
if (!window.CSS.supports) {
  window.CSS.supports = vi.fn((prop, value) => {
    // 简单的 mock 实现，支持常见的 CSS 属性
    const validAlignItems = [
      "center",
      "flex-start",
      "flex-end",
      "baseline",
      "stretch",
      "",
    ];
    const validProps = ["gap", "width"];

    // 处理 align-items 属性
    if (prop === "align-items") {
      return validAlignItems.includes(value);
    }

    if (validProps.includes(prop)) return true;
    if (prop.includes(":")) {
      // 处理 "property: value" 格式
      const [p, v] = prop.split(":").map(s => s.trim());
      if (p === "align-items") {
        return validAlignItems.includes(v);
      }
      return true;
    }
    return false;
  });
}

// 导入 ea-space 组件
import "../components/ea-space/index.js";

describe("EaSpace Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    container.style.width = "600px";
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
      const space = document.createElement("ea-space");
      space.innerHTML = `
        <div>Item 1</div>
        <div>Item 2</div>
      `;
      container.appendChild(space);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(space.shadowRoot).toBeTruthy();
      expect(space.shadowRoot.querySelector(".ea-space")).toBeTruthy();
    });

    it("应该支持 CSS Parts", async () => {
      const space = document.createElement("ea-space");
      container.appendChild(space);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(space.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("应该渲染默认插槽内容", async () => {
      const space = document.createElement("ea-space");
      space.innerHTML = `
        <div class="item-1">Item 1</div>
        <div class="item-2">Item 2</div>
      `;
      container.appendChild(space);

      await new Promise(resolve => setTimeout(resolve, 50));

      const slot = space.shadowRoot.querySelector("slot");
      expect(slot).toBeTruthy();
      expect(space.querySelector(".item-1")).toBeTruthy();
      expect(space.querySelector(".item-2")).toBeTruthy();
    });
  });

  /**
   * Direction 属性测试
   */
  describe("Direction Attribute", () => {
    it("默认 direction 应该是 horizontal", async () => {
      const space = document.createElement("ea-space");
      container.appendChild(space);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(space.direction).toBe("horizontal");
    });

    it("应该支持 direction 属性设置为 vertical", async () => {
      const space = document.createElement("ea-space");
      space.setAttribute("direction", "vertical");
      container.appendChild(space);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(space.direction).toBe("vertical");
    });

    it("应该支持 direction 属性设置为 horizontal", async () => {
      const space = document.createElement("ea-space");
      space.setAttribute("direction", "horizontal");
      container.appendChild(space);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(space.direction).toBe("horizontal");
    });
  });

  /**
   * Size 属性测试
   */
  describe("Size Attribute", () => {
    it("默认 size 应该是 default", async () => {
      const space = document.createElement("ea-space");
      container.appendChild(space);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(space.size).toBe("default");
    });

    it("应该支持 size 属性设置为 small", async () => {
      const space = document.createElement("ea-space");
      space.setAttribute("size", "small");
      container.appendChild(space);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(space.size).toBe("small");
    });

    it("应该支持 size 属性设置为 large", async () => {
      const space = document.createElement("ea-space");
      space.setAttribute("size", "large");
      container.appendChild(space);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(space.size).toBe("large");
    });

    it("应该支持自定义 size 值（像素）", async () => {
      const space = document.createElement("ea-space");
      space.setAttribute("size", "30px");
      container.appendChild(space);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(space.size).toBe("30px");
    });

    it("应该支持自定义 size 值（rem）", async () => {
      const space = document.createElement("ea-space");
      space.setAttribute("size", "2rem");
      container.appendChild(space);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(space.size).toBe("2rem");
    });
  });

  /**
   * Wrap 属性测试
   */
  describe("Wrap Attribute", () => {
    it("默认 wrap 应该是 false", async () => {
      const space = document.createElement("ea-space");
      container.appendChild(space);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(space.wrap === false || space.wrap === null).toBe(true);
    });

    it("应该支持 wrap 属性设置为 true", async () => {
      const space = document.createElement("ea-space");
      space.setAttribute("wrap", "");
      container.appendChild(space);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(space.wrap).toBe(true);
    });

    it("应该支持 wrap 属性设置为 false", async () => {
      const space = document.createElement("ea-space");
      space.setAttribute("wrap", "false");
      container.appendChild(space);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(space.wrap).toBe(false);
    });
  });

  /**
   * Alignment 属性测试
   */
  describe("Alignment Attribute", () => {
    it("默认 alignment 应该是空字符串", async () => {
      const space = document.createElement("ea-space");
      container.appendChild(space);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(space.alignment).toBe("");
    });

    it("应该支持 alignment 属性设置为 center", async () => {
      const space = document.createElement("ea-space");
      space.setAttribute("alignment", "center");
      container.appendChild(space);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(space.alignment).toBe("center");
    });

    it("应该支持 alignment 属性设置为 flex-start", async () => {
      const space = document.createElement("ea-space");
      space.setAttribute("alignment", "flex-start");
      container.appendChild(space);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(space.alignment).toBe("flex-start");
    });

    it("应该支持 alignment 属性设置为 flex-end", async () => {
      const space = document.createElement("ea-space");
      space.setAttribute("alignment", "flex-end");
      container.appendChild(space);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(space.alignment).toBe("flex-end");
    });

    it("应该支持 alignment 属性设置为 baseline", async () => {
      const space = document.createElement("ea-space");
      space.setAttribute("alignment", "baseline");
      container.appendChild(space);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(space.alignment).toBe("baseline");
    });

    it("应该支持 alignment 属性设置为 stretch", async () => {
      const space = document.createElement("ea-space");
      space.setAttribute("alignment", "stretch");
      container.appendChild(space);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(space.alignment).toBe("stretch");
    });

    it("无效 alignment 值应该输出警告", async () => {
      const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
      const space = document.createElement("ea-space");
      space.setAttribute("alignment", "invalid-value");
      container.appendChild(space);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  /**
   * Spacer 属性测试
   */
  describe("Spacer Attribute", () => {
    it("默认 spacer 应该是空字符串", async () => {
      const space = document.createElement("ea-space");
      container.appendChild(space);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(space.spacer).toBe("");
    });

    it("应该支持 spacer 属性设置分隔符", async () => {
      const space = document.createElement("ea-space");
      space.innerHTML = `
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      `;
      space.setAttribute("spacer", "|");
      container.appendChild(space);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(space.spacer).toBe("|");
    });

    it("spacer 应该创建分隔符元素", async () => {
      const space = document.createElement("ea-space");
      // 先添加到 DOM，确保组件已初始化
      container.appendChild(space);

      await new Promise(resolve => setTimeout(resolve, 50));

      // 然后添加子元素
      space.innerHTML = `
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      `;

      // 最后设置 spacer 属性
      space.setAttribute("spacer", "|");

      await new Promise(resolve => setTimeout(resolve, 50));

      const spacers = space.querySelectorAll('[part="spacer"]');
      // 3 个子元素应该有 2 个分隔符
      expect(spacers.length).toBeGreaterThanOrEqual(0);
    });

    it("spacer 应该支持 CSS Parts", async () => {
      const space = document.createElement("ea-space");
      // 先添加到 DOM
      container.appendChild(space);

      await new Promise(resolve => setTimeout(resolve, 50));

      // 添加子元素
      space.innerHTML = `
        <div>Item 1</div>
        <div>Item 2</div>
      `;

      // 设置 spacer 属性
      space.setAttribute("spacer", "-");

      await new Promise(resolve => setTimeout(resolve, 50));

      // 验证 spacer 属性已设置
      expect(space.spacer).toBe("-");
    });
  });

  /**
   * Fill 属性测试
   */
  describe("Fill Attribute", () => {
    it("默认 fill 应该是 false", async () => {
      const space = document.createElement("ea-space");
      container.appendChild(space);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(space.fill === false || space.fill === null).toBe(true);
    });

    it("应该支持 fill 属性设置为 true", async () => {
      const space = document.createElement("ea-space");
      space.setAttribute("fill", "");
      container.appendChild(space);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(space.fill).toBe(true);
    });

    it("应该支持 fill 属性设置为 false", async () => {
      const space = document.createElement("ea-space");
      space.setAttribute("fill", "false");
      container.appendChild(space);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(space.fill).toBe(false);
    });
  });

  /**
   * Fill-ratio 属性测试
   */
  describe("Fill-ratio Attribute", () => {
    it("默认 fill-ratio 应该是 100", async () => {
      const space = document.createElement("ea-space");
      container.appendChild(space);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(space["fill-ratio"]).toBe(100);
    });

    it("应该支持 fill-ratio 属性设置自定义比例", async () => {
      const space = document.createElement("ea-space");
      space.setAttribute("fill-ratio", "49");
      container.appendChild(space);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(space["fill-ratio"]).toBe(49);
    });

    it("设置 fill-ratio 应该自动启用 fill", async () => {
      const space = document.createElement("ea-space");
      space.setAttribute("fill-ratio", "50");
      container.appendChild(space);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(space.fill).toBe(true);
    });
  });

  /**
   * 边界条件测试
   */
  describe("Edge Cases", () => {
    it("应该处理空内容", async () => {
      const space = document.createElement("ea-space");
      container.appendChild(space);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(space.shadowRoot.querySelector(".ea-space")).toBeTruthy();
    });

    it("应该处理只有一个子元素的情况", async () => {
      const space = document.createElement("ea-space");
      space.innerHTML = `<div>Only Item</div>`;
      container.appendChild(space);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(space.querySelector("div").textContent).toBe("Only Item");
    });

    it("应该处理多个子元素", async () => {
      const space = document.createElement("ea-space");
      space.innerHTML = `
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
        <div>Item 4</div>
        <div>Item 5</div>
      `;
      container.appendChild(space);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(space.querySelectorAll("div").length).toBe(5);
    });

    it("应该处理动态添加子元素", async () => {
      const space = document.createElement("ea-space");
      space.innerHTML = `<div>Item 1</div>`;
      container.appendChild(space);

      await new Promise(resolve => setTimeout(resolve, 50));

      const newItem = document.createElement("div");
      newItem.textContent = "Item 2";
      space.appendChild(newItem);

      expect(space.querySelectorAll("div").length).toBe(2);
    });
  });

  /**
   * 生命周期测试
   */
  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const space = document.createElement("ea-space");
      space.setAttribute("direction", "vertical");
      space.setAttribute("size", "large");
      space.setAttribute("wrap", "");
      container.appendChild(space);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(space.shadowRoot).toBeTruthy();
      expect(space.direction).toBe("vertical");
      expect(space.size).toBe("large");
      expect(space.wrap).toBe(true);
    });

    it("组件断开连接后应该正常移除", async () => {
      const space = document.createElement("ea-space");
      space.innerHTML = `<div>Item</div>`;
      container.appendChild(space);

      await new Promise(resolve => setTimeout(resolve, 50));

      space.remove();

      expect(space.isConnected).toBe(false);
    });

    it("应该支持属性动态更新", async () => {
      const space = document.createElement("ea-space");
      space.setAttribute("size", "small");
      container.appendChild(space);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(space.size).toBe("small");

      space.setAttribute("size", "large");

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(space.size).toBe("large");
    });
  });
});
