import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender.js";
import { runAxe, assertNoA11yViolations } from "./utils/a11y.js";

import "../components/ea-input-number/index.ts";

describe("EaInputNumber", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe("Basic Rendering", () => {
    it("应该正确渲染组件并拥有 shadowRoot", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      expect(el).toBeDefined();
      expect(el.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      expect(el.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("应该包含 input CSS Part", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      expect(el.shadowRoot.querySelector('[part="input"]')).toBeTruthy();
    });

    it("应该包含 decrease CSS Part", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      expect(el.shadowRoot.querySelector('[part="decrease"]')).toBeTruthy();
    });

    it("应该包含 increase CSS Part", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      expect(el.shadowRoot.querySelector('[part="increase"]')).toBeTruthy();
    });

    it("应该包含 region CSS Part", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      expect(el.shadowRoot.querySelector('[part="region"]')).toBeTruthy();
    });

    it("应该包含 label CSS Part", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      expect(el.shadowRoot.querySelector('[part="label"]')).toBeTruthy();
    });

    it("应该包含 prefix CSS Part", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      expect(el.shadowRoot.querySelector('[part="prefix"]')).toBeTruthy();
    });

    it("应该包含 suffix CSS Part", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      expect(el.shadowRoot.querySelector('[part="suffix"]')).toBeTruthy();
    });

    it("应该包含原生 input 元素且 type 为 number", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      const inputElement = el.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement).toBeTruthy();
      expect(inputElement.type).toBe("text");
    });

    it("应该包含 decrease 和 increase 操作按钮", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      const decrease = el.shadowRoot.querySelector(
        ".ea-input-number__decrease"
      );
      const increase = el.shadowRoot.querySelector(
        ".ea-input-number__increase"
      );
      expect(decrease).toBeTruthy();
      expect(increase).toBeTruthy();
    });

    it("应该包含 prefix 和 suffix slot", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      const prefixSlot = el.shadowRoot.querySelector('slot[name="prefix"]');
      const suffixSlot = el.shadowRoot.querySelector('slot[name="suffix"]');
      expect(prefixSlot).toBeTruthy();
      expect(suffixSlot).toBeTruthy();
    });
  });

  describe("Value Attribute", () => {
    it("默认 value 应该是 0", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      expect(el.value).toBe(0);
    });

    it("通过 HTML attribute 设置 value 应该正确反映", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("value", "5");
      container.appendChild(el);
      await waitForRender();

      expect(el.value).toBe(5);
    });

    it("通过 JS 属性设置 value 应该更新 input 显示", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      el.value = 10;
      await waitForRender();

      expect(el.value).toBe(10);
      const inputElement = el.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(Number(inputElement.value)).toBe(10);
    });

    it("value 变化时应该更新 input 元素的值", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      el.value = 42;
      await waitForRender();

      const inputElement = el.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.value).toBe("42");
    });

    it("value 变化时应该触发 ea-change 事件", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      const changeSpy = vi.fn();
      el.addEventListener("ea-change", changeSpy);

      el.value = 10;
      await waitForRender();

      expect(changeSpy).toHaveBeenCalledTimes(1);
    });

    it("ea-change 事件应该包含 currentValue 和 oldValue", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      let eventDetail = null;
      el.addEventListener("ea-change", e => {
        eventDetail = e.detail;
      });

      el.value = 10;
      await waitForRender();

      expect(eventDetail).toBeDefined();
      expect(eventDetail.currentValue).toBe(10);
      expect(eventDetail.oldValue).toBe(0);
    });

    it("连续修改 value 应该正确触发多次 ea-change", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      const changeSpy = vi.fn();
      el.addEventListener("ea-change", changeSpy);

      el.value = 5;
      await waitForRender();
      el.value = 15;
      await waitForRender();

      expect(changeSpy).toHaveBeenCalledTimes(2);
    });

    it("value 达到 max 时应该设置 _isMax 为 true", async () => {
      const el = document.createElement("ea-input-number");
      el.max = 10;
      container.appendChild(el);
      await waitForRender();

      el.value = 10;
      await waitForRender();

      const className = el.updateContainerClasslist();
      expect(className).toContain("is-max");
    });

    it("value 达到 min 时应该设置 _isMin 为 true", async () => {
      const el = document.createElement("ea-input-number");
      el.min = 0;
      container.appendChild(el);
      await waitForRender();

      el.value = 0;
      await waitForRender();

      const className = el.updateContainerClasslist();
      expect(className).toContain("is-min");
    });

    it("value 在 min 和 max 之间时 isMin 和 isMax 都不应该存在", async () => {
      const el = document.createElement("ea-input-number");
      el.min = 0;
      el.max = 100;
      container.appendChild(el);
      await waitForRender();

      el.value = 50;
      await waitForRender();

      const className = el.updateContainerClasslist();
      expect(className).not.toContain("is-min");
      expect(className).not.toContain("is-max");
    });
  });

  describe("Label Attribute", () => {
    it("默认 label 应该是空字符串", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      expect(el.label).toBe("");
    });

    it("设置 label 属性应该正确反映", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("label", "数量");
      container.appendChild(el);
      await waitForRender();

      expect(el.label).toBe("数量");
    });

    it("label 应该正确显示在标签元素上", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("label", "数量");
      container.appendChild(el);
      await waitForRender();

      const labelEl = el.shadowRoot.querySelector(
        ".ea-input-number__form-label"
      );
      expect(labelEl.textContent).toBe("数量");
    });

    it("动态修改 label 应该实时更新", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      el.label = "新标签";
      await waitForRender();

      const labelEl = el.shadowRoot.querySelector(
        ".ea-input-number__form-label"
      );
      expect(labelEl.textContent).toBe("新标签");
    });
  });

  describe("Min/Max Attributes", () => {
    it("min 默认值应该是 Number.MIN_SAFE_INTEGER", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      expect(el.min).toBe(Number.MIN_SAFE_INTEGER);
    });

    it("max 默认值应该是 Number.MAX_SAFE_INTEGER", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      expect(el.max).toBe(Number.MAX_SAFE_INTEGER);
    });

    it("设置 min 属性应该同步到 input 元素", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("min", "0");
      container.appendChild(el);
      await waitForRender();

      const inputElement = el.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.min).toBe("0");
    });

    it("设置 max 属性应该同步到 input 元素", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("max", "100");
      container.appendChild(el);
      await waitForRender();

      const inputElement = el.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.max).toBe("100");
    });

    it("同时设置 min 和 max 应该正确同步", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("min", "10");
      el.setAttribute("max", "200");
      container.appendChild(el);
      await waitForRender();

      const inputElement = el.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.min).toBe("10");
      expect(inputElement.max).toBe("200");
    });

    it("动态修改 min 应该同步到 input 元素", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      el.min = 5;
      await waitForRender();

      const inputElement = el.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.min).toBe("5");
    });

    it("动态修改 max 应该同步到 input 元素", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      el.max = 50;
      await waitForRender();

      const inputElement = el.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.max).toBe("50");
    });

    it("支持负数 min", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("min", "-10");
      container.appendChild(el);
      await waitForRender();

      expect(el.min).toBe(-10);
    });
  });

  describe("Step Attribute", () => {
    it("默认 step 应该是 1", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      expect(el.step).toBe(1);
    });

    it("设置 step 属性应该正确反映", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("step", "5");
      container.appendChild(el);
      await waitForRender();

      expect(el.step).toBe(5);
    });

    it("应该支持小数 step", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("step", "0.1");
      container.appendChild(el);
      await waitForRender();

      expect(el.step).toBe(0.1);
    });

    it("点击增加按钮应该按 step 递增", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("step", "5");
      el.setAttribute("value", "0");
      container.appendChild(el);
      await waitForRender();

      const increase = el.shadowRoot.querySelector(
        ".ea-input-number__increase"
      );
      increase.dispatchEvent(
        new PointerEvent("pointerdown", { bubbles: true })
      );
      increase.dispatchEvent(new PointerEvent("pointerup", { bubbles: true }));
      await waitForRender();

      expect(el.value).toBe(5);
    });

    it("点击减少按钮应该按 step 递减", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("step", "5");
      el.setAttribute("value", "10");
      container.appendChild(el);
      await waitForRender();

      const decrease = el.shadowRoot.querySelector(
        ".ea-input-number__decrease"
      );
      decrease.dispatchEvent(
        new PointerEvent("pointerdown", { bubbles: true })
      );
      decrease.dispatchEvent(new PointerEvent("pointerup", { bubbles: true }));
      await waitForRender();

      expect(el.value).toBe(5);
    });
  });

  describe("Step Strictly Attribute", () => {
    it("默认 stepStrictly 应该是 false", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      expect(el.stepStrictly).toBe(false);
    });

    it("设置 step-strictly 属性应该启用严格步进", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("step-strictly", "");
      container.appendChild(el);
      await waitForRender();

      expect(el.stepStrictly).toBe(true);
    });

    it("通过 JS 属性设置 stepStrictly", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      el.stepStrictly = true;
      expect(el.stepStrictly).toBe(true);
    });
  });

  describe("Precision Attribute", () => {
    it("默认 precision 应该是 0", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      expect(el.precision).toBe(0);
    });

    it("设置 precision 属性应该正确反映", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("precision", "2");
      container.appendChild(el);
      await waitForRender();

      expect(el.precision).toBe(2);
    });

    it("precision 应该影响 value 的显示格式", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("precision", "2");
      el.setAttribute("value", "1");
      container.appendChild(el);
      await waitForRender();

      const inputElement = el.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.value).toBe("1.00");
    });

    it("precision=1 时应该显示一位小数", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("precision", "1");
      el.setAttribute("value", "0.5");
      container.appendChild(el);
      await waitForRender();

      const inputElement = el.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.value).toBe("0.5");
    });

    it("precision=3 时应该显示三位小数", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("precision", "3");
      el.setAttribute("value", "1.5");
      container.appendChild(el);
      await waitForRender();

      const inputElement = el.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.value).toBe("1.500");
    });
  });

  describe("Size Attribute", () => {
    it("默认 size 应该是 default", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      expect(el.size).toBe("default");
    });

    it("应该支持 size='large'", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("size", "large");
      container.appendChild(el);
      await waitForRender();

      expect(el.size).toBe("large");
    });

    it("应该支持 size='default'", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("size", "default");
      container.appendChild(el);
      await waitForRender();

      expect(el.size).toBe("default");
    });

    it("应该支持 size='small'", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("size", "small");
      container.appendChild(el);
      await waitForRender();

      expect(el.size).toBe("small");
    });

    it("size=large 时容器应该包含 ea-input-number--size-large class", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      el.size = "large";
      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-input-number");
      expect(
        containerEl.classList.contains("ea-input-number--size-large")
      ).toBe(true);
    });

    it("size=small 时容器应该包含 ea-input-number--size-small class", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      el.size = "small";
      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-input-number");
      expect(
        containerEl.classList.contains("ea-input-number--size-small")
      ).toBe(true);
    });

    it("size=default 时容器不应该包含 size 修饰符 class", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-input-number");
      expect(
        containerEl.classList.contains("ea-input-number--size-large")
      ).toBe(false);
      expect(
        containerEl.classList.contains("ea-input-number--size-small")
      ).toBe(false);
    });
  });

  describe("Disabled Attribute", () => {
    it("默认 disabled 应该是 false", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      expect(el.disabled).toBe(false);
    });

    it("设置 disabled 属性应该禁用组件", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("disabled", "");
      container.appendChild(el);
      await waitForRender();

      expect(el.disabled).toBe(true);
    });

    it("disabled 时容器应该包含 is-disabled class", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("disabled", "");
      container.appendChild(el);
      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-input-number");
      expect(containerEl.classList.contains("is-disabled")).toBe(true);
    });

    it("disabled 时点击增加按钮不应该改变 value", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("disabled", "");
      el.setAttribute("value", "5");
      container.appendChild(el);
      await waitForRender();

      const increase = el.shadowRoot.querySelector(
        ".ea-input-number__increase"
      );
      increase.dispatchEvent(
        new PointerEvent("pointerdown", { bubbles: true })
      );
      increase.dispatchEvent(new PointerEvent("pointerup", { bubbles: true }));
      await waitForRender();

      expect(el.value).toBe(5);
    });

    it("disabled 时点击减少按钮不应该改变 value", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("disabled", "");
      el.setAttribute("value", "5");
      container.appendChild(el);
      await waitForRender();

      const decrease = el.shadowRoot.querySelector(
        ".ea-input-number__decrease"
      );
      decrease.dispatchEvent(
        new PointerEvent("pointerdown", { bubbles: true })
      );
      decrease.dispatchEvent(new PointerEvent("pointerup", { bubbles: true }));
      await waitForRender();

      expect(el.value).toBe(5);
    });

    it("动态切换 disabled 应该正确更新容器 class", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      el.disabled = true;
      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-input-number");
      expect(containerEl.classList.contains("is-disabled")).toBe(true);

      el.disabled = false;
      await waitForRender();

      expect(containerEl.classList.contains("is-disabled")).toBe(false);
    });
  });

  describe("Readonly Attribute", () => {
    it("默认 readonly 应该是 false", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      const inputElement = el.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.readOnly).toBe(false);
    });

    it("设置 readonly 属性应该使输入框只读", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("readonly", "");
      container.appendChild(el);
      await waitForRender();

      const inputElement = el.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.readOnly).toBe(true);
    });

    it("动态修改 readonly 应该实时生效", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      el.readonly = true;
      await waitForRender();

      const inputElement = el.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.readOnly).toBe(true);

      el.readonly = false;
      await waitForRender();

      expect(inputElement.readOnly).toBe(false);
    });
  });

  describe("Controls Attribute", () => {
    it("默认 controls 应该是 true", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      expect(el.controls).toBe(true);
    });

    it("controls=false 时容器应该包含 is-no-controls class", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      el.controls = false;
      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-input-number");
      expect(containerEl.classList.contains("is-no-controls")).toBe(true);
    });

    it("controls=false 时点击增加按钮不应该改变 value", async () => {
      const el = document.createElement("ea-input-number");
      el.value = 5;
      container.appendChild(el);
      await waitForRender();

      el.controls = false;
      await waitForRender();

      const increase = el.shadowRoot.querySelector(
        ".ea-input-number__increase"
      );
      increase.dispatchEvent(
        new PointerEvent("pointerdown", { bubbles: true })
      );
      increase.dispatchEvent(new PointerEvent("pointerup", { bubbles: true }));
      await waitForRender();

      expect(el.value).toBe(5);
    });

    it("controls=false 时点击减少按钮不应该改变 value", async () => {
      const el = document.createElement("ea-input-number");
      el.value = 5;
      container.appendChild(el);
      await waitForRender();

      el.controls = false;
      await waitForRender();

      const decrease = el.shadowRoot.querySelector(
        ".ea-input-number__decrease"
      );
      decrease.dispatchEvent(
        new PointerEvent("pointerdown", { bubbles: true })
      );
      decrease.dispatchEvent(new PointerEvent("pointerup", { bubbles: true }));
      await waitForRender();

      expect(el.value).toBe(5);
    });

    it("动态切换 controls 应该正确更新容器 class", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      el.controls = false;
      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-input-number");
      expect(containerEl.classList.contains("is-no-controls")).toBe(true);

      el.controls = true;
      await waitForRender();

      expect(containerEl.classList.contains("is-no-controls")).toBe(false);
    });
  });

  describe("Align Attribute", () => {
    it("默认 align 应该是 center", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      expect(el.align).toBe("center");
    });

    it("应该支持 align='left'", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("align", "left");
      container.appendChild(el);
      await waitForRender();

      expect(el.align).toBe("left");
    });

    it("应该支持 align='right'", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("align", "right");
      container.appendChild(el);
      await waitForRender();

      expect(el.align).toBe("right");
    });

    it("align 变化时应该更新容器 class", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      el.align = "left";
      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-input-number");
      expect(containerEl.classList.contains("ea-input-number--left")).toBe(
        true
      );
    });
  });

  describe("Placeholder Attribute", () => {
    it("默认 placeholder 应该是空字符串", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      expect(el.placeholder).toBe("");
    });

    it("设置 placeholder 属性应该同步到 input 元素", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("placeholder", "Enter number");
      container.appendChild(el);
      await waitForRender();

      const inputElement = el.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.placeholder).toBe("Enter number");
    });

    it("动态修改 placeholder 应该实时更新", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      el.placeholder = "新提示";
      await waitForRender();

      const inputElement = el.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.placeholder).toBe("新提示");
    });
  });

  describe("Name Attribute", () => {
    it("设置 name 属性应该同步到 input 元素的 name", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("name", "quantity");
      container.appendChild(el);
      await waitForRender();

      const inputElement = el.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.name).toBe("quantity");
    });

    it("动态修改 name 应该实时更新", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      el.name = "newName";
      await waitForRender();

      const inputElement = el.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.name).toBe("newName");
    });
  });

  describe("Required Attribute", () => {
    it("默认 required 应该是 false", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      expect(el.required).toBe(false);
    });

    it("设置 required 属性应该同步到 input 元素", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("required", "");
      container.appendChild(el);
      await waitForRender();

      const inputElement = el.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.required).toBe(true);
    });

    it("动态切换 required 应该实时生效", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      el.required = true;
      await waitForRender();

      const inputElement = el.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.required).toBe(true);

      el.required = false;
      await waitForRender();

      expect(inputElement.required).toBe(false);
    });
  });

  describe("ValueOnClear Attribute", () => {
    it("默认 valueOnClear 应该是 null", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      expect(el.valueOnClear).toBeNull();
    });

    it("设置 value-on-clear 属性应该正确反映", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("value-on-clear", "0");
      container.appendChild(el);
      await waitForRender();

      expect(el.valueOnClear).toBe(0);
    });
  });

  describe("Inputmode Attribute", () => {
    it("默认 inputmode 应该是空字符串", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      expect(el.inputmode).toBe("");
    });

    it("设置 inputmode 属性应该同步到 input 元素", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("inputmode", "numeric");
      container.appendChild(el);
      await waitForRender();

      const inputElement = el.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.getAttribute("inputmode")).toBe("numeric");
    });

    it("动态修改 inputmode 应该实时更新", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      el.inputmode = "decimal";
      await waitForRender();

      const inputElement = el.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.getAttribute("inputmode")).toBe("decimal");
    });
  });

  describe("DefaultValue Property", () => {
    it("默认 defaultValue 应该是 0", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      expect(el.defaultValue).toBe(0);
    });

    it("设置 defaultValue 应该正确反映", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      el.defaultValue = 10;
      expect(el.defaultValue).toBe(10);
    });
  });

  describe("Container Class Updates", () => {
    it("disabled 状态应该正确反映在容器 class 中", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      el.disabled = true;
      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-input-number");
      expect(containerEl.classList.contains("is-disabled")).toBe(true);
    });

    it("focus 状态应该正确反映在容器 class 中", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      const inputElement = el.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      inputElement.dispatchEvent(new Event("focus"));
      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-input-number");
      expect(containerEl.classList.contains("is-focus")).toBe(true);
    });

    it("no-controls 状态应该正确反映在容器 class 中", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      el.controls = false;
      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-input-number");
      expect(containerEl.classList.contains("is-no-controls")).toBe(true);
    });

    it("align 修饰符应该正确反映在容器 class 中", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      el.align = "left";
      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-input-number");
      expect(containerEl.classList.contains("ea-input-number--left")).toBe(
        true
      );
    });

    it("size 修饰符应该正确反映在容器 class 中", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      el.size = "small";
      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-input-number");
      expect(
        containerEl.classList.contains("ea-input-number--size-small")
      ).toBe(true);
    });

    it("updateContainerClasslist 应该返回正确的 class 字符串", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      el.disabled = true;
      el.align = "center";
      el.size = "large";
      await waitForRender();

      const className = el.updateContainerClasslist();
      expect(className).toContain("ea-input-number");
      expect(className).toContain("is-disabled");
      expect(className).toContain("ea-input-number--center");
      expect(className).toContain("ea-input-number--size-large");
    });
  });

  describe("Increase/Decrease Buttons", () => {
    it("点击增加按钮应该增加 value", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("value", "0");
      container.appendChild(el);
      await waitForRender();

      const increase = el.shadowRoot.querySelector(
        ".ea-input-number__increase"
      );
      increase.dispatchEvent(
        new PointerEvent("pointerdown", { bubbles: true })
      );
      increase.dispatchEvent(new PointerEvent("pointerup", { bubbles: true }));
      await waitForRender();

      expect(el.value).toBe(1);
    });

    it("点击减少按钮应该减少 value", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("value", "5");
      container.appendChild(el);
      await waitForRender();

      const decrease = el.shadowRoot.querySelector(
        ".ea-input-number__decrease"
      );
      decrease.dispatchEvent(
        new PointerEvent("pointerdown", { bubbles: true })
      );
      decrease.dispatchEvent(new PointerEvent("pointerup", { bubbles: true }));
      await waitForRender();

      expect(el.value).toBe(4);
    });

    it("连续点击增加按钮应该持续递增", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("value", "0");
      container.appendChild(el);
      await waitForRender();

      const increase = el.shadowRoot.querySelector(
        ".ea-input-number__increase"
      );
      increase.dispatchEvent(
        new PointerEvent("pointerdown", { bubbles: true })
      );
      increase.dispatchEvent(new PointerEvent("pointerup", { bubbles: true }));
      await waitForRender();
      increase.dispatchEvent(
        new PointerEvent("pointerdown", { bubbles: true })
      );
      increase.dispatchEvent(new PointerEvent("pointerup", { bubbles: true }));
      await waitForRender();
      increase.dispatchEvent(
        new PointerEvent("pointerdown", { bubbles: true })
      );
      increase.dispatchEvent(new PointerEvent("pointerup", { bubbles: true }));
      await waitForRender();

      expect(el.value).toBe(3);
    });

    it("连续点击减少按钮应该持续递减", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("value", "5");
      container.appendChild(el);
      await waitForRender();

      const decrease = el.shadowRoot.querySelector(
        ".ea-input-number__decrease"
      );
      decrease.dispatchEvent(
        new PointerEvent("pointerdown", { bubbles: true })
      );
      decrease.dispatchEvent(new PointerEvent("pointerup", { bubbles: true }));
      await waitForRender();
      decrease.dispatchEvent(
        new PointerEvent("pointerdown", { bubbles: true })
      );
      decrease.dispatchEvent(new PointerEvent("pointerup", { bubbles: true }));
      await waitForRender();

      expect(el.value).toBe(3);
    });

    it("value 达到 max 时继续增加应该被 clamp", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("value", "9");
      el.setAttribute("max", "10");
      container.appendChild(el);
      await waitForRender();

      const increase = el.shadowRoot.querySelector(
        ".ea-input-number__increase"
      );
      increase.dispatchEvent(
        new PointerEvent("pointerdown", { bubbles: true })
      );
      increase.dispatchEvent(new PointerEvent("pointerup", { bubbles: true }));
      await waitForRender();

      expect(el.value).toBe(10);
    });

    it("value 达到 min 时继续减少应该被 clamp", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("value", "1");
      el.setAttribute("min", "0");
      container.appendChild(el);
      await waitForRender();

      const decrease = el.shadowRoot.querySelector(
        ".ea-input-number__decrease"
      );
      decrease.dispatchEvent(
        new PointerEvent("pointerdown", { bubbles: true })
      );
      decrease.dispatchEvent(new PointerEvent("pointerup", { bubbles: true }));
      await waitForRender();

      expect(el.value).toBe(0);
    });

    it("带 precision 时增加应该正确格式化", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("value", "0");
      el.setAttribute("step", "0.1");
      el.setAttribute("precision", "1");
      container.appendChild(el);
      await waitForRender();

      const increase = el.shadowRoot.querySelector(
        ".ea-input-number__increase"
      );
      increase.dispatchEvent(
        new PointerEvent("pointerdown", { bubbles: true })
      );
      increase.dispatchEvent(new PointerEvent("pointerup", { bubbles: true }));
      await waitForRender();

      expect(el.value).toBe(0.1);
    });
  });

  describe("Focus/Blur Events", () => {
    it("focus 输入框时应该触发 focus 事件", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      const focusSpy = vi.fn();
      el.addEventListener("focus", focusSpy);

      const inputElement = el.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      inputElement.dispatchEvent(new Event("focus"));
      await waitForRender();

      expect(focusSpy).toHaveBeenCalled();
    });

    it("blur 输入框时应该触发 blur 事件", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      const blurSpy = vi.fn();
      el.addEventListener("blur", blurSpy);

      const inputElement = el.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      inputElement.dispatchEvent(new Event("blur", { bubbles: true }));
      await waitForRender();

      expect(blurSpy).toHaveBeenCalled();
    });

    it("focus 方法应该能聚焦 input 元素", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      expect(typeof el.focus).toBe("function");
    });

    it("blur 方法应该能失焦 input 元素", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      expect(typeof el.blur).toBe("function");
    });
  });

  describe("EaInputNumberChangeEvent", () => {
    it("修改 value 应该触发 ea-change 事件", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      const changeSpy = vi.fn();
      el.addEventListener("ea-change", changeSpy);

      el.value = 10;
      await waitForRender();

      expect(changeSpy).toHaveBeenCalledTimes(1);
    });

    it("ea-change 事件应该包含 currentValue 和 oldValue", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      let eventDetail = null;
      el.addEventListener("ea-change", e => {
        eventDetail = e.detail;
      });

      el.value = 10;
      await waitForRender();

      expect(eventDetail).toBeDefined();
      expect(eventDetail.currentValue).toBe(10);
      expect(eventDetail.oldValue).toBe(0);
    });

    it("ea-change 事件应该支持 bubbles", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      let event = null;
      el.addEventListener("ea-change", e => {
        event = e;
      });

      el.value = 10;
      await waitForRender();

      expect(event).toBeTruthy();
      expect(event.bubbles).toBe(true);
    });

    it("ea-change 事件应该支持 composed", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      let event = null;
      el.addEventListener("ea-change", e => {
        event = e;
      });

      el.value = 10;
      await waitForRender();

      expect(event).toBeTruthy();
      expect(event.composed).toBe(true);
    });

    it("点击增加按钮后应该触发 ea-change 事件", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("value", "0");
      container.appendChild(el);
      await waitForRender();

      const changeSpy = vi.fn();
      el.addEventListener("ea-change", changeSpy);

      const increase = el.shadowRoot.querySelector(
        ".ea-input-number__increase"
      );
      increase.dispatchEvent(
        new PointerEvent("pointerdown", { bubbles: true })
      );
      increase.dispatchEvent(new PointerEvent("pointerup", { bubbles: true }));
      await waitForRender();

      expect(changeSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("Validation Target", () => {
    it("validationTarget 应该返回 input 元素", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      const target = el.validationTarget;
      expect(target).toBeTruthy();
      expect(target.tagName.toLowerCase()).toBe("input");
    });
  });

  describe("Lifecycle", () => {
    it("$mount 时没有 value attribute 应该设置 value 为 0", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      expect(el.value).toBe(0);
    });

    it("$mount 时有 value attribute 应该保留设置的值", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("value", "42");
      container.appendChild(el);
      await waitForRender();

      expect(el.value).toBe(42);
    });

    it("组件移除后不应该抛出异常", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      expect(() => {
        el.remove();
      }).not.toThrow();
    });
  });

  describe("Edge Cases", () => {
    it("value 超过 max 时 blur 应该被 clamp", async () => {
      const el = document.createElement("ea-input-number");
      el.min = 0;
      el.max = 100;
      container.appendChild(el);
      await waitForRender();

      el.value = 150;
      await waitForRender();

      const inputElement = el.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      inputElement.value = "150";
      inputElement.dispatchEvent(new Event("blur", { bubbles: true }));
      await waitForRender();

      expect(el.value).toBe(100);
    });

    it("value 低于 min 时 blur 应该被 clamp", async () => {
      const el = document.createElement("ea-input-number");
      el.min = 10;
      el.max = 100;
      container.appendChild(el);
      await waitForRender();

      const inputElement = el.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      inputElement.value = "5";
      inputElement.dispatchEvent(new Event("blur", { bubbles: true }));
      await waitForRender();

      expect(el.value).toBe(10);
    });

    it("输入空值时 blur 应该将 value 设为 0", async () => {
      const el = document.createElement("ea-input-number");
      el.value = 5;
      container.appendChild(el);
      await waitForRender();

      const inputElement = el.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      inputElement.value = "";
      inputElement.dispatchEvent(new Event("blur", { bubbles: true }));
      await waitForRender();

      expect(el.value).toBe(0);
    });

    it("precision=0 时 value 应该显示为整数", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("precision", "0");
      el.setAttribute("value", "5");
      container.appendChild(el);
      await waitForRender();

      const inputElement = el.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.value).toBe("5");
    });

    it("min 等于 max 时 value 应该被 clamp 到该值", async () => {
      const el = document.createElement("ea-input-number");
      el.min = 50;
      el.max = 50;
      container.appendChild(el);
      await waitForRender();

      const inputElement = el.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      inputElement.value = "50";
      inputElement.dispatchEvent(new Event("blur", { bubbles: true }));
      await waitForRender();

      expect(el.value).toBe(50);
    });

    it("负数 min 和 max 范围应该正确工作", async () => {
      const el = document.createElement("ea-input-number");
      el.min = -10;
      el.max = -1;
      el.value = -5;
      container.appendChild(el);
      await waitForRender();

      expect(el.value).toBe(-5);
    });

    it("小数 step 和 precision 配合应该正确工作", async () => {
      const el = document.createElement("ea-input-number");
      el.step = 0.1;
      el.precision = 1;
      el.value = 0;
      container.appendChild(el);
      await waitForRender();

      const increase = el.shadowRoot.querySelector(
        ".ea-input-number__increase"
      );
      increase.dispatchEvent(
        new PointerEvent("pointerdown", { bubbles: true })
      );
      increase.dispatchEvent(new PointerEvent("pointerup", { bubbles: true }));
      await waitForRender();

      expect(el.value).toBe(0.1);
    });

    it("大数 value 应该正确处理", async () => {
      const el = document.createElement("ea-input-number");
      el.value = 999999;
      container.appendChild(el);
      await waitForRender();

      expect(el.value).toBe(999999);
    });
  });

  describe("HTML Attribute Mapping", () => {
    it("value 属性应该正确映射", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("value", "42");
      container.appendChild(el);
      await waitForRender();

      expect(el.value).toBe(42);
    });

    it("min 属性应该正确映射", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("min", "0");
      container.appendChild(el);
      await waitForRender();

      expect(el.min).toBe(0);
    });

    it("max 属性应该正确映射", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("max", "100");
      container.appendChild(el);
      await waitForRender();

      expect(el.max).toBe(100);
    });

    it("step 属性应该正确映射", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("step", "5");
      container.appendChild(el);
      await waitForRender();

      expect(el.step).toBe(5);
    });

    it("disabled 属性应该正确映射", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("disabled", "");
      container.appendChild(el);
      await waitForRender();

      expect(el.disabled).toBe(true);
    });

    it("readonly 属性应该正确映射", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("readonly", "");
      container.appendChild(el);
      await waitForRender();

      expect(el.readonly).toBe(true);
    });

    it("controls 属性通过 JS 动态设置应该正确映射", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();

      el.controls = false;
      await waitForRender();

      expect(el.controls).toBe(false);
    });

    it("size 属性应该正确映射", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("size", "large");
      container.appendChild(el);
      await waitForRender();

      expect(el.size).toBe("large");
    });

    it("align 属性应该正确映射", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("align", "left");
      container.appendChild(el);
      await waitForRender();

      expect(el.align).toBe("left");
    });

    it("precision 属性应该正确映射", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("precision", "2");
      container.appendChild(el);
      await waitForRender();

      expect(el.precision).toBe(2);
    });

    it("step-strictly 属性应该正确映射", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("step-strictly", "");
      container.appendChild(el);
      await waitForRender();

      expect(el.stepStrictly).toBe(true);
    });

    it("label 属性应该正确映射", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("label", "数量");
      container.appendChild(el);
      await waitForRender();

      expect(el.label).toBe("数量");
    });

    it("placeholder 属性应该正确映射", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("placeholder", "请输入");
      container.appendChild(el);
      await waitForRender();

      expect(el.placeholder).toBe("请输入");
    });

    it("name 属性应该正确映射", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("name", "qty");
      container.appendChild(el);
      await waitForRender();

      expect(el.name).toBe("qty");
    });

    it("required 属性应该正确映射", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("required", "");
      container.appendChild(el);
      await waitForRender();

      expect(el.required).toBe(true);
    });

    it("inputmode 属性应该正确映射", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("inputmode", "numeric");
      container.appendChild(el);
      await waitForRender();

      expect(el.inputmode).toBe("numeric");
    });
  });

  describe("Negative Number Input", () => {
    it("输入中间状态时不应重置组件 value", async () => {
      const el = document.createElement("ea-input-number");
      el.value = 5;
      container.appendChild(el);
      await waitForRender();

      const inputElement = el.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      inputElement.value = "";
      inputElement.dispatchEvent(new Event("input", { bubbles: true }));
      await waitForRender();

      expect(el.value).toBe(5);
    });

    it("输入负数后 blur 应该正确处理", async () => {
      const el = document.createElement("ea-input-number");
      el.min = -100;
      el.max = 100;
      container.appendChild(el);
      await waitForRender();

      const inputElement = el.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      inputElement.value = "-5";
      inputElement.dispatchEvent(new Event("blur", { bubbles: true }));
      await waitForRender();

      expect(el.value).toBe(-5);
    });

    it("负数 value 应该正确设置", async () => {
      const el = document.createElement("ea-input-number");
      el.min = -100;
      el.max = 100;
      el.value = -10;
      container.appendChild(el);
      await waitForRender();

      expect(el.value).toBe(-10);
    });

    it("负数 value 应该正确显示在 input 中", async () => {
      const el = document.createElement("ea-input-number");
      el.min = -100;
      el.max = 100;
      el.value = -42;
      container.appendChild(el);
      await waitForRender();

      const inputElement = el.shadowRoot.querySelector(
        "input.ea-input-number__inner"
      );
      expect(inputElement.value).toBe("-42");
    });
  });

  describe("Long Press Repeat", () => {
    it("pointerdown 减号按钮应该启动长按重复", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("value", "10");
      container.appendChild(el);
      await waitForRender();

      vi.useFakeTimers();

      const decrease = el.shadowRoot.querySelector(
        ".ea-input-number__decrease"
      );
      decrease.dispatchEvent(
        new PointerEvent("pointerdown", { bubbles: true })
      );

      expect(el.value).toBe(9);

      vi.advanceTimersByTime(500);

      expect(el.value).toBeLessThan(9);

      decrease.dispatchEvent(new PointerEvent("pointerup", { bubbles: true }));

      const valueAfterUp = el.value;

      vi.advanceTimersByTime(500);

      expect(el.value).toBe(valueAfterUp);

      vi.useRealTimers();
    });

    it("pointerdown 加号按钮应该启动长按重复", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("value", "0");
      container.appendChild(el);
      await waitForRender();

      vi.useFakeTimers();

      const increase = el.shadowRoot.querySelector(
        ".ea-input-number__increase"
      );
      increase.dispatchEvent(
        new PointerEvent("pointerdown", { bubbles: true })
      );

      expect(el.value).toBe(1);

      vi.advanceTimersByTime(500);

      expect(el.value).toBeGreaterThan(1);

      increase.dispatchEvent(new PointerEvent("pointerup", { bubbles: true }));

      const valueAfterUp = el.value;

      vi.advanceTimersByTime(500);

      expect(el.value).toBe(valueAfterUp);

      vi.useRealTimers();
    });

    it("pointerleave 应该停止长按重复", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("value", "10");
      container.appendChild(el);
      await waitForRender();

      vi.useFakeTimers();

      const increase = el.shadowRoot.querySelector(
        ".ea-input-number__increase"
      );
      increase.dispatchEvent(
        new PointerEvent("pointerdown", { bubbles: true })
      );

      vi.advanceTimersByTime(500);

      increase.dispatchEvent(
        new PointerEvent("pointerleave", { bubbles: true })
      );

      const valueAfterLeave = el.value;

      vi.advanceTimersByTime(500);

      expect(el.value).toBe(valueAfterLeave);

      vi.useRealTimers();
    });

    it("disabled 时 pointerdown 不应该启动长按重复", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("disabled", "");
      el.setAttribute("value", "5");
      container.appendChild(el);
      await waitForRender();

      const increase = el.shadowRoot.querySelector(
        ".ea-input-number__increase"
      );
      increase.dispatchEvent(
        new PointerEvent("pointerdown", { bubbles: true })
      );

      expect(el.value).toBe(5);
    });
  });

  describe("Accessibility", () => {
    it("默认状态应该无 a11y 违规", async () => {
      const el = document.createElement("ea-input-number");
      container.appendChild(el);
      await waitForRender();
      const results = await runAxe(el);
      assertNoA11yViolations(results);
    });

    it("disabled 状态应该无 a11y 违规", async () => {
      const el = document.createElement("ea-input-number");
      el.setAttribute("disabled", "");
      container.appendChild(el);
      await waitForRender();
      const results = await runAxe(el);
      assertNoA11yViolations(results);
    });

    describe("ARIA Attributes", () => {
      it("input 元素应该有 role=spinbutton", async () => {
        const el = document.createElement("ea-input-number");
        container.appendChild(el);
        await waitForRender();
        const inputEl = el.shadowRoot.querySelector("input.ea-input-number__inner");
        expect(inputEl.getAttribute("role")).toBe("spinbutton");
      });

      it("input 元素应该有 aria-valuenow", async () => {
        const el = document.createElement("ea-input-number");
        el.setAttribute("value", "5");
        container.appendChild(el);
        await waitForRender();
        const inputEl = el.shadowRoot.querySelector("input.ea-input-number__inner");
        expect(inputEl.getAttribute("aria-valuenow")).toBe("5");
      });

      it("value 变化时 aria-valuenow 应该更新", async () => {
        const el = document.createElement("ea-input-number");
        container.appendChild(el);
        await waitForRender();
        el.value = 10;
        await waitForRender();
        const inputEl = el.shadowRoot.querySelector("input.ea-input-number__inner");
        expect(inputEl.getAttribute("aria-valuenow")).toBe("10");
      });

      it("设置 min 后 input 元素应该有 aria-valuemin", async () => {
        const el = document.createElement("ea-input-number");
        el.setAttribute("min", "0");
        container.appendChild(el);
        await waitForRender();
        const inputEl = el.shadowRoot.querySelector("input.ea-input-number__inner");
        expect(inputEl.getAttribute("aria-valuemin")).toBe("0");
      });

      it("设置 max 后 input 元素应该有 aria-valuemax", async () => {
        const el = document.createElement("ea-input-number");
        el.setAttribute("max", "100");
        container.appendChild(el);
        await waitForRender();
        const inputEl = el.shadowRoot.querySelector("input.ea-input-number__inner");
        expect(inputEl.getAttribute("aria-valuemax")).toBe("100");
      });

      it("disabled 时宿主元素应该设置 aria-disabled 为 true", async () => {
        const el = document.createElement("ea-input-number");
        el.setAttribute("disabled", "");
        container.appendChild(el);
        await waitForRender();
        expect(el.getAttribute("aria-disabled")).toBe("true");
      });

      it("非 disabled 时宿主元素 aria-disabled 应该为 false", async () => {
        const el = document.createElement("ea-input-number");
        container.appendChild(el);
        await waitForRender();
        expect(el.getAttribute("aria-disabled")).toBe("false");
      });

      it("输入超出范围的科学计数法值时 input 元素应该设置 aria-invalid 为 true", async () => {
        const el = document.createElement("ea-input-number");
        el.setAttribute("min", "0");
        el.setAttribute("max", "100");
        container.appendChild(el);
        await waitForRender();
        const inputEl = el.shadowRoot.querySelector("input.ea-input-number__inner");
        inputEl.value = "1E3";
        inputEl.dispatchEvent(new Event("input", { bubbles: true }));
        await waitForRender();
        expect(inputEl.getAttribute("aria-invalid")).toBe("true");
      });

      it("值在范围内时 input 元素不应有 aria-invalid 属性", async () => {
        const el = document.createElement("ea-input-number");
        el.setAttribute("min", "0");
        el.setAttribute("max", "100");
        el.setAttribute("value", "50");
        container.appendChild(el);
        await waitForRender();
        const inputEl = el.shadowRoot.querySelector("input.ea-input-number__inner");
        expect(inputEl.hasAttribute("aria-invalid")).toBe(false);
      });
    });

    describe("Keyboard Interaction", () => {
      it("ArrowUp 应该增加值", async () => {
        const el = document.createElement("ea-input-number");
        el.setAttribute("value", "5");
        container.appendChild(el);
        await waitForRender();
        const inputEl = el.shadowRoot.querySelector("input.ea-input-number__inner");
        inputEl.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp" }));
        await waitForRender();
        expect(el.value).toBe(6);
      });

      it("ArrowDown 应该减少值", async () => {
        const el = document.createElement("ea-input-number");
        el.setAttribute("value", "5");
        container.appendChild(el);
        await waitForRender();
        const inputEl = el.shadowRoot.querySelector("input.ea-input-number__inner");
        inputEl.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown" }));
        await waitForRender();
        expect(el.value).toBe(4);
      });

      it("ArrowUp 应该按 step 增加值", async () => {
        const el = document.createElement("ea-input-number");
        el.setAttribute("value", "0");
        el.setAttribute("step", "5");
        container.appendChild(el);
        await waitForRender();
        const inputEl = el.shadowRoot.querySelector("input.ea-input-number__inner");
        inputEl.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp" }));
        await waitForRender();
        expect(el.value).toBe(5);
      });

      it("ArrowDown 应该按 step 减少值", async () => {
        const el = document.createElement("ea-input-number");
        el.setAttribute("value", "10");
        el.setAttribute("step", "5");
        container.appendChild(el);
        await waitForRender();
        const inputEl = el.shadowRoot.querySelector("input.ea-input-number__inner");
        inputEl.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown" }));
        await waitForRender();
        expect(el.value).toBe(5);
      });

      it("ArrowUp 达到 max 时应该被 clamp", async () => {
        const el = document.createElement("ea-input-number");
        el.setAttribute("value", "9");
        el.setAttribute("max", "10");
        container.appendChild(el);
        await waitForRender();
        const inputEl = el.shadowRoot.querySelector("input.ea-input-number__inner");
        inputEl.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp" }));
        await waitForRender();
        expect(el.value).toBe(10);
      });

      it("ArrowDown 达到 min 时应该被 clamp", async () => {
        const el = document.createElement("ea-input-number");
        el.setAttribute("value", "1");
        el.setAttribute("min", "0");
        container.appendChild(el);
        await waitForRender();
        const inputEl = el.shadowRoot.querySelector("input.ea-input-number__inner");
        inputEl.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown" }));
        await waitForRender();
        expect(el.value).toBe(0);
      });

      it("Home 键应该设置值为 min", async () => {
        const el = document.createElement("ea-input-number");
        el.setAttribute("value", "50");
        el.setAttribute("min", "0");
        el.setAttribute("max", "100");
        container.appendChild(el);
        await waitForRender();
        const inputEl = el.shadowRoot.querySelector("input.ea-input-number__inner");
        inputEl.dispatchEvent(new KeyboardEvent("keydown", { key: "Home" }));
        await waitForRender();
        expect(el.value).toBe(0);
      });

      it("End 键应该设置值为 max", async () => {
        const el = document.createElement("ea-input-number");
        el.setAttribute("value", "50");
        el.setAttribute("min", "0");
        el.setAttribute("max", "100");
        container.appendChild(el);
        await waitForRender();
        const inputEl = el.shadowRoot.querySelector("input.ea-input-number__inner");
        inputEl.dispatchEvent(new KeyboardEvent("keydown", { key: "End" }));
        await waitForRender();
        expect(el.value).toBe(100);
      });
    });
  });
});
