import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender";

import "../components/ea-watermark/index";

class MockImage {
  static instances = [];

  constructor() {
    MockImage.instances.push(this);
    this.onload = null;
    this.onerror = null;
  }

  set src(value) {
    this._src = value;
    if (this.onload) this.onload();
  }

  get src() {
    return this._src;
  }
}

describe("EaWatermark", () => {
  let container;
  let originalGetContext;
  let originalToDataURL;
  let originalImage;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);

    MockImage.instances = [];

    originalGetContext = HTMLCanvasElement.prototype.getContext;
    originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
    originalImage = global.Image;

    HTMLCanvasElement.prototype.getContext = vi.fn(() => ({
      font: "",
      fillStyle: "",
      textAlign: "",
      textBaseline: "",
      rotate: vi.fn(),
      translate: vi.fn(),
      drawImage: vi.fn(),
      fillText: vi.fn(),
    }));

    HTMLCanvasElement.prototype.toDataURL = vi.fn(
      () => "data:image/png;base64,mockWatermark"
    );

    global.Image = MockImage;
  });

  afterEach(() => {
    HTMLCanvasElement.prototype.getContext = originalGetContext;
    HTMLCanvasElement.prototype.toDataURL = originalToDataURL;
    global.Image = originalImage;
    container.remove();
  });

  describe("Basic Functionality", () => {
    it("应该正确渲染 ea-watermark 组件", async () => {
      const el = document.createElement("ea-watermark");
      container.appendChild(el);

      await waitForRender();

      expect(el).toBeDefined();
      expect(el.shadowRoot).toBeDefined();
    });

    it("应该包含 .ea-watermark 容器元素", async () => {
      const el = document.createElement("ea-watermark");
      container.appendChild(el);

      await waitForRender();

      const containerEl = el.shadowRoot.querySelector(".ea-watermark");
      expect(containerEl).toBeDefined();
    });

    it("应该包含 container 和 content CSS Part", async () => {
      const el = document.createElement("ea-watermark");
      container.appendChild(el);

      await waitForRender();

      expect(el.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
      expect(el.shadowRoot.querySelector('[part="content"]')).toBeTruthy();
    });

    it("应该包含 slot 元素", async () => {
      const el = document.createElement("ea-watermark");
      el.innerHTML = '<div class="test-content">Content</div>';
      container.appendChild(el);

      await waitForRender();

      const slot = el.shadowRoot.querySelector("slot");
      expect(slot).toBeDefined();
      expect(el.textContent).toContain("Content");
    });

    it("挂载后应该生成水印背景图", async () => {
      const el = document.createElement("ea-watermark");
      container.appendChild(el);

      await waitForRender();

      const content = el.shadowRoot.querySelector('[part="content"]');
      expect(content.style.backgroundImage).toContain("data:image/png");
    });
  });

  describe("Width / Height Attributes", () => {
    it("默认 width 应该是 120", async () => {
      const el = document.createElement("ea-watermark");
      container.appendChild(el);

      await waitForRender();

      expect(el.width).toBe(120);
    });

    it("默认 height 应该是 64", async () => {
      const el = document.createElement("ea-watermark");
      container.appendChild(el);

      await waitForRender();

      expect(el.height).toBe(64);
    });

    it("应该正确设置 width 和 height", async () => {
      const el = document.createElement("ea-watermark");
      el.setAttribute("width", "96");
      el.setAttribute("height", "96");
      container.appendChild(el);

      await waitForRender();

      expect(el.width).toBe(96);
      expect(el.height).toBe(96);

      const content = el.shadowRoot.querySelector('[part="content"]');
      expect(content.style.backgroundSize).toBe("96px 96px");
    });

    it("width 变化时应该更新背景尺寸", async () => {
      const el = document.createElement("ea-watermark");
      container.appendChild(el);

      await waitForRender();

      el.setAttribute("width", "200");
      await waitForRender();

      const content = el.shadowRoot.querySelector('[part="content"]');
      expect(content.style.backgroundSize).toBe("200px 64px");
    });
  });

  describe("Rotate Attribute", () => {
    it("默认 rotate 应该是 -22", async () => {
      const el = document.createElement("ea-watermark");
      container.appendChild(el);

      await waitForRender();

      expect(el.rotate).toBe(-22);
    });

    it("应该正确设置 rotate 属性", async () => {
      const el = document.createElement("ea-watermark");
      el.setAttribute("rotate", "-30");
      container.appendChild(el);

      await waitForRender();

      expect(el.rotate).toBe(-30);
    });
  });

  describe("ZIndex Attribute", () => {
    it("默认 zIndex 应该是 9", async () => {
      const el = document.createElement("ea-watermark");
      container.appendChild(el);

      await waitForRender();

      expect(el.zIndex).toBe(9);
    });

    it("挂载后 content 的 z-index 应该是默认值 9", async () => {
      const el = document.createElement("ea-watermark");
      container.appendChild(el);

      await waitForRender();

      const content = el.shadowRoot.querySelector('[part="content"]');
      expect(content.style.zIndex).toBe("9");
    });

    it("z-index 变化时应该更新 content 样式", async () => {
      const el = document.createElement("ea-watermark");
      container.appendChild(el);

      await waitForRender();

      el.setAttribute("z-index", "100");
      await waitForRender();

      const content = el.shadowRoot.querySelector('[part="content"]');
      expect(content.style.zIndex).toBe("100");
    });
  });

  describe("Content Attribute", () => {
    it("默认 content 应该是 watermark", async () => {
      const el = document.createElement("ea-watermark");
      container.appendChild(el);

      await waitForRender();

      expect(el.content).toBe("watermark");
    });

    it("应该正确设置 content 属性", async () => {
      const el = document.createElement("ea-watermark");
      el.setAttribute("content", "Confidential");
      container.appendChild(el);

      await waitForRender();

      expect(el.content).toBe("Confidential");
    });

    it("content 变化时应该重新生成水印", async () => {
      const el = document.createElement("ea-watermark");
      container.appendChild(el);

      await waitForRender();

      const contentEl = el.shadowRoot.querySelector('[part="content"]');
      expect(contentEl.style.backgroundImage).toContain("data:image/png");

      el.content = "Secret";
      await waitForRender();

      expect(contentEl.style.backgroundImage).toContain("data:image/png");
    });
  });

  describe("Image Attribute", () => {
    it("默认 image 应该是空字符串", async () => {
      const el = document.createElement("ea-watermark");
      container.appendChild(el);

      await waitForRender();

      expect(el.image).toBe("");
    });

    it("设置 image 后应该通过 canvas 绘制为水印背景", async () => {
      const el = document.createElement("ea-watermark");
      el.setAttribute("image", "https://example.com/watermark.png");
      el.setAttribute("width", "96");
      el.setAttribute("height", "96");
      container.appendChild(el);

      await waitForRender();

      const content = el.shadowRoot.querySelector('[part="content"]');
      expect(content.style.backgroundImage).toContain("data:image/png");
      expect(content.style.backgroundSize).toBe("96px 96px");

      const lastImage = MockImage.instances[MockImage.instances.length - 1];
      expect(lastImage.src).toBe("https://example.com/watermark.png");
    });

    it("图片水印应该应用 rotate 旋转", async () => {
      const el = document.createElement("ea-watermark");
      el.setAttribute("image", "https://example.com/watermark.png");
      container.appendChild(el);

      await waitForRender();

      const results = HTMLCanvasElement.prototype.getContext.mock.results;
      const lastCtx = results[results.length - 1].value;
      expect(lastCtx.rotate).toHaveBeenCalledWith((Math.PI / 180) * -22);
      expect(lastCtx.drawImage).toHaveBeenCalled();
    });

    it("image 变化时应该切换水印来源", async () => {
      const el = document.createElement("ea-watermark");
      container.appendChild(el);

      await waitForRender();

      const content = el.shadowRoot.querySelector('[part="content"]');
      expect(content.style.backgroundImage).toContain("data:image/png");

      el.setAttribute("image", "https://example.com/new.png");
      await waitForRender();

      const lastImage = MockImage.instances[MockImage.instances.length - 1];
      expect(lastImage.src).toBe("https://example.com/new.png");
      expect(content.style.backgroundImage).toContain("data:image/png");
    });
  });

  describe("Font Property", () => {
    it("默认 font 应该合并完整默认值", async () => {
      const el = document.createElement("ea-watermark");
      container.appendChild(el);

      await waitForRender();

      expect(el.font).toEqual({
        color: "rgba(0, 0, 0, 0.15)",
        fontSize: 16,
        fontWeight: "normal",
        fontFamily: "sans-serif",
        fontGap: 3,
        fontStyle: "normal",
        textAlign: "center",
        textBaseline: "hanging",
      });
    });

    it("设置 font 后不应影响组件渲染", async () => {
      const el = document.createElement("ea-watermark");
      container.appendChild(el);

      await waitForRender();

      el.font = { color: "rgba(0, 100, 200, 0.25)", fontSize: 20 };
      await waitForRender();

      const content = el.shadowRoot.querySelector('[part="content"]');
      expect(content.style.backgroundImage).toContain("data:image/png");
    });
  });

  describe("Gap / Offset Properties", () => {
    it("默认 gap 应该是 [100, 100]", async () => {
      const el = document.createElement("ea-watermark");
      container.appendChild(el);

      await waitForRender();

      expect(el.gap).toEqual([100, 100]);
    });

    it("默认 offset 应该是 null", async () => {
      const el = document.createElement("ea-watermark");
      container.appendChild(el);

      await waitForRender();

      expect(el.offset).toBeNull();
    });

    it("未设置 offset 时背景位置默认取 gap 的一半", async () => {
      const el = document.createElement("ea-watermark");
      el.gap = [200, 200];
      container.appendChild(el);

      await waitForRender();

      const content = el.shadowRoot.querySelector('[part="content"]');
      expect(content.style.backgroundPosition).toBe("100px 100px");
    });

    it("设置 offset 后背景位置使用自定义偏移", async () => {
      const el = document.createElement("ea-watermark");
      el.offset = [30, 40];
      container.appendChild(el);

      await waitForRender();

      const content = el.shadowRoot.querySelector('[part="content"]');
      expect(content.style.backgroundPosition).toBe("30px 40px");
    });
  });

  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const el = document.createElement("ea-watermark");
      container.appendChild(el);

      await waitForRender();

      expect(el.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
      expect(el.shadowRoot.querySelector('[part="content"]')).toBeTruthy();
    });

    it("组件断开连接后应该正常移除", () => {
      const el = document.createElement("ea-watermark");
      container.appendChild(el);

      el.remove();

      expect(container.contains(el)).toBe(false);
    });
  });
});
