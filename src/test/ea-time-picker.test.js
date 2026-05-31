import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender.js";

import "../components/ea-time-picker/index";

Element.prototype.scrollTo = Element.prototype.scrollTo || function () {};

ElementInternals.prototype.setValidity =
  ElementInternals.prototype.setValidity ||
  function (flags, message) {
    if (!this.validity) {
      this.validity = { valid: true };
    }
    this.validity.valid = !flags || Object.keys(flags).length === 0;
    this.validationMessage = message || "";
  };

ElementInternals.prototype.reportValidity =
  ElementInternals.prototype.reportValidity ||
  function () {
    return this.validity ? this.validity.valid : true;
  };

ElementInternals.prototype.setFormValue =
  ElementInternals.prototype.setFormValue || function () {};

describe("EaTimePicker Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
    document.querySelectorAll("ea-time-picker").forEach(el => el.remove());
  });

  describe("Basic Rendering", () => {
    it("应该正确渲染组件", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      expect(timePicker.shadowRoot).toBeTruthy();
      expect(
        timePicker.shadowRoot.querySelector(".ea-time-picker")
      ).toBeTruthy();
    });

    it("应该包含 container CSS Part", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      expect(
        timePicker.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
    });

    it("应该包含 input CSS Part", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      expect(
        timePicker.shadowRoot.querySelector('[part="input"]')
      ).toBeTruthy();
    });

    it("应该包含 dropdown CSS Part", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      expect(
        timePicker.shadowRoot.querySelector('[part="dropdown"]')
      ).toBeTruthy();
    });

    it("应该包含 dropdown-inner-wrap CSS Part", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      expect(
        timePicker.shadowRoot.querySelector('[part="dropdown-inner-wrap"]')
      ).toBeTruthy();
    });

    it("应该包含三个 dropdown-time CSS Part (时/分/秒)", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      const timeLists = timePicker.shadowRoot.querySelectorAll(
        '[part="dropdown-time"]'
      );
      expect(timeLists.length).toBe(3);
    });

    it("应该包含 dropdown-item CSS Part", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      const items = timePicker.shadowRoot.querySelectorAll(
        '[part="dropdown-item"]'
      );
      expect(items.length).toBeGreaterThan(0);
    });

    it("小时列表应该有 24 项 (0-23)", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      const hourWrap = timePicker.shadowRoot.querySelector(
        ".ea-time-picker__dropdown-inner--hour"
      );
      const items = hourWrap.querySelectorAll("li");
      expect(items.length).toBe(24);
    });

    it("分钟列表应该有 60 项 (0-59)", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      const minuteWrap = timePicker.shadowRoot.querySelector(
        ".ea-time-picker__dropdown-inner--minute"
      );
      const items = minuteWrap.querySelectorAll("li");
      expect(items.length).toBe(60);
    });

    it("秒列表应该有 60 项 (0-59)", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      const secondWrap = timePicker.shadowRoot.querySelector(
        ".ea-time-picker__dropdown-inner--second"
      );
      const items = secondWrap.querySelectorAll("li");
      expect(items.length).toBe(60);
    });
  });

  describe("Internal Input Properties", () => {
    it("内部 ea-input 应该有 readonly 属性", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      const input = timePicker.shadowRoot.querySelector("ea-input");
      expect(input.hasAttribute("readonly")).toBe(true);
    });

    it("内部 ea-input 应该有 autocomplete=off", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      const input = timePicker.shadowRoot.querySelector("ea-input");
      expect(input.getAttribute("autocomplete")).toBe("off");
    });

    it("内部 ea-input 应该有 prefix-icon=clock", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      const input = timePicker.shadowRoot.querySelector("ea-input");
      expect(input.getAttribute("prefix-icon")).toBe("clock");
    });
  });

  describe("BEM Class Names", () => {
    it("容器应该有 ea-time-picker 类名", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      const containerEl =
        timePicker.shadowRoot.querySelector(".ea-time-picker");
      expect(containerEl.classList.contains("ea-time-picker")).toBe(true);
    });

    it("disabled=true 时容器应该有 is-disabled 状态类", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.setAttribute("disabled", "");
      container.appendChild(timePicker);

      await waitForRender();

      const containerEl =
        timePicker.shadowRoot.querySelector(".ea-time-picker");
      expect(containerEl.classList.contains("is-disabled")).toBe(true);
    });

    it("size=small 时容器应该有 ea-time-picker--small 修饰符类", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.setAttribute("size", "small");
      container.appendChild(timePicker);

      await waitForRender();

      const containerEl =
        timePicker.shadowRoot.querySelector(".ea-time-picker");
      expect(containerEl.classList.contains("ea-time-picker--small")).toBe(
        true
      );
    });

    it("size=large 时容器应该有 ea-time-picker--large 修饰符类", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.setAttribute("size", "large");
      container.appendChild(timePicker);

      await waitForRender();

      const containerEl =
        timePicker.shadowRoot.querySelector(".ea-time-picker");
      expect(containerEl.classList.contains("ea-time-picker--large")).toBe(
        true
      );
    });

    it("size=default 时容器不应该有 size 修饰符类", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.setAttribute("size", "default");
      container.appendChild(timePicker);

      await waitForRender();

      const containerEl =
        timePicker.shadowRoot.querySelector(".ea-time-picker");
      expect(containerEl.classList.contains("ea-time-picker--default")).toBe(
        false
      );
    });

    it("align=center 时容器应该有 is-align-center 状态类", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.setAttribute("align", "center");
      container.appendChild(timePicker);

      await waitForRender();

      const containerEl =
        timePicker.shadowRoot.querySelector(".ea-time-picker");
      expect(containerEl.classList.contains("is-align-center")).toBe(true);
    });

    it("align=right 时容器应该有 is-align-right 状态类", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.setAttribute("align", "right");
      container.appendChild(timePicker);

      await waitForRender();

      const containerEl =
        timePicker.shadowRoot.querySelector(".ea-time-picker");
      expect(containerEl.classList.contains("is-align-right")).toBe(true);
    });

    it("align=left 时容器不应该有 align 状态类", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      const containerEl =
        timePicker.shadowRoot.querySelector(".ea-time-picker");
      expect(containerEl.classList.contains("is-align-left")).toBe(false);
      expect(containerEl.classList.contains("is-align-center")).toBe(false);
      expect(containerEl.classList.contains("is-align-right")).toBe(false);
    });

    it("打开下拉面板后容器应该有 is-open 状态类", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      timePicker.handleOpen();
      await waitForRender();

      const containerEl =
        timePicker.shadowRoot.querySelector(".ea-time-picker");
      expect(containerEl.classList.contains("is-open")).toBe(true);
    });

    it("关闭下拉面板后容器不应该有 is-open 状态类", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      timePicker.handleOpen();
      await waitForRender();
      timePicker.handleClose();
      await waitForRender();

      const containerEl =
        timePicker.shadowRoot.querySelector(".ea-time-picker");
      expect(containerEl.classList.contains("is-open")).toBe(false);
    });

    it("dropdown 元素应该有 ea-time-picker__dropdown 类名", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      const dropdown = timePicker.shadowRoot.querySelector(
        ".ea-time-picker__dropdown"
      );
      expect(dropdown).toBeTruthy();
    });

    it("dropdown-item 元素应该有 ea-time-picker__dropdown-item 类名", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      const firstItem = timePicker.shadowRoot.querySelector(
        ".ea-time-picker__dropdown-item"
      );
      expect(firstItem).toBeTruthy();
    });
  });

  describe("Value Attribute", () => {
    it("默认 value 应该是空字符串", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      expect(timePicker.value).toBe("");
    });

    it("应该支持通过 JS 属性设置 value", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      timePicker.value = "08:30:00";
      await waitForRender();

      expect(timePicker.value).toBe("08:30:00");
    });

    it("应该支持通过 HTML 属性设置 value", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.setAttribute("value", "23:59:59");
      container.appendChild(timePicker);

      await waitForRender();

      expect(timePicker.value).toBe("23:59:59");
    });

    it("动态更新 value 应该生效", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.value = "08:00:00";
      container.appendChild(timePicker);

      await waitForRender();

      timePicker.value = "16:30:00";
      await waitForRender();

      expect(timePicker.value).toBe("16:30:00");
    });

    it("空值应该正常处理", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.value = "12:00:00";
      container.appendChild(timePicker);

      await waitForRender();

      timePicker.value = "";
      await waitForRender();

      expect(timePicker.value).toBe("");
    });

    it("设置 value 后输入框应该显示正确的值", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.setAttribute("value", "14:30:45");
      container.appendChild(timePicker);

      await waitForRender();

      const input = timePicker.shadowRoot.querySelector("ea-input");
      expect(input.value).toBe("14:30:45");
    });
  });

  describe("Disabled Attribute", () => {
    it("默认 disabled 应该是 false", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      expect(timePicker.disabled).toBe(false);
    });

    it("设置 disabled 应该禁用组件", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.setAttribute("disabled", "");
      container.appendChild(timePicker);

      await waitForRender();

      expect(timePicker.disabled).toBe(true);
    });

    it("通过 JS 设置 disabled=true 应该禁用组件", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      timePicker.disabled = true;
      await waitForRender();

      expect(timePicker.disabled).toBe(true);
    });

    it("动态切换 disabled 状态应该生效", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.setAttribute("disabled", "");
      container.appendChild(timePicker);

      await waitForRender();

      expect(timePicker.disabled).toBe(true);

      timePicker.removeAttribute("disabled");
      await waitForRender();

      expect(timePicker.disabled).toBe(false);
    });

    it("disabled 时 handleOpen 不应该打开下拉面板", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.setAttribute("disabled", "");
      container.appendChild(timePicker);

      await waitForRender();

      timePicker.handleOpen();
      await waitForRender();

      const containerEl =
        timePicker.shadowRoot.querySelector(".ea-time-picker");
      expect(containerEl.classList.contains("is-open")).toBe(false);
    });
  });

  describe("Size Attribute", () => {
    it("默认 size 应该是 default", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      expect(timePicker.size).toBe("default");
    });

    it("应该支持 size='small'", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.setAttribute("size", "small");
      container.appendChild(timePicker);

      await waitForRender();

      expect(timePicker.size).toBe("small");
    });

    it("应该支持 size='default'", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.setAttribute("size", "default");
      container.appendChild(timePicker);

      await waitForRender();

      expect(timePicker.size).toBe("default");
    });

    it("应该支持 size='large'", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.setAttribute("size", "large");
      container.appendChild(timePicker);

      await waitForRender();

      expect(timePicker.size).toBe("large");
    });

    it("通过 JS 设置 size 应该生效", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      timePicker.size = "large";
      await waitForRender();

      expect(timePicker.size).toBe("large");
    });

    it("size 属性应该传递给内部 ea-input", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.setAttribute("size", "large");
      container.appendChild(timePicker);

      await waitForRender();

      const input = timePicker.shadowRoot.querySelector("ea-input");
      expect(input.getAttribute("size")).toBe("large");
    });
  });

  describe("Align Attribute", () => {
    it("默认 align 应该是 left", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      expect(timePicker.align).toBe("left");
    });

    it("应该支持 align='center'", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.setAttribute("align", "center");
      container.appendChild(timePicker);

      await waitForRender();

      expect(timePicker.align).toBe("center");
    });

    it("应该支持 align='right'", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.setAttribute("align", "right");
      container.appendChild(timePicker);

      await waitForRender();

      expect(timePicker.align).toBe("right");
    });

    it("通过 JS 设置 align 应该生效", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      timePicker.align = "right";
      await waitForRender();

      expect(timePicker.align).toBe("right");
    });

    it("动态切换 align 类名应该更新", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      timePicker.setAttribute("align", "center");
      await waitForRender();

      const containerEl =
        timePicker.shadowRoot.querySelector(".ea-time-picker");
      expect(containerEl.classList.contains("is-align-center")).toBe(true);
      expect(containerEl.classList.contains("is-align-right")).toBe(false);
    });
  });

  describe("Width Attribute", () => {
    it("默认 width 应该是空字符串", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      expect(timePicker.width).toBe("");
    });

    it("应该支持 width 属性", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.setAttribute("width", "200px");
      container.appendChild(timePicker);

      await waitForRender();

      expect(timePicker.width).toBe("200px");
    });

    it("width 应该设置 --ea-time-picker-width CSS 变量", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.setAttribute("width", "300px");
      container.appendChild(timePicker);

      await waitForRender();

      const containerEl =
        timePicker.shadowRoot.querySelector(".ea-time-picker");
      expect(containerEl.style.getPropertyValue("--ea-time-picker-width")).toBe(
        "300px"
      );
    });
  });

  describe("Label Attribute", () => {
    it("默认 label 应该是空字符串", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      expect(timePicker.label).toBe("");
    });

    it("应该支持 label 属性", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.setAttribute("label", "Time Label");
      container.appendChild(timePicker);

      await waitForRender();

      expect(timePicker.label).toBe("Time Label");
    });

    it("label 应该传递给内部 ea-input", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.setAttribute("label", "My Label");
      container.appendChild(timePicker);

      await waitForRender();

      const input = timePicker.shadowRoot.querySelector("ea-input");
      expect(input.label).toBe("My Label");
    });
  });

  describe("Placeholder Attribute", () => {
    it("默认 placeholder 应该是 Select time", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      expect(timePicker.placeholder).toBe("Select time");
    });

    it("应该支持通过 HTML 属性设置 placeholder", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.setAttribute("placeholder", "Custom placeholder");
      container.appendChild(timePicker);

      await waitForRender();

      expect(timePicker.placeholder).toBe("Custom placeholder");
    });

    it("通过 JS 设置 placeholder 应该生效", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      timePicker.placeholder = "New placeholder";
      await waitForRender();

      expect(timePicker.placeholder).toBe("New placeholder");
    });

    it("placeholder 应该传递给内部 ea-input", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.setAttribute("placeholder", "Test placeholder");
      container.appendChild(timePicker);

      await waitForRender();

      const input = timePicker.shadowRoot.querySelector("ea-input");
      expect(input.placeholder).toBe("Test placeholder");
    });
  });

  describe("Limit Range Attributes", () => {
    it("默认 limit-range-start 应该是 00:00:00", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      expect(timePicker.limitRangeStart).toBe("00:00:00");
    });

    it("默认 limit-range-end 应该是 23:59:59", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      expect(timePicker.limitRangeEnd).toBe("23:59:59");
    });

    it("应该支持通过 HTML 属性设置 limit-range-start", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.setAttribute("limit-range-start", "09:00:00");
      container.appendChild(timePicker);

      await waitForRender();

      expect(timePicker.limitRangeStart).toBe("09:00:00");
    });

    it("应该支持通过 HTML 属性设置 limit-range-end", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.setAttribute("limit-range-end", "18:00:00");
      container.appendChild(timePicker);

      await waitForRender();

      expect(timePicker.limitRangeEnd).toBe("18:00:00");
    });

    it("limit-range 应该使超出范围的项被禁用", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.setAttribute("limit-range-start", "09:00:00");
      timePicker.setAttribute("limit-range-end", "18:00:00");
      container.appendChild(timePicker);

      await waitForRender();

      const hourWrap = timePicker.shadowRoot.querySelector(
        ".ea-time-picker__dropdown-inner--hour"
      );
      const hour08 = hourWrap.querySelector('li[data-value="8"]');
      const hour09 = hourWrap.querySelector('li[data-value="9"]');
      const hour18 = hourWrap.querySelector('li[data-value="18"]');
      const hour19 = hourWrap.querySelector('li[data-value="19"]');

      expect(hour08.classList.contains("is-disabled")).toBe(true);
      expect(hour09.classList.contains("is-disabled")).toBe(false);
      expect(hour18.classList.contains("is-disabled")).toBe(false);
      expect(hour19.classList.contains("is-disabled")).toBe(true);
    });

    it("同时支持 limit-range-start 和 limit-range-end", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.setAttribute("limit-range-start", "09:00:00");
      timePicker.setAttribute("limit-range-end", "18:00:00");
      container.appendChild(timePicker);

      await waitForRender();

      expect(timePicker.limitRangeStart).toBe("09:00:00");
      expect(timePicker.limitRangeEnd).toBe("18:00:00");
    });

    it("动态修改 limitRangeStart 应该重新应用范围限制", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      const hourWrap = timePicker.shadowRoot.querySelector(
        ".ea-time-picker__dropdown-inner--hour"
      );

      timePicker.limitRangeStart = "09:00:00";
      await waitForRender();

      const hour08 = hourWrap.querySelector('li[data-value="8"]');
      const hour09 = hourWrap.querySelector('li[data-value="9"]');
      expect(hour08.classList.contains("is-disabled")).toBe(true);
      expect(hour09.classList.contains("is-disabled")).toBe(false);
    });

    it("动态修改 limitRangeEnd 应该重新应用范围限制", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      const hourWrap = timePicker.shadowRoot.querySelector(
        ".ea-time-picker__dropdown-inner--hour"
      );

      timePicker.limitRangeEnd = "18:00:00";
      await waitForRender();

      const hour18 = hourWrap.querySelector('li[data-value="18"]');
      const hour19 = hourWrap.querySelector('li[data-value="19"]');
      expect(hour18.classList.contains("is-disabled")).toBe(false);
      expect(hour19.classList.contains("is-disabled")).toBe(true);
    });

    it("动态修改 limitRangeStart 和 limitRangeEnd 应该同时生效", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      timePicker.limitRangeStart = "09:00:00";
      timePicker.limitRangeEnd = "18:00:00";
      await waitForRender();

      const hourWrap = timePicker.shadowRoot.querySelector(
        ".ea-time-picker__dropdown-inner--hour"
      );
      const hour08 = hourWrap.querySelector('li[data-value="8"]');
      const hour09 = hourWrap.querySelector('li[data-value="9"]');
      const hour18 = hourWrap.querySelector('li[data-value="18"]');
      const hour19 = hourWrap.querySelector('li[data-value="19"]');

      expect(hour08.classList.contains("is-disabled")).toBe(true);
      expect(hour09.classList.contains("is-disabled")).toBe(false);
      expect(hour18.classList.contains("is-disabled")).toBe(false);
      expect(hour19.classList.contains("is-disabled")).toBe(true);
    });

    it("limit-range 应该限制分钟列表", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.setAttribute("limit-range-start", "09:15:30");
      timePicker.setAttribute("limit-range-end", "18:45:30");
      container.appendChild(timePicker);

      await waitForRender();

      const minuteWrap = timePicker.shadowRoot.querySelector(
        ".ea-time-picker__dropdown-inner--minute"
      );
      const min14 = minuteWrap.querySelector('li[data-value="14"]');
      const min15 = minuteWrap.querySelector('li[data-value="15"]');
      const min45 = minuteWrap.querySelector('li[data-value="45"]');
      const min46 = minuteWrap.querySelector('li[data-value="46"]');

      expect(min14.classList.contains("is-disabled")).toBe(true);
      expect(min15.classList.contains("is-disabled")).toBe(false);
      expect(min45.classList.contains("is-disabled")).toBe(false);
      expect(min46.classList.contains("is-disabled")).toBe(true);
    });

    it("limit-range 应该限制秒列表", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.setAttribute("limit-range-start", "09:15:30");
      timePicker.setAttribute("limit-range-end", "18:45:45");
      container.appendChild(timePicker);

      await waitForRender();

      const secondWrap = timePicker.shadowRoot.querySelector(
        ".ea-time-picker__dropdown-inner--second"
      );
      const sec29 = secondWrap.querySelector('li[data-value="29"]');
      const sec30 = secondWrap.querySelector('li[data-value="30"]');
      const sec45 = secondWrap.querySelector('li[data-value="45"]');
      const sec46 = secondWrap.querySelector('li[data-value="46"]');

      expect(sec29.classList.contains("is-disabled")).toBe(true);
      expect(sec30.classList.contains("is-disabled")).toBe(false);
      expect(sec45.classList.contains("is-disabled")).toBe(false);
      expect(sec46.classList.contains("is-disabled")).toBe(true);
    });
  });

  describe("Required Attribute", () => {
    it("默认 required 应该是 false", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      expect(timePicker.required).toBe(false);
    });

    it("设置 required 应该启用必填验证", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.setAttribute("required", "");
      container.appendChild(timePicker);

      await waitForRender();

      expect(timePicker.required).toBe(true);
    });

    it("通过 JS 设置 required=true 应该生效", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      timePicker.required = true;
      await waitForRender();

      expect(timePicker.required).toBe(true);
    });

    it("required 应该传递给内部 ea-input", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.setAttribute("required", "");
      container.appendChild(timePicker);

      await waitForRender();

      const input = timePicker.shadowRoot.querySelector("ea-input");
      expect(input.hasAttribute("required")).toBe(true);
    });

    it("非必填且无值时 checkValidity 应该返回 true", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      expect(timePicker.checkValidity()).toBe(true);
    });

    it("非必填且有值时 checkValidity 应该返回 true", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.setAttribute("value", "12:00:00");
      container.appendChild(timePicker);

      await waitForRender();

      expect(timePicker.checkValidity()).toBe(true);
    });

    it("必填且有值时 checkValidity 应该返回 true", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.setAttribute("required", "");
      timePicker.setAttribute("value", "12:00:00");
      container.appendChild(timePicker);

      await waitForRender();

      expect(timePicker.checkValidity()).toBe(true);
    });

    it("必填且无值时 checkValidity 应该返回 false", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.setAttribute("required", "");
      container.appendChild(timePicker);

      await waitForRender();

      expect(timePicker.checkValidity()).toBe(false);
    });

    it("reportValidity 不应该抛出异常", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      expect(() => timePicker.reportValidity()).not.toThrow();
    });
  });

  describe("Dropdown Behavior", () => {
    it("点击 input 应该打开下拉面板", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      const input = timePicker.shadowRoot.querySelector("ea-input");
      input.click();
      await waitForRender();

      const containerEl =
        timePicker.shadowRoot.querySelector(".ea-time-picker");
      expect(containerEl.classList.contains("is-open")).toBe(true);
    });

    it("focus() 应该打开下拉面板", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      timePicker.focus();
      await waitForRender();

      const containerEl =
        timePicker.shadowRoot.querySelector(".ea-time-picker");
      expect(containerEl.classList.contains("is-open")).toBe(true);
    });

    it("点击组件外部应该关闭下拉面板", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      timePicker.handleOpen();
      await waitForRender();

      const containerEl =
        timePicker.shadowRoot.querySelector(".ea-time-picker");
      expect(containerEl.classList.contains("is-open")).toBe(true);

      document.body.click();
      await waitForRender();

      expect(containerEl.classList.contains("is-open")).toBe(false);
    });

    it("disabled 时点击不应该打开下拉面板", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.setAttribute("disabled", "");
      container.appendChild(timePicker);

      await waitForRender();

      const input = timePicker.shadowRoot.querySelector("ea-input");
      input.click();
      await waitForRender();

      const containerEl =
        timePicker.shadowRoot.querySelector(".ea-time-picker");
      expect(containerEl.classList.contains("is-open")).toBe(false);
    });

    it("disabled 时 focus() 不应该打开下拉面板", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.setAttribute("disabled", "");
      container.appendChild(timePicker);

      await waitForRender();

      timePicker.focus();
      await waitForRender();

      const containerEl =
        timePicker.shadowRoot.querySelector(".ea-time-picker");
      expect(containerEl.classList.contains("is-open")).toBe(false);
    });
  });

  describe("Events", () => {
    it("应该触发 focus 事件", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      let focusTriggered = false;
      timePicker.addEventListener("focus", () => {
        focusTriggered = true;
      });

      timePicker.focus();
      await waitForRender();

      expect(focusTriggered).toBe(true);
    });

    it("应该触发 blur 事件", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      let blurTriggered = false;
      timePicker.addEventListener("blur", () => {
        blurTriggered = true;
      });

      timePicker.focus();
      await waitForRender();
      timePicker.blur();
      await waitForRender();

      expect(blurTriggered).toBe(true);
    });

    it("handleOpen 应该触发 ea-visible-change 事件 (visible=true)", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      let visibleChangeDetail = null;
      timePicker.addEventListener("ea-visible-change", e => {
        visibleChangeDetail = e.detail;
      });

      timePicker.handleOpen();
      await waitForRender();

      expect(visibleChangeDetail).toBeDefined();
      expect(visibleChangeDetail.visible).toBe(true);
    });

    it("handleClose 应该触发 ea-visible-change 事件 (visible=false)", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      timePicker.handleOpen();
      await waitForRender();

      let visibleChangeDetail = null;
      timePicker.addEventListener("ea-visible-change", e => {
        visibleChangeDetail = e.detail;
      });

      timePicker.handleClose();
      await waitForRender();

      expect(visibleChangeDetail).toBeDefined();
      expect(visibleChangeDetail.visible).toBe(false);
    });

    it("点击下拉面板中的时间项应该触发 change 事件", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      timePicker.handleOpen();
      await waitForRender();

      let changeDetail = null;
      timePicker.addEventListener("change", e => {
        changeDetail = e.detail;
      });

      const hourWrap = timePicker.shadowRoot.querySelector(
        ".ea-time-picker__dropdown-inner--hour"
      );
      const hour10 = hourWrap.querySelector('li[data-value="10"]');
      hour10.click();

      await waitForRender(200);

      expect(changeDetail).toBeDefined();
      expect(changeDetail.value).toBe("10:00:00");
    });

    it("点击分钟项应该触发 change 事件且值正确", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.setAttribute("value", "10:00:00");
      container.appendChild(timePicker);

      await waitForRender();

      timePicker.handleOpen();
      await waitForRender();

      let changeDetail = null;
      timePicker.addEventListener("change", e => {
        changeDetail = e.detail;
      });

      const minuteWrap = timePicker.shadowRoot.querySelector(
        ".ea-time-picker__dropdown-inner--minute"
      );
      const minute30 = minuteWrap.querySelector('li[data-value="30"]');
      minute30.click();

      await waitForRender(200);

      expect(changeDetail).toBeDefined();
      expect(changeDetail.value).toBe("10:30:00");
    });

    it("点击秒项应该触发 change 事件且值正确", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.setAttribute("value", "10:30:00");
      container.appendChild(timePicker);

      await waitForRender();

      timePicker.handleOpen();
      await waitForRender();

      let changeDetail = null;
      timePicker.addEventListener("change", e => {
        changeDetail = e.detail;
      });

      const secondWrap = timePicker.shadowRoot.querySelector(
        ".ea-time-picker__dropdown-inner--second"
      );
      const second45 = secondWrap.querySelector('li[data-value="45"]');
      second45.click();

      await waitForRender(200);

      expect(changeDetail).toBeDefined();
      expect(changeDetail.value).toBe("10:30:45");
    });

    it("重复打开不应该重复触发 ea-visible-change 事件", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      let callCount = 0;
      timePicker.addEventListener("ea-visible-change", () => {
        callCount++;
      });

      timePicker.handleOpen();
      await waitForRender();
      timePicker.handleOpen();
      await waitForRender();

      expect(callCount).toBe(1);
    });

    it("重复关闭不应该重复触发 ea-visible-change 事件", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      timePicker.handleOpen();
      await waitForRender();

      let callCount = 0;
      timePicker.addEventListener("ea-visible-change", () => {
        callCount++;
      });

      timePicker.handleClose();
      await waitForRender();
      timePicker.handleClose();
      await waitForRender();

      expect(callCount).toBe(1);
    });

    it("disabled 时点击不应该打开面板或触发事件", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.setAttribute("disabled", "");
      container.appendChild(timePicker);

      await waitForRender();

      let eventTriggered = false;
      timePicker.addEventListener("ea-visible-change", () => {
        eventTriggered = true;
      });

      timePicker.handleOpen();
      await waitForRender();

      expect(eventTriggered).toBe(false);
    });

    it("change 事件应该包含正确的 value detail", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      timePicker.handleOpen();
      await waitForRender();

      let changeDetail = null;
      timePicker.addEventListener("change", e => {
        changeDetail = e.detail;
      });

      const hourWrap = timePicker.shadowRoot.querySelector(
        ".ea-time-picker__dropdown-inner--hour"
      );
      const hour15 = hourWrap.querySelector('li[data-value="15"]');
      hour15.click();

      await waitForRender(200);

      expect(changeDetail).not.toBeNull();
      expect(changeDetail.value).toBeDefined();
      expect(typeof changeDetail.value).toBe("string");
    });
  });

  describe("Methods", () => {
    it("handleOpen 方法应该打开下拉面板", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      timePicker.handleOpen();
      await waitForRender();

      const containerEl =
        timePicker.shadowRoot.querySelector(".ea-time-picker");
      expect(containerEl.classList.contains("is-open")).toBe(true);
    });

    it("handleClose 方法应该关闭下拉面板", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      timePicker.handleOpen();
      await waitForRender();
      timePicker.handleClose();
      await waitForRender();

      const containerEl =
        timePicker.shadowRoot.querySelector(".ea-time-picker");
      expect(containerEl.classList.contains("is-open")).toBe(false);
    });

    it("focus 方法不应该抛出错误", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      expect(() => timePicker.focus()).not.toThrow();
    });

    it("blur 方法不应该抛出错误", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      expect(() => timePicker.blur()).not.toThrow();
    });

    it("focus() 应该打开下拉面板", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      timePicker.focus();
      await waitForRender();

      const containerEl =
        timePicker.shadowRoot.querySelector(".ea-time-picker");
      expect(containerEl.classList.contains("is-open")).toBe(true);
    });
  });

  describe("Form Association", () => {
    it("validationTarget 应该返回内部 ea-input", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      const input = timePicker.shadowRoot.querySelector("ea-input");
      expect(timePicker.validationTarget).toBe(input);
    });

    it("form.reset() 不应该抛出异常", async () => {
      const form = document.createElement("form");
      const timePicker = document.createElement("ea-time-picker");
      timePicker.setAttribute("name", "time");
      timePicker.setAttribute("value", "12:00:00");
      form.appendChild(timePicker);
      container.appendChild(form);

      await waitForRender();

      expect(() => form.reset()).not.toThrow();
    });

    it("name 属性应该正确设置", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.setAttribute("name", "timeField");
      container.appendChild(timePicker);

      await waitForRender();

      expect(timePicker.name).toBe("timeField");
    });
  });

  describe("Combined Tests", () => {
    it("应该同时支持 value 和 label", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.setAttribute("value", "08:00:00");
      timePicker.setAttribute("label", "Select time");
      container.appendChild(timePicker);

      await waitForRender();

      expect(timePicker.value).toBe("08:00:00");
      expect(timePicker.label).toBe("Select time");
    });

    it("应该同时支持 disabled 和 size", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.setAttribute("disabled", "");
      timePicker.setAttribute("size", "large");
      container.appendChild(timePicker);

      await waitForRender();

      expect(timePicker.disabled).toBe(true);
      expect(timePicker.size).toBe("large");
    });

    it("应该同时支持 limit-range-start/limit-range-end 和 value", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.setAttribute("limit-range-start", "09:00:00");
      timePicker.setAttribute("limit-range-end", "18:00:00");
      timePicker.setAttribute("value", "12:30:00");
      container.appendChild(timePicker);

      await waitForRender();

      expect(timePicker.value).toBe("12:30:00");
      expect(timePicker.limitRangeStart).toBe("09:00:00");
      expect(timePicker.limitRangeEnd).toBe("18:00:00");
    });

    it("disabled 和 align 同时设置时都应该生效", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.setAttribute("disabled", "");
      timePicker.setAttribute("align", "center");
      container.appendChild(timePicker);

      await waitForRender();

      const containerEl =
        timePicker.shadowRoot.querySelector(".ea-time-picker");
      expect(containerEl.classList.contains("is-disabled")).toBe(true);
      expect(containerEl.classList.contains("is-align-center")).toBe(true);
    });
  });

  describe("Edge Cases", () => {
    it("多个 time-picker 应该独立工作", async () => {
      const picker1 = document.createElement("ea-time-picker");
      picker1.setAttribute("value", "08:00:00");

      const picker2 = document.createElement("ea-time-picker");
      picker2.setAttribute("value", "16:00:00");

      container.appendChild(picker1);
      container.appendChild(picker2);

      await waitForRender();

      expect(picker1.value).toBe("08:00:00");
      expect(picker2.value).toBe("16:00:00");
    });

    it("延迟添加到 DOM 的组件应该正确渲染", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.setAttribute("value", "12:30:00");

      await waitForRender(50);

      container.appendChild(timePicker);

      await waitForRender();

      expect(timePicker.shadowRoot).toBeTruthy();
      expect(timePicker.value).toBe("12:30:00");
    });

    it("移除后重新添加 value 应该保留", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.setAttribute("value", "18:30:45");
      container.appendChild(timePicker);

      await waitForRender();

      timePicker.remove();
      container.appendChild(timePicker);

      await waitForRender();

      expect(timePicker.value).toBe("18:30:45");
    });

    it("无效的 limit-range 值不会导致崩溃", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      expect(() => {
        timePicker.limitRangeStart = "invalid";
      }).not.toThrow();
    });

    it("点击禁用的时间项不应该触发 change 事件", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.setAttribute("limit-range-start", "09:00:00");
      timePicker.setAttribute("limit-range-end", "18:00:00");
      container.appendChild(timePicker);

      await waitForRender();

      timePicker.handleOpen();
      await waitForRender();

      let changeTriggered = false;
      timePicker.addEventListener("change", () => {
        changeTriggered = true;
      });

      const hourWrap = timePicker.shadowRoot.querySelector(
        ".ea-time-picker__dropdown-inner--hour"
      );
      const hour05 = hourWrap.querySelector('li[data-value="5"]');
      hour05.click();

      await waitForRender(200);

      expect(changeTriggered).toBe(false);
    });
  });

  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.setAttribute("value", "12:30:00");
      container.appendChild(timePicker);

      await waitForRender();

      expect(timePicker.shadowRoot).toBeTruthy();
      expect(timePicker.value).toBe("12:30:00");
    });

    it("组件断开连接后应该正常移除", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      timePicker.remove();

      expect(container.contains(timePicker)).toBe(false);
    });

    it("动态修改 disabled 应该更新 BEM 状态类", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      timePicker.setAttribute("disabled", "");
      await waitForRender();

      const containerEl =
        timePicker.shadowRoot.querySelector(".ea-time-picker");
      expect(containerEl.classList.contains("is-disabled")).toBe(true);

      timePicker.removeAttribute("disabled");
      await waitForRender();

      expect(containerEl.classList.contains("is-disabled")).toBe(false);
    });

    it("动态修改 align 应该更新 BEM 状态类", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      timePicker.setAttribute("align", "right");
      await waitForRender();

      const containerEl =
        timePicker.shadowRoot.querySelector(".ea-time-picker");
      expect(containerEl.classList.contains("is-align-right")).toBe(true);
    });
  });

  describe("Selection State", () => {
    it("设置 value 后对应的时间项应该高亮 (is-active)", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.setAttribute("value", "14:30:45");
      container.appendChild(timePicker);

      await waitForRender();

      const hourWrap = timePicker.shadowRoot.querySelector(
        ".ea-time-picker__dropdown-inner--hour"
      );
      const minuteWrap = timePicker.shadowRoot.querySelector(
        ".ea-time-picker__dropdown-inner--minute"
      );
      const secondWrap = timePicker.shadowRoot.querySelector(
        ".ea-time-picker__dropdown-inner--second"
      );

      const hour14 = hourWrap.querySelector('li[data-value="14"]');
      const minute30 = minuteWrap.querySelector('li[data-value="30"]');
      const second45 = secondWrap.querySelector('li[data-value="45"]');

      expect(hour14.classList.contains("is-active")).toBe(true);
      expect(minute30.classList.contains("is-active")).toBe(true);
      expect(second45.classList.contains("is-active")).toBe(true);
    });

    it("切换 value 后 is-active 应该更新", async () => {
      const timePicker = document.createElement("ea-time-picker");
      timePicker.setAttribute("value", "14:30:45");
      container.appendChild(timePicker);

      await waitForRender();

      const hourWrap = timePicker.shadowRoot.querySelector(
        ".ea-time-picker__dropdown-inner--hour"
      );

      timePicker.value = "08:00:00";
      await waitForRender();

      const hour14 = hourWrap.querySelector('li[data-value="14"]');
      const hour08 = hourWrap.querySelector('li[data-value="8"]');
      expect(hour14.classList.contains("is-active")).toBe(false);
      expect(hour08.classList.contains("is-active")).toBe(true);
    });

    it("未设置 value 时不应该有 is-active 项", async () => {
      const timePicker = document.createElement("ea-time-picker");
      container.appendChild(timePicker);

      await waitForRender();

      const items = timePicker.shadowRoot.querySelectorAll(
        ".ea-time-picker__dropdown-item.is-active"
      );
      expect(items.length).toBe(0);
    });
  });
});
