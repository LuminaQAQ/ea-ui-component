import { describe, it, expect, beforeEach, afterEach } from "vitest";

import { runAxe, assertNoA11yViolations } from "./utils/a11y";

import "../components/ea-text/index.ts";

describe("EaText", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe("基本功能", () => {
    it("应该正确渲染组件", () => {
      const text = document.createElement("ea-text");
      text.textContent = "Hello World";
      container.appendChild(text);

      expect(text).toBeDefined();
      expect(text.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", () => {
      const text = document.createElement("ea-text");
      text.textContent = "Hello World";
      container.appendChild(text);

      expect(text.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("应该包含默认插槽", () => {
      const text = document.createElement("ea-text");
      text.textContent = "Slot Content";
      container.appendChild(text);

      const slot = text.shadowRoot.querySelector("slot");
      expect(slot).toBeTruthy();
    });

    it("默认标签应为 span", () => {
      const text = document.createElement("ea-text");
      text.textContent = "Default Tag";
      container.appendChild(text);

      const containerEl = text.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.tagName.toLowerCase()).toBe("span");
    });
  });

  describe("Variant 属性", () => {
    it("默认 variant 应该是 normal", () => {
      const text = document.createElement("ea-text");
      text.textContent = "Default";
      container.appendChild(text);

      expect(text.variant).toBe("normal");
    });

    it("应该支持 variant='primary'", () => {
      const text = document.createElement("ea-text");
      text.setAttribute("variant", "primary");
      text.textContent = "Primary";
      container.appendChild(text);

      expect(text.variant).toBe("primary");
    });

    it("应该支持 variant='success'", () => {
      const text = document.createElement("ea-text");
      text.setAttribute("variant", "success");
      text.textContent = "Success";
      container.appendChild(text);

      expect(text.variant).toBe("success");
    });

    it("应该支持 variant='info'", () => {
      const text = document.createElement("ea-text");
      text.setAttribute("variant", "info");
      text.textContent = "Info";
      container.appendChild(text);

      expect(text.variant).toBe("info");
    });

    it("应该支持 variant='warning'", () => {
      const text = document.createElement("ea-text");
      text.setAttribute("variant", "warning");
      text.textContent = "Warning";
      container.appendChild(text);

      expect(text.variant).toBe("warning");
    });

    it("应该支持 variant='danger'", () => {
      const text = document.createElement("ea-text");
      text.setAttribute("variant", "danger");
      text.textContent = "Danger";
      container.appendChild(text);

      expect(text.variant).toBe("danger");
    });

    it("variant 变化时应该更新 CSS 类名", () => {
      const text = document.createElement("ea-text");
      text.setAttribute("variant", "primary");
      text.textContent = "Primary";
      container.appendChild(text);

      const containerEl = text.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-text--primary")).toBe(true);
    });

    it("动态修改 variant 应该生效", async () => {
      const text = document.createElement("ea-text");
      text.setAttribute("variant", "normal");
      text.textContent = "Variant Test";
      container.appendChild(text);

      await text.updateComplete;

      text.setAttribute("variant", "danger");
      await text.updateComplete;

      expect(text.variant).toBe("danger");
      const containerEl = text.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-text--danger")).toBe(true);
      expect(containerEl.classList.contains("ea-text--normal")).toBe(false);
    });
  });

  describe("Size 属性", () => {
    it("默认 size 应该是 medium", () => {
      const text = document.createElement("ea-text");
      text.textContent = "Default";
      container.appendChild(text);

      expect(text.size).toBe("medium");
    });

    it("应该支持 size='large'", () => {
      const text = document.createElement("ea-text");
      text.setAttribute("size", "large");
      text.textContent = "Large";
      container.appendChild(text);

      expect(text.size).toBe("large");
    });

    it("应该支持 size='small'", () => {
      const text = document.createElement("ea-text");
      text.setAttribute("size", "small");
      text.textContent = "Small";
      container.appendChild(text);

      expect(text.size).toBe("small");
    });

    it("size 变化时应该更新 CSS 类名", () => {
      const text = document.createElement("ea-text");
      text.setAttribute("size", "large");
      text.textContent = "Large";
      container.appendChild(text);

      const containerEl = text.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-text--large")).toBe(true);
    });

    it("动态修改 size 应该生效", async () => {
      const text = document.createElement("ea-text");
      text.setAttribute("size", "medium");
      text.textContent = "Size Test";
      container.appendChild(text);

      await text.updateComplete;

      text.setAttribute("size", "large");
      await text.updateComplete;

      expect(text.size).toBe("large");
      const containerEl = text.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-text--large")).toBe(true);
      expect(containerEl.classList.contains("ea-text--medium")).toBe(false);
    });
  });

  describe("Truncated 属性", () => {
    it("默认 truncated 应该是 false", () => {
      const text = document.createElement("ea-text");
      text.textContent = "Default";
      container.appendChild(text);

      expect(text.truncated).toBe(false);
    });

    it("设置 truncated 应该添加截断修饰符类", () => {
      const text = document.createElement("ea-text");
      text.setAttribute("truncated", "");
      text.textContent = "This is a very long text that should be truncated";
      container.appendChild(text);

      expect(text.truncated).toBe(true);
      const containerEl = text.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-text--truncated")).toBe(true);
    });

    it("truncated 为 false 时不应有截断修饰符类", () => {
      const text = document.createElement("ea-text");
      text.textContent = "Test text";
      container.appendChild(text);

      const containerEl = text.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-text--truncated")).toBe(false);
    });

    it("动态设置 truncated 应该生效", async () => {
      const text = document.createElement("ea-text");
      text.textContent = "Truncated Test";
      container.appendChild(text);

      await text.updateComplete;

      text.setAttribute("truncated", "");
      await text.updateComplete;

      expect(text.truncated).toBe(true);
      const containerEl = text.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-text--truncated")).toBe(true);
    });

    it("truncated 启用时应自动设置容器 title", async () => {
      const text = document.createElement("ea-text");
      text.setAttribute("truncated", "");
      text.textContent = "Long text content";
      container.appendChild(text);

      await text.updateComplete;

      const containerEl = text.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.title).toBe("Long text content");
    });

    it("truncated 未启用时不应自动设置容器 title", async () => {
      const text = document.createElement("ea-text");
      text.textContent = "Normal text";
      container.appendChild(text);

      await text.updateComplete;

      const containerEl = text.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.title).toBe("");
    });
  });

  describe("Line-clamp 属性", () => {
    it("默认 lineClamp 应该是 0", () => {
      const text = document.createElement("ea-text");
      text.textContent = "Default";
      container.appendChild(text);

      expect(text.lineClamp).toBe(0);
    });

    it("应该支持 lineClamp 属性", () => {
      const text = document.createElement("ea-text");
      text.setAttribute("line-clamp", "2");
      text.textContent = "Line 1 Line 2 Line 3";
      container.appendChild(text);

      expect(text.lineClamp).toBe(2);
    });

    it("lineClamp 大于 0 时应该添加 line-clamp 修饰符类", () => {
      const text = document.createElement("ea-text");
      text.setAttribute("line-clamp", "2");
      text.textContent = "Test text";
      container.appendChild(text);

      const containerEl = text.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-text--line-clamp")).toBe(true);
    });

    it("lineClamp 为 0 时不应有 line-clamp 修饰符类", () => {
      const text = document.createElement("ea-text");
      text.textContent = "Test text";
      container.appendChild(text);

      const containerEl = text.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-text--line-clamp")).toBe(false);
    });

    it("lineClamp 大于 0 时应该设置 CSS 自定义属性", async () => {
      const text = document.createElement("ea-text");
      text.setAttribute("line-clamp", "3");
      text.textContent = "Test text";
      container.appendChild(text);

      await text.updateComplete;

      expect(text.style.getPropertyValue("--ea-text-line-clamp")).toBe("3");
    });

    it("lineClamp 启用时应自动设置容器 title", async () => {
      const text = document.createElement("ea-text");
      text.setAttribute("line-clamp", "2");
      text.textContent = "Multi line text";
      container.appendChild(text);

      await text.updateComplete;

      const containerEl = text.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.title).toBe("Multi line text");
    });

    it("动态设置 lineClamp 应该生效", async () => {
      const text = document.createElement("ea-text");
      text.textContent = "Line Clamp Test";
      container.appendChild(text);

      await text.updateComplete;

      text.setAttribute("line-clamp", "3");
      await text.updateComplete;

      expect(text.lineClamp).toBe(3);
      const containerEl = text.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-text--line-clamp")).toBe(true);
    });
  });

  describe("Tag 属性", () => {
    it("默认 tag 应该是 span", () => {
      const text = document.createElement("ea-text");
      text.textContent = "Default";
      container.appendChild(text);

      expect(text.tag).toBe("span");
    });

    it("应该支持 tag='p'", () => {
      const text = document.createElement("ea-text");
      text.setAttribute("tag", "p");
      text.textContent = "Paragraph";
      container.appendChild(text);

      expect(text.tag).toBe("p");
      const containerEl = text.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.tagName.toLowerCase()).toBe("p");
    });

    it("应该支持 tag='b'", () => {
      const text = document.createElement("ea-text");
      text.setAttribute("tag", "b");
      text.textContent = "Bold";
      container.appendChild(text);

      expect(text.tag).toBe("b");
      const containerEl = text.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.tagName.toLowerCase()).toBe("b");
    });

    it("应该支持 tag='i'", () => {
      const text = document.createElement("ea-text");
      text.setAttribute("tag", "i");
      text.textContent = "Italic";
      container.appendChild(text);

      expect(text.tag).toBe("i");
    });

    it("应该支持 tag='sub'", () => {
      const text = document.createElement("ea-text");
      text.setAttribute("tag", "sub");
      text.textContent = "Subscript";
      container.appendChild(text);

      expect(text.tag).toBe("sub");
    });

    it("应该支持 tag='sup'", () => {
      const text = document.createElement("ea-text");
      text.setAttribute("tag", "sup");
      text.textContent = "Superscript";
      container.appendChild(text);

      expect(text.tag).toBe("sup");
    });

    it("应该支持 tag='ins'", () => {
      const text = document.createElement("ea-text");
      text.setAttribute("tag", "ins");
      text.textContent = "Inserted";
      container.appendChild(text);

      expect(text.tag).toBe("ins");
    });

    it("应该支持 tag='del'", () => {
      const text = document.createElement("ea-text");
      text.setAttribute("tag", "del");
      text.textContent = "Deleted";
      container.appendChild(text);

      expect(text.tag).toBe("del");
    });

    it("应该支持 tag='mark'", () => {
      const text = document.createElement("ea-text");
      text.setAttribute("tag", "mark");
      text.textContent = "Marked";
      container.appendChild(text);

      expect(text.tag).toBe("mark");
    });

    it("动态修改 tag 应该重新渲染", async () => {
      const text = document.createElement("ea-text");
      text.textContent = "Tag Test";
      container.appendChild(text);

      await text.updateComplete;

      text.setAttribute("tag", "p");
      await text.updateComplete;

      expect(text.tag).toBe("p");
      const containerEl = text.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.tagName.toLowerCase()).toBe("p");
    });
  });

  describe("组合测试", () => {
    it("应该同时支持 variant 和 size 属性", () => {
      const text = document.createElement("ea-text");
      text.setAttribute("variant", "primary");
      text.setAttribute("size", "large");
      text.textContent = "Primary Large";
      container.appendChild(text);

      expect(text.variant).toBe("primary");
      expect(text.size).toBe("large");
      const containerEl = text.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-text--primary")).toBe(true);
      expect(containerEl.classList.contains("ea-text--large")).toBe(true);
    });

    it("应该同时支持 truncated 和 tag 属性", () => {
      const text = document.createElement("ea-text");
      text.setAttribute("truncated", "");
      text.setAttribute("tag", "p");
      text.textContent = "Truncated paragraph";
      container.appendChild(text);

      expect(text.truncated).toBe(true);
      expect(text.tag).toBe("p");
      const containerEl = text.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-text--truncated")).toBe(true);
      expect(containerEl.tagName.toLowerCase()).toBe("p");
    });

    it("应该同时支持 lineClamp 和 tag 属性", () => {
      const text = document.createElement("ea-text");
      text.setAttribute("line-clamp", "3");
      text.setAttribute("tag", "p");
      text.textContent = "Multi line text";
      container.appendChild(text);

      expect(text.lineClamp).toBe(3);
      expect(text.tag).toBe("p");
    });

    it("应该同时支持 variant、size、truncated 属性", () => {
      const text = document.createElement("ea-text");
      text.setAttribute("variant", "danger");
      text.setAttribute("size", "small");
      text.setAttribute("truncated", "");
      text.textContent = "Combined";
      container.appendChild(text);

      const containerEl = text.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-text--danger")).toBe(true);
      expect(containerEl.classList.contains("ea-text--small")).toBe(true);
      expect(containerEl.classList.contains("ea-text--truncated")).toBe(true);
    });
  });

  describe("嵌套组件", () => {
    it("应该支持嵌套 ea-text 组件", () => {
      const parent = document.createElement("ea-text");
      parent.textContent = "This is ";

      const child = document.createElement("ea-text");
      child.setAttribute("tag", "sub");
      child.setAttribute("size", "small");
      child.textContent = "subscript";

      parent.appendChild(child);
      container.appendChild(parent);

      expect(parent.textContent).toContain("subscript");
    });
  });

  describe("边界条件", () => {
    it("空文本应该正常渲染", () => {
      const text = document.createElement("ea-text");
      container.appendChild(text);

      expect(text).toBeDefined();
      expect(text.shadowRoot).toBeDefined();
    });

    it("特殊字符应该正常渲染", () => {
      const text = document.createElement("ea-text");
      text.textContent = "<script>alert('xss')</script>";
      container.appendChild(text);

      expect(text.textContent).toBe("<script>alert('xss')</script>");
    });

    it("长文本应该正常渲染", () => {
      const text = document.createElement("ea-text");
      text.textContent = "a".repeat(1000);
      container.appendChild(text);

      expect(text.textContent.length).toBe(1000);
    });

    it("多个 ea-text 应该独立工作", () => {
      const text1 = document.createElement("ea-text");
      text1.setAttribute("variant", "primary");
      text1.textContent = "Text 1";

      const text2 = document.createElement("ea-text");
      text2.setAttribute("variant", "success");
      text2.textContent = "Text 2";

      container.appendChild(text1);
      container.appendChild(text2);

      expect(text1.variant).toBe("primary");
      expect(text2.variant).toBe("success");
      expect(text1.textContent).toBe("Text 1");
      expect(text2.textContent).toBe("Text 2");
    });
  });

  describe("生命周期", () => {
    it("组件连接后应该正确初始化", () => {
      const text = document.createElement("ea-text");
      text.textContent = "Lifecycle Test";
      container.appendChild(text);

      expect(text.shadowRoot).toBeDefined();
      expect(text.shadowRoot.querySelector(".ea-text")).toBeTruthy();
    });

    it("组件断开连接后应该正常移除", () => {
      const text = document.createElement("ea-text");
      text.textContent = "Remove Test";
      container.appendChild(text);

      text.remove();

      expect(container.contains(text)).toBe(false);
    });
  });

  describe("Accessibility", () => {
    describe("ARIA Attributes", () => {
      it("作为展示组件不需要特定 ARIA 属性", () => {
        const el = document.createElement("ea-text");
        container.appendChild(el);
        expect(el.getAttribute("role")).toBeNull();
      });
    });

    it("默认状态应该无 a11y 违规", async () => {
      const el = document.createElement("ea-text");
      container.appendChild(el);
      await el.updateComplete;
      const results = await runAxe(el);
      assertNoA11yViolations(results);
    });
  });
});
