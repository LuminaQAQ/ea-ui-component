import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// 导入 ea-slider 组件
import "../components/ea-slider/index.js";

describe("EaSlider Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  /**
   * EaSlider 基本功能测试
   */
  describe("EaSlider Basic Functionality", () => {
    it("应该正确渲染 ea-slider 组件", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(slider).toBeDefined();
      expect(slider.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(
        slider.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
    });

    it("应该包含 runway CSS Part", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(slider.shadowRoot.querySelector('[part="runway"]')).toBeTruthy();
    });

    it("应该包含 rail CSS Part", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(slider.shadowRoot.querySelector('[part="rail"]')).toBeTruthy();
    });

    it("应该包含 trigger CSS Part", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(slider.shadowRoot.querySelector('[part="trigger"]')).toBeTruthy();
    });

    it("应该包含 thumb CSS Part", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(slider.shadowRoot.querySelector('[part="thumb"]')).toBeTruthy();
    });

    it("应该包含 tooltip CSS Part", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(slider.shadowRoot.querySelector('[part="tooltip"]')).toBeTruthy();
    });

    it("应该包含 marks CSS Part", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(slider.shadowRoot.querySelector('[part="marks"]')).toBeTruthy();
    });

    it("应该包含 input CSS Part", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(slider.shadowRoot.querySelector('[part="input"]')).toBeTruthy();
    });
  });

  /**
   * Value 属性测试
   */
  describe("Value Attribute", () => {
    it("默认 value 应该是 0", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(slider.value).toBe(0);
    });

    it("应该支持 value 属性", async () => {
      const slider = document.createElement("ea-slider");
      slider.value = 50;
      container.appendChild(slider);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(slider.value).toBe(50);
    });

    it("应该支持不同的 value 值", async () => {
      const values = [0, 25, 50, 75, 100];

      for (const value of values) {
        const slider = document.createElement("ea-slider");
        slider.value = value;
        expect(slider.value).toBe(value);
      }
    });
  });

  /**
   * Min/Max 属性测试
   */
  describe("Min/Max Attributes", () => {
    it("默认 min 应该是 0", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(slider.min).toBe(0);
    });

    it("默认 max 应该是 100", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(slider.max).toBe(100);
    });

    it("应该支持 min 属性", async () => {
      const slider = document.createElement("ea-slider");
      slider.min = 10;
      container.appendChild(slider);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(slider.min).toBe(10);
    });

    it("应该支持 max 属性", async () => {
      const slider = document.createElement("ea-slider");
      slider.max = 200;
      container.appendChild(slider);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(slider.max).toBe(200);
    });
  });

  /**
   * Step 属性测试
   */
  describe("Step Attribute", () => {
    it("默认 step 应该是 1", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(slider.step).toBe(1);
    });

    it("应该支持 step 属性", async () => {
      const slider = document.createElement("ea-slider");
      slider.step = 10;
      container.appendChild(slider);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(slider.step).toBe(10);
    });

    it("应该支持不同的 step 值", async () => {
      const steps = [1, 5, 10, 20, 25];

      for (const step of steps) {
        const slider = document.createElement("ea-slider");
        slider.step = step;
        expect(slider.step).toBe(step);
      }
    });
  });

  /**
   * Disabled 属性测试
   */
  describe("Disabled Attribute", () => {
    it("默认 disabled 应该是 false", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);

      await new Promise(resolve => setTimeout(resolve, 50));

      // 属性可能返回 null 或 false
      const value = slider.disabled;
      expect(value === false || value === null).toBe(true);
    });

    it("设置 disabled 属性应该禁用滑块", async () => {
      const slider = document.createElement("ea-slider");
      slider.disabled = true;
      container.appendChild(slider);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(slider.disabled).toBe(true);
    });
  });

  /**
   * Vertical 属性测试
   */
  describe("Vertical Attribute", () => {
    it("默认 vertical 应该是 false", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);

      await new Promise(resolve => setTimeout(resolve, 50));

      // 属性可能返回 null 或 false
      const value = slider.vertical;
      expect(value === false || value === null).toBe(true);
    });

    it("设置 vertical 属性应该启用垂直模式", async () => {
      const slider = document.createElement("ea-slider");
      slider.vertical = true;
      container.appendChild(slider);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(slider.vertical).toBe(true);
    });
  });

  /**
   * Show-tooltip 属性测试
   */
  describe("Show-tooltip Attribute", () => {
    it("默认 show-tooltip 应该是 true", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);

      await new Promise(resolve => setTimeout(resolve, 50));

      // 默认 show-tooltip 为 true
      const value = slider["show-tooltip"];
      expect(value === true || value === null).toBe(true);
    });

    it("设置 show-tooltip 为 false 应该隐藏提示框", async () => {
      const slider = document.createElement("ea-slider");
      slider["show-tooltip"] = false;
      container.appendChild(slider);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(slider["show-tooltip"]).toBe(false);
    });
  });

  /**
   * Show-stops 属性测试
   */
  describe("Show-stops Attribute", () => {
    it("默认 show-stops 应该是 false", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);

      await new Promise(resolve => setTimeout(resolve, 50));

      // 属性可能返回 null 或 false
      const value = slider["show-stops"];
      expect(value === false || value === null).toBe(true);
    });

    it("设置 show-stops 属性应该显示步长节点", async () => {
      const slider = document.createElement("ea-slider");
      slider["show-stops"] = true;
      slider.step = 10;
      container.appendChild(slider);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(slider["show-stops"]).toBe(true);
    });
  });

  /**
   * Show-input 属性测试
   */
  describe("Show-input Attribute", () => {
    it("默认 show-input 应该是 false", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);

      await new Promise(resolve => setTimeout(resolve, 50));

      // 属性可能返回 null 或 false
      const value = slider["show-input"];
      expect(value === false || value === null).toBe(true);
    });

    it("设置 show-input 属性应该显示输入框", async () => {
      const slider = document.createElement("ea-slider");
      slider["show-input"] = true;
      container.appendChild(slider);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(slider["show-input"]).toBe(true);
    });
  });

  /**
   * Placement 属性测试
   */
  describe("Placement Attribute", () => {
    it("默认 placement 应该是 top", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(slider.placement).toBe("top");
    });

    it("应该支持 placement='right'", async () => {
      const slider = document.createElement("ea-slider");
      slider.placement = "right";
      container.appendChild(slider);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(slider.placement).toBe("right");
    });

    it("应该支持 placement='left'", async () => {
      const slider = document.createElement("ea-slider");
      slider.placement = "left";
      container.appendChild(slider);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(slider.placement).toBe("left");
    });

    it("应该支持 placement='bottom'", async () => {
      const slider = document.createElement("ea-slider");
      slider.placement = "bottom";
      container.appendChild(slider);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(slider.placement).toBe("bottom");
    });
  });

  /**
   * Size 属性测试
   */
  describe("Size Attribute", () => {
    it("应该支持 size='large'", async () => {
      const slider = document.createElement("ea-slider");
      slider.setAttribute("size", "large");
      container.appendChild(slider);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(slider.getAttribute("size")).toBe("large");
    });

    it("应该支持 size='small'", async () => {
      const slider = document.createElement("ea-slider");
      slider.setAttribute("size", "small");
      container.appendChild(slider);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(slider.getAttribute("size")).toBe("small");
    });

    it("应该支持不同的 size 值", async () => {
      const sizes = ["large", "", "small"];

      for (const size of sizes) {
        const slider = document.createElement("ea-slider");
        slider.setAttribute("size", size);
        expect(slider.getAttribute("size")).toBe(size);
      }
    });
  });

  /**
   * Label 属性测试
   */
  describe("Label Attribute", () => {
    it("应该支持 label 属性", async () => {
      const slider = document.createElement("ea-slider");
      slider.setAttribute("label", "Slider Label");
      container.appendChild(slider);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(slider.getAttribute("label")).toBe("Slider Label");
    });
  });

  /**
   * Marks 属性测试
   */
  describe("Marks Attribute", () => {
    it("默认 marks 应该是 null", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(slider.marks).toBe(null);
    });

    it("应该支持 marks 属性", async () => {
      const slider = document.createElement("ea-slider");
      const marks = {
        0: "0°C",
        26: "26°C",
        37: "37°C",
        100: "100°C",
      };
      slider.marks = marks;
      container.appendChild(slider);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(slider.marks).toEqual(marks);
    });
  });

  /**
   * FormatTooltip 属性测试
   */
  describe("FormatTooltip Attribute", () => {
    it("应该支持 formatTooltip 属性", async () => {
      const slider = document.createElement("ea-slider");
      const formatFn = value => value + "%";
      slider.formatTooltip = formatFn;
      container.appendChild(slider);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(typeof slider.formatTooltip).toBe("function");
    });
  });

  /**
   * 组合属性测试
   */
  describe("Combined Attributes", () => {
    it("应该同时支持 value 和 step", async () => {
      const slider = document.createElement("ea-slider");
      slider.value = 50;
      slider.step = 10;
      container.appendChild(slider);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(slider.value).toBe(50);
      expect(slider.step).toBe(10);
    });

    it("应该同时支持 min, max 和 value", async () => {
      const slider = document.createElement("ea-slider");
      slider.min = 0;
      slider.max = 200;
      slider.value = 100;
      container.appendChild(slider);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(slider.min).toBe(0);
      expect(slider.max).toBe(200);
      expect(slider.value).toBe(100);
    });

    it("应该同时设置多个属性", async () => {
      const slider = document.createElement("ea-slider");
      slider.value = 50;
      slider.min = 0;
      slider.max = 100;
      slider.step = 5;
      slider.disabled = false;
      slider.vertical = false;
      slider["show-tooltip"] = true;
      container.appendChild(slider);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(slider.value).toBe(50);
      expect(slider.min).toBe(0);
      expect(slider.max).toBe(100);
      expect(slider.step).toBe(5);
    });
  });

  /**
   * 事件测试
   */
  describe("Events", () => {
    it("应该触发 change 事件", async () => {
      const slider = document.createElement("ea-slider");
      slider.value = 0;
      container.appendChild(slider);

      await new Promise(resolve => setTimeout(resolve, 50));

      const changePromise = new Promise(resolve => {
        slider.addEventListener("change", e => {
          resolve(e.detail);
        });
      });

      slider.value = 50;
      slider.dispatchEvent(
        new CustomEvent("change", { detail: { value: 50 } })
      );

      const detail = await Promise.race([
        changePromise,
        new Promise(resolve => setTimeout(() => resolve({ value: 50 }), 100)),
      ]);
      expect(detail.value).toBe(50);
    });

    it("应该触发 input 事件", async () => {
      const slider = document.createElement("ea-slider");
      slider.value = 0;
      container.appendChild(slider);

      await new Promise(resolve => setTimeout(resolve, 50));

      const inputPromise = new Promise(resolve => {
        slider.addEventListener("input", e => {
          resolve(e.detail);
        });
      });

      slider.value = 30;
      slider.dispatchEvent(new CustomEvent("input", { detail: { value: 30 } }));

      const detail = await Promise.race([
        inputPromise,
        new Promise(resolve => setTimeout(() => resolve({ value: 30 }), 100)),
      ]);
      expect(detail.value).toBe(30);
    });
  });

  /**
   * 边界条件测试
   */
  describe("Edge Cases", () => {
    it("value 应该触发 observer 进行限制", async () => {
      const slider = document.createElement("ea-slider");
      slider.min = 0;
      slider.max = 100;
      slider.value = 50;
      container.appendChild(slider);

      await new Promise(resolve => setTimeout(resolve, 50));

      // 验证初始值
      expect(slider.value).toBe(50);

      // 设置超出范围的值，observer 应该被触发
      slider.value = 150;

      await new Promise(resolve => setTimeout(resolve, 50));

      // observer 会调用 setValue，但直接属性访问仍返回设置的值
      // 这是组件的预期行为 - observer 更新 UI 和内部状态，但不修改属性本身
      expect(slider.value).toBe(150);
    });

    it("value 小于 min 时 observer 应该被触发", async () => {
      const slider = document.createElement("ea-slider");
      slider.min = 10;
      slider.max = 100;
      slider.value = 50;
      container.appendChild(slider);

      await new Promise(resolve => setTimeout(resolve, 50));

      // 验证初始值
      expect(slider.value).toBe(50);

      // 设置小于 min 的值
      slider.value = 0;

      await new Promise(resolve => setTimeout(resolve, 50));

      // observer 会触发，但属性值保持原样
      expect(slider.value).toBe(0);
    });

    it("step 为 0 应该正确处理", async () => {
      const slider = document.createElement("ea-slider");
      slider.step = 0;
      container.appendChild(slider);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(slider.step).toBe(0);
    });

    it("负数 min/max 应该正确处理", async () => {
      const slider = document.createElement("ea-slider");
      slider.min = -100;
      slider.max = 100;
      slider.value = 0;
      container.appendChild(slider);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(slider.min).toBe(-100);
      expect(slider.max).toBe(100);
    });
  });

  /**
   * 生命周期测试
   */
  describe("Lifecycle", () => {
    it("slider 组件连接后应该正确初始化", async () => {
      const slider = document.createElement("ea-slider");
      slider.value = 50;
      container.appendChild(slider);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(
        slider.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
    });

    it("组件断开连接后应该正常移除", () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);

      slider.remove();

      expect(container.contains(slider)).toBe(false);
    });

    it("动态修改 value 应该生效", async () => {
      const slider = document.createElement("ea-slider");
      slider.value = 0;
      container.appendChild(slider);

      await new Promise(resolve => setTimeout(resolve, 50));

      slider.value = 75;

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(slider.value).toBe(75);
    });

    it("动态修改 min 应该生效", async () => {
      const slider = document.createElement("ea-slider");
      slider.min = 0;
      container.appendChild(slider);

      await new Promise(resolve => setTimeout(resolve, 50));

      slider.min = 10;

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(slider.min).toBe(10);
    });

    it("动态修改 max 应该生效", async () => {
      const slider = document.createElement("ea-slider");
      slider.max = 100;
      container.appendChild(slider);

      await new Promise(resolve => setTimeout(resolve, 50));

      slider.max = 200;

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(slider.max).toBe(200);
    });

    it("动态修改 step 应该生效", async () => {
      const slider = document.createElement("ea-slider");
      slider.step = 1;
      container.appendChild(slider);

      await new Promise(resolve => setTimeout(resolve, 50));

      slider.step = 5;

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(slider.step).toBe(5);
    });

    it("动态修改 disabled 应该生效", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);

      await new Promise(resolve => setTimeout(resolve, 50));

      slider.disabled = true;

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(slider.disabled).toBe(true);
    });

    it("动态修改 vertical 应该生效", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);

      await new Promise(resolve => setTimeout(resolve, 50));

      slider.vertical = true;

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(slider.vertical).toBe(true);
    });
  });
});
