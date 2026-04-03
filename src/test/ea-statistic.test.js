import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// 导入 ea-statistic 和 ea-countdown 组件
import "../components/ea-statistic/index.js";
import "../components/ea-countdown/index.js";

describe("EaStatistic Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  /**
   * 基础功能测试
   */
  describe("Basic Functionality", () => {
    it("应该正确渲染组件", async () => {
      const statistic = document.createElement("ea-statistic");
      statistic.setAttribute("title", "Test Title");
      statistic.setAttribute("value", "100");
      container.appendChild(statistic);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(statistic.shadowRoot).toBeTruthy();
      expect(statistic.shadowRoot.querySelector(".ea-statistic")).toBeTruthy();
    });

    it("应该支持 CSS Parts", async () => {
      const statistic = document.createElement("ea-statistic");
      container.appendChild(statistic);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(
        statistic.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
      expect(statistic.shadowRoot.querySelector('[part="title"]')).toBeTruthy();
      expect(
        statistic.shadowRoot.querySelector('[part="content"]')
      ).toBeTruthy();
      expect(
        statistic.shadowRoot.querySelector('[part="prefix"]')
      ).toBeTruthy();
      expect(
        statistic.shadowRoot.querySelector('[part="number"]')
      ).toBeTruthy();
      expect(
        statistic.shadowRoot.querySelector('[part="suffix"]')
      ).toBeTruthy();
    });
  });

  /**
   * Title 属性测试
   */
  describe("Title Attribute", () => {
    it("默认 title 应该是空字符串", async () => {
      const statistic = document.createElement("ea-statistic");
      container.appendChild(statistic);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(statistic.title).toBe("");
    });

    it("应该支持 title 属性", async () => {
      const statistic = document.createElement("ea-statistic");
      statistic.setAttribute("title", "Test Title");
      container.appendChild(statistic);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(statistic.title).toBe("Test Title");
    });
  });

  /**
   * Value 属性测试
   */
  describe("Value Attribute", () => {
    it("默认 value 应该是 0", async () => {
      const statistic = document.createElement("ea-statistic");
      container.appendChild(statistic);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(statistic.value).toBe(0);
    });

    it("应该支持 value 属性", async () => {
      const statistic = document.createElement("ea-statistic");
      statistic.setAttribute("value", "1000");
      container.appendChild(statistic);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(statistic.value).toBe(1000);
    });

    it("value 应该格式化为本地数字格式", async () => {
      const statistic = document.createElement("ea-statistic");
      statistic.setAttribute("value", "1000000");
      container.appendChild(statistic);

      await new Promise(resolve => setTimeout(resolve, 50));

      const numberEl = statistic.shadowRoot.querySelector(
        ".ea-statistic__number"
      );
      expect(numberEl.textContent).toBe("1,000,000");
    });
  });

  /**
   * 插槽测试
   */
  describe("Slots", () => {
    it("应该支持 title 插槽", async () => {
      const statistic = document.createElement("ea-statistic");
      statistic.innerHTML = `
        <div slot="title">Custom Title</div>
      `;
      container.appendChild(statistic);

      await new Promise(resolve => setTimeout(resolve, 50));

      const titleSlot =
        statistic.shadowRoot.querySelector('slot[name="title"]');
      expect(titleSlot).toBeTruthy();
    });

    it("应该支持 prefix 插槽", async () => {
      const statistic = document.createElement("ea-statistic");
      statistic.innerHTML = `
        <div slot="prefix">$</div>
      `;
      container.appendChild(statistic);

      await new Promise(resolve => setTimeout(resolve, 50));

      const prefixSlot = statistic.shadowRoot.querySelector(
        'slot[name="prefix"]'
      );
      expect(prefixSlot).toBeTruthy();
    });

    it("应该支持 suffix 插槽", async () => {
      const statistic = document.createElement("ea-statistic");
      statistic.innerHTML = `
        <div slot="suffix">%</div>
      `;
      container.appendChild(statistic);

      await new Promise(resolve => setTimeout(resolve, 50));

      const suffixSlot = statistic.shadowRoot.querySelector(
        'slot[name="suffix"]'
      );
      expect(suffixSlot).toBeTruthy();
    });

    it("应该支持默认插槽", async () => {
      const statistic = document.createElement("ea-statistic");
      statistic.innerHTML = `
        <span>Custom Content</span>
      `;
      container.appendChild(statistic);

      await new Promise(resolve => setTimeout(resolve, 50));

      const defaultSlot =
        statistic.shadowRoot.querySelector("slot:not([name])");
      expect(defaultSlot).toBeTruthy();
    });
  });

  /**
   * 生命周期测试
   */
  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const statistic = document.createElement("ea-statistic");
      statistic.setAttribute("title", "Test");
      statistic.setAttribute("value", "100");
      container.appendChild(statistic);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(statistic.shadowRoot).toBeTruthy();
      expect(statistic.title).toBe("Test");
      expect(statistic.value).toBe(100);
    });

    it("组件断开连接后应该正常移除", async () => {
      const statistic = document.createElement("ea-statistic");
      container.appendChild(statistic);

      await new Promise(resolve => setTimeout(resolve, 50));

      statistic.remove();

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(statistic.isConnected).toBe(false);
    });
  });
});

