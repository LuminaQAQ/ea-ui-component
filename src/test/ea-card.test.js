import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// 模拟 ea-card 组件
class EaCard extends HTMLElement {
  #container;
  #header;
  #footer;
  #abortController = null;

  #states = {
    isHeaderEmpty: true,
    isFooterEmpty: true,
  };

  static get observedAttributes() {
    return ["shadow", "header", "footer"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        .ea-card {
          border-radius: 4px;
          border: 1px solid #ebeef5;
          background-color: #fff;
          overflow: hidden;
          color: #303133;
          transition: all 0.3s;
        }
        .ea-card.--always-shadow {
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }
        .ea-card.--hover-shadow:hover {
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }
        .ea-card__header {
          padding: 18px 20px;
          border-bottom: 1px solid #ebeef5;
          box-sizing: border-box;
        }
        .ea-card__header.header-empty {
          display: none;
        }
        .ea-card__content {
          padding: 20px;
        }
        .ea-card__footer {
          padding: 10px 20px;
          border-top: 1px solid #ebeef5;
          box-sizing: border-box;
        }
        .ea-card__footer.footer-empty {
          display: none;
        }
      </style>
      <div class="ea-card" part="container">
        <div class="ea-card__header" part="header">
          <slot name="header"></slot>
        </div>
        <div class="ea-card__content" part="content">
          <slot></slot>
        </div>
        <div class="ea-card__footer" part="footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-card");
    this.#header = this.shadowRoot.querySelector(
      ".ea-card__header > slot[name='header']"
    );
    this.#footer = this.shadowRoot.querySelector(
      ".ea-card__footer > slot[name='footer']"
    );

    this.updateContainerClasslist();
  }

  connectedCallback() {
    this.#abortController?.abort();
    this.#abortController = new AbortController();

    this.#header.addEventListener("slotchange", this.#updateEmptyStatus, {
      signal: this.#abortController.signal,
    });

    this.#footer.addEventListener("slotchange", this.#updateEmptyStatus, {
      signal: this.#abortController.signal,
    });

    // 初始检查插槽内容（用于 JSDOM 环境）
    this.#checkInitialSlotContent();
  }

  #checkInitialSlotContent() {
    // 检查 header 插槽
    const headerElements = this.#header.assignedElements?.() || [];
    this.#states.isHeaderEmpty = headerElements.length === 0;

    // 检查 footer 插槽
    const footerElements = this.#footer.assignedElements?.() || [];
    this.#states.isFooterEmpty = footerElements.length === 0;

    this.updateContainerClasslist();
  }

  disconnectedCallback() {
    this.#abortController?.abort();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch (name) {
      case "shadow":
        this.updateContainerClasslist();
        break;
      case "header":
        if (newValue) {
          this.#states.isHeaderEmpty = false;
          this.updateContainerClasslist();
        }
        break;
      case "footer":
        if (newValue) {
          this.#states.isFooterEmpty = false;
          this.updateContainerClasslist();
        }
        break;
    }
  }

  #updateEmptyStatus = e => {
    const target = e.target;
    let name = target.getAttribute("name") || "";
    name = name
      .split("")
      .map((item, index) =>
        index === 0 ? item.toUpperCase() : item.toLowerCase()
      )
      .join("");

    const isEmpty = target.assignedElements().length === 0;
    this.#states[`is${name}Empty`] = isEmpty;

    this.updateContainerClasslist();
  };

  updateContainerClasslist() {
    let className = "ea-card";

    // 添加阴影类
    const shadow = this.getAttribute("shadow") || "always";
    if (shadow === "always") {
      className += " --always-shadow";
    } else if (shadow === "hover") {
      className += " --hover-shadow";
    }

    this.#container.className = className;

    // 更新 header 和 footer 的空状态类
    const headerContainer = this.shadowRoot.querySelector(".ea-card__header");
    const footerContainer = this.shadowRoot.querySelector(".ea-card__footer");

    if (headerContainer) {
      if (this.#states.isHeaderEmpty) {
        headerContainer.classList.add("header-empty");
      } else {
        headerContainer.classList.remove("header-empty");
      }
    }

    if (footerContainer) {
      if (this.#states.isFooterEmpty) {
        footerContainer.classList.add("footer-empty");
      } else {
        footerContainer.classList.remove("footer-empty");
      }
    }

    return className;
  }

  get shadow() {
    return this.getAttribute("shadow") || "always";
  }

  set shadow(value) {
    this.setAttribute("shadow", value);
  }
}

