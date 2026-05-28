import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender.js";

import "../components/ea-date-picker/index";

describe("EaDatePicker", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
    document.querySelectorAll("ea-date-picker").forEach(el => el.remove());
  });

  // ==================== Basic Rendering & DOM Structure ====================

  describe("Basic Rendering", () => {
    it("应该正确渲染组件", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      expect(datePicker.shadowRoot).toBeTruthy();
      expect(
        datePicker.shadowRoot.querySelector(".ea-date-picker")
      ).toBeTruthy();
    });

    it("应该包含 ea-input 元素", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      const input = datePicker.shadowRoot.querySelector("ea-input");
      expect(input).toBeTruthy();
    });

    it("应该包含 ea-calendar 元素", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      const calendar = datePicker.shadowRoot.querySelector("ea-calendar");
      expect(calendar).toBeTruthy();
    });

    it("应该包含日历头部导航按钮", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      expect(
        datePicker.shadowRoot.querySelector(".ea-date-picker__btn-prev-year")
      ).toBeTruthy();
      expect(
        datePicker.shadowRoot.querySelector(".ea-date-picker__btn-next-year")
      ).toBeTruthy();
      expect(
        datePicker.shadowRoot.querySelector(".ea-date-picker__btn-prev-month")
      ).toBeTruthy();
      expect(
        datePicker.shadowRoot.querySelector(".ea-date-picker__btn-next-month")
      ).toBeTruthy();
    });

    it("应该包含年份和月份头部按钮", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      expect(
        datePicker.shadowRoot.querySelector(".ea-date-picker__header-year")
      ).toBeTruthy();
      expect(
        datePicker.shadowRoot.querySelector(".ea-date-picker__header-month")
      ).toBeTruthy();
    });

    it("应该包含年份面板和月份面板", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      expect(
        datePicker.shadowRoot.querySelector(".ea-date-picker__year-panel")
      ).toBeTruthy();
      expect(
        datePicker.shadowRoot.querySelector(".ea-date-picker__month-panel")
      ).toBeTruthy();
    });

    it("应该包含下拉包裹元素", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      expect(
        datePicker.shadowRoot.querySelector(".ea-date-picker__dropdown-wrap")
      ).toBeTruthy();
    });
  });

  // ==================== Value Attribute ====================

  describe("Value Attribute", () => {
    it("默认 value 应该是空字符串", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      expect(datePicker.value).toBe("");
    });

    it("应该支持通过 HTML 属性设置 value", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.setAttribute("value", "2026-01-15");
      container.appendChild(datePicker);

      await waitForRender();

      expect(datePicker.value).toBe("2026-01-15");
    });

    it("应该支持通过 JS 属性设置 value", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      datePicker.value = "2026-03-20";

      await waitForRender();

      expect(datePicker.value).toBe("2026-03-20");
    });

    it("应该支持动态更新 value", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      datePicker.setAttribute("value", "2026-03-20");

      await waitForRender();

      expect(datePicker.value).toBe("2026-03-20");
    });

    it("无效日期值应该回退到当前日期", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.setAttribute("value", "invalid-date");
      container.appendChild(datePicker);

      await waitForRender();

      expect(datePicker.shadowRoot).toBeTruthy();
      expect(datePicker.value).toBeTruthy();
    });

    it("设置 value 后输入框应该显示格式化后的日期", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.setAttribute("value", "2026-01-15");
      container.appendChild(datePicker);

      await waitForRender();

      const input = datePicker.shadowRoot.querySelector("ea-input");
      expect(input.value).toBe("2026-01-15");
    });

    it("设置 value 并打开面板后日历应该同步选中日期", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.setAttribute("value", "2026-06-15");
      container.appendChild(datePicker);

      await waitForRender();

      datePicker.handleOpen();
      await waitForRender();

      const calendar = datePicker.shadowRoot.querySelector("ea-calendar");
      expect(calendar.getAttribute("value")).toBe("2026-06-15");
    });

    it("空字符串 value 不应该导致错误", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.value = "";
      container.appendChild(datePicker);

      await waitForRender();

      expect(datePicker.value).toBe("");
    });

    it("value 更新时应该同步更新 header 显示", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      datePicker.value = "2026-08-20";
      await waitForRender();

      const yearBtn = datePicker.shadowRoot.querySelector(
        ".ea-date-picker__header-year"
      );
      expect(yearBtn.textContent).toBe("2026");
    });
  });

  // ==================== Placeholder Attribute ====================

  describe("Placeholder Attribute", () => {
    it("默认 placeholder 应该是空字符串", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      expect(datePicker.placeholder).toBe("");
    });

    it("应该支持设置 placeholder", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.setAttribute("placeholder", "Pick a Date");
      container.appendChild(datePicker);

      await waitForRender();

      expect(datePicker.placeholder).toBe("Pick a Date");
    });

    it("设置 placeholder 后输入框应该同步", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.setAttribute("placeholder", "请选择日期");
      container.appendChild(datePicker);

      await waitForRender();

      const input = datePicker.shadowRoot.querySelector("ea-input");
      expect(input.getAttribute("placeholder")).toBe("请选择日期");
    });

    it("应该支持动态更新 placeholder", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.setAttribute("placeholder", "old");
      container.appendChild(datePicker);

      await waitForRender();

      datePicker.placeholder = "new placeholder";
      await waitForRender();

      expect(datePicker.placeholder).toBe("new placeholder");
    });
  });

  // ==================== Disabled Attribute ====================

  describe("Disabled Attribute", () => {
    it("默认 disabled 应该是 false", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      expect(datePicker.disabled).toBe(false);
    });

    it("应该支持设置 disabled 为 true", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.disabled = true;
      container.appendChild(datePicker);

      await waitForRender();

      expect(datePicker.disabled).toBe(true);
    });

    it("disabled 时容器应该有 is-disabled 状态类", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.disabled = true;
      container.appendChild(datePicker);

      await waitForRender();

      const containerEl =
        datePicker.shadowRoot.querySelector(".ea-date-picker");
      expect(containerEl.classList.contains("is-disabled")).toBe(true);
    });

    it("disabled 时点击输入框不应该打开下拉面板", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.disabled = true;
      container.appendChild(datePicker);

      await waitForRender();

      datePicker.handleOpen();

      await waitForRender();

      const containerEl =
        datePicker.shadowRoot.querySelector(".ea-date-picker");
      expect(containerEl.classList.contains("is-open")).toBe(false);
    });

    it("disabled 应该可以动态移除", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.disabled = true;
      container.appendChild(datePicker);

      await waitForRender();
      expect(datePicker.disabled).toBe(true);

      datePicker.disabled = false;
      await waitForRender();

      expect(datePicker.disabled).toBe(false);
    });

    it("disabled 时输入框也应该禁用", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.disabled = true;
      container.appendChild(datePicker);

      await waitForRender();

      const input = datePicker.shadowRoot.querySelector("ea-input");
      expect(input.hasAttribute("disabled")).toBe(true);
    });
  });

  // ==================== Variant Attribute & Panel Navigation ====================

  describe("Variant Attribute", () => {
    it("默认 variant 应该是 date", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      expect(datePicker.variant).toBe("date");
    });

    it("应该支持 variant=year", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.setAttribute("variant", "year");
      container.appendChild(datePicker);

      await waitForRender();

      expect(datePicker.variant).toBe("year");
    });

    it("应该支持 variant=month", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.setAttribute("variant", "month");
      container.appendChild(datePicker);

      await waitForRender();

      expect(datePicker.variant).toBe("month");
    });

    it("应该支持 variant=date", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.setAttribute("variant", "date");
      container.appendChild(datePicker);

      await waitForRender();

      expect(datePicker.variant).toBe("date");
    });

    it("variant=year 时打开面板应该显示年份面板", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.setAttribute("variant", "year");
      container.appendChild(datePicker);

      await waitForRender();

      datePicker.handleOpen();

      await waitForRender();

      const containerEl =
        datePicker.shadowRoot.querySelector(".ea-date-picker");
      expect(containerEl.classList.contains("is-view-year")).toBe(true);
    });

    it("variant=month 时打开面板应该显示月份面板", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.setAttribute("variant", "month");
      container.appendChild(datePicker);

      await waitForRender();

      datePicker.handleOpen();

      await waitForRender();

      const containerEl =
        datePicker.shadowRoot.querySelector(".ea-date-picker");
      expect(containerEl.classList.contains("is-view-month")).toBe(true);
    });

    it("variant=date 时打开面板默认应该显示日期面板", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.setAttribute("variant", "date");
      container.appendChild(datePicker);

      await waitForRender();

      datePicker.handleOpen();

      await waitForRender();

      const containerEl =
        datePicker.shadowRoot.querySelector(".ea-date-picker");
      expect(containerEl.classList.contains("is-view-day")).toBe(true);
    });

    it("动态切换 variant=year 应该切换到年份模式", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();
      expect(datePicker.variant).toBe("date");

      datePicker.variant = "year";
      await waitForRender();

      expect(datePicker.variant).toBe("year");
    });

    it("动态切换 variant=month 应该切换到月份模式", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      datePicker.variant = "month";
      await waitForRender();

      expect(datePicker.variant).toBe("month");
    });

    it("variant=year 时 _getDisplayFormat 应该返回 YYYY", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.setAttribute("variant", "year");
      datePicker.setAttribute("value", "2026");
      container.appendChild(datePicker);

      await waitForRender();

      const input = datePicker.shadowRoot.querySelector("ea-input");
      expect(input.value).toBe("2026");
    });

    it("variant=month 时 _getDisplayFormat 应该返回 YYYY-MM", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.setAttribute("variant", "month");
      datePicker.setAttribute("value", "2026-05");
      container.appendChild(datePicker);

      await waitForRender();

      const input = datePicker.shadowRoot.querySelector("ea-input");
      expect(input.value).toBe("2026-05");
    });
  });

  // ==================== Panel View Navigation ====================

  describe("Panel View Navigation", () => {
    it("点击年份头部按钮应该切换到年份视图", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      datePicker.handleOpen();
      await waitForRender();

      const yearBtn = datePicker.shadowRoot.querySelector(
        ".ea-date-picker__header-year"
      );
      yearBtn.click();

      await waitForRender();

      const containerEl =
        datePicker.shadowRoot.querySelector(".ea-date-picker");
      expect(containerEl.classList.contains("is-view-year")).toBe(true);
    });

    it("点击月份头部按钮应该切换到月份视图", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      datePicker.handleOpen();
      await waitForRender();

      const monthBtn = datePicker.shadowRoot.querySelector(
        ".ea-date-picker__header-month"
      );
      monthBtn.click();

      await waitForRender();

      const containerEl =
        datePicker.shadowRoot.querySelector(".ea-date-picker");
      expect(containerEl.classList.contains("is-view-month")).toBe(true);
    });

    it("从年份视图选择年份后应切换至月份视图 (variant=date)", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      datePicker.handleOpen();
      await waitForRender();

      const yearBtn = datePicker.shadowRoot.querySelector(
        ".ea-date-picker__header-year"
      );
      yearBtn.click();
      await waitForRender();

      const yearItems = datePicker.shadowRoot.querySelectorAll(
        ".ea-date-picker__year-item"
      );
      expect(yearItems.length).toBeGreaterThan(0);
      yearItems[5].click();
      await waitForRender();

      const containerEl =
        datePicker.shadowRoot.querySelector(".ea-date-picker");
      expect(containerEl.classList.contains("is-view-month")).toBe(true);
    });

    it("年份面板应该渲染 10 个年份选项", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      datePicker.handleOpen();
      await waitForRender();

      const yearBtn = datePicker.shadowRoot.querySelector(
        ".ea-date-picker__header-year"
      );
      yearBtn.click();
      await waitForRender();

      const yearItems = datePicker.shadowRoot.querySelectorAll(
        ".ea-date-picker__year-item"
      );
      expect(yearItems.length).toBe(10);
    });

    it("月份面板应该渲染 12 个月份选项", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      datePicker.handleOpen();
      await waitForRender();

      const monthBtn = datePicker.shadowRoot.querySelector(
        ".ea-date-picker__header-month"
      );
      monthBtn.click();
      await waitForRender();

      const monthItems = datePicker.shadowRoot.querySelectorAll(
        ".ea-date-picker__month-item"
      );
      expect(monthItems.length).toBe(12);
    });

    it("切换视图应该触发 ea-panel-change 事件", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      datePicker.handleOpen();
      await waitForRender();

      const handler = vi.fn();
      datePicker.addEventListener("ea-panel-change", handler);

      const yearBtn = datePicker.shadowRoot.querySelector(
        ".ea-date-picker__header-year"
      );
      yearBtn.click();

      await waitForRender();

      expect(handler).toHaveBeenCalled();
      expect(handler.mock.calls[0][0].detail.view).toBe("year-panel");
    });
  });

  // ==================== Year Panel Selection ====================

  describe("Year Panel Selection", () => {
    it("在年份面板中选择一个年份应该选中", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.setAttribute("value", "2026-06-15");
      container.appendChild(datePicker);

      await waitForRender();

      datePicker.handleOpen();
      await waitForRender();

      const yearBtn = datePicker.shadowRoot.querySelector(
        ".ea-date-picker__header-year"
      );
      yearBtn.click();
      await waitForRender();

      const selected = datePicker.shadowRoot.querySelector(
        ".ea-date-picker__year-item.is-selected"
      );
      expect(selected).toBeTruthy();
      expect(selected.textContent).toBe("2026");
    });

    it("variant=year 时选择年份应关闭面板并触发 ea-change 事件", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.variant = "year";
      datePicker.setAttribute("value", "2026");
      container.appendChild(datePicker);

      await waitForRender();

      datePicker.handleOpen();
      await waitForRender();

      const changeHandler = vi.fn();
      datePicker.addEventListener("ea-change", changeHandler);

      const yearItems = datePicker.shadowRoot.querySelectorAll(
        ".ea-date-picker__year-item"
      );
      yearItems[3].click();

      await waitForRender();

      expect(changeHandler).toHaveBeenCalled();
    });
  });

  // ==================== Month Panel Selection ====================

  describe("Month Panel Selection", () => {
    it("在月份面板中选择一个月份应该选中", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.setAttribute("value", "2026-06-15");
      container.appendChild(datePicker);

      await waitForRender();

      datePicker.handleOpen();
      await waitForRender();

      const monthBtn = datePicker.shadowRoot.querySelector(
        ".ea-date-picker__header-month"
      );
      monthBtn.click();
      await waitForRender();

      const selected = datePicker.shadowRoot.querySelector(
        ".ea-date-picker__month-item.is-selected"
      );
      expect(selected).toBeTruthy();
      expect(selected.dataset.month).toBe("6");
    });

    it("variant=month 时选择月份应关闭面板并触发 ea-change 事件", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.variant = "month";
      container.appendChild(datePicker);

      await waitForRender();

      datePicker.handleOpen();
      await waitForRender();

      const changeHandler = vi.fn();
      datePicker.addEventListener("ea-change", changeHandler);

      const monthItems = datePicker.shadowRoot.querySelectorAll(
        ".ea-date-picker__month-item"
      );
      monthItems[0].click();

      await waitForRender();

      expect(changeHandler).toHaveBeenCalled();
    });
  });

  // ==================== Size Attribute ====================

  describe("Size Attribute", () => {
    it("默认 size 应该是 default", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      expect(datePicker.size).toBe("default");
    });

    it("应该支持 size=small", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.setAttribute("size", "small");
      container.appendChild(datePicker);

      await waitForRender();

      expect(datePicker.size).toBe("small");
    });

    it("应该支持 size=large", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.setAttribute("size", "large");
      container.appendChild(datePicker);

      await waitForRender();

      expect(datePicker.size).toBe("large");
    });

    it("size=small 时容器应该有 ea-date-picker--small 修饰符类", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.setAttribute("size", "small");
      container.appendChild(datePicker);

      await waitForRender();

      const containerEl =
        datePicker.shadowRoot.querySelector(".ea-date-picker");
      expect(containerEl.classList.contains("ea-date-picker--small")).toBe(
        true
      );
    });

    it("size=large 时容器应该有 ea-date-picker--large 修饰符类", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.setAttribute("size", "large");
      container.appendChild(datePicker);

      await waitForRender();

      const containerEl =
        datePicker.shadowRoot.querySelector(".ea-date-picker");
      expect(containerEl.classList.contains("ea-date-picker--large")).toBe(
        true
      );
    });

    it("size 变化时应该同步到所有导航按钮", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.setAttribute("size", "small");
      container.appendChild(datePicker);

      await waitForRender();

      const prevYear = datePicker.shadowRoot.querySelector(
        ".ea-date-picker__btn-prev-year"
      );
      const nextMonth = datePicker.shadowRoot.querySelector(
        ".ea-date-picker__btn-next-month"
      );
      expect(prevYear.getAttribute("size")).toBe("small");
      expect(nextMonth.getAttribute("size")).toBe("small");
    });

    it("size 变化时应该同步到输入框", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.setAttribute("size", "large");
      container.appendChild(datePicker);

      await waitForRender();

      const input = datePicker.shadowRoot.querySelector("ea-input");
      expect(input.getAttribute("size")).toBe("large");
    });

    it("size 应该支持动态切换", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.setAttribute("size", "small");
      container.appendChild(datePicker);

      await waitForRender();

      const containerEl =
        datePicker.shadowRoot.querySelector(".ea-date-picker");
      expect(containerEl.classList.contains("ea-date-picker--small")).toBe(
        true
      );

      datePicker.size = "large";
      await waitForRender();

      expect(containerEl.classList.contains("ea-date-picker--large")).toBe(
        true
      );
      expect(containerEl.classList.contains("ea-date-picker--small")).toBe(
        false
      );
    });
  });

  // ==================== Align Attribute ====================

  describe("Align Attribute", () => {
    it("默认 align 应该是 left", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      expect(datePicker.align).toBe("left");
    });

    it("应该支持 align=center", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.setAttribute("align", "center");
      container.appendChild(datePicker);

      await waitForRender();

      expect(datePicker.align).toBe("center");
    });

    it("应该支持 align=right", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.setAttribute("align", "right");
      container.appendChild(datePicker);

      await waitForRender();

      expect(datePicker.align).toBe("right");
    });

    it("align=center 时容器应该有 is-align-center 状态类", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.setAttribute("align", "center");
      container.appendChild(datePicker);

      await waitForRender();

      const containerEl =
        datePicker.shadowRoot.querySelector(".ea-date-picker");
      expect(containerEl.classList.contains("is-align-center")).toBe(true);
    });

    it("align 应该支持动态切换", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      datePicker.align = "right";
      await waitForRender();

      const containerEl =
        datePicker.shadowRoot.querySelector(".ea-date-picker");
      expect(containerEl.classList.contains("is-align-right")).toBe(true);
    });
  });

  // ==================== Display Format Attribute ====================

  describe("Display Format Attribute", () => {
    it("默认 displayFormat 应该是 YYYY-MM-DD", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      expect(datePicker.displayFormat).toBe("YYYY-MM-DD");
    });

    it("应该支持通过 HTML 属性设置自定义 display-format", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.setAttribute("display-format", "YYYY/MM/DD");
      container.appendChild(datePicker);

      await waitForRender();

      expect(datePicker.displayFormat).toBe("YYYY/MM/DD");
    });

    it("应该支持通过 JS 属性设置自定义 displayFormat", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      datePicker.displayFormat = "DD/MM/YYYY";

      await waitForRender();

      expect(datePicker.displayFormat).toBe("DD/MM/YYYY");
    });

    it("自定义 displayFormat 应该影响输入框显示", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.setAttribute("display-format", "YYYY/MM/DD");
      datePicker.setAttribute("value", "2026-06-15");
      container.appendChild(datePicker);

      await waitForRender();

      const input = datePicker.shadowRoot.querySelector("ea-input");
      expect(input.value).toBe("2026/06/15");
    });
  });

  // ==================== Value Format Attribute ====================

  describe("Value Format Attribute", () => {
    it("默认 valueFormat 应该是 YYYY-MM-DD", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      expect(datePicker.valueFormat).toBe("YYYY-MM-DD");
    });

    it("应该支持通过 HTML 属性设置自定义 value-format", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.setAttribute("value-format", "x");
      container.appendChild(datePicker);

      await waitForRender();

      expect(datePicker.valueFormat).toBe("x");
    });

    it("应该支持通过 JS 属性设置自定义 valueFormat", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      datePicker.valueFormat = "YYYY/MM/DD";

      await waitForRender();

      expect(datePicker.valueFormat).toBe("YYYY/MM/DD");
    });

    it("自定义 valueFormat 应该影响 ea-change 事件中的 value", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.setAttribute("value-format", "x");
      datePicker.setAttribute("value", "2026-06-15");
      container.appendChild(datePicker);

      await waitForRender();

      expect(datePicker.valueFormat).toBe("x");
    });
  });

  // ==================== Label Attribute ====================

  describe("Label Attribute", () => {
    it("默认 label 应该是空字符串", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      expect(datePicker.label).toBe("");
    });

    it("应该支持设置 label", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.setAttribute("label", "Select Date");
      container.appendChild(datePicker);

      await waitForRender();

      expect(datePicker.label).toBe("Select Date");
    });

    it("设置 label 应该同步到输入框", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.setAttribute("label", "出生日期");
      container.appendChild(datePicker);

      await waitForRender();

      const input = datePicker.shadowRoot.querySelector("ea-input");
      expect(input.label).toBe("出生日期");
    });

    it("应该支持动态更新 label", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.label = "初始标签";
      container.appendChild(datePicker);

      await waitForRender();

      datePicker.label = "新标签";
      await waitForRender();

      expect(datePicker.label).toBe("新标签");
    });
  });

  // ==================== Required Attribute ====================

  describe("Required Attribute", () => {
    it("默认 required 应该是 false", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      expect(datePicker.required).toBe(false);
    });

    it("应该支持设置 required 为 true", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.required = true;
      container.appendChild(datePicker);

      await waitForRender();

      expect(datePicker.required).toBe(true);
    });

    it("required 时输入框也应该设置 required", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.required = true;
      container.appendChild(datePicker);

      await waitForRender();

      const input = datePicker.shadowRoot.querySelector("ea-input");
      expect(input.hasAttribute("required")).toBe(true);
    });

    it("required 字段空值时 checkValidity 应该返回 false", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.required = true;
      container.appendChild(datePicker);

      await waitForRender();

      try {
        const isValid = datePicker.checkValidity();
        expect(typeof isValid === "boolean").toBe(true);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
      }
    });
  });

  // ==================== Width Attribute ====================

  describe("Width Attribute", () => {
    it("默认 width 应该是 auto", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      expect(datePicker.width).toBe("auto");
    });

    it("应该支持设置 width", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.setAttribute("width", "300px");
      container.appendChild(datePicker);

      await waitForRender();

      expect(datePicker.width).toBe("300px");
    });

    it("设置 width 应该同步到 CSS 变量", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.setAttribute("width", "400px");
      container.appendChild(datePicker);

      await waitForRender();

      const containerEl =
        datePicker.shadowRoot.querySelector(".ea-date-picker");
      const width = containerEl.style.getPropertyValue(
        "--ea-date-picker-width"
      );
      expect(width).toBe("400px");
    });
  });

  // ==================== Navigation Buttons ====================

  describe("Navigation Buttons", () => {
    it("点击上一年按钮应该更新 header 年份", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.setAttribute("value", "2026-06-15");
      container.appendChild(datePicker);

      await waitForRender();

      datePicker.handleOpen();
      await waitForRender();

      const prevYearBtn = datePicker.shadowRoot.querySelector(
        ".ea-date-picker__btn-prev-year"
      );
      const yearBtn = datePicker.shadowRoot.querySelector(
        ".ea-date-picker__header-year"
      );
      const oldYear = yearBtn.textContent;

      prevYearBtn.click();
      await waitForRender();

      expect(yearBtn.textContent).not.toBe(oldYear);
    });

    it("点击下一年按钮应该更新 header 年份", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.setAttribute("value", "2026-06-15");
      container.appendChild(datePicker);

      await waitForRender();

      datePicker.handleOpen();
      await waitForRender();

      const nextYearBtn = datePicker.shadowRoot.querySelector(
        ".ea-date-picker__btn-next-year"
      );
      const yearBtn = datePicker.shadowRoot.querySelector(
        ".ea-date-picker__header-year"
      );
      const oldYear = yearBtn.textContent;

      nextYearBtn.click();
      await waitForRender();

      expect(yearBtn.textContent).not.toBe(oldYear);
    });

    it("点击上一月按钮应该更新 header 月份", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.setAttribute("value", "2026-06-15");
      container.appendChild(datePicker);

      await waitForRender();

      datePicker.handleOpen();
      await waitForRender();

      const prevMonthBtn = datePicker.shadowRoot.querySelector(
        ".ea-date-picker__btn-prev-month"
      );
      const monthBtn = datePicker.shadowRoot.querySelector(
        ".ea-date-picker__header-month"
      );
      const oldMonth = monthBtn.textContent;

      prevMonthBtn.click();
      await waitForRender();

      expect(monthBtn.textContent).not.toBe(oldMonth);
    });

    it("点击下一月按钮应该更新 header 月份", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.setAttribute("value", "2026-06-15");
      container.appendChild(datePicker);

      await waitForRender();

      datePicker.handleOpen();
      await waitForRender();

      const nextMonthBtn = datePicker.shadowRoot.querySelector(
        ".ea-date-picker__btn-next-month"
      );
      const monthBtn = datePicker.shadowRoot.querySelector(
        ".ea-date-picker__header-month"
      );
      const oldMonth = monthBtn.textContent;

      nextMonthBtn.click();
      await waitForRender();

      expect(monthBtn.textContent).not.toBe(oldMonth);
    });

    it("年份视图中点击上一组按钮应跳转十年", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.setAttribute("value", "2026-06-15");
      container.appendChild(datePicker);

      await waitForRender();

      datePicker.handleOpen();
      await waitForRender();

      const yearBtn = datePicker.shadowRoot.querySelector(
        ".ea-date-picker__header-year"
      );
      yearBtn.click();
      await waitForRender();

      const prevYearBtn = datePicker.shadowRoot.querySelector(
        ".ea-date-picker__btn-prev-year"
      );
      const oldDisplay = yearBtn.textContent;

      prevYearBtn.click();
      await waitForRender();

      expect(yearBtn.textContent).not.toBe(oldDisplay);
    });
  });

  // ==================== Dropdown Behavior ====================

  describe("Dropdown Behavior", () => {
    it("handleOpen 应该打开下拉面板", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      datePicker.handleOpen();

      await waitForRender();

      const containerEl =
        datePicker.shadowRoot.querySelector(".ea-date-picker");
      expect(containerEl.classList.contains("is-open")).toBe(true);
    });

    it("handleClose 应该关闭下拉面板", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      datePicker.handleOpen();
      await waitForRender();

      datePicker.handleClose();
      await waitForRender();

      const containerEl =
        datePicker.shadowRoot.querySelector(".ea-date-picker");
      expect(containerEl.classList.contains("is-open")).toBe(false);
    });

    it("应该支持多次打开/关闭", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      datePicker.handleOpen();
      await waitForRender();

      datePicker.handleClose();
      await waitForRender();

      datePicker.handleOpen();
      await waitForRender();

      const containerEl =
        datePicker.shadowRoot.querySelector(".ea-date-picker");
      expect(containerEl.classList.contains("is-open")).toBe(true);
    });

    it("打开面板时应该触发 ea-visible-change 事件", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      const handler = vi.fn();
      datePicker.addEventListener("ea-visible-change", handler);

      datePicker.handleOpen();

      await waitForRender();

      expect(handler).toHaveBeenCalled();
      expect(handler.mock.calls[0][0].detail.visible).toBe(true);
    });

    it("关闭面板时应该触发 ea-visible-change 事件", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      datePicker.handleOpen();
      await waitForRender();

      const handler = vi.fn();
      datePicker.addEventListener("ea-visible-change", handler);

      datePicker.handleClose();

      await waitForRender();

      expect(handler).toHaveBeenCalled();
      expect(handler.mock.calls[0][0].detail.visible).toBe(false);
    });

    it("已打开时再次 handleOpen 不应重复触发 ea-visible-change", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      datePicker.handleOpen();
      await waitForRender();

      const handler = vi.fn();
      datePicker.addEventListener("ea-visible-change", handler);

      datePicker.handleOpen();
      await waitForRender();

      expect(handler).not.toHaveBeenCalled();
    });
  });

  // ==================== Calendar Selection ====================

  describe("Calendar Selection", () => {
    it("日历选择日期应该触发 ea-change 事件", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      datePicker.handleOpen();
      await waitForRender();

      const changeHandler = vi.fn();
      datePicker.addEventListener("ea-change", changeHandler);

      const calendar = datePicker.shadowRoot.querySelector("ea-calendar");
      calendar.dispatchEvent(
        new CustomEvent("ea-select", {
          bubbles: true,
          detail: { year: 2026, month: 6, date: 15, day: 1 },
        })
      );

      await waitForRender();

      expect(changeHandler).toHaveBeenCalled();
    });

    it("日历选择后应该关闭下拉面板", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      datePicker.handleOpen();
      await waitForRender();

      const calendar = datePicker.shadowRoot.querySelector("ea-calendar");
      calendar.dispatchEvent(
        new CustomEvent("ea-select", {
          bubbles: true,
          detail: { year: 2026, month: 6, date: 15, day: 1 },
        })
      );

      await waitForRender();

      const containerEl =
        datePicker.shadowRoot.querySelector(".ea-date-picker");
      expect(containerEl.classList.contains("is-open")).toBe(false);
    });

    it("日历选择后输入框应该显示格式化日期", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      datePicker.handleOpen();
      await waitForRender();

      const calendar = datePicker.shadowRoot.querySelector("ea-calendar");
      calendar.dispatchEvent(
        new CustomEvent("ea-select", {
          bubbles: true,
          detail: { year: 2026, month: 6, date: 15, day: 1 },
        })
      );

      await waitForRender();

      const input = datePicker.shadowRoot.querySelector("ea-input");
      expect(input.value).toContain("2026");
    });

    it("ea-change 事件 detail 应包含完整日期信息", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      datePicker.handleOpen();
      await waitForRender();

      const changeHandler = vi.fn();
      datePicker.addEventListener("ea-change", changeHandler);

      const calendar = datePicker.shadowRoot.querySelector("ea-calendar");
      calendar.dispatchEvent(
        new CustomEvent("ea-select", {
          bubbles: true,
          detail: { year: 2026, month: 6, date: 15, day: 1 },
        })
      );

      await waitForRender();

      expect(changeHandler).toHaveBeenCalled();
      const detail = changeHandler.mock.calls[0][0].detail;
      expect(detail.year).toBe(2026);
      expect(detail.month).toBe(6);
      expect(detail.date).toBe(15);
    });

    it("ea-change 事件应该是 EaDatePickerChangeEvent 实例", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      datePicker.handleOpen();
      await waitForRender();

      const changeHandler = vi.fn();
      datePicker.addEventListener("ea-change", changeHandler);

      const calendar = datePicker.shadowRoot.querySelector("ea-calendar");
      calendar.dispatchEvent(
        new CustomEvent("ea-select", {
          bubbles: true,
          detail: { year: 2026, month: 6, date: 15, day: 1 },
        })
      );

      await waitForRender();

      expect(changeHandler).toHaveBeenCalled();
      const event = changeHandler.mock.calls[0][0];
      expect(event.type).toBe("ea-change");
    });
  });

  // ==================== Events ====================

  describe("Events", () => {
    it("应该支持 ea-change 事件监听", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      const changeHandler = vi.fn();
      datePicker.addEventListener("ea-change", changeHandler);

      expect(changeHandler).not.toHaveBeenCalled();
    });

    it("应该支持 focus 事件监听", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      expect(typeof datePicker.focus).toBe("function");
    });

    it("应该支持 blur 事件监听", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      expect(typeof datePicker.blur).toBe("function");
    });

    it("应该支持 ea-panel-change 事件监听", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      const handler = vi.fn();
      datePicker.addEventListener("ea-panel-change", handler);

      datePicker.handleOpen();

      await waitForRender();

      expect(handler).toHaveBeenCalled();
    });

    it("ea-panel-change detail 应包含 mode", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      const handler = vi.fn();
      datePicker.addEventListener("ea-panel-change", handler);

      datePicker.handleOpen();

      await waitForRender();

      const detail = handler.mock.calls[0][0].detail;
      expect(detail.mode).toBeDefined();
      expect(detail.date).toBeInstanceOf(Date);
    });

    it("ea-visible-change 事件应该是 EaDatePickerVisibleChangeEvent 实例", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      const handler = vi.fn();
      datePicker.addEventListener("ea-visible-change", handler);

      datePicker.handleOpen();
      await waitForRender();

      expect(handler).toHaveBeenCalled();
      const event = handler.mock.calls[0][0];
      expect(event.type).toBe("ea-visible-change");
    });
  });

  // ==================== Public Methods ====================

  describe("Public Methods", () => {
    it("应该支持 focus() 方法", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      expect(typeof datePicker.focus).toBe("function");
      expect(() => datePicker.focus()).not.toThrow();
    });

    it("应该支持 blur() 方法", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      expect(typeof datePicker.blur).toBe("function");
      expect(() => datePicker.blur()).not.toThrow();
    });

    it("应该支持 handleOpen() 方法", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      expect(typeof datePicker.handleOpen).toBe("function");
      expect(() => datePicker.handleOpen()).not.toThrow();
    });

    it("应该支持 handleClose() 方法", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      expect(typeof datePicker.handleClose).toBe("function");
      expect(() => datePicker.handleClose()).not.toThrow();
    });

    it("应该支持 checkValidity() 方法", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      expect(typeof datePicker.checkValidity).toBe("function");
    });

    it("应该支持 reportValidity() 方法", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      expect(typeof datePicker.reportValidity).toBe("function");
    });

    it("应该支持 $updateLocalization() 方法", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      expect(typeof datePicker.$updateLocalization).toBe("function");
    });

    it("$updateLocalization 不应抛出错误", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      expect(() => datePicker.$updateLocalization("zh-CN")).not.toThrow();
      expect(() => datePicker.$updateLocalization("en")).not.toThrow();
    });
  });

  // ==================== Form Integration ====================

  describe("Form Integration", () => {
    it("应该支持表单关联", async () => {
      const form = document.createElement("form");
      const datePicker = document.createElement("ea-date-picker");
      datePicker.setAttribute("name", "birthdate");
      form.appendChild(datePicker);
      container.appendChild(form);

      await waitForRender();

      expect(datePicker.getAttribute("name")).toBe("birthdate");
    });

    it("required 且有值时 checkValidity 应该返回 true", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.required = true;
      datePicker.setAttribute("value", "2026-01-01");
      container.appendChild(datePicker);

      await waitForRender();

      try {
        const isValid = datePicker.checkValidity();
        expect(isValid).toBe(true);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
      }
    });

    it("reportValidity 应该不抛出错误", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      try {
        expect(() => datePicker.reportValidity()).not.toThrow();
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
      }
    });
  });

  // ==================== Localization ====================

  describe("Localization", () => {
    it("$updateLocalization en 应该更新月份文字", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      datePicker.handleOpen();
      await waitForRender();

      datePicker.$updateLocalization("en");

      await waitForRender();

      const monthItems = datePicker.shadowRoot.querySelectorAll(
        ".ea-date-picker__month-item"
      );
      expect(monthItems.length).toBe(12);
    });

    it("$updateLocalization zh-CN 应该正常", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      datePicker.$updateLocalization("zh-CN");

      await waitForRender();

      const monthItems = datePicker.shadowRoot.querySelectorAll(
        ".ea-date-picker__month-item"
      );
      expect(monthItems.length).toBe(12);
    });
  });

  // ==================== CSS Parts ====================

  describe("CSS Parts", () => {
    it("应该支持 [part=container]", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      expect(
        datePicker.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
    });

    it("应该支持 [part=input]", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      expect(
        datePicker.shadowRoot.querySelector('[part="input"]')
      ).toBeTruthy();
    });

    it("应该支持 [part=dropdown-wrap]", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      expect(
        datePicker.shadowRoot.querySelector('[part="dropdown-wrap"]')
      ).toBeTruthy();
    });

    it("应该支持 [part=calendar]", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      expect(
        datePicker.shadowRoot.querySelector('[part="calendar"]')
      ).toBeTruthy();
    });

    it("应该支持 [part=header-btn]", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      expect(
        datePicker.shadowRoot.querySelector('[part="header-btn"]')
      ).toBeTruthy();
    });

    it("应该支持 [part=year-panel]", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      expect(
        datePicker.shadowRoot.querySelector('[part="year-panel"]')
      ).toBeTruthy();
    });

    it("应该支持 [part=month-panel]", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      expect(
        datePicker.shadowRoot.querySelector('[part="month-panel"]')
      ).toBeTruthy();
    });

    it("应该支持 [part=month-item]", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      expect(
        datePicker.shadowRoot.querySelector('[part="month-item"]')
      ).toBeTruthy();
    });

    it("应该支持 [part=calendar-header]", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      expect(
        datePicker.shadowRoot.querySelector('[part="calendar-header"]')
      ).toBeTruthy();
    });

    it("应该支持 [part=header-year]", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      expect(
        datePicker.shadowRoot.querySelector('[part="header-year"]')
      ).toBeTruthy();
    });

    it("应该支持 [part=header-month]", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      expect(
        datePicker.shadowRoot.querySelector('[part="header-month"]')
      ).toBeTruthy();
    });
  });

  // ==================== BEM Class Names ====================

  describe("BEM Class Names", () => {
    it("容器应该有 ea-date-picker 基础类名", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      const containerEl =
        datePicker.shadowRoot.querySelector(".ea-date-picker");
      expect(containerEl.classList.contains("ea-date-picker")).toBe(true);
    });

    it("size=small 时应该有 ea-date-picker--small 修饰符类", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.setAttribute("size", "small");
      container.appendChild(datePicker);

      await waitForRender();

      const containerEl =
        datePicker.shadowRoot.querySelector(".ea-date-picker");
      expect(containerEl.classList.contains("ea-date-picker--small")).toBe(
        true
      );
    });

    it("size=large 时应该有 ea-date-picker--large 修饰符类", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.setAttribute("size", "large");
      container.appendChild(datePicker);

      await waitForRender();

      const containerEl =
        datePicker.shadowRoot.querySelector(".ea-date-picker");
      expect(containerEl.classList.contains("ea-date-picker--large")).toBe(
        true
      );
    });

    it("size=default 时不应该有修饰符类", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      const containerEl =
        datePicker.shadowRoot.querySelector(".ea-date-picker");
      expect(containerEl.classList.contains("ea-date-picker--default")).toBe(
        false
      );
    });

    it("disabled 时应该有 is-disabled 状态类", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.disabled = true;
      container.appendChild(datePicker);

      await waitForRender();

      const containerEl =
        datePicker.shadowRoot.querySelector(".ea-date-picker");
      expect(containerEl.classList.contains("is-disabled")).toBe(true);
    });

    it("align=center 时应该有 is-align-center 状态类", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.setAttribute("align", "center");
      container.appendChild(datePicker);

      await waitForRender();

      const containerEl =
        datePicker.shadowRoot.querySelector(".ea-date-picker");
      expect(containerEl.classList.contains("is-align-center")).toBe(true);
    });

    it("align=right 时应该有 is-align-right 状态类", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.align = "right";
      container.appendChild(datePicker);

      await waitForRender();

      const containerEl =
        datePicker.shadowRoot.querySelector(".ea-date-picker");
      expect(containerEl.classList.contains("is-align-right")).toBe(true);
    });

    it("align=left 时不应该有 is-align-left 状态类", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      const containerEl =
        datePicker.shadowRoot.querySelector(".ea-date-picker");
      expect(containerEl.classList.contains("is-align-left")).toBe(false);
    });

    it("打开面板时应该有 is-open 状态类", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      datePicker.handleOpen();

      await waitForRender();

      const containerEl =
        datePicker.shadowRoot.querySelector(".ea-date-picker");
      expect(containerEl.classList.contains("is-open")).toBe(true);
    });

    it("variant=date 打开面板时应该有 is-view-day 状态类", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.variant = "date";
      container.appendChild(datePicker);

      await waitForRender();

      datePicker.handleOpen();

      await waitForRender();

      const containerEl =
        datePicker.shadowRoot.querySelector(".ea-date-picker");
      expect(containerEl.classList.contains("is-view-day")).toBe(true);
    });

    it("variant=month 打开面板时应该有 is-view-month 状态类", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.variant = "month";
      container.appendChild(datePicker);

      await waitForRender();

      datePicker.handleOpen();

      await waitForRender();

      const containerEl =
        datePicker.shadowRoot.querySelector(".ea-date-picker");
      expect(containerEl.classList.contains("is-view-month")).toBe(true);
    });

    it("variant=year 打开面板时应该有 is-view-year 状态类", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.variant = "year";
      container.appendChild(datePicker);

      await waitForRender();

      datePicker.handleOpen();

      await waitForRender();

      const containerEl =
        datePicker.shadowRoot.querySelector(".ea-date-picker");
      expect(containerEl.classList.contains("is-view-year")).toBe(true);
    });

    it("关闭面板时不应该有 is-open 状态类", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      const containerEl =
        datePicker.shadowRoot.querySelector(".ea-date-picker");
      expect(containerEl.classList.contains("is-open")).toBe(false);
    });
  });

  // ==================== Edge Cases & Robustness ====================

  describe("Edge Cases & Robustness", () => {
    it("应该处理不带任何属性的空组件", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      expect(datePicker.shadowRoot).toBeTruthy();
    });

    it("应该处理无效的日期值", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.setAttribute("value", "not-a-date-at-all");
      container.appendChild(datePicker);

      await waitForRender();

      expect(datePicker.shadowRoot).toBeTruthy();
      expect(datePicker.value).toBeTruthy();
    });

    it("应该处理多次打开/关闭不崩溃", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      for (let i = 0; i < 5; i++) {
        datePicker.handleOpen();
        await waitForRender();
        datePicker.handleClose();
        await waitForRender();
      }

      expect(datePicker.shadowRoot).toBeTruthy();
    });

    it("disabled 时 handleOpen 不应该打开面板", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.disabled = true;
      container.appendChild(datePicker);

      await waitForRender();

      datePicker.handleOpen();

      await waitForRender();

      const containerEl =
        datePicker.shadowRoot.querySelector(".ea-date-picker");
      expect(containerEl.classList.contains("is-open")).toBe(false);
    });

    it("多个实例应相互独立", async () => {
      const picker1 = document.createElement("ea-date-picker");
      picker1.setAttribute("value", "2026-01-15");
      const picker2 = document.createElement("ea-date-picker");
      picker2.setAttribute("value", "2026-12-25");

      container.appendChild(picker1);
      container.appendChild(picker2);

      await waitForRender();

      expect(picker1.value).toBe("2026-01-15");
      expect(picker2.value).toBe("2026-12-25");
    });

    it("value 设置为空字符串后应正常工作", async () => {
      const datePicker = document.createElement("ea-date-picker");
      datePicker.setAttribute("value", "2026-01-01");
      container.appendChild(datePicker);

      await waitForRender();
      expect(datePicker.value).toBe("2026-01-01");

      datePicker.value = "";
      await waitForRender();

      expect(datePicker.value).toBe("");
      expect(datePicker.shadowRoot).toBeTruthy();
    });

    it("variant 在运行时切换应正确更新", async () => {
      const datePicker = document.createElement("ea-date-picker");
      container.appendChild(datePicker);

      await waitForRender();

      datePicker.variant = "month";
      await waitForRender();
      expect(datePicker.variant).toBe("month");

      datePicker.variant = "year";
      await waitForRender();
      expect(datePicker.variant).toBe("year");

      datePicker.variant = "date";
      await waitForRender();
      expect(datePicker.variant).toBe("date");
    });
  });
});
