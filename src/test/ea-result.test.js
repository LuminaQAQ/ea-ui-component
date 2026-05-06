import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender";

if (typeof CSS === "undefined") {
  global.CSS = {
    supports: (prop, value) => {
      if (!value) return false;
      const testEl = document.createElement("div");
      testEl.style.setProperty(prop, value);
      return testEl.style.getPropertyValue(prop) === value;
    },
  };
} else if (!CSS.supports) {
  CSS.supports = (prop, value) => {
    if (!value) return false;
    const testEl = document.createElement("div");
    testEl.style.setProperty(prop, value);
    return testEl.style.getPropertyValue(prop) === value;
  };
}

// 确保 CustomElement 注册环境已就绪
if (!customElements.get("ea-icon")) {
  customElements.define("ea-icon", class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
      this.shadowRoot.innerHTML = `<slot></slot>`;
    }
  });
}

import "../components/ea-result/index.ts";

describe("EaResult Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  // ==================== 基础渲染测试 ====================

  describe("Basic Rendering", () => {
    it("应该正确创建 ea-result 元素", () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      expect(result).toBeDefined();
      expect(result.tagName.toLowerCase()).toBe("ea-result");
    });

    it("应该创建 shadow DOM", () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      expect(result.shadowRoot).toBeDefined();
      expect(result.shadowRoot.mode).toBe("open");
    });

    it("应该渲染容器元素并带有正确的 BEM 类名", async () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      await waitForRender();

      const containerEl = result.shadowRoot.querySelector(".ea-result");
      expect(containerEl).toBeDefined();
      expect(containerEl.tagName.toLowerCase()).toBe("div");
    });

    it("应该渲染 icon 包裹元素并带有正确的 BEM 类名", async () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      await waitForRender();

      const iconWrap = result.shadowRoot.querySelector(".ea-result__icon");
      expect(iconWrap).toBeDefined();
      expect(iconWrap.classList.contains("ea-result__icon-wrap")).toBe(true);
    });

    it("应该渲染默认图标元素", async () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      await waitForRender();

      const defaultIcon = result.shadowRoot.querySelector(
        ".ea-result__default-icon"
      );
      expect(defaultIcon).toBeDefined();
    });

    it("应该渲染标题元素", async () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      await waitForRender();

      const title = result.shadowRoot.querySelector(".ea-result__title");
      expect(title).toBeDefined();
    });

    it("应该渲染副标题元素", async () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      await waitForRender();

      const subTitle = result.shadowRoot.querySelector(".ea-result__sub-title");
      expect(subTitle).toBeDefined();
    });

    it("应该渲染额外内容元素", async () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      await waitForRender();

      const extra = result.shadowRoot.querySelector(".ea-result__extra");
      expect(extra).toBeDefined();
    });
  });

  // ==================== CSS Part 测试 ====================

  describe("CSS Parts", () => {
    it("应该暴露 container part", async () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      await waitForRender();

      const el = result.shadowRoot.querySelector('[part="container"]');
      expect(el).toBeDefined();
      expect(el.classList.contains("ea-result")).toBe(true);
    });

    it("应该暴露 icon-wrap part", async () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      await waitForRender();

      const el = result.shadowRoot.querySelector('[part="icon-wrap"]');
      expect(el).toBeDefined();
      expect(el.classList.contains("ea-result__icon-wrap")).toBe(true);
    });

    it("应该暴露 icon part", async () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      await waitForRender();

      const el = result.shadowRoot.querySelector('[part="icon"]');
      expect(el).toBeDefined();
      expect(el.classList.contains("ea-result__icon")).toBe(true);
    });

    it("应该暴露 title part", async () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      await waitForRender();

      const el = result.shadowRoot.querySelector('[part="title"]');
      expect(el).toBeDefined();
      expect(el.classList.contains("ea-result__title")).toBe(true);
    });

    it("应该暴露 sub-title part", async () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      await waitForRender();

      const el = result.shadowRoot.querySelector('[part="sub-title"]');
      expect(el).toBeDefined();
      expect(el.classList.contains("ea-result__sub-title")).toBe(true);
    });

    it("应该暴露 extra part", async () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      await waitForRender();

      const el = result.shadowRoot.querySelector('[part="extra"]');
      expect(el).toBeDefined();
      expect(el.classList.contains("ea-result__extra")).toBe(true);
    });
  });

  // ==================== DOM 结构测试 ====================

  describe("DOM Structure", () => {
    it("容器应该是所有部分的父级", async () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      await waitForRender();

      const containerEl = result.shadowRoot.querySelector(".ea-result");
      const iconWrap = containerEl.querySelector(".ea-result__icon-wrap");
      const title = containerEl.querySelector(".ea-result__title");
      const subTitle = containerEl.querySelector(".ea-result__sub-title");
      const extra = containerEl.querySelector(".ea-result__extra");

      expect(iconWrap).toBeDefined();
      expect(title).toBeDefined();
      expect(subTitle).toBeDefined();
      expect(extra).toBeDefined();
    });

    it("各部分应该按正确顺序排列", async () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      await waitForRender();

      const containerEl = result.shadowRoot.querySelector(".ea-result");
      const children = Array.from(containerEl.children);
      const iconIndex = children.findIndex((c) =>
        c.classList.contains("ea-result__icon-wrap")
      );
      const titleIndex = children.findIndex((c) =>
        c.classList.contains("ea-result__title")
      );
      const subTitleIndex = children.findIndex((c) =>
        c.classList.contains("ea-result__sub-title")
      );
      const extraIndex = children.findIndex((c) =>
        c.classList.contains("ea-result__extra")
      );

      expect(iconIndex).toBeLessThan(titleIndex);
      expect(titleIndex).toBeLessThan(subTitleIndex);
      expect(subTitleIndex).toBeLessThan(extraIndex);
    });

    it("容器应该恰好有四个直接子元素", async () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      await waitForRender();

      const containerEl = result.shadowRoot.querySelector(".ea-result");
      expect(containerEl.children.length).toBe(4);
    });

    it("icon 包裹内应包含 slot 和默认 ea-icon", async () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      await waitForRender();

      const iconWrap = result.shadowRoot.querySelector(".ea-result__icon-wrap");
      const iconSlot = iconWrap.querySelector('slot[name="icon"]');
      const defaultIcon = iconWrap.querySelector(".ea-result__default-icon");

      expect(iconSlot).toBeDefined();
      expect(defaultIcon).toBeDefined();
      expect(defaultIcon.tagName.toLowerCase()).toBe("ea-icon");
    });

    it("标题区域应包含 slot", async () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      await waitForRender();

      const titleSlot = result.shadowRoot.querySelector(
        '.ea-result__title slot[name="title"]'
      );
      expect(titleSlot).toBeDefined();
    });

    it("副标题区域应包含 slot", async () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      await waitForRender();

      const subTitleSlot = result.shadowRoot.querySelector(
        '.ea-result__sub-title slot[name="sub-title"]'
      );
      expect(subTitleSlot).toBeDefined();
    });

    it("额外内容区域应包含 slot", async () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      await waitForRender();

      const extraSlot = result.shadowRoot.querySelector(
        '.ea-result__extra slot[name="extra"]'
      );
      expect(extraSlot).toBeDefined();
    });
  });

  // ==================== 插槽测试 ====================

  describe("Slots", () => {
    it("应该包含 icon 命名插槽", () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      const iconSlot = result.shadowRoot.querySelector(
        '.ea-result__icon-wrap slot[name="icon"]'
      );
      expect(iconSlot).toBeDefined();
    });

    it("icon 插槽应有默认 ea-icon 作为 fallback", () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      const iconSlot = result.shadowRoot.querySelector(
        '.ea-result__icon-wrap slot[name="icon"]'
      );
      const defaultIcon = iconSlot.querySelector(".ea-result__default-icon");
      expect(defaultIcon).toBeDefined();
      expect(defaultIcon.tagName.toLowerCase()).toBe("ea-icon");
    });

    it("应该包含 title 命名插槽", () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      const titleSlot = result.shadowRoot.querySelector(
        '.ea-result__title slot[name="title"]'
      );
      expect(titleSlot).toBeDefined();
    });

    it("应该包含 sub-title 命名插槽", () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      const subTitleSlot = result.shadowRoot.querySelector(
        '.ea-result__sub-title slot[name="sub-title"]'
      );
      expect(subTitleSlot).toBeDefined();
    });

    it("应该包含 extra 命名插槽", () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      const extraSlot = result.shadowRoot.querySelector(
        '.ea-result__extra slot[name="extra"]'
      );
      expect(extraSlot).toBeDefined();
    });

    it("extra slot 应该支持默认插槽行为（无 name）", () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      const extraSlot = result.shadowRoot.querySelector(
        '.ea-result__extra slot[name="extra"]'
      );
      expect(extraSlot).toBeDefined();
    });

    it("应该支持通过 icon slot 自定义图标内容", () => {
      const result = document.createElement("ea-result");
      result.innerHTML = `<div slot="icon">Custom Icon</div>`;
      container.appendChild(result);

      const iconSlot = result.shadowRoot.querySelector(
        '.ea-result__icon-wrap slot[name="icon"]'
      );
      expect(iconSlot).toBeDefined();
    });

    it("应该支持通过 title slot 自定义标题内容", () => {
      const result = document.createElement("ea-result");
      result.innerHTML = `<span slot="title">Custom Title</span>`;
      container.appendChild(result);

      const titleSlot = result.shadowRoot.querySelector(
        '.ea-result__title slot[name="title"]'
      );
      expect(titleSlot).toBeDefined();
    });

    it("应该支持通过 sub-title slot 自定义副标题内容", () => {
      const result = document.createElement("ea-result");
      result.innerHTML = `<span slot="sub-title">Custom Subtitle</span>`;
      container.appendChild(result);

      const subTitleSlot = result.shadowRoot.querySelector(
        '.ea-result__sub-title slot[name="sub-title"]'
      );
      expect(subTitleSlot).toBeDefined();
    });

    it("应该支持通过 extra slot 自定义额外内容", () => {
      const result = document.createElement("ea-result");
      result.innerHTML = `<div slot="extra"><button>Action</button></div>`;
      container.appendChild(result);

      const extraSlot = result.shadowRoot.querySelector(
        '.ea-result__extra slot[name="extra"]'
      );
      expect(extraSlot).toBeDefined();
    });

    it("extra slot 应该能渲染多个元素", () => {
      const result = document.createElement("ea-result");
      result.innerHTML = `
        <div slot="extra">
          <button id="back-btn">Back</button>
          <button id="retry-btn">Retry</button>
        </div>
      `;
      container.appendChild(result);

      expect(result.querySelector("#back-btn")).toBeTruthy();
      expect(result.querySelector("#retry-btn")).toBeTruthy();
    });

    it("应该同时支持四个插槽", () => {
      const result = document.createElement("ea-result");
      result.innerHTML = `
        <div slot="icon">Icon</div>
        <div slot="title">Title</div>
        <div slot="sub-title">Subtitle</div>
        <div slot="extra">Extra</div>
      `;
      container.appendChild(result);

      const iconSlot = result.shadowRoot.querySelector(
        'slot[name="icon"]'
      );
      const titleSlot = result.shadowRoot.querySelector(
        'slot[name="title"]'
      );
      const subTitleSlot = result.shadowRoot.querySelector(
        'slot[name="sub-title"]'
      );
      const extraSlot = result.shadowRoot.querySelector(
        'slot[name="extra"]'
      );

      expect(iconSlot).toBeDefined();
      expect(titleSlot).toBeDefined();
      expect(subTitleSlot).toBeDefined();
      expect(extraSlot).toBeDefined();
    });
  });

  // ==================== Heading 属性测试 ====================

  describe("Heading Attribute", () => {
    it("默认 heading 应该为空字符串", async () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      await waitForRender();

      expect(result.heading).toBe("");
    });

    it("默认 title slot 内容应为空", async () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      await waitForRender();

      const titleSlot = result.shadowRoot.querySelector(
        '.ea-result__title slot[name="title"]'
      );
      expect(titleSlot.textContent).toBe("");
    });

    it("应该通过 HTML attribute 设置 heading", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("heading", "操作成功");
      container.appendChild(result);

      await waitForRender();

      expect(result.heading).toBe("操作成功");
    });

    it("heading 应该更新 title slot 的 textContent", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("heading", "操作成功");
      container.appendChild(result);

      await waitForRender();

      const titleSlot = result.shadowRoot.querySelector(
        '.ea-result__title slot[name="title"]'
      );
      expect(titleSlot.textContent).toBe("操作成功");
    });

    it("应该支持通过 JS property 设置 heading", async () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      await waitForRender();

      result.heading = "JS Property Heading";
      await waitForRender();

      expect(result.heading).toBe("JS Property Heading");
      const titleSlot = result.shadowRoot.querySelector(
        '.ea-result__title slot[name="title"]'
      );
      expect(titleSlot.textContent).toBe("JS Property Heading");
    });

    it("应该支持动态修改 heading", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("heading", "初始标题");
      container.appendChild(result);

      await waitForRender();

      let titleSlot = result.shadowRoot.querySelector(
        '.ea-result__title slot[name="title"]'
      );
      expect(titleSlot.textContent).toBe("初始标题");

      result.setAttribute("heading", "更新后的标题");
      await waitForRender();

      titleSlot = result.shadowRoot.querySelector(
        '.ea-result__title slot[name="title"]'
      );
      expect(titleSlot.textContent).toBe("更新后的标题");
    });

    it("heading 设置为空字符串后应清空", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("heading", "临时标题");
      container.appendChild(result);

      await waitForRender();

      result.setAttribute("heading", "");
      await waitForRender();

      expect(result.heading).toBe("");
    });

    it("heading 为插槽提供默认内容", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("heading", "Slot Default");
      container.appendChild(result);

      await waitForRender();

      const titleSlot = result.shadowRoot.querySelector(
        '.ea-result__title slot[name="title"]'
      );
      expect(titleSlot.textContent).toBe("Slot Default");
    });

    it("使用自定义 title slot 时仍应保留 heading 属性", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("heading", "Heading Title");
      result.innerHTML = `<span slot="title">Custom Title</span>`;
      container.appendChild(result);

      await waitForRender();

      expect(result.heading).toBe("Heading Title");
      const assignedNodes = result.shadowRoot
        .querySelector('slot[name="title"]')
        .assignedNodes();
      expect(assignedNodes.length).toBeGreaterThan(0);
    });
  });

  // ==================== SubTitle 属性测试 ====================

  describe("SubTitle Attribute", () => {
    it("默认 subTitle 应该为空字符串", async () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      await waitForRender();

      expect(result.subTitle).toBe("");
    });

    it("默认 sub-title slot 内容应为空", async () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      await waitForRender();

      const subTitleSlot = result.shadowRoot.querySelector(
        '.ea-result__sub-title slot[name="sub-title"]'
      );
      expect(subTitleSlot.textContent).toBe("");
    });

    it("应该通过 HTML attribute 设置 sub-title", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("sub-title", "内容描述");
      container.appendChild(result);

      await waitForRender();

      expect(result.subTitle).toBe("内容描述");
    });

    it("sub-title 应该更新 sub-title slot 的 textContent", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("sub-title", "内容描述");
      container.appendChild(result);

      await waitForRender();

      const subTitleSlot = result.shadowRoot.querySelector(
        '.ea-result__sub-title slot[name="sub-title"]'
      );
      expect(subTitleSlot.textContent).toBe("内容描述");
    });

    it("应该支持通过 JS property 设置 subTitle", async () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      await waitForRender();

      result.subTitle = "JS Subtitle";
      await waitForRender();

      expect(result.subTitle).toBe("JS Subtitle");
      const subTitleSlot = result.shadowRoot.querySelector(
        '.ea-result__sub-title slot[name="sub-title"]'
      );
      expect(subTitleSlot.textContent).toBe("JS Subtitle");
    });

    it("应该支持动态修改 sub-title", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("sub-title", "初始描述");
      container.appendChild(result);

      await waitForRender();

      let subTitleSlot = result.shadowRoot.querySelector(
        '.ea-result__sub-title slot[name="sub-title"]'
      );
      expect(subTitleSlot.textContent).toBe("初始描述");

      result.setAttribute("sub-title", "更新后的描述");
      await waitForRender();

      subTitleSlot = result.shadowRoot.querySelector(
        '.ea-result__sub-title slot[name="sub-title"]'
      );
      expect(subTitleSlot.textContent).toBe("更新后的描述");
    });

    it("sub-title 设置为空字符串后应清空", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("sub-title", "临时描述");
      container.appendChild(result);

      await waitForRender();

      result.setAttribute("sub-title", "");
      await waitForRender();

      expect(result.subTitle).toBe("");
    });
  });

  // ==================== Variant 属性测试 ====================

  describe("Variant Attribute", () => {
    it("默认 variant 应该为空字符串", async () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      await waitForRender();

      expect(result.variant).toBe("");
    });

    it("默认容器不应包含 variant 修饰符类名", async () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      await waitForRender();

      const containerEl = result.shadowRoot.querySelector(".ea-result");
      expect(containerEl.className.trim()).toBe("ea-result");
    });

    it("应该支持 primary 类型", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("variant", "primary");
      container.appendChild(result);

      await waitForRender();

      expect(result.variant).toBe("primary");
      const containerEl = result.shadowRoot.querySelector(".ea-result");
      expect(containerEl.classList.contains("ea-result--primary")).toBe(true);
    });

    it("应该支持 success 类型", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("variant", "success");
      container.appendChild(result);

      await waitForRender();

      expect(result.variant).toBe("success");
      const containerEl = result.shadowRoot.querySelector(".ea-result");
      expect(containerEl.classList.contains("ea-result--success")).toBe(true);
    });

    it("应该支持 warning 类型", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("variant", "warning");
      container.appendChild(result);

      await waitForRender();

      expect(result.variant).toBe("warning");
      const containerEl = result.shadowRoot.querySelector(".ea-result");
      expect(containerEl.classList.contains("ea-result--warning")).toBe(true);
    });

    it("应该支持 danger 类型", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("variant", "danger");
      container.appendChild(result);

      await waitForRender();

      expect(result.variant).toBe("danger");
      const containerEl = result.shadowRoot.querySelector(".ea-result");
      expect(containerEl.classList.contains("ea-result--danger")).toBe(true);
    });

    it("应该支持 info 类型", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("variant", "info");
      container.appendChild(result);

      await waitForRender();

      expect(result.variant).toBe("info");
      const containerEl = result.shadowRoot.querySelector(".ea-result");
      expect(containerEl.classList.contains("ea-result--info")).toBe(true);
    });

    it("应该支持 error 类型", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("variant", "error");
      container.appendChild(result);

      await waitForRender();

      expect(result.variant).toBe("error");
      const containerEl = result.shadowRoot.querySelector(".ea-result");
      expect(containerEl.classList.contains("ea-result--error")).toBe(true);
    });

    it("设置 invalid variant 时不应添加未知修饰符类名", async () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      await waitForRender();

      result.setAttribute("variant", "invalid-variant");
      await waitForRender();

      // Enum decorator should reject invalid value, variant should stay empty
      const containerEl = result.shadowRoot.querySelector(".ea-result");
      const modifierClasses = Array.from(containerEl.classList).filter((c) =>
        c.startsWith("ea-result--")
      );
      expect(modifierClasses.length).toBe(0);
    });

    it("应该支持动态切换 variant", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("variant", "success");
      container.appendChild(result);

      await waitForRender();

      let containerEl = result.shadowRoot.querySelector(".ea-result");
      expect(containerEl.classList.contains("ea-result--success")).toBe(true);

      result.setAttribute("variant", "error");
      await waitForRender();

      containerEl = result.shadowRoot.querySelector(".ea-result");
      expect(containerEl.classList.contains("ea-result--success")).toBe(false);
      expect(containerEl.classList.contains("ea-result--error")).toBe(true);
    });

    it("variant 从有值切换为空应移除修饰符类名", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("variant", "info");
      container.appendChild(result);

      await waitForRender();

      expect(result.variant).toBe("info");

      result.removeAttribute("variant");
      await waitForRender();

      const containerEl = result.shadowRoot.querySelector(".ea-result");
      expect(containerEl.className.trim()).toBe("ea-result");
    });

    it("primary variant 应设置图标为 circle-info", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("variant", "primary");
      container.appendChild(result);

      await waitForRender();

      const defaultIcon = result.shadowRoot.querySelector(
        ".ea-result__default-icon"
      );
      expect(defaultIcon.getAttribute("name")).toBe("circle-info");
    });

    it("success variant 应设置图标为 circle-check", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("variant", "success");
      container.appendChild(result);

      await waitForRender();

      const defaultIcon = result.shadowRoot.querySelector(
        ".ea-result__default-icon"
      );
      expect(defaultIcon.getAttribute("name")).toBe("circle-check");
    });

    it("warning variant 应设置图标为 triangle-exclamation", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("variant", "warning");
      container.appendChild(result);

      await waitForRender();

      const defaultIcon = result.shadowRoot.querySelector(
        ".ea-result__default-icon"
      );
      expect(defaultIcon.getAttribute("name")).toBe("triangle-exclamation");
    });

    it("danger variant 应设置图标为 circle-xmark", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("variant", "danger");
      container.appendChild(result);

      await waitForRender();

      const defaultIcon = result.shadowRoot.querySelector(
        ".ea-result__default-icon"
      );
      expect(defaultIcon.getAttribute("name")).toBe("circle-xmark");
    });

    it("info variant 应设置图标为 circle-info", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("variant", "info");
      container.appendChild(result);

      await waitForRender();

      const defaultIcon = result.shadowRoot.querySelector(
        ".ea-result__default-icon"
      );
      expect(defaultIcon.getAttribute("name")).toBe("circle-info");
    });

    it("error variant 应设置图标为 circle-xmark", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("variant", "error");
      container.appendChild(result);

      await waitForRender();

      const defaultIcon = result.shadowRoot.querySelector(
        ".ea-result__default-icon"
      );
      expect(defaultIcon.getAttribute("name")).toBe("circle-xmark");
    });

    it("切换 variant 后图标应同步更新", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("variant", "success");
      container.appendChild(result);

      await waitForRender();

      let defaultIcon = result.shadowRoot.querySelector(
        ".ea-result__default-icon"
      );
      expect(defaultIcon.getAttribute("name")).toBe("circle-check");

      result.setAttribute("variant", "warning");
      await waitForRender();

      defaultIcon = result.shadowRoot.querySelector(
        ".ea-result__default-icon"
      );
      expect(defaultIcon.getAttribute("name")).toBe("triangle-exclamation");
    });
  });

  // ==================== Icon 属性测试 ====================

  describe("Icon Attribute", () => {
    it("默认 icon 应该为空字符串", async () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      await waitForRender();

      expect(result.icon).toBe("");
    });

    it("应该通过 HTML attribute 设置 icon", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("icon", "custom-icon");
      container.appendChild(result);

      await waitForRender();

      expect(result.icon).toBe("custom-icon");
    });

    it("设置 icon 后应该更新默认图标的 name 属性", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("icon", "star");
      container.appendChild(result);

      await waitForRender();

      const defaultIcon = result.shadowRoot.querySelector(
        ".ea-result__default-icon"
      );
      expect(defaultIcon.getAttribute("name")).toBe("star");
    });

    it("应该支持通过 JS property 设置 icon", async () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      await waitForRender();

      result.icon = "heart";
      await waitForRender();

      expect(result.icon).toBe("heart");
      const defaultIcon = result.shadowRoot.querySelector(
        ".ea-result__default-icon"
      );
      expect(defaultIcon.getAttribute("name")).toBe("heart");
    });

    it("设置 icon 应覆盖 variant 默认图标", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("variant", "success");
      result.setAttribute("icon", "custom-icon");
      container.appendChild(result);

      await waitForRender();

      const defaultIcon = result.shadowRoot.querySelector(
        ".ea-result__default-icon"
      );
      expect(defaultIcon.getAttribute("name")).toBe("custom-icon");
    });

    it("移除 icon 后应恢复为 variant 对应的默认图标", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("variant", "success");
      result.setAttribute("icon", "custom-icon");
      container.appendChild(result);

      await waitForRender();

      const defaultIcon = result.shadowRoot.querySelector(
        ".ea-result__default-icon"
      );
      expect(defaultIcon.getAttribute("name")).toBe("custom-icon");

      result.removeAttribute("icon");
      await waitForRender();

      expect(defaultIcon.getAttribute("name")).toBe("circle-check");
    });

    it("icon 设置为空字符串后应恢复 variant 默认图标", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("variant", "warning");
      result.setAttribute("icon", "temporary-icon");
      container.appendChild(result);

      await waitForRender();

      result.setAttribute("icon", "");
      await waitForRender();

      const defaultIcon = result.shadowRoot.querySelector(
        ".ea-result__default-icon"
      );
      expect(defaultIcon.getAttribute("name")).toBe("triangle-exclamation");
    });

    it("应支持动态切换 icon", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("icon", "icon-a");
      container.appendChild(result);

      await waitForRender();

      let defaultIcon = result.shadowRoot.querySelector(
        ".ea-result__default-icon"
      );
      expect(defaultIcon.getAttribute("name")).toBe("icon-a");

      result.setAttribute("icon", "icon-b");
      await waitForRender();

      defaultIcon = result.shadowRoot.querySelector(
        ".ea-result__default-icon"
      );
      expect(defaultIcon.getAttribute("name")).toBe("icon-b");
    });
  });

  // ==================== Icon + Variant 交互测试 ====================

  describe("Icon and Variant Interaction", () => {
    it("先设置 icon 再设置 variant，variant 设置的图标应优先于先前设置的 icon", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("icon", "custom-icon");
      container.appendChild(result);

      await waitForRender();

      result.setAttribute("variant", "success");
      await waitForRender();

      const defaultIcon = result.shadowRoot.querySelector(
        ".ea-result__default-icon"
      );
      // variant 的 observer 会覆盖 icon
      expect(defaultIcon.getAttribute("name")).toBe("circle-check");
    });

    it("先设置 variant 再设置 icon，应以 icon 为准", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("variant", "success");
      container.appendChild(result);

      await waitForRender();

      let defaultIcon = result.shadowRoot.querySelector(
        ".ea-result__default-icon"
      );
      expect(defaultIcon.getAttribute("name")).toBe("circle-check");

      result.setAttribute("icon", "overriding-icon");
      await waitForRender();

      expect(defaultIcon.getAttribute("name")).toBe("overriding-icon");
    });

    it("variant 和 icon 同时设置，icon 应优先", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("variant", "success");
      result.setAttribute("icon", "star");
      container.appendChild(result);

      await waitForRender();

      expect(result.variant).toBe("success");
      expect(result.icon).toBe("star");
      const defaultIcon = result.shadowRoot.querySelector(
        ".ea-result__default-icon"
      );
      expect(defaultIcon.getAttribute("name")).toBe("star");
    });

    it("切换 variant 时若有自定义 icon，新 variant 的图标会覆盖原有 icon", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("variant", "success");
      result.setAttribute("icon", "persistent-icon");
      container.appendChild(result);

      await waitForRender();

      result.setAttribute("variant", "error");
      await waitForRender();

      const defaultIcon = result.shadowRoot.querySelector(
        ".ea-result__default-icon"
      );
      // variant observer 在设置时会覆盖 icon
      expect(defaultIcon.getAttribute("name")).toBe("circle-xmark");
    });
  });

  // ==================== 生命周期测试 ====================

  describe("Lifecycle", () => {
    it("挂载后组件应正确初始化", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("heading", "测试标题");
      result.setAttribute("sub-title", "测试副标题");
      container.appendChild(result);

      await waitForRender();

      expect(result.shadowRoot).toBeTruthy();
      expect(result.shadowRoot.querySelector(".ea-result")).toBeTruthy();
      expect(result.heading).toBe("测试标题");
      expect(result.subTitle).toBe("测试副标题");
    });

    it("组件移除后应不再存在于父容器", () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      result.remove();

      expect(container.contains(result)).toBe(false);
    });

    it("移除组件后 isConnected 应为 false", () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      expect(result.isConnected).toBe(true);

      result.remove();

      expect(result.isConnected).toBe(false);
    });

    it("移除后重新添加应正常工作", async () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      await waitForRender();

      result.remove();
      container.appendChild(result);

      await waitForRender();

      expect(result.shadowRoot).toBeTruthy();
      expect(result.shadowRoot.querySelector(".ea-result")).toBeTruthy();
    });

    it("挂载前设置属性应在挂载后生效", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("variant", "success");
      result.setAttribute("heading", "预设置标题");
      result.setAttribute("sub-title", "预设置副标题");
      container.appendChild(result);

      await waitForRender();

      expect(result.variant).toBe("success");
      expect(result.heading).toBe("预设置标题");
      expect(result.subTitle).toBe("预设置副标题");
    });

    it("挂载后动态修改属性应生效", async () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      await waitForRender();

      result.setAttribute("heading", "挂载后设置");
      await waitForRender();

      expect(result.heading).toBe("挂载后设置");
      const titleSlot = result.shadowRoot.querySelector(
        '.ea-result__title slot[name="title"]'
      );
      expect(titleSlot.textContent).toBe("挂载后设置");
    });
  });

  // ==================== 属性更新测试 ====================

  describe("Attribute Updates", () => {
    it("动态更新 variant 应反映在 UI 上", async () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      await waitForRender();

      result.setAttribute("variant", "success");
      await waitForRender();

      expect(result.variant).toBe("success");
      const containerEl = result.shadowRoot.querySelector(".ea-result");
      expect(containerEl.classList.contains("ea-result--success")).toBe(true);
    });

    it("动态更新 heading 应反映在 UI 上", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("heading", "初始标题");
      container.appendChild(result);

      await waitForRender();

      result.setAttribute("heading", "更新标题");
      await waitForRender();

      const titleSlot = result.shadowRoot.querySelector(
        '.ea-result__title slot[name="title"]'
      );
      expect(titleSlot.textContent).toBe("更新标题");
    });

    it("动态更新 sub-title 应反映在 UI 上", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("sub-title", "初始描述");
      container.appendChild(result);

      await waitForRender();

      result.setAttribute("sub-title", "更新描述");
      await waitForRender();

      const subTitleSlot = result.shadowRoot.querySelector(
        '.ea-result__sub-title slot[name="sub-title"]'
      );
      expect(subTitleSlot.textContent).toBe("更新描述");
    });

    it("JS property 修改应同步更新 HTML attribute", async () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      await waitForRender();

      result.heading = "Property Set";
      expect(result.getAttribute("heading")).toBe("Property Set");
    });
  });

  // ==================== 边界条件测试 ====================

  describe("Edge Cases", () => {
    it("不设置任何属性时应使用所有默认值", async () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      await waitForRender();

      expect(result.heading).toBe("");
      expect(result.subTitle).toBe("");
      expect(result.icon).toBe("");
      expect(result.variant === "" || result.variant === null).toBe(true);
    });

    it("应该处理空字符串 heading", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("heading", "");
      container.appendChild(result);

      await waitForRender();

      expect(result.shadowRoot.querySelector(".ea-result")).toBeTruthy();
      expect(result.heading).toBe("");
    });

    it("应该处理空字符串 sub-title", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("sub-title", "");
      container.appendChild(result);

      await waitForRender();

      expect(result.shadowRoot.querySelector(".ea-result")).toBeTruthy();
      expect(result.subTitle).toBe("");
    });

    it("应该处理特殊字符的 heading", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("heading", "<script>alert('xss')</script>");
      container.appendChild(result);

      await waitForRender();

      const titleSlot = result.shadowRoot.querySelector(
        '.ea-result__title slot[name="title"]'
      );
      // textContent 不会解析 HTML，所以应该保持原样
      expect(titleSlot.textContent).toBe("<script>alert('xss')</script>");
    });

    it("应该处理特殊字符的 sub-title", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("sub-title", '<img src=x onerror="alert(1)">');
      container.appendChild(result);

      await waitForRender();

      const subTitleSlot = result.shadowRoot.querySelector(
        '.ea-result__sub-title slot[name="sub-title"]'
      );
      expect(subTitleSlot.textContent).toBe(
        '<img src=x onerror="alert(1)">'
      );
    });

    it("应该处理长文本 heading", async () => {
      const result = document.createElement("ea-result");
      const longHeading = "A".repeat(1000);
      result.setAttribute("heading", longHeading);
      container.appendChild(result);

      await waitForRender();

      expect(result.heading).toBe(longHeading);
    });

    it("应该处理长文本 sub-title", async () => {
      const result = document.createElement("ea-result");
      const longSubTitle = "B".repeat(2000);
      result.setAttribute("sub-title", longSubTitle);
      container.appendChild(result);

      await waitForRender();

      expect(result.subTitle).toBe(longSubTitle);
    });

    it("应该处理中英文混合的 heading", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("heading", "Hello 世界！Mixed Content 123");
      container.appendChild(result);

      await waitForRender();

      expect(result.heading).toBe("Hello 世界！Mixed Content 123");
    });

    it("应该处理带 Emoji 的 sub-title", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("sub-title", "操作成功 🎉 请继续");
      container.appendChild(result);

      await waitForRender();

      expect(result.subTitle).toBe("操作成功 🎉 请继续");
    });

    it("heading 为纯空格时应保留", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("heading", "   ");
      container.appendChild(result);

      await waitForRender();

      expect(result.heading).toBe("   ");
    });

    it("快速连续修改 heading 应正确反映最终值", async () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      await waitForRender();

      result.setAttribute("heading", "A");
      result.setAttribute("heading", "B");
      result.setAttribute("heading", "最终值");

      await waitForRender();

      const titleSlot = result.shadowRoot.querySelector(
        '.ea-result__title slot[name="title"]'
      );
      expect(titleSlot.textContent).toBe("最终值");
    });

    it("快速连续修改 variant 应正确反映最终值", async () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      await waitForRender();

      result.setAttribute("variant", "success");
      result.setAttribute("variant", "warning");
      result.setAttribute("variant", "error");

      await waitForRender();

      const containerEl = result.shadowRoot.querySelector(".ea-result");
      expect(containerEl.classList.contains("ea-result--error")).toBe(true);
      expect(containerEl.classList.contains("ea-result--success")).toBe(false);
    });

    it("移除后重新添加应保留属性", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("heading", "被记住的标题");
      result.setAttribute("variant", "success");
      container.appendChild(result);

      await waitForRender();

      result.remove();
      container.appendChild(result);

      await waitForRender();

      expect(result.heading).toBe("被记住的标题");
      expect(result.variant).toBe("success");
    });

    it("未挂载时多次设置属性，挂载后应为最终值", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("heading", "旧值");
      result.setAttribute("heading", "新值");
      container.appendChild(result);

      await waitForRender();

      expect(result.heading).toBe("新值");
    });
  });

  // ==================== CSS 自定义属性测试 ====================

  describe("CSS Custom Properties", () => {
    it(":host 应该定义 --ea-result-icon-size", () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      const styles = getComputedStyle(result);
      expect(styles.getPropertyValue("--ea-result-icon-size")).toBeDefined();
    });

    it(":host 应该定义 --ea-result-spacing", () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      const styles = getComputedStyle(result);
      expect(styles.getPropertyValue("--ea-result-spacing")).toBeDefined();
    });

    it(":host 应该定义 --ea-result-title-font-size", () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      const styles = getComputedStyle(result);
      expect(
        styles.getPropertyValue("--ea-result-title-font-size")
      ).toBeDefined();
    });

    it(":host 应该定义 --ea-result-title-color", () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      const styles = getComputedStyle(result);
      expect(
        styles.getPropertyValue("--ea-result-title-color")
      ).toBeDefined();
    });

    it(":host 应该定义 --ea-result-subtitle-font-size", () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      const styles = getComputedStyle(result);
      expect(
        styles.getPropertyValue("--ea-result-subtitle-font-size")
      ).toBeDefined();
    });

    it(":host 应该定义 --ea-result-subtitle-color", () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      const styles = getComputedStyle(result);
      expect(
        styles.getPropertyValue("--ea-result-subtitle-color")
      ).toBeDefined();
    });

    it(":host 应该定义 --ea-result-extra-spacing", () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      const styles = getComputedStyle(result);
      expect(
        styles.getPropertyValue("--ea-result-extra-spacing")
      ).toBeDefined();
    });

    it("用户可以通过 style 覆盖 --ea-result-icon-size", async () => {
      const result = document.createElement("ea-result");
      result.style.setProperty("--ea-result-icon-size", "80px");
      container.appendChild(result);

      await waitForRender();

      const size = getComputedStyle(result).getPropertyValue(
        "--ea-result-icon-size"
      );
      expect(size.trim()).toBe("80px");
    });
  });

  // ==================== 复杂场景测试 ====================

  describe("Complex Scenarios", () => {
    it("完整配置：自定义 variant + heading + sub-title + 自定义额外内容", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("variant", "success");
      result.setAttribute("heading", "支付成功");
      result.setAttribute("sub-title", "订单 #2024001 已完成支付");
      result.innerHTML = `
        <div slot="extra">
          <button id="view-order">查看订单</button>
          <button id="back-home">返回首页</button>
        </div>
      `;
      container.appendChild(result);

      await waitForRender();

      expect(result.variant).toBe("success");
      expect(result.heading).toBe("支付成功");
      expect(result.subTitle).toBe("订单 #2024001 已完成支付");

      const containerEl = result.shadowRoot.querySelector(".ea-result");
      expect(containerEl.classList.contains("ea-result--success")).toBe(true);
      expect(result.querySelector("#view-order")).toBeTruthy();
      expect(result.querySelector("#back-home")).toBeTruthy();

      const defaultIcon = result.shadowRoot.querySelector(
        ".ea-result__default-icon"
      );
      expect(defaultIcon.getAttribute("name")).toBe("circle-check");
    });

    it("完整配置：error variant + 自定义图标 + 标题 + 按钮", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("variant", "error");
      result.setAttribute("icon", "bug");
      result.setAttribute("heading", "系统错误");
      result.setAttribute("sub-title", "请稍后重试或联系技术支持");
      result.innerHTML = `<button slot="extra">重试</button>`;
      container.appendChild(result);

      await waitForRender();

      const defaultIcon = result.shadowRoot.querySelector(
        ".ea-result__default-icon"
      );
      // 自定义 icon 优先于 variant 默认图标
      expect(defaultIcon.getAttribute("name")).toBe("bug");

      const containerEl = result.shadowRoot.querySelector(".ea-result");
      expect(containerEl.classList.contains("ea-result--error")).toBe(true);

      const extraSlot = result.shadowRoot.querySelector(
        '.ea-result__extra slot[name="extra"]'
      );
      expect(extraSlot).toBeDefined();
    });

    it("从完整配置切换到空状态", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("variant", "success");
      result.setAttribute("heading", "操作成功");
      result.setAttribute("sub-title", "已完成");
      container.appendChild(result);

      await waitForRender();

      expect(result.variant).toBe("success");
      expect(result.heading).toBe("操作成功");

      result.removeAttribute("variant");
      result.setAttribute("heading", "");
      result.setAttribute("sub-title", "");
      await waitForRender();

      const containerEl = result.shadowRoot.querySelector(".ea-result");
      expect(containerEl.className.trim()).toBe("ea-result");
      expect(result.heading).toBe("");
      expect(result.subTitle).toBe("");
    });

    it("自定义 icon slot 应完全替换默认图标", () => {
      const result = document.createElement("ea-result");
      result.setAttribute("variant", "success");
      result.innerHTML = `<div slot="icon">Custom SVG Icon</div>`;
      container.appendChild(result);

      const iconSlot = result.shadowRoot.querySelector(
        '.ea-result__icon-wrap slot[name="icon"]'
      );
      expect(iconSlot).toBeDefined();
      const assignedNodes = iconSlot.assignedNodes();
      expect(assignedNodes.length).toBeGreaterThan(0);
    });

    it("同时设置所有自定义 slot 应正常工作", () => {
      const result = document.createElement("ea-result");
      result.innerHTML = `
        <span slot="icon">🎉</span>
        <span slot="title">自定义标题</span>
        <span slot="sub-title">自定义副标题</span>
        <div slot="extra"><a href="/">返回</a></div>
      `;
      container.appendChild(result);

      const iconSlot = result.shadowRoot.querySelector(
        'slot[name="icon"]'
      );
      expect(iconSlot).toBeDefined();
      expect(iconSlot.assignedNodes().length).toBeGreaterThan(0);
    });

    it("variant + heading + icon 三者同时动态变化", async () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      await waitForRender();

      // 第一次变化
      result.setAttribute("variant", "success");
      result.setAttribute("heading", "成功");
      result.setAttribute("icon", "check");
      await waitForRender();

      expect(result.variant).toBe("success");
      expect(result.heading).toBe("成功");

      // 第二次变化
      result.setAttribute("variant", "error");
      result.setAttribute("heading", "失败");
      result.setAttribute("icon", "close");
      await waitForRender();

      expect(result.variant).toBe("error");
      expect(result.heading).toBe("失败");

      const defaultIcon = result.shadowRoot.querySelector(
        ".ea-result__default-icon"
      );
      expect(defaultIcon.getAttribute("name")).toBe("close");
    });
  });

  // ==================== 错误处理和健壮性测试 ====================

  describe("Error Handling & Robustness", () => {
    it("不添加到 DOM 不应报错", () => {
      const result = document.createElement("ea-result");
      // 创建但不添加，不应抛出异常
      expect(() => {
        result.setAttribute("heading", "未挂载");
        result.setAttribute("variant", "success");
        result.setAttribute("sub-title", "test");
        result.setAttribute("icon", "test");
      }).not.toThrow();
    });

    it("设置 undefined variant 应被拒绝", async () => {
      const result = document.createElement("ea-result");
      container.appendChild(result);

      await waitForRender();

      result.setAttribute("variant", undefined);
      await waitForRender();

      // variant 应保持之前的值或默认
      const containerEl = result.shadowRoot.querySelector(".ea-result");
      expect(containerEl.className.trim()).toBe("ea-result");
    });

    it("设置 null variant 应被拒绝", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("variant", "success");
      container.appendChild(result);

      await waitForRender();

      result.setAttribute("variant", null);
      await waitForRender();

      expect(result.shadowRoot.querySelector(".ea-result")).toBeTruthy();
    });

    it("设置过长 icon 名称不应崩溃", async () => {
      const result = document.createElement("ea-result");
      const longIconName = "x".repeat(500);
      result.setAttribute("icon", longIconName);
      container.appendChild(result);

      await waitForRender();

      expect(result.icon).toBe(longIconName);
    });

    it("重复设置相同的属性值不应产生副作用", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("heading", "保持不变");
      container.appendChild(result);

      await waitForRender();

      const titleSlot = result.shadowRoot.querySelector(
        '.ea-result__title slot[name="title"]'
      );
      expect(titleSlot.textContent).toBe("保持不变");

      result.setAttribute("heading", "保持不变");
      await waitForRender();

      // 应该还是同样的值
      expect(titleSlot.textContent).toBe("保持不变");
    });

    it("设置不存在的 HTML attribute 不应影响组件", async () => {
      const result = document.createElement("ea-result");
      result.setAttribute("nonexistent-attr", "test");
      container.appendChild(result);

      await waitForRender();

      expect(result.shadowRoot.querySelector(".ea-result")).toBeTruthy();
    });
  });
});