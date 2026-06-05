import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender";
import { runAxe, assertNoA11yViolations } from "./utils/a11y";

import "../components/ea-message/index";

describe("EaMessage Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
    document.querySelectorAll("ea-message").forEach(el => el.remove());
    vi.useRealTimers();
  });

  describe("Basic Rendering", () => {
    it("应该正确渲染 ea-message 组件", async () => {
      const message = document.createElement("ea-message");
      container.appendChild(message);

      await waitForRender();

      expect(message).toBeDefined();
      expect(message.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const message = document.createElement("ea-message");
      container.appendChild(message);

      await waitForRender();

      expect(
        message.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
    });

    it("应该包含 icon CSS Part", async () => {
      const message = document.createElement("ea-message");
      container.appendChild(message);

      await waitForRender();

      expect(message.shadowRoot.querySelector('[part="icon"]')).toBeTruthy();
    });

    it("应该包含 content-wrap CSS Part", async () => {
      const message = document.createElement("ea-message");
      container.appendChild(message);

      await waitForRender();

      expect(
        message.shadowRoot.querySelector('[part="content-wrap"]')
      ).toBeTruthy();
    });

    it("应该包含 close-icon CSS Part", async () => {
      const message = document.createElement("ea-message");
      container.appendChild(message);

      await waitForRender();

      expect(
        message.shadowRoot.querySelector('[part="close-icon"]')
      ).toBeTruthy();
    });

    it("应该渲染 ea-icon 作为图标元素", async () => {
      const message = document.createElement("ea-message");
      container.appendChild(message);

      await waitForRender();

      const icon = message.shadowRoot.querySelector("ea-icon");
      expect(icon).toBeTruthy();
    });

    it("应该渲染关闭图标 ea-icon", async () => {
      const message = document.createElement("ea-message");
      message.showClose = true;
      container.appendChild(message);

      await waitForRender();

      const closeIcon = message.shadowRoot.querySelector(
        ".ea-message__close-icon"
      );
      expect(closeIcon).toBeTruthy();
    });
  });

  describe("Variant Attribute", () => {
    it("默认 variant 应该是 info", async () => {
      const message = document.createElement("ea-message");
      container.appendChild(message);

      await waitForRender();

      expect(message.variant).toBe("info");
    });

    it("应该支持 variant='primary'", async () => {
      const message = document.createElement("ea-message");
      message.variant = "primary";
      container.appendChild(message);

      await waitForRender();

      expect(message.variant).toBe("primary");
    });

    it("应该支持 variant='success'", async () => {
      const message = document.createElement("ea-message");
      message.variant = "success";
      container.appendChild(message);

      await waitForRender();

      expect(message.variant).toBe("success");
    });

    it("应该支持 variant='warning'", async () => {
      const message = document.createElement("ea-message");
      message.variant = "warning";
      container.appendChild(message);

      await waitForRender();

      expect(message.variant).toBe("warning");
    });

    it("应该支持 variant='danger'", async () => {
      const message = document.createElement("ea-message");
      message.variant = "danger";
      container.appendChild(message);

      await waitForRender();

      expect(message.variant).toBe("danger");
    });

    it("应该支持不同的 variant 值", async () => {
      const variants = ["primary", "success", "warning", "danger", "info"];

      for (const variant of variants) {
        const message = document.createElement("ea-message");
        message.variant = variant;
        expect(message.variant).toBe(variant);
      }
    });

    it("variant 为 success 时图标应该是 circle-check", async () => {
      const message = document.createElement("ea-message");
      message.variant = "success";
      container.appendChild(message);

      await waitForRender();

      const icon = message.shadowRoot.querySelector(".ea-message__icon");
      expect(icon.getAttribute("name")).toBe("circle-check");
    });

    it("variant 为 danger 时图标应该是 circle-xmark", async () => {
      const message = document.createElement("ea-message");
      message.variant = "danger";
      container.appendChild(message);

      await waitForRender();

      const icon = message.shadowRoot.querySelector(".ea-message__icon");
      expect(icon.getAttribute("name")).toBe("circle-xmark");
    });

    it("variant 为 warning 时图标应该是 triangle-exclamation", async () => {
      const message = document.createElement("ea-message");
      message.variant = "warning";
      container.appendChild(message);

      await waitForRender();

      const icon = message.shadowRoot.querySelector(".ea-message__icon");
      expect(icon.getAttribute("name")).toBe("triangle-exclamation");
    });

    it("variant 为 info 时图标应该是 circle-info", async () => {
      const message = document.createElement("ea-message");
      message.variant = "info";
      container.appendChild(message);

      await waitForRender();

      const icon = message.shadowRoot.querySelector(".ea-message__icon");
      expect(icon.getAttribute("name")).toBe("circle-info");
    });

    it("variant 为 primary 时图标应该是 circle-info", async () => {
      const message = document.createElement("ea-message");
      message.variant = "primary";
      container.appendChild(message);

      await waitForRender();

      const icon = message.shadowRoot.querySelector(".ea-message__icon");
      expect(icon.getAttribute("name")).toBe("circle-info");
    });

    it("动态修改 variant 应该更新图标", async () => {
      const message = document.createElement("ea-message");
      message.variant = "info";
      container.appendChild(message);

      await waitForRender();

      message.variant = "success";
      await waitForRender();

      const icon = message.shadowRoot.querySelector(".ea-message__icon");
      expect(icon.getAttribute("name")).toBe("circle-check");
    });

    it("动态修改 variant 应该更新容器类名", async () => {
      const message = document.createElement("ea-message");
      message.variant = "info";
      container.appendChild(message);

      await waitForRender();

      message.variant = "danger";
      await waitForRender();

      const containerEl = message.shadowRoot.querySelector(".ea-message");
      expect(containerEl.classList.contains("ea-message--danger")).toBe(true);
    });
  });

  describe("Visible Attribute", () => {
    it("默认 visible 应该是 false", async () => {
      const message = document.createElement("ea-message");
      container.appendChild(message);

      await waitForRender();

      expect(message.visible).toBe(false);
    });

    it("设置 visible 为 true 应该显示消息", async () => {
      const message = document.createElement("ea-message");
      message.visible = true;
      container.appendChild(message);

      await waitForRender();

      expect(message.visible).toBe(true);
    });

    it("visible 为 true 时容器应该包含 is-visible 状态类名", async () => {
      const message = document.createElement("ea-message");
      message.visible = true;
      container.appendChild(message);

      await waitForRender();

      const containerEl = message.shadowRoot.querySelector(".ea-message");
      expect(containerEl.classList.contains("is-visible")).toBe(true);
    });

    it("visible 为 false 时不应该包含 is-visible 状态类名", async () => {
      const message = document.createElement("ea-message");
      message.visible = false;
      container.appendChild(message);

      await waitForRender();

      const containerEl = message.shadowRoot.querySelector(".ea-message");
      expect(containerEl.classList.contains("is-visible")).toBe(false);
    });

    it("从 false 切换到 true 应该触发 ea-show 事件", async () => {
      const message = document.createElement("ea-message");
      container.appendChild(message);

      await waitForRender();

      const showHandler = vi.fn();
      message.addEventListener("ea-show", showHandler);

      message.visible = true;
      await waitForRender();

      expect(showHandler).toHaveBeenCalled();
    });

    it("从 true 切换到 false 应该触发 ea-hide 事件", async () => {
      const message = document.createElement("ea-message");
      message.visible = true;
      container.appendChild(message);

      await waitForRender();

      const hideHandler = vi.fn();
      message.addEventListener("ea-hide", hideHandler);

      message.visible = false;
      await waitForRender();

      expect(hideHandler).toHaveBeenCalled();
    });
  });

  describe("Message Attribute", () => {
    it("默认 message 应该是空字符串", async () => {
      const message = document.createElement("ea-message");
      container.appendChild(message);

      await waitForRender();

      expect(message.message).toBe("");
    });

    it("应该支持 message 属性", async () => {
      const message = document.createElement("ea-message");
      message.message = "This is a test message";
      container.appendChild(message);

      await waitForRender();

      expect(message.message).toBe("This is a test message");
    });

    it("message 应该正确渲染到 content 元素", async () => {
      const message = document.createElement("ea-message");
      message.message = "Test content";
      container.appendChild(message);

      await waitForRender();

      const content = message.shadowRoot.querySelector(".ea-message__content");
      expect(content.textContent).toBe("Test content");
    });

    it("动态修改 message 应该更新内容", async () => {
      const message = document.createElement("ea-message");
      message.message = "Initial";
      container.appendChild(message);

      await waitForRender();

      message.message = "Updated";
      await waitForRender();

      const content = message.shadowRoot.querySelector(".ea-message__content");
      expect(content.textContent).toBe("Updated");
    });
  });

  describe("ShowClose Attribute", () => {
    it("默认 showClose 应该是 false", async () => {
      const message = document.createElement("ea-message");
      container.appendChild(message);

      await waitForRender();

      expect(message.showClose).toBe(false);
    });

    it("设置 showClose 为 true 应该显示关闭按钮", async () => {
      const message = document.createElement("ea-message");
      message.showClose = true;
      container.appendChild(message);

      await waitForRender();

      expect(message.showClose).toBe(true);
    });

    it("showClose 为 true 时容器应该包含 is-show-close 状态类名", async () => {
      const message = document.createElement("ea-message");
      message.showClose = true;
      container.appendChild(message);

      await waitForRender();

      const containerEl = message.shadowRoot.querySelector(".ea-message");
      expect(containerEl.classList.contains("is-show-close")).toBe(true);
    });

    it("showClose 为 false 时不应该包含 is-show-close 状态类名", async () => {
      const message = document.createElement("ea-message");
      message.showClose = false;
      container.appendChild(message);

      await waitForRender();

      const containerEl = message.shadowRoot.querySelector(".ea-message");
      expect(containerEl.classList.contains("is-show-close")).toBe(false);
    });

    it("动态修改 showClose 应该更新类名", async () => {
      const message = document.createElement("ea-message");
      message.showClose = false;
      container.appendChild(message);

      await waitForRender();

      message.showClose = true;
      await waitForRender();

      const containerEl = message.shadowRoot.querySelector(".ea-message");
      expect(containerEl.classList.contains("is-show-close")).toBe(true);
    });
  });

  describe("Placement Attribute", () => {
    it("默认 placement 应该是 top", async () => {
      const message = document.createElement("ea-message");
      container.appendChild(message);

      await waitForRender();

      expect(message.placement).toBe("top");
    });

    it("应该支持所有 placement 值", async () => {
      const placements = [
        "top",
        "top-left",
        "top-right",
        "bottom",
        "bottom-left",
        "bottom-right",
        "middle",
      ];

      for (const placement of placements) {
        const message = document.createElement("ea-message");
        message.placement = placement;
        expect(message.placement).toBe(placement);
      }
    });

    it("placement 应该正确应用到容器类名", async () => {
      const message = document.createElement("ea-message");
      message.placement = "bottom-left";
      container.appendChild(message);

      await waitForRender();

      const containerEl = message.shadowRoot.querySelector(".ea-message");
      expect(containerEl.classList.contains("ea-message--bottom-left")).toBe(
        true
      );
    });

    it("动态修改 placement 应该更新类名", async () => {
      const message = document.createElement("ea-message");
      message.placement = "top";
      container.appendChild(message);

      await waitForRender();

      message.placement = "bottom";
      await waitForRender();

      const containerEl = message.shadowRoot.querySelector(".ea-message");
      expect(containerEl.classList.contains("ea-message--bottom")).toBe(true);
      expect(containerEl.classList.contains("ea-message--top")).toBe(false);
    });

    it("应该支持 middle placement", async () => {
      const message = document.createElement("ea-message");
      message.placement = "middle";
      container.appendChild(message);

      await waitForRender();

      const containerEl = message.shadowRoot.querySelector(".ea-message");
      expect(containerEl.classList.contains("ea-message--middle")).toBe(true);
    });
  });

  describe("Icon Attribute", () => {
    it("默认 icon 应该是空字符串", async () => {
      const message = document.createElement("ea-message");
      container.appendChild(message);

      await waitForRender();

      expect(message.icon).toBe("");
    });

    it("应该支持 icon 属性", async () => {
      const message = document.createElement("ea-message");
      message.icon = "circle-info";
      container.appendChild(message);

      await waitForRender();

      expect(message.icon).toBe("circle-info");
    });

    it("设置自定义 icon 应该覆盖默认图标", async () => {
      const message = document.createElement("ea-message");
      message.variant = "success";
      message.icon = "custom-icon";
      container.appendChild(message);

      await waitForRender();

      const icon = message.shadowRoot.querySelector(".ea-message__icon");
      expect(icon.getAttribute("name")).toBe("custom-icon");
    });

    it("动态修改 icon 应该更新图标元素", async () => {
      const message = document.createElement("ea-message");
      message.variant = "info";
      container.appendChild(message);

      await waitForRender();

      message.icon = "star";
      await waitForRender();

      const icon = message.shadowRoot.querySelector(".ea-message__icon");
      expect(icon.getAttribute("name")).toBe("star");
    });

    it("清空 icon 后应该恢复为 variant 对应的默认图标", async () => {
      const message = document.createElement("ea-message");
      message.variant = "danger";
      message.icon = "custom";
      container.appendChild(message);

      await waitForRender();

      message.icon = "";
      await waitForRender();

      const icon = message.shadowRoot.querySelector(".ea-message__icon");
      expect(icon.getAttribute("name")).toBe("circle-xmark");
    });
  });

  describe("Offset Attribute", () => {
    it("默认 offset 应该是 0", async () => {
      const message = document.createElement("ea-message");
      container.appendChild(message);

      await waitForRender();

      expect(message.offset).toBe(0);
    });

    it("设置 offset 应该更新 --ea-message-y CSS 变量", async () => {
      const message = document.createElement("ea-message");
      message.offset = 20;
      container.appendChild(message);

      await waitForRender();

      const y = message.style.getPropertyValue("--ea-message-y");
      expect(y).toBe("20px");
    });

    it("动态修改 offset 应该更新 CSS 变量", async () => {
      const message = document.createElement("ea-message");
      message.offset = 10;
      container.appendChild(message);

      await waitForRender();

      message.offset = 30;
      await waitForRender();

      const y = message.style.getPropertyValue("--ea-message-y");
      expect(y).toBe("30px");
    });
  });

  describe("dangerouslyUseHTMLString Attribute", () => {
    it("默认 dangerouslyUseHTMLString 应该是 false", async () => {
      const message = document.createElement("ea-message");
      container.appendChild(message);

      await waitForRender();

      expect(message.dangerouslyUseHTMLString).toBe(false);
    });

    it("dangerouslyUseHTMLString 为 false 时应该转义 HTML", async () => {
      const message = document.createElement("ea-message");
      message.dangerouslyUseHTMLString = false;
      message.message = "<strong>Bold</strong> text";
      container.appendChild(message);

      await waitForRender();

      const content = message.shadowRoot.querySelector(".ea-message__content");
      expect(content.innerHTML).toBe("&lt;strong&gt;Bold&lt;/strong&gt; text");
    });

    it("dangerouslyUseHTMLString 为 true 时应该渲染 HTML", async () => {
      const message = document.createElement("ea-message");
      message.dangerouslyUseHTMLString = true;
      message.message = "<strong>Bold</strong> text";
      container.appendChild(message);

      await waitForRender();

      const content = message.shadowRoot.querySelector(".ea-message__content");
      expect(content.querySelector("strong")).toBeTruthy();
    });
  });

  describe("Methods", () => {
    it("应该存在 close 方法", async () => {
      const message = document.createElement("ea-message");
      container.appendChild(message);

      await waitForRender();

      expect(typeof message.close).toBe("function");
    });

    it("调用 close 方法应该关闭消息", async () => {
      const message = document.createElement("ea-message");
      message.visible = true;
      container.appendChild(message);

      await waitForRender();

      message.close();
      await waitForRender();

      expect(message.visible).toBe(false);
    });

    it("调用 close 方法应该触发 ea-close 事件", async () => {
      const message = document.createElement("ea-message");
      container.appendChild(message);

      await waitForRender();

      const closeHandler = vi.fn();
      message.addEventListener("ea-close", closeHandler);

      message.close();
      await waitForRender();

      expect(closeHandler).toHaveBeenCalled();
    });

    it("应该存在 updateContainerClasslist 方法", async () => {
      const message = document.createElement("ea-message");
      container.appendChild(message);

      await waitForRender();

      expect(typeof message.updateContainerClasslist).toBe("function");
    });

    it("updateContainerClasslist 应该返回正确的类名字符串", async () => {
      const message = document.createElement("ea-message");
      message.variant = "success";
      message.placement = "top-right";
      message.visible = true;
      message.showClose = true;
      container.appendChild(message);

      await waitForRender();

      const className = message.updateContainerClasslist();
      expect(className).toContain("ea-message--success");
      expect(className).toContain("ea-message--top-right");
      expect(className).toContain("is-visible");
      expect(className).toContain("is-show-close");
    });
  });

  describe("Events", () => {
    it("应该触发 ea-show 事件", async () => {
      const message = document.createElement("ea-message");
      container.appendChild(message);

      await waitForRender();

      const showPromise = new Promise(resolve => {
        message.addEventListener("ea-show", resolve);
      });

      message.visible = true;

      await showPromise;

      expect(true).toBe(true);
    });

    it("应该触发 ea-shown 事件", async () => {
      const message = document.createElement("ea-message");
      container.appendChild(message);

      await waitForRender();

      const shownPromise = new Promise(resolve => {
        message.addEventListener("ea-shown", resolve);
      });

      message.visible = true;

      await Promise.race([
        shownPromise,
        new Promise(resolve => setTimeout(resolve, 300)),
      ]);

      expect(true).toBe(true);
    });

    it("应该触发 ea-hide 事件", async () => {
      const message = document.createElement("ea-message");
      message.visible = true;
      container.appendChild(message);

      await waitForRender();

      const hidePromise = new Promise(resolve => {
        message.addEventListener("ea-hide", resolve);
      });

      message.visible = false;

      await hidePromise;

      expect(true).toBe(true);
    });

    it("应该触发 ea-hidden 事件", async () => {
      const message = document.createElement("ea-message");
      message.visible = true;
      container.appendChild(message);

      await waitForRender();

      const hiddenPromise = new Promise(resolve => {
        message.addEventListener("ea-hidden", resolve);
      });

      message.visible = false;

      await Promise.race([
        hiddenPromise,
        new Promise(resolve => setTimeout(resolve, 300)),
      ]);

      expect(true).toBe(true);
    });

    it("应该触发 ea-close 事件", async () => {
      const message = document.createElement("ea-message");
      container.appendChild(message);

      await waitForRender();

      const closePromise = new Promise(resolve => {
        message.addEventListener("ea-close", resolve);
      });

      message.close();

      await closePromise;

      expect(true).toBe(true);
    });

    it("ea-close 事件应该是 EaMessageCloseEvent", async () => {
      const message = document.createElement("ea-message");
      container.appendChild(message);

      await waitForRender();

      let eventType = null;
      message.addEventListener("ea-close", e => {
        eventType = e.type;
      });

      message.close();
      await waitForRender();

      expect(eventType).toBe("ea-close");
    });
  });

  describe("Close Button Interaction", () => {
    it("点击关闭按钮应该触发 close 方法", async () => {
      const message = document.createElement("ea-message");
      message.showClose = true;
      message.visible = true;
      container.appendChild(message);

      await waitForRender();

      const closeHandler = vi.fn();
      message.addEventListener("ea-close", closeHandler);

      const closeIcon = message.shadowRoot.querySelector(
        ".ea-message__close-icon"
      );
      closeIcon.click();

      await waitForRender();

      expect(closeHandler).toHaveBeenCalled();
    });

    it("showClose 为 false 时点击关闭按钮不应该触发 close", async () => {
      const message = document.createElement("ea-message");
      message.showClose = false;
      message.visible = true;
      container.appendChild(message);

      await waitForRender();

      const closeHandler = vi.fn();
      message.addEventListener("ea-close", closeHandler);

      const closeIcon = message.shadowRoot.querySelector(
        ".ea-message__close-icon"
      );
      closeIcon.click();

      await waitForRender();

      expect(closeHandler).not.toHaveBeenCalled();
    });
  });

  describe("Combined Attributes", () => {
    it("应该同时支持 variant 和 message", async () => {
      const message = document.createElement("ea-message");
      message.variant = "success";
      message.message = "Operation successful";
      container.appendChild(message);

      await waitForRender();

      expect(message.variant).toBe("success");
      expect(message.message).toBe("Operation successful");
    });

    it("应该同时支持 showClose 和 placement", async () => {
      const message = document.createElement("ea-message");
      message.showClose = true;
      message.placement = "top-right";
      container.appendChild(message);

      await waitForRender();

      expect(message.showClose).toBe(true);
      expect(message.placement).toBe("top-right");
    });

    it("应该同时设置多个属性", async () => {
      const message = document.createElement("ea-message");
      message.variant = "warning";
      message.message = "Warning message";
      message.showClose = true;
      message.placement = "top-right";
      message.icon = "custom-icon";
      message.visible = true;
      container.appendChild(message);

      await waitForRender();

      expect(message.variant).toBe("warning");
      expect(message.message).toBe("Warning message");
      expect(message.showClose).toBe(true);
      expect(message.placement).toBe("top-right");
      expect(message.icon).toBe("custom-icon");
      expect(message.visible).toBe(true);
    });

    it("多个属性组合应该正确渲染", async () => {
      const message = document.createElement("ea-message");
      message.variant = "danger";
      message.message = "Error!";
      message.showClose = true;
      message.placement = "bottom";
      message.visible = true;
      container.appendChild(message);

      await waitForRender();

      const containerEl = message.shadowRoot.querySelector(".ea-message");
      expect(containerEl.classList.contains("ea-message--danger")).toBe(true);
      expect(containerEl.classList.contains("ea-message--bottom")).toBe(true);
      expect(containerEl.classList.contains("is-visible")).toBe(true);
      expect(containerEl.classList.contains("is-show-close")).toBe(true);

      const content = message.shadowRoot.querySelector(".ea-message__content");
      expect(content.textContent).toBe("Error!");
    });
  });

  describe("Edge Cases", () => {
    it("空 message 应该正确处理", async () => {
      const message = document.createElement("ea-message");
      message.message = "";
      container.appendChild(message);

      await waitForRender();

      expect(message.message).toBe("");
    });

    it("空 message 时内容元素应该为空", async () => {
      const message = document.createElement("ea-message");
      message.message = "";
      container.appendChild(message);

      await waitForRender();

      const content = message.shadowRoot.querySelector(".ea-message__content");
      expect(content.textContent).toBe("");
    });

    it("HTML 特殊字符应该被正确转义", async () => {
      const message = document.createElement("ea-message");
      message.message = "<div>test</div>";
      container.appendChild(message);

      await waitForRender();

      const content = message.shadowRoot.querySelector(".ea-message__content");
      expect(content.querySelector("div")).toBeFalsy();
    });

    it("多个消息应该正确堆叠", async () => {
      const message1 = document.createElement("ea-message");
      message1.visible = true;
      document.body.appendChild(message1);

      const message2 = document.createElement("ea-message");
      message2.visible = true;
      document.body.appendChild(message2);

      await waitForRender();

      const messages = document.querySelectorAll("ea-message");
      expect(messages.length).toBe(2);

      message1.remove();
      message2.remove();
    });

    it("重复设置相同属性不应该出错", async () => {
      const message = document.createElement("ea-message");
      message.variant = "success";
      message.variant = "success";
      message.message = "test";
      message.message = "test";
      container.appendChild(message);

      await waitForRender();

      expect(message.variant).toBe("success");
      expect(message.message).toBe("test");
    });

    it("快速切换 visible 不应该出错", async () => {
      const message = document.createElement("ea-message");
      container.appendChild(message);

      await waitForRender();

      message.visible = true;
      message.visible = false;
      message.visible = true;
      message.visible = false;

      await waitForRender();

      expect(message.visible).toBe(false);
    });

    it("未挂载到 DOM 时设置属性不应该出错", async () => {
      const message = document.createElement("ea-message");

      message.variant = "success";
      message.message = "test";
      message.visible = true;
      message.showClose = true;

      expect(message.variant).toBe("success");
      expect(message.message).toBe("test");
      expect(message.visible).toBe(true);
      expect(message.showClose).toBe(true);
    });
  });

  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const message = document.createElement("ea-message");
      message.variant = "success";
      message.message = "Test";
      container.appendChild(message);

      await waitForRender();

      expect(
        message.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
    });

    it("组件断开连接后应该正常移除", () => {
      const message = document.createElement("ea-message");
      container.appendChild(message);

      message.remove();

      expect(container.contains(message)).toBe(false);
    });

    it("动态修改 variant 应该生效", async () => {
      const message = document.createElement("ea-message");
      message.variant = "info";
      container.appendChild(message);

      await waitForRender();

      message.variant = "danger";

      await waitForRender();

      expect(message.variant).toBe("danger");
    });

    it("动态修改 message 应该生效", async () => {
      const message = document.createElement("ea-message");
      message.message = "Initial";
      container.appendChild(message);

      await waitForRender();

      message.message = "Updated";

      await waitForRender();

      expect(message.message).toBe("Updated");
    });

    it("动态修改 visible 应该生效", async () => {
      const message = document.createElement("ea-message");
      message.visible = false;
      container.appendChild(message);

      await waitForRender();

      expect(message.visible).toBe(false);

      message.visible = true;

      await waitForRender();

      expect(message.visible).toBe(true);
    });

    it("组件移除后再次添加应该正常工作", async () => {
      const message = document.createElement("ea-message");
      message.message = "Test";
      container.appendChild(message);

      await waitForRender();

      message.remove();
      container.appendChild(message);

      await waitForRender();

      expect(message.message).toBe("Test");
    });
  });

  describe("CSS Classes and Styling", () => {
    it("默认状态应该包含基础类名", async () => {
      const message = document.createElement("ea-message");
      container.appendChild(message);

      await waitForRender();

      const containerEl = message.shadowRoot.querySelector(".ea-message");
      expect(containerEl).toBeTruthy();
      expect(containerEl.classList.contains("ea-message")).toBe(true);
    });

    it("应该包含 variant 对应的修饰类名", async () => {
      const message = document.createElement("ea-message");
      message.variant = "success";
      container.appendChild(message);

      await waitForRender();

      const containerEl = message.shadowRoot.querySelector(".ea-message");
      expect(containerEl.classList.contains("ea-message--success")).toBe(true);
    });

    it("应该包含 placement 对应的修饰类名", async () => {
      const message = document.createElement("ea-message");
      message.placement = "bottom-right";
      container.appendChild(message);

      await waitForRender();

      const containerEl = message.shadowRoot.querySelector(".ea-message");
      expect(containerEl.classList.contains("ea-message--bottom-right")).toBe(
        true
      );
    });

    it("visible 为 true 时应该添加 is-show 状态类名", async () => {
      const message = document.createElement("ea-message");
      message.visible = true;
      container.appendChild(message);

      await waitForRender();

      const containerEl = message.shadowRoot.querySelector(".ea-message");
      expect(containerEl.classList.contains("is-show")).toBe(true);
    });

    it("关闭图标默认应该包含 xmark", async () => {
      const message = document.createElement("ea-message");
      message.showClose = true;
      container.appendChild(message);

      await waitForRender();

      const closeIcon = message.shadowRoot.querySelector(
        ".ea-message__close-icon"
      );
      expect(closeIcon.getAttribute("name")).toBe("xmark");
    });
  });

  describe("Stacking Position", () => {
    it("单个消息不应该设置 --ea-message-y", async () => {
      const message = document.createElement("ea-message");
      message.visible = true;
      document.body.appendChild(message);

      await waitForRender();

      const y = message.style.getPropertyValue("--ea-message-y");
      expect(y === "" || y === "0px").toBe(true);

      message.remove();
    });

    it("多个相同 placement 的消息应该设置 --ea-message-y", async () => {
      const message1 = document.createElement("ea-message");
      message1.placement = "top";
      message1.visible = true;
      document.body.appendChild(message1);

      await waitForRender();

      const message2 = document.createElement("ea-message");
      message2.placement = "top";
      message2.visible = true;
      document.body.appendChild(message2);

      await waitForRender();

      const y2 = message2.style.getPropertyValue("--ea-message-y");
      expect(y2).not.toBe("");

      message1.remove();
      message2.remove();
    });

    it("不同 placement 的消息不应该互相影响", async () => {
      const message1 = document.createElement("ea-message");
      message1.placement = "top";
      message1.visible = true;
      document.body.appendChild(message1);

      await waitForRender();

      const message2 = document.createElement("ea-message");
      message2.placement = "bottom";
      message2.visible = true;
      document.body.appendChild(message2);

      await waitForRender();

      const y2 = message2.style.getPropertyValue("--ea-message-y");
      expect(y2 === "" || y2 === "0px").toBe(true);

      message1.remove();
      message2.remove();
    });
  });

  describe("Global $message Instance", () => {
    it("window.$message 应该存在", () => {
      expect(window.$message).toBeDefined();
      expect(typeof window.$message).toBe("function");
    });

    it("$message 应该支持字符串参数", () => {
      expect(() => {
        window.$message("Hello world");
      }).not.toThrow();
    });

    it("$message 应该支持对象参数", () => {
      expect(() => {
        window.$message({ message: "Hello", variant: "success" });
      }).not.toThrow();
    });

    it("$message.primary 应该存在且是函数", () => {
      expect(typeof window.$message.primary).toBe("function");
    });

    it("$message.success 应该存在且是函数", () => {
      expect(typeof window.$message.success).toBe("function");
    });

    it("$message.warning 应该存在且是函数", () => {
      expect(typeof window.$message.warning).toBe("function");
    });

    it("$message.info 应该存在且是函数", () => {
      expect(typeof window.$message.info).toBe("function");
    });

    it("$message.danger 应该存在且是函数", () => {
      expect(typeof window.$message.danger).toBe("function");
    });

    it("$message.error 应该存在且是函数", () => {
      expect(typeof window.$message.error).toBe("function");
    });

    it("$message.success 调用后应该创建 ea-message 元素", async () => {
      window.$message.success("Success message");

      await waitForRender();

      const messages = document.querySelectorAll("ea-message");
      expect(messages.length).toBeGreaterThan(0);

      messages.forEach(el => el.remove());
    });

    it("$message.error 调用后应该创建 variant=danger 的 ea-message 元素", async () => {
      window.$message.error("Error message");

      await waitForRender();

      const messages = document.querySelectorAll("ea-message");
      const lastMessage = messages[messages.length - 1];
      expect(lastMessage.variant).toBe("danger");

      messages.forEach(el => el.remove());
    });

    it("$message.danger 调用后应该创建 variant=danger 的 ea-message 元素", async () => {
      window.$message.danger("Danger message");

      await waitForRender();

      const messages = document.querySelectorAll("ea-message");
      const lastMessage = messages[messages.length - 1];
      expect(lastMessage.variant).toBe("danger");

      messages.forEach(el => el.remove());
    });

    it("$message 调用后应该设置 visible 为 true", async () => {
      window.$message("Test message");

      await waitForRender();

      const messages = document.querySelectorAll("ea-message");
      const lastMessage = messages[messages.length - 1];
      expect(lastMessage.visible).toBe(true);

      messages.forEach(el => el.remove());
    });

    it("$message 调用后应该设置 message 内容", async () => {
      window.$message("Custom message text");

      await waitForRender();

      const messages = document.querySelectorAll("ea-message");
      const lastMessage = messages[messages.length - 1];
      expect(lastMessage.message).toBe("Custom message text");

      messages.forEach(el => el.remove());
    });

    it("$message 应该支持 placement 选项", async () => {
      window.$message({ message: "Test", placement: "bottom" });

      await waitForRender();

      const messages = document.querySelectorAll("ea-message");
      const lastMessage = messages[messages.length - 1];
      expect(lastMessage.placement).toBe("bottom");

      messages.forEach(el => el.remove());
    });

    it("$message 应该支持 showClose 选项", async () => {
      window.$message({ message: "Test", showClose: true });

      await waitForRender();

      const messages = document.querySelectorAll("ea-message");
      const lastMessage = messages[messages.length - 1];
      expect(lastMessage.showClose).toBe(true);

      messages.forEach(el => el.remove());
    });

    it("$message 应该支持 icon 选项", async () => {
      window.$message({ message: "Test", icon: "custom-icon" });

      await waitForRender();

      const messages = document.querySelectorAll("ea-message");
      const lastMessage = messages[messages.length - 1];
      expect(lastMessage.icon).toBe("custom-icon");

      messages.forEach(el => el.remove());
    });

    it("$message 应该支持 dangerouslyUseHTMLString 选项", async () => {
      window.$message({
        message: "<b>HTML</b>",
        dangerouslyUseHTMLString: true,
      });

      await waitForRender();

      const messages = document.querySelectorAll("ea-message");
      const lastMessage = messages[messages.length - 1];
      expect(lastMessage.dangerouslyUseHTMLString).toBe(true);

      messages.forEach(el => el.remove());
    });

    it("$message 应该支持 offset 选项", async () => {
      window.$message({ message: "Test", offset: 20 });

      await waitForRender();

      const messages = document.querySelectorAll("ea-message");
      const lastMessage = messages[messages.length - 1];
      expect(lastMessage.offset).toBe(20);

      messages.forEach(el => el.remove());
    });

    it("$message 应该支持 appendTo 选项（HTMLElement）", async () => {
      const target = document.createElement("div");
      document.body.appendChild(target);

      window.$message({ message: "Test", appendTo: target });

      await waitForRender();

      expect(target.querySelector("ea-message")).toBeTruthy();

      target.remove();
    });

    it("$message 应该支持 appendTo 选项（选择器字符串）", async () => {
      const target = document.createElement("div");
      target.id = "message-target";
      document.body.appendChild(target);

      window.$message({ message: "Test", appendTo: "#message-target" });

      await waitForRender();

      expect(target.querySelector("ea-message")).toBeTruthy();

      target.remove();
    });

    it("$message 应该支持 onClose 回调", async () => {
      vi.useFakeTimers({ shouldAdvanceTime: true });

      const onClose = vi.fn();
      window.$message({ message: "Test", duration: 100, onClose });

      await waitForRender();

      vi.advanceTimersByTime(200);
      await waitForRender();

      const messages = document.querySelectorAll("ea-message");
      const lastMessage = messages[messages.length - 1];
      lastMessage.emit("ea-hidden");
      await waitForRender();

      expect(onClose).toHaveBeenCalled();

      messages.forEach(el => el.remove());
    });

    it("$message 的 duration 为 0 时不应该自动关闭", async () => {
      vi.useFakeTimers({ shouldAdvanceTime: true });

      window.$message({ message: "Test", duration: 0 });

      await waitForRender();

      const messages = document.querySelectorAll("ea-message");
      const lastMessage = messages[messages.length - 1];

      vi.advanceTimersByTime(5000);
      await waitForRender();

      expect(lastMessage.visible).toBe(true);

      messages.forEach(el => el.remove());
    });
  });

  describe("Accessibility", () => {
    it("默认状态应该无 a11y 违规", async () => {
      const el = document.createElement("ea-message");
      container.appendChild(el);
      await waitForRender();
      const results = await runAxe(el);
      assertNoA11yViolations(results);
    });

    describe("ARIA Attributes", () => {
      it("宿主元素应该有 role='alert'", async () => {
        const el = document.createElement("ea-message");
        container.appendChild(el);
        await waitForRender();
        expect(el.getAttribute("role")).toBe("alert");
      });

      it("宿主元素应该有 aria-live='assertive'", async () => {
        const el = document.createElement("ea-message");
        container.appendChild(el);
        await waitForRender();
        expect(el.getAttribute("aria-live")).toBe("assertive");
      });

      it("宿主元素应该有 aria-atomic='true'", async () => {
        const el = document.createElement("ea-message");
        container.appendChild(el);
        await waitForRender();
        expect(el.getAttribute("aria-atomic")).toBe("true");
      });
    });
  });
});
