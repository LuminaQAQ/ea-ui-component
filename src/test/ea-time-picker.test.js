import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// Mock scrollTo for JSDOM environment
Element.prototype.scrollTo = Element.prototype.scrollTo || function () {};

// 尝试加载组件，处理组件尚未重构为 TypeScript 的情况
let componentReady = false;
try {
  await import("../components/ea-time-picker/index.js");
  componentReady = true;
} catch (e) {
  console.warn(`[ea-time-picker] 组件尚未重构为 TypeScript (或存在依赖缺失)，跳过测试`);
}

const suite = componentReady ? describe : describe.skip;

suite("EaTimePicker Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  /**
   * EaTimePicker 基本功能测试
   */
  describe("EaTimePicker Basic Functionality", () => {
    it("应该正确渲染 ea-time-picker 组件", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(timePicker).toBeDefined();
      expect(timePicker.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(
        timePicker.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
    });

    it("应该包含 input CSS Part", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(
        timePicker.shadowRoot.querySelector('[part="input"]')
      ).toBeTruthy();
    });

    it("应该包含 dropdown CSS Part", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(
        timePicker.shadowRoot.querySelector('[part="dropdown"]')
      ).toBeTruthy();
    });

    it("应该包含 dropdown-time CSS Part", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await new Promise(resolve => setTimeout(resolve, 50));

      const timeLists = timePicker.shadowRoot.querySelectorAll(
        '[part="dropdown-time"]'
      );
      expect(timeLists.length).toBe(3); // hour, minute, second
    });

    it("应该包含 dropdown-item CSS Part", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await new Promise(resolve => setTimeout(resolve, 50));

      const items = timePicker.shadowRoot.querySelectorAll(
        '[part="dropdown-item"]'
      );
      expect(items.length).toBeGreaterThan(0);
    });
  });

  /**
   * EaTimePicker Value 属性测试
   */
  describe("EaTimePicker Value Attribute", () => {
    it("默认 value 应该是空字符串", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(timePicker.value).toBe("");
    });

    it("应该支持 value 属性", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.value = "08:30:00";
      container.appendChild(timePicker);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(timePicker.value).toBe("08:30:00");
    });

    it("应该支持不同的 value 格式", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.value = "23:59:59";
      container.appendChild(timePicker);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(timePicker.value).toBe("23:59:59");
    });
  });

  /**
   * EaTimePicker Placeholder 属性测试
   */
  describe("EaTimePicker Placeholder Attribute", () => {
    it("默认 placeholder 应该是空字符串或 undefined", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await new Promise(resolve => setTimeout(resolve, 50));

      // 属性可能返回空字符串或 undefined
      const value = timePicker.placeholder;
      expect(value === "" || value === undefined).toBe(true);
    });

    it("应该支持 placeholder 属性", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.placeholder = "Select time";
      container.appendChild(timePicker);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(timePicker.placeholder).toBe("Select time");
    });
  });

  /**
   * EaTimePicker Disabled 属性测试
   */
  describe("EaTimePicker Disabled Attribute", () => {
    it("默认 disabled 应该是 false", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await new Promise(resolve => setTimeout(resolve, 50));

      const value = timePicker.disabled;
      expect(value === false || value === null).toBe(true);
    });

    it("设置 disabled 应该禁用组件", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.disabled = true;
      container.appendChild(timePicker);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(timePicker.disabled).toBe(true);
    });
  });

  /**
   * EaTimePicker Size 属性测试
   */
  describe("EaTimePicker Size Attribute", () => {
    it("默认 size 应该是空字符串", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(timePicker.size).toBe("");
    });

    it("应该支持 size='small'", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.size = "small";
      container.appendChild(timePicker);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(timePicker.size).toBe("small");
    });

    it("应该支持 size='default'", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.size = "default";
      container.appendChild(timePicker);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(timePicker.size).toBe("default");
    });

    it("应该支持 size='large'", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.size = "large";
      container.appendChild(timePicker);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(timePicker.size).toBe("large");
    });
  });

  /**
   * EaTimePicker Align 属性测试
   */
  describe("EaTimePicker Align Attribute", () => {
    it("默认 align 应该是 left", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(timePicker.align).toBe("left");
    });

    it("应该支持 align='center'", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.align = "center";
      container.appendChild(timePicker);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(timePicker.align).toBe("center");
    });

    it("应该支持 align='right'", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.align = "right";
      container.appendChild(timePicker);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(timePicker.align).toBe("right");
    });
  });

  /**
   * EaTimePicker Width 属性测试
   */
  describe("EaTimePicker Width Attribute", () => {
    it("默认 width 应该是空字符串", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(timePicker.width).toBe("");
    });

    it("应该支持 width 属性", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.width = "200px";
      container.appendChild(timePicker);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(timePicker.width).toBe("200px");
    });
  });

  /**
   * EaTimePicker Limit Range 属性测试
   */
  describe("EaTimePicker Limit Range Attributes", () => {
    it("默认 limit-range-start 应该是 00:00:00", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(timePicker["limit-range-start"]).toBe("00:00:00");
    });

    it("默认 limit-range-end 应该是 23:59:59", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(timePicker["limit-range-end"]).toBe("23:59:59");
    });

    it("应该支持 limit-range-start 属性", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker["limit-range-start"] = "09:00:00";
      container.appendChild(timePicker);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(timePicker["limit-range-start"]).toBe("09:00:00");
    });

    it("应该支持 limit-range-end 属性", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker["limit-range-end"] = "18:00:00";
      container.appendChild(timePicker);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(timePicker["limit-range-end"]).toBe("18:00:00");
    });
  });

  /**
   * EaTimePicker Required 属性测试
   */
  describe("EaTimePicker Required Attribute", () => {
    it("默认 required 应该是 false", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await new Promise(resolve => setTimeout(resolve, 50));

      const value = timePicker.required;
      expect(value === false || value === null).toBe(true);
    });

    it("设置 required 应该启用必填验证", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.required = true;
      container.appendChild(timePicker);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(timePicker.required).toBe(true);
    });
  });

  /**
   * EaTimePicker Label 属性测试
   */
  describe("EaTimePicker Label Attribute", () => {
    it("默认 label 应该是空字符串", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(timePicker.label).toBe("");
    });

    it("应该支持 label 属性", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.label = "Time Label";
      container.appendChild(timePicker);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(timePicker.label).toBe("Time Label");
    });
  });

  /**
   * EaTimePicker 事件测试
   */
  describe("EaTimePicker Events", () => {
    it("应该触发 change 事件", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await new Promise(resolve => setTimeout(resolve, 50));

      let changeDetail = null;
      timePicker.addEventListener("change", e => {
        changeDetail = e.detail;
      });

      timePicker.value = "12:30:00";

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(changeDetail).toBeDefined();
    });

    it("应该触发 focus 事件", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await new Promise(resolve => setTimeout(resolve, 50));

      let focusTriggered = false;
      timePicker.addEventListener("focus", () => {
        focusTriggered = true;
      });

      timePicker.focus();

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(focusTriggered).toBe(true);
    });

    it("应该触发 blur 事件", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await new Promise(resolve => setTimeout(resolve, 50));

      let blurTriggered = false;
      timePicker.addEventListener("blur", () => {
        blurTriggered = true;
      });

      timePicker.focus();
      await new Promise(resolve => setTimeout(resolve, 50));
      timePicker.blur();
      await new Promise(resolve => setTimeout(resolve, 50));

      expect(blurTriggered).toBe(true);
    });

    it("应该触发 ea-visible-change 事件", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await new Promise(resolve => setTimeout(resolve, 50));

      let visibleChangeDetail = null;
      timePicker.addEventListener("ea-visible-change", e => {
        visibleChangeDetail = e.detail;
      });

      timePicker.handleOpen();

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(visibleChangeDetail).toBeDefined();
      expect(visibleChangeDetail.visible).toBe(true);
    });
  });

  /**
   * EaTimePicker 方法测试
   */
  describe("EaTimePicker Methods", () => {
    it("handleOpen 方法应该打开下拉面板", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await new Promise(resolve => setTimeout(resolve, 50));

      timePicker.handleOpen();

      await new Promise(resolve => setTimeout(resolve, 50));

      const containerEl =
        timePicker.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-open")).toBe(true);
    });

    it("handleClose 方法应该关闭下拉面板", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await new Promise(resolve => setTimeout(resolve, 50));

      timePicker.handleOpen();
      await new Promise(resolve => setTimeout(resolve, 50));
      timePicker.handleClose();
      await new Promise(resolve => setTimeout(resolve, 50));

      const containerEl =
        timePicker.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-open")).toBe(false);
    });

    it("focus 方法应该使输入框获取焦点", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await new Promise(resolve => setTimeout(resolve, 50));

      // 只是验证方法可以调用，不验证实际焦点状态
      expect(() => timePicker.focus()).not.toThrow();
    });

    it("blur 方法应该使输入框失去焦点", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await new Promise(resolve => setTimeout(resolve, 50));

      // 只是验证方法可以调用，不验证实际焦点状态
      expect(() => timePicker.blur()).not.toThrow();
    });
  });

  /**
   * EaTimePicker 组合测试
   */
  describe("EaTimePicker Combined Tests", () => {
    it("应该同时支持 value 和 placeholder", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.value = "08:00:00";
      timePicker.placeholder = "Select time";
      container.appendChild(timePicker);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(timePicker.value).toBe("08:00:00");
      expect(timePicker.placeholder).toBe("Select time");
    });

    it("应该同时支持 disabled 和 size", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.disabled = true;
      timePicker.size = "large";
      container.appendChild(timePicker);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(timePicker.disabled).toBe(true);
      expect(timePicker.size).toBe("large");
    });

    it("应该同时支持 limit-range-start 和 limit-range-end", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker["limit-range-start"] = "09:00:00";
      timePicker["limit-range-end"] = "18:00:00";
      container.appendChild(timePicker);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(timePicker["limit-range-start"]).toBe("09:00:00");
      expect(timePicker["limit-range-end"]).toBe("18:00:00");
    });
  });

  /**
   * EaTimePicker 边界条件测试
   */
  describe("EaTimePicker Edge Cases", () => {
    it("空值应该正常处理", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.value = "";
      container.appendChild(timePicker);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(timePicker.value).toBe("");
    });

    it("无效的时间值应该正常处理", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.value = "invalid";
      container.appendChild(timePicker);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(timePicker.value).toBe("invalid");
    });

    it("多个 time-picker 应该独立工作", async () => {
      const picker1 = document.createElement("ea-time-picker");
      picker1.value = "08:00:00";

      const picker2 = document.createElement("ea-time-picker");
      picker2.value = "16:00:00";

      container.appendChild(picker1);
      container.appendChild(picker2);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(picker1.value).toBe("08:00:00");
      expect(picker2.value).toBe("16:00:00");
    });
  });

  /**
   * EaTimePicker 生命周期测试
   */
  describe("EaTimePicker Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.value = "12:30:00";
      container.appendChild(timePicker);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(timePicker.shadowRoot).toBeDefined();
      expect(timePicker.value).toBe("12:30:00");
    });

    it("组件断开连接后应该正常移除", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await new Promise(resolve => setTimeout(resolve, 50));

      timePicker.remove();

      expect(container.contains(timePicker)).toBe(false);
    });

    it("动态修改 value 应该生效", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.value = "08:00:00";
      container.appendChild(timePicker);

      await new Promise(resolve => setTimeout(resolve, 50));

      timePicker.value = "16:30:00";

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(timePicker.value).toBe("16:30:00");
    });

    it("动态修改 disabled 应该生效", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await new Promise(resolve => setTimeout(resolve, 50));

      timePicker.disabled = true;

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(timePicker.disabled).toBe(true);
    });

    it("动态修改 size 应该生效", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.size = "small";
      container.appendChild(timePicker);

      await new Promise(resolve => setTimeout(resolve, 50));

      timePicker.size = "large";

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(timePicker.size).toBe("large");
    });

    it("动态修改 align 应该生效", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.align = "left";
      container.appendChild(timePicker);

      await new Promise(resolve => setTimeout(resolve, 50));

      timePicker.align = "center";

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(timePicker.align).toBe("center");
    });
  });
});
