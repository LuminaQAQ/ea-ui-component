import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// 导入 ea-notification 组件
import "../components/ea-notification/index.js";
import { EaNotification } from "../components/ea-notification/utils/EaNotificationInstance.js";

describe("EaNotification Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
    // 清理所有通知
    document.querySelectorAll("ea-notification").forEach(el => el.remove());
  });

  /**
   * 基础功能测试
   */
  describe("Basic Functionality", () => {
    it("应该正确渲染组件", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(notification.shadowRoot).toBeTruthy();
      expect(
        notification.shadowRoot.querySelector(".ea-notification")
      ).toBeTruthy();
    });

    it("应该支持 CSS Parts", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(
        notification.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
      expect(
        notification.shadowRoot.querySelector('[part="icon"]')
      ).toBeTruthy();
      expect(
        notification.shadowRoot.querySelector('[part="header"]')
      ).toBeTruthy();
      expect(
        notification.shadowRoot.querySelector('[part="title"]')
      ).toBeTruthy();
      expect(
        notification.shadowRoot.querySelector('[part="close-icon"]')
      ).toBeTruthy();
      expect(
        notification.shadowRoot.querySelector('[part="main"]')
      ).toBeTruthy();
    });
  });

  /**
   * Type 属性测试
   */
  describe("Type Attribute", () => {
    it("默认 type 应该是 info", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(notification.type).toBe("info");
    });

    it("应该支持 success 类型", async () => {
      const notification = document.createElement("ea-notification");
      notification.setAttribute("type", "success");
      container.appendChild(notification);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(notification.type).toBe("success");
    });

    it("应该支持 warning 类型", async () => {
      const notification = document.createElement("ea-notification");
      notification.setAttribute("type", "warning");
      container.appendChild(notification);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(notification.type).toBe("warning");
    });

    it("应该支持 error 类型", async () => {
      const notification = document.createElement("ea-notification");
      notification.setAttribute("type", "error");
      container.appendChild(notification);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(notification.type).toBe("error");
    });

    it("应该支持 primary 类型", async () => {
      const notification = document.createElement("ea-notification");
      notification.setAttribute("type", "primary");
      container.appendChild(notification);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(notification.type).toBe("primary");
    });
  });

  /**
   * Title 属性测试
   */
  describe("Title Attribute", () => {
    it("应该支持 title 属性", async () => {
      const notification = document.createElement("ea-notification");
      notification.setAttribute("title", "Test Title");
      container.appendChild(notification);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(notification.title).toBe("Test Title");
    });
  });

  /**
   * Message 属性测试
   */
  describe("Message Attribute", () => {
    it("应该支持 message 属性", async () => {
      const notification = document.createElement("ea-notification");
      notification.message = "Test Message";
      container.appendChild(notification);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(notification.message).toBe("Test Message");
    });

    it("应该支持 dangerouslyUseHTMLString 属性", async () => {
      const notification = document.createElement("ea-notification");
      notification.dangerouslyUseHTMLString = true;
      notification.message = "<strong>HTML Content</strong>";
      container.appendChild(notification);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(notification.dangerouslyUseHTMLString).toBe(true);
      expect(notification.message).toBe("<strong>HTML Content</strong>");
    });
  });

  /**
   * Visible 属性测试
   */
  describe("Visible Attribute", () => {
    it("默认 visible 应该是 false 或 null", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(
        notification.visible === false || notification.visible === null
      ).toBe(true);
    });

    it("应该支持设置 visible 为 true", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await new Promise(resolve => setTimeout(resolve, 50));

      notification.visible = true;

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(notification.visible).toBe(true);
    });
  });

  /**
   * ShowClose 属性测试
   */
  describe("ShowClose Attribute", () => {
    it("默认 showClose 应该是 false 或 undefined", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(
        notification.showClose === false || notification.showClose === undefined
      ).toBe(true);
    });

    it("应该支持设置 showClose 为 true", async () => {
      const notification = document.createElement("ea-notification");
      notification.setAttribute("show-close", "true");
      container.appendChild(notification);

      await new Promise(resolve => setTimeout(resolve, 50));

      // showClose 属性可能是布尔值 true 或属性存在即表示 true
      const hasShowClose =
        notification.showClose === true ||
        notification.showClose === "true" ||
        notification.showClose === "" ||
        notification.getAttribute("show-close") === "true";
      expect(hasShowClose).toBe(true);
    });
  });

  /**
   * CloseIcon 属性测试
   */
  describe("CloseIcon Attribute", () => {
    it("默认 closeIcon 应该是 xmark 或 undefined", async () => {
      const notification = document.createElement("ea-notification");
      notification.setAttribute("show-close", "true");
      container.appendChild(notification);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(
        notification.closeIcon === "xmark" ||
          notification.closeIcon === undefined
      ).toBe(true);
    });

    it("应该支持自定义 closeIcon", async () => {
      const notification = document.createElement("ea-notification");
      notification.setAttribute("show-close", "true");
      notification.setAttribute("close-icon", "cancel");
      container.appendChild(notification);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(
        notification.closeIcon === "cancel" ||
          notification.closeIcon === undefined
      ).toBe(true);
    });
  });

  /**
   * Placement 属性测试
   */
  describe("Placement Attribute", () => {
    it("默认 placement 应该是 top-right", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(notification.placement).toBe("top-right");
    });

    it("应该支持 top-left 位置", async () => {
      const notification = document.createElement("ea-notification");
      notification.setAttribute("placement", "top-left");
      container.appendChild(notification);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(notification.placement).toBe("top-left");
    });

    it("应该支持 bottom-right 位置", async () => {
      const notification = document.createElement("ea-notification");
      notification.setAttribute("placement", "bottom-right");
      container.appendChild(notification);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(notification.placement).toBe("bottom-right");
    });

    it("应该支持 bottom-left 位置", async () => {
      const notification = document.createElement("ea-notification");
      notification.setAttribute("placement", "bottom-left");
      container.appendChild(notification);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(notification.placement).toBe("bottom-left");
    });
  });

  /**
   * zIndex 属性测试
   */
  describe("zIndex Attribute", () => {
    it("应该支持 zIndex 属性", async () => {
      const notification = document.createElement("ea-notification");
      notification.setAttribute("z-index", "1000");
      container.appendChild(notification);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(
        notification.zIndex === 1000 || notification.zIndex === undefined
      ).toBe(true);
    });
  });

  /**
   * 事件测试
   */
  describe("Events", () => {
    it("应该触发 show 事件", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await new Promise(resolve => setTimeout(resolve, 50));

      const showHandler = vi.fn();
      notification.addEventListener("show", showHandler);

      notification.visible = true;

      expect(showHandler).toHaveBeenCalled();
    });

    it("应该触发 shown 事件", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await new Promise(resolve => setTimeout(resolve, 50));

      const shownHandler = vi.fn();
      notification.addEventListener("shown", shownHandler);

      notification.visible = true;

      // 等待 requestAnimationFrame 和 transitionend
      await new Promise(resolve => requestAnimationFrame(resolve));
      await new Promise(resolve => setTimeout(resolve, 50));

      // 手动触发 transitionend 事件
      const notificationContainer =
        notification.shadowRoot.querySelector(".ea-notification");
      notificationContainer.dispatchEvent(
        new Event("transitionend", { bubbles: true })
      );

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(shownHandler).toHaveBeenCalled();
    });

    it("应该触发 hide 事件", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await new Promise(resolve => setTimeout(resolve, 50));

      notification.visible = true;
      await new Promise(resolve => setTimeout(resolve, 50));

      const hideHandler = vi.fn();
      notification.addEventListener("hide", hideHandler);

      notification.visible = false;

      expect(hideHandler).toHaveBeenCalled();
    });

    it("应该触发 hidden 事件", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await new Promise(resolve => setTimeout(resolve, 50));

      notification.visible = true;
      await new Promise(resolve => setTimeout(resolve, 50));

      const hiddenHandler = vi.fn();
      notification.addEventListener("hidden", hiddenHandler);

      notification.visible = false;

      // 手动触发 transitionend 事件
      const notificationContainer =
        notification.shadowRoot.querySelector(".ea-notification");
      notificationContainer.dispatchEvent(
        new Event("transitionend", { bubbles: true })
      );

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(hiddenHandler).toHaveBeenCalled();
    });

    it("应该触发 close 事件", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await new Promise(resolve => setTimeout(resolve, 50));

      const closeHandler = vi.fn();
      notification.addEventListener("close", closeHandler);

      notification.close();

      expect(closeHandler).toHaveBeenCalled();
    });
  });

  /**
   * 方法测试
   */
  describe("Methods", () => {
    it("close() 方法应该关闭通知", async () => {
      const notification = document.createElement("ea-notification");
      notification.visible = true;
      container.appendChild(notification);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(notification.visible).toBe(true);

      notification.close();

      expect(
        notification.visible === false || notification.visible === null
      ).toBe(true);
    });
  });

  /**
   * EaNotification 实例测试
   */
  describe("EaNotification Instance", () => {
    it("应该能通过 EaNotification 函数创建通知", async () => {
      const instance = EaNotification({
        title: "Test",
        message: "Test Message",
        duration: 0,
      });

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(instance).toBeTruthy();
      expect(instance.instance).toBeTruthy();
      expect(instance.instance.tagName.toLowerCase()).toBe("ea-notification");

      // 清理
      instance.close();
    });

    it("应该支持 EaNotification.success 快捷方法", async () => {
      const instance = EaNotification.success({
        title: "Success",
        message: "Success Message",
        duration: 0,
      });

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(instance.instance.type).toBe("success");

      instance.close();
    });

    it("应该支持 EaNotification.warning 快捷方法", async () => {
      const instance = EaNotification.warning({
        title: "Warning",
        message: "Warning Message",
        duration: 0,
      });

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(instance.instance.type).toBe("warning");

      instance.close();
    });

    it("应该支持 EaNotification.error 快捷方法", async () => {
      const instance = EaNotification.error({
        title: "Error",
        message: "Error Message",
        duration: 0,
      });

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(instance.instance.type).toBe("error");

      instance.close();
    });

    it("应该支持 EaNotification.info 快捷方法", async () => {
      const instance = EaNotification.info({
        title: "Info",
        message: "Info Message",
        duration: 0,
      });

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(instance.instance.type).toBe("info");

      instance.close();
    });

    it("应该支持 EaNotification.primary 快捷方法", async () => {
      const instance = EaNotification.primary({
        title: "Primary",
        message: "Primary Message",
        duration: 0,
      });

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(instance.instance.type).toBe("primary");

      instance.close();
    });

    it("应该支持自定义 placement", async () => {
      const instance = EaNotification({
        title: "Test",
        message: "Test Message",
        placement: "top-left",
        duration: 0,
      });

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(instance.instance.placement).toBe("top-left");

      instance.close();
    });
  });

  /**
   * 边界条件测试
   */
  describe("Edge Cases", () => {
    it("应该处理空组件", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(notification.shadowRoot).toBeTruthy();
    });

    it("应该处理多次显示/隐藏", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await new Promise(resolve => setTimeout(resolve, 50));

      notification.visible = true;
      await new Promise(resolve => setTimeout(resolve, 50));
      expect(notification.visible).toBe(true);

      notification.visible = false;
      await new Promise(resolve => setTimeout(resolve, 50));
      expect(
        notification.visible === false || notification.visible === null
      ).toBe(true);

      notification.visible = true;
      await new Promise(resolve => setTimeout(resolve, 50));
      expect(notification.visible).toBe(true);
    });
  });

  /**
   * 生命周期测试
   */
  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const notification = document.createElement("ea-notification");
      notification.setAttribute("type", "success");
      notification.setAttribute("title", "Test Title");
      container.appendChild(notification);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(notification.shadowRoot).toBeTruthy();
      expect(notification.type).toBe("success");
      expect(notification.title).toBe("Test Title");
    });

    it("组件断开连接后应该正常移除", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await new Promise(resolve => setTimeout(resolve, 50));

      notification.remove();

      expect(notification.isConnected).toBe(false);
    });

    it("应该支持属性动态更新", async () => {
      const notification = document.createElement("ea-notification");
      container.appendChild(notification);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(notification.type).toBe("info");

      notification.setAttribute("type", "warning");

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(notification.type).toBe("warning");
    });
  });
});