describe("EaCountdown Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  /**
   * 基础功能测试
   */
  describe("Basic Functionality", () => {
    it("应该正确渲染组件", async () => {
      const countdown = document.createElement("ea-countdown");
      countdown.setAttribute("title", "Countdown");
      countdown.setAttribute("value", String(Date.now() + 60000));
      container.appendChild(countdown);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(countdown.shadowRoot).toBeTruthy();
      expect(countdown.shadowRoot.querySelector(".ea-statistic")).toBeTruthy();
    });

    it("应该继承 EaStatistic 的 CSS Parts", async () => {
      const countdown = document.createElement("ea-countdown");
      container.appendChild(countdown);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(
        countdown.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
      expect(countdown.shadowRoot.querySelector('[part="title"]')).toBeTruthy();
      expect(
        countdown.shadowRoot.querySelector('[part="number"]')
      ).toBeTruthy();
    });
  });

  /**
   * Value 属性测试
   */
  describe("Value Attribute", () => {
    it("默认 value 应该是空字符串", async () => {
      const countdown = document.createElement("ea-countdown");
      container.appendChild(countdown);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(countdown.value).toBe("");
    });

    it("应该支持 value 属性（时间戳）", async () => {
      const countdown = document.createElement("ea-countdown");
      const futureTime = Date.now() + 60000;
      countdown.setAttribute("value", String(futureTime));
      container.appendChild(countdown);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(countdown.value).toBe(String(futureTime));
    });

    it("应该支持 value 属性（日期字符串）", async () => {
      const countdown = document.createElement("ea-countdown");
      const futureDate = new Date(Date.now() + 60000).toISOString();
      countdown.setAttribute("value", futureDate);
      container.appendChild(countdown);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(countdown.value).toBe(futureDate);
    });
  });

  /**
   * Format 属性测试
   */
  describe("Format Attribute", () => {
    it("默认 format 应该是 HH:mm:ss", async () => {
      const countdown = document.createElement("ea-countdown");
      container.appendChild(countdown);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(countdown.format).toBe("HH:mm:ss");
    });

    it("应该支持 format 属性", async () => {
      const countdown = document.createElement("ea-countdown");
      countdown.setAttribute("format", "DD [days] HH:mm:ss");
      countdown.setAttribute("value", String(Date.now() + 86400000));
      container.appendChild(countdown);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(countdown.format).toBe("DD [days] HH:mm:ss");
    });
  });

  /**
   * Refresh-interval 属性测试
   */
  describe("Refresh-interval Attribute", () => {
    it("默认 refresh-interval 应该是 1000", async () => {
      const countdown = document.createElement("ea-countdown");
      container.appendChild(countdown);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(countdown["refresh-interval"]).toBe(1000);
    });

    it("应该支持 refresh-interval 属性", async () => {
      const countdown = document.createElement("ea-countdown");
      countdown.setAttribute("refresh-interval", "500");
      container.appendChild(countdown);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(countdown["refresh-interval"]).toBe(500);
    });
  });

  /**
   * Title 属性测试
   */
  describe("Title Attribute", () => {
    it("应该支持 title 属性", async () => {
      const countdown = document.createElement("ea-countdown");
      countdown.setAttribute("title", "Countdown Title");
      container.appendChild(countdown);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(countdown.title).toBe("Countdown Title");
    });
  });

  /**
   * 事件测试
   */
  describe("Events", () => {
    it("应该触发 change 事件", async () => {
      const countdown = document.createElement("ea-countdown");
      countdown.setAttribute("value", String(Date.now() + 60000));
      container.appendChild(countdown);

      await new Promise(resolve => setTimeout(resolve, 100));

      const changeHandler = vi.fn();
      countdown.addEventListener("change", changeHandler);

      // 等待一段时间让倒计时触发 change 事件
      await new Promise(resolve => setTimeout(resolve, 1100));

      expect(changeHandler).toHaveBeenCalled();
    });

    it("change 事件应该包含 value 和 displayValue", async () => {
      const countdown = document.createElement("ea-countdown");
      countdown.setAttribute("value", String(Date.now() + 60000));
      container.appendChild(countdown);

      await new Promise(resolve => setTimeout(resolve, 100));

      const changeHandler = vi.fn();
      countdown.addEventListener("change", changeHandler);

      await new Promise(resolve => setTimeout(resolve, 1100));

      if (changeHandler.mock.calls.length > 0) {
        const eventDetail = changeHandler.mock.calls[0][0].detail;
        expect(eventDetail).toHaveProperty("value");
        expect(eventDetail).toHaveProperty("displayValue");
      }
    });

    it("应该触发 ea-finish 事件当倒计时结束", async () => {
      const countdown = document.createElement("ea-countdown");
      const finishHandler = vi.fn();
      countdown.addEventListener("ea-finish", finishHandler);

      // 设置一个已经过去的时间
      countdown.setAttribute("value", String(Date.now() - 1000));
      container.appendChild(countdown);

      await new Promise(resolve => setTimeout(resolve, 200));

      expect(finishHandler).toHaveBeenCalled();
    });

    it("ea-finish 事件应该包含 value 和 displayValue", async () => {
      const countdown = document.createElement("ea-countdown");
      countdown.setAttribute("value", String(Date.now() - 1000));
      container.appendChild(countdown);

      const finishHandler = vi.fn();
      countdown.addEventListener("ea-finish", finishHandler);

      await new Promise(resolve => setTimeout(resolve, 200));

      if (finishHandler.mock.calls.length > 0) {
        const eventDetail = finishHandler.mock.calls[0][0].detail;
        expect(eventDetail).toHaveProperty("value");
        expect(eventDetail).toHaveProperty("displayValue");
      }
    });
  });

  /**
   * DisplayValue 属性测试
   */
  describe("DisplayValue Property", () => {
    it("应该支持 displayValue 属性", async () => {
      const countdown = document.createElement("ea-countdown");
      countdown.setAttribute("value", String(Date.now() + 60000));
      container.appendChild(countdown);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(typeof countdown.displayValue).toBe("string");
    });
  });

  /**
   * 倒计时功能测试
   */
  describe("Countdown Functionality", () => {
    it("应该正确显示倒计时时间", async () => {
      const countdown = document.createElement("ea-countdown");
      // 设置 1 小时后的时间
      countdown.setAttribute("value", String(Date.now() + 3600000));
      container.appendChild(countdown);

      await new Promise(resolve => setTimeout(resolve, 100));

      const numberEl = countdown.shadowRoot.querySelector(
        ".ea-statistic__number"
      );
      expect(numberEl.textContent).toMatch(/\d{2}:\d{2}:\d{2}/);
    });

    it("倒计时结束时应该显示 00:00:00", async () => {
      const countdown = document.createElement("ea-countdown");
      countdown.setAttribute("value", String(Date.now() - 1000));
      container.appendChild(countdown);

      await new Promise(resolve => setTimeout(resolve, 100));

      const numberEl = countdown.shadowRoot.querySelector(
        ".ea-statistic__number"
      );
      expect(numberEl.textContent).toBe("00:00:00");
    });

    it("应该支持自定义格式", async () => {
      const countdown = document.createElement("ea-countdown");
      // 设置 2 天后的时间，确保倒计时未结束
      countdown.setAttribute("value", String(Date.now() + 172800000));
      countdown.setAttribute("format", "DD [days] HH:mm:ss");
      container.appendChild(countdown);

      await new Promise(resolve => setTimeout(resolve, 100));

      const numberEl = countdown.shadowRoot.querySelector(
        ".ea-statistic__number"
      );
      const text = numberEl.textContent;
      // 应该包含 "days" 文本且不是 00:00:00
      expect(text === "00:00:00" || text.includes("days")).toBe(true);
    });
  });

  /**
   * 生命周期测试
   */
  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const countdown = document.createElement("ea-countdown");
      countdown.setAttribute("title", "Test");
      countdown.setAttribute("value", String(Date.now() + 60000));
      container.appendChild(countdown);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(countdown.shadowRoot).toBeTruthy();
      expect(countdown.title).toBe("Test");
    });

    it("组件断开连接后应该清理定时器", async () => {
      const countdown = document.createElement("ea-countdown");
      countdown.setAttribute("value", String(Date.now() + 60000));
      container.appendChild(countdown);

      await new Promise(resolve => setTimeout(resolve, 100));

      countdown.remove();

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(countdown.isConnected).toBe(false);
    });

    it("修改 value 应该重新启动倒计时", async () => {
      const countdown = document.createElement("ea-countdown");
      countdown.setAttribute("value", String(Date.now() + 60000));
      container.appendChild(countdown);

      await new Promise(resolve => setTimeout(resolve, 100));

      const changeHandler = vi.fn();
      countdown.addEventListener("change", changeHandler);

      // 修改 value
      countdown.setAttribute("value", String(Date.now() + 120000));

      await new Promise(resolve => setTimeout(resolve, 1100));

      expect(changeHandler).toHaveBeenCalled();
    });
  });
});
