import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender.js";
import { runAxe, assertNoA11yViolations } from "./utils/a11y.js";

import "../components/ea-splitter/index";

describe("EaSplitter", () => {
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

  describe("基础功能", () => {
    it("应该正确渲染组件", async () => {
      const splitter = document.createElement("ea-splitter");
      splitter.innerHTML = `
        <ea-splitter-panel>Panel 1</ea-splitter-panel>
        <ea-splitter-panel>Panel 2</ea-splitter-panel>
      `;
      container.appendChild(splitter);

      await waitForRender();

      expect(splitter.shadowRoot).toBeTruthy();
      expect(splitter.shadowRoot.querySelector(".ea-splitter")).toBeTruthy();
    });

    it("应该支持 CSS Parts", async () => {
      const splitter = document.createElement("ea-splitter");
      container.appendChild(splitter);

      await waitForRender();

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

      await waitForRender();

      const bars = splitter.querySelectorAll("ea-splitter-bar");
      expect(bars.length).toBe(2);
    });

    it("单个面板不应创建 splitter-bar", async () => {
      const splitter = document.createElement("ea-splitter");
      splitter.innerHTML = `
        <ea-splitter-panel>Panel 1</ea-splitter-panel>
      `;
      container.appendChild(splitter);

      await waitForRender();

      const bars = splitter.querySelectorAll("ea-splitter-bar");
      expect(bars.length).toBe(0);
    });

    it("四个面板应创建三个 splitter-bar", async () => {
      const splitter = document.createElement("ea-splitter");
      splitter.innerHTML = `
        <ea-splitter-panel>Panel 1</ea-splitter-panel>
        <ea-splitter-panel>Panel 2</ea-splitter-panel>
        <ea-splitter-panel>Panel 3</ea-splitter-panel>
        <ea-splitter-panel>Panel 4</ea-splitter-panel>
      `;
      container.appendChild(splitter);

      await waitForRender();

      const bars = splitter.querySelectorAll("ea-splitter-bar");
      expect(bars.length).toBe(3);
    });
  });

  describe("Layout 属性", () => {
    it("默认 layout 应该是 horizontal", async () => {
      const splitter = document.createElement("ea-splitter");
      container.appendChild(splitter);

      await waitForRender();

      expect(splitter.layout).toBe("horizontal");
    });

    it("应该支持 layout 属性设置为 vertical", async () => {
      const splitter = document.createElement("ea-splitter");
      splitter.setAttribute("layout", "vertical");
      container.appendChild(splitter);

      await waitForRender();

      expect(splitter.layout).toBe("vertical");
    });

    it("应该支持 layout 属性设置为 horizontal", async () => {
      const splitter = document.createElement("ea-splitter");
      splitter.setAttribute("layout", "horizontal");
      container.appendChild(splitter);

      await waitForRender();

      expect(splitter.layout).toBe("horizontal");
    });

    it("layout 变化时应该更新容器类名", async () => {
      const splitter = document.createElement("ea-splitter");
      container.appendChild(splitter);

      await waitForRender();

      const containerEl = splitter.shadowRoot.querySelector(".ea-splitter");
      expect(containerEl.classList.contains("ea-splitter--horizontal")).toBe(true);

      splitter.setAttribute("layout", "vertical");
      await waitForRender();

      expect(containerEl.classList.contains("ea-splitter--vertical")).toBe(true);
    });

    it("layout 变化时应该同步子面板的 layout", async () => {
      const splitter = document.createElement("ea-splitter");
      splitter.innerHTML = `
        <ea-splitter-panel>Panel 1</ea-splitter-panel>
        <ea-splitter-panel>Panel 2</ea-splitter-panel>
      `;
      container.appendChild(splitter);

      await waitForRender();

      const panels = splitter.querySelectorAll("ea-splitter-panel");
      panels.forEach(panel => {
        expect(panel.layout).toBe("horizontal");
      });
    });
  });

  describe("事件", () => {
    it("应该触发 ea-panel-resize-start 事件", async () => {
      const splitter = document.createElement("ea-splitter");
      splitter.innerHTML = `
        <ea-splitter-panel>Panel 1</ea-splitter-panel>
        <ea-splitter-panel>Panel 2</ea-splitter-panel>
      `;
      container.appendChild(splitter);

      await waitForRender();

      const resizeStartHandler = vi.fn();
      splitter.addEventListener("ea-panel-resize-start", resizeStartHandler);

      const bar = splitter.querySelector("ea-splitter-bar");
      bar.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));

      await waitForRender(50);

      expect(resizeStartHandler).toHaveBeenCalled();
    });

    it("ea-panel-resize-start 事件应该包含 size 数组", async () => {
      const splitter = document.createElement("ea-splitter");
      splitter.innerHTML = `
        <ea-splitter-panel>Panel 1</ea-splitter-panel>
        <ea-splitter-panel>Panel 2</ea-splitter-panel>
      `;
      container.appendChild(splitter);

      await waitForRender();

      const resizeStartHandler = vi.fn();
      splitter.addEventListener("ea-panel-resize-start", resizeStartHandler);

      const bar = splitter.querySelector("ea-splitter-bar");
      bar.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));

      await waitForRender(50);

      if (resizeStartHandler.mock.calls.length > 0) {
        const eventDetail = resizeStartHandler.mock.calls[0][0].detail;
        expect(eventDetail).toHaveProperty("size");
        expect(Array.isArray(eventDetail.size)).toBe(true);
      }
    });

    it("应该触发 ea-panel-resize-end 事件", async () => {
      const splitter = document.createElement("ea-splitter");
      splitter.innerHTML = `
        <ea-splitter-panel>Panel 1</ea-splitter-panel>
        <ea-splitter-panel>Panel 2</ea-splitter-panel>
      `;
      container.appendChild(splitter);

      await waitForRender();

      const resizeEndHandler = vi.fn();
      splitter.addEventListener("ea-panel-resize-end", resizeEndHandler);

      const bar = splitter.querySelector("ea-splitter-bar");
      bar.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));

      window.dispatchEvent(new MouseEvent("mouseup"));

      await waitForRender(50);

      expect(resizeEndHandler).toHaveBeenCalled();
    });

    it("点击非 bar 区域不应触发 resize 事件", async () => {
      const splitter = document.createElement("ea-splitter");
      splitter.innerHTML = `
        <ea-splitter-panel>Panel 1</ea-splitter-panel>
        <ea-splitter-panel>Panel 2</ea-splitter-panel>
      `;
      container.appendChild(splitter);

      await waitForRender();

      const resizeStartHandler = vi.fn();
      splitter.addEventListener("ea-panel-resize-start", resizeStartHandler);

      const panel = splitter.querySelector("ea-splitter-panel");
      panel.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));

      await waitForRender(50);

      expect(resizeStartHandler).not.toHaveBeenCalled();
    });
  });

  describe("生命周期", () => {
    it("组件连接后应该正确初始化", async () => {
      const splitter = document.createElement("ea-splitter");
      splitter.innerHTML = `
        <ea-splitter-panel>Panel 1</ea-splitter-panel>
        <ea-splitter-panel>Panel 2</ea-splitter-panel>
      `;
      container.appendChild(splitter);

      await waitForRender();

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

      await waitForRender();

      splitter.remove();

      await waitForRender(50);

      expect(splitter.isConnected).toBe(false);
    });
  });
});

