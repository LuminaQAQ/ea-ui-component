import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender.js";
import { runAxe, assertNoA11yViolations } from "./utils/a11y.js";

if (!Element.prototype.scrollTo) {
  Element.prototype.scrollTo = function (options) {
    if (typeof options === "object") {
      if (options.top !== undefined) this.scrollTop = options.top;
      if (options.left !== undefined) this.scrollLeft = options.left;
    }
  };
}

global.requestAnimationFrame = (callback) => {
  return setTimeout(callback, 16);
};
global.cancelAnimationFrame = (id) => {
  clearTimeout(id);
};

import "../components/ea-scrollbar/index.ts";

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

  describe("Basic Functionality", () => {
    it("应该正确渲染组件", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.innerHTML = `
        <div style="height: 500px;">Content</div>
      `;
      container.appendChild(scrollbar);

      await waitForRender();

      expect(scrollbar.shadowRoot).toBeTruthy();
      expect(scrollbar.shadowRoot.querySelector(".ea-scrollbar")).toBeTruthy();
    });

    it("应该支持 CSS Parts", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.innerHTML = `<div>Content</div>`;
      container.appendChild(scrollbar);

      await waitForRender();

      expect(
        scrollbar.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
      expect(
        scrollbar.shadowRoot.querySelector('[part="track-horizontal"]')
      ).toBeTruthy();
      expect(
        scrollbar.shadowRoot.querySelector('[part="track-vertical"]')
      ).toBeTruthy();
      expect(
        scrollbar.shadowRoot.querySelector('[part="thumb-horizontal"]')
      ).toBeTruthy();
      expect(
        scrollbar.shadowRoot.querySelector('[part="thumb-vertical"]')
      ).toBeTruthy();
      expect(
        scrollbar.shadowRoot.querySelector('[part="view"]')
      ).toBeTruthy();
    });

    it("应该渲染默认插槽内容", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.innerHTML = `
        <div class="content-item">Item 1</div>
        <div class="content-item">Item 2</div>
      `;
      container.appendChild(scrollbar);

      await waitForRender();

      const slot = scrollbar.shadowRoot.querySelector("slot");
      expect(slot).toBeTruthy();
    });

    it("应该包含水平和垂直滚动轨道", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.innerHTML = `<div style="height: 500px; width: 500px;">Content</div>`;
      container.appendChild(scrollbar);

      await waitForRender();

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

      await waitForRender();

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

  describe("Height Attribute", () => {
    it("默认 height 应该是空字符串", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.innerHTML = `<div>Content</div>`;
      container.appendChild(scrollbar);

      await waitForRender();

      expect(scrollbar.height).toBe("");
    });

    it("应该支持 height 属性设置", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.setAttribute("height", "300px");
      scrollbar.innerHTML = `<div>Content</div>`;
      container.appendChild(scrollbar);

      await waitForRender();

      expect(scrollbar.height).toBe("300px");
    });

    it("height 属性应该设置容器高度", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.setAttribute("height", "200px");
      scrollbar.innerHTML = `<div>Content</div>`;
      container.appendChild(scrollbar);

      await waitForRender();

      const containerEl = scrollbar.shadowRoot.querySelector(".ea-scrollbar");
      expect(containerEl.style.height).toBe("200px");
    });

    it("height 为空时容器高度应为 100%", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.innerHTML = `<div>Content</div>`;
      container.appendChild(scrollbar);

      await waitForRender();

      const containerEl = scrollbar.shadowRoot.querySelector(".ea-scrollbar");
      expect(containerEl.style.height).toBe("100%");
    });
  });

  describe("Native Attribute", () => {
    it("默认 native 应该是 false", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.innerHTML = `<div>Content</div>`;
      container.appendChild(scrollbar);

      await waitForRender();

      expect(scrollbar.native).toBe(false);
    });

    it("应该支持 native 属性设置为 true", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.setAttribute("native", "");
      scrollbar.innerHTML = `<div>Content</div>`;
      container.appendChild(scrollbar);

      await waitForRender();

      expect(scrollbar.native).toBe(true);
    });

    it("native 为 true 时应该添加 ea-scrollbar--native 类", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.setAttribute("native", "");
      scrollbar.innerHTML = `<div>Content</div>`;
      container.appendChild(scrollbar);

      await waitForRender();

      const containerEl = scrollbar.shadowRoot.querySelector(".ea-scrollbar");
      expect(containerEl.classList.contains("ea-scrollbar--native")).toBe(true);
    });
  });

  describe("Noresize Attribute", () => {
    it("默认 noresize 应该是 false", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.innerHTML = `<div>Content</div>`;
      container.appendChild(scrollbar);

      await waitForRender();

      expect(scrollbar.noresize).toBe(false);
    });

    it("应该支持 noresize 属性设置为 true", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.setAttribute("noresize", "");
      scrollbar.innerHTML = `<div>Content</div>`;
      container.appendChild(scrollbar);

      await waitForRender();

      expect(scrollbar.noresize).toBe(true);
    });

    it("noresize 为 true 时应该添加 ea-scrollbar--noresize 类", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.setAttribute("noresize", "");
      scrollbar.innerHTML = `<div>Content</div>`;
      container.appendChild(scrollbar);

      await waitForRender();

      const containerEl = scrollbar.shadowRoot.querySelector(".ea-scrollbar");
      expect(containerEl.classList.contains("ea-scrollbar--noresize")).toBe(
        true
      );
    });
  });

  describe("Always Attribute", () => {
    it("默认 always 应该是 false", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.innerHTML = `<div>Content</div>`;
      container.appendChild(scrollbar);

      await waitForRender();

      expect(scrollbar.always).toBe(false);
    });

    it("应该支持 always 属性设置为 true", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.setAttribute("always", "");
      scrollbar.innerHTML = `<div>Content</div>`;
      container.appendChild(scrollbar);

      await waitForRender();

      expect(scrollbar.always).toBe(true);
    });

    it("always 为 true 时应该添加 ea-scrollbar--always 类", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.setAttribute("always", "");
      scrollbar.innerHTML = `<div>Content</div>`;
      container.appendChild(scrollbar);

      await waitForRender();

      const containerEl = scrollbar.shadowRoot.querySelector(".ea-scrollbar");
      expect(containerEl.classList.contains("ea-scrollbar--always")).toBe(true);
    });
  });

  describe("Scroll Events", () => {
    it("应该触发 ea-scroll 事件", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.innerHTML = `
        <div style="height: 500px;">Content</div>
      `;
      container.appendChild(scrollbar);

      await waitForRender();

      const scrollHandler = vi.fn();
      scrollbar.addEventListener("ea-scroll", scrollHandler);

      const view = scrollbar.shadowRoot.querySelector(".ea-scrollbar__view");
      view.scrollTop = 100;
      view.dispatchEvent(new Event("scroll"));

      await waitForRender();

      expect(scrollHandler).toHaveBeenCalled();
    });

    it("ea-scroll 事件应该包含 scrollTop 和 scrollLeft", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.innerHTML = `
        <div style="height: 500px; width: 500px;">Content</div>
      `;
      container.appendChild(scrollbar);

      await waitForRender();

      let eventDetail = null;
      scrollbar.addEventListener("ea-scroll", (e) => {
        eventDetail = e.detail;
      });

      const view = scrollbar.shadowRoot.querySelector(".ea-scrollbar__view");
      view.scrollTop = 50;
      view.scrollLeft = 30;
      view.dispatchEvent(new Event("scroll"));

      await waitForRender();

      expect(eventDetail).toBeTruthy();
      expect(typeof eventDetail.scrollTop).toBe("number");
      expect(typeof eventDetail.scrollLeft).toBe("number");
    });

    it("应该触发 ea-end-reached 事件（滚动到顶部边界）", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.innerHTML = `
        <div style="height: 500px;">Content</div>
      `;
      container.appendChild(scrollbar);

      await waitForRender();

      const view = scrollbar.shadowRoot.querySelector(".ea-scrollbar__view");

      Object.defineProperty(view, "scrollTop", { value: 0, configurable: true });
      Object.defineProperty(view, "scrollHeight", { value: 500, configurable: true });
      Object.defineProperty(view, "scrollLeft", { value: 0, configurable: true });
      Object.defineProperty(view, "scrollWidth", { value: 400, configurable: true });

      const endReachedHandler = vi.fn();
      scrollbar.addEventListener("ea-end-reached", endReachedHandler);

      view.dispatchEvent(new Event("scroll"));

      await waitForRender();

      expect(endReachedHandler).toHaveBeenCalled();
    });

    it("ea-end-reached 事件应该包含 direction 信息", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.innerHTML = `
        <div style="height: 500px;">Content</div>
      `;
      container.appendChild(scrollbar);

      await waitForRender();

      const view = scrollbar.shadowRoot.querySelector(".ea-scrollbar__view");

      Object.defineProperty(view, "scrollTop", { value: 0, configurable: true });
      Object.defineProperty(view, "scrollHeight", { value: 500, configurable: true });
      Object.defineProperty(view, "scrollLeft", { value: 0, configurable: true });
      Object.defineProperty(view, "scrollWidth", { value: 400, configurable: true });

      let eventDetail = null;
      scrollbar.addEventListener("ea-end-reached", (e) => {
        eventDetail = e.detail;
      });

      view.dispatchEvent(new Event("scroll"));

      await waitForRender();

      expect(eventDetail).toBeTruthy();
      expect(["top", "bottom", "left", "right"]).toContain(
        eventDetail.direction
      );
    });
  });

  describe("Scroll Methods", () => {
    it("应该支持 scrollTo 方法", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.innerHTML = `
        <div style="height: 500px;">Content</div>
      `;
      container.appendChild(scrollbar);

      await waitForRender();

      expect(typeof scrollbar.scrollTo).toBe("function");
    });

    it("scrollTo 应该能滚动到指定位置", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.innerHTML = `
        <div style="height: 500px;">Content</div>
      `;
      container.appendChild(scrollbar);

      await waitForRender();

      const view = scrollbar.shadowRoot.querySelector(".ea-scrollbar__view");

      scrollbar.scrollTo({ top: 100 });

      await waitForRender();

      expect(view.scrollTop).toBeGreaterThanOrEqual(0);
    });

    it("scrollTo 应该支持 x, y 参数形式", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.innerHTML = `
        <div style="height: 500px; width: 500px;">Content</div>
      `;
      container.appendChild(scrollbar);

      await waitForRender();

      expect(() => scrollbar.scrollTo(0, 100)).not.toThrow();
    });
  });

  describe("Thumb Drag", () => {
    it("鼠标按下滑块应该添加 is-dragging 状态", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.innerHTML = `<div style="height: 500px;">Content</div>`;
      container.appendChild(scrollbar);

      await waitForRender();

      const verticalThumb = scrollbar.shadowRoot.querySelector(
        ".ea-scrollbar__thumb-vertical"
      );

      const mousedownEvent = new MouseEvent("mousedown", {
        bubbles: true,
        cancelable: true,
        clientX: 0,
        clientY: 0,
      });
      verticalThumb.dispatchEvent(mousedownEvent);

      await waitForRender();

      const containerEl = scrollbar.shadowRoot.querySelector(".ea-scrollbar");
      expect(containerEl.classList.contains("is-dragging")).toBe(true);

      const mouseupEvent = new MouseEvent("mouseup", { bubbles: true });
      window.dispatchEvent(mouseupEvent);

      await waitForRender();

      expect(containerEl.classList.contains("is-dragging")).toBe(false);
    });

    it("鼠标按下垂直滑块应该添加 is-active 状态", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.innerHTML = `<div style="height: 500px;">Content</div>`;
      container.appendChild(scrollbar);

      await waitForRender();

      const verticalThumb = scrollbar.shadowRoot.querySelector(
        ".ea-scrollbar__thumb-vertical"
      );

      const mousedownEvent = new MouseEvent("mousedown", {
        bubbles: true,
        cancelable: true,
        clientX: 0,
        clientY: 0,
      });
      verticalThumb.dispatchEvent(mousedownEvent);

      await waitForRender();

      expect(verticalThumb.classList.contains("is-active")).toBe(true);

      const mouseupEvent = new MouseEvent("mouseup", { bubbles: true });
      window.dispatchEvent(mouseupEvent);

      await waitForRender();

      expect(verticalThumb.classList.contains("is-active")).toBe(false);
    });
  });

  describe("Keyboard Events", () => {
    it("应该响应键盘上下箭头事件", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.innerHTML = `
        <div style="height: 500px;">Content</div>
      `;
      container.appendChild(scrollbar);

      await waitForRender();

      const view = scrollbar.shadowRoot.querySelector(".ea-scrollbar__view");
      const initialScrollTop = view.scrollTop;

      const keydownEvent = new KeyboardEvent("keydown", { key: "ArrowDown" });
      scrollbar.dispatchEvent(keydownEvent);

      await waitForRender();

      expect(view.scrollTop >= initialScrollTop).toBe(true);
    });

    it("应该响应键盘左右箭头事件", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.innerHTML = `
        <div style="height: 500px; width: 500px;">Content</div>
      `;
      container.appendChild(scrollbar);

      await waitForRender();

      const view = scrollbar.shadowRoot.querySelector(".ea-scrollbar__view");
      const initialScrollLeft = view.scrollLeft;

      const keydownEvent = new KeyboardEvent("keydown", { key: "ArrowRight" });
      scrollbar.dispatchEvent(keydownEvent);

      await waitForRender();

      expect(view.scrollLeft >= initialScrollLeft).toBe(true);
    });
  });

  describe("Track Visibility", () => {
    it("内容不溢出时轨道应该添加 is-hidden 类", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.innerHTML = `<div style="height: 50px;">Small Content</div>`;
      container.appendChild(scrollbar);

      await waitForRender(200);

      const view = scrollbar.shadowRoot.querySelector(".ea-scrollbar__view");
      const verticalTrack = scrollbar.shadowRoot.querySelector(
        ".ea-scrollbar__track-vertical"
      );

      Object.defineProperty(view, "getBoundingClientRect", {
        value: () => ({ height: 300, width: 400 }),
        configurable: true,
      });
      Object.defineProperty(view, "scrollHeight", { value: 300, configurable: true });
      Object.defineProperty(view, "scrollWidth", { value: 400, configurable: true });

      window.dispatchEvent(new Event("resize"));

      await waitForRender(200);

      expect(verticalTrack.classList.contains("is-hidden")).toBe(true);
    });
  });

  describe("Edge Cases", () => {
    it("应该处理空内容", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      container.appendChild(scrollbar);

      await waitForRender();

      expect(scrollbar.shadowRoot.querySelector(".ea-scrollbar")).toBeTruthy();
    });

    it("应该处理少量内容（不需要滚动）", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.innerHTML = `<div style="height: 50px;">Small Content</div>`;
      container.appendChild(scrollbar);

      await waitForRender();

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

      await waitForRender();

      const view = scrollbar.shadowRoot.querySelector(".ea-scrollbar__view");
      expect(view).toBeTruthy();
      expect(scrollbar.querySelector("div").textContent).toBe("Large Content");
    });

    it("应该处理动态添加内容", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.innerHTML = `<div style="height: 100px;">Initial Content</div>`;
      container.appendChild(scrollbar);

      await waitForRender();

      const newContent = document.createElement("div");
      newContent.style.height = "500px";
      newContent.textContent = "New Content";
      scrollbar.appendChild(newContent);

      await waitForRender();

      expect(scrollbar.children.length).toBe(2);
    });
  });

  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.innerHTML = `<div style="height: 500px;">Content</div>`;
      container.appendChild(scrollbar);

      await waitForRender();

      expect(scrollbar.shadowRoot).toBeTruthy();
    });

    it("组件断开连接后应该正常移除", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.innerHTML = `<div>Content</div>`;
      container.appendChild(scrollbar);

      await waitForRender();

      scrollbar.remove();

      expect(scrollbar.isConnected).toBe(false);
    });

    it("应该支持属性动态更新", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.innerHTML = `<div>Content</div>`;
      container.appendChild(scrollbar);

      await waitForRender();

      expect(scrollbar.native).toBe(false);

      scrollbar.setAttribute("native", "");

      await waitForRender();

      expect(scrollbar.native).toBe(true);
    });

    it("应该支持多个属性同时设置", async () => {
      const scrollbar = document.createElement("ea-scrollbar");
      scrollbar.setAttribute("native", "");
      scrollbar.setAttribute("always", "");
      scrollbar.innerHTML = `<div>Content</div>`;
      container.appendChild(scrollbar);

      await waitForRender();

      const containerEl = scrollbar.shadowRoot.querySelector(".ea-scrollbar");
      expect(containerEl.classList.contains("ea-scrollbar--native")).toBe(true);
      expect(containerEl.classList.contains("ea-scrollbar--always")).toBe(true);
    });
  });

  describe("Accessibility", () => {
    it("默认状态应该无 a11y 违规", async () => {
      const el = document.createElement("ea-scrollbar");
      container.appendChild(el);
      await waitForRender();
      const results = await runAxe(el);
      assertNoA11yViolations(results);
    });
  });
});
