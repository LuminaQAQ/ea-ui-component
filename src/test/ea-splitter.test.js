import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// 导入 ea-splitter 组件
import "../components/ea-splitter/index.js";

describe("EaSplitter Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    container.style.width = "600px";
    container.style.height = "300px";
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  /**
   * 基础功能测试
   */
  describe("Basic Functionality", () => {
    it("应该正确渲染组件", async () => {
      const splitter = document.createElement("ea-splitter");
      splitter.innerHTML = `
        <ea-splitter-panel>Panel 1</ea-splitter-panel>
        <ea-splitter-panel>Panel 2</ea-splitter-panel>
      `;
      container.appendChild(splitter);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(splitter.shadowRoot).toBeTruthy();
      expect(splitter.shadowRoot.querySelector(".ea-splitter")).toBeTruthy();
    });

    it("应该支持 CSS Parts", async () => {
      const splitter = document.createElement("ea-splitter");
      container.appendChild(splitter);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(splitter.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("应该自动创建 splitter-bar", async () => {
      const splitter = document.createElement("ea-splitter");
      splitter.innerHTML = `
        <ea-splitter-panel>Panel 1</ea-splitter-panel>
        <ea-splitter-panel>Panel 2</ea-splitter-panel>
        <ea-splitter-panel>Panel 3</ea-splitter-panel>
      `;
      container.appendChild(splitter);

      await new Promise(resolve => setTimeout(resolve, 100));

      // 3 个 panel 应该有 2 个 bar
      const bars = splitter.querySelectorAll("ea-splitter-bar");
      expect(bars.length).toBe(2);
    });
  });

  /**
   * Layout 属性测试
   */
  describe("Layout Attribute", () => {
    it("默认 layout 应该是 horizontal", async () => {
      const splitter = document.createElement("ea-splitter");
      container.appendChild(splitter);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(splitter.layout).toBe("horizontal");
    });

    it("应该支持 layout 属性设置为 vertical", async () => {
      const splitter = document.createElement("ea-splitter");
      splitter.setAttribute("layout", "vertical");
      container.appendChild(splitter);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(splitter.layout).toBe("vertical");
    });

    it("应该支持 layout 属性设置为 horizontal", async () => {
      const splitter = document.createElement("ea-splitter");
      splitter.setAttribute("layout", "horizontal");
      container.appendChild(splitter);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(splitter.layout).toBe("horizontal");
    });
  });

  /**
   * 事件测试
   */
  describe("Events", () => {
    it("应该触发 panel-resize-start 事件", async () => {
      const splitter = document.createElement("ea-splitter");
      splitter.innerHTML = `
        <ea-splitter-panel>Panel 1</ea-splitter-panel>
        <ea-splitter-panel>Panel 2</ea-splitter-panel>
      `;
      container.appendChild(splitter);

      await new Promise(resolve => setTimeout(resolve, 100));

      const resizeStartHandler = vi.fn();
      splitter.addEventListener("panel-resize-start", resizeStartHandler);

      // 模拟 mousedown 事件
      const bar = splitter.querySelector("ea-splitter-bar");
      bar.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(resizeStartHandler).toHaveBeenCalled();
    });

    it("panel-resize-start 事件应该包含 size 数组", async () => {
      const splitter = document.createElement("ea-splitter");
      splitter.innerHTML = `
        <ea-splitter-panel>Panel 1</ea-splitter-panel>
        <ea-splitter-panel>Panel 2</ea-splitter-panel>
      `;
      container.appendChild(splitter);

      await new Promise(resolve => setTimeout(resolve, 100));

      const resizeStartHandler = vi.fn();
      splitter.addEventListener("panel-resize-start", resizeStartHandler);

      const bar = splitter.querySelector("ea-splitter-bar");
      bar.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));

      await new Promise(resolve => setTimeout(resolve, 50));

      if (resizeStartHandler.mock.calls.length > 0) {
        const eventDetail = resizeStartHandler.mock.calls[0][0].detail;
        expect(eventDetail).toHaveProperty("size");
        expect(Array.isArray(eventDetail.size)).toBe(true);
      }
    });

    it("应该触发 panel-resize-end 事件", async () => {
      const splitter = document.createElement("ea-splitter");
      splitter.innerHTML = `
        <ea-splitter-panel>Panel 1</ea-splitter-panel>
        <ea-splitter-panel>Panel 2</ea-splitter-panel>
      `;
      container.appendChild(splitter);

      await new Promise(resolve => setTimeout(resolve, 100));

      const resizeEndHandler = vi.fn();
      splitter.addEventListener("panel-resize-end", resizeEndHandler);

      const bar = splitter.querySelector("ea-splitter-bar");
      bar.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));

      // 触发 mouseup
      window.dispatchEvent(new MouseEvent("mouseup"));

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(resizeEndHandler).toHaveBeenCalled();
    });
  });

  /**
   * 生命周期测试
   */
  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const splitter = document.createElement("ea-splitter");
      splitter.innerHTML = `
        <ea-splitter-panel>Panel 1</ea-splitter-panel>
        <ea-splitter-panel>Panel 2</ea-splitter-panel>
      `;
      container.appendChild(splitter);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(splitter.shadowRoot).toBeTruthy();
      expect(splitter.querySelectorAll("ea-splitter-panel").length).toBe(2);
    });

    it("组件断开连接后应该正常移除", async () => {
      const splitter = document.createElement("ea-splitter");
      splitter.innerHTML = `
        <ea-splitter-panel>Panel 1</ea-splitter-panel>
        <ea-splitter-panel>Panel 2</ea-splitter-panel>
      `;
      container.appendChild(splitter);

      await new Promise(resolve => setTimeout(resolve, 100));

      splitter.remove();

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(splitter.isConnected).toBe(false);
    });
  });
});

