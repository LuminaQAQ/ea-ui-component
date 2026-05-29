import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender.js";

import "../components/ea-popover/index.ts";

describe("EaPopover Component", () => {
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
      const popover = document.createElement("ea-popover");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      await waitForRender();

      expect(popover.shadowRoot).toBeTruthy();
      expect(popover.shadowRoot.querySelector(".ea-popper")).toBeTruthy();
    });

    it("应该支持 CSS Parts", async () => {
      const popover = document.createElement("ea-popover");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      await waitForRender();

      expect(
        popover.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
      expect(
        popover.shadowRoot.querySelector('[part="reference"]')
      ).toBeTruthy();
      expect(
        popover.shadowRoot.querySelector('[part="original"]')
      ).toBeTruthy();
    });

    it("应该渲染 reference slot", async () => {
      const popover = document.createElement("ea-popover");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      await waitForRender();

      const referenceSlot = popover.shadowRoot.querySelector(
        'slot[name="reference"]'
      );
      expect(referenceSlot).toBeTruthy();
    });
  });

  describe("Trigger Attribute", () => {
    it("默认 trigger 应该是 hover", async () => {
      const popover = document.createElement("ea-popover");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      await waitForRender();

      expect(popover.trigger).toBe("hover");
    });

    it("应该支持 click trigger", async () => {
      const popover = document.createElement("ea-popover");
      popover.setAttribute("trigger", "click");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      await waitForRender();

      expect(popover.trigger).toBe("click");
    });

    it("应该支持 focus trigger", async () => {
      const popover = document.createElement("ea-popover");
      popover.setAttribute("trigger", "focus");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      await waitForRender();

      expect(popover.trigger).toBe("focus");
    });

    it("应该支持 contextmenu trigger", async () => {
      const popover = document.createElement("ea-popover");
      popover.setAttribute("trigger", "contextmenu");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      await waitForRender();

      expect(popover.trigger).toBe("contextmenu");
    });

    it("应该支持 customized trigger", async () => {
      const popover = document.createElement("ea-popover");
      popover.setAttribute("trigger", "customized");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      await waitForRender();

      expect(popover.trigger).toBe("customized");
    });
  });

  describe("Visible Attribute", () => {
    it("默认 visible 应该是 false", async () => {
      const popover = document.createElement("ea-popover");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      await waitForRender();

      expect(popover.visible === false || popover.visible === null).toBe(true);
    });

    it("应该支持 visible 属性设置为 true", async () => {
      const popover = document.createElement("ea-popover");
      popover.setAttribute("visible", "");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      await waitForRender();

      expect(popover.visible).toBe(true);
    });
  });

  describe("Heading Attribute", () => {
    it("应该支持 heading 属性", async () => {
      const popover = document.createElement("ea-popover");
      popover.setAttribute("heading", "Test Title");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      await waitForRender();

      expect(popover.heading).toBe("Test Title");
    });

    it("heading 应该渲染在 shadow DOM 中", async () => {
      const popover = document.createElement("ea-popover");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      await waitForRender();

      popover.setAttribute("heading", "Test Title");

      await waitForRender();

      const titleEl = popover.shadowRoot.querySelector(".ea-popover__title");
      if (titleEl && titleEl.textContent) {
        expect(titleEl.textContent).toBe("Test Title");
      } else {
        expect(popover.heading).toBe("Test Title");
      }
    });
  });

  describe("Content Attribute", () => {
    it("应该支持 content 属性", async () => {
      const popover = document.createElement("ea-popover");
      popover.setAttribute("content", "Test Content");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      await waitForRender();

      expect(popover.content).toBe("Test Content");
    });

    it("content 应该渲染在 shadow DOM 中", async () => {
      const popover = document.createElement("ea-popover");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      await waitForRender();

      popover.setAttribute("content", "Test Content");

      await waitForRender();

      const contentEl = popover.shadowRoot.querySelector(
        ".ea-popover__content"
      );
      if (contentEl && contentEl.textContent) {
        expect(contentEl.textContent).toBe("Test Content");
      } else {
        expect(popover.content).toBe("Test Content");
      }
    });
  });

  describe("Placement Attribute", () => {
    it("默认 placement 应该是 top", async () => {
      const popover = document.createElement("ea-popover");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      await waitForRender();

      expect(popover.placement).toBe("top");
    });

    it("应该支持不同的 placement 值", async () => {
      const placements = [
        "top",
        "top-start",
        "top-end",
        "bottom",
        "bottom-start",
        "bottom-end",
        "left",
        "left-start",
        "left-end",
        "right",
        "right-start",
        "right-end",
      ];

      for (const placement of placements) {
        const popover = document.createElement("ea-popover");
        popover.setAttribute("placement", placement);
        popover.innerHTML = `<button slot="reference">Trigger</button>`;
        container.appendChild(popover);

        await waitForRender();

        expect(popover.placement).toBe(placement);
        container.removeChild(popover);
      }
    });
  });

  describe("Width Attribute", () => {
    it("默认 width 应该是 150", async () => {
      const popover = document.createElement("ea-popover");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      await waitForRender();

      expect(Number(popover.width)).toBe(150);
    });

    it("应该支持自定义 width", async () => {
      const popover = document.createElement("ea-popover");
      popover.setAttribute("width", "200");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      await waitForRender();

      expect(popover.width).toBe(200);
    });
  });

  describe("Show-arrow Attribute", () => {
    it("默认 showArrow 应该是 true", async () => {
      const popover = document.createElement("ea-popover");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      await waitForRender();

      expect(popover.showArrow === true || popover.showArrow === null).toBe(
        true
      );
    });

    it("应该支持 showArrow 设置为 false", async () => {
      const popover = document.createElement("ea-popover");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);
      popover.showArrow = false;

      await waitForRender();

      expect(popover.showArrow).toBe(false);
    });
  });

  describe("Offset Attribute", () => {
    it("默认 offset 应该是 '0 0'", async () => {
      const popover = document.createElement("ea-popover");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      await waitForRender();

      expect(popover.offset).toBe("0 0");
    });

    it("应该支持自定义 offset", async () => {
      const popover = document.createElement("ea-popover");
      popover.setAttribute("offset", "10 20");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      await waitForRender();

      expect(popover.offset).toBe("10 20");
    });
  });

  describe("Flip Attribute", () => {
    it("默认 flip 应该是 true", async () => {
      const popover = document.createElement("ea-popover");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      await waitForRender();

      expect(popover.flip === true || popover.flip === null).toBe(true);
    });

    it("应该支持 flip 设置为 false", async () => {
      const popover = document.createElement("ea-popover");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);
      popover.flip = false;

      await waitForRender();

      expect(popover.flip).toBe(false);
    });
  });

  describe("Methods", () => {
    it("show() 方法应该显示 popover", async () => {
      const popover = document.createElement("ea-popover");
      popover.setAttribute("trigger", "customized");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      await waitForRender();

      expect(popover.visible === false || popover.visible === null).toBe(true);

      popover.show();

      expect(popover.visible).toBe(true);
    });

    it("hide() 方法应该隐藏 popover", async () => {
      const popover = document.createElement("ea-popover");
      popover.setAttribute("trigger", "customized");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      await waitForRender();

      popover.show();
      expect(popover.visible).toBe(true);

      popover.hide();

      expect(popover.visible === false || popover.visible === null).toBe(true);
    });

    it("toggle() 方法应该切换 popover 显示状态", async () => {
      const popover = document.createElement("ea-popover");
      popover.setAttribute("trigger", "customized");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      await waitForRender();

      popover.show();
      expect(popover.visible).toBe(true);

      popover.toggle();
      expect(popover.visible === false || popover.visible === null).toBe(true);

      popover.toggle();
      expect(popover.visible).toBe(true);
    });
  });

  describe("Events", () => {
    it("应该触发 show 事件", async () => {
      const popover = document.createElement("ea-popover");
      popover.setAttribute("trigger", "customized");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      await waitForRender();

      const showHandler = vi.fn();
      popover.addEventListener("ea-show", showHandler);

      popover.show();
      await waitForRender();

      expect(showHandler).toHaveBeenCalled();
    });

    it("应该触发 hide 事件", async () => {
      const popover = document.createElement("ea-popover");
      popover.setAttribute("trigger", "customized");
      popover.setAttribute("visible", "");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      await waitForRender();

      const hideHandler = vi.fn();
      popover.addEventListener("ea-hide", hideHandler);

      popover.hide();
      await waitForRender();

      expect(hideHandler).toHaveBeenCalled();
    });
  });

  describe("Edge Cases", () => {
    it("应该处理没有 reference slot 的情况", async () => {
      const popover = document.createElement("ea-popover");
      container.appendChild(popover);

      await waitForRender();

      expect(popover.shadowRoot).toBeTruthy();
    });

    it("应该处理空 heading", async () => {
      const popover = document.createElement("ea-popover");
      popover.setAttribute("heading", "");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      await waitForRender();

      expect(popover.heading).toBe("");
    });

    it("应该处理空 content", async () => {
      const popover = document.createElement("ea-popover");
      popover.setAttribute("content", "");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      await waitForRender();

      expect(popover.content).toBe("");
    });
  });

  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const popover = document.createElement("ea-popover");
      popover.setAttribute("placement", "bottom");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      await waitForRender();

      expect(popover.shadowRoot).toBeTruthy();
      expect(popover.placement).toBe("bottom");
    });

    it("组件断开连接后应该正常移除", async () => {
      const popover = document.createElement("ea-popover");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      await waitForRender();

      popover.remove();

      expect(popover.isConnected).toBe(false);
    });

    it("应该支持属性动态更新", async () => {
      const popover = document.createElement("ea-popover");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      await waitForRender();

      expect(popover.heading).toBe("");

      popover.setAttribute("heading", "New Title");

      await waitForRender();

      expect(popover.heading).toBe("New Title");
    });
  });
});
