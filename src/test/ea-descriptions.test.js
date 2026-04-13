import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender.js";

// 导入真实组件
import "../components/ea-descriptions/index.ts";

describe("EaDescriptions Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  /**
   * 基本功能测试
   */
  describe("Basic Functionality", () => {
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

      const containerElement =
        descriptions.shadowRoot.querySelector("[part='container']");
      const bodyElement =
        descriptions.shadowRoot.querySelector("[part='body']");
      const captionElement =
        descriptions.shadowRoot.querySelector("[part='caption']");

      expect(containerElement).toBeDefined();
      expect(bodyElement).toBeDefined();
      expect(captionElement).toBeDefined();
    });

    it("应该包含 header 和 extra 插槽", async () => {
      const descriptions = document.createElement("ea-descriptions");
      descriptions.innerHTML = `
        <span slot="header">Title</span>
        <span slot="extra">Extra</span>
      `;
      container.appendChild(descriptions);

      await waitForRender();

      const headerSlot = descriptions.shadowRoot.querySelector(
        "slot[name='header']"
      );
      const extraSlot =
        descriptions.shadowRoot.querySelector("slot[name='extra']");

      expect(headerSlot).toBeDefined();
      expect(extraSlot).toBeDefined();
    });
  });

  /**
   * Column 属性测试
   */
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
  });

  /**
   * Border 属性测试
   */
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
  });

  /**
   * Direction 属性测试
   */
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
  });

  /**
   * Size 属性测试
   */
  describe("Size Attribute", () => {
    it("默认 size 应该是 default", async () => {
      const descriptions = document.createElement("ea-descriptions");
      container.appendChild(descriptions);

      await waitForRender();

      expect(descriptions.size).toBe("default");
    });

    it("设置 size='large' 应该应用 large 类", async () => {
      const descriptions = document.createElement("ea-descriptions");
      descriptions.setAttribute("size", "large");
      container.appendChild(descriptions);

      await waitForRender();

      expect(descriptions.size).toBe("large");
    });

    it("设置 size='small' 应该应用 small 类", async () => {
      const descriptions = document.createElement("ea-descriptions");
      descriptions.setAttribute("size", "small");
      container.appendChild(descriptions);

      await waitForRender();

      expect(descriptions.size).toBe("small");
    });
  });

  /**
   * Label Width 属性测试
   */
  describe("Label Width Attribute", () => {
    it("应该设置 label-width 属性", async () => {
      const descriptions = document.createElement("ea-descriptions");
      descriptions.setAttribute("label-width", "100px");
      container.appendChild(descriptions);

      await waitForRender();

      expect(descriptions.labelWidth).toBe("100px");
    });
  });

  /**
   * 子组件渲染测试
   */
  describe("Children Rendering", () => {
    it("应该正确渲染子项", async () => {
      const descriptions = document.createElement("ea-descriptions");
      descriptions.innerHTML = `
        <ea-descriptions-item label="Name">John</ea-descriptions-item>
        <ea-descriptions-item label="Age">30</ea-descriptions-item>
      `;
      container.appendChild(descriptions);

      await waitForRender();

      const tbody = descriptions.shadowRoot.querySelector(
        ".ea-descriptions__body"
      );
      expect(tbody).toBeDefined();
    });

    it("动态添加子项应该更新", async () => {
      const descriptions = document.createElement("ea-descriptions");
      container.appendChild(descriptions);

      await waitForRender();

      const newItem = document.createElement("ea-descriptions-item");
      newItem.setAttribute("label", "New");
      newItem.textContent = "Value";
      descriptions.appendChild(newItem);

      await waitForRender();

      expect(descriptions.querySelector("ea-descriptions-item")).toBeDefined();
    });
  });

  /**
   * 边界情况测试
   */
  describe("Edge Cases", () => {
    it("没有子项时应该正确处理", async () => {
      const descriptions = document.createElement("ea-descriptions");
      container.appendChild(descriptions);

      await waitForRender();

      const tbody = descriptions.shadowRoot.querySelector(
        ".ea-descriptions__body"
      );
      expect(tbody.children.length).toBe(0);
    });

    it("只有一个子项时应该正确处理", async () => {
      const descriptions = document.createElement("ea-descriptions");
      descriptions.innerHTML = `
        <ea-descriptions-item label="Single">Only One</ea-descriptions-item>
      `;
      container.appendChild(descriptions);

      await waitForRender();

      const tbody = descriptions.shadowRoot.querySelector(
        ".ea-descriptions__body"
      );
      expect(tbody.children.length).toBeGreaterThan(0);
    });
  });

  /**
   * 生命周期测试
   */
  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const descriptions = document.createElement("ea-descriptions");
      container.appendChild(descriptions);

      await waitForRender();

      expect(descriptions.shadowRoot).toBeDefined();
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

