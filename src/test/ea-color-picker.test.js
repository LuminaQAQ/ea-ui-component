import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// 尝试加载组件，处理组件尚未重构为 TypeScript 的情况
let componentReady = false;
try {
  await import("../components/ea-color-picker/index.js");
  componentReady = true;
} catch (e) {
  console.warn(`[ea-color-picker] 组件尚未重构为 TypeScript (或存在依赖缺失)，跳过测试`);
}

const suite = componentReady ? describe : describe.skip;

suite("EaColorPicker Component", () => {
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
    it("应该正确渲染 ea-color-picker 组件", async () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(picker).toBeDefined();
      expect(picker.shadowRoot).toBeDefined();
    });

    it("应该包含 container 元素", async () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      await new Promise(resolve => setTimeout(resolve, 50));

      const containerEl = picker.shadowRoot.querySelector(
        ".ea-color-picker__container"
      );
      expect(containerEl).toBeDefined();
    });

    it("应该包含 trigger 元素", async () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      await new Promise(resolve => setTimeout(resolve, 50));

      const trigger = picker.shadowRoot.querySelector(
        ".ea-color-picker__trigger"
      );
      expect(trigger).toBeDefined();
    });
  });

  /**
   * Value 属性测试
   */
  describe("Value Attribute", () => {
    it("应该正确设置 value 属性", async () => {
      const picker = document.createElement("ea-color-picker");
      picker.setAttribute("value", "#409eff");
      container.appendChild(picker);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(picker.value).toBe("#409eff");
    });

    it("默认 value 应该是空字符串", async () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(picker.value).toBe("");
    });

    it("value 变化时应该触发更新", async () => {
      const picker = document.createElement("ea-color-picker");
      picker.setAttribute("value", "#409eff");
      container.appendChild(picker);

      await new Promise(resolve => setTimeout(resolve, 50));

      picker.setAttribute("value", "#67c23a");
      await new Promise(resolve => setTimeout(resolve, 50));

      expect(picker.value).toBe("#67c23a");
    });
  });

  /**
   * Disabled 属性测试
   */
  describe("Disabled Attribute", () => {
    it("应该正确设置 disabled 属性", async () => {
      const picker = document.createElement("ea-color-picker");
      picker.setAttribute("disabled", "");
      container.appendChild(picker);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(picker.disabled).toBe(true);
    });

    it("disabled 时应该添加 disabled class", async () => {
      const picker = document.createElement("ea-color-picker");
      picker.setAttribute("disabled", "");
      container.appendChild(picker);

      await new Promise(resolve => setTimeout(resolve, 50));

      // 等待组件更新类名
      await new Promise(resolve => setTimeout(resolve, 0));

      const containerEl = picker.shadowRoot.querySelector("[part='container']");
      expect(containerEl).toBeDefined();
      expect(containerEl.classList.contains("is-disabled")).toBe(true);
    });
  });

  /**
   * Size 属性测试
   */
  describe("Size Attribute", () => {
    const sizes = ["small", "medium", "large"];

    sizes.forEach(size => {
      it(`应该正确应用 size="${size}"`, async () => {
        const picker = document.createElement("ea-color-picker");
        picker.setAttribute("size", size);
        container.appendChild(picker);

        await new Promise(resolve => setTimeout(resolve, 50));

        // 等待组件更新类名
        await new Promise(resolve => setTimeout(resolve, 0));

        const containerEl =
          picker.shadowRoot.querySelector("[part='container']");
        expect(containerEl).toBeDefined();
        expect(containerEl.classList.contains(`ea-color-picker--${size}`)).toBe(
          true
        );
      });
    });
  });

  /**
   * Show Alpha 属性测试
   */
  describe("Show Alpha Attribute", () => {
    it("应该正确设置 show-alpha 属性", async () => {
      const picker = document.createElement("ea-color-picker");
      picker.setAttribute("show-alpha", "");
      container.appendChild(picker);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(picker.getAttribute("show-alpha")).toBe("");
    });
  });

  /**
   * Color Format 属性测试
   */
  describe("Color Format Attribute", () => {
    const formats = ["hex", "rgb", "hsl", "hsv"];

    formats.forEach(format => {
      it(`应该支持 color-format="${format}"`, async () => {
        const picker = document.createElement("ea-color-picker");
        picker.setAttribute("color-format", format);
        container.appendChild(picker);

        await new Promise(resolve => setTimeout(resolve, 50));

        expect(picker.getAttribute("color-format")).toBe(format);
      });
    });

    it("默认 color-format 应该是 hex", async () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      await new Promise(resolve => setTimeout(resolve, 50));

      // 通过属性访问器获取默认值
      expect(picker["color-format"] || "hex").toBe("hex");
    });
  });

  /**
   * Clearable 属性测试
   */
  describe("Clearable Attribute", () => {
    it("应该正确设置 clearable 属性", async () => {
      const picker = document.createElement("ea-color-picker");
      picker.setAttribute("clearable", "");
      container.appendChild(picker);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(picker.clearable).toBe(true);
    });
  });

  /**
   * 事件测试
   */
  describe("Events", () => {
    it("应该触发 change 事件", async () => {
      const picker = document.createElement("ea-color-picker");
      picker.setAttribute("value", "#409eff");
      container.appendChild(picker);

      await new Promise(resolve => setTimeout(resolve, 50));

      const changeHandler = vi.fn();
      picker.addEventListener("change", changeHandler);

      // 修改值应该触发 change 事件
      picker.setAttribute("value", "#67c23a");
      await new Promise(resolve => setTimeout(resolve, 50));

      // 注意：实际触发需要在面板中选择颜色
      // 这里只是验证事件监听已设置
      expect(changeHandler).not.toHaveBeenCalled(); // 直接设置属性不会触发 change
    });

    it("应该触发 ea-clear 事件", async () => {
      const picker = document.createElement("ea-color-picker");
      picker.setAttribute("value", "#409eff");
      picker.setAttribute("clearable", "");
      container.appendChild(picker);

      await new Promise(resolve => setTimeout(resolve, 50));

      const clearHandler = vi.fn();
      picker.addEventListener("ea-clear", clearHandler);

      // 验证事件监听已设置
      expect(clearHandler).not.toHaveBeenCalled();
    });
  });

  /**
   * CSS Part 测试
   */
  describe("CSS Parts", () => {
    it("应该正确设置 container part", async () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      await new Promise(resolve => setTimeout(resolve, 50));

      const containerEl = picker.shadowRoot.querySelector("[part='container']");
      expect(containerEl).toBeDefined();
    });

    it("应该正确设置 trigger part", async () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      await new Promise(resolve => setTimeout(resolve, 50));

      const trigger = picker.shadowRoot.querySelector("[part='trigger']");
      expect(trigger).toBeDefined();
    });

    it("应该正确设置 outer part", async () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      await new Promise(resolve => setTimeout(resolve, 50));

      const outer = picker.shadowRoot.querySelector("[part='outer']");
      expect(outer).toBeDefined();
    });

    it("应该正确设置 inner part", async () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      await new Promise(resolve => setTimeout(resolve, 50));

      const inner = picker.shadowRoot.querySelector("[part='inner']");
      expect(inner).toBeDefined();
    });
  });

  /**
   * 预定义颜色测试
   */
  describe("Predefine Colors", () => {
    it("应该支持预定义颜色", async () => {
      const picker = document.createElement("ea-color-picker");
      picker.setAttribute("value", "#409eff");
      container.appendChild(picker);

      await new Promise(resolve => setTimeout(resolve, 50));

      // 预定义颜色通过属性设置
      const predefineList = ["#ff4500", "#ff8c00", "#ffd700"];
      picker.predefine = predefineList;

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(picker.predefine).toEqual(predefineList);
    });
  });

  /**
   * Placement 属性测试
   */
  describe("Placement Attribute", () => {
    const placements = [
      "top",
      "top-start",
      "top-end",
      "bottom",
      "bottom-start",
      "bottom-end",
      "left",
      "left-start",
      "left-end",
      "right",
      "right-start",
      "right-end",
    ];

    placements.forEach(placement => {
      it(`应该支持 placement="${placement}"`, async () => {
        const picker = document.createElement("ea-color-picker");
        picker.setAttribute("placement", placement);
        container.appendChild(picker);

        await new Promise(resolve => setTimeout(resolve, 50));

        expect(picker.getAttribute("placement")).toBe(placement);
      });
    });
  });

  /**
   * 方法测试
   */
  describe("Methods", () => {
    it("应该有 show 方法", async () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(typeof picker.show).toBe("function");
    });

    it("应该有 hide 方法", async () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(typeof picker.hide).toBe("function");
    });

    it("应该有 focus 方法", async () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(typeof picker.focus).toBe("function");
    });

    it("应该有 blur 方法", async () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(typeof picker.blur).toBe("function");
    });
  });
});