describe("EaSplitterPanel Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    container.style.width = "600px";
    container.style.height = "300px";
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  /**
   * 基础功能测试
   */
  describe("Basic Functionality", () => {
    it("应该正确渲染组件", async () => {
      const splitter = document.createElement("ea-splitter");
      splitter.innerHTML = `
        <ea-splitter-panel>Panel 1</ea-splitter-panel>
      `;
      container.appendChild(splitter);

      await new Promise(resolve => setTimeout(resolve, 100));

      const panel = splitter.querySelector("ea-splitter-panel");
      expect(panel.shadowRoot).toBeTruthy();
      expect(panel.shadowRoot.querySelector(".ea-splitter-panel")).toBeTruthy();
    });

    it("应该支持 CSS Parts", async () => {
      const splitter = document.createElement("ea-splitter");
      splitter.innerHTML = `
        <ea-splitter-panel>Panel 1</ea-splitter-panel>
      `;
      container.appendChild(splitter);

      await new Promise(resolve => setTimeout(resolve, 100));

      const panel = splitter.querySelector("ea-splitter-panel");
      expect(panel.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });
  });

  /**
   * Size 属性测试
   */
  describe("Size Attribute", () => {
    it("默认 size 应该是空字符串", async () => {
      const splitter = document.createElement("ea-splitter");
      splitter.innerHTML = `
        <ea-splitter-panel>Panel 1</ea-splitter-panel>
      `;
      container.appendChild(splitter);

      await new Promise(resolve => setTimeout(resolve, 100));

      const panel = splitter.querySelector("ea-splitter-panel");
      expect(panel.size).toBe("");
    });

    it("应该支持 size 属性（像素）", async () => {
      const splitter = document.createElement("ea-splitter");
      splitter.innerHTML = `
        <ea-splitter-panel size="200px">Panel 1</ea-splitter-panel>
      `;
      container.appendChild(splitter);

      await new Promise(resolve => setTimeout(resolve, 100));

      const panel = splitter.querySelector("ea-splitter-panel");
      expect(panel.size).toBe("200px");
    });

    it("应该支持 size 属性（百分比）", async () => {
      const splitter = document.createElement("ea-splitter");
      splitter.innerHTML = `
        <ea-splitter-panel size="30%">Panel 1</ea-splitter-panel>
      `;
      container.appendChild(splitter);

      await new Promise(resolve => setTimeout(resolve, 100));

      const panel = splitter.querySelector("ea-splitter-panel");
      expect(panel.size).toBe("30%");
    });
  });

  /**
   * Min 属性测试
   */
  describe("Min Attribute", () => {
    it("默认 min 应该是空字符串", async () => {
      const splitter = document.createElement("ea-splitter");
      splitter.innerHTML = `
        <ea-splitter-panel>Panel 1</ea-splitter-panel>
      `;
      container.appendChild(splitter);

      await new Promise(resolve => setTimeout(resolve, 100));

      const panel = splitter.querySelector("ea-splitter-panel");
      expect(panel.min).toBe("");
    });

    it("应该支持 min 属性（像素）", async () => {
      const splitter = document.createElement("ea-splitter");
      splitter.innerHTML = `
        <ea-splitter-panel min="100px">Panel 1</ea-splitter-panel>
      `;
      container.appendChild(splitter);

      await new Promise(resolve => setTimeout(resolve, 100));

      const panel = splitter.querySelector("ea-splitter-panel");
      expect(panel.min).toBe("100px");
    });

    it("应该支持 min 属性（百分比）", async () => {
      const splitter = document.createElement("ea-splitter");
      splitter.innerHTML = `
        <ea-splitter-panel min="20%">Panel 1</ea-splitter-panel>
      `;
      container.appendChild(splitter);

      await new Promise(resolve => setTimeout(resolve, 100));

      const panel = splitter.querySelector("ea-splitter-panel");
      expect(panel.min).toBe("20%");
    });
  });

  /**
   * Layout 属性测试
   */
  describe("Layout Attribute", () => {
    it("默认 layout 应该是 horizontal", async () => {
      const splitter = document.createElement("ea-splitter");
      splitter.innerHTML = `
        <ea-splitter-panel>Panel 1</ea-splitter-panel>
      `;
      container.appendChild(splitter);

      await new Promise(resolve => setTimeout(resolve, 100));

      const panel = splitter.querySelector("ea-splitter-panel");
      expect(panel.layout).toBe("horizontal");
    });

    it("应该支持 layout 属性设置为 vertical", async () => {
      const splitter = document.createElement("ea-splitter");
      splitter.setAttribute("layout", "vertical");
      splitter.innerHTML = `
        <ea-splitter-panel>Panel 1</ea-splitter-panel>
      `;
      container.appendChild(splitter);

      await new Promise(resolve => setTimeout(resolve, 100));

      const panel = splitter.querySelector("ea-splitter-panel");
      expect(panel.layout).toBe("vertical");
    });
  });

  /**
   * 插槽测试
   */
  describe("Slots", () => {
    it("应该支持默认插槽", async () => {
      const splitter = document.createElement("ea-splitter");
      splitter.innerHTML = `
        <ea-splitter-panel>
          <div class="panel-content">Content</div>
        </ea-splitter-panel>
      `;
      container.appendChild(splitter);

      await new Promise(resolve => setTimeout(resolve, 100));

      const panel = splitter.querySelector("ea-splitter-panel");
      const slot = panel.shadowRoot.querySelector('slot');
      expect(slot).toBeTruthy();
    });
  });

  /**
   * 生命周期测试
   */
  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const splitter = document.createElement("ea-splitter");
      splitter.innerHTML = `
        <ea-splitter-panel size="200px" min="100px">Panel 1</ea-splitter-panel>
      `;
      container.appendChild(splitter);

      await new Promise(resolve => setTimeout(resolve, 100));

      const panel = splitter.querySelector("ea-splitter-panel");
      expect(panel.shadowRoot).toBeTruthy();
      expect(panel.size).toBe("200px");
      expect(panel.min).toBe("100px");
    });
  });
});
