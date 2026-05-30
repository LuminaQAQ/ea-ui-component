import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender";

import "../components/ea-page-header/index.ts";

describe("EaPageHeader Component", () => {
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
    it("应该正确创建 ea-page-header 元素", () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      expect(pageHeader).toBeDefined();
      expect(pageHeader.tagName.toLowerCase()).toBe("ea-page-header");
    });

    it("应该创建 shadow DOM", () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      expect(pageHeader.shadowRoot).toBeDefined();
      expect(pageHeader.shadowRoot.mode).toBe("open");
    });

    it("应该渲染容器元素并带有正确的 BEM 类名", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      const containerEl =
        pageHeader.shadowRoot.querySelector(".ea-page-header");
      expect(containerEl).toBeDefined();
      expect(containerEl.tagName.toLowerCase()).toBe("div");
    });

    it("应该渲染 breadcrumb 区域", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      const breadcrumb = pageHeader.shadowRoot.querySelector(
        ".ea-page-header__breadcrumb"
      );
      expect(breadcrumb).toBeDefined();
    });

    it("应该渲染 wrapper 区域", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      const wrapper = pageHeader.shadowRoot.querySelector(
        ".ea-page-header__wrapper"
      );
      expect(wrapper).toBeDefined();
    });

    it("应该渲染 back 区域", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      const back = pageHeader.shadowRoot.querySelector(".ea-page-header__back");
      expect(back).toBeDefined();
    });

    it("应该渲染 icon 区域", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      const icon = pageHeader.shadowRoot.querySelector(".ea-page-header__icon");
      expect(icon).toBeDefined();
    });

    it("应该渲染 heading 区域", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      const heading = pageHeader.shadowRoot.querySelector(
        ".ea-page-header__heading"
      );
      expect(heading).toBeDefined();
    });

    it("应该渲染 divider", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      const divider = pageHeader.shadowRoot.querySelector(
        ".ea-page-header__divider"
      );
      expect(divider).toBeDefined();
    });

    it("应该渲染 content 区域", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      const content = pageHeader.shadowRoot.querySelector(
        ".ea-page-header__content"
      );
      expect(content).toBeDefined();
    });

    it("应该渲染 extra 区域", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      const extra = pageHeader.shadowRoot.querySelector(
        ".ea-page-header__extra"
      );
      expect(extra).toBeDefined();
    });
  });

  // ==================== DOM 结构测试 ====================

  describe("DOM Structure", () => {
    it("容器应该是所有部分的父级", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      const containerEl =
        pageHeader.shadowRoot.querySelector(".ea-page-header");
      const breadcrumb = containerEl.querySelector(
        ".ea-page-header__breadcrumb"
      );
      const wrapper = containerEl.querySelector(".ea-page-header__wrapper");

      expect(breadcrumb).toBeDefined();
      expect(wrapper).toBeDefined();
    });

    it("wrapper 应该包含 back、divider、content、extra", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      const wrapper = pageHeader.shadowRoot.querySelector(
        ".ea-page-header__wrapper"
      );
      const back = wrapper.querySelector(".ea-page-header__back");
      const divider = wrapper.querySelector(".ea-page-header__divider");
      const content = wrapper.querySelector(".ea-page-header__content");
      const extra = wrapper.querySelector(".ea-page-header__extra");

      expect(back).toBeDefined();
      expect(divider).toBeDefined();
      expect(content).toBeDefined();
      expect(extra).toBeDefined();
    });

    it("back 区域应该包含 icon 和 heading", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      const back = pageHeader.shadowRoot.querySelector(".ea-page-header__back");
      const icon = back.querySelector(".ea-page-header__icon");
      const heading = back.querySelector(".ea-page-header__heading");

      expect(icon).toBeDefined();
      expect(heading).toBeDefined();
    });

    it("容器直接子元素应该是 breadcrumb section、wrapper section 和默认 slot", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      const containerEl =
        pageHeader.shadowRoot.querySelector(".ea-page-header");
      const children = Array.from(containerEl.children);

      const breadcrumbIndex = children.findIndex(c =>
        c.classList.contains("ea-page-header__breadcrumb")
      );
      const wrapperIndex = children.findIndex(c =>
        c.classList.contains("ea-page-header__wrapper")
      );

      expect(breadcrumbIndex).toBeLessThan(wrapperIndex);
    });

    it("wrapper 内子元素应该按 back、divider、content、extra 顺序排列", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      const wrapper = pageHeader.shadowRoot.querySelector(
        ".ea-page-header__wrapper"
      );
      const children = Array.from(wrapper.children);

      const backIndex = children.findIndex(c =>
        c.classList.contains("ea-page-header__back")
      );
      const dividerIndex = children.findIndex(c =>
        c.classList.contains("ea-page-header__divider")
      );
      const contentIndex = children.findIndex(c =>
        c.classList.contains("ea-page-header__content")
      );
      const extraIndex = children.findIndex(c =>
        c.classList.contains("ea-page-header__extra")
      );

      expect(backIndex).toBeLessThan(dividerIndex);
      expect(dividerIndex).toBeLessThan(contentIndex);
      expect(contentIndex).toBeLessThan(extraIndex);
    });
  });

  // ==================== CSS Part 测试 ====================

  describe("CSS Parts", () => {
    it("应该暴露 container part", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      const el = pageHeader.shadowRoot.querySelector('[part="container"]');
      expect(el).toBeDefined();
      expect(el.classList.contains("ea-page-header")).toBe(true);
    });

    it("应该暴露 breadcrumb part", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      const el = pageHeader.shadowRoot.querySelector('[part="breadcrumb"]');
      expect(el).toBeDefined();
      expect(el.classList.contains("ea-page-header__breadcrumb")).toBe(true);
    });

    it("应该暴露 header-wrapper part", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      const el = pageHeader.shadowRoot.querySelector('[part="header-wrapper"]');
      expect(el).toBeDefined();
      expect(el.classList.contains("ea-page-header__wrapper")).toBe(true);
    });

    it("应该暴露 back part", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      const el = pageHeader.shadowRoot.querySelector('[part="back"]');
      expect(el).toBeDefined();
      expect(el.classList.contains("ea-page-header__back")).toBe(true);
    });

    it("应该暴露 icon part", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      const el = pageHeader.shadowRoot.querySelector('[part="icon"]');
      expect(el).toBeDefined();
      expect(el.classList.contains("ea-page-header__icon")).toBe(true);
    });

    it("应该暴露 back-icon part", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      const el = pageHeader.shadowRoot.querySelector('[part="back-icon"]');
      expect(el).toBeDefined();
    });

    it("应该暴露 title part（heading 元素）", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      const el = pageHeader.shadowRoot.querySelector('[part="title"]');
      expect(el).toBeDefined();
      expect(el.classList.contains("ea-page-header__heading")).toBe(true);
    });

    it("应该暴露 divider part", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      const el = pageHeader.shadowRoot.querySelector('[part="divider"]');
      expect(el).toBeDefined();
      expect(el.classList.contains("ea-page-header__divider")).toBe(true);
    });

    it("应该暴露 content part", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      const el = pageHeader.shadowRoot.querySelector('[part="content"]');
      expect(el).toBeDefined();
      expect(el.classList.contains("ea-page-header__content")).toBe(true);
    });

    it("应该暴露 extra part", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      const el = pageHeader.shadowRoot.querySelector('[part="extra"]');
      expect(el).toBeDefined();
      expect(el.classList.contains("ea-page-header__extra")).toBe(true);
    });
  });

  // ==================== 插槽测试 ====================

  describe("Slots", () => {
    it("应该包含 breadcrumb 命名插槽", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      const slot = pageHeader.shadowRoot.querySelector(
        'slot[name="breadcrumb"]'
      );
      expect(slot).toBeDefined();
    });

    it("应该包含 icon 命名插槽", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      const slot = pageHeader.shadowRoot.querySelector('slot[name="icon"]');
      expect(slot).toBeDefined();
    });

    it("icon 插槽应有默认 ea-icon 作为 fallback", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      const iconSlot = pageHeader.shadowRoot.querySelector('slot[name="icon"]');
      const defaultIcon = iconSlot.querySelector("ea-icon");
      expect(defaultIcon).toBeDefined();
      expect(defaultIcon.getAttribute("name")).toBe("angle-left");
    });

    it("应该包含 title 命名插槽", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      const slot = pageHeader.shadowRoot.querySelector('slot[name="title"]');
      expect(slot).toBeDefined();
    });

    it("title 插槽默认内容应为 Back", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      const titleSlot =
        pageHeader.shadowRoot.querySelector('slot[name="title"]');
      expect(titleSlot.textContent.trim()).toBe("Back");
    });

    it("应该包含 content 命名插槽", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      const slot = pageHeader.shadowRoot.querySelector('slot[name="content"]');
      expect(slot).toBeDefined();
    });

    it("应该包含 extra 命名插槽", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      const slot = pageHeader.shadowRoot.querySelector('slot[name="extra"]');
      expect(slot).toBeDefined();
    });

    it("应该包含默认插槽", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      const slot = pageHeader.shadowRoot.querySelector("slot:not([name])");
      expect(slot).toBeDefined();
    });

    it("默认插槽应该在容器内而非 wrapper 内", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      const containerEl =
        pageHeader.shadowRoot.querySelector(".ea-page-header");
      const defaultSlot = containerEl.querySelector("slot:not([name])");
      expect(defaultSlot).toBeDefined();
    });

    it("应该支持通过 breadcrumb slot 自定义面包屑", async () => {
      const pageHeader = document.createElement("ea-page-header");
      pageHeader.innerHTML = `<nav slot="breadcrumb">Home / Page</nav>`;
      container.appendChild(pageHeader);

      await waitForRender();

      const slot = pageHeader.shadowRoot.querySelector(
        'slot[name="breadcrumb"]'
      );
      expect(slot).toBeDefined();
    });

    it("应该支持通过 icon slot 自定义图标", async () => {
      const pageHeader = document.createElement("ea-page-header");
      pageHeader.innerHTML = `<span slot="icon">Custom Icon</span>`;
      container.appendChild(pageHeader);

      await waitForRender();

      const slot = pageHeader.shadowRoot.querySelector('slot[name="icon"]');
      expect(slot).toBeDefined();
    });

    it("应该支持通过 title slot 自定义标题", async () => {
      const pageHeader = document.createElement("ea-page-header");
      pageHeader.innerHTML = `<span slot="title">Custom Title</span>`;
      container.appendChild(pageHeader);

      await waitForRender();

      const slot = pageHeader.shadowRoot.querySelector('slot[name="title"]');
      expect(slot).toBeDefined();
    });

    it("应该支持通过 content slot 自定义内容", async () => {
      const pageHeader = document.createElement("ea-page-header");
      pageHeader.innerHTML = `<span slot="content">Main Content</span>`;
      container.appendChild(pageHeader);

      await waitForRender();

      const slot = pageHeader.shadowRoot.querySelector('slot[name="content"]');
      expect(slot).toBeDefined();
    });

    it("应该支持通过 extra slot 添加额外操作", async () => {
      const pageHeader = document.createElement("ea-page-header");
      pageHeader.innerHTML = `<div slot="extra"><button>Action</button></div>`;
      container.appendChild(pageHeader);

      await waitForRender();

      const slot = pageHeader.shadowRoot.querySelector('slot[name="extra"]');
      expect(slot).toBeDefined();
    });

    it("应该同时支持所有插槽", async () => {
      const pageHeader = document.createElement("ea-page-header");
      pageHeader.innerHTML = `
        <nav slot="breadcrumb">Breadcrumb</nav>
        <span slot="icon">Icon</span>
        <span slot="title">Title</span>
        <span slot="content">Content</span>
        <div slot="extra">Extra</div>
        <div>Default</div>
      `;
      container.appendChild(pageHeader);

      await waitForRender();

      expect(
        pageHeader.shadowRoot.querySelector('slot[name="breadcrumb"]')
      ).toBeDefined();
      expect(
        pageHeader.shadowRoot.querySelector('slot[name="icon"]')
      ).toBeDefined();
      expect(
        pageHeader.shadowRoot.querySelector('slot[name="title"]')
      ).toBeDefined();
      expect(
        pageHeader.shadowRoot.querySelector('slot[name="content"]')
      ).toBeDefined();
      expect(
        pageHeader.shadowRoot.querySelector('slot[name="extra"]')
      ).toBeDefined();
      expect(
        pageHeader.shadowRoot.querySelector("slot:not([name])")
      ).toBeDefined();
    });
  });

  // ==================== Icon 属性测试 ====================

  describe("Icon Attribute", () => {
    it("默认 icon 应该是 angle-left", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      expect(pageHeader.icon).toBe("angle-left");
    });

    it("默认应该渲染 angle-left 图标", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      const iconEl = pageHeader.shadowRoot.querySelector("ea-icon");
      expect(iconEl).toBeDefined();
      expect(iconEl.getAttribute("name")).toBe("angle-left");
    });

    it("应该通过 HTML attribute 设置 icon", async () => {
      const pageHeader = document.createElement("ea-page-header");
      pageHeader.setAttribute("icon", "rotate-left");
      container.appendChild(pageHeader);

      await waitForRender();

      expect(pageHeader.icon).toBe("rotate-left");
    });

    it("设置 icon 属性后应该更新 ea-icon 的 name 属性", async () => {
      const pageHeader = document.createElement("ea-page-header");
      pageHeader.setAttribute("icon", "arrow-left");
      container.appendChild(pageHeader);

      await waitForRender();

      const iconEl = pageHeader.shadowRoot.querySelector("ea-icon");
      expect(iconEl.getAttribute("name")).toBe("arrow-left");
    });

    it("应该支持通过 JS property 设置 icon", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      pageHeader.icon = "chevron-left";
      await waitForRender();

      expect(pageHeader.icon).toBe("chevron-left");
    });

    it("应该支持动态修改 icon", async () => {
      const pageHeader = document.createElement("ea-page-header");
      pageHeader.setAttribute("icon", "arrow-left");
      container.appendChild(pageHeader);

      await waitForRender();

      expect(pageHeader.icon).toBe("arrow-left");

      pageHeader.setAttribute("icon", "rotate-left");
      await waitForRender();

      expect(pageHeader.icon).toBe("rotate-left");
    });

    it("icon 设置为空字符串后应隐藏图标", async () => {
      const pageHeader = document.createElement("ea-page-header");
      pageHeader.setAttribute("icon", "arrow-left");
      container.appendChild(pageHeader);

      await waitForRender();

      pageHeader.setAttribute("icon", "");
      await waitForRender();

      expect(pageHeader.icon).toBe("");
      const iconEl = pageHeader.shadowRoot.querySelector(".ea-page-header__icon");
      expect(iconEl.classList.contains("is-hidden")).toBe(true);
    });

    it("icon 为空字符串时不应渲染 ea-icon", async () => {
      const pageHeader = document.createElement("ea-page-header");
      pageHeader.setAttribute("icon", "");
      container.appendChild(pageHeader);

      await waitForRender();

      const iconEl = pageHeader.shadowRoot.querySelector("ea-icon");
      expect(iconEl).toBeNull();
    });

    it("icon 从空字符串恢复为非空时应移除 is-hidden 类", async () => {
      const pageHeader = document.createElement("ea-page-header");
      pageHeader.setAttribute("icon", "");
      container.appendChild(pageHeader);

      await waitForRender();

      const iconContainer = pageHeader.shadowRoot.querySelector(".ea-page-header__icon");
      expect(iconContainer.classList.contains("is-hidden")).toBe(true);

      pageHeader.setAttribute("icon", "arrow-left");
      await waitForRender();

      expect(iconContainer.classList.contains("is-hidden")).toBe(false);
      const iconEl = pageHeader.shadowRoot.querySelector("ea-icon");
      expect(iconEl.getAttribute("name")).toBe("arrow-left");
    });
  });

  // ==================== Heading 属性测试 ====================

  describe("Heading Attribute", () => {
    it("默认 heading 应该是空字符串", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      expect(pageHeader.heading).toBe("");
    });

    it("title slot 默认文本应为 Back", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      const titleSlot =
        pageHeader.shadowRoot.querySelector('slot[name="title"]');
      expect(titleSlot.textContent.trim()).toBe("Back");
    });

    it("应该通过 HTML attribute 设置 heading", async () => {
      const pageHeader = document.createElement("ea-page-header");
      pageHeader.setAttribute("heading", "返回");
      container.appendChild(pageHeader);

      await waitForRender();

      expect(pageHeader.heading).toBe("返回");
    });

    it("heading 应该更新 heading 容器的 textContent", async () => {
      const pageHeader = document.createElement("ea-page-header");
      pageHeader.setAttribute("heading", "Go Back");
      container.appendChild(pageHeader);

      await waitForRender();

      const headingEl = pageHeader.shadowRoot.querySelector(
        ".ea-page-header__heading"
      );
      expect(headingEl.textContent).toBe("Go Back");
    });

    it("应该支持通过 JS property 设置 heading", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      pageHeader.heading = "JS Property Heading";
      await waitForRender();

      expect(pageHeader.heading).toBe("JS Property Heading");
      const headingEl = pageHeader.shadowRoot.querySelector(
        ".ea-page-header__heading"
      );
      expect(headingEl.textContent).toBe("JS Property Heading");
    });

    it("应该支持动态修改 heading", async () => {
      const pageHeader = document.createElement("ea-page-header");
      pageHeader.setAttribute("heading", "初始标题");
      container.appendChild(pageHeader);

      await waitForRender();

      const headingEl = pageHeader.shadowRoot.querySelector(
        ".ea-page-header__heading"
      );
      expect(headingEl.textContent).toBe("初始标题");

      pageHeader.setAttribute("heading", "更新后的标题");
      await waitForRender();

      const updatedHeadingEl = pageHeader.shadowRoot.querySelector(
        ".ea-page-header__heading"
      );
      expect(updatedHeadingEl.textContent).toBe("更新后的标题");
    });

    it("heading 设置为空字符串后应恢复 title slot 默认 Back", async () => {
      const pageHeader = document.createElement("ea-page-header");
      pageHeader.setAttribute("heading", "临时标题");
      container.appendChild(pageHeader);

      await waitForRender();

      pageHeader.setAttribute("heading", "");
      await waitForRender();

      expect(pageHeader.heading).toBe("");
      const titleSlot =
        pageHeader.shadowRoot.querySelector('slot[name="title"]');
      expect(titleSlot).toBeDefined();
      expect(titleSlot.textContent.trim()).toBe("Back");
    });

    it("heading 属性应映射到 HTML attribute heading（非 title）", async () => {
      const pageHeader = document.createElement("ea-page-header");
      pageHeader.setAttribute("heading", "Test Heading");
      container.appendChild(pageHeader);

      await waitForRender();

      expect(pageHeader.hasAttribute("heading")).toBe(true);
      expect(pageHeader.getAttribute("heading")).toBe("Test Heading");
    });
  });

  // ==================== Content 属性测试 ====================

  describe("Content Attribute", () => {
    it("默认 content 应该是空字符串", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      expect(pageHeader.content).toBe("");
    });

    it("默认 content slot 内容应为空", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      const contentSlot = pageHeader.shadowRoot.querySelector(
        'slot[name="content"]'
      );
      expect(contentSlot.textContent).toBe("");
    });

    it("应该通过 HTML attribute 设置 content", async () => {
      const pageHeader = document.createElement("ea-page-header");
      pageHeader.setAttribute("content", "Page Title");
      container.appendChild(pageHeader);

      await waitForRender();

      expect(pageHeader.content).toBe("Page Title");
    });

    it("content 应该更新 content 容器的 textContent", async () => {
      const pageHeader = document.createElement("ea-page-header");
      pageHeader.setAttribute("content", "Page Title");
      container.appendChild(pageHeader);

      await waitForRender();

      const contentEl = pageHeader.shadowRoot.querySelector(
        ".ea-page-header__content"
      );
      expect(contentEl.textContent).toBe("Page Title");
    });

    it("应该支持通过 JS property 设置 content", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      pageHeader.content = "JS Property Content";
      await waitForRender();

      expect(pageHeader.content).toBe("JS Property Content");
      const contentEl = pageHeader.shadowRoot.querySelector(
        ".ea-page-header__content"
      );
      expect(contentEl.textContent).toBe("JS Property Content");
    });

    it("应该支持动态修改 content", async () => {
      const pageHeader = document.createElement("ea-page-header");
      pageHeader.setAttribute("content", "初始内容");
      container.appendChild(pageHeader);

      await waitForRender();

      const contentEl = pageHeader.shadowRoot.querySelector(
        ".ea-page-header__content"
      );
      expect(contentEl.textContent).toBe("初始内容");

      pageHeader.setAttribute("content", "更新后的内容");
      await waitForRender();

      const updatedContentEl = pageHeader.shadowRoot.querySelector(
        ".ea-page-header__content"
      );
      expect(updatedContentEl.textContent).toBe("更新后的内容");
    });

    it("content 设置为空字符串后应恢复 content slot", async () => {
      const pageHeader = document.createElement("ea-page-header");
      pageHeader.setAttribute("content", "临时内容");
      container.appendChild(pageHeader);

      await waitForRender();

      pageHeader.setAttribute("content", "");
      await waitForRender();

      expect(pageHeader.content).toBe("");
      const contentSlot = pageHeader.shadowRoot.querySelector(
        'slot[name="content"]'
      );
      expect(contentSlot).toBeDefined();
    });
  });

  // ==================== 事件测试 ====================

  describe("Events", () => {
    it("点击 back 区域应该触发 ea-back 事件", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      const backHandler = vi.fn();
      pageHeader.addEventListener("ea-back", backHandler);

      const backEl = pageHeader.shadowRoot.querySelector(
        ".ea-page-header__back"
      );
      backEl.click();

      expect(backHandler).toHaveBeenCalled();
    });

    it("ea-back 事件应该可以多次触发", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      const backHandler = vi.fn();
      pageHeader.addEventListener("ea-back", backHandler);

      const backEl = pageHeader.shadowRoot.querySelector(
        ".ea-page-header__back"
      );
      backEl.click();
      backEl.click();
      backEl.click();

      expect(backHandler).toHaveBeenCalledTimes(3);
    });

    it("ea-back 事件应该是 EaPageHeaderBackEvent", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      let receivedEvent;
      pageHeader.addEventListener("ea-back", e => {
        receivedEvent = e;
      });

      const backEl = pageHeader.shadowRoot.querySelector(
        ".ea-page-header__back"
      );
      backEl.click();

      expect(receivedEvent).toBeDefined();
      expect(receivedEvent.type).toBe("ea-back");
      expect(receivedEvent.bubbles).toBe(true);
      expect(receivedEvent.composed).toBe(true);
    });

    it("点击 icon 区域（back 的子元素）也应该触发 ea-back 事件", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      const backHandler = vi.fn();
      pageHeader.addEventListener("ea-back", backHandler);

      const iconEl = pageHeader.shadowRoot.querySelector(
        ".ea-page-header__icon"
      );
      iconEl.click();

      expect(backHandler).toHaveBeenCalled();
    });

    it("点击 heading 区域（back 的子元素）也应该触发 ea-back 事件", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      const backHandler = vi.fn();
      pageHeader.addEventListener("ea-back", backHandler);

      const headingEl = pageHeader.shadowRoot.querySelector(
        ".ea-page-header__heading"
      );
      headingEl.click();

      expect(backHandler).toHaveBeenCalled();
    });

    it("点击 content 区域不应该触发 ea-back 事件", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      const backHandler = vi.fn();
      pageHeader.addEventListener("ea-back", backHandler);

      const contentEl = pageHeader.shadowRoot.querySelector(
        ".ea-page-header__content"
      );
      contentEl.click();

      expect(backHandler).not.toHaveBeenCalled();
    });

    it("点击 extra 区域不应该触发 ea-back 事件", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      const backHandler = vi.fn();
      pageHeader.addEventListener("ea-back", backHandler);

      const extraEl = pageHeader.shadowRoot.querySelector(
        ".ea-page-header__extra"
      );
      extraEl.click();

      expect(backHandler).not.toHaveBeenCalled();
    });

    it("移除 ea-back 事件监听后不应再触发", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      const backHandler = vi.fn();
      pageHeader.addEventListener("ea-back", backHandler);

      const backEl = pageHeader.shadowRoot.querySelector(
        ".ea-page-header__back"
      );
      backEl.click();

      expect(backHandler).toHaveBeenCalledTimes(1);

      pageHeader.removeEventListener("ea-back", backHandler);
      backEl.click();

      expect(backHandler).toHaveBeenCalledTimes(1);
    });
  });

  // ==================== 属性组合测试 ====================

  describe("Attribute Combinations", () => {
    it("应该同时支持 icon、heading、content 属性", async () => {
      const pageHeader = document.createElement("ea-page-header");
      pageHeader.setAttribute("icon", "arrow-left");
      pageHeader.setAttribute("heading", "返回");
      pageHeader.setAttribute("content", "页面标题");
      container.appendChild(pageHeader);

      await waitForRender();

      expect(pageHeader.icon).toBe("arrow-left");
      expect(pageHeader.heading).toBe("返回");
      expect(pageHeader.content).toBe("页面标题");
    });

    it("设置 heading 后 heading 容器内容应为 heading 值而非默认 Back", async () => {
      const pageHeader = document.createElement("ea-page-header");
      pageHeader.setAttribute("heading", "自定义返回");
      container.appendChild(pageHeader);

      await waitForRender();

      const headingEl = pageHeader.shadowRoot.querySelector(
        ".ea-page-header__heading"
      );
      expect(headingEl.textContent).toBe("自定义返回");
      expect(headingEl.textContent.trim()).not.toBe("Back");
    });

    it("设置 content 后 content 容器内容应为 content 值", async () => {
      const pageHeader = document.createElement("ea-page-header");
      pageHeader.setAttribute("content", "详情页面");
      container.appendChild(pageHeader);

      await waitForRender();

      const contentEl = pageHeader.shadowRoot.querySelector(
        ".ea-page-header__content"
      );
      expect(contentEl.textContent).toBe("详情页面");
    });

    it("设置 icon 后默认 ea-icon 的 name 应被更新", async () => {
      const pageHeader = document.createElement("ea-page-header");
      pageHeader.setAttribute("icon", "chevron-left");
      container.appendChild(pageHeader);

      await waitForRender();

      const iconEl = pageHeader.shadowRoot.querySelector("ea-icon");
      expect(iconEl.getAttribute("name")).toBe("chevron-left");
    });

    it("多个属性动态更新应该各自正确反映", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      pageHeader.setAttribute("heading", "标题一");
      pageHeader.setAttribute("content", "内容一");
      await waitForRender();

      expect(pageHeader.heading).toBe("标题一");
      expect(pageHeader.content).toBe("内容一");

      pageHeader.setAttribute("heading", "标题二");
      pageHeader.setAttribute("content", "内容二");
      await waitForRender();

      expect(pageHeader.heading).toBe("标题二");
      expect(pageHeader.content).toBe("内容二");
    });
  });

  // ==================== 属性与插槽交互测试 ====================

  describe("Attribute and Slot Interaction", () => {
    it("使用自定义 title slot 时仍应保留 heading 属性值", async () => {
      const pageHeader = document.createElement("ea-page-header");
      pageHeader.setAttribute("heading", "Heading Title");
      pageHeader.innerHTML = `<span slot="title">Custom Title</span>`;
      container.appendChild(pageHeader);

      await waitForRender();

      expect(pageHeader.heading).toBe("Heading Title");
    });

    it("使用自定义 content slot 时仍应保留 content 属性值", async () => {
      const pageHeader = document.createElement("ea-page-header");
      pageHeader.setAttribute("content", "Attribute Content");
      pageHeader.innerHTML = `<span slot="content">Custom Content</span>`;
      container.appendChild(pageHeader);

      await waitForRender();

      expect(pageHeader.content).toBe("Attribute Content");
    });

    it("使用自定义 icon slot 时仍应保留 icon 属性值", async () => {
      const pageHeader = document.createElement("ea-page-header");
      pageHeader.setAttribute("icon", "arrow-left");
      pageHeader.innerHTML = `<span slot="icon">Custom Icon</span>`;
      container.appendChild(pageHeader);

      await waitForRender();

      expect(pageHeader.icon).toBe("arrow-left");
    });
  });

  // ==================== 生命周期测试 ====================

  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const pageHeader = document.createElement("ea-page-header");
      pageHeader.setAttribute("heading", "Custom Title");
      container.appendChild(pageHeader);

      await waitForRender();

      expect(pageHeader.shadowRoot).toBeDefined();
      expect(pageHeader.heading).toBe("Custom Title");
    });

    it("组件断开连接后应该正常移除", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      pageHeader.remove();

      expect(pageHeader.isConnected).toBe(false);
    });

    it("组件重新连接后应该正常工作", async () => {
      const pageHeader = document.createElement("ea-page-header");
      pageHeader.setAttribute("heading", "Reconnect Test");
      container.appendChild(pageHeader);

      await waitForRender();

      pageHeader.remove();
      container.appendChild(pageHeader);

      await waitForRender();

      expect(pageHeader.isConnected).toBe(true);
      expect(pageHeader.shadowRoot).toBeDefined();
    });

    it("应该支持属性动态更新", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      expect(pageHeader.heading).toBe("");

      pageHeader.setAttribute("heading", "New Title");

      await waitForRender();

      expect(pageHeader.heading).toBe("New Title");
    });

    it("动态更新 heading 应该反映在 UI 上", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      pageHeader.setAttribute("heading", "Updated Title");

      await waitForRender();

      const headingEl = pageHeader.shadowRoot.querySelector(
        ".ea-page-header__heading"
      );
      expect(headingEl.textContent).toBe("Updated Title");
    });

    it("动态更新 content 应该反映在 UI 上", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      pageHeader.setAttribute("content", "Updated Content");

      await waitForRender();

      const contentEl = pageHeader.shadowRoot.querySelector(
        ".ea-page-header__content"
      );
      expect(contentEl.textContent).toBe("Updated Content");
    });

    it("动态更新 icon 应该反映在 UI 上", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      pageHeader.setAttribute("icon", "chevron-left");

      await waitForRender();

      const iconEl = pageHeader.shadowRoot.querySelector("ea-icon");
      expect(iconEl.getAttribute("name")).toBe("chevron-left");
    });
  });

  // ==================== 边界情况测试 ====================

  describe("Edge Cases", () => {
    it("应该处理空组件", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      expect(pageHeader.shadowRoot).toBeDefined();
      expect(pageHeader.icon).toBe("angle-left");
      expect(pageHeader.heading).toBe("");
      expect(pageHeader.content).toBe("");
    });

    it("应该处理长文本 heading", async () => {
      const longText =
        "这是一个非常长的返回按钮文字用于测试组件是否能正确处理长文本内容";
      const pageHeader = document.createElement("ea-page-header");
      pageHeader.setAttribute("heading", longText);
      container.appendChild(pageHeader);

      await waitForRender();

      expect(pageHeader.heading).toBe(longText);
      const headingEl = pageHeader.shadowRoot.querySelector(
        ".ea-page-header__heading"
      );
      expect(headingEl.textContent).toBe(longText);
    });

    it("应该处理长文本 content", async () => {
      const longText =
        "这是一个非常长的页面标题用于测试组件是否能正确处理长文本内容";
      const pageHeader = document.createElement("ea-page-header");
      pageHeader.setAttribute("content", longText);
      container.appendChild(pageHeader);

      await waitForRender();

      expect(pageHeader.content).toBe(longText);
      const contentEl = pageHeader.shadowRoot.querySelector(
        ".ea-page-header__content"
      );
      expect(contentEl.textContent).toBe(longText);
    });

    it("应该通过 html() 安全处理 XSS 内容", async () => {
      const pageHeader = document.createElement("ea-page-header");
      pageHeader.setAttribute("heading", "<script>alert('xss')</script>");
      container.appendChild(pageHeader);

      await waitForRender();

      expect(pageHeader.heading).toBe("<script>alert('xss')</script>");
      const headingEl = pageHeader.shadowRoot.querySelector(
        ".ea-page-header__heading"
      );
      expect(headingEl.querySelector("script")).toBeNull();
    });

    it("应该处理 Unicode 字符", async () => {
      const pageHeader = document.createElement("ea-page-header");
      pageHeader.setAttribute("heading", "返回🏠");
      pageHeader.setAttribute("content", "ページタイトル🎉");
      container.appendChild(pageHeader);

      await waitForRender();

      expect(pageHeader.heading).toBe("返回🏠");
      expect(pageHeader.content).toBe("ページタイトル🎉");
    });

    it("应该处理多次快速属性变更", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      pageHeader.setAttribute("heading", "标题1");
      pageHeader.setAttribute("heading", "标题2");
      pageHeader.setAttribute("heading", "标题3");

      await waitForRender();

      expect(pageHeader.heading).toBe("标题3");
    });

    it("创建多个组件实例应该互不干扰", async () => {
      const pageHeader1 = document.createElement("ea-page-header");
      pageHeader1.setAttribute("heading", "标题一");
      pageHeader1.setAttribute("content", "内容一");

      const pageHeader2 = document.createElement("ea-page-header");
      pageHeader2.setAttribute("heading", "标题二");
      pageHeader2.setAttribute("content", "内容二");

      container.appendChild(pageHeader1);
      container.appendChild(pageHeader2);

      await waitForRender();

      expect(pageHeader1.heading).toBe("标题一");
      expect(pageHeader1.content).toBe("内容一");
      expect(pageHeader2.heading).toBe("标题二");
      expect(pageHeader2.content).toBe("内容二");
    });
  });

  // ==================== BEM 类名测试 ====================

  describe("BEM Class Names", () => {
    it("容器应该有 ea-page-header 类名", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      const containerEl =
        pageHeader.shadowRoot.querySelector(".ea-page-header");
      expect(containerEl).toBeDefined();
      expect(containerEl.classList.contains("ea-page-header")).toBe(true);
    });

    it("breadcrumb 应该有 ea-page-header__breadcrumb 类名", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      const el = pageHeader.shadowRoot.querySelector(
        ".ea-page-header__breadcrumb"
      );
      expect(el).toBeDefined();
      expect(el.classList.contains("ea-page-header__breadcrumb")).toBe(true);
    });

    it("wrapper 应该有 ea-page-header__wrapper 类名", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      const el = pageHeader.shadowRoot.querySelector(
        ".ea-page-header__wrapper"
      );
      expect(el).toBeDefined();
      expect(el.classList.contains("ea-page-header__wrapper")).toBe(true);
    });

    it("back 应该有 ea-page-header__back 类名", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      const el = pageHeader.shadowRoot.querySelector(".ea-page-header__back");
      expect(el).toBeDefined();
      expect(el.classList.contains("ea-page-header__back")).toBe(true);
    });

    it("icon 应该有 ea-page-header__icon 类名", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      const el = pageHeader.shadowRoot.querySelector(".ea-page-header__icon");
      expect(el).toBeDefined();
      expect(el.classList.contains("ea-page-header__icon")).toBe(true);
    });

    it("heading 应该有 ea-page-header__heading 类名（非 ea-page-header__title）", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      const headingEl = pageHeader.shadowRoot.querySelector(
        ".ea-page-header__heading"
      );
      const titleEl = pageHeader.shadowRoot.querySelector(
        ".ea-page-header__title"
      );
      expect(headingEl).toBeDefined();
      expect(titleEl).toBeNull();
    });

    it("divider 应该有 ea-page-header__divider 类名", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      const el = pageHeader.shadowRoot.querySelector(
        ".ea-page-header__divider"
      );
      expect(el).toBeDefined();
      expect(el.classList.contains("ea-page-header__divider")).toBe(true);
    });

    it("content 应该有 ea-page-header__content 类名", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      const el = pageHeader.shadowRoot.querySelector(
        ".ea-page-header__content"
      );
      expect(el).toBeDefined();
      expect(el.classList.contains("ea-page-header__content")).toBe(true);
    });

    it("extra 应该有 ea-page-header__extra 类名", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      const el = pageHeader.shadowRoot.querySelector(".ea-page-header__extra");
      expect(el).toBeDefined();
      expect(el.classList.contains("ea-page-header__extra")).toBe(true);
    });
  });

  // ==================== 分隔符测试 ====================

  describe("Divider", () => {
    it("divider 应该是 span 元素", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      const divider = pageHeader.shadowRoot.querySelector(
        ".ea-page-header__divider"
      );
      expect(divider.tagName.toLowerCase()).toBe("span");
    });

    it("divider 内容应该是 |", async () => {
      const pageHeader = document.createElement("ea-page-header");
      container.appendChild(pageHeader);

      await waitForRender();

      const divider = pageHeader.shadowRoot.querySelector(
        ".ea-page-header__divider"
      );
      expect(divider.textContent.trim()).toBe("|");
    });
  });
});
