import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender";

import "../components/ea-button/index";

describe("EaButton Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe("Basic Functionality", () => {
    it("应该正确渲染 ea-button 组件", () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      expect(button).toBeDefined();
      expect(button.shadowRoot).toBeDefined();
    });

    it("应该包含 .ea-button 容器元素", () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      const buttonContainer = button.shadowRoot.querySelector(".ea-button");
      expect(buttonContainer).toBeDefined();
    });

    it("默认应该渲染为 button 标签", () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      const buttonContainer = button.shadowRoot.querySelector(".ea-button");
      expect(buttonContainer.tagName.toLowerCase()).toBe("button");
    });

    it("应该支持 slot 内容", () => {
      const button = document.createElement("ea-button");
      button.textContent = "Click Me";
      container.appendChild(button);

      const slot = button.shadowRoot.querySelector("slot");
      expect(slot).toBeDefined();
    });

    it("容器应该有 tabindex=-1", () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      const buttonContainer = button.shadowRoot.querySelector(".ea-button");
      expect(buttonContainer.getAttribute("tabindex")).toBe("-1");
    });

    it("应该包含 loading-icon 和 icon 元素", () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      const loadingIcon = button.shadowRoot.querySelector(
        ".ea-button__loading-icon"
      );
      const icon = button.shadowRoot.querySelector(".ea-button__icon");

      expect(loadingIcon).toBeDefined();
      expect(icon).toBeDefined();
    });

    it("loading-icon 应该有 name=spinner 和 spin 属性", () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      const loadingIcon = button.shadowRoot.querySelector(
        ".ea-button__loading-icon"
      );
      expect(loadingIcon.getAttribute("name")).toBe("spinner");
      expect(loadingIcon.hasAttribute("spin")).toBe(true);
    });
  });

  describe("Variant Attribute", () => {
    it("默认 variant 应该是 normal", async () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      await waitForRender();

      expect(button.variant).toBe("normal");
    });

    it("应该正确设置 variant 属性", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("variant", "primary");
      container.appendChild(button);

      await waitForRender();

      expect(button.variant).toBe("primary");
    });

    it("应该支持所有 variant 类型", async () => {
      const variants = [
        "normal",
        "primary",
        "success",
        "warning",
        "danger",
        "info",
      ];

      for (const variant of variants) {
        const button = document.createElement("ea-button");
        button.setAttribute("variant", variant);
        container.appendChild(button);

        await waitForRender();

        expect(button.variant).toBe(variant);
        container.removeChild(button);
      }
    });

    it("variant 属性变化时应该正确更新", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("variant", "normal");
      container.appendChild(button);

      await waitForRender();
      expect(button.variant).toBe("normal");

      button.setAttribute("variant", "primary");
      await waitForRender();

      expect(button.variant).toBe("primary");
    });

    it("variant 变化时应该正确更新容器 class", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("variant", "primary");
      container.appendChild(button);

      await waitForRender();

      const containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.classList.contains("ea-button--primary")).toBe(true);

      button.setAttribute("variant", "success");
      await waitForRender();

      expect(containerEl.classList.contains("ea-button--success")).toBe(true);
      expect(containerEl.classList.contains("ea-button--primary")).toBe(false);
    });

    it("variant=info 应该正确应用", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("variant", "info");
      container.appendChild(button);

      await waitForRender();

      const containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.classList.contains("ea-button--info")).toBe(true);
    });
  });

  describe("Size Attribute", () => {
    it("默认 size 应该是 medium", async () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      await waitForRender();

      expect(button.size).toBe("medium");
    });

    it("应该正确设置 size 属性", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("size", "large");
      container.appendChild(button);

      await waitForRender();

      expect(button.size).toBe("large");
    });

    it("应该支持所有 size 类型", async () => {
      const sizes = ["small", "medium", "large"];

      for (const size of sizes) {
        const button = document.createElement("ea-button");
        button.setAttribute("size", size);
        container.appendChild(button);

        await waitForRender();

        expect(button.size).toBe(size);
        container.removeChild(button);
      }
    });

    it("size 变化时应该正确更新容器 class", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("size", "small");
      container.appendChild(button);

      await waitForRender();

      const containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.classList.contains("ea-button--small")).toBe(true);

      button.setAttribute("size", "large");
      await waitForRender();

      expect(containerEl.classList.contains("ea-button--large")).toBe(true);
      expect(containerEl.classList.contains("ea-button--small")).toBe(false);
    });

    it("size 变化时应该更新 loading-icon 的 size 属性", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("loading", "");
      button.setAttribute("size", "small");
      container.appendChild(button);

      await waitForRender();

      const loadingIcon = button.shadowRoot.querySelector(
        ".ea-button__loading-icon"
      );
      expect(loadingIcon.getAttribute("size")).toBe("small");

      button.setAttribute("size", "large");
      await waitForRender();

      expect(loadingIcon.getAttribute("size")).toBe("large");
    });
  });

  describe("Disabled Attribute", () => {
    it("默认 disabled 应该是 false", async () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      await waitForRender();

      expect(button.disabled).toBe(false);
    });

    it("应该正确设置 disabled 属性", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("disabled", "");
      container.appendChild(button);

      await waitForRender();

      expect(button.disabled).toBe(true);
      expect(button.hasAttribute("disabled")).toBe(true);
    });

    it("disabled 变化时应该正确更新容器 class", async () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      await waitForRender();

      const containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.classList.contains("is-disabled")).toBe(false);

      button.setAttribute("disabled", "");
      await waitForRender();

      expect(containerEl.classList.contains("is-disabled")).toBe(true);
    });

    it("disabled 属性应该可以动态移除", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("disabled", "");
      container.appendChild(button);

      await waitForRender();
      expect(button.disabled).toBe(true);

      button.removeAttribute("disabled");
      await waitForRender();

      expect(button.disabled).toBe(false);
      expect(button.hasAttribute("disabled")).toBe(false);
    });
  });

  describe("Plain Attribute", () => {
    it("默认 plain 应该是 false", async () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      await waitForRender();

      expect(button.plain).toBe(false);
    });

    it("应该正确设置 plain 属性", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("plain", "");
      container.appendChild(button);

      await waitForRender();

      expect(button.plain).toBe(true);
    });

    it("plain 变化时应该正确更新容器 class", async () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      await waitForRender();

      const containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.classList.contains("ea-button--plain")).toBe(false);

      button.setAttribute("plain", "");
      await waitForRender();

      expect(containerEl.classList.contains("ea-button--plain")).toBe(true);
    });
  });

  describe("Round Attribute", () => {
    it("默认 round 应该是 false", async () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      await waitForRender();

      expect(button.round).toBe(false);
    });

    it("应该正确设置 round 属性", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("round", "");
      container.appendChild(button);

      await waitForRender();

      expect(button.round).toBe(true);
    });

    it("round 变化时应该正确更新容器 class", async () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      await waitForRender();

      const containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.classList.contains("ea-button--round")).toBe(false);

      button.setAttribute("round", "");
      await waitForRender();

      expect(containerEl.classList.contains("ea-button--round")).toBe(true);
    });
  });

  describe("Circle Attribute", () => {
    it("默认 circle 应该是 false", async () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      await waitForRender();

      expect(button.circle).toBe(false);
    });

    it("应该正确设置 circle 属性", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("circle", "");
      container.appendChild(button);

      await waitForRender();

      expect(button.circle).toBe(true);
    });

    it("circle 变化时应该正确更新容器 class", async () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      await waitForRender();

      const containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.classList.contains("ea-button--circle")).toBe(false);

      button.setAttribute("circle", "");
      await waitForRender();

      expect(containerEl.classList.contains("ea-button--circle")).toBe(true);
    });
  });

  describe("Text Attribute", () => {
    it("默认 text 应该是 false", async () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      await waitForRender();

      expect(button.text).toBe(false);
    });

    it("应该正确设置 text 属性", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("text", "");
      container.appendChild(button);

      await waitForRender();

      expect(button.text).toBe(true);
    });

    it("text 变化时应该正确更新容器 class", async () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      await waitForRender();

      const containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.classList.contains("ea-button--text")).toBe(false);

      button.setAttribute("text", "");
      await waitForRender();

      expect(containerEl.classList.contains("ea-button--text")).toBe(true);
    });
  });

  describe("Loading Attribute", () => {
    it("默认 loading 应该是 false", async () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      await waitForRender();

      expect(button.loading).toBe(false);
    });

    it("应该正确设置 loading 属性", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("loading", "");
      container.appendChild(button);

      await waitForRender();

      expect(button.loading).toBe(true);
    });

    it("loading 为 true 时应该添加 disabled 属性到组件", async () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      await waitForRender();

      button.setAttribute("loading", "");
      await waitForRender();

      expect(button.hasAttribute("disabled")).toBe(true);
    });

    it("loading 为 true 时应该添加 is-loading 状态 class", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("loading", "");
      container.appendChild(button);

      await waitForRender();

      const containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.classList.contains("is-loading")).toBe(true);
    });

    it("loading 为 true 时应该添加 is-disabled 状态 class", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("loading", "");
      container.appendChild(button);

      await waitForRender();

      const containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.classList.contains("is-disabled")).toBe(true);
    });

    it("loading 为 false 时 loading-icon 不应该显示（无 is-loading class）", async () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      await waitForRender();

      const containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.classList.contains("is-loading")).toBe(false);
    });

    it("loading 状态切换应该正确工作", async () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      await waitForRender();

      const containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.classList.contains("is-loading")).toBe(false);

      button.setAttribute("loading", "");
      await waitForRender();

      expect(containerEl.classList.contains("is-loading")).toBe(true);
      expect(button.hasAttribute("disabled")).toBe(true);

      button.removeAttribute("loading");
      await waitForRender();

      expect(containerEl.classList.contains("is-loading")).toBe(false);
      expect(button.hasAttribute("disabled")).toBe(false);
    });

    it("loading 变化时应该更新 loading-icon 的 size 属性", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("size", "large");
      container.appendChild(button);

      await waitForRender();

      button.setAttribute("loading", "");
      await waitForRender();

      const loadingIcon = button.shadowRoot.querySelector(
        ".ea-button__loading-icon"
      );
      expect(loadingIcon.getAttribute("size")).toBe("large");
    });
  });

  describe("Icon Attribute", () => {
    it("默认 icon 应该是空字符串", async () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      await waitForRender();

      expect(button.icon).toBe("");
    });

    it("应该正确设置 icon 属性", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("icon", "coffee");
      container.appendChild(button);

      await waitForRender();

      expect(button.icon).toBe("coffee");
    });

    it("设置 icon 后应该添加 is-icon 状态 class", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("icon", "coffee");
      container.appendChild(button);

      await waitForRender();

      const containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.classList.contains("is-icon")).toBe(true);
    });

    it("未设置 icon 时不应有 is-icon 状态 class", async () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      await waitForRender();

      const containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.classList.contains("is-icon")).toBe(false);
    });

    it("icon 变化时应该更新 icon 元素的 name 属性", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("icon", "coffee");
      container.appendChild(button);

      await waitForRender();

      const iconEl = button.shadowRoot.querySelector(".ea-button__icon");
      expect(iconEl.getAttribute("name")).toBe("coffee");

      button.setAttribute("icon", "search");
      await waitForRender();

      expect(iconEl.getAttribute("name")).toBe("search");
    });

    it("icon 变化时应该更新 icon 元素的 size 属性", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("icon", "coffee");
      button.setAttribute("size", "large");
      container.appendChild(button);

      await waitForRender();

      const iconEl = button.shadowRoot.querySelector(".ea-button__icon");
      expect(iconEl.getAttribute("size")).toBe("large");
    });

    it("移除 icon 后应该移除 is-icon 状态 class", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("icon", "coffee");
      container.appendChild(button);

      await waitForRender();

      const containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.classList.contains("is-icon")).toBe(true);

      button.removeAttribute("icon");
      await waitForRender();

      expect(containerEl.classList.contains("is-icon")).toBe(false);
    });
  });

  describe("Link and Href Attributes", () => {
    it("默认 link 应该是 false", async () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      await waitForRender();

      expect(button.link).toBe(false);
    });

    it("应该正确设置 link 属性", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("link", "");
      container.appendChild(button);

      await waitForRender();

      expect(button.link).toBe(true);
    });

    it("link 为 true 时应该渲染为 a 标签", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("link", "");
      container.appendChild(button);

      await waitForRender();

      const containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.tagName.toLowerCase()).toBe("a");
    });

    it("link 为 false 时应该渲染为 button 标签", async () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      await waitForRender();

      const containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.tagName.toLowerCase()).toBe("button");
    });

    it("link 为 true 时应该添加 ea-button--link 修饰符 class", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("link", "");
      container.appendChild(button);

      await waitForRender();

      const containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.classList.contains("ea-button--link")).toBe(true);
    });

    it("link 为 true 时应该添加 ea-button--text 修饰符 class", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("link", "");
      container.appendChild(button);

      await waitForRender();

      const containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.classList.contains("ea-button--text")).toBe(true);
    });

    it("应该正确设置 href 属性", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("link", "");
      button.setAttribute("href", "https://example.com");
      container.appendChild(button);

      await waitForRender();

      expect(button.href).toBe("https://example.com");
    });

    it("a 标签应该有正确的 href 属性", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("link", "");
      button.setAttribute("href", "https://example.com");
      container.appendChild(button);

      await waitForRender();

      const containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.getAttribute("href")).toBe("https://example.com");
    });

    it("href 变化时应该更新 a 标签的 href", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("link", "");
      button.setAttribute("href", "https://example.com");
      container.appendChild(button);

      await waitForRender();

      const containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.getAttribute("href")).toBe("https://example.com");

      button.setAttribute("href", "https://new.example.com");
      await waitForRender();

      expect(containerEl.getAttribute("href")).toBe("https://new.example.com");
    });

    it("link 从 false 变为 true 时应该重新渲染为 a 标签", async () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      await waitForRender();

      let containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.tagName.toLowerCase()).toBe("button");

      button.setAttribute("link", "");
      await waitForRender();

      containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.tagName.toLowerCase()).toBe("a");
    });

    it("link 为 true 时 button 标签不应有 type 属性", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("link", "");
      container.appendChild(button);

      await waitForRender();

      const containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.getAttribute("type")).toBeNull();
    });

    it("应该正确设置 target 属性", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("link", "");
      button.setAttribute("target", "_blank");
      container.appendChild(button);

      await waitForRender();

      expect(button.target).toBe("_blank");
      const containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.getAttribute("target")).toBe("_blank");
    });

    it("应该正确设置 rel 属性", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("link", "");
      button.setAttribute("rel", "noopener noreferrer");
      container.appendChild(button);

      await waitForRender();

      expect(button.rel).toBe("noopener noreferrer");
      const containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.getAttribute("rel")).toBe("noopener noreferrer");
    });

    it("应该正确设置 download 属性", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("link", "");
      button.setAttribute("download", "file.pdf");
      container.appendChild(button);

      await waitForRender();

      expect(button.download).toBe("file.pdf");
      const containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.getAttribute("download")).toBe("file.pdf");
    });

    it("target 变化时应该更新 a 标签的 target", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("link", "");
      container.appendChild(button);

      await waitForRender();

      button.setAttribute("target", "_blank");
      await waitForRender();

      const containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.getAttribute("target")).toBe("_blank");
    });

    it("非 link 模式下 target 不应设置到 button 元素", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("target", "_blank");
      container.appendChild(button);

      await waitForRender();

      const containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.getAttribute("target")).toBeNull();
    });
  });

  describe("Type Attribute", () => {
    it("默认 type 应该是 button", async () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      await waitForRender();

      expect(button.type).toBe("button");
    });

    it("应该正确设置 type 属性", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("type", "submit");
      container.appendChild(button);

      await waitForRender();

      expect(button.type).toBe("submit");
    });

    it("应该支持所有 type 类型", async () => {
      const types = ["button", "submit", "reset"];

      for (const t of types) {
        const button = document.createElement("ea-button");
        button.setAttribute("type", t);
        container.appendChild(button);

        await waitForRender();

        expect(button.type).toBe(t);
        container.removeChild(button);
      }
    });

    it("type 应该设置到内部 button 元素的 type 属性上", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("type", "submit");
      container.appendChild(button);

      await waitForRender();

      const containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.getAttribute("type")).toBe("submit");
    });

    it("type 变化时应该更新内部 button 元素的 type 属性", async () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      await waitForRender();

      const containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.getAttribute("type")).toBe("button");

      button.setAttribute("type", "reset");
      await waitForRender();

      expect(containerEl.getAttribute("type")).toBe("reset");
    });

    it("link 为 true 时不应设置 type 属性到 a 标签", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("link", "");
      button.setAttribute("type", "submit");
      container.appendChild(button);

      await waitForRender();

      const containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.tagName.toLowerCase()).toBe("a");
      expect(containerEl.getAttribute("type")).toBeNull();
    });
  });

  describe("BEM Class Names", () => {
    it("默认应该有 ea-button 和 ea-button--normal 和 ea-button--medium class", async () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      await waitForRender();

      const containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.classList.contains("ea-button")).toBe(true);
      expect(containerEl.classList.contains("ea-button--normal")).toBe(true);
      expect(containerEl.classList.contains("ea-button--medium")).toBe(true);
    });

    it("variant=primary 应该添加 ea-button--primary class", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("variant", "primary");
      container.appendChild(button);

      await waitForRender();

      const containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.classList.contains("ea-button--primary")).toBe(true);
    });

    it("size=small 应该添加 ea-button--small class", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("size", "small");
      container.appendChild(button);

      await waitForRender();

      const containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.classList.contains("ea-button--small")).toBe(true);
    });

    it("disabled 应该添加 is-disabled 状态 class", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("disabled", "");
      container.appendChild(button);

      await waitForRender();

      const containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.classList.contains("is-disabled")).toBe(true);
    });

    it("text 应该添加 ea-button--text class", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("text", "");
      container.appendChild(button);

      await waitForRender();

      const containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.classList.contains("ea-button--text")).toBe(true);
    });

    it("plain 应该添加 ea-button--plain class", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("plain", "");
      container.appendChild(button);

      await waitForRender();

      const containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.classList.contains("ea-button--plain")).toBe(true);
    });

    it("round 应该添加 ea-button--round class", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("round", "");
      container.appendChild(button);

      await waitForRender();

      const containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.classList.contains("ea-button--round")).toBe(true);
    });

    it("circle 应该添加 ea-button--circle class", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("circle", "");
      container.appendChild(button);

      await waitForRender();

      const containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.classList.contains("ea-button--circle")).toBe(true);
    });

    it("loading 应该添加 is-loading 状态 class", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("loading", "");
      container.appendChild(button);

      await waitForRender();

      const containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.classList.contains("is-loading")).toBe(true);
    });

    it("icon 设置后应该添加 is-icon 状态 class", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("icon", "coffee");
      container.appendChild(button);

      await waitForRender();

      const containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.classList.contains("is-icon")).toBe(true);
    });

    it("link 应该添加 ea-button--link 和 ea-button--text 修饰符 class", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("link", "");
      container.appendChild(button);

      await waitForRender();

      const containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.classList.contains("ea-button--link")).toBe(true);
      expect(containerEl.classList.contains("ea-button--text")).toBe(true);
    });
  });

  describe("CSS Parts", () => {
    it("应该正确设置 container part", () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      const containerEl = button.shadowRoot.querySelector('[part="container"]');
      expect(containerEl).toBeDefined();
    });

    it("应该正确设置 icon part", () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      const iconEl = button.shadowRoot.querySelector('[part="icon"]');
      expect(iconEl).toBeDefined();
    });

    it("应该正确设置 loading-icon part", () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      const loadingIconEl = button.shadowRoot.querySelector(
        '[part="loading-icon"]'
      );
      expect(loadingIconEl).toBeDefined();
    });
  });

  describe("Events", () => {
    it("应该触发 click 事件", async () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      const clickHandler = vi.fn();
      button.addEventListener("click", clickHandler);

      await waitForRender();

      button.click();

      expect(clickHandler).toHaveBeenCalled();
    });

    it("应该响应 Enter 键触发 click", async () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      await waitForRender();

      const clickHandler = vi.fn();
      button.addEventListener("click", clickHandler);

      const keypressEvent = new KeyboardEvent("keypress", {
        key: "Enter",
        bubbles: true,
        composed: true,
      });
      button.dispatchEvent(keypressEvent);

      expect(clickHandler).toHaveBeenCalled();
    });

    it("非 Enter 键不应触发 click", async () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      await waitForRender();

      const clickHandler = vi.fn();
      button.addEventListener("click", clickHandler);

      const keypressEvent = new KeyboardEvent("keypress", {
        key: "Space",
        bubbles: true,
        composed: true,
      });
      button.dispatchEvent(keypressEvent);

      expect(clickHandler).not.toHaveBeenCalled();
    });

    it("type=submit 点击时应该提交表单", async () => {
      const form = document.createElement("form");
      container.appendChild(form);

      const button = document.createElement("ea-button");
      button.setAttribute("type", "submit");
      button.textContent = "Submit";
      form.appendChild(button);

      await waitForRender();

      const submitHandler = vi.fn();
      form.addEventListener("submit", submitHandler);

      const innerButton = button.shadowRoot.querySelector(".ea-button");
      innerButton.click();

      expect(submitHandler).toHaveBeenCalled();
    });

    it("type=reset 点击时应该重置表单", async () => {
      const form = document.createElement("form");
      container.appendChild(form);

      const input = document.createElement("input");
      input.type = "text";
      input.value = "test";
      form.appendChild(input);

      const button = document.createElement("ea-button");
      button.setAttribute("type", "reset");
      button.textContent = "Reset";
      form.appendChild(button);

      await waitForRender();

      const resetSpy = vi.spyOn(form, "reset");
      const innerButton = button.shadowRoot.querySelector(".ea-button");
      innerButton.click();

      expect(resetSpy).toHaveBeenCalled();
    });

    it("type=submit 不在表单内时不应报错", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("type", "submit");
      container.appendChild(button);

      await waitForRender();

      expect(() => button.click()).not.toThrow();
    });

    it("type=reset 不在表单内时不应报错", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("type", "reset");
      container.appendChild(button);

      await waitForRender();

      expect(() => button.click()).not.toThrow();
    });
  });

  describe("Complex Scenarios", () => {
    it("应该支持多种属性组合", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("variant", "primary");
      button.setAttribute("size", "large");
      button.setAttribute("round", "");
      button.textContent = "Primary Button";
      container.appendChild(button);

      await waitForRender();

      expect(button.variant).toBe("primary");
      expect(button.size).toBe("large");
      expect(button.round).toBe(true);

      const containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.classList.contains("ea-button--primary")).toBe(true);
      expect(containerEl.classList.contains("ea-button--large")).toBe(true);
      expect(containerEl.classList.contains("ea-button--round")).toBe(true);
    });

    it("应该支持图标按钮", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("icon", "coffee");
      button.setAttribute("circle", "");
      button.setAttribute("variant", "primary");
      container.appendChild(button);

      await waitForRender();

      expect(button.icon).toBe("coffee");
      expect(button.circle).toBe(true);
      expect(button.variant).toBe("primary");

      const containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.classList.contains("is-icon")).toBe(true);
      expect(containerEl.classList.contains("ea-button--circle")).toBe(true);
      expect(containerEl.classList.contains("ea-button--primary")).toBe(true);
    });

    it("应该支持链接按钮", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("link", "");
      button.setAttribute("href", "https://example.com");
      button.setAttribute("variant", "primary");
      button.textContent = "Link Button";
      container.appendChild(button);

      await waitForRender();

      const containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.tagName.toLowerCase()).toBe("a");
      expect(containerEl.getAttribute("href")).toBe("https://example.com");
      expect(containerEl.classList.contains("ea-button--link")).toBe(true);
      expect(containerEl.classList.contains("ea-button--text")).toBe(true);
    });

    it("应该支持文字按钮", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("text", "");
      button.setAttribute("icon", "coffee");
      button.textContent = "Text Button";
      container.appendChild(button);

      await waitForRender();

      expect(button.text).toBe(true);
      expect(button.icon).toBe("coffee");

      const containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.classList.contains("ea-button--text")).toBe(true);
      expect(containerEl.classList.contains("is-icon")).toBe(true);
    });

    it("loading 状态切换应该正确工作", async () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      await waitForRender();

      const containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.classList.contains("is-loading")).toBe(false);

      button.setAttribute("loading", "");
      await waitForRender();

      expect(containerEl.classList.contains("is-loading")).toBe(true);
      expect(button.hasAttribute("disabled")).toBe(true);

      button.removeAttribute("loading");
      await waitForRender();

      expect(containerEl.classList.contains("is-loading")).toBe(false);
      expect(button.hasAttribute("disabled")).toBe(false);
    });

    it("disabled 和 loading 同时存在时应该正确处理", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("disabled", "");
      button.setAttribute("loading", "");
      container.appendChild(button);

      await waitForRender();

      const containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.classList.contains("is-disabled")).toBe(true);
      expect(containerEl.classList.contains("is-loading")).toBe(true);

      button.removeAttribute("loading");
      await waitForRender();

      expect(containerEl.classList.contains("is-disabled")).toBe(false);
      expect(containerEl.classList.contains("is-loading")).toBe(false);
      expect(button.hasAttribute("disabled")).toBe(false);
    });

    it("loading 移除时 disabled 会被一并移除（loading observer 无条件 toggle）", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("loading", "");
      container.appendChild(button);

      await waitForRender();

      expect(button.hasAttribute("disabled")).toBe(true);

      button.removeAttribute("loading");
      await waitForRender();

      expect(button.hasAttribute("disabled")).toBe(false);
    });

    it("应该支持 plain + variant 组合", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("variant", "primary");
      button.setAttribute("plain", "");
      container.appendChild(button);

      await waitForRender();

      const containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.classList.contains("ea-button--primary")).toBe(true);
      expect(containerEl.classList.contains("ea-button--plain")).toBe(true);
    });

    it("应该支持动态切换 variant", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("variant", "primary");
      container.appendChild(button);

      await waitForRender();

      const containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.classList.contains("ea-button--primary")).toBe(true);

      button.setAttribute("variant", "danger");
      await waitForRender();

      expect(containerEl.classList.contains("ea-button--danger")).toBe(true);
      expect(containerEl.classList.contains("ea-button--primary")).toBe(false);
    });

    it("应该支持动态切换 size", async () => {
      const button = document.createElement("ea-button");
      button.setAttribute("size", "small");
      container.appendChild(button);

      await waitForRender();

      const containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.classList.contains("ea-button--small")).toBe(true);

      button.setAttribute("size", "large");
      await waitForRender();

      expect(containerEl.classList.contains("ea-button--large")).toBe(true);
      expect(containerEl.classList.contains("ea-button--small")).toBe(false);
    });

    it("link 切换时应该正确重新渲染容器", async () => {
      const button = document.createElement("ea-button");
      container.appendChild(button);

      await waitForRender();

      let containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.tagName.toLowerCase()).toBe("button");

      button.setAttribute("link", "");
      button.setAttribute("href", "https://example.com");
      await waitForRender();

      containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.tagName.toLowerCase()).toBe("a");
      expect(containerEl.getAttribute("href")).toBe("https://example.com");

      button.removeAttribute("link");
      await waitForRender();

      containerEl = button.shadowRoot.querySelector(".ea-button");
      expect(containerEl.tagName.toLowerCase()).toBe("button");
    });

    it("所有 variant 和 size 组合应该正确应用 class", async () => {
      const variants = [
        "normal",
        "primary",
        "success",
        "warning",
        "danger",
        "info",
      ];
      const sizes = ["small", "medium", "large"];

      for (const variant of variants) {
        for (const size of sizes) {
          const button = document.createElement("ea-button");
          button.setAttribute("variant", variant);
          button.setAttribute("size", size);
          container.appendChild(button);

          await waitForRender();

          const containerEl = button.shadowRoot.querySelector(".ea-button");
          expect(containerEl.classList.contains(`ea-button--${variant}`)).toBe(
            true
          );
          expect(containerEl.classList.contains(`ea-button--${size}`)).toBe(
            true
          );

          container.removeChild(button);
        }
      }
    });
  });
});

