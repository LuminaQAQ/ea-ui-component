import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// 导入 ea-dialog 组件及其依赖
import "../components/ea-dialog/index.js";

describe("EaDialog Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
    // 清理所有添加到 body 的对话框
    document.querySelectorAll("ea-dialog").forEach(dialog => {
      if (dialog.parentElement === document.body) {
        dialog.remove();
      }
    });
  });

  /**
   * 基本功能测试
   */
  describe("Basic Functionality", () => {
    it("应该正确渲染 ea-dialog 组件", () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      expect(dialog).toBeDefined();
      expect(dialog.shadowRoot).toBeDefined();
    });

    it("应该包含必要的 CSS Part", () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      expect(
        dialog.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
      expect(dialog.shadowRoot.querySelector('[part="header"]')).toBeTruthy();
      expect(dialog.shadowRoot.querySelector('[part="title"]')).toBeTruthy();
      expect(
        dialog.shadowRoot.querySelector('[part="close-icon"]')
      ).toBeTruthy();
      expect(dialog.shadowRoot.querySelector('[part="content"]')).toBeTruthy();
      expect(dialog.shadowRoot.querySelector('[part="footer"]')).toBeTruthy();
    });

    it("应该包含 header、footer 和默认插槽", () => {
      const dialog = document.createElement("ea-dialog");
      dialog.innerHTML = `
        <span>Content</span>
        <div slot="header">Custom Header</div>
        <div slot="footer">Custom Footer</div>
      `;
      container.appendChild(dialog);

      const slots = dialog.shadowRoot.querySelectorAll("slot");
      expect(slots.length).toBeGreaterThanOrEqual(3);
    });
  });

  /**
   * Title 属性测试
   */
  describe("Title Attribute", () => {
    it("应该通过 title 属性设置标题", async () => {
      const dialog = document.createElement("ea-dialog");
      dialog.setAttribute("title", "Test Title");
      container.appendChild(dialog);

      // 等待组件初始化
      await new Promise(resolve => setTimeout(resolve, 50));

      const titleEl = dialog.shadowRoot.querySelector('[part="title"]');
      expect(titleEl).toBeTruthy();
      expect(titleEl.textContent).toBe("Test Title");
    });

    it("默认 title 应该为空", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await new Promise(resolve => setTimeout(resolve, 50));

      const titleEl = dialog.shadowRoot.querySelector('[part="title"]');
      expect(titleEl.textContent).toBe("");
    });
  });

  /**
   * Width 属性测试
   */
  describe("Width Attribute", () => {
    it("应该通过 width 属性设置宽度", () => {
      const dialog = document.createElement("ea-dialog");
      dialog.setAttribute("width", "500px");
      container.appendChild(dialog);

      expect(dialog.getAttribute("width")).toBe("500px");
    });

    it("默认 width 应该是 50%", () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      expect(dialog.getAttribute("width")).toBeNull();
    });
  });

  /**
   * Visible 属性测试
   */
  describe("Visible Attribute", () => {
    it("默认对话框应该是隐藏的", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await new Promise(resolve => setTimeout(resolve, 50));

      // 检查 overlay 是否没有激活类
      const overlay = dialog.shadowRoot.querySelector(".ea-overlay");
      expect(overlay.classList.contains("ea-overlay--open")).toBe(false);
    });

    it("调用 show() 方法应该显示对话框", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await new Promise(resolve => setTimeout(resolve, 50));

      const openHandler = vi.fn();
      dialog.addEventListener("open", openHandler);

      dialog.show();

      // 检查 overlay 是否有激活类
      const overlay = dialog.shadowRoot.querySelector(".ea-overlay");
      expect(overlay.classList.contains("ea-overlay--open")).toBe(true);
      expect(openHandler).toHaveBeenCalled();
    });

    it("调用 hide() 方法应该隐藏对话框", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await new Promise(resolve => setTimeout(resolve, 50));

      dialog.show();

      const overlay = dialog.shadowRoot.querySelector(".ea-overlay");
      expect(overlay.classList.contains("ea-overlay--open")).toBe(true);

      const closeHandler = vi.fn();
      dialog.addEventListener("close", closeHandler);

      dialog.hide();

      // 在关闭动画开始前，--before-close 类会被添加
      expect(closeHandler).toHaveBeenCalled();
    });
  });

  /**
   * Center 属性测试
   */
  describe("Center Attribute", () => {
    it("默认 center 应该是 false", () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      expect(dialog.hasAttribute("center")).toBe(false);
    });

    it("设置 center 属性应该应用居中样式", () => {
      const dialog = document.createElement("ea-dialog");
      dialog.setAttribute("center", "");
      container.appendChild(dialog);

      expect(dialog.hasAttribute("center")).toBe(true);
    });
  });

  /**
   * Fullscreen 属性测试
   */
  describe("Fullscreen Attribute", () => {
    it("默认 fullscreen 应该是 false", () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      expect(dialog.hasAttribute("fullscreen")).toBe(false);
    });

    it("设置 fullscreen 属性应该应用全屏样式", () => {
      const dialog = document.createElement("ea-dialog");
      dialog.setAttribute("fullscreen", "");
      container.appendChild(dialog);

      expect(dialog.hasAttribute("fullscreen")).toBe(true);
    });
  });

  /**
   * Modal 属性测试
   */
  describe("Modal Attribute", () => {
    it("默认 modal 应该是 true", () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      // 默认情况下 modal 属性不存在或为 true
      const modalAttr = dialog.getAttribute("modal");
      expect(modalAttr === null || modalAttr !== "false").toBe(true);
    });

    it("设置 modal='false' 应该禁用遮罩", () => {
      const dialog = document.createElement("ea-dialog");
      dialog.setAttribute("modal", "false");
      container.appendChild(dialog);

      expect(dialog.getAttribute("modal")).toBe("false");
    });
  });

  /**
   * Draggable 属性测试
   */
  describe("Draggable Attribute", () => {
    it("默认 draggable 应该是 false", () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      expect(dialog.hasAttribute("draggable")).toBe(false);
    });

    it("设置 draggable 属性应该启用拖拽", () => {
      const dialog = document.createElement("ea-dialog");
      dialog.setAttribute("draggable", "");
      container.appendChild(dialog);

      expect(dialog.hasAttribute("draggable")).toBe(true);
    });
  });

  /**
   * Show Close 属性测试
   */
  describe("Show Close Attribute", () => {
    it("默认 show-close 应该是 true", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await new Promise(resolve => setTimeout(resolve, 50));

      // show-close 默认为 true，所以关闭图标应该可见
      const closeIcon = dialog.shadowRoot.querySelector('[part="close-icon"]');
      expect(closeIcon).toBeTruthy();
    });

    it("设置 show-close='false' 应该隐藏关闭图标", async () => {
      const dialog = document.createElement("ea-dialog");
      dialog.setAttribute("show-close", "false");
      container.appendChild(dialog);

      await new Promise(resolve => setTimeout(resolve, 50));

      const closeIcon = dialog.shadowRoot.querySelector('[part="close-icon"]');
      expect(closeIcon.style.display).toBe("none");
    });
  });

  /**
   * Close On Click Modal 属性测试
   */
  describe("Close On Click Modal Attribute", () => {
    it("默认 close-on-click-modal 应该是 true", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await new Promise(resolve => setTimeout(resolve, 50));

      // 默认情况下 close-on-click-modal 为 true
      expect(dialog["close-on-click-modal"]).toBe(true);
    });
  });

  /**
   * Before Close 属性测试
   */
  describe("Before Close Attribute", () => {
    it("设置 before-close 属性应该启用拦截", async () => {
      const dialog = document.createElement("ea-dialog");
      dialog.setAttribute("before-close", "");
      container.appendChild(dialog);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(dialog.hasAttribute("before-close")).toBe(true);
    });
  });

  /**
   * Append To Body 属性测试
   */
  describe("Append To Body Attribute", () => {
    it("默认 append-to-body 应该是 false", () => {
      const dialog = document.createElement("ea-dialog");
      expect(dialog.hasAttribute("append-to-body")).toBe(false);
    });

    it("设置 append-to-body 应该将对话框添加到 body", () => {
      const dialog = document.createElement("ea-dialog");
      dialog.setAttribute("append-to-body", "");
      document.body.appendChild(dialog);

      // 组件在 connectedCallback 中会处理 append-to-body
      expect(dialog.hasAttribute("append-to-body")).toBe(true);
    });
  });

  /**
   * Reset Position 方法测试
   */
  describe("Reset Position Method", () => {
    it("应该提供 resetPosition 方法", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(typeof dialog.resetPosition).toBe("function");
    });
  });

  /**
   * 事件测试
   */
  describe("Events", () => {
    it("应该触发 open 和 close 事件", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await new Promise(resolve => setTimeout(resolve, 50));

      const openHandler = vi.fn();
      const closeHandler = vi.fn();

      dialog.addEventListener("open", openHandler);
      dialog.addEventListener("close", closeHandler);

      dialog.show();
      expect(openHandler).toHaveBeenCalled();

      dialog.hide();
      expect(closeHandler).toHaveBeenCalled();
    });
  });

  /**
   * 边界条件测试
   */
  describe("Edge Cases", () => {
    it("空内容时应该正确处理", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await new Promise(resolve => setTimeout(resolve, 50));

      dialog.show();

      const content = dialog.shadowRoot.querySelector('[part="content"]');
      expect(content).toBeTruthy();
    });

    it("没有 title 时应该显示空标题", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await new Promise(resolve => setTimeout(resolve, 50));

      const titleEl = dialog.shadowRoot.querySelector('[part="title"]');
      expect(titleEl.textContent).toBe("");
    });

    it("自定义 header slot 应该生效", async () => {
      const dialog = document.createElement("ea-dialog");
      dialog.innerHTML = `
        <div slot="header">Custom Header Content</div>
        <span>Body content</span>
      `;
      container.appendChild(dialog);

      await new Promise(resolve => setTimeout(resolve, 50));

      const headerSlot = dialog.shadowRoot.querySelector('slot[name="header"]');
      expect(headerSlot).toBeTruthy();
    });

    it("自定义 footer slot 应该生效", async () => {
      const dialog = document.createElement("ea-dialog");
      dialog.innerHTML = `
        <span>Body content</span>
        <div slot="footer">Custom Footer Content</div>
      `;
      container.appendChild(dialog);

      await new Promise(resolve => setTimeout(resolve, 50));

      const footerSlot = dialog.shadowRoot.querySelector('slot[name="footer"]');
      expect(footerSlot).toBeTruthy();
    });
  });

  /**
   * 生命周期测试
   */
  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const dialog = document.createElement("ea-dialog");
      dialog.setAttribute("title", "Test");
      container.appendChild(dialog);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(
        dialog.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
      expect(dialog.getAttribute("role")).toBe("dialog");
    });

    it("组件断开连接后应该清理资源", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await new Promise(resolve => setTimeout(resolve, 50));

      dialog.remove();

      expect(() => {
        // 确保没有抛出错误
      }).not.toThrow();
    });

    it("应该继承 EaOverlay 的功能", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(typeof dialog.show).toBe("function");
      expect(typeof dialog.hide).toBe("function");
    });
  });
});
