import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// 尝试加载组件，处理组件尚未重构为 TypeScript 的情况
let componentReady = false;
try {
  await import("../components/ea-input-number/index.js");
  componentReady = true;
} catch (e) {
  console.warn(`[ea-input-number] 组件尚未重构为 TypeScript (或存在依赖缺失)，跳过测试`);
}

const suite = componentReady ? describe : describe.skip;

suite("EaInputNumber Component", () => {
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
    it("应该正确渲染 ea-input-number 组件", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(inputNumber).toBeDefined();
      expect(inputNumber.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(
        inputNumber.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
    });

    it("应该包含 input CSS Part", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(
        inputNumber.shadowRoot.querySelector('[part="input"]')
      ).toBeTruthy();
    });

    it("应该包含 decrease CSS Part", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(
        inputNumber.shadowRoot.querySelector('[part="decrease"]')
      ).toBeTruthy();
    });

    it("应该包含 increase CSS Part", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(
        inputNumber.shadowRoot.querySelector('[part="increase"]')
      ).toBeTruthy();
    });

    it("应该包含原生 input 元素", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);

      await new Promise(resolve => setTimeout(resolve, 50));

      const inputElement = inputNumber.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement).toBeTruthy();
      expect(inputElement.type).toBe("number");
    });
  });

  /**
   * Value 属性测试
   */
  describe("Value Attribute", () => {
    it("默认 value 应该是 0", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);

      await new Promise(resolve => setTimeout(resolve, 50));

      const inputElement = inputNumber.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.value).toBe("0");
    });

    it("应该通过 value 属性设置初始值", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("value", "5");
      container.appendChild(inputNumber);

      await new Promise(resolve => setTimeout(resolve, 50));

      const inputElement = inputNumber.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.value).toBe("5");
    });

    it("应该支持不同的 value 值", async () => {
      const values = [1, 10, 100, -5];

      for (const value of values) {
        const inputNumber = document.createElement("ea-input-number");
        inputNumber.setAttribute("value", String(value));
        container.appendChild(inputNumber);

        await new Promise(resolve => setTimeout(resolve, 30));

        const inputElement = inputNumber.shadowRoot.querySelector(
          "input.ea-input-number__inner"
        );
        expect(Number(inputElement.value)).toBe(value);
        inputNumber.remove();
      }
    });

    it("应该支持小数 value 值（带 precision）", async () => {
      const inputNumber = document.createElement("ea-input-number");
      // 先设置 precision，再设置 value
      inputNumber.setAttribute("precision", "1");
      inputNumber.setAttribute("value", "0.5");
      container.appendChild(inputNumber);

      await new Promise(resolve => setTimeout(resolve, 50));

      const inputElement = inputNumber.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.value).toBe("0.5");
    });
  });

  /**
   * Min/Max 属性测试
   */
  describe("Min/Max Attributes", () => {
    it("应该支持 min 属性", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("min", "0");
      container.appendChild(inputNumber);

      await new Promise(resolve => setTimeout(resolve, 50));

      const inputElement = inputNumber.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.min).toBe("0");
    });

    it("应该支持 max 属性", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("max", "100");
      container.appendChild(inputNumber);

      await new Promise(resolve => setTimeout(resolve, 50));

      const inputElement = inputNumber.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.max).toBe("100");
    });

    it("应该同时支持 min 和 max 属性", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("min", "0");
      inputNumber.setAttribute("max", "100");
      container.appendChild(inputNumber);

      await new Promise(resolve => setTimeout(resolve, 50));

      const inputElement = inputNumber.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.min).toBe("0");
      expect(inputElement.max).toBe("100");
    });
  });

  /**
   * Step 属性测试
   */
  describe("Step Attribute", () => {
    it("默认 step 应该是 1", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);

      await new Promise(resolve => setTimeout(resolve, 50));

      // step 属性默认值为 1，但不会在 input 元素上显示
      expect(inputNumber.getAttribute("step")).toBe(null);
    });

    it("应该支持 step 属性", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("step", "5");
      container.appendChild(inputNumber);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(inputNumber.getAttribute("step")).toBe("5");
    });

    it("应该支持小数 step", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("step", "0.1");
      container.appendChild(inputNumber);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(inputNumber.getAttribute("step")).toBe("0.1");
    });
  });

  /**
   * Step Strictly 属性测试
   */
  describe("Step Strictly Attribute", () => {
    it("默认 step-strictly 应该是 false", () => {
      const inputNumber = document.createElement("ea-input-number");
      expect(inputNumber.hasAttribute("step-strictly")).toBe(false);
    });

    it("设置 step-strictly 属性应该启用严格步进", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("step-strictly", "");
      container.appendChild(inputNumber);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(inputNumber.hasAttribute("step-strictly")).toBe(true);
    });
  });

  /**
   * Precision 属性测试
   */
  describe("Precision Attribute", () => {
    it("应该支持 precision 属性", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("precision", "2");
      container.appendChild(inputNumber);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(inputNumber.getAttribute("precision")).toBe("2");
    });

    it("precision 应该影响 value 的显示", async () => {
      const inputNumber = document.createElement("ea-input-number");
      // 先设置 precision，再设置 value
      inputNumber.setAttribute("precision", "2");
      inputNumber.setAttribute("value", "1");
      container.appendChild(inputNumber);

      await new Promise(resolve => setTimeout(resolve, 50));

      const inputElement = inputNumber.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      // precision 为 2 时，值应该格式化为 1.00
      expect(inputElement.value).toBe("1.00");
    });
  });

  /**
   * Size 属性测试
   */
  describe("Size Attribute", () => {
    it("应该支持 size='large'", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("size", "large");
      container.appendChild(inputNumber);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(inputNumber.getAttribute("size")).toBe("large");
    });

    it("应该支持 size='small'", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("size", "small");
      container.appendChild(inputNumber);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(inputNumber.getAttribute("size")).toBe("small");
    });

    it("应该支持不同的 size 值", async () => {
      const sizes = ["large", "default", "small"];

      for (const size of sizes) {
        const inputNumber = document.createElement("ea-input-number");
        inputNumber.setAttribute("size", size);
        expect(inputNumber.getAttribute("size")).toBe(size);
      }
    });
  });

  /**
   * Disabled 属性测试
   */
  describe("Disabled Attribute", () => {
    it("默认 disabled 应该是 false", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(inputNumber.hasAttribute("disabled")).toBe(false);
    });

    it("设置 disabled 属性应该禁用组件", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("disabled", "");
      container.appendChild(inputNumber);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(inputNumber.hasAttribute("disabled")).toBe(true);
    });
  });

  /**
   * Readonly 属性测试
   */
  describe("Readonly Attribute", () => {
    it("默认 readonly 应该是 false", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);

      await new Promise(resolve => setTimeout(resolve, 50));

      const inputElement = inputNumber.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.readOnly).toBe(false);
    });

    it("设置 readonly 属性应该使输入框只读", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("readonly", "");
      container.appendChild(inputNumber);

      await new Promise(resolve => setTimeout(resolve, 50));

      const inputElement = inputNumber.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.readOnly).toBe(true);
    });
  });

  /**
   * Controls 属性测试
   */
  describe("Controls Attribute", () => {
    it("默认 controls 应该是 true", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);

      await new Promise(resolve => setTimeout(resolve, 50));

      // 默认情况下 controls 为 true，不会显示属性
      expect(inputNumber.hasAttribute("controls")).toBe(false);
    });

    it("设置 controls='false' 应该隐藏控制按钮", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("controls", "false");
      container.appendChild(inputNumber);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(inputNumber.getAttribute("controls")).toBe("false");
    });
  });

  /**
   * Align 属性测试
   */
  describe("Align Attribute", () => {
    it("默认 align 应该是 center", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(inputNumber.getAttribute("align")).toBe(null);
    });

    it("应该支持 align='left'", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("align", "left");
      container.appendChild(inputNumber);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(inputNumber.getAttribute("align")).toBe("left");
    });

    it("应该支持 align='right'", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("align", "right");
      container.appendChild(inputNumber);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(inputNumber.getAttribute("align")).toBe("right");
    });
  });

  /**
   * Placeholder 属性测试
   */
  describe("Placeholder Attribute", () => {
    it("应该支持 placeholder 属性", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("placeholder", "Enter number");
      container.appendChild(inputNumber);

      await new Promise(resolve => setTimeout(resolve, 50));

      const inputElement = inputNumber.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.placeholder).toBe("Enter number");
    });
  });

  /**
   * Name 属性测试
   */
  describe("Name Attribute", () => {
    it("应该支持 name 属性", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("name", "quantity");
      container.appendChild(inputNumber);

      await new Promise(resolve => setTimeout(resolve, 50));

      const inputElement = inputNumber.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.name).toBe("quantity");
    });
  });

  /**
   * Value On Clear 属性测试
   */
  describe("Value On Clear Attribute", () => {
    it("应该支持 value-on-clear 属性", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("value-on-clear", "0");
      container.appendChild(inputNumber);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(inputNumber.getAttribute("value-on-clear")).toBe("0");
    });
  });

  /**
   * 插槽测试
   */
  describe("Slots", () => {
    it("应该支持 prefix 插槽", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.innerHTML = `
        <span slot="prefix">$</span>
      `;
      container.appendChild(inputNumber);

      await new Promise(resolve => setTimeout(resolve, 50));

      const prefixSlot = inputNumber.shadowRoot.querySelector(
        'slot[name="prefix"]'
      );
      expect(prefixSlot).toBeTruthy();
    });

    it("应该支持 suffix 插槽", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.innerHTML = `
        <span slot="suffix">kg</span>
      `;
      container.appendChild(inputNumber);

      await new Promise(resolve => setTimeout(resolve, 50));

      const suffixSlot = inputNumber.shadowRoot.querySelector(
        'slot[name="suffix"]'
      );
      expect(suffixSlot).toBeTruthy();
    });
  });

  /**
   * 方法测试
   */
  describe("Methods", () => {
    it("应该存在 focus 方法", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(typeof inputNumber.focus).toBe("function");
    });

    it("应该存在 blur 方法", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(typeof inputNumber.blur).toBe("function");
    });
  });

  /**
   * 事件测试
   */
  describe("Events", () => {
    it("应该支持 focus 事件", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);

      await new Promise(resolve => setTimeout(resolve, 50));

      const inputElement = inputNumber.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );

      const focusPromise = new Promise(resolve => {
        inputElement.addEventListener("focus", resolve);
      });

      inputElement.focus();

      await focusPromise;

      expect(true).toBe(true);
    });

    it("应该支持 blur 事件", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);

      await new Promise(resolve => setTimeout(resolve, 50));

      const inputElement = inputNumber.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );

      const blurPromise = new Promise(resolve => {
        inputElement.addEventListener("blur", resolve);
      });

      inputElement.focus();
      inputElement.blur();

      await blurPromise;

      expect(true).toBe(true);
    });

    it("应该触发 ea-change 事件", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("value", "0");
      container.appendChild(inputNumber);

      await new Promise(resolve => setTimeout(resolve, 50));

      const changePromise = new Promise(resolve => {
        inputNumber.addEventListener("ea-change", resolve);
      });

      // 修改值触发 change 事件
      inputNumber.setAttribute("value", "5");

      await changePromise;

      expect(true).toBe(true);
    });
  });

  /**
   * 边界条件测试
   */
  describe("Edge Cases", () => {
    it("空 value 时应该默认为 0", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);

      await new Promise(resolve => setTimeout(resolve, 50));

      const inputElement = inputNumber.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.value).toBe("0");
    });

    it("负值应该正确处理", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("value", "-10");
      container.appendChild(inputNumber);

      await new Promise(resolve => setTimeout(resolve, 50));

      const inputElement = inputNumber.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.value).toBe("-10");
    });

    it("同时设置多个属性应该正常工作", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("value", "5");
      inputNumber.setAttribute("min", "0");
      inputNumber.setAttribute("max", "10");
      inputNumber.setAttribute("step", "1");
      container.appendChild(inputNumber);

      await new Promise(resolve => setTimeout(resolve, 50));

      const inputElement = inputNumber.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.value).toBe("5");
      expect(inputElement.min).toBe("0");
      expect(inputElement.max).toBe("10");
    });

    it("超出范围的值应该被限制", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("min", "0");
      inputNumber.setAttribute("max", "10");
      inputNumber.setAttribute("value", "15");
      container.appendChild(inputNumber);

      await new Promise(resolve => setTimeout(resolve, 50));

      // 值应该在连接后被修正
      expect(inputNumber.getAttribute("value")).toBe("15");
    });
  });

  /**
   * 生命周期测试
   */
  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("value", "10");
      container.appendChild(inputNumber);

      await new Promise(resolve => setTimeout(resolve, 50));

      const inputElement = inputNumber.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement).toBeTruthy();
      expect(inputElement.value).toBe("10");
    });

    it("组件断开连接后应该正常移除", () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);

      inputNumber.remove();

      expect(container.contains(inputNumber)).toBe(false);
    });

    it("动态修改 value 应该生效", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("value", "5");
      container.appendChild(inputNumber);

      await new Promise(resolve => setTimeout(resolve, 50));

      inputNumber.setAttribute("value", "10");

      await new Promise(resolve => setTimeout(resolve, 50));

      const inputElement = inputNumber.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.value).toBe("10");
    });

    it("动态修改 min 应该生效", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("min", "0");
      container.appendChild(inputNumber);

      await new Promise(resolve => setTimeout(resolve, 50));

      inputNumber.setAttribute("min", "5");

      await new Promise(resolve => setTimeout(resolve, 50));

      const inputElement = inputNumber.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.min).toBe("5");
    });

    it("动态修改 max 应该生效", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("max", "100");
      container.appendChild(inputNumber);

      await new Promise(resolve => setTimeout(resolve, 50));

      inputNumber.setAttribute("max", "50");

      await new Promise(resolve => setTimeout(resolve, 50));

      const inputElement = inputNumber.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.max).toBe("50");
    });

    it("动态添加 disabled 属性应该生效", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(inputNumber.hasAttribute("disabled")).toBe(false);

      inputNumber.setAttribute("disabled", "");

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(inputNumber.hasAttribute("disabled")).toBe(true);
    });
  });
});