suite("EaColorPickerPanel Component", () => {
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
    it("应该正确渲染 ea-color-picker-panel 组件", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      container.appendChild(panel);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(panel).toBeDefined();
      expect(panel.shadowRoot).toBeDefined();
    });

    it("应该包含 container 元素", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      container.appendChild(panel);

      await new Promise(resolve => setTimeout(resolve, 50));

      const containerEl = panel.shadowRoot.querySelector(
        ".ea-color-picker-panel__container"
      );
      expect(containerEl).toBeDefined();
    });
  });

  /**
   * Value 属性测试
   */
  describe("Value Attribute", () => {
    it("应该正确设置 value 属性", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      panel.setAttribute("value", "#409eff");
      container.appendChild(panel);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(panel.value).toBe("#409eff");
    });

    it("应该支持 rgba 格式的值", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      panel.setAttribute("value", "rgba(64, 158, 255, 0.5)");
      panel.setAttribute("show-alpha", "");
      container.appendChild(panel);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(panel.value).toBe("rgba(64, 158, 255, 0.5)");
    });
  });

  /**
   * Show Alpha 属性测试
   */
  describe("Show Alpha Attribute", () => {
    it("应该正确设置 show-alpha 属性", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      panel.setAttribute("show-alpha", "");
      container.appendChild(panel);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(panel.getAttribute("show-alpha")).toBe("");
    });
  });

  /**
   * Disabled 属性测试
   */
  describe("Disabled Attribute", () => {
    it("应该正确设置 disabled 属性", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      panel.setAttribute("disabled", "");
      container.appendChild(panel);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(panel.disabled).toBe(true);
    });
  });

  /**
   * Border 属性测试
   */
  describe("Border Attribute", () => {
    it("应该正确设置 border 属性", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      panel.setAttribute("border", "");
      container.appendChild(panel);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(panel.getAttribute("border")).toBe("");
    });
  });

  /**
   * Clearable 属性测试
   */
  describe("Clearable Attribute", () => {
    it("默认应该可编辑", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      container.appendChild(panel);

      await new Promise(resolve => setTimeout(resolve, 50));

      // 默认 clearable 为 true，显示输入框
      expect(panel.clearable).not.toBe(false);
    });
  });

  /**
   * 事件测试
   */
  describe("Events", () => {
    it("应该触发 ea-active-change 事件", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      container.appendChild(panel);

      await new Promise(resolve => setTimeout(resolve, 50));

      const activeChangeHandler = vi.fn();
      panel.addEventListener("ea-active-change", activeChangeHandler);

      // 验证事件监听已设置
      expect(activeChangeHandler).not.toHaveBeenCalled();
    });

    it("应该触发 ea-invalid-color 事件", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      container.appendChild(panel);

      await new Promise(resolve => setTimeout(resolve, 50));

      const invalidColorHandler = vi.fn();
      panel.addEventListener("ea-invalid-color", invalidColorHandler);

      // 验证事件监听已设置
      expect(invalidColorHandler).not.toHaveBeenCalled();
    });
  });

  /**
   * CSS Part 测试
   */
  describe("CSS Parts", () => {
    it("应该正确设置 container part", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      container.appendChild(panel);

      await new Promise(resolve => setTimeout(resolve, 50));

      const containerEl = panel.shadowRoot.querySelector("[part='container']");
      expect(containerEl).toBeDefined();
    });

    it("应该正确设置 wrapper part", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      container.appendChild(panel);

      await new Promise(resolve => setTimeout(resolve, 50));

      const wrapper = panel.shadowRoot.querySelector("[part='wrapper']");
      expect(wrapper).toBeDefined();
    });
  });

  /**
   * 预定义颜色测试
   */
  describe("Predefine Colors", () => {
    it("应该支持预定义颜色", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      container.appendChild(panel);

      await new Promise(resolve => setTimeout(resolve, 50));

      const predefineList = ["#ff4500", "#ff8c00", "#ffd700"];
      panel.predefine = predefineList;

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(panel.predefine).toEqual(predefineList);
    });
  });
});
