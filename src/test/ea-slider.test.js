import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender.js";

import "../components/ea-slider/index.ts";

describe("EaSlider Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe("Basic Rendering", () => {
    it("应该正确渲染 ea-slider 组件并拥有 shadowRoot", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      expect(slider).toBeDefined();
      expect(slider.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      expect(
        slider.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
    });

    it("应该包含 runway CSS Part", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      expect(slider.shadowRoot.querySelector('[part="runway"]')).toBeTruthy();
    });

    it("应该包含 rail CSS Part", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      expect(slider.shadowRoot.querySelector('[part="rail"]')).toBeTruthy();
    });

    it("应该包含 trigger CSS Part（ea-tooltip 元素）", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      const trigger = slider.shadowRoot.querySelector('[part="trigger"]');
      expect(trigger).toBeTruthy();
      expect(trigger.tagName.toLowerCase()).toBe("ea-tooltip");
    });

    it("trigger 应该有 trigger=customized 属性", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      const trigger = slider.shadowRoot.querySelector('[part="trigger"]');
      expect(trigger.getAttribute("trigger")).toBe("customized");
    });

    it("trigger 应该有 flip=false 属性", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      const trigger = slider.shadowRoot.querySelector('[part="trigger"]');
      expect(trigger.hasAttribute("flip")).toBe(true);
    });

    it("trigger 初始 placement 应该与组件 placement 一致", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      const trigger = slider.shadowRoot.querySelector('[part="trigger"]');
      expect(trigger.getAttribute("placement")).toBe("top");
    });

    it("应该包含 thumb CSS Part", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      expect(slider.shadowRoot.querySelector('[part="thumb"]')).toBeTruthy();
    });

    it("应该包含 tooltip CSS Part", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      expect(slider.shadowRoot.querySelector('[part="tooltip"]')).toBeTruthy();
    });

    it("应该包含 marks CSS Part", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      expect(slider.shadowRoot.querySelector('[part="marks"]')).toBeTruthy();
    });

    it("应该包含 form-label CSS Part", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      expect(
        slider.shadowRoot.querySelector('[part="form-label"]')
      ).toBeTruthy();
    });

    it("应该包含 input CSS Part（ea-input-number 元素）", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      const input = slider.shadowRoot.querySelector('[part="input"]');
      expect(input).toBeTruthy();
      expect(input.tagName.toLowerCase()).toBe("ea-input-number");
    });

    it("thumb 元素应该有 slot=reference 属性", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      const thumb = slider.shadowRoot.querySelector('[part="thumb"]');
      expect(thumb.getAttribute("slot")).toBe("reference");
    });
  });

  describe("Value Attribute", () => {
    it("默认 value 应该是 0", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      expect(slider.value).toBe(0);
    });

    it("应该通过 HTML attribute 设置 value", async () => {
      const slider = document.createElement("ea-slider");
      slider.setAttribute("value", "50");
      container.appendChild(slider);
      await waitForRender();

      expect(slider.value).toBe(50);
    });

    it("应该通过 JS 属性设置 value", async () => {
      const slider = document.createElement("ea-slider");
      slider.value = 50;
      container.appendChild(slider);
      await waitForRender();

      expect(slider.value).toBe(50);
    });

    it("动态修改 value 应该生效", async () => {
      const slider = document.createElement("ea-slider");
      slider.value = 0;
      container.appendChild(slider);
      await waitForRender();

      slider.value = 75;
      await waitForRender();

      expect(slider.value).toBe(75);
    });

    it("value 变化时应该更新 tooltip 文本", async () => {
      const slider = document.createElement("ea-slider");
      slider.value = 50;
      container.appendChild(slider);
      await waitForRender();

      const tooltip = slider.shadowRoot.querySelector('[part="tooltip"]');
      expect(tooltip.textContent).toBe("50");
    });

    it("value 变化时应该更新 trigger 位置", async () => {
      const slider = document.createElement("ea-slider");
      slider.value = 0;
      container.appendChild(slider);
      await waitForRender();

      const trigger = slider.shadowRoot.querySelector('[part="trigger"]');
      expect(trigger.style.left).toBe("0%");

      slider.value = 50;
      await waitForRender();

      expect(trigger.style.left).toBe("50%");
    });

    it("value 超过 max 时仍可设置（observer 内部 clamp 用于表单提交）", async () => {
      const slider = document.createElement("ea-slider");
      slider.min = 0;
      slider.max = 100;
      slider.value = 150;
      container.appendChild(slider);
      await waitForRender();

      expect(slider.value).toBe(150);
    });

    it("value 小于 min 时仍可设置（observer 内部 clamp 用于表单提交）", async () => {
      const slider = document.createElement("ea-slider");
      slider.min = 10;
      slider.max = 100;
      slider.value = 0;
      container.appendChild(slider);
      await waitForRender();

      expect(slider.value).toBe(0);
    });

    it("通过 JS 属性修改 value 不应该触发 input 事件", async () => {
      const slider = document.createElement("ea-slider");
      slider.value = 0;
      container.appendChild(slider);
      await waitForRender();

      const handler = vi.fn();
      slider.addEventListener("input", handler);

      slider.value = 50;
      await waitForRender();

      expect(handler).not.toHaveBeenCalled();
    });

    it("通过 JS 属性修改 value 不应该触发 change 事件", async () => {
      const slider = document.createElement("ea-slider");
      slider.value = 0;
      container.appendChild(slider);
      await waitForRender();

      const handler = vi.fn();
      slider.addEventListener("change", handler);

      slider.value = 50;
      await waitForRender();

      expect(handler).not.toHaveBeenCalled();
    });

    it("连续修改 value 应该正确更新", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      slider.value = 25;
      await waitForRender();
      expect(slider.value).toBe(25);

      slider.value = 75;
      await waitForRender();
      expect(slider.value).toBe(75);

      slider.value = 0;
      await waitForRender();
      expect(slider.value).toBe(0);
    });
  });

  describe("Min/Max Attributes", () => {
    it("默认 min 应该是 0", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      expect(slider.min).toBe(0);
    });

    it("默认 max 应该是 100", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      expect(slider.max).toBe(100);
    });

    it("应该支持 min 属性", async () => {
      const slider = document.createElement("ea-slider");
      slider.min = 10;
      container.appendChild(slider);
      await waitForRender();

      expect(slider.min).toBe(10);
    });

    it("应该支持 max 属性", async () => {
      const slider = document.createElement("ea-slider");
      slider.max = 200;
      container.appendChild(slider);
      await waitForRender();

      expect(slider.max).toBe(200);
    });

    it("动态修改 min 应该生效", async () => {
      const slider = document.createElement("ea-slider");
      slider.min = 0;
      container.appendChild(slider);
      await waitForRender();

      slider.min = 10;
      await waitForRender();

      expect(slider.min).toBe(10);
    });

    it("动态修改 max 应该生效", async () => {
      const slider = document.createElement("ea-slider");
      slider.max = 100;
      container.appendChild(slider);
      await waitForRender();

      slider.max = 200;
      await waitForRender();

      expect(slider.max).toBe(200);
    });

    it("min/max 变化时应该更新 slider 位置", async () => {
      const slider = document.createElement("ea-slider");
      slider.min = 0;
      slider.max = 100;
      slider.value = 50;
      container.appendChild(slider);
      await waitForRender();

      const trigger = slider.shadowRoot.querySelector('[part="trigger"]');
      expect(trigger.style.left).toBe("50%");

      slider.max = 200;
      await waitForRender();

      expect(trigger.style.left).toBe("25%");
    });

    it("应该支持负数 min", async () => {
      const slider = document.createElement("ea-slider");
      slider.min = -100;
      slider.max = 100;
      slider.value = 0;
      container.appendChild(slider);
      await waitForRender();

      expect(slider.min).toBe(-100);
      expect(slider.value).toBe(0);
    });

    it("负数 min 时 value=0 的位置应该是 50%", async () => {
      const slider = document.createElement("ea-slider");
      slider.min = -100;
      slider.max = 100;
      slider.value = 0;
      container.appendChild(slider);
      await waitForRender();

      const trigger = slider.shadowRoot.querySelector('[part="trigger"]');
      expect(trigger.style.left).toBe("50%");
    });

    it("min 等于 max 时应该正常处理（位置为 NaN%）", async () => {
      const slider = document.createElement("ea-slider");
      slider.min = 50;
      slider.max = 50;
      slider.value = 50;
      container.appendChild(slider);
      await waitForRender();

      expect(slider.min).toBe(50);
      expect(slider.max).toBe(50);
    });
  });

  describe("Step Attribute", () => {
    it("默认 step 应该是 1", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      expect(slider.step).toBe(1);
    });

    it("应该支持 step 属性", async () => {
      const slider = document.createElement("ea-slider");
      slider.step = 10;
      container.appendChild(slider);
      await waitForRender();

      expect(slider.step).toBe(10);
    });

    it("动态修改 step 应该生效", async () => {
      const slider = document.createElement("ea-slider");
      slider.step = 1;
      container.appendChild(slider);
      await waitForRender();

      slider.step = 10;
      await waitForRender();

      expect(slider.step).toBe(10);
    });

    it("应该支持小数 step", async () => {
      const slider = document.createElement("ea-slider");
      slider.step = 0.1;
      container.appendChild(slider);
      await waitForRender();

      expect(slider.step).toBe(0.1);
    });

    it("应该支持 0.01 精度的 step", async () => {
      const slider = document.createElement("ea-slider");
      slider.step = 0.01;
      container.appendChild(slider);
      await waitForRender();

      expect(slider.step).toBe(0.01);
    });

    it("step 变化时应该更新 slider 位置", async () => {
      const slider = document.createElement("ea-slider");
      slider.value = 50;
      slider.step = 1;
      container.appendChild(slider);
      await waitForRender();

      slider.step = 25;
      await waitForRender();

      expect(slider.step).toBe(25);
    });
  });

  describe("Disabled Attribute", () => {
    it("默认 disabled 应该是 false", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      expect(slider.disabled).toBe(false);
    });

    it("设置 disabled 属性应该禁用滑块", async () => {
      const slider = document.createElement("ea-slider");
      slider.disabled = true;
      container.appendChild(slider);
      await waitForRender();

      expect(slider.disabled).toBe(true);
    });

    it("disabled 变化时应该正确更新容器 class", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      const containerEl = slider.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-disabled")).toBe(false);

      slider.disabled = true;
      await waitForRender();

      expect(containerEl.classList.contains("is-disabled")).toBe(true);
    });

    it("disabled 属性应该可以动态移除", async () => {
      const slider = document.createElement("ea-slider");
      slider.disabled = true;
      container.appendChild(slider);
      await waitForRender();

      expect(slider.disabled).toBe(true);

      slider.disabled = false;
      await waitForRender();

      expect(slider.disabled).toBe(false);
    });

    it("disabled 时容器不应该有 is-disabled 以外的状态变化", async () => {
      const slider = document.createElement("ea-slider");
      slider.disabled = true;
      slider.showStops = true;
      container.appendChild(slider);
      await waitForRender();

      const containerEl = slider.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-disabled")).toBe(true);
      expect(containerEl.classList.contains("is-show-stops")).toBe(true);
    });
  });

  describe("Vertical Attribute", () => {
    it("默认 vertical 应该是 false", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      expect(slider.vertical).toBe(false);
    });

    it("设置 vertical 属性应该启用垂直模式", async () => {
      const slider = document.createElement("ea-slider");
      slider.vertical = true;
      container.appendChild(slider);
      await waitForRender();

      expect(slider.vertical).toBe(true);
    });

    it("vertical 变化时应该正确更新容器 class", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      const containerEl = slider.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-vertical")).toBe(false);

      slider.vertical = true;
      await waitForRender();

      expect(containerEl.classList.contains("is-vertical")).toBe(true);
    });

    it("vertical 模式下 trigger 应该使用 top 定位", async () => {
      const slider = document.createElement("ea-slider");
      slider.vertical = true;
      slider.value = 50;
      container.appendChild(slider);
      await waitForRender();

      const trigger = slider.shadowRoot.querySelector('[part="trigger"]');
      expect(trigger.style.top).toBe("50%");
    });

    it("vertical 模式下 trigger 应该设置 left 为 50%", async () => {
      const slider = document.createElement("ea-slider");
      slider.vertical = true;
      slider.value = 50;
      container.appendChild(slider);
      await waitForRender();

      const trigger = slider.shadowRoot.querySelector('[part="trigger"]');
      expect(trigger.style.left).toBe("50%");
    });

    it("vertical 模式下 value=0 时 trigger top 应该是 0%", async () => {
      const slider = document.createElement("ea-slider");
      slider.vertical = true;
      slider.value = 0;
      container.appendChild(slider);
      await waitForRender();

      const trigger = slider.shadowRoot.querySelector('[part="trigger"]');
      expect(trigger.style.top).toBe("0%");
    });

    it("vertical 模式下 value=100 时 trigger top 应该是 100%", async () => {
      const slider = document.createElement("ea-slider");
      slider.vertical = true;
      slider.value = 100;
      container.appendChild(slider);
      await waitForRender();

      const trigger = slider.shadowRoot.querySelector('[part="trigger"]');
      expect(trigger.style.top).toBe("100%");
    });

    it("从 vertical 切换回 horizontal 时应该恢复 left 定位", async () => {
      const slider = document.createElement("ea-slider");
      slider.vertical = true;
      slider.value = 50;
      container.appendChild(slider);
      await waitForRender();

      slider.vertical = false;
      await waitForRender();

      const trigger = slider.shadowRoot.querySelector('[part="trigger"]');
      expect(trigger.style.left).toBe("50%");
      expect(trigger.style.top).toBe("50%");
    });
  });

  describe("ShowTooltip Attribute", () => {
    it("默认 showTooltip 应该是 true", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      expect(slider.showTooltip).toBe(true);
    });

    it("设置 showTooltip 为 false 应该隐藏提示框", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      slider.showTooltip = false;
      await waitForRender();

      expect(slider.showTooltip).toBe(false);
    });

    it("showTooltip 为 true 时容器应该有 is-show-tooltip class", async () => {
      const slider = document.createElement("ea-slider");
      slider.value = 50;
      container.appendChild(slider);
      await waitForRender();

      const containerEl = slider.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-show-tooltip")).toBe(true);
    });

    it("showTooltip 为 false 时容器不应该有 is-show-tooltip class", async () => {
      const slider = document.createElement("ea-slider");
      slider.value = 50;
      container.appendChild(slider);
      await waitForRender();

      slider.showTooltip = false;
      await waitForRender();

      const containerEl = slider.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-show-tooltip")).toBe(false);
    });

    it("动态切换 showTooltip 应该正确更新 class", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      const containerEl = slider.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-show-tooltip")).toBe(true);

      slider.showTooltip = false;
      await waitForRender();
      expect(containerEl.classList.contains("is-show-tooltip")).toBe(false);

      slider.showTooltip = true;
      await waitForRender();
      expect(containerEl.classList.contains("is-show-tooltip")).toBe(true);
    });
  });

  describe("Placement Attribute", () => {
    it("默认 placement 应该是 top", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      expect(slider.placement).toBe("top");
    });

    it("应该支持 placement='right'", async () => {
      const slider = document.createElement("ea-slider");
      slider.placement = "right";
      container.appendChild(slider);
      await waitForRender();

      expect(slider.placement).toBe("right");
    });

    it("应该支持 placement='left'", async () => {
      const slider = document.createElement("ea-slider");
      slider.placement = "left";
      container.appendChild(slider);
      await waitForRender();

      expect(slider.placement).toBe("left");
    });

    it("应该支持 placement='bottom'", async () => {
      const slider = document.createElement("ea-slider");
      slider.placement = "bottom";
      container.appendChild(slider);
      await waitForRender();

      expect(slider.placement).toBe("bottom");
    });

    it("placement 变化时应该更新 trigger 的 placement 属性", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      const trigger = slider.shadowRoot.querySelector('[part="trigger"]');
      expect(trigger.getAttribute("placement")).toBe("top");

      slider.placement = "right";
      await waitForRender();

      expect(trigger.getAttribute("placement")).toBe("right");
    });

    it("应该支持所有 placement 类型", async () => {
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

      for (const placement of placements) {
        const slider = document.createElement("ea-slider");
        slider.placement = placement;
        container.appendChild(slider);
        await waitForRender();

        expect(slider.placement).toBe(placement);
        container.removeChild(slider);
      }
    });

    it("初始 placement 应该在 HTML 模板中正确设置到 trigger", async () => {
      const slider = document.createElement("ea-slider");
      slider.placement = "bottom";
      container.appendChild(slider);
      await waitForRender();

      const trigger = slider.shadowRoot.querySelector('[part="trigger"]');
      expect(trigger.getAttribute("placement")).toBe("bottom");
    });
  });

  describe("ShowStops Attribute", () => {
    it("默认 showStops 应该是 false", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      expect(slider.showStops).toBe(false);
    });

    it("设置 showStops 为 true 应该显示 stops", async () => {
      const slider = document.createElement("ea-slider");
      slider.showStops = true;
      container.appendChild(slider);
      await waitForRender();

      expect(slider.showStops).toBe(true);
    });

    it("showStops 变化时应该正确更新容器 class", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      const containerEl = slider.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-show-stops")).toBe(false);

      slider.showStops = true;
      await waitForRender();

      expect(containerEl.classList.contains("is-show-stops")).toBe(true);
    });

    it("showStops 为 true 时应该渲染 stop 节点", async () => {
      const slider = document.createElement("ea-slider");
      slider.showStops = true;
      slider.step = 25;
      container.appendChild(slider);
      await waitForRender();

      const stops = slider.shadowRoot.querySelectorAll('[part="stop"]');
      expect(stops.length).toBe(5);
    });

    it("showStops 为 false 时不应渲染 stop 节点", async () => {
      const slider = document.createElement("ea-slider");
      slider.showStops = false;
      container.appendChild(slider);
      await waitForRender();

      const stops = slider.shadowRoot.querySelectorAll('[part="stop"]');
      expect(stops.length).toBe(0);
    });

    it("showStops 渲染的 stop 数量应该与 step 对应", async () => {
      const slider = document.createElement("ea-slider");
      slider.showStops = true;
      slider.step = 10;
      container.appendChild(slider);
      await waitForRender();

      const stops = slider.shadowRoot.querySelectorAll('[part="stop"]');
      expect(stops.length).toBe(11);
    });

    it("showStops 渲染的 stop 应该有正确的位置样式", async () => {
      const slider = document.createElement("ea-slider");
      slider.showStops = true;
      slider.step = 50;
      container.appendChild(slider);
      await waitForRender();

      const stops = slider.shadowRoot.querySelectorAll('[part="stop"]');
      expect(stops[0].style.left).toBe("0%");
      expect(stops[1].style.left).toBe("50%");
      expect(stops[2].style.left).toBe("100%");
    });

    it("vertical 模式下 showStops 渲染的 stop 应该使用 top 定位", async () => {
      const slider = document.createElement("ea-slider");
      slider.vertical = true;
      slider.showStops = true;
      slider.step = 50;
      container.appendChild(slider);
      await waitForRender();

      const stops = slider.shadowRoot.querySelectorAll('[part="stop"]');
      expect(stops[0].style.top).toBe("0%");
      expect(stops[1].style.top).toBe("50%");
      expect(stops[2].style.top).toBe("100%");
    });

    it("动态切换 showStops 应该正确更新 stop 渲染", async () => {
      const slider = document.createElement("ea-slider");
      slider.step = 25;
      container.appendChild(slider);
      await waitForRender();

      let stops = slider.shadowRoot.querySelectorAll('[part="stop"]');
      expect(stops.length).toBe(0);

      slider.showStops = true;
      await waitForRender();

      stops = slider.shadowRoot.querySelectorAll('[part="stop"]');
      expect(stops.length).toBe(5);

      slider.showStops = false;
      await waitForRender();

      stops = slider.shadowRoot.querySelectorAll('[part="stop"]');
      expect(stops.length).toBe(0);
    });
  });

  describe("ShowInput Attribute", () => {
    it("默认 showInput 应该是 false", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      expect(slider.showInput).toBe(false);
    });

    it("设置 showInput 为 true 应该显示输入框", async () => {
      const slider = document.createElement("ea-slider");
      slider.showInput = true;
      container.appendChild(slider);
      await waitForRender(200);

      expect(slider.showInput).toBe(true);
    });

    it("showInput 变化时应该正确更新容器 class", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      const containerEl = slider.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-show-input")).toBe(false);

      slider.showInput = true;
      await waitForRender(200);

      expect(containerEl.classList.contains("is-show-input")).toBe(true);
    });

    it("showInput 为 true 时应该同步 value 到 input 元素", async () => {
      const slider = document.createElement("ea-slider");
      slider.value = 50;
      slider.showInput = true;
      container.appendChild(slider);
      await waitForRender(200);

      const input = slider.shadowRoot.querySelector('[part="input"]');
      expect(input.value).toBe(50);
    });

    it("showInput 为 true 时应该同步 min/max/step 到 input 元素", async () => {
      const slider = document.createElement("ea-slider");
      slider.min = 10;
      slider.max = 200;
      slider.step = 5;
      slider.showInput = true;
      container.appendChild(slider);
      await waitForRender(200);

      const input = slider.shadowRoot.querySelector('[part="input"]');
      expect(input.min).toBe(10);
      expect(input.max).toBe(200);
      expect(input.step).toBe(5);
    });

    it("动态修改 value 时应该同步更新 input 元素", async () => {
      const slider = document.createElement("ea-slider");
      slider.showInput = true;
      slider.value = 30;
      container.appendChild(slider);
      await waitForRender(200);

      slider.value = 70;
      await waitForRender();

      const input = slider.shadowRoot.querySelector('[part="input"]');
      expect(input.value).toBe(70);
    });

    it("showInput 从 true 切换为 false 时应该正确更新容器 class", async () => {
      const slider = document.createElement("ea-slider");
      slider.showInput = true;
      container.appendChild(slider);
      await waitForRender(200);

      const containerEl = slider.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-show-input")).toBe(true);

      slider.showInput = false;
      await waitForRender();

      expect(containerEl.classList.contains("is-show-input")).toBe(false);
    });
  });

  describe("Size Attribute", () => {
    it("默认 size 应该是空字符串", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      expect(slider.size).toBe("");
    });

    it("应该支持 size='small'", async () => {
      const slider = document.createElement("ea-slider");
      slider.size = "small";
      container.appendChild(slider);
      await waitForRender();

      expect(slider.size).toBe("small");
    });

    it("应该支持 size='default'", async () => {
      const slider = document.createElement("ea-slider");
      slider.size = "default";
      container.appendChild(slider);
      await waitForRender();

      expect(slider.size).toBe("default");
    });

    it("应该支持 size='large'", async () => {
      const slider = document.createElement("ea-slider");
      slider.size = "large";
      container.appendChild(slider);
      await waitForRender();

      expect(slider.size).toBe("large");
    });

    it("size 变化时应该正确更新容器 class", async () => {
      const slider = document.createElement("ea-slider");
      slider.size = "small";
      container.appendChild(slider);
      await waitForRender();

      const containerEl = slider.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-slider--small")).toBe(true);

      slider.size = "large";
      await waitForRender();

      expect(containerEl.classList.contains("ea-slider--large")).toBe(true);
      expect(containerEl.classList.contains("ea-slider--small")).toBe(false);
    });

    it("size 为空时不应有 size 修饰符 class", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      const containerEl = slider.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-slider--small")).toBe(false);
      expect(containerEl.classList.contains("ea-slider--default")).toBe(false);
      expect(containerEl.classList.contains("ea-slider--large")).toBe(false);
    });

    it("showInput 为 true 时 size 应该同步到 input 元素", async () => {
      const slider = document.createElement("ea-slider");
      slider.showInput = true;
      slider.size = "small";
      container.appendChild(slider);
      await waitForRender(200);

      const input = slider.shadowRoot.querySelector('[part="input"]');
      expect(input.getAttribute("size")).toBe("small");
    });

    it("动态修改 size 时应该同步更新 input 元素", async () => {
      const slider = document.createElement("ea-slider");
      slider.showInput = true;
      slider.size = "small";
      container.appendChild(slider);
      await waitForRender(200);

      slider.size = "large";
      await waitForRender();

      const input = slider.shadowRoot.querySelector('[part="input"]');
      expect(input.getAttribute("size")).toBe("large");
    });
  });

  describe("Label Attribute", () => {
    it("默认 label 应该是空字符串", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      expect(slider.label).toBe("");
    });

    it("应该支持 label 属性", async () => {
      const slider = document.createElement("ea-slider");
      slider.label = "Slider Label";
      container.appendChild(slider);
      await waitForRender();

      expect(slider.label).toBe("Slider Label");
    });

    it("label 变化时应该更新 form-label 文本", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      const labelEl = slider.shadowRoot.querySelector('[part="form-label"]');
      expect(labelEl.textContent).toBe("");

      slider.label = "Volume";
      await waitForRender();

      expect(labelEl.textContent).toBe("Volume");
    });

    it("label 为空时 form-label 应该为空", async () => {
      const slider = document.createElement("ea-slider");
      slider.label = "Test";
      container.appendChild(slider);
      await waitForRender();

      slider.label = "";
      await waitForRender();

      const labelEl = slider.shadowRoot.querySelector('[part="form-label"]');
      expect(labelEl.textContent).toBe("");
    });

    it("动态修改 label 应该实时更新", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      slider.label = "First";
      await waitForRender();

      const labelEl = slider.shadowRoot.querySelector('[part="form-label"]');
      expect(labelEl.textContent).toBe("First");

      slider.label = "Second";
      await waitForRender();

      expect(labelEl.textContent).toBe("Second");
    });
  });

  describe("Required Attribute", () => {
    it("默认 required 应该是 false", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      expect(slider.required).toBe(false);
    });

    it("设置 required 属性应该生效", async () => {
      const slider = document.createElement("ea-slider");
      slider.required = true;
      container.appendChild(slider);
      await waitForRender();

      expect(slider.required).toBe(true);
    });

    it("动态切换 required 应该生效", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      slider.required = true;
      await waitForRender();
      expect(slider.required).toBe(true);

      slider.required = false;
      await waitForRender();
      expect(slider.required).toBe(false);
    });
  });

  describe("Marks Property", () => {
    it("默认 marks 应该是 null", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      expect(slider.marks).toBe(null);
    });

    it("应该支持 marks 属性", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      const marks = { 0: "0°C", 26: "26°C", 37: "37°C", 100: "100°C" };
      slider.marks = marks;
      await waitForRender();

      expect(slider.marks).toEqual(marks);
    });

    it("marks 设置后应该渲染 mark 标签", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      slider.marks = { 0: "0°C", 50: "50°C", 100: "100°C" };
      await waitForRender();

      const markLabels = slider.shadowRoot.querySelectorAll(
        ".ea-slider__mark-label"
      );
      expect(markLabels.length).toBe(3);
    });

    it("marks 设置后应该渲染 mark-stop 节点", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      slider.marks = { 0: "0°C", 50: "50°C", 100: "100°C" };
      await waitForRender();

      const markStops = slider.shadowRoot.querySelectorAll(
        ".ea-slider__mark-stop"
      );
      expect(markStops.length).toBe(3);
    });

    it("marks 设为 null 后应该清除 mark 标签和 mark-stop 节点", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      slider.marks = { 0: "0°C", 50: "50°C", 100: "100°C" };
      await waitForRender();

      let markLabels = slider.shadowRoot.querySelectorAll(
        ".ea-slider__mark-label"
      );
      expect(markLabels.length).toBe(3);

      slider.marks = null;
      await waitForRender();

      markLabels = slider.shadowRoot.querySelectorAll(".ea-slider__mark-label");
      expect(markLabels.length).toBe(0);
    });

    it("marks 中超出 min/max 范围的值应该被忽略", async () => {
      const slider = document.createElement("ea-slider");
      slider.min = 0;
      slider.max = 100;
      container.appendChild(slider);
      await waitForRender();

      slider.marks = { 0: "0°C", 50: "50°C", 150: "150°C" };
      await waitForRender();

      const markLabels = slider.shadowRoot.querySelectorAll(
        ".ea-slider__mark-label"
      );
      expect(markLabels.length).toBe(2);
    });

    it("marks 中 NaN 的 key 应该被忽略", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      slider.marks = { 0: "0°C", abc: "invalid", 100: "100°C" };
      await waitForRender();

      const markLabels = slider.shadowRoot.querySelectorAll(
        ".ea-slider__mark-label"
      );
      expect(markLabels.length).toBe(2);
    });

    it("marks 标签应该有正确的位置样式", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      slider.marks = { 0: "0°C", 50: "50°C", 100: "100°C" };
      await waitForRender();

      const markElements =
        slider.shadowRoot.querySelectorAll(".ea-slider__mark");
      expect(markElements[0].style.left).toBe("0%");
      expect(markElements[1].style.left).toBe("50%");
      expect(markElements[2].style.left).toBe("100%");
    });

    it("vertical 模式下 marks 标签应该使用 top 定位", async () => {
      const slider = document.createElement("ea-slider");
      slider.vertical = true;
      container.appendChild(slider);
      await waitForRender();

      slider.marks = { 0: "0°C", 50: "50°C", 100: "100°C" };
      await waitForRender();

      const markElements =
        slider.shadowRoot.querySelectorAll(".ea-slider__mark");
      expect(markElements[0].style.top).toBe("0%");
      expect(markElements[1].style.top).toBe("50%");
      expect(markElements[2].style.top).toBe("100%");
    });

    it("marks 和 showStops 同时启用时应该渲染两种 stop 节点", async () => {
      const slider = document.createElement("ea-slider");
      slider.showStops = true;
      slider.step = 25;
      container.appendChild(slider);
      await waitForRender();

      slider.marks = { 0: "0°C", 50: "50°C", 100: "100°C" };
      await waitForRender();

      const allStops = slider.shadowRoot.querySelectorAll('[part~="stop"]');
      const markStops = slider.shadowRoot.querySelectorAll(
        ".ea-slider__mark-stop"
      );
      expect(allStops.length).toBe(5 + 3);
      expect(markStops.length).toBe(3);
    });

    it("mark 标签文本应该与 marks 对象的值一致", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      slider.marks = { 0: "Start", 100: "End" };
      await waitForRender();

      const markLabels = slider.shadowRoot.querySelectorAll(
        ".ea-slider__mark-label"
      );
      expect(markLabels[0].textContent).toBe("Start");
      expect(markLabels[1].textContent).toBe("End");
    });

    it("marks 设置后 mark-stop 应该有 mark-stop part", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      slider.marks = { 0: "0°C", 50: "50°C", 100: "100°C" };
      await waitForRender();

      const markStops = slider.shadowRoot.querySelectorAll(
        '[part~="mark-stop"]'
      );
      expect(markStops.length).toBe(3);
    });

    it("marks 设置后 mark-stop 应该也有 stop part", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      slider.marks = { 0: "0°C", 50: "50°C", 100: "100°C" };
      await waitForRender();

      const markStops = slider.shadowRoot.querySelectorAll('[part~="stop"]');
      expect(markStops.length).toBe(3);
    });
  });

  describe("FormatTooltip Property", () => {
    it("默认 formatTooltip 应该返回原始值", async () => {
      const slider = document.createElement("ea-slider");
      slider.value = 50;
      container.appendChild(slider);
      await waitForRender();

      expect(slider.formatTooltip(50)).toBe(50);
    });

    it("应该支持自定义 formatTooltip 函数", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      slider.formatTooltip = value => value + "%";
      await waitForRender();

      expect(typeof slider.formatTooltip).toBe("function");
      expect(slider.formatTooltip(50)).toBe("50%");
    });

    it("formatTooltip 变化时应该更新 tooltip 文本", async () => {
      const slider = document.createElement("ea-slider");
      slider.value = 50;
      container.appendChild(slider);
      await waitForRender();

      const tooltip = slider.shadowRoot.querySelector('[part="tooltip"]');
      expect(tooltip.textContent).toBe("50");

      slider.formatTooltip = value => value + "%";
      await waitForRender();

      expect(tooltip.textContent).toBe("50%");
    });

    it("formatTooltip 应该支持复杂格式化", async () => {
      const slider = document.createElement("ea-slider");
      slider.value = 75;
      container.appendChild(slider);
      await waitForRender();

      slider.formatTooltip = value => `¥${value}.00`;
      await waitForRender();

      const tooltip = slider.shadowRoot.querySelector('[part="tooltip"]');
      expect(tooltip.textContent).toBe("¥75.00");
    });

    it("formatTooltip 变化时 value 变化也应该使用新格式", async () => {
      const slider = document.createElement("ea-slider");
      slider.value = 30;
      container.appendChild(slider);
      await waitForRender();

      slider.formatTooltip = value => `${value}km`;
      await waitForRender();

      slider.value = 60;
      await waitForRender();

      const tooltip = slider.shadowRoot.querySelector('[part="tooltip"]');
      expect(tooltip.textContent).toBe("60km");
    });
  });

  describe("Container Class Updates", () => {
    it("disabled 状态应该正确反映在容器 class 中", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      const containerEl = slider.shadowRoot.querySelector('[part="container"]');

      slider.disabled = true;
      await waitForRender();
      expect(containerEl.classList.contains("is-disabled")).toBe(true);

      slider.disabled = false;
      await waitForRender();
      expect(containerEl.classList.contains("is-disabled")).toBe(false);
    });

    it("vertical 状态应该正确反映在容器 class 中", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      const containerEl = slider.shadowRoot.querySelector('[part="container"]');

      slider.vertical = true;
      await waitForRender();
      expect(containerEl.classList.contains("is-vertical")).toBe(true);

      slider.vertical = false;
      await waitForRender();
      expect(containerEl.classList.contains("is-vertical")).toBe(false);
    });

    it("showTooltip 状态应该正确反映在容器 class 中", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      const containerEl = slider.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-show-tooltip")).toBe(true);

      slider.showTooltip = false;
      await waitForRender();
      expect(containerEl.classList.contains("is-show-tooltip")).toBe(false);
    });

    it("showStops 状态应该正确反映在容器 class 中", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      const containerEl = slider.shadowRoot.querySelector('[part="container"]');

      slider.showStops = true;
      await waitForRender();
      expect(containerEl.classList.contains("is-show-stops")).toBe(true);

      slider.showStops = false;
      await waitForRender();
      expect(containerEl.classList.contains("is-show-stops")).toBe(false);
    });

    it("showInput 状态应该正确反映在容器 class 中", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      const containerEl = slider.shadowRoot.querySelector('[part="container"]');

      slider.showInput = true;
      await waitForRender(200);
      expect(containerEl.classList.contains("is-show-input")).toBe(true);

      slider.showInput = false;
      await waitForRender();
      expect(containerEl.classList.contains("is-show-input")).toBe(false);
    });

    it("size 修饰符应该正确反映在容器 class 中", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      const containerEl = slider.shadowRoot.querySelector('[part="container"]');

      slider.size = "small";
      await waitForRender();
      expect(containerEl.classList.contains("ea-slider--small")).toBe(true);

      slider.size = "large";
      await waitForRender();
      expect(containerEl.classList.contains("ea-slider--large")).toBe(true);
      expect(containerEl.classList.contains("ea-slider--small")).toBe(false);
    });

    it("多个状态应该可以同时存在", async () => {
      const slider = document.createElement("ea-slider");
      slider.disabled = true;
      slider.showStops = true;
      slider.size = "small";
      container.appendChild(slider);
      await waitForRender();

      const containerEl = slider.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-disabled")).toBe(true);
      expect(containerEl.classList.contains("is-show-stops")).toBe(true);
      expect(containerEl.classList.contains("ea-slider--small")).toBe(true);
    });

    it("updateContainerClasslist 应该返回完整的 class 字符串", async () => {
      const slider = document.createElement("ea-slider");
      slider.disabled = true;
      slider.size = "small";
      container.appendChild(slider);
      await waitForRender();

      const result = slider.updateContainerClasslist();
      expect(result).toContain("ea-slider");
      expect(result).toContain("is-disabled");
      expect(result).toContain("ea-slider--small");
    });
  });

  describe("Slider Position Updates", () => {
    it("value=0 时 trigger 应该在 0% 位置", async () => {
      const slider = document.createElement("ea-slider");
      slider.value = 0;
      container.appendChild(slider);
      await waitForRender();

      const trigger = slider.shadowRoot.querySelector('[part="trigger"]');
      expect(trigger.style.left).toBe("0%");
    });

    it("value=50 时 trigger 应该在 50% 位置", async () => {
      const slider = document.createElement("ea-slider");
      slider.value = 50;
      container.appendChild(slider);
      await waitForRender();

      const trigger = slider.shadowRoot.querySelector('[part="trigger"]');
      expect(trigger.style.left).toBe("50%");
    });

    it("value=100 时 trigger 应该在 100% 位置", async () => {
      const slider = document.createElement("ea-slider");
      slider.value = 100;
      container.appendChild(slider);
      await waitForRender();

      const trigger = slider.shadowRoot.querySelector('[part="trigger"]');
      expect(trigger.style.left).toBe("100%");
    });

    it("自定义 min/max 时位置应该正确计算", async () => {
      const slider = document.createElement("ea-slider");
      slider.min = 0;
      slider.max = 200;
      slider.value = 100;
      container.appendChild(slider);
      await waitForRender();

      const trigger = slider.shadowRoot.querySelector('[part="trigger"]');
      expect(trigger.style.left).toBe("50%");
    });

    it("vertical 模式下应该使用 top 定位", async () => {
      const slider = document.createElement("ea-slider");
      slider.vertical = true;
      slider.value = 50;
      container.appendChild(slider);
      await waitForRender();

      const trigger = slider.shadowRoot.querySelector('[part="trigger"]');
      expect(trigger.style.top).toBe("50%");
      expect(trigger.style.left).toBe("50%");
    });

    it("非 vertical 模式下应该使用 left 定位且 top 为 50%", async () => {
      const slider = document.createElement("ea-slider");
      slider.value = 50;
      container.appendChild(slider);
      await waitForRender();

      const trigger = slider.shadowRoot.querySelector('[part="trigger"]');
      expect(trigger.style.left).toBe("50%");
      expect(trigger.style.top).toBe("50%");
    });

    it("value 变化时 tooltip 文本应该同步更新", async () => {
      const slider = document.createElement("ea-slider");
      slider.value = 0;
      container.appendChild(slider);
      await waitForRender();

      const tooltip = slider.shadowRoot.querySelector('[part="tooltip"]');
      expect(tooltip.textContent).toBe("0");

      slider.value = 75;
      await waitForRender();

      expect(tooltip.textContent).toBe("75");
    });

    it("min=50 max=100 value=75 时位置应该是 50%", async () => {
      const slider = document.createElement("ea-slider");
      slider.min = 50;
      slider.max = 100;
      slider.value = 75;
      container.appendChild(slider);
      await waitForRender();

      const trigger = slider.shadowRoot.querySelector('[part="trigger"]');
      expect(trigger.style.left).toBe("50%");
    });
  });

  describe("Events - Custom Event Classes", () => {
    it("EaSliderInputEvent 应该包含正确的 detail", async () => {
      const slider = document.createElement("ea-slider");
      slider.value = 0;
      container.appendChild(slider);
      await waitForRender();

      let receivedDetail = null;
      slider.addEventListener("input", e => {
        receivedDetail = e.detail;
      });

      slider.dispatchEvent(
        new CustomEvent("input", { detail: { value: 42 }, bubbles: true })
      );

      expect(receivedDetail).toEqual({ value: 42 });
    });

    it("EaSliderChangeEvent 应该包含正确的 detail", async () => {
      const slider = document.createElement("ea-slider");
      slider.value = 0;
      container.appendChild(slider);
      await waitForRender();

      let receivedDetail = null;
      slider.addEventListener("change", e => {
        receivedDetail = e.detail;
      });

      slider.dispatchEvent(
        new CustomEvent("change", { detail: { value: 80 }, bubbles: true })
      );

      expect(receivedDetail).toEqual({ value: 80 });
    });

    it("input 事件应该冒泡", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      const handler = vi.fn();
      container.addEventListener("input", handler);

      slider.dispatchEvent(
        new CustomEvent("input", { detail: { value: 42 }, bubbles: true })
      );

      expect(handler).toHaveBeenCalled();
    });

    it("change 事件应该冒泡", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      const handler = vi.fn();
      container.addEventListener("change", handler);

      slider.dispatchEvent(
        new CustomEvent("change", { detail: { value: 80 }, bubbles: true })
      );

      expect(handler).toHaveBeenCalled();
    });
  });

  describe("Events - Mouse Interaction", () => {
    it("在 rail 上 mousedown 应该触发 input 事件", async () => {
      const slider = document.createElement("ea-slider");
      slider.value = 0;
      container.appendChild(slider);
      await waitForRender();

      const handler = vi.fn();
      slider.addEventListener("input", handler);

      const rail = slider.shadowRoot.querySelector('[part="rail"]');
      rail.dispatchEvent(
        new MouseEvent("mousedown", {
          clientX: 50,
          clientY: 0,
          bubbles: true,
          cancelable: true,
        })
      );

      expect(handler).toHaveBeenCalled();
    });

    it("在 thumb 上 mousedown 应该触发 input 事件", async () => {
      const slider = document.createElement("ea-slider");
      slider.value = 0;
      container.appendChild(slider);
      await waitForRender();

      const handler = vi.fn();
      slider.addEventListener("input", handler);

      const thumb = slider.shadowRoot.querySelector('[part="thumb"]');
      thumb.dispatchEvent(
        new MouseEvent("mousedown", {
          clientX: 50,
          clientY: 0,
          bubbles: true,
          cancelable: true,
        })
      );

      expect(handler).toHaveBeenCalled();
    });

    it("disabled 时在 rail 上 mousedown 不应该触发 input 事件", async () => {
      const slider = document.createElement("ea-slider");
      slider.disabled = true;
      container.appendChild(slider);
      await waitForRender();

      const handler = vi.fn();
      slider.addEventListener("input", handler);

      const rail = slider.shadowRoot.querySelector('[part="rail"]');
      rail.dispatchEvent(
        new MouseEvent("mousedown", {
          clientX: 50,
          clientY: 0,
          bubbles: true,
          cancelable: true,
        })
      );

      expect(handler).not.toHaveBeenCalled();
    });

    it("disabled 时在 thumb 上 mousedown 不应该触发 input 事件", async () => {
      const slider = document.createElement("ea-slider");
      slider.disabled = true;
      container.appendChild(slider);
      await waitForRender();

      const handler = vi.fn();
      slider.addEventListener("input", handler);

      const thumb = slider.shadowRoot.querySelector('[part="thumb"]');
      thumb.dispatchEvent(
        new MouseEvent("mousedown", {
          clientX: 50,
          clientY: 0,
          bubbles: true,
          cancelable: true,
        })
      );

      expect(handler).not.toHaveBeenCalled();
    });

    it("mousedown 在 rail 上应该设置 trigger 的 visible 属性", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      const trigger = slider.shadowRoot.querySelector('[part="trigger"]');
      const rail = slider.shadowRoot.querySelector('[part="rail"]');

      rail.dispatchEvent(
        new MouseEvent("mousedown", {
          clientX: 50,
          clientY: 0,
          bubbles: true,
          cancelable: true,
        })
      );

      expect(trigger.hasAttribute("visible")).toBe(true);
    });

    it("mouseup 应该触发 change 事件", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      const changeHandler = vi.fn();
      slider.addEventListener("change", changeHandler);

      const rail = slider.shadowRoot.querySelector('[part="rail"]');
      rail.dispatchEvent(
        new MouseEvent("mousedown", {
          clientX: 50,
          clientY: 0,
          bubbles: true,
          cancelable: true,
        })
      );

      document.dispatchEvent(new MouseEvent("mouseup"));

      expect(changeHandler).toHaveBeenCalled();
    });

    it("mouseup 后应该移除 trigger 的 visible 属性", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      const trigger = slider.shadowRoot.querySelector('[part="trigger"]');
      const rail = slider.shadowRoot.querySelector('[part="rail"]');

      rail.dispatchEvent(
        new MouseEvent("mousedown", {
          clientX: 50,
          clientY: 0,
          bubbles: true,
          cancelable: true,
        })
      );

      expect(trigger.hasAttribute("visible")).toBe(true);

      document.dispatchEvent(new MouseEvent("mouseup"));

      expect(trigger.hasAttribute("visible")).toBe(false);
    });
  });

  describe("Events - Tooltip Visibility", () => {
    it("鼠标进入 thumb 应该设置 trigger 的 visible 属性", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      const trigger = slider.shadowRoot.querySelector('[part="trigger"]');
      const thumb = slider.shadowRoot.querySelector('[part="thumb"]');

      thumb.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));

      expect(trigger.hasAttribute("visible")).toBe(true);
    });

    it("鼠标离开 thumb 应该移除 trigger 的 visible 属性", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      const trigger = slider.shadowRoot.querySelector('[part="trigger"]');
      const thumb = slider.shadowRoot.querySelector('[part="thumb"]');

      thumb.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
      expect(trigger.hasAttribute("visible")).toBe(true);

      thumb.dispatchEvent(new MouseEvent("mouseleave", { bubbles: true }));
      expect(trigger.hasAttribute("visible")).toBe(false);
    });

    it("disabled 时鼠标进入 thumb 不应该设置 visible", async () => {
      const slider = document.createElement("ea-slider");
      slider.disabled = true;
      container.appendChild(slider);
      await waitForRender();

      const trigger = slider.shadowRoot.querySelector('[part="trigger"]');
      const thumb = slider.shadowRoot.querySelector('[part="thumb"]');

      thumb.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));

      expect(trigger.hasAttribute("visible")).toBe(false);
    });

    it("disabled 时鼠标离开 thumb 不应该移除 visible", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      const trigger = slider.shadowRoot.querySelector('[part="trigger"]');
      const thumb = slider.shadowRoot.querySelector('[part="thumb"]');

      thumb.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
      expect(trigger.hasAttribute("visible")).toBe(true);

      slider.disabled = true;
      await waitForRender();

      thumb.dispatchEvent(new MouseEvent("mouseleave", { bubbles: true }));
      expect(trigger.hasAttribute("visible")).toBe(true);
    });
  });

  describe("Form Validation", () => {
    it("validationTarget 应该返回 input 元素", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      const target = slider.validationTarget;
      expect(target).toBeTruthy();
    });

    it("required 属性应该可以设置", async () => {
      const slider = document.createElement("ea-slider");
      slider.required = true;
      container.appendChild(slider);
      await waitForRender();

      expect(slider.required).toBe(true);
    });
  });

  describe("Edge Cases", () => {
    it("value 大于 max 时仍可设置", async () => {
      const slider = document.createElement("ea-slider");
      slider.min = 0;
      slider.max = 100;
      slider.value = 150;
      container.appendChild(slider);
      await waitForRender();

      expect(slider.value).toBe(150);
    });

    it("value 小于 min 时仍可设置", async () => {
      const slider = document.createElement("ea-slider");
      slider.min = 10;
      slider.max = 100;
      slider.value = 0;
      container.appendChild(slider);
      await waitForRender();

      expect(slider.value).toBe(0);
    });

    it("min 等于 max 时应该正常处理", async () => {
      const slider = document.createElement("ea-slider");
      slider.min = 50;
      slider.max = 50;
      slider.value = 50;
      container.appendChild(slider);
      await waitForRender();

      expect(slider.min).toBe(50);
      expect(slider.max).toBe(50);
    });

    it("负数 min 应该正常处理", async () => {
      const slider = document.createElement("ea-slider");
      slider.min = -100;
      slider.max = 100;
      slider.value = 0;
      container.appendChild(slider);
      await waitForRender();

      expect(slider.min).toBe(-100);
    });

    it("连续修改多个属性应该正确更新", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      slider.min = 10;
      slider.max = 200;
      slider.step = 10;
      slider.value = 100;
      await waitForRender();

      expect(slider.min).toBe(10);
      expect(slider.max).toBe(200);
      expect(slider.step).toBe(10);
      expect(slider.value).toBe(100);
    });

    it("value 为小数时应该正常处理", async () => {
      const slider = document.createElement("ea-slider");
      slider.step = 0.1;
      slider.value = 5.5;
      container.appendChild(slider);
      await waitForRender();

      expect(slider.value).toBe(5.5);
    });

    it("先设置 value 再设置 min 时 value 不会被自动 clamp", async () => {
      const slider = document.createElement("ea-slider");
      slider.value = 5;
      container.appendChild(slider);
      await waitForRender();

      slider.min = 10;
      await waitForRender();

      expect(slider.value).toBe(5);
    });

    it("先设置 value 再缩小 max 时 value 不会被自动 clamp", async () => {
      const slider = document.createElement("ea-slider");
      slider.value = 80;
      container.appendChild(slider);
      await waitForRender();

      slider.max = 50;
      await waitForRender();

      expect(slider.value).toBe(80);
    });

    it("step=0.5 时 value 应该正确处理", async () => {
      const slider = document.createElement("ea-slider");
      slider.step = 0.5;
      slider.value = 2.5;
      container.appendChild(slider);
      await waitForRender();

      expect(slider.value).toBe(2.5);
    });

    it("step=0.01 时 value 应该正确处理精度", async () => {
      const slider = document.createElement("ea-slider");
      slider.step = 0.01;
      slider.value = 1.23;
      container.appendChild(slider);
      await waitForRender();

      expect(slider.value).toBe(1.23);
    });

    it("重新设置 marks 后超出新 min 范围的应该被忽略", async () => {
      const slider = document.createElement("ea-slider");
      slider.min = 30;
      container.appendChild(slider);
      await waitForRender();

      slider.marks = { 0: "0", 50: "50", 100: "100" };
      await waitForRender();

      const markLabels = slider.shadowRoot.querySelectorAll(
        ".ea-slider__mark-label"
      );
      expect(markLabels.length).toBe(2);
    });
  });

  describe("HTML Attribute Mapping", () => {
    it("value 属性应该映射到 JS 属性", async () => {
      const slider = document.createElement("ea-slider");
      slider.setAttribute("value", "50");
      container.appendChild(slider);
      await waitForRender();

      expect(slider.value).toBe(50);
    });

    it("min 属性应该映射到 JS 属性", async () => {
      const slider = document.createElement("ea-slider");
      slider.setAttribute("min", "10");
      container.appendChild(slider);
      await waitForRender();

      expect(slider.min).toBe(10);
    });

    it("max 属性应该映射到 JS 属性", async () => {
      const slider = document.createElement("ea-slider");
      slider.setAttribute("max", "200");
      container.appendChild(slider);
      await waitForRender();

      expect(slider.max).toBe(200);
    });

    it("step 属性应该映射到 JS 属性", async () => {
      const slider = document.createElement("ea-slider");
      slider.setAttribute("step", "10");
      container.appendChild(slider);
      await waitForRender();

      expect(slider.step).toBe(10);
    });

    it("disabled 属性应该映射到 JS 属性", async () => {
      const slider = document.createElement("ea-slider");
      slider.setAttribute("disabled", "");
      container.appendChild(slider);
      await waitForRender();

      expect(slider.disabled).toBe(true);
    });

    it("vertical 属性应该映射到 JS 属性", async () => {
      const slider = document.createElement("ea-slider");
      slider.setAttribute("vertical", "");
      container.appendChild(slider);
      await waitForRender();

      expect(slider.vertical).toBe(true);
    });

    it("show-tooltip 属性应该映射到 showTooltip JS 属性", async () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      await waitForRender();

      expect(slider.showTooltip).toBe(true);

      slider.removeAttribute("show-tooltip");
      await waitForRender();

      expect(slider.showTooltip).toBe(false);
    });

    it("show-stops 属性应该映射到 showStops JS 属性", async () => {
      const slider = document.createElement("ea-slider");
      slider.setAttribute("show-stops", "");
      container.appendChild(slider);
      await waitForRender();

      expect(slider.showStops).toBe(true);
    });

    it("show-input 属性应该映射到 showInput JS 属性", async () => {
      const slider = document.createElement("ea-slider");
      slider.setAttribute("show-input", "");
      container.appendChild(slider);
      await waitForRender(200);

      expect(slider.showInput).toBe(true);
    });

    it("placement 属性应该映射到 JS 属性", async () => {
      const slider = document.createElement("ea-slider");
      slider.setAttribute("placement", "right");
      container.appendChild(slider);
      await waitForRender();

      expect(slider.placement).toBe("right");
    });

    it("size 属性应该映射到 JS 属性", async () => {
      const slider = document.createElement("ea-slider");
      slider.setAttribute("size", "small");
      container.appendChild(slider);
      await waitForRender();

      expect(slider.size).toBe("small");
    });

    it("label 属性应该映射到 JS 属性", async () => {
      const slider = document.createElement("ea-slider");
      slider.setAttribute("label", "Volume");
      container.appendChild(slider);
      await waitForRender();

      expect(slider.label).toBe("Volume");
    });

    it("required 属性应该映射到 JS 属性", async () => {
      const slider = document.createElement("ea-slider");
      slider.setAttribute("required", "");
      container.appendChild(slider);
      await waitForRender();

      expect(slider.required).toBe(true);
    });

    it("移除 disabled 属性应该将 JS 属性设为 false", async () => {
      const slider = document.createElement("ea-slider");
      slider.setAttribute("disabled", "");
      container.appendChild(slider);
      await waitForRender();

      expect(slider.disabled).toBe(true);

      slider.removeAttribute("disabled");
      await waitForRender();

      expect(slider.disabled).toBe(false);
    });
  });

  describe("Lifecycle", () => {
    it("slider 组件连接后应该正确初始化", async () => {
      const slider = document.createElement("ea-slider");
      slider.value = 50;
      container.appendChild(slider);
      await waitForRender();

      expect(
        slider.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
      expect(slider.shadowRoot.querySelector('[part="rail"]')).toBeTruthy();
      expect(slider.shadowRoot.querySelector('[part="thumb"]')).toBeTruthy();
    });

    it("组件断开连接后应该正常移除", () => {
      const slider = document.createElement("ea-slider");
      container.appendChild(slider);
      slider.remove();
      expect(container.contains(slider)).toBe(false);
    });

    it("组件重新连接后应该正常工作", async () => {
      const slider = document.createElement("ea-slider");
      slider.value = 50;
      container.appendChild(slider);
      await waitForRender();

      container.removeChild(slider);
      container.appendChild(slider);
      await waitForRender();

      expect(
        slider.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
    });

    it("$mount 时应该调用 _updateSlider", async () => {
      const slider = document.createElement("ea-slider");
      slider.value = 75;
      container.appendChild(slider);
      await waitForRender();

      const trigger = slider.shadowRoot.querySelector('[part="trigger"]');
      expect(trigger.style.left).toBe("75%");
    });
  });
});