describe("EaButtonGroup Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe("Basic Functionality", () => {
    it("应该正确渲染 ea-button-group 组件", () => {
      const group = document.createElement("ea-button-group");
      container.appendChild(group);

      expect(group).toBeDefined();
      expect(group.shadowRoot).toBeDefined();
    });

    it("应该包含 .ea-button-group 容器元素", () => {
      const group = document.createElement("ea-button-group");
      container.appendChild(group);

      const containerEl = group.shadowRoot.querySelector(".ea-button-group");
      expect(containerEl).toBeDefined();
    });

    it("应该支持 slot 内容", () => {
      const group = document.createElement("ea-button-group");
      const button = document.createElement("ea-button");
      button.textContent = "Button";
      group.appendChild(button);
      container.appendChild(group);

      const slot = group.shadowRoot.querySelector("slot");
      expect(slot).toBeDefined();
    });

    it("应该包含 container part", () => {
      const group = document.createElement("ea-button-group");
      container.appendChild(group);

      const containerEl = group.shadowRoot.querySelector('[part="container"]');
      expect(containerEl).toBeDefined();
    });
  });

  describe("Disabled Attribute", () => {
    it("默认 disabled 应该是 false", async () => {
      const group = document.createElement("ea-button-group");
      container.appendChild(group);

      await waitForRender();

      expect(group.disabled).toBe(false);
    });

    it("应该正确设置 disabled 属性", async () => {
      const group = document.createElement("ea-button-group");
      group.setAttribute("disabled", "");
      container.appendChild(group);

      await waitForRender();

      expect(group.disabled).toBe(true);
    });
  });

  describe("Size Attribute", () => {
    it("默认 size 应该是 medium", async () => {
      const group = document.createElement("ea-button-group");
      container.appendChild(group);

      await waitForRender();

      expect(group.size).toBe("medium");
    });

    it("应该正确设置 size 属性", async () => {
      const group = document.createElement("ea-button-group");
      group.setAttribute("size", "large");
      container.appendChild(group);

      await waitForRender();

      expect(group.size).toBe("large");
    });

    it("应该支持所有 size 类型", async () => {
      const sizes = ["small", "medium", "large"];

      for (const size of sizes) {
        const group = document.createElement("ea-button-group");
        group.setAttribute("size", size);
        container.appendChild(group);

        await waitForRender();

        expect(group.size).toBe(size);
        container.removeChild(group);
      }
    });

    it("size 变化时应该同步到子按钮", async () => {
      const group = document.createElement("ea-button-group");
      const btn1 = document.createElement("ea-button");
      btn1.textContent = "Button 1";
      const btn2 = document.createElement("ea-button");
      btn2.textContent = "Button 2";
      group.appendChild(btn1);
      group.appendChild(btn2);
      container.appendChild(group);

      await waitForRender();

      group.setAttribute("size", "large");
      await waitForRender();

      expect(btn1.getAttribute("size")).toBe("large");
      expect(btn2.getAttribute("size")).toBe("large");
    });
  });

  describe("Variant Attribute", () => {
    it("默认 variant 应该是 normal", async () => {
      const group = document.createElement("ea-button-group");
      container.appendChild(group);

      await waitForRender();

      expect(group.variant).toBe("normal");
    });

    it("应该正确设置 variant 属性", async () => {
      const group = document.createElement("ea-button-group");
      group.setAttribute("variant", "primary");
      container.appendChild(group);

      await waitForRender();

      expect(group.variant).toBe("primary");
    });

    it("应该支持所有 variant 类型", async () => {
      const variants = [
        "normal",
        "primary",
        "success",
        "warning",
        "danger",
        "info",
      ];

      for (const variant of variants) {
        const group = document.createElement("ea-button-group");
        group.setAttribute("variant", variant);
        container.appendChild(group);

        await waitForRender();

        expect(group.variant).toBe(variant);
        container.removeChild(group);
      }
    });

    it("variant 变化时应该同步到子按钮", async () => {
      const group = document.createElement("ea-button-group");
      const btn1 = document.createElement("ea-button");
      btn1.textContent = "Button 1";
      const btn2 = document.createElement("ea-button");
      btn2.textContent = "Button 2";
      group.appendChild(btn1);
      group.appendChild(btn2);
      container.appendChild(group);

      await waitForRender();

      group.setAttribute("variant", "primary");
      await waitForRender();

      expect(btn1.getAttribute("variant")).toBe("primary");
      expect(btn2.getAttribute("variant")).toBe("primary");
    });
  });

  describe("Complex Scenarios", () => {
    it("应该支持多个按钮组合", async () => {
      const group = document.createElement("ea-button-group");
      const btn1 = document.createElement("ea-button");
      btn1.textContent = "Button 1";
      const btn2 = document.createElement("ea-button");
      btn2.textContent = "Button 2";
      const btn3 = document.createElement("ea-button");
      btn3.textContent = "Button 3";
      group.appendChild(btn1);
      group.appendChild(btn2);
      group.appendChild(btn3);
      container.appendChild(group);

      await waitForRender();

      const buttons = group.querySelectorAll("ea-button");
      expect(buttons.length).toBe(3);
    });

    it("size 和 variant 同时设置应该正确同步", async () => {
      const group = document.createElement("ea-button-group");
      group.setAttribute("size", "small");
      group.setAttribute("variant", "danger");
      const btn = document.createElement("ea-button");
      btn.textContent = "Button";
      group.appendChild(btn);
      container.appendChild(group);

      await waitForRender();

      expect(btn.getAttribute("size")).toBe("small");
      expect(btn.getAttribute("variant")).toBe("danger");
    });
  });
});
