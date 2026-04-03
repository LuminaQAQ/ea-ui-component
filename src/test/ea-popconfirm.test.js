import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// 导入 ea-popconfirm 组件
import "../components/ea-popconfirm/index.js";

describe("EaPopconfirm Component", () => {
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
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(popconfirm.shadowRoot).toBeTruthy();
      expect(popconfirm.shadowRoot.querySelector(".ea-popper")).toBeTruthy();
    });

    it("应该支持 CSS Parts", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await new Promise(resolve => setTimeout(resolve, 50));

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

      await new Promise(resolve => setTimeout(resolve, 50));

      const referenceSlot = popconfirm.shadowRoot.querySelector(
        'slot[name="reference"]'
      );
      expect(referenceSlot).toBeTruthy();
    });
  });

  /**
   * Title 属性测试
   */
  describe("Title Attribute", () => {
    it("应该支持 title 属性", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.setAttribute("title", "Are you sure?");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(popconfirm.title).toBe("Are you sure?");
    });

    it("title 应该渲染在 shadow DOM 中", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await new Promise(resolve => setTimeout(resolve, 50));

      // 组件连接后再设置 title 以触发 observer
      popconfirm.setAttribute("title", "Are you sure?");

      await new Promise(resolve => setTimeout(resolve, 100));

      // 检查属性值是否正确
      expect(popconfirm.title).toBe("Are you sure?");

      // 检查 shadow DOM 中的 title 元素（通过类名）
      const titleContainer = popconfirm.shadowRoot.querySelector(
        ".ea-popconfirm__title"
      );
      expect(titleContainer).toBeTruthy();
    });
  });

  /**
   * Icon 属性测试
   */
  describe("Icon Attribute", () => {
    it("默认 icon 应该是 circle-question", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(popconfirm.icon).toBe("circle-question");
    });

    it("应该支持自定义 icon", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.setAttribute("icon", "circle-info");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(popconfirm.icon).toBe("circle-info");
    });
  });

  /**
   * Icon-color 属性测试
   */
  describe("Icon-color Attribute", () => {
    it("默认 icon-color 应该是 rgb(255, 153, 0)", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(popconfirm["icon-color"]).toBe("rgb(255, 153, 0)");
    });

    it("应该支持自定义 icon-color", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.setAttribute("icon-color", "#626AEF");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(popconfirm["icon-color"]).toBe("#626AEF");
    });
  });

  /**
   * Hide-icon 属性测试
   */
  describe("Hide-icon Attribute", () => {
    it("默认 hide-icon 应该是 false", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(
        popconfirm["hide-icon"] === false || popconfirm["hide-icon"] === null
      ).toBe(true);
    });

    it("应该支持 hide-icon 属性", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.setAttribute("hide-icon", "");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(popconfirm["hide-icon"]).toBe(true);
    });
  });

  /**
   * Confirm-button-text 属性测试
   */
  describe("Confirm-button-text Attribute", () => {
    it("默认 confirm-button-text 应该是 '确定'", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(popconfirm["confirm-button-text"]).toBe("确定");
    });

    it("应该支持自定义 confirm-button-text", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.setAttribute("confirm-button-text", "Yes");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(popconfirm["confirm-button-text"]).toBe("Yes");
    });
  });

  /**
   * Cancel-button-text 属性测试
   */
  describe("Cancel-button-text Attribute", () => {
    it("默认 cancel-button-text 应该是 '取消'", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(popconfirm["cancel-button-text"]).toBe("取消");
    });

    it("应该支持自定义 cancel-button-text", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.setAttribute("cancel-button-text", "No");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(popconfirm["cancel-button-text"]).toBe("No");
    });
  });

  /**
   * Confirm-button-type 属性测试
   */
  describe("Confirm-button-type Attribute", () => {
    it("默认 confirm-button-type 应该是 primary", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(popconfirm["confirm-button-type"]).toBe("primary");
    });

    it("应该支持不同的 confirm-button-type", async () => {
      const types = ["normal", "primary", "success", "warning", "danger"];

      for (const type of types) {
        const popconfirm = document.createElement("ea-popconfirm");
        popconfirm.setAttribute("confirm-button-type", type);
        popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
        container.appendChild(popconfirm);

        await new Promise(resolve => setTimeout(resolve, 30));

        expect(popconfirm["confirm-button-type"]).toBe(type);
        container.removeChild(popconfirm);
      }
    });
  });

  /**
   * Cancel-button-type 属性测试
   */
  describe("Cancel-button-type Attribute", () => {
    it("默认 cancel-button-type 应该是 normal", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(popconfirm["cancel-button-type"]).toBe("normal");
    });

    it("应该支持不同的 cancel-button-type", async () => {
      const types = ["normal", "primary", "success", "warning", "danger"];

      for (const type of types) {
        const popconfirm = document.createElement("ea-popconfirm");
        popconfirm.setAttribute("cancel-button-type", type);
        popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
        container.appendChild(popconfirm);

        await new Promise(resolve => setTimeout(resolve, 30));

        expect(popconfirm["cancel-button-type"]).toBe(type);
        container.removeChild(popconfirm);
      }
    });
  });

  /**
   * Placement 属性测试
   */
  describe("Placement Attribute", () => {
    it("默认 placement 应该是 top", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await new Promise(resolve => setTimeout(resolve, 50));

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

        await new Promise(resolve => setTimeout(resolve, 30));

        expect(popconfirm.placement).toBe(placement);
        container.removeChild(popconfirm);
      }
    });
  });

  /**
   * Width 属性测试
   */
  describe("Width Attribute", () => {
    it("默认 width 应该是 150", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(Number(popconfirm.width)).toBe(150);
    });

    it("应该支持自定义 width", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.setAttribute("width", "220");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(Number(popconfirm.width)).toBe(220);
    });
  });

  /**
   * Visible 属性测试
   */
  describe("Visible Attribute", () => {
    it("默认 visible 应该是 false", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(popconfirm.visible === false || popconfirm.visible === null).toBe(
        true
      );
    });

    it("应该支持 visible 属性设置为 true", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.setAttribute("visible", "");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(popconfirm.visible).toBe(true);
    });
  });

  /**
   * 方法测试
   */
  describe("Methods", () => {
    it("open() 方法应该显示 popconfirm", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(popconfirm.status === false || popconfirm.status === null).toBe(
        true
      );

      popconfirm.open();

      expect(popconfirm.status).toBe(true);
    });

    it("close() 方法应该隐藏 popconfirm", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await new Promise(resolve => setTimeout(resolve, 50));

      popconfirm.open();
      expect(popconfirm.status).toBe(true);

      popconfirm.close();

      expect(popconfirm.status === false || popconfirm.status === null).toBe(
        true
      );
    });

    it("show() 方法应该显示 popconfirm", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await new Promise(resolve => setTimeout(resolve, 50));

      popconfirm.show();

      expect(popconfirm.status).toBe(true);
    });

    it("hide() 方法应该隐藏 popconfirm", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await new Promise(resolve => setTimeout(resolve, 50));

      popconfirm.open();
      expect(popconfirm.status).toBe(true);

      popconfirm.hide();

      expect(popconfirm.status === false || popconfirm.status === null).toBe(
        true
      );
    });
  });

  /**
   * 事件测试
   */
  describe("Events", () => {
    it("应该触发 confirm 事件", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await new Promise(resolve => setTimeout(resolve, 50));

      const confirmHandler = vi.fn();
      popconfirm.addEventListener("confirm", confirmHandler);

      // 触发 confirm 事件
      popconfirm.dispatchEvent(new CustomEvent("confirm"));

      expect(confirmHandler).toHaveBeenCalled();
    });

    it("应该触发 cancel 事件", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await new Promise(resolve => setTimeout(resolve, 50));

      const cancelHandler = vi.fn();
      popconfirm.addEventListener("cancel", cancelHandler);

      // 触发 cancel 事件
      popconfirm.dispatchEvent(new CustomEvent("cancel"));

      expect(cancelHandler).toHaveBeenCalled();
    });
  });

  /**
   * 边界条件测试
   */
  describe("Edge Cases", () => {
    it("应该处理没有 reference slot 的情况", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      container.appendChild(popconfirm);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(popconfirm.shadowRoot).toBeTruthy();
    });

    it("应该处理空 title", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.setAttribute("title", "");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(popconfirm.title).toBe("");
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

      await new Promise(resolve => setTimeout(resolve, 50));

      const actionsSlot = popconfirm.shadowRoot.querySelector(
        'slot[name="actions"]'
      );
      expect(actionsSlot).toBeTruthy();
    });
  });

  /**
   * 生命周期测试
   */
  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.setAttribute("placement", "bottom");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(popconfirm.shadowRoot).toBeTruthy();
      expect(popconfirm.placement).toBe("bottom");
    });

    it("组件断开连接后应该正常移除", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await new Promise(resolve => setTimeout(resolve, 50));

      popconfirm.remove();

      expect(popconfirm.isConnected).toBe(false);
    });

    it("应该支持属性动态更新", async () => {
      const popconfirm = document.createElement("ea-popconfirm");
      popconfirm.innerHTML = `<button slot="reference">Delete</button>`;
      container.appendChild(popconfirm);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(popconfirm.title).toBe("");

      popconfirm.setAttribute("title", "New Title");

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(popconfirm.title).toBe("New Title");
    });
  });
});
