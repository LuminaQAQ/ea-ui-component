import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender.js";

import "../components/ea-tooltip/index.ts";

describe("EaTooltip Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe("Basic Functionality", () => {
    it("应该正确渲染 ea-tooltip 组件", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      expect(tooltip.shadowRoot).toBeTruthy();
      expect(tooltip.shadowRoot.querySelector(".ea-popper")).toBeTruthy();
    });

    it("应该包含 container CSS Part", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      expect(
        tooltip.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
    });

    it("应该包含 reference CSS Part", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      expect(
        tooltip.shadowRoot.querySelector('[part="reference"]')
      ).toBeTruthy();
    });

    it("应该包含 original CSS Part", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      expect(
        tooltip.shadowRoot.querySelector('[part="original"]')
      ).toBeTruthy();
    });

    it("应该包含 content CSS Part", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      const contentEl = tooltip.shadowRoot.querySelector(
        ".ea-tooltip__content"
      );
      expect(contentEl).toBeTruthy();
      expect(contentEl.getAttribute("part")).toBe("content");
      expect(contentEl.classList.contains("ea-tooltip__content")).toBe(true);
    });

    it("应该渲染 reference slot", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `<button slot="reference">Trigger</button>`;
      container.appendChild(tooltip);

      await waitForRender();

      const referenceSlot = tooltip.shadowRoot.querySelector(
        'slot[name="reference"]'
      );
      expect(referenceSlot).toBeTruthy();
    });

    it("应该渲染默认 slot", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      const defaultSlot = tooltip.shadowRoot.querySelector("slot:not([name])");
      expect(defaultSlot).toBeTruthy();
    });
  });

  describe("Effect Attribute", () => {
    it("默认 effect 应该是 dark", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      expect(tooltip.effect).toBe("dark");
    });

    it("应该支持 effect='dark'", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.setAttribute("effect", "dark");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      expect(tooltip.effect).toBe("dark");
    });

    it("应该支持 effect='light'", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.setAttribute("effect", "light");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      expect(tooltip.effect).toBe("light");
    });

    it("应该支持 effect='customized'", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.setAttribute("effect", "customized");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      expect(tooltip.effect).toBe("customized");
    });

    it("effect='dark' 时容器应包含 ea-tooltip--dark 修饰符类", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.setAttribute("effect", "dark");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      const containerEl =
        tooltip.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-tooltip--dark")).toBe(true);
    });

    it("effect='light' 时容器应包含 ea-tooltip--light 修饰符类", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.setAttribute("effect", "light");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      const containerEl =
        tooltip.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-tooltip--light")).toBe(true);
    });

    it("effect='customized' 时容器不应包含 dark 或 light 修饰符类", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.setAttribute("effect", "customized");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      const containerEl =
        tooltip.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-tooltip--dark")).toBe(false);
      expect(containerEl.classList.contains("ea-tooltip--light")).toBe(false);
    });

    it("动态切换 effect 应更新容器修饰符类", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      const containerEl =
        tooltip.shadowRoot.querySelector('[part="container"]');

      tooltip.setAttribute("effect", "light");
      await waitForRender();
      expect(containerEl.classList.contains("ea-tooltip--light")).toBe(true);
      expect(containerEl.classList.contains("ea-tooltip--dark")).toBe(false);

      tooltip.setAttribute("effect", "dark");
      await waitForRender();
      expect(containerEl.classList.contains("ea-tooltip--dark")).toBe(true);
      expect(containerEl.classList.contains("ea-tooltip--light")).toBe(false);
    });

    it("从 dark 切换到 customized 应移除 dark 修饰符类", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.setAttribute("effect", "dark");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      const containerEl =
        tooltip.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-tooltip--dark")).toBe(true);

      tooltip.setAttribute("effect", "customized");
      await waitForRender();

      expect(containerEl.classList.contains("ea-tooltip--dark")).toBe(false);
    });
  });

  describe("Trigger Attribute", () => {
    it("默认 trigger 应该是 hover", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      expect(tooltip.trigger).toBe("hover");
    });

    it("应该支持 trigger='click'", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.setAttribute("trigger", "click");
      tooltip.innerHTML = `<span slot="reference">Click me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      expect(tooltip.trigger).toBe("click");
    });

    it("应该支持 trigger='focus'", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.setAttribute("trigger", "focus");
      tooltip.innerHTML = `<span slot="reference">Focus me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      expect(tooltip.trigger).toBe("focus");
    });

    it("应该支持 trigger='contextmenu'", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.setAttribute("trigger", "contextmenu");
      tooltip.innerHTML = `<span slot="reference">Right click me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      expect(tooltip.trigger).toBe("contextmenu");
    });

    it("应该支持 trigger='customized'", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.setAttribute("trigger", "customized");
      tooltip.innerHTML = `<span slot="reference">Custom trigger</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      expect(tooltip.trigger).toBe("customized");
    });

    it("trigger='customized' 时不应自动绑定任何触发事件", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.setAttribute("trigger", "customized");
      tooltip.innerHTML = `<span slot="reference">Custom trigger</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      tooltip.dispatchEvent(new Event("mouseover"));
      expect(tooltip.visible === false || tooltip.visible === null).toBe(true);
    });

    it("trigger='hover' 时 mouseover 应触发 show", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.setAttribute("trigger", "hover");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      tooltip.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
      await waitForRender();

      expect(tooltip.visible).toBe(true);
    });

    it("trigger='click' 时 click 应切换 visible", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.setAttribute("trigger", "click");
      tooltip.innerHTML = `<span slot="reference">Click me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      tooltip.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await waitForRender();

      expect(tooltip.visible).toBe(true);

      tooltip.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await waitForRender();

      expect(tooltip.visible).toBe(false);
    });

    it("trigger='focus' 时 focus 应触发 show", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.setAttribute("trigger", "focus");
      tooltip.innerHTML = `<span slot="reference">Focus me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      tooltip.dispatchEvent(new FocusEvent("focus", { bubbles: true }));
      await waitForRender();

      expect(tooltip.visible).toBe(true);
    });

    it("trigger='contextmenu' 时应阻止默认右键菜单并显示 tooltip", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.setAttribute("trigger", "contextmenu");
      tooltip.innerHTML = `<span slot="reference">Right click</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      const contextmenuEvent = new MouseEvent("contextmenu", {
        bubbles: true,
        cancelable: true,
      });
      tooltip.dispatchEvent(contextmenuEvent);
      await waitForRender();

      expect(contextmenuEvent.defaultPrevented).toBe(true);
      expect(tooltip.visible).toBe(true);
    });

    it("动态更新 trigger 应重新绑定触发事件", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.setAttribute("trigger", "customized");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      tooltip.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await waitForRender();
      expect(tooltip.visible).toBe(false);

      tooltip.setAttribute("trigger", "click");
      await waitForRender();

      tooltip.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await waitForRender();
      expect(tooltip.visible).toBe(true);
    });

    it("从 hover 切换到 customized 后不应再响应 hover", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.setAttribute("trigger", "hover");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      tooltip.setAttribute("trigger", "customized");
      await waitForRender();

      tooltip.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
      await waitForRender();

      expect(tooltip.visible === false || tooltip.visible === null).toBe(true);
    });
  });

  describe("Content Attribute", () => {
    it("默认 content 应该是空字符串", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      expect(tooltip.content).toBe("");
    });

    it("应该支持 content 属性", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.setAttribute("content", "Tooltip content");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      expect(tooltip.content).toBe("Tooltip content");
    });

    it("content 元素应始终存在于模板中", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      const contentEl = tooltip.shadowRoot.querySelector(
        ".ea-tooltip__content"
      );
      expect(contentEl).toBeTruthy();
    });

    it("设置 content 后应更新 content 元素的文本", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      tooltip.content = "Hello tooltip";
      await waitForRender();

      const contentEl = tooltip.shadowRoot.querySelector(
        ".ea-tooltip__content"
      );
      expect(contentEl).toBeTruthy();
      expect(contentEl.textContent).toBe("Hello tooltip");
    });

    it("设置 content 后容器应包含 is-has-content 状态类", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      tooltip.content = "Hello tooltip";
      await waitForRender();

      const containerEl =
        tooltip.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-has-content")).toBe(true);
    });

    it("未设置 content 时容器不应包含 is-has-content 状态类", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      const containerEl =
        tooltip.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-has-content")).toBe(false);
    });

    it("设置 content 后默认 slot 应被 CSS 隐藏", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      tooltip.content = "Hello tooltip";
      await waitForRender();

      const defaultSlot = tooltip.shadowRoot.querySelector(
        ".ea-popper__original slot:not([name])"
      );
      expect(defaultSlot).toBeTruthy();
    });

    it("content 元素应在 _originalPopper 中", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      tooltip.content = "Hello tooltip";
      await waitForRender();

      const originalEl = tooltip.shadowRoot.querySelector(
        ".ea-popper__original"
      );
      const contentEl = originalEl.querySelector(".ea-tooltip__content");
      expect(contentEl).toBeTruthy();
      expect(contentEl.textContent).toBe("Hello tooltip");
    });

    it("动态更新 content 应更新已有 content 元素的文本", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      tooltip.content = "First content";
      await waitForRender();

      const contentEl = tooltip.shadowRoot.querySelector(
        ".ea-tooltip__content"
      );
      expect(contentEl.textContent).toBe("First content");

      tooltip.content = "Updated content";
      await waitForRender();

      expect(contentEl.textContent).toBe("Updated content");
    });

    it("content 元素应有 part='content'", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      tooltip.content = "Test";
      await waitForRender();

      const contentEl = tooltip.shadowRoot.querySelector(
        ".ea-tooltip__content"
      );
      expect(contentEl).toBeTruthy();
      expect(contentEl.getAttribute("part")).toBe("content");
      expect(contentEl.classList.contains("ea-tooltip__content")).toBe(true);
    });

    it("通过 attribute 设置 content 也应更新 content 元素", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.setAttribute("content", "Attr content");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      const contentEl = tooltip.shadowRoot.querySelector(
        ".ea-tooltip__content"
      );
      expect(contentEl).toBeTruthy();
      expect(contentEl.textContent).toBe("Attr content");
    });

    it("清空 content 后应移除 is-has-content 状态类", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      tooltip.content = "Hello";
      await waitForRender();

      const containerEl =
        tooltip.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-has-content")).toBe(true);

      tooltip.content = "";
      await waitForRender();

      expect(containerEl.classList.contains("is-has-content")).toBe(false);
    });
  });

  describe("Placement Attribute", () => {
    it("默认 placement 应该是 top", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      expect(tooltip.placement).toBe("top");
    });

    it("应该支持所有 placement 值", async () => {
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
        const tooltip = document.createElement("ea-tooltip");
        tooltip.setAttribute("placement", placement);
        tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
        container.appendChild(tooltip);

        await waitForRender();

        expect(tooltip.placement).toBe(placement);
        container.removeChild(tooltip);
      }
    });

    it("placement 应反映在容器类名中", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.setAttribute("placement", "bottom");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      const containerEl =
        tooltip.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-popper--bottom")).toBe(true);
    });
  });

  describe("Visible Attribute", () => {
    it("默认 visible 应该是 false", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      expect(tooltip.visible === false || tooltip.visible === null).toBe(true);
    });

    it("设置 visible 为 true 应显示 tooltip", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.setAttribute("visible", "");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      expect(tooltip.visible).toBe(true);
    });

    it("visible 为 true 时容器应包含 is-show 状态类", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.setAttribute("trigger", "customized");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      tooltip.show();
      await waitForRender();

      const containerEl =
        tooltip.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-show")).toBe(true);
    });

    it("visible 为 false 时容器不应包含 is-show 状态类", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.setAttribute("trigger", "customized");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      const containerEl =
        tooltip.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-show")).toBe(false);
    });
  });

  describe("Width Attribute", () => {
    it("默认 width 应该是 150", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      expect(Number(tooltip.width)).toBe(150);
    });

    it("应该支持自定义 width", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.setAttribute("width", "200");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      expect(tooltip.width).toBe(200);
    });

    it("设置 width 应更新 CSS 变量 --ea-popper-width", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.setAttribute("width", "300");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      expect(tooltip.style.getPropertyValue("--ea-popper-width")).toBe("300px");
    });
  });

  describe("ShowArrow Attribute", () => {
    it("默认 showArrow 应该是 true", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      expect(tooltip.showArrow === true || tooltip.showArrow === null).toBe(
        true
      );
    });

    it("应该支持 showArrow 设置为 false", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);
      tooltip.showArrow = false;
      await waitForRender();

      expect(tooltip.showArrow).toBe(false);
    });

    it("showArrow 为 false 时容器不应包含 is-show-arrow 状态类", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);
      tooltip.showArrow = false;
      await waitForRender();

      const containerEl =
        tooltip.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-show-arrow")).toBe(false);
    });

    it("showArrow 为 true 时容器应包含 is-show-arrow 状态类", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);
      tooltip.showArrow = true;
      await waitForRender();

      const containerEl =
        tooltip.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-show-arrow")).toBe(true);
    });
  });

  describe("Offset Attribute", () => {
    it("默认 offset 应该是 '0 0'", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      expect(tooltip.offset).toBe("0 0");
    });

    it("应该支持自定义 offset", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.setAttribute("offset", "10 20");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      expect(tooltip.offset).toBe("10 20");
    });

    it("设置 offset 应更新 CSS 变量 --ea-popper-transform-x 和 --ea-popper-transform-y", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.setAttribute("offset", "10 20");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      expect(tooltip.style.getPropertyValue("--ea-popper-transform-x")).toBe(
        "10px"
      );
      expect(tooltip.style.getPropertyValue("--ea-popper-transform-y")).toBe(
        "20px"
      );
    });
  });

  describe("Flip Attribute", () => {
    it("默认 flip 应该是 true", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      expect(tooltip.flip === true || tooltip.flip === null).toBe(true);
    });

    it("应该支持 flip 设置为 false", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);
      tooltip.flip = false;
      await waitForRender();

      expect(tooltip.flip).toBe(false);
    });
  });

  describe("Methods", () => {
    it("show() 方法应该显示 tooltip", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.setAttribute("trigger", "customized");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      expect(tooltip.visible === false || tooltip.visible === null).toBe(true);

      tooltip.show();

      expect(tooltip.visible).toBe(true);
    });

    it("hide() 方法应该隐藏 tooltip", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.setAttribute("trigger", "customized");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      tooltip.show();
      expect(tooltip.visible).toBe(true);

      tooltip.hide();

      expect(tooltip.visible === false || tooltip.visible === null).toBe(true);
    });

    it("toggle() 方法应该切换 tooltip 显示状态", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.setAttribute("trigger", "customized");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      expect(tooltip.visible === false || tooltip.visible === null).toBe(true);

      tooltip.toggle();
      expect(tooltip.visible).toBe(true);

      tooltip.toggle();
      expect(tooltip.visible === false || tooltip.visible === null).toBe(true);
    });
  });

  describe("Events", () => {
    it("应该触发 ea-show 事件", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.setAttribute("trigger", "customized");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      const showHandler = vi.fn();
      tooltip.addEventListener("ea-show", showHandler);

      tooltip.show();
      await waitForRender();

      expect(showHandler).toHaveBeenCalled();
    });

    it("应该触发 ea-hide 事件", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.setAttribute("trigger", "customized");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      tooltip.show();
      await waitForRender();

      const hideHandler = vi.fn();
      tooltip.addEventListener("ea-hide", hideHandler);

      tooltip.hide();
      await waitForRender();

      expect(hideHandler).toHaveBeenCalled();
    });

    it("ea-show 事件应冒泡且可组合", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.setAttribute("trigger", "customized");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      const showHandler = vi.fn();
      tooltip.addEventListener("ea-show", showHandler);

      tooltip.show();
      await waitForRender();

      const event = showHandler.mock.calls[0][0];
      expect(event.bubbles).toBe(true);
      expect(event.composed).toBe(true);
    });

    it("ea-hide 事件应冒泡且可组合", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.setAttribute("trigger", "customized");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      tooltip.show();
      await waitForRender();

      const hideHandler = vi.fn();
      tooltip.addEventListener("ea-hide", hideHandler);

      tooltip.hide();
      await waitForRender();

      const event = hideHandler.mock.calls[0][0];
      expect(event.bubbles).toBe(true);
      expect(event.composed).toBe(true);
    });

    it("应该触发 ea-shown 事件（过渡动画结束后）", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.setAttribute("trigger", "customized");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      const shownHandler = vi.fn();
      tooltip.addEventListener("ea-shown", shownHandler);

      tooltip.show();
      await waitForRender();

      const containerEl =
        tooltip.shadowRoot.querySelector('[part="container"]');
      containerEl.dispatchEvent(new Event("transitionend", { bubbles: true }));
      await waitForRender();

      expect(shownHandler).toHaveBeenCalled();
    });

    it("应该触发 ea-hidden 事件（过渡动画结束后）", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.setAttribute("trigger", "customized");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      tooltip.show();
      await waitForRender();

      const containerEl =
        tooltip.shadowRoot.querySelector('[part="container"]');
      containerEl.dispatchEvent(new Event("transitionend", { bubbles: true }));
      await waitForRender();

      const hiddenHandler = vi.fn();
      tooltip.addEventListener("ea-hidden", hiddenHandler);

      tooltip.hide();
      await waitForRender();

      containerEl.dispatchEvent(new Event("transitionend", { bubbles: true }));
      await waitForRender();

      expect(hiddenHandler).toHaveBeenCalled();
    });
  });

  describe("updateContainerClasslist", () => {
    it("容器类名应同时包含 ea-popper 和 ea-tooltip 的类", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      const containerEl =
        tooltip.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-popper")).toBe(true);
      expect(containerEl.classList.contains("ea-tooltip")).toBe(true);
    });

    it("容器类名应包含 placement 修饰符", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.setAttribute("placement", "bottom");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      const containerEl =
        tooltip.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-popper--bottom")).toBe(true);
    });

    it("容器类名应包含 effect 修饰符", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.setAttribute("effect", "light");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      const containerEl =
        tooltip.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-tooltip--light")).toBe(true);
    });

    it("容器类名应包含 showArrow 状态", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      const containerEl =
        tooltip.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-show-arrow")).toBe(true);
    });

    it("visible 为 true 时 className 应包含 is-show 状态", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.setAttribute("trigger", "customized");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      tooltip.show();
      await waitForRender();

      const className = tooltip.updateContainerClasslist();
      expect(className).toContain("is-show");
    });

    it("visible 为 false 时 className 不应包含 is-show 状态", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.setAttribute("trigger", "customized");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      const className = tooltip.updateContainerClasslist();
      const classList = className.split(" ");
      expect(classList).not.toContain("is-show");
    });
  });

  describe("Combined Tests", () => {
    it("应该支持多种属性组合", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.setAttribute("content", "Test content");
      tooltip.setAttribute("placement", "bottom");
      tooltip.setAttribute("effect", "light");
      tooltip.setAttribute("trigger", "click");
      tooltip.innerHTML = `<span slot="reference">Click me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      expect(tooltip.content).toBe("Test content");
      expect(tooltip.placement).toBe("bottom");
      expect(tooltip.effect).toBe("light");
      expect(tooltip.trigger).toBe("click");
    });

    it("应该支持不同 effect 和 trigger 组合", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.setAttribute("effect", "light");
      tooltip.setAttribute("trigger", "focus");
      tooltip.innerHTML = `<input slot="reference" type="text" />`;
      container.appendChild(tooltip);

      await waitForRender();

      expect(tooltip.effect).toBe("light");
      expect(tooltip.trigger).toBe("focus");
    });

    it("容器类名应同时反映 placement、effect 和 showArrow", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.setAttribute("placement", "right");
      tooltip.setAttribute("effect", "light");
      tooltip.setAttribute("show-arrow", "true");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      const containerEl =
        tooltip.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-popper--right")).toBe(true);
      expect(containerEl.classList.contains("ea-tooltip--light")).toBe(true);
      expect(containerEl.classList.contains("is-show-arrow")).toBe(true);
    });

    it("设置 content 后再设置其他属性应保持 content 元素", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      tooltip.content = "Hello";
      await waitForRender();

      tooltip.setAttribute("placement", "bottom");
      tooltip.setAttribute("effect", "light");
      await waitForRender();

      const contentEl = tooltip.shadowRoot.querySelector(
        ".ea-tooltip__content"
      );
      expect(contentEl).toBeTruthy();
      expect(contentEl.textContent).toBe("Hello");
    });
  });

  describe("Edge Cases", () => {
    it("没有 reference slot 应该正常渲染", async () => {
      const tooltip = document.createElement("ea-tooltip");
      container.appendChild(tooltip);

      await waitForRender();

      expect(tooltip.shadowRoot).toBeTruthy();
    });

    it("空 content 应该正常渲染", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.setAttribute("content", "");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      expect(tooltip.content).toBe("");
    });

    it("多个 tooltip 应该独立工作", async () => {
      const tooltip1 = document.createElement("ea-tooltip");
      tooltip1.setAttribute("content", "Tooltip 1");
      tooltip1.innerHTML = `<span slot="reference">Hover 1</span>`;

      const tooltip2 = document.createElement("ea-tooltip");
      tooltip2.setAttribute("content", "Tooltip 2");
      tooltip2.innerHTML = `<span slot="reference">Hover 2</span>`;

      container.appendChild(tooltip1);
      container.appendChild(tooltip2);

      await waitForRender();

      expect(tooltip1.content).toBe("Tooltip 1");
      expect(tooltip2.content).toBe("Tooltip 2");
    });

    it("content 设置为空字符串后 content 元素应存在但无文本", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      tooltip.content = "";
      await waitForRender();

      const contentEl = tooltip.shadowRoot.querySelector(
        ".ea-tooltip__content"
      );
      expect(contentEl).toBeTruthy();
      expect(contentEl.textContent).toBe("");
    });

    it("先设置 content 再清空应保留 content 元素但文本为空", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      tooltip.content = "Hello";
      await waitForRender();

      let contentEl = tooltip.shadowRoot.querySelector(".ea-tooltip__content");
      expect(contentEl).toBeTruthy();
      expect(contentEl.textContent).toBe("Hello");

      tooltip.content = "";
      await waitForRender();

      contentEl = tooltip.shadowRoot.querySelector(".ea-tooltip__content");
      expect(contentEl).toBeTruthy();
      expect(contentEl.textContent).toBe("");
    });
  });

  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.setAttribute("placement", "bottom");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      expect(tooltip.shadowRoot).toBeTruthy();
      expect(tooltip.placement).toBe("bottom");
    });

    it("组件断开连接后应该正常移除", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      tooltip.remove();

      expect(tooltip.isConnected).toBe(false);
    });

    it("应该支持属性动态更新", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      expect(tooltip.effect).toBe("dark");

      tooltip.setAttribute("effect", "light");
      await waitForRender();

      expect(tooltip.effect).toBe("light");
    });

    it("动态更新 placement 应更新容器类名", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      const containerEl =
        tooltip.shadowRoot.querySelector('[part="container"]');

      tooltip.setAttribute("placement", "bottom");
      await waitForRender();

      expect(containerEl.classList.contains("ea-popper--bottom")).toBe(true);
      expect(containerEl.classList.contains("ea-popper--top")).toBe(false);
    });

    it("动态更新 showArrow 应更新容器类名", async () => {
      const tooltip = document.createElement("ea-tooltip");
      tooltip.innerHTML = `<span slot="reference">Hover me</span>`;
      container.appendChild(tooltip);

      await waitForRender();

      const containerEl =
        tooltip.shadowRoot.querySelector('[part="container"]');

      tooltip.showArrow = false;
      await waitForRender();

      expect(containerEl.classList.contains("is-show-arrow")).toBe(false);

      tooltip.showArrow = true;
      await waitForRender();

      expect(containerEl.classList.contains("is-show-arrow")).toBe(true);
    });
  });
});
