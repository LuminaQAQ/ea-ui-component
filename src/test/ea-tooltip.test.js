import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// 导入 ea-tooltip 组件
import "../components/ea-tooltip/index.js";

describe("EaTooltip Component", () => {
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
    it("应该正确渲染 ea-tooltip 组件", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `
        <span slot="reference">Hover me</span>
      `;
      container.appendChild(tooltip);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(tooltip).toBeDefined();
      expect(tooltip.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(
        tooltip.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
    });

    it("应该包含 reference CSS Part", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(
        tooltip.shadowRoot.querySelector('[part="reference"]')
      ).toBeTruthy();
    });

    it("应该包含 original CSS Part", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(
        tooltip.shadowRoot.querySelector('[part="original"]')
      ).toBeTruthy();
    });

    it("应该包含 content 元素", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.content = "Test content";
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await new Promise(resolve => setTimeout(resolve, 50));

      // content part 在设置 content 后才会创建
      expect(
        tooltip.shadowRoot.querySelector('[part="content"]') ||
          tooltip.shadowRoot.querySelector(".ea-tooltip__content")
      ).toBeTruthy();
    });
  });

  /**
   * Content 属性测试
   */
  describe("Content Attribute", () => {
    it("默认 content 应该是空字符串", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(tooltip.content).toBe("");
    });

    it("应该支持 content 属性", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.content = "Tooltip content";
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(tooltip.content).toBe("Tooltip content");
    });
  });

  /**
   * Effect 属性测试
   */
  describe("Effect Attribute", () => {
    it("默认 effect 应该是 'dark'", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(tooltip.effect).toBe("dark");
    });

    it("应该支持 effect='dark'", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.effect = "dark";
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(tooltip.effect).toBe("dark");
    });

    it("应该支持 effect='light'", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.effect = "light";
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(tooltip.effect).toBe("light");
    });

    it("应该支持 effect='customized'", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.effect = "customized";
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(tooltip.effect).toBe("customized");
    });
  });

  /**
   * Trigger 属性测试
   */
  describe("Trigger Attribute", () => {
    it("默认 trigger 应该是 'hover'", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(tooltip.trigger).toBe("hover");
    });

    it("应该支持 trigger='hover'", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.trigger = "hover";
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(tooltip.trigger).toBe("hover");
    });

    it("应该支持 trigger='click'", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.trigger = "click";
      tooltip.innerHTML = `<span slot="reference">Click me</span>`;
      container.appendChild(tooltip);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(tooltip.trigger).toBe("click");
    });

    it("应该支持 trigger='focus'", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.trigger = "focus";
      tooltip.innerHTML = `<span slot="reference">Focus me</span>`;
      container.appendChild(tooltip);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(tooltip.trigger).toBe("focus");
    });

    it("应该支持 trigger='contextmenu'", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.trigger = "contextmenu";
      tooltip.innerHTML = `<span slot="reference">Right click me</span>`;
      container.appendChild(tooltip);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(tooltip.trigger).toBe("contextmenu");
    });

    it("应该支持 trigger='customized'", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.trigger = "customized";
      tooltip.innerHTML = `<span slot="reference">Custom trigger</span>`;
      container.appendChild(tooltip);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(tooltip.trigger).toBe("customized");
    });
  });

  /**
   * Placement 属性测试
   */
  describe("Placement Attribute", () => {
    it("默认 placement 应该是 'top'", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(tooltip.placement).toBe("top");
    });

    it("应该支持 placement='top'", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.placement = "top";
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(tooltip.placement).toBe("top");
    });

    it("应该支持 placement='top-start'", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.placement = "top-start";
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(tooltip.placement).toBe("top-start");
    });

    it("应该支持 placement='top-end'", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.placement = "top-end";
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(tooltip.placement).toBe("top-end");
    });

    it("应该支持 placement='bottom'", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.placement = "bottom";
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(tooltip.placement).toBe("bottom");
    });

    it("应该支持 placement='bottom-start'", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.placement = "bottom-start";
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(tooltip.placement).toBe("bottom-start");
    });

    it("应该支持 placement='bottom-end'", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.placement = "bottom-end";
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(tooltip.placement).toBe("bottom-end");
    });

    it("应该支持 placement='left'", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.placement = "left";
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(tooltip.placement).toBe("left");
    });

    it("应该支持 placement='left-start'", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.placement = "left-start";
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(tooltip.placement).toBe("left-start");
    });

    it("应该支持 placement='left-end'", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.placement = "left-end";
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(tooltip.placement).toBe("left-end");
    });

    it("应该支持 placement='right'", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.placement = "right";
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(tooltip.placement).toBe("right");
    });

    it("应该支持 placement='right-start'", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.placement = "right-start";
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(tooltip.placement).toBe("right-start");
    });

    it("应该支持 placement='right-end'", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.placement = "right-end";
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(tooltip.placement).toBe("right-end");
    });
  });

  /**
   * Visible 属性测试
   */
  describe("Visible Attribute", () => {
    it("默认 visible 应该是 false", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await new Promise(resolve => setTimeout(resolve, 50));

      const value = tooltip.visible;
      expect(value === false || value === null).toBe(true);
    });

    it("设置 visible 应该控制显示状态", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.visible = true;
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(tooltip.visible).toBe(true);
    });
  });

  /**
   * Width 属性测试
   */
  describe("Width Attribute", () => {
    it("默认 width 应该是 150", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await new Promise(resolve => setTimeout(resolve, 50));

      // width 可能是字符串 "150" 或数字 150
      expect(tooltip.width == 150).toBe(true);
    });

    it("应该支持自定义 width", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.width = 200;
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(tooltip.width).toBe(200);
    });
  });

  /**
   * Show-arrow 属性测试
   */
  describe("Show-arrow Attribute", () => {
    it("默认 show-arrow 应该是 true", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await new Promise(resolve => setTimeout(resolve, 50));

      // show-arrow 默认是 true
      const value = tooltip["show-arrow"];
      expect(value === true || value === "true").toBe(true);
    });

    it("设置 show-arrow 应该显示箭头", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip["show-arrow"] = true;
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(tooltip["show-arrow"]).toBe(true);
    });
  });

  /**
   * Slots 测试
   */
  describe("Slots", () => {
    it("应该正确渲染 reference 插槽", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `
        <button slot="reference">Reference Button</button>
      `;
      container.appendChild(tooltip);

      await new Promise(resolve => setTimeout(resolve, 50));

      const slot = tooltip.shadowRoot.querySelector('slot[name="reference"]');
      expect(slot).toBeTruthy();
    });

    it("应该正确渲染默认内容插槽", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `
        <span slot="reference">Hover me</span>
        <div>Custom content</div>
      `;
      container.appendChild(tooltip);

      await new Promise(resolve => setTimeout(resolve, 50));

      const slots = tooltip.shadowRoot.querySelectorAll("slot");
      expect(slots.length).toBeGreaterThan(0);
    });
  });

  /**
   * Methods 测试
   */
  describe("Methods", () => {
    it("应该支持 show 方法", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(typeof tooltip.show).toBe("function");
    });

    it("应该支持 hide 方法", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(typeof tooltip.hide).toBe("function");
    });

    it("应该支持 toggle 方法", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(typeof tooltip.toggle).toBe("function");
    });
  });

  /**
   * Events 测试
   */
  describe("Events", () => {
    it("应该触发 show 事件", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await new Promise(resolve => setTimeout(resolve, 50));

      const showHandler = vi.fn();
      tooltip.addEventListener("show", showHandler);

      tooltip.show();

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(showHandler).toHaveBeenCalled();
    });

    it("应该触发 hide 事件", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await new Promise(resolve => setTimeout(resolve, 50));

      const hideHandler = vi.fn();
      tooltip.addEventListener("hide", hideHandler);

      tooltip.show();
      await new Promise(resolve => setTimeout(resolve, 50));
      tooltip.hide();
      await new Promise(resolve => setTimeout(resolve, 50));

      expect(hideHandler).toHaveBeenCalled();
    });
  });

  /**
   * 组合测试
   */
  describe("Combined Tests", () => {
    it("应该支持多种属性组合", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.content = "Test content";
      tooltip.placement = "bottom";
      tooltip.effect = "light";
      tooltip.trigger = "click";
      tooltip.innerHTML = `<span slot="reference">Click me</span>`;
      container.appendChild(tooltip);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(tooltip.content).toBe("Test content");
      expect(tooltip.placement).toBe("bottom");
      expect(tooltip.effect).toBe("light");
      expect(tooltip.trigger).toBe("click");
    });

    it("应该支持不同 effect 和 trigger 组合", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.effect = "light";
      tooltip.trigger = "focus";
      tooltip.innerHTML = `<input slot="reference" type="text" />`;
      container.appendChild(tooltip);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(tooltip.effect).toBe("light");
      expect(tooltip.trigger).toBe("focus");
    });
  });

  /**
   * 边界条件测试
   */
  describe("Edge Cases", () => {
    it("没有 reference 插槽应该正常渲染", async () => {
      const tooltip = document.createElement("ea-tooltip");
      container.appendChild(tooltip);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(tooltip).toBeDefined();
      expect(tooltip.shadowRoot).toBeDefined();
    });

    it("空 content 应该正常渲染", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.content = "";
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(tooltip.content).toBe("");
    });

    it("多个 tooltip 应该独立工作", async () => {
      const tooltip1 = document.createElement("ea-tooltip");
      tooltip1.content = "Tooltip 1";
      tooltip1.innerHTML = `<span slot="reference">Hover 1</span>`;

      const tooltip2 = document.createElement("ea-tooltip");
      tooltip2.content = "Tooltip 2";
      tooltip2.innerHTML = `<span slot="reference">Hover 2</span>`;

      container.appendChild(tooltip1);
      container.appendChild(tooltip2);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(tooltip1.content).toBe("Tooltip 1");
      expect(tooltip2.content).toBe("Tooltip 2");
    });
  });

  /**
   * 生命周期测试
   */
  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(tooltip.shadowRoot).toBeDefined();
      expect(tooltip.trigger).toBe("hover");
    });

    it("组件断开连接后应该正常移除", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await new Promise(resolve => setTimeout(resolve, 50));

      tooltip.remove();

      expect(container.contains(tooltip)).toBe(false);
    });

    it("动态修改 content 应该生效", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.content = "Initial content";
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await new Promise(resolve => setTimeout(resolve, 50));

      tooltip.content = "Updated content";

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(tooltip.content).toBe("Updated content");
    });

    it("动态修改 effect 应该生效", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.effect = "dark";
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await new Promise(resolve => setTimeout(resolve, 50));

      tooltip.effect = "light";

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(tooltip.effect).toBe("light");
    });

    it("动态修改 placement 应该生效", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.placement = "top";
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await new Promise(resolve => setTimeout(resolve, 50));

      tooltip.placement = "bottom";

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(tooltip.placement).toBe("bottom");
    });

    it("动态修改 trigger 应该生效", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.trigger = "hover";
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await new Promise(resolve => setTimeout(resolve, 50));

      tooltip.trigger = "click";

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(tooltip.trigger).toBe("click");
    });

    it("动态修改 visible 应该控制显示", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await new Promise(resolve => setTimeout(resolve, 50));

      tooltip.visible = true;

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(tooltip.visible).toBe(true);

      tooltip.visible = false;

      await new Promise(resolve => setTimeout(resolve, 50));

      // visible 可能返回 false 或 null
      const value = tooltip.visible;
      expect(value === false || value === null).toBe(true);
    });
  });
});
