import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender.js";

import "../components/ea-layout/index.ts";

describe("EaLayout Component (EaRow & EaCol)", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe("EaRow Basic Functionality", () => {
    it("应该正确渲染 ea-row 组件", async () => {
      const row = document.createElement("ea-row");
      container.appendChild(row);

      await waitForRender();

      expect(row).toBeDefined();
      expect(row.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const row = document.createElement("ea-row");
      container.appendChild(row);

      await waitForRender();

      expect(row.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("应该渲染 slot 内容", async () => {
      const row = document.createElement("ea-row");
      row.innerHTML = "<div>Row Content</div>";
      container.appendChild(row);

      await waitForRender();

      const slot = row.shadowRoot.querySelector("slot");
      expect(slot).toBeTruthy();
    });

    it("容器应该包含 BEM 类名 ea-row", async () => {
      const row = document.createElement("ea-row");
      container.appendChild(row);

      await waitForRender();

      const containerEl = row.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-row")).toBe(true);
    });
  });

  describe("EaCol Basic Functionality", () => {
    it("应该正确渲染 ea-col 组件", async () => {
      const col = document.createElement("ea-col");
      container.appendChild(col);

      await waitForRender();

      expect(col).toBeDefined();
      expect(col.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const col = document.createElement("ea-col");
      container.appendChild(col);

      await waitForRender();

      expect(col.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("应该渲染 slot 内容", async () => {
      const col = document.createElement("ea-col");
      col.innerHTML = "<div>Col Content</div>";
      container.appendChild(col);

      await waitForRender();

      const slot = col.shadowRoot.querySelector("slot");
      expect(slot).toBeTruthy();
    });

    it("容器应该包含 BEM 类名 ea-col", async () => {
      const col = document.createElement("ea-col");
      container.appendChild(col);

      await waitForRender();

      const containerEl = col.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-col")).toBe(true);
    });
  });

  describe("EaRow Gutter Attribute", () => {
    it("默认 gutter 应该是 0", async () => {
      const row = document.createElement("ea-row");
      container.appendChild(row);

      await waitForRender();

      expect(row.gutter).toBe(0);
    });

    it("应该支持 gutter 属性", async () => {
      const row = document.createElement("ea-row");
      row.setAttribute("gutter", "20");
      container.appendChild(row);

      await waitForRender();

      expect(row.gutter).toBe(20);
    });

    it("gutter 变化时应该更新 CSS 变量 --ea-row-gutter", async () => {
      const row = document.createElement("ea-row");
      row.setAttribute("gutter", "20");
      container.appendChild(row);

      await waitForRender();

      expect(row.style.getPropertyValue("--ea-row-gutter")).toBe("10px");
    });

    it("应该支持不同的 gutter 值", async () => {
      const gutters = [0, 10, 20, 30, 40];

      for (const gutter of gutters) {
        const row = document.createElement("ea-row");
        row.setAttribute("gutter", String(gutter));
        container.appendChild(row);
        await waitForRender();
        expect(row.gutter).toBe(gutter);
        row.remove();
      }
    });
  });

  describe("EaRow Justify Attribute", () => {
    it("默认 justify 应该是 start", async () => {
      const row = document.createElement("ea-row");
      container.appendChild(row);

      await waitForRender();

      expect(row.justify).toBe("start");
    });

    it("应该支持 justify='center'", async () => {
      const row = document.createElement("ea-row");
      row.setAttribute("justify", "center");
      container.appendChild(row);

      await waitForRender();

      expect(row.justify).toBe("center");
    });

    it("应该支持 justify='end'", async () => {
      const row = document.createElement("ea-row");
      row.setAttribute("justify", "end");
      container.appendChild(row);

      await waitForRender();

      expect(row.justify).toBe("end");
    });

    it("应该支持 justify='space-between'", async () => {
      const row = document.createElement("ea-row");
      row.setAttribute("justify", "space-between");
      container.appendChild(row);

      await waitForRender();

      expect(row.justify).toBe("space-between");
    });

    it("应该支持 justify='space-around'", async () => {
      const row = document.createElement("ea-row");
      row.setAttribute("justify", "space-around");
      container.appendChild(row);

      await waitForRender();

      expect(row.justify).toBe("space-around");
    });

    it("应该支持 justify='space-evenly'", async () => {
      const row = document.createElement("ea-row");
      row.setAttribute("justify", "space-evenly");
      container.appendChild(row);

      await waitForRender();

      expect(row.justify).toBe("space-evenly");
    });

    it("justify 变化时应该更新 CSS 变量 --ea-row-justify", async () => {
      const row = document.createElement("ea-row");
      row.setAttribute("justify", "center");
      container.appendChild(row);

      await waitForRender();

      expect(row.style.getPropertyValue("--ea-row-justify")).toBe("center");
    });

    it("应该支持不同的 justify 值", async () => {
      const justifies = ["start", "end", "center", "space-around", "space-between", "space-evenly"];

      for (const justify of justifies) {
        const row = document.createElement("ea-row");
        row.setAttribute("justify", justify);
        container.appendChild(row);
        await waitForRender();
        expect(row.justify).toBe(justify);
        row.remove();
      }
    });
  });

  describe("EaRow Align Attribute", () => {
    it("默认 align 应该是 top", async () => {
      const row = document.createElement("ea-row");
      container.appendChild(row);

      await waitForRender();

      expect(row.align).toBe("top");
    });

    it("应该支持 align='middle'", async () => {
      const row = document.createElement("ea-row");
      row.setAttribute("align", "middle");
      container.appendChild(row);

      await waitForRender();

      expect(row.align).toBe("middle");
    });

    it("应该支持 align='bottom'", async () => {
      const row = document.createElement("ea-row");
      row.setAttribute("align", "bottom");
      container.appendChild(row);

      await waitForRender();

      expect(row.align).toBe("bottom");
    });

    it("align 变化时应该更新 CSS 变量 --ea-row-align", async () => {
      const row = document.createElement("ea-row");
      row.setAttribute("align", "middle");
      container.appendChild(row);

      await waitForRender();

      expect(row.style.getPropertyValue("--ea-row-align")).toBe("middle");
    });

    it("应该支持不同的 align 值", async () => {
      const aligns = ["top", "middle", "bottom"];

      for (const align of aligns) {
        const row = document.createElement("ea-row");
        row.setAttribute("align", align);
        container.appendChild(row);
        await waitForRender();
        expect(row.align).toBe(align);
        row.remove();
      }
    });
  });

  describe("EaRow Tag Attribute", () => {
    it("默认 tag 应该是 div", async () => {
      const row = document.createElement("ea-row");
      container.appendChild(row);

      await waitForRender();

      expect(row.tag).toBe("div");
      const containerElement = row.shadowRoot.querySelector('[part="container"]');
      expect(containerElement.tagName.toLowerCase()).toBe("div");
    });

    it("应该支持自定义 tag", async () => {
      const row = document.createElement("ea-row");
      row.setAttribute("tag", "section");
      container.appendChild(row);

      await waitForRender();

      expect(row.tag).toBe("section");
      const containerElement = row.shadowRoot.querySelector('[part="container"]');
      expect(containerElement.tagName.toLowerCase()).toBe("section");
    });
  });

  describe("EaCol Span Attribute", () => {
    it("默认 span 应该是 24", async () => {
      const col = document.createElement("ea-col");
      container.appendChild(col);

      await waitForRender();

      expect(col.span).toBe(24);
    });

    it("应该支持 span 属性", async () => {
      const col = document.createElement("ea-col");
      col.setAttribute("span", "12");
      container.appendChild(col);

      await waitForRender();

      expect(col.span).toBe(12);
    });

    it("span 变化时应该更新 CSS 变量 --ea-col-span", async () => {
      const col = document.createElement("ea-col");
      col.setAttribute("span", "8");
      container.appendChild(col);

      await waitForRender();

      expect(col.style.getPropertyValue("--ea-col-span")).toBe("8");
    });

    it("应该支持不同的 span 值", async () => {
      const spans = [0, 6, 8, 12, 16, 24];

      for (const span of spans) {
        const col = document.createElement("ea-col");
        col.setAttribute("span", String(span));
        container.appendChild(col);
        await waitForRender();
        expect(col.span).toBe(span);
        col.remove();
      }
    });
  });

  describe("EaCol Offset Attribute", () => {
    it("默认 offset 应该是 0", async () => {
      const col = document.createElement("ea-col");
      container.appendChild(col);

      await waitForRender();

      expect(col.offset).toBe(0);
    });

    it("应该支持 offset 属性", async () => {
      const col = document.createElement("ea-col");
      col.setAttribute("offset", "6");
      container.appendChild(col);

      await waitForRender();

      expect(col.offset).toBe(6);
    });

    it("offset 变化时应该更新 CSS 变量 --ea-col-offset", async () => {
      const col = document.createElement("ea-col");
      col.setAttribute("offset", "6");
      container.appendChild(col);

      await waitForRender();

      expect(col.style.getPropertyValue("--ea-col-offset")).toBe("6");
    });

    it("应该支持不同的 offset 值", async () => {
      const offsets = [0, 4, 6, 8, 12];

      for (const offset of offsets) {
        const col = document.createElement("ea-col");
        col.setAttribute("offset", String(offset));
        container.appendChild(col);
        await waitForRender();
        expect(col.offset).toBe(offset);
        col.remove();
      }
    });
  });

  describe("EaCol Push Attribute", () => {
    it("默认 push 应该是 0", async () => {
      const col = document.createElement("ea-col");
      container.appendChild(col);

      await waitForRender();

      expect(col.push).toBe(0);
    });

    it("应该支持 push 属性", async () => {
      const col = document.createElement("ea-col");
      col.setAttribute("push", "4");
      container.appendChild(col);

      await waitForRender();

      expect(col.push).toBe(4);
    });

    it("push 变化时应该更新 CSS 变量 --ea-col-push", async () => {
      const col = document.createElement("ea-col");
      col.setAttribute("push", "4");
      container.appendChild(col);

      await waitForRender();

      expect(col.style.getPropertyValue("--ea-col-push")).toBe("4");
    });

    it("应该支持不同的 push 值", async () => {
      const pushes = [0, 2, 4, 6, 8];

      for (const push of pushes) {
        const col = document.createElement("ea-col");
        col.setAttribute("push", String(push));
        container.appendChild(col);
        await waitForRender();
        expect(col.push).toBe(push);
        col.remove();
      }
    });
  });

  describe("EaCol Pull Attribute", () => {
    it("默认 pull 应该是 0", async () => {
      const col = document.createElement("ea-col");
      container.appendChild(col);

      await waitForRender();

      expect(col.pull).toBe(0);
    });

    it("应该支持 pull 属性", async () => {
      const col = document.createElement("ea-col");
      col.setAttribute("pull", "4");
      container.appendChild(col);

      await waitForRender();

      expect(col.pull).toBe(4);
    });

    it("pull 变化时应该更新 CSS 变量 --ea-col-pull", async () => {
      const col = document.createElement("ea-col");
      col.setAttribute("pull", "4");
      container.appendChild(col);

      await waitForRender();

      expect(col.style.getPropertyValue("--ea-col-pull")).toBe("4");
    });

    it("应该支持不同的 pull 值", async () => {
      const pulls = [0, 2, 4, 6, 8];

      for (const pull of pulls) {
        const col = document.createElement("ea-col");
        col.setAttribute("pull", String(pull));
        container.appendChild(col);
        await waitForRender();
        expect(col.pull).toBe(pull);
        col.remove();
      }
    });
  });

  describe("EaCol Tag Attribute", () => {
    it("默认 tag 应该是 div", async () => {
      const col = document.createElement("ea-col");
      container.appendChild(col);

      await waitForRender();

      expect(col.tag).toBe("div");
      const containerElement = col.shadowRoot.querySelector('[part="container"]');
      expect(containerElement.tagName.toLowerCase()).toBe("div");
    });

    it("应该支持自定义 tag", async () => {
      const col = document.createElement("ea-col");
      col.setAttribute("tag", "article");
      container.appendChild(col);

      await waitForRender();

      expect(col.tag).toBe("article");
      const containerElement = col.shadowRoot.querySelector('[part="container"]');
      expect(containerElement.tagName.toLowerCase()).toBe("article");
    });
  });

  describe("Combined Layout", () => {
    it("应该支持基本的 row + col 布局", async () => {
      const row = document.createElement("ea-row");
      const col = document.createElement("ea-col");
      col.setAttribute("span", "12");
      col.textContent = "Column Content";
      row.appendChild(col);
      container.appendChild(row);

      await waitForRender();

      expect(row.shadowRoot).toBeDefined();
      expect(col.shadowRoot).toBeDefined();
      expect(col.span).toBe(12);
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

      await waitForRender();

      expect(col1.span).toBe(8);
      expect(col2.span).toBe(8);
      expect(col3.span).toBe(8);
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

      await waitForRender();

      expect(row.gutter).toBe(20);
      expect(col1.span).toBe(12);
      expect(col2.span).toBe(12);
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

      await waitForRender();

      expect(col1.span).toBe(6);
      expect(col2.span).toBe(6);
      expect(col2.offset).toBe(6);
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

      await waitForRender();

      expect(col1.push).toBe(4);
      expect(col2.pull).toBe(4);
    });

    it("应该支持 justify + align 组合", async () => {
      const row = document.createElement("ea-row");
      row.setAttribute("justify", "center");
      row.setAttribute("align", "middle");

      const col = document.createElement("ea-col");
      col.setAttribute("span", "12");

      row.appendChild(col);
      container.appendChild(row);

      await waitForRender();

      expect(row.justify).toBe("center");
      expect(row.align).toBe("middle");
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

      await waitForRender();

      expect(row.gutter).toBe(20);
      expect(row.justify).toBe("space-between");
      expect(row.align).toBe("top");
      expect(col1.span).toBe(8);
      expect(col1.offset).toBe(4);
      expect(col2.span).toBe(8);
      expect(col2.push).toBe(2);
    });
  });

  describe("Edge Cases", () => {
    it("span 为 0 时应该正确处理", async () => {
      const col = document.createElement("ea-col");
      col.setAttribute("span", "0");
      container.appendChild(col);

      await waitForRender();

      expect(col.span).toBe(0);
    });

    it("span 为 24 时应该正确处理", async () => {
      const col = document.createElement("ea-col");
      col.setAttribute("span", "24");
      container.appendChild(col);

      await waitForRender();

      expect(col.span).toBe(24);
    });

    it("空 row 应该正常渲染", async () => {
      const row = document.createElement("ea-row");
      container.appendChild(row);

      await waitForRender();

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

      await waitForRender();

      expect(outerRow.shadowRoot).toBeDefined();
      expect(outerCol.shadowRoot).toBeDefined();
      expect(innerRow.shadowRoot).toBeDefined();
      expect(innerCol.shadowRoot).toBeDefined();
    });
  });

  describe("Lifecycle", () => {
    it("row 组件连接后应该正确初始化 CSS 变量", async () => {
      const row = document.createElement("ea-row");
      row.setAttribute("gutter", "20");
      row.setAttribute("justify", "center");
      row.setAttribute("align", "middle");
      container.appendChild(row);

      await waitForRender();

      expect(row.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
      expect(row.gutter).toBe(20);
      expect(row.justify).toBe("center");
      expect(row.align).toBe("middle");
      expect(row.style.getPropertyValue("--ea-row-gutter")).toBe("10px");
      expect(row.style.getPropertyValue("--ea-row-justify")).toBe("center");
      expect(row.style.getPropertyValue("--ea-row-align")).toBe("middle");
    });

    it("col 组件连接后应该正确初始化 CSS 变量", async () => {
      const col = document.createElement("ea-col");
      col.setAttribute("span", "12");
      col.setAttribute("offset", "6");
      container.appendChild(col);

      await waitForRender();

      expect(col.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
      expect(col.span).toBe(12);
      expect(col.offset).toBe(6);
      expect(col.style.getPropertyValue("--ea-col-span")).toBe("12");
      expect(col.style.getPropertyValue("--ea-col-offset")).toBe("6");
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

      await waitForRender();

      expect(row.gutter).toBe(10);

      row.setAttribute("gutter", "30");
      await waitForRender();

      expect(row.gutter).toBe(30);
    });

    it("动态修改 col span 应该生效", async () => {
      const col = document.createElement("ea-col");
      col.setAttribute("span", "6");
      container.appendChild(col);

      await waitForRender();

      expect(col.span).toBe(6);

      col.setAttribute("span", "18");
      await waitForRender();

      expect(col.span).toBe(18);
    });
  });

  describe("Responsive Attributes", () => {
    it("row 应该响应 justify 属性变化", async () => {
      const row = document.createElement("ea-row");
      row.setAttribute("justify", "start");
      container.appendChild(row);

      await waitForRender();

      expect(row.justify).toBe("start");

      row.setAttribute("justify", "end");
      await waitForRender();

      expect(row.justify).toBe("end");
    });

    it("row 应该响应 align 属性变化", async () => {
      const row = document.createElement("ea-row");
      row.setAttribute("align", "top");
      container.appendChild(row);

      await waitForRender();

      expect(row.align).toBe("top");

      row.setAttribute("align", "bottom");
      await waitForRender();

      expect(row.align).toBe("bottom");
    });

    it("col 应该响应 offset 属性变化", async () => {
      const col = document.createElement("ea-col");
      col.setAttribute("offset", "0");
      container.appendChild(col);

      await waitForRender();

      expect(col.offset).toBe(0);

      col.setAttribute("offset", "12");
      await waitForRender();

      expect(col.offset).toBe(12);
    });

    it("col 应该响应 push/pull 属性变化", async () => {
      const col = document.createElement("ea-col");
      col.setAttribute("push", "0");
      col.setAttribute("pull", "0");
      container.appendChild(col);

      await waitForRender();

      expect(col.push).toBe(0);
      expect(col.pull).toBe(0);

      col.setAttribute("push", "6");
      col.setAttribute("pull", "2");
      await waitForRender();

      expect(col.push).toBe(6);
      expect(col.pull).toBe(2);
    });
  });

  describe("CSS Variables", () => {
    it("row 默认 CSS 变量应该正确设置", async () => {
      const row = document.createElement("ea-row");
      container.appendChild(row);

      await waitForRender();

      expect(row.style.getPropertyValue("--ea-row-gutter")).toBe("0px");
      expect(row.style.getPropertyValue("--ea-row-justify")).toBe("start");
      expect(row.style.getPropertyValue("--ea-row-align")).toBe("top");
    });

    it("col 默认 CSS 变量应该正确设置", async () => {
      const col = document.createElement("ea-col");
      container.appendChild(col);

      await waitForRender();

      expect(col.style.getPropertyValue("--ea-col-span")).toBe("24");
      expect(col.style.getPropertyValue("--ea-col-offset")).toBe("0");
      expect(col.style.getPropertyValue("--ea-col-push")).toBe("0");
      expect(col.style.getPropertyValue("--ea-col-pull")).toBe("0");
    });

    it("动态修改属性后 CSS 变量应该同步更新", async () => {
      const row = document.createElement("ea-row");
      container.appendChild(row);

      await waitForRender();

      row.setAttribute("gutter", "40");
      row.setAttribute("justify", "space-between");
      row.setAttribute("align", "bottom");
      await waitForRender();

      expect(row.style.getPropertyValue("--ea-row-gutter")).toBe("20px");
      expect(row.style.getPropertyValue("--ea-row-justify")).toBe("space-between");
      expect(row.style.getPropertyValue("--ea-row-align")).toBe("bottom");
    });
  });
});