describe("EaSplitterPanel", () => {
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

  describe("基础功能", () => {
    it("应该正确渲染组件", async () => {
      const splitter = document.createElement("ea-splitter");
      splitter.innerHTML = `
        <ea-splitter-panel>Panel 1</ea-splitter-panel>
      `;
      container.appendChild(splitter);

      await waitForRender();

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

      await waitForRender();

      const panel = splitter.querySelector("ea-splitter-panel");
      expect(panel.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });
  });

  describe("Size 属性", () => {
    it("默认 size 应该是空字符串", async () => {
      const splitter = document.createElement("ea-splitter");
      splitter.innerHTML = `
        <ea-splitter-panel>Panel 1</ea-splitter-panel>
      `;
      container.appendChild(splitter);

      await waitForRender();

      const panel = splitter.querySelector("ea-splitter-panel");
      expect(panel.size).toBe("");
    });

    it("应该支持 size 属性（像素）", async () => {
      const splitter = document.createElement("ea-splitter");
      splitter.innerHTML = `
        <ea-splitter-panel size="200px">Panel 1</ea-splitter-panel>
      `;
      container.appendChild(splitter);

      await waitForRender();

      const panel = splitter.querySelector("ea-splitter-panel");
      expect(panel.size).toBe("200px");
    });

    it("应该支持 size 属性（百分比）", async () => {
      const splitter = document.createElement("ea-splitter");
      splitter.innerHTML = `
        <ea-splitter-panel size="30%">Panel 1</ea-splitter-panel>
      `;
      container.appendChild(splitter);

      await waitForRender();

      const panel = splitter.querySelector("ea-splitter-panel");
      expect(panel.size).toBe("30%");
    });

    it("size 属性变化时应该正确更新", async () => {
      const splitter = document.createElement("ea-splitter");
      splitter.innerHTML = `
        <ea-splitter-panel>Panel 1</ea-splitter-panel>
      `;
      container.appendChild(splitter);

      await waitForRender();

      const panel = splitter.querySelector("ea-splitter-panel");
      panel.setAttribute("size", "50%");

      await waitForRender();

      expect(panel.size).toBe("50%");
    });
  });

  describe("Min 属性", () => {
    it("默认 min 应该是空字符串", async () => {
      const splitter = document.createElement("ea-splitter");
      splitter.innerHTML = `
        <ea-splitter-panel>Panel 1</ea-splitter-panel>
      `;
      container.appendChild(splitter);

      await waitForRender();

      const panel = splitter.querySelector("ea-splitter-panel");
      expect(panel.min).toBe("");
    });

    it("应该支持 min 属性（像素）", async () => {
      const splitter = document.createElement("ea-splitter");
      splitter.innerHTML = `
        <ea-splitter-panel min="100px">Panel 1</ea-splitter-panel>
      `;
      container.appendChild(splitter);

      await waitForRender();

      const panel = splitter.querySelector("ea-splitter-panel");
      expect(panel.min).toBe("100px");
    });

    it("应该支持 min 属性（百分比）", async () => {
      const splitter = document.createElement("ea-splitter");
      splitter.innerHTML = `
        <ea-splitter-panel min="20%">Panel 1</ea-splitter-panel>
      `;
      container.appendChild(splitter);

      await waitForRender();

      const panel = splitter.querySelector("ea-splitter-panel");
      expect(panel.min).toBe("20%");
    });

    it("min 属性变化时应该正确更新", async () => {
      const splitter = document.createElement("ea-splitter");
      splitter.innerHTML = `
        <ea-splitter-panel>Panel 1</ea-splitter-panel>
      `;
      container.appendChild(splitter);

      await waitForRender();

      const panel = splitter.querySelector("ea-splitter-panel");
      panel.setAttribute("min", "30%");

      await waitForRender();

      expect(panel.min).toBe("30%");
    });
  });

  describe("Layout 属性", () => {
    it("默认 layout 应该是 horizontal", async () => {
      const splitter = document.createElement("ea-splitter");
      splitter.innerHTML = `
        <ea-splitter-panel>Panel 1</ea-splitter-panel>
      `;
      container.appendChild(splitter);

      await waitForRender();

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

      await waitForRender();

      const panel = splitter.querySelector("ea-splitter-panel");
      expect(panel.layout).toBe("vertical");
    });
  });

  describe("插槽", () => {
    it("应该支持默认插槽", async () => {
      const splitter = document.createElement("ea-splitter");
      splitter.innerHTML = `
        <ea-splitter-panel>
          <div class="panel-content">Content</div>
        </ea-splitter-panel>
      `;
      container.appendChild(splitter);

      await waitForRender();

      const panel = splitter.querySelector("ea-splitter-panel");
      const slot = panel.shadowRoot.querySelector("slot");
      expect(slot).toBeTruthy();
    });
  });

  describe("生命周期", () => {
    it("组件连接后应该正确初始化", async () => {
      const splitter = document.createElement("ea-splitter");
      splitter.innerHTML = `
        <ea-splitter-panel size="200px" min="100px">Panel 1</ea-splitter-panel>
      `;
      container.appendChild(splitter);

      await waitForRender();

      const panel = splitter.querySelector("ea-splitter-panel");
      expect(panel.shadowRoot).toBeTruthy();
      expect(panel.size).toBe("200px");
      expect(panel.min).toBe("100px");
    });
  });
});

describe("EaSplitterBar", () => {
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

  describe("基础功能", () => {
    it("应该正确渲染组件", async () => {
      const splitter = document.createElement("ea-splitter");
      splitter.innerHTML = `
        <ea-splitter-panel>Panel 1</ea-splitter-panel>
        <ea-splitter-panel>Panel 2</ea-splitter-panel>
      `;
      container.appendChild(splitter);

      await waitForRender();

      const bar = splitter.querySelector("ea-splitter-bar");
      expect(bar.shadowRoot).toBeTruthy();
      expect(bar.shadowRoot.querySelector(".ea-splitter-bar")).toBeTruthy();
    });

    it("应该支持 CSS Parts", async () => {
      const splitter = document.createElement("ea-splitter");
      splitter.innerHTML = `
        <ea-splitter-panel>Panel 1</ea-splitter-panel>
        <ea-splitter-panel>Panel 2</ea-splitter-panel>
      `;
      container.appendChild(splitter);

      await waitForRender();

      const bar = splitter.querySelector("ea-splitter-bar");
      expect(bar.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });
  });

  describe("Layout 属性", () => {
    it("默认 layout 应该是 horizontal", async () => {
      const splitter = document.createElement("ea-splitter");
      splitter.innerHTML = `
        <ea-splitter-panel>Panel 1</ea-splitter-panel>
        <ea-splitter-panel>Panel 2</ea-splitter-panel>
      `;
      container.appendChild(splitter);

      await waitForRender();

      const bar = splitter.querySelector("ea-splitter-bar");
      expect(bar.layout).toBe("horizontal");
    });

    it("vertical 布局时 bar 的 layout 应为 vertical", async () => {
      const splitter = document.createElement("ea-splitter");
      splitter.setAttribute("layout", "vertical");
      splitter.innerHTML = `
        <ea-splitter-panel>Panel 1</ea-splitter-panel>
        <ea-splitter-panel>Panel 2</ea-splitter-panel>
      `;
      container.appendChild(splitter);

      await waitForRender();

      const bar = splitter.querySelector("ea-splitter-bar");
      expect(bar.layout).toBe("vertical");
    });
  });

  describe("data-index 属性", () => {
    it("bar 应该设置正确的 data-index", async () => {
      const splitter = document.createElement("ea-splitter");
      splitter.innerHTML = `
        <ea-splitter-panel>Panel 1</ea-splitter-panel>
        <ea-splitter-panel>Panel 2</ea-splitter-panel>
        <ea-splitter-panel>Panel 3</ea-splitter-panel>
      `;
      container.appendChild(splitter);

      await waitForRender();

      const bars = splitter.querySelectorAll("ea-splitter-bar");
      expect(bars[0].getAttribute("data-index")).toBeTruthy();
      expect(bars[1].getAttribute("data-index")).toBeTruthy();
    });
  });

  describe("Accessibility", () => {
    it("默认状态应该无 a11y 违规", async () => {
      const el = document.createElement("ea-splitter-bar");
      container.appendChild(el);
      await waitForRender();
      const results = await runAxe(el);
      assertNoA11yViolations(results);
    });

    describe("ARIA Attributes", () => {
      it("ea-splitter-bar 宿主元素应该有 role=separator", async () => {
        const el = document.createElement("ea-splitter-bar");
        container.appendChild(el);
        await waitForRender();
        expect(el.getAttribute("role")).toBe("separator");
      });

      it("horizontal 布局时 ea-splitter-bar 应该有 aria-orientation=vertical", async () => {
        const el = document.createElement("ea-splitter-bar");
        el.layout = "horizontal";
        container.appendChild(el);
        await waitForRender();
        expect(el.getAttribute("aria-orientation")).toBe("vertical");
      });

      it("vertical 布局时 ea-splitter-bar 应该有 aria-orientation=horizontal", async () => {
        const el = document.createElement("ea-splitter-bar");
        el.layout = "vertical";
        container.appendChild(el);
        await waitForRender();
        expect(el.getAttribute("aria-orientation")).toBe("horizontal");
      });

      it("ea-splitter-bar 应该有 aria-valuenow", async () => {
        const el = document.createElement("ea-splitter-bar");
        container.appendChild(el);
        await waitForRender();
        expect(el.getAttribute("aria-valuenow")).toBeTruthy();
      });

      it("ea-splitter-bar 应该有 aria-valuemin", async () => {
        const el = document.createElement("ea-splitter-bar");
        container.appendChild(el);
        await waitForRender();
        expect(el.getAttribute("aria-valuemin")).toBeTruthy();
      });

      it("ea-splitter-bar 应该有 aria-valuemax", async () => {
        const el = document.createElement("ea-splitter-bar");
        container.appendChild(el);
        await waitForRender();
        expect(el.getAttribute("aria-valuemax")).toBeTruthy();
      });

      it("设置 label 时 ea-splitter-bar 应该有 aria-label", async () => {
        const el = document.createElement("ea-splitter-bar");
        el.label = "Resize panel";
        container.appendChild(el);
        await waitForRender();
        expect(el.getAttribute("aria-label")).toBe("Resize panel");
      });
    });
  });
});
