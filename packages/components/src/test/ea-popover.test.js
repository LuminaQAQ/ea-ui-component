import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { fireKeydown } from "./utils/keyboard.js";
import { runAxe, assertNoA11yViolations } from "./utils/a11y.js";

import "../components/ea-popover/index.ts";
import "../components/ea-button/index.ts";

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
    it("应该正确渲染组件", () => {
      const popover = document.createElement("ea-popover");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      expect(popover.shadowRoot).toBeTruthy();
      expect(popover.shadowRoot.querySelector(".ea-popper")).toBeTruthy();
    });

    it("应该支持 CSS Parts", () => {
      const popover = document.createElement("ea-popover");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      expect(
        popover.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
      expect(
        popover.shadowRoot.querySelector('[part="reference"]')
      ).toBeTruthy();
      expect(
        popover.shadowRoot.querySelector('[part="original"]')
      ).toBeTruthy();
      expect(popover.shadowRoot.querySelector('[part="title"]')).toBeTruthy();
      expect(popover.shadowRoot.querySelector('[part="content"]')).toBeTruthy();
    });

    it("应该渲染 reference slot", () => {
      const popover = document.createElement("ea-popover");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      const referenceSlot = popover.shadowRoot.querySelector(
        'slot[name="reference"]'
      );
      expect(referenceSlot).toBeTruthy();
    });

    it("应该渲染默认 slot", () => {
      const popover = document.createElement("ea-popover");
      popover.innerHTML = `<span>Content</span><button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      const defaultSlot = popover.shadowRoot.querySelector("slot:not([name])");
      expect(defaultSlot).toBeTruthy();
    });

    it("应该渲染 title 和 content 元素", () => {
      const popover = document.createElement("ea-popover");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      expect(
        popover.shadowRoot.querySelector(".ea-popover__title")
      ).toBeTruthy();
      expect(
        popover.shadowRoot.querySelector(".ea-popover__content")
      ).toBeTruthy();
    });
  });

  describe("Trigger Attribute", () => {
    it("默认 trigger 应该是 hover", () => {
      const popover = document.createElement("ea-popover");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      expect(popover.trigger).toBe("hover");
    });

    it("应该支持 click trigger", () => {
      const popover = document.createElement("ea-popover");
      popover.setAttribute("trigger", "click");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      expect(popover.trigger).toBe("click");
    });

    it("应该支持 focus trigger", () => {
      const popover = document.createElement("ea-popover");
      popover.setAttribute("trigger", "focus");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      expect(popover.trigger).toBe("focus");
    });

    it("应该支持 contextmenu trigger", () => {
      const popover = document.createElement("ea-popover");
      popover.setAttribute("trigger", "contextmenu");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      expect(popover.trigger).toBe("contextmenu");
    });

    it("应该支持 customized trigger", () => {
      const popover = document.createElement("ea-popover");
      popover.setAttribute("trigger", "customized");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      expect(popover.trigger).toBe("customized");
    });

    it("trigger 变化时应该重新初始化事件监听", async () => {
      const popover = document.createElement("ea-popover");
      popover.setAttribute("trigger", "hover");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      await popover.updateComplete;

      expect(popover.trigger).toBe("hover");

      popover.setAttribute("trigger", "click");
      await popover.updateComplete;

      expect(popover.trigger).toBe("click");
    });
  });

  describe("Visible Attribute", () => {
    it("默认 visible 应该是 false", () => {
      const popover = document.createElement("ea-popover");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      expect(popover.visible).toBe(false);
    });

    it("应该支持 visible 属性设置为 true", () => {
      const popover = document.createElement("ea-popover");
      popover.setAttribute("visible", "");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      expect(popover.visible).toBe(true);
    });
  });

  describe("Heading Attribute", () => {
    it("应该支持 heading 属性", () => {
      const popover = document.createElement("ea-popover");
      popover.setAttribute("heading", "Test Title");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      expect(popover.heading).toBe("Test Title");
    });

    it("heading 应该渲染在 shadow DOM 中", async () => {
      const popover = document.createElement("ea-popover");
      popover.setAttribute("heading", "Test Title");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      await popover.updateComplete;

      const titleEl = popover.shadowRoot.querySelector(".ea-popover__title");
      expect(titleEl).toBeTruthy();
      expect(titleEl.textContent).toBe("Test Title");
    });

    it("heading 设置后应该添加 is-has-heading 状态类", () => {
      const popover = document.createElement("ea-popover");
      popover.setAttribute("heading", "Test Title");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      const containerEl = popover.shadowRoot.querySelector(".ea-popper");
      expect(containerEl.classList.contains("is-has-heading")).toBe(true);
    });

    it("heading 为空时不应该添加 is-has-heading 状态类", () => {
      const popover = document.createElement("ea-popover");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      const containerEl = popover.shadowRoot.querySelector(".ea-popper");
      expect(containerEl.classList.contains("is-has-heading")).toBe(false);
    });

    it("动态设置 heading 应该更新文本和状态类", async () => {
      const popover = document.createElement("ea-popover");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      await popover.updateComplete;

      popover.setAttribute("heading", "Dynamic Title");
      await popover.updateComplete;

      const titleEl = popover.shadowRoot.querySelector(".ea-popover__title");
      expect(titleEl.textContent).toBe("Dynamic Title");

      const containerEl = popover.shadowRoot.querySelector(".ea-popper");
      expect(containerEl.classList.contains("is-has-heading")).toBe(true);
    });

    it("动态清除 heading 应该移除状态类", async () => {
      const popover = document.createElement("ea-popover");
      popover.setAttribute("heading", "Test Title");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      await popover.updateComplete;

      popover.setAttribute("heading", "");
      await popover.updateComplete;

      const containerEl = popover.shadowRoot.querySelector(".ea-popper");
      expect(containerEl.classList.contains("is-has-heading")).toBe(false);
    });
  });

  describe("Content Attribute", () => {
    it("应该支持 content 属性", () => {
      const popover = document.createElement("ea-popover");
      popover.setAttribute("content", "Test Content");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      expect(popover.content).toBe("Test Content");
    });

    it("content 应该渲染在 shadow DOM 中", async () => {
      const popover = document.createElement("ea-popover");
      popover.setAttribute("content", "Test Content");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      await popover.updateComplete;

      const contentEl = popover.shadowRoot.querySelector(
        ".ea-popover__content"
      );
      expect(contentEl).toBeTruthy();
      expect(contentEl.textContent).toBe("Test Content");
    });

    it("content 设置后应该添加 is-has-content 状态类", () => {
      const popover = document.createElement("ea-popover");
      popover.setAttribute("content", "Test Content");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      const containerEl = popover.shadowRoot.querySelector(".ea-popper");
      expect(containerEl.classList.contains("is-has-content")).toBe(true);
    });

    it("content 为空时不应该添加 is-has-content 状态类", () => {
      const popover = document.createElement("ea-popover");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      const containerEl = popover.shadowRoot.querySelector(".ea-popper");
      expect(containerEl.classList.contains("is-has-content")).toBe(false);
    });

    it("content 设置后默认 slot 应该被隐藏", () => {
      const popover = document.createElement("ea-popover");
      popover.setAttribute("content", "Test Content");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      const defaultSlot = popover.shadowRoot.querySelector(
        ".ea-popper__original slot:not([name])"
      );
      expect(defaultSlot).toBeTruthy();
    });

    it("动态设置 content 应该更新文本和状态类", async () => {
      const popover = document.createElement("ea-popover");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      await popover.updateComplete;

      popover.setAttribute("content", "Dynamic Content");
      await popover.updateComplete;

      const contentEl = popover.shadowRoot.querySelector(
        ".ea-popover__content"
      );
      expect(contentEl.textContent).toBe("Dynamic Content");

      const containerEl = popover.shadowRoot.querySelector(".ea-popper");
      expect(containerEl.classList.contains("is-has-content")).toBe(true);
    });

    it("动态清除 content 应该移除状态类", async () => {
      const popover = document.createElement("ea-popover");
      popover.setAttribute("content", "Test Content");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      await popover.updateComplete;

      popover.setAttribute("content", "");
      await popover.updateComplete;

      const containerEl = popover.shadowRoot.querySelector(".ea-popper");
      expect(containerEl.classList.contains("is-has-content")).toBe(false);
    });
  });

  describe("Placement Attribute", () => {
    it("默认 placement 应该是 top", () => {
      const popover = document.createElement("ea-popover");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      expect(popover.placement).toBe("top");
    });

    it("应该支持不同的 placement 值", () => {
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

        expect(popover.placement).toBe(placement);
        container.removeChild(popover);
      }
    });
  });

  describe("Width Attribute", () => {
    it("默认 width 应该是 150", () => {
      const popover = document.createElement("ea-popover");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      expect(Number(popover.width)).toBe(150);
    });

    it("应该支持自定义 width", () => {
      const popover = document.createElement("ea-popover");
      popover.setAttribute("width", "200");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      expect(popover.width).toBe(200);
    });
  });

  describe("Show-arrow Attribute", () => {
    it("默认 showArrow 应该是 true", () => {
      const popover = document.createElement("ea-popover");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      expect(popover.showArrow).toBe(true);
    });

    it("应该支持 showArrow 设置为 false", () => {
      const popover = document.createElement("ea-popover");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);
      popover.showArrow = false;

      expect(popover.showArrow).toBe(false);
    });
  });

  describe("Offset Attribute", () => {
    it("默认 offset 应该是 '0 0'", () => {
      const popover = document.createElement("ea-popover");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      expect(popover.offset).toBe("0 0");
    });

    it("应该支持自定义 offset", () => {
      const popover = document.createElement("ea-popover");
      popover.setAttribute("offset", "10 20");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      expect(popover.offset).toBe("10 20");
    });
  });

  describe("Flip Attribute", () => {
    it("默认 flip 应该是 true", () => {
      const popover = document.createElement("ea-popover");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      expect(popover.flip).toBe(true);
    });

    it("应该支持 flip 设置为 false", () => {
      const popover = document.createElement("ea-popover");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);
      popover.flip = false;

      expect(popover.flip).toBe(false);
    });
  });

  describe("Methods", () => {
    it("show() 方法应该显示 popover", async () => {
      const popover = document.createElement("ea-popover");
      popover.setAttribute("trigger", "customized");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      await popover.updateComplete;

      expect(popover.visible).toBe(false);

      popover.show();

      expect(popover.visible).toBe(true);
    });

    it("hide() 方法应该隐藏 popover", async () => {
      const popover = document.createElement("ea-popover");
      popover.setAttribute("trigger", "customized");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      await popover.updateComplete;

      popover.show();
      expect(popover.visible).toBe(true);

      popover.hide();

      expect(popover.visible).toBe(false);
    });

    it("toggle() 方法应该切换 popover 显示状态", async () => {
      const popover = document.createElement("ea-popover");
      popover.setAttribute("trigger", "customized");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      await popover.updateComplete;

      popover.show();
      expect(popover.visible).toBe(true);

      popover.toggle();
      expect(popover.visible).toBe(false);

      popover.toggle();
      expect(popover.visible).toBe(true);
    });
  });

  describe("Events", () => {
    it("应该触发 ea-show 事件", async () => {
      const popover = document.createElement("ea-popover");
      popover.setAttribute("trigger", "customized");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      await popover.updateComplete;

      const showHandler = vi.fn();
      popover.addEventListener("ea-show", showHandler);

      popover.show();
      await popover.updateComplete;

      expect(showHandler).toHaveBeenCalled();
    });

    it("应该触发 ea-hide 事件", async () => {
      const popover = document.createElement("ea-popover");
      popover.setAttribute("trigger", "customized");
      popover.setAttribute("visible", "");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      await popover.updateComplete;

      const hideHandler = vi.fn();
      popover.addEventListener("ea-hide", hideHandler);

      popover.hide();
      await popover.updateComplete;

      expect(hideHandler).toHaveBeenCalled();
    });

    it("ea-show 事件应该是 EaPopperShowEvent 类型", async () => {
      const popover = document.createElement("ea-popover");
      popover.setAttribute("trigger", "customized");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      await popover.updateComplete;

      let eventTypeName = "";
      popover.addEventListener("ea-show", e => {
        eventTypeName = e.constructor.name;
      });

      popover.show();
      await popover.updateComplete;

      expect(eventTypeName).toBe("EaPopperShowEvent");
    });

    it("ea-hide 事件应该是 EaPopperHideEvent 类型", async () => {
      const popover = document.createElement("ea-popover");
      popover.setAttribute("trigger", "customized");
      popover.setAttribute("visible", "");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      await popover.updateComplete;

      let eventTypeName = "";
      popover.addEventListener("ea-hide", e => {
        eventTypeName = e.constructor.name;
      });

      popover.hide();
      await popover.updateComplete;

      expect(eventTypeName).toBe("EaPopperHideEvent");
    });

    it("ea-show 事件应该是可冒泡的", async () => {
      const popover = document.createElement("ea-popover");
      popover.setAttribute("trigger", "customized");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      await popover.updateComplete;

      let eventBubbles = false;
      popover.addEventListener("ea-show", e => {
        eventBubbles = e.bubbles;
      });

      popover.show();
      await popover.updateComplete;

      expect(eventBubbles).toBe(true);
    });

    it("ea-show 事件应该可以穿透 Shadow DOM", async () => {
      const popover = document.createElement("ea-popover");
      popover.setAttribute("trigger", "customized");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      await popover.updateComplete;

      let eventComposed = false;
      popover.addEventListener("ea-show", e => {
        eventComposed = e.composed;
      });

      popover.show();
      await popover.updateComplete;

      expect(eventComposed).toBe(true);
    });
  });

  describe("updateContainerClasslist", () => {
    it("应该包含 ea-popper 和 ea-popover 基础类名", () => {
      const popover = document.createElement("ea-popover");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      const className = popover.updateContainerClasslist();
      expect(className).toContain("ea-popper");
      expect(className).toContain("ea-popover");
    });

    it("应该包含 placement 修饰符类名", () => {
      const popover = document.createElement("ea-popover");
      popover.setAttribute("placement", "bottom-start");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      const className = popover.updateContainerClasslist();
      expect(className).toContain("ea-popper--bottom-start");
    });

    it("heading 和 content 同时设置应该包含两个状态类", () => {
      const popover = document.createElement("ea-popover");
      popover.setAttribute("heading", "Title");
      popover.setAttribute("content", "Content");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      const className = popover.updateContainerClasslist();
      expect(className).toContain("is-has-heading");
      expect(className).toContain("is-has-content");
    });

    it("heading 和 content 都为空时不应包含状态类", () => {
      const popover = document.createElement("ea-popover");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      const className = popover.updateContainerClasslist();
      expect(className).not.toContain("is-has-heading");
      expect(className).not.toContain("is-has-content");
    });
  });

  describe("Edge Cases", () => {
    it("应该处理没有 reference slot 的情况", () => {
      const popover = document.createElement("ea-popover");
      container.appendChild(popover);

      expect(popover.shadowRoot).toBeTruthy();
    });

    it("应该处理空 heading", () => {
      const popover = document.createElement("ea-popover");
      popover.setAttribute("heading", "");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      expect(popover.heading).toBe("");
    });

    it("应该处理空 content", () => {
      const popover = document.createElement("ea-popover");
      popover.setAttribute("content", "");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      expect(popover.content).toBe("");
    });

    it("应该处理同时设置多个属性", () => {
      const popover = document.createElement("ea-popover");
      popover.setAttribute("heading", "Title");
      popover.setAttribute("content", "Content");
      popover.setAttribute("width", "200");
      popover.setAttribute("placement", "bottom");
      popover.setAttribute("trigger", "click");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      expect(popover.heading).toBe("Title");
      expect(popover.content).toBe("Content");
      expect(popover.width).toBe(200);
      expect(popover.placement).toBe("bottom");
      expect(popover.trigger).toBe("click");
    });
  });

  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", () => {
      const popover = document.createElement("ea-popover");
      popover.setAttribute("placement", "bottom");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      expect(popover.shadowRoot).toBeTruthy();
      expect(popover.placement).toBe("bottom");
    });

    it("组件断开连接后应该正常移除", async () => {
      const popover = document.createElement("ea-popover");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      await popover.updateComplete;

      popover.remove();

      expect(popover.isConnected).toBe(false);
    });

    it("应该支持属性动态更新", async () => {
      const popover = document.createElement("ea-popover");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      await popover.updateComplete;

      expect(popover.heading).toBe("");

      popover.setAttribute("heading", "New Title");
      await popover.updateComplete;

      expect(popover.heading).toBe("New Title");
    });

    it("组件移除后重新添加应该正常工作", async () => {
      const popover = document.createElement("ea-popover");
      popover.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(popover);

      await popover.updateComplete;

      popover.remove();
      await popover.updateComplete;

      container.appendChild(popover);
      await popover.updateComplete;

      expect(popover.shadowRoot).toBeTruthy();
      expect(popover.placement).toBe("top");
    });
  });

  describe("Accessibility", () => {
    it("默认状态应该无 a11y 违规", async () => {
      const el = document.createElement("ea-popover");
      el.setAttribute("heading", "Test Popover");
      el.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(el);
      await el.updateComplete;
      const results = await runAxe(el);
      assertNoA11yViolations(results);
    });

    describe("ARIA Attributes", () => {
      it("触发元素应该有 aria-haspopup='dialog'", async () => {
        const el = document.createElement("ea-popover");
        el.setAttribute("heading", "Test Popover");
        el.innerHTML = `<button slot="reference">Trigger</button>`;
        container.appendChild(el);
        await el.updateComplete;
        const trigger = el.querySelector('[slot="reference"]');
        expect(trigger.getAttribute("aria-haspopup")).toBe("dialog");
      });

      it("弹出层应该有 role='dialog'", async () => {
        const el = document.createElement("ea-popover");
        el.setAttribute("heading", "Test Popover");
        el.innerHTML = `<button slot="reference">Trigger</button>`;
        container.appendChild(el);
        await el.updateComplete;
        const popper = el.shadowRoot.querySelector('[part="original"]');
        expect(popper.getAttribute("role")).toBe("dialog");
      });

      it("设置 heading 时弹出层应该有 aria-labelledby", async () => {
        const el = document.createElement("ea-popover");
        el.setAttribute("heading", "Test Popover");
        el.innerHTML = `<button slot="reference">Trigger</button>`;
        container.appendChild(el);
        await el.updateComplete;
        const popper = el.shadowRoot.querySelector('[part="original"]');
        expect(popper.getAttribute("aria-labelledby")).toBeTruthy();
      });

      it("触发元素应该有 aria-expanded 属性", async () => {
        const el = document.createElement("ea-popover");
        el.setAttribute("heading", "Test Popover");
        el.innerHTML = `<button slot="reference">Trigger</button>`;
        container.appendChild(el);
        await el.updateComplete;
        const trigger = el.querySelector('[slot="reference"]');
        expect(trigger.hasAttribute("aria-expanded")).toBe(true);
      });
    });
  });
});

describe("EaPopover Interaction And Focus", () => {
  let container;

  const createPopover = (trigger = "hover", contentHtml = "") => {
    const popover = document.createElement("ea-popover");
    popover.setAttribute("trigger", trigger);
    popover.innerHTML = `<button slot="reference">Trigger</button>${contentHtml}`;
    container.appendChild(popover);
    return popover;
  };

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe("Trigger Keyboard Activation", () => {
    it("触发元素按 Enter 应该切换显示状态", async () => {
      const popover = createPopover();
      await popover.updateComplete;

      const trigger = popover.querySelector('[slot="reference"]');

      fireKeydown(trigger, "Enter");
      expect(popover.visible).toBe(true);

      fireKeydown(trigger, "Enter");
      expect(popover.visible).toBe(false);
    });

    it("触发元素按空格应该切换显示状态", async () => {
      const popover = createPopover();
      await popover.updateComplete;

      const trigger = popover.querySelector('[slot="reference"]');
      fireKeydown(trigger, " ");

      expect(popover.visible).toBe(true);
    });

    it("Enter 激活应该阻止默认行为", async () => {
      const popover = createPopover();
      await popover.updateComplete;

      const trigger = popover.querySelector('[slot="reference"]');
      const event = fireKeydown(trigger, "Enter");

      expect(event.defaultPrevented).toBe(true);
    });

    it("focus 模式下按 Enter 不应该切换显示状态", async () => {
      const popover = createPopover("focus");
      await popover.updateComplete;

      const trigger = popover.querySelector('[slot="reference"]');
      const event = fireKeydown(trigger, "Enter");

      expect(popover.visible).toBe(false);
      expect(event.defaultPrevented).toBe(false);
    });

    it("customized 模式下按 Enter 只标记键盘激活", async () => {
      const popover = createPopover("customized");
      await popover.updateComplete;

      const trigger = popover.querySelector('[slot="reference"]');
      fireKeydown(trigger, "Enter");

      expect(popover.visible).toBe(false);
      expect(popover._keyboardActivated).toBe(true);
    });

    it("触发元素上的其他按键不应该有影响", async () => {
      const popover = createPopover();
      await popover.updateComplete;

      const trigger = popover.querySelector('[slot="reference"]');
      fireKeydown(trigger, "a");

      expect(popover.visible).toBe(false);
    });
  });

  describe("Trigger Event Strategies", () => {
    it("hover 模式鼠标移入显示、移出隐藏", async () => {
      const popover = createPopover("hover");
      await popover.updateComplete;

      popover.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
      await popover.updateComplete;
      expect(popover.visible).toBe(true);

      popover.dispatchEvent(new MouseEvent("mouseout", { bubbles: true }));
      await popover.updateComplete;
      expect(popover.visible).toBe(false);
    });

    it("click 模式点击触发元素切换显示状态", async () => {
      const popover = createPopover("click");
      await popover.updateComplete;

      const trigger = popover.querySelector('[slot="reference"]');
      const clickInit = { bubbles: true, composed: true, detail: 1 };

      trigger.dispatchEvent(new MouseEvent("click", clickInit));
      await popover.updateComplete;
      expect(popover.visible).toBe(true);

      trigger.dispatchEvent(new MouseEvent("click", clickInit));
      await popover.updateComplete;
      expect(popover.visible).toBe(false);
    });

    it("detail 为 0 的点击不应该切换显示状态", async () => {
      const popover = createPopover("click");
      await popover.updateComplete;

      const trigger = popover.querySelector('[slot="reference"]');
      trigger.dispatchEvent(
        new MouseEvent("click", { bubbles: true, composed: true, detail: 0 })
      );

      expect(popover.visible).toBe(false);
    });

    it("focus 模式聚焦组件时显示", async () => {
      const popover = createPopover("focus");
      await popover.updateComplete;

      popover.querySelector('[slot="reference"]').focus();
      await popover.updateComplete;

      expect(popover.visible).toBe(true);
    });

    it("contextmenu 模式右键显示、点击外部隐藏", async () => {
      const popover = createPopover("contextmenu");
      await popover.updateComplete;

      popover.dispatchEvent(
        new MouseEvent("contextmenu", { bubbles: true, cancelable: true })
      );
      await popover.updateComplete;
      expect(popover.visible).toBe(true);

      const outside = document.createElement("button");
      container.appendChild(outside);
      outside.dispatchEvent(new MouseEvent("click", { bubbles: true }));

      await vi.waitFor(() => {
        expect(popover.visible).toBe(false);
      });
    });
  });

  describe("Trigger Accessibility Setup", () => {
    it("非原生可聚焦触发元素应该补充 tabindex 和 role", async () => {
      const popover = document.createElement("ea-popover");
      popover.innerHTML = `<span slot="reference">Trigger</span>`;
      container.appendChild(popover);
      await popover.updateComplete;

      const trigger = popover.querySelector('[slot="reference"]');
      expect(trigger.getAttribute("tabindex")).toBe("0");
      expect(trigger.getAttribute("role")).toBe("button");
    });

    it("自带 tabindex 的触发元素不应该补充 role", async () => {
      const popover = document.createElement("ea-popover");
      popover.innerHTML = `<div slot="reference" tabindex="0">Trigger</div>`;
      container.appendChild(popover);
      await popover.updateComplete;

      const trigger = popover.querySelector('[slot="reference"]');
      expect(trigger.hasAttribute("role")).toBe(false);
    });
  });

  describe("Content Keyboard Interaction", () => {
    it("内容区按 Escape 应该关闭并聚焦触发元素", async () => {
      const popover = createPopover(
        "click",
        `<button class="inner">X</button>`
      );
      await popover.updateComplete;

      popover.show();
      await popover.updateComplete;

      const trigger = popover.querySelector('[slot="reference"]');
      const event = fireKeydown(popover.querySelector(".inner"), "Escape");

      expect(event.defaultPrevented).toBe(true);
      expect(popover.visible).toBe(false);
      expect(document.activeElement).toBe(trigger);
    });

    it("内容区最后一个元素按 Tab 应该循环到第一个元素", async () => {
      const popover = createPopover(
        "click",
        `<button class="a">A</button><button class="b">B</button>`
      );
      await popover.updateComplete;

      popover.show();
      await popover.updateComplete;

      const event = fireKeydown(popover.querySelector(".b"), "Tab");

      expect(event.defaultPrevented).toBe(true);
      expect(document.activeElement).toBe(popover.querySelector(".a"));
    });

    it("内容区第一个元素按 Shift+Tab 应该循环到最后一个元素", async () => {
      const popover = createPopover(
        "click",
        `<button class="a">A</button><button class="b">B</button>`
      );
      await popover.updateComplete;

      popover.show();
      await popover.updateComplete;

      const event = fireKeydown(popover.querySelector(".a"), "Tab", {
        shiftKey: true,
      });

      expect(event.defaultPrevented).toBe(true);
      expect(document.activeElement).toBe(popover.querySelector(".b"));
    });

    it("内容区中间元素按 Tab 不应该被拦截", async () => {
      const popover = createPopover(
        "click",
        `<button class="a">A</button><button class="b">B</button><button class="c">C</button>`
      );
      await popover.updateComplete;

      popover.show();
      await popover.updateComplete;

      const event = fireKeydown(popover.querySelector(".b"), "Tab");

      expect(event.defaultPrevented).toBe(false);
    });

    it("内容区中间元素按 Shift+Tab 不应该被拦截", async () => {
      const popover = createPopover(
        "click",
        `<button class="a">A</button><button class="b">B</button><button class="c">C</button>`
      );
      await popover.updateComplete;

      popover.show();
      await popover.updateComplete;

      const event = fireKeydown(popover.querySelector(".b"), "Tab", {
        shiftKey: true,
      });

      expect(event.defaultPrevented).toBe(false);
    });

    it("内容区没有可聚焦元素时 Tab 不做处理", async () => {
      const popover = createPopover("click", `<span class="text">Text</span>`);
      await popover.updateComplete;

      popover.show();
      await popover.updateComplete;

      const event = fireKeydown(popover.querySelector(".text"), "Tab");

      expect(event.defaultPrevented).toBe(false);
    });

    it("被禁用的内容元素不应该参与焦点循环", async () => {
      const popover = createPopover(
        "click",
        `<button class="d" disabled>D</button>`
      );
      await popover.updateComplete;

      popover.show();
      await popover.updateComplete;

      const event = fireKeydown(popover.querySelector(".d"), "Tab");

      expect(event.defaultPrevented).toBe(false);
    });
  });

  describe("Keyboard Activation Focus Management", () => {
    it("键盘激活后应该聚焦内容区第一个可聚焦元素", async () => {
      const popover = createPopover(
        "click",
        `<button class="first">F</button>`
      );
      await popover.updateComplete;

      const trigger = popover.querySelector('[slot="reference"]');
      fireKeydown(trigger, "Enter");
      await popover.updateComplete;

      await vi.waitFor(() => {
        expect(document.activeElement).toBe(popover.querySelector(".first"));
      });
    });

    it("内容区没有可聚焦元素时应该聚焦原始内容容器", async () => {
      const popover = createPopover("click", `<span>Text</span>`);
      await popover.updateComplete;

      const trigger = popover.querySelector('[slot="reference"]');
      fireKeydown(trigger, "Enter");
      await popover.updateComplete;

      const original = popover.shadowRoot.querySelector('[part="original"]');

      await vi.waitFor(() => {
        const focused =
          popover.shadowRoot.activeElement ?? document.activeElement;
        expect(original.tabIndex).toBe(0);
        expect([popover, original]).toContain(focused);
      });
    });

    it("自定义元素内容应该聚焦其 Shadow DOM 内的可聚焦元素", async () => {
      const popover = createPopover(
        "click",
        `<ea-button class="btn">OK</ea-button>`
      );
      await popover.updateComplete;

      const trigger = popover.querySelector('[slot="reference"]');
      fireKeydown(trigger, "Enter");
      await popover.updateComplete;

      const btn = popover.querySelector(".btn");
      const inner = btn.shadowRoot.querySelector("button");
      expect(inner).toBeTruthy();

      await vi.waitFor(() => {
        const focused = btn.shadowRoot.activeElement ?? document.activeElement;
        expect([btn, inner]).toContain(focused);
      });
    });

    it("鼠标激活不应该自动移动焦点", async () => {
      const popover = createPopover(
        "click",
        `<button class="first">F</button>`
      );
      await popover.updateComplete;

      popover.show();
      await popover.updateComplete;

      expect(document.activeElement).not.toBe(popover.querySelector(".first"));
    });
  });

  describe("Focusout Handling", () => {
    it("焦点移出组件时应该自动关闭", async () => {
      const popover = createPopover(
        "click",
        `<button class="inner">X</button>`
      );
      await popover.updateComplete;

      popover.show();
      await popover.updateComplete;

      popover.dispatchEvent(
        new FocusEvent("focusout", { bubbles: true, composed: true })
      );
      await popover.updateComplete;

      await vi.waitFor(() => {
        expect(popover.visible).toBe(false);
      });
    });

    it("焦点仍在组件内部时不应该关闭", async () => {
      const popover = createPopover(
        "click",
        `<button class="inner">X</button>`
      );
      await popover.updateComplete;

      popover.show();
      await popover.updateComplete;

      popover.querySelector(".inner").focus();
      popover.dispatchEvent(
        new FocusEvent("focusout", { bubbles: true, composed: true })
      );
      await popover.updateComplete;

      expect(popover.visible).toBe(true);
    });

    it("focus 模式下焦点移出组件时应该关闭", async () => {
      const popover = createPopover("focus");
      await popover.updateComplete;

      popover.show();
      await popover.updateComplete;
      expect(popover.visible).toBe(true);

      const outside = document.createElement("button");
      container.appendChild(outside);
      outside.focus();

      popover.dispatchEvent(
        new FocusEvent("focusout", { bubbles: true, composed: true })
      );

      await vi.waitFor(() => {
        expect(popover.visible).toBe(false);
      });
    });

    it("隐藏状态下焦点移出不应该有副作用", async () => {
      const popover = createPopover("click");
      await popover.updateComplete;

      popover.dispatchEvent(
        new FocusEvent("focusout", { bubbles: true, composed: true })
      );
      await popover.updateComplete;

      expect(popover.visible).toBe(false);
    });
  });
});
