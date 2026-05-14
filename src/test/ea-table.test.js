import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender";

import "../components/ea-table/index";

if (typeof CSS === "undefined") {
  global.CSS = {
    supports: () => true,
  };
} else if (!CSS.supports) {
  CSS.supports = () => true;
}

if (
  !Element.prototype.hasOwnProperty("part") ||
  typeof Element.prototype.part !== "object"
) {
  Object.defineProperty(Element.prototype, "part", {
    get() {
      if (!this.__partTokenList) {
        const self = this;
        this.__partTokenList = {
          contains(token) {
            return (self.getAttribute("part") || "")
              .split(/\s+/)
              .includes(token);
          },
          add(...tokens) {
            const current = (self.getAttribute("part") || "")
              .split(/\s+/)
              .filter(Boolean);
            tokens.forEach(t => {
              if (!current.includes(t)) current.push(t);
            });
            self.setAttribute("part", current.join(" "));
          },
          remove(...tokens) {
            const current = (self.getAttribute("part") || "")
              .split(/\s+/)
              .filter(Boolean);
            tokens.forEach(t => {
              const idx = current.indexOf(t);
              if (idx !== -1) current.splice(idx, 1);
            });
            self.setAttribute("part", current.join(" "));
          },
          toggle(token, force) {
            if (force !== undefined) {
              if (force) {
                this.add(token);
              } else {
                this.remove(token);
              }
              return force;
            }
            if (this.contains(token)) {
              this.remove(token);
              return false;
            } else {
              this.add(token);
              return true;
            }
          },
        };
      }
      return this.__partTokenList;
    },
  });
}

const testData = [
  {
    id: 1,
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    id: 2,
    date: "2016-05-02",
    name: "John",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    id: 3,
    date: "2016-05-04",
    name: "Morgan",
    address: "No. 189, Grove St, Los Angeles",
  },
];

const numericTestData = [
  { id: 12987122, name: "Tom", amount1: 234, amount2: 3.2, amount3: 10 },
  { id: 12987123, name: "Tom", amount1: 165, amount2: 4.43, amount3: 12 },
  { id: 12987124, name: "Tom", amount1: 324, amount2: 1.9, amount3: 9 },
];

function createTableWithColumns(columnsHTML = "", attrs = "") {
  const table = document.createElement("ea-table");
  if (attrs) {
    attrs.split(" ").forEach(attr => {
      const [name, value] = attr.split("=");
      if (value !== undefined) {
        table.setAttribute(name, value);
      } else {
        table.setAttribute(name, "");
      }
    });
  }
  table.innerHTML = columnsHTML;
  return table;
}

