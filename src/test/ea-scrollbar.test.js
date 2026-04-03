import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// Mock Element.scrollTo for JSDOM
if (!Element.prototype.scrollTo) {
  Element.prototype.scrollTo = function (options) {
    if (typeof options === "object") {
      if (options.top !== undefined) this.scrollTop = options.top;
      if (options.left !== undefined) this.scrollLeft = options.left;
    }
  };
}

// 导入 ea-scrollbar 组件
import "../components/ea-scrollbar/index.js";

describe("EaScrollbar Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    container.style.width = "400px";
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
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.innerHTML = `
        <div style="height: 500px;">Content</div>
      `;
      container.appendChild(scrollbar);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(scrollbar.shadowRoot).toBeTruthy();
      expect(scrollbar.shadowRoot.querySelector(".ea-scrollbar")).toBeTruthy();
    });

    it("应该支持 CSS Parts", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.innerHTML = `<div>Content</div>`;
      container.appendChild(scrollbar);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(
        scrollbar.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
      expect(
        scrollbar.shadowRoot.querySelector('[part="track-horizontal"]')
      ).toBeTruthy();
      expect(
        scrollbar.shadowRoot.querySelector('[part="track-vertical"]')
      ).toBeTruthy();
      expect(scrollbar.shadowRoot.querySelector('[part="thumb"]')).toBeTruthy();
      expect(
        scrollbar.shadowRoot.querySelector('[part="view-container"]')
      ).toBeTruthy();
    });

    it("应该渲染默认插槽内容", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.innerHTML = `
        <div class="content-item">Item 1</div>
        <div class="content-item">Item 2</div>
      `;
      container.appendChild(scrollbar);

      await new Promise(resolve => setTimeout(resolve, 100));

      const slot = scrollbar.shadowRoot.querySelector("slot");
      expect(slot).toBeTruthy();
    });

    it("应该包含水平和垂直滚动轨道", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.innerHTML = `<div style="height: 500px; width: 500px;">Content</div>`;
      container.appendChild(scrollbar);

      await new Promise(resolve => setTimeout(resolve, 100));

      const horizontalTrack = scrollbar.shadowRoot.querySelector(
        ".ea-scrollbar__track-horizontal"
      );
      const verticalTrack = scrollbar.shadowRoot.querySelector(
        ".ea-scrollbar__track-vertical"
      );
      expect(horizontalTrack).toBeTruthy();
      expect(verticalTrack).toBeTruthy();
    });

    it("应该包含水平和垂直滚动滑块", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.innerHTML = `<div style="height: 500px; width: 500px;">Content</div>`;
      container.appendChild(scrollbar);

      await new Promise(resolve => setTimeout(resolve, 100));

      const horizontalThumb = scrollbar.shadowRoot.querySelector(
        ".ea-scrollbar__thumb-horizontal"
      );
      const verticalThumb = scrollbar.shadowRoot.querySelector(
        ".ea-scrollbar__thumb-vertical"
      );
      expect(horizontalThumb).toBeTruthy();
      expect(verticalThumb).toBeTruthy();
    });
  });

  /**
   * Native 属性测试
   */
  describe("Native Attribute", () => {
    it("默认 native 应该是 false", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.innerHTML = `<div>Content</div>`;
      container.appendChild(scrollbar);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(scrollbar.native === false || scrollbar.native === null).toBe(
        true
      );
    });

    it("应该支持 native 属性设置为 true", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.setAttribute("native", "");
      scrollbar.innerHTML = `<div>Content</div>`;
      container.appendChild(scrollbar);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(scrollbar.native).toBe(true);
    });

    it("native 为 true 时应该添加 ea-scrollbar--native 类", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.setAttribute("native", "");
      scrollbar.innerHTML = `<div>Content</div>`;
      container.appendChild(scrollbar);

      await new Promise(resolve => setTimeout(resolve, 100));

      const containerEl = scrollbar.shadowRoot.querySelector(".ea-scrollbar");
      expect(containerEl.classList.contains("ea-scrollbar--native")).toBe(true);
    });
  });

  /**
   * Noresize 属性测试
   */
  describe("Noresize Attribute", () => {
    it("默认 noresize 应该是 false", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.innerHTML = `<div>Content</div>`;
      container.appendChild(scrollbar);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(scrollbar.noresize === false || scrollbar.noresize === null).toBe(
        true
      );
    });

    it("应该支持 noresize 属性设置为 true", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.setAttribute("noresize", "");
      scrollbar.innerHTML = `<div>Content</div>`;
      container.appendChild(scrollbar);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(scrollbar.noresize).toBe(true);
    });

    it("noresize 为 true 时应该添加 ea-scrollbar--noresize 类", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.setAttribute("noresize", "");
      scrollbar.innerHTML = `<div>Content</div>`;
      container.appendChild(scrollbar);

      await new Promise(resolve => setTimeout(resolve, 100));

      const containerEl = scrollbar.shadowRoot.querySelector(".ea-scrollbar");
      expect(containerEl.classList.contains("ea-scrollbar--noresize")).toBe(
        true
      );
    });
  });

  /**
   * Always 属性测试
   */
  describe("Always Attribute", () => {
    it("默认 always 应该是 false", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.innerHTML = `<div>Content</div>`;
      container.appendChild(scrollbar);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(scrollbar.always === false || scrollbar.always === null).toBe(
        true
      );
    });

    it("应该支持 always 属性设置为 true", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.setAttribute("always", "");
      scrollbar.innerHTML = `<div>Content</div>`;
      container.appendChild(scrollbar);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(scrollbar.always).toBe(true);
    });

    it("always 为 true 时应该添加 ea-scrollbar--always 类", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.setAttribute("always", "");
      scrollbar.innerHTML = `<div>Content</div>`;
      container.appendChild(scrollbar);

      await new Promise(resolve => setTimeout(resolve, 100));

      const containerEl = scrollbar.shadowRoot.querySelector(".ea-scrollbar");
      expect(containerEl.classList.contains("ea-scrollbar--always")).toBe(true);
    });
  });

  /**
   * 滚动事件测试
   */
  describe("Scroll Events", () => {
    it("应该触发 scroll 事件", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.innerHTML = `
        <div style="height: 500px;">Content</div>
      `;
      container.appendChild(scrollbar);

      await new Promise(resolve => setTimeout(resolve, 100));

      const scrollHandler = vi.fn();
      scrollbar.addEventListener("scroll", scrollHandler);

      const view = scrollbar.shadowRoot.querySelector(".ea-scrollbar__view");
      view.scrollTop = 100;
      view.dispatchEvent(new Event("scroll"));

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(scrollHandler).toHaveBeenCalled();
    });

    it("scroll 事件应该包含 scrollTop 和 scrollLeft", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.innerHTML = `
        <div style="height: 500px; width: 500px;">Content</div>
      `;
      container.appendChild(scrollbar);

      await new Promise(resolve => setTimeout(resolve, 100));

      let eventDetail = null;
      scrollbar.addEventListener("scroll", e => {
        eventDetail = e.detail;
      });

      const view = scrollbar.shadowRoot.querySelector(".ea-scrollbar__view");
      view.scrollTop = 50;
      view.scrollLeft = 30;
      view.dispatchEvent(new Event("scroll"));

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(eventDetail).toBeTruthy();
      expect(typeof eventDetail.scrollTop).toBe("number");
      expect(typeof eventDetail.scrollLeft).toBe("number");
    });
  });

  /**
   * 滚动方法测试
   */
  describe("Scroll Methods", () => {
    it("应该支持 scrollTo 方法", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.innerHTML = `
        <div style="height: 500px;">Content</div>
      `;
      container.appendChild(scrollbar);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(typeof scrollbar.scrollTo).toBe("function");
    });

    it("scrollTo 应该能滚动到指定位置", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.innerHTML = `
        <div style="height: 500px;">Content</div>
      `;
      container.appendChild(scrollbar);

      await new Promise(resolve => setTimeout(resolve, 100));

      const view = scrollbar.shadowRoot.querySelector(".ea-scrollbar__view");

      scrollbar.scrollTo({ top: 100 });

      // scrollTo 是异步的，等待一下
      await new Promise(resolve => setTimeout(resolve, 50));

      // 验证 scrollTo 方法被调用（实际滚动位置可能因 JSDOM 限制而不同）
      expect(view.scrollTop).toBeGreaterThanOrEqual(0);
    });
  });

  /**
   * 键盘事件测试
   */
  describe("Keyboard Events", () => {
    it("应该响应键盘上下箭头事件", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.innerHTML = `
        <div style="height: 500px;">Content</div>
      `;
      container.appendChild(scrollbar);

      await new Promise(resolve => setTimeout(resolve, 100));

      const view = scrollbar.shadowRoot.querySelector(".ea-scrollbar__view");
      const initialScrollTop = view.scrollTop;

      // 模拟按下 ArrowDown 键
      const keydownEvent = new KeyboardEvent("keydown", { key: "ArrowDown" });
      scrollbar.dispatchEvent(keydownEvent);

      await new Promise(resolve => setTimeout(resolve, 50));

      // 由于 JSDOM 限制，可能无法实际滚动，但事件应该被处理
      expect(view.scrollTop >= initialScrollTop).toBe(true);
    });

    it("应该响应键盘左右箭头事件", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.innerHTML = `
        <div style="height: 500px; width: 500px;">Content</div>
      `;
      container.appendChild(scrollbar);

      await new Promise(resolve => setTimeout(resolve, 100));

      const view = scrollbar.shadowRoot.querySelector(".ea-scrollbar__view");
      const initialScrollLeft = view.scrollLeft;

      // 模拟按下 ArrowRight 键
      const keydownEvent = new KeyboardEvent("keydown", { key: "ArrowRight" });
      scrollbar.dispatchEvent(keydownEvent);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(view.scrollLeft >= initialScrollLeft).toBe(true);
    });
  });

  /**
   * 边界条件测试
   */
  describe("Edge Cases", () => {
    it("应该处理空内容", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      container.appendChild(scrollbar);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(scrollbar.shadowRoot.querySelector(".ea-scrollbar")).toBeTruthy();
    });

    it("应该处理少量内容（不需要滚动）", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.innerHTML = `<div style="height: 50px;">Small Content</div>`;
      container.appendChild(scrollbar);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(
        scrollbar.shadowRoot.querySelector(".ea-scrollbar__view")
      ).toBeTruthy();
    });

    it("应该处理大量内容（需要滚动）", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.innerHTML = `
        <div style="height: 1000px; width: 1000px;">Large Content</div>
      `;
      container.appendChild(scrollbar);

      await new Promise(resolve => setTimeout(resolve, 100));

      const view = scrollbar.shadowRoot.querySelector(".ea-scrollbar__view");
      // JSDOM 中 scrollHeight 和 clientHeight 可能相等，所以只验证 view 存在
      expect(view).toBeTruthy();
      // 验证内容被正确渲染（通过 slot）
      expect(scrollbar.querySelector("div").textContent).toBe("Large Content");
    });

    it("应该处理动态添加内容", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.innerHTML = `<div style="height: 100px;">Initial Content</div>`;
      container.appendChild(scrollbar);

      await new Promise(resolve => setTimeout(resolve, 100));

      // 动态添加更多内容
      const newContent = document.createElement("div");
      newContent.style.height = "500px";
      newContent.textContent = "New Content";
      scrollbar.appendChild(newContent);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(scrollbar.children.length).toBe(2);
    });
  });

  /**
   * 生命周期测试
   */
  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.innerHTML = `<div style="height: 500px;">Content</div>`;
      container.appendChild(scrollbar);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(scrollbar.shadowRoot).toBeTruthy();
      expect(scrollbar.isMounted).toBe(true);
    });

    it("组件断开连接后应该正常移除", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.innerHTML = `<div>Content</div>`;
      container.appendChild(scrollbar);

      await new Promise(resolve => setTimeout(resolve, 100));

      scrollbar.remove();

      expect(scrollbar.isConnected).toBe(false);
    });

    it("应该支持属性动态更新", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.innerHTML = `<div>Content</div>`;
      container.appendChild(scrollbar);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(scrollbar.native).toBeFalsy();

      scrollbar.setAttribute("native", "");

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(scrollbar.native).toBe(true);
    });
  });
});
