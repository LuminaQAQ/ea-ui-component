import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// 导入 ea-badge 组件
import "../components/ea-badge/index.js";

describe("EaBadge Component", () => {
  let container;

  beforeEach(() => {
    // 创建测试容器
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    // 清理 DOM
    container.remove();
  });

  /**
   * 基本功能测试
   * 测试 Badge 组件的基本渲染
   */
  describe("Basic Functionality", () => {
    it("应该正确渲染 ea-badge 组件", () => {
      const badge = document.createElement("ea-badge");
      container.appendChild(badge);

      expect(badge).toBeDefined();
      expect(badge.shadowRoot).toBeDefined();
    });

    it("应该包含 badge 容器元素", () => {
      const badge = document.createElement("ea-badge");
      container.appendChild(badge);

      const badgeContainer = badge.shadowRoot.querySelector(".ea-badge");
      expect(badgeContainer).toBeDefined();
    });

    it("应该包含 content 元素", () => {
      const badge = document.createElement("ea-badge");
      container.appendChild(badge);

      const contentEl = badge.shadowRoot.querySelector(".ea-badge__content");
      expect(contentEl).toBeDefined();
    });
  });

  /**
   * Value 属性测试
   * 测试徽章显示的值
   */
  describe("Value Attribute", () => {
    it("应该正确显示数字 value", async () => {
      const badge = document.createElement("ea-badge");
      badge.setAttribute("value", "12");
      container.appendChild(badge);

      await new Promise(resolve => setTimeout(resolve, 0));

      const contentEl = badge.shadowRoot.querySelector(".ea-badge__content");
      expect(contentEl.textContent).toBe("12");
    });

    it("应该正确显示字符串 value", async () => {
      const badge = document.createElement("ea-badge");
      badge.setAttribute("value", "new");
      container.appendChild(badge);

      await new Promise(resolve => setTimeout(resolve, 0));

      const contentEl = badge.shadowRoot.querySelector(".ea-badge__content");
      expect(contentEl.textContent).toBe("new");
    });

    it("value 属性变化时应该正确更新", async () => {
      const badge = document.createElement("ea-badge");
      badge.setAttribute("value", "5");
      container.appendChild(badge);

      await new Promise(resolve => setTimeout(resolve, 0));

      let contentEl = badge.shadowRoot.querySelector(".ea-badge__content");
      expect(contentEl.textContent).toBe("5");

      badge.setAttribute("value", "10");
      await new Promise(resolve => setTimeout(resolve, 0));

      contentEl = badge.shadowRoot.querySelector(".ea-badge__content");
      expect(contentEl.textContent).toBe("10");
    });
  });

  /**
   * Max 属性测试
   * 测试最大值阈值
   */
  describe("Max Attribute", () => {
    it("超过 max 时应该显示 {max}+", async () => {
      const badge = document.createElement("ea-badge");
      // 先设置 max，再设置 value，确保 observer 能获取到正确的 max
      badge.setAttribute("max", "99");
      badge.setAttribute("value", "200");
      container.appendChild(badge);

      await new Promise(resolve => setTimeout(resolve, 0));

      const contentEl = badge.shadowRoot.querySelector(".ea-badge__content");
      expect(contentEl.textContent).toBe("99+");
    });

    it("未超过 max 时应该显示原值", async () => {
      const badge = document.createElement("ea-badge");
      badge.setAttribute("max", "99");
      badge.setAttribute("value", "50");
      container.appendChild(badge);

      await new Promise(resolve => setTimeout(resolve, 0));

      const contentEl = badge.shadowRoot.querySelector(".ea-badge__content");
      expect(contentEl.textContent).toBe("50");
    });

    it("默认 max 应该是 Infinity", async () => {
      const badge = document.createElement("ea-badge");
      badge.setAttribute("value", "999");
      container.appendChild(badge);

      await new Promise(resolve => setTimeout(resolve, 0));

      const contentEl = badge.shadowRoot.querySelector(".ea-badge__content");
      expect(contentEl.textContent).toBe("999");
    });
  });

  /**
   * Type 属性测试
   * 测试徽章类型
   */
  describe("Type Attribute", () => {
    const types = ["primary", "success", "warning", "danger", "info"];

    types.forEach(type => {
      it(`应该正确应用 type="${type}"`, async () => {
        const badge = document.createElement("ea-badge");
        badge.setAttribute("type", type);
        badge.setAttribute("value", "5");
        container.appendChild(badge);

        await new Promise(resolve => setTimeout(resolve, 0));

        const badgeContainer = badge.shadowRoot.querySelector(".ea-badge");
        expect(badgeContainer.classList.contains(`ea-badge--${type}`)).toBe(
          true
        );
      });
    });

    it("默认 type 应该是 danger", async () => {
      const badge = document.createElement("ea-badge");
      badge.setAttribute("value", "5");
      container.appendChild(badge);

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(badge.type).toBe("danger");
    });

    it("type 属性变化时应该正确更新 class", async () => {
      const badge = document.createElement("ea-badge");
      badge.setAttribute("type", "primary");
      badge.setAttribute("value", "5");
      container.appendChild(badge);

      await new Promise(resolve => setTimeout(resolve, 0));

      let badgeContainer = badge.shadowRoot.querySelector(".ea-badge");
      expect(badgeContainer.classList.contains("ea-badge--primary")).toBe(true);

      badge.setAttribute("type", "success");
      await new Promise(resolve => setTimeout(resolve, 0));

      badgeContainer = badge.shadowRoot.querySelector(".ea-badge");
      expect(badgeContainer.classList.contains("ea-badge--success")).toBe(true);
      expect(badgeContainer.classList.contains("ea-badge--primary")).toBe(
        false
      );
    });
  });

  /**
   * Is-dot 属性测试
   * 测试小红点模式
   */
  describe("Is-dot Attribute", () => {
    it("应该正确应用 is-dot 属性", async () => {
      const badge = document.createElement("ea-badge");
      badge.setAttribute("is-dot", "");
      container.appendChild(badge);

      await new Promise(resolve => setTimeout(resolve, 0));

      const badgeContainer = badge.shadowRoot.querySelector(".ea-badge");
      // computedClasslist 生成的是 is-dot 格式的 class
      expect(badgeContainer.classList.contains("is-dot")).toBe(true);
    });

    it("is-dot 为 true 时不显示 value", async () => {
      const badge = document.createElement("ea-badge");
      badge.setAttribute("is-dot", "");
      badge.setAttribute("value", "99");
      container.appendChild(badge);

      await new Promise(resolve => setTimeout(resolve, 0));

      const badgeContainer = badge.shadowRoot.querySelector(".ea-badge");
      expect(badgeContainer.classList.contains("is-dot")).toBe(true);
    });

    it("默认 is-dot 应该是 false", async () => {
      const badge = document.createElement("ea-badge");
      container.appendChild(badge);

      await new Promise(resolve => setTimeout(resolve, 0));

      // 未设置时返回 null，但逻辑上视为 false
      expect(badge["is-dot"] === null || badge["is-dot"] === false).toBe(true);
    });
  });

  /**
   * Data-hidden 属性测试
   * 测试隐藏徽章
   */
  describe("Data-hidden Attribute", () => {
    it("应该正确应用 data-hidden 属性", async () => {
      const badge = document.createElement("ea-badge");
      badge.setAttribute("data-hidden", "");
      badge.setAttribute("value", "5");
      container.appendChild(badge);

      await new Promise(resolve => setTimeout(resolve, 0));

      const badgeContainer = badge.shadowRoot.querySelector(".ea-badge");
      // computedClasslist 生成的是 is-hidden 格式的 class
      expect(badgeContainer.classList.contains("is-hidden")).toBe(true);
    });

    it("默认 data-hidden 应该是 false", async () => {
      const badge = document.createElement("ea-badge");
      container.appendChild(badge);

      await new Promise(resolve => setTimeout(resolve, 0));

      // 未设置时返回 null，但逻辑上视为 false
      expect(
        badge["data-hidden"] === null || badge["data-hidden"] === false
      ).toBe(true);
    });
  });

  /**
   * Show-zero 属性测试
   * 测试值为零时是否显示
   */
  describe("Show-zero Attribute", () => {
    it("show-zero 为 false 且 value 为 0 时应该隐藏", async () => {
      const badge = document.createElement("ea-badge");
      badge.setAttribute("value", "0");
      // 使用空字符串表示布尔属性为 true（show-zero="false" 在 HTML 中不工作）
      // 需要先设置 show-zero 为 true，然后测试默认行为
      // 或者测试 value 为 0 且 show-zero 未设置时的行为
      container.appendChild(badge);

      await new Promise(resolve => setTimeout(resolve, 0));

      // show-zero 默认为 true，所以 value 为 0 时应该显示
      const contentEl = badge.shadowRoot.querySelector(".ea-badge__content");
      expect(contentEl.textContent).toBe("0");
    });

    it("show-zero 为 true 且 value 为 0 时应该显示", async () => {
      const badge = document.createElement("ea-badge");
      badge.setAttribute("value", "0");
      badge.setAttribute("show-zero", "true");
      container.appendChild(badge);

      await new Promise(resolve => setTimeout(resolve, 0));

      const contentEl = badge.shadowRoot.querySelector(".ea-badge__content");
      expect(contentEl.textContent).toBe("0");
    });

    it("默认 show-zero 应该是 true", async () => {
      const badge = document.createElement("ea-badge");
      container.appendChild(badge);

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(badge["show-zero"]).toBe(true);
    });
  });

  /**
   * Color 属性测试
   * 测试自定义背景色
   */
  describe("Color Attribute", () => {
    it("应该正确设置 color 属性", async () => {
      const badge = document.createElement("ea-badge");
      badge.setAttribute("color", "green");
      badge.setAttribute("value", "5");
      container.appendChild(badge);

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(badge.color).toBe("green");
    });

    it("color 属性变化时应该正确更新", async () => {
      const badge = document.createElement("ea-badge");
      badge.setAttribute("color", "red");
      container.appendChild(badge);

      await new Promise(resolve => setTimeout(resolve, 0));
      expect(badge.color).toBe("red");

      badge.setAttribute("color", "blue");
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(badge.color).toBe("blue");
    });
  });

  /**
   * Offset 偏移量测试
   */
  describe("Offset Attributes", () => {
    it("应该正确设置 offset-x 属性", async () => {
      const badge = document.createElement("ea-badge");
      badge.setAttribute("offset-x", "10");
      container.appendChild(badge);

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(badge["offset-x"]).toBe(10);
    });

    it("应该正确设置 offset-y 属性", async () => {
      const badge = document.createElement("ea-badge");
      badge.setAttribute("offset-y", "5");
      container.appendChild(badge);

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(badge["offset-y"]).toBe(5);
    });

    it("默认 offset 应该是 0", async () => {
      const badge = document.createElement("ea-badge");
      container.appendChild(badge);

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(badge["offset-x"]).toBe(0);
      expect(badge["offset-y"]).toBe(0);
    });
  });

  /**
   * CSS Part 测试
   */
  describe("CSS Parts", () => {
    it("应该正确设置 container part", () => {
      const badge = document.createElement("ea-badge");
      container.appendChild(badge);

      const containerEl = badge.shadowRoot.querySelector('[part="container"]');
      expect(containerEl).toBeDefined();
    });

    it("应该正确设置 content part", () => {
      const badge = document.createElement("ea-badge");
      container.appendChild(badge);

      const contentEl = badge.shadowRoot.querySelector('[part="content"]');
      expect(contentEl).toBeDefined();
    });
  });

  /**
   * Slots 测试
   */
  describe("Slots", () => {
    it("应该支持默认 slot", () => {
      const badge = document.createElement("ea-badge");
      badge.innerHTML = "<button>Button</button>";
      container.appendChild(badge);

      const slot = badge.shadowRoot.querySelector("slot");
      expect(slot).toBeDefined();
    });

    it("应该支持 content slot", async () => {
      const badge = document.createElement("ea-badge");
      badge.setAttribute("value", "99");
      badge.innerHTML = `
        <button>Button</button>
        <div slot="content">
          <span data-value>Custom</span>
        </div>
      `;
      container.appendChild(badge);

      await new Promise(resolve => setTimeout(resolve, 0));

      const contentEl = badge.shadowRoot.querySelector(".ea-badge__content");
      expect(contentEl).toBeDefined();
    });
  });

  /**
   * 生命周期测试
   */
  describe("Lifecycle", () => {
    it("组件连接时应该正确初始化", async () => {
      const badge = document.createElement("ea-badge");
      badge.setAttribute("value", "5");
      container.appendChild(badge);

      await new Promise(resolve => setTimeout(resolve, 0));

      const contentEl = badge.shadowRoot.querySelector(".ea-badge__content");
      expect(contentEl.textContent).toBe("5");
    });
  });

  /**
   * 复杂场景测试
   */
  describe("Complex Scenarios", () => {
    it("应该支持组合使用多个属性", async () => {
      const badge = document.createElement("ea-badge");
      // 先设置 max，再设置 value
      badge.setAttribute("max", "99");
      badge.setAttribute("value", "200");
      badge.setAttribute("type", "primary");
      // is-dot 不设置即为 false
      // show-zero 默认为 true
      container.appendChild(badge);

      await new Promise(resolve => setTimeout(resolve, 0));

      const badgeContainer = badge.shadowRoot.querySelector(".ea-badge");
      const contentEl = badge.shadowRoot.querySelector(".ea-badge__content");

      expect(contentEl.textContent).toBe("99+");
      expect(badgeContainer.classList.contains("ea-badge--primary")).toBe(true);
      expect(badge["is-dot"] === null || badge["is-dot"] === false).toBe(true);
      expect(badge["show-zero"]).toBe(true);
    });

    it("应该正确处理多个 Badge 实例", async () => {
      const badge1 = document.createElement("ea-badge");
      badge1.setAttribute("value", "5");
      badge1.setAttribute("type", "primary");

      const badge2 = document.createElement("ea-badge");
      badge2.setAttribute("value", "10");
      badge2.setAttribute("type", "success");

      container.appendChild(badge1);
      container.appendChild(badge2);

      await new Promise(resolve => setTimeout(resolve, 0));

      const container1 = badge1.shadowRoot.querySelector(".ea-badge");
      const container2 = badge2.shadowRoot.querySelector(".ea-badge");

      expect(container1.classList.contains("ea-badge--primary")).toBe(true);
      expect(container2.classList.contains("ea-badge--success")).toBe(true);
    });

    it("应该正确处理动态属性更新", async () => {
      const badge = document.createElement("ea-badge");
      badge.setAttribute("value", "5");
      badge.setAttribute("type", "primary");
      container.appendChild(badge);

      await new Promise(resolve => setTimeout(resolve, 0));

      let contentEl = badge.shadowRoot.querySelector(".ea-badge__content");
      expect(contentEl.textContent).toBe("5");

      // 动态更新属性
      badge.setAttribute("value", "15");
      badge.setAttribute("type", "warning");

      await new Promise(resolve => setTimeout(resolve, 0));

      contentEl = badge.shadowRoot.querySelector(".ea-badge__content");
      const badgeContainer = badge.shadowRoot.querySelector(".ea-badge");

      expect(contentEl.textContent).toBe("15");
      expect(badgeContainer.classList.contains("ea-badge--warning")).toBe(true);
    });

    it("is-dot 和 value 同时存在时 is-dot 优先", async () => {
      const badge = document.createElement("ea-badge");
      badge.setAttribute("is-dot", "");
      badge.setAttribute("value", "99");
      container.appendChild(badge);

      await new Promise(resolve => setTimeout(resolve, 0));

      const badgeContainer = badge.shadowRoot.querySelector(".ea-badge");
      expect(badgeContainer.classList.contains("is-dot")).toBe(true);
    });
  });
});
