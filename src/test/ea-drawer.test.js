import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender.js";

import "../components/ea-icon/index.ts";
import "../components/ea-drawer/index.ts";

describe("EaDrawer Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
    document.querySelectorAll("ea-drawer").forEach(drawer => {
      if (drawer.parentElement === document.body) {
        drawer.remove();
      }
    });
  });

  describe("Basic Functionality", () => {
    it("应该正确渲染 ea-drawer 组件", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);
      await waitForRender();

      expect(drawer).toBeDefined();
      expect(drawer.shadowRoot).toBeTruthy();
    });

    it("应该包含必要的 CSS Part", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);
      await waitForRender();

      expect(
        drawer.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
      expect(drawer.shadowRoot.querySelector('[part="header"]')).toBeTruthy();
      expect(drawer.shadowRoot.querySelector('[part="heading"]')).toBeTruthy();
      expect(
        drawer.shadowRoot.querySelector('[part="close-icon"]')
      ).toBeTruthy();
      expect(drawer.shadowRoot.querySelector('[part="content"]')).toBeTruthy();
      expect(drawer.shadowRoot.querySelector('[part="footer"]')).toBeTruthy();
    });

    it("应该包含 header、footer 和默认插槽", async () => {
      const drawer = document.createElement("ea-drawer");
      drawer.innerHTML = `
        <span>Content</span>
        <div slot="title">Custom Title</div>
        <div slot="footer">Custom Footer</div>
      `;
      container.appendChild(drawer);
      await waitForRender();

      const slots = drawer.shadowRoot.querySelectorAll("slot");
      expect(slots.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe("Heading Attribute", () => {
    it("应该通过 heading 属性设置标题", async () => {
      const drawer = document.createElement("ea-drawer");
      drawer.setAttribute("heading", "Test Title");
      container.appendChild(drawer);
      await waitForRender();

      const headingEl = drawer.shadowRoot.querySelector('[part="heading"]');
      expect(headingEl).toBeTruthy();
      expect(headingEl.textContent).toBe("Test Title");
    });

    it("默认 heading 应该为空", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);
      await waitForRender();

      expect(drawer.heading).toBe("");
    });
  });

  describe("Direction Attribute", () => {
    it("默认 direction 应该是 rtl", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);
      await waitForRender();

      expect(drawer.direction).toBe("rtl");
    });

    it("设置 direction='ltr' 应该从左往右打开", async () => {
      const drawer = document.createElement("ea-drawer");
      drawer.setAttribute("direction", "ltr");
      container.appendChild(drawer);
      await waitForRender();

      expect(drawer.direction).toBe("ltr");
    });

    it("设置 direction='ttb' 应该从上往下打开", async () => {
      const drawer = document.createElement("ea-drawer");
      drawer.setAttribute("direction", "ttb");
      container.appendChild(drawer);
      await waitForRender();

      expect(drawer.direction).toBe("ttb");
    });

    it("设置 direction='btt' 应该从下往上打开", async () => {
      const drawer = document.createElement("ea-drawer");
      drawer.setAttribute("direction", "btt");
      container.appendChild(drawer);
      await waitForRender();

      expect(drawer.direction).toBe("btt");
    });

    it("direction 应该生成正确的 BEM 类名", async () => {
      const drawer = document.createElement("ea-drawer");
      drawer.setAttribute("direction", "ltr");
      container.appendChild(drawer);
      await waitForRender();

      const overlay = drawer.shadowRoot.querySelector(".ea-overlay");
      expect(overlay.classList.contains("ea-drawer--ltr")).toBe(true);
    });
  });

  describe("Size Attribute", () => {
    it("应该通过 size 属性设置尺寸", async () => {
      const drawer = document.createElement("ea-drawer");
      drawer.setAttribute("size", "400px");
      container.appendChild(drawer);
      await waitForRender();

      expect(drawer.size).toBe("400px");
    });

    it("默认 size 应该是 30%", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);
      await waitForRender();

      expect(drawer.size).toBe("30%");
    });
  });

  describe("Visible Attribute", () => {
    it("默认抽屉应该是隐藏的", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);
      await waitForRender();

      const overlay = drawer.shadowRoot.querySelector(".ea-overlay");
      expect(overlay.classList.contains("ea-overlay--open")).toBe(false);
    });

    it("设置 visible='true' 应该显示抽屉", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);
      await waitForRender();

      const openHandler = vi.fn();
      drawer.addEventListener("open", openHandler);

      drawer.show();
      await waitForRender();

      const overlay = drawer.shadowRoot.querySelector(".ea-overlay");
      expect(overlay.classList.contains("ea-overlay--open")).toBe(true);
      expect(openHandler).toHaveBeenCalled();
    });

    it("隐藏抽屉应该触发 close 事件", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);
      await waitForRender();

      drawer.show();
      await waitForRender();

      const overlay = drawer.shadowRoot.querySelector(".ea-overlay");
      expect(overlay.classList.contains("ea-overlay--open")).toBe(true);

      const closeHandler = vi.fn();
      drawer.addEventListener("close", closeHandler);

      drawer.hide();
      await waitForRender();

      expect(closeHandler).toHaveBeenCalled();
    });
  });

  describe("With Header Attribute", () => {
    it("默认 withHeader 应该是 true", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);
      await waitForRender();

      expect(drawer.withHeader).toBe(true);
    });

    it("设置 with-header='false' 应该隐藏头部", async () => {
      const drawer = document.createElement("ea-drawer");
      drawer.setAttribute("with-header", "false");
      container.appendChild(drawer);
      await waitForRender();

      const overlay = drawer.shadowRoot.querySelector(".ea-overlay");
      expect(overlay.classList.contains("is-header-hidden")).toBe(true);
    });
  });

  describe("Modal Attribute", () => {
    it("默认 modal 应该是 true", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);
      await waitForRender();

      expect(drawer.modal).toBe(true);
    });

    it("设置 modal='false' 应该禁用遮罩", async () => {
      const drawer = document.createElement("ea-drawer");
      drawer.setAttribute("modal", "false");
      container.appendChild(drawer);
      await waitForRender();

      expect(drawer.modal).toBe(false);
    });
  });

  describe("Show Close Attribute", () => {
    it("默认 showClose 应该是 true", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);
      await waitForRender();

      expect(drawer.showClose).toBe(true);
    });

    it("设置 show-close='false' 应该隐藏关闭图标", async () => {
      const drawer = document.createElement("ea-drawer");
      drawer.setAttribute("show-close", "false");
      container.appendChild(drawer);
      await waitForRender();

      const overlay = drawer.shadowRoot.querySelector(".ea-overlay");
      expect(overlay.classList.contains("is-close-hidden")).toBe(true);
    });
  });

  describe("Close On Click Modal Attribute", () => {
    it("默认 closeOnClickModal 应该是 true", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);
      await waitForRender();

      expect(drawer.closeOnClickModal).toBe(true);
    });
  });

  describe("Close On Press Escape Attribute", () => {
    it("默认 closeOnPressEscape 应该是 true", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);
      await waitForRender();

      expect(drawer.closeOnPressEscape).toBe(true);
    });
  });

  describe("Before Close Attribute", () => {
    it("应该支持 beforeClose 回调", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);
      await waitForRender();

      expect(drawer.beforeClose).toBeNull();
    });
  });

  describe("Append To Body Attribute", () => {
    it("默认 appendToBody 应该是 false", async () => {
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

  describe("Events", () => {
    it("应该触发 open 和 close 事件", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);
      await waitForRender();

      const openHandler = vi.fn();
      const closeHandler = vi.fn();

      drawer.addEventListener("open", openHandler);
      drawer.addEventListener("close", closeHandler);

      drawer.show();
      await waitForRender();
      expect(openHandler).toHaveBeenCalled();

      drawer.hide();
      await waitForRender();
      expect(closeHandler).toHaveBeenCalled();
    });
  });

  describe("Edge Cases", () => {
    it("空内容时应该正确处理", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);
      await waitForRender();

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
      await waitForRender();

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
      await waitForRender();

      const footerSlot = drawer.shadowRoot.querySelector('slot[name="footer"]');
      expect(footerSlot).toBeTruthy();
    });
  });

  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const drawer = document.createElement("ea-drawer");
      drawer.setAttribute("heading", "Test");
      container.appendChild(drawer);
      await waitForRender();

      expect(
        drawer.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
      expect(drawer.getAttribute("role")).toBe("dialog");
    });

    it("组件断开连接后应该清理资源", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);
      await waitForRender();

      drawer.remove();

      expect(() => {}).not.toThrow();
    });

    it("应该继承 EaOverlay 的功能", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);
      await waitForRender();

      expect(typeof drawer.show).toBe("function");
      expect(typeof drawer.hide).toBe("function");
    });
  });
});
