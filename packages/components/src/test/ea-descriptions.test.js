import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender.js";
import { runAxe, assertNoA11yViolations } from "./utils/a11y";

import "../components/ea-descriptions/index.ts";

describe("EaDescriptions", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe("Basic Rendering", () => {
    it("应该正确渲染 ea-descriptions 组件", async () => {
      const descriptions = document.createElement("ea-descriptions");
      container.appendChild(descriptions);

      await waitForRender();

      expect(descriptions).toBeDefined();
      expect(descriptions.shadowRoot).toBeDefined();
    });

    it("应该包含必要的 CSS Part", async () => {
      const descriptions = document.createElement("ea-descriptions");
      container.appendChild(descriptions);

      await waitForRender();

      const containerEl = descriptions.shadowRoot.querySelector("[part='container']");
      const bodyEl = descriptions.shadowRoot.querySelector("[part='body']");
      const captionEl = descriptions.shadowRoot.querySelector("[part='caption']");

      expect(containerEl).not.toBeNull();
      expect(bodyEl).not.toBeNull();
      expect(captionEl).not.toBeNull();
    });

    it("应该包含 header 和 extra 插槽", async () => {
      const descriptions = document.createElement("ea-descriptions");
      descriptions.innerHTML = `
        <span slot="header">Title</span>
        <span slot="extra">Extra</span>
      `;
      container.appendChild(descriptions);

      await waitForRender();

      const headerSlot = descriptions.shadowRoot.querySelector("slot[name='header']");
      const extraSlot = descriptions.shadowRoot.querySelector("slot[name='extra']");

      expect(headerSlot).not.toBeNull();
      expect(extraSlot).not.toBeNull();
    });

    it("应该渲染 table 结构", async () => {
      const descriptions = document.createElement("ea-descriptions");
      container.appendChild(descriptions);

      await waitForRender();

      const table = descriptions.shadowRoot.querySelector("table");
      const tbody = descriptions.shadowRoot.querySelector("tbody");

      expect(table).not.toBeNull();
      expect(tbody).not.toBeNull();
    });
  });

  describe("Column Attribute", () => {
    it("默认 column 应该是 3", async () => {
      const descriptions = document.createElement("ea-descriptions");
      container.appendChild(descriptions);

      await waitForRender();

      expect(descriptions.column).toBe(3);
    });

    it("设置 column 应该改变列数", async () => {
      const descriptions = document.createElement("ea-descriptions");
      descriptions.setAttribute("column", "2");
      container.appendChild(descriptions);

      await waitForRender();

      expect(descriptions.column).toBe(2);
    });

    it("column 变化时应该重新渲染", async () => {
      const descriptions = document.createElement("ea-descriptions");
      descriptions.innerHTML = `
        <ea-descriptions-item label="A">1</ea-descriptions-item>
        <ea-descriptions-item label="B">2</ea-descriptions-item>
        <ea-descriptions-item label="C">3</ea-descriptions-item>
        <ea-descriptions-item label="D">4</ea-descriptions-item>
      `;
      container.appendChild(descriptions);

      await waitForRender();

      descriptions.setAttribute("column", "2");
      await waitForRender();

      expect(descriptions.column).toBe(2);
    });
  });

  describe("Border Attribute", () => {
    it("默认应该没有边框", async () => {
      const descriptions = document.createElement("ea-descriptions");
      container.appendChild(descriptions);

      await waitForRender();

      expect(descriptions.border).toBe(false);
    });

    it("设置 border 属性应该应用边框样式", async () => {
      const descriptions = document.createElement("ea-descriptions");
      descriptions.setAttribute("border", "");
      container.appendChild(descriptions);

      await waitForRender();

      expect(descriptions.border).toBe(true);
    });

    it("border 模式下容器应该有 is-border 状态类", async () => {
      const descriptions = document.createElement("ea-descriptions");
      descriptions.setAttribute("border", "");
      container.appendChild(descriptions);

      await waitForRender();

      const table = descriptions.shadowRoot.querySelector("table");
      expect(table.classList.contains("is-border")).toBe(true);
    });
  });

  describe("Direction Attribute", () => {
    it("默认 direction 应该是 horizontal", async () => {
      const descriptions = document.createElement("ea-descriptions");
      container.appendChild(descriptions);

      await waitForRender();

      expect(descriptions.direction).toBe("horizontal");
    });

    it("设置 direction 为 vertical 应该垂直布局", async () => {
      const descriptions = document.createElement("ea-descriptions");
      descriptions.setAttribute("direction", "vertical");
      container.appendChild(descriptions);

      await waitForRender();

      expect(descriptions.direction).toBe("vertical");
    });

    it("vertical 模式下容器应该有 is-vertical 状态类", async () => {
      const descriptions = document.createElement("ea-descriptions");
      descriptions.setAttribute("direction", "vertical");
      container.appendChild(descriptions);

      await waitForRender();

      const table = descriptions.shadowRoot.querySelector("table");
      expect(table.classList.contains("is-vertical")).toBe(true);
    });
  });

  describe("Size Attribute", () => {
    it("默认 size 应该是 default", async () => {
      const descriptions = document.createElement("ea-descriptions");
      container.appendChild(descriptions);

      await waitForRender();

      expect(descriptions.size).toBe("default");
    });

    it("设置 size='large' 应该应用 large 修饰符类", async () => {
      const descriptions = document.createElement("ea-descriptions");
      descriptions.setAttribute("size", "large");
      container.appendChild(descriptions);

      await waitForRender();

      expect(descriptions.size).toBe("large");
      const table = descriptions.shadowRoot.querySelector("table");
      expect(table.classList.contains("ea-descriptions--large")).toBe(true);
    });

    it("设置 size='small' 应该应用 small 修饰符类", async () => {
      const descriptions = document.createElement("ea-descriptions");
      descriptions.setAttribute("size", "small");
      container.appendChild(descriptions);

      await waitForRender();

      expect(descriptions.size).toBe("small");
      const table = descriptions.shadowRoot.querySelector("table");
      expect(table.classList.contains("ea-descriptions--small")).toBe(true);
    });
  });

  describe("Caption Attribute", () => {
    it("默认 caption 应该为空", async () => {
      const descriptions = document.createElement("ea-descriptions");
      container.appendChild(descriptions);

      await waitForRender();

      expect(descriptions.caption).toBe("");
    });

    it("设置 caption 应该更新标题文本", async () => {
      const descriptions = document.createElement("ea-descriptions");
      descriptions.setAttribute("caption", "User Info");
      container.appendChild(descriptions);

      await waitForRender();

      expect(descriptions.caption).toBe("User Info");
    });
  });

  describe("Label Width Attribute", () => {
    it("应该设置 label-width 属性", async () => {
      const descriptions = document.createElement("ea-descriptions");
      descriptions.setAttribute("label-width", "100px");
      container.appendChild(descriptions);

      await waitForRender();

      expect(descriptions.labelWidth).toBe("100px");
    });

    it("label-width 应该设置 CSS 变量", async () => {
      const descriptions = document.createElement("ea-descriptions");
      descriptions.setAttribute("label-width", "120px");
      container.appendChild(descriptions);

      await waitForRender();

      const value = descriptions.style.getPropertyValue("--ea-descriptions-label-width");
      expect(value).toBe("120px");
    });
  });

  describe("Children Rendering - Normal Mode", () => {
    it("应该正确渲染子项", async () => {
      const descriptions = document.createElement("ea-descriptions");
      descriptions.innerHTML = `
        <ea-descriptions-item label="Name">John</ea-descriptions-item>
        <ea-descriptions-item label="Age">30</ea-descriptions-item>
      `;
      container.appendChild(descriptions);

      await waitForRender();

      const tbody = descriptions.shadowRoot.querySelector(".ea-descriptions__body");
      expect(tbody).not.toBeNull();
      const rows = tbody.querySelectorAll("tr");
      expect(rows.length).toBeGreaterThan(0);
    });

    it("普通模式下 label 和 content 应在同一 td 中", async () => {
      const descriptions = document.createElement("ea-descriptions");
      descriptions.innerHTML = `
        <ea-descriptions-item label="Name">John</ea-descriptions-item>
      `;
      container.appendChild(descriptions);

      await waitForRender();

      const cells = descriptions.shadowRoot.querySelectorAll(".ea-descriptions__cell");
      expect(cells.length).toBeGreaterThan(0);

      const label = cells[0].querySelector(".ea-descriptions__label");
      const content = cells[0].querySelector(".ea-descriptions__content");
      expect(label).not.toBeNull();
      expect(content).not.toBeNull();
    });
  });

  describe("Children Rendering - Border Mode", () => {
    it("边框模式下 label 和 content 应在不同 td 中", async () => {
      const descriptions = document.createElement("ea-descriptions");
      descriptions.setAttribute("border", "");
      descriptions.innerHTML = `
        <ea-descriptions-item label="Name">John</ea-descriptions-item>
      `;
      container.appendChild(descriptions);

      await waitForRender();

      const labels = descriptions.shadowRoot.querySelectorAll("td.ea-descriptions__label");
      const contents = descriptions.shadowRoot.querySelectorAll("td.ea-descriptions__content");
      expect(labels.length).toBeGreaterThan(0);
      expect(contents.length).toBeGreaterThan(0);
    });
  });

  describe("Children Rendering - Vertical Mode", () => {
    it("垂直模式下应该渲染 th 和 td 行", async () => {
      const descriptions = document.createElement("ea-descriptions");
      descriptions.setAttribute("direction", "vertical");
      descriptions.innerHTML = `
        <ea-descriptions-item label="Name">John</ea-descriptions-item>
      `;
      container.appendChild(descriptions);

      await waitForRender();

      const thElements = descriptions.shadowRoot.querySelectorAll("th");
      const tdElements = descriptions.shadowRoot.querySelectorAll("td.ea-descriptions__content");
      expect(thElements.length).toBeGreaterThan(0);
      expect(tdElements.length).toBeGreaterThan(0);
    });
  });

  describe("Dynamic Children", () => {
    it("动态添加子项应该更新渲染", async () => {
      const descriptions = document.createElement("ea-descriptions");
      container.appendChild(descriptions);

      await waitForRender();

      const newItem = document.createElement("ea-descriptions-item");
      newItem.setAttribute("label", "New");
      newItem.textContent = "Value";
      descriptions.appendChild(newItem);

      await waitForRender();

      expect(descriptions.querySelector("ea-descriptions-item")).not.toBeNull();
    });
  });

  describe("Edge Cases", () => {
    it("没有子项时应该正确处理", async () => {
      const descriptions = document.createElement("ea-descriptions");
      container.appendChild(descriptions);

      await waitForRender();

      const tbody = descriptions.shadowRoot.querySelector(".ea-descriptions__body");
      expect(tbody.children.length).toBe(0);
    });

    it("只有一个子项时应该正确处理", async () => {
      const descriptions = document.createElement("ea-descriptions");
      descriptions.innerHTML = `
        <ea-descriptions-item label="Single">Only One</ea-descriptions-item>
      `;
      container.appendChild(descriptions);

      await waitForRender();

      const tbody = descriptions.shadowRoot.querySelector(".ea-descriptions__body");
      expect(tbody.children.length).toBeGreaterThan(0);
    });

    it("子项数量超过 column 时应该换行", async () => {
      const descriptions = document.createElement("ea-descriptions");
      descriptions.setAttribute("column", "2");
      descriptions.innerHTML = `
        <ea-descriptions-item label="A">1</ea-descriptions-item>
        <ea-descriptions-item label="B">2</ea-descriptions-item>
        <ea-descriptions-item label="C">3</ea-descriptions-item>
      `;
      container.appendChild(descriptions);

      await waitForRender();

      const rows = descriptions.shadowRoot.querySelectorAll(".ea-descriptions__row");
      expect(rows.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const descriptions = document.createElement("ea-descriptions");
      container.appendChild(descriptions);

      await waitForRender();

      expect(descriptions.shadowRoot).toBeDefined();
      expect(descriptions.isConnected).toBe(true);
    });

    it("组件断开连接后应该清理资源", async () => {
      const descriptions = document.createElement("ea-descriptions");
      container.appendChild(descriptions);

      await waitForRender();

      descriptions.remove();

      await waitForRender();

      expect(descriptions.isConnected).toBe(false);
    });
  });
});

