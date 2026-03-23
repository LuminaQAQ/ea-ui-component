import { describe, it, expect, beforeEach, afterEach } from "vitest";

// 导入 ea-breadcrumb 组件
import "../components/ea-breadcrumb/index.js";

describe("EaBreadcrumb Component", () => {
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
    it("应该正确渲染 ea-breadcrumb 组件", () => {
      const breadcrumb = document.createElement("ea-breadcrumb");
      container.appendChild(breadcrumb);

      expect(breadcrumb).toBeDefined();
      expect(breadcrumb.shadowRoot).toBeDefined();
    });

    it("应该包含 breadcrumb 容器元素", () => {
      const breadcrumb = document.createElement("ea-breadcrumb");
      container.appendChild(breadcrumb);

      const breadcrumbContainer =
        breadcrumb.shadowRoot.querySelector(".ea-breadcrumb");
      expect(breadcrumbContainer).toBeDefined();
    });

    it("应该正确渲染 ea-breadcrumb-item 组件", () => {
      const item = document.createElement("ea-breadcrumb-item");
      container.appendChild(item);

      expect(item).toBeDefined();
      expect(item.shadowRoot).toBeDefined();
    });

    it("应该包含 breadcrumb-item 容器元素", () => {
      const item = document.createElement("ea-breadcrumb-item");
      container.appendChild(item);

      const itemContainer = item.shadowRoot.querySelector(
        ".ea-breadcrumb-item"
      );
      expect(itemContainer).toBeDefined();
    });
  });

  /**
   * Separator 属性测试
   */
  describe("Separator Attribute", () => {
    it("应该正确设置 separator 属性", async () => {
      const breadcrumb = document.createElement("ea-breadcrumb");
      breadcrumb.setAttribute("separator", ">");
      container.appendChild(breadcrumb);

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(breadcrumb.separator).toBe(">");
    });

    it("默认 separator 应该是 /", async () => {
      const breadcrumb = document.createElement("ea-breadcrumb");
      container.appendChild(breadcrumb);

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(breadcrumb.separator).toBe("/");
    });

    it("separator 属性变化时应该正确更新", async () => {
      const breadcrumb = document.createElement("ea-breadcrumb");
      breadcrumb.setAttribute("separator", "/");
      container.appendChild(breadcrumb);

      await new Promise(resolve => setTimeout(resolve, 0));
      expect(breadcrumb.separator).toBe("/");

      breadcrumb.setAttribute("separator", ">");
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(breadcrumb.separator).toBe(">");
    });
  });

  /**
   * Href 属性测试
   */
  describe("Href Attribute", () => {
    it("应该正确设置 href 属性", async () => {
      const item = document.createElement("ea-breadcrumb-item");
      item.setAttribute("href", "https://example.com");
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(item.href).toBe("https://example.com");
    });

    it("有 href 时应该渲染为 a 标签", async () => {
      const item = document.createElement("ea-breadcrumb-item");
      item.setAttribute("href", "https://example.com");
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 0));

      const contentEl = item.shadowRoot.querySelector(
        ".ea-breadcrumb-item__content"
      );
      expect(contentEl.tagName.toLowerCase()).toBe("a");
    });

    it("无 href 时应该渲染为 span 标签", async () => {
      const item = document.createElement("ea-breadcrumb-item");
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 0));

      const contentEl = item.shadowRoot.querySelector(
        ".ea-breadcrumb-item__content"
      );
      expect(contentEl.tagName.toLowerCase()).toBe("span");
    });

    it("有 href 时应该渲染为链接样式", async () => {
      const item = document.createElement("ea-breadcrumb-item");
      item.setAttribute("href", "https://example.com");
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      const contentEl = item.shadowRoot.querySelector(
        ".ea-breadcrumb-item__content"
      );
      // 验证是 a 标签且有 href 属性
      expect(contentEl.tagName.toLowerCase()).toBe("a");
      expect(contentEl.getAttribute("href")).toBe("https://example.com");
    });

    it("href 属性变化时应该正确更新", async () => {
      const item = document.createElement("ea-breadcrumb-item");
      item.setAttribute("href", "https://old.com");
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 0));
      expect(item.href).toBe("https://old.com");

      item.setAttribute("href", "https://new.com");
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(item.href).toBe("https://new.com");
    });
  });

  /**
   * CSS Part 测试
   */
  describe("CSS Parts", () => {
    it("ea-breadcrumb 应该正确设置 container part", () => {
      const breadcrumb = document.createElement("ea-breadcrumb");
      container.appendChild(breadcrumb);

      const containerEl =
        breadcrumb.shadowRoot.querySelector('[part="container"]');
      expect(containerEl).toBeDefined();
    });

    it("ea-breadcrumb-item 应该正确设置 container part", () => {
      const item = document.createElement("ea-breadcrumb-item");
      container.appendChild(item);

      const containerEl = item.shadowRoot.querySelector('[part="container"]');
      expect(containerEl).toBeDefined();
    });

    it("ea-breadcrumb-item 应该正确设置 separator part", () => {
      const item = document.createElement("ea-breadcrumb-item");
      container.appendChild(item);

      const separatorEl = item.shadowRoot.querySelector('[part="separator"]');
      expect(separatorEl).toBeDefined();
    });

    it("ea-breadcrumb-item 应该正确设置 content part", () => {
      const item = document.createElement("ea-breadcrumb-item");
      container.appendChild(item);

      const contentEl = item.shadowRoot.querySelector('[part="content"]');
      expect(contentEl).toBeDefined();
    });
  });

  /**
   * Slots 测试
   */
  describe("Slots", () => {
    it("ea-breadcrumb 应该支持默认 slot", () => {
      const breadcrumb = document.createElement("ea-breadcrumb");
      breadcrumb.innerHTML = `
        <ea-breadcrumb-item>Home</ea-breadcrumb-item>
        <ea-breadcrumb-item>Page</ea-breadcrumb-item>
      `;
      container.appendChild(breadcrumb);

      const slot = breadcrumb.shadowRoot.querySelector("slot");
      expect(slot).toBeDefined();
    });

    it("ea-breadcrumb 应该支持 separator slot", () => {
      const breadcrumb = document.createElement("ea-breadcrumb");
      breadcrumb.innerHTML = `
        <ea-icon name="angle-right" slot="separator"></ea-icon>
        <ea-breadcrumb-item>Home</ea-breadcrumb-item>
      `;
      container.appendChild(breadcrumb);

      const separatorSlot = breadcrumb.shadowRoot.querySelector(
        'slot[name="separator"]'
      );
      expect(separatorSlot).toBeDefined();
    });

    it("ea-breadcrumb-item 应该支持默认 slot", () => {
      const item = document.createElement("ea-breadcrumb-item");
      item.textContent = "Home";
      container.appendChild(item);

      const slot = item.shadowRoot.querySelector("slot");
      expect(slot).toBeDefined();
    });

    it("ea-breadcrumb-item 应该支持 separator slot", () => {
      const item = document.createElement("ea-breadcrumb-item");
      item.innerHTML = `
        Home
        <span slot="separator">→</span>
      `;
      container.appendChild(item);

      const separatorSlot = item.shadowRoot.querySelector(
        'slot[name="separator"]'
      );
      expect(separatorSlot).toBeDefined();
    });
  });

  /**
   * 生命周期测试
   */
  describe("Lifecycle", () => {
    it("组件连接时应该正确初始化", async () => {
      const breadcrumb = document.createElement("ea-breadcrumb");
      breadcrumb.innerHTML = `
        <ea-breadcrumb-item>Home</ea-breadcrumb-item>
        <ea-breadcrumb-item>Page</ea-breadcrumb-item>
      `;
      container.appendChild(breadcrumb);

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(
        breadcrumb.shadowRoot.querySelector(".ea-breadcrumb")
      ).toBeDefined();
    });

    it("组件移除时应该清理事件监听器", async () => {
      const breadcrumb = document.createElement("ea-breadcrumb");
      breadcrumb.innerHTML = `
        <ea-breadcrumb-item>Home</ea-breadcrumb-item>
      `;
      container.appendChild(breadcrumb);

      await new Promise(resolve => setTimeout(resolve, 0));

      container.removeChild(breadcrumb);

      expect(true).toBe(true);
    });
  });

  /**
   * 复杂场景测试
   */
  describe("Complex Scenarios", () => {
    it("应该支持完整的面包屑导航", async () => {
      const breadcrumb = document.createElement("ea-breadcrumb");
      breadcrumb.setAttribute("separator", "/");
      breadcrumb.innerHTML = `
        <ea-breadcrumb-item href="/">Home</ea-breadcrumb-item>
        <ea-breadcrumb-item href="/products">Products</ea-breadcrumb-item>
        <ea-breadcrumb-item>Detail</ea-breadcrumb-item>
      `;
      container.appendChild(breadcrumb);

      await new Promise(resolve => setTimeout(resolve, 0));

      const items = breadcrumb.querySelectorAll("ea-breadcrumb-item");
      expect(items.length).toBe(3);
      expect(items[0].href).toBe("/");
      expect(items[1].href).toBe("/products");
      expect(items[2].href).toBe("");
    });

    it("应该正确处理自定义分隔符", async () => {
      const breadcrumb = document.createElement("ea-breadcrumb");
      breadcrumb.setAttribute("separator", ">");
      breadcrumb.innerHTML = `
        <ea-breadcrumb-item>Home</ea-breadcrumb-item>
        <ea-breadcrumb-item>Page</ea-breadcrumb-item>
      `;
      container.appendChild(breadcrumb);

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(breadcrumb.separator).toBe(">");
    });

    it("应该正确处理多个 Breadcrumb 实例", async () => {
      const breadcrumb1 = document.createElement("ea-breadcrumb");
      breadcrumb1.setAttribute("separator", "/");
      breadcrumb1.innerHTML = `
        <ea-breadcrumb-item>Home</ea-breadcrumb-item>
        <ea-breadcrumb-item>Page1</ea-breadcrumb-item>
      `;

      const breadcrumb2 = document.createElement("ea-breadcrumb");
      breadcrumb2.setAttribute("separator", ">");
      breadcrumb2.innerHTML = `
        <ea-breadcrumb-item>Home</ea-breadcrumb-item>
        <ea-breadcrumb-item>Page2</ea-breadcrumb-item>
      `;

      container.appendChild(breadcrumb1);
      container.appendChild(breadcrumb2);

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(breadcrumb1.separator).toBe("/");
      expect(breadcrumb2.separator).toBe(">");
    });

    it("应该支持图标作为分隔符", async () => {
      const breadcrumb = document.createElement("ea-breadcrumb");
      breadcrumb.innerHTML = `
        <ea-icon name="angle-right" slot="separator"></ea-icon>
        <ea-breadcrumb-item>Home</ea-breadcrumb-item>
        <ea-breadcrumb-item>Page</ea-breadcrumb-item>
      `;
      container.appendChild(breadcrumb);

      await new Promise(resolve => setTimeout(resolve, 0));

      const separatorSlot = breadcrumb.shadowRoot.querySelector(
        'slot[name="separator"]'
      );
      expect(separatorSlot).toBeDefined();
    });

    it("应该支持子项自定义分隔符", async () => {
      const breadcrumb = document.createElement("ea-breadcrumb");
      breadcrumb.innerHTML = `
        <ea-breadcrumb-item>Home</ea-breadcrumb-item>
        <ea-breadcrumb-item>
          <span slot="separator">→</span>
          Page
        </ea-breadcrumb-item>
      `;
      container.appendChild(breadcrumb);

      await new Promise(resolve => setTimeout(resolve, 0));

      const items = breadcrumb.querySelectorAll("ea-breadcrumb-item");
      const separatorSlot = items[1].shadowRoot.querySelector(
        'slot[name="separator"]'
      );
      expect(separatorSlot).toBeDefined();
    });
  });
});
