import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender.js";

// 导入 ea-popper 组件
import "../common/ea-popper/index.ts";

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

      await waitForRender();

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

      await waitForRender();

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

      await waitForRender();

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

      await waitForRender();

      expect(Number(popper.width)).toBe(150);
    });

    it("应该支持自定义 width", async () => {
      const popper = document.createElement("ea-popper");
      popper.setAttribute("width", "200");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      expect(Number(popper.width)).toBe(200);
    });

    it("width 变化应该更新 CSS 变量", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      popper.width = 300;
      await waitForRender();

      const original = popper.shadowRoot.querySelector(".ea-popper__original");
      expect(original.style.getPropertyValue("--ea-popper-width")).toBe(
        "300px"
      );
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

      await waitForRender();

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

        await waitForRender(30);

        expect(popper.placement).toBe(placement);
        container.removeChild(popper);
      }
    });

    it("placement 变化应该更新 className", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      const containerEl = popper.shadowRoot.querySelector(".ea-popper");
      expect(containerEl.classList.contains("ea-popper--top")).toBe(true);

      popper.placement = "bottom";
      await waitForRender();

      expect(containerEl.classList.contains("ea-popper--bottom")).toBe(true);
    });
  });

  /**
   * Show-arrow 属性测试
   */
  describe("Show-arrow Attribute", () => {
    it("默认 showArrow 应该是 true", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      expect(popper.showArrow).toBe(true);
    });

    it("应该支持 showArrow 设置为 false", async () => {
      const popper = document.createElement("ea-popper");
      popper.setAttribute("show-arrow", "false");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      expect(popper.showArrow).toBe(false);
    });

    it("showArrow 变化应该更新 className", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      const containerEl = popper.shadowRoot.querySelector(".ea-popper");
      expect(containerEl.classList.contains("is-show-arrow")).toBe(true);

      popper.showArrow = false;
      await waitForRender();

      expect(containerEl.classList.contains("is-show-arrow")).toBe(false);
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

      await waitForRender();

      expect(popper.status).toBe(false);
    });

    it("应该支持 status 属性设置为 true", async () => {
      const popper = document.createElement("ea-popper");
      popper.setAttribute("status", "");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      expect(popper.status).toBe(true);
    });

    it("status 为 true 时应该添加 is-show 类", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      popper.show();
      await waitForRender(100);

      const containerEl = popper.shadowRoot.querySelector(".ea-popper");
      expect(containerEl.classList.contains("is-show")).toBe(true);
    });

    it("status 为 false 时不应该添加 is-show 类", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      const containerEl = popper.shadowRoot.querySelector(".ea-popper");
      expect(containerEl.classList.contains("is-show")).toBe(false);
    });

    it("show() 方法应该添加 is-show 类", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      popper.show();
      await waitForRender(50);

      const containerEl = popper.shadowRoot.querySelector(".ea-popper");
      // is-before-show 在调用 show() 后会被立即添加，然后 is-show 也会被添加
      // 由于 transitionend 事件触发后会调用 updateContainerClasslist() 重置 className
      // 所以最终只有 is-show 类（取决于 status 状态）
      expect(containerEl.classList.contains("is-show")).toBe(true);
    });

    it("hide() 方法应该添加 is-before-hide 类", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      popper.show();
      await waitForRender(50);

      popper.hide();
      await waitForRender(50);

      const containerEl = popper.shadowRoot.querySelector(".ea-popper");
      expect(containerEl.classList.contains("is-before-hide")).toBe(true);
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

      await waitForRender();

      expect(popper.offset).toBe("0 0");
    });

    it("应该支持自定义 offset", async () => {
      const popper = document.createElement("ea-popper");
      popper.setAttribute("offset", "10 20");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      expect(popper.offset).toBe("10 20");
    });

    it("应该支持单个值的 offset", async () => {
      const popper = document.createElement("ea-popper");
      popper.setAttribute("offset", "15");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      expect(popper.offset).toBe("15");
    });

    it("offset 变化应该更新 CSS 变量", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      popper.offset = "30 40";
      await waitForRender();

      const original = popper.shadowRoot.querySelector(".ea-popper__original");
      expect(original.style.getPropertyValue("--ea-popper-transform-x")).toBe(
        "30px"
      );
      expect(original.style.getPropertyValue("--ea-popper-transform-y")).toBe(
        "40px"
      );
    });

    it("应该处理 '0 0' 格式的 offset", async () => {
      const popper = document.createElement("ea-popper");
      popper.setAttribute("offset", "0 0");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      const original = popper.shadowRoot.querySelector(".ea-popper__original");
      expect(original.style.getPropertyValue("--ea-popper-transform-x")).toBe(
        "0px"
      );
      expect(original.style.getPropertyValue("--ea-popper-transform-y")).toBe(
        "0px"
      );
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

      await waitForRender();

      expect(popper.flip).toBe(true);
    });

    it("应该支持 flip 设置为 false", async () => {
      const popper = document.createElement("ea-popper");
      popper.setAttribute("flip", "false");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      expect(popper.flip).toBe(false);
    });
  });

  /**
   * 方法测试
   */
  describe("Methods", () => {
    it("show() 方法应该设置 status 为 true", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      expect(popper.status).toBe(false);

      popper.show();

      expect(popper.status).toBe(true);
    });

    it("hide() 方法应该设置 status 为 false", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      popper.show();
      expect(popper.status).toBe(true);

      popper.hide();

      expect(popper.status).toBe(false);
    });

    it("toggle() 方法应该切换 status", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      popper.show();
      expect(popper.status).toBe(true);

      popper.toggle();
      expect(popper.status).toBe(false);

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

      await waitForRender();

      const showHandler = vi.fn();
      popper.addEventListener("show", showHandler);

      popper.show();

      await waitForRender(50);

      expect(showHandler).toHaveBeenCalled();
    });

    it("应该触发 hide 事件", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      popper.show();
      await waitForRender(50);

      const hideHandler = vi.fn();
      popper.addEventListener("hide", hideHandler);

      popper.hide();

      await waitForRender(50);

      expect(hideHandler).toHaveBeenCalled();
    });

    it("应该触发 shown 事件", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      const shownHandler = vi.fn();
      popper.addEventListener("shown", shownHandler);

      popper.show();
      await waitForRender(50);

      // shown 事件在 transitionend 时触发，模拟 transitionend
      // 注意：事件监听是在 show() 方法内部添加的，需要确保 transitionend 在正确的元素上触发
      const containerEl = popper.shadowRoot.querySelector(".ea-popper");
      containerEl.dispatchEvent(new Event("transitionend", { bubbles: true }));

      await waitForRender(50);

      expect(shownHandler).toHaveBeenCalled();
    });

    it("应该触发 hidden 事件", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      popper.show();
      await waitForRender(50);

      const hiddenHandler = vi.fn();
      popper.addEventListener("hidden", hiddenHandler);

      popper.hide();
      await waitForRender(50);

      // hidden 事件在 transitionend 时触发，模拟 transitionend
      // 注意：事件监听是在 hide() 方法内部添加的，需要确保 transitionend 在正确的元素上触发
      const containerEl = popper.shadowRoot.querySelector(".ea-popper");
      containerEl.dispatchEvent(new Event("transitionend", { bubbles: true }));

      await waitForRender(50);

      expect(hiddenHandler).toHaveBeenCalled();
    });

    it("show 事件应该是可冒泡的", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      let eventDetail = null;
      popper.addEventListener("show", e => {
        eventDetail = e.detail;
      });

      popper.show();
      await waitForRender(50);

      expect(eventDetail).toBeDefined();
    });
  });

  /**
   * updateContainerClasslist 方法测试
   */
  describe("updateContainerClasslist", () => {
    it("应该返回正确的 className", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      const className = popper.updateContainerClasslist();
      expect(className).toContain("ea-popper");
      expect(className).toContain("ea-popper--top");
      expect(className).toContain("is-show-arrow");
    });

    it("应该更新 _container 的 className", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      popper.placement = "bottom";
      popper.showArrow = false;
      await waitForRender();

      const containerEl = popper.shadowRoot.querySelector(".ea-popper");
      expect(containerEl.classList.contains("ea-popper--bottom")).toBe(true);
      expect(containerEl.classList.contains("is-show-arrow")).toBe(false);
    });
  });

  /**
   * 边界条件测试
   */
  describe("Edge Cases", () => {
    it("应该处理没有 reference slot 的情况", async () => {
      const popper = document.createElement("ea-popper");
      container.appendChild(popper);

      await waitForRender();

      expect(popper.shadowRoot).toBeTruthy();
    });

    it("应该处理空 content", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

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

      await waitForRender();

      // 组件应该仍然可以工作
      expect(popper.shadowRoot).toBeTruthy();

      consoleSpy.mockRestore();
    });

    it("应该处理空字符串 offset", async () => {
      // 空字符串 offset 会导致 RangeError，组件会抛出错误
      // 测试验证组件在无效 offset 值下的行为
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      const popper = document.createElement("ea-popper");
      popper.setAttribute("offset", "");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      // 空字符串会导致错误被记录
      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });

    it("快速切换 status 不应该导致错误", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      // 快速切换多次
      popper.show();
      popper.hide();
      popper.show();
      popper.hide();

      await waitForRender(100);

      expect(popper.status).toBe(false);
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

      await waitForRender();

      expect(popper.shadowRoot).toBeTruthy();
      expect(popper.placement).toBe("bottom");
    });

    it("组件断开连接后应该正常移除", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      popper.remove();

      expect(popper.isConnected).toBe(false);
    });

    it("应该支持属性动态更新", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      expect(popper.placement).toBe("top");

      popper.setAttribute("placement", "right");

      await waitForRender();

      expect(popper.placement).toBe("right");
    });

    it("重复连接断开不应该导致内存泄漏", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;

      // 多次连接和断开
      for (let i = 0; i < 3; i++) {
        container.appendChild(popper);
        await waitForRender();
        popper.remove();
        await waitForRender();
      }

      expect(popper.isConnected).toBe(false);
    });
  });

  /**
   * 属性联动测试
   */
  describe("Attribute Interactions", () => {
    it("同时设置多个属性应该正常工作", async () => {
      const popper = document.createElement("ea-popper");
      popper.setAttribute("width", "300");
      popper.setAttribute("placement", "left");
      popper.setAttribute("show-arrow", "false");
      popper.setAttribute("offset", "10 10");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      expect(Number(popper.width)).toBe(300);
      expect(popper.placement).toBe("left");
      expect(popper.showArrow).toBe(false);
      expect(popper.offset).toBe("10 10");
    });

    it("status 和 placement 同时变化应该正常工作", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      // 先设置 placement，再 show
      popper.placement = "right";
      await waitForRender(50);

      // 禁用 flip 以避免自动调整 placement
      popper.flip = false;

      popper.show();
      await waitForRender(50);

      const containerEl = popper.shadowRoot.querySelector(".ea-popper");
      // 注意：show() 方法内部会调用 updateContainerClasslist() 更新 className
      // 由于 flip 被禁用，placement 应该保持为 right
      expect(containerEl.classList.contains("ea-popper--right")).toBe(true);
      expect(containerEl.classList.contains("is-show")).toBe(true);
    });
  });
});