if (!customElements.get("ea-card")) {
  customElements.define("ea-card", EaCard);
}

describe("EaCard Component", () => {
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
  });

  /**
   * Shadow 属性测试
   */
  describe("Shadow Attribute", () => {
    it("默认应该应用 always 阴影", () => {
      const card = document.createElement("ea-card");
      container.appendChild(card);

      const containerEl = card.shadowRoot.querySelector(".ea-card");
      expect(containerEl.classList.contains("--always-shadow")).toBe(true);
    });

    it("设置 shadow='always' 应该应用 always 阴影类", () => {
      const card = document.createElement("ea-card");
      card.setAttribute("shadow", "always");
      container.appendChild(card);

      const containerEl = card.shadowRoot.querySelector(".ea-card");
      expect(containerEl.classList.contains("--always-shadow")).toBe(true);
    });

    it("设置 shadow='hover' 应该应用 hover 阴影类", () => {
      const card = document.createElement("ea-card");
      card.setAttribute("shadow", "hover");
      container.appendChild(card);

      const containerEl = card.shadowRoot.querySelector(".ea-card");
      expect(containerEl.classList.contains("--hover-shadow")).toBe(true);
    });

    it("设置 shadow='never' 不应该应用任何阴影类", () => {
      const card = document.createElement("ea-card");
      card.setAttribute("shadow", "never");
      container.appendChild(card);

      const containerEl = card.shadowRoot.querySelector(".ea-card");
      expect(containerEl.classList.contains("--always-shadow")).toBe(false);
      expect(containerEl.classList.contains("--hover-shadow")).toBe(false);
    });

    it("动态修改 shadow 属性应该更新阴影类", async () => {
      const card = document.createElement("ea-card");
      container.appendChild(card);

      card.setAttribute("shadow", "hover");
      await new Promise(resolve => setTimeout(resolve, 0));

      const containerEl = card.shadowRoot.querySelector(".ea-card");
      expect(containerEl.classList.contains("--hover-shadow")).toBe(true);
      expect(containerEl.classList.contains("--always-shadow")).toBe(false);
    });
  });

  /**
   * Header 插槽测试
   */
  describe("Header Slot", () => {
    it("没有 header 内容时应该隐藏 header 区域", () => {
      const card = document.createElement("ea-card");
      container.appendChild(card);

      const headerEl = card.shadowRoot.querySelector(".ea-card__header");
      expect(headerEl.classList.contains("header-empty")).toBe(true);
    });

    it("通过 slot='header' 传入内容应该显示 header", async () => {
      const card = document.createElement("ea-card");
      card.innerHTML = `
        <div slot="header">Card Title</div>
        <p>Content</p>
      `;
      container.appendChild(card);

      await new Promise(resolve => setTimeout(resolve, 50));

      const headerEl = card.shadowRoot.querySelector(".ea-card__header");
      expect(headerEl.classList.contains("header-empty")).toBe(false);
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

      await new Promise(resolve => setTimeout(resolve, 50));

      const headerSlot = card.shadowRoot.querySelector('slot[name="header"]');
      const assignedElements = headerSlot.assignedElements();
      expect(assignedElements.length).toBeGreaterThan(0);
      expect(assignedElements[0].querySelector(".title")).toBeTruthy();
      expect(assignedElements[0].querySelector(".action")).toBeTruthy();
    });
  });

  /**
   * Footer 插槽测试
   */
  describe("Footer Slot", () => {
    it("没有 footer 内容时应该隐藏 footer 区域", () => {
      const card = document.createElement("ea-card");
      container.appendChild(card);

      const footerEl = card.shadowRoot.querySelector(".ea-card__footer");
      expect(footerEl.classList.contains("footer-empty")).toBe(true);
    });

    it("通过 slot='footer' 传入内容应该显示 footer", async () => {
      const card = document.createElement("ea-card");
      card.innerHTML = `
        <p>Content</p>
        <div slot="footer">Footer content</div>
      `;
      container.appendChild(card);

      await new Promise(resolve => setTimeout(resolve, 50));

      const footerEl = card.shadowRoot.querySelector(".ea-card__footer");
      expect(footerEl.classList.contains("footer-empty")).toBe(false);
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

      await new Promise(resolve => setTimeout(resolve, 50));

      const footerSlot = card.shadowRoot.querySelector('slot[name="footer"]');
      const assignedElements = footerSlot.assignedElements();
      expect(assignedElements.length).toBeGreaterThan(0);
      expect(assignedElements[0].querySelector("a")).toBeTruthy();
    });
  });

  /**
   * 默认插槽（内容区域）测试
   */
  describe("Default Slot (Content)", () => {
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

  /**
   * 完整卡片结构测试
   */
  describe("Complete Card Structure", () => {
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

      await new Promise(resolve => setTimeout(resolve, 50));

      const containerEl = card.shadowRoot.querySelector(".ea-card");
      const headerEl = card.shadowRoot.querySelector(".ea-card__header");
      const contentEl = card.shadowRoot.querySelector(".ea-card__content");
      const footerEl = card.shadowRoot.querySelector(".ea-card__footer");

      expect(containerEl).toBeTruthy();
      expect(headerEl).toBeTruthy();
      expect(contentEl).toBeTruthy();
      expect(footerEl).toBeTruthy();

      expect(headerEl.classList.contains("header-empty")).toBe(false);
      expect(footerEl.classList.contains("footer-empty")).toBe(false);
    });

    it("简单卡片（只有内容区域）应该正确渲染", () => {
      const card = document.createElement("ea-card");
      card.innerHTML = `
        <p class="ea-card-content">content1</p>
        <p class="ea-card-content">content2</p>
        <p class="ea-card-content">content3</p>
        <p class="ea-card-content">content4</p>
      `;
      container.appendChild(card);

      const headerEl = card.shadowRoot.querySelector(".ea-card__header");
      const footerEl = card.shadowRoot.querySelector(".ea-card__footer");
      const contentSlot = card.shadowRoot.querySelector("slot:not([name])");

      expect(headerEl.classList.contains("header-empty")).toBe(true);
      expect(footerEl.classList.contains("footer-empty")).toBe(true);
      expect(contentSlot.assignedElements().length).toBe(4);
    });
  });

  /**
   * 边界条件测试
   */
  describe("Edge Cases", () => {
    it("空卡片应该正确渲染", () => {
      const card = document.createElement("ea-card");
      container.appendChild(card);

      const containerEl = card.shadowRoot.querySelector(".ea-card");
      const contentSlot = card.shadowRoot.querySelector("slot:not([name])");

      expect(containerEl).toBeTruthy();
      expect(contentSlot.assignedElements().length).toBe(0);
    });

    it("动态添加 header 内容后应该更新显示", async () => {
      const card = document.createElement("ea-card");
      card.innerHTML = `<p>Content</p>`;
      container.appendChild(card);

      await new Promise(resolve => setTimeout(resolve, 50));

      let headerEl = card.shadowRoot.querySelector(".ea-card__header");
      expect(headerEl.classList.contains("header-empty")).toBe(true);

      // 动态添加 header
      const headerDiv = document.createElement("div");
      headerDiv.setAttribute("slot", "header");
      headerDiv.textContent = "Dynamic Header";
      card.appendChild(headerDiv);

      await new Promise(resolve => setTimeout(resolve, 50));

      headerEl = card.shadowRoot.querySelector(".ea-card__header");
      expect(headerEl.classList.contains("header-empty")).toBe(false);
    });

    it("动态移除 header 内容后应该隐藏 header", async () => {
      const card = document.createElement("ea-card");
      card.innerHTML = `
        <div slot="header">Header Content</div>
        <p>Content</p>
      `;
      container.appendChild(card);

      await new Promise(resolve => setTimeout(resolve, 50));

      let headerEl = card.shadowRoot.querySelector(".ea-card__header");
      expect(headerEl.classList.contains("header-empty")).toBe(false);

      // 移除 header
      const headerSlot = card.shadowRoot.querySelector('slot[name="header"]');
      const assignedElements = headerSlot.assignedElements();
      if (assignedElements.length > 0) {
        assignedElements[0].remove();
      }

      await new Promise(resolve => setTimeout(resolve, 50));

      // 重新触发 slotchange 事件
      headerSlot.dispatchEvent(new Event("slotchange"));

      headerEl = card.shadowRoot.querySelector(".ea-card__header");
      expect(headerEl.classList.contains("header-empty")).toBe(true);
    });
  });

  /**
   * 生命周期测试
   */
  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", () => {
      const card = document.createElement("ea-card");
      container.appendChild(card);

      expect(card.shadowRoot).toBeDefined();
      expect(card.shadowRoot.querySelector(".ea-card")).toBeTruthy();
    });

    it("组件断开连接后应该清理资源", () => {
      const card = document.createElement("ea-card");
      container.appendChild(card);

      // 断开连接
      card.remove();

      // 验证组件已断开（不会抛出错误）
      expect(() => {
        card.disconnectedCallback?.();
      }).not.toThrow();
    });
  });
});
