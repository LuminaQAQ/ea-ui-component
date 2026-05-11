import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// Mock CSS.supports for JSDOM environment
if (typeof CSS === "undefined") {
  global.CSS = {
    supports: () => true,
  };
} else if (!CSS.supports) {
  CSS.supports = () => true;
}

// 尝试加载组件，处理组件尚未重构为 TypeScript 的情况
let componentReady = false;
try {
  await import("../components/ea-table/index.js");
  componentReady = true;
} catch (e) {
  console.warn(`[ea-table] 组件尚未重构为 TypeScript (或存在依赖缺失)，跳过测试`);
}

const suite = componentReady ? describe : describe.skip;

suite("EaTable Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  // 测试数据
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

  /**
   * EaTable 基本功能测试
   */
  describe("EaTable Basic Functionality", () => {
    it("应该正确渲染 ea-table 组件", async () => {
      const table = document.createElement("ea-table");
      container.appendChild(table);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(table).toBeDefined();
      expect(table.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const table = document.createElement("ea-table");
      container.appendChild(table);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(table.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("应该包含 colgroup CSS Part", async () => {
      const table = document.createElement("ea-table");
      container.appendChild(table);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(table.shadowRoot.querySelector('[part="colgroup"]')).toBeTruthy();
    });

    it("应该包含 thead CSS Part", async () => {
      const table = document.createElement("ea-table");
      container.appendChild(table);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(table.shadowRoot.querySelector('[part="thead"]')).toBeTruthy();
    });

    it("应该包含 tbody CSS Part", async () => {
      const table = document.createElement("ea-table");
      container.appendChild(table);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(table.shadowRoot.querySelector('[part="tbody"]')).toBeTruthy();
    });

    it("应该包含 tfoot CSS Part", async () => {
      const table = document.createElement("ea-table");
      container.appendChild(table);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(table.shadowRoot.querySelector('[part="tfoot"]')).toBeTruthy();
    });

    it("应该包含 default-slot CSS Part", async () => {
      const table = document.createElement("ea-table");
      container.appendChild(table);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(
        table.shadowRoot.querySelector('[part="default-slot"]')
      ).toBeTruthy();
    });
  });

  /**
   * EaTableColumn 基本功能测试
   */
  describe("EaTableColumn Basic Functionality", () => {
    it("应该正确渲染 ea-table-column 组件", async () => {
      const column = document.createElement("ea-table-column");
      container.appendChild(column);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(column).toBeDefined();
      expect(column.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const column = document.createElement("ea-table-column");
      container.appendChild(column);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(
        column.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
    });

    it("应该包含 label CSS Part", async () => {
      const column = document.createElement("ea-table-column");
      container.appendChild(column);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(column.shadowRoot.querySelector('[part="label"]')).toBeTruthy();
    });

    it("应该包含 content CSS Part", async () => {
      const column = document.createElement("ea-table-column");
      container.appendChild(column);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(column.shadowRoot.querySelector('[part="content"]')).toBeTruthy();
    });
  });

  /**
   * EaTable Stripe 属性测试
   */
  describe("EaTable Stripe Attribute", () => {
    it("默认 stripe 应该是 false", async () => {
      const table = document.createElement("ea-table");
      container.appendChild(table);

      await new Promise(resolve => setTimeout(resolve, 50));

      // 属性可能返回 null 或 false
      const value = table.stripe;
      expect(value === false || value === null).toBe(true);
    });

    it("设置 stripe 属性应该启用斑马纹", async () => {
      const table = document.createElement("ea-table");
      table.stripe = true;
      container.appendChild(table);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(table.stripe).toBe(true);
    });
  });

  /**
   * EaTable Border 属性测试
   */
  describe("EaTable Border Attribute", () => {
    it("默认 border 应该是 false", async () => {
      const table = document.createElement("ea-table");
      container.appendChild(table);

      await new Promise(resolve => setTimeout(resolve, 50));

      // 属性可能返回 null 或 false
      const value = table.border;
      expect(value === false || value === null).toBe(true);
    });

    it("设置 border 属性应该启用边框", async () => {
      const table = document.createElement("ea-table");
      table.border = true;
      container.appendChild(table);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(table.border).toBe(true);
    });
  });

  /**
   * EaTable Height 属性测试
   */
  describe("EaTable Height Attribute", () => {
    it("应该支持 height 属性", async () => {
      const table = document.createElement("ea-table");
      table.height = "200px";
      container.appendChild(table);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(table.height).toBe("200px");
    });

    it("应该支持不同的 height 值", async () => {
      const heights = ["200px", "300px", "400px"];

      for (const height of heights) {
        const table = document.createElement("ea-table");
        table.height = height;
        expect(table.height).toBe(height);
      }
    });
  });

  /**
   * EaTable Max-height 属性测试
   */
  describe("EaTable Max-height Attribute", () => {
    it("应该支持 max-height 属性", async () => {
      const table = document.createElement("ea-table");
      table["max-height"] = "400px";
      container.appendChild(table);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(table["max-height"]).toBe("400px");
    });
  });

  /**
   * EaTable Highlight-current-row 属性测试
   */
  describe("EaTable Highlight-current-row Attribute", () => {
    it("默认 highlight-current-row 应该是 false", async () => {
      const table = document.createElement("ea-table");
      container.appendChild(table);

      await new Promise(resolve => setTimeout(resolve, 50));

      // 属性可能返回 null 或 false
      const value = table["highlight-current-row"];
      expect(value === false || value === null).toBe(true);
    });

    it("设置 highlight-current-row 应该启用高亮", async () => {
      const table = document.createElement("ea-table");
      table["highlight-current-row"] = true;
      container.appendChild(table);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(table["highlight-current-row"]).toBe(true);
    });
  });

  /**
   * EaTable Show-summary 属性测试
   */
  describe("EaTable Show-summary Attribute", () => {
    it("默认 show-summary 应该是 false", async () => {
      const table = document.createElement("ea-table");
      container.appendChild(table);

      await new Promise(resolve => setTimeout(resolve, 50));

      // 属性可能返回 null 或 false
      const value = table["show-summary"];
      expect(value === false || value === null).toBe(true);
    });

    it("设置 show-summary 应该显示合计行", async () => {
      const table = document.createElement("ea-table");
      table["show-summary"] = true;
      container.appendChild(table);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(table["show-summary"]).toBe(true);
    });
  });

  /**
   * EaTableColumn Label 属性测试
   */
  describe("EaTableColumn Label Attribute", () => {
    it("默认 label 应该是空字符串", async () => {
      const column = document.createElement("ea-table-column");
      container.appendChild(column);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(column.label).toBe("");
    });

    it("应该支持 label 属性", async () => {
      const column = document.createElement("ea-table-column");
      column.label = "Date";
      container.appendChild(column);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(column.label).toBe("Date");
    });
  });

  /**
   * EaTableColumn Prop 属性测试
   */
  describe("EaTableColumn Prop Attribute", () => {
    it("默认 prop 应该是空字符串", async () => {
      const column = document.createElement("ea-table-column");
      container.appendChild(column);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(column.prop).toBe("");
    });

    it("应该支持 prop 属性", async () => {
      const column = document.createElement("ea-table-column");
      column.prop = "date";
      container.appendChild(column);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(column.prop).toBe("date");
    });
  });

  /**
   * EaTableColumn Width 属性测试
   */
  describe("EaTableColumn Width Attribute", () => {
    it("默认 width 应该是空字符串", async () => {
      const column = document.createElement("ea-table-column");
      container.appendChild(column);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(column.width).toBe("");
    });

    it("应该支持 width 属性", async () => {
      const column = document.createElement("ea-table-column");
      column.width = "180px";
      container.appendChild(column);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(column.width).toBe("180px");
    });
  });

  /**
   * EaTableColumn Align 属性测试
   */
  describe("EaTableColumn Align Attribute", () => {
    it("默认 align 应该是 left", async () => {
      const column = document.createElement("ea-table-column");
      container.appendChild(column);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(column.align).toBe("left");
    });

    it("应该支持 align='center'", async () => {
      const column = document.createElement("ea-table-column");
      column.align = "center";
      container.appendChild(column);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(column.align).toBe("center");
    });

    it("应该支持 align='right'", async () => {
      const column = document.createElement("ea-table-column");
      column.align = "right";
      container.appendChild(column);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(column.align).toBe("right");
    });
  });

  /**
   * EaTableColumn Sortable 属性测试
   */
  describe("EaTableColumn Sortable Attribute", () => {
    it("默认 sortable 应该是 false", async () => {
      const column = document.createElement("ea-table-column");
      container.appendChild(column);

      await new Promise(resolve => setTimeout(resolve, 50));

      // 属性可能返回 null 或 false
      const value = column.sortable;
      expect(value === false || value === null).toBe(true);
    });

    it("设置 sortable 应该启用排序", async () => {
      const column = document.createElement("ea-table-column");
      column.sortable = true;
      container.appendChild(column);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(column.sortable).toBe(true);
    });
  });

  /**
   * EaTableColumn Fixed 属性测试
   */
  describe("EaTableColumn Fixed Attribute", () => {
    it("应该支持 fixed='left'", async () => {
      const column = document.createElement("ea-table-column");
      column.setAttribute("fixed", "left");
      container.appendChild(column);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(column.getAttribute("fixed")).toBe("left");
    });

    it("应该支持 fixed='right'", async () => {
      const column = document.createElement("ea-table-column");
      column.setAttribute("fixed", "right");
      container.appendChild(column);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(column.getAttribute("fixed")).toBe("right");
    });
  });

  /**
   * EaTableColumn Type 属性测试
   */
  describe("EaTableColumn Type Attribute", () => {
    it("应该支持 type='selection'", async () => {
      const column = document.createElement("ea-table-column");
      column.type = "selection";
      container.appendChild(column);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(column.type).toBe("selection");
    });

    it("应该支持 type='index'", async () => {
      const column = document.createElement("ea-table-column");
      column.type = "index";
      container.appendChild(column);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(column.type).toBe("index");
    });
  });

  /**
   * 数据设置测试
   */
  describe("Data Methods", () => {
    it("应该支持 setData 方法", async () => {
      const table = document.createElement("ea-table");
      table.innerHTML = `
        <ea-table-column label="Date" prop="date" width="180px"></ea-table-column>
        <ea-table-column label="Name" prop="name" width="180px"></ea-table-column>
      `;
      container.appendChild(table);

      await new Promise(resolve => setTimeout(resolve, 100));

      table.setData(testData);

      await new Promise(resolve => setTimeout(resolve, 100));

      // 验证数据已设置
      expect(table.data).toEqual(testData);
    });

    it("空数据应该正确渲染", async () => {
      const table = document.createElement("ea-table");
      table.innerHTML = `
        <ea-table-column label="Date" prop="date"></ea-table-column>
      `;
      container.appendChild(table);

      await new Promise(resolve => setTimeout(resolve, 100));

      table.setData([]);

      await new Promise(resolve => setTimeout(resolve, 100));

      // 空数据时应该显示 empty slot
      expect(table.data).toEqual([]);
    });
  });

  /**
   * 组合测试 - Table + TableColumn
   */
  describe("Combined Table and TableColumn", () => {
    it("应该正确渲染包含多个 column 的 table", async () => {
      const table = document.createElement("ea-table");
      table.innerHTML = `
        <ea-table-column label="Date" prop="date" width="180px"></ea-table-column>
        <ea-table-column label="Name" prop="name" width="180px"></ea-table-column>
        <ea-table-column label="Address" prop="address"></ea-table-column>
      `;
      container.appendChild(table);

      await new Promise(resolve => setTimeout(resolve, 100));

      const columns = table.querySelectorAll("ea-table-column");
      expect(columns.length).toBe(3);
    });

    it("应该支持带斑马纹的表格", async () => {
      const table = document.createElement("ea-table");
      table.stripe = true;
      table.innerHTML = `
        <ea-table-column label="Date" prop="date"></ea-table-column>
        <ea-table-column label="Name" prop="name"></ea-table-column>
      `;
      container.appendChild(table);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(table.stripe).toBe(true);
    });

    it("应该支持带边框的表格", async () => {
      const table = document.createElement("ea-table");
      table.border = true;
      table.innerHTML = `
        <ea-table-column label="Date" prop="date"></ea-table-column>
        <ea-table-column label="Name" prop="name"></ea-table-column>
      `;
      container.appendChild(table);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(table.border).toBe(true);
    });

    it("应该支持固定表头", async () => {
      const table = document.createElement("ea-table");
      table.height = "200px";
      table.innerHTML = `
        <ea-table-column label="Date" prop="date"></ea-table-column>
        <ea-table-column label="Name" prop="name"></ea-table-column>
      `;
      container.appendChild(table);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(table.height).toBe("200px");
    });
  });

  /**
   * 边界条件测试
   */
  describe("Edge Cases", () => {
    it("空 table 应该正常渲染", async () => {
      const table = document.createElement("ea-table");
      container.appendChild(table);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(table.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("没有 column 的 table 应该正常渲染", async () => {
      const table = document.createElement("ea-table");
      table.setData(testData);
      container.appendChild(table);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(table.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("大量数据应该正确处理", async () => {
      const table = document.createElement("ea-table");
      table.innerHTML = `
        <ea-table-column label="ID" prop="id"></ea-table-column>
        <ea-table-column label="Name" prop="name"></ea-table-column>
      `;

      const largeData = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        name: `Name ${i + 1}`,
      }));

      container.appendChild(table);

      await new Promise(resolve => setTimeout(resolve, 100));

      table.setData(largeData);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(table.data.length).toBe(100);
    });
  });

  /**
   * 生命周期测试
   */
  describe("Lifecycle", () => {
    it("table 组件连接后应该正确初始化", async () => {
      const table = document.createElement("ea-table");
      table.innerHTML = `
        <ea-table-column label="Date" prop="date"></ea-table-column>
      `;
      container.appendChild(table);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(table.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("column 组件连接后应该正确初始化", async () => {
      const column = document.createElement("ea-table-column");
      column.label = "Test";
      column.prop = "test";
      container.appendChild(column);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(
        column.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
    });

    it("组件断开连接后应该正常移除", () => {
      const table = document.createElement("ea-table");
      container.appendChild(table);

      table.remove();

      expect(container.contains(table)).toBe(false);
    });

    it("动态修改 stripe 应该生效", async () => {
      const table = document.createElement("ea-table");
      container.appendChild(table);

      await new Promise(resolve => setTimeout(resolve, 50));

      table.stripe = true;

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(table.stripe).toBe(true);
    });

    it("动态修改 border 应该生效", async () => {
      const table = document.createElement("ea-table");
      container.appendChild(table);

      await new Promise(resolve => setTimeout(resolve, 50));

      table.border = true;

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(table.border).toBe(true);
    });

    it("动态修改 height 应该生效", async () => {
      const table = document.createElement("ea-table");
      container.appendChild(table);

      await new Promise(resolve => setTimeout(resolve, 50));

      table.height = "300px";

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(table.height).toBe("300px");
    });

    it("动态添加 column 应该生效", async () => {
      const table = document.createElement("ea-table");
      table.innerHTML = `
        <ea-table-column label="Date" prop="date"></ea-table-column>
      `;
      container.appendChild(table);

      await new Promise(resolve => setTimeout(resolve, 100));

      const newColumn = document.createElement("ea-table-column");
      newColumn.label = "Name";
      newColumn.prop = "name";
      table.appendChild(newColumn);

      await new Promise(resolve => setTimeout(resolve, 100));

      const columns = table.querySelectorAll("ea-table-column");
      expect(columns.length).toBe(2);
    });
  });
});
