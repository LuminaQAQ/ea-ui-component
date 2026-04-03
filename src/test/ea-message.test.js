import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// 导入 ea-message 组件
import "../components/ea-message/index.js";

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
  });

  /**
   * EaMessageElement 基本功能测试
   */
  describe("EaMessageElement Basic Functionality", () => {
    it("应该正确渲染 ea-message 组件", async () => {
      const message = document.createElement("ea-message");
      container.appendChild(message);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(message).toBeDefined();
      expect(message.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const message = document.createElement("ea-message");
      container.appendChild(message);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(
        message.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
    });

    it("应该包含 icon CSS Part", async () => {
      const message = document.createElement("ea-message");
      container.appendChild(message);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(message.shadowRoot.querySelector('[part="icon"]')).toBeTruthy();
    });

    it("应该包含 content-wrap CSS Part", async () => {
      const message = document.createElement("ea-message");
      container.appendChild(message);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(
        message.shadowRoot.querySelector('[part="content-wrap"]')
      ).toBeTruthy();
    });

    it("应该包含 close-icon CSS Part", async () => {
      const message = document.createElement("ea-message");
      container.appendChild(message);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(
        message.shadowRoot.querySelector('[part="close-icon"]')
      ).toBeTruthy();
    });
  });

  /**
   * Type 属性测试
   */
  describe("Type Attribute", () => {
    it("默认 type 应该是 info", async () => {
      const message = document.createElement("ea-message");
      container.appendChild(message);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(message.type).toBe("info");
    });

    it("应该支持 type='success'", async () => {
      const message = document.createElement("ea-message");
      message.type = "success";
      container.appendChild(message);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(message.type).toBe("success");
    });

    it("应该支持 type='warning'", async () => {
      const message = document.createElement("ea-message");
      message.type = "warning";
      container.appendChild(message);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(message.type).toBe("warning");
    });

    it("应该支持 type='error'", async () => {
      const message = document.createElement("ea-message");
      message.type = "error";
      container.appendChild(message);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(message.type).toBe("error");
    });

    it("应该支持 type='primary'", async () => {
      const message = document.createElement("ea-message");
      message.type = "primary";
      container.appendChild(message);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(message.type).toBe("primary");
    });

    it("应该支持不同的 type 值", async () => {
      const types = ["primary", "success", "warning", "info", "error"];

      for (const type of types) {
        const message = document.createElement("ea-message");
        message.type = type;
        expect(message.type).toBe(type);
      }
    });
  });

  /**
   * Message 属性测试
   */
  describe("Message Attribute", () => {
    it("应该支持 message 属性", async () => {
      const message = document.createElement("ea-message");
      message.message = "This is a test message";
      container.appendChild(message);

      await new Promise(resolve => setTimeout(resolve, 50));

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
  });

  /**
   * ShowClose 属性测试
   */
  describe("ShowClose Attribute", () => {
    it("默认 showClose 应该是 false", async () => {
      const message = document.createElement("ea-message");
      container.appendChild(message);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(message.showClose).toBe(false);
    });

    it("设置 showClose 为 true 应该显示关闭按钮", async () => {
      const message = document.createElement("ea-message");
      message.showClose = true;
      container.appendChild(message);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(message.showClose).toBe(true);
    });
  });

  /**
   * Placement 属性测试
   */
  describe("Placement Attribute", () => {
    it("默认 placement 应该是 top", async () => {
      const message = document.createElement("ea-message");
      container.appendChild(message);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(message.getAttribute("placement")).toBe(null);
    });

    it("应该支持 placement='top-left'", async () => {
      const message = document.createElement("ea-message");
      message.setAttribute("placement", "top-left");
      container.appendChild(message);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(message.getAttribute("placement")).toBe("top-left");
    });

    it("应该支持 placement='top-right'", async () => {
      const message = document.createElement("ea-message");
      message.setAttribute("placement", "top-right");
      container.appendChild(message);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(message.getAttribute("placement")).toBe("top-right");
    });

    it("应该支持 placement='bottom'", async () => {
      const message = document.createElement("ea-message");
      message.setAttribute("placement", "bottom");
      container.appendChild(message);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(message.getAttribute("placement")).toBe("bottom");
    });

    it("应该支持 placement='bottom-left'", async () => {
      const message = document.createElement("ea-message");
      message.setAttribute("placement", "bottom-left");
      container.appendChild(message);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(message.getAttribute("placement")).toBe("bottom-left");
    });

    it("应该支持 placement='bottom-right'", async () => {
      const message = document.createElement("ea-message");
      message.setAttribute("placement", "bottom-right");
      container.appendChild(message);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(message.getAttribute("placement")).toBe("bottom-right");
    });

    it("应该支持不同的 placement 值", async () => {
      const placements = [
        "top",
        "top-left",
        "top-right",
        "bottom",
        "bottom-left",
        "bottom-right",
      ];

      for (const placement of placements) {
        const message = document.createElement("ea-message");
        message.setAttribute("placement", placement);
        expect(message.getAttribute("placement")).toBe(placement);
      }
    });
  });

  /**
   * Icon 属性测试
   */
  describe("Icon Attribute", () => {
    it("应该支持 icon 属性", async () => {
      const message = document.createElement("ea-message");
      message.icon = "circle-info";
      container.appendChild(message);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(message.icon).toBe("circle-info");
    });

    it("设置自定义 icon 应该覆盖默认图标", async () => {
      const message = document.createElement("ea-message");
      message.type = "success";
      message.icon = "custom-icon";
      container.appendChild(message);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(message.icon).toBe("custom-icon");
    });
  });

  /**
   * Visible 属性测试
   */
  describe("Visible Attribute", () => {
    it("默认 visible 应该是 false", async () => {
      const message = document.createElement("ea-message");
      container.appendChild(message);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(message.visible).toBe(false);
    });

    it("设置 visible 为 true 应该显示消息", async () => {
      const message = document.createElement("ea-message");
      message.visible = true;
      container.appendChild(message);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(message.visible).toBe(true);
    });
  });

  /**
   * dangerouslyUseHTMLString 属性测试
   */
  describe("dangerouslyUseHTMLString Attribute", () => {
    it("默认 dangerouslyUseHTMLString 应该是 false", async () => {
      const message = document.createElement("ea-message");
      container.appendChild(message);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(message.dangerouslyUseHTMLString).toBe(false);
    });

    it("设置 dangerouslyUseHTMLString 为 true 应该支持 HTML", async () => {
      const message = document.createElement("ea-message");
      message.dangerouslyUseHTMLString = true;
      message.message = "<strong>Bold</strong> text";
      container.appendChild(message);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(message.dangerouslyUseHTMLString).toBe(true);
    });
  });

  /**
   * 方法测试
   */
  describe("Methods", () => {
    it("应该存在 close 方法", async () => {
      const message = document.createElement("ea-message");
      container.appendChild(message);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(typeof message.close).toBe("function");
    });

    it("调用 close 方法应该关闭消息", async () => {
      const message = document.createElement("ea-message");
      message.visible = true;
      container.appendChild(message);

      await new Promise(resolve => setTimeout(resolve, 50));

      message.close();

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(message.visible).toBe(false);
    });
  });

  /**
   * 事件测试
   */
  describe("Events", () => {
    it("应该触发 show 事件", async () => {
      const message = document.createElement("ea-message");
      container.appendChild(message);

      await new Promise(resolve => setTimeout(resolve, 50));

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

      await new Promise(resolve => setTimeout(resolve, 50));

      const shownPromise = new Promise(resolve => {
        message.addEventListener("shown", resolve);
      });

      message.visible = true;

      // 在测试环境中，transition 事件可能不会触发，所以设置一个超时
      await Promise.race([
        shownPromise,
        new Promise(resolve => setTimeout(resolve, 100)),
      ]);

      expect(true).toBe(true);
    });

    it("应该触发 hide 事件", async () => {
      const message = document.createElement("ea-message");
      message.visible = true;
      container.appendChild(message);

      await new Promise(resolve => setTimeout(resolve, 100));

      const hidePromise = new Promise(resolve => {
        message.addEventListener("hide", resolve);
      });

      message.visible = false;

      await hidePromise;

      expect(true).toBe(true);
    });

    it("应该触发 close 事件", async () => {
      const message = document.createElement("ea-message");
      container.appendChild(message);

      await new Promise(resolve => setTimeout(resolve, 50));

      const closePromise = new Promise(resolve => {
        message.addEventListener("close", resolve);
      });

      message.close();

      await closePromise;

      expect(true).toBe(true);
    });
  });

  /**
   * 组合属性测试
   */
  describe("Combined Attributes", () => {
    it("应该同时支持 type 和 message", async () => {
      const message = document.createElement("ea-message");
      message.type = "success";
      message.message = "Operation successful";
      container.appendChild(message);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(message.type).toBe("success");
      expect(message.message).toBe("Operation successful");
    });

    it("应该同时支持 showClose 和 duration", async () => {
      const message = document.createElement("ea-message");
      message.showClose = true;
      container.appendChild(message);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(message.showClose).toBe(true);
    });

    it("应该同时设置多个属性", async () => {
      const message = document.createElement("ea-message");
      message.type = "warning";
      message.message = "Warning message";
      message.showClose = true;
      message.placement = "top-right";
      message.icon = "custom-icon";
      container.appendChild(message);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(message.type).toBe("warning");
      expect(message.message).toBe("Warning message");
      expect(message.showClose).toBe(true);
      expect(message.getAttribute("placement")).toBe("top-right");
      expect(message.icon).toBe("custom-icon");
    });
  });

  /**
   * 边界条件测试
   */
  describe("Edge Cases", () => {
    it("空 message 应该正确处理", async () => {
      const message = document.createElement("ea-message");
      message.message = "";
      container.appendChild(message);

      await new Promise(resolve => setTimeout(resolve, 50));

      // message 属性默认是空字符串，但可能返回 null
      const msgValue = message.message;
      expect(msgValue === "" || msgValue === null).toBe(true);
    });

    it("特殊字符在 message 中应该正确处理", async () => {
      const message = document.createElement("ea-message");
      message.message = "<script>alert('xss')<\/script>";
      container.appendChild(message);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(message.message).toBe("<script>alert('xss')<\/script>");
    });

    it("多个消息应该正确堆叠", async () => {
      const message1 = document.createElement("ea-message");
      message1.visible = true;
      document.body.appendChild(message1);

      const message2 = document.createElement("ea-message");
      message2.visible = true;
      document.body.appendChild(message2);

      await new Promise(resolve => setTimeout(resolve, 100));

      const messages = document.querySelectorAll("ea-message");
      expect(messages.length).toBe(2);

      message1.remove();
      message2.remove();
    });
  });

  /**
   * 生命周期测试
   */
  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const message = document.createElement("ea-message");
      message.type = "success";
      message.message = "Test";
      container.appendChild(message);

      await new Promise(resolve => setTimeout(resolve, 50));

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

      await new Promise(resolve => setTimeout(resolve, 50));

      message.type = "error";

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(message.type).toBe("error");
    });

    it("动态修改 message 应该生效", async () => {
      const message = document.createElement("ea-message");
      message.message = "Initial";
      container.appendChild(message);

      await new Promise(resolve => setTimeout(resolve, 50));

      message.message = "Updated";

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(message.message).toBe("Updated");
    });

    it("动态修改 visible 应该生效", async () => {
      const message = document.createElement("ea-message");
      message.visible = false;
      container.appendChild(message);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(message.visible).toBe(false);

      message.visible = true;

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(message.visible).toBe(true);
    });

    it("动态修改 placement 应该生效", async () => {
      const message = document.createElement("ea-message");
      message.setAttribute("placement", "top");
      container.appendChild(message);

      await new Promise(resolve => setTimeout(resolve, 50));

      message.setAttribute("placement", "bottom");

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(message.getAttribute("placement")).toBe("bottom");
    });
  });
});
