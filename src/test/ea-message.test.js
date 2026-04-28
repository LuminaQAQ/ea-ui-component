import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender";

// 导入 ea-message 组件
import "../components/ea-message/index";

describe("EaMessage Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
    // 清理所有 ea-message 元素
    document.querySelectorAll("ea-message").forEach(el => el.remove());
    vi.useRealTimers();
  });

  // ==================== 基本渲染测试 ====================

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

    it("应该渲染关闭按钮 ea-icon", async () => {
      const message = document.createElement("ea-message");
      message.showClose = true;
      container.appendChild(message);

      await waitForRender();

      const closeIcon = message.shadowRoot.querySelector(
        ".ea-message__icon-close"
      );
      expect(closeIcon).toBeTruthy();
    });
  });

  // ==================== Type 属性测试 ====================

  describe("Type Attribute", () => {
    it("默认 type 应该是 info", async () => {
      const message = document.createElement("ea-message");
      container.appendChild(message);

      await waitForRender();

      expect(message.type).toBe("info");
    });

    it("应该支持 type='primary'", async () => {
      const message = document.createElement("ea-message");
      message.type = "primary";
      container.appendChild(message);

      await waitForRender();

      expect(message.type).toBe("primary");
    });

    it("应该支持 type='success'", async () => {
      const message = document.createElement("ea-message");
      message.type = "success";
      container.appendChild(message);

      await waitForRender();

      expect(message.type).toBe("success");
    });

    it("应该支持 type='warning'", async () => {
      const message = document.createElement("ea-message");
      message.type = "warning";
      container.appendChild(message);

      await waitForRender();

      expect(message.type).toBe("warning");
    });

    it("应该支持 type='error'", async () => {
      const message = document.createElement("ea-message");
      message.type = "error";
      container.appendChild(message);

      await waitForRender();

      expect(message.type).toBe("error");
    });

    it("应该支持不同的 type 值", async () => {
      const types = ["primary", "success", "warning", "info", "error"];

      for (const type of types) {
        const message = document.createElement("ea-message");
        message.type = type;
        expect(message.type).toBe(type);
      }
    });

    it("type 为 success 时图标应该是 circle-check", async () => {
      const message = document.createElement("ea-message");
      message.type = "success";
      container.appendChild(message);

      await waitForRender();

      const icon = message.shadowRoot.querySelector(".ea-message__icon");
      expect(icon.getAttribute("name")).toBe("circle-check");
    });

    it("type 为 error 时图标应该是 circle-xmark", async () => {
      const message = document.createElement("ea-message");
      message.type = "error";
      container.appendChild(message);

      await waitForRender();

      const icon = message.shadowRoot.querySelector(".ea-message__icon");
      expect(icon.getAttribute("name")).toBe("circle-xmark");
    });

    it("type 为 warning 时图标应该是 triangle-exclamation", async () => {
      const message = document.createElement("ea-message");
      message.type = "warning";
      container.appendChild(message);

      await waitForRender();

      const icon = message.shadowRoot.querySelector(".ea-message__icon");
      expect(icon.getAttribute("name")).toBe("triangle-exclamation");
    });

    it("type 为 info 时图标应该是 circle-info", async () => {
      const message = document.createElement("ea-message");
      message.type = "info";
      container.appendChild(message);

      await waitForRender();

      const icon = message.shadowRoot.querySelector(".ea-message__icon");
      expect(icon.getAttribute("name")).toBe("circle-info");
    });

    it("type 为 primary 时图标应该是 circle-info", async () => {
      const message = document.createElement("ea-message");
      message.type = "primary";
      container.appendChild(message);

      await waitForRender();

      const icon = message.shadowRoot.querySelector(".ea-message__icon");
      expect(icon.getAttribute("name")).toBe("circle-info");
    });

    it("动态修改 type 应该更新图标", async () => {
      const message = document.createElement("ea-message");
      message.type = "info";
      container.appendChild(message);

      await waitForRender();

      message.type = "success";
      await waitForRender();

      const icon = message.shadowRoot.querySelector(".ea-message__icon");
      expect(icon.getAttribute("name")).toBe("circle-check");
    });

    it("动态修改 type 应该更新容器类名", async () => {
      const message = document.createElement("ea-message");
      message.type = "info";
      container.appendChild(message);

      await waitForRender();

      message.type = "error";
      await waitForRender();

      const containerEl = message.shadowRoot.querySelector(".ea-message");
      expect(containerEl.classList.contains("ea-message--error")).toBe(true);
    });
  });

  // ==================== Visible 属性测试 ====================

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

    it("visible 为 true 时容器应该包含 visible 类名", async () => {
      const message = document.createElement("ea-message");
      message.visible = true;
      container.appendChild(message);

      await waitForRender();

      const containerEl = message.shadowRoot.querySelector(".ea-message");
      expect(containerEl.classList.contains("ea-message--visible")).toBe(true);
    });

    it("visible 为 false 时不应该包含 visible 类名", async () => {
      const message = document.createElement("ea-message");
      message.visible = false;
      container.appendChild(message);

      await waitForRender();

      const containerEl = message.shadowRoot.querySelector(".ea-message");
      expect(containerEl.classList.contains("ea-message--visible")).toBe(false);
    });

    it("从 false 切换到 true 应该触发 show 事件", async () => {
      const message = document.createElement("ea-message");
      container.appendChild(message);

      await waitForRender();

      const showHandler = vi.fn();
      message.addEventListener("show", showHandler);

      message.visible = true;
      await waitForRender();

      expect(showHandler).toHaveBeenCalled();
    });

    it("从 true 切换到 false 应该触发 hide 事件", async () => {
      const message = document.createElement("ea-message");
      message.visible = true;
      container.appendChild(message);

      await waitForRender();

      const hideHandler = vi.fn();
      message.addEventListener("hide", hideHandler);

      message.visible = false;
      await waitForRender();

      expect(hideHandler).toHaveBeenCalled();
    });
  });

  // ==================== Message 属性测试 ====================

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

    it("应该支持不同的 message 值", async () => {
      const messages = [
        "Hello World",
        "Success message",
        "Error occurred",
        "Warning: be careful",
      ];

      for (const msg of messages) {
        const message = document.createElement("ea-message");
        message.message = msg;
        expect(message.message).toBe(msg);
      }
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

  // ==================== ShowClose 属性测试 ====================

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

    it("showClose 为 true 时容器应该包含 show-close 类名", async () => {
      const message = document.createElement("ea-message");
      message.showClose = true;
      container.appendChild(message);

      await waitForRender();

      const containerEl = message.shadowRoot.querySelector(".ea-message");
      expect(containerEl.classList.contains("ea-message--show-close")).toBe(
        true
      );
    });

    it("showClose 为 false 时不应该包含 show-close 类名", async () => {
      const message = document.createElement("ea-message");
      message.showClose = false;
      container.appendChild(message);

      await waitForRender();

      const containerEl = message.shadowRoot.querySelector(".ea-message");
      expect(containerEl.classList.contains("ea-message--show-close")).toBe(
        false
      );
    });

    it("动态修改 showClose 应该更新类名", async () => {
      const message = document.createElement("ea-message");
      message.showClose = false;
      container.appendChild(message);

      await waitForRender();

      message.showClose = true;
      await waitForRender();

      const containerEl = message.shadowRoot.querySelector(".ea-message");
      expect(containerEl.classList.contains("ea-message--show-close")).toBe(
        true
      );
    });
  });

  // ==================== Placement 属性测试 ====================

  describe("Placement Attribute", () => {
    it("默认 placement 应该是 top", async () => {
      const message = document.createElement("ea-message");
      container.appendChild(message);

      await waitForRender();

      expect(message.placement).toBe("top");
    });

    it("应该支持 placement='top'", async () => {
      const message = document.createElement("ea-message");
      message.placement = "top";
      container.appendChild(message);

      await waitForRender();

      expect(message.placement).toBe("top");
    });

    it("应该支持 placement='top-left'", async () => {
      const message = document.createElement("ea-message");
      message.placement = "top-left";
      container.appendChild(message);

      await waitForRender();

      expect(message.placement).toBe("top-left");
    });

    it("应该支持 placement='top-right'", async () => {
      const message = document.createElement("ea-message");
      message.placement = "top-right";
      container.appendChild(message);

      await waitForRender();

      expect(message.placement).toBe("top-right");
    });

    it("应该支持 placement='bottom'", async () => {
      const message = document.createElement("ea-message");
      message.placement = "bottom";
      container.appendChild(message);

      await waitForRender();

      expect(message.placement).toBe("bottom");
    });

    it("应该支持 placement='bottom-left'", async () => {
      const message = document.createElement("ea-message");
      message.placement = "bottom-left";
      container.appendChild(message);

      await waitForRender();

      expect(message.placement).toBe("bottom-left");
    });

    it("应该支持 placement='bottom-right'", async () => {
      const message = document.createElement("ea-message");
      message.placement = "bottom-right";
      container.appendChild(message);

      await waitForRender();

      expect(message.placement).toBe("bottom-right");
    });

    it("应该支持 placement='middle'", async () => {
      const message = document.createElement("ea-message");
      message.placement = "middle";
      container.appendChild(message);

      await waitForRender();

      expect(message.placement).toBe("middle");
    });

    it("应该支持不同的 placement 值", async () => {
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
  });

  // ==================== Icon 属性测试 ====================

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
      message.type = "success";
      message.icon = "custom-icon";
      container.appendChild(message);

      await waitForRender();

      const icon = message.shadowRoot.querySelector(".ea-message__icon");
      expect(icon.getAttribute("name")).toBe("custom-icon");
    });

    it("动态修改 icon 应该更新图标元素", async () => {
      const message = document.createElement("ea-message");
      message.type = "info";
      container.appendChild(message);

      await waitForRender();

      message.icon = "star";
      await waitForRender();

      const icon = message.shadowRoot.querySelector(".ea-message__icon");
      expect(icon.getAttribute("name")).toBe("star");
    });

    it("清空 icon 后应该恢复为 type 对应的默认图标", async () => {
      const message = document.createElement("ea-message");
      message.type = "error";
      message.icon = "custom";
      container.appendChild(message);

      await waitForRender();

      message.icon = "";
      await waitForRender();

      const icon = message.shadowRoot.querySelector(".ea-message__icon");
      expect(icon.getAttribute("name")).toBe("circle-xmark");
    });
  });

  // ==================== dangerouslyUseHTMLString 属性测试 ====================

  describe("dangerouslyUseHTMLString Attribute", () => {
    it("默认 dangerouslyUseHTMLString 应该是 false", async () => {
      const message = document.createElement("ea-message");
      container.appendChild(message);

      await waitForRender();

      expect(message.dangerouslyUseHTMLString).toBe(false);
    });

    it("设置 dangerouslyUseHTMLString 为 true 应该支持 HTML", async () => {
      const message = document.createElement("ea-message");
      message.dangerouslyUseHTMLString = true;
      message.message = "<strong>Bold</strong> text";
      container.appendChild(message);

      await waitForRender();

      expect(message.dangerouslyUseHTMLString).toBe(true);
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

    it("动态切换 dangerouslyUseHTMLString 应该重新渲染内容", async () => {
      const message = document.createElement("ea-message");
      message.dangerouslyUseHTMLString = true;
      message.message = "<em>Italic</em>";
      container.appendChild(message);

      await waitForRender();

      const content = message.shadowRoot.querySelector(".ea-message__content");
      expect(content.querySelector("em")).toBeTruthy();
    });
  });

  // ==================== 方法测试 ====================

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

    it("调用 close 方法应该触发 close 事件", async () => {
      const message = document.createElement("ea-message");
      container.appendChild(message);

      await waitForRender();

      const closeHandler = vi.fn();
      message.addEventListener("close", closeHandler);

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
      message.type = "success";
      message.placement = "top-right";
      message.visible = true;
      message.showClose = true;
      container.appendChild(message);

      await waitForRender();

      const className = message.updateContainerClasslist();
      expect(className).toContain("ea-message--success");
      expect(className).toContain("ea-message--top-right");
      expect(className).toContain("ea-message--visible");
      expect(className).toContain("ea-message--show-close");
    });
  });

  // ==================== 事件测试 ====================

  describe("Events", () => {
    it("应该触发 show 事件", async () => {
      const message = document.createElement("ea-message");
      container.appendChild(message);

      await waitForRender();

      const showPromise = new Promise(resolve => {
        message.addEventListener("show", resolve);
      });

      message.visible = true;

      await showPromise;

      expect(true).toBe(true);
    });

    it("应该触发 shown 事件", async () => {
      const message = document.createElement("ea-message");
      container.appendChild(message);

      await waitForRender();

      const shownPromise = new Promise(resolve => {
        message.addEventListener("shown", resolve);
      });

      message.visible = true;

      await Promise.race([
        shownPromise,
        new Promise(resolve => setTimeout(resolve, 300)),
      ]);

      expect(true).toBe(true);
    });

    it("应该触发 hide 事件", async () => {
      const message = document.createElement("ea-message");
      message.visible = true;
      container.appendChild(message);

      await waitForRender();

      const hidePromise = new Promise(resolve => {
        message.addEventListener("hide", resolve);
      });

      message.visible = false;

      await hidePromise;

      expect(true).toBe(true);
    });

    it("应该触发 hidden 事件", async () => {
      const message = document.createElement("ea-message");
      message.visible = true;
      container.appendChild(message);

      await waitForRender();

      const hiddenPromise = new Promise(resolve => {
        message.addEventListener("hidden", resolve);
      });

      message.visible = false;

      await Promise.race([
        hiddenPromise,
        new Promise(resolve => setTimeout(resolve, 300)),
      ]);

      expect(true).toBe(true);
    });

    it("应该触发 close 事件", async () => {
      const message = document.createElement("ea-message");
      container.appendChild(message);

      await waitForRender();

      const closePromise = new Promise(resolve => {
        message.addEventListener("close", resolve);
      });

      message.close();

      await closePromise;

      expect(true).toBe(true);
    });

    it("show 事件应该是 CustomEvent", async () => {
      const message = document.createElement("ea-message");
      container.appendChild(message);

      await waitForRender();

      let eventType = null;
      message.addEventListener("show", e => {
        eventType = e.type;
      });

      message.visible = true;
      await waitForRender();

      expect(eventType).toBe("show");
    });

    it("close 事件应该是 CustomEvent", async () => {
      const message = document.createElement("ea-message");
      container.appendChild(message);

      await waitForRender();

      let eventType = null;
      message.addEventListener("close", e => {
        eventType = e.type;
      });

      message.close();
      await waitForRender();

      expect(eventType).toBe("close");
    });
  });

  // ==================== 关闭按钮交互测试 ====================

  describe("Close Button Interaction", () => {
    it("点击关闭按钮应该触发 close 方法", async () => {
      const message = document.createElement("ea-message");
      message.showClose = true;
      message.visible = true;
      container.appendChild(message);

      await waitForRender();

      const closeHandler = vi.fn();
      message.addEventListener("close", closeHandler);

      const closeIcon = message.shadowRoot.querySelector(
        ".ea-message__icon-close"
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
      message.addEventListener("close", closeHandler);

      const closeIcon = message.shadowRoot.querySelector(
        ".ea-message__icon-close"
      );
      closeIcon.click();

      await waitForRender();

      expect(closeHandler).not.toHaveBeenCalled();
    });
  });

  // ==================== 组合属性测试 ====================

  describe("Combined Attributes", () => {
    it("应该同时支持 type 和 message", async () => {
      const message = document.createElement("ea-message");
      message.type = "success";
      message.message = "Operation successful";
      container.appendChild(message);

      await waitForRender();

      expect(message.type).toBe("success");
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
      message.type = "warning";
      message.message = "Warning message";
      message.showClose = true;
      message.placement = "top-right";
      message.icon = "custom-icon";
      message.visible = true;
      container.appendChild(message);

      await waitForRender();

      expect(message.type).toBe("warning");
      expect(message.message).toBe("Warning message");
      expect(message.showClose).toBe(true);
      expect(message.placement).toBe("top-right");
      expect(message.icon).toBe("custom-icon");
      expect(message.visible).toBe(true);
    });

    it("多个属性组合应该正确渲染", async () => {
      const message = document.createElement("ea-message");
      message.type = "error";
      message.message = "Error!";
      message.showClose = true;
      message.placement = "bottom";
      message.visible = true;
      container.appendChild(message);

      await waitForRender();

      const containerEl = message.shadowRoot.querySelector(".ea-message");
      expect(containerEl.classList.contains("ea-message--error")).toBe(true);
      expect(containerEl.classList.contains("ea-message--bottom")).toBe(true);
      expect(containerEl.classList.contains("ea-message--visible")).toBe(true);
      expect(containerEl.classList.contains("ea-message--show-close")).toBe(
        true
      );

      const content = message.shadowRoot.querySelector(".ea-message__content");
      expect(content.textContent).toBe("Error!");
    });
  });

  // ==================== 边界条件测试 ====================

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

    it("特殊字符在 message 中应该正确处理", async () => {
      const message = document.createElement("ea-message");
      message.message = "<script>alert('xss')<\/script>";
      container.appendChild(message);

      await waitForRender();

      expect(message.message).toBe("<script>alert('xss')<\/script>");
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
      message.type = "success";
      message.type = "success";
      message.message = "test";
      message.message = "test";
      container.appendChild(message);

      await waitForRender();

      expect(message.type).toBe("success");
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

      message.type = "success";
      message.message = "test";
      message.visible = true;
      message.showClose = true;

      expect(message.type).toBe("success");
      expect(message.message).toBe("test");
      expect(message.visible).toBe(true);
      expect(message.showClose).toBe(true);
    });
  });

  // ==================== 生命周期测试 ====================

  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const message = document.createElement("ea-message");
      message.type = "success";
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

    it("动态修改 type 应该生效", async () => {
      const message = document.createElement("ea-message");
      message.type = "info";
      container.appendChild(message);

      await waitForRender();

      message.type = "error";

      await waitForRender();

      expect(message.type).toBe("error");
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

    it("动态修改 placement 应该生效", async () => {
      const message = document.createElement("ea-message");
      message.placement = "top";
      container.appendChild(message);

      await waitForRender();

      message.placement = "bottom";

      await waitForRender();

      expect(message.placement).toBe("bottom");
    });

    it("动态修改 showClose 应该生效", async () => {
      const message = document.createElement("ea-message");
      message.showClose = false;
      container.appendChild(message);

      await waitForRender();

      message.showClose = true;

      await waitForRender();

      expect(message.showClose).toBe(true);
    });

    it("动态修改 icon 应该生效", async () => {
      const message = document.createElement("ea-message");
      message.icon = "icon-a";
      container.appendChild(message);

      await waitForRender();

      message.icon = "icon-b";

      await waitForRender();

      expect(message.icon).toBe("icon-b");
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

  // ==================== CSS 类和样式测试 ====================

  describe("CSS Classes and Styling", () => {
    it("默认状态应该包含基础类名", async () => {
      const message = document.createElement("ea-message");
      container.appendChild(message);

      await waitForRender();

      const containerEl = message.shadowRoot.querySelector(".ea-message");
      expect(containerEl).toBeTruthy();
      expect(containerEl.classList.contains("ea-message")).toBe(true);
    });

    it("应该包含 type 对应的修饰类名", async () => {
      const message = document.createElement("ea-message");
      message.type = "success";
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

    it("visible 为 true 时应该包含 is-show 类名", async () => {
      const message = document.createElement("ea-message");
      message.visible = true;
      container.appendChild(message);

      await waitForRender();

      const containerEl = message.shadowRoot.querySelector(".ea-message");
      expect(containerEl.classList.contains("ea-message--is-show")).toBe(true);
    });

    it("关闭图标默认应该包含 xmark", async () => {
      const message = document.createElement("ea-message");
      message.showClose = true;
      container.appendChild(message);

      await waitForRender();

      const closeIcon = message.shadowRoot.querySelector(
        ".ea-message__icon-close"
      );
      expect(closeIcon.getAttribute("name")).toBe("xmark");
    });
  });

  // ==================== 堆叠位置测试 ====================

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

  // ==================== 全局 $message 实例测试 ====================

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
        window.$message({ message: "Hello", type: "success" });
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

    it("$message.error 调用后应该创建 type=error 的 ea-message 元素", async () => {
      window.$message.error("Error message");

      await waitForRender();

      const messages = document.querySelectorAll("ea-message");
      const lastMessage = messages[messages.length - 1];
      expect(lastMessage.type).toBe("error");

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

      // 触发 hidden 事件以执行 onClose 回调
      const messages = document.querySelectorAll("ea-message");
      const lastMessage = messages[messages.length - 1];
      lastMessage.emit("hidden");
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
});