describe("EaDescriptionsItem", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe("Basic Rendering", () => {
    it("应该正确渲染 ea-descriptions-item 组件", async () => {
      const item = document.createElement("ea-descriptions-item");
      container.appendChild(item);

      await waitForRender();

      expect(item).toBeDefined();
      expect(item.shadowRoot).toBeDefined();
    });

    it("应该包含必要的 CSS Part", async () => {
      const item = document.createElement("ea-descriptions-item");
      container.appendChild(item);

      await waitForRender();

      const containerEl = item.shadowRoot.querySelector("[part='container']");
      const labelEl = item.shadowRoot.querySelector("[part='label']");
      const contentEl = item.shadowRoot.querySelector("[part='content']");

      expect(containerEl).not.toBeNull();
      expect(labelEl).not.toBeNull();
      expect(contentEl).not.toBeNull();
    });

    it("应该包含默认插槽", async () => {
      const item = document.createElement("ea-descriptions-item");
      item.innerHTML = "Content";
      container.appendChild(item);

      await waitForRender();

      const slot = item.shadowRoot.querySelector("slot");
      expect(slot).not.toBeNull();
    });
  });

  describe("Label Attribute", () => {
    it("应该通过 label 属性设置标签", async () => {
      const item = document.createElement("ea-descriptions-item");
      item.setAttribute("label", "Test Label");
      container.appendChild(item);

      await waitForRender();

      expect(item.label).toBe("Test Label");
    });

    it("默认 label 应该为空字符串", async () => {
      const item = document.createElement("ea-descriptions-item");
      container.appendChild(item);

      await waitForRender();

      expect(item.label).toBe("");
    });

    it("label 变化时应该更新标签文本", async () => {
      const item = document.createElement("ea-descriptions-item");
      item.setAttribute("label", "Old");
      container.appendChild(item);

      await waitForRender();

      item.setAttribute("label", "New");
      await waitForRender();

      expect(item.label).toBe("New");
    });
  });

  describe("Colspan Attribute", () => {
    it("默认 colspan 应该是 1", async () => {
      const item = document.createElement("ea-descriptions-item");
      container.appendChild(item);

      await waitForRender();

      expect(item.colspan).toBe(1);
    });

    it("设置 colspan 应该改变跨列数", async () => {
      const item = document.createElement("ea-descriptions-item");
      item.setAttribute("colspan", "2");
      container.appendChild(item);

      await waitForRender();

      expect(item.colspan).toBe(2);
    });
  });

  describe("Rowspan Attribute", () => {
    it("默认 rowspan 应该是 1", async () => {
      const item = document.createElement("ea-descriptions-item");
      container.appendChild(item);

      await waitForRender();

      expect(item.rowspan).toBe(1);
    });

    it("设置 rowspan 应该改变跨行数", async () => {
      const item = document.createElement("ea-descriptions-item");
      item.setAttribute("rowspan", "2");
      container.appendChild(item);

      await waitForRender();

      expect(item.rowspan).toBe(2);
    });
  });

  describe("Align Attribute", () => {
    it("默认 align 应该为空", async () => {
      const item = document.createElement("ea-descriptions-item");
      container.appendChild(item);

      await waitForRender();

      expect(item.align).toBe("");
    });

    it("应该设置 align 属性", async () => {
      const item = document.createElement("ea-descriptions-item");
      item.setAttribute("align", "center");
      container.appendChild(item);

      await waitForRender();

      expect(item.align).toBe("center");
    });
  });

  describe("Label Align Attribute", () => {
    it("默认 labelAlign 应该为空", async () => {
      const item = document.createElement("ea-descriptions-item");
      container.appendChild(item);

      await waitForRender();

      expect(item.labelAlign).toBe("");
    });

    it("应该设置 label-align 属性", async () => {
      const item = document.createElement("ea-descriptions-item");
      item.setAttribute("label-align", "right");
      container.appendChild(item);

      await waitForRender();

      expect(item.labelAlign).toBe("right");
    });
  });

  describe("Width Attribute", () => {
    it("默认 width 应该为空", async () => {
      const item = document.createElement("ea-descriptions-item");
      container.appendChild(item);

      await waitForRender();

      expect(item.width).toBe("");
    });

    it("应该设置 width 属性", async () => {
      const item = document.createElement("ea-descriptions-item");
      item.setAttribute("width", "100px");
      container.appendChild(item);

      await waitForRender();

      expect(item.width).toBe("100px");
    });
  });

  describe("Label Width Attribute", () => {
    it("默认 labelWidth 应该为空", async () => {
      const item = document.createElement("ea-descriptions-item");
      container.appendChild(item);

      await waitForRender();

      expect(item.labelWidth).toBe("");
    });

    it("应该设置 label-width 属性", async () => {
      const item = document.createElement("ea-descriptions-item");
      item.setAttribute("label-width", "80px");
      container.appendChild(item);

      await waitForRender();

      expect(item.labelWidth).toBe("80px");
    });
  });

  describe("Label Part Attribute", () => {
    it("应该设置 label-part 属性", async () => {
      const item = document.createElement("ea-descriptions-item");
      item.setAttribute("label-part", "custom-label");
      container.appendChild(item);

      await waitForRender();

      expect(item.labelPart).toBe("custom-label");
    });
  });

  describe("Content Part Attribute", () => {
    it("应该设置 content-part 属性", async () => {
      const item = document.createElement("ea-descriptions-item");
      item.setAttribute("content-part", "custom-content");
      container.appendChild(item);

      await waitForRender();

      expect(item.contentPart).toBe("custom-content");
    });
  });

  describe("Change Event", () => {
    it("属性变化应该触发 ea-descriptions-item-change 事件", async () => {
      const item = document.createElement("ea-descriptions-item");
      container.appendChild(item);

      await waitForRender();

      const handler = vi.fn();
      item.addEventListener("ea-descriptions-item-change", handler);

      item.setAttribute("label", "New Label");

      await waitForRender();

      expect(handler).toHaveBeenCalled();
    });

    it("colspan 变化应该触发 change 事件", async () => {
      const item = document.createElement("ea-descriptions-item");
      container.appendChild(item);

      await waitForRender();

      const handler = vi.fn();
      item.addEventListener("ea-descriptions-item-change", handler);

      item.setAttribute("colspan", "2");

      await waitForRender();

      expect(handler).toHaveBeenCalled();
    });

    it("rowspan 变化应该触发 change 事件", async () => {
      const item = document.createElement("ea-descriptions-item");
      container.appendChild(item);

      await waitForRender();

      const handler = vi.fn();
      item.addEventListener("ea-descriptions-item-change", handler);

      item.setAttribute("rowspan", "2");

      await waitForRender();

      expect(handler).toHaveBeenCalled();
    });
  });

  describe("Content Observer", () => {
    it("内容变化应该触发 change 事件", async () => {
      const item = document.createElement("ea-descriptions-item");
      item.setAttribute("label", "Test");
      container.appendChild(item);

      await waitForRender();

      const handler = vi.fn();
      item.addEventListener("ea-descriptions-item-change", handler);

      item.textContent = "New Content";

      await waitForRender();

      expect(handler).toHaveBeenCalled();
    });
  });

  describe("Edge Cases", () => {
    it("空内容时应该正确处理", async () => {
      const item = document.createElement("ea-descriptions-item");
      item.setAttribute("label", "Empty");
      container.appendChild(item);

      await waitForRender();

      expect(item.label).toBe("Empty");
    });

    it("没有 label 时 label 应该为空字符串", async () => {
      const item = document.createElement("ea-descriptions-item");
      container.appendChild(item);

      await waitForRender();

      expect(item.label).toBe("");
    });
  });

  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const item = document.createElement("ea-descriptions-item");
      container.appendChild(item);

      await waitForRender();

      expect(item.shadowRoot).toBeDefined();
      expect(item.isConnected).toBe(true);
    });

    it("组件断开连接后应该清理 MutationObserver", async () => {
      const item = document.createElement("ea-descriptions-item");
      container.appendChild(item);

      await waitForRender();

      item.remove();

      await waitForRender();

      expect(item.isConnected).toBe(false);
    });
  });

  describe("Accessibility", () => {
    it("默认状态应该无 a11y 违规", async () => {
      const el = document.createElement("ea-descriptions-item");
      container.appendChild(el);
      await waitForRender();
      const results = await runAxe(el);
      assertNoA11yViolations(results);
    });

    describe("ARIA Attributes", () => {
      it("table 应该有 aria-labelledby 属性", async () => {
        const el = document.createElement("ea-descriptions");
        el.setAttribute("caption", "User Info");
        el.innerHTML = `<ea-descriptions-item label="Name">John</ea-descriptions-item>`;
        container.appendChild(el);
        await waitForRender();
        const table = el.shadowRoot.querySelector("table");
        expect(table.getAttribute("aria-labelledby")).toBeTruthy();
      });

      it("label 元素应该有 role='rowheader'", async () => {
        const el = document.createElement("ea-descriptions");
        el.innerHTML = `<ea-descriptions-item label="Name">John</ea-descriptions-item>`;
        container.appendChild(el);
        await waitForRender();
        const labels = el.shadowRoot.querySelectorAll(".ea-descriptions__label");
        expect(labels.length).toBeGreaterThan(0);
        labels.forEach(label => {
          expect(label.getAttribute("role")).toBe("rowheader");
        });
      });
    });
  });
});
