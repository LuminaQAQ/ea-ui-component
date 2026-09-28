import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender";
import { runAxe, assertNoA11yViolations } from "./utils/a11y";

import "../components/ea-rate/index";

describe("EaRate", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  function createRate(attrs = {}) {
    const el = document.createElement("ea-rate");
    Object.entries(attrs).forEach(([key, val]) => {
      if (val === true) {
        el.setAttribute(key, "");
      } else if (val !== false && val != null) {
        el.setAttribute(key, String(val));
      }
    });
    return el;
  }

  // ==================== 基础渲染 ====================

  describe("Basic Rendering", () => {
    it("应该正确渲染组件并拥有 shadowRoot", async () => {
      const rate = createRate();
      container.appendChild(rate);

      await waitForRender();

      expect(rate.shadowRoot).toBeTruthy();
      expect(rate.tagName.toLowerCase()).toBe("ea-rate");
    });

    it("应该渲染容器元素 .ea-rate", async () => {
      const rate = createRate();
      container.appendChild(rate);

      await waitForRender();

      const containerEl = rate.shadowRoot.querySelector(".ea-rate");
      expect(containerEl).toBeTruthy();
      expect(containerEl.getAttribute("part")).toBe("container");
    });

    it("应该渲染 label 元素", async () => {
      const rate = createRate();
      container.appendChild(rate);

      await waitForRender();

      const label = rate.shadowRoot.querySelector(".ea-rate__label");
      expect(label).toBeTruthy();
      expect(label.getAttribute("part")).toBe("label");
    });

    it("默认应该渲染 5 个评分项", async () => {
      const rate = createRate();
      container.appendChild(rate);

      await waitForRender();

      const symbols = rate.shadowRoot.querySelectorAll(".ea-rate__symbol");
      expect(symbols.length).toBe(5);
    });

    it("每个评分项应该有 part=symbol-wrap 属性", async () => {
      const rate = createRate();
      container.appendChild(rate);

      await waitForRender();

      const symbols = rate.shadowRoot.querySelectorAll('[part="symbol-wrap"]');
      expect(symbols.length).toBe(5);
    });

    it("默认评分项应该渲染 ea-icon 图标", async () => {
      const rate = createRate();
      container.appendChild(rate);

      await waitForRender();

      const icons = rate.shadowRoot.querySelectorAll(
        ".ea-rate__symbol ea-icon"
      );
      expect(icons.length).toBe(5);
    });

    it("label 元素默认内容为空时不显示", async () => {
      const rate = createRate();
      container.appendChild(rate);

      await waitForRender();

      const label = rate.shadowRoot.querySelector(".ea-rate__label");
      expect(label.textContent).toBe("");
    });
  });

  // ==================== value 属性 ====================

  describe("Value Attribute", () => {
    it("默认 value 应该是 0", async () => {
      const rate = createRate();
      container.appendChild(rate);

      await waitForRender();

      expect(rate.value).toBe(0);
    });

    it("应该支持通过 attribute 设置 value", async () => {
      const rate = createRate({ value: 3 });
      container.appendChild(rate);

      await waitForRender();

      expect(rate.value).toBe(3);
      expect(rate.getAttribute("value")).toBe("3");
    });

    it("应该支持通过 property 设置 value", async () => {
      const rate = createRate();
      container.appendChild(rate);

      await waitForRender();

      rate.value = 4;

      await waitForRender();

      expect(rate.value).toBe(4);
    });

    it("value=3 时前3项应该有 is-selected 类，后2项没有", async () => {
      const rate = createRate({ value: 3 });
      container.appendChild(rate);

      await waitForRender();

      const symbols = rate.shadowRoot.querySelectorAll(".ea-rate__symbol");
      expect(symbols[0].classList.contains("is-selected")).toBe(true);
      expect(symbols[1].classList.contains("is-selected")).toBe(true);
      expect(symbols[2].classList.contains("is-selected")).toBe(true);
      expect(symbols[3].classList.contains("is-selected")).toBe(false);
      expect(symbols[4].classList.contains("is-selected")).toBe(false);
    });

    it("value=0 时不应该有选中项", async () => {
      const rate = createRate({ value: 0 });
      container.appendChild(rate);

      await waitForRender();

      const symbols = rate.shadowRoot.querySelectorAll(".ea-rate__symbol");
      symbols.forEach(symbol => {
        expect(symbol.classList.contains("is-selected")).toBe(false);
      });
    });

    it("value=1 时仅第1项选中", async () => {
      const rate = createRate({ value: 1 });
      container.appendChild(rate);

      await waitForRender();

      const symbols = rate.shadowRoot.querySelectorAll(".ea-rate__symbol");
      expect(symbols[0].classList.contains("is-selected")).toBe(true);
      symbols.forEach((symbol, i) => {
        if (i > 0) {
          expect(symbol.classList.contains("is-selected")).toBe(false);
        }
      });
    });

    it("value 动态变化时应该更新选中状态", async () => {
      const rate = createRate({ value: 2 });
      container.appendChild(rate);

      await waitForRender();

      expect(rate.value).toBe(2);

      rate.setAttribute("value", "4");

      await waitForRender();

      expect(rate.value).toBe(4);

      const symbols = rate.shadowRoot.querySelectorAll(".ea-rate__symbol");
      expect(symbols[0].classList.contains("is-selected")).toBe(true);
      expect(symbols[3].classList.contains("is-selected")).toBe(true);
      expect(symbols[4].classList.contains("is-selected")).toBe(false);
    });

    it("value 动态设置为 0 时应该清除所有选中", async () => {
      const rate = createRate({ value: 3 });
      container.appendChild(rate);

      await waitForRender();

      rate.setAttribute("value", "0");

      await waitForRender();

      const symbols = rate.shadowRoot.querySelectorAll(".ea-rate__symbol");
      symbols.forEach(symbol => {
        expect(symbol.classList.contains("is-selected")).toBe(false);
      });
    });
  });

  // ==================== max 属性 ====================

  describe("Max Attribute", () => {
    it("默认 max 应该是 5", async () => {
      const rate = createRate();
      container.appendChild(rate);

      await waitForRender();

      expect(rate.max).toBe(5);
    });

    it("应该支持设置 max 属性来渲染对应数量的评分项", async () => {
      const rate = createRate({ max: 3 });
      container.appendChild(rate);

      await waitForRender();

      expect(rate.max).toBe(3);
      const symbols = rate.shadowRoot.querySelectorAll(".ea-rate__symbol");
      expect(symbols.length).toBe(3);
    });

    it("max=10 应该渲染 10 个评分项", async () => {
      const rate = createRate({ max: 10 });
      container.appendChild(rate);

      await waitForRender();

      expect(rate.max).toBe(10);
      const symbols = rate.shadowRoot.querySelectorAll(".ea-rate__symbol");
      expect(symbols.length).toBe(10);
    });

    it("max=1 应该渲染 1 个评分项", async () => {
      const rate = createRate({ max: 1 });
      container.appendChild(rate);

      await waitForRender();

      expect(rate.max).toBe(1);
      const symbols = rate.shadowRoot.querySelectorAll(".ea-rate__symbol");
      expect(symbols.length).toBe(1);
    });

    it("max 动态变化应该重新渲染评分项", async () => {
      const rate = createRate({ max: 5 });
      container.appendChild(rate);

      await waitForRender();

      expect(rate.shadowRoot.querySelectorAll(".ea-rate__symbol").length).toBe(
        5
      );

      rate.setAttribute("max", "3");

      await waitForRender();

      expect(rate.max).toBe(3);
      expect(rate.shadowRoot.querySelectorAll(".ea-rate__symbol").length).toBe(
        3
      );
    });

    it("max 动态变大应该正确渲染新评分项", async () => {
      const rate = createRate({ max: 3 });
      container.appendChild(rate);

      await waitForRender();

      rate.setAttribute("max", "7");

      await waitForRender();

      expect(rate.shadowRoot.querySelectorAll(".ea-rate__symbol").length).toBe(
        7
      );
    });

    it("max 变化后应保留原有选中状态", async () => {
      const rate = createRate({ max: 5, value: 3 });
      container.appendChild(rate);

      await waitForRender();

      rate.setAttribute("max", "4");

      await waitForRender();

      const symbols = rate.shadowRoot.querySelectorAll(".ea-rate__symbol");
      expect(symbols[0].classList.contains("is-selected")).toBe(true);
      expect(symbols[2].classList.contains("is-selected")).toBe(true);
    });
  });

  // ==================== size 属性 ====================

  describe("Size Attribute", () => {
    it("默认 size 应该是空字符串", async () => {
      const rate = createRate();
      container.appendChild(rate);

      await waitForRender();

      expect(rate.size === "" || rate.size === null).toBe(true);
    });

    it("设置 size=large 应该添加 ea-rate--large 修饰类", async () => {
      const rate = createRate({ size: "large" });
      container.appendChild(rate);

      await waitForRender();

      expect(rate.size).toBe("large");
      const containerEl = rate.shadowRoot.querySelector(".ea-rate");
      expect(containerEl.classList.contains("ea-rate--large")).toBe(true);
    });

    it("设置 size=small 应该添加 ea-rate--small 修饰类", async () => {
      const rate = createRate({ size: "small" });
      container.appendChild(rate);

      await waitForRender();

      expect(rate.size).toBe("small");
      const containerEl = rate.shadowRoot.querySelector(".ea-rate");
      expect(containerEl.classList.contains("ea-rate--small")).toBe(true);
    });

    it("设置 size=default 应该添加 ea-rate--default 修饰类", async () => {
      const rate = createRate({ size: "default" });
      container.appendChild(rate);

      await waitForRender();

      expect(rate.size).toBe("default");
      const containerEl = rate.shadowRoot.querySelector(".ea-rate");
      expect(containerEl.classList.contains("ea-rate--default")).toBe(true);
    });

    it("size 动态变化应该正确更新容器 class", async () => {
      const rate = createRate({ size: "small" });
      container.appendChild(rate);

      await waitForRender();

      const containerEl = rate.shadowRoot.querySelector(".ea-rate");
      expect(containerEl.classList.contains("ea-rate--small")).toBe(true);

      rate.setAttribute("size", "large");

      await waitForRender();

      expect(containerEl.classList.contains("ea-rate--large")).toBe(true);
      expect(containerEl.classList.contains("ea-rate--small")).toBe(false);
    });

    it("移除 size 属性应该清除修饰类", async () => {
      const rate = createRate({ size: "large" });
      container.appendChild(rate);

      await waitForRender();

      rate.removeAttribute("size");

      await waitForRender();

      const containerEl = rate.shadowRoot.querySelector(".ea-rate");
      expect(containerEl.classList.contains("ea-rate--large")).toBe(false);
    });
  });

  // ==================== label 属性 ====================

  describe("Label Attribute", () => {
    it("默认 label 应该是空字符串", async () => {
      const rate = createRate();
      container.appendChild(rate);

      await waitForRender();

      expect(rate.label).toBe("");
    });

    it("设置 label 应该更新 label 元素文本内容", async () => {
      const rate = createRate({ label: "评分" });
      container.appendChild(rate);

      await waitForRender();

      expect(rate.label).toBe("评分");
      const labelEl = rate.shadowRoot.querySelector(".ea-rate__label");
      expect(labelEl.textContent).toBe("评分");
    });

    it("label 动态变化应该更新文本", async () => {
      const rate = createRate({ label: "初始" });
      container.appendChild(rate);

      await waitForRender();

      rate.setAttribute("label", "更新后");

      await waitForRender();

      const labelEl = rate.shadowRoot.querySelector(".ea-rate__label");
      expect(labelEl.textContent).toBe("更新后");
    });
  });

  // ==================== readonly 属性 ====================

  describe("Readonly Attribute", () => {
    it("默认 readonly 应该是 false", async () => {
      const rate = createRate();
      container.appendChild(rate);

      await waitForRender();

      expect(rate.readonly === false || rate.readonly === null).toBe(true);
    });

    it("设置 readonly 应该为 true", async () => {
      const rate = createRate({ readonly: true });
      container.appendChild(rate);

      await waitForRender();

      expect(rate.readonly).toBe(true);
    });

    it("readonly 时点击不应该改变 value", async () => {
      const rate = createRate({ value: 2, readonly: true });
      container.appendChild(rate);

      await waitForRender();

      const symbols = rate.shadowRoot.querySelectorAll(".ea-rate__symbol");
      symbols[3].dispatchEvent(new Event("click", { bubbles: true }));

      await waitForRender();

      expect(rate.value).toBe(2);
    });

    it("readonly 时 hover 不应该改变视觉状态", async () => {
      const rate = createRate({ readonly: true });
      container.appendChild(rate);

      await waitForRender();

      const containerEl = rate.shadowRoot.querySelector(".ea-rate");
      containerEl.dispatchEvent(new Event("mouseover", { bubbles: true }));

      const symbols = rate.shadowRoot.querySelectorAll(".ea-rate__symbol");
      symbols[2].dispatchEvent(new Event("mousemove", { bubbles: true }));

      await waitForRender();

      expect(symbols[2].classList.contains("is-selected")).toBe(false);
    });

    it("readonly 可以动态切换", async () => {
      const rate = createRate();
      container.appendChild(rate);

      await waitForRender();

      expect(rate.readonly === false || rate.readonly === null).toBe(true);

      rate.setAttribute("readonly", "");

      await waitForRender();

      expect(rate.readonly).toBe(true);

      rate.removeAttribute("readonly");

      await waitForRender();

      expect(rate.readonly === false || rate.readonly === null).toBe(true);
    });
  });

  // ==================== disabled 属性 ====================

  describe("Disabled Attribute", () => {
    it("默认 disabled 应该是 false", async () => {
      const rate = createRate();
      container.appendChild(rate);

      await waitForRender();

      expect(rate.disabled === false || rate.disabled === null).toBe(true);
    });

    it("设置 disabled 应该为 true", async () => {
      const rate = createRate({ disabled: true });
      container.appendChild(rate);

      await waitForRender();

      expect(rate.disabled).toBe(true);
    });

    it("disabled 为 true 时容器应该有 is-disabled 类", async () => {
      const rate = createRate({ disabled: true });
      container.appendChild(rate);

      await waitForRender();

      const containerEl = rate.shadowRoot.querySelector(".ea-rate");
      expect(containerEl.classList.contains("is-disabled")).toBe(true);
    });

    it("disabled 时点击不应该改变 value", async () => {
      const rate = createRate({ value: 2, disabled: true });
      container.appendChild(rate);

      await waitForRender();

      const symbols = rate.shadowRoot.querySelectorAll(".ea-rate__symbol");
      symbols[3].dispatchEvent(new Event("click", { bubbles: true }));

      await waitForRender();

      expect(rate.value).toBe(2);
    });

    it("disabled 时 hover 不应该改变视觉状态", async () => {
      const rate = createRate({ disabled: true });
      container.appendChild(rate);

      await waitForRender();

      const containerEl = rate.shadowRoot.querySelector(".ea-rate");
      containerEl.dispatchEvent(new Event("mouseover", { bubbles: true }));

      const symbols = rate.shadowRoot.querySelectorAll(".ea-rate__symbol");
      symbols[2].dispatchEvent(new Event("mousemove", { bubbles: true }));

      await waitForRender();

      expect(symbols[2].classList.contains("is-selected")).toBe(false);
    });

    it("disabled 可以动态切换", async () => {
      const rate = createRate();
      container.appendChild(rate);

      await waitForRender();

      rate.setAttribute("disabled", "");

      await waitForRender();

      expect(rate.disabled).toBe(true);

      const containerEl = rate.shadowRoot.querySelector(".ea-rate");
      expect(containerEl.classList.contains("is-disabled")).toBe(true);

      rate.removeAttribute("disabled");

      await waitForRender();

      expect(rate.disabled === false || rate.disabled === null).toBe(true);
      expect(containerEl.classList.contains("is-disabled")).toBe(false);
    });
  });

  // ==================== getSymbol 属性 ====================

  describe("getSymbol Property", () => {
    it("默认 getSymbol 应该是一个函数", async () => {
      const rate = createRate();
      container.appendChild(rate);

      await waitForRender();

      expect(typeof rate.getSymbol).toBe("function");
    });

    it("自定义 getSymbol 应该影响图标渲染", async () => {
      const rate = createRate();
      container.appendChild(rate);

      await waitForRender();

      rate.getSymbol = () => `<span class="custom-icon">★</span>`;

      await waitForRender();

      const customIcons = rate.shadowRoot.querySelectorAll(".custom-icon");
      expect(customIcons.length).toBe(5);
    });

    it("getSymbol 应该接收 value 和 isSelected 参数", async () => {
      const rate = createRate({ value: 3 });
      container.appendChild(rate);

      await waitForRender();

      const getSymbolMock = vi.fn(
        (value, isSelected) => `<span>${value}-${isSelected}</span>`
      );
      rate.getSymbol = getSymbolMock;

      await waitForRender();

      expect(getSymbolMock).toHaveBeenCalled();
      const calls = getSymbolMock.mock.calls;
      expect(calls.length).toBe(5);
      expect(calls[0][0]).toBe(0);
      expect(typeof calls[0][1]).toBe("number");
    });

    it("getSymbol 设置为非函数时不应该覆盖渲染", async () => {
      const rate = createRate();
      container.appendChild(rate);

      await waitForRender();

      const symbolsBefore =
        rate.shadowRoot.querySelectorAll(".ea-rate__symbol").length;

      rate.getSymbol = null;

      await waitForRender();

      const symbolsAfter = rate.shadowRoot.querySelectorAll(".ea-rate__symbol");
      expect(symbolsAfter.length).toBe(symbolsBefore);
    });

    it("多次切换 getSymbol 应该正确更新渲染", async () => {
      const rate = createRate();
      container.appendChild(rate);

      await waitForRender();

      rate.getSymbol = () => `<span class="icon-a">A</span>`;

      await waitForRender();

      expect(rate.shadowRoot.querySelectorAll(".icon-a").length).toBe(5);

      rate.getSymbol = () => `<span class="icon-b">B</span>`;

      await waitForRender();

      expect(rate.shadowRoot.querySelectorAll(".icon-a").length).toBe(0);
      expect(rate.shadowRoot.querySelectorAll(".icon-b").length).toBe(5);
    });
  });

  // ==================== 交互行为 ====================

  describe("Interaction Behavior", () => {
    it("点击第4个评分项应该更新 value 为 4", async () => {
      const rate = createRate();
      container.appendChild(rate);

      await waitForRender();

      const symbols = rate.shadowRoot.querySelectorAll(".ea-rate__symbol");
      symbols[3].dispatchEvent(new Event("click", { bubbles: true }));

      await waitForRender();

      expect(rate.value).toBe(4);
    });

    it("再次点击相同评分项应该取消选中 value 变为 0", async () => {
      const rate = createRate({ value: 3 });
      container.appendChild(rate);

      await waitForRender();

      expect(rate.value).toBe(3);

      const symbols = rate.shadowRoot.querySelectorAll(".ea-rate__symbol");
      symbols[2].dispatchEvent(new Event("click", { bubbles: true }));

      await waitForRender();

      expect(rate.value).toBe(0);
    });

    it("切换到不同评分项应该正确更新 value", async () => {
      const rate = createRate({ value: 3 });
      container.appendChild(rate);

      await waitForRender();

      const symbols = rate.shadowRoot.querySelectorAll(".ea-rate__symbol");
      symbols[4].dispatchEvent(new Event("click", { bubbles: true }));

      await waitForRender();

      expect(rate.value).toBe(5);
    });

    it("点击 value=0 状态下的评分项应该正确设置 value", async () => {
      const rate = createRate();
      container.appendChild(rate);

      await waitForRender();

      const symbols = rate.shadowRoot.querySelectorAll(".ea-rate__symbol");
      symbols[0].dispatchEvent(new Event("click", { bubbles: true }));

      await waitForRender();

      expect(rate.value).toBe(1);
    });

    it("hover 时应该设置视觉选中状态", async () => {
      const rate = createRate();
      container.appendChild(rate);

      await waitForRender();

      const containerEl = rate.shadowRoot.querySelector(".ea-rate");
      containerEl.dispatchEvent(new Event("mouseover", { bubbles: true }));

      const symbols = rate.shadowRoot.querySelectorAll(".ea-rate__symbol");
      symbols[2].dispatchEvent(new Event("mousemove", { bubbles: true }));

      await waitForRender();

      expect(symbols[2].classList.contains("is-selected")).toBe(true);
    });

    it("mouseout 后应该恢复 value 对应的选中状态", async () => {
      const rate = createRate({ value: 2 });
      container.appendChild(rate);

      await waitForRender();

      const containerEl = rate.shadowRoot.querySelector(".ea-rate");
      containerEl.dispatchEvent(new Event("mouseover", { bubbles: true }));

      const symbols = rate.shadowRoot.querySelectorAll(".ea-rate__symbol");
      symbols[3].dispatchEvent(new Event("mousemove", { bubbles: true }));

      await waitForRender();

      expect(symbols[3].classList.contains("is-selected")).toBe(true);

      containerEl.dispatchEvent(new Event("mouseout", { bubbles: true }));

      await waitForRender();

      expect(symbols[3].classList.contains("is-selected")).toBe(false);
      expect(symbols[1].classList.contains("is-selected")).toBe(true);
    });

    it("mouseout 且 value=0 时应该清除所有选中", async () => {
      const rate = createRate();
      container.appendChild(rate);

      await waitForRender();

      const containerEl = rate.shadowRoot.querySelector(".ea-rate");
      containerEl.dispatchEvent(new Event("mouseover", { bubbles: true }));

      const symbols = rate.shadowRoot.querySelectorAll(".ea-rate__symbol");
      symbols[2].dispatchEvent(new Event("mousemove", { bubbles: true }));

      await waitForRender();

      containerEl.dispatchEvent(new Event("mouseout", { bubbles: true }));

      await waitForRender();

      symbols.forEach(symbol => {
        expect(symbol.classList.contains("is-selected")).toBe(false);
      });
    });
  });

  // ==================== change 事件 ====================

  describe("Change Event", () => {
    it("点击评分项应该触发 change 事件", async () => {
      const rate = createRate();
      container.appendChild(rate);

      await waitForRender();

      const changeHandler = vi.fn();
      rate.addEventListener("change", changeHandler);

      const symbols = rate.shadowRoot.querySelectorAll(".ea-rate__symbol");
      symbols[2].dispatchEvent(new Event("click", { bubbles: true }));

      await waitForRender();

      expect(changeHandler).toHaveBeenCalledTimes(1);
    });

    it("change 事件应该是 EaRateChangeEvent 实例", async () => {
      const rate = createRate();
      container.appendChild(rate);

      await waitForRender();

      let caughtEvent = null;
      rate.addEventListener("change", e => {
        caughtEvent = e;
      });

      const symbols = rate.shadowRoot.querySelectorAll(".ea-rate__symbol");
      symbols[2].dispatchEvent(new Event("click", { bubbles: true }));

      await waitForRender();

      expect(caughtEvent).toBeTruthy();
      expect(caughtEvent.type).toBe("change");
      expect(caughtEvent.detail).toBeTruthy();
      expect(caughtEvent.detail.value).toBe(3);
    });

    it("取消选中时 change 事件 value 应为点击的评分显示值", async () => {
      const rate = createRate({ value: 3 });
      container.appendChild(rate);

      await waitForRender();

      let eventDetail = null;
      rate.addEventListener("change", e => {
        eventDetail = e.detail;
      });

      const symbols = rate.shadowRoot.querySelectorAll(".ea-rate__symbol");
      symbols[2].dispatchEvent(new Event("click", { bubbles: true }));

      await waitForRender();

      expect(eventDetail.value).toBe(3);
      expect(rate.value).toBe(0);
    });

    it("readonly 时不应该触发 change 事件", async () => {
      const rate = createRate({ readonly: true });
      container.appendChild(rate);

      await waitForRender();

      const changeHandler = vi.fn();
      rate.addEventListener("change", changeHandler);

      const symbols = rate.shadowRoot.querySelectorAll(".ea-rate__symbol");
      symbols[2].dispatchEvent(new Event("click", { bubbles: true }));

      await waitForRender();

      expect(changeHandler).not.toHaveBeenCalled();
    });

    it("disabled 时不应该触发 change 事件", async () => {
      const rate = createRate({ disabled: true });
      container.appendChild(rate);

      await waitForRender();

      const changeHandler = vi.fn();
      rate.addEventListener("change", changeHandler);

      const symbols = rate.shadowRoot.querySelectorAll(".ea-rate__symbol");
      symbols[2].dispatchEvent(new Event("click", { bubbles: true }));

      await waitForRender();

      expect(changeHandler).not.toHaveBeenCalled();
    });
  });

  // ==================== ea-hover 事件 ====================

  describe("EaHover Event", () => {
    it("鼠标移入评分项应该触发 ea-hover 事件", async () => {
      const rate = createRate();
      container.appendChild(rate);

      await waitForRender();

      const hoverHandler = vi.fn();
      rate.addEventListener("ea-hover", hoverHandler);

      const containerEl = rate.shadowRoot.querySelector(".ea-rate");
      containerEl.dispatchEvent(new Event("mouseover", { bubbles: true }));

      const symbols = rate.shadowRoot.querySelectorAll(".ea-rate__symbol");
      symbols[2].dispatchEvent(new Event("mousemove", { bubbles: true }));

      await waitForRender();

      expect(hoverHandler).toHaveBeenCalled();
    });

    it("ea-hover 事件应该是 EaRateHoverEvent 实例", async () => {
      const rate = createRate();
      container.appendChild(rate);

      await waitForRender();

      let caughtEvent = null;
      rate.addEventListener("ea-hover", e => {
        caughtEvent = e;
      });

      const containerEl = rate.shadowRoot.querySelector(".ea-rate");
      containerEl.dispatchEvent(new Event("mouseover", { bubbles: true }));

      const symbols = rate.shadowRoot.querySelectorAll(".ea-rate__symbol");
      symbols[2].dispatchEvent(new Event("mousemove", { bubbles: true }));

      await waitForRender();

      expect(caughtEvent).toBeTruthy();
      expect(caughtEvent.type).toBe("ea-hover");
      expect(caughtEvent.detail).toBeTruthy();
      expect(caughtEvent.detail.value).toBe(2);
      expect(caughtEvent.detail.target).toBeTruthy();
    });

    it("ea-hover 事件的 value 应该是 0-based 下标", async () => {
      const rate = createRate();
      container.appendChild(rate);

      await waitForRender();

      let eventDetail = null;
      rate.addEventListener("ea-hover", e => {
        eventDetail = e.detail;
      });

      const containerEl = rate.shadowRoot.querySelector(".ea-rate");
      containerEl.dispatchEvent(new Event("mouseover", { bubbles: true }));

      const symbols = rate.shadowRoot.querySelectorAll(".ea-rate__symbol");
      symbols[0].dispatchEvent(new Event("mousemove", { bubbles: true }));

      await waitForRender();

      expect(eventDetail.value).toBe(0);
    });

    it("同一评分项上重复 mousemove 不应该重复触发 ea-hover", async () => {
      const rate = createRate();
      container.appendChild(rate);

      await waitForRender();

      const hoverHandler = vi.fn();
      rate.addEventListener("ea-hover", hoverHandler);

      const containerEl = rate.shadowRoot.querySelector(".ea-rate");
      containerEl.dispatchEvent(new Event("mouseover", { bubbles: true }));

      const symbols = rate.shadowRoot.querySelectorAll(".ea-rate__symbol");
      symbols[2].dispatchEvent(new Event("mousemove", { bubbles: true }));
      symbols[2].dispatchEvent(new Event("mousemove", { bubbles: true }));
      symbols[2].dispatchEvent(new Event("mousemove", { bubbles: true }));

      await waitForRender();

      expect(hoverHandler).toHaveBeenCalledTimes(1);
    });

    it("mouseout 且 value 有值时 ea-hover 事件 value 应为恢复后的选中下标", async () => {
      const rate = createRate({ value: 2 });
      container.appendChild(rate);

      await waitForRender();

      let eventDetail = null;
      rate.addEventListener("ea-hover", e => {
        eventDetail = e.detail;
      });

      const containerEl = rate.shadowRoot.querySelector(".ea-rate");
      containerEl.dispatchEvent(new Event("mouseover", { bubbles: true }));

      const symbols = rate.shadowRoot.querySelectorAll(".ea-rate__symbol");
      symbols[3].dispatchEvent(new Event("mousemove", { bubbles: true }));

      await waitForRender();

      containerEl.dispatchEvent(new Event("mouseout", { bubbles: true }));

      await waitForRender();

      expect(eventDetail.value).toBe(1);
      expect(eventDetail.target).toBeTruthy();
    });

    it("mouseout 且 value=0 时 ea-hover 事件 value 应为 null", async () => {
      const rate = createRate();
      container.appendChild(rate);

      await waitForRender();

      let eventDetail = null;
      rate.addEventListener("ea-hover", e => {
        eventDetail = e.detail;
      });

      const containerEl = rate.shadowRoot.querySelector(".ea-rate");
      containerEl.dispatchEvent(new Event("mouseover", { bubbles: true }));

      const symbols = rate.shadowRoot.querySelectorAll(".ea-rate__symbol");
      symbols[2].dispatchEvent(new Event("mousemove", { bubbles: true }));

      await waitForRender();

      containerEl.dispatchEvent(new Event("mouseout", { bubbles: true }));

      await waitForRender();

      expect(eventDetail.value).toBe(null);
      expect(eventDetail.target).toBe(null);
    });

    it("readonly 时不应该触发 ea-hover 事件", async () => {
      const rate = createRate({ readonly: true });
      container.appendChild(rate);

      await waitForRender();

      const hoverHandler = vi.fn();
      rate.addEventListener("ea-hover", hoverHandler);

      const containerEl = rate.shadowRoot.querySelector(".ea-rate");
      containerEl.dispatchEvent(new Event("mouseover", { bubbles: true }));

      const symbols = rate.shadowRoot.querySelectorAll(".ea-rate__symbol");
      symbols[2].dispatchEvent(new Event("mousemove", { bubbles: true }));

      await waitForRender();

      expect(hoverHandler).not.toHaveBeenCalled();
    });

    it("disabled 时不应该触发 ea-hover 事件", async () => {
      const rate = createRate({ disabled: true });
      container.appendChild(rate);

      await waitForRender();

      const hoverHandler = vi.fn();
      rate.addEventListener("ea-hover", hoverHandler);

      const containerEl = rate.shadowRoot.querySelector(".ea-rate");
      containerEl.dispatchEvent(new Event("mouseover", { bubbles: true }));

      const symbols = rate.shadowRoot.querySelectorAll(".ea-rate__symbol");
      symbols[2].dispatchEvent(new Event("mousemove", { bubbles: true }));

      await waitForRender();

      expect(hoverHandler).not.toHaveBeenCalled();
    });

    it("hover 后续 mouseout 后重新 mouseover 应可再次触发 ea-hover", async () => {
      const rate = createRate();
      container.appendChild(rate);

      await waitForRender();

      const hoverHandler = vi.fn();
      rate.addEventListener("ea-hover", hoverHandler);

      const containerEl = rate.shadowRoot.querySelector(".ea-rate");
      const symbols = rate.shadowRoot.querySelectorAll(".ea-rate__symbol");

      containerEl.dispatchEvent(new Event("mouseover", { bubbles: true }));
      symbols[1].dispatchEvent(new Event("mousemove", { bubbles: true }));

      await waitForRender();

      containerEl.dispatchEvent(new Event("mouseout", { bubbles: true }));

      await waitForRender();

      containerEl.dispatchEvent(new Event("mouseover", { bubbles: true }));
      symbols[1].dispatchEvent(new Event("mousemove", { bubbles: true }));

      await waitForRender();

      expect(hoverHandler).toHaveBeenCalledTimes(3);
    });
  });

  // ==================== 表单关联 ====================

  describe("Form Association", () => {
    it("应该拥有 internals", async () => {
      const rate = createRate();
      container.appendChild(rate);

      await waitForRender();

      expect(rate.internals).toBeTruthy();
    });

    it("validationTarget 应该返回组件自身", async () => {
      const rate = createRate();
      container.appendChild(rate);

      await waitForRender();

      expect(rate.validationTarget).toBe(rate);
    });

    it("应该支持 name 属性", async () => {
      const rate = createRate({ name: "rating" });
      container.appendChild(rate);

      await waitForRender();

      expect(rate.name).toBe("rating");
      expect(rate.getAttribute("name")).toBe("rating");
    });

    it("setValue 应该更新表单值", async () => {
      const rate = createRate({ value: 3 });
      container.appendChild(rate);

      await waitForRender();

      rate.setValue("3");

      await waitForRender();

      expect(rate.value).toBe(3);
    });
  });

  // ==================== 生命周期 ====================

  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化渲染", async () => {
      const rate = createRate({ value: 3 });
      container.appendChild(rate);

      await waitForRender();

      expect(rate.shadowRoot).toBeTruthy();
      expect(rate.value).toBe(3);
      expect(rate.shadowRoot.querySelectorAll(".ea-rate__symbol").length).toBe(
        5
      );
    });

    it("组件断开连接后 isConnected 应为 false", async () => {
      const rate = createRate();
      container.appendChild(rate);

      await waitForRender();

      rate.remove();

      expect(rate.isConnected).toBe(false);
    });

    it("组件应该在 $mount 中正确初始化容器类名", async () => {
      const rate = createRate({ size: "large", disabled: true });
      container.appendChild(rate);

      await waitForRender();

      const containerEl = rate.shadowRoot.querySelector(".ea-rate");
      expect(containerEl.classList.contains("ea-rate--large")).toBe(true);
      expect(containerEl.classList.contains("is-disabled")).toBe(true);
    });

    it("$beforeUnmount 应该清理 hover 监听", async () => {
      const rate = createRate();
      container.appendChild(rate);

      await waitForRender();

      const containerEl = rate.shadowRoot.querySelector(".ea-rate");
      containerEl.dispatchEvent(new Event("mouseover", { bubbles: true }));

      rate.remove();

      const hoverHandler = vi.fn();
      rate.addEventListener("ea-hover", hoverHandler);

      const symbols = rate.shadowRoot.querySelectorAll(".ea-rate__symbol");
      symbols[2].dispatchEvent(new Event("mousemove", { bubbles: true }));

      await waitForRender();

      expect(hoverHandler).not.toHaveBeenCalled();
    });
  });

  // ==================== 边界条件 ====================

  describe("Edge Cases", () => {
    it("max=0 时不应渲染任何评分项", async () => {
      const rate = createRate({ max: 0 });
      container.appendChild(rate);

      await waitForRender();

      const symbols = rate.shadowRoot.querySelectorAll(".ea-rate__symbol");
      expect(symbols.length).toBe(0);
    });

    it("value > max 时选中状态不应超出 max 范围", async () => {
      const rate = createRate({ max: 3, value: 5 });
      container.appendChild(rate);

      await waitForRender();

      expect(rate.value).toBe(5);
      expect(rate.max).toBe(3);

      const symbols = rate.shadowRoot.querySelectorAll(".ea-rate__symbol");
      expect(symbols.length).toBe(3);
      expect(symbols[0].classList.contains("is-selected")).toBe(true);
      expect(symbols[1].classList.contains("is-selected")).toBe(true);
      expect(symbols[2].classList.contains("is-selected")).toBe(true);
    });

    it("负数 value 不应崩溃", async () => {
      const rate = createRate({ value: -1 });
      container.appendChild(rate);

      await waitForRender();

      expect(rate.value).toBe(-1);

      const symbols = rate.shadowRoot.querySelectorAll(".ea-rate__symbol");
      symbols.forEach(symbol => {
        expect(symbol.classList.contains("is-selected")).toBe(false);
      });
    });

    it("value 被移除后应恢复为默认值 0", async () => {
      const rate = createRate({ value: 3 });
      container.appendChild(rate);

      await waitForRender();

      expect(rate.value).toBe(3);

      rate.removeAttribute("value");

      await waitForRender();

      expect(rate.value).toBe(0);
    });

    it("连续快速切换 value 不应出现状态错乱", async () => {
      const rate = createRate();
      container.appendChild(rate);

      await waitForRender();

      rate.setAttribute("value", "1");
      rate.setAttribute("value", "3");
      rate.setAttribute("value", "0");
      rate.setAttribute("value", "5");

      await waitForRender();

      expect(rate.value).toBe(5);

      const symbols = rate.shadowRoot.querySelectorAll(".ea-rate__symbol");
      expect(symbols[4].classList.contains("is-selected")).toBe(true);
      expect(symbols[0].classList.contains("is-selected")).toBe(true);
    });

    it("value 小数应该正确转换为整数", async () => {
      const rate = createRate({ value: 2.7 });
      container.appendChild(rate);

      await waitForRender();

      expect(rate.value).toBe(2.7);

      const symbols = rate.shadowRoot.querySelectorAll(".ea-rate__symbol");
      expect(symbols[1].classList.contains("is-selected")).toBe(true);
    });

    it("非法的 size 值不应该添加未知修饰类", async () => {
      const rate = createRate({ size: "x-large" });
      container.appendChild(rate);

      await waitForRender();

      const containerEl = rate.shadowRoot.querySelector(".ea-rate");
      expect(containerEl.classList.contains("ea-rate--x-large")).toBe(false);
    });
  });

  describe("Accessibility", () => {
    it("默认状态应该无 a11y 违规", async () => {
      const el = document.createElement("ea-rate");
      container.appendChild(el);
      await waitForRender();
      const results = await runAxe(el);
      assertNoA11yViolations(results);
    });

    it("disabled 状态应该无 a11y 违规", async () => {
      const el = document.createElement("ea-rate");
      el.setAttribute("disabled", "");
      container.appendChild(el);
      await waitForRender();
      const results = await runAxe(el);
      assertNoA11yViolations(results);
    });

    describe("ARIA Attributes", () => {
      it("宿主元素应该有 role=radiogroup", async () => {
        const el = document.createElement("ea-rate");
        container.appendChild(el);
        await waitForRender();
        expect(el.getAttribute("role")).toBe("radiogroup");
      });

      it("每个评分项应该有 role=radio", async () => {
        const el = document.createElement("ea-rate");
        container.appendChild(el);
        await waitForRender();
        const symbols = el.shadowRoot.querySelectorAll(".ea-rate__symbol");
        symbols.forEach(symbol => {
          expect(symbol.getAttribute("role")).toBe("radio");
        });
      });

      it("value=3 时第3项应该有 aria-checked=true", async () => {
        const el = document.createElement("ea-rate");
        el.value = 3;
        container.appendChild(el);
        await waitForRender();
        const symbols = el.shadowRoot.querySelectorAll(".ea-rate__symbol");
        expect(symbols[2].getAttribute("aria-checked")).toBe("true");
      });

      it("value=3 时非选中项应该有 aria-checked=false", async () => {
        const el = document.createElement("ea-rate");
        el.value = 3;
        container.appendChild(el);
        await waitForRender();
        const symbols = el.shadowRoot.querySelectorAll(".ea-rate__symbol");
        expect(symbols[0].getAttribute("aria-checked")).toBe("false");
        expect(symbols[3].getAttribute("aria-checked")).toBe("false");
      });

      it("disabled 时宿主元素应该有 aria-disabled=true", async () => {
        const el = document.createElement("ea-rate");
        el.disabled = true;
        container.appendChild(el);
        await waitForRender();
        expect(el.getAttribute("aria-disabled")).toBe("true");
      });

      it("每个评分项应该有 aria-label", async () => {
        const el = document.createElement("ea-rate");
        container.appendChild(el);
        await waitForRender();
        const symbols = el.shadowRoot.querySelectorAll(".ea-rate__symbol");
        symbols.forEach(symbol => {
          expect(symbol.getAttribute("aria-label")).toBeTruthy();
        });
      });

      it("value 变化时 aria-checked 应该同步更新", async () => {
        const el = document.createElement("ea-rate");
        el.value = 2;
        container.appendChild(el);
        await waitForRender();
        el.value = 4;
        await waitForRender();
        const symbols = el.shadowRoot.querySelectorAll(".ea-rate__symbol");
        expect(symbols[3].getAttribute("aria-checked")).toBe("true");
        expect(symbols[1].getAttribute("aria-checked")).toBe("false");
      });
    });

    describe("Keyboard Interaction", () => {
      it("ArrowRight 应该移动焦点到下一个评分项", async () => {
        const el = document.createElement("ea-rate");
        el.value = 2;
        container.appendChild(el);
        await waitForRender();
        const symbols = el.shadowRoot.querySelectorAll(".ea-rate__symbol");
        symbols[1].dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
        await waitForRender();
        expect(el.value).toBe(3);
      });

      it("ArrowLeft 应该移动焦点到上一个评分项", async () => {
        const el = document.createElement("ea-rate");
        el.value = 3;
        container.appendChild(el);
        await waitForRender();
        const symbols = el.shadowRoot.querySelectorAll(".ea-rate__symbol");
        symbols[2].dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true }));
        await waitForRender();
        expect(el.value).toBe(2);
      });

      it("Space 应该选中当前评分项", async () => {
        const el = document.createElement("ea-rate");
        el.value = 0;
        container.appendChild(el);
        await waitForRender();
        const symbols = el.shadowRoot.querySelectorAll(".ea-rate__symbol");
        symbols[2].dispatchEvent(new KeyboardEvent("keydown", { key: " ", bubbles: true }));
        await waitForRender();
        expect(el.value).toBe(3);
      });

      it("disabled 时键盘操作不应该改变 value", async () => {
        const el = document.createElement("ea-rate");
        el.value = 2;
        el.disabled = true;
        container.appendChild(el);
        await waitForRender();
        const symbols = el.shadowRoot.querySelectorAll(".ea-rate__symbol");
        symbols[1].dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
        await waitForRender();
        expect(el.value).toBe(2);
      });

      it("readonly 时键盘操作不应该改变 value", async () => {
        const el = document.createElement("ea-rate");
        el.value = 2;
        el.readonly = true;
        container.appendChild(el);
        await waitForRender();
        const symbols = el.shadowRoot.querySelectorAll(".ea-rate__symbol");
        symbols[1].dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
        await waitForRender();
        expect(el.value).toBe(2);
      });
    });
  });
});
