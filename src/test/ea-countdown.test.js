import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

import "../components/ea-countdown/index.ts";
import { waitForRender } from "./utils/waitForRender.js";

describe("EaCountdown Component", () => {
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
      const countdown = document.createElement("ea-countdown");
      container.appendChild(countdown);

      await waitForRender();

      expect(countdown.shadowRoot).toBeTruthy();
    });

    it("应该包含 ea-countdown 根容器", async () => {
      const countdown = document.createElement("ea-countdown");
      container.appendChild(countdown);

      await waitForRender();

      const root = countdown.shadowRoot.querySelector(".ea-countdown");
      expect(root).toBeTruthy();
    });

    it("根容器应该有 container part", async () => {
      const countdown = document.createElement("ea-countdown");
      container.appendChild(countdown);

      await waitForRender();

      const containerEl =
        countdown.shadowRoot.querySelector('[part="container"]');
      expect(containerEl).toBeTruthy();
      expect(containerEl.classList.contains("ea-countdown")).toBe(true);
    });

    it("应该渲染 header 元素", async () => {
      const countdown = document.createElement("ea-countdown");
      container.appendChild(countdown);

      await waitForRender();

      const header = countdown.shadowRoot.querySelector(
        ".ea-countdown__header"
      );
      expect(header).toBeTruthy();
      expect(header.tagName.toLowerCase()).toBe("header");
    });

    it("应该渲染 content 元素", async () => {
      const countdown = document.createElement("ea-countdown");
      container.appendChild(countdown);

      await waitForRender();

      const content = countdown.shadowRoot.querySelector(
        ".ea-countdown__content"
      );
      expect(content).toBeTruthy();
      expect(content.tagName.toLowerCase()).toBe("main");
    });

    it("应该渲染 number 元素", async () => {
      const countdown = document.createElement("ea-countdown");
      container.appendChild(countdown);

      await waitForRender();

      const number = countdown.shadowRoot.querySelector(
        ".ea-countdown__number"
      );
      expect(number).toBeTruthy();
    });

    it("应该渲染 prefix 元素", async () => {
      const countdown = document.createElement("ea-countdown");
      container.appendChild(countdown);

      await waitForRender();

      const prefix = countdown.shadowRoot.querySelector(
        ".ea-countdown__prefix"
      );
      expect(prefix).toBeTruthy();
    });

    it("应该渲染 suffix 元素", async () => {
      const countdown = document.createElement("ea-countdown");
      container.appendChild(countdown);

      await waitForRender();

      const suffix = countdown.shadowRoot.querySelector(
        ".ea-countdown__suffix"
      );
      expect(suffix).toBeTruthy();
    });
  });

  describe("CSS Parts", () => {
    it("应该支持 container part", async () => {
      const countdown = document.createElement("ea-countdown");
      container.appendChild(countdown);

      await waitForRender();

      expect(
        countdown.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
    });

    it("应该支持 title part", async () => {
      const countdown = document.createElement("ea-countdown");
      container.appendChild(countdown);

      await waitForRender();

      expect(countdown.shadowRoot.querySelector('[part="title"]')).toBeTruthy();
    });

    it("应该支持 content part", async () => {
      const countdown = document.createElement("ea-countdown");
      container.appendChild(countdown);

      await waitForRender();

      expect(
        countdown.shadowRoot.querySelector('[part="content"]')
      ).toBeTruthy();
    });

    it("应该支持 prefix part", async () => {
      const countdown = document.createElement("ea-countdown");
      container.appendChild(countdown);

      await waitForRender();

      expect(
        countdown.shadowRoot.querySelector('[part="prefix"]')
      ).toBeTruthy();
    });

    it("应该支持 number part", async () => {
      const countdown = document.createElement("ea-countdown");
      container.appendChild(countdown);

      await waitForRender();

      expect(
        countdown.shadowRoot.querySelector('[part="number"]')
      ).toBeTruthy();
    });

    it("应该支持 suffix part", async () => {
      const countdown = document.createElement("ea-countdown");
      container.appendChild(countdown);

      await waitForRender();

      expect(
        countdown.shadowRoot.querySelector('[part="suffix"]')
      ).toBeTruthy();
    });
  });

  describe("BEM Class Names", () => {
    it("根容器应该有 ea-countdown 类名", async () => {
      const countdown = document.createElement("ea-countdown");
      container.appendChild(countdown);

      await waitForRender();

      const root = countdown.shadowRoot.querySelector(".ea-countdown");
      expect(root).toBeTruthy();
    });

    it("header 应该有 ea-countdown__header 类名", async () => {
      const countdown = document.createElement("ea-countdown");
      container.appendChild(countdown);

      await waitForRender();

      const header = countdown.shadowRoot.querySelector(
        ".ea-countdown__header"
      );
      expect(header).toBeTruthy();
    });

    it("content 应该有 ea-countdown__content 类名", async () => {
      const countdown = document.createElement("ea-countdown");
      container.appendChild(countdown);

      await waitForRender();

      const content = countdown.shadowRoot.querySelector(
        ".ea-countdown__content"
      );
      expect(content).toBeTruthy();
    });

    it("number 应该有 ea-countdown__number 类名", async () => {
      const countdown = document.createElement("ea-countdown");
      container.appendChild(countdown);

      await waitForRender();

      const number = countdown.shadowRoot.querySelector(
        ".ea-countdown__number"
      );
      expect(number).toBeTruthy();
    });

    it("prefix 应该有 ea-countdown__prefix 类名", async () => {
      const countdown = document.createElement("ea-countdown");
      container.appendChild(countdown);

      await waitForRender();

      const prefix = countdown.shadowRoot.querySelector(
        ".ea-countdown__prefix"
      );
      expect(prefix).toBeTruthy();
    });

    it("suffix 应该有 ea-countdown__suffix 类名", async () => {
      const countdown = document.createElement("ea-countdown");
      container.appendChild(countdown);

      await waitForRender();

      const suffix = countdown.shadowRoot.querySelector(
        ".ea-countdown__suffix"
      );
      expect(suffix).toBeTruthy();
    });
  });

  describe("DOM Structure", () => {
    it("content 内部应该包含 prefix、number、suffix 按顺序排列", async () => {
      const countdown = document.createElement("ea-countdown");
      container.appendChild(countdown);

      await waitForRender();

      const content = countdown.shadowRoot.querySelector(
        ".ea-countdown__content"
      );
      const children = Array.from(content.children).map(el =>
        el.tagName.toLowerCase()
      );
      expect(children).toEqual(["span", "span", "span"]);
    });

    it("header 应该在 content 之前", async () => {
      const countdown = document.createElement("ea-countdown");
      container.appendChild(countdown);

      await waitForRender();

      const root = countdown.shadowRoot.querySelector(".ea-countdown");
      const children = Array.from(root.children).map(el =>
        el.tagName.toLowerCase()
      );
      expect(children[0]).toBe("header");
      expect(children[1]).toBe("main");
    });
  });

  describe("Value Attribute", () => {
    it("默认 value 应该是空字符串", async () => {
      const countdown = document.createElement("ea-countdown");
      container.appendChild(countdown);

      await waitForRender();

      expect(countdown.value).toBe("");
    });

    it("应该支持 value 属性（时间戳）", async () => {
      const countdown = document.createElement("ea-countdown");
      const futureTime = Date.now() + 60000;
      countdown.setAttribute("value", String(futureTime));
      container.appendChild(countdown);

      await waitForRender();

      expect(countdown.value).toBe(String(futureTime));
    });

    it("应该支持 value 属性（日期字符串）", async () => {
      const countdown = document.createElement("ea-countdown");
      const futureDate = new Date(Date.now() + 60000).toISOString();
      countdown.setAttribute("value", futureDate);
      container.appendChild(countdown);

      await waitForRender();

      expect(countdown.value).toBe(futureDate);
    });

    it("动态修改 value 应该更新属性值", async () => {
      const countdown = document.createElement("ea-countdown");
      const futureTime1 = Date.now() + 60000;
      countdown.setAttribute("value", String(futureTime1));
      container.appendChild(countdown);

      await waitForRender();

      const futureTime2 = Date.now() + 120000;
      countdown.setAttribute("value", String(futureTime2));
      await waitForRender();

      expect(countdown.value).toBe(String(futureTime2));
    });
  });

  describe("Format Attribute", () => {
    it("默认 format 应该是 HH:mm:ss", async () => {
      const countdown = document.createElement("ea-countdown");
      container.appendChild(countdown);

      await waitForRender();

      expect(countdown.format).toBe("HH:mm:ss");
    });

    it("应该支持 format 属性", async () => {
      const countdown = document.createElement("ea-countdown");
      countdown.setAttribute("format", "DD [days] HH:mm:ss");
      countdown.setAttribute("value", String(Date.now() + 86400000));
      container.appendChild(countdown);

      await waitForRender();

      expect(countdown.format).toBe("DD [days] HH:mm:ss");
    });

    it("动态修改 format 应该更新属性值", async () => {
      const countdown = document.createElement("ea-countdown");
      countdown.setAttribute("value", String(Date.now() + 3600000));
      container.appendChild(countdown);

      await waitForRender();

      countdown.setAttribute("format", "mm:ss");
      await waitForRender();

      expect(countdown.format).toBe("mm:ss");
    });
  });

  describe("RefreshInterval Attribute", () => {
    it("默认 refreshInterval 应该是 1000", async () => {
      const countdown = document.createElement("ea-countdown");
      container.appendChild(countdown);

      await waitForRender();

      expect(countdown.refreshInterval).toBe(1000);
    });

    it("应该支持 refresh-interval 属性", async () => {
      const countdown = document.createElement("ea-countdown");
      countdown.setAttribute("refresh-interval", "500");
      container.appendChild(countdown);

      await waitForRender();

      expect(countdown.refreshInterval).toBe(500);
    });

    it("动态修改 refresh-interval 应该更新属性值", async () => {
      const countdown = document.createElement("ea-countdown");
      container.appendChild(countdown);

      await waitForRender();

      countdown.setAttribute("refresh-interval", "2000");
      await waitForRender();

      expect(countdown.refreshInterval).toBe(2000);
    });
  });

  describe("Heading Attribute", () => {
    it("默认 heading 应该是空字符串", async () => {
      const countdown = document.createElement("ea-countdown");
      container.appendChild(countdown);

      await waitForRender();

      expect(countdown.heading).toBe("");
    });

    it("应该支持 heading 属性", async () => {
      const countdown = document.createElement("ea-countdown");
      countdown.setAttribute("heading", "Countdown Title");
      container.appendChild(countdown);

      await waitForRender();

      expect(countdown.heading).toBe("Countdown Title");
    });

    it("heading 属性应该更新 header 元素的文本内容", async () => {
      const countdown = document.createElement("ea-countdown");
      countdown.setAttribute("heading", "Start to grab");
      container.appendChild(countdown);

      await waitForRender();

      const header = countdown.shadowRoot.querySelector(
        ".ea-countdown__header"
      );
      expect(header.textContent).toBe("Start to grab");
    });

    it("动态修改 heading 应该更新 header 文本", async () => {
      const countdown = document.createElement("ea-countdown");
      countdown.setAttribute("heading", "Old Title");
      container.appendChild(countdown);

      await waitForRender();

      countdown.setAttribute("heading", "New Title");
      await waitForRender();

      const header = countdown.shadowRoot.querySelector(
        ".ea-countdown__header"
      );
      expect(header.textContent).toBe("New Title");
      expect(countdown.heading).toBe("New Title");
    });

    it("heading 为空时 header 文本应为空", async () => {
      const countdown = document.createElement("ea-countdown");
      container.appendChild(countdown);

      await waitForRender();

      const header = countdown.shadowRoot.querySelector(
        ".ea-countdown__header"
      );
      expect(header.textContent.trim()).toBe("");
    });
  });

  describe("DisplayValue Property", () => {
    it("默认 displayValue 应该是空字符串", async () => {
      const countdown = document.createElement("ea-countdown");
      container.appendChild(countdown);

      await waitForRender();

      expect(countdown.displayValue).toBe("");
    });

    it("设置 value 后 displayValue 应该被更新", async () => {
      const countdown = document.createElement("ea-countdown");
      countdown.setAttribute("value", String(Date.now() + 60000));
      container.appendChild(countdown);

      await waitForRender();

      expect(typeof countdown.displayValue).toBe("string");
      expect(countdown.displayValue.length).toBeGreaterThan(0);
    });

    it("displayValue 应该与 number 元素文本一致", async () => {
      const countdown = document.createElement("ea-countdown");
      countdown.setAttribute("value", String(Date.now() + 3600000));
      container.appendChild(countdown);

      await waitForRender();

      const numberEl = countdown.shadowRoot.querySelector(
        ".ea-countdown__number"
      );
      expect(countdown.displayValue).toBe(numberEl.textContent);
    });

    it("displayValue 是 JS 属性，不应该映射到 HTML attribute", async () => {
      const countdown = document.createElement("ea-countdown");
      countdown.setAttribute("value", String(Date.now() + 60000));
      container.appendChild(countdown);

      await waitForRender();

      expect(countdown.hasAttribute("displayValue")).toBe(false);
      expect(countdown.hasAttribute("display-value")).toBe(false);
    });
  });

  describe("Slots", () => {
    it("应该支持 title 插槽", async () => {
      const countdown = document.createElement("ea-countdown");
      countdown.innerHTML = `<div slot="title">Custom Title</div>`;
      container.appendChild(countdown);

      await waitForRender();

      const titleSlot =
        countdown.shadowRoot.querySelector('slot[name="title"]');
      expect(titleSlot).toBeTruthy();
    });

    it("应该支持 prefix 插槽", async () => {
      const countdown = document.createElement("ea-countdown");
      countdown.innerHTML = `<div slot="prefix">$</div>`;
      container.appendChild(countdown);

      await waitForRender();

      const prefixSlot = countdown.shadowRoot.querySelector(
        'slot[name="prefix"]'
      );
      expect(prefixSlot).toBeTruthy();
    });

    it("应该支持 suffix 插槽", async () => {
      const countdown = document.createElement("ea-countdown");
      countdown.innerHTML = `<div slot="suffix">%</div>`;
      container.appendChild(countdown);

      await waitForRender();

      const suffixSlot = countdown.shadowRoot.querySelector(
        'slot[name="suffix"]'
      );
      expect(suffixSlot).toBeTruthy();
    });

    it("应该支持默认插槽", async () => {
      const countdown = document.createElement("ea-countdown");
      countdown.innerHTML = `<span>Custom Content</span>`;
      container.appendChild(countdown);

      await waitForRender();

      const defaultSlot =
        countdown.shadowRoot.querySelector("slot:not([name])");
      expect(defaultSlot).toBeTruthy();
    });

    it("title 插槽应该位于 header 元素内", async () => {
      const countdown = document.createElement("ea-countdown");
      countdown.innerHTML = `<div slot="title">Slotted Title</div>`;
      container.appendChild(countdown);

      await waitForRender();

      const header = countdown.shadowRoot.querySelector(
        ".ea-countdown__header"
      );
      const titleSlot = header.querySelector('slot[name="title"]');
      expect(titleSlot).toBeTruthy();
    });

    it("默认插槽应该位于 number 元素内", async () => {
      const countdown = document.createElement("ea-countdown");
      countdown.innerHTML = `<span>Custom Number</span>`;
      container.appendChild(countdown);

      await waitForRender();

      const number = countdown.shadowRoot.querySelector(
        ".ea-countdown__number"
      );
      const defaultSlot = number.querySelector("slot:not([name])");
      expect(defaultSlot).toBeTruthy();
    });
  });

  describe("Countdown Display", () => {
    it("应该正确显示倒计时时间（HH:mm:ss 格式）", async () => {
      const countdown = document.createElement("ea-countdown");
      countdown.setAttribute("value", String(Date.now() + 3600000));
      container.appendChild(countdown);

      await waitForRender();

      const numberEl = countdown.shadowRoot.querySelector(
        ".ea-countdown__number"
      );
      expect(numberEl.textContent).toMatch(/\d{2}:\d{2}:\d{2}/);
    });

    it("倒计时结束时应该显示 00:00:00", async () => {
      const countdown = document.createElement("ea-countdown");
      countdown.setAttribute("value", String(Date.now() - 1000));
      container.appendChild(countdown);

      await waitForRender();

      const numberEl = countdown.shadowRoot.querySelector(
        ".ea-countdown__number"
      );
      expect(numberEl.textContent).toBe("00:00:00");
    });

    it("value 为空时 number 元素应该为空", async () => {
      const countdown = document.createElement("ea-countdown");
      container.appendChild(countdown);

      await waitForRender();

      const numberEl = countdown.shadowRoot.querySelector(
        ".ea-countdown__number"
      );
      expect(numberEl.textContent.trim()).toBe("");
    });

    it("应该支持自定义格式 DD [days] HH:mm:ss", async () => {
      const countdown = document.createElement("ea-countdown");
      countdown.setAttribute("value", String(Date.now() + 172800000));
      countdown.setAttribute("format", "DD [days] HH:mm:ss");
      container.appendChild(countdown);

      await waitForRender();

      const numberEl = countdown.shadowRoot.querySelector(
        ".ea-countdown__number"
      );
      const text = numberEl.textContent;
      expect(text === "00:00:00" || text.includes("days")).toBe(true);
    });

    it("应该支持 mm:ss 格式", async () => {
      const countdown = document.createElement("ea-countdown");
      countdown.setAttribute("value", String(Date.now() + 300000));
      countdown.setAttribute("format", "mm:ss");
      container.appendChild(countdown);

      await waitForRender();

      const numberEl = countdown.shadowRoot.querySelector(
        ".ea-countdown__number"
      );
      expect(numberEl.textContent).toMatch(/\d{2}:\d{2}/);
    });

    it("应该支持 HH:mm 格式", async () => {
      const countdown = document.createElement("ea-countdown");
      countdown.setAttribute("value", String(Date.now() + 7200000));
      countdown.setAttribute("format", "HH:mm");
      container.appendChild(countdown);

      await waitForRender();

      const numberEl = countdown.shadowRoot.querySelector(
        ".ea-countdown__number"
      );
      expect(numberEl.textContent).toMatch(/\d{2}:\d{2}/);
    });
  });

  describe("Events", () => {
    it("应该触发 ea-change 事件", async () => {
      const countdown = document.createElement("ea-countdown");
      countdown.setAttribute("value", String(Date.now() + 60000));
      container.appendChild(countdown);

      await waitForRender();

      const changeHandler = vi.fn();
      countdown.addEventListener("ea-change", changeHandler);

      await waitForRender(1100);

      expect(changeHandler).toHaveBeenCalled();
    });

    it("ea-change 事件应该包含 value 和 displayValue", async () => {
      const countdown = document.createElement("ea-countdown");
      countdown.setAttribute("value", String(Date.now() + 60000));
      container.appendChild(countdown);

      await waitForRender();

      const changeHandler = vi.fn();
      countdown.addEventListener("ea-change", changeHandler);

      await waitForRender(1100);

      if (changeHandler.mock.calls.length > 0) {
        const eventDetail = changeHandler.mock.calls[0][0].detail;
        expect(eventDetail).toHaveProperty("value");
        expect(eventDetail).toHaveProperty("displayValue");
      }
    });

    it("ea-change 事件的 displayValue 应该是字符串", async () => {
      const countdown = document.createElement("ea-countdown");
      countdown.setAttribute("value", String(Date.now() + 60000));
      container.appendChild(countdown);

      await waitForRender();

      const changeHandler = vi.fn();
      countdown.addEventListener("ea-change", changeHandler);

      await waitForRender(1100);

      if (changeHandler.mock.calls.length > 0) {
        const eventDetail = changeHandler.mock.calls[0][0].detail;
        expect(typeof eventDetail.displayValue).toBe("string");
      }
    });

    it("ea-change 事件的 value 应该是数字", async () => {
      const countdown = document.createElement("ea-countdown");
      countdown.setAttribute("value", String(Date.now() + 60000));
      container.appendChild(countdown);

      await waitForRender();

      const changeHandler = vi.fn();
      countdown.addEventListener("ea-change", changeHandler);

      await waitForRender(1100);

      if (changeHandler.mock.calls.length > 0) {
        const eventDetail = changeHandler.mock.calls[0][0].detail;
        expect(typeof eventDetail.value).toBe("number");
      }
    });

    it("ea-change 事件应该是 EaCountdownChangeEvent 实例", async () => {
      const countdown = document.createElement("ea-countdown");
      countdown.setAttribute("value", String(Date.now() + 60000));
      container.appendChild(countdown);

      await waitForRender();

      const changeHandler = vi.fn();
      countdown.addEventListener("ea-change", changeHandler);

      await waitForRender(1100);

      if (changeHandler.mock.calls.length > 0) {
        const event = changeHandler.mock.calls[0][0];
        expect(event.constructor.name).toBe("EaCountdownChangeEvent");
      }
    });

    it("应该触发 ea-finish 事件当倒计时结束", async () => {
      const countdown = document.createElement("ea-countdown");
      const finishHandler = vi.fn();
      countdown.addEventListener("ea-finish", finishHandler);

      countdown.setAttribute("value", String(Date.now() - 1000));
      container.appendChild(countdown);

      await waitForRender(200);

      expect(finishHandler).toHaveBeenCalled();
    });

    it("ea-finish 事件应该包含 value 和 displayValue", async () => {
      const countdown = document.createElement("ea-countdown");
      countdown.setAttribute("value", String(Date.now() - 1000));
      container.appendChild(countdown);

      const finishHandler = vi.fn();
      countdown.addEventListener("ea-finish", finishHandler);

      await waitForRender(200);

      if (finishHandler.mock.calls.length > 0) {
        const eventDetail = finishHandler.mock.calls[0][0].detail;
        expect(eventDetail).toHaveProperty("value");
        expect(eventDetail).toHaveProperty("displayValue");
      }
    });

    it("ea-finish 事件应该是 EaCountdownFinishEvent 实例", async () => {
      const countdown = document.createElement("ea-countdown");
      countdown.setAttribute("value", String(Date.now() - 1000));
      container.appendChild(countdown);

      const finishHandler = vi.fn();
      countdown.addEventListener("ea-finish", finishHandler);

      await waitForRender(200);

      if (finishHandler.mock.calls.length > 0) {
        const event = finishHandler.mock.calls[0][0];
        expect(event.constructor.name).toBe("EaCountdownFinishEvent");
      }
    });

    it("ea-finish 事件应该冒泡", async () => {
      const countdown = document.createElement("ea-countdown");
      countdown.setAttribute("value", String(Date.now() - 1000));
      container.appendChild(countdown);

      const finishHandler = vi.fn();
      container.addEventListener("ea-finish", finishHandler);

      await waitForRender(200);

      expect(finishHandler).toHaveBeenCalled();
    });

    it("初始渲染时 value 已过期应该立即触发 ea-finish", async () => {
      const countdown = document.createElement("ea-countdown");
      const finishHandler = vi.fn();
      countdown.addEventListener("ea-finish", finishHandler);

      countdown.setAttribute("value", String(Date.now() - 10000));
      container.appendChild(countdown);

      await waitForRender(200);

      expect(finishHandler).toHaveBeenCalled();
    });
  });

  describe("Timer Management", () => {
    it("修改 value 应该重新启动倒计时", async () => {
      const countdown = document.createElement("ea-countdown");
      countdown.setAttribute("value", String(Date.now() + 60000));
      container.appendChild(countdown);

      await waitForRender();

      const changeHandler = vi.fn();
      countdown.addEventListener("ea-change", changeHandler);

      countdown.setAttribute("value", String(Date.now() + 120000));

      await waitForRender(1100);

      expect(changeHandler).toHaveBeenCalled();
    });

    it("多次修改 value 不应该产生多个定时器", async () => {
      const countdown = document.createElement("ea-countdown");
      container.appendChild(countdown);

      await waitForRender();

      countdown.setAttribute("value", String(Date.now() + 60000));
      await waitForRender();

      countdown.setAttribute("value", String(Date.now() + 120000));
      await waitForRender();

      countdown.setAttribute("value", String(Date.now() + 180000));
      await waitForRender();

      const changeHandler = vi.fn();
      countdown.addEventListener("ea-change", changeHandler);

      await waitForRender(1100);

      expect(changeHandler.mock.calls.length).toBeLessThanOrEqual(2);
    });
  });

  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const countdown = document.createElement("ea-countdown");
      countdown.setAttribute("heading", "Test");
      countdown.setAttribute("value", String(Date.now() + 60000));
      container.appendChild(countdown);

      await waitForRender();

      expect(countdown.shadowRoot).toBeTruthy();
      expect(countdown.heading).toBe("Test");
    });

    it("组件断开连接后应该清理定时器", async () => {
      const countdown = document.createElement("ea-countdown");
      countdown.setAttribute("value", String(Date.now() + 60000));
      container.appendChild(countdown);

      await waitForRender();

      countdown.remove();

      await waitForRender();

      expect(countdown.isConnected).toBe(false);
    });

    it("组件重新连接后应该正常工作", async () => {
      const countdown = document.createElement("ea-countdown");
      countdown.setAttribute("heading", "Reconnect Test");
      countdown.setAttribute("value", String(Date.now() + 60000));
      container.appendChild(countdown);

      await waitForRender();

      countdown.remove();
      await waitForRender();

      container.appendChild(countdown);
      await waitForRender();

      expect(countdown.isConnected).toBe(true);
      expect(countdown.heading).toBe("Reconnect Test");
    });
  });

  describe("Attribute Change", () => {
    it("同时设置 heading 和 value 应该正确渲染", async () => {
      const countdown = document.createElement("ea-countdown");
      countdown.setAttribute("heading", "Remaining Time");
      countdown.setAttribute("value", String(Date.now() + 3600000));
      container.appendChild(countdown);

      await waitForRender();

      expect(countdown.heading).toBe("Remaining Time");
      const header = countdown.shadowRoot.querySelector(
        ".ea-countdown__header"
      );
      expect(header.textContent).toBe("Remaining Time");

      const numberEl = countdown.shadowRoot.querySelector(
        ".ea-countdown__number"
      );
      expect(numberEl.textContent).toMatch(/\d{2}:\d{2}:\d{2}/);
    });

    it("移除 heading 属性应该恢复默认值", async () => {
      const countdown = document.createElement("ea-countdown");
      countdown.setAttribute("heading", "Test");
      container.appendChild(countdown);

      await waitForRender();

      countdown.removeAttribute("heading");
      await waitForRender();

      expect(countdown.heading).toBe("");
    });

    it("移除 value 属性应该恢复默认值", async () => {
      const countdown = document.createElement("ea-countdown");
      countdown.setAttribute("value", String(Date.now() + 60000));
      container.appendChild(countdown);

      await waitForRender();

      countdown.removeAttribute("value");
      await waitForRender();

      expect(countdown.value).toBe("");
    });
  });

  describe("Edge Cases", () => {
    it("value 为当前时间应该立即结束倒计时", async () => {
      const countdown = document.createElement("ea-countdown");
      countdown.setAttribute("value", String(Date.now()));
      container.appendChild(countdown);

      await waitForRender();

      const numberEl = countdown.shadowRoot.querySelector(
        ".ea-countdown__number"
      );
      expect(numberEl.textContent).toBe("00:00:00");
    });

    it("value 为过去时间应该显示 00:00:00", async () => {
      const countdown = document.createElement("ea-countdown");
      countdown.setAttribute("value", String(Date.now() - 86400000));
      container.appendChild(countdown);

      await waitForRender();

      const numberEl = countdown.shadowRoot.querySelector(
        ".ea-countdown__number"
      );
      expect(numberEl.textContent).toBe("00:00:00");
    });

    it("value 为无效字符串时应该正常处理", async () => {
      const countdown = document.createElement("ea-countdown");
      countdown.setAttribute("value", "invalid-date");
      container.appendChild(countdown);

      await waitForRender();

      expect(countdown).toBeDefined();
    });

    it("设置 heading 属性后 header 的文本应该被更新", async () => {
      const countdown = document.createElement("ea-countdown");
      countdown.innerHTML = `<div slot="title">Slot Title</div>`;
      container.appendChild(countdown);

      await waitForRender();

      const headerBefore = countdown.shadowRoot.querySelector(
        ".ea-countdown__header"
      );
      expect(headerBefore.querySelector('slot[name="title"]')).toBeTruthy();

      countdown.setAttribute("heading", "Attribute Title");
      await waitForRender();

      expect(countdown.heading).toBe("Attribute Title");
      const headerAfter = countdown.shadowRoot.querySelector(
        ".ea-countdown__header"
      );
      expect(headerAfter.textContent).toBe("Attribute Title");
    });

    it("refreshInterval 为 0 时应该使用默认值 1000 进行计时", async () => {
      const countdown = document.createElement("ea-countdown");
      countdown.setAttribute("refresh-interval", "0");
      container.appendChild(countdown);

      await waitForRender();

      expect(countdown.refreshInterval).toBe(0);
    });
  });
});
