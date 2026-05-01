import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender.js";

import "../components/ea-popconfirm/index";

describe("EaPopconfirm Component", () => {
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
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await waitForRender();

      expect(popconfirm.shadowRoot).toBeTruthy();
      expect(popconfirm.shadowRoot.querySelector(".ea-popper")).toBeTruthy();
    });

    it("应该支持 CSS Parts", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await waitForRender();

      expect(
        popconfirm.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
      expect(
        popconfirm.shadowRoot.querySelector('[part="reference"]')
      ).toBeTruthy();
    });

    it("应该渲染 reference slot", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await waitForRender();

      const referenceSlot = popconfirm.shadowRoot.querySelector(
        'slot[name="reference"]'
      );
      expect(referenceSlot).toBeTruthy();
    });
  });

  describe("Heading Attribute", () => {
    it("应该支持 heading 属性", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.setAttribute("heading", "Are you sure?");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await waitForRender();

      expect(popconfirm.heading).toBe("Are you sure?");
    });

    it("heading 应该渲染在 shadow DOM 中", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await waitForRender();

      popconfirm.setAttribute("heading", "Are you sure?");

      await waitForRender();

      expect(popconfirm.heading).toBe("Are you sure?");

      const titleContainer = popconfirm.shadowRoot.querySelector(
        ".ea-popconfirm__title"
      );
      expect(titleContainer).toBeTruthy();
    });
  });

  describe("Icon Attribute", () => {
    it("默认 icon 应该是 circle-question", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await waitForRender();

      expect(popconfirm.icon).toBe("circle-question");
    });

    it("应该支持自定义 icon", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.setAttribute("icon", "circle-info");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await waitForRender();

      expect(popconfirm.icon).toBe("circle-info");
    });
  });

  describe("IconColor Attribute", () => {
    it("默认 iconColor 应该是 rgb(255, 153, 0)", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await waitForRender();

      expect(popconfirm.iconColor).toBe("rgb(255, 153, 0)");
    });

    it("应该支持自定义 iconColor", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.setAttribute("icon-color", "#626AEF");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await waitForRender();

      expect(popconfirm.iconColor).toBe("#626AEF");
    });
  });

  describe("HideIcon Attribute", () => {
    it("默认 hideIcon 应该是 false", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await waitForRender();

      expect(popconfirm.hideIcon).toBe(false);
    });

    it("应该支持 hideIcon 属性", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.setAttribute("hide-icon", "");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await waitForRender();

      expect(popconfirm.hideIcon).toBe(true);
    });
  });

  describe("ConfirmButtonText Attribute", () => {
    it("默认 confirmButtonText 应该是 '确定'", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await waitForRender();

      expect(popconfirm.confirmButtonText).toBe("确定");
    });

    it("应该支持自定义 confirmButtonText", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.setAttribute("confirm-button-text", "Yes");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await waitForRender();

      expect(popconfirm.confirmButtonText).toBe("Yes");
    });
  });

  describe("CancelButtonText Attribute", () => {
    it("默认 cancelButtonText 应该是 '取消'", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await waitForRender();

      expect(popconfirm.cancelButtonText).toBe("取消");
    });

    it("应该支持自定义 cancelButtonText", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.setAttribute("cancel-button-text", "No");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await waitForRender();

      expect(popconfirm.cancelButtonText).toBe("No");
    });
  });

  describe("ConfirmButtonType Attribute", () => {
    it("默认 confirmButtonType 应该是 primary", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await waitForRender();

      expect(popconfirm.confirmButtonType).toBe("primary");
    });

    it("应该支持不同的 confirmButtonType", async () => {
      const types = ["normal", "primary", "success", "warning", "danger"];

      for (const type of types) {
        const popconfirm = document.createElement("ea-popconfirm");
        popconfirm.setAttribute("confirm-button-type", type);
        popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
        container.appendChild(popconfirm);

        await waitForRender();

        expect(popconfirm.confirmButtonType).toBe(type);
        container.removeChild(popconfirm);
      }
    });
  });

  describe("CancelButtonType Attribute", () => {
    it("默认 cancelButtonType 应该是 normal", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await waitForRender();

      expect(popconfirm.cancelButtonType).toBe("normal");
    });

    it("应该支持不同的 cancelButtonType", async () => {
      const types = ["normal", "primary", "success", "warning", "danger"];

      for (const type of types) {
        const popconfirm = document.createElement("ea-popconfirm");
        popconfirm.setAttribute("cancel-button-type", type);
        popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
        container.appendChild(popconfirm);

        await waitForRender();

        expect(popconfirm.cancelButtonType).toBe(type);
        container.removeChild(popconfirm);
      }
    });
  });

  describe("Placement Attribute", () => {
    it("默认 placement 应该是 top", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await waitForRender();

      expect(popconfirm.placement).toBe("top");
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
        const popconfirm = document.createElement("ea-popconfirm");
        popconfirm.setAttribute("placement", placement);
        popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
        container.appendChild(popconfirm);

        await waitForRender();

        expect(popconfirm.placement).toBe(placement);
        container.removeChild(popconfirm);
      }
    });
  });

  describe("Width Attribute", () => {
    it("默认 width 应该是 150", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await waitForRender();

      expect(Number(popconfirm.width)).toBe(150);
    });

    it("应该支持自定义 width", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.setAttribute("width", "220");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await waitForRender();

      expect(Number(popconfirm.width)).toBe(220);
    });
  });

  describe("Visible Attribute", () => {
    it("默认 visible 应该是 false", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await waitForRender();

      expect(popconfirm.visible).toBe(false);
    });

    it("应该支持 visible 属性设置为 true", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.setAttribute("visible", "");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await waitForRender();

      expect(popconfirm.visible).toBe(true);
    });
  });

  describe("Methods", () => {
    it("open() 方法应该显示 popconfirm", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await waitForRender();

      expect(popconfirm.status).toBe(false);

      popconfirm.open();

      expect(popconfirm.status).toBe(true);
    });

    it("close() 方法应该隐藏 popconfirm", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await waitForRender();

      popconfirm.open();
      expect(popconfirm.status).toBe(true);

      popconfirm.close();

      expect(popconfirm.status).toBe(false);
    });

    it("show() 方法应该显示 popconfirm", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await waitForRender();

      popconfirm.show();

      expect(popconfirm.status).toBe(true);
    });

    it("hide() 方法应该隐藏 popconfirm", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await waitForRender();

      popconfirm.open();
      expect(popconfirm.status).toBe(true);

      popconfirm.hide();

      expect(popconfirm.status).toBe(false);
    });
  });

  describe("Events", () => {
    it("应该触发 confirm 事件", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await waitForRender();

      const confirmHandler = vi.fn();
      popconfirm.addEventListener("confirm", confirmHandler);

      popconfirm.dispatchEvent(new CustomEvent("confirm"));

      expect(confirmHandler).toHaveBeenCalled();
    });

    it("应该触发 cancel 事件", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await waitForRender();

      const cancelHandler = vi.fn();
      popconfirm.addEventListener("cancel", cancelHandler);

      popconfirm.dispatchEvent(new CustomEvent("cancel"));

      expect(cancelHandler).toHaveBeenCalled();
    });
  });

  describe("Edge Cases", () => {
    it("应该处理没有 reference slot 的情况", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      container.appendChild(popconfirm);

      await waitForRender();

      expect(popconfirm.shadowRoot).toBeTruthy();
    });

    it("应该处理空 heading", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.setAttribute("heading", "");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await waitForRender();

      expect(popconfirm.heading).toBe("");
    });

    it("应该处理自定义 actions slot", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.innerHTML = `
        <button slot="reference">Delete</button>
        <footer slot="actions">
          <button data-cancel>No</button>
          <button data-confirm>Yes</button>
        </footer>
      `;
      container.appendChild(popconfirm);

      await waitForRender();

      const actionsSlot = popconfirm.shadowRoot.querySelector(
        'slot[name="actions"]'
      );
      expect(actionsSlot).toBeTruthy();
    });
  });

  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.setAttribute("placement", "bottom");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await waitForRender();

      expect(popconfirm.shadowRoot).toBeTruthy();
      expect(popconfirm.placement).toBe("bottom");
    });

    it("组件断开连接后应该正常移除", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await waitForRender();

      popconfirm.remove();

      expect(popconfirm.isConnected).toBe(false);
    });

    it("应该支持属性动态更新", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await waitForRender();

      expect(popconfirm.heading).toBe("");

      popconfirm.setAttribute("heading", "New Title");

      await waitForRender();

      expect(popconfirm.heading).toBe("New Title");
    });
  });
});
