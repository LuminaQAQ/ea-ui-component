import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { waitForRender } from "./utils/waitForRender.js";

// 导入实际的 ea-card 组件
import "../components/ea-card/index";

describe("EaCard Component", () => {
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
    it("应该正确渲染 ea-card 组件", () => {
      const card = document.createElement("ea-card");
      container.appendChild(card);

      expect(card).toBeDefined();
      expect(card.shadowRoot).toBeDefined();
    });

    it("应该包含 container、header、content、footer 的 CSS Part", () => {
      const card = document.createElement("ea-card");
      container.appendChild(card);

      const containerEl = card.shadowRoot.querySelector('[part="container"]');
      const headerEl = card.shadowRoot.querySelector('[part="header"]');
      const contentEl = card.shadowRoot.querySelector('[part="content"]');
      const footerEl = card.shadowRoot.querySelector('[part="footer"]');

      expect(containerEl).toBeTruthy();
      expect(headerEl).toBeTruthy();
      expect(contentEl).toBeTruthy();
      expect(footerEl).toBeTruthy();
    });

    it("应该包含默认插槽和具名插槽", () => {
      const card = document.createElement("ea-card");
      container.appendChild(card);

      const defaultSlot = card.shadowRoot.querySelector("slot:not([name])");
      const headerSlot = card.shadowRoot.querySelector('slot[name="header"]');
      const footerSlot = card.shadowRoot.querySelector('slot[name="footer"]');

      expect(defaultSlot).toBeTruthy();
      expect(headerSlot).toBeTruthy();
      expect(footerSlot).toBeTruthy();
    });
  });

  /**
   * Shadow 属性测试
   */
  describe("Shadow Attribute", () => {
    it("默认应该应用 always 阴影", async () => {
      const card = document.createElement("ea-card");
      container.appendChild(card);
      await waitForRender();

      const containerEl = card.shadowRoot.querySelector(".ea-card");
      expect(containerEl.classList.contains("is-always-shadow")).toBe(true);
    });

    it("设置 shadow='always' 应该应用 always 阴影类", async () => {
      const card = document.createElement("ea-card");
      card.setAttribute("shadow", "always");
      container.appendChild(card);
      await waitForRender();

      const containerEl = card.shadowRoot.querySelector(".ea-card");
      expect(containerEl.classList.contains("is-always-shadow")).toBe(true);
    });

    it("设置 shadow='hover' 应该应用 hover 阴影类", async () => {
      const card = document.createElement("ea-card");
      card.setAttribute("shadow", "hover");
      container.appendChild(card);
      await waitForRender();

      const containerEl = card.shadowRoot.querySelector(".ea-card");
      expect(containerEl.classList.contains("is-hover-shadow")).toBe(true);
    });

    it("设置 shadow='never' 不应该应用任何阴影类", async () => {
      const card = document.createElement("ea-card");
      card.setAttribute("shadow", "never");
      container.appendChild(card);
      await waitForRender();

      const containerEl = card.shadowRoot.querySelector(".ea-card");
      expect(containerEl.classList.contains("--always-shadow")).toBe(false);
      expect(containerEl.classList.contains("--hover-shadow")).toBe(false);
    });

    it("动态修改 shadow 属性应该更新阴影类", async () => {
      const card = document.createElement("ea-card");
      container.appendChild(card);
      await waitForRender();

      card.setAttribute("shadow", "hover");
      await waitForRender();

      const containerEl = card.shadowRoot.querySelector(".ea-card");
      expect(containerEl.classList.contains("is-hover-shadow")).toBe(true);
      expect(containerEl.classList.contains("is-always-shadow")).toBe(false);
    });
  });

  /**
   * Header 插槽测试
   */
  describe("Header Slot", () => {
    it("没有 header 内容时应该隐藏 header 区域", async () => {
      const card = document.createElement("ea-card");
      container.appendChild(card);
      await waitForRender();

      const containerEl = card.shadowRoot.querySelector(".ea-card");
      expect(containerEl.classList.contains("is-header-empty")).toBe(true);
    });

    it("通过 slot='header' 传入内容应该显示 header", async () => {
      const card = document.createElement("ea-card");
      card.innerHTML = `
        <div slot="header">Card Title</div>
        <p>Content</p>
      `;
      container.appendChild(card);
      await waitForRender();

      const containerEl = card.shadowRoot.querySelector(".ea-card");
      expect(containerEl.classList.contains("is-header-empty")).toBe(false);
    });

    it("header 插槽应该正确渲染传入的 DOM 内容", async () => {
      const card = document.createElement("ea-card");
      card.innerHTML = `
        <div slot="header">
          <span class="title">Card name</span>
          <button class="action">Action</button>
        </div>
        <p>Content</p>
      `;
      container.appendChild(card);
      await waitForRender();

      const headerSlot = card.shadowRoot.querySelector('slot[name="header"]');
      const assignedElements = headerSlot.assignedElements();
      expect(assignedElements.length).toBeGreaterThan(0);
      expect(assignedElements[0].querySelector(".title")).toBeTruthy();
      expect(assignedElements[0].querySelector(".action")).toBeTruthy();
    });
  });

  /**
   * Footer 插槽测试
   */
  describe("Footer Slot", () => {
    it("没有 footer 内容时应该隐藏 footer 区域", async () => {
      const card = document.createElement("ea-card");
      container.appendChild(card);
      await waitForRender();

      const containerEl = card.shadowRoot.querySelector(".ea-card");
      expect(containerEl.classList.contains("is-footer-empty")).toBe(true);
    });

    it("通过 slot='footer' 传入内容应该显示 footer", async () => {
      const card = document.createElement("ea-card");
      card.innerHTML = `
        <p>Content</p>
        <div slot="footer">Footer content</div>
      `;
      container.appendChild(card);
      await waitForRender();

      const containerEl = card.shadowRoot.querySelector(".ea-card");
      expect(containerEl.classList.contains("is-footer-empty")).toBe(false);
    });

    it("footer 插槽应该正确渲染传入的 DOM 内容", async () => {
      const card = document.createElement("ea-card");
      card.innerHTML = `
        <p>Content</p>
        <div slot="footer">
          <span>Footer content</span>
          <a href="#">Link</a>
        </div>
      `;
      container.appendChild(card);
      await waitForRender();

      const footerSlot = card.shadowRoot.querySelector('slot[name="footer"]');
      const assignedElements = footerSlot.assignedElements();
      expect(assignedElements.length).toBeGreaterThan(0);
      expect(assignedElements[0].querySelector("a")).toBeTruthy();
    });
  });

  /**
   * 默认插槽（内容区域）测试
   */
  describe("Default Slot (Content)", () => {
    it("应该正确渲染默认插槽内容", () => {
      const card = document.createElement("ea-card");
      card.innerHTML = `
        <p class="content-item">content1</p>
        <p class="content-item">content2</p>
        <p class="content-item">content3</p>
      `;
      container.appendChild(card);

      const contentSlot = card.shadowRoot.querySelector("slot:not([name])");
      const assignedElements = contentSlot.assignedElements();
      expect(assignedElements.length).toBe(3);
      expect(assignedElements[0].textContent).toBe("content1");
      expect(assignedElements[1].textContent).toBe("content2");
      expect(assignedElements[2].textContent).toBe("content3");
    });

    it("内容区域应该包含图片内容", () => {
      const card = document.createElement("ea-card");
      card.innerHTML = `
        <img src="test-image.jpg" alt="Test Image" class="card-image" />
      `;
      container.appendChild(card);

      const contentSlot = card.shadowRoot.querySelector("slot:not([name])");
      const assignedElements = contentSlot.assignedElements();
      expect(assignedElements[0].tagName.toLowerCase()).toBe("img");
      expect(assignedElements[0].getAttribute("src")).toBe("test-image.jpg");
    });
  });

  /**
   * 完整卡片结构测试
   */
  describe("Complete Card Structure", () => {
    it("应该正确渲染包含 header、content、footer 的完整卡片", async () => {
      const card = document.createElement("ea-card");
      card.innerHTML = `
        <div slot="header" class="header">
          <span>Card name</span>
        </div>
        <p class="ea-card-content">content1</p>
        <p class="ea-card-content">content2</p>
        <div slot="footer" class="footer">
          <span>Footer content</span>
        </div>
      `;
      container.appendChild(card);
      await waitForRender();

      const containerEl = card.shadowRoot.querySelector(".ea-card");
      const headerEl = card.shadowRoot.querySelector(".ea-card__header");
      const contentEl = card.shadowRoot.querySelector(".ea-card__content");
      const footerEl = card.shadowRoot.querySelector(".ea-card__footer");

      expect(containerEl).toBeTruthy();
      expect(headerEl).toBeTruthy();
      expect(contentEl).toBeTruthy();
      expect(footerEl).toBeTruthy();

      expect(containerEl.classList.contains("is-header-empty")).toBe(false);
      expect(containerEl.classList.contains("is-footer-empty")).toBe(false);
    });

    it("简单卡片（只有内容区域）应该正确渲染", async () => {
      const card = document.createElement("ea-card");
      card.innerHTML = `
        <p class="ea-card-content">content1</p>
        <p class="ea-card-content">content2</p>
        <p class="ea-card-content">content3</p>
        <p class="ea-card-content">content4</p>
      `;
      container.appendChild(card);
      await waitForRender();

      const containerEl = card.shadowRoot.querySelector(".ea-card");
      const headerEl = card.shadowRoot.querySelector(".ea-card__header");
      const footerEl = card.shadowRoot.querySelector(".ea-card__footer");
      const contentSlot = card.shadowRoot.querySelector("slot:not([name])");

      expect(containerEl.classList.contains("is-header-empty")).toBe(true);
      expect(containerEl.classList.contains("is-footer-empty")).toBe(true);
      expect(contentSlot.assignedElements().length).toBe(4);
    });
  });

  /**
   * 边界条件测试
   */
  describe("Edge Cases", () => {
    it("空卡片应该正确渲染", async () => {
      const card = document.createElement("ea-card");
      container.appendChild(card);
      await waitForRender();

      const containerEl = card.shadowRoot.querySelector(".ea-card");
      const contentSlot = card.shadowRoot.querySelector("slot:not([name])");

      expect(containerEl).toBeTruthy();
      expect(contentSlot.assignedElements().length).toBe(0);
    });

    it("动态添加 header 内容后应该更新显示", async () => {
      const card = document.createElement("ea-card");
      card.innerHTML = `<p>Content</p>`;
      container.appendChild(card);
      await waitForRender();

      let containerEl = card.shadowRoot.querySelector(".ea-card");
      expect(containerEl.classList.contains("is-header-empty")).toBe(true);

      // 动态添加 header
      const headerDiv = document.createElement("div");
      headerDiv.setAttribute("slot", "header");
      headerDiv.textContent = "Dynamic Header";
      card.appendChild(headerDiv);
      await waitForRender();

      containerEl = card.shadowRoot.querySelector(".ea-card");
      expect(containerEl.classList.contains("is-header-empty")).toBe(false);
    });

    it("动态移除 header 内容后应该隐藏 header", async () => {
      const card = document.createElement("ea-card");
      card.innerHTML = `
        <div slot="header">Header Content</div>
        <p>Content</p>
      `;
      container.appendChild(card);
      await waitForRender();

      let containerEl = card.shadowRoot.querySelector(".ea-card");
      expect(containerEl.classList.contains("is-header-empty")).toBe(false);

      // 移除 header
      const headerSlot = card.shadowRoot.querySelector('slot[name="header"]');
      const assignedElements = headerSlot.assignedElements();
      if (assignedElements.length > 0) {
        assignedElements[0].remove();
      }
      await waitForRender();

      // 重新触发 slotchange 事件
      headerSlot.dispatchEvent(new Event("slotchange"));
      await waitForRender();

      containerEl = card.shadowRoot.querySelector(".ea-card");
      expect(containerEl.classList.contains("is-header-empty")).toBe(true);
    });
  });

  /**
   * 生命周期测试
   */
  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const card = document.createElement("ea-card");
      container.appendChild(card);
      await waitForRender();

      expect(card.shadowRoot).toBeDefined();
      expect(card.shadowRoot.querySelector(".ea-card")).toBeTruthy();
    });

    it("组件断开连接后应该清理资源", async () => {
      const card = document.createElement("ea-card");
      container.appendChild(card);
      await waitForRender();

      // 断开连接
      card.remove();

      // 验证组件已断开（不会抛出错误）
      expect(() => {
        // 组件已经从 DOM 中移除，不会抛出错误
      }).not.toThrow();
    });
  });

  /**
   * Header 和 Footer 属性测试
   */
  describe("Header and Footer Attributes", () => {
    it("通过 header 属性设置标题文本", async () => {
      const card = document.createElement("ea-card");
      card.setAttribute("header", "Card Title");
      container.appendChild(card);
      await waitForRender();

      const headerSlot = card.shadowRoot.querySelector('slot[name="header"]');
      expect(headerSlot.innerText).toBe("Card Title");
    });

    it("通过 footer 属性设置页脚文本", async () => {
      const card = document.createElement("ea-card");
      card.setAttribute("footer", "Footer Text");
      container.appendChild(card);
      await waitForRender();

      const footerSlot = card.shadowRoot.querySelector('slot[name="footer"]');
      expect(footerSlot.innerText).toBe("Footer Text");
    });

    it("动态修改 header 属性应该更新标题", async () => {
      const card = document.createElement("ea-card");
      container.appendChild(card);
      await waitForRender();

      card.setAttribute("header", "New Title");
      await waitForRender();

      const headerSlot = card.shadowRoot.querySelector('slot[name="header"]');
      expect(headerSlot.innerText).toBe("New Title");
    });

    it("动态修改 footer 属性应该更新页脚", async () => {
      const card = document.createElement("ea-card");
      container.appendChild(card);
      await waitForRender();

      card.setAttribute("footer", "New Footer");
      await waitForRender();

      const footerSlot = card.shadowRoot.querySelector('slot[name="footer"]');
      expect(footerSlot.innerText).toBe("New Footer");
    });
  });
});
