import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// 导入 ea-progress 组件
import "../components/ea-progress/index.js";

describe("EaProgress Component", () => {
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
      const progress = document.createElement("ea-progress");
      container.appendChild(progress);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(progress.shadowRoot).toBeTruthy();
      expect(progress.shadowRoot.querySelector(".ea-progress")).toBeTruthy();
    });

    it("应该支持 CSS Parts", async () => {
      const progress = document.createElement("ea-progress");
      container.appendChild(progress);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(
        progress.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
    });

    it("默认 type 应该是 line", async () => {
      const progress = document.createElement("ea-progress");
      container.appendChild(progress);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(progress.type).toBe("line");
    });
  });

  /**
   * Percentage 属性测试
   */
  describe("Percentage Attribute", () => {
    it("默认 percentage 应该是 0", async () => {
      const progress = document.createElement("ea-progress");
      container.appendChild(progress);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(progress.percentage).toBe(0);
    });

    it("应该支持 percentage 属性", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("percentage", "50");
      container.appendChild(progress);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(progress.percentage).toBe(50);
    });

    it("percentage 应该限制在 0-100 范围内", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("percentage", "150");
      container.appendChild(progress);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(progress.percentage).toBe(100);
    });

    it("负数的 percentage 应该被限制为 0", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("percentage", "-10");
      container.appendChild(progress);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(progress.percentage).toBe(0);
    });
  });

  /**
   * Type 属性测试
   */
  describe("Type Attribute", () => {
    it("应该支持 circle 类型", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("type", "circle");
      container.appendChild(progress);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(progress.type).toBe("circle");
      // circle 类型使用 SVG 渲染，不通过 class 判断
      const svg = progress.shadowRoot.querySelector("svg");
      expect(svg).toBeTruthy();
    });

    it("应该支持 dashboard 类型", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("type", "dashboard");
      container.appendChild(progress);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(progress.type).toBe("dashboard");
      // dashboard 类型使用 SVG 渲染，不通过 class 判断
      const svg = progress.shadowRoot.querySelector("svg");
      expect(svg).toBeTruthy();
    });
  });

  /**
   * Status 属性测试
   */
  describe("Status Attribute", () => {
    it("默认 status 应该是空字符串", async () => {
      const progress = document.createElement("ea-progress");
      container.appendChild(progress);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(progress.status === "" || progress.status === null).toBe(true);
    });

    it("应该支持 success 状态", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("status", "success");
      container.appendChild(progress);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(progress.status).toBe("success");
      const containerEl = progress.shadowRoot.querySelector(".ea-progress");
      expect(containerEl.classList.contains("ea-progress--success")).toBe(true);
    });

    it("应该支持 warning 状态", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("status", "warning");
      container.appendChild(progress);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(progress.status).toBe("warning");
      const containerEl = progress.shadowRoot.querySelector(".ea-progress");
      expect(containerEl.classList.contains("ea-progress--warning")).toBe(true);
    });

    it("应该支持 exception 状态", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("status", "exception");
      container.appendChild(progress);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(progress.status).toBe("exception");
      const containerEl = progress.shadowRoot.querySelector(".ea-progress");
      expect(containerEl.classList.contains("ea-progress--exception")).toBe(
        true
      );
    });
  });

  /**
   * Stroke-width 属性测试
   */
  describe("Stroke-width Attribute", () => {
    it("默认 stroke-width 应该是 8px", async () => {
      const progress = document.createElement("ea-progress");
      container.appendChild(progress);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(progress["stroke-width"]).toBe("8px");
    });

    it("应该支持自定义 stroke-width", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("stroke-width", "20px");
      container.appendChild(progress);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(progress["stroke-width"]).toBe("20px");
    });
  });

  /**
   * Text-inside 属性测试
   */
  describe("Text-inside Attribute", () => {
    it("默认 text-inside 应该是 false", async () => {
      const progress = document.createElement("ea-progress");
      container.appendChild(progress);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(
        progress["text-inside"] === false || progress["text-inside"] === null
      ).toBe(true);
    });

    it("应该支持 text-inside 属性", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("text-inside", "");
      container.appendChild(progress);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(progress["text-inside"]).toBe(true);
    });
  });

  /**
   * Indeterminate 属性测试
   */
  describe("Indeterminate Attribute", () => {
    it("默认 indeterminate 应该是 false", async () => {
      const progress = document.createElement("ea-progress");
      container.appendChild(progress);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(
        progress.indeterminate === false || progress.indeterminate === null
      ).toBe(true);
    });

    it("应该支持 indeterminate 属性", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("indeterminate", "");
      container.appendChild(progress);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(progress.indeterminate).toBe(true);
      const containerEl = progress.shadowRoot.querySelector(".ea-progress");
      // indeterminate 类名格式为 is-indeterminate
      expect(containerEl.classList.contains("is-indeterminate")).toBe(true);
    });
  });

  /**
   * Duration 属性测试
   */
  describe("Duration Attribute", () => {
    it("默认 duration 应该是 3", async () => {
      const progress = document.createElement("ea-progress");
      container.appendChild(progress);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(progress.duration).toBe(3);
    });

    it("应该支持自定义 duration", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("duration", "5");
      container.appendChild(progress);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(progress.duration).toBe(5);
    });
  });

  /**
   * Striped 属性测试
   */
  describe("Striped Attribute", () => {
    it("默认 striped 应该是 false", async () => {
      const progress = document.createElement("ea-progress");
      container.appendChild(progress);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(progress.striped === false || progress.striped === null).toBe(
        true
      );
    });

    it("应该支持 striped 属性", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("striped", "");
      container.appendChild(progress);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(progress.striped).toBe(true);
      const containerEl = progress.shadowRoot.querySelector(".ea-progress");
      expect(containerEl.classList.contains("ea-progress--striped")).toBe(true);
    });
  });

  /**
   * Striped-flow 属性测试
   */
  describe("Striped-flow Attribute", () => {
    it("默认 striped-flow 应该是 false", async () => {
      const progress = document.createElement("ea-progress");
      container.appendChild(progress);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(
        progress["striped-flow"] === false || progress["striped-flow"] === null
      ).toBe(true);
    });

    it("应该支持 striped-flow 属性", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("striped-flow", "");
      container.appendChild(progress);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(progress["striped-flow"]).toBe(true);
      const containerEl = progress.shadowRoot.querySelector(".ea-progress");
      // striped-flow 类名格式为 is-striped-flow
      expect(containerEl.classList.contains("is-striped-flow")).toBe(true);
    });
  });

  /**
   * Show-text 属性测试
   */
  describe("Show-text Attribute", () => {
    it("默认 show-text 应该是 true", async () => {
      const progress = document.createElement("ea-progress");
      container.appendChild(progress);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(
        progress["show-text"] === true || progress["show-text"] === null
      ).toBe(true);
    });

    it("应该支持 show-text 属性设置为 false", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("show-text", "false");
      container.appendChild(progress);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(progress["show-text"]).toBe(false);
    });
  });

  /**
   * Color 属性测试
   */
  describe("Color Attribute", () => {
    it("应该支持字符串 color", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("color", "#6f7ad3");
      container.appendChild(progress);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(progress.color).toBe("#6f7ad3");
    });

    it("应该支持数组 color", async () => {
      const progress = document.createElement("ea-progress");
      progress.color = [
        { color: "#f56c6c", percentage: 20 },
        { color: "#e6a23c", percentage: 40 },
      ];
      container.appendChild(progress);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(Array.isArray(progress.color)).toBe(true);
    });

    it("应该支持函数 color", async () => {
      const progress = document.createElement("ea-progress");
      progress.color = percentage => {
        if (percentage < 30) return "#909399";
        if (percentage < 70) return "#e6a23c";
        return "#67c23a";
      };
      container.appendChild(progress);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(typeof progress.color).toBe("function");
    });
  });

  /**
   * 事件测试
   */
  describe("Events", () => {
    it("应该触发 change 事件", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("percentage", "0");
      container.appendChild(progress);

      await new Promise(resolve => setTimeout(resolve, 50));

      const changeHandler = vi.fn();
      progress.addEventListener("change", changeHandler);

      progress.setAttribute("percentage", "50");

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(changeHandler).toHaveBeenCalled();
    });

    it("change 事件应该包含 percentage", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("percentage", "0");
      container.appendChild(progress);

      await new Promise(resolve => setTimeout(resolve, 50));

      let eventDetail = null;
      progress.addEventListener("change", e => {
        eventDetail = e.detail;
      });

      progress.setAttribute("percentage", "75");

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(eventDetail).toBeTruthy();
      expect(eventDetail.percentage).toBe(75);
    });
  });

  /**
   * 边界条件测试
   */
  describe("Edge Cases", () => {
    it("应该处理 percentage 为 0 的情况", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("percentage", "0");
      container.appendChild(progress);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(progress.percentage).toBe(0);
    });

    it("应该处理 percentage 为 100 的情况", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("percentage", "100");
      container.appendChild(progress);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(progress.percentage).toBe(100);
    });

    it("应该处理非数字的 percentage", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("percentage", "abc");
      container.appendChild(progress);

      await new Promise(resolve => setTimeout(resolve, 50));

      // 非数字会被转换为 NaN，组件内部不处理这种情况
      expect(Number.isNaN(progress.percentage)).toBe(true);
    });
  });

  /**
   * 生命周期测试
   */
  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("percentage", "50");
      progress.setAttribute("type", "line");
      container.appendChild(progress);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(progress.shadowRoot).toBeTruthy();
      expect(progress.percentage).toBe(50);
      expect(progress.type).toBe("line");
    });

    it("组件断开连接后应该正常移除", async () => {
      const progress = document.createElement("ea-progress");
      container.appendChild(progress);

      await new Promise(resolve => setTimeout(resolve, 50));

      progress.remove();

      expect(progress.isConnected).toBe(false);
    });

    it("应该支持属性动态更新", async () => {
      const progress = document.createElement("ea-progress");
      container.appendChild(progress);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(progress.percentage).toBe(0);

      progress.setAttribute("percentage", "60");

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(progress.percentage).toBe(60);
    });

    it("动态更新 type 应该重新渲染", async () => {
      const progress = document.createElement("ea-progress");
      progress.setAttribute("type", "line");
      container.appendChild(progress);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(progress.type).toBe("line");

      progress.setAttribute("type", "circle");

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(progress.type).toBe("circle");
    });
  });
});
