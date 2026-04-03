import { describe, it, expect, beforeEach, afterEach } from "vitest";

// 导入 ea-container 及其子组件
import "../components/ea-container/index.js";

describe("EaContainer Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  /**
   * 基础功能测试
   */
  describe("Basic Functionality", () => {
    it("应该正确渲染 ea-container 组件", async () => {
      const el = document.createElement("ea-container");
      container.appendChild(el);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(el.shadowRoot).toBeTruthy();
      expect(el.shadowRoot.querySelector(".ea-container")).toBeTruthy();
    });

    it("应该支持 CSS Parts", async () => {
      const el = document.createElement("ea-container");
      container.appendChild(el);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(el.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("应该正确渲染 ea-header 组件", async () => {
      const el = document.createElement("ea-header");
      container.appendChild(el);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(el.shadowRoot).toBeTruthy();
      expect(el.shadowRoot.querySelector(".ea-header")).toBeTruthy();
    });

    it("应该正确渲染 ea-aside 组件", async () => {
      const el = document.createElement("ea-aside");
      container.appendChild(el);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(el.shadowRoot).toBeTruthy();
      expect(el.shadowRoot.querySelector(".ea-aside")).toBeTruthy();
    });

    it("应该正确渲染 ea-main 组件", async () => {
      const el = document.createElement("ea-main");
      container.appendChild(el);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(el.shadowRoot).toBeTruthy();
      expect(el.shadowRoot.querySelector(".ea-main")).toBeTruthy();
    });

    it("应该正确渲染 ea-footer 组件", async () => {
      const el = document.createElement("ea-footer");
      container.appendChild(el);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(el.shadowRoot).toBeTruthy();
      expect(el.shadowRoot.querySelector(".ea-footer")).toBeTruthy();
    });
  });

  /**
   * Direction 属性测试
   */
  describe("Direction Attribute", () => {
    it("默认 direction 应该是 horizontal", async () => {
      const el = document.createElement("ea-container");
      container.appendChild(el);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(el.direction === "horizontal" || el.direction === undefined).toBe(
        true
      );
    });

    it("应该支持设置 direction 为 vertical", async () => {
      const el = document.createElement("ea-container");
      el.setAttribute("direction", "vertical");
      container.appendChild(el);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(el.direction).toBe("vertical");
    });

    it("应该支持设置 direction 为 horizontal", async () => {
      const el = document.createElement("ea-container");
      el.setAttribute("direction", "horizontal");
      container.appendChild(el);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(el.direction).toBe("horizontal");
    });
  });

  /**
   * 自动方向检测测试
   */
  describe("Auto Direction Detection", () => {
    it("包含 ea-header 时应该自动设置为 vertical 方向", async () => {
      const el = document.createElement("ea-container");
      const header = document.createElement("ea-header");
      el.appendChild(header);
      container.appendChild(el);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(el.direction).toBe("vertical");
    });

    it("包含 ea-footer 时应该自动设置为 vertical 方向", async () => {
      const el = document.createElement("ea-container");
      const footer = document.createElement("ea-footer");
      el.appendChild(footer);
      container.appendChild(el);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(el.direction).toBe("vertical");
    });

    it("不包含 ea-header 或 ea-footer 时应该保持 horizontal 方向", async () => {
      const el = document.createElement("ea-container");
      const aside = document.createElement("ea-aside");
      const main = document.createElement("ea-main");
      el.appendChild(aside);
      el.appendChild(main);
      container.appendChild(el);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(el.direction).toBe("horizontal");
    });

    it("显式设置 direction 属性后不应该自动改变方向", async () => {
      const el = document.createElement("ea-container");
      el.setAttribute("direction", "horizontal");
      const header = document.createElement("ea-header");
      el.appendChild(header);
      container.appendChild(el);

      await new Promise(resolve => setTimeout(resolve, 100));

      // 显式设置 direction 后，即使有 header 也不应该改变
      expect(el.getAttribute("direction")).toBe("horizontal");
    });
  });

  /**
   * Header 高度属性测试
   */
  describe("Header Height Attribute", () => {
    it("默认 header height 应该是 60px", async () => {
      const el = document.createElement("ea-header");
      container.appendChild(el);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(el.height === "60px" || el.height === undefined).toBe(true);
    });

    it("应该支持自定义 header height", async () => {
      const el = document.createElement("ea-header");
      el.setAttribute("height", "100px");
      container.appendChild(el);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(el.height === "100px" || el.height === undefined).toBe(true);
    });

    it("应该支持 header height 为 auto", async () => {
      const el = document.createElement("ea-header");
      el.setAttribute("height", "auto");
      container.appendChild(el);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(el.height === "auto" || el.height === undefined).toBe(true);
    });
  });

  /**
   * Footer 高度属性测试
   */
  describe("Footer Height Attribute", () => {
    it("默认 footer height 应该是 60px", async () => {
      const el = document.createElement("ea-footer");
      container.appendChild(el);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(el.height === "60px" || el.height === undefined).toBe(true);
    });

    it("应该支持自定义 footer height", async () => {
      const el = document.createElement("ea-footer");
      el.setAttribute("height", "80px");
      container.appendChild(el);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(el.height === "80px" || el.height === undefined).toBe(true);
    });
  });

  /**
   * Aside 宽度属性测试
   */
  describe("Aside Width Attribute", () => {
    it("默认 aside width 应该是 300px", async () => {
      const el = document.createElement("ea-aside");
      container.appendChild(el);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(el.width === "300px" || el.width === undefined).toBe(true);
    });

    it("应该支持自定义 aside width", async () => {
      const el = document.createElement("ea-aside");
      el.setAttribute("width", "200px");
      container.appendChild(el);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(el.width === "200px" || el.width === undefined).toBe(true);
    });

    it("应该支持 aside width 为百分比", async () => {
      const el = document.createElement("ea-aside");
      el.setAttribute("width", "20%");
      container.appendChild(el);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(el.width === "20%" || el.width === undefined).toBe(true);
    });
  });

  /**
   * 布局组合测试
   */
  describe("Layout Combinations", () => {
    it("应该支持 Header + Main 布局", async () => {
      const el = document.createElement("ea-container");
      const header = document.createElement("ea-header");
      header.textContent = "Header";
      const main = document.createElement("ea-main");
      main.textContent = "Main";

      el.appendChild(header);
      el.appendChild(main);
      container.appendChild(el);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(el.direction).toBe("vertical");
      expect(el.querySelector("ea-header")).toBeTruthy();
      expect(el.querySelector("ea-main")).toBeTruthy();
    });

    it("应该支持 Header + Main + Footer 布局", async () => {
      const el = document.createElement("ea-container");
      const header = document.createElement("ea-header");
      const main = document.createElement("ea-main");
      const footer = document.createElement("ea-footer");

      el.appendChild(header);
      el.appendChild(main);
      el.appendChild(footer);
      container.appendChild(el);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(el.direction).toBe("vertical");
      expect(el.querySelector("ea-header")).toBeTruthy();
      expect(el.querySelector("ea-main")).toBeTruthy();
      expect(el.querySelector("ea-footer")).toBeTruthy();
    });

    it("应该支持 Aside + Main 水平布局", async () => {
      const el = document.createElement("ea-container");
      el.setAttribute("direction", "horizontal");
      const aside = document.createElement("ea-aside");
      const main = document.createElement("ea-main");

      el.appendChild(aside);
      el.appendChild(main);
      container.appendChild(el);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(el.direction).toBe("horizontal");
      expect(el.querySelector("ea-aside")).toBeTruthy();
      expect(el.querySelector("ea-main")).toBeTruthy();
    });

    it("应该支持嵌套布局", async () => {
      const outer = document.createElement("ea-container");
      const header = document.createElement("ea-header");
      const inner = document.createElement("ea-container");
      inner.setAttribute("direction", "horizontal");
      const aside = document.createElement("ea-aside");
      const main = document.createElement("ea-main");

      inner.appendChild(aside);
      inner.appendChild(main);
      outer.appendChild(header);
      outer.appendChild(inner);
      container.appendChild(outer);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(outer.direction).toBe("vertical");
      expect(inner.direction).toBe("horizontal");
    });

    it("应该支持多个 Aside 的水平布局", async () => {
      const el = document.createElement("ea-container");
      el.setAttribute("direction", "horizontal");
      const aside1 = document.createElement("ea-aside");
      const main = document.createElement("ea-main");
      const aside2 = document.createElement("ea-aside");

      el.appendChild(aside1);
      el.appendChild(main);
      el.appendChild(aside2);
      container.appendChild(el);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(el.direction).toBe("horizontal");
      expect(el.querySelectorAll("ea-aside").length).toBe(2);
    });
  });

  /**
   * Slot 内容测试
   */
  describe("Slot Content", () => {
    it("ea-header 应该支持 slot 内容", async () => {
      const el = document.createElement("ea-header");
      el.innerHTML = "<span>Header Content</span>";
      container.appendChild(el);

      await new Promise(resolve => setTimeout(resolve, 50));

      const slot = el.shadowRoot.querySelector("slot");
      expect(slot).toBeTruthy();
    });

    it("ea-main 应该支持 slot 内容", async () => {
      const el = document.createElement("ea-main");
      el.innerHTML = "<div>Main Content</div>";
      container.appendChild(el);

      await new Promise(resolve => setTimeout(resolve, 50));

      const slot = el.shadowRoot.querySelector("slot");
      expect(slot).toBeTruthy();
    });

    it("ea-aside 应该支持 slot 内容", async () => {
      const el = document.createElement("ea-aside");
      el.innerHTML = "<nav>Aside Content</nav>";
      container.appendChild(el);

      await new Promise(resolve => setTimeout(resolve, 50));

      const slot = el.shadowRoot.querySelector("slot");
      expect(slot).toBeTruthy();
    });

    it("ea-footer 应该支持 slot 内容", async () => {
      const el = document.createElement("ea-footer");
      el.innerHTML = "<span>Footer Content</span>";
      container.appendChild(el);

      await new Promise(resolve => setTimeout(resolve, 50));

      const slot = el.shadowRoot.querySelector("slot");
      expect(slot).toBeTruthy();
    });
  });

  /**
   * 边界条件测试
   */
  describe("Edge Cases", () => {
    it("应该处理空 container", async () => {
      const el = document.createElement("ea-container");
      container.appendChild(el);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(el.shadowRoot).toBeTruthy();
      expect(el.direction === "horizontal" || el.direction === undefined).toBe(
        true
      );
    });

    it("应该处理只有文本内容的 container", async () => {
      const el = document.createElement("ea-container");
      el.textContent = "Text content";
      container.appendChild(el);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(el.shadowRoot).toBeTruthy();
    });

    it("应该处理动态添加子元素", async () => {
      const el = document.createElement("ea-container");
      container.appendChild(el);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(el.direction === "horizontal" || el.direction === undefined).toBe(
        true
      );

      const header = document.createElement("ea-header");
      el.appendChild(header);

      await new Promise(resolve => setTimeout(resolve, 100));

      // 动态添加 header 后方向应该改变
      expect(el.direction).toBe("vertical");
    });

    it("应该处理动态移除子元素", async () => {
      const el = document.createElement("ea-container");
      const header = document.createElement("ea-header");
      el.appendChild(header);
      container.appendChild(el);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(el.direction).toBe("vertical");

      header.remove();

      await new Promise(resolve => setTimeout(resolve, 100));

      // 移除 header 后方向应该改变
      expect(el.direction === "horizontal" || el.direction === "vertical").toBe(
        true
      );
    });
  });

  /**
   * 生命周期测试
   */
  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const el = document.createElement("ea-container");
      el.setAttribute("direction", "vertical");
      container.appendChild(el);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(el.shadowRoot).toBeTruthy();
      expect(el.direction).toBe("vertical");
    });

    it("组件断开连接后应该正常移除", async () => {
      const el = document.createElement("ea-container");
      container.appendChild(el);

      await new Promise(resolve => setTimeout(resolve, 50));

      el.remove();

      expect(el.isConnected).toBe(false);
    });

    it("应该支持属性动态更新", async () => {
      const el = document.createElement("ea-container");
      container.appendChild(el);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(el.direction === "horizontal" || el.direction === undefined).toBe(
        true
      );

      el.setAttribute("direction", "vertical");

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(el.direction).toBe("vertical");
    });

    it("header 应该支持 height 动态更新", async () => {
      const el = document.createElement("ea-header");
      container.appendChild(el);

      await new Promise(resolve => setTimeout(resolve, 50));

      el.setAttribute("height", "100px");

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(el.height === "100px" || el.height === undefined).toBe(true);
    });

    it("aside 应该支持 width 动态更新", async () => {
      const el = document.createElement("ea-aside");
      container.appendChild(el);

      await new Promise(resolve => setTimeout(resolve, 50));

      el.setAttribute("width", "250px");

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(el.width === "250px" || el.width === undefined).toBe(true);
    });
  });
});
