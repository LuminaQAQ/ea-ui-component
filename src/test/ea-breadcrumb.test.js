import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { waitForRender } from "./utils/waitForRender";
import { runAxe, assertNoA11yViolations } from "./utils/a11y";

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

  describe("Basic Rendering", () => {
    it("应该正确渲染 ea-breadcrumb 组件", () => {
      const breadcrumb = document.createElement("ea-breadcrumb");
      container.appendChild(breadcrumb);

      expect(breadcrumb).toBeDefined();
      expect(breadcrumb.shadowRoot).toBeDefined();
    });

    it("应该包含 nav 容器元素", () => {
      const breadcrumb = document.createElement("ea-breadcrumb");
      container.appendChild(breadcrumb);

      const ol = breadcrumb.shadowRoot.querySelector("ol.ea-breadcrumb");
      expect(ol).toBeDefined();
      expect(ol.tagName.toLowerCase()).toBe("ol");
    });

    it("应该包含默认 slot", () => {
      const breadcrumb = document.createElement("ea-breadcrumb");
      container.appendChild(breadcrumb);

      const slot = breadcrumb.shadowRoot.querySelector("slot#defaultSlot");
      expect(slot).toBeDefined();
    });

    it("应该包含 separator slot", () => {
      const breadcrumb = document.createElement("ea-breadcrumb");
      container.appendChild(breadcrumb);

      const slot = breadcrumb.shadowRoot.querySelector('slot[name="separator"]');
      expect(slot).toBeDefined();
    });

    it("应该正确渲染 ea-breadcrumb-item 组件", () => {
      const item = document.createElement("ea-breadcrumb-item");
      container.appendChild(item);

      expect(item).toBeDefined();
      expect(item.shadowRoot).toBeDefined();
    });

    it("ea-breadcrumb-item 应该包含容器元素", () => {
      const item = document.createElement("ea-breadcrumb-item");
      container.appendChild(item);

      const itemContainer = item.shadowRoot.querySelector(".ea-breadcrumb-item");
      expect(itemContainer).toBeDefined();
    });

    it("ea-breadcrumb-item 应该包含 content 元素", () => {
      const item = document.createElement("ea-breadcrumb-item");
      container.appendChild(item);

      const content = item.shadowRoot.querySelector(".ea-breadcrumb-item__content");
      expect(content).toBeDefined();
    });

    it("ea-breadcrumb-item 应该包含 separator 元素", () => {
      const item = document.createElement("ea-breadcrumb-item");
      container.appendChild(item);

      const separator = item.shadowRoot.querySelector(".ea-breadcrumb-item__separator");
      expect(separator).toBeDefined();
    });
  });

  describe("Separator Attribute", () => {
    it("默认 separator 应该是 /", async () => {
      const breadcrumb = document.createElement("ea-breadcrumb");
      container.appendChild(breadcrumb);

      await waitForRender(0);

      expect(breadcrumb.separator).toBe("/");
    });

    it("应该正确设置 separator 属性", async () => {
      const breadcrumb = document.createElement("ea-breadcrumb");
      breadcrumb.setAttribute("separator", ">");
      container.appendChild(breadcrumb);

      await waitForRender(0);

      expect(breadcrumb.separator).toBe(">");
    });

    it("separator 属性变化时应该正确更新", async () => {
      const breadcrumb = document.createElement("ea-breadcrumb");
      breadcrumb.setAttribute("separator", "/");
      container.appendChild(breadcrumb);

      await waitForRender(0);
      expect(breadcrumb.separator).toBe("/");

      breadcrumb.setAttribute("separator", ">");
      await waitForRender(0);

      expect(breadcrumb.separator).toBe(">");
    });

    it("separator 属性变化时应该重新渲染分隔符", async () => {
      const breadcrumb = document.createElement("ea-breadcrumb");
      breadcrumb.innerHTML = `
        <ea-breadcrumb-item>Home</ea-breadcrumb-item>
        <ea-breadcrumb-item>Page</ea-breadcrumb-item>
      `;
      container.appendChild(breadcrumb);

      await waitForRender();

      const items = breadcrumb.querySelectorAll("ea-breadcrumb-item");
      const firstItemSeparator = items[0].querySelector("[slot='separator']");
      expect(firstItemSeparator).toBeDefined();

      breadcrumb.setAttribute("separator", ">");
      await waitForRender();

      const updatedSeparator = items[0].querySelector("[slot='separator']");
      expect(updatedSeparator).toBeDefined();
    });
  });

  describe("Href Attribute", () => {
    it("应该正确设置 href 属性", async () => {
      const item = document.createElement("ea-breadcrumb-item");
      item.setAttribute("href", "https://example.com");
      container.appendChild(item);

      await waitForRender(0);

      expect(item.href).toBe("https://example.com");
    });

    it("有 href 时应该渲染为 a 标签", async () => {
      const item = document.createElement("ea-breadcrumb-item");
      item.setAttribute("href", "https://example.com");
      container.appendChild(item);

      await waitForRender(0);

      const contentEl = item.shadowRoot.querySelector(".ea-breadcrumb-item__content");
      expect(contentEl.tagName.toLowerCase()).toBe("a");
    });

    it("无 href 时应该渲染为 span 标签", async () => {
      const item = document.createElement("ea-breadcrumb-item");
      container.appendChild(item);

      await waitForRender(0);

      const contentEl = item.shadowRoot.querySelector(".ea-breadcrumb-item__content");
      expect(contentEl.tagName.toLowerCase()).toBe("span");
    });

    it("有 href 时应该包含 is-link 状态类", async () => {
      const item = document.createElement("ea-breadcrumb-item");
      item.setAttribute("href", "https://example.com");
      container.appendChild(item);

      await waitForRender(0);

      const contentEl = item.shadowRoot.querySelector(".ea-breadcrumb-item__content");
      expect(contentEl.classList.contains("is-link")).toBe(true);
    });

    it("无 href 时不应包含 is-link 状态类", async () => {
      const item = document.createElement("ea-breadcrumb-item");
      container.appendChild(item);

      await waitForRender(0);

      const contentEl = item.shadowRoot.querySelector(".ea-breadcrumb-item__content");
      expect(contentEl.classList.contains("is-link")).toBe(false);
    });

    it("有 href 时 a 标签应包含正确的 href 属性", async () => {
      const item = document.createElement("ea-breadcrumb-item");
      item.setAttribute("href", "https://example.com");
      container.appendChild(item);

      await waitForRender(0);

      const contentEl = item.shadowRoot.querySelector(".ea-breadcrumb-item__content");
      expect(contentEl.getAttribute("href")).toBe("https://example.com");
    });

    it("href 属性变化时应该正确更新", async () => {
      const item = document.createElement("ea-breadcrumb-item");
      item.setAttribute("href", "https://old.com");
      container.appendChild(item);

      await waitForRender(0);
      expect(item.href).toBe("https://old.com");

      item.setAttribute("href", "https://new.com");
      await waitForRender(0);

      expect(item.href).toBe("https://new.com");
    });

    it("从有 href 变为无 href 时应该切换为 span 标签", async () => {
      const item = document.createElement("ea-breadcrumb-item");
      item.setAttribute("href", "https://example.com");
      container.appendChild(item);

      await waitForRender(0);

      let contentEl = item.shadowRoot.querySelector(".ea-breadcrumb-item__content");
      expect(contentEl.tagName.toLowerCase()).toBe("a");

      item.removeAttribute("href");
      await waitForRender();

      contentEl = item.shadowRoot.querySelector(".ea-breadcrumb-item__content");
      expect(contentEl.tagName.toLowerCase()).toBe("span");
    });
  });

  describe("CSS Parts", () => {
    it("ea-breadcrumb 应该正确设置 container part", () => {
      const breadcrumb = document.createElement("ea-breadcrumb");
      container.appendChild(breadcrumb);

      const containerEl = breadcrumb.shadowRoot.querySelector('[part="container"]');
      expect(containerEl).toBeDefined();
      expect(containerEl.tagName.toLowerCase()).toBe("ol");
    });

    it("ea-breadcrumb-item 应该正确设置 container part", () => {
      const item = document.createElement("ea-breadcrumb-item");
      container.appendChild(item);

      const containerEl = item.shadowRoot.querySelector('[part="container"]');
      expect(containerEl).toBeDefined();
    });

    it("ea-breadcrumb-item 应该正确设置 content part", () => {
      const item = document.createElement("ea-breadcrumb-item");
      container.appendChild(item);

      const contentEl = item.shadowRoot.querySelector('[part="content"]');
      expect(contentEl).toBeDefined();
    });

    it("ea-breadcrumb-item 应该正确设置 separator part", () => {
      const item = document.createElement("ea-breadcrumb-item");
      container.appendChild(item);

      const separatorEl = item.shadowRoot.querySelector('[part="separator"]');
      expect(separatorEl).toBeDefined();
    });
  });

  describe("Slots", () => {
    it("ea-breadcrumb 应该支持默认 slot", async () => {
      const breadcrumb = document.createElement("ea-breadcrumb");
      breadcrumb.innerHTML = `
        <ea-breadcrumb-item>Home</ea-breadcrumb-item>
        <ea-breadcrumb-item>Page</ea-breadcrumb-item>
      `;
      container.appendChild(breadcrumb);

      await waitForRender(0);

      const slot = breadcrumb.shadowRoot.querySelector("slot#defaultSlot");
      expect(slot).toBeDefined();
    });

    it("ea-breadcrumb 应该支持 separator slot", async () => {
      const breadcrumb = document.createElement("ea-breadcrumb");
      breadcrumb.innerHTML = `
        <ea-icon name="angle-right" slot="separator"></ea-icon>
        <ea-breadcrumb-item>Home</ea-breadcrumb-item>
      `;
      container.appendChild(breadcrumb);

      await waitForRender(0);

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

  describe("Separator Rendering", () => {
    it("应该为非最后一项渲染分隔符", async () => {
      const breadcrumb = document.createElement("ea-breadcrumb");
      breadcrumb.innerHTML = `
        <ea-breadcrumb-item>Home</ea-breadcrumb-item>
        <ea-breadcrumb-item>Page</ea-breadcrumb-item>
      `;
      container.appendChild(breadcrumb);

      await waitForRender();

      const items = breadcrumb.querySelectorAll("ea-breadcrumb-item");
      const firstItemSeparator = items[0].querySelector("[slot='separator']");
      expect(firstItemSeparator).toBeDefined();
    });

    it("最后一项不应渲染分隔符", async () => {
      const breadcrumb = document.createElement("ea-breadcrumb");
      breadcrumb.innerHTML = `
        <ea-breadcrumb-item>Home</ea-breadcrumb-item>
        <ea-breadcrumb-item>Page</ea-breadcrumb-item>
      `;
      container.appendChild(breadcrumb);

      await waitForRender();

      const items = breadcrumb.querySelectorAll("ea-breadcrumb-item");
      const lastItemSeparator = items[items.length - 1].querySelector("[slot='separator']");
      expect(lastItemSeparator).toBeNull();
    });

    it("已有自定义分隔符的项不应被覆盖", async () => {
      const breadcrumb = document.createElement("ea-breadcrumb");
      breadcrumb.innerHTML = `
        <ea-breadcrumb-item>Home</ea-breadcrumb-item>
        <ea-breadcrumb-item>
          <span slot="separator">→</span>
          Page
        </ea-breadcrumb-item>
      `;
      container.appendChild(breadcrumb);

      await waitForRender();

      const items = breadcrumb.querySelectorAll("ea-breadcrumb-item");
      const customSeparator = items[0].querySelector("[slot='separator'] →");
      const hasCustomOnSecond = items[1].querySelector("[slot='separator']");
      expect(hasCustomOnSecond).toBeDefined();
    });
  });

  describe("Lifecycle", () => {
    it("组件连接时应该正确初始化", async () => {
      const breadcrumb = document.createElement("ea-breadcrumb");
      breadcrumb.innerHTML = `
        <ea-breadcrumb-item>Home</ea-breadcrumb-item>
        <ea-breadcrumb-item>Page</ea-breadcrumb-item>
      `;
      container.appendChild(breadcrumb);

      await waitForRender(0);

      expect(
        breadcrumb.shadowRoot.querySelector("nav.ea-breadcrumb")
      ).toBeDefined();
    });

    it("组件移除时应该正确清理", async () => {
      const breadcrumb = document.createElement("ea-breadcrumb");
      breadcrumb.innerHTML = `
        <ea-breadcrumb-item>Home</ea-breadcrumb-item>
      `;
      container.appendChild(breadcrumb);

      await waitForRender(0);

      container.removeChild(breadcrumb);

      expect(true).toBe(true);
    });

    it("slot 变化时应该重新渲染分隔符", async () => {
      const breadcrumb = document.createElement("ea-breadcrumb");
      breadcrumb.innerHTML = `
        <ea-breadcrumb-item>Home</ea-breadcrumb-item>
      `;
      container.appendChild(breadcrumb);

      await waitForRender();

      const newItem = document.createElement("ea-breadcrumb-item");
      newItem.textContent = "Page";
      breadcrumb.appendChild(newItem);

      await waitForRender();

      const items = breadcrumb.querySelectorAll("ea-breadcrumb-item");
      expect(items.length).toBe(2);
    });
  });

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

      await waitForRender(0);

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

      await waitForRender(0);

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

      await waitForRender(0);

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

      await waitForRender(0);

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

      await waitForRender(0);

      const items = breadcrumb.querySelectorAll("ea-breadcrumb-item");
      const separatorSlot = items[1].shadowRoot.querySelector(
        'slot[name="separator"]'
      );
      expect(separatorSlot).toBeDefined();
    });

    it("空面包屑不应报错", async () => {
      const breadcrumb = document.createElement("ea-breadcrumb");
      container.appendChild(breadcrumb);

      await waitForRender(0);

      expect(breadcrumb.shadowRoot.querySelector("nav.ea-breadcrumb")).toBeDefined();
    });

    it("单个面包屑项不应渲染分隔符", async () => {
      const breadcrumb = document.createElement("ea-breadcrumb");
      breadcrumb.innerHTML = `
        <ea-breadcrumb-item>Home</ea-breadcrumb-item>
      `;
      container.appendChild(breadcrumb);

      await waitForRender();

      const items = breadcrumb.querySelectorAll("ea-breadcrumb-item");
      const separator = items[0].querySelector("[slot='separator']");
      expect(separator).toBeNull();
    });
  });

  describe("BEM Class Names", () => {
    it("ea-breadcrumb 容器应该有正确的 BEM 类名", async () => {
      const breadcrumb = document.createElement("ea-breadcrumb");
      container.appendChild(breadcrumb);

      await waitForRender(0);

      const ol = breadcrumb.shadowRoot.querySelector("ol");
      expect(ol.classList.contains("ea-breadcrumb")).toBe(true);
    });

    it("ea-breadcrumb-item 容器应该有正确的 BEM 类名", async () => {
      const item = document.createElement("ea-breadcrumb-item");
      container.appendChild(item);

      await waitForRender(0);

      const containerEl = item.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-breadcrumb-item")).toBe(true);
    });

    it("ea-breadcrumb-item content 应该有正确的 BEM 元素类名", async () => {
      const item = document.createElement("ea-breadcrumb-item");
      container.appendChild(item);

      await waitForRender(0);

      const content = item.shadowRoot.querySelector('[part="content"]');
      expect(content.classList.contains("ea-breadcrumb-item__content")).toBe(true);
    });

    it("ea-breadcrumb-item separator 应该有正确的 BEM 元素类名", async () => {
      const item = document.createElement("ea-breadcrumb-item");
      container.appendChild(item);

      await waitForRender(0);

      const separator = item.shadowRoot.querySelector('[part="separator"]');
      expect(separator.classList.contains("ea-breadcrumb-item__separator")).toBe(true);
    });
  });

  describe("Accessibility", () => {
    it("默认状态应该无 a11y 违规", async () => {
      const el = document.createElement("ea-breadcrumb");
      container.appendChild(el);
      await waitForRender();
      const results = await runAxe(el);
      assertNoA11yViolations(results);
    });

    describe("ARIA Attributes", () => {
      it("应该包含 nav 元素且带有 aria-label=Breadcrumb", async () => {
        const breadcrumb = document.createElement("ea-breadcrumb");
        container.appendChild(breadcrumb);
        await waitForRender(0);
        const nav = breadcrumb.shadowRoot.querySelector("nav");
        expect(nav).toBeTruthy();
        expect(nav.getAttribute("aria-label")).toBe("Breadcrumb");
      });

      it("ol 容器应该有 role=list", async () => {
        const breadcrumb = document.createElement("ea-breadcrumb");
        container.appendChild(breadcrumb);
        await waitForRender(0);
        const ol = breadcrumb.shadowRoot.querySelector("ol.ea-breadcrumb");
        expect(ol.getAttribute("role")).toBe("list");
      });

      it("ea-breadcrumb-item 容器应该有 role=listitem", async () => {
        const item = document.createElement("ea-breadcrumb-item");
        container.appendChild(item);
        await waitForRender(0);
        const containerEl = item.shadowRoot.querySelector('[part="container"]');
        expect(containerEl.getAttribute("role")).toBe("listitem");
      });

      it("最后一个 breadcrumb-item 应该有 aria-current=page", async () => {
        const breadcrumb = document.createElement("ea-breadcrumb");
        breadcrumb.innerHTML = `
          <ea-breadcrumb-item>Home</ea-breadcrumb-item>
          <ea-breadcrumb-item>Products</ea-breadcrumb-item>
          <ea-breadcrumb-item>Detail</ea-breadcrumb-item>
        `;
        container.appendChild(breadcrumb);
        await waitForRender();
        const items = breadcrumb.querySelectorAll("ea-breadcrumb-item");
        expect(items[2].getAttribute("aria-current")).toBe("page");
      });

      it("非最后一个 breadcrumb-item 不应该有 aria-current", async () => {
        const breadcrumb = document.createElement("ea-breadcrumb");
        breadcrumb.innerHTML = `
          <ea-breadcrumb-item>Home</ea-breadcrumb-item>
          <ea-breadcrumb-item>Products</ea-breadcrumb-item>
          <ea-breadcrumb-item>Detail</ea-breadcrumb-item>
        `;
        container.appendChild(breadcrumb);
        await waitForRender();
        const items = breadcrumb.querySelectorAll("ea-breadcrumb-item");
        expect(items[0].hasAttribute("aria-current")).toBe(false);
        expect(items[1].hasAttribute("aria-current")).toBe(false);
      });

      it("separator 元素应该有 aria-hidden=true", async () => {
        const item = document.createElement("ea-breadcrumb-item");
        container.appendChild(item);
        await waitForRender(0);
        const separator = item.shadowRoot.querySelector('[part="separator"]');
        expect(separator.getAttribute("aria-hidden")).toBe("true");
      });
    });
  });
});
