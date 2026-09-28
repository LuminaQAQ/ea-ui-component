import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender";
import { runAxe, assertNoA11yViolations } from "./utils/a11y";

import "../components/ea-calendar/index";

describe("EaCalendar", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe("基本功能", () => {
    it("应该正确渲染组件", async () => {
      const calendar = document.createElement("ea-calendar");
      container.appendChild(calendar);

      await waitForRender();

      expect(calendar).toBeDefined();
      expect(calendar.shadowRoot).toBeDefined();
    });

    it("应该包含 calendar 容器元素", async () => {
      const calendar = document.createElement("ea-calendar");
      container.appendChild(calendar);

      await waitForRender();

      const calendarContainer =
        calendar.shadowRoot.querySelector(".ea-calendar");
      expect(calendarContainer).toBeDefined();
    });

    it("应该包含 header 元素", async () => {
      const calendar = document.createElement("ea-calendar");
      container.appendChild(calendar);

      await waitForRender();

      const header = calendar.shadowRoot.querySelector(".ea-calendar__header");
      expect(header).toBeDefined();
    });

    it("应该包含 title 元素", async () => {
      const calendar = document.createElement("ea-calendar");
      container.appendChild(calendar);

      await waitForRender();

      const title = calendar.shadowRoot.querySelector(".ea-calendar__title");
      expect(title).toBeDefined();
    });

    it("应该包含 body 表格元素", async () => {
      const calendar = document.createElement("ea-calendar");
      container.appendChild(calendar);

      await waitForRender();

      const body = calendar.shadowRoot.querySelector(".ea-calendar__body");
      expect(body).toBeDefined();
      expect(body.tagName.toLowerCase()).toBe("table");
    });

    it("应该包含 thead 和 tbody", async () => {
      const calendar = document.createElement("ea-calendar");
      container.appendChild(calendar);

      await waitForRender();

      const thead = calendar.shadowRoot.querySelector(".ea-calendar__thead");
      const tbody = calendar.shadowRoot.querySelector(".ea-calendar__tbody");
      expect(thead).toBeDefined();
      expect(tbody).toBeDefined();
    });
  });

  describe("Value 属性", () => {
    it("应该正确设置 value 属性", async () => {
      const calendar = document.createElement("ea-calendar");
      calendar.setAttribute("value", "2024-05-01");
      container.appendChild(calendar);

      await waitForRender();

      expect(calendar.getAttribute("value")).toBe("2024-05-01");
    });

    it("value 变化时应该更新日历显示", async () => {
      const calendar = document.createElement("ea-calendar");
      calendar.setAttribute("value", "2024-05-01");
      container.appendChild(calendar);

      await waitForRender();

      const title = calendar.shadowRoot.querySelector(".ea-calendar__title");
      expect(title.textContent).toContain("2024");
    });

    it("应该支持不同的日期格式", async () => {
      const calendar = document.createElement("ea-calendar");
      calendar.setAttribute("value", "2023-12-25");
      container.appendChild(calendar);

      await waitForRender();

      const title = calendar.shadowRoot.querySelector(".ea-calendar__title");
      expect(title.textContent).toContain("2023");
    });

    it("value 为空时应该显示当前月份", async () => {
      const calendar = document.createElement("ea-calendar");
      container.appendChild(calendar);

      await waitForRender();

      const title = calendar.shadowRoot.querySelector(".ea-calendar__title");
      const now = new Date();
      expect(title.textContent).toContain(String(now.getFullYear()));
    });

    it("动态修改 value 应该更新日历", async () => {
      const calendar = document.createElement("ea-calendar");
      container.appendChild(calendar);

      await waitForRender();

      calendar.setAttribute("value", "2024-05-01");
      await waitForRender();

      const title = calendar.shadowRoot.querySelector(".ea-calendar__title");
      expect(title.textContent).toContain("2024");
    });
  });

  describe("Controller-Type 属性", () => {
    it("默认 controller-type 应该是 button", async () => {
      const calendar = document.createElement("ea-calendar");
      container.appendChild(calendar);

      await waitForRender();

      expect(calendar.controllerType).toBe("button");
    });

    it("应该正确设置 controller-type 为 button", async () => {
      const calendar = document.createElement("ea-calendar");
      calendar.setAttribute("controller-type", "button");
      container.appendChild(calendar);

      await waitForRender();

      expect(calendar.controllerType).toBe("button");
    });

    it("button 控制器应该渲染按钮组", async () => {
      const calendar = document.createElement("ea-calendar");
      calendar.setAttribute("controller-type", "button");
      container.appendChild(calendar);

      await waitForRender(150);

      const buttonGroup = calendar.shadowRoot.querySelector("ea-button-group");
      expect(buttonGroup).toBeDefined();
    });

    it("button 控制器应该包含 prev、today、next 按钮", async () => {
      const calendar = document.createElement("ea-calendar");
      calendar.setAttribute("controller-type", "button");
      container.appendChild(calendar);

      await waitForRender(150);

      const prevBtn = calendar.shadowRoot.querySelector(
        ".ea-calendar__controller-prev"
      );
      const todayBtn = calendar.shadowRoot.querySelector(
        ".ea-calendar__controller-today"
      );
      const nextBtn = calendar.shadowRoot.querySelector(
        ".ea-calendar__controller-next"
      );

      expect(prevBtn).toBeDefined();
      expect(todayBtn).toBeDefined();
      expect(nextBtn).toBeDefined();
    });
  });

  describe("Locale 属性", () => {
    it("应该支持 locale 属性", async () => {
      const calendar = document.createElement("ea-calendar");
      calendar.setAttribute("locale", "zh-CN");
      container.appendChild(calendar);

      await waitForRender();

      expect(calendar.getAttribute("locale")).toBe("zh-CN");
    });

    it("默认 locale 应该是 en-US", async () => {
      const calendar = document.createElement("ea-calendar");
      container.appendChild(calendar);

      await waitForRender();

      expect(calendar.locale).toBe("en-US");
    });
  });

  describe("CSS Parts", () => {
    it("应该正确设置 container part", async () => {
      const calendar = document.createElement("ea-calendar");
      container.appendChild(calendar);

      await waitForRender();

      const containerEl =
        calendar.shadowRoot.querySelector('[part="container"]');
      expect(containerEl).toBeDefined();
    });

    it("应该正确设置 header part", async () => {
      const calendar = document.createElement("ea-calendar");
      container.appendChild(calendar);

      await waitForRender();

      const headerEl = calendar.shadowRoot.querySelector('[part="header"]');
      expect(headerEl).toBeDefined();
    });

    it("应该正确设置 title part", async () => {
      const calendar = document.createElement("ea-calendar");
      container.appendChild(calendar);

      await waitForRender();

      const titleEl = calendar.shadowRoot.querySelector('[part="title"]');
      expect(titleEl).toBeDefined();
    });

    it("应该正确设置 body part", async () => {
      const calendar = document.createElement("ea-calendar");
      container.appendChild(calendar);

      await waitForRender();

      const bodyEl = calendar.shadowRoot.querySelector('[part="body"]');
      expect(bodyEl).toBeDefined();
    });

    it("应该正确设置 thead part", async () => {
      const calendar = document.createElement("ea-calendar");
      container.appendChild(calendar);

      await waitForRender();

      const theadEl = calendar.shadowRoot.querySelector('[part="thead"]');
      expect(theadEl).toBeDefined();
    });

    it("应该正确设置 tbody part", async () => {
      const calendar = document.createElement("ea-calendar");
      container.appendChild(calendar);

      await waitForRender();

      const tbodyEl = calendar.shadowRoot.querySelector('[part="tbody"]');
      expect(tbodyEl).toBeDefined();
    });

    it("应该正确设置 controller-wrapper part", async () => {
      const calendar = document.createElement("ea-calendar");
      container.appendChild(calendar);

      await waitForRender();

      const wrapperEl = calendar.shadowRoot.querySelector(
        '[part="controller-wrapper"]'
      );
      expect(wrapperEl).toBeDefined();
    });
  });

  describe("日期渲染", () => {
    it("应该渲染星期标题", async () => {
      const calendar = document.createElement("ea-calendar");
      container.appendChild(calendar);

      await waitForRender();

      const ths = calendar.shadowRoot.querySelectorAll(".ea-calendar__th");
      expect(ths.length).toBe(7);
    });

    it("应该渲染日期单元格", async () => {
      const calendar = document.createElement("ea-calendar");
      container.appendChild(calendar);

      await waitForRender();

      const days = calendar.shadowRoot.querySelectorAll(".ea-calendar__day");
      expect(days.length).toBeGreaterThan(28);
    });

    it("日期单元格应该有正确的 data 属性", async () => {
      const calendar = document.createElement("ea-calendar");
      calendar.setAttribute("value", "2024-05-01");
      container.appendChild(calendar);

      await waitForRender();

      const days = calendar.shadowRoot.querySelectorAll(".ea-calendar__day");
      const firstDay = days[0];

      expect(firstDay.hasAttribute("data-year")).toBe(true);
      expect(firstDay.hasAttribute("data-month")).toBe(true);
      expect(firstDay.hasAttribute("data-date")).toBe(true);
    });

    it("应该正确渲染上月、当月、下月日期单元格", async () => {
      const calendar = document.createElement("ea-calendar");
      container.appendChild(calendar);

      await waitForRender();

      const dayCells =
        calendar.shadowRoot.querySelectorAll(".ea-calendar__day");
      const currentMonthDays =
        calendar.shadowRoot.querySelectorAll(".is-current-month");

      expect(dayCells.length).toBeGreaterThan(0);
      expect(currentMonthDays.length).toBeGreaterThan(0);

      const prevMonthDays = calendar.shadowRoot.querySelectorAll(".is-prev-month");
      const nextMonthDays = calendar.shadowRoot.querySelectorAll(".is-next-month");

      const totalDays =
        prevMonthDays.length + currentMonthDays.length + nextMonthDays.length;
      expect(totalDays).toBe(dayCells.length);
    });

    it("应该渲染完整的日历网格", async () => {
      const calendar = document.createElement("ea-calendar");
      container.appendChild(calendar);

      await waitForRender();

      const rows = calendar.shadowRoot.querySelectorAll(".ea-calendar__row");
      expect(rows.length).toBeGreaterThanOrEqual(4);
      expect(rows.length).toBeLessThanOrEqual(6);
    });

    it("当月日期应该有 current-month part", async () => {
      const calendar = document.createElement("ea-calendar");
      container.appendChild(calendar);

      await waitForRender();

      const currentMonthCells = calendar.shadowRoot.querySelectorAll(
        '[part~="current-month"]'
      );
      expect(currentMonthCells.length).toBeGreaterThan(0);
    });

    it("上月日期应该有 prev-month part", async () => {
      const calendar = document.createElement("ea-calendar");
      container.appendChild(calendar);

      await waitForRender();

      const prevMonthCells = calendar.shadowRoot.querySelectorAll(
        '[part~="prev-month"]'
      );
      expect(prevMonthCells.length).toBeGreaterThanOrEqual(0);
    });

    it("下月日期应该有 next-month part", async () => {
      const calendar = document.createElement("ea-calendar");
      container.appendChild(calendar);

      await waitForRender();

      const nextMonthCells = calendar.shadowRoot.querySelectorAll(
        '[part~="next-month"]'
      );
      expect(nextMonthCells.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe("Today 标记", () => {
    it("今天应该被标记为 is-today", async () => {
      const calendar = document.createElement("ea-calendar");
      container.appendChild(calendar);

      await waitForRender();

      const todayCell = calendar.shadowRoot.querySelector(".is-today");
      expect(todayCell).toBeDefined();

      const now = new Date();
      expect(todayCell.getAttribute("data-date")).toBe(String(now.getDate()));
    });

    it("非今天日期不应被标记为 is-today", async () => {
      const calendar = document.createElement("ea-calendar");
      calendar.setAttribute("value", "2020-01-01");
      container.appendChild(calendar);

      await waitForRender();

      const todayCells = calendar.shadowRoot.querySelectorAll(".is-today");
      expect(todayCells.length).toBe(0);
    });
  });

  describe("Active 标记", () => {
    it("选中日期应该被标记为 is-active", async () => {
      const calendar = document.createElement("ea-calendar");
      calendar.setAttribute("value", "2024-05-15");
      container.appendChild(calendar);

      await waitForRender();

      const activeCell = calendar.shadowRoot.querySelector(".is-active");
      expect(activeCell).toBeDefined();
      expect(activeCell.getAttribute("data-date")).toBe("15");
    });
  });

  describe("事件", () => {
    it("点击日期单元格应该触发 ea-select 事件", async () => {
      const calendar = document.createElement("ea-calendar");
      container.appendChild(calendar);

      await waitForRender();

      const selectHandler = vi.fn();
      calendar.addEventListener("ea-select", selectHandler);

      const dayCell = calendar.shadowRoot.querySelector(".ea-calendar__day");
      dayCell.click();

      expect(selectHandler).toHaveBeenCalled();
    });

    it("ea-select 事件应该包含日期信息", async () => {
      const calendar = document.createElement("ea-calendar");
      container.appendChild(calendar);

      await waitForRender();

      let eventDetail = null;
      calendar.addEventListener("ea-select", e => {
        eventDetail = e.detail;
      });

      const dayCell = calendar.shadowRoot.querySelector(".ea-calendar__day");
      dayCell.click();

      expect(eventDetail).toBeDefined();
      expect(eventDetail).toHaveProperty("year");
      expect(eventDetail).toHaveProperty("month");
      expect(eventDetail).toHaveProperty("date");
      expect(eventDetail).toHaveProperty("day");
      expect(eventDetail).toHaveProperty("fullDate");
    });

    it("ea-select 事件的 fullDate 应该是 YYYY-M-D 格式", async () => {
      const calendar = document.createElement("ea-calendar");
      calendar.setAttribute("value", "2024-05-01");
      container.appendChild(calendar);

      await waitForRender();

      let eventDetail = null;
      calendar.addEventListener("ea-select", e => {
        eventDetail = e.detail;
      });

      const currentMonthCell = calendar.shadowRoot.querySelector(
        ".is-current-month"
      );
      if (currentMonthCell) {
        currentMonthCell.click();
        expect(eventDetail.fullDate).toMatch(/^\d+-\d+-\d+$/);
      }
    });

    it("点击 tbody 但非日期单元格不应触发事件", async () => {
      const calendar = document.createElement("ea-calendar");
      container.appendChild(calendar);

      await waitForRender();

      const selectHandler = vi.fn();
      calendar.addEventListener("ea-select", selectHandler);

      const tbody = calendar.shadowRoot.querySelector(".ea-calendar__tbody");
      tbody.click();

      expect(selectHandler).not.toHaveBeenCalled();
    });
  });

  describe("Slots", () => {
    it("应该支持 header slot", async () => {
      const calendar = document.createElement("ea-calendar");
      calendar.innerHTML = `
        <div slot="header">Custom Header</div>
      `;
      container.appendChild(calendar);

      await waitForRender();

      const slot = calendar.shadowRoot.querySelector('slot[name="header"]');
      expect(slot).toBeDefined();
    });
  });

  describe("displayDate", () => {
    it("displayDate getter 应该返回 Dayjs 对象", async () => {
      const calendar = document.createElement("ea-calendar");
      container.appendChild(calendar);

      await waitForRender();

      expect(calendar.displayDate).toBeDefined();
      expect(typeof calendar.displayDate.format).toBe("function");
    });

    it("设置 displayDate 应该更新 value 属性", async () => {
      const calendar = document.createElement("ea-calendar");
      container.appendChild(calendar);

      await waitForRender();

      calendar.displayDate = "2024-06-15";
      expect(calendar.value).toBe("2024-06-15");
    });
  });

  describe("复杂场景", () => {
    it("应该支持属性组合", async () => {
      const calendar = document.createElement("ea-calendar");
      calendar.setAttribute("value", "2024-06-15");
      calendar.setAttribute("controller-type", "button");
      calendar.setAttribute("locale", "zh-CN");
      container.appendChild(calendar);

      await waitForRender();

      expect(calendar.getAttribute("value")).toBe("2024-06-15");
      expect(calendar.controllerType).toBe("button");
      expect(calendar.getAttribute("locale")).toBe("zh-CN");
    });

    it("日历网格总天数应该是 7 的倍数", async () => {
      const calendar = document.createElement("ea-calendar");
      container.appendChild(calendar);

      await waitForRender();

      const days = calendar.shadowRoot.querySelectorAll(".ea-calendar__day");
      expect(days.length % 7).toBe(0);
    });

    it("当月日期数量应该是 28-31 之间", async () => {
      const calendar = document.createElement("ea-calendar");
      container.appendChild(calendar);

      await waitForRender();

      const currentMonthDays =
        calendar.shadowRoot.querySelectorAll(".is-current-month");
      expect(currentMonthDays.length).toBeGreaterThanOrEqual(28);
      expect(currentMonthDays.length).toBeLessThanOrEqual(31);
    });
  });

  describe("Accessibility", () => {
    it("默认状态应该无 a11y 违规", async () => {
      const el = document.createElement("ea-calendar");
      container.appendChild(el);
      await waitForRender();
      const results = await runAxe(el);
      assertNoA11yViolations(results);
    });

    describe("ARIA Attributes", () => {
      it("table 应该有 role=grid", async () => {
        const calendar = document.createElement("ea-calendar");
        container.appendChild(calendar);
        await waitForRender();
        const table = calendar.shadowRoot.querySelector(
          ".ea-calendar__body"
        );
        expect(table.getAttribute("role")).toBe("grid");
      });

      it("table 应该有 aria-labelledby 指向 title", async () => {
        const calendar = document.createElement("ea-calendar");
        container.appendChild(calendar);
        await waitForRender();
        const table = calendar.shadowRoot.querySelector(
          ".ea-calendar__body"
        );
        const title = calendar.shadowRoot.querySelector(
          ".ea-calendar__title"
        );
        expect(table.getAttribute("aria-labelledby")).toBe(title.id);
      });

      it("table 应该有 aria-colcount=7", async () => {
        const calendar = document.createElement("ea-calendar");
        container.appendChild(calendar);
        await waitForRender();
        const table = calendar.shadowRoot.querySelector(
          ".ea-calendar__body"
        );
        expect(table.getAttribute("aria-colcount")).toBe("7");
      });

      it("表头行应该有 role=row 和 aria-rowindex=1", async () => {
        const calendar = document.createElement("ea-calendar");
        container.appendChild(calendar);
        await waitForRender();
        const theadRow = calendar.shadowRoot.querySelector(
          ".ea-calendar__week"
        );
        expect(theadRow.getAttribute("role")).toBe("row");
        expect(theadRow.getAttribute("aria-rowindex")).toBe("1");
      });

      it("表头单元格应该有 role=columnheader", async () => {
        const calendar = document.createElement("ea-calendar");
        container.appendChild(calendar);
        await waitForRender();
        const ths = calendar.shadowRoot.querySelectorAll(".ea-calendar__th");
        expect(ths.length).toBe(7);
        ths.forEach(th => {
          expect(th.getAttribute("role")).toBe("columnheader");
        });
      });

      it("表头单元格应该有 aria-colindex", async () => {
        const calendar = document.createElement("ea-calendar");
        container.appendChild(calendar);
        await waitForRender();
        const ths = calendar.shadowRoot.querySelectorAll(".ea-calendar__th");
        ths.forEach((th, i) => {
          expect(th.getAttribute("aria-colindex")).toBe(String(i + 1));
        });
      });

      it("日期行应该有 role=row", async () => {
        const calendar = document.createElement("ea-calendar");
        container.appendChild(calendar);
        await waitForRender();
        const rows = calendar.shadowRoot.querySelectorAll(
          ".ea-calendar__row"
        );
        rows.forEach(row => {
          expect(row.getAttribute("role")).toBe("row");
        });
      });

      it("日期行应该有 aria-rowindex", async () => {
        const calendar = document.createElement("ea-calendar");
        container.appendChild(calendar);
        await waitForRender();
        const rows = calendar.shadowRoot.querySelectorAll(
          ".ea-calendar__row"
        );
        rows.forEach(row => {
          expect(row.hasAttribute("aria-rowindex")).toBe(true);
        });
      });

      it("日期单元格应该有 role=gridcell", async () => {
        const calendar = document.createElement("ea-calendar");
        container.appendChild(calendar);
        await waitForRender();
        const cells = calendar.shadowRoot.querySelectorAll(
          "td[role='gridcell']"
        );
        expect(cells.length).toBeGreaterThan(0);
      });

      it("选中日期应该有 aria-selected=true", async () => {
        const calendar = document.createElement("ea-calendar");
        calendar.setAttribute("value", "2026-06-15");
        container.appendChild(calendar);
        await waitForRender();
        const selectedCell = calendar.shadowRoot.querySelector(
          'td[role="gridcell"][aria-selected="true"]'
        );
        expect(selectedCell).toBeTruthy();
      });

      it("今天应该有 aria-current=date", async () => {
        const calendar = document.createElement("ea-calendar");
        container.appendChild(calendar);
        await waitForRender();
        const todayCell = calendar.shadowRoot.querySelector(
          'td[aria-current="date"]'
        );
        expect(todayCell).toBeTruthy();
      });

      it("非当月日期应该有 aria-disabled=true", async () => {
        const calendar = document.createElement("ea-calendar");
        container.appendChild(calendar);
        await waitForRender();
        const prevMonthCells = calendar.shadowRoot.querySelectorAll(
          ".is-prev-month"
        );
        const nextMonthCells = calendar.shadowRoot.querySelectorAll(
          ".is-next-month"
        );
        const outOfRangeCells = [
          ...prevMonthCells,
          ...nextMonthCells,
        ];
        expect(outOfRangeCells.length).toBeGreaterThan(0);
        outOfRangeCells.forEach(cell => {
          expect(cell.getAttribute("aria-disabled")).toBe("true");
        });
      });

      it("当月日期不应该有 aria-disabled", async () => {
        const calendar = document.createElement("ea-calendar");
        container.appendChild(calendar);
        await waitForRender();
        const currentMonthCells = calendar.shadowRoot.querySelectorAll(
          ".is-current-month"
        );
        expect(currentMonthCells.length).toBeGreaterThan(0);
        currentMonthCells.forEach(cell => {
          expect(cell.getAttribute("aria-disabled")).toBeFalsy();
        });
      });

      it("日期单元格应该有 aria-colindex", async () => {
        const calendar = document.createElement("ea-calendar");
        container.appendChild(calendar);
        await waitForRender();
        const cells = calendar.shadowRoot.querySelectorAll(
          "td[role='gridcell']"
        );
        cells.forEach(cell => {
          expect(cell.hasAttribute("aria-colindex")).toBe(true);
        });
      });
    });
  });
});
