import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

import "../components/ea-statistic/index.ts";
import { waitForRender } from "./utils/waitForRender.js";

describe("EaStatistic Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe("Basic Functionality", () => {
    it("应该正确渲染组件并挂载 Shadow DOM", async () => {
      const statistic = document.createElement("ea-statistic");
      container.appendChild(statistic);

      await waitForRender();

      expect(statistic.shadowRoot).toBeTruthy();
    });

    it("应该包含 ea-statistic 根容器", async () => {
      const statistic = document.createElement("ea-statistic");
      container.appendChild(statistic);

      await waitForRender();

      const root = statistic.shadowRoot.querySelector(".ea-statistic");
      expect(root).toBeTruthy();
    });

    it("根容器应该有 container part", async () => {
      const statistic = document.createElement("ea-statistic");
      container.appendChild(statistic);

      await waitForRender();

      const containerEl =
        statistic.shadowRoot.querySelector('[part="container"]');
      expect(containerEl).toBeTruthy();
      expect(containerEl.classList.contains("ea-statistic")).toBe(true);
    });

    it("应该渲染 header 元素", async () => {
      const statistic = document.createElement("ea-statistic");
      container.appendChild(statistic);

      await waitForRender();

      const header = statistic.shadowRoot.querySelector(
        ".ea-statistic__header"
      );
      expect(header).toBeTruthy();
      expect(header.tagName.toLowerCase()).toBe("header");
    });

    it("应该渲染 content 元素", async () => {
      const statistic = document.createElement("ea-statistic");
      container.appendChild(statistic);

      await waitForRender();

      const content = statistic.shadowRoot.querySelector(
        ".ea-statistic__content"
      );
      expect(content).toBeTruthy();
      expect(content.tagName.toLowerCase()).toBe("main");
    });

    it("应该渲染 number 元素", async () => {
      const statistic = document.createElement("ea-statistic");
      container.appendChild(statistic);

      await waitForRender();

      const number = statistic.shadowRoot.querySelector(
        ".ea-statistic__number"
      );
      expect(number).toBeTruthy();
    });

    it("应该渲染 prefix 元素", async () => {
      const statistic = document.createElement("ea-statistic");
      container.appendChild(statistic);

      await waitForRender();

      const prefix = statistic.shadowRoot.querySelector(
        ".ea-statistic__prefix"
      );
      expect(prefix).toBeTruthy();
    });

    it("应该渲染 suffix 元素", async () => {
      const statistic = document.createElement("ea-statistic");
      container.appendChild(statistic);

      await waitForRender();

      const suffix = statistic.shadowRoot.querySelector(
        ".ea-statistic__suffix"
      );
      expect(suffix).toBeTruthy();
    });
  });

  describe("CSS Parts", () => {
    it("应该支持 container part", async () => {
      const statistic = document.createElement("ea-statistic");
      container.appendChild(statistic);

      await waitForRender();

      expect(
        statistic.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
    });

    it("应该支持 title part", async () => {
      const statistic = document.createElement("ea-statistic");
      container.appendChild(statistic);

      await waitForRender();

      expect(statistic.shadowRoot.querySelector('[part="title"]')).toBeTruthy();
    });

    it("应该支持 content part", async () => {
      const statistic = document.createElement("ea-statistic");
      container.appendChild(statistic);

      await waitForRender();

      expect(
        statistic.shadowRoot.querySelector('[part="content"]')
      ).toBeTruthy();
    });

    it("应该支持 prefix part", async () => {
      const statistic = document.createElement("ea-statistic");
      container.appendChild(statistic);

      await waitForRender();

      expect(
        statistic.shadowRoot.querySelector('[part="prefix"]')
      ).toBeTruthy();
    });

    it("应该支持 number part", async () => {
      const statistic = document.createElement("ea-statistic");
      container.appendChild(statistic);

      await waitForRender();

      expect(
        statistic.shadowRoot.querySelector('[part="number"]')
      ).toBeTruthy();
    });

    it("应该支持 suffix part", async () => {
      const statistic = document.createElement("ea-statistic");
      container.appendChild(statistic);

      await waitForRender();

      expect(
        statistic.shadowRoot.querySelector('[part="suffix"]')
      ).toBeTruthy();
    });
  });

  describe("Heading Attribute", () => {
    it("默认 heading 应该是空字符串", async () => {
      const statistic = document.createElement("ea-statistic");
      container.appendChild(statistic);

      await waitForRender();

      expect(statistic.heading).toBe("");
    });

    it("应该支持 heading 属性", async () => {
      const statistic = document.createElement("ea-statistic");
      statistic.setAttribute("heading", "Test Title");
      container.appendChild(statistic);

      await waitForRender();

      expect(statistic.heading).toBe("Test Title");
    });

    it("heading 属性应该更新 header 元素的文本内容", async () => {
      const statistic = document.createElement("ea-statistic");
      statistic.setAttribute("heading", "Daily Active Users");
      container.appendChild(statistic);

      await waitForRender();

      const header = statistic.shadowRoot.querySelector(
        ".ea-statistic__header"
      );
      expect(header.textContent).toBe("Daily Active Users");
    });

    it("动态修改 heading 应该更新 header 文本", async () => {
      const statistic = document.createElement("ea-statistic");
      statistic.setAttribute("heading", "Old Title");
      container.appendChild(statistic);

      await waitForRender();

      statistic.setAttribute("heading", "New Title");
      await waitForRender();

      const header = statistic.shadowRoot.querySelector(
        ".ea-statistic__header"
      );
      expect(header.textContent).toBe("New Title");
      expect(statistic.heading).toBe("New Title");
    });

    it("heading 为空时 header 文本应为空（未设置 heading 属性时 header 包含 slot）", async () => {
      const statistic = document.createElement("ea-statistic");
      container.appendChild(statistic);

      await waitForRender();

      const header = statistic.shadowRoot.querySelector(
        ".ea-statistic__header"
      );
      expect(header.textContent.trim()).toBe("");
    });
  });

  describe("Value Attribute", () => {
    it("默认 value 应该是 0", async () => {
      const statistic = document.createElement("ea-statistic");
      container.appendChild(statistic);

      await waitForRender();

      expect(statistic.value).toBe(0);
    });

    it("应该支持 value 属性（整数）", async () => {
      const statistic = document.createElement("ea-statistic");
      statistic.setAttribute("value", "1000");
      container.appendChild(statistic);

      await waitForRender();

      expect(statistic.value).toBe(1000);
    });

    it("应该支持 value 属性（小数）", async () => {
      const statistic = document.createElement("ea-statistic");
      statistic.setAttribute("value", "1234.56");
      container.appendChild(statistic);

      await waitForRender();

      expect(statistic.value).toBe(1234.56);
    });

    it("value 应该格式化为本地数字格式", async () => {
      const statistic = document.createElement("ea-statistic");
      statistic.setAttribute("value", "1000000");
      container.appendChild(statistic);

      await waitForRender();

      const numberEl = statistic.shadowRoot.querySelector(
        ".ea-statistic__number"
      );
      expect(numberEl.textContent).toBe("1,000,000");
    });

    it("value 为 0 时 number 元素应该显示 0", async () => {
      const statistic = document.createElement("ea-statistic");
      statistic.setAttribute("value", "0");
      container.appendChild(statistic);

      await waitForRender();

      const numberEl = statistic.shadowRoot.querySelector(
        ".ea-statistic__number"
      );
      expect(numberEl.textContent).toBe("0");
    });

    it("value 为小数字时应该正确格式化", async () => {
      const statistic = document.createElement("ea-statistic");
      statistic.setAttribute("value", "1234.56");
      container.appendChild(statistic);

      await waitForRender();

      const numberEl = statistic.shadowRoot.querySelector(
        ".ea-statistic__number"
      );
      expect(numberEl.textContent).toBe("1,234.56");
    });

    it("动态修改 value 应该更新 number 文本", async () => {
      const statistic = document.createElement("ea-statistic");
      statistic.setAttribute("value", "500");
      container.appendChild(statistic);

      await waitForRender();

      statistic.setAttribute("value", "999999");
      await waitForRender();

      const numberEl = statistic.shadowRoot.querySelector(
        ".ea-statistic__number"
      );
      expect(numberEl.textContent).toBe("999,999");
      expect(statistic.value).toBe(999999);
    });

    it("value 为负数时应该正确显示", async () => {
      const statistic = document.createElement("ea-statistic");
      statistic.setAttribute("value", "-1000");
      container.appendChild(statistic);

      await waitForRender();

      expect(statistic.value).toBe(-1000);
      const numberEl = statistic.shadowRoot.querySelector(
        ".ea-statistic__number"
      );
      expect(numberEl.textContent).toBe("-1,000");
    });
  });

  describe("Slots", () => {
    it("应该支持 title 插槽", async () => {
      const statistic = document.createElement("ea-statistic");
      statistic.innerHTML = `<div slot="title">Custom Title</div>`;
      container.appendChild(statistic);

      await waitForRender();

      const titleSlot =
        statistic.shadowRoot.querySelector('slot[name="title"]');
      expect(titleSlot).toBeTruthy();
    });

    it("应该支持 prefix 插槽", async () => {
      const statistic = document.createElement("ea-statistic");
      statistic.innerHTML = `<div slot="prefix">$</div>`;
      container.appendChild(statistic);

      await waitForRender();

      const prefixSlot = statistic.shadowRoot.querySelector(
        'slot[name="prefix"]'
      );
      expect(prefixSlot).toBeTruthy();
    });

    it("应该支持 suffix 插槽", async () => {
      const statistic = document.createElement("ea-statistic");
      statistic.innerHTML = `<div slot="suffix">%</div>`;
      container.appendChild(statistic);

      await waitForRender();

      const suffixSlot = statistic.shadowRoot.querySelector(
        'slot[name="suffix"]'
      );
      expect(suffixSlot).toBeTruthy();
    });

    it("应该支持默认插槽", async () => {
      const statistic = document.createElement("ea-statistic");
      statistic.innerHTML = `<span>Custom Content</span>`;
      container.appendChild(statistic);

      await waitForRender();

      const defaultSlot =
        statistic.shadowRoot.querySelector("slot:not([name])");
      expect(defaultSlot).toBeTruthy();
    });

    it("title 插槽应该位于 header 元素内", async () => {
      const statistic = document.createElement("ea-statistic");
      statistic.innerHTML = `<div slot="title">Slotted Title</div>`;
      container.appendChild(statistic);

      await waitForRender();

      const header = statistic.shadowRoot.querySelector(
        ".ea-statistic__header"
      );
      const titleSlot = header.querySelector('slot[name="title"]');
      expect(titleSlot).toBeTruthy();
    });

    it("prefix 插槽应该位于 prefix 元素内", async () => {
      const statistic = document.createElement("ea-statistic");
      statistic.innerHTML = `<div slot="prefix">$</div>`;
      container.appendChild(statistic);

      await waitForRender();

      const prefix = statistic.shadowRoot.querySelector(
        ".ea-statistic__prefix"
      );
      const prefixSlot = prefix.querySelector('slot[name="prefix"]');
      expect(prefixSlot).toBeTruthy();
    });

    it("suffix 插槽应该位于 suffix 元素内", async () => {
      const statistic = document.createElement("ea-statistic");
      statistic.innerHTML = `<div slot="suffix">%</div>`;
      container.appendChild(statistic);

      await waitForRender();

      const suffix = statistic.shadowRoot.querySelector(
        ".ea-statistic__suffix"
      );
      const suffixSlot = suffix.querySelector('slot[name="suffix"]');
      expect(suffixSlot).toBeTruthy();
    });

    it("默认插槽应该位于 number 元素内", async () => {
      const statistic = document.createElement("ea-statistic");
      statistic.innerHTML = `<span>Custom Number</span>`;
      container.appendChild(statistic);

      await waitForRender();

      const number = statistic.shadowRoot.querySelector(
        ".ea-statistic__number"
      );
      const defaultSlot = number.querySelector("slot:not([name])");
      expect(defaultSlot).toBeTruthy();
    });
  });

  describe("BEM Class Names", () => {
    it("根容器应该有 ea-statistic 类名", async () => {
      const statistic = document.createElement("ea-statistic");
      container.appendChild(statistic);

      await waitForRender();

      const root = statistic.shadowRoot.querySelector(".ea-statistic");
      expect(root).toBeTruthy();
    });

    it("header 应该有 ea-statistic__header 类名", async () => {
      const statistic = document.createElement("ea-statistic");
      container.appendChild(statistic);

      await waitForRender();

      const header = statistic.shadowRoot.querySelector(
        ".ea-statistic__header"
      );
      expect(header).toBeTruthy();
    });

    it("content 应该有 ea-statistic__content 类名", async () => {
      const statistic = document.createElement("ea-statistic");
      container.appendChild(statistic);

      await waitForRender();

      const content = statistic.shadowRoot.querySelector(
        ".ea-statistic__content"
      );
      expect(content).toBeTruthy();
    });

    it("prefix 应该有 ea-statistic__prefix 类名", async () => {
      const statistic = document.createElement("ea-statistic");
      container.appendChild(statistic);

      await waitForRender();

      const prefix = statistic.shadowRoot.querySelector(
        ".ea-statistic__prefix"
      );
      expect(prefix).toBeTruthy();
    });

    it("number 应该有 ea-statistic__number 类名", async () => {
      const statistic = document.createElement("ea-statistic");
      container.appendChild(statistic);

      await waitForRender();

      const number = statistic.shadowRoot.querySelector(
        ".ea-statistic__number"
      );
      expect(number).toBeTruthy();
    });

    it("suffix 应该有 ea-statistic__suffix 类名", async () => {
      const statistic = document.createElement("ea-statistic");
      container.appendChild(statistic);

      await waitForRender();

      const suffix = statistic.shadowRoot.querySelector(
        ".ea-statistic__suffix"
      );
      expect(suffix).toBeTruthy();
    });
  });

  describe("DOM Structure", () => {
    it("content 内部应该包含 prefix、number、suffix 按顺序排列", async () => {
      const statistic = document.createElement("ea-statistic");
      container.appendChild(statistic);

      await waitForRender();

      const content = statistic.shadowRoot.querySelector(
        ".ea-statistic__content"
      );
      const children = Array.from(content.children).map(el =>
        el.tagName.toLowerCase()
      );
      expect(children).toEqual(["span", "span", "span"]);
    });

    it("header 应该在 content 之前", async () => {
      const statistic = document.createElement("ea-statistic");
      container.appendChild(statistic);

      await waitForRender();

      const root = statistic.shadowRoot.querySelector(".ea-statistic");
      const children = Array.from(root.children).map(el =>
        el.tagName.toLowerCase()
      );
      expect(children[0]).toBe("header");
      expect(children[1]).toBe("main");
    });
  });

  describe("Attribute Change", () => {
    it("同时设置 heading 和 value 应该正确渲染", async () => {
      const statistic = document.createElement("ea-statistic");
      statistic.setAttribute("heading", "Total Users");
      statistic.setAttribute("value", "268500");
      container.appendChild(statistic);

      await waitForRender();

      expect(statistic.heading).toBe("Total Users");
      expect(statistic.value).toBe(268500);

      const header = statistic.shadowRoot.querySelector(
        ".ea-statistic__header"
      );
      const number = statistic.shadowRoot.querySelector(
        ".ea-statistic__number"
      );
      expect(header.textContent).toBe("Total Users");
      expect(number.textContent).toBe("268,500");
    });

    it("移除 heading 属性应该恢复默认值", async () => {
      const statistic = document.createElement("ea-statistic");
      statistic.setAttribute("heading", "Test");
      container.appendChild(statistic);

      await waitForRender();

      statistic.removeAttribute("heading");
      await waitForRender();

      expect(statistic.heading).toBe("");
    });

    it("移除 value 属性应该恢复默认值", async () => {
      const statistic = document.createElement("ea-statistic");
      statistic.setAttribute("value", "1000");
      container.appendChild(statistic);

      await waitForRender();

      statistic.removeAttribute("value");
      await waitForRender();

      expect(statistic.value).toBe(0);
    });
  });

  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const statistic = document.createElement("ea-statistic");
      statistic.setAttribute("heading", "Test");
      statistic.setAttribute("value", "100");
      container.appendChild(statistic);

      await waitForRender();

      expect(statistic.shadowRoot).toBeTruthy();
      expect(statistic.heading).toBe("Test");
      expect(statistic.value).toBe(100);
    });

    it("组件断开连接后应该正常移除", async () => {
      const statistic = document.createElement("ea-statistic");
      container.appendChild(statistic);

      await waitForRender();

      statistic.remove();

      await waitForRender();

      expect(statistic.isConnected).toBe(false);
    });

    it("组件重新连接后应该正常工作", async () => {
      const statistic = document.createElement("ea-statistic");
      statistic.setAttribute("heading", "Reconnect Test");
      statistic.setAttribute("value", "42");
      container.appendChild(statistic);

      await waitForRender();

      statistic.remove();
      await waitForRender();

      container.appendChild(statistic);
      await waitForRender();

      expect(statistic.isConnected).toBe(true);
      expect(statistic.heading).toBe("Reconnect Test");
      expect(statistic.value).toBe(42);
    });
  });

  describe("Edge Cases", () => {
    it("value 为非常大的数字时应该正确格式化", async () => {
      const statistic = document.createElement("ea-statistic");
      statistic.setAttribute("value", "9999999999");
      container.appendChild(statistic);

      await waitForRender();

      const numberEl = statistic.shadowRoot.querySelector(
        ".ea-statistic__number"
      );
      expect(numberEl.textContent).toBe("9,999,999,999");
    });

    it("value 为非数字字符串时应该回退到 null", async () => {
      const statistic = document.createElement("ea-statistic");
      statistic.setAttribute("value", "abc");
      container.appendChild(statistic);

      await waitForRender();

      expect(statistic.value).toBeNull();
    });

    it("设置 heading 属性后 header 的 slot 会被替换为文本", async () => {
      const statistic = document.createElement("ea-statistic");
      statistic.innerHTML = `<div slot="title">Slot Title</div>`;
      container.appendChild(statistic);

      await waitForRender();

      const headerBefore = statistic.shadowRoot.querySelector(
        ".ea-statistic__header"
      );
      expect(headerBefore.querySelector('slot[name="title"]')).toBeTruthy();

      statistic.setAttribute("heading", "Attribute Title");
      await waitForRender();

      expect(statistic.heading).toBe("Attribute Title");
      const headerAfter = statistic.shadowRoot.querySelector(
        ".ea-statistic__header"
      );
      expect(headerAfter.textContent).toBe("Attribute Title");
      expect(headerAfter.querySelector('slot[name="title"]')).toBeNull();
    });
  });
});
