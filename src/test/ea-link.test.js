import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender.js";

import "../components/ea-link/index.ts";

describe("EaLink", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe("基础渲染", () => {
    it("应该正确渲染 ea-link 组件", async () => {
      const link = document.createElement("ea-link");
      container.appendChild(link);

      await waitForRender();

      expect(link).toBeDefined();
      expect(link.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const link = document.createElement("ea-link");
      container.appendChild(link);

      await waitForRender();

      expect(link.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("应该包含 icon CSS Part", async () => {
      const link = document.createElement("ea-link");
      container.appendChild(link);

      await waitForRender();

      expect(link.shadowRoot.querySelector('[part="icon"]')).toBeTruthy();
    });

    it("应该包含原生 a 元素", async () => {
      const link = document.createElement("ea-link");
      container.appendChild(link);

      await waitForRender();

      const anchorElement = link.shadowRoot.querySelector("a.ea-link");
      expect(anchorElement).toBeTruthy();
    });

    it("应该渲染 slot 内容", async () => {
      const link = document.createElement("ea-link");
      link.textContent = "点击这里";
      container.appendChild(link);

      await waitForRender();

      const slot = link.shadowRoot.querySelector("slot");
      expect(slot).toBeTruthy();
    });
  });

  describe("variant 属性", () => {
    it("默认 variant 应该是 normal", async () => {
      const link = document.createElement("ea-link");
      container.appendChild(link);

      await waitForRender();

      expect(link.variant).toBe("normal");
    });

    it("应该支持 variant='primary'", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("variant", "primary");
      container.appendChild(link);

      await waitForRender();

      expect(link.variant).toBe("primary");
    });

    it("应该支持 variant='success'", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("variant", "success");
      container.appendChild(link);

      await waitForRender();

      expect(link.variant).toBe("success");
    });

    it("应该支持 variant='warning'", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("variant", "warning");
      container.appendChild(link);

      await waitForRender();

      expect(link.variant).toBe("warning");
    });

    it("应该支持 variant='danger'", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("variant", "danger");
      container.appendChild(link);

      await waitForRender();

      expect(link.variant).toBe("danger");
    });

    it("应该支持 variant='info'", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("variant", "info");
      container.appendChild(link);

      await waitForRender();

      expect(link.variant).toBe("info");
    });

    it("variant 变化时应该正确更新类名", async () => {
      const link = document.createElement("ea-link");
      container.appendChild(link);

      await waitForRender();

      link.setAttribute("variant", "primary");
      await waitForRender();

      const anchorElement = link.shadowRoot.querySelector("a.ea-link");
      expect(anchorElement.classList.contains("ea-link--primary")).toBe(true);
    });
  });

  describe("href 属性", () => {
    it("默认 href 应该是空字符串", async () => {
      const link = document.createElement("ea-link");
      container.appendChild(link);

      await waitForRender();

      expect(link.href).toBe("");
    });

    it("应该支持 href 属性", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("href", "https://example.com");
      container.appendChild(link);

      await waitForRender();

      expect(link.href).toBe("https://example.com");
    });

    it("href 应该同步到 a 元素", async () => {
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

        await waitForRender(30);

        const anchorElement = link.shadowRoot.querySelector("a.ea-link");
        expect(anchorElement.getAttribute("href")).toBe(href);
        link.remove();
      }
    });

    it("href 变化时应该正确更新 a 元素", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("href", "https://old.com");
      container.appendChild(link);

      await waitForRender();

      const anchorElement = link.shadowRoot.querySelector("a.ea-link");
      expect(anchorElement.getAttribute("href")).toBe("https://old.com");

      link.setAttribute("href", "https://new.com");
      await waitForRender();

      expect(anchorElement.getAttribute("href")).toBe("https://new.com");
    });
  });

  describe("target 属性", () => {
    it("默认 target 应该是空字符串", async () => {
      const link = document.createElement("ea-link");
      container.appendChild(link);

      await waitForRender();

      expect(link.target).toBe("");
    });

    it("应该支持 target='_blank'", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("href", "https://example.com");
      link.setAttribute("target", "_blank");
      container.appendChild(link);

      await waitForRender();

      expect(link.target).toBe("_blank");
      const anchorElement = link.shadowRoot.querySelector("a.ea-link");
      expect(anchorElement.getAttribute("target")).toBe("_blank");
    });

    it("应该支持 target='_self'", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("href", "https://example.com");
      link.setAttribute("target", "_self");
      container.appendChild(link);

      await waitForRender();

      const anchorElement = link.shadowRoot.querySelector("a.ea-link");
      expect(anchorElement.getAttribute("target")).toBe("_self");
    });

    it("target 变化时应该正确更新 a 元素", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("href", "https://example.com");
      link.setAttribute("target", "_blank");
      container.appendChild(link);

      await waitForRender();

      const anchorElement = link.shadowRoot.querySelector("a.ea-link");
      expect(anchorElement.getAttribute("target")).toBe("_blank");

      link.setAttribute("target", "_self");
      await waitForRender();

      expect(anchorElement.getAttribute("target")).toBe("_self");
    });
  });

  describe("rel 属性", () => {
    it("默认 rel 应该是空字符串", async () => {
      const link = document.createElement("ea-link");
      container.appendChild(link);

      await waitForRender();

      expect(link.rel).toBe("");
    });

    it("应该支持 rel 属性", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("href", "https://example.com");
      link.setAttribute("rel", "noopener noreferrer");
      container.appendChild(link);

      await waitForRender();

      expect(link.rel).toBe("noopener noreferrer");
      const anchorElement = link.shadowRoot.querySelector("a.ea-link");
      expect(anchorElement.getAttribute("rel")).toBe("noopener noreferrer");
    });

    it("rel 变化时应该正确更新 a 元素", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("href", "https://example.com");
      link.setAttribute("rel", "noopener");
      container.appendChild(link);

      await waitForRender();

      const anchorElement = link.shadowRoot.querySelector("a.ea-link");
      expect(anchorElement.getAttribute("rel")).toBe("noopener");

      link.setAttribute("rel", "noopener noreferrer");
      await waitForRender();

      expect(anchorElement.getAttribute("rel")).toBe("noopener noreferrer");
    });
  });

  describe("download 属性", () => {
    it("默认 download 应该是空字符串", async () => {
      const link = document.createElement("ea-link");
      container.appendChild(link);

      await waitForRender();

      expect(link.download).toBe("");
    });

    it("应该支持 download 属性", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("href", "/files/document.pdf");
      link.setAttribute("download", "document.pdf");
      container.appendChild(link);

      await waitForRender();

      expect(link.download).toBe("document.pdf");
      const anchorElement = link.shadowRoot.querySelector("a.ea-link");
      expect(anchorElement.getAttribute("download")).toBe("document.pdf");
    });

    it("download 变化时应该正确更新 a 元素", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("href", "/files/document.pdf");
      link.setAttribute("download", "old.pdf");
      container.appendChild(link);

      await waitForRender();

      const anchorElement = link.shadowRoot.querySelector("a.ea-link");
      expect(anchorElement.getAttribute("download")).toBe("old.pdf");

      link.setAttribute("download", "new.pdf");
      await waitForRender();

      expect(anchorElement.getAttribute("download")).toBe("new.pdf");
    });
  });

  describe("disabled 属性", () => {
    it("默认 disabled 应该是 false", async () => {
      const link = document.createElement("ea-link");
      container.appendChild(link);

      await waitForRender();

      expect(link.disabled).toBe(false);
    });

    it("设置 disabled 属性应该禁用链接", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("disabled", "");
      container.appendChild(link);

      await waitForRender();

      expect(link.disabled).toBe(true);
    });

    it("disabled 时应该添加 is-disabled 状态类", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("disabled", "");
      container.appendChild(link);

      await waitForRender();

      const anchorElement = link.shadowRoot.querySelector("a.ea-link");
      expect(anchorElement.classList.contains("is-disabled")).toBe(true);
    });
  });

  describe("underline 属性", () => {
    it("默认 underline 应该是空字符串", async () => {
      const link = document.createElement("ea-link");
      container.appendChild(link);

      await waitForRender();

      expect(link.underline).toBe("");
    });

    it("应该支持 underline='always'", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("underline", "always");
      container.appendChild(link);

      await waitForRender();

      expect(link.underline).toBe("always");
    });

    it("应该支持 underline='hover'", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("underline", "hover");
      container.appendChild(link);

      await waitForRender();

      expect(link.underline).toBe("hover");
    });

    it("应该支持 underline='never'", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("underline", "never");
      container.appendChild(link);

      await waitForRender();

      expect(link.underline).toBe("never");
    });

    it("underline='always' 时应该添加 ea-link--underline-always 修饰符类", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("underline", "always");
      container.appendChild(link);

      await waitForRender();

      const anchorElement = link.shadowRoot.querySelector("a.ea-link");
      expect(anchorElement.classList.contains("ea-link--underline-always")).toBe(true);
    });

    it("underline='hover' 时应该添加 ea-link--underline-hover 修饰符类", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("underline", "hover");
      container.appendChild(link);

      await waitForRender();

      const anchorElement = link.shadowRoot.querySelector("a.ea-link");
      expect(anchorElement.classList.contains("ea-link--underline-hover")).toBe(true);
    });
  });

  describe("icon 属性", () => {
    it("默认 icon 应该是空字符串", async () => {
      const link = document.createElement("ea-link");
      container.appendChild(link);

      await waitForRender();

      expect(link.icon).toBe("");
    });

    it("应该支持 icon 属性", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("icon", "eye");
      container.appendChild(link);

      await waitForRender();

      const iconElement = link.shadowRoot.querySelector("ea-icon");
      expect(iconElement.getAttribute("name")).toBe("eye");
    });

    it("设置 icon 时应该添加 is-icon 状态类", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("icon", "eye");
      container.appendChild(link);

      await waitForRender();

      const anchorElement = link.shadowRoot.querySelector("a.ea-link");
      expect(anchorElement.classList.contains("is-icon")).toBe(true);
    });

    it("icon 变化时应该正确更新 ea-icon 元素", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("icon", "eye");
      container.appendChild(link);

      await waitForRender();

      const iconElement = link.shadowRoot.querySelector("ea-icon");
      expect(iconElement.getAttribute("name")).toBe("eye");

      link.setAttribute("icon", "share");
      await waitForRender();

      expect(iconElement.getAttribute("name")).toBe("share");
    });
  });

  describe("组合属性", () => {
    it("应该同时支持 variant 和 href", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("variant", "primary");
      link.setAttribute("href", "https://example.com");
      container.appendChild(link);

      await waitForRender();

      expect(link.variant).toBe("primary");
      expect(link.href).toBe("https://example.com");
    });

    it("应该同时支持 variant 和 disabled", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("variant", "primary");
      link.setAttribute("disabled", "");
      container.appendChild(link);

      await waitForRender();

      expect(link.variant).toBe("primary");
      expect(link.disabled).toBe(true);
    });

    it("应该同时支持 icon 和 underline", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("icon", "eye");
      link.setAttribute("underline", "always");
      container.appendChild(link);

      await waitForRender();

      const iconElement = link.shadowRoot.querySelector("ea-icon");
      expect(iconElement.getAttribute("name")).toBe("eye");
      expect(link.underline).toBe("always");
    });

    it("应该同时支持 href、target 和 rel", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("href", "https://example.com");
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
      container.appendChild(link);

      await waitForRender();

      const anchorElement = link.shadowRoot.querySelector("a.ea-link");
      expect(anchorElement.getAttribute("href")).toBe("https://example.com");
      expect(anchorElement.getAttribute("target")).toBe("_blank");
      expect(anchorElement.getAttribute("rel")).toBe("noopener noreferrer");
    });

    it("应该同时设置多个属性", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("variant", "primary");
      link.setAttribute("href", "https://example.com");
      link.setAttribute("underline", "hover");
      link.setAttribute("icon", "share");
      container.appendChild(link);

      await waitForRender();

      expect(link.variant).toBe("primary");
      expect(link.underline).toBe("hover");
      expect(link.icon).toBe("share");
    });
  });

  describe("插槽", () => {
    it("应该支持默认插槽", async () => {
      const link = document.createElement("ea-link");
      link.textContent = "链接文本";
      container.appendChild(link);

      await waitForRender();

      const slot = link.shadowRoot.querySelector("slot");
      expect(slot).toBeTruthy();
    });

    it("应该支持 HTML 内容", async () => {
      const link = document.createElement("ea-link");
      link.innerHTML = "<strong>粗体链接</strong>";
      container.appendChild(link);

      await waitForRender();

      const slot = link.shadowRoot.querySelector("slot");
      expect(slot).toBeTruthy();
    });
  });

  describe("事件", () => {
    it("应该支持 click 事件", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("href", "#");
      container.appendChild(link);

      await waitForRender();

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

  describe("边界条件", () => {
    it("空 href 时应该正确处理", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("href", "");
      container.appendChild(link);

      await waitForRender();

      const anchorElement = link.shadowRoot.querySelector("a.ea-link");
      expect(anchorElement.getAttribute("href")).toBe("");
    });

    it("空 icon 时应该正确处理", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("icon", "");
      container.appendChild(link);

      await waitForRender();

      const iconElement = link.shadowRoot.querySelector("ea-icon");
      expect(iconElement.getAttribute("name")).toBe("");
    });

    it("特殊字符在 href 中应该正确处理", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("href", "/path?query=value&other=test");
      container.appendChild(link);

      await waitForRender();

      const anchorElement = link.shadowRoot.querySelector("a.ea-link");
      expect(anchorElement.getAttribute("href")).toBe(
        "/path?query=value&other=test"
      );
    });

    it("同时设置所有属性应该正常工作", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("variant", "primary");
      link.setAttribute("href", "https://example.com");
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener");
      link.setAttribute("disabled", "");
      link.setAttribute("underline", "always");
      link.setAttribute("icon", "eye");
      link.textContent = "查看详情";
      container.appendChild(link);

      await waitForRender();

      expect(link.variant).toBe("primary");
      expect(link.disabled).toBe(true);
      expect(link.underline).toBe("always");
      expect(link.icon).toBe("eye");
      expect(link.target).toBe("_blank");
      expect(link.rel).toBe("noopener");
    });
  });

  describe("生命周期", () => {
    it("组件连接后应该正确初始化", async () => {
      const link = document.createElement("ea-link");
      link.setAttribute("variant", "primary");
      link.setAttribute("href", "https://example.com");
      container.appendChild(link);

      await waitForRender();

      const anchorElement = link.shadowRoot.querySelector("a.ea-link");
      expect(anchorElement).toBeTruthy();
      expect(link.href).toBe("https://example.com");
    });

    it("组件断开连接后应该正常移除", () => {
      const link = document.createElement("ea-link");
      container.appendChild(link);

      link.remove();

      expect(container.contains(link)).toBe(false);
    });
  });
});
