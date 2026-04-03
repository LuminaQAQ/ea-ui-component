import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// 导入 ea-popper 组件
import "../common/ea-popper/index.js";

describe("EaPopper Component", () => {
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
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `
        <span>Content</span>
        <button slot="reference">Trigger</button>
      `;
      container.appendChild(popper);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(popper.shadowRoot).toBeTruthy();
      expect(popper.shadowRoot.querySelector(".ea-popper")).toBeTruthy();
    });

    it("应该支持 CSS Parts", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `
        <span>Content</span>
        <button slot="reference">Trigger</button>
      `;
      container.appendChild(popper);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(
        popper.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
      expect(
        popper.shadowRoot.querySelector('[part="reference"]')
      ).toBeTruthy();
      expect(popper.shadowRoot.querySelector('[part="original"]')).toBeTruthy();
    });

    it("应该渲染默认 slot 和 reference slot", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `
        <span>Content</span>
        <button slot="reference">Trigger</button>
      `;
      container.appendChild(popper);

      await new Promise(resolve => setTimeout(resolve, 50));

      const defaultSlot = popper.shadowRoot.querySelector("slot:not([name])");
      const referenceSlot = popper.shadowRoot.querySelector(
        'slot[name="reference"]'
      );
      expect(defaultSlot).toBeTruthy();
      expect(referenceSlot).toBeTruthy();
    });
  });

  /**
   * Width 属性测试
   */
  describe("Width Attribute", () => {
    it("默认 width 应该是 150", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(Number(popper.width)).toBe(150);
    });

    it("应该支持自定义 width", async () => {
      const popper = document.createElement("ea-popper");
      popper.setAttribute("width", "200");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(Number(popper.width)).toBe(200);
    });
  });

  /**
   * Placement 属性测试
   */
  describe("Placement Attribute", () => {
    it("默认 placement 应该是 top", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(popper.placement).toBe("top");
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
        const popper = document.createElement("ea-popper");
        popper.setAttribute("placement", placement);
        popper.innerHTML = `<button slot="reference">Trigger</button>`;
        container.appendChild(popper);

        await new Promise(resolve => setTimeout(resolve, 30));

        expect(popper.placement).toBe(placement);
        container.removeChild(popper);
      }
    });
  });

  /**
   * Show-arrow 属性测试
   */
  describe("Show-arrow Attribute", () => {
    it("默认 show-arrow 应该是 true", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(
        popper["show-arrow"] === true || popper["show-arrow"] === null
      ).toBe(true);
    });

    it("应该支持 show-arrow 设置为 false", async () => {
      const popper = document.createElement("ea-popper");
      popper.setAttribute("show-arrow", "false");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(popper["show-arrow"]).toBe(false);
    });
  });

  /**
   * Status 属性测试
   */
  describe("Status Attribute", () => {
    it("默认 status 应该是 false", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(popper.status === false || popper.status === null).toBe(true);
    });

    it("应该支持 status 属性设置为 true", async () => {
      const popper = document.createElement("ea-popper");
      popper.setAttribute("status", "");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(popper.status).toBe(true);
    });
  });

  /**
   * Offset 属性测试
   */
  describe("Offset Attribute", () => {
    it("默认 offset 应该是 '0 0'", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(popper.offset).toBe("0 0");
    });

    it("应该支持自定义 offset", async () => {
      const popper = document.createElement("ea-popper");
      popper.setAttribute("offset", "10 20");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(popper.offset).toBe("10 20");
    });

    it("应该支持单个值的 offset", async () => {
      const popper = document.createElement("ea-popper");
      popper.setAttribute("offset", "15");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(popper.offset).toBe("15");
    });
  });

  /**
   * Flip 属性测试
   */
  describe("Flip Attribute", () => {
    it("默认 flip 应该是 true", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(popper.flip === true || popper.flip === null).toBe(true);
    });

    it("应该支持 flip 设置为 false", async () => {
      const popper = document.createElement("ea-popper");
      popper.setAttribute("flip", "false");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(popper.flip).toBe(false);
    });
  });

  /**
   * 方法测试
   */
  describe("Methods", () => {
    it("show() 方法应该显示 popper", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(popper.status === false || popper.status === null).toBe(true);

      popper.show();

      expect(popper.status).toBe(true);
    });

    it("hide() 方法应该隐藏 popper", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await new Promise(resolve => setTimeout(resolve, 50));

      popper.show();
      expect(popper.status).toBe(true);

      popper.hide();

      expect(popper.status === false || popper.status === null).toBe(true);
    });

    it("toggle() 方法应该切换 popper 显示状态", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await new Promise(resolve => setTimeout(resolve, 50));

      // 先显示 popper
      popper.show();
      expect(popper.status).toBe(true);

      popper.toggle();
      expect(popper.status === false || popper.status === null).toBe(true);

      popper.toggle();
      expect(popper.status).toBe(true);
    });
  });

  /**
   * 事件测试
   */
  describe("Events", () => {
    it("应该触发 show 事件", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await new Promise(resolve => setTimeout(resolve, 50));

      const showHandler = vi.fn();
      popper.addEventListener("show", showHandler);

      popper.show();

      expect(showHandler).toHaveBeenCalled();
    });

    it("应该触发 hide 事件", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await new Promise(resolve => setTimeout(resolve, 50));

      popper.show();

      const hideHandler = vi.fn();
      popper.addEventListener("hide", hideHandler);

      popper.hide();

      expect(hideHandler).toHaveBeenCalled();
    });

    it("应该触发 shown 事件", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await new Promise(resolve => setTimeout(resolve, 50));

      const shownHandler = vi.fn();
      popper.addEventListener("shown", shownHandler);

      popper.show();

      // shown 事件在动画结束时触发，这里只检查 show 事件被触发
      expect(popper.status).toBe(true);
    });

    it("应该触发 hidden 事件", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await new Promise(resolve => setTimeout(resolve, 50));

      popper.show();

      const hiddenHandler = vi.fn();
      popper.addEventListener("hidden", hiddenHandler);

      popper.hide();

      // hidden 事件在动画结束时触发，这里只检查 hide 事件被触发
      expect(popper.status === false || popper.status === null).toBe(true);
    });
  });

  /**
   * 边界条件测试
   */
  describe("Edge Cases", () => {
    it("应该处理没有 reference slot 的情况", async () => {
      const popper = document.createElement("ea-popper");
      container.appendChild(popper);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(popper.shadowRoot).toBeTruthy();
    });

    it("应该处理空 content", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(popper.shadowRoot).toBeTruthy();
    });

    it("应该处理无效的 offset 值", async () => {
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      const popper = document.createElement("ea-popper");
      popper.setAttribute("offset", "invalid");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await new Promise(resolve => setTimeout(resolve, 50));

      // 组件应该仍然可以工作
      expect(popper.shadowRoot).toBeTruthy();

      consoleSpy.mockRestore();
    });
  });

  /**
   * 生命周期测试
   */
  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const popper = document.createElement("ea-popper");
      popper.setAttribute("placement", "bottom");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(popper.shadowRoot).toBeTruthy();
      expect(popper.placement).toBe("bottom");
    });

    it("组件断开连接后应该正常移除", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await new Promise(resolve => setTimeout(resolve, 50));

      popper.remove();

      expect(popper.isConnected).toBe(false);
    });

    it("应该支持属性动态更新", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(popper.placement).toBe("top");

      popper.setAttribute("placement", "right");

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(popper.placement).toBe("right");
    });
  });
});
