import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

import { waitForRender } from "./utils/waitForRender.js";

import "../common/ea-overlay/index.ts";

describe("EaOverlay Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe("Basic Functionality", () => {
    it("应该正确渲染组件", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      expect(overlay.shadowRoot).toBeTruthy();
      expect(overlay.shadowRoot.querySelector(".ea-overlay")).toBeTruthy();
    });

    it("应该支持 CSS Parts", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      expect(
        overlay.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
      expect(overlay.shadowRoot.querySelector('[part="mask"]')).toBeTruthy();
      expect(overlay.shadowRoot.querySelector('[part="content"]')).toBeTruthy();
    });

    it("应该渲染遮罩层和内容容器", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      expect(
        overlay.shadowRoot.querySelector(".ea-overlay__mask")
      ).toBeTruthy();
      expect(
        overlay.shadowRoot.querySelector(".ea-overlay__content")
      ).toBeTruthy();
    });
  });

  describe("Status Attribute", () => {
    it("默认 status 应该是 false", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      expect(overlay.status).toBe(false);
    });

    it("应该支持通过 show() 方法显示", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      overlay.show();

      expect(overlay.status).toBe(true);
    });

    it("应该支持通过 hide() 方法隐藏", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      overlay.show();
      expect(overlay.status).toBe(true);

      overlay.hide();
      expect(overlay.status).toBe(false);
    });

    it("应该支持通过 status 属性控制显示", async () => {
      const overlay = document.createElement("ea-overlay");
      overlay.setAttribute("status", "");
      container.appendChild(overlay);

      await waitForRender();

      expect(overlay.status).toBe(true);
    });
  });

  describe("Modal Attribute", () => {
    it("默认 modal 应该是 true", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      expect(overlay.modal).toBe(true);
    });

    it("应该支持非模态模式", async () => {
      const overlay = document.createElement("ea-overlay");
      overlay.setAttribute("modal", "false");
      container.appendChild(overlay);

      await waitForRender();

      expect(overlay.modal).toBe(false);
    });
  });

  describe("Close on Click Modal Attribute", () => {
    it("默认 closeOnClickModal 应该是 false", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      expect(overlay.closeOnClickModal).toBe(false);
    });

    it("应该支持点击遮罩层关闭", async () => {
      const overlay = document.createElement("ea-overlay");
      overlay.setAttribute("close-on-click-modal", "");
      container.appendChild(overlay);

      await waitForRender();

      overlay.show();
      expect(overlay.status).toBe(true);

      const mask = overlay.shadowRoot.querySelector(".ea-overlay__mask");
      mask.click();

      await waitForRender();

      expect(overlay.status).toBe(false);
    });
  });

  describe("CSS Variables Attributes", () => {
    it("应该支持 z-index 属性", async () => {
      const overlay = document.createElement("ea-overlay");
      overlay.setAttribute("z-index", "2000");
      container.appendChild(overlay);

      await waitForRender();

      expect(overlay.zIndex).toBe("2000");
    });

    it("应该支持 background-color 属性", async () => {
      const overlay = document.createElement("ea-overlay");
      overlay.setAttribute("background-color", "rgba(0,0,0,0.8)");
      container.appendChild(overlay);

      await waitForRender();

      expect(overlay.backgroundColor).toBe("rgba(0,0,0,0.8)");
    });

    it("应该支持 content-width 属性", async () => {
      const overlay = document.createElement("ea-overlay");
      overlay.setAttribute("content-width", "80%");
      container.appendChild(overlay);

      await waitForRender();

      expect(overlay.contentWidth).toBe("80%");
    });

    it("应该支持 content-height 属性", async () => {
      const overlay = document.createElement("ea-overlay");
      overlay.setAttribute("content-height", "60%");
      container.appendChild(overlay);

      await waitForRender();

      expect(overlay.contentHeight).toBe("60%");
    });
  });

  describe("beforeClose Property", () => {
    it("应该支持 beforeClose 回调函数", async () => {
      const overlay = document.createElement("ea-overlay");
      overlay.setAttribute("close-on-click-modal", "");
      container.appendChild(overlay);

      await waitForRender();

      const beforeCloseHandler = vi.fn(done => done());
      overlay.beforeClose = beforeCloseHandler;

      overlay.show();
      expect(overlay.status).toBe(true);

      const mask = overlay.shadowRoot.querySelector(".ea-overlay__mask");
      mask.click();

      expect(beforeCloseHandler).toHaveBeenCalled();
    });

    it("beforeClose 应该可以异步执行", async () => {
      const overlay = document.createElement("ea-overlay");
      overlay.setAttribute("close-on-click-modal", "");
      container.appendChild(overlay);

      await waitForRender();

      let doneCalled = false;
      overlay.beforeClose = async done => {
        await new Promise(resolve => setTimeout(resolve, 50));
        doneCalled = true;
        done();
      };

      overlay.show();

      const mask = overlay.shadowRoot.querySelector(".ea-overlay__mask");
      mask.click();

      await waitForRender(100);

      expect(doneCalled).toBe(true);
      expect(overlay.status).toBe(false);
    });
  });

  describe("Slots", () => {
    it("应该支持默认 slot", async () => {
      const overlay = document.createElement("ea-overlay");
      overlay.innerHTML = `
        <div class="content">Overlay Content</div>
      `;
      container.appendChild(overlay);

      await waitForRender();

      const slot = overlay.shadowRoot.querySelector("slot");
      expect(slot).toBeTruthy();
    });
  });

  describe("Events", () => {
    it("应该触发 open 事件", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      const openHandler = vi.fn();
      overlay.addEventListener("open", openHandler);

      overlay.status = true;

      await waitForRender();

      expect(openHandler).toHaveBeenCalled();
    });

    it("应该触发 opened 事件", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      const openedHandler = vi.fn();
      overlay.addEventListener("opened", openedHandler);

      overlay.show();

      await new Promise(resolve => requestAnimationFrame(resolve));
      await waitForRender();

      const overlayContainer = overlay.shadowRoot.querySelector(".ea-overlay");
      overlayContainer.dispatchEvent(
        new Event("transitionend", { bubbles: true })
      );

      await waitForRender();

      expect(openedHandler).toHaveBeenCalled();
    });

    it("应该触发 close 事件", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      overlay.status = true;
      await waitForRender();

      const closeHandler = vi.fn();
      overlay.addEventListener("close", closeHandler);

      overlay.status = false;
      await waitForRender();

      expect(closeHandler).toHaveBeenCalled();
    });

    it("应该触发 closed 事件", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      overlay.status = true;
      await waitForRender();

      const closedHandler = vi.fn();
      overlay.addEventListener("closed", closedHandler);

      overlay.status = false;
      await waitForRender();

      const overlayContainer = overlay.shadowRoot.querySelector(".ea-overlay");
      overlayContainer.dispatchEvent(
        new Event("transitionend", { bubbles: true })
      );

      await waitForRender();

      expect(closedHandler).toHaveBeenCalled();
    });
  });

  describe("Edge Cases", () => {
    it("应该处理空组件", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      expect(overlay.shadowRoot).toBeTruthy();
    });

    it("应该处理多次显示/隐藏", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      overlay.show();
      expect(overlay.status).toBe(true);

      overlay.hide();
      expect(overlay.status).toBe(false);

      overlay.show();
      expect(overlay.status).toBe(true);

      overlay.hide();
      expect(overlay.status).toBe(false);
    });

    it("应该处理点击内容区域不关闭", async () => {
      const overlay = document.createElement("ea-overlay");
      overlay.setAttribute("close-on-click-modal", "");
      overlay.innerHTML = `<div class="test-content">Content</div>`;
      container.appendChild(overlay);

      await waitForRender();

      overlay.show();
      expect(overlay.status).toBe(true);

      const content = overlay.shadowRoot.querySelector(".ea-overlay__content");
      content.click();

      expect(overlay.status).toBe(true);
    });
  });

  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const overlay = document.createElement("ea-overlay");
      overlay.setAttribute("modal", "false");
      container.appendChild(overlay);

      await waitForRender();

      expect(overlay.shadowRoot).toBeTruthy();
      expect(overlay.modal).toBe(false);
    });

    it("组件断开连接后应该正常移除", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      overlay.remove();

      expect(overlay.isConnected).toBe(false);
    });

    it("应该支持属性动态更新", async () => {
      const overlay = document.createElement("ea-overlay");
      container.appendChild(overlay);

      await waitForRender();

      expect(overlay.modal).toBe(true);

      overlay.setAttribute("modal", "false");

      await waitForRender();

      expect(overlay.modal).toBe(false);
    });
  });
});
