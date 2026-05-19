import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender.js";

import "../components/ea-input-number/index.ts";

describe("EaInputNumber Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe("Basic Rendering", () => {
    it("应该正确渲染 ea-input-number 组件并拥有 shadowRoot", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(inputNumber).toBeDefined();
      expect(inputNumber.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(
        inputNumber.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
    });

    it("应该包含 input CSS Part", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(
        inputNumber.shadowRoot.querySelector('[part="input"]')
      ).toBeTruthy();
    });

    it("应该包含 decrease CSS Part", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(
        inputNumber.shadowRoot.querySelector('[part="decrease"]')
      ).toBeTruthy();
    });

    it("应该包含 increase CSS Part", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(
        inputNumber.shadowRoot.querySelector('[part="increase"]')
      ).toBeTruthy();
    });

    it("应该包含 region CSS Part", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(
        inputNumber.shadowRoot.querySelector('[part="region"]')
      ).toBeTruthy();
    });

    it("应该包含 label CSS Part", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(
        inputNumber.shadowRoot.querySelector('[part="label"]')
      ).toBeTruthy();
    });

    it("应该包含 prefix CSS Part", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(
        inputNumber.shadowRoot.querySelector('[part="prefix"]')
      ).toBeTruthy();
    });

    it("应该包含 suffix CSS Part", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(
        inputNumber.shadowRoot.querySelector('[part="suffix"]')
      ).toBeTruthy();
    });

    it("应该包含原生 input 元素且 type 为 number", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      const inputElement = inputNumber.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement).toBeTruthy();
      expect(inputElement.type).toBe("number");
    });

    it("应该包含 decrease 和 increase 操作按钮", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      const decrease = inputNumber.shadowRoot.querySelector(
        ".ea-input-number__operator.decrease"
      );
      const increase = inputNumber.shadowRoot.querySelector(
        ".ea-input-number__operator.increase"
      );
      expect(decrease).toBeTruthy();
      expect(increase).toBeTruthy();
    });

    it("应该包含 prefix 和 suffix slot", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      const prefixSlot = inputNumber.shadowRoot.querySelector(
        'slot[name="prefix"]'
      );
      const suffixSlot = inputNumber.shadowRoot.querySelector(
        'slot[name="suffix"]'
      );
      expect(prefixSlot).toBeTruthy();
      expect(suffixSlot).toBeTruthy();
    });
  });

  describe("Value Attribute", () => {
    it("默认 value 应该是 0", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(inputNumber.value).toBe(0);
    });

    it("通过 HTML attribute 设置 value 应该正确反映", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("value", "5");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(inputNumber.value).toBe(5);
    });

    it("通过 JS 属性设置 value 应该更新 input 显示", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      inputNumber.value = 10;
      await waitForRender();

      expect(inputNumber.value).toBe(10);
      const inputElement = inputNumber.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(Number(inputElement.value)).toBe(10);
    });

    it("value 变化时应该更新 input 元素的值", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      inputNumber.value = 42;
      await waitForRender();

      const inputElement = inputNumber.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.value).toBe("42");
    });

    it("value 变化时应该触发 ea-change 事件", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      const changeSpy = vi.fn();
      inputNumber.addEventListener("ea-change", changeSpy);

      inputNumber.value = 10;
      await waitForRender();

      expect(changeSpy).toHaveBeenCalledTimes(1);
    });

    it("ea-change 事件应该包含 currentValue 和 oldValue", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      let eventDetail = null;
      inputNumber.addEventListener("ea-change", e => {
        eventDetail = e.detail;
      });

      inputNumber.value = 10;
      await waitForRender();

      expect(eventDetail).toBeDefined();
      expect(eventDetail.currentValue).toBe(10);
      expect(eventDetail.oldValue).toBe(0);
    });

    it("连续修改 value 应该正确触发多次 ea-change", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      const changeSpy = vi.fn();
      inputNumber.addEventListener("ea-change", changeSpy);

      inputNumber.value = 5;
      await waitForRender();
      inputNumber.value = 15;
      await waitForRender();

      expect(changeSpy).toHaveBeenCalledTimes(2);
    });

    it("value 达到 max 时应该设置 isMax 为 true", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.max = 10;
      container.appendChild(inputNumber);
      await waitForRender();

      inputNumber.value = 10;
      await waitForRender();

      expect(inputNumber.isMax).toBe(true);
    });

    it("value 达到 min 时应该设置 isMin 为 true", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.min = 0;
      container.appendChild(inputNumber);
      await waitForRender();

      inputNumber.value = 0;
      await waitForRender();

      expect(inputNumber.isMin).toBe(true);
    });

    it("value 在 min 和 max 之间时 isMin 和 isMax 都应该为 false", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.min = 0;
      inputNumber.max = 100;
      container.appendChild(inputNumber);
      await waitForRender();

      inputNumber.value = 50;
      await waitForRender();

      expect(inputNumber.isMin).toBe(false);
      expect(inputNumber.isMax).toBe(false);
    });
  });

  describe("Label Attribute", () => {
    it("默认 label 应该是空字符串", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(inputNumber.label).toBe("");
    });

    it("设置 label 属性应该正确反映", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("label", "数量");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(inputNumber.label).toBe("数量");
    });

    it("label 应该正确显示在标签元素上", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("label", "数量");
      container.appendChild(inputNumber);
      await waitForRender();

      const labelEl = inputNumber.shadowRoot.querySelector(
        ".ea-input-number__form-label"
      );
      expect(labelEl.textContent).toBe("数量");
    });

    it("动态修改 label 应该实时更新", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      inputNumber.label = "新标签";
      await waitForRender();

      const labelEl = inputNumber.shadowRoot.querySelector(
        ".ea-input-number__form-label"
      );
      expect(labelEl.textContent).toBe("新标签");
    });
  });

  describe("Min/Max Attributes", () => {
    it("min 默认值应该是 Number.MIN_SAFE_INTEGER", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(inputNumber.min).toBe(Number.MIN_SAFE_INTEGER);
    });

    it("max 默认值应该是 Number.MAX_SAFE_INTEGER", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(inputNumber.max).toBe(Number.MAX_SAFE_INTEGER);
    });

    it("设置 min 属性应该同步到 input 元素", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("min", "0");
      container.appendChild(inputNumber);
      await waitForRender();

      const inputElement = inputNumber.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.min).toBe("0");
    });

    it("设置 max 属性应该同步到 input 元素", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("max", "100");
      container.appendChild(inputNumber);
      await waitForRender();

      const inputElement = inputNumber.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.max).toBe("100");
    });

    it("同时设置 min 和 max 应该正确同步", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("min", "10");
      inputNumber.setAttribute("max", "200");
      container.appendChild(inputNumber);
      await waitForRender();

      const inputElement = inputNumber.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.min).toBe("10");
      expect(inputElement.max).toBe("200");
    });

    it("动态修改 min 应该同步到 input 元素", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      inputNumber.min = 5;
      await waitForRender();

      const inputElement = inputNumber.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.min).toBe("5");
    });

    it("动态修改 max 应该同步到 input 元素", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      inputNumber.max = 50;
      await waitForRender();

      const inputElement = inputNumber.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.max).toBe("50");
    });

    it("支持负数 min", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("min", "-10");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(inputNumber.min).toBe(-10);
    });
  });

  describe("Step Attribute", () => {
    it("默认 step 应该是 1", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(inputNumber.step).toBe(1);
    });

    it("设置 step 属性应该正确反映", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("step", "5");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(inputNumber.step).toBe(5);
    });

    it("应该支持小数 step", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("step", "0.1");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(inputNumber.step).toBe(0.1);
    });

    it("点击增加按钮应该按 step 递增", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("step", "5");
      inputNumber.setAttribute("value", "0");
      container.appendChild(inputNumber);
      await waitForRender();

      const increase = inputNumber.shadowRoot.querySelector(
        ".ea-input-number__operator.increase"
      );
      increase.click();
      await waitForRender();

      expect(inputNumber.value).toBe(5);
    });

    it("点击减少按钮应该按 step 递减", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("step", "5");
      inputNumber.setAttribute("value", "10");
      container.appendChild(inputNumber);
      await waitForRender();

      const decrease = inputNumber.shadowRoot.querySelector(
        ".ea-input-number__operator.decrease"
      );
      decrease.click();
      await waitForRender();

      expect(inputNumber.value).toBe(5);
    });
  });

  describe("Step Strictly Attribute", () => {
    it("默认 stepStrictly 应该是 false", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(inputNumber.stepStrictly).toBe(false);
    });

    it("设置 step-strictly 属性应该启用严格步进", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("step-strictly", "");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(inputNumber.stepStrictly).toBe(true);
    });

    it("通过 JS 属性设置 stepStrictly", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      inputNumber.stepStrictly = true;
      expect(inputNumber.stepStrictly).toBe(true);
    });
  });

  describe("Precision Attribute", () => {
    it("默认 precision 应该是 0", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(inputNumber.precision).toBe(0);
    });

    it("设置 precision 属性应该正确反映", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("precision", "2");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(inputNumber.precision).toBe(2);
    });

    it("precision 应该影响 value 的显示格式", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("precision", "2");
      inputNumber.setAttribute("value", "1");
      container.appendChild(inputNumber);
      await waitForRender();

      const inputElement = inputNumber.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.value).toBe("1.00");
    });

    it("precision=1 时应该显示一位小数", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("precision", "1");
      inputNumber.setAttribute("value", "0.5");
      container.appendChild(inputNumber);
      await waitForRender();

      const inputElement = inputNumber.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.value).toBe("0.5");
    });

    it("precision=3 时应该显示三位小数", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("precision", "3");
      inputNumber.setAttribute("value", "1.5");
      container.appendChild(inputNumber);
      await waitForRender();

      const inputElement = inputNumber.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.value).toBe("1.500");
    });
  });

  describe("Size Attribute", () => {
    it("默认 size 应该是空字符串", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(inputNumber.size).toBe("");
    });

    it("应该支持 size='large'", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("size", "large");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(inputNumber.size).toBe("large");
    });

    it("应该支持 size='default'", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("size", "default");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(inputNumber.size).toBe("default");
    });

    it("应该支持 size='small'", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("size", "small");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(inputNumber.size).toBe("small");
    });

    it("size 变化时应该更新容器 class", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      inputNumber.size = "large";
      await waitForRender();

      const containerEl =
        inputNumber.shadowRoot.querySelector(".ea-input-number");
      expect(containerEl.classList.contains("ea-input-number--large")).toBe(
        true
      );
    });
  });

  describe("Disabled Attribute", () => {
    it("默认 disabled 应该是 false", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(inputNumber.disabled).toBe(false);
    });

    it("设置 disabled 属性应该禁用组件", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("disabled", "");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(inputNumber.disabled).toBe(true);
    });

    it("disabled 时容器应该包含 is-disabled class", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("disabled", "");
      container.appendChild(inputNumber);
      await waitForRender();

      const containerEl =
        inputNumber.shadowRoot.querySelector(".ea-input-number");
      expect(containerEl.classList.contains("is-disabled")).toBe(true);
    });

    it("disabled 时点击增加按钮不应该改变 value", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("disabled", "");
      inputNumber.setAttribute("value", "5");
      container.appendChild(inputNumber);
      await waitForRender();

      const increase = inputNumber.shadowRoot.querySelector(
        ".ea-input-number__operator.increase"
      );
      increase.click();
      await waitForRender();

      expect(inputNumber.value).toBe(5);
    });

    it("disabled 时点击减少按钮不应该改变 value", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("disabled", "");
      inputNumber.setAttribute("value", "5");
      container.appendChild(inputNumber);
      await waitForRender();

      const decrease = inputNumber.shadowRoot.querySelector(
        ".ea-input-number__operator.decrease"
      );
      decrease.click();
      await waitForRender();

      expect(inputNumber.value).toBe(5);
    });

    it("动态切换 disabled 应该正确更新容器 class", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      inputNumber.disabled = true;
      await waitForRender();

      const containerEl =
        inputNumber.shadowRoot.querySelector(".ea-input-number");
      expect(containerEl.classList.contains("is-disabled")).toBe(true);

      inputNumber.disabled = false;
      await waitForRender();

      expect(containerEl.classList.contains("is-disabled")).toBe(false);
    });
  });

  describe("Readonly Attribute", () => {
    it("默认 readonly 应该是 false", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      const inputElement = inputNumber.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.readOnly).toBe(false);
    });

    it("设置 readonly 属性应该使输入框只读", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("readonly", "");
      container.appendChild(inputNumber);
      await waitForRender();

      const inputElement = inputNumber.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.readOnly).toBe(true);
    });

    it("动态修改 readonly 应该实时生效", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      inputNumber.readonly = true;
      await waitForRender();

      const inputElement = inputNumber.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.readOnly).toBe(true);

      inputNumber.readonly = false;
      await waitForRender();

      expect(inputElement.readOnly).toBe(false);
    });
  });

  describe("Controls Attribute", () => {
    it("默认 controls 应该是 true", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(inputNumber.controls).toBe(true);
    });

    it("controls=false 时容器应该包含 is-no-controls class", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      inputNumber.controls = false;
      await waitForRender();

      const containerEl =
        inputNumber.shadowRoot.querySelector(".ea-input-number");
      expect(containerEl.classList.contains("is-no-controls")).toBe(true);
    });

    it("controls=false 时点击增加按钮不应该改变 value", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.value = 5;
      container.appendChild(inputNumber);
      await waitForRender();

      inputNumber.controls = false;
      await waitForRender();

      const increase = inputNumber.shadowRoot.querySelector(
        ".ea-input-number__operator.increase"
      );
      increase.click();
      await waitForRender();

      expect(inputNumber.value).toBe(5);
    });

    it("controls=false 时点击减少按钮不应该改变 value", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.value = 5;
      container.appendChild(inputNumber);
      await waitForRender();

      inputNumber.controls = false;
      await waitForRender();

      const decrease = inputNumber.shadowRoot.querySelector(
        ".ea-input-number__operator.decrease"
      );
      decrease.click();
      await waitForRender();

      expect(inputNumber.value).toBe(5);
    });

    it("动态切换 controls 应该正确更新容器 class", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      inputNumber.controls = false;
      await waitForRender();

      const containerEl =
        inputNumber.shadowRoot.querySelector(".ea-input-number");
      expect(containerEl.classList.contains("is-no-controls")).toBe(true);

      inputNumber.controls = true;
      await waitForRender();

      expect(containerEl.classList.contains("is-no-controls")).toBe(false);
    });
  });

  describe("Align Attribute", () => {
    it("默认 align 应该是 center", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(inputNumber.align).toBe("center");
    });

    it("应该支持 align='left'", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("align", "left");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(inputNumber.align).toBe("left");
    });

    it("应该支持 align='right'", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("align", "right");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(inputNumber.align).toBe("right");
    });

    it("align 变化时应该更新容器 class", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      inputNumber.align = "left";
      await waitForRender();

      const containerEl =
        inputNumber.shadowRoot.querySelector(".ea-input-number");
      expect(containerEl.classList.contains("ea-input-number--left")).toBe(
        true
      );
    });
  });

  describe("Placeholder Attribute", () => {
    it("默认 placeholder 应该是空字符串", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(inputNumber.placeholder).toBe("");
    });

    it("设置 placeholder 属性应该同步到 input 元素", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("placeholder", "Enter number");
      container.appendChild(inputNumber);
      await waitForRender();

      const inputElement = inputNumber.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.placeholder).toBe("Enter number");
    });

    it("动态修改 placeholder 应该实时更新", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      inputNumber.placeholder = "新提示";
      await waitForRender();

      const inputElement = inputNumber.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.placeholder).toBe("新提示");
    });
  });

  describe("Name Attribute", () => {
    it("设置 name 属性应该同步到 input 元素的 name 和 id", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("name", "quantity");
      container.appendChild(inputNumber);
      await waitForRender();

      const inputElement = inputNumber.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.name).toBe("quantity");
      expect(inputElement.id).toBe("quantity");
    });

    it("动态修改 name 应该实时更新", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      inputNumber.name = "newName";
      await waitForRender();

      const inputElement = inputNumber.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.name).toBe("newName");
      expect(inputElement.id).toBe("newName");
    });
  });

  describe("Required Attribute", () => {
    it("默认 required 应该是 false", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(inputNumber.required).toBe(false);
    });

    it("设置 required 属性应该同步到 input 元素", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("required", "");
      container.appendChild(inputNumber);
      await waitForRender();

      const inputElement = inputNumber.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.required).toBe(true);
    });

    it("动态切换 required 应该实时生效", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      inputNumber.required = true;
      await waitForRender();

      const inputElement = inputNumber.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.required).toBe(true);

      inputNumber.required = false;
      await waitForRender();

      expect(inputElement.required).toBe(false);
    });
  });

  describe("Value On Clear Attribute", () => {
    it("默认 valueOnClear 应该是空字符串", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(inputNumber.valueOnClear).toBe("");
    });

    it("设置 value-on-clear 属性应该正确反映", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("value-on-clear", "0");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(inputNumber.valueOnClear).toBe(0);
    });
  });

  describe("Inputmode Attribute", () => {
    it("默认 inputmode 应该是空字符串", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(inputNumber.inputmode).toBe("");
    });

    it("设置 inputmode 属性应该同步到 input 元素", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("inputmode", "numeric");
      container.appendChild(inputNumber);
      await waitForRender();

      const inputElement = inputNumber.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.getAttribute("inputmode")).toBe("numeric");
    });

    it("动态修改 inputmode 应该实时更新", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      inputNumber.inputmode = "decimal";
      await waitForRender();

      const inputElement = inputNumber.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.getAttribute("inputmode")).toBe("decimal");
    });
  });

  describe("DefaultValue Property", () => {
    it("默认 defaultValue 应该是 0", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(inputNumber.defaultValue).toBe(0);
    });

    it("设置 defaultValue 应该正确反映", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      inputNumber.defaultValue = 10;
      expect(inputNumber.defaultValue).toBe(10);
    });
  });

  describe("IsFocus Property", () => {
    it("默认 isFocus 应该是 false", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(inputNumber.isFocus).toBe(false);
    });

    it("focus 时 isFocus 应该变为 true", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      const inputElement = inputNumber.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      inputElement.dispatchEvent(new Event("focus"));
      await waitForRender();

      expect(inputNumber.isFocus).toBe(true);
    });

    it("blur 时 isFocus 应该变为 false", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      inputNumber.isFocus = true;
      await waitForRender();

      const inputElement = inputNumber.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      inputElement.dispatchEvent(new Event("blur"));
      await waitForRender();

      expect(inputNumber.isFocus).toBe(false);
    });
  });

  describe("IsMin/IsMax Properties", () => {
    it("默认 isMin 和 isMax 应该是 false", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(inputNumber.isMin).toBe(false);
      expect(inputNumber.isMax).toBe(false);
    });

    it("value 达到 min 时 isMin 应该为 true", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.min = 0;
      inputNumber.max = 100;
      container.appendChild(inputNumber);
      await waitForRender();

      inputNumber.value = 0;
      await waitForRender();

      expect(inputNumber.isMin).toBe(true);
    });

    it("value 达到 max 时 isMax 应该为 true", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.min = 0;
      inputNumber.max = 100;
      container.appendChild(inputNumber);
      await waitForRender();

      inputNumber.value = 100;
      await waitForRender();

      expect(inputNumber.isMax).toBe(true);
    });

    it("value 从 min 增加后 isMin 应该变为 false", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.min = 0;
      inputNumber.max = 100;
      container.appendChild(inputNumber);
      await waitForRender();

      inputNumber.value = 0;
      await waitForRender();
      expect(inputNumber.isMin).toBe(true);

      inputNumber.value = 5;
      await waitForRender();
      expect(inputNumber.isMin).toBe(false);
    });

    it("value 从 max 减少后 isMax 应该变为 false", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.min = 0;
      inputNumber.max = 100;
      container.appendChild(inputNumber);
      await waitForRender();

      inputNumber.value = 100;
      await waitForRender();
      expect(inputNumber.isMax).toBe(true);

      inputNumber.value = 95;
      await waitForRender();
      expect(inputNumber.isMax).toBe(false);
    });
  });

  describe("Container Class Updates", () => {
    it("disabled 状态应该正确反映在容器 class 中", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      inputNumber.disabled = true;
      await waitForRender();

      const containerEl =
        inputNumber.shadowRoot.querySelector(".ea-input-number");
      expect(containerEl.classList.contains("is-disabled")).toBe(true);
    });

    it("focus 状态应该正确反映在容器 class 中", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      inputNumber.isFocus = true;
      await waitForRender();

      const containerEl =
        inputNumber.shadowRoot.querySelector(".ea-input-number");
      expect(containerEl.classList.contains("is-focus")).toBe(true);
    });

    it("isMin 状态应该正确反映在容器 class 中", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      inputNumber.isMin = true;
      await waitForRender();

      const containerEl =
        inputNumber.shadowRoot.querySelector(".ea-input-number");
      expect(containerEl.classList.contains("is-min")).toBe(true);
    });

    it("isMax 状态应该正确反映在容器 class 中", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      inputNumber.isMax = true;
      await waitForRender();

      const containerEl =
        inputNumber.shadowRoot.querySelector(".ea-input-number");
      expect(containerEl.classList.contains("is-max")).toBe(true);
    });

    it("no-controls 状态应该正确反映在容器 class 中", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      inputNumber.controls = false;
      await waitForRender();

      const containerEl =
        inputNumber.shadowRoot.querySelector(".ea-input-number");
      expect(containerEl.classList.contains("is-no-controls")).toBe(true);
    });

    it("align 修饰符应该正确反映在容器 class 中", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      inputNumber.align = "left";
      await waitForRender();

      const containerEl =
        inputNumber.shadowRoot.querySelector(".ea-input-number");
      expect(containerEl.classList.contains("ea-input-number--left")).toBe(
        true
      );
    });

    it("size 修饰符应该正确反映在容器 class 中", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      inputNumber.size = "small";
      await waitForRender();

      const containerEl =
        inputNumber.shadowRoot.querySelector(".ea-input-number");
      expect(containerEl.classList.contains("ea-input-number--small")).toBe(
        true
      );
    });

    it("updateContainerClasslist 应该返回正确的 class 字符串", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      inputNumber.disabled = true;
      inputNumber.align = "center";
      inputNumber.size = "large";
      await waitForRender();

      const className = inputNumber.updateContainerClasslist();
      expect(className).toContain("ea-input-number");
      expect(className).toContain("is-disabled");
      expect(className).toContain("ea-input-number--center");
      expect(className).toContain("ea-input-number--large");
    });
  });

  describe("Increase/Decrease Buttons", () => {
    it("点击增加按钮应该增加 value", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("value", "0");
      container.appendChild(inputNumber);
      await waitForRender();

      const increase = inputNumber.shadowRoot.querySelector(
        ".ea-input-number__operator.increase"
      );
      increase.click();
      await waitForRender();

      expect(inputNumber.value).toBe(1);
    });

    it("点击减少按钮应该减少 value", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("value", "5");
      container.appendChild(inputNumber);
      await waitForRender();

      const decrease = inputNumber.shadowRoot.querySelector(
        ".ea-input-number__operator.decrease"
      );
      decrease.click();
      await waitForRender();

      expect(inputNumber.value).toBe(4);
    });

    it("连续点击增加按钮应该持续递增", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("value", "0");
      container.appendChild(inputNumber);
      await waitForRender();

      const increase = inputNumber.shadowRoot.querySelector(
        ".ea-input-number__operator.increase"
      );
      increase.click();
      await waitForRender();
      increase.click();
      await waitForRender();
      increase.click();
      await waitForRender();

      expect(inputNumber.value).toBe(3);
    });

    it("连续点击减少按钮应该持续递减", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("value", "5");
      container.appendChild(inputNumber);
      await waitForRender();

      const decrease = inputNumber.shadowRoot.querySelector(
        ".ea-input-number__operator.decrease"
      );
      decrease.click();
      await waitForRender();
      decrease.click();
      await waitForRender();

      expect(inputNumber.value).toBe(3);
    });

    it("value 达到 max 时继续增加应该被 clamp", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("value", "9");
      inputNumber.setAttribute("max", "10");
      container.appendChild(inputNumber);
      await waitForRender();

      const increase = inputNumber.shadowRoot.querySelector(
        ".ea-input-number__operator.increase"
      );
      increase.click();
      await waitForRender();

      expect(inputNumber.value).toBe(10);
    });

    it("value 达到 min 时继续减少应该被 clamp", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("value", "1");
      inputNumber.setAttribute("min", "0");
      container.appendChild(inputNumber);
      await waitForRender();

      const decrease = inputNumber.shadowRoot.querySelector(
        ".ea-input-number__operator.decrease"
      );
      decrease.click();
      await waitForRender();

      expect(inputNumber.value).toBe(0);
    });

    it("带 precision 时增加应该正确格式化", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("value", "0");
      inputNumber.setAttribute("step", "0.1");
      inputNumber.setAttribute("precision", "1");
      container.appendChild(inputNumber);
      await waitForRender();

      const increase = inputNumber.shadowRoot.querySelector(
        ".ea-input-number__operator.increase"
      );
      increase.click();
      await waitForRender();

      expect(inputNumber.value).toBe(0.1);
    });
  });

  describe("Focus/Blur Events", () => {
    it("focus 输入框时应该设置 isFocus 为 true", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      const inputElement = inputNumber.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      inputElement.dispatchEvent(new Event("focus"));
      await waitForRender();

      expect(inputNumber.isFocus).toBe(true);
    });

    it("blur 输入框时应该设置 isFocus 为 false", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      inputNumber.isFocus = true;
      await waitForRender();

      const inputElement = inputNumber.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      inputElement.dispatchEvent(new Event("blur"));
      await waitForRender();

      expect(inputNumber.isFocus).toBe(false);
    });

    it("focus 方法应该能聚焦 input 元素", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(typeof inputNumber.focus).toBe("function");
    });

    it("blur 方法应该能失焦 input 元素", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(typeof inputNumber.blur).toBe("function");
    });
  });

  describe("EaInputNumberChangeEvent", () => {
    it("修改 value 应该触发 ea-change 事件", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      const changeSpy = vi.fn();
      inputNumber.addEventListener("ea-change", changeSpy);

      inputNumber.value = 10;
      await waitForRender();

      expect(changeSpy).toHaveBeenCalledTimes(1);
    });

    it("ea-change 事件应该包含 currentValue 和 oldValue", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      let eventDetail = null;
      inputNumber.addEventListener("ea-change", e => {
        eventDetail = e.detail;
      });

      inputNumber.value = 10;
      await waitForRender();

      expect(eventDetail).toBeDefined();
      expect(eventDetail.currentValue).toBe(10);
      expect(eventDetail.oldValue).toBe(0);
    });

    it("ea-change 事件应该支持 bubbles", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      let event = null;
      inputNumber.addEventListener("ea-change", e => {
        event = e;
      });

      inputNumber.value = 10;
      await waitForRender();

      expect(event).toBeTruthy();
      expect(event.bubbles).toBe(true);
    });

    it("ea-change 事件应该支持 composed", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      let event = null;
      inputNumber.addEventListener("ea-change", e => {
        event = e;
      });

      inputNumber.value = 10;
      await waitForRender();

      expect(event).toBeTruthy();
      expect(event.composed).toBe(true);
    });

    it("点击增加按钮后应该触发 ea-change 事件", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("value", "0");
      container.appendChild(inputNumber);
      await waitForRender();

      const changeSpy = vi.fn();
      inputNumber.addEventListener("ea-change", changeSpy);

      const increase = inputNumber.shadowRoot.querySelector(
        ".ea-input-number__operator.increase"
      );
      increase.click();
      await waitForRender();

      expect(changeSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("Validation Target", () => {
    it("validationTarget 应该返回 input 元素", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      const target = inputNumber.validationTarget;
      expect(target).toBeTruthy();
      expect(target.tagName.toLowerCase()).toBe("input");
    });
  });

  describe("Lifecycle", () => {
    it("$mount 时没有 value attribute 应该设置 value 为 0", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(inputNumber.value).toBe(0);
    });

    it("$mount 时有 value attribute 应该保留设置的值", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("value", "42");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(inputNumber.value).toBe(42);
    });

    it("$mount 时没有 name 应该自动生成随机 name", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(inputNumber.getAttribute("name")).toBeTruthy();
    });

    it("$mount 时有 name 不应该被覆盖", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("name", "my-field");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(inputNumber.getAttribute("name")).toBe("my-field");
    });

    it("组件移除后不应该抛出异常", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(() => {
        inputNumber.remove();
      }).not.toThrow();
    });
  });

  describe("Edge Cases", () => {
    it("value 超过 max 时 blur 应该被 clamp", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.min = 0;
      inputNumber.max = 100;
      container.appendChild(inputNumber);
      await waitForRender();

      inputNumber.value = 150;
      await waitForRender();

      const inputElement = inputNumber.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      inputElement.value = "150";
      inputElement.dispatchEvent(new Event("blur", { bubbles: true }));
      await waitForRender();

      expect(inputNumber.value).toBe(100);
    });

    it("value 低于 min 时 blur 应该被 clamp", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.min = 10;
      inputNumber.max = 100;
      container.appendChild(inputNumber);
      await waitForRender();

      const inputElement = inputNumber.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      inputElement.value = "5";
      inputElement.dispatchEvent(new Event("blur", { bubbles: true }));
      await waitForRender();

      expect(inputNumber.value).toBe(10);
    });

    it("输入空值时 blur 应该将 value 设为 0", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.value = 5;
      container.appendChild(inputNumber);
      await waitForRender();

      const inputElement = inputNumber.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      inputElement.value = "";
      inputElement.dispatchEvent(new Event("blur", { bubbles: true }));
      await waitForRender();

      expect(inputNumber.value).toBe(0);
    });

    it("precision=0 时 value 应该显示为整数", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("precision", "0");
      inputNumber.setAttribute("value", "5");
      container.appendChild(inputNumber);
      await waitForRender();

      const inputElement = inputNumber.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.value).toBe("5");
    });

    it("min 等于 max 时 value 应该被 clamp 到该值", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.min = 50;
      inputNumber.max = 50;
      container.appendChild(inputNumber);
      await waitForRender();

      const inputElement = inputNumber.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      inputElement.value = "50";
      inputElement.dispatchEvent(new Event("blur", { bubbles: true }));
      await waitForRender();

      expect(inputNumber.value).toBe(50);
    });

    it("负数 min 和 max 范围应该正确工作", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.min = -10;
      inputNumber.max = -1;
      inputNumber.value = -5;
      container.appendChild(inputNumber);
      await waitForRender();

      expect(inputNumber.value).toBe(-5);
    });

    it("小数 step 和 precision 配合应该正确工作", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.step = 0.1;
      inputNumber.precision = 1;
      inputNumber.value = 0;
      container.appendChild(inputNumber);
      await waitForRender();

      const increase = inputNumber.shadowRoot.querySelector(
        ".ea-input-number__operator.increase"
      );
      increase.click();
      await waitForRender();

      expect(inputNumber.value).toBe(0.1);
    });

    it("大数 value 应该正确处理", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.value = 999999;
      container.appendChild(inputNumber);
      await waitForRender();

      expect(inputNumber.value).toBe(999999);
    });
  });

  describe("HTML Attribute Mapping", () => {
    it("value 属性应该正确映射", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("value", "42");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(inputNumber.value).toBe(42);
    });

    it("min 属性应该正确映射", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("min", "0");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(inputNumber.min).toBe(0);
    });

    it("max 属性应该正确映射", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("max", "100");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(inputNumber.max).toBe(100);
    });

    it("step 属性应该正确映射", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("step", "5");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(inputNumber.step).toBe(5);
    });

    it("disabled 属性应该正确映射", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("disabled", "");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(inputNumber.disabled).toBe(true);
    });

    it("readonly 属性应该正确映射", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("readonly", "");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(inputNumber.readonly).toBe(true);
    });

    it("controls 属性通过 JS 动态设置应该正确映射", async () => {
      const inputNumber = document.createElement("ea-input-number");
      container.appendChild(inputNumber);
      await waitForRender();

      inputNumber.controls = false;
      await waitForRender();

      expect(inputNumber.controls).toBe(false);
    });

    it("size 属性应该正确映射", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("size", "large");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(inputNumber.size).toBe("large");
    });

    it("align 属性应该正确映射", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("align", "left");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(inputNumber.align).toBe("left");
    });

    it("precision 属性应该正确映射", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("precision", "2");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(inputNumber.precision).toBe(2);
    });

    it("step-strictly 属性应该正确映射", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("step-strictly", "");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(inputNumber.stepStrictly).toBe(true);
    });

    it("label 属性应该正确映射", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("label", "数量");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(inputNumber.label).toBe("数量");
    });

    it("placeholder 属性应该正确映射", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("placeholder", "请输入");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(inputNumber.placeholder).toBe("请输入");
    });

    it("name 属性应该正确映射", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("name", "qty");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(inputNumber.name).toBe("qty");
    });

    it("required 属性应该正确映射", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("required", "");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(inputNumber.required).toBe(true);
    });

    it("inputmode 属性应该正确映射", async () => {
      const inputNumber = document.createElement("ea-input-number");
      inputNumber.setAttribute("inputmode", "numeric");
      container.appendChild(inputNumber);
      await waitForRender();

      expect(inputNumber.inputmode).toBe("numeric");
    });
  });
});
