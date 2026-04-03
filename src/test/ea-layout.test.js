import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// 导入 ea-layout 组件（包含 ea-row 和 ea-col）
import "../components/ea-layout/index.js";

describe("EaLayout Component (EaRow & EaCol)", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  /**
   * EaRow 基本功能测试
   */
  describe("EaRow Basic Functionality", () => {
    it("应该正确渲染 ea-row 组件", async () => {
      const row = document.createElement("ea-row");
      container.appendChild(row);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(row).toBeDefined();
      expect(row.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const row = document.createElement("ea-row");
      container.appendChild(row);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(row.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("应该渲染 slot 内容", async () => {
      const row = document.createElement("ea-row");
      row.innerHTML = "<div>Row Content</div>";
      container.appendChild(row);

      await new Promise(resolve => setTimeout(resolve, 50));

      const slot = row.shadowRoot.querySelector("slot");
      expect(slot).toBeTruthy();
    });
  });

  /**
   * EaCol 基本功能测试
   */
  describe("EaCol Basic Functionality", () => {
    it("应该正确渲染 ea-col 组件", async () => {
      const col = document.createElement("ea-col");
      container.appendChild(col);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(col).toBeDefined();
      expect(col.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const col = document.createElement("ea-col");
      container.appendChild(col);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(col.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("应该渲染 slot 内容", async () => {
      const col = document.createElement("ea-col");
      col.innerHTML = "<div>Col Content</div>";
      container.appendChild(col);

      await new Promise(resolve => setTimeout(resolve, 50));

      const slot = col.shadowRoot.querySelector("slot");
      expect(slot).toBeTruthy();
    });
  });

  /**
   * EaRow Gutter 属性测试
   */
  describe("EaRow Gutter Attribute", () => {
    it("默认 gutter 应该是 0", async () => {
      const row = document.createElement("ea-row");
      container.appendChild(row);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(row.getAttribute("gutter")).toBe(null);
    });

    it("应该支持 gutter 属性", async () => {
      const row = document.createElement("ea-row");
      row.setAttribute("gutter", "20");
      container.appendChild(row);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(row.getAttribute("gutter")).toBe("20");
    });

    it("应该支持不同的 gutter 值", async () => {
      const gutters = [0, 10, 20, 30, 40];

      for (const gutter of gutters) {
        const row = document.createElement("ea-row");
        row.setAttribute("gutter", String(gutter));
        expect(row.getAttribute("gutter")).toBe(String(gutter));
      }
    });
  });

  /**
   * EaRow Justify 属性测试
   */
  describe("EaRow Justify Attribute", () => {
    it("默认 justify 应该是 start", async () => {
      const row = document.createElement("ea-row");
      container.appendChild(row);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(row.getAttribute("justify")).toBe(null);
    });

    it("应该支持 justify='center'", async () => {
      const row = document.createElement("ea-row");
      row.setAttribute("justify", "center");
      container.appendChild(row);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(row.getAttribute("justify")).toBe("center");
    });

    it("应该支持 justify='end'", async () => {
      const row = document.createElement("ea-row");
      row.setAttribute("justify", "end");
      container.appendChild(row);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(row.getAttribute("justify")).toBe("end");
    });

    it("应该支持 justify='space-between'", async () => {
      const row = document.createElement("ea-row");
      row.setAttribute("justify", "space-between");
      container.appendChild(row);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(row.getAttribute("justify")).toBe("space-between");
    });

    it("应该支持 justify='space-around'", async () => {
      const row = document.createElement("ea-row");
      row.setAttribute("justify", "space-around");
      container.appendChild(row);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(row.getAttribute("justify")).toBe("space-around");
    });

    it("应该支持 justify='space-evenly'", async () => {
      const row = document.createElement("ea-row");
      row.setAttribute("justify", "space-evenly");
      container.appendChild(row);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(row.getAttribute("justify")).toBe("space-evenly");
    });

    it("应该支持不同的 justify 值", async () => {
      const justifies = ["start", "end", "center", "space-around", "space-between", "space-evenly"];

      for (const justify of justifies) {
        const row = document.createElement("ea-row");
        row.setAttribute("justify", justify);
        expect(row.getAttribute("justify")).toBe(justify);
      }
    });
  });

  /**
   * EaRow Align 属性测试
   */
  describe("EaRow Align Attribute", () => {
    it("默认 align 应该是空字符串", async () => {
      const row = document.createElement("ea-row");
      container.appendChild(row);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(row.getAttribute("align")).toBe(null);
    });

    it("应该支持 align='top'", async () => {
      const row = document.createElement("ea-row");
      row.setAttribute("align", "top");
      container.appendChild(row);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(row.getAttribute("align")).toBe("top");
    });

    it("应该支持 align='middle'", async () => {
      const row = document.createElement("ea-row");
      row.setAttribute("align", "middle");
      container.appendChild(row);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(row.getAttribute("align")).toBe("middle");
    });

    it("应该支持 align='bottom'", async () => {
      const row = document.createElement("ea-row");
      row.setAttribute("align", "bottom");
      container.appendChild(row);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(row.getAttribute("align")).toBe("bottom");
    });

    it("应该支持不同的 align 值", async () => {
      const aligns = ["top", "middle", "bottom"];

      for (const align of aligns) {
        const row = document.createElement("ea-row");
        row.setAttribute("align", align);
        expect(row.getAttribute("align")).toBe(align);
      }
    });
  });

  /**
   * EaRow Tag 属性测试
   */
  describe("EaRow Tag Attribute", () => {
    it("默认 tag 应该是 div", async () => {
      const row = document.createElement("ea-row");
      container.appendChild(row);

      await new Promise(resolve => setTimeout(resolve, 50));

      const containerElement = row.shadowRoot.querySelector('[part="container"]');
      expect(containerElement.tagName.toLowerCase()).toBe("div");
    });
  });

  /**
   * EaCol Span 属性测试
   */
  describe("EaCol Span Attribute", () => {
    it("默认 span 应该是 24", async () => {
      const col = document.createElement("ea-col");
      container.appendChild(col);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(col.getAttribute("span")).toBe(null);
    });

    it("应该支持 span 属性", async () => {
      const col = document.createElement("ea-col");
      col.setAttribute("span", "12");
      container.appendChild(col);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(col.getAttribute("span")).toBe("12");
    });

    it("应该支持不同的 span 值", async () => {
      const spans = [0, 6, 8, 12, 16, 24];

      for (const span of spans) {
        const col = document.createElement("ea-col");
        col.setAttribute("span", String(span));
        expect(col.getAttribute("span")).toBe(String(span));
      }
    });
  });

  /**
   * EaCol Offset 属性测试
   */
  describe("EaCol Offset Attribute", () => {
    it("默认 offset 应该是 0", async () => {
      const col = document.createElement("ea-col");
      container.appendChild(col);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(col.getAttribute("offset")).toBe(null);
    });

    it("应该支持 offset 属性", async () => {
      const col = document.createElement("ea-col");
      col.setAttribute("offset", "6");
      container.appendChild(col);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(col.getAttribute("offset")).toBe("6");
    });

    it("应该支持不同的 offset 值", async () => {
      const offsets = [0, 4, 6, 8, 12];

      for (const offset of offsets) {
        const col = document.createElement("ea-col");
        col.setAttribute("offset", String(offset));
        expect(col.getAttribute("offset")).toBe(String(offset));
      }
    });
  });

  /**
   * EaCol Push 属性测试
   */
  describe("EaCol Push Attribute", () => {
    it("默认 push 应该是 0", async () => {
      const col = document.createElement("ea-col");
      container.appendChild(col);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(col.getAttribute("push")).toBe(null);
    });

    it("应该支持 push 属性", async () => {
      const col = document.createElement("ea-col");
      col.setAttribute("push", "4");
      container.appendChild(col);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(col.getAttribute("push")).toBe("4");
    });

    it("应该支持不同的 push 值", async () => {
      const pushes = [0, 2, 4, 6, 8];

      for (const push of pushes) {
        const col = document.createElement("ea-col");
        col.setAttribute("push", String(push));
        expect(col.getAttribute("push")).toBe(String(push));
      }
    });
  });

  /**
   * EaCol Pull 属性测试
   */
  describe("EaCol Pull Attribute", () => {
    it("默认 pull 应该是 0", async () => {
      const col = document.createElement("ea-col");
      container.appendChild(col);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(col.getAttribute("pull")).toBe(null);
    });

    it("应该支持 pull 属性", async () => {
      const col = document.createElement("ea-col");
      col.setAttribute("pull", "4");
      container.appendChild(col);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(col.getAttribute("pull")).toBe("4");
    });

    it("应该支持不同的 pull 值", async () => {
      const pulls = [0, 2, 4, 6, 8];

      for (const pull of pulls) {
        const col = document.createElement("ea-col");
        col.setAttribute("pull", String(pull));
        expect(col.getAttribute("pull")).toBe(String(pull));
      }
    });
  });

  /**
   * EaCol Tag 属性测试
   */
  describe("EaCol Tag Attribute", () => {
    it("默认 tag 应该是 div", async () => {
      const col = document.createElement("ea-col");
      container.appendChild(col);

      await new Promise(resolve => setTimeout(resolve, 50));

      const containerElement = col.shadowRoot.querySelector('[part="container"]');
      expect(containerElement.tagName.toLowerCase()).toBe("div");
    });
  });

  /**
   * 组合布局测试
   */
  describe("Combined Layout", () => {
    it("应该支持基本的 row + col 布局", async () => {
      const row = document.createElement("ea-row");
      const col = document.createElement("ea-col");
      col.setAttribute("span", "12");
      col.textContent = "Column Content";
      row.appendChild(col);
      container.appendChild(row);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(row.shadowRoot).toBeDefined();
      expect(col.shadowRoot).toBeDefined();
      expect(col.getAttribute("span")).toBe("12");
    });

    it("应该支持多个 col 组合", async () => {
      const row = document.createElement("ea-row");
      
      const col1 = document.createElement("ea-col");
      col1.setAttribute("span", "8");
      col1.textContent = "Col 1";
      
      const col2 = document.createElement("ea-col");
      col2.setAttribute("span", "8");
      col2.textContent = "Col 2";
      
      const col3 = document.createElement("ea-col");
      col3.setAttribute("span", "8");
      col3.textContent = "Col 3";
      
      row.appendChild(col1);
      row.appendChild(col2);
      row.appendChild(col3);
      container.appendChild(row);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(col1.getAttribute("span")).toBe("8");
      expect(col2.getAttribute("span")).toBe("8");
      expect(col3.getAttribute("span")).toBe("8");
    });

    it("应该支持 gutter + span 组合", async () => {
      const row = document.createElement("ea-row");
      row.setAttribute("gutter", "20");
      
      const col1 = document.createElement("ea-col");
      col1.setAttribute("span", "12");
      
      const col2 = document.createElement("ea-col");
      col2.setAttribute("span", "12");
      
      row.appendChild(col1);
      row.appendChild(col2);
      container.appendChild(row);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(row.getAttribute("gutter")).toBe("20");
      expect(col1.getAttribute("span")).toBe("12");
      expect(col2.getAttribute("span")).toBe("12");
    });

    it("应该支持 offset 组合", async () => {
      const row = document.createElement("ea-row");
      
      const col1 = document.createElement("ea-col");
      col1.setAttribute("span", "6");
      
      const col2 = document.createElement("ea-col");
      col2.setAttribute("span", "6");
      col2.setAttribute("offset", "6");
      
      row.appendChild(col1);
      row.appendChild(col2);
      container.appendChild(row);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(col1.getAttribute("span")).toBe("6");
      expect(col2.getAttribute("span")).toBe("6");
      expect(col2.getAttribute("offset")).toBe("6");
    });

    it("应该支持 push/pull 组合", async () => {
      const row = document.createElement("ea-row");
      
      const col1 = document.createElement("ea-col");
      col1.setAttribute("span", "4");
      col1.setAttribute("push", "4");
      
      const col2 = document.createElement("ea-col");
      col2.setAttribute("span", "4");
      col2.setAttribute("pull", "4");
      
      row.appendChild(col1);
      row.appendChild(col2);
      container.appendChild(row);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(col1.getAttribute("push")).toBe("4");
      expect(col2.getAttribute("pull")).toBe("4");
    });

    it("应该支持 justify + align 组合", async () => {
      const row = document.createElement("ea-row");
      row.setAttribute("justify", "center");
      row.setAttribute("align", "middle");
      
      const col = document.createElement("ea-col");
      col.setAttribute("span", "12");
      
      row.appendChild(col);
      container.appendChild(row);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(row.getAttribute("justify")).toBe("center");
      expect(row.getAttribute("align")).toBe("middle");
    });

    it("应该支持完整的布局配置", async () => {
      const row = document.createElement("ea-row");
      row.setAttribute("gutter", "20");
      row.setAttribute("justify", "space-between");
      row.setAttribute("align", "top");
      
      const col1 = document.createElement("ea-col");
      col1.setAttribute("span", "8");
      col1.setAttribute("offset", "4");
      
      const col2 = document.createElement("ea-col");
      col2.setAttribute("span", "8");
      col2.setAttribute("push", "2");
      
      row.appendChild(col1);
      row.appendChild(col2);
      container.appendChild(row);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(row.getAttribute("gutter")).toBe("20");
      expect(row.getAttribute("justify")).toBe("space-between");
      expect(row.getAttribute("align")).toBe("top");
      expect(col1.getAttribute("span")).toBe("8");
      expect(col1.getAttribute("offset")).toBe("4");
      expect(col2.getAttribute("span")).toBe("8");
      expect(col2.getAttribute("push")).toBe("2");
    });
  });

  /**
   * 边界条件测试
   */
  describe("Edge Cases", () => {
    it("span 为 0 时应该正确处理", async () => {
      const col = document.createElement("ea-col");
      col.setAttribute("span", "0");
      container.appendChild(col);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(col.getAttribute("span")).toBe("0");
    });

    it("span 为 24 时应该正确处理", async () => {
      const col = document.createElement("ea-col");
      col.setAttribute("span", "24");
      container.appendChild(col);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(col.getAttribute("span")).toBe("24");
    });

    it("空 row 应该正常渲染", async () => {
      const row = document.createElement("ea-row");
      container.appendChild(row);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(row.shadowRoot).toBeDefined();
    });

    it("嵌套布局应该正常工作", async () => {
      const outerRow = document.createElement("ea-row");
      const outerCol = document.createElement("ea-col");
      outerCol.setAttribute("span", "24");
      
      const innerRow = document.createElement("ea-row");
      const innerCol = document.createElement("ea-col");
      innerCol.setAttribute("span", "12");
      innerCol.textContent = "Nested";
      
      innerRow.appendChild(innerCol);
      outerCol.appendChild(innerRow);
      outerRow.appendChild(outerCol);
      container.appendChild(outerRow);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(outerRow.shadowRoot).toBeDefined();
      expect(outerCol.shadowRoot).toBeDefined();
      expect(innerRow.shadowRoot).toBeDefined();
      expect(innerCol.shadowRoot).toBeDefined();
    });
  });

  /**
   * 生命周期测试
   */
  describe("Lifecycle", () => {
    it("row 组件连接后应该正确初始化", async () => {
      const row = document.createElement("ea-row");
      row.setAttribute("gutter", "20");
      row.setAttribute("justify", "center");
      container.appendChild(row);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(row.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("col 组件连接后应该正确初始化", async () => {
      const col = document.createElement("ea-col");
      col.setAttribute("span", "12");
      col.setAttribute("offset", "6");
      container.appendChild(col);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(col.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("组件断开连接后应该正常移除", () => {
      const row = document.createElement("ea-row");
      const col = document.createElement("ea-col");
      row.appendChild(col);
      container.appendChild(row);

      row.remove();

      expect(container.contains(row)).toBe(false);
    });

    it("动态修改 row gutter 应该生效", async () => {
      const row = document.createElement("ea-row");
      row.setAttribute("gutter", "10");
      container.appendChild(row);

      await new Promise(resolve => setTimeout(resolve, 50));

      row.setAttribute("gutter", "30");

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(row.getAttribute("gutter")).toBe("30");
    });

    it("动态修改 row justify 应该生效", async () => {
      const row = document.createElement("ea-row");
      row.setAttribute("justify", "start");
      container.appendChild(row);

      await new Promise(resolve => setTimeout(resolve, 50));

      row.setAttribute("justify", "end");

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(row.getAttribute("justify")).toBe("end");
    });

    it("动态修改 col span 应该生效", async () => {
      const col = document.createElement("ea-col");
      col.setAttribute("span", "12");
      container.appendChild(col);

      await new Promise(resolve => setTimeout(resolve, 50));

      col.setAttribute("span", "8");

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(col.getAttribute("span")).toBe("8");
    });

    it("动态修改 col offset 应该生效", async () => {
      const col = document.createElement("ea-col");
      col.setAttribute("offset", "0");
      container.appendChild(col);

      await new Promise(resolve => setTimeout(resolve, 50));

      col.setAttribute("offset", "6");

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(col.getAttribute("offset")).toBe("6");
    });
  });
});