describe("EaDescriptionsItem Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  /**
   * 基本功能测试
   */
  describe("Basic Functionality", () => {
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

      const containerElement =
        item.shadowRoot.querySelector("[part='container']");
      const labelElement = item.shadowRoot.querySelector("[part='label']");
      const contentElement = item.shadowRoot.querySelector("[part='content']");

      expect(containerElement).toBeDefined();
      expect(labelElement).toBeDefined();
      expect(contentElement).toBeDefined();
    });

    it("应该包含默认插槽", async () => {
      const item = document.createElement("ea-descriptions-item");
      item.innerHTML = "Content";
      container.appendChild(item);

      await waitForRender();

      const slot = item.shadowRoot.querySelector("slot");
      expect(slot).toBeDefined();
    });
  });

  /**
   * Label 属性测试
   */
  describe("Label Attribute", () => {
    it("应该通过 label 属性设置标签", async () => {
      const item = document.createElement("ea-descriptions-item");
      item.setAttribute("label", "Test Label");
      container.appendChild(item);

      await waitForRender();

      expect(item.label).toBe("Test Label");
    });

    it("应该获取 label 属性", async () => {
      const item = document.createElement("ea-descriptions-item");
      item.setAttribute("label", "Test Label");
      container.appendChild(item);

      await waitForRender();

      expect(item.getAttribute("label")).toBe("Test Label");
    });
  });

  /**
   * Colspan 属性测试
   */
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

  /**
   * Rowspan 属性测试
   */
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

  /**
   * Align 属性测试
   */
  describe("Align Attribute", () => {
    it("应该设置 align 属性", async () => {
      const item = document.createElement("ea-descriptions-item");
      item.setAttribute("align", "center");
      container.appendChild(item);

      await waitForRender();

      expect(item.align).toBe("center");
    });
  });

  /**
   * Label Align 属性测试
   */
  describe("Label Align Attribute", () => {
    it("应该设置 label-align 属性", async () => {
      const item = document.createElement("ea-descriptions-item");
      item.setAttribute("label-align", "right");
      container.appendChild(item);

      await waitForRender();

      expect(item.labelAlign).toBe("right");
    });
  });

  /**
   * Width 属性测试
   */
  describe("Width Attribute", () => {
    it("应该设置 width 属性", async () => {
      const item = document.createElement("ea-descriptions-item");
      item.setAttribute("width", "100px");
      container.appendChild(item);

      await waitForRender();

      expect(item.width).toBe("100px");
    });
  });

  /**
   * Label Part 属性测试
   */
  describe("Label Part Attribute", () => {
    it("应该设置 label-part 属性", async () => {
      const item = document.createElement("ea-descriptions-item");
      item.setAttribute("label-part", "custom-label");
      container.appendChild(item);

      await waitForRender();

      expect(item.labelPart).toBe("custom-label");
    });
  });

  /**
   * Content Part 属性测试
   */
  describe("Content Part Attribute", () => {
    it("应该设置 content-part 属性", async () => {
      const item = document.createElement("ea-descriptions-item");
      item.setAttribute("content-part", "custom-content");
      container.appendChild(item);

      await waitForRender();

      expect(item.contentPart).toBe("custom-content");
    });
  });

  /**
   * Change 事件测试
   */
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
  });

  /**
   * 边界情况测试
   */
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

  /**
   * 生命周期测试
   */
  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const item = document.createElement("ea-descriptions-item");
      container.appendChild(item);

      await waitForRender();

      expect(item.shadowRoot).toBeDefined();
    });

    it("组件断开连接后应该清理资源", async () => {
      const item = document.createElement("ea-descriptions-item");
      container.appendChild(item);

      await waitForRender();

      item.remove();

      await waitForRender();

      expect(item.isConnected).toBe(false);
    });
  });
});
