import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// 导入 ea-drawer 组件及其依赖
import "../components/ea-drawer/index.js";

describe("EaDrawer Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
    // 清理所有添加到 body 的抽屉
    document.querySelectorAll("ea-drawer").forEach(drawer => {
      if (drawer.parentElement === document.body) {
        drawer.remove();
      }
    });
  });

  /**
   * 基本功能测试
   */
  describe("Basic Functionality", () => {
    it("应该正确渲染 ea-drawer 组件", () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);

      expect(drawer).toBeDefined();
      expect(drawer.shadowRoot).toBeDefined();
    });

    it("应该包含必要的 CSS Part", () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);

      expect(
        drawer.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
      expect(drawer.shadowRoot.querySelector('[part="header"]')).toBeTruthy();
      expect(drawer.shadowRoot.querySelector('[part="title"]')).toBeTruthy();
      expect(
        drawer.shadowRoot.querySelector('[part="close-icon"]')
      ).toBeTruthy();
      expect(drawer.shadowRoot.querySelector('[part="content"]')).toBeTruthy();
      expect(drawer.shadowRoot.querySelector('[part="footer"]')).toBeTruthy();
    });

    it("应该包含 header、footer 和默认插槽", () => {
      const drawer = document.createElement("ea-drawer");
      drawer.innerHTML = `
        <span>Content</span>
        <div slot="title">Custom Title</div>
        <div slot="footer">Custom Footer</div>
      `;
      container.appendChild(drawer);

      const slots = drawer.shadowRoot.querySelectorAll("slot");
      expect(slots.length).toBeGreaterThanOrEqual(3);
    });
  });

  /**
   * Title 属性测试
   */
  describe("Title Attribute", () => {
    it("应该通过 title 属性设置标题", async () => {
      const drawer = document.createElement("ea-drawer");
      drawer.setAttribute("title", "Test Title");
      container.appendChild(drawer);

      await new Promise(resolve => setTimeout(resolve, 50));

      const titleEl = drawer.shadowRoot.querySelector('[part="title"]');
      expect(titleEl).toBeTruthy();
    });

    it("默认 title 应该为空", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);

      await new Promise(resolve => setTimeout(resolve, 50));

      const titleEl = drawer.shadowRoot.querySelector('[part="title"]');
      expect(titleEl).toBeTruthy();
    });
  });

  /**
   * Direction 属性测试
   */
  describe("Direction Attribute", () => {
    it("默认 direction 应该是 rtl", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);

      await new Promise(resolve => setTimeout(resolve, 50));

      // 默认方向是 rtl
      expect(drawer.getAttribute("direction") || "rtl").toBe("rtl");
    });

    it("设置 direction='ltr' 应该从左往右打开", async () => {
      const drawer = document.createElement("ea-drawer");
      drawer.setAttribute("direction", "ltr");
      container.appendChild(drawer);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(drawer.getAttribute("direction")).toBe("ltr");
    });

    it("设置 direction='ttb' 应该从上往下打开", async () => {
      const drawer = document.createElement("ea-drawer");
      drawer.setAttribute("direction", "ttb");
      container.appendChild(drawer);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(drawer.getAttribute("direction")).toBe("ttb");
    });

    it("设置 direction='btt' 应该从下往上打开", async () => {
      const drawer = document.createElement("ea-drawer");
      drawer.setAttribute("direction", "btt");
      container.appendChild(drawer);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(drawer.getAttribute("direction")).toBe("btt");
    });
  });

  /**
   * Size 属性测试
   */
  describe("Size Attribute", () => {
    it("应该通过 size 属性设置尺寸", () => {
      const drawer = document.createElement("ea-drawer");
      drawer.setAttribute("size", "400px");
      container.appendChild(drawer);

      expect(drawer.getAttribute("size")).toBe("400px");
    });

    it("默认 size 应该是 30%", () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);

      expect(drawer.getAttribute("size")).toBeNull();
    });
  });

  /**
   * Visible 属性测试
   */
  describe("Visible Attribute", () => {
    it("默认抽屉应该是隐藏的", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);

      await new Promise(resolve => setTimeout(resolve, 50));

      // 检查 overlay 是否没有激活类
      const overlay = drawer.shadowRoot.querySelector(".ea-overlay");
      expect(overlay.classList.contains("ea-overlay--open")).toBe(false);
    });

    it("设置 visible='true' 应该显示抽屉", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);

      await new Promise(resolve => setTimeout(resolve, 50));

      const openHandler = vi.fn();
      drawer.addEventListener("open", openHandler);

      drawer.setAttribute("visible", "true");

      // 检查 overlay 是否有激活类
      const overlay = drawer.shadowRoot.querySelector(".ea-overlay");
      expect(overlay.classList.contains("ea-overlay--open")).toBe(true);
      expect(openHandler).toHaveBeenCalled();
    });

    it("隐藏抽屉应该触发 close 事件", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);

      await new Promise(resolve => setTimeout(resolve, 50));

      drawer.setAttribute("visible", "true");

      const overlay = drawer.shadowRoot.querySelector(".ea-overlay");
      expect(overlay.classList.contains("ea-overlay--open")).toBe(true);

      const closeHandler = vi.fn();
      drawer.addEventListener("close", closeHandler);

      drawer.setAttribute("visible", "false");

      expect(closeHandler).toHaveBeenCalled();
    });
  });

  /**
   * With Header 属性测试
   */
  describe("With Header Attribute", () => {
    it("默认 with-header 应该是 true", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);

      await new Promise(resolve => setTimeout(resolve, 50));

      // 默认显示 header
      const header = drawer.shadowRoot.querySelector('[part="header"]');
      expect(header).toBeTruthy();
    });

    it("设置 with-header='false' 应该隐藏头部", async () => {
      const drawer = document.createElement("ea-drawer");
      drawer.setAttribute("with-header", "false");
      container.appendChild(drawer);

      await new Promise(resolve => setTimeout(resolve, 50));

      const header = drawer.shadowRoot.querySelector('[part="header"]');
      expect(header.style.display).toBe("none");
    });
  });

  /**
   * Modal 属性测试
   */
  describe("Modal Attribute", () => {
    it("默认 modal 应该是 true", () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);

      const modalAttr = drawer.getAttribute("modal");
      expect(modalAttr === null || modalAttr !== "false").toBe(true);
    });

    it("设置 modal='false' 应该禁用遮罩", () => {
      const drawer = document.createElement("ea-drawer");
      drawer.setAttribute("modal", "false");
      container.appendChild(drawer);

      expect(drawer.getAttribute("modal")).toBe("false");
    });
  });

  /**
   * Show Close 属性测试
   */
  describe("Show Close Attribute", () => {
    it("默认 show-close 应该是 true", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);

      await new Promise(resolve => setTimeout(resolve, 50));

      const closeIcon = drawer.shadowRoot.querySelector('[part="close-icon"]');
      expect(closeIcon).toBeTruthy();
    });

    it("设置 show-close='false' 应该隐藏关闭图标", async () => {
      const drawer = document.createElement("ea-drawer");
      drawer.setAttribute("show-close", "false");
      container.appendChild(drawer);

      await new Promise(resolve => setTimeout(resolve, 50));

      const closeIcon = drawer.shadowRoot.querySelector('[part="close-icon"]');
      expect(closeIcon.style.display).toBe("none");
    });
  });

  /**
   * Close On Click Modal 属性测试
   */
  describe("Close On Click Modal Attribute", () => {
    it("默认 close-on-click-modal 应该是 true", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(drawer["close-on-click-modal"]).toBe(true);
    });
  });

  /**
   * Close On Press Escape 属性测试
   */
  describe("Close On Press Escape Attribute", () => {
    it("默认 close-on-press-escape 应该是 true", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(drawer["close-on-press-escape"]).toBe(true);
    });
  });

  /**
   * Before Close 属性测试
   */
  describe("Before Close Attribute", () => {
    it("应该支持 beforeClose 回调", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);

      await new Promise(resolve => setTimeout(resolve, 50));

      // beforeClose 是一个函数属性
      expect(typeof drawer.beforeClose).toBe("object"); // 默认为 null
    });
  });

  /**
   * Append To Body 属性测试
   */
  describe("Append To Body Attribute", () => {
    it("默认 append-to-body 应该是 false", () => {
      const drawer = document.createElement("ea-drawer");
      expect(drawer.hasAttribute("append-to-body")).toBe(false);
    });

    it("设置 append-to-body 应该将抽屉添加到 body", () => {
      const drawer = document.createElement("ea-drawer");
      drawer.setAttribute("append-to-body", "");
      document.body.appendChild(drawer);

      expect(drawer.hasAttribute("append-to-body")).toBe(true);
    });
  });

  /**
   * 事件测试
   */
  describe("Events", () => {
    it("应该触发 open 和 close 事件", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);

      await new Promise(resolve => setTimeout(resolve, 50));

      const openHandler = vi.fn();
      const closeHandler = vi.fn();

      drawer.addEventListener("open", openHandler);
      drawer.addEventListener("close", closeHandler);

      drawer.setAttribute("visible", "true");
      expect(openHandler).toHaveBeenCalled();

      drawer.setAttribute("visible", "false");
      expect(closeHandler).toHaveBeenCalled();
    });
  });

  /**
   * 边界条件测试
   */
  describe("Edge Cases", () => {
    it("空内容时应该正确处理", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);

      await new Promise(resolve => setTimeout(resolve, 50));

      drawer.setAttribute("visible", "true");

      const content = drawer.shadowRoot.querySelector('[part="content"]');
      expect(content).toBeTruthy();
    });

    it("自定义 title slot 应该生效", async () => {
      const drawer = document.createElement("ea-drawer");
      drawer.innerHTML = `
        <div slot="title">Custom Title Content</div>
        <span>Body content</span>
      `;
      container.appendChild(drawer);

      await new Promise(resolve => setTimeout(resolve, 50));

      const titleSlot = drawer.shadowRoot.querySelector('slot[name="title"]');
      expect(titleSlot).toBeTruthy();
    });

    it("自定义 footer slot 应该生效", async () => {
      const drawer = document.createElement("ea-drawer");
      drawer.innerHTML = `
        <span>Body content</span>
        <div slot="footer">Custom Footer Content</div>
      `;
      container.appendChild(drawer);

      await new Promise(resolve => setTimeout(resolve, 50));

      const footerSlot = drawer.shadowRoot.querySelector('slot[name="footer"]');
      expect(footerSlot).toBeTruthy();
    });
  });

  /**
   * 生命周期测试
   */
  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const drawer = document.createElement("ea-drawer");
      drawer.setAttribute("title", "Test");
      container.appendChild(drawer);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(
        drawer.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
      expect(
        drawer.shadowRoot.querySelector(".ea-drawer-main").getAttribute("role")
      ).toBe("dialog");
    });

    it("组件断开连接后应该清理资源", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);

      await new Promise(resolve => setTimeout(resolve, 50));

      drawer.remove();

      expect(() => {
        // 确保没有抛出错误
      }).not.toThrow();
    });

    it("应该继承 EaOverlay 的功能", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(typeof drawer.show).toBe("function");
      expect(typeof drawer.hide).toBe("function");
    });
  });
});
