import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender";
import { runAxe, assertNoA11yViolations } from "./utils/a11y";

import "../components/ea-notification/index";
import { EaNotification } from "../components/ea-notification/utils/EaNotificationInstance";

describe("EaNotification Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
    document.querySelectorAll("ea-notification").forEach(el => el.remove());
    vi.useRealTimers();
  });

  // ==================== 基础渲染测试 ====================

  describe("Basic Rendering", () => {
    it("应该正确渲染 ea-notification 组件", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await waitForRender();

      expect(notification).toBeDefined();
      expect(notification.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await waitForRender();

      expect(
        notification.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
    });

    it("应该包含 icon CSS Part", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await waitForRender();

      expect(
        notification.shadowRoot.querySelector('[part="icon"]')
      ).toBeTruthy();
    });

    it("应该包含 content CSS Part", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await waitForRender();

      expect(
        notification.shadowRoot.querySelector('[part="content"]')
      ).toBeTruthy();
    });

    it("应该包含 header CSS Part", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await waitForRender();

      expect(
        notification.shadowRoot.querySelector('[part="header"]')
      ).toBeTruthy();
    });

    it("应该包含 title CSS Part", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await waitForRender();

      expect(
        notification.shadowRoot.querySelector('[part="title"]')
      ).toBeTruthy();
    });

    it("应该包含 close-icon CSS Part", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await waitForRender();

      expect(
        notification.shadowRoot.querySelector('[part="close-icon"]')
      ).toBeTruthy();
    });

    it("应该包含 main CSS Part", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await waitForRender();

      expect(
        notification.shadowRoot.querySelector('[part="main"]')
      ).toBeTruthy();
    });

    it("应该渲染 ea-icon 作为类型图标", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await waitForRender();

      const icon = notification.shadowRoot.querySelector(
        ".ea-notification__icon"
      );
      expect(icon).toBeTruthy();
      expect(icon.tagName.toLowerCase()).toBe("ea-icon");
    });

    it("应该渲染 ea-icon 作为关闭按钮", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await waitForRender();

      const closeIcon = notification.shadowRoot.querySelector(
        ".ea-notification__close-icon"
      );
      expect(closeIcon).toBeTruthy();
      expect(closeIcon.tagName.toLowerCase()).toBe("ea-icon");
    });

    it("应该渲染标题元素", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await waitForRender();

      const title = notification.shadowRoot.querySelector(
        ".ea-notification__title"
      );
      expect(title).toBeTruthy();
      expect(title.tagName.toLowerCase()).toBe("h2");
    });

    it("应该渲染正文内容区域", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await waitForRender();

      const main = notification.shadowRoot.querySelector(
        ".ea-notification__main"
      );
      expect(main).toBeTruthy();
      expect(main.tagName.toLowerCase()).toBe("main");
    });
  });

  // ==================== Variant 属性测试 ====================

  describe("Variant Attribute", () => {
    it("默认 variant 应该是 info", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await waitForRender();

      expect(notification.variant).toBe("info");
    });

    it("应该支持 success 类型", async () => {
      const notification = document.createElement("ea-notification");
      notification.variant = "success";
      container.appendChild(notification);

      await waitForRender();

      expect(notification.variant).toBe("success");
    });

    it("应该支持 warning 类型", async () => {
      const notification = document.createElement("ea-notification");
      notification.variant = "warning";
      container.appendChild(notification);

      await waitForRender();

      expect(notification.variant).toBe("warning");
    });

    it("应该支持 error 类型", async () => {
      const notification = document.createElement("ea-notification");
      notification.variant = "error";
      container.appendChild(notification);

      await waitForRender();

      expect(notification.variant).toBe("error");
    });

    it("应该支持 primary 类型", async () => {
      const notification = document.createElement("ea-notification");
      notification.variant = "primary";
      container.appendChild(notification);

      await waitForRender();

      expect(notification.variant).toBe("primary");
    });

    it("variant 为 success 时图标应该是 circle-check", async () => {
      const notification = document.createElement("ea-notification");
      notification.variant = "success";
      container.appendChild(notification);

      await waitForRender();

      const icon = notification.shadowRoot.querySelector(
        ".ea-notification__icon"
      );
      expect(icon.getAttribute("name")).toBe("circle-check");
    });

    it("variant 为 error 时图标应该是 circle-xmark", async () => {
      const notification = document.createElement("ea-notification");
      notification.variant = "error";
      container.appendChild(notification);

      await waitForRender();

      const icon = notification.shadowRoot.querySelector(
        ".ea-notification__icon"
      );
      expect(icon.getAttribute("name")).toBe("circle-xmark");
    });

    it("variant 为 warning 时图标应该是 triangle-exclamation", async () => {
      const notification = document.createElement("ea-notification");
      notification.variant = "warning";
      container.appendChild(notification);

      await waitForRender();

      const icon = notification.shadowRoot.querySelector(
        ".ea-notification__icon"
      );
      expect(icon.getAttribute("name")).toBe("triangle-exclamation");
    });

    it("variant 为 info 时图标应该是 circle-info", async () => {
      const notification = document.createElement("ea-notification");
      notification.variant = "info";
      container.appendChild(notification);

      await waitForRender();

      const icon = notification.shadowRoot.querySelector(
        ".ea-notification__icon"
      );
      expect(icon.getAttribute("name")).toBe("circle-info");
    });

    it("variant 为 primary 时图标应该是 circle-info", async () => {
      const notification = document.createElement("ea-notification");
      notification.variant = "primary";
      container.appendChild(notification);

      await waitForRender();

      const icon = notification.shadowRoot.querySelector(
        ".ea-notification__icon"
      );
      expect(icon.getAttribute("name")).toBe("circle-info");
    });

    it("variant 应该正确反映到容器类名", async () => {
      const notification = document.createElement("ea-notification");
      notification.variant = "success";
      container.appendChild(notification);

      await waitForRender();

      const containerEl =
        notification.shadowRoot.querySelector(".ea-notification");
      expect(containerEl.classList.contains("ea-notification--success")).toBe(
        true
      );
    });

    it("动态修改 variant 应该更新容器类名", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await waitForRender();

      notification.variant = "warning";

      await waitForRender();

      const containerEl =
        notification.shadowRoot.querySelector(".ea-notification");
      expect(containerEl.classList.contains("ea-notification--warning")).toBe(
        true
      );
      expect(containerEl.classList.contains("ea-notification--info")).toBe(
        false
      );
    });

    it("通过 setAttribute 设置 variant 应该生效", async () => {
      const notification = document.createElement("ea-notification");
      notification.setAttribute("variant", "error");
      container.appendChild(notification);

      await waitForRender();

      expect(notification.variant).toBe("error");
    });
  });

  // ==================== Heading 属性测试 ====================

  describe("Heading Attribute", () => {
    it("默认 heading 应该是空字符串", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await waitForRender();

      expect(notification.heading).toBe("");
    });

    it("应该支持设置 heading", async () => {
      const notification = document.createElement("ea-notification");
      notification.heading = "Test Title";
      container.appendChild(notification);

      await waitForRender();

      expect(notification.heading).toBe("Test Title");
    });

    it("heading 应该渲染到 title 元素", async () => {
      const notification = document.createElement("ea-notification");
      notification.heading = "Test Heading";
      container.appendChild(notification);

      await waitForRender();

      const title = notification.shadowRoot.querySelector(
        ".ea-notification__title"
      );
      expect(title.textContent).toBe("Test Heading");
    });

    it("通过 setAttribute 设置 heading 应该生效", async () => {
      const notification = document.createElement("ea-notification");
      notification.setAttribute("heading", "Attribute Title");
      container.appendChild(notification);

      await waitForRender();

      expect(notification.heading).toBe("Attribute Title");
    });

    it("动态修改 heading 应该更新 title 元素内容", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await waitForRender();

      notification.heading = "Updated Title";

      await waitForRender();

      const title = notification.shadowRoot.querySelector(
        ".ea-notification__title"
      );
      expect(title.textContent).toBe("Updated Title");
    });
  });

  // ==================== Message 属性测试 ====================

  describe("Message Attribute", () => {
    it("默认 message 应该是空字符串", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await waitForRender();

      expect(notification.message).toBe("");
    });

    it("应该支持设置 message", async () => {
      const notification = document.createElement("ea-notification");
      notification.message = "Test Message";
      container.appendChild(notification);

      await waitForRender();

      expect(notification.message).toBe("Test Message");
    });

    it("message 应该渲染到 main 元素（纯文本）", async () => {
      const notification = document.createElement("ea-notification");
      notification.message = "Hello World";
      container.appendChild(notification);

      await waitForRender();

      const main = notification.shadowRoot.querySelector(
        ".ea-notification__main"
      );
      expect(main.textContent).toContain("Hello World");
    });

    it("dangerouslyUseHTMLString 为 false 时 HTML 标签应该被转义", async () => {
      const notification = document.createElement("ea-notification");
      notification.message = "<strong>Bold</strong>";
      container.appendChild(notification);

      await waitForRender();

      const main = notification.shadowRoot.querySelector(
        ".ea-notification__main"
      );
      expect(main.textContent).toBe("<strong>Bold</strong>");
      expect(main.querySelector("strong")).toBeNull();
    });

    it("dangerouslyUseHTMLString 为 true 时应该渲染 HTML", async () => {
      const notification = document.createElement("ea-notification");
      notification.dangerouslyUseHTMLString = true;
      notification.message = "<strong>Bold</strong>";
      container.appendChild(notification);

      await waitForRender();

      const main = notification.shadowRoot.querySelector(
        ".ea-notification__main"
      );
      expect(main.querySelector("strong")).toBeTruthy();
      expect(main.querySelector("strong").textContent).toBe("Bold");
    });

    it("dangerouslyUseHTMLString 默认应该是 false", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await waitForRender();

      expect(notification.dangerouslyUseHTMLString).toBe(false);
    });

    it("动态修改 message 应该更新 main 元素内容", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await waitForRender();

      notification.message = "Updated Message";

      await waitForRender();

      const main = notification.shadowRoot.querySelector(
        ".ea-notification__main"
      );
      expect(main.textContent).toContain("Updated Message");
    });
  });

  // ==================== Visible 属性测试 ====================

  describe("Visible Attribute", () => {
    it("默认 visible 应该是 false", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await waitForRender();

      expect(notification.visible).toBe(false);
    });

    it("应该支持设置 visible 为 true", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await waitForRender();

      notification.visible = true;

      await waitForRender();

      expect(notification.visible).toBe(true);
    });

    it("visible 为 true 时容器应该包含 is-visible 类名", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await waitForRender();

      notification.visible = true;

      await waitForRender();

      const containerEl =
        notification.shadowRoot.querySelector(".ea-notification");
      expect(containerEl.classList.contains("is-visible")).toBe(true);
    });

    it("visible 为 true 时容器应该包含 is-is-show 类名", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await waitForRender();

      notification.visible = true;

      await waitForRender();

      const containerEl =
        notification.shadowRoot.querySelector(".ea-notification");
      expect(containerEl.classList.contains("is-is-show")).toBe(true);
    });

    it("visible 为 false 时容器不应该包含 is-is-show 类名", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await waitForRender();

      const containerEl =
        notification.shadowRoot.querySelector(".ea-notification");
      expect(containerEl.classList.contains("is-is-show")).toBe(false);
    });

    it("从 true 切换到 false 时应该添加 is-before-hide 类名", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await waitForRender();

      notification.visible = true;
      await waitForRender();

      notification.visible = false;
      await waitForRender();

      const containerEl =
        notification.shadowRoot.querySelector(".ea-notification");
      expect(containerEl.classList.contains("is-before-hide")).toBe(true);
    });
  });

  // ==================== ShowClose 属性测试 ====================

  describe("ShowClose Attribute", () => {
    it("默认 showClose 应该是 false", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await waitForRender();

      expect(notification.showClose).toBe(false);
    });

    it("应该支持设置 showClose 为 true", async () => {
      const notification = document.createElement("ea-notification");
      notification.showClose = true;
      container.appendChild(notification);

      await waitForRender();

      expect(notification.showClose).toBe(true);
    });

    it("showClose 为 true 时容器应该包含 is-show-close 类名", async () => {
      const notification = document.createElement("ea-notification");
      notification.showClose = true;
      container.appendChild(notification);

      await waitForRender();

      const containerEl =
        notification.shadowRoot.querySelector(".ea-notification");
      expect(containerEl.classList.contains("is-show-close")).toBe(true);
    });

    it("showClose 为 false 时容器不应该包含 is-show-close 类名", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await waitForRender();

      const containerEl =
        notification.shadowRoot.querySelector(".ea-notification");
      expect(containerEl.classList.contains("is-show-close")).toBe(false);
    });

    it("showClose 为 true 时关闭图标应该可见", async () => {
      const notification = document.createElement("ea-notification");
      notification.showClose = true;
      container.appendChild(notification);

      await waitForRender();

      const closeIcon = notification.shadowRoot.querySelector(
        ".ea-notification__close-icon"
      );
      expect(closeIcon).toBeTruthy();
    });

    it("showClose 为 true 时关闭图标应该设置 name 属性", async () => {
      const notification = document.createElement("ea-notification");
      notification.showClose = true;
      container.appendChild(notification);

      await waitForRender();

      const closeIcon = notification.shadowRoot.querySelector(
        ".ea-notification__close-icon"
      );
      expect(closeIcon.getAttribute("name")).toBe("xmark");
    });

    it("动态切换 showClose 应该更新容器类名", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await waitForRender();

      notification.showClose = true;
      await waitForRender();

      const containerEl =
        notification.shadowRoot.querySelector(".ea-notification");
      expect(containerEl.classList.contains("is-show-close")).toBe(true);

      notification.showClose = false;
      await waitForRender();

      expect(containerEl.classList.contains("is-show-close")).toBe(false);
    });
  });

  // ==================== CloseIcon 属性测试 ====================

  describe("CloseIcon Attribute", () => {
    it("默认 closeIcon 应该是 xmark", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await waitForRender();

      expect(notification.closeIcon).toBe("xmark");
    });

    it("应该支持自定义 closeIcon", async () => {
      const notification = document.createElement("ea-notification");
      notification.showClose = true;
      notification.closeIcon = "cancel";
      container.appendChild(notification);

      await waitForRender();

      expect(notification.closeIcon).toBe("cancel");
    });

    it("showClose 为 true 时自定义 closeIcon 应该应用到关闭图标", async () => {
      const notification = document.createElement("ea-notification");
      notification.showClose = true;
      notification.closeIcon = "times";
      container.appendChild(notification);

      await waitForRender();

      const closeIcon = notification.shadowRoot.querySelector(
        ".ea-notification__close-icon"
      );
      expect(closeIcon.getAttribute("name")).toBe("times");
    });

    it("通过 setAttribute 设置 close-icon 应该生效", async () => {
      const notification = document.createElement("ea-notification");
      notification.showClose = true;
      notification.setAttribute("close-icon", "circle-xmark");
      container.appendChild(notification);

      await waitForRender();

      expect(notification.closeIcon).toBe("circle-xmark");
    });
  });

  // ==================== Placement 属性测试 ====================

  describe("Placement Attribute", () => {
    it("默认 placement 应该是 top-right", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await waitForRender();

      expect(notification.placement).toBe("top-right");
    });

    it("应该支持 top-left 位置", async () => {
      const notification = document.createElement("ea-notification");
      notification.placement = "top-left";
      container.appendChild(notification);

      await waitForRender();

      expect(notification.placement).toBe("top-left");
    });

    it("应该支持 bottom-right 位置", async () => {
      const notification = document.createElement("ea-notification");
      notification.placement = "bottom-right";
      container.appendChild(notification);

      await waitForRender();

      expect(notification.placement).toBe("bottom-right");
    });

    it("应该支持 bottom-left 位置", async () => {
      const notification = document.createElement("ea-notification");
      notification.placement = "bottom-left";
      container.appendChild(notification);

      await waitForRender();

      expect(notification.placement).toBe("bottom-left");
    });

    it("placement 应该正确反映到容器类名 - top-right", async () => {
      const notification = document.createElement("ea-notification");
      notification.placement = "top-right";
      container.appendChild(notification);

      await waitForRender();

      const containerEl =
        notification.shadowRoot.querySelector(".ea-notification");
      expect(containerEl.classList.contains("ea-notification--top-right")).toBe(
        true
      );
    });

    it("placement 应该正确反映到容器类名 - top-left", async () => {
      const notification = document.createElement("ea-notification");
      notification.placement = "top-left";
      container.appendChild(notification);

      await waitForRender();

      const containerEl =
        notification.shadowRoot.querySelector(".ea-notification");
      expect(containerEl.classList.contains("ea-notification--top-left")).toBe(
        true
      );
    });

    it("placement 应该正确反映到容器类名 - bottom-right", async () => {
      const notification = document.createElement("ea-notification");
      notification.placement = "bottom-right";
      container.appendChild(notification);

      await waitForRender();

      const containerEl =
        notification.shadowRoot.querySelector(".ea-notification");
      expect(
        containerEl.classList.contains("ea-notification--bottom-right")
      ).toBe(true);
    });

    it("placement 应该正确反映到容器类名 - bottom-left", async () => {
      const notification = document.createElement("ea-notification");
      notification.placement = "bottom-left";
      container.appendChild(notification);

      await waitForRender();

      const containerEl =
        notification.shadowRoot.querySelector(".ea-notification");
      expect(
        containerEl.classList.contains("ea-notification--bottom-left")
      ).toBe(true);
    });

    it("通过 setAttribute 设置 placement 应该生效", async () => {
      const notification = document.createElement("ea-notification");
      notification.setAttribute("placement", "bottom-left");
      container.appendChild(notification);

      await waitForRender();

      expect(notification.placement).toBe("bottom-left");
    });

    it("动态修改 placement 应该更新容器类名", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await waitForRender();

      notification.placement = "bottom-left";

      await waitForRender();

      const containerEl =
        notification.shadowRoot.querySelector(".ea-notification");
      expect(
        containerEl.classList.contains("ea-notification--bottom-left")
      ).toBe(true);
      expect(containerEl.classList.contains("ea-notification--top-right")).toBe(
        false
      );
    });
  });

  // ==================== zIndex 属性测试 ====================

  describe("zIndex Attribute", () => {
    it("默认 zIndex 应该是 0", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await waitForRender();

      expect(notification.zIndex).toBe(0);
    });

    it("应该支持设置 zIndex", async () => {
      const notification = document.createElement("ea-notification");
      notification.zIndex = 1000;
      container.appendChild(notification);

      await waitForRender();

      expect(notification.zIndex).toBe(1000);
    });

    it("zIndex 应该设置容器的 --z-index CSS 变量", async () => {
      const notification = document.createElement("ea-notification");
      notification.zIndex = 2000;
      container.appendChild(notification);

      await waitForRender();

      const containerEl =
        notification.shadowRoot.querySelector(".ea-notification");
      expect(containerEl.style.getPropertyValue("--z-index")).toBe("2000");
    });

    it("通过 setAttribute 设置 z-index 应该生效", async () => {
      const notification = document.createElement("ea-notification");
      notification.setAttribute("z-index", "500");
      container.appendChild(notification);

      await waitForRender();

      expect(notification.zIndex).toBe(500);
    });
  });

  // ==================== Icon 属性测试 ====================

  describe("Icon Attribute", () => {
    it("默认 icon 应该是空字符串", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await waitForRender();

      expect(notification.icon).toBe("");
    });

    it("应该支持自定义 icon", async () => {
      const notification = document.createElement("ea-notification");
      notification.icon = "custom-icon";
      container.appendChild(notification);

      await waitForRender();

      expect(notification.icon).toBe("custom-icon");
    });

    it("自定义 icon 应该覆盖 variant 默认图标", async () => {
      const notification = document.createElement("ea-notification");
      notification.variant = "success";
      notification.icon = "custom-icon";
      container.appendChild(notification);

      await waitForRender();

      const icon = notification.shadowRoot.querySelector(
        ".ea-notification__icon"
      );
      expect(icon.getAttribute("name")).toBe("custom-icon");
    });

    it("icon 为空时应该使用 variant 对应的默认图标", async () => {
      const notification = document.createElement("ea-notification");
      notification.variant = "error";
      container.appendChild(notification);

      await waitForRender();

      const icon = notification.shadowRoot.querySelector(
        ".ea-notification__icon"
      );
      expect(icon.getAttribute("name")).toBe("circle-xmark");
    });

    it("动态修改 icon 应该更新图标 name 属性", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await waitForRender();

      notification.icon = "star";

      await waitForRender();

      const icon = notification.shadowRoot.querySelector(
        ".ea-notification__icon"
      );
      expect(icon.getAttribute("name")).toBe("star");
    });

    it("将 icon 清空后应该回退到 variant 默认图标", async () => {
      const notification = document.createElement("ea-notification");
      notification.variant = "warning";
      notification.icon = "custom-icon";
      container.appendChild(notification);

      await waitForRender();

      notification.icon = "";

      await waitForRender();

      const icon = notification.shadowRoot.querySelector(
        ".ea-notification__icon"
      );
      expect(icon.getAttribute("name")).toBe("triangle-exclamation");
    });
  });

  // ==================== 事件测试 ====================

  describe("Events", () => {
    it("visible 变为 true 时应该触发 ea-show 事件", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await waitForRender();

      const showHandler = vi.fn();
      notification.addEventListener("ea-show", showHandler);

      notification.visible = true;

      await waitForRender();

      expect(showHandler).toHaveBeenCalledTimes(1);
    });

    it("visible 变为 true 后 transitionend 应该触发 ea-shown 事件", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await waitForRender();

      const shownHandler = vi.fn();
      notification.addEventListener("ea-shown", shownHandler);

      notification.visible = true;

      await waitForRender();

      const containerEl =
        notification.shadowRoot.querySelector(".ea-notification");
      containerEl.dispatchEvent(new Event("transitionend", { bubbles: true }));

      await waitForRender();

      expect(shownHandler).toHaveBeenCalledTimes(1);
    });

    it("visible 变为 false 时应该触发 ea-hide 事件", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await waitForRender();

      notification.visible = true;
      await waitForRender();

      const hideHandler = vi.fn();
      notification.addEventListener("ea-hide", hideHandler);

      notification.visible = false;

      await waitForRender();

      expect(hideHandler).toHaveBeenCalledTimes(1);
    });

    it("visible 变为 false 后 transitionend 应该触发 ea-hidden 事件", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await waitForRender();

      notification.visible = true;
      await waitForRender();

      const hiddenHandler = vi.fn();
      notification.addEventListener("ea-hidden", hiddenHandler);

      notification.visible = false;
      await waitForRender();

      const containerEl =
        notification.shadowRoot.querySelector(".ea-notification");
      containerEl.dispatchEvent(new Event("transitionend", { bubbles: true }));

      await waitForRender();

      expect(hiddenHandler).toHaveBeenCalledTimes(1);
    });

    it("调用 close() 应该触发 ea-close 事件", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await waitForRender();

      const closeHandler = vi.fn();
      notification.addEventListener("ea-close", closeHandler);

      notification.close();

      expect(closeHandler).toHaveBeenCalledTimes(1);
    });

    it("调用 close() 应该将 visible 设为 false", async () => {
      const notification = document.createElement("ea-notification");
      notification.visible = true;
      container.appendChild(notification);

      await waitForRender();

      notification.close();

      expect(notification.visible).toBe(false);
    });

    it("showClose 为 true 时点击关闭图标应该触发 ea-close 事件", async () => {
      const notification = document.createElement("ea-notification");
      notification.showClose = true;
      container.appendChild(notification);

      await waitForRender();

      const closeHandler = vi.fn();
      notification.addEventListener("ea-close", closeHandler);

      const closeIcon = notification.shadowRoot.querySelector(
        ".ea-notification__close-icon"
      );
      closeIcon.click();

      await waitForRender();

      expect(closeHandler).toHaveBeenCalledTimes(1);
    });

    it("showClose 为 false 时点击关闭图标不应该触发 ea-close 事件", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await waitForRender();

      const closeHandler = vi.fn();
      notification.addEventListener("ea-close", closeHandler);

      const closeIcon = notification.shadowRoot.querySelector(
        ".ea-notification__close-icon"
      );
      closeIcon.click();

      await waitForRender();

      expect(closeHandler).not.toHaveBeenCalled();
    });
  });

  // ==================== 方法测试 ====================

  describe("Methods", () => {
    it("close() 方法应该将 visible 设为 false", async () => {
      const notification = document.createElement("ea-notification");
      notification.visible = true;
      container.appendChild(notification);

      await waitForRender();

      expect(notification.visible).toBe(true);

      notification.close();

      expect(notification.visible).toBe(false);
    });

    it("close() 方法应该触发 ea-close 事件", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await waitForRender();

      const closeHandler = vi.fn();
      notification.addEventListener("ea-close", closeHandler);

      notification.close();

      expect(closeHandler).toHaveBeenCalledTimes(1);
    });

    it("updateContainerClasslist() 应该返回正确的类名", async () => {
      const notification = document.createElement("ea-notification");
      notification.variant = "success";
      notification.placement = "top-left";
      container.appendChild(notification);

      await waitForRender();

      const className = notification.updateContainerClasslist();

      expect(className).toContain("ea-notification");
      expect(className).toContain("ea-notification--success");
      expect(className).toContain("ea-notification--top-left");
    });
  });

  // ==================== CSS 类名测试 ====================

  describe("CSS Classes", () => {
    it("默认状态应该包含基础类名", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await waitForRender();

      const containerEl =
        notification.shadowRoot.querySelector(".ea-notification");
      expect(containerEl.classList.contains("ea-notification")).toBe(true);
    });

    it("默认状态应该包含 info 类型类名", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await waitForRender();

      const containerEl =
        notification.shadowRoot.querySelector(".ea-notification");
      expect(containerEl.classList.contains("ea-notification--info")).toBe(
        true
      );
    });

    it("默认状态应该包含 top-right 位置类名", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await waitForRender();

      const containerEl =
        notification.shadowRoot.querySelector(".ea-notification");
      expect(containerEl.classList.contains("ea-notification--top-right")).toBe(
        true
      );
    });

    it("visible 为 true 时应该包含 is-visible 类名", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await waitForRender();

      notification.visible = true;

      await waitForRender();

      const containerEl =
        notification.shadowRoot.querySelector(".ea-notification");
      expect(containerEl.classList.contains("is-visible")).toBe(true);
    });

    it("showClose 为 true 时应该包含 is-show-close 类名", async () => {
      const notification = document.createElement("ea-notification");
      notification.showClose = true;
      container.appendChild(notification);

      await waitForRender();

      const containerEl =
        notification.shadowRoot.querySelector(".ea-notification");
      expect(containerEl.classList.contains("is-show-close")).toBe(true);
    });

    it("多个修饰类名应该同时存在", async () => {
      const notification = document.createElement("ea-notification");
      notification.variant = "warning";
      notification.placement = "bottom-left";
      notification.showClose = true;
      notification.visible = true;
      container.appendChild(notification);

      await waitForRender();

      const containerEl =
        notification.shadowRoot.querySelector(".ea-notification");
      expect(containerEl.classList.contains("ea-notification--warning")).toBe(
        true
      );
      expect(
        containerEl.classList.contains("ea-notification--bottom-left")
      ).toBe(true);
      expect(containerEl.classList.contains("is-show-close")).toBe(true);
      expect(containerEl.classList.contains("is-visible")).toBe(true);
    });
  });

  // ==================== EaNotification 实例测试 ====================

  describe("EaNotification Instance", () => {
    it("应该能通过 EaNotification 函数创建通知", async () => {
      const instance = EaNotification({
        heading: "Test",
        message: "Test Message",
        duration: 0,
      });

      await waitForRender();

      expect(instance).toBeTruthy();
      expect(instance.instance).toBeTruthy();
      expect(instance.instance.tagName.toLowerCase()).toBe("ea-notification");

      instance.close();
    });

    it("创建的通知应该自动设置 visible 为 true", async () => {
      const instance = EaNotification({
        heading: "Test",
        message: "Test Message",
        duration: 0,
      });

      await waitForRender();

      expect(instance.instance.visible).toBe(true);

      instance.close();
    });

    it("应该支持 EaNotification.success 快捷方法", async () => {
      const instance = EaNotification.success({
        heading: "Success",
        message: "Success Message",
        duration: 0,
      });

      await waitForRender();

      expect(instance.instance.variant).toBe("success");

      instance.close();
    });

    it("应该支持 EaNotification.warning 快捷方法", async () => {
      const instance = EaNotification.warning({
        heading: "Warning",
        message: "Warning Message",
        duration: 0,
      });

      await waitForRender();

      expect(instance.instance.variant).toBe("warning");

      instance.close();
    });

    it("应该支持 EaNotification.error 快捷方法", async () => {
      const instance = EaNotification.error({
        heading: "Error",
        message: "Error Message",
        duration: 0,
      });

      await waitForRender();

      expect(instance.instance.variant).toBe("error");

      instance.close();
    });

    it("应该支持 EaNotification.info 快捷方法", async () => {
      const instance = EaNotification.info({
        heading: "Info",
        message: "Info Message",
        duration: 0,
      });

      await waitForRender();

      expect(instance.instance.variant).toBe("info");

      instance.close();
    });

    it("应该支持 EaNotification.primary 快捷方法", async () => {
      const instance = EaNotification.primary({
        heading: "Primary",
        message: "Primary Message",
        duration: 0,
      });

      await waitForRender();

      expect(instance.instance.variant).toBe("primary");

      instance.close();
    });

    it("应该支持自定义 placement", async () => {
      const instance = EaNotification({
        heading: "Test",
        message: "Test Message",
        placement: "top-left",
        duration: 0,
      });

      await waitForRender();

      expect(instance.instance.placement).toBe("top-left");

      instance.close();
    });

    it("应该支持 showClose 选项", async () => {
      const instance = EaNotification({
        heading: "Test",
        message: "Test Message",
        showClose: true,
        duration: 0,
      });

      await waitForRender();

      expect(instance.instance.showClose).toBe(true);

      instance.close();
    });

    it("应该支持自定义 icon", async () => {
      const instance = EaNotification({
        heading: "Test",
        message: "Test Message",
        icon: "custom-icon",
        duration: 0,
      });

      await waitForRender();

      expect(instance.instance.icon).toBe("custom-icon");

      instance.close();
    });

    it("应该支持 dangerouslyUseHTMLString", async () => {
      const instance = EaNotification({
        heading: "Test",
        dangerouslyUseHTMLString: true,
        message: "<strong>HTML</strong>",
        duration: 0,
      });

      await waitForRender();

      expect(instance.instance.dangerouslyUseHTMLString).toBe(true);

      instance.close();
    });

    it("应该支持 closeIcon 选项", async () => {
      const instance = EaNotification({
        heading: "Test",
        message: "Test Message",
        showClose: true,
        closeIcon: "times",
        duration: 0,
      });

      await waitForRender();

      expect(instance.instance.closeIcon).toBe("times");

      instance.close();
    });

    it("应该支持 zIndex 选项", async () => {
      const instance = EaNotification({
        heading: "Test",
        message: "Test Message",
        zIndex: 1000,
        duration: 0,
      });

      await waitForRender();

      expect(instance.instance.zIndex).toBe(1000);

      instance.close();
    });

    it("应该支持 appendTo 选项（HTMLElement）", async () => {
      const customContainer = document.createElement("div");
      document.body.appendChild(customContainer);

      const instance = EaNotification({
        heading: "Test",
        message: "Test Message",
        appendTo: customContainer,
        duration: 0,
      });

      await waitForRender();

      expect(customContainer.querySelector("ea-notification")).toBeTruthy();

      instance.close();
      customContainer.remove();
    });

    it("应该支持 appendTo 选项（选择器字符串）", async () => {
      const customContainer = document.createElement("div");
      customContainer.id = "notification-mount";
      document.body.appendChild(customContainer);

      const instance = EaNotification({
        heading: "Test",
        message: "Test Message",
        appendTo: "#notification-mount",
        duration: 0,
      });

      await waitForRender();

      expect(customContainer.querySelector("ea-notification")).toBeTruthy();

      instance.close();
      customContainer.remove();
    });

    it("appendTo 选择器无效时应该挂载到 body", async () => {
      const instance = EaNotification({
        heading: "Test",
        message: "Test Message",
        appendTo: "#non-existent-selector",
        duration: 0,
      });

      await waitForRender();

      expect(document.body.querySelector("ea-notification")).toBeTruthy();

      instance.close();
    });

    it("应该支持 onClose 回调", async () => {
      const onCloseFn = vi.fn();

      const instance = EaNotification({
        heading: "Test",
        message: "Test Message",
        duration: 0,
        onClose: onCloseFn,
      });

      await waitForRender();

      instance.close();

      await waitForRender();

      instance.instance.dispatchEvent(new Event("ea-hidden", { bubbles: true }));

      await waitForRender();

      expect(onCloseFn).toHaveBeenCalled();
    });

    it("duration 为 0 时不应该自动关闭", async () => {
      vi.useFakeTimers({ shouldAdvanceTime: true });

      const instance = EaNotification({
        heading: "Test",
        message: "Test Message",
        duration: 0,
      });

      await waitForRender();

      vi.advanceTimersByTime(5000);
      await waitForRender();

      expect(instance.instance.visible).toBe(true);

      instance.close();
    });

    it("duration 大于 0 时应该在指定时间后自动关闭", async () => {
      vi.useFakeTimers({ shouldAdvanceTime: true });

      const instance = EaNotification({
        heading: "Test",
        message: "Test Message",
        duration: 3000,
      });

      await waitForRender();

      expect(instance.instance.visible).toBe(true);

      vi.advanceTimersByTime(3000);
      await waitForRender();

      expect(instance.instance.visible).toBe(false);
    });

    it("ea-hidden 事件后应该自动从 DOM 移除", async () => {
      const instance = EaNotification({
        heading: "Test",
        message: "Test Message",
        duration: 0,
      });

      await waitForRender();

      const el = instance.instance;
      expect(el.isConnected).toBe(true);

      instance.close();

      await waitForRender();

      el.dispatchEvent(new Event("ea-hidden", { bubbles: true }));

      await waitForRender();

      expect(el.isConnected).toBe(false);
    });

    it("EaNotification 实例的 close() 方法应该调用组件的 close()", async () => {
      const instance = EaNotification({
        heading: "Test",
        message: "Test Message",
        duration: 0,
      });

      await waitForRender();

      const closeSpy = vi.spyOn(instance.instance, "close");

      instance.close();

      expect(closeSpy).toHaveBeenCalledTimes(1);
    });
  });

  // ==================== 全局 $notify 测试 ====================

  describe("Global $notify Instance", () => {
    it("window.$notify 应该存在", () => {
      expect(window.$notify).toBeDefined();
    });

    it("$notify.primary 应该存在且是函数", () => {
      expect(typeof window.$notify.primary).toBe("function");
    });

    it("$notify.success 应该存在且是函数", () => {
      expect(typeof window.$notify.success).toBe("function");
    });

    it("$notify.warning 应该存在且是函数", () => {
      expect(typeof window.$notify.warning).toBe("function");
    });

    it("$notify.info 应该存在且是函数", () => {
      expect(typeof window.$notify.info).toBe("function");
    });

    it("$notify.error 应该存在且是函数", () => {
      expect(typeof window.$notify.error).toBe("function");
    });

    it("$notify 调用后应该创建 ea-notification 元素", async () => {
      const instance = window.$notify({
        heading: "Test",
        message: "Test Message",
        duration: 0,
      });

      await waitForRender();

      expect(document.querySelector("ea-notification")).toBeTruthy();

      instance.close();
    });

    it("$notify.success 调用后应该创建 variant=success 的通知", async () => {
      const instance = window.$notify.success({
        heading: "Test",
        message: "Test Message",
        duration: 0,
      });

      await waitForRender();

      expect(instance.instance.variant).toBe("success");

      instance.close();
    });

    it("$notify.error 调用后应该创建 variant=error 的通知", async () => {
      const instance = window.$notify.error({
        heading: "Test",
        message: "Test Message",
        duration: 0,
      });

      await waitForRender();

      expect(instance.instance.variant).toBe("error");

      instance.close();
    });

    it("$notify 调用后应该设置 visible 为 true", async () => {
      const instance = window.$notify({
        heading: "Test",
        message: "Test Message",
        duration: 0,
      });

      await waitForRender();

      expect(instance.instance.visible).toBe(true);

      instance.close();
    });

    it("$notify 调用后应该设置 message 内容", async () => {
      const instance = window.$notify({
        heading: "Test",
        message: "Hello from $notify",
        duration: 0,
      });

      await waitForRender();

      expect(instance.instance.message).toBe("Hello from $notify");

      instance.close();
    });

    it("$notify 应该支持 placement 选项", async () => {
      const instance = window.$notify({
        heading: "Test",
        message: "Test Message",
        placement: "bottom-left",
        duration: 0,
      });

      await waitForRender();

      expect(instance.instance.placement).toBe("bottom-left");

      instance.close();
    });

    it("$notify 应该支持 showClose 选项", async () => {
      const instance = window.$notify({
        heading: "Test",
        message: "Test Message",
        showClose: true,
        duration: 0,
      });

      await waitForRender();

      expect(instance.instance.showClose).toBe(true);

      instance.close();
    });

    it("$notify 应该支持 icon 选项", async () => {
      const instance = window.$notify({
        heading: "Test",
        message: "Test Message",
        icon: "star",
        duration: 0,
      });

      await waitForRender();

      expect(instance.instance.icon).toBe("star");

      instance.close();
    });

    it("$notify 应该支持 dangerouslyUseHTMLString 选项", async () => {
      const instance = window.$notify({
        heading: "Test",
        dangerouslyUseHTMLString: true,
        message: "<strong>HTML</strong>",
        duration: 0,
      });

      await waitForRender();

      expect(instance.instance.dangerouslyUseHTMLString).toBe(true);

      instance.close();
    });

    it("$notify 应该支持 appendTo 选项（HTMLElement）", async () => {
      const customContainer = document.createElement("div");
      document.body.appendChild(customContainer);

      const instance = window.$notify({
        heading: "Test",
        message: "Test Message",
        appendTo: customContainer,
        duration: 0,
      });

      await waitForRender();

      expect(customContainer.querySelector("ea-notification")).toBeTruthy();

      instance.close();
      customContainer.remove();
    });

    it("$notify 应该支持 appendTo 选项（选择器字符串）", async () => {
      const customContainer = document.createElement("div");
      customContainer.id = "notify-mount-test";
      document.body.appendChild(customContainer);

      const instance = window.$notify({
        heading: "Test",
        message: "Test Message",
        appendTo: "#notify-mount-test",
        duration: 0,
      });

      await waitForRender();

      expect(customContainer.querySelector("ea-notification")).toBeTruthy();

      instance.close();
      customContainer.remove();
    });

    it("$notify 的 duration 为 0 时不应该自动关闭", async () => {
      vi.useFakeTimers({ shouldAdvanceTime: true });

      const instance = window.$notify({
        heading: "Test",
        message: "Test Message",
        duration: 0,
      });

      await waitForRender();

      vi.advanceTimersByTime(10000);
      await waitForRender();

      expect(instance.instance.visible).toBe(true);

      instance.close();
    });
  });

  // ==================== 边界条件测试 ====================

  describe("Edge Cases", () => {
    it("应该处理空组件", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await waitForRender();

      expect(notification.shadowRoot).toBeTruthy();
      expect(notification.variant).toBe("info");
      expect(notification.heading).toBe("");
      expect(notification.message).toBe("");
    });

    it("应该处理多次显示/隐藏", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await waitForRender();

      notification.visible = true;
      await waitForRender();
      expect(notification.visible).toBe(true);

      notification.visible = false;
      await waitForRender();
      expect(notification.visible).toBe(false);

      notification.visible = true;
      await waitForRender();
      expect(notification.visible).toBe(true);
    });

    it("应该处理属性动态更新", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await waitForRender();

      notification.variant = "warning";
      notification.heading = "Updated Title";
      notification.message = "Updated Message";

      await waitForRender();

      expect(notification.variant).toBe("warning");
      expect(notification.heading).toBe("Updated Title");
      expect(notification.message).toBe("Updated Message");
    });

    it("连续快速切换 visible 不应该报错", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await waitForRender();

      notification.visible = true;
      notification.visible = false;
      notification.visible = true;

      await waitForRender();

      expect(notification.visible).toBe(true);
    });

    it("组件断开连接后应该正常移除", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await waitForRender();

      notification.remove();

      expect(notification.isConnected).toBe(false);
    });
  });

  // ==================== 生命周期测试 ====================

  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const notification = document.createElement("ea-notification");
      notification.variant = "success";
      notification.heading = "Test Title";
      container.appendChild(notification);

      await waitForRender();

      expect(notification.shadowRoot).toBeTruthy();
      expect(notification.variant).toBe("success");
      expect(notification.heading).toBe("Test Title");
    });

    it("组件连接后应该调用 updateContainerClasslist", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await waitForRender();

      const containerEl =
        notification.shadowRoot.querySelector(".ea-notification");
      expect(containerEl.classList.contains("ea-notification")).toBe(true);
      expect(containerEl.classList.contains("ea-notification--info")).toBe(
        true
      );
      expect(containerEl.classList.contains("ea-notification--top-right")).toBe(
        true
      );
    });
  });

  describe("Accessibility", () => {
    it("默认状态应该无 a11y 违规", async () => {
      const el = document.createElement("ea-notification");
      container.appendChild(el);
      await waitForRender();
      const results = await runAxe(el, {
        rules: { "aria-prohibited-attr": { enabled: false } },
      });
      assertNoA11yViolations(results);
    });

    describe("ARIA Attributes", () => {
      it("容器应该有 role='alert'", async () => {
        const el = document.createElement("ea-notification");
        container.appendChild(el);
        await waitForRender();
        const containerEl = el.shadowRoot.querySelector('[part="container"]');
        expect(containerEl.getAttribute("role")).toBe("alert");
      });

      it("容器应该有 aria-live='polite'", async () => {
        const el = document.createElement("ea-notification");
        container.appendChild(el);
        await waitForRender();
        const containerEl = el.shadowRoot.querySelector('[part="container"]');
        expect(containerEl.getAttribute("aria-live")).toBe("polite");
      });

      it("关闭图标应该有 aria-label='close'", async () => {
        const el = document.createElement("ea-notification");
        container.appendChild(el);
        await waitForRender();
        const closeIcon = el.shadowRoot.querySelector('[part="close-icon"]');
        expect(closeIcon.getAttribute("aria-label")).toBe("close");
      });
    });
  });
});
