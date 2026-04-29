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

    it("应该包含遮罩层相关结构", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);
      await waitForRender();

      expect(drawer.shadowRoot.querySelector(".ea-overlay")).toBeTruthy();
      expect(drawer.shadowRoot.querySelector(".ea-overlay__mask")).toBeTruthy();
      expect(
        drawer.shadowRoot.querySelector(".ea-overlay__content")
      ).toBeTruthy();
    });

    it("应该包含抽屉主体结构", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);
      await waitForRender();

      expect(drawer.shadowRoot.querySelector(".ea-drawer-main")).toBeTruthy();
      expect(
        drawer.shadowRoot.querySelector(".ea-drawer-main__header")
      ).toBeTruthy();
      expect(
        drawer.shadowRoot.querySelector(".ea-drawer-main__heading")
      ).toBeTruthy();
      expect(
        drawer.shadowRoot.querySelector(".ea-drawer-main__close-icon")
      ).toBeTruthy();
      expect(
        drawer.shadowRoot.querySelector(".ea-drawer-main__content")
      ).toBeTruthy();
      expect(
        drawer.shadowRoot.querySelector(".ea-drawer-main__footer")
      ).toBeTruthy();
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
      const headingEl = drawer.shadowRoot.querySelector('[part="heading"]');
      expect(headingEl.textContent).toBe("");
    });

    it("动态修改 heading 应该更新标题文本", async () => {
      const drawer = document.createElement("ea-drawer");
      drawer.setAttribute("heading", "Initial Title");
      container.appendChild(drawer);
      await waitForRender();

      expect(drawer.heading).toBe("Initial Title");

      drawer.setAttribute("heading", "Updated Title");
      await waitForRender();

      expect(drawer.heading).toBe("Updated Title");
      const headingEl = drawer.shadowRoot.querySelector('[part="heading"]');
      expect(headingEl.textContent).toBe("Updated Title");
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

    it("设置 direction='rtl' 应该从右往左打开", async () => {
      const drawer = document.createElement("ea-drawer");
      drawer.setAttribute("direction", "rtl");
      container.appendChild(drawer);
      await waitForRender();

      expect(drawer.direction).toBe("rtl");
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

    it("direction='ltr' 应该生成正确的 BEM 类名", async () => {
      const drawer = document.createElement("ea-drawer");
      drawer.setAttribute("direction", "ltr");
      container.appendChild(drawer);
      await waitForRender();

      const overlay = drawer.shadowRoot.querySelector(".ea-overlay");
      expect(overlay.classList.contains("ea-drawer--ltr")).toBe(true);
    });

    it("direction='rtl' 应该生成正确的 BEM 类名", async () => {
      const drawer = document.createElement("ea-drawer");
      drawer.setAttribute("direction", "rtl");
      container.appendChild(drawer);
      await waitForRender();

      const overlay = drawer.shadowRoot.querySelector(".ea-overlay");
      expect(overlay.classList.contains("ea-drawer--rtl")).toBe(true);
    });

    it("direction='ttb' 应该生成正确的 BEM 类名", async () => {
      const drawer = document.createElement("ea-drawer");
      drawer.setAttribute("direction", "ttb");
      container.appendChild(drawer);
      await waitForRender();

      const overlay = drawer.shadowRoot.querySelector(".ea-overlay");
      expect(overlay.classList.contains("ea-drawer--ttb")).toBe(true);
    });

    it("direction='btt' 应该生成正确的 BEM 类名", async () => {
      const drawer = document.createElement("ea-drawer");
      drawer.setAttribute("direction", "btt");
      container.appendChild(drawer);
      await waitForRender();

      const overlay = drawer.shadowRoot.querySelector(".ea-overlay");
      expect(overlay.classList.contains("ea-drawer--btt")).toBe(true);
    });

    it("动态修改 direction 应该更新 BEM 类名", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);
      await waitForRender();

      const overlay = drawer.shadowRoot.querySelector(".ea-overlay");
      expect(overlay.classList.contains("ea-drawer--rtl")).toBe(true);

      drawer.setAttribute("direction", "ltr");
      await waitForRender();

      expect(overlay.classList.contains("ea-drawer--rtl")).toBe(false);
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

    it("动态修改 size 应该更新 CSS 变量", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);
      await waitForRender();

      drawer.setAttribute("size", "50%");
      await waitForRender();

      expect(drawer.size).toBe("50%");
      expect(drawer.style.getPropertyValue("--ea-drawer-size")).toBe("50%");
    });

    it("size 支持像素值", async () => {
      const drawer = document.createElement("ea-drawer");
      drawer.setAttribute("size", "500px");
      container.appendChild(drawer);
      await waitForRender();

      expect(drawer.size).toBe("500px");
      expect(drawer.style.getPropertyValue("--ea-drawer-size")).toBe("500px");
    });
  });

  describe("Visible Attribute", () => {
    it("默认抽屉应该是隐藏的", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);
      await waitForRender();

      expect(drawer.visible).toBe(false);
      const overlay = drawer.shadowRoot.querySelector(".ea-overlay");
      expect(overlay.classList.contains("ea-overlay--open")).toBe(false);
    });

    it("调用 show() 方法应该显示抽屉", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);
      await waitForRender();

      const openHandler = vi.fn();
      drawer.addEventListener("open", openHandler);

      drawer.show();
      await waitForRender();

      expect(drawer.visible).toBe(true);
      expect(openHandler).toHaveBeenCalled();
    });

    it("调用 hide() 方法应该隐藏抽屉", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);
      await waitForRender();

      drawer.show();
      await waitForRender();

      expect(drawer.visible).toBe(true);

      const closeHandler = vi.fn();
      drawer.addEventListener("close", closeHandler);

      drawer.hide();
      await waitForRender();

      expect(closeHandler).toHaveBeenCalled();
    });

    it("通过 visible 属性控制显示", async () => {
      const drawer = document.createElement("ea-drawer");
      drawer.setAttribute("visible", "");
      container.appendChild(drawer);
      await waitForRender();

      expect(drawer.visible).toBe(true);
    });

    it("多次显示/隐藏应该正常工作", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);
      await waitForRender();

      drawer.show();
      expect(drawer.visible).toBe(true);

      drawer.hide();
      expect(drawer.visible).toBe(false);

      drawer.show();
      expect(drawer.visible).toBe(true);

      drawer.hide();
      expect(drawer.visible).toBe(false);
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

      expect(drawer.withHeader).toBe(false);
    });

    it("withHeader 为 false 时应该添加 is-header-hidden 状态类", async () => {
      const drawer = document.createElement("ea-drawer");
      drawer.setAttribute("with-header", "false");
      container.appendChild(drawer);
      await waitForRender();

      const overlay = drawer.shadowRoot.querySelector(".ea-overlay");
      expect(overlay.classList.contains("is-header-hidden")).toBe(true);
    });

    it("withHeader 为 true 时不应该添加 is-header-hidden 状态类", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);
      await waitForRender();

      const overlay = drawer.shadowRoot.querySelector(".ea-overlay");
      expect(overlay.classList.contains("is-header-hidden")).toBe(false);
    });

    it("动态修改 withHeader 应该更新状态类", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);
      await waitForRender();

      const overlay = drawer.shadowRoot.querySelector(".ea-overlay");
      expect(overlay.classList.contains("is-header-hidden")).toBe(false);

      drawer.setAttribute("with-header", "false");
      await waitForRender();

      expect(overlay.classList.contains("is-header-hidden")).toBe(true);

      drawer.setAttribute("with-header", "true");
      await waitForRender();

      expect(overlay.classList.contains("is-header-hidden")).toBe(false);
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

      expect(drawer.showClose).toBe(false);
    });

    it("showClose 为 false 时应该添加 is-close-hidden 状态类", async () => {
      const drawer = document.createElement("ea-drawer");
      drawer.setAttribute("show-close", "false");
      container.appendChild(drawer);
      await waitForRender();

      const overlay = drawer.shadowRoot.querySelector(".ea-overlay");
      expect(overlay.classList.contains("is-close-hidden")).toBe(true);
    });

    it("showClose 为 true 时不应该添加 is-close-hidden 状态类", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);
      await waitForRender();

      const overlay = drawer.shadowRoot.querySelector(".ea-overlay");
      expect(overlay.classList.contains("is-close-hidden")).toBe(false);
    });

    it("动态修改 showClose 应该更新状态类", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);
      await waitForRender();

      const overlay = drawer.shadowRoot.querySelector(".ea-overlay");
      expect(overlay.classList.contains("is-close-hidden")).toBe(false);

      drawer.setAttribute("show-close", "false");
      await waitForRender();

      expect(overlay.classList.contains("is-close-hidden")).toBe(true);

      drawer.setAttribute("show-close", "true");
      await waitForRender();

      expect(overlay.classList.contains("is-close-hidden")).toBe(false);
    });
  });

  describe("Close Icon Click", () => {
    it("点击关闭图标应该隐藏抽屉", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);
      await waitForRender();

      drawer.show();
      await waitForRender();

      expect(drawer.visible).toBe(true);

      const closeIcon = drawer.shadowRoot.querySelector(
        ".ea-drawer-main__close-icon"
      );
      closeIcon.click();

      await waitForRender();

      expect(drawer.visible).toBe(false);
    });

    it("showClose 为 false 时点击关闭图标不应该关闭抽屉", async () => {
      const drawer = document.createElement("ea-drawer");
      drawer.setAttribute("show-close", "false");
      container.appendChild(drawer);
      await waitForRender();

      drawer.show();
      await waitForRender();

      expect(drawer.visible).toBe(true);

      const closeIcon = drawer.shadowRoot.querySelector(
        ".ea-drawer-main__close-icon"
      );
      closeIcon.click();

      await waitForRender();

      expect(drawer.visible).toBe(true);
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

    it("modal 为 true 时应该添加 is-modal 状态类", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);
      await waitForRender();

      const overlay = drawer.shadowRoot.querySelector(".ea-overlay");
      expect(overlay.classList.contains("is-modal")).toBe(true);
    });

    it("modal 为 false 时不应该添加 is-modal 状态类", async () => {
      const drawer = document.createElement("ea-drawer");
      drawer.setAttribute("modal", "false");
      container.appendChild(drawer);
      await waitForRender();

      const overlay = drawer.shadowRoot.querySelector(".ea-overlay");
      expect(overlay.classList.contains("is-modal")).toBe(false);
    });
  });

  describe("Close On Click Modal Attribute", () => {
    it("默认 closeOnClickModal 应该是 true", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);
      await waitForRender();

      expect(drawer.closeOnClickModal).toBe(true);
    });

    it("设置 close-on-click-modal='false' 应该禁用点击遮罩关闭", async () => {
      const drawer = document.createElement("ea-drawer");
      drawer.setAttribute("close-on-click-modal", "false");
      container.appendChild(drawer);
      await waitForRender();

      expect(drawer.closeOnClickModal).toBe(false);
    });

    it("点击遮罩层应该关闭抽屉（closeOnClickModal 为 true）", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);
      await waitForRender();

      drawer.show();
      await waitForRender();

      expect(drawer.visible).toBe(true);

      const mask = drawer.shadowRoot.querySelector(".ea-overlay__mask");
      mask.click();

      await waitForRender();

      expect(drawer.visible).toBe(false);
    });

    it("点击遮罩层不应该关闭抽屉（closeOnClickModal 为 false）", async () => {
      const drawer = document.createElement("ea-drawer");
      drawer.setAttribute("close-on-click-modal", "false");
      container.appendChild(drawer);
      await waitForRender();

      drawer.show();
      await waitForRender();

      expect(drawer.visible).toBe(true);

      const mask = drawer.shadowRoot.querySelector(".ea-overlay__mask");
      mask.click();

      await waitForRender();

      expect(drawer.visible).toBe(true);
    });
  });

  describe("Close On Press Escape Attribute", () => {
    it("默认 closeOnPressEscape 应该是 true", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);
      await waitForRender();

      expect(drawer.closeOnPressEscape).toBe(true);
    });

    it("设置 close-on-press-escape='false' 应该禁用 ESC 关闭", async () => {
      const drawer = document.createElement("ea-drawer");
      drawer.setAttribute("close-on-press-escape", "false");
      container.appendChild(drawer);
      await waitForRender();

      expect(drawer.closeOnPressEscape).toBe(false);
    });

    it("按 ESC 键应该关闭抽屉（closeOnPressEscape 为 true）", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);
      await waitForRender();

      drawer.show();
      await waitForRender();

      expect(drawer.visible).toBe(true);

      const escapeEvent = new KeyboardEvent("keydown", {
        key: "Escape",
        bubbles: true,
      });
      document.dispatchEvent(escapeEvent);

      await waitForRender();

      expect(drawer.visible).toBe(false);
    });

    it("按 ESC 键不应该关闭抽屉（closeOnPressEscape 为 false）", async () => {
      const drawer = document.createElement("ea-drawer");
      drawer.setAttribute("close-on-press-escape", "false");
      container.appendChild(drawer);
      await waitForRender();

      drawer.show();
      await waitForRender();

      expect(drawer.visible).toBe(true);

      const escapeEvent = new KeyboardEvent("keydown", {
        key: "Escape",
        bubbles: true,
      });
      document.dispatchEvent(escapeEvent);

      await waitForRender();

      expect(drawer.visible).toBe(true);
    });
  });

  describe("Append To Body Attribute", () => {
    it("默认 appendToBody 应该是 false", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);
      await waitForRender();

      expect(drawer.appendToBody).toBe(false);
    });

    it("设置 append-to-body 应该为 true", async () => {
      const drawer = document.createElement("ea-drawer");
      drawer.setAttribute("append-to-body", "");
      container.appendChild(drawer);
      await waitForRender();

      expect(drawer.appendToBody).toBe(true);
    });

    it("设置 append-to-body 应该将抽屉添加到 body", async () => {
      const drawer = document.createElement("ea-drawer");
      drawer.setAttribute("append-to-body", "");
      container.appendChild(drawer);
      await waitForRender();

      expect(drawer.parentElement).toBe(document.body);
      drawer.remove();
    });
  });

  describe("Append To Attribute", () => {
    it("默认 appendTo 应该是 body", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);
      await waitForRender();

      expect(drawer.appendTo).toBe("body");
    });

    it("应该支持自定义 append-to 选择器", async () => {
      const customContainer = document.createElement("div");
      customContainer.id = "custom-drawer-container";
      document.body.appendChild(customContainer);

      const drawer = document.createElement("ea-drawer");
      drawer.setAttribute("append-to", "#custom-drawer-container");
      container.appendChild(drawer);
      await waitForRender();

      expect(drawer.appendTo).toBe("#custom-drawer-container");
      expect(drawer.parentElement).toBe(customContainer);

      customContainer.remove();
    });

    it("动态修改 append-to 应该将抽屉移动到新的容器", async () => {
      const customContainer = document.createElement("div");
      customContainer.id = "dynamic-drawer-container";
      document.body.appendChild(customContainer);

      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);
      await waitForRender();

      expect(drawer.parentElement).toBe(container);

      drawer.setAttribute("append-to", "#dynamic-drawer-container");
      await waitForRender();

      expect(drawer.parentElement).toBe(customContainer);

      customContainer.remove();
    });

    it("appendTo 优先级高于 appendToBody", async () => {
      const customContainer = document.createElement("div");
      customContainer.id = "priority-drawer-container";
      document.body.appendChild(customContainer);

      const drawer = document.createElement("ea-drawer");
      drawer.setAttribute("append-to", "#priority-drawer-container");
      drawer.setAttribute("append-to-body", "");
      container.appendChild(drawer);
      await waitForRender();

      expect(drawer.parentElement).toBe(customContainer);

      customContainer.remove();
    });
  });

  describe("Before Close Property", () => {
    it("默认 beforeClose 应该是 null", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);
      await waitForRender();

      expect(drawer.beforeClose).toBeNull();
    });

    it("设置 beforeClose 回调函数应该拦截关闭过渡", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);
      await waitForRender();

      drawer.show();
      await waitForRender();

      expect(drawer.visible).toBe(true);

      let doneCalled = false;
      drawer.beforeClose = done => {
        doneCalled = true;
        done();
      };

      drawer.hide();
      await waitForRender();

      expect(doneCalled).toBe(true);
    });

    it("beforeClose 回调执行 done 后应该关闭抽屉", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);
      await waitForRender();

      drawer.show();
      await waitForRender();

      expect(drawer.visible).toBe(true);

      drawer.beforeClose = done => {
        done();
      };

      drawer.hide();
      await waitForRender();

      expect(drawer.visible).toBe(false);
    });

    it("beforeClose 不调用 done 时应该阻止关闭", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);
      await waitForRender();

      drawer.show();
      await waitForRender();

      expect(drawer.visible).toBe(true);

      drawer.beforeClose = () => {};

      drawer.hide();
      await waitForRender();

      expect(drawer.visible).toBe(true);
    });
  });

  describe("Events", () => {
    it("应该触发 open 事件", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);
      await waitForRender();

      const openHandler = vi.fn();
      drawer.addEventListener("open", openHandler);

      drawer.show();
      await waitForRender();

      expect(openHandler).toHaveBeenCalled();
    });

    it("应该触发 close 事件", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);
      await waitForRender();

      drawer.show();
      await waitForRender();

      const closeHandler = vi.fn();
      drawer.addEventListener("close", closeHandler);

      drawer.hide();
      await waitForRender();

      expect(closeHandler).toHaveBeenCalled();
    });

    it("应该触发 opened 事件（动画结束后）", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);
      await waitForRender();

      const openedHandler = vi.fn();
      drawer.addEventListener("opened", openedHandler);

      drawer.show();

      await new Promise(resolve => requestAnimationFrame(resolve));
      await waitForRender();

      const overlayContainer = drawer.shadowRoot.querySelector(".ea-overlay");
      overlayContainer.dispatchEvent(
        new Event("transitionend", { bubbles: true })
      );

      await waitForRender();

      expect(openedHandler).toHaveBeenCalled();
    });

    it("应该触发 closed 事件（动画结束后）", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);
      await waitForRender();

      drawer.show();
      await waitForRender();

      const closedHandler = vi.fn();
      drawer.addEventListener("closed", closedHandler);

      drawer.visible = false;
      await waitForRender();

      const overlayContainer = drawer.shadowRoot.querySelector(".ea-overlay");
      overlayContainer.dispatchEvent(
        new Event("transitionend", { bubbles: true })
      );

      await waitForRender();

      expect(closedHandler).toHaveBeenCalled();
    });

    it("open 和 close 事件应该正确触发", async () => {
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

      drawer.show();

      const content = drawer.shadowRoot.querySelector('[part="content"]');
      expect(content).toBeTruthy();
    });

    it("没有 heading 时应该显示空标题", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);
      await waitForRender();

      const headingEl = drawer.shadowRoot.querySelector('[part="heading"]');
      expect(headingEl.textContent).toBe("");
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

    it("同时设置多个属性应该正确工作", async () => {
      const drawer = document.createElement("ea-drawer");
      drawer.setAttribute("heading", "Multi Props");
      drawer.setAttribute("direction", "ltr");
      drawer.setAttribute("size", "400px");
      drawer.setAttribute("with-header", "false");
      drawer.setAttribute("modal", "false");
      container.appendChild(drawer);
      await waitForRender();

      expect(drawer.heading).toBe("Multi Props");
      expect(drawer.direction).toBe("ltr");
      expect(drawer.size).toBe("400px");
      expect(drawer.withHeader).toBe(false);
      expect(drawer.modal).toBe(false);
    });

    it("点击抽屉内容区域不应该关闭（closeOnClickModal 为 true）", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);
      await waitForRender();

      drawer.show();
      await waitForRender();

      expect(drawer.visible).toBe(true);

      const drawerContent = drawer.shadowRoot.querySelector(".ea-drawer-main");
      drawerContent.click();

      await waitForRender();

      expect(drawer.visible).toBe(true);
    });

    it("withHeader 为 false 且 showClose 为 true 时的组合应该正确", async () => {
      const drawer = document.createElement("ea-drawer");
      drawer.setAttribute("with-header", "false");
      container.appendChild(drawer);
      await waitForRender();

      const overlay = drawer.shadowRoot.querySelector(".ea-overlay");
      expect(overlay.classList.contains("is-header-hidden")).toBe(true);
      expect(overlay.classList.contains("is-close-hidden")).toBe(false);
    });

    it("withHeader 为 false 且 showClose 为 false 时的组合应该正确", async () => {
      const drawer = document.createElement("ea-drawer");
      drawer.setAttribute("with-header", "false");
      drawer.setAttribute("show-close", "false");
      container.appendChild(drawer);
      await waitForRender();

      const overlay = drawer.shadowRoot.querySelector(".ea-overlay");
      expect(overlay.classList.contains("is-header-hidden")).toBe(true);
      expect(overlay.classList.contains("is-close-hidden")).toBe(true);
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

      expect(drawer.isConnected).toBe(false);
    });

    it("应该继承 EaOverlay 的功能", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);
      await waitForRender();

      expect(typeof drawer.show).toBe("function");
      expect(typeof drawer.hide).toBe("function");
    });

    it("应该继承 EaOverlay 的属性", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);
      await waitForRender();

      expect(drawer.visible).toBe(false);
      expect(drawer.modal).toBe(true);
      expect(drawer.closeOnClickModal).toBe(true);
      expect(drawer.closeOnPressEscape).toBe(true);
      expect(drawer.appendToBody).toBe(false);
      expect(drawer.appendTo).toBe("body");
    });

    it("应该继承 EaOverlay 的 CSS 变量属性", async () => {
      const drawer = document.createElement("ea-drawer");
      container.appendChild(drawer);
      await waitForRender();

      expect(drawer.zIndex).toBe("");
      expect(drawer.backgroundColor).toBe("");
      expect(drawer.contentWidth).toBe("");
      expect(drawer.contentHeight).toBe("");
    });
  });
});
