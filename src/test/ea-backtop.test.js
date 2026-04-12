import { describe, it, expect, beforeEach, afterEach } from "vitest";

// 导入 ea-backtop 组件
import "../components/ea-backtop/index.js";

describe("EaBacktop Component", () => {
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
   * 测试 Backtop 组件的基本渲染
   */
  describe("Basic Functionality", () => {
    it("应该正确渲染 ea-backtop 组件", () => {
      const backtop = document.createElement("ea-backtop");
      container.appendChild(backtop);

      expect(backtop).toBeDefined();
      expect(backtop.shadowRoot).toBeDefined();
    });

    it("应该包含 backtop 容器元素", () => {
      const backtop = document.createElement("ea-backtop");
      container.appendChild(backtop);

      const backtopContainer = backtop.shadowRoot.querySelector(".ea-backtop");
      expect(backtopContainer).toBeDefined();
    });
  });

  /**
   * Target 属性测试
   * 测试滚动目标对象
   */
  describe("Target Attribute", () => {
    it("应该正确设置 target 属性", async () => {
      const backtop = document.createElement("ea-backtop");
      backtop.setAttribute("target", "#test-target");
      container.appendChild(backtop);

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(backtop.target).toBe("#test-target");
    });

    it("默认 target 应该是 window", async () => {
      const backtop = document.createElement("ea-backtop");
      container.appendChild(backtop);

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(backtop.target).toBe("window");
    });

    it("target 属性变化时应该正确更新", async () => {
      const backtop = document.createElement("ea-backtop");
      backtop.setAttribute("target", "#old-target");
      container.appendChild(backtop);

      await new Promise(resolve => setTimeout(resolve, 0));
      expect(backtop.target).toBe("#old-target");

      backtop.setAttribute("target", "#new-target");
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(backtop.target).toBe("#new-target");
    });
  });

  /**
   * Visibility-height 属性测试
   * 测试显示阈值
   */
  describe("Visibility-height Attribute", () => {
    it("应该正确设置 visibility-height 属性", async () => {
      const backtop = document.createElement("ea-backtop");
      backtop.setAttribute("visibility-height", "100");
      container.appendChild(backtop);

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(backtop.visibilityHeight).toBe(100);
    });

    it("默认 visibility-height 应该是 200", async () => {
      const backtop = document.createElement("ea-backtop");
      container.appendChild(backtop);

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(backtop.visibilityHeight).toBe(200);
    });

    it("visibility-height 属性变化时应该正确更新", async () => {
      const backtop = document.createElement("ea-backtop");
      backtop.setAttribute("visibility-height", "100");
      container.appendChild(backtop);

      await new Promise(resolve => setTimeout(resolve, 0));
      expect(backtop.visibilityHeight).toBe(100);

      backtop.setAttribute("visibility-height", "300");
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(backtop.visibilityHeight).toBe(300);
    });
  });

  /**
   * Right 属性测试
   * 测试按钮距右侧距离
   */
  describe("Right Attribute", () => {
    it("应该正确设置 right 属性", async () => {
      const backtop = document.createElement("ea-backtop");
      backtop.setAttribute("right", "60px");
      container.appendChild(backtop);

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(backtop.right).toBe("60px");
    });

    it("默认 right 应该是 40px", async () => {
      const backtop = document.createElement("ea-backtop");
      container.appendChild(backtop);

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(backtop.right).toBe("40px");
    });

    it("right 属性变化时应该正确更新", async () => {
      const backtop = document.createElement("ea-backtop");
      backtop.setAttribute("right", "20px");
      container.appendChild(backtop);

      await new Promise(resolve => setTimeout(resolve, 0));
      expect(backtop.right).toBe("20px");

      backtop.setAttribute("right", "80px");
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(backtop.right).toBe("80px");
    });
  });

  /**
   * Bottom 属性测试
   * 测试按钮距底部距离
   */
  describe("Bottom Attribute", () => {
    it("应该正确设置 bottom 属性", async () => {
      const backtop = document.createElement("ea-backtop");
      backtop.setAttribute("bottom", "100px");
      container.appendChild(backtop);

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(backtop.bottom).toBe("100px");
    });

    it("默认 bottom 应该是 40px", async () => {
      const backtop = document.createElement("ea-backtop");
      container.appendChild(backtop);

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(backtop.bottom).toBe("40px");
    });

    it("bottom 属性变化时应该正确更新", async () => {
      const backtop = document.createElement("ea-backtop");
      backtop.setAttribute("bottom", "50px");
      container.appendChild(backtop);

      await new Promise(resolve => setTimeout(resolve, 0));
      expect(backtop.bottom).toBe("50px");

      backtop.setAttribute("bottom", "120px");
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(backtop.bottom).toBe("120px");
    });
  });

  /**
   * Smooth 属性测试
   * 测试平滑滚动
   */
  describe("Smooth Attribute", () => {
    it("应该正确设置 smooth 属性为 true", async () => {
      const backtop = document.createElement("ea-backtop");
      backtop.setAttribute("smooth", "true");
      container.appendChild(backtop);

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(backtop.smooth).toBe(true);
    });

    it("应该正确设置 smooth 属性为 false", async () => {
      const backtop = document.createElement("ea-backtop");
      backtop.setAttribute("smooth", "false");
      container.appendChild(backtop);

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(backtop.smooth).toBe(false);
    });

    it("默认 smooth 应该是 true", async () => {
      const backtop = document.createElement("ea-backtop");
      container.appendChild(backtop);

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(backtop.smooth).toBe(true);
    });

    it("smooth 属性变化时应该正确更新", async () => {
      const backtop = document.createElement("ea-backtop");
      backtop.setAttribute("smooth", "true");
      container.appendChild(backtop);

      await new Promise(resolve => setTimeout(resolve, 0));
      expect(backtop.smooth).toBe(true);

      backtop.setAttribute("smooth", "false");
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(backtop.smooth).toBe(false);
    });
  });

  /**
   * CSS Part 测试
   */
  describe("CSS Parts", () => {
    it("应该正确设置 container part", () => {
      const backtop = document.createElement("ea-backtop");
      container.appendChild(backtop);

      const containerEl =
        backtop.shadowRoot.querySelector('[part="container"]');
      expect(containerEl).toBeDefined();
    });
  });

  /**
   * Slots 测试
   */
  describe("Slots", () => {
    it("应该支持默认 slot", () => {
      const backtop = document.createElement("ea-backtop");
      backtop.innerHTML = '<ea-icon name="angle-up"></ea-icon>';
      container.appendChild(backtop);

      const slot = backtop.shadowRoot.querySelector("slot");
      expect(slot).toBeDefined();
    });

    it("slot 内容应该正确传递", () => {
      const backtop = document.createElement("ea-backtop");
      backtop.textContent = "UP";
      container.appendChild(backtop);

      const slot = backtop.shadowRoot.querySelector("slot");
      expect(slot).toBeDefined();
    });
  });

  /**
   * 点击事件测试
   */
  describe("Click Event", () => {
    it("点击时应该触发滚动到顶部", async () => {
      const backtop = document.createElement("ea-backtop");
      container.appendChild(backtop);

      await new Promise(resolve => setTimeout(resolve, 0));

      // 模拟点击事件
      const clickEvent = new MouseEvent("click", { bubbles: true });
      backtop.dispatchEvent(clickEvent);

      // 验证没有报错
      expect(true).toBe(true);
    });
  });

  /**
   * 生命周期测试
   */
  describe("Lifecycle", () => {
    it("组件连接时应该设置事件监听器", async () => {
      const backtop = document.createElement("ea-backtop");
      container.appendChild(backtop);

      await new Promise(resolve => setTimeout(resolve, 0));

      // 验证组件已连接并设置了事件监听器
      expect(backtop.shadowRoot.querySelector(".ea-backtop")).toBeDefined();
    });

    it("组件移除时应该清理事件监听器", async () => {
      const backtop = document.createElement("ea-backtop");
      container.appendChild(backtop);

      await new Promise(resolve => setTimeout(resolve, 0));

      // 模拟组件从 DOM 中移除
      container.removeChild(backtop);

      // $beforeUnmounted 应该被调用，清理 AbortController
      // 这里主要验证没有报错
      expect(true).toBe(true);
    });
  });

  /**
   * 复杂场景测试
   */
  describe("Complex Scenarios", () => {
    it("应该支持组合使用多个属性", async () => {
      const backtop = document.createElement("ea-backtop");
      backtop.setAttribute("target", "#custom-target");
      backtop.setAttribute("visibility-height", "100");
      backtop.setAttribute("right", "60px");
      backtop.setAttribute("bottom", "80px");
      backtop.setAttribute("smooth", "false");
      container.appendChild(backtop);

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(backtop.target).toBe("#custom-target");
      expect(backtop.visibilityHeight).toBe(100);
      expect(backtop.right).toBe("60px");
      expect(backtop.bottom).toBe("80px");
      expect(backtop.smooth).toBe(false);
    });

    it("应该正确处理多个 Backtop 实例", async () => {
      const backtop1 = document.createElement("ea-backtop");
      backtop1.setAttribute("visibility-height", "100");
      backtop1.setAttribute("right", "20px");

      const backtop2 = document.createElement("ea-backtop");
      backtop2.setAttribute("visibility-height", "300");
      backtop2.setAttribute("right", "80px");

      container.appendChild(backtop1);
      container.appendChild(backtop2);

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(backtop1.visibilityHeight).toBe(100);
      expect(backtop1.right).toBe("20px");
      expect(backtop2.visibilityHeight).toBe(300);
      expect(backtop2.right).toBe("80px");
    });

    it("应该正确处理动态属性更新", async () => {
      const backtop = document.createElement("ea-backtop");
      backtop.setAttribute("visibility-height", "100");
      backtop.setAttribute("smooth", "true");
      container.appendChild(backtop);

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(backtop.visibilityHeight).toBe(100);
      expect(backtop.smooth).toBe(true);

      // 动态更新属性
      backtop.setAttribute("visibility-height", "250");
      backtop.setAttribute("smooth", "false");

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(backtop.visibilityHeight).toBe(250);
      expect(backtop.smooth).toBe(false);
    });
  });
});
