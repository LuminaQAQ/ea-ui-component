import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// 导入 ea-page-header 组件
import "../components/ea-page-header/index.js";

describe("EaPageHeader Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  /**
   * 基础功能测试
   */
  describe("Basic Functionality", () => {
    it("应该正确渲染组件", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(pageHeader.shadowRoot).toBeTruthy();
      expect(
        pageHeader.shadowRoot.querySelector(".ea-page-header")
      ).toBeTruthy();
    });

    it("应该支持 CSS Parts", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(
        pageHeader.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
      expect(
        pageHeader.shadowRoot.querySelector('[part="header-wrapper"]')
      ).toBeTruthy();
      expect(pageHeader.shadowRoot.querySelector('[part="back"]')).toBeTruthy();
      expect(
        pageHeader.shadowRoot.querySelector('[part="content"]')
      ).toBeTruthy();
      expect(
        pageHeader.shadowRoot.querySelector('[part="extra"]')
      ).toBeTruthy();
    });

    it("应该渲染默认的返回按钮", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await new Promise(resolve => setTimeout(resolve, 50));

      const backEl = pageHeader.shadowRoot.querySelector(
        ".ea-page-header__back"
      );
      expect(backEl).toBeTruthy();
    });
  });

  /**
   * Icon 属性测试
   */
  describe("Icon Attribute", () => {
    it("默认 icon 应该是 angle-left", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await new Promise(resolve => setTimeout(resolve, 50));

      const iconEl = pageHeader.shadowRoot.querySelector("ea-icon");
      expect(iconEl).toBeTruthy();
      expect(iconEl.getAttribute("name")).toBe("angle-left");
    });

    it("应该支持自定义 icon", async () => {
      const pageHeader = document.createElement("ea-page-header");
      pageHeader.setAttribute("icon", "rotate-left");
      container.appendChild(pageHeader);

      await new Promise(resolve => setTimeout(resolve, 50));

      const iconEl = pageHeader.shadowRoot.querySelector("ea-icon");
      expect(iconEl).toBeTruthy();
    });

    it("应该支持空 icon", async () => {
      const pageHeader = document.createElement("ea-page-header");
      pageHeader.setAttribute("icon", "");
      container.appendChild(pageHeader);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(pageHeader.icon).toBe("");
    });
  });

  /**
   * Title 属性测试
   */
  describe("Title Attribute", () => {
    it("默认 title 应该是空字符串", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(pageHeader.title).toBe("");
    });

    it("应该支持自定义 title", async () => {
      const pageHeader = document.createElement("ea-page-header");
      pageHeader.setAttribute("title", "返回");
      container.appendChild(pageHeader);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(pageHeader.title).toBe("返回");
    });
  });

  /**
   * Content 属性测试
   */
  describe("Content Attribute", () => {
    it("默认 content 应该是空字符串", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(pageHeader.content).toBe("");
    });

    it("应该支持自定义 content", async () => {
      const pageHeader = document.createElement("ea-page-header");
      pageHeader.setAttribute("content", "Page Title");
      container.appendChild(pageHeader);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(pageHeader.content).toBe("Page Title");
    });
  });

  /**
   * Slot 测试
   */
  describe("Slots", () => {
    it("应该支持 breadcrumb slot", async () => {
      const pageHeader = document.createElement("ea-page-header");
      pageHeader.innerHTML = `
        <div slot="breadcrumb">Breadcrumb Content</div>
      `;
      container.appendChild(pageHeader);

      await new Promise(resolve => setTimeout(resolve, 50));

      const breadcrumbSlot = pageHeader.shadowRoot.querySelector(
        'slot[name="breadcrumb"]'
      );
      expect(breadcrumbSlot).toBeTruthy();
    });

    it("应该支持 icon slot", async () => {
      const pageHeader = document.createElement("ea-page-header");
      pageHeader.innerHTML = `
        <span slot="icon">Custom Icon</span>
      `;
      container.appendChild(pageHeader);

      await new Promise(resolve => setTimeout(resolve, 50));

      const iconSlot = pageHeader.shadowRoot.querySelector('slot[name="icon"]');
      expect(iconSlot).toBeTruthy();
    });

    it("应该支持 title slot", async () => {
      const pageHeader = document.createElement("ea-page-header");
      pageHeader.innerHTML = `
        <span slot="title">Custom Title</span>
      `;
      container.appendChild(pageHeader);

      await new Promise(resolve => setTimeout(resolve, 50));

      const titleSlot =
        pageHeader.shadowRoot.querySelector('slot[name="title"]');
      expect(titleSlot).toBeTruthy();
    });

    it("应该支持 content slot", async () => {
      const pageHeader = document.createElement("ea-page-header");
      pageHeader.innerHTML = `
        <span slot="content">Main Content</span>
      `;
      container.appendChild(pageHeader);

      await new Promise(resolve => setTimeout(resolve, 50));

      const contentSlot = pageHeader.shadowRoot.querySelector(
        'slot[name="content"]'
      );
      expect(contentSlot).toBeTruthy();
    });

    it("应该支持 extra slot", async () => {
      const pageHeader = document.createElement("ea-page-header");
      pageHeader.innerHTML = `
        <div slot="extra">
          <button>Action</button>
        </div>
      `;
      container.appendChild(pageHeader);

      await new Promise(resolve => setTimeout(resolve, 50));

      const extraSlot =
        pageHeader.shadowRoot.querySelector('slot[name="extra"]');
      expect(extraSlot).toBeTruthy();
    });

    it("应该支持默认 slot", async () => {
      const pageHeader = document.createElement("ea-page-header");
      pageHeader.innerHTML = `
        <div>Default Slot Content</div>
      `;
      container.appendChild(pageHeader);

      await new Promise(resolve => setTimeout(resolve, 50));

      const defaultSlot =
        pageHeader.shadowRoot.querySelector("slot:not([name])");
      expect(defaultSlot).toBeTruthy();
    });
  });

  /**
   * 事件测试
   */
  describe("Events", () => {
    it("应该触发 back 事件", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await new Promise(resolve => setTimeout(resolve, 50));

      const backHandler = vi.fn();
      pageHeader.addEventListener("back", backHandler);

      const backEl = pageHeader.shadowRoot.querySelector(
        ".ea-page-header__back"
      );
      backEl.click();

      expect(backHandler).toHaveBeenCalled();
    });

    it("back 事件应该可以多次触发", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await new Promise(resolve => setTimeout(resolve, 50));

      const backHandler = vi.fn();
      pageHeader.addEventListener("back", backHandler);

      const backEl = pageHeader.shadowRoot.querySelector(
        ".ea-page-header__back"
      );

      backEl.click();
      backEl.click();
      backEl.click();

      expect(backHandler).toHaveBeenCalledTimes(3);
    });
  });

  /**
   * 边界条件测试
   */
  describe("Edge Cases", () => {
    it("应该处理空组件", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(pageHeader.shadowRoot).toBeTruthy();
    });

    it("应该处理所有 slots 同时使用", async () => {
      const pageHeader = document.createElement("ea-page-header");
      pageHeader.innerHTML = `
        <div slot="breadcrumb">Breadcrumb</div>
        <span slot="icon">Icon</span>
        <span slot="title">Title</span>
        <span slot="content">Content</span>
        <div slot="extra">Extra</div>
        <div>Default</div>
      `;
      container.appendChild(pageHeader);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(
        pageHeader.shadowRoot.querySelector('slot[name="breadcrumb"]')
      ).toBeTruthy();
      expect(
        pageHeader.shadowRoot.querySelector('slot[name="icon"]')
      ).toBeTruthy();
      expect(
        pageHeader.shadowRoot.querySelector('slot[name="title"]')
      ).toBeTruthy();
      expect(
        pageHeader.shadowRoot.querySelector('slot[name="content"]')
      ).toBeTruthy();
      expect(
        pageHeader.shadowRoot.querySelector('slot[name="extra"]')
      ).toBeTruthy();
      expect(
        pageHeader.shadowRoot.querySelector("slot:not([name])")
      ).toBeTruthy();
    });
  });

  /**
   * 生命周期测试
   */
  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const pageHeader = document.createElement("ea-page-header");
      pageHeader.setAttribute("title", "Custom Title");
      container.appendChild(pageHeader);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(pageHeader.shadowRoot).toBeTruthy();
      expect(pageHeader.title).toBe("Custom Title");
    });

    it("组件断开连接后应该正常移除", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await new Promise(resolve => setTimeout(resolve, 50));

      pageHeader.remove();

      expect(pageHeader.isConnected).toBe(false);
    });

    it("应该支持属性动态更新", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(pageHeader.title).toBe("");

      pageHeader.setAttribute("title", "New Title");

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(pageHeader.title).toBe("New Title");
    });
  });
});
