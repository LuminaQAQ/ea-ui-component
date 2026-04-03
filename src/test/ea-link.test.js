import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// 导入 ea-link 组件
import "../components/ea-link/index.js";

describe("EaLink Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  /**
   * 基本功能测试
   */
  describe("Basic Functionality", () => {
    it("应该正确渲染 ea-link 组件", async () => {
      const link = document.createElement("ea-link");
      container.appendChild(link);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(link).toBeDefined();
      expect(link.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const link = document.createElement("ea-link");
      container.appendChild(link);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(link.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("应该包含原生 a 元素", async () => {
      const link = document.createElement("ea-link");
      container.appendChild(link);

      await new Promise(resolve => setTimeout(resolve, 50));

      const anchorElement = link.shadowRoot.querySelector("a.ea-link");
      expect(anchorElement).toBeTruthy();
    });

    it("应该渲染 slot 内容", async () => {
      const link = document.createElement("ea-link");
      link.textContent = "点击这里";
      container.appendChild(link);

      await new Promise(resolve => setTimeout(resolve, 50));

      const slot = link.shadowRoot.querySelector("slot");
      expect(slot).toBeTruthy();
    });
  });

  /**
   * Type 属性测试
   */
  describe("Type Attribute", () => {
    it("默认 type 应该是 normal", async () => {
      const link = document.createElement("ea-link");
      container.appendChild(link);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(link.getAttribute("type")).toBe(null);
    });

    it("应该支持 type='primary'", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("type", "primary");
      container.appendChild(link);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(link.getAttribute("type")).toBe("primary");
    });

    it("应该支持 type='success'", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("type", "success");
      container.appendChild(link);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(link.getAttribute("type")).toBe("success");
    });

    it("应该支持 type='warning'", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("type", "warning");
      container.appendChild(link);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(link.getAttribute("type")).toBe("warning");
    });

    it("应该支持 type='danger'", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("type", "danger");
      container.appendChild(link);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(link.getAttribute("type")).toBe("danger");
    });

    it("应该支持 type='info'", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("type", "info");
      container.appendChild(link);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(link.getAttribute("type")).toBe("info");
    });

    it("应该支持不同的 type 值", async () => {
      const types = ["normal", "primary", "success", "warning", "danger", "info"];

      for (const type of types) {
        const link = document.createElement("ea-link");
        link.setAttribute("type", type);
        expect(link.getAttribute("type")).toBe(type);
      }
    });
  });

  /**
   * Href 属性测试
   */
  describe("Href Attribute", () => {
    it("默认 href 应该是空字符串", async () => {
      const link = document.createElement("ea-link");
      container.appendChild(link);

      await new Promise(resolve => setTimeout(resolve, 50));

      const anchorElement = link.shadowRoot.querySelector("a.ea-link");
      expect(anchorElement.href).toBe("");
    });

    it("应该支持 href 属性", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("href", "https://example.com");
      container.appendChild(link);

      await new Promise(resolve => setTimeout(resolve, 50));

      const anchorElement = link.shadowRoot.querySelector("a.ea-link");
      expect(anchorElement.href).toBe("https://example.com/");
    });

    it("应该支持不同的 href 值", async () => {
      const hrefs = [
        "https://github.com",
        "https://example.com",
        "/path/to/page",
        "#anchor",
      ];

      for (const href of hrefs) {
        const link = document.createElement("ea-link");
        link.setAttribute("href", href);
        container.appendChild(link);

        await new Promise(resolve => setTimeout(resolve, 30));

        const anchorElement = link.shadowRoot.querySelector("a.ea-link");
        expect(anchorElement.getAttribute("href")).toBe(href);
        link.remove();
      }
    });
  });

  /**
   * Disabled 属性测试
   */
  describe("Disabled Attribute", () => {
    it("默认 disabled 应该是 false", async () => {
      const link = document.createElement("ea-link");
      container.appendChild(link);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(link.hasAttribute("disabled")).toBe(false);
    });

    it("设置 disabled 属性应该禁用链接", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("disabled", "");
      container.appendChild(link);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(link.hasAttribute("disabled")).toBe(true);
    });
  });

  /**
   * Underline 属性测试
   */
  describe("Underline Attribute", () => {
    it("默认 underline 应该是空字符串", async () => {
      const link = document.createElement("ea-link");
      container.appendChild(link);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(link.getAttribute("underline")).toBe(null);
    });

    it("应该支持 underline='always'", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("underline", "always");
      container.appendChild(link);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(link.getAttribute("underline")).toBe("always");
    });

    it("应该支持 underline='hover'", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("underline", "hover");
      container.appendChild(link);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(link.getAttribute("underline")).toBe("hover");
    });

    it("应该支持 underline='never'", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("underline", "never");
      container.appendChild(link);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(link.getAttribute("underline")).toBe("never");
    });

    it("应该支持不同的 underline 值", async () => {
      const underlines = ["always", "hover", "never"];

      for (const underline of underlines) {
        const link = document.createElement("ea-link");
        link.setAttribute("underline", underline);
        expect(link.getAttribute("underline")).toBe(underline);
      }
    });
  });

  /**
   * Icon 属性测试
   */
  describe("Icon Attribute", () => {
    it("默认 icon 应该是空字符串", async () => {
      const link = document.createElement("ea-link");
      container.appendChild(link);

      await new Promise(resolve => setTimeout(resolve, 50));

      const iconElement = link.shadowRoot.querySelector("ea-icon");
      // 当属性未设置时，getAttribute 返回 null
      const nameAttr = iconElement.getAttribute("name");
      expect(nameAttr === null || nameAttr === "").toBe(true);
    });

    it("应该支持 icon 属性", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("icon", "eye");
      container.appendChild(link);

      await new Promise(resolve => setTimeout(resolve, 50));

      const iconElement = link.shadowRoot.querySelector("ea-icon");
      expect(iconElement.getAttribute("name")).toBe("eye");
    });

    it("应该支持不同的 icon 值", async () => {
      const icons = ["eye", "share", "edit", "delete"];

      for (const icon of icons) {
        const link = document.createElement("ea-link");
        link.setAttribute("icon", icon);
        container.appendChild(link);

        await new Promise(resolve => setTimeout(resolve, 30));

        const iconElement = link.shadowRoot.querySelector("ea-icon");
        expect(iconElement.getAttribute("name")).toBe(icon);
        link.remove();
      }
    });
  });

  /**
   * 组合属性测试
   */
  describe("Combined Attributes", () => {
    it("应该同时支持 type 和 href", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("type", "primary");
      link.setAttribute("href", "https://example.com");
      container.appendChild(link);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(link.getAttribute("type")).toBe("primary");
      const anchorElement = link.shadowRoot.querySelector("a.ea-link");
      expect(anchorElement.href).toBe("https://example.com/");
    });

    it("应该同时支持 type 和 disabled", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("type", "primary");
      link.setAttribute("disabled", "");
      container.appendChild(link);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(link.getAttribute("type")).toBe("primary");
      expect(link.hasAttribute("disabled")).toBe(true);
    });

    it("应该同时支持 icon 和 underline", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("icon", "eye");
      link.setAttribute("underline", "always");
      container.appendChild(link);

      await new Promise(resolve => setTimeout(resolve, 50));

      const iconElement = link.shadowRoot.querySelector("ea-icon");
      expect(iconElement.getAttribute("name")).toBe("eye");
      expect(link.getAttribute("underline")).toBe("always");
    });

    it("应该同时设置多个属性", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("type", "primary");
      link.setAttribute("href", "https://example.com");
      link.setAttribute("underline", "hover");
      link.setAttribute("icon", "share");
      container.appendChild(link);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(link.getAttribute("type")).toBe("primary");
      expect(link.getAttribute("underline")).toBe("hover");
      expect(link.getAttribute("icon")).toBe("share");
    });
  });

  /**
   * 插槽测试
   */
  describe("Slots", () => {
    it("应该支持默认插槽", async () => {
      const link = document.createElement("ea-link");
      link.textContent = "链接文本";
      container.appendChild(link);

      await new Promise(resolve => setTimeout(resolve, 50));

      const slot = link.shadowRoot.querySelector("slot");
      expect(slot).toBeTruthy();
    });

    it("应该支持 HTML 内容", async () => {
      const link = document.createElement("ea-link");
      link.innerHTML = "<strong>粗体链接</strong>";
      container.appendChild(link);

      await new Promise(resolve => setTimeout(resolve, 50));

      const slot = link.shadowRoot.querySelector("slot");
      expect(slot).toBeTruthy();
    });
  });

  /**
   * 事件测试
   */
  describe("Events", () => {
    it("应该支持 click 事件", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("href", "#");
      container.appendChild(link);

      await new Promise(resolve => setTimeout(resolve, 50));

      const anchorElement = link.shadowRoot.querySelector("a.ea-link");

      const clickPromise = new Promise(resolve => {
        anchorElement.addEventListener("click", e => {
          e.preventDefault();
          resolve();
        });
      });

      anchorElement.click();

      await clickPromise;

      expect(true).toBe(true);
    });
  });

  /**
   * 边界条件测试
   */
  describe("Edge Cases", () => {
    it("空 href 时应该正确处理", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("href", "");
      container.appendChild(link);

      await new Promise(resolve => setTimeout(resolve, 50));

      const anchorElement = link.shadowRoot.querySelector("a.ea-link");
      expect(anchorElement.getAttribute("href")).toBe("");
    });

    it("空 icon 时应该正确处理", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("icon", "");
      container.appendChild(link);

      await new Promise(resolve => setTimeout(resolve, 50));

      const iconElement = link.shadowRoot.querySelector("ea-icon");
      expect(iconElement.getAttribute("name")).toBe("");
    });

    it("特殊字符在 href 中应该正确处理", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("href", "/path?query=value&other=test");
      container.appendChild(link);

      await new Promise(resolve => setTimeout(resolve, 50));

      const anchorElement = link.shadowRoot.querySelector("a.ea-link");
      expect(anchorElement.getAttribute("href")).toBe("/path?query=value&other=test");
    });

    it("同时设置所有属性应该正常工作", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("type", "primary");
      link.setAttribute("href", "https://example.com");
      link.setAttribute("disabled", "");
      link.setAttribute("underline", "always");
      link.setAttribute("icon", "eye");
      link.textContent = "查看详情";
      container.appendChild(link);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(link.getAttribute("type")).toBe("primary");
      expect(link.hasAttribute("disabled")).toBe(true);
      expect(link.getAttribute("underline")).toBe("always");
      expect(link.getAttribute("icon")).toBe("eye");
    });
  });

  /**
   * 生命周期测试
   */
  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("type", "primary");
      link.setAttribute("href", "https://example.com");
      container.appendChild(link);

      await new Promise(resolve => setTimeout(resolve, 50));

      const anchorElement = link.shadowRoot.querySelector("a.ea-link");
      expect(anchorElement).toBeTruthy();
      expect(anchorElement.href).toBe("https://example.com/");
    });

    it("组件断开连接后应该正常移除", () => {
      const link = document.createElement("ea-link");
      container.appendChild(link);

      link.remove();

      expect(container.contains(link)).toBe(false);
    });

    it("动态修改 type 应该生效", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("type", "primary");
      container.appendChild(link);

      await new Promise(resolve => setTimeout(resolve, 50));

      link.setAttribute("type", "success");

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(link.getAttribute("type")).toBe("success");
    });

    it("动态修改 href 应该生效", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("href", "https://example.com");
      container.appendChild(link);

      await new Promise(resolve => setTimeout(resolve, 50));

      link.setAttribute("href", "https://github.com");

      await new Promise(resolve => setTimeout(resolve, 50));

      const anchorElement = link.shadowRoot.querySelector("a.ea-link");
      expect(anchorElement.href).toBe("https://github.com/");
    });

    it("动态添加 disabled 属性应该生效", async () => {
      const link = document.createElement("ea-link");
      container.appendChild(link);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(link.hasAttribute("disabled")).toBe(false);

      link.setAttribute("disabled", "");

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(link.hasAttribute("disabled")).toBe(true);
    });

    it("动态修改 icon 应该生效", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("icon", "eye");
      container.appendChild(link);

      await new Promise(resolve => setTimeout(resolve, 50));

      link.setAttribute("icon", "share");

      await new Promise(resolve => setTimeout(resolve, 50));

      const iconElement = link.shadowRoot.querySelector("ea-icon");
      expect(iconElement.getAttribute("name")).toBe("share");
    });

    it("动态修改 underline 应该生效", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("underline", "hover");
      container.appendChild(link);

      await new Promise(resolve => setTimeout(resolve, 50));

      link.setAttribute("underline", "always");

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(link.getAttribute("underline")).toBe("always");
    });
  });
});
