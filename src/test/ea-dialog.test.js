import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

import { waitForRender } from "./utils/waitForRender";

import "../components/ea-icon/index.ts";
import "../components/ea-dialog/index.ts";

describe("EaDialog", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
    document.querySelectorAll("ea-dialog").forEach(dialog => {
      if (dialog.parentElement === document.body) {
        dialog.remove();
      }
    });
  });

  describe("基本功能", () => {
    it("应该正确渲染组件", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await waitForRender();

      expect(dialog).toBeDefined();
      expect(dialog.shadowRoot).toBeTruthy();
    });

    it("应该包含必要的 CSS Part", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await waitForRender();

      expect(dialog.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
      expect(dialog.shadowRoot.querySelector('[part="header"]')).toBeTruthy();
      expect(dialog.shadowRoot.querySelector('[part="heading"]')).toBeTruthy();
      expect(dialog.shadowRoot.querySelector('[part="close-icon"]')).toBeTruthy();
      expect(dialog.shadowRoot.querySelector('[part="content"]')).toBeTruthy();
      expect(dialog.shadowRoot.querySelector('[part="footer"]')).toBeTruthy();
    });

    it("应该包含遮罩层相关结构", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await waitForRender();

      expect(dialog.shadowRoot.querySelector(".ea-overlay")).toBeTruthy();
      expect(dialog.shadowRoot.querySelector(".ea-overlay__mask")).toBeTruthy();
      expect(dialog.shadowRoot.querySelector(".ea-overlay__content")).toBeTruthy();
    });

    it("应该包含对话框主体结构", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await waitForRender();

      expect(dialog.shadowRoot.querySelector(".ea-dialog")).toBeTruthy();
      expect(dialog.shadowRoot.querySelector(".ea-dialog__header")).toBeTruthy();
      expect(dialog.shadowRoot.querySelector(".ea-dialog__heading")).toBeTruthy();
      expect(dialog.shadowRoot.querySelector(".ea-dialog__close-icon")).toBeTruthy();
      expect(dialog.shadowRoot.querySelector(".ea-dialog__content")).toBeTruthy();
      expect(dialog.shadowRoot.querySelector(".ea-dialog__footer")).toBeTruthy();
    });

    it("应该包含 header、footer 和默认插槽", async () => {
      const dialog = document.createElement("ea-dialog");
      dialog.innerHTML = `
        <span>Content</span>
        <div slot="header">Custom Header</div>
        <div slot="footer">Custom Footer</div>
      `;
      container.appendChild(dialog);

      await waitForRender();

      const slots = dialog.shadowRoot.querySelectorAll("slot");
      expect(slots.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe("heading 属性", () => {
    it("应该通过 heading 属性设置标题", async () => {
      const dialog = document.createElement("ea-dialog");
      dialog.setAttribute("heading", "Test Title");
      container.appendChild(dialog);

      await waitForRender();

      const headingEl = dialog.shadowRoot.querySelector('[part="heading"]');
      expect(headingEl).toBeTruthy();
      expect(headingEl.textContent).toBe("Test Title");
    });

    it("默认 heading 应该为空", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await waitForRender();

      expect(dialog.heading).toBe("");
      const headingEl = dialog.shadowRoot.querySelector('[part="heading"]');
      expect(headingEl.textContent).toBe("");
    });

    it("动态修改 heading 应该更新标题文本", async () => {
      const dialog = document.createElement("ea-dialog");
      dialog.setAttribute("heading", "Initial Title");
      container.appendChild(dialog);

      await waitForRender();

      expect(dialog.heading).toBe("Initial Title");

      dialog.setAttribute("heading", "Updated Title");
      await waitForRender();

      expect(dialog.heading).toBe("Updated Title");
      const headingEl = dialog.shadowRoot.querySelector('[part="heading"]');
      expect(headingEl.textContent).toBe("Updated Title");
    });
  });

  describe("width 属性", () => {
    it("应该通过 width 属性设置宽度", async () => {
      const dialog = document.createElement("ea-dialog");
      dialog.setAttribute("width", "500px");
      container.appendChild(dialog);

      await waitForRender();

      expect(dialog.width).toBe("500px");
    });

    it("默认 width 应该是 50%", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await waitForRender();

      expect(dialog.width).toBe("50%");
    });

    it("动态修改 width 应该更新 CSS 变量", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await waitForRender();

      dialog.setAttribute("width", "800px");
      await waitForRender();

      expect(dialog.width).toBe("800px");
      expect(dialog.style.getPropertyValue("--ea-overlay-content-width")).toBe("800px");
    });
  });

  describe("top 属性", () => {
    it("默认 top 应该是 50%", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await waitForRender();

      expect(dialog.top).toBe("50%");
    });

    it("应该通过 top 属性设置顶部距离", async () => {
      const dialog = document.createElement("ea-dialog");
      dialog.setAttribute("top", "20vh");
      container.appendChild(dialog);

      await waitForRender();

      expect(dialog.top).toBe("20vh");
    });

    it("动态修改 top 应该更新 CSS 变量", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await waitForRender();

      dialog.setAttribute("top", "10vh");
      await waitForRender();

      expect(dialog.style.getPropertyValue("--ea-overlay-content-top")).toBe("10vh");
    });
  });

  describe("visible 属性", () => {
    it("默认对话框应该是隐藏的", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await waitForRender();

      expect(dialog.visible).toBe(false);
    });

    it("调用 show() 方法应该显示对话框", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await waitForRender();

      const openHandler = vi.fn();
      dialog.addEventListener("ea-open", openHandler);

      dialog.show();

      await waitForRender();

      expect(dialog.visible).toBe(true);
      expect(openHandler).toHaveBeenCalled();
    });

    it("调用 hide() 方法应该隐藏对话框", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await waitForRender();

      dialog.show();
      await waitForRender();

      expect(dialog.visible).toBe(true);

      const closeHandler = vi.fn();
      dialog.addEventListener("ea-close", closeHandler);

      dialog.hide();

      await waitForRender();

      expect(closeHandler).toHaveBeenCalled();
    });

    it("通过 visible 属性控制显示", async () => {
      const dialog = document.createElement("ea-dialog");
      dialog.setAttribute("visible", "");
      container.appendChild(dialog);

      await waitForRender();

      expect(dialog.visible).toBe(true);
    });

    it("多次显示/隐藏应该正常工作", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await waitForRender();

      dialog.show();
      expect(dialog.visible).toBe(true);

      dialog.hide();
      expect(dialog.visible).toBe(false);

      dialog.show();
      expect(dialog.visible).toBe(true);

      dialog.hide();
      expect(dialog.visible).toBe(false);
    });
  });

  describe("center 属性", () => {
    it("默认 center 应该是 false", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await waitForRender();

      expect(dialog.center).toBe(false);
    });

    it("设置 center 属性应该应用居中样式", async () => {
      const dialog = document.createElement("ea-dialog");
      dialog.setAttribute("center", "");
      container.appendChild(dialog);

      await waitForRender();

      expect(dialog.center).toBe(true);
    });

    it("center 属性应该添加对应的 CSS 修饰符类", async () => {
      const dialog = document.createElement("ea-dialog");
      dialog.setAttribute("center", "");
      container.appendChild(dialog);

      await waitForRender();

      const overlayEl = dialog.shadowRoot.querySelector(".ea-overlay");
      expect(overlayEl.classList.contains("ea-dialog--center")).toBe(true);
    });
  });

  describe("fullscreen 属性", () => {
    it("默认 fullscreen 应该是 false", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await waitForRender();

      expect(dialog.fullscreen).toBe(false);
    });

    it("设置 fullscreen 属性应该应用全屏样式", async () => {
      const dialog = document.createElement("ea-dialog");
      dialog.setAttribute("fullscreen", "");
      container.appendChild(dialog);

      await waitForRender();

      expect(dialog.fullscreen).toBe(true);
    });

    it("fullscreen 属性应该添加对应的 CSS 修饰符类", async () => {
      const dialog = document.createElement("ea-dialog");
      dialog.setAttribute("fullscreen", "");
      container.appendChild(dialog);

      await waitForRender();

      const overlayEl = dialog.shadowRoot.querySelector(".ea-overlay");
      expect(overlayEl.classList.contains("ea-dialog--fullscreen")).toBe(true);
    });
  });

  describe("modal 属性", () => {
    it("默认 modal 应该是 true", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await waitForRender();

      expect(dialog.modal).toBe(true);
    });

    it("设置 modal 为 false 应该禁用遮罩", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await waitForRender();

      dialog.setAttribute("modal", "false");
      await waitForRender();

      expect(dialog.modal).toBe(false);
    });

    it("modal 为 true 时应该添加 is-modal 状态类", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await waitForRender();

      const overlayEl = dialog.shadowRoot.querySelector(".ea-overlay");
      expect(overlayEl.classList.contains("is-modal")).toBe(true);
    });

    it("modal 为 false 时不应该添加 is-modal 状态类", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await waitForRender();

      dialog.setAttribute("modal", "false");
      await waitForRender();

      const overlayEl = dialog.shadowRoot.querySelector(".ea-overlay");
      expect(overlayEl.classList.contains("is-modal")).toBe(false);
    });
  });

  describe("movable 属性", () => {
    it("默认 movable 应该是 false", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await waitForRender();

      expect(dialog.movable).toBe(false);
    });

    it("设置 movable 属性应该启用拖拽", async () => {
      const dialog = document.createElement("ea-dialog");
      dialog.setAttribute("movable", "");
      container.appendChild(dialog);

      await waitForRender();

      expect(dialog.movable).toBe(true);
    });

    it("movable 属性应该添加 draggable 修饰符类", async () => {
      const dialog = document.createElement("ea-dialog");
      dialog.setAttribute("movable", "");
      container.appendChild(dialog);

      await waitForRender();

      const overlayEl = dialog.shadowRoot.querySelector(".ea-overlay");
      expect(overlayEl.classList.contains("ea-dialog--draggable")).toBe(true);
    });
  });

  describe("showClose 属性", () => {
    it("默认 showClose 应该是 true", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await waitForRender();

      expect(dialog.showClose).toBe(true);
    });

    it("设置 showClose 为 false 应该隐藏关闭图标", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await waitForRender();

      dialog.setAttribute("show-close", "false");
      await waitForRender();

      expect(dialog.showClose).toBe(false);
    });

    it("showClose 为 false 时应该添加 close-hidden 状态类", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await waitForRender();

      dialog.setAttribute("show-close", "false");
      await waitForRender();

      const overlayEl = dialog.shadowRoot.querySelector(".ea-overlay");
      expect(overlayEl.classList.contains("is-close-hidden")).toBe(true);
    });

    it("showClose 为 true 时不应该添加 close-hidden 状态类", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await waitForRender();

      const overlayEl = dialog.shadowRoot.querySelector(".ea-overlay");
      expect(overlayEl.classList.contains("is-close-hidden")).toBe(false);
    });
  });

  describe("modalPentrable 属性", () => {
    it("默认 modalPentrable 应该是 false", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await waitForRender();

      expect(dialog.modalPentrable).toBe(false);
    });

    it("设置 modal-pentrable 属性应该启用模态穿透", async () => {
      const dialog = document.createElement("ea-dialog");
      dialog.setAttribute("modal-pentrable", "");
      container.appendChild(dialog);

      await waitForRender();

      expect(dialog.modalPentrable).toBe(true);
    });

    it("modalPentrable 为 true 时应该添加 is-modal-penetrable 状态类", async () => {
      const dialog = document.createElement("ea-dialog");
      dialog.setAttribute("modal-pentrable", "");
      container.appendChild(dialog);

      await waitForRender();

      const overlayEl = dialog.shadowRoot.querySelector(".ea-overlay");
      expect(overlayEl.classList.contains("is-modal-penetrable")).toBe(true);
    });
  });

  describe("closeOnClickModal 属性", () => {
    it("默认 closeOnClickModal 应该是 true", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await waitForRender();

      expect(dialog.closeOnClickModal).toBe(true);
    });

    it("设置 closeOnClickModal 为 false 应该禁用点击遮罩关闭", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await waitForRender();

      dialog.setAttribute("close-on-click-modal", "false");
      await waitForRender();

      expect(dialog.closeOnClickModal).toBe(false);
    });

    it("点击遮罩层应该关闭对话框（closeOnClickModal 为 true）", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await waitForRender();

      dialog.show();
      expect(dialog.visible).toBe(true);

      const mask = dialog.shadowRoot.querySelector(".ea-overlay__mask");
      mask.click();

      await waitForRender();

      expect(dialog.visible).toBe(false);
    });

    it("点击遮罩层不应该关闭对话框（closeOnClickModal 为 false）", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await waitForRender();

      dialog.setAttribute("close-on-click-modal", "false");
      dialog.show();
      expect(dialog.visible).toBe(true);

      const mask = dialog.shadowRoot.querySelector(".ea-overlay__mask");
      mask.click();

      await waitForRender();

      expect(dialog.visible).toBe(true);
    });
  });

  describe("closeOnPressEscape 属性", () => {
    it("默认 closeOnPressEscape 应该是 true", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await waitForRender();

      expect(dialog.closeOnPressEscape).toBe(true);
    });

    it("设置 closeOnPressEscape 为 false 应该禁用 ESC 关闭", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await waitForRender();

      dialog.setAttribute("close-on-press-escape", "false");
      await waitForRender();

      expect(dialog.closeOnPressEscape).toBe(false);
    });

    it("按 ESC 键应该关闭对话框（closeOnPressEscape 为 true）", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await waitForRender();

      dialog.show();
      expect(dialog.visible).toBe(true);

      const escapeEvent = new KeyboardEvent("keydown", {
        key: "Escape",
        bubbles: true,
      });
      document.dispatchEvent(escapeEvent);

      await waitForRender();

      expect(dialog.visible).toBe(false);
    });

    it("按 ESC 键不应该关闭对话框（closeOnPressEscape 为 false）", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await waitForRender();

      dialog.setAttribute("close-on-press-escape", "false");
      dialog.show();
      expect(dialog.visible).toBe(true);

      const escapeEvent = new KeyboardEvent("keydown", {
        key: "Escape",
        bubbles: true,
      });
      document.dispatchEvent(escapeEvent);

      await waitForRender();

      expect(dialog.visible).toBe(true);
    });
  });

  describe("appendToBody 属性", () => {
    it("默认 appendToBody 应该是 false", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await waitForRender();

      expect(dialog.appendToBody).toBe(false);
    });

    it("设置 append-to-body 应该为 true", async () => {
      const dialog = document.createElement("ea-dialog");
      dialog.setAttribute("append-to-body", "");
      container.appendChild(dialog);

      await waitForRender();

      expect(dialog.appendToBody).toBe(true);
    });
  });

  describe("appendTo 属性", () => {
    it("默认 appendTo 应该是 body", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await waitForRender();

      expect(dialog.appendTo).toBe("body");
    });

    it("应该支持自定义 appendTo 选择器", async () => {
      const customContainer = document.createElement("div");
      customContainer.id = "custom-dialog-container";
      document.body.appendChild(customContainer);

      const dialog = document.createElement("ea-dialog");
      dialog.setAttribute("append-to", "#custom-dialog-container");
      container.appendChild(dialog);

      await waitForRender();

      expect(dialog.appendTo).toBe("#custom-dialog-container");

      customContainer.remove();
    });
  });

  describe("beforeClose 属性", () => {
    it("默认 beforeClose 应该是 null", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await waitForRender();

      expect(dialog.beforeClose).toBeNull();
    });

    it("设置 beforeClose 回调函数应该拦截关闭过渡", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await waitForRender();

      const closedHandler = vi.fn();
      dialog.addEventListener("ea-closed", closedHandler);

      let doneFn = null;
      dialog.beforeClose = done => {
        doneFn = done;
      };

      dialog.show();
      await waitForRender();

      dialog.hide();
      await waitForRender();

      expect(dialog.visible).toBe(true);
      expect(doneFn).toBeTruthy();
      expect(closedHandler).not.toHaveBeenCalled();

      doneFn();
      await waitForRender();

      expect(dialog.visible).toBe(false);
    });

    it("beforeClose 回调执行 done 后应该关闭对话框", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await waitForRender();

      const beforeCloseHandler = vi.fn(done => done());
      dialog.beforeClose = beforeCloseHandler;

      dialog.show();
      expect(dialog.visible).toBe(true);

      dialog.hide();
      await waitForRender();

      expect(beforeCloseHandler).toHaveBeenCalled();
      expect(dialog.visible).toBe(false);
    });
  });

  describe("EaOverlay 继承属性", () => {
    it("应该支持 z-index 属性", async () => {
      const dialog = document.createElement("ea-dialog");
      dialog.setAttribute("z-index", "5000");
      container.appendChild(dialog);

      await waitForRender();

      expect(dialog.zIndex).toBe("5000");
    });

    it("应该支持 background-color 属性", async () => {
      const dialog = document.createElement("ea-dialog");
      dialog.setAttribute("background-color", "rgba(0,0,0,0.8)");
      container.appendChild(dialog);

      await waitForRender();

      expect(dialog.backgroundColor).toBe("rgba(0,0,0,0.8)");
    });

    it("应该支持 content-width 属性", async () => {
      const dialog = document.createElement("ea-dialog");
      dialog.setAttribute("content-width", "80%");
      container.appendChild(dialog);

      await waitForRender();

      expect(dialog.contentWidth).toBe("80%");
    });

    it("应该支持 content-max-width 属性", async () => {
      const dialog = document.createElement("ea-dialog");
      dialog.setAttribute("content-max-width", "1200px");
      container.appendChild(dialog);

      await waitForRender();

      expect(dialog.contentMaxWidth).toBe("1200px");
    });

    it("应该支持 content-height 属性", async () => {
      const dialog = document.createElement("ea-dialog");
      dialog.setAttribute("content-height", "60%");
      container.appendChild(dialog);

      await waitForRender();

      expect(dialog.contentHeight).toBe("60%");
    });
  });

  describe("关闭图标点击行为", () => {
    it("点击关闭图标应该隐藏对话框", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await waitForRender();

      dialog.show();
      expect(dialog.visible).toBe(true);

      const closeIcon = dialog.shadowRoot.querySelector(".ea-dialog__close-icon");
      closeIcon.click();

      await waitForRender();

      expect(dialog.visible).toBe(false);
    });

    it("showClose 为 false 时点击关闭图标不应该隐藏对话框", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await waitForRender();

      dialog.setAttribute("show-close", "false");
      dialog.show();
      expect(dialog.visible).toBe(true);

      const closeIcon = dialog.shadowRoot.querySelector(".ea-dialog__close-icon");
      closeIcon.click();

      await waitForRender();

      expect(dialog.visible).toBe(true);
    });
  });

  describe("resetPosition 方法", () => {
    it("应该提供 resetPosition 方法", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await waitForRender();

      expect(typeof dialog.resetPosition).toBe("function");
    });

    it("resetPosition 应该清除拖拽产生的位置样式", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await waitForRender();

      const overlayContent = dialog.shadowRoot.querySelector(".ea-overlay__content");
      overlayContent.style.left = "100px";
      overlayContent.style.top = "200px";
      dialog.style.setProperty("--ea-overlay-content-left", "100px");
      dialog.style.setProperty("--ea-overlay-content-top", "200px");

      dialog.resetPosition();

      expect(overlayContent.style.left).toBe("");
      expect(overlayContent.style.top).toBe("");
      expect(dialog.style.getPropertyValue("--ea-overlay-content-left")).toBe("");
      expect(dialog.style.getPropertyValue("--ea-overlay-content-top")).toBe("");
    });
  });

  describe("事件", () => {
    it("应该触发 ea-open 事件", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await waitForRender();

      const openHandler = vi.fn();
      dialog.addEventListener("ea-open", openHandler);

      dialog.show();
      await waitForRender();

      expect(openHandler).toHaveBeenCalled();
    });

    it("应该触发 ea-close 事件", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await waitForRender();

      dialog.show();
      await waitForRender();

      const closeHandler = vi.fn();
      dialog.addEventListener("ea-close", closeHandler);

      dialog.hide();
      await waitForRender();

      expect(closeHandler).toHaveBeenCalled();
    });

    it("应该触发 ea-opened 事件（动画结束后）", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await waitForRender();

      const openedHandler = vi.fn();
      dialog.addEventListener("ea-opened", openedHandler);

      dialog.show();

      await new Promise(resolve => requestAnimationFrame(resolve));
      await waitForRender();

      const overlayContainer = dialog.shadowRoot.querySelector(".ea-overlay");
      overlayContainer.dispatchEvent(new Event("transitionend", { bubbles: true }));

      await waitForRender();

      expect(openedHandler).toHaveBeenCalled();
    });

    it("应该触发 ea-closed 事件（动画结束后）", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await waitForRender();

      dialog.show();
      await waitForRender();

      const closedHandler = vi.fn();
      dialog.addEventListener("ea-closed", closedHandler);

      dialog.visible = false;
      await waitForRender();

      const overlayContainer = dialog.shadowRoot.querySelector(".ea-overlay");
      overlayContainer.dispatchEvent(new Event("transitionend", { bubbles: true }));

      await waitForRender();

      expect(closedHandler).toHaveBeenCalled();
    });

    it("ea-open 和 ea-close 事件应该正确触发", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await waitForRender();

      const openHandler = vi.fn();
      const closeHandler = vi.fn();

      dialog.addEventListener("ea-open", openHandler);
      dialog.addEventListener("ea-close", closeHandler);

      dialog.show();
      await waitForRender();

      expect(openHandler).toHaveBeenCalled();

      dialog.hide();
      await waitForRender();

      expect(closeHandler).toHaveBeenCalled();
    });
  });

  describe("边界场景", () => {
    it("空内容时应该正确处理", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await waitForRender();

      dialog.show();

      const content = dialog.shadowRoot.querySelector('[part="content"]');
      expect(content).toBeTruthy();
    });

    it("没有 heading 时应该显示空标题", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await waitForRender();

      const headingEl = dialog.shadowRoot.querySelector('[part="heading"]');
      expect(headingEl.textContent).toBe("");
    });

    it("自定义 header slot 应该生效", async () => {
      const dialog = document.createElement("ea-dialog");
      dialog.innerHTML = `
        <div slot="header">Custom Header Content</div>
        <span>Body content</span>
      `;
      container.appendChild(dialog);

      await waitForRender();

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

      await waitForRender();

      const footerSlot = dialog.shadowRoot.querySelector('slot[name="footer"]');
      expect(footerSlot).toBeTruthy();
    });

    it("同时设置多个属性应该正确工作", async () => {
      const dialog = document.createElement("ea-dialog");
      dialog.setAttribute("heading", "Multi Props");
      dialog.setAttribute("width", "600px");
      dialog.setAttribute("top", "20vh");
      dialog.setAttribute("center", "");
      container.appendChild(dialog);

      await waitForRender();

      dialog.setAttribute("modal", "false");
      await waitForRender();

      expect(dialog.heading).toBe("Multi Props");
      expect(dialog.width).toBe("600px");
      expect(dialog.top).toBe("20vh");
      expect(dialog.center).toBe(true);
      expect(dialog.modal).toBe(false);
    });

    it("fullscreen 和 movable 同时设置时应该正常工作", async () => {
      const dialog = document.createElement("ea-dialog");
      dialog.setAttribute("fullscreen", "");
      dialog.setAttribute("movable", "");
      container.appendChild(dialog);

      await waitForRender();

      expect(dialog.fullscreen).toBe(true);
      expect(dialog.movable).toBe(true);
    });

    it("点击对话框内容区域不应该关闭（closeOnClickModal 为 true）", async () => {
      const dialog = document.createElement("ea-dialog");
      dialog.setAttribute("close-on-click-modal", "");
      container.appendChild(dialog);

      await waitForRender();

      dialog.show();
      expect(dialog.visible).toBe(true);

      const dialogContent = dialog.shadowRoot.querySelector(".ea-dialog");
      dialogContent.click();

      await waitForRender();

      expect(dialog.visible).toBe(true);
    });
  });

  describe("生命周期", () => {
    it("组件连接后应该正确初始化", async () => {
      const dialog = document.createElement("ea-dialog");
      dialog.setAttribute("heading", "Test");
      container.appendChild(dialog);

      await waitForRender();

      expect(dialog.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
      expect(dialog.getAttribute("role")).toBe("dialog");
    });

    it("组件断开连接后应该清理资源", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await waitForRender();

      dialog.remove();

      expect(dialog.isConnected).toBe(false);
    });

    it("应该继承 EaOverlay 的功能", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await waitForRender();

      expect(typeof dialog.show).toBe("function");
      expect(typeof dialog.hide).toBe("function");
      expect(typeof dialog.resetPosition).toBe("function");
    });

    it("应该继承 EaOverlay 的属性", async () => {
      const dialog = document.createElement("ea-dialog");
      container.appendChild(dialog);

      await waitForRender();

      expect(dialog.visible).toBe(false);
      expect(dialog.modal).toBe(true);
      expect(dialog.closeOnClickModal).toBe(true);
      expect(dialog.closeOnPressEscape).toBe(true);
    });
  });
});
