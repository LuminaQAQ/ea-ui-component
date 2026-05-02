import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender.js";

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

  describe("Basic Functionality", () => {
    it("应该正确渲染组件并包含 shadowRoot", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `
        <span>Content</span>
        <button slot="reference">Trigger</button>
      `;
      container.appendChild(popper);

      await waitForRender();

      expect(popper.shadowRoot).toBeTruthy();
    });

    it("应该渲染 .ea-popper 容器", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      expect(popper.shadowRoot.querySelector(".ea-popper")).toBeTruthy();
    });

    it("应该渲染 .ea-popper__reference 元素", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      expect(
        popper.shadowRoot.querySelector(".ea-popper__reference")
      ).toBeTruthy();
    });

    it("应该渲染 .ea-popper__original 元素", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      expect(
        popper.shadowRoot.querySelector(".ea-popper__original")
      ).toBeTruthy();
    });

    it("应该支持 CSS Parts（container, reference, original）", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
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

    it("应该渲染默认 slot", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `
        <span>Content</span>
        <button slot="reference">Trigger</button>
      `;
      container.appendChild(popper);

      await waitForRender();

      const defaultSlot = popper.shadowRoot.querySelector("slot:not([name])");
      expect(defaultSlot).toBeTruthy();
    });

    it("应该渲染 reference slot", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      const referenceSlot = popper.shadowRoot.querySelector(
        'slot[name="reference"]'
      );
      expect(referenceSlot).toBeTruthy();
    });

    it("container 应该有 tabindex=-1", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      const containerEl = popper.shadowRoot.querySelector(".ea-popper");
      expect(containerEl.getAttribute("tabindex")).toBe("-1");
    });

    it("original 应该有 tabindex=0", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      const originalEl = popper.shadowRoot.querySelector(
        ".ea-popper__original"
      );
      expect(originalEl.getAttribute("tabindex")).toBe("0");
    });

    it("reference 应该有 tabindex=-1", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      const referenceEl = popper.shadowRoot.querySelector(
        ".ea-popper__reference"
      );
      expect(referenceEl.getAttribute("tabindex")).toBe("-1");
    });
  });

  describe("Width Attribute", () => {
    it("默认 width 应该是 150", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      expect(popper.width).toBe(150);
    });

    it("应该支持通过 HTML 属性设置 width", async () => {
      const popper = document.createElement("ea-popper");
      popper.setAttribute("width", "200");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      expect(popper.width).toBe(200);
    });

    it("width 变化应该更新 CSS 变量 --ea-popper-width", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      popper.width = 300;
      await waitForRender();

      expect(popper.style.getPropertyValue("--ea-popper-width")).toBe("300px");
    });

    it("width 初始化时应该设置 CSS 变量", async () => {
      const popper = document.createElement("ea-popper");
      popper.setAttribute("width", "250");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      expect(popper.style.getPropertyValue("--ea-popper-width")).toBe("250px");
    });

    it("width 设置为 0 应该正常工作", async () => {
      const popper = document.createElement("ea-popper");
      popper.setAttribute("width", "0");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      expect(popper.width).toBe(0);
    });
  });

  describe("Placement Attribute", () => {
    it("默认 placement 应该是 top", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      expect(popper.placement).toBe("top");
    });

    it("应该支持所有 12 个 placement 值", async () => {
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

        await waitForRender();

        expect(popper.placement).toBe(placement);
        container.removeChild(popper);
      }
    });

    it("placement 应该生成对应的 BEM 修饰符类名", async () => {
      const popper = document.createElement("ea-popper");
      popper.setAttribute("placement", "bottom-start");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      const containerEl = popper.shadowRoot.querySelector(".ea-popper");
      expect(containerEl.classList.contains("ea-popper--bottom-start")).toBe(
        true
      );
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

      expect(containerEl.classList.contains("ea-popper--top")).toBe(false);
      expect(containerEl.classList.contains("ea-popper--bottom")).toBe(true);
    });

    it("无效的 placement 值应该回退到 null", async () => {
      const popper = document.createElement("ea-popper");
      popper.setAttribute("placement", "invalid");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      expect(popper.placement).toBeNull();
    });
  });

  describe("Show-arrow Attribute", () => {
    it("默认 showArrow 应该是 true", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      expect(popper.showArrow).toBe(true);
    });

    it("showArrow 为 true 时应该添加 is-show-arrow 状态类", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      const containerEl = popper.shadowRoot.querySelector(".ea-popper");
      expect(containerEl.classList.contains("is-show-arrow")).toBe(true);
    });

    it("应该支持通过 HTML 属性 show-arrow='false' 设置", async () => {
      const popper = document.createElement("ea-popper");
      popper.setAttribute("show-arrow", "false");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      expect(popper.showArrow).toBe(false);
    });

    it("showArrow 为 false 时不应该添加 is-show-arrow 状态类", async () => {
      const popper = document.createElement("ea-popper");
      popper.setAttribute("show-arrow", "false");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      const containerEl = popper.shadowRoot.querySelector(".ea-popper");
      expect(containerEl.classList.contains("is-show-arrow")).toBe(false);
    });

    it("showArrow 变化应该更新 className", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      const containerEl = popper.shadowRoot.querySelector(".ea-popper");
      expect(containerEl.classList.contains("is-show-arrow")).toBe(true);

      popper.setAttribute("show-arrow", "false");
      await waitForRender();

      expect(containerEl.classList.contains("is-show-arrow")).toBe(false);
    });

    it("showArrow 从 false 变为 true 应该重新添加 is-show-arrow 状态类", async () => {
      const popper = document.createElement("ea-popper");
      popper.setAttribute("show-arrow", "false");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      const containerEl = popper.shadowRoot.querySelector(".ea-popper");
      expect(containerEl.classList.contains("is-show-arrow")).toBe(false);

      popper.setAttribute("show-arrow", "true");
      await waitForRender();

      expect(containerEl.classList.contains("is-show-arrow")).toBe(true);
    });
  });

  describe("Visible Attribute", () => {
    it("默认 visible 应该是 false", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      expect(popper.visible).toBe(false);
    });

    it("应该支持通过 HTML 属性设置 visible 为 true", async () => {
      const popper = document.createElement("ea-popper");
      popper.setAttribute("visible", "");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      expect(popper.visible).toBe(true);
    });

    it("visible 为 true 时应该添加 is-show 类", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      popper.show();
      await waitForRender();

      const containerEl = popper.shadowRoot.querySelector(".ea-popper");
      expect(containerEl.classList.contains("is-show")).toBe(true);
    });

    it("visible 为 false 时不应有 is-show 类", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      const containerEl = popper.shadowRoot.querySelector(".ea-popper");
      expect(containerEl.classList.contains("is-show")).toBe(false);
    });

    it("hide() 应该添加 is-before-hide 类", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      popper.show();
      await waitForRender();

      popper.hide();
      await waitForRender();

      const containerEl = popper.shadowRoot.querySelector(".ea-popper");
      expect(containerEl.classList.contains("is-before-hide")).toBe(true);
    });

    it("visible 变化时应该创建新的 AbortController", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      popper.show();
      await waitForRender();

      popper.hide();
      await waitForRender();

      popper.show();
      await waitForRender();

      expect(popper.visible).toBe(true);
    });
  });

  describe("Offset Attribute", () => {
    it("默认 offset 应该是 '0 0'", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      expect(popper.offset).toBe("0 0");
    });

    it("应该支持自定义 offset 格式 'x y'", async () => {
      const popper = document.createElement("ea-popper");
      popper.setAttribute("offset", "10 20");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      expect(popper.offset).toBe("10 20");
    });

    it("应该支持单个值的 offset（y 默认等于 x）", async () => {
      const popper = document.createElement("ea-popper");
      popper.setAttribute("offset", "15");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      expect(popper.offset).toBe("15");
    });

    it("offset 变化应该更新 CSS 变量 --ea-popper-transform-x 和 --ea-popper-transform-y", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      popper.offset = "30 40";
      await waitForRender();

      expect(popper.style.getPropertyValue("--ea-popper-transform-x")).toBe(
        "30px"
      );
      expect(popper.style.getPropertyValue("--ea-popper-transform-y")).toBe(
        "40px"
      );
    });

    it("offset='0 0' 应该设置 CSS 变量为 0px", async () => {
      const popper = document.createElement("ea-popper");
      popper.setAttribute("offset", "0 0");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      expect(popper.style.getPropertyValue("--ea-popper-transform-x")).toBe(
        "0px"
      );
      expect(popper.style.getPropertyValue("--ea-popper-transform-y")).toBe(
        "0px"
      );
    });

    it("应该处理无效的 offset 值并输出错误", async () => {
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      const popper = document.createElement("ea-popper");
      popper.setAttribute("offset", "invalid");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });

    it("应该处理空字符串 offset 并输出错误", async () => {
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      const popper = document.createElement("ea-popper");
      popper.setAttribute("offset", "");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });

    it("应该处理负数 offset", async () => {
      const popper = document.createElement("ea-popper");
      popper.setAttribute("offset", "-10 -20");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      expect(popper.style.getPropertyValue("--ea-popper-transform-x")).toBe(
        "-10px"
      );
      expect(popper.style.getPropertyValue("--ea-popper-transform-y")).toBe(
        "-20px"
      );
    });
  });

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

    it("flip 设置为 true（显式）", async () => {
      const popper = document.createElement("ea-popper");
      popper.setAttribute("flip", "");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      expect(popper.flip).toBe(true);
    });
  });

  describe("Methods", () => {
    it("show() 方法应该设置 visible 为 true", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      expect(popper.visible).toBe(false);

      popper.show();

      expect(popper.visible).toBe(true);
    });

    it("hide() 方法应该设置 visible 为 false", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      popper.show();
      expect(popper.visible).toBe(true);

      popper.hide();

      expect(popper.visible).toBe(false);
    });

    it("toggle() 方法应该切换 visible", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      expect(popper.visible).toBe(false);

      popper.toggle();
      expect(popper.visible).toBe(true);

      popper.toggle();
      expect(popper.visible).toBe(false);
    });

    it("连续调用 show() 不应该导致错误", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      popper.show();
      popper.show();

      expect(popper.visible).toBe(true);
    });

    it("连续调用 hide() 不应该导致错误", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      popper.hide();
      popper.hide();

      expect(popper.visible).toBe(false);
    });
  });

  describe("updateContainerClasslist", () => {
    it("应该返回包含基础类名、修饰符和状态的 className", async () => {
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
      popper.setAttribute("show-arrow", "false");
      await waitForRender();

      const containerEl = popper.shadowRoot.querySelector(".ea-popper");
      expect(containerEl.classList.contains("ea-popper--bottom")).toBe(true);
      expect(containerEl.classList.contains("ea-popper--top")).toBe(false);
      expect(containerEl.classList.contains("is-show-arrow")).toBe(false);
    });

    it("visible 为 true 时 className 应包含 is-show 状态", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      popper.show();
      await waitForRender();

      const className = popper.updateContainerClasslist();
      expect(className).toContain("is-show");
    });

    it("visible 为 false 时 className 不应包含 is-show 状态", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      const className = popper.updateContainerClasslist();
      const classList = className.split(" ");
      expect(classList).not.toContain("is-show");
    });

    it("应该正确组合 placement 和 showArrow 状态", async () => {
      const popper = document.createElement("ea-popper");
      popper.setAttribute("placement", "left-end");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      const className = popper.updateContainerClasslist();
      expect(className).toContain("ea-popper--left-end");
      expect(className).toContain("is-show-arrow");
    });
  });

  describe("Events", () => {
    it("show() 应该触发 show 事件", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      const showHandler = vi.fn();
      popper.addEventListener("show", showHandler);

      popper.show();
      await waitForRender();

      expect(showHandler).toHaveBeenCalled();
    });

    it("hide() 应该触发 hide 事件", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      popper.show();
      await waitForRender();

      const hideHandler = vi.fn();
      popper.addEventListener("hide", hideHandler);

      popper.hide();
      await waitForRender();

      expect(hideHandler).toHaveBeenCalled();
    });

    it("show 后 transitionend 应该触发 shown 事件", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      const shownHandler = vi.fn();
      popper.addEventListener("shown", shownHandler);

      popper.show();
      await waitForRender();

      const containerEl = popper.shadowRoot.querySelector(".ea-popper");
      containerEl.dispatchEvent(new Event("transitionend", { bubbles: true }));

      await waitForRender();

      expect(shownHandler).toHaveBeenCalled();
    });

    it("hide 后 transitionend 应该触发 hidden 事件", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      popper.show();
      await waitForRender();

      const hiddenHandler = vi.fn();
      popper.addEventListener("hidden", hiddenHandler);

      popper.hide();
      await waitForRender();

      const containerEl = popper.shadowRoot.querySelector(".ea-popper");
      containerEl.dispatchEvent(new Event("transitionend", { bubbles: true }));

      await waitForRender();

      expect(hiddenHandler).toHaveBeenCalled();
    });

    it("show 事件应该是可冒泡的（bubbles: true）", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      let eventBubbles = false;
      popper.addEventListener("show", e => {
        eventBubbles = e.bubbles;
      });

      popper.show();
      await waitForRender();

      expect(eventBubbles).toBe(true);
    });

    it("show 事件应该可以穿透 Shadow DOM（composed: true）", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      let eventComposed = false;
      popper.addEventListener("show", e => {
        eventComposed = e.composed;
      });

      popper.show();
      await waitForRender();

      expect(eventComposed).toBe(true);
    });

    it("hide 事件应该是可冒泡的", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      popper.show();
      await waitForRender();

      let eventBubbles = false;
      popper.addEventListener("hide", e => {
        eventBubbles = e.bubbles;
      });

      popper.hide();
      await waitForRender();

      expect(eventBubbles).toBe(true);
    });

    it("shown 事件后应该调用 updateContainerClasslist 更新类名", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      popper.show();
      await waitForRender();

      const containerEl = popper.shadowRoot.querySelector(".ea-popper");
      containerEl.dispatchEvent(new Event("transitionend", { bubbles: true }));

      await waitForRender();

      expect(containerEl.classList.contains("is-show")).toBe(true);
      expect(containerEl.classList.contains("ea-popper--top")).toBe(true);
    });

    it("hidden 事件后应该调用 updateContainerClasslist 清除过渡类名", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      popper.show();
      await waitForRender();

      popper.hide();
      await waitForRender();

      const containerEl = popper.shadowRoot.querySelector(".ea-popper");
      containerEl.dispatchEvent(new Event("transitionend", { bubbles: true }));

      await waitForRender();

      expect(containerEl.classList.contains("is-show")).toBe(false);
      expect(containerEl.classList.contains("is-before-show")).toBe(false);
    });
  });

  describe("Transition States", () => {
    it("show() 后容器应该添加 is-show 类", async () => {
      const popper = document.createElement("ea-popper");
      popper.setAttribute("flip", "false");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      popper.show();
      await waitForRender();

      const containerEl = popper.shadowRoot.querySelector(".ea-popper");
      expect(containerEl.classList.contains("is-show")).toBe(true);
    });

    it("show() 后容器应该添加 is-before-show 过渡类", async () => {
      const popper = document.createElement("ea-popper");
      popper.setAttribute("flip", "false");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      popper.show();
      await waitForRender();

      const containerEl = popper.shadowRoot.querySelector(".ea-popper");
      expect(containerEl.classList.contains("is-before-show")).toBe(true);
    });

    it("hide() 后容器应该添加 is-before-hide 类", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      popper.show();
      await waitForRender();

      popper.hide();
      await waitForRender();

      const containerEl = popper.shadowRoot.querySelector(".ea-popper");
      expect(containerEl.classList.contains("is-before-hide")).toBe(true);
    });

    it("快速切换 visible 不应该导致错误", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      popper.show();
      popper.hide();
      popper.show();
      popper.hide();

      await waitForRender();

      expect(popper.visible).toBe(false);
    });

    it("快速 show/hide 后再 show 应该正常工作", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      popper.show();
      popper.hide();
      popper.show();

      await waitForRender();

      expect(popper.visible).toBe(true);

      const containerEl = popper.shadowRoot.querySelector(".ea-popper");
      expect(containerEl.classList.contains("is-show")).toBe(true);
    });
  });

  describe("CSS Variables", () => {
    it("width 属性应该设置 --ea-popper-width CSS 变量", async () => {
      const popper = document.createElement("ea-popper");
      popper.setAttribute("width", "200");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      expect(popper.style.getPropertyValue("--ea-popper-width")).toBe("200px");
    });

    it("offset 属性应该设置 --ea-popper-transform-x 和 --ea-popper-transform-y CSS 变量", async () => {
      const popper = document.createElement("ea-popper");
      popper.setAttribute("offset", "10 20");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      expect(popper.style.getPropertyValue("--ea-popper-transform-x")).toBe(
        "10px"
      );
      expect(popper.style.getPropertyValue("--ea-popper-transform-y")).toBe(
        "20px"
      );
    });

    it("CSS 变量应该设置在 host 元素上", async () => {
      const popper = document.createElement("ea-popper");
      popper.setAttribute("width", "180");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      expect(popper.style.getPropertyValue("--ea-popper-width")).toBe("180px");
    });

    it("动态更新 width 应该更新 CSS 变量", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      popper.width = 400;
      await waitForRender();

      expect(popper.style.getPropertyValue("--ea-popper-width")).toBe("400px");
    });

    it("动态更新 offset 应该更新 CSS 变量", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      popper.offset = "50 60";
      await waitForRender();

      expect(popper.style.getPropertyValue("--ea-popper-transform-x")).toBe(
        "50px"
      );
      expect(popper.style.getPropertyValue("--ea-popper-transform-y")).toBe(
        "60px"
      );
    });
  });

  describe("Edge Cases", () => {
    it("应该处理没有 reference slot 的情况", async () => {
      const popper = document.createElement("ea-popper");
      container.appendChild(popper);

      await waitForRender();

      expect(popper.shadowRoot).toBeTruthy();
    });

    it("应该处理空 content（只有 reference slot）", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      expect(popper.shadowRoot).toBeTruthy();
    });

    it("应该处理同时设置多个属性", async () => {
      const popper = document.createElement("ea-popper");
      popper.setAttribute("width", "200");
      popper.setAttribute("placement", "bottom");
      popper.setAttribute("show-arrow", "false");
      popper.setAttribute("offset", "5 10");
      popper.setAttribute("flip", "false");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      expect(popper.width).toBe(200);
      expect(popper.placement).toBe("bottom");
      expect(popper.showArrow).toBe(false);
      expect(popper.offset).toBe("5 10");
      expect(popper.flip).toBe(false);
    });

    it("应该处理动态属性更新组合", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      popper.width = 300;
      popper.placement = "left";
      popper.setAttribute("show-arrow", "false");
      await waitForRender();

      expect(popper.width).toBe(300);
      expect(popper.placement).toBe("left");
      expect(popper.showArrow).toBe(false);

      const containerEl = popper.shadowRoot.querySelector(".ea-popper");
      expect(containerEl.classList.contains("ea-popper--left")).toBe(true);
      expect(containerEl.classList.contains("is-show-arrow")).toBe(false);
    });
  });

  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const popper = document.createElement("ea-popper");
      popper.setAttribute("placement", "bottom");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      const containerEl = popper.shadowRoot.querySelector(".ea-popper");
      expect(containerEl.classList.contains("ea-popper--bottom")).toBe(true);
    });

    it("组件连接后应该初始化 _originPlacement", async () => {
      const popper = document.createElement("ea-popper");
      popper.setAttribute("placement", "right-start");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      expect(popper.placement).toBe("right-start");
    });

    it("组件移除后应该清理资源（AbortController）", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      popper.show();
      await waitForRender();

      popper.remove();

      expect(popper.isConnected).toBe(false);
    });

    it("组件移除后重新添加应该正常工作", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      popper.remove();
      await waitForRender();

      container.appendChild(popper);
      await waitForRender();

      expect(popper.shadowRoot).toBeTruthy();
      expect(popper.placement).toBe("top");
    });

    it("应该支持属性动态更新", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      expect(popper.placement).toBe("top");

      popper.setAttribute("placement", "bottom");
      await waitForRender();

      expect(popper.placement).toBe("bottom");
    });
  });

  describe("HTML Template Structure", () => {
    it("html() 方法应该返回包含正确结构的 HTML", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      const containerEl = popper.shadowRoot.querySelector(".ea-popper");
      const referenceEl = containerEl.querySelector(".ea-popper__reference");
      const originalEl = containerEl.querySelector(".ea-popper__original");

      expect(containerEl).toBeTruthy();
      expect(referenceEl).toBeTruthy();
      expect(originalEl).toBeTruthy();
    });

    it("original 元素应该在 reference 元素内部", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      const referenceEl = popper.shadowRoot.querySelector(
        ".ea-popper__reference"
      );
      const originalEl = referenceEl.querySelector(".ea-popper__original");

      expect(originalEl).toBeTruthy();
    });

    it("默认 slot 应该在 original 元素内部", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      const originalEl = popper.shadowRoot.querySelector(
        ".ea-popper__original"
      );
      const defaultSlot = originalEl.querySelector("slot:not([name])");

      expect(defaultSlot).toBeTruthy();
    });

    it("reference slot 应该在 reference 元素内部", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      const referenceEl = popper.shadowRoot.querySelector(
        ".ea-popper__reference"
      );
      const referenceSlot = referenceEl.querySelector('slot[name="reference"]');

      expect(referenceSlot).toBeTruthy();
    });
  });

  describe("BEM Class Generation", () => {
    it("默认状态应该生成 'ea-popper ea-popper--top is-show-arrow'", async () => {
      const popper = document.createElement("ea-popper");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      const className = popper.updateContainerClasslist();
      expect(className).toBe("ea-popper ea-popper--top is-show-arrow");
    });

    it("placement=bottom, showArrow=false 应该生成 'ea-popper ea-popper--bottom'", async () => {
      const popper = document.createElement("ea-popper");
      popper.setAttribute("placement", "bottom");
      popper.setAttribute("show-arrow", "false");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      const className = popper.updateContainerClasslist();
      expect(className).toBe("ea-popper ea-popper--bottom");
    });

    it("placement=left-start, showArrow=true, visible=true 应该包含所有状态", async () => {
      const popper = document.createElement("ea-popper");
      popper.setAttribute("placement", "left-start");
      popper.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popper);

      await waitForRender();

      popper.show();
      await waitForRender();

      const className = popper.updateContainerClasslist();
      expect(className).toContain("ea-popper");
      expect(className).toContain("ea-popper--left-start");
      expect(className).toContain("is-show-arrow");
      expect(className).toContain("is-show");
    });
  });
});
