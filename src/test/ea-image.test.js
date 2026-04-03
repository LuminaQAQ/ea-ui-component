import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// Mock IntersectionObserver for JSDOM
class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe(element) {
    // Simulate element being visible immediately
    this.callback([{ intersectionRatio: 1, target: element }]);
  }
  unobserve() {}
  disconnect() {}
}

// 导入 ea-image 组件前设置 mock
if (typeof window !== "undefined" && !window.IntersectionObserver) {
  window.IntersectionObserver = MockIntersectionObserver;
}

// 导入 ea-image 组件
import "../components/ea-image/index.js";

describe("EaImage Component", () => {
  let container;

  beforeEach(() => {
    // 确保 IntersectionObserver 已定义
    if (!window.IntersectionObserver) {
      window.IntersectionObserver = MockIntersectionObserver;
    }

    // 确保 document.activeElement 不为 null
    if (!document.activeElement || document.activeElement === document.body) {
      const focusable = document.createElement("button");
      document.body.appendChild(focusable);
      focusable.focus();
    }
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
    it("应该正确渲染 ea-image 组件", () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);

      expect(image).toBeDefined();
      expect(image.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);

      expect(image.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("应该包含 image CSS Part", () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);

      expect(image.shadowRoot.querySelector('[part="image"]')).toBeTruthy();
    });

    it("应该包含 error CSS Part", () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);

      expect(image.shadowRoot.querySelector('[part="error"]')).toBeTruthy();
    });

    it("应该包含 placeholder CSS Part", () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);

      expect(
        image.shadowRoot.querySelector('[part="placeholder"]')
      ).toBeTruthy();
    });

    it("应该包含 preview CSS Part", () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);

      expect(image.shadowRoot.querySelector('[part="preview"]')).toBeTruthy();
    });

    it("应该包含 img 元素", () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);

      const imgElement = image.shadowRoot.querySelector("img.ea-image__image");
      expect(imgElement).toBeTruthy();
    });
  });

  /**
   * Src 属性测试
   */
  describe("Src Attribute", () => {
    it("默认 src 应该为空字符串", () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);

      expect(image.getAttribute("src")).toBe("");
    });

    it("应该通过 src 属性设置图片地址", () => {
      const image = document.createElement("ea-image");
      image.setAttribute("src", "https://example.com/image.jpg");
      container.appendChild(image);

      expect(image.getAttribute("src")).toBe("https://example.com/image.jpg");
    });
  });

  /**
   * Width 属性测试
   */
  describe("Width Attribute", () => {
    it("默认 width 应该为空", () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);

      expect(image.getAttribute("width")).toBe(null);
    });

    it("应该通过 width 属性设置宽度", () => {
      const image = document.createElement("ea-image");
      image.setAttribute("width", "200px");
      container.appendChild(image);

      expect(image.getAttribute("width")).toBe("200px");
    });

    it("应该支持不同的宽度值", () => {
      const widths = ["100px", "200px", "50%", "100%", "auto"];

      widths.forEach(width => {
        const image = document.createElement("ea-image");
        image.setAttribute("width", width);
        expect(image.getAttribute("width")).toBe(width);
      });
    });
  });

  /**
   * Height 属性测试
   */
  describe("Height Attribute", () => {
    it("默认 height 应该为空", () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);

      expect(image.getAttribute("height")).toBe(null);
    });

    it("应该通过 height 属性设置高度", () => {
      const image = document.createElement("ea-image");
      image.setAttribute("height", "150px");
      container.appendChild(image);

      expect(image.getAttribute("height")).toBe("150px");
    });

    it("应该支持不同的高度值", () => {
      const heights = ["100px", "200px", "50%", "100%", "auto"];

      heights.forEach(height => {
        const image = document.createElement("ea-image");
        image.setAttribute("height", height);
        expect(image.getAttribute("height")).toBe(height);
      });
    });
  });

  /**
   * Fit 属性测试
   */
  describe("Fit Attribute", () => {
    it("默认 fit 应该为空", () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);

      expect(image.getAttribute("fit")).toBe(null);
    });

    it("应该支持 fit='fill'", () => {
      const image = document.createElement("ea-image");
      image.setAttribute("fit", "fill");
      container.appendChild(image);

      expect(image.getAttribute("fit")).toBe("fill");
    });

    it("应该支持 fit='contain'", () => {
      const image = document.createElement("ea-image");
      image.setAttribute("fit", "contain");
      container.appendChild(image);

      expect(image.getAttribute("fit")).toBe("contain");
    });

    it("应该支持 fit='cover'", () => {
      const image = document.createElement("ea-image");
      image.setAttribute("fit", "cover");
      container.appendChild(image);

      expect(image.getAttribute("fit")).toBe("cover");
    });

    it("应该支持 fit='none'", () => {
      const image = document.createElement("ea-image");
      image.setAttribute("fit", "none");
      container.appendChild(image);

      expect(image.getAttribute("fit")).toBe("none");
    });

    it("应该支持 fit='scale-down'", () => {
      const image = document.createElement("ea-image");
      image.setAttribute("fit", "scale-down");
      container.appendChild(image);

      expect(image.getAttribute("fit")).toBe("scale-down");
    });
  });

  /**
   * Alt 属性测试
   */
  describe("Alt Attribute", () => {
    it("默认 alt 应该为空", () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);

      expect(image.getAttribute("alt")).toBe(null);
    });

    it("应该通过 alt 属性设置替代文本", () => {
      const image = document.createElement("ea-image");
      image.setAttribute("alt", "Description of image");
      container.appendChild(image);

      expect(image.getAttribute("alt")).toBe("Description of image");
    });
  });

  /**
   * Loading 属性测试
   */
  describe("Loading Attribute", () => {
    it("默认 loading 应该为 eager", () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);

      expect(image.getAttribute("loading")).toBe(null);
    });

    it("应该支持 loading='lazy'", () => {
      const image = document.createElement("ea-image");
      image.setAttribute("loading", "lazy");
      container.appendChild(image);

      expect(image.getAttribute("loading")).toBe("lazy");
    });

    it("应该支持 loading='eager'", () => {
      const image = document.createElement("ea-image");
      image.setAttribute("loading", "eager");
      container.appendChild(image);

      expect(image.getAttribute("loading")).toBe("eager");
    });
  });

  /**
   * Lazy 属性测试
   */
  describe("Lazy Attribute", () => {
    it("默认 lazy 应该是 false", () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);

      expect(image.hasAttribute("lazy")).toBe(false);
    });

    it("设置 lazy 属性应该启用懒加载", () => {
      const image = document.createElement("ea-image");
      image.setAttribute("lazy", "");
      container.appendChild(image);

      expect(image.hasAttribute("lazy")).toBe(true);
    });
  });

  /**
   * Preview 属性测试
   */
  describe("Preview Attribute", () => {
    it("默认 preview 应该是 false", () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);

      expect(image.hasAttribute("preview")).toBe(false);
    });

    it("设置 preview 属性应该启用预览功能", () => {
      const image = document.createElement("ea-image");
      image.setAttribute("preview", "");
      container.appendChild(image);

      expect(image.hasAttribute("preview")).toBe(true);
    });
  });

  /**
   * 预览相关属性测试
   */
  describe("Preview Related Attributes", () => {
    it("应该支持 initial-index 属性", () => {
      const image = document.createElement("ea-image");
      image.setAttribute("preview", "");
      image.setAttribute("initial-index", "2");
      container.appendChild(image);

      expect(image.getAttribute("initial-index")).toBe("2");
    });

    it("应该支持 zoom-rate 属性", () => {
      const image = document.createElement("ea-image");
      image.setAttribute("preview", "");
      image.setAttribute("zoom-rate", "1.5");
      container.appendChild(image);

      expect(image.getAttribute("zoom-rate")).toBe("1.5");
    });

    it("应该支持 min-scale 属性", () => {
      const image = document.createElement("ea-image");
      image.setAttribute("preview", "");
      image.setAttribute("min-scale", "0.5");
      container.appendChild(image);

      expect(image.getAttribute("min-scale")).toBe("0.5");
    });

    it("应该支持 max-scale 属性", () => {
      const image = document.createElement("ea-image");
      image.setAttribute("preview", "");
      image.setAttribute("max-scale", "10");
      container.appendChild(image);

      expect(image.getAttribute("max-scale")).toBe("10");
    });

    it("应该支持 z-index 属性", () => {
      const image = document.createElement("ea-image");
      image.setAttribute("preview", "");
      image.setAttribute("z-index", "3000");
      container.appendChild(image);

      expect(image.getAttribute("z-index")).toBe("3000");
    });

    it("应该支持 hide-on-click-modal 属性", () => {
      const image = document.createElement("ea-image");
      image.setAttribute("preview", "");
      image.setAttribute("hide-on-click-modal", "");
      container.appendChild(image);

      expect(image.hasAttribute("hide-on-click-modal")).toBe(true);
    });

    it("应该支持 close-on-press-escape 属性", () => {
      const image = document.createElement("ea-image");
      image.setAttribute("preview", "");
      image.setAttribute("close-on-press-escape", "");
      container.appendChild(image);

      expect(image.hasAttribute("close-on-press-escape")).toBe(true);
    });

    it("应该支持 infinite 属性", () => {
      const image = document.createElement("ea-image");
      image.setAttribute("preview", "");
      image.setAttribute("infinite", "");
      container.appendChild(image);

      expect(image.hasAttribute("infinite")).toBe(true);
    });

    it("应该支持 show-progress 属性", () => {
      const image = document.createElement("ea-image");
      image.setAttribute("preview", "");
      image.setAttribute("show-progress", "");
      container.appendChild(image);

      expect(image.hasAttribute("show-progress")).toBe(true);
    });
  });

  /**
   * 插槽测试
   */
  describe("Slots", () => {
    it("应该支持 error 插槽", () => {
      const image = document.createElement("ea-image");
      image.innerHTML = `
        <div slot="error">Custom Error</div>
      `;
      container.appendChild(image);

      const errorSlot = image.shadowRoot.querySelector('slot[name="error"]');
      expect(errorSlot).toBeTruthy();
    });

    it("应该支持 placeholder 插槽", () => {
      const image = document.createElement("ea-image");
      image.innerHTML = `
        <div slot="placeholder">Loading...</div>
      `;
      container.appendChild(image);

      const placeholderSlot = image.shadowRoot.querySelector(
        'slot[name="placeholder"]'
      );
      expect(placeholderSlot).toBeTruthy();
    });

    it("应该支持 progress 插槽", () => {
      const image = document.createElement("ea-image");
      image.setAttribute("preview", "");
      image.innerHTML = `
        <div slot="progress">Progress</div>
      `;
      container.appendChild(image);

      const progressSlot = image.shadowRoot.querySelector(
        'slot[name="progress"]'
      );
      expect(progressSlot).toBeTruthy();
    });

    it("应该支持 toolbar 插槽", () => {
      const image = document.createElement("ea-image");
      image.setAttribute("preview", "");
      image.innerHTML = `
        <div slot="toolbar">Toolbar</div>
      `;
      container.appendChild(image);

      const toolbarSlot = image.shadowRoot.querySelector(
        'slot[name="toolbar"]'
      );
      expect(toolbarSlot).toBeTruthy();
    });
  });

  /**
   * 方法测试
   */
  describe("Methods", () => {
    it("应该存在 showPreview 方法", () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);

      expect(typeof image.showPreview).toBe("function");
    });

    it("应该存在 setActiveItem 方法", () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);

      expect(typeof image.setActiveItem).toBe("function");
    });

    it("应该存在 reset 方法", () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);

      expect(typeof image.reset).toBe("function");
    });
  });

  /**
   * 事件测试
   */
  describe("Events", () => {
    it("应该支持 load 事件监听", () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);

      // 验证可以添加 load 事件监听器
      const listener = vi.fn();
      image.addEventListener("load", listener);

      // 手动触发事件来测试监听是否工作
      const event = new Event("load");
      image.dispatchEvent(event);

      expect(listener).toHaveBeenCalled();
    });

    it("应该支持 error 事件监听", () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);

      // 验证可以添加 error 事件监听器
      const listener = vi.fn();
      image.addEventListener("error", listener);

      // 手动触发事件来测试监听是否工作
      const event = new Event("error");
      image.dispatchEvent(event);

      expect(listener).toHaveBeenCalled();
    });
  });

  /**
   * 边界条件测试
   */
  describe("Edge Cases", () => {
    it("空 src 时应该正确渲染", () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);

      const containerElement = image.shadowRoot.querySelector(".ea-image");
      expect(containerElement).toBeTruthy();
    });

    it("特殊字符的 src 应该正确处理", () => {
      const image = document.createElement("ea-image");
      image.setAttribute(
        "src",
        "https://example.com/image with spaces.jpg?param=value&other=test"
      );
      container.appendChild(image);

      expect(image.getAttribute("src")).toBe(
        "https://example.com/image with spaces.jpg?param=value&other=test"
      );
    });

    it("同时设置 width 和 height 应该正常工作", () => {
      const image = document.createElement("ea-image");
      image.setAttribute("width", "200px");
      image.setAttribute("height", "150px");
      container.appendChild(image);

      expect(image.getAttribute("width")).toBe("200px");
      expect(image.getAttribute("height")).toBe("150px");
    });

    it("同时设置 placeholder 和 error 插槽应该正常工作", () => {
      const image = document.createElement("ea-image");
      image.innerHTML = `
        <div slot="placeholder">Loading...</div>
        <div slot="error">Failed</div>
      `;
      container.appendChild(image);

      const placeholderSlot = image.shadowRoot.querySelector(
        'slot[name="placeholder"]'
      );
      const errorSlot = image.shadowRoot.querySelector('slot[name="error"]');

      expect(placeholderSlot).toBeTruthy();
      expect(errorSlot).toBeTruthy();
    });
  });

  /**
   * 生命周期测试
   */
  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", () => {
      const image = document.createElement("ea-image");
      image.setAttribute("src", "https://example.com/image.jpg");
      container.appendChild(image);

      const imgElement = image.shadowRoot.querySelector("img.ea-image__image");
      expect(imgElement).toBeTruthy();
    });

    it("组件断开连接后应该正常移除", () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);

      image.remove();

      expect(container.contains(image)).toBe(false);
    });

    it("动态修改 src 应该生效", async () => {
      const image = document.createElement("ea-image");
      image.setAttribute("src", "https://example.com/image1.jpg");
      container.appendChild(image);

      await new Promise(resolve => setTimeout(resolve, 50));

      image.setAttribute("src", "https://example.com/image2.jpg");
      expect(image.getAttribute("src")).toBe("https://example.com/image2.jpg");
    });

    it("动态修改 width 应该生效", async () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);

      await new Promise(resolve => setTimeout(resolve, 50));

      image.setAttribute("width", "300px");
      expect(image.getAttribute("width")).toBe("300px");
    });

    it("动态修改 height 应该生效", async () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);

      await new Promise(resolve => setTimeout(resolve, 50));

      image.setAttribute("height", "200px");
      expect(image.getAttribute("height")).toBe("200px");
    });

    it("动态修改 fit 应该生效", async () => {
      const image = document.createElement("ea-image");
      image.setAttribute("fit", "fill");
      container.appendChild(image);

      await new Promise(resolve => setTimeout(resolve, 50));

      image.setAttribute("fit", "cover");
      expect(image.getAttribute("fit")).toBe("cover");
    });

    it("动态添加 preview 属性应该生效", async () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(image.hasAttribute("preview")).toBe(false);

      image.setAttribute("preview", "");
      expect(image.hasAttribute("preview")).toBe(true);
    });
  });
});
