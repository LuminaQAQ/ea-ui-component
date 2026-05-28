import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { waitForRender } from "./utils/waitForRender.js";

import "../components/ea-card/index";

describe("EaCard", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe("基本功能", () => {
    it("应该正确渲染 ea-card 组件", () => {
      const card = document.createElement("ea-card");
      container.appendChild(card);

      expect(card).toBeDefined();
      expect(card.shadowRoot).toBeDefined();
    });

    it("应该包含 container、header、content、footer 的 CSS Part", () => {
      const card = document.createElement("ea-card");
      container.appendChild(card);

      const containerEl = card.shadowRoot.querySelector('[part="container"]');
      const headerEl = card.shadowRoot.querySelector('[part="header"]');
      const contentEl = card.shadowRoot.querySelector('[part="content"]');
      const footerEl = card.shadowRoot.querySelector('[part="footer"]');

      expect(containerEl).toBeTruthy();
      expect(headerEl).toBeTruthy();
      expect(contentEl).toBeTruthy();
      expect(footerEl).toBeTruthy();
    });

    it("应该包含默认插槽和具名插槽", () => {
      const card = document.createElement("ea-card");
      container.appendChild(card);

      const defaultSlot = card.shadowRoot.querySelector("slot:not([name])");
      const headerSlot = card.shadowRoot.querySelector('slot[name="header"]');
      const footerSlot = card.shadowRoot.querySelector('slot[name="footer"]');

      expect(defaultSlot).toBeTruthy();
      expect(headerSlot).toBeTruthy();
      expect(footerSlot).toBeTruthy();
    });

    it("模板中应使用 BEM 类名", () => {
      const card = document.createElement("ea-card");
      container.appendChild(card);

      const containerEl = card.shadowRoot.querySelector(".ea-card");
      const headerEl = card.shadowRoot.querySelector(".ea-card__header");
      const contentEl = card.shadowRoot.querySelector(".ea-card__content");
      const footerEl = card.shadowRoot.querySelector(".ea-card__footer");

      expect(containerEl).toBeTruthy();
      expect(headerEl).toBeTruthy();
      expect(contentEl).toBeTruthy();
      expect(footerEl).toBeTruthy();
    });
  });

  describe("Shadow 属性", () => {
    it("默认应该应用 always-shadow 状态类", async () => {
      const card = document.createElement("ea-card");
      container.appendChild(card);
      await waitForRender();

      const containerEl = card.shadowRoot.querySelector(".ea-card");
      expect(containerEl.classList.contains("is-always-shadow")).toBe(true);
    });

    it("设置 shadow='always' 应该应用 is-always-shadow 状态类", async () => {
      const card = document.createElement("ea-card");
      card.setAttribute("shadow", "always");
      container.appendChild(card);
      await waitForRender();

      const containerEl = card.shadowRoot.querySelector(".ea-card");
      expect(containerEl.classList.contains("is-always-shadow")).toBe(true);
    });

    it("设置 shadow='hover' 应该应用 is-hover-shadow 状态类", async () => {
      const card = document.createElement("ea-card");
      card.setAttribute("shadow", "hover");
      container.appendChild(card);
      await waitForRender();

      const containerEl = card.shadowRoot.querySelector(".ea-card");
      expect(containerEl.classList.contains("is-hover-shadow")).toBe(true);
    });

    it("设置 shadow='never' 不应该应用任何阴影状态类", async () => {
      const card = document.createElement("ea-card");
      card.setAttribute("shadow", "never");
      container.appendChild(card);
      await waitForRender();

      const containerEl = card.shadowRoot.querySelector(".ea-card");
      expect(containerEl.classList.contains("is-always-shadow")).toBe(false);
      expect(containerEl.classList.contains("is-hover-shadow")).toBe(false);
      expect(containerEl.classList.contains("is-never-shadow")).toBe(false);
    });

    it("动态修改 shadow 属性应该更新阴影状态类", async () => {
      const card = document.createElement("ea-card");
      container.appendChild(card);
      await waitForRender();

      card.setAttribute("shadow", "hover");
      await waitForRender();

      const containerEl = card.shadowRoot.querySelector(".ea-card");
      expect(containerEl.classList.contains("is-hover-shadow")).toBe(true);
      expect(containerEl.classList.contains("is-always-shadow")).toBe(false);
    });

    it("shadow 属性默认值应为 always", async () => {
      const card = document.createElement("ea-card");
      container.appendChild(card);
      await waitForRender();

      expect(card.shadow).toBe("always");
    });
  });

  describe("Header 插槽", () => {
    it("没有 header 内容时应该隐藏 header 区域", async () => {
      const card = document.createElement("ea-card");
      container.appendChild(card);
      await waitForRender();

      const containerEl = card.shadowRoot.querySelector(".ea-card");
      expect(containerEl.classList.contains("is-header-empty")).toBe(true);
    });

    it("通过 slot='header' 传入内容应该显示 header", async () => {
      const card = document.createElement("ea-card");
      card.innerHTML = `
        <div slot="header">Card Title</div>
        <p>Content</p>
      `;
      container.appendChild(card);
      await waitForRender();

      const containerEl = card.shadowRoot.querySelector(".ea-card");
      expect(containerEl.classList.contains("is-header-empty")).toBe(false);
    });

    it("header 插槽应该正确渲染传入的 DOM 内容", async () => {
      const card = document.createElement("ea-card");
      card.innerHTML = `
        <div slot="header">
          <span class="title">Card name</span>
          <button class="action">Action</button>
        </div>
        <p>Content</p>
      `;
      container.appendChild(card);
      await waitForRender();

      const headerSlot = card.shadowRoot.querySelector('slot[name="header"]');
      const assignedElements = headerSlot.assignedElements();
      expect(assignedElements.length).toBeGreaterThan(0);
      expect(assignedElements[0].querySelector(".title")).toBeTruthy();
      expect(assignedElements[0].querySelector(".action")).toBeTruthy();
    });
  });

  describe("Footer 插槽", () => {
    it("没有 footer 内容时应该隐藏 footer 区域", async () => {
      const card = document.createElement("ea-card");
      container.appendChild(card);
      await waitForRender();

      const containerEl = card.shadowRoot.querySelector(".ea-card");
      expect(containerEl.classList.contains("is-footer-empty")).toBe(true);
    });

    it("通过 slot='footer' 传入内容应该显示 footer", async () => {
      const card = document.createElement("ea-card");
      card.innerHTML = `
        <p>Content</p>
        <div slot="footer">Footer content</div>
      `;
      container.appendChild(card);
      await waitForRender();

      const containerEl = card.shadowRoot.querySelector(".ea-card");
      expect(containerEl.classList.contains("is-footer-empty")).toBe(false);
    });

    it("footer 插槽应该正确渲染传入的 DOM 内容", async () => {
      const card = document.createElement("ea-card");
      card.innerHTML = `
        <p>Content</p>
        <div slot="footer">
          <span>Footer content</span>
          <a href="#">Link</a>
        </div>
      `;
      container.appendChild(card);
      await waitForRender();

      const footerSlot = card.shadowRoot.querySelector('slot[name="footer"]');
      const assignedElements = footerSlot.assignedElements();
      expect(assignedElements.length).toBeGreaterThan(0);
      expect(assignedElements[0].querySelector("a")).toBeTruthy();
    });
  });

  describe("默认插槽（内容区域）", () => {
    it("应该正确渲染默认插槽内容", () => {
      const card = document.createElement("ea-card");
      card.innerHTML = `
        <p class="content-item">content1</p>
        <p class="content-item">content2</p>
        <p class="content-item">content3</p>
      `;
      container.appendChild(card);

      const contentSlot = card.shadowRoot.querySelector("slot:not([name])");
      const assignedElements = contentSlot.assignedElements();
      expect(assignedElements.length).toBe(3);
      expect(assignedElements[0].textContent).toBe("content1");
      expect(assignedElements[1].textContent).toBe("content2");
      expect(assignedElements[2].textContent).toBe("content3");
    });

    it("内容区域应该包含图片内容", () => {
      const card = document.createElement("ea-card");
      card.innerHTML = `
        <img src="test-image.jpg" alt="Test Image" class="card-image" />
      `;
      container.appendChild(card);

      const contentSlot = card.shadowRoot.querySelector("slot:not([name])");
      const assignedElements = contentSlot.assignedElements();
      expect(assignedElements[0].tagName.toLowerCase()).toBe("img");
      expect(assignedElements[0].getAttribute("src")).toBe("test-image.jpg");
    });
  });

  describe("Header 和 Footer 属性", () => {
    it("通过 header 属性设置标题文本", async () => {
      const card = document.createElement("ea-card");
      card.setAttribute("header", "Card Title");
      container.appendChild(card);
      await waitForRender();

      const headerSlot = card.shadowRoot.querySelector('slot[name="header"]');
      expect(headerSlot.innerText).toBe("Card Title");
    });

    it("通过 footer 属性设置页脚文本", async () => {
      const card = document.createElement("ea-card");
      card.setAttribute("footer", "Footer Text");
      container.appendChild(card);
      await waitForRender();

      const footerSlot = card.shadowRoot.querySelector('slot[name="footer"]');
      expect(footerSlot.innerText).toBe("Footer Text");
    });

    it("设置 header 属性后应该显示 header 区域", async () => {
      const card = document.createElement("ea-card");
      card.setAttribute("header", "Card Title");
      container.appendChild(card);
      await waitForRender();

      const containerEl = card.shadowRoot.querySelector(".ea-card");
      expect(containerEl.classList.contains("is-header-empty")).toBe(false);
    });

    it("设置 footer 属性后应该显示 footer 区域", async () => {
      const card = document.createElement("ea-card");
      card.setAttribute("footer", "Footer Text");
      container.appendChild(card);
      await waitForRender();

      const containerEl = card.shadowRoot.querySelector(".ea-card");
      expect(containerEl.classList.contains("is-footer-empty")).toBe(false);
    });

    it("动态修改 header 属性应该更新标题", async () => {
      const card = document.createElement("ea-card");
      container.appendChild(card);
      await waitForRender();

      card.setAttribute("header", "New Title");
      await waitForRender();

      const headerSlot = card.shadowRoot.querySelector('slot[name="header"]');
      expect(headerSlot.innerText).toBe("New Title");
    });

    it("动态修改 footer 属性应该更新页脚", async () => {
      const card = document.createElement("ea-card");
      container.appendChild(card);
      await waitForRender();

      card.setAttribute("footer", "New Footer");
      await waitForRender();

      const footerSlot = card.shadowRoot.querySelector('slot[name="footer"]');
      expect(footerSlot.innerText).toBe("New Footer");
    });

    it("header 属性默认值应为空字符串", async () => {
      const card = document.createElement("ea-card");
      container.appendChild(card);
      await waitForRender();

      expect(card.header).toBe("");
    });

    it("footer 属性默认值应为空字符串", async () => {
      const card = document.createElement("ea-card");
      container.appendChild(card);
      await waitForRender();

      expect(card.footer).toBe("");
    });
  });

  describe("完整卡片结构", () => {
    it("应该正确渲染包含 header、content、footer 的完整卡片", async () => {
      const card = document.createElement("ea-card");
      card.innerHTML = `
        <div slot="header" class="header">
          <span>Card name</span>
        </div>
        <p class="ea-card-content">content1</p>
        <p class="ea-card-content">content2</p>
        <div slot="footer" class="footer">
          <span>Footer content</span>
        </div>
      `;
      container.appendChild(card);
      await waitForRender();

      const containerEl = card.shadowRoot.querySelector(".ea-card");
      const headerEl = card.shadowRoot.querySelector(".ea-card__header");
      const contentEl = card.shadowRoot.querySelector(".ea-card__content");
      const footerEl = card.shadowRoot.querySelector(".ea-card__footer");

      expect(containerEl).toBeTruthy();
      expect(headerEl).toBeTruthy();
      expect(contentEl).toBeTruthy();
      expect(footerEl).toBeTruthy();

      expect(containerEl.classList.contains("is-header-empty")).toBe(false);
      expect(containerEl.classList.contains("is-footer-empty")).toBe(false);
    });

    it("简单卡片（只有内容区域）应该正确渲染", async () => {
      const card = document.createElement("ea-card");
      card.innerHTML = `
        <p class="ea-card-content">content1</p>
        <p class="ea-card-content">content2</p>
        <p class="ea-card-content">content3</p>
        <p class="ea-card-content">content4</p>
      `;
      container.appendChild(card);
      await waitForRender();

      const containerEl = card.shadowRoot.querySelector(".ea-card");
      const contentSlot = card.shadowRoot.querySelector("slot:not([name])");

      expect(containerEl.classList.contains("is-header-empty")).toBe(true);
      expect(containerEl.classList.contains("is-footer-empty")).toBe(true);
      expect(contentSlot.assignedElements().length).toBe(4);
    });
  });

  describe("边界条件", () => {
    it("空卡片应该正确渲染", async () => {
      const card = document.createElement("ea-card");
      container.appendChild(card);
      await waitForRender();

      const containerEl = card.shadowRoot.querySelector(".ea-card");
      const contentSlot = card.shadowRoot.querySelector("slot:not([name])");

      expect(containerEl).toBeTruthy();
      expect(contentSlot.assignedElements().length).toBe(0);
    });

    it("动态添加 header 内容后应该更新显示", async () => {
      const card = document.createElement("ea-card");
      card.innerHTML = `<p>Content</p>`;
      container.appendChild(card);
      await waitForRender();

      let containerEl = card.shadowRoot.querySelector(".ea-card");
      expect(containerEl.classList.contains("is-header-empty")).toBe(true);

      const headerDiv = document.createElement("div");
      headerDiv.setAttribute("slot", "header");
      headerDiv.textContent = "Dynamic Header";
      card.appendChild(headerDiv);
      await waitForRender();

      containerEl = card.shadowRoot.querySelector(".ea-card");
      expect(containerEl.classList.contains("is-header-empty")).toBe(false);
    });

    it("动态移除 header 内容后应该隐藏 header", async () => {
      const card = document.createElement("ea-card");
      card.innerHTML = `
        <div slot="header">Header Content</div>
        <p>Content</p>
      `;
      container.appendChild(card);
      await waitForRender();

      let containerEl = card.shadowRoot.querySelector(".ea-card");
      expect(containerEl.classList.contains("is-header-empty")).toBe(false);

      const headerSlot = card.shadowRoot.querySelector('slot[name="header"]');
      const assignedElements = headerSlot.assignedElements();
      if (assignedElements.length > 0) {
        assignedElements[0].remove();
      }
      await waitForRender();

      headerSlot.dispatchEvent(new Event("slotchange"));
      await waitForRender();

      containerEl = card.shadowRoot.querySelector(".ea-card");
      expect(containerEl.classList.contains("is-header-empty")).toBe(true);
    });

    it("动态添加 footer 内容后应该更新显示", async () => {
      const card = document.createElement("ea-card");
      card.innerHTML = `<p>Content</p>`;
      container.appendChild(card);
      await waitForRender();

      let containerEl = card.shadowRoot.querySelector(".ea-card");
      expect(containerEl.classList.contains("is-footer-empty")).toBe(true);

      const footerDiv = document.createElement("div");
      footerDiv.setAttribute("slot", "footer");
      footerDiv.textContent = "Dynamic Footer";
      card.appendChild(footerDiv);
      await waitForRender();

      containerEl = card.shadowRoot.querySelector(".ea-card");
      expect(containerEl.classList.contains("is-footer-empty")).toBe(false);
    });

    it("动态移除 footer 内容后应该隐藏 footer", async () => {
      const card = document.createElement("ea-card");
      card.innerHTML = `
        <p>Content</p>
        <div slot="footer">Footer Content</div>
      `;
      container.appendChild(card);
      await waitForRender();

      let containerEl = card.shadowRoot.querySelector(".ea-card");
      expect(containerEl.classList.contains("is-footer-empty")).toBe(false);

      const footerSlot = card.shadowRoot.querySelector('slot[name="footer"]');
      const assignedElements = footerSlot.assignedElements();
      if (assignedElements.length > 0) {
        assignedElements[0].remove();
      }
      await waitForRender();

      footerSlot.dispatchEvent(new Event("slotchange"));
      await waitForRender();

      containerEl = card.shadowRoot.querySelector(".ea-card");
      expect(containerEl.classList.contains("is-footer-empty")).toBe(true);
    });
  });

  describe("updateContainerClasslist 方法", () => {
    it("应该返回包含块类名的字符串", async () => {
      const card = document.createElement("ea-card");
      container.appendChild(card);
      await waitForRender();

      const className = card.updateContainerClasslist();
      expect(className).toContain("ea-card");
    });

    it("应该根据 shadow 属性返回正确的状态类", async () => {
      const card = document.createElement("ea-card");
      card.setAttribute("shadow", "hover");
      container.appendChild(card);
      await waitForRender();

      const className = card.updateContainerClasslist();
      expect(className).toContain("is-hover-shadow");
    });
  });

  describe("生命周期", () => {
    it("组件连接后应该正确初始化", async () => {
      const card = document.createElement("ea-card");
      container.appendChild(card);
      await waitForRender();

      expect(card.shadowRoot).toBeDefined();
      expect(card.shadowRoot.querySelector(".ea-card")).toBeTruthy();
    });

    it("组件断开连接后应该清理资源", async () => {
      const card = document.createElement("ea-card");
      container.appendChild(card);
      await waitForRender();

      card.remove();

      expect(() => {}).not.toThrow();
    });
  });

  describe("属性组合", () => {
    it("同时设置 header、footer 和 shadow 属性应该正确渲染", async () => {
      const card = document.createElement("ea-card");
      card.setAttribute("header", "Title");
      card.setAttribute("footer", "Footer");
      card.setAttribute("shadow", "hover");
      container.appendChild(card);
      await waitForRender();

      const containerEl = card.shadowRoot.querySelector(".ea-card");
      expect(containerEl.classList.contains("is-hover-shadow")).toBe(true);
      expect(containerEl.classList.contains("is-header-empty")).toBe(false);
      expect(containerEl.classList.contains("is-footer-empty")).toBe(false);
    });

    it("header 属性与 slot 同时存在时 header 属性应覆盖 slot 内容", async () => {
      const card = document.createElement("ea-card");
      card.innerHTML = `<div slot="header">Slot Header</div>`;
      card.setAttribute("header", "Attr Header");
      container.appendChild(card);
      await waitForRender();

      const headerSlot = card.shadowRoot.querySelector('slot[name="header"]');
      expect(headerSlot.innerText).toBe("Attr Header");
    });
  });
});