describe("EaTable Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe("EaTable Basic Rendering", () => {
    it("应该正确渲染 ea-table 组件", () => {
      const table = document.createElement("ea-table");
      container.appendChild(table);

      expect(table).toBeDefined();
      expect(table.shadowRoot).toBeDefined();
    });

    it("应该包含 table 容器元素", () => {
      const table = document.createElement("ea-table");
      container.appendChild(table);

      const tableEl = table.shadowRoot.querySelector("table.ea-table");
      expect(tableEl).toBeTruthy();
    });

    it("应该包含 colgroup 元素", () => {
      const table = document.createElement("ea-table");
      container.appendChild(table);

      const colgroup = table.shadowRoot.querySelector(".ea-table__colgroup");
      expect(colgroup).toBeTruthy();
    });

    it("应该包含 thead 元素", () => {
      const table = document.createElement("ea-table");
      container.appendChild(table);

      const thead = table.shadowRoot.querySelector(".ea-table__thead");
      expect(thead).toBeTruthy();
    });

    it("应该包含 tbody 元素", () => {
      const table = document.createElement("ea-table");
      container.appendChild(table);

      const tbody = table.shadowRoot.querySelector(".ea-table__tbody");
      expect(tbody).toBeTruthy();
    });

    it("应该包含 tfoot 元素", () => {
      const table = document.createElement("ea-table");
      container.appendChild(table);

      const tfoot = table.shadowRoot.querySelector(".ea-table__tfoot");
      expect(tfoot).toBeTruthy();
    });

    it("应该包含默认 slot", () => {
      const table = document.createElement("ea-table");
      container.appendChild(table);

      const slot = table.shadowRoot.querySelector("#defaultSlot");
      expect(slot).toBeTruthy();
    });

    it("应该包含空数据 slot", () => {
      const table = document.createElement("ea-table");
      container.appendChild(table);

      const emptySlot = table.shadowRoot.querySelector('slot[name="empty"]');
      expect(emptySlot).toBeTruthy();
    });
  });

  describe("EaTable CSS Parts", () => {
    it("应该包含 container part", () => {
      const table = document.createElement("ea-table");
      container.appendChild(table);

      expect(table.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("应该包含 colgroup part", () => {
      const table = document.createElement("ea-table");
      container.appendChild(table);

      expect(table.shadowRoot.querySelector('[part="colgroup"]')).toBeTruthy();
    });

    it("应该包含 thead part", () => {
      const table = document.createElement("ea-table");
      container.appendChild(table);

      expect(table.shadowRoot.querySelector('[part="thead"]')).toBeTruthy();
    });

    it("应该包含 tbody part", () => {
      const table = document.createElement("ea-table");
      container.appendChild(table);

      expect(table.shadowRoot.querySelector('[part="tbody"]')).toBeTruthy();
    });

    it("应该包含 tfoot part", () => {
      const table = document.createElement("ea-table");
      container.appendChild(table);

      expect(table.shadowRoot.querySelector('[part="tfoot"]')).toBeTruthy();
    });

    it("应该包含 default-slot part", () => {
      const table = document.createElement("ea-table");
      container.appendChild(table);

      expect(
        table.shadowRoot.querySelector('[part="default-slot"]')
      ).toBeTruthy();
    });
  });

  describe("EaTableColumn Basic Rendering", () => {
    it("应该正确渲染 ea-table-column 组件", () => {
      const column = document.createElement("ea-table-column");
      container.appendChild(column);

      expect(column).toBeDefined();
      expect(column.shadowRoot).toBeDefined();
    });

    it("应该包含 container part", () => {
      const column = document.createElement("ea-table-column");
      container.appendChild(column);

      expect(
        column.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
    });

    it("应该包含 label part", () => {
      const column = document.createElement("ea-table-column");
      container.appendChild(column);

      expect(column.shadowRoot.querySelector('[part="label"]')).toBeTruthy();
    });

    it("应该包含 content part", () => {
      const column = document.createElement("ea-table-column");
      container.appendChild(column);

      expect(column.shadowRoot.querySelector('[part="content"]')).toBeTruthy();
    });

    it("应该包含 header slot", () => {
      const column = document.createElement("ea-table-column");
      container.appendChild(column);

      const slot = column.shadowRoot.querySelector('slot[name="header"]');
      expect(slot).toBeTruthy();
    });

    it("应该包含 default slot", () => {
      const column = document.createElement("ea-table-column");
      container.appendChild(column);

      const slot = column.shadowRoot.querySelector("#defaultSlot");
      expect(slot).toBeTruthy();
    });
  });

  describe("EaTable Stripe Attribute", () => {
    it("默认 stripe 应该是 false", async () => {
      const table = document.createElement("ea-table");
      container.appendChild(table);

      await waitForRender();

      expect(table.stripe).toBe(false);
    });

    it("设置 stripe 属性应该启用斑马纹", async () => {
      const table = document.createElement("ea-table");
      table.stripe = true;
      container.appendChild(table);

      await waitForRender();

      expect(table.stripe).toBe(true);
    });

    it("stripe 为 true 时容器应该有 is-stripe class", async () => {
      const table = document.createElement("ea-table");
      table.stripe = true;
      container.appendChild(table);

      await waitForRender();

      const containerEl = table.shadowRoot.querySelector(".ea-table");
      expect(containerEl.classList.contains("is-stripe")).toBe(true);
    });

    it("动态修改 stripe 应该生效", async () => {
      const table = document.createElement("ea-table");
      container.appendChild(table);

      await waitForRender();

      const containerEl = table.shadowRoot.querySelector(".ea-table");
      expect(containerEl.classList.contains("is-stripe")).toBe(false);

      table.stripe = true;
      await waitForRender();

      expect(containerEl.classList.contains("is-stripe")).toBe(true);
    });
  });

  describe("EaTable Border Attribute", () => {
    it("默认 border 应该是 false", async () => {
      const table = document.createElement("ea-table");
      container.appendChild(table);

      await waitForRender();

      expect(table.border).toBe(false);
    });

    it("设置 border 属性应该启用边框", async () => {
      const table = document.createElement("ea-table");
      table.border = true;
      container.appendChild(table);

      await waitForRender();

      expect(table.border).toBe(true);
    });

    it("border 为 true 时容器应该有 is-border class", async () => {
      const table = document.createElement("ea-table");
      table.border = true;
      container.appendChild(table);

      await waitForRender();

      const containerEl = table.shadowRoot.querySelector(".ea-table");
      expect(containerEl.classList.contains("is-border")).toBe(true);
    });

    it("动态修改 border 应该生效", async () => {
      const table = document.createElement("ea-table");
      container.appendChild(table);

      await waitForRender();

      const containerEl = table.shadowRoot.querySelector(".ea-table");
      expect(containerEl.classList.contains("is-border")).toBe(false);

      table.border = true;
      await waitForRender();

      expect(containerEl.classList.contains("is-border")).toBe(true);
    });
  });

  describe("EaTable Height Attribute", () => {
    it("默认 height 应该是空字符串", async () => {
      const table = document.createElement("ea-table");
      container.appendChild(table);

      await waitForRender();

      expect(table.height).toBe("");
    });

    it("应该支持 height 属性", async () => {
      const table = document.createElement("ea-table");
      table.height = "200px";
      container.appendChild(table);

      await waitForRender();

      expect(table.height).toBe("200px");
    });

    it("设置 height 应该设置 CSS 变量 --ea-table-height", async () => {
      const table = document.createElement("ea-table");
      table.height = "300px";
      container.appendChild(table);

      await waitForRender();

      expect(table.style.getPropertyValue("--ea-table-height")).toBe("300px");
    });

    it("动态修改 height 应该生效", async () => {
      const table = document.createElement("ea-table");
      container.appendChild(table);

      await waitForRender();

      table.height = "400px";
      await waitForRender();

      expect(table.height).toBe("400px");
      expect(table.style.getPropertyValue("--ea-table-height")).toBe("400px");
    });
  });

  describe("EaTable Max-height Attribute", () => {
    it("默认 maxHeight 应该是空字符串", async () => {
      const table = document.createElement("ea-table");
      container.appendChild(table);

      await waitForRender();

      expect(table.maxHeight).toBe("");
    });

    it("应该支持 max-height 属性", async () => {
      const table = document.createElement("ea-table");
      table.maxHeight = "400px";
      container.appendChild(table);

      await waitForRender();

      expect(table.maxHeight).toBe("400px");
    });

    it("设置 maxHeight 应该设置 CSS 变量 --ea-table-max-height", async () => {
      const table = document.createElement("ea-table");
      table.maxHeight = "500px";
      container.appendChild(table);

      await waitForRender();

      expect(table.style.getPropertyValue("--ea-table-max-height")).toBe(
        "500px"
      );
    });
  });

  describe("EaTable Highlight-current-row Attribute", () => {
    it("默认 highlightCurrentRow 应该是 false", async () => {
      const table = document.createElement("ea-table");
      container.appendChild(table);

      await waitForRender();

      expect(table.highlightCurrentRow).toBe(false);
    });

    it("设置 highlight-current-row 应该启用高亮", async () => {
      const table = document.createElement("ea-table");
      table.highlightCurrentRow = true;
      container.appendChild(table);

      await waitForRender();

      expect(table.highlightCurrentRow).toBe(true);
    });
  });

  describe("EaTable Show-summary Attribute", () => {
    it("默认 showSummary 应该是 false", async () => {
      const table = document.createElement("ea-table");
      container.appendChild(table);

      await waitForRender();

      expect(table.showSummary).toBe(false);
    });

    it("设置 show-summary 应该显示合计行", async () => {
      const table = document.createElement("ea-table");
      table.showSummary = true;
      container.appendChild(table);

      await waitForRender();

      expect(table.showSummary).toBe(true);
    });
  });

  describe("EaTableColumn Label Attribute", () => {
    it("默认 label 应该是空字符串", async () => {
      const column = document.createElement("ea-table-column");
      container.appendChild(column);

      await waitForRender();

      expect(column.label).toBe("");
    });

    it("应该支持 label 属性", async () => {
      const column = document.createElement("ea-table-column");
      column.label = "Date";
      container.appendChild(column);

      await waitForRender();

      expect(column.label).toBe("Date");
    });

    it("label 变化时应该更新 label 元素内容", async () => {
      const column = document.createElement("ea-table-column");
      column.label = "Old";
      column.prop = "name";
      container.appendChild(column);

      await waitForRender();

      const labelEl = column.shadowRoot.querySelector(
        ".ea-table-column__label"
      );
      expect(labelEl.textContent).toContain("Old");

      column.label = "New";
      await waitForRender();

      expect(labelEl.textContent).toContain("New");
    });
  });

  describe("EaTableColumn Prop Attribute", () => {
    it("默认 prop 应该是空字符串", async () => {
      const column = document.createElement("ea-table-column");
      container.appendChild(column);

      await waitForRender();

      expect(column.prop).toBe("");
    });

    it("应该支持 prop 属性", async () => {
      const column = document.createElement("ea-table-column");
      column.prop = "date";
      container.appendChild(column);

      await waitForRender();

      expect(column.prop).toBe("date");
    });
  });

  describe("EaTableColumn Width Attribute", () => {
    it("默认 width 应该是空字符串", async () => {
      const column = document.createElement("ea-table-column");
      container.appendChild(column);

      await waitForRender();

      expect(column.width).toBe("");
    });

    it("应该支持 width 属性", async () => {
      const column = document.createElement("ea-table-column");
      column.width = "180px";
      container.appendChild(column);

      await waitForRender();

      expect(column.width).toBe("180px");
    });
  });

  describe("EaTableColumn Align Attribute", () => {
    it("默认 align 应该是 left", async () => {
      const column = document.createElement("ea-table-column");
      container.appendChild(column);

      await waitForRender();

      expect(column.align).toBe("left");
    });

    it("应该支持 align='center'", async () => {
      const column = document.createElement("ea-table-column");
      column.align = "center";
      container.appendChild(column);

      await waitForRender();

      expect(column.align).toBe("center");
    });

    it("应该支持 align='right'", async () => {
      const column = document.createElement("ea-table-column");
      column.align = "right";
      container.appendChild(column);

      await waitForRender();

      expect(column.align).toBe("right");
    });
  });

  describe("EaTableColumn Sortable Attribute", () => {
    it("默认 sortable 应该是 false", async () => {
      const column = document.createElement("ea-table-column");
      container.appendChild(column);

      await waitForRender();

      expect(column.sortable).toBe(false);
    });

    it("设置 sortable 应该启用排序", async () => {
      const column = document.createElement("ea-table-column");
      column.sortable = true;
      container.appendChild(column);

      await waitForRender();

      expect(column.sortable).toBe(true);
    });
  });

  describe("EaTableColumn Fixed Attribute", () => {
    it("默认 fixed 应该是 false", async () => {
      const column = document.createElement("ea-table-column");
      container.appendChild(column);

      await waitForRender();

      expect(column.fixed).toBe("false");
    });

    it("应该支持 fixed='left'", async () => {
      const column = document.createElement("ea-table-column");
      column.setAttribute("fixed", "left");
      container.appendChild(column);

      await waitForRender();

      expect(column.getAttribute("fixed")).toBe("left");
    });

    it("应该支持 fixed='right'", async () => {
      const column = document.createElement("ea-table-column");
      column.setAttribute("fixed", "right");
      container.appendChild(column);

      await waitForRender();

      expect(column.getAttribute("fixed")).toBe("right");
    });
  });

  describe("EaTableColumn Type Attribute", () => {
    it("默认 type 应该是空字符串", async () => {
      const column = document.createElement("ea-table-column");
      container.appendChild(column);

      await waitForRender();

      expect(column.type).toBe("");
    });

    it("应该支持 type='selection'", async () => {
      const column = document.createElement("ea-table-column");
      column.type = "selection";
      container.appendChild(column);

      await waitForRender();

      expect(column.type).toBe("selection");
    });

    it("应该支持 type='index'", async () => {
      const column = document.createElement("ea-table-column");
      column.type = "index";
      container.appendChild(column);

      await waitForRender();

      expect(column.type).toBe("index");
    });
  });

  describe("EaTableColumn Colspan Attribute", () => {
    it("默认 colspan 应该是 falsy", async () => {
      const column = document.createElement("ea-table-column");
      container.appendChild(column);

      await waitForRender();

      expect(column.colspan).toBeFalsy();
    });

    it("应该支持 colspan 属性", async () => {
      const column = document.createElement("ea-table-column");
      column.colspan = 2;
      container.appendChild(column);

      await waitForRender();

      expect(column.colspan).toBe(2);
    });
  });

  describe("EaTableColumn Option Property", () => {
    it("默认 option 应该是空对象", async () => {
      const column = document.createElement("ea-table-column");
      container.appendChild(column);

      await waitForRender();

      expect(column.option).toEqual({});
    });

    it("应该支持设置 option", async () => {
      const column = document.createElement("ea-table-column");
      column.option = { customKey: "customValue" };
      container.appendChild(column);

      await waitForRender();

      expect(column.option).toEqual({ customKey: "customValue" });
    });
  });

  describe("Data Methods - setData", () => {
    it("应该支持 setData 方法", async () => {
      const table = createTableWithColumns(`
        <ea-table-column label="Date" prop="date" width="180px"></ea-table-column>
        <ea-table-column label="Name" prop="name" width="180px"></ea-table-column>
      `);
      container.appendChild(table);

      await waitForRender(200);

      table.setData(testData);

      await waitForRender(200);

      expect(table.data).toEqual(testData);
    });

    it("空数据应该正确渲染", async () => {
      const table = createTableWithColumns(`
        <ea-table-column label="Date" prop="date"></ea-table-column>
      `);
      container.appendChild(table);

      await waitForRender(200);

      table.setData([]);

      await waitForRender(200);

      expect(table.data).toEqual([]);
    });

    it("setData 后应该渲染 tbody 行", async () => {
      const table = createTableWithColumns(`
        <ea-table-column label="ID" prop="id"></ea-table-column>
        <ea-table-column label="Name" prop="name"></ea-table-column>
      `);
      container.appendChild(table);

      await waitForRender(200);

      table.setData(testData);

      await waitForRender(200);

      const rows = table.shadowRoot.querySelectorAll("tbody .ea-table__tr");
      expect(rows.length).toBe(3);
    });

    it("setData 后应该正确渲染单元格内容", async () => {
      const table = createTableWithColumns(`
        <ea-table-column label="ID" prop="id"></ea-table-column>
        <ea-table-column label="Name" prop="name"></ea-table-column>
      `);
      container.appendChild(table);

      await waitForRender(200);

      table.setData(testData);

      await waitForRender(200);

      const firstRowTds = table.shadowRoot.querySelectorAll(
        'tbody .ea-table__tr[data-index="0"] .ea-table__td[data-scope]'
      );
      expect(firstRowTds.length).toBe(2);
      expect(firstRowTds[0].textContent).toBe("1");
      expect(firstRowTds[1].textContent).toBe("Tom");
    });

    it("setData 后应该渲染 colgroup col 元素", async () => {
      const table = createTableWithColumns(`
        <ea-table-column label="ID" prop="id" width="180px"></ea-table-column>
        <ea-table-column label="Name" prop="name"></ea-table-column>
      `);
      container.appendChild(table);

      await waitForRender(200);

      table.setData(testData);

      await waitForRender(200);

      const cols = table.shadowRoot.querySelectorAll("colgroup col");
      expect(cols.length).toBe(2);
    });

    it("setData 后应该触发 ea-table-data-rendered 事件", async () => {
      const table = createTableWithColumns(`
        <ea-table-column label="ID" prop="id"></ea-table-column>
      `);
      container.appendChild(table);

      await waitForRender(200);

      const handler = vi.fn();
      table.addEventListener("ea-table-data-rendered", handler);

      table.setData(testData);

      await waitForRender(200);

      expect(handler).toHaveBeenCalled();
    });

    it("多次 setData 应该替换旧数据", async () => {
      const table = createTableWithColumns(`
        <ea-table-column label="ID" prop="id"></ea-table-column>
      `);
      container.appendChild(table);

      await waitForRender(200);

      table.setData(testData);

      await waitForRender(200);

      const newData = [{ id: 10 }, { id: 20 }];
      table.setData(newData);

      await waitForRender(200);

      const rows = table.shadowRoot.querySelectorAll("tbody .ea-table__tr");
      expect(rows.length).toBe(2);
    });

    it("数据中缺少字段应该渲染为空字符串", async () => {
      const partialData = [{ id: 1 }, { id: 2, name: "John" }];
      const table = createTableWithColumns(`
        <ea-table-column label="ID" prop="id"></ea-table-column>
        <ea-table-column label="Name" prop="name"></ea-table-column>
      `);
      container.appendChild(table);

      await waitForRender(200);

      table.setData(partialData);

      await waitForRender(200);

      const rows = table.shadowRoot.querySelectorAll("tbody .ea-table__tr");
      const firstRowNameTd = rows[0].querySelector(
        '.ea-table__td[data-scope="name"]'
      );
      expect(firstRowNameTd.textContent).toBe("");

      const secondRowNameTd = rows[1].querySelector(
        '.ea-table__td[data-scope="name"]'
      );
      expect(secondRowNameTd.textContent).toBe("John");
    });
  });

  describe("Data Property Observer", () => {
    it("设置 data 属性应该自动调用 setData", async () => {
      const table = createTableWithColumns(`
        <ea-table-column label="ID" prop="id"></ea-table-column>
        <ea-table-column label="Name" prop="name"></ea-table-column>
      `);
      container.appendChild(table);

      await waitForRender(200);

      table.data = testData;

      await waitForRender(200);

      const rows = table.shadowRoot.querySelectorAll("tbody .ea-table__tr");
      expect(rows.length).toBe(3);
    });
  });

  describe("Thead Rendering", () => {
    it("thead 应该正确渲染列标签", async () => {
      const table = createTableWithColumns(`
        <ea-table-column label="Date" prop="date"></ea-table-column>
        <ea-table-column label="Name" prop="name"></ea-table-column>
      `);
      container.appendChild(table);

      await waitForRender(200);

      table.setData(testData);

      await waitForRender(200);

      const ths = table.shadowRoot.querySelectorAll("thead .ea-table__th");
      expect(ths.length).toBe(2);
      expect(ths[0].textContent.trim()).toContain("Date");
      expect(ths[1].textContent.trim()).toContain("Name");
    });

    it("thead th 应该有 data-scope 和 data-prop 属性", async () => {
      const table = createTableWithColumns(`
        <ea-table-column label="Date" prop="date"></ea-table-column>
      `);
      container.appendChild(table);

      await waitForRender(200);

      table.setData(testData);

      await waitForRender(200);

      const th = table.shadowRoot.querySelector("thead .ea-table__th");
      expect(th.getAttribute("data-prop")).toBe("date");
    });

    it("selection 类型列 thead 应该渲染 checkbox", async () => {
      const table = createTableWithColumns(`
        <ea-table-column type="selection"></ea-table-column>
        <ea-table-column label="ID" prop="id"></ea-table-column>
      `);
      container.appendChild(table);

      await waitForRender(200);

      table.setData(testData);

      await waitForRender(200);

      const theadCheckbox = table.shadowRoot.querySelector(
        'thead ea-checkbox[data-type="selection"]'
      );
      expect(theadCheckbox).toBeTruthy();
    });
  });

  describe("Tfoot Rendering", () => {
    it("tfoot 应该渲染与列数相同的 td", async () => {
      const table = createTableWithColumns(`
        <ea-table-column label="ID" prop="id"></ea-table-column>
        <ea-table-column label="Name" prop="name"></ea-table-column>
      `);
      container.appendChild(table);

      await waitForRender(200);

      table.setData(testData);

      await waitForRender(200);

      const tfootTds = table.shadowRoot.querySelectorAll("tfoot .ea-table__td");
      expect(tfootTds.length).toBe(2);
    });

    it("tfoot td 应该有 data-scope 属性", async () => {
      const table = createTableWithColumns(`
        <ea-table-column label="ID" prop="id"></ea-table-column>
        <ea-table-column label="Name" prop="name"></ea-table-column>
      `);
      container.appendChild(table);

      await waitForRender(200);

      table.setData(testData);

      await waitForRender(200);

      const tfootTds = table.shadowRoot.querySelectorAll(
        "tfoot .ea-table__td[data-scope]"
      );
      expect(tfootTds.length).toBe(2);
    });
  });

  describe("Sort Method", () => {
    it("sort 方法应该按升序排序", async () => {
      const table = createTableWithColumns(`
        <ea-table-column label="ID" prop="id" sortable></ea-table-column>
      `);
      container.appendChild(table);

      await waitForRender(200);

      table.setData(testData);

      await waitForRender(200);

      table.sort("id", "asc");

      await waitForRender();

      const rows = table.shadowRoot.querySelectorAll("tbody .ea-table__tr");
      const firstId = rows[0].querySelector('.ea-table__td[data-scope="id"]');
      expect(firstId.textContent).toBe("1");
    });

    it("sort 方法应该按降序排序", async () => {
      const table = createTableWithColumns(`
        <ea-table-column label="ID" prop="id" sortable></ea-table-column>
      `);
      container.appendChild(table);

      await waitForRender(200);

      table.setData(testData);

      await waitForRender(200);

      table.sort("id", "desc");

      await waitForRender();

      const rows = table.shadowRoot.querySelectorAll("tbody .ea-table__tr");
      const firstId = rows[0].querySelector('.ea-table__td[data-scope="id"]');
      expect(firstId.textContent).toBe("3");
    });

    it("sort 方法应该触发 ea-sort-change 事件", async () => {
      const table = createTableWithColumns(`
        <ea-table-column label="ID" prop="id" sortable></ea-table-column>
      `);
      container.appendChild(table);

      await waitForRender(200);

      table.setData(testData);

      await waitForRender(200);

      const handler = vi.fn();
      table.addEventListener("ea-sort-change", handler);

      table.sort("id", "asc");

      expect(handler).toHaveBeenCalled();
      expect(handler.mock.calls[0][0].detail.prop).toBe("id");
      expect(handler.mock.calls[0][0].detail.order).toBe("asc");
    });

    it("排序应该支持多次切换 asc/desc", async () => {
      const table = createTableWithColumns(`
        <ea-table-column label="ID" prop="id" sortable></ea-table-column>
      `);
      container.appendChild(table);

      await waitForRender(200);

      table.setData(testData);

      await waitForRender(200);

      table.sort("id", "asc");

      await waitForRender();

      let rows = table.shadowRoot.querySelectorAll("tbody .ea-table__tr");
      let firstId = rows[0].querySelector('.ea-table__td[data-scope="id"]');
      expect(firstId.textContent).toBe("1");

      table.sort("id", "desc");

      await waitForRender();

      rows = table.shadowRoot.querySelectorAll("tbody .ea-table__tr");
      firstId = rows[0].querySelector('.ea-table__td[data-scope="id"]');
      expect(firstId.textContent).toBe("3");

      table.sort("id", "asc");

      await waitForRender();

      rows = table.shadowRoot.querySelectorAll("tbody .ea-table__tr");
      firstId = rows[0].querySelector('.ea-table__td[data-scope="id"]');
      expect(firstId.textContent).toBe("1");
    });
  });

  describe("Summary Row", () => {
    it("showSummary 为 true 且无 summaryMethod 时应该使用默认合计方法", async () => {
      const table = createTableWithColumns(
        `
        <ea-table-column label="ID" prop="id" width="180px"></ea-table-column>
        <ea-table-column label="Name" prop="name"></ea-table-column>
        <ea-table-column label="Amount 1" prop="amount1"></ea-table-column>
        <ea-table-column label="Amount 2" prop="amount2"></ea-table-column>
        <ea-table-column label="Amount 3" prop="amount3"></ea-table-column>
      `,
        "border show-summary"
      );
      container.appendChild(table);

      await waitForRender(200);

      table.setData(numericTestData);

      await waitForRender(200);

      const tfootTds = table.shadowRoot.querySelectorAll(
        "tfoot .ea-table__td[data-scope]"
      );
      expect(tfootTds.length).toBe(5);

      expect(tfootTds[0].textContent).toBe("Sum");
      expect(tfootTds[1].textContent).toBe("");
      expect(tfootTds[2].textContent).toBe(String(234 + 165 + 324));
      expect(tfootTds[3].textContent).toBe(String(3.2 + 4.43 + 1.9));
      expect(tfootTds[4].textContent).toBe(String(10 + 12 + 9));
    });

    it("showSummary 为 true 且有 summaryMethod 时应该使用自定义合计方法", async () => {
      const table = createTableWithColumns(
        `
        <ea-table-column label="ID" prop="id" width="180px"></ea-table-column>
        <ea-table-column label="Name" prop="name"></ea-table-column>
        <ea-table-column label="Amount 1" prop="amount1"></ea-table-column>
      `,
        "border show-summary"
      );
      container.appendChild(table);

      await waitForRender(200);

      table.summaryMethod = ({ columns, data }) => {
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = "Total";
            return;
          }
          const values = data.map(item => Number(item[column.prop]));
          if (!values.every(value => Number.isNaN(value))) {
            sums[index] = `$${values.reduce((prev, curr) => {
              const value = Number(curr);
              return Number.isNaN(value) ? prev : prev + curr;
            }, 0)}`;
          } else {
            sums[index] = "";
          }
        });
        return sums;
      };

      table.setData(numericTestData);

      await waitForRender(200);

      const tfootTds = table.shadowRoot.querySelectorAll(
        "tfoot .ea-table__td[data-scope]"
      );
      expect(tfootTds[0].textContent).toBe("Total");
      expect(tfootTds[1].textContent).toBe("");
      expect(tfootTds[2].textContent).toBe(`$${234 + 165 + 324}`);
    });

    it("showSummary 为 false 时不应渲染合计内容", async () => {
      const table = createTableWithColumns(`
        <ea-table-column label="ID" prop="id"></ea-table-column>
        <ea-table-column label="Amount 1" prop="amount1"></ea-table-column>
      `);
      container.appendChild(table);

      await waitForRender(200);

      table.setData(numericTestData);

      await waitForRender(200);

      const tfootTds = table.shadowRoot.querySelectorAll(
        "tfoot .ea-table__td[data-scope]"
      );
      tfootTds.forEach(td => {
        expect(td.textContent.trim()).toBe("");
      });
    });
  });

  describe("Selection Column", () => {
    it("type='selection' 列应该渲染 checkbox", async () => {
      const table = createTableWithColumns(`
        <ea-table-column type="selection"></ea-table-column>
        <ea-table-column label="ID" prop="id"></ea-table-column>
      `);
      container.appendChild(table);

      await waitForRender(200);

      table.setData(testData);

      await waitForRender(200);

      const checkboxes = table.shadowRoot.querySelectorAll(
        'tbody ea-checkbox[data-type="selection"]'
      );
      expect(checkboxes.length).toBe(3);
    });

    it("type='selection' 列应该在 thead 渲染全选 checkbox", async () => {
      const table = createTableWithColumns(`
        <ea-table-column type="selection"></ea-table-column>
        <ea-table-column label="ID" prop="id"></ea-table-column>
      `);
      container.appendChild(table);

      await waitForRender(200);

      table.setData(testData);

      await waitForRender(200);

      const theadCheckbox = table.shadowRoot.querySelector(
        'thead ea-checkbox[data-type="selection"]'
      );
      expect(theadCheckbox).toBeTruthy();
    });

    it("toggleRowSelection 应该切换行选择状态", async () => {
      const table = createTableWithColumns(`
        <ea-table-column type="selection"></ea-table-column>
        <ea-table-column label="ID" prop="id"></ea-table-column>
      `);
      container.appendChild(table);

      await waitForRender(200);

      table.setData(testData);

      await waitForRender(200);

      table.toggleRowSelection(testData[0], true);

      await waitForRender();

      const checked = table.shadowRoot.querySelectorAll(
        'tbody ea-checkbox[data-type="selection"][checked]'
      );
      expect(checked.length).toBe(1);
    });

    it("clearSelection 应该清空所有选择", async () => {
      const table = createTableWithColumns(`
        <ea-table-column type="selection"></ea-table-column>
        <ea-table-column label="ID" prop="id"></ea-table-column>
      `);
      container.appendChild(table);

      await waitForRender(200);

      table.setData(testData);

      await waitForRender(200);

      table.toggleRowSelection(testData[0], true);
      table.toggleRowSelection(testData[1], true);

      await waitForRender();

      table.clearSelection();

      await waitForRender();

      const checked = table.shadowRoot.querySelectorAll(
        'tbody ea-checkbox[data-type="selection"][checked]'
      );
      expect(checked.length).toBe(0);
    });

    it("selectable 属性应该控制行是否可选", async () => {
      const table = createTableWithColumns(`
        <ea-table-column type="selection"></ea-table-column>
        <ea-table-column label="ID" prop="id"></ea-table-column>
      `);
      container.appendChild(table);

      await waitForRender(200);

      table.selectable = row => row.id !== 2;

      table.setData(testData);

      await waitForRender(200);

      const disabled = table.shadowRoot.querySelectorAll(
        'tbody ea-checkbox[data-type="selection"][disabled]'
      );
      expect(disabled.length).toBe(1);
    });

    it("选择行应该触发 ea-selection-change 事件", async () => {
      const table = createTableWithColumns(`
        <ea-table-column type="selection"></ea-table-column>
        <ea-table-column label="ID" prop="id"></ea-table-column>
      `);
      container.appendChild(table);

      await waitForRender(200);

      table.setData(testData);

      await waitForRender(200);

      const handler = vi.fn();
      table.addEventListener("ea-selection-change", handler);

      table.toggleRowSelection(testData[0], true);

      expect(handler).toHaveBeenCalled();
    });
  });

  describe("Index Column", () => {
    it("type='index' 列应该渲染索引", async () => {
      const table = createTableWithColumns(`
        <ea-table-column type="index"></ea-table-column>
        <ea-table-column label="Name" prop="name"></ea-table-column>
      `);
      container.appendChild(table);

      await waitForRender(200);

      table.indexMethod = index => index;

      table.setData(testData);

      await waitForRender(200);

      const indexEls = table.shadowRoot.querySelectorAll(
        'tbody .ea-table__index[data-type="index"]'
      );
      expect(indexEls.length).toBe(3);
      expect(indexEls[0].textContent).toBe("0");
      expect(indexEls[1].textContent).toBe("1");
      expect(indexEls[2].textContent).toBe("2");
    });

    it("indexMethod 应该自定义索引", async () => {
      const table = createTableWithColumns(`
        <ea-table-column type="index"></ea-table-column>
        <ea-table-column label="Name" prop="name"></ea-table-column>
      `);
      container.appendChild(table);

      await waitForRender(200);

      table.indexMethod = index => index + 1;

      table.setData(testData);

      await waitForRender(200);

      const indexEls = table.shadowRoot.querySelectorAll(
        'tbody .ea-table__index[data-type="index"]'
      );
      expect(indexEls[0].textContent).toBe("1");
      expect(indexEls[1].textContent).toBe("2");
      expect(indexEls[2].textContent).toBe("3");
    });
  });

  describe("Highlight Current Row", () => {
    it("setCurrentRow 应该设置当前行", async () => {
      const table = createTableWithColumns(
        `
        <ea-table-column label="ID" prop="id"></ea-table-column>
      `,
        "highlight-current-row"
      );
      container.appendChild(table);

      await waitForRender(200);

      table.setData(testData);

      await waitForRender(200);

      table.setCurrentRow(testData[0]);

      await waitForRender();

      const currentRow = table.getCurrentRow();
      expect(currentRow.value).toEqual(testData[0]);

      const tr = table.shadowRoot.querySelector(
        'tbody .ea-table__tr[data-index="0"]'
      );
      expect(tr.classList.contains("is-current")).toBe(true);
    });

    it("getCurrentRow 应该返回当前行数据", async () => {
      const table = createTableWithColumns(
        `
        <ea-table-column label="ID" prop="id"></ea-table-column>
      `,
        "highlight-current-row"
      );
      container.appendChild(table);

      await waitForRender(200);

      table.setData(testData);

      await waitForRender(200);

      table.setCurrentRow(testData[1]);

      const currentRow = table.getCurrentRow();
      expect(currentRow.value).toEqual(testData[1]);
    });

    it("setCurrentRow(null) 应该取消高亮", async () => {
      const table = createTableWithColumns(
        `
        <ea-table-column label="ID" prop="id"></ea-table-column>
      `,
        "highlight-current-row"
      );
      container.appendChild(table);

      await waitForRender(200);

      table.setData(testData);

      await waitForRender(200);

      table.setCurrentRow(testData[0]);

      await waitForRender();

      table.setCurrentRow(null);

      await waitForRender();

      const currentRow = table.getCurrentRow();
      expect(currentRow.value).toBeNull();

      const tr = table.shadowRoot.querySelector(
        'tbody .ea-table__tr[data-index="0"]'
      );
      expect(tr.classList.contains("is-current")).toBe(false);
    });

    it("切换高亮行时旧行应该取消高亮", async () => {
      const table = createTableWithColumns(
        `
        <ea-table-column label="ID" prop="id"></ea-table-column>
      `,
        "highlight-current-row"
      );
      container.appendChild(table);

      await waitForRender(200);

      table.setData(testData);

      await waitForRender(200);

      table.setCurrentRow(testData[0]);

      await waitForRender();

      const tr0 = table.shadowRoot.querySelector(
        'tbody .ea-table__tr[data-index="0"]'
      );
      expect(tr0.classList.contains("is-current")).toBe(true);

      table.setCurrentRow(testData[1]);

      await waitForRender();

      expect(tr0.classList.contains("is-current")).toBe(false);

      const tr1 = table.shadowRoot.querySelector(
        'tbody .ea-table__tr[data-index="1"]'
      );
      expect(tr1.classList.contains("is-current")).toBe(true);
    });
  });

  describe("Row Style Part", () => {
    it("setRowStylePart 应该支持函数形式", async () => {
      const table = createTableWithColumns(`
        <ea-table-column label="ID" prop="id"></ea-table-column>
      `);
      container.appendChild(table);

      await waitForRender(200);

      table.setData(testData);

      await waitForRender(200);

      table.setRowStylePart(({ rowIndex }) =>
        rowIndex === 0 ? "custom-row" : ""
      );

      await waitForRender();

      const rows = table.shadowRoot.querySelectorAll("tbody .ea-table__tr");
      const row0Part = rows[0].getAttribute("part") || "";
      const row1Part = rows[1].getAttribute("part") || "";
      expect(row0Part).toContain("custom-row");
      expect(row1Part).not.toContain("custom-row");
    });

    it("setRowStylePart 应该支持字符串形式", async () => {
      const table = createTableWithColumns(`
        <ea-table-column label="ID" prop="id"></ea-table-column>
      `);
      container.appendChild(table);

      await waitForRender(200);

      table.setData(testData);

      await waitForRender(200);

      table.setRowStylePart("highlight-row");

      await waitForRender();

      const rows = table.shadowRoot.querySelectorAll("tbody .ea-table__tr");
      rows.forEach(row => {
        const part = row.getAttribute("part") || "";
        expect(part).toContain("highlight-row");
      });
    });
  });

  describe("Sortable Column Rendering", () => {
    it("sortable 列应该在 thead 渲染排序图标", async () => {
      const table = createTableWithColumns(`
        <ea-table-column label="ID" prop="id" sortable></ea-table-column>
      `);
      container.appendChild(table);

      await waitForRender(200);

      const sortableTh = table.shadowRoot.querySelector(
        "thead .ea-table__th.is-sortable"
      );
      expect(sortableTh).toBeTruthy();

      const sortIcons = sortableTh.querySelectorAll(".ea-table__sort-icon");
      expect(sortIcons.length).toBe(2);
    });

    it("sortable 列应该有 data-order 属性", async () => {
      const table = createTableWithColumns(`
        <ea-table-column label="ID" prop="id" sortable></ea-table-column>
      `);
      container.appendChild(table);

      await waitForRender(200);

      const sortableTh = table.shadowRoot.querySelector(
        "thead .ea-table__th.is-sortable"
      );
      expect(sortableTh.getAttribute("data-order")).toBe("asc");
    });
  });

  describe("Fixed Column Rendering", () => {
    it("fixed='left' 列应该有 is-fixed 和 fixed-left class", async () => {
      const table = createTableWithColumns(`
        <ea-table-column label="ID" prop="id" fixed="left"></ea-table-column>
        <ea-table-column label="Name" prop="name"></ea-table-column>
      `);
      container.appendChild(table);

      await waitForRender(200);

      table.setData(testData);

      await waitForRender(200);

      const fixedTds = table.shadowRoot.querySelectorAll(
        "tbody .ea-table__td.is-fixed.fixed-left"
      );
      expect(fixedTds.length).toBe(3);
    });

    it("fixed='right' 列应该有 is-fixed 和 fixed-right class", async () => {
      const table = createTableWithColumns(`
        <ea-table-column label="Name" prop="name"></ea-table-column>
        <ea-table-column label="ID" prop="id" fixed="right"></ea-table-column>
      `);
      container.appendChild(table);

      await waitForRender(200);

      table.setData(testData);

      await waitForRender(200);

      const fixedTds = table.shadowRoot.querySelectorAll(
        "tbody .ea-table__td.is-fixed.fixed-right"
      );
      expect(fixedTds.length).toBe(3);
    });
  });

  describe("Column Width Rendering", () => {
    it("设置 width 的列应该设置 CSS 变量 --ea-table-cell-width", async () => {
      const table = createTableWithColumns(`
        <ea-table-column label="ID" prop="id" width="180px"></ea-table-column>
      `);
      container.appendChild(table);

      await waitForRender(200);

      table.setData(testData);

      await waitForRender(200);

      const tds = table.shadowRoot.querySelectorAll(
        'tbody .ea-table__td[data-scope="id"]'
      );
      tds.forEach(td => {
        expect(td.style.getPropertyValue("--ea-table-cell-width")).toBe(
          "180px"
        );
      });
    });
  });

  describe("Column Align Rendering", () => {
    it("align='center' 列应该有 ea-table__cell--align-center class", async () => {
      const table = createTableWithColumns(`
        <ea-table-column label="ID" prop="id" align="center"></ea-table-column>
      `);
      container.appendChild(table);

      await waitForRender(200);

      table.setData(testData);

      await waitForRender(200);

      const tds = table.shadowRoot.querySelectorAll(
        "tbody .ea-table__td.ea-table__cell--align-center"
      );
      expect(tds.length).toBe(3);
    });

    it("align='right' 列应该有 ea-table__cell--align-right class", async () => {
      const table = createTableWithColumns(`
        <ea-table-column label="ID" prop="id" align="right"></ea-table-column>
      `);
      container.appendChild(table);

      await waitForRender(200);

      table.setData(testData);

      await waitForRender(200);

      const tds = table.shadowRoot.querySelectorAll(
        "tbody .ea-table__td.ea-table__cell--align-right"
      );
      expect(tds.length).toBe(3);
    });
  });

  describe("Row Data-index Attribute", () => {
    it("行应该有 data-index 属性", async () => {
      const table = createTableWithColumns(`
        <ea-table-column label="ID" prop="id"></ea-table-column>
      `);
      container.appendChild(table);

      await waitForRender(200);

      table.setData(testData);

      await waitForRender(200);

      const rows = table.shadowRoot.querySelectorAll("tbody .ea-table__tr");
      expect(rows[0].getAttribute("data-index")).toBe("0");
      expect(rows[1].getAttribute("data-index")).toBe("1");
      expect(rows[2].getAttribute("data-index")).toBe("2");
    });
  });

  describe("Events", () => {
    it("ea-row-click 事件应该在行点击时触发", async () => {
      const table = createTableWithColumns(`
        <ea-table-column label="ID" prop="id"></ea-table-column>
      `);
      container.appendChild(table);

      await waitForRender(200);

      table.setData(testData);

      await waitForRender(200);

      const handler = vi.fn();
      table.addEventListener("ea-row-click", handler);

      const firstRow = table.shadowRoot.querySelector(
        'tbody .ea-table__tr[data-index="0"]'
      );
      const firstTd = firstRow.querySelector("td");

      firstRow.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
      firstTd.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));

      await waitForRender();

      expect(handler).toHaveBeenCalled();
    });

    it("ea-current-change 事件应该在行点击时触发", async () => {
      const table = createTableWithColumns(
        `
        <ea-table-column label="ID" prop="id"></ea-table-column>
      `,
        "highlight-current-row"
      );
      container.appendChild(table);

      await waitForRender(200);

      table.setData(testData);

      await waitForRender(200);

      const handler = vi.fn();
      table.addEventListener("ea-current-change", handler);

      const firstRow = table.shadowRoot.querySelector(
        'tbody .ea-table__tr[data-index="0"]'
      );
      const firstTd = firstRow.querySelector("td");

      firstRow.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
      firstTd.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));

      await waitForRender();

      expect(handler).toHaveBeenCalled();
    });

    it("ea-cell-click 事件应该在单元格点击时触发", async () => {
      const table = createTableWithColumns(`
        <ea-table-column label="ID" prop="id"></ea-table-column>
      `);
      container.appendChild(table);

      await waitForRender(200);

      table.setData(testData);

      await waitForRender(200);

      const handler = vi.fn();
      table.addEventListener("ea-cell-click", handler);

      const firstRow = table.shadowRoot.querySelector(
        'tbody .ea-table__tr[data-index="0"]'
      );
      const firstTd = firstRow.querySelector("td");

      firstRow.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
      firstTd.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));

      await waitForRender();

      expect(handler).toHaveBeenCalled();
    });

    it("ea-header-click 事件应该在表头点击时触发", async () => {
      const table = createTableWithColumns(`
        <ea-table-column label="ID" prop="id"></ea-table-column>
      `);
      container.appendChild(table);

      await waitForRender(200);

      table.setData(testData);

      await waitForRender(200);

      const handler = vi.fn();
      table.addEventListener("ea-header-click", handler);

      const th = table.shadowRoot.querySelector("thead .ea-table__th");
      th.dispatchEvent(new MouseEvent("click", { bubbles: true }));

      await waitForRender();

      expect(handler).toHaveBeenCalled();
    });
  });

  describe("Combined Table and TableColumn", () => {
    it("应该正确渲染包含多个 column 的 table", async () => {
      const table = createTableWithColumns(`
        <ea-table-column label="Date" prop="date" width="180px"></ea-table-column>
        <ea-table-column label="Name" prop="name" width="180px"></ea-table-column>
        <ea-table-column label="Address" prop="address"></ea-table-column>
      `);
      container.appendChild(table);

      await waitForRender(200);

      table.setData(testData);

      await waitForRender(200);

      const ths = table.shadowRoot.querySelectorAll("thead .ea-table__th");
      expect(ths.length).toBe(3);

      const rows = table.shadowRoot.querySelectorAll("tbody .ea-table__tr");
      expect(rows.length).toBe(3);

      const firstRow = rows[0];
      const tds = firstRow.querySelectorAll(".ea-table__td[data-scope]");
      expect(tds.length).toBe(3);
      expect(tds[0].textContent).toBe("2016-05-03");
      expect(tds[1].textContent).toBe("Tom");
      expect(tds[2].textContent).toBe("No. 189, Grove St, Los Angeles");
    });

    it("应该支持带斑马纹的表格", async () => {
      const table = createTableWithColumns(
        `
        <ea-table-column label="Date" prop="date"></ea-table-column>
        <ea-table-column label="Name" prop="name"></ea-table-column>
      `,
        "stripe"
      );
      container.appendChild(table);

      await waitForRender(200);

      expect(table.stripe).toBe(true);
    });

    it("应该支持带边框的表格", async () => {
      const table = createTableWithColumns(
        `
        <ea-table-column label="Date" prop="date"></ea-table-column>
        <ea-table-column label="Name" prop="name"></ea-table-column>
      `,
        "border"
      );
      container.appendChild(table);

      await waitForRender(200);

      expect(table.border).toBe(true);
    });

    it("应该支持固定表头", async () => {
      const table = createTableWithColumns(
        `
        <ea-table-column label="Date" prop="date"></ea-table-column>
        <ea-table-column label="Name" prop="name"></ea-table-column>
      `
      );
      table.height = "200px";
      container.appendChild(table);

      await waitForRender(200);

      expect(table.height).toBe("200px");
    });
  });

  describe("Edge Cases", () => {
    it("空 table 应该正常渲染", () => {
      const table = document.createElement("ea-table");
      container.appendChild(table);

      expect(table.shadowRoot.querySelector("table.ea-table")).toBeTruthy();
    });

    it("没有 column 的 table 调用 setData 应该正常", async () => {
      const table = document.createElement("ea-table");
      container.appendChild(table);

      await waitForRender(200);

      table.setData(testData);

      await waitForRender(200);

      expect(table.shadowRoot.querySelector("table.ea-table")).toBeTruthy();
    });

    it("大量数据应该正确处理", async () => {
      const table = createTableWithColumns(`
        <ea-table-column label="ID" prop="id"></ea-table-column>
      `);
      container.appendChild(table);

      await waitForRender(200);

      const largeData = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
      }));
      table.setData(largeData);

      await waitForRender(200);

      const rows = table.shadowRoot.querySelectorAll("tbody .ea-table__tr");
      expect(rows.length).toBe(100);
    });

    it("数据中缺少字段应该渲染为空字符串", async () => {
      const partialData = [{ id: 1 }, { id: 2, name: "John" }];
      const table = createTableWithColumns(`
        <ea-table-column label="ID" prop="id"></ea-table-column>
        <ea-table-column label="Name" prop="name"></ea-table-column>
      `);
      container.appendChild(table);

      await waitForRender(200);

      table.setData(partialData);

      await waitForRender(200);

      const rows = table.shadowRoot.querySelectorAll("tbody .ea-table__tr");
      const firstRowNameTd = rows[0].querySelector(
        '.ea-table__td[data-scope="name"]'
      );
      expect(firstRowNameTd.textContent).toBe("");
    });
  });

  describe("Lifecycle", () => {
    it("table 组件连接后应该正确初始化", async () => {
      const table = document.createElement("ea-table");
      container.appendChild(table);

      await waitForRender();

      expect(table.shadowRoot).toBeDefined();
      expect(table.shadowRoot.querySelector("table.ea-table")).toBeTruthy();
    });

    it("column 组件连接后应该正确初始化", async () => {
      const column = document.createElement("ea-table-column");
      column.label = "Test";
      column.prop = "test";
      container.appendChild(column);

      await waitForRender();

      expect(column.label).toBe("Test");
      expect(column.prop).toBe("test");
    });

    it("组件断开连接后应该正常移除", async () => {
      const table = document.createElement("ea-table");
      container.appendChild(table);

      await waitForRender();

      table.remove();

      expect(container.querySelector("ea-table")).toBeNull();
    });

    it("动态修改 stripe 应该生效", async () => {
      const table = document.createElement("ea-table");
      container.appendChild(table);

      await waitForRender();

      const containerEl = table.shadowRoot.querySelector(".ea-table");
      expect(containerEl.classList.contains("is-stripe")).toBe(false);

      table.stripe = true;
      await waitForRender();

      expect(containerEl.classList.contains("is-stripe")).toBe(true);
    });

    it("动态修改 border 应该生效", async () => {
      const table = document.createElement("ea-table");
      container.appendChild(table);

      await waitForRender();

      const containerEl = table.shadowRoot.querySelector(".ea-table");
      expect(containerEl.classList.contains("is-border")).toBe(false);

      table.border = true;
      await waitForRender();

      expect(containerEl.classList.contains("is-border")).toBe(true);
    });

    it("动态修改 height 应该生效", async () => {
      const table = document.createElement("ea-table");
      container.appendChild(table);

      await waitForRender();

      table.height = "300px";
      await waitForRender();

      expect(table.height).toBe("300px");
    });

    it("动态添加 column 应该生效", async () => {
      const table = createTableWithColumns(`
        <ea-table-column label="ID" prop="id"></ea-table-column>
      `);
      container.appendChild(table);

      await waitForRender(200);

      table.setData(testData);

      await waitForRender(200);

      let ths = table.shadowRoot.querySelectorAll("thead .ea-table__th");
      expect(ths.length).toBe(1);

      const newColumn = document.createElement("ea-table-column");
      newColumn.label = "Name";
      newColumn.prop = "name";
      table.appendChild(newColumn);

      await waitForRender(200);

      ths = table.shadowRoot.querySelectorAll("thead .ea-table__th");
      expect(ths.length).toBe(2);
    });
  });

  describe("BEM Class Names", () => {
    it("默认容器应该有 ea-table class", () => {
      const table = document.createElement("ea-table");
      container.appendChild(table);

      const containerEl = table.shadowRoot.querySelector(".ea-table");
      expect(containerEl).toBeTruthy();
      expect(containerEl.classList.contains("ea-table")).toBe(true);
    });

    it("stripe 应该添加 is-stripe 状态 class", async () => {
      const table = document.createElement("ea-table");
      table.stripe = true;
      container.appendChild(table);

      await waitForRender();

      const containerEl = table.shadowRoot.querySelector(".ea-table");
      expect(containerEl.classList.contains("is-stripe")).toBe(true);
    });

    it("border 应该添加 is-border 状态 class", async () => {
      const table = document.createElement("ea-table");
      table.border = true;
      container.appendChild(table);

      await waitForRender();

      const containerEl = table.shadowRoot.querySelector(".ea-table");
      expect(containerEl.classList.contains("is-border")).toBe(true);
    });
  });

  describe("EaTableColumn getColumnTree", () => {
    it("getColumnTree 应该返回正确的列配置", async () => {
      const column = document.createElement("ea-table-column");
      column.label = "ID";
      column.prop = "id";
      column.width = "180px";
      column.align = "center";
      column.sortable = true;
      container.appendChild(column);

      await waitForRender();

      const tree = column.getColumnTree;
      expect(tree).toBeDefined();
      expect(tree.label).toBe("ID");
      expect(tree.prop).toBe("id");
      expect(tree.width).toBe("180px");
      expect(tree.align).toBe("center");
      expect(tree.sortable).toBe(true);
    });

    it("getColumnTree 的 colspan 默认应该为 1", async () => {
      const column = document.createElement("ea-table-column");
      column.label = "ID";
      column.prop = "id";
      container.appendChild(column);

      await waitForRender();

      const tree = column.getColumnTree;
      expect(tree.colspan).toBe(1);
    });

    it("getColumnTree 的 rowspan 应该基于深度计算", async () => {
      const table = createTableWithColumns(`
        <ea-table-column label="ID" prop="id"></ea-table-column>
      `);
      container.appendChild(table);

      await waitForRender(200);

      const column = table.querySelector("ea-table-column");
      const tree = column.getColumnTree;
      expect(tree.rowspan).toBeGreaterThanOrEqual(1);
    });
  });

  describe("Empty State", () => {
    it("没有数据时应该显示空状态", async () => {
      const table = createTableWithColumns(`
        <ea-table-column label="ID" prop="id"></ea-table-column>
      `);
      container.appendChild(table);

      await waitForRender(200);

      table.setData([]);

      await waitForRender(200);

      const emptySlot = table.shadowRoot.querySelector(".ea-table__empty");
      expect(emptySlot).toBeTruthy();
      expect(emptySlot.classList.contains("is-data")).toBe(false);
    });

    it("有数据时空状态应该有 is-data class", async () => {
      const table = createTableWithColumns(`
        <ea-table-column label="ID" prop="id"></ea-table-column>
      `);
      container.appendChild(table);

      await waitForRender(200);

      table.setData(testData);

      await waitForRender(200);

      const emptySlot = table.shadowRoot.querySelector(".ea-table__empty");
      expect(emptySlot).toBeTruthy();
      expect(emptySlot.classList.contains("is-data")).toBe(true);
    });
  });
});
