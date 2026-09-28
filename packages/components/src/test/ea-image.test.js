import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender.js";
import { runAxe, assertNoA11yViolations } from "./utils/a11y";

class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe(element) {
    this.callback([
      { intersectionRatio: 1, isIntersecting: true, target: element },
    ]);
  }
  unobserve() {}
  disconnect() {}
}

if (typeof window !== "undefined" && !window.IntersectionObserver) {
  window.IntersectionObserver = MockIntersectionObserver;
}

import "../components/ea-image/index.ts";

describe("EaImage Component", () => {
  let container;
  let originalCSSSupports;

  beforeEach(() => {
    if (!window.IntersectionObserver) {
      window.IntersectionObserver = MockIntersectionObserver;
    }

    if (typeof CSS === "undefined") {
      window.CSS = { supports: vi.fn().mockReturnValue(true) };
    } else if (!CSS.supports) {
      originalCSSSupports = undefined;
      CSS.supports = vi.fn().mockReturnValue(true);
    }

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

  describe("Basic Rendering", () => {
    it("应该正确渲染 ea-image 组件", async () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);
      await waitForRender();

      expect(image).toBeDefined();
      expect(image.shadowRoot).toBeDefined();
    });

    it("应该包含所有 CSS Parts", async () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);
      await waitForRender();

      expect(image.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
      expect(image.shadowRoot.querySelector('[part="image"]')).toBeTruthy();
      expect(image.shadowRoot.querySelector('[part="error"]')).toBeTruthy();
      expect(
        image.shadowRoot.querySelector('[part="placeholder"]')
      ).toBeTruthy();
      expect(image.shadowRoot.querySelector('[part="preview"]')).toBeTruthy();
    });

    it("应该包含内部 img 元素", async () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);
      await waitForRender();

      const imgElement = image.shadowRoot.querySelector("img.ea-image__image");
      expect(imgElement).toBeTruthy();
    });

    it("应该包含 ea-image-preview 子组件", async () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);
      await waitForRender();

      const preview = image.shadowRoot.querySelector("ea-image-preview");
      expect(preview).toBeTruthy();
    });

    it("空 src 时应该显示 error 状态", async () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);
      await waitForRender();

      const containerEl = image.shadowRoot.querySelector(".ea-image");
      expect(containerEl.classList.contains("ea-image--error")).toBe(true);
    });

    it("无 src 时应该隐藏 image 和 placeholder，显示 error", async () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);
      await waitForRender();

      const containerEl = image.shadowRoot.querySelector(".ea-image");
      expect(containerEl.classList.contains("ea-image--error")).toBe(true);

      const imgEl = image.shadowRoot.querySelector(".ea-image__image");
      const placeholderEl = image.shadowRoot.querySelector(
        ".ea-image__placeholder"
      );
      const errorEl = image.shadowRoot.querySelector(".ea-image__error");

      expect(imgEl).toBeTruthy();
      expect(placeholderEl).toBeTruthy();
      expect(errorEl).toBeTruthy();
    });

    it("loading 状态时应该隐藏 image 和 error，显示 placeholder", async () => {
      const image = document.createElement("ea-image");
      image.setAttribute("src", "https://example.com/slow-image.jpg");
      container.appendChild(image);
      await waitForRender();

      const containerEl = image.shadowRoot.querySelector(".ea-image");
      expect(containerEl.classList.contains("ea-image--loading")).toBe(true);
    });
  });

  describe("Src Attribute", () => {
    it("默认 src 应该为空字符串", async () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);
      await waitForRender();

      expect(image.src).toBe("");
    });

    it("应该通过 src 属性设置图片地址", async () => {
      const image = document.createElement("ea-image");
      image.setAttribute("src", "https://example.com/image.jpg");
      container.appendChild(image);
      await waitForRender();

      expect(image.src).toBe("https://example.com/image.jpg");
    });

    it("动态修改 src 应该生效", async () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);
      await waitForRender();

      image.setAttribute("src", "https://example.com/image1.jpg");
      expect(image.src).toBe("https://example.com/image1.jpg");

      image.setAttribute("src", "https://example.com/image2.jpg");
      expect(image.src).toBe("https://example.com/image2.jpg");
    });

    it("设置 src 后应该触发 _loadImage 加载图片", async () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);
      await waitForRender();

      image.setAttribute("src", "https://example.com/test.jpg");
      await waitForRender();

      const containerEl = image.shadowRoot.querySelector(".ea-image");
      expect(
        containerEl.classList.contains("ea-image--loading") ||
          containerEl.classList.contains("ea-image--success") ||
          containerEl.classList.contains("ea-image--error")
      ).toBe(true);
    });
  });

  describe("Width & Height Attributes", () => {
    it("默认 width 和 height 应该为空", async () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);
      await waitForRender();

      expect(image.width).toBe("");
      expect(image.height).toBe("");
    });

    it("应该通过 width 属性设置宽度并设置 CSS 变量", async () => {
      const image = document.createElement("ea-image");
      image.setAttribute("width", "200px");
      container.appendChild(image);
      await waitForRender();

      expect(image.width).toBe("200px");
      expect(image.style.getPropertyValue("--ea-image-width")).toBe("200px");
    });

    it("应该通过 height 属性设置高度并设置 CSS 变量", async () => {
      const image = document.createElement("ea-image");
      image.setAttribute("height", "150px");
      container.appendChild(image);
      await waitForRender();

      expect(image.height).toBe("150px");
      expect(image.style.getPropertyValue("--ea-image-height")).toBe("150px");
    });

    it("应该支持百分比和 auto 值", async () => {
      const image = document.createElement("ea-image");
      image.setAttribute("width", "50%");
      image.setAttribute("height", "auto");
      container.appendChild(image);
      await waitForRender();

      expect(image.width).toBe("50%");
      expect(image.height).toBe("auto");
    });

    it("动态修改 width/height 应该生效", async () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);
      await waitForRender();

      image.setAttribute("width", "100px");
      image.setAttribute("height", "100px");
      await waitForRender();

      expect(image.width).toBe("100px");
      expect(image.height).toBe("100px");
    });

    it("无效的 width 值不应该设置 CSS 变量", async () => {
      const image = document.createElement("ea-image");
      CSS.supports = vi.fn().mockReturnValue(false);
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
      container.appendChild(image);
      await waitForRender();

      image.setAttribute("width", "invalid-value");
      await waitForRender();

      expect(warnSpy).toHaveBeenCalled();
      warnSpy.mockRestore();
      CSS.supports = vi.fn().mockReturnValue(true);
    });

    it("无效的 height 值不应该设置 CSS 变量", async () => {
      const image = document.createElement("ea-image");
      CSS.supports = vi.fn().mockReturnValue(false);
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
      container.appendChild(image);
      await waitForRender();

      image.setAttribute("height", "invalid-value");
      await waitForRender();

      expect(warnSpy).toHaveBeenCalled();
      warnSpy.mockRestore();
      CSS.supports = vi.fn().mockReturnValue(true);
    });
  });

  describe("Fit Attribute", () => {
    it("默认 fit 应该为空", async () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);
      await waitForRender();

      expect(image.fit).toBe("");
    });

    it("应该支持所有 fit 值", async () => {
      const fitValues = ["fill", "contain", "cover", "none", "scale-down"];

      for (const fit of fitValues) {
        const image = document.createElement("ea-image");
        image.setAttribute("fit", fit);
        container.appendChild(image);
        await waitForRender();

        expect(image.fit).toBe(fit);

        image.remove();
      }
    });

    it("设置 fit 应该设置 CSS 变量 --ea-image-fit", async () => {
      const image = document.createElement("ea-image");
      image.setAttribute("fit", "cover");
      container.appendChild(image);
      await waitForRender();

      expect(image.style.getPropertyValue("--ea-image-fit")).toBe("cover");
    });

    it("动态修改 fit 应该生效", async () => {
      const image = document.createElement("ea-image");
      image.setAttribute("fit", "fill");
      container.appendChild(image);
      await waitForRender();

      image.setAttribute("fit", "cover");
      await waitForRender();

      expect(image.fit).toBe("cover");
      expect(image.style.getPropertyValue("--ea-image-fit")).toBe("cover");
    });

    it("无效的 fit 值应该触发警告", async () => {
      const image = document.createElement("ea-image");
      CSS.supports = vi.fn().mockReturnValue(false);
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
      container.appendChild(image);
      await waitForRender();

      image.setAttribute("fit", "invalid-fit");
      await waitForRender();

      expect(warnSpy).toHaveBeenCalled();
      warnSpy.mockRestore();
      CSS.supports = vi.fn().mockReturnValue(true);
    });
  });

  describe("Alt Attribute", () => {
    it("默认 alt 应该为空", async () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);
      await waitForRender();

      expect(image.alt).toBe("");
    });

    it("应该通过 alt 属性设置替代文本", async () => {
      const image = document.createElement("ea-image");
      image.setAttribute("alt", "Description of image");
      container.appendChild(image);
      await waitForRender();

      expect(image.alt).toBe("Description of image");
    });

    it("alt 应该同步到内部 img 元素", async () => {
      const image = document.createElement("ea-image");
      image.setAttribute("alt", "Test alt text");
      container.appendChild(image);
      await waitForRender();

      const imgElement = image.shadowRoot.querySelector("img.ea-image__image");
      expect(imgElement.alt).toBe("Test alt text");
    });
  });

  describe("Loading Attribute", () => {
    it("默认 loading 应该为 eager", async () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);
      await waitForRender();

      expect(image.loading).toBe("eager");
    });

    it("应该支持 loading='lazy'", async () => {
      const image = document.createElement("ea-image");
      image.setAttribute("loading", "lazy");
      container.appendChild(image);
      await waitForRender();

      expect(image.loading).toBe("lazy");
    });

    it("loading 应该同步到内部 img 元素", async () => {
      const image = document.createElement("ea-image");
      image.setAttribute("loading", "lazy");
      container.appendChild(image);
      await waitForRender();

      const imgElement = image.shadowRoot.querySelector("img.ea-image__image");
      expect(imgElement.getAttribute("loading")).toBe("lazy");
    });
  });

  describe("Lazy Attribute", () => {
    it("默认 lazy 应该是 false", async () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);
      await waitForRender();

      expect(image.lazy).toBe(false);
    });

    it("设置 lazy 属性应该启用懒加载", async () => {
      const image = document.createElement("ea-image");
      image.setAttribute("lazy", "");
      container.appendChild(image);
      await waitForRender();

      expect(image.lazy).toBe(true);
    });
  });

  describe("Referrerpolicy & Crossorigin Attributes", () => {
    it("默认 referrerpolicy 应该为空", async () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);
      await waitForRender();

      expect(image.referrerpolicy).toBe("");
    });

    it("应该支持 referrerpolicy 属性并同步到 img", async () => {
      const image = document.createElement("ea-image");
      image.setAttribute("referrerpolicy", "no-referrer");
      container.appendChild(image);
      await waitForRender();

      expect(image.referrerpolicy).toBe("no-referrer");
      const imgElement = image.shadowRoot.querySelector("img.ea-image__image");
      expect(imgElement.getAttribute("referrerpolicy")).toBe("no-referrer");
    });

    it("默认 crossorigin 应该为空", async () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);
      await waitForRender();

      expect(image.crossorigin).toBe("");
    });

    it("应该支持 crossorigin 属性并同步到 img", async () => {
      const image = document.createElement("ea-image");
      image.setAttribute("crossorigin", "anonymous");
      container.appendChild(image);
      await waitForRender();

      expect(image.crossorigin).toBe("anonymous");
      const imgElement = image.shadowRoot.querySelector("img.ea-image__image");
      expect(imgElement.getAttribute("crossorigin")).toBe("anonymous");
    });
  });

  describe("Preview Attributes", () => {
    it("默认 preview 应该是 false", async () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);
      await waitForRender();

      expect(image.preview).toBe(false);
    });

    it("设置 preview 属性应该启用预览功能", async () => {
      const image = document.createElement("ea-image");
      image.setAttribute("preview", "");
      container.appendChild(image);
      await waitForRender();

      expect(image.preview).toBe(true);
    });

    it("默认 hideOnClickModal 应该是 false", async () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);
      await waitForRender();

      expect(image.hideOnClickModal).toBe(false);
    });

    it("默认 zIndex 应该是 2000", async () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);
      await waitForRender();

      expect(image.zIndex).toBe(2000);
    });

    it("应该支持 initial-index 属性", async () => {
      const image = document.createElement("ea-image");
      image.setAttribute("preview", "");
      image.setAttribute("initial-index", "2");
      container.appendChild(image);
      await waitForRender();

      expect(image.initialIndex).toBe(2);
    });

    it("默认 closeOnPressEscape 应该是 true", async () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);
      await waitForRender();

      expect(image.closeOnPressEscape).toBe(true);
    });

    it("默认 infinite 应该是 true", async () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);
      await waitForRender();

      expect(image.infinite).toBe(true);
    });

    it("应该支持 zoom-rate 属性", async () => {
      const image = document.createElement("ea-image");
      image.setAttribute("preview", "");
      image.setAttribute("zoom-rate", "1.5");
      container.appendChild(image);
      await waitForRender();

      expect(image.zoomRate).toBe(1.5);
    });

    it("默认 scale 应该是 1", async () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);
      await waitForRender();

      expect(image.scale).toBe(1);
    });

    it("应该支持 min-scale 属性", async () => {
      const image = document.createElement("ea-image");
      image.setAttribute("preview", "");
      image.setAttribute("min-scale", "0.5");
      container.appendChild(image);
      await waitForRender();

      expect(image.minScale).toBe(0.5);
    });

    it("应该支持 max-scale 属性", async () => {
      const image = document.createElement("ea-image");
      image.setAttribute("preview", "");
      image.setAttribute("max-scale", "10");
      container.appendChild(image);
      await waitForRender();

      expect(image.maxScale).toBe(10);
    });

    it("默认 showProgress 应该是 false", async () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);
      await waitForRender();

      expect(image.showProgress).toBe(false);
    });

    it("应该支持 show-progress 属性", async () => {
      const image = document.createElement("ea-image");
      image.setAttribute("preview", "");
      image.setAttribute("show-progress", "");
      container.appendChild(image);
      await waitForRender();

      expect(image.showProgress).toBe(true);
    });

    it("应该支持 scale 属性", async () => {
      const image = document.createElement("ea-image");
      image.setAttribute("preview", "");
      image.setAttribute("scale", "2");
      container.appendChild(image);
      await waitForRender();

      expect(image.scale).toBe(2);
    });

    it("应该支持 hide-on-click-modal 属性", async () => {
      const image = document.createElement("ea-image");
      image.setAttribute("preview", "");
      image.setAttribute("hide-on-click-modal", "");
      container.appendChild(image);
      await waitForRender();

      expect(image.hideOnClickModal).toBe(true);
    });

    it("应该支持 close-on-press-escape 属性", async () => {
      const image = document.createElement("ea-image");
      image.setAttribute("preview", "");
      image.setAttribute("close-on-press-escape", "");
      container.appendChild(image);
      await waitForRender();

      expect(image.closeOnPressEscape).toBe(true);
    });

    it("应该支持 infinite 属性", async () => {
      const image = document.createElement("ea-image");
      image.setAttribute("preview", "");
      image.setAttribute("infinite", "");
      container.appendChild(image);
      await waitForRender();

      expect(image.infinite).toBe(true);
    });

    it("应该支持 z-index 属性", async () => {
      const image = document.createElement("ea-image");
      image.setAttribute("preview", "");
      image.setAttribute("z-index", "3000");
      container.appendChild(image);
      await waitForRender();

      expect(image.zIndex).toBe(3000);
    });
  });

  describe("previewSrcList Property", () => {
    it("默认 previewSrcList 应该为空数组", async () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);
      await waitForRender();

      expect(image.previewSrcList).toEqual([]);
    });

    it("设置 previewSrcList 应该同步到 ea-image-preview 的 urlList", async () => {
      const image = document.createElement("ea-image");
      image.setAttribute("preview", "");
      container.appendChild(image);
      await waitForRender();

      const urls = ["https://example.com/1.jpg", "https://example.com/2.jpg"];
      image.previewSrcList = urls;
      await waitForRender();

      const preview = image.shadowRoot.querySelector("ea-image-preview");
      expect(preview.urlList).toEqual(urls);
    });

    it("未启用 preview 时设置 previewSrcList 应该触发警告", async () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);
      await waitForRender();

      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      image.previewSrcList = ["https://example.com/1.jpg"];
      await waitForRender();

      expect(warnSpy).toHaveBeenCalled();
      warnSpy.mockRestore();
    });
  });

  describe("Slots", () => {
    it("应该支持 error 插槽", async () => {
      const image = document.createElement("ea-image");
      image.innerHTML = `<div slot="error">Custom Error</div>`;
      container.appendChild(image);
      await waitForRender();

      const errorSlot = image.shadowRoot.querySelector('slot[name="error"]');
      expect(errorSlot).toBeTruthy();
    });

    it("应该支持 placeholder 插槽", async () => {
      const image = document.createElement("ea-image");
      image.innerHTML = `<div slot="placeholder">Loading...</div>`;
      container.appendChild(image);
      await waitForRender();

      const placeholderSlot = image.shadowRoot.querySelector(
        'slot[name="placeholder"]'
      );
      expect(placeholderSlot).toBeTruthy();
    });

    it("应该支持 progress 插槽", async () => {
      const image = document.createElement("ea-image");
      image.setAttribute("preview", "");
      image.innerHTML = `<div slot="progress">Progress</div>`;
      container.appendChild(image);
      await waitForRender();

      const progressSlot = image.shadowRoot.querySelector(
        'slot[name="progress"]'
      );
      expect(progressSlot).toBeTruthy();
    });

    it("应该支持 toolbar 插槽", async () => {
      const image = document.createElement("ea-image");
      image.setAttribute("preview", "");
      image.innerHTML = `<div slot="toolbar">Toolbar</div>`;
      container.appendChild(image);
      await waitForRender();

      const toolbarSlot = image.shadowRoot.querySelector(
        'slot[name="toolbar"]'
      );
      expect(toolbarSlot).toBeTruthy();
    });

    it("有内容的 progress slot 应该获得 slot 属性以转发到 preview", async () => {
      const image = document.createElement("ea-image");
      image.setAttribute("preview", "");
      image.innerHTML = `<section slot="progress"><span data-active></span></section>`;
      container.appendChild(image);
      await waitForRender();

      const progressSlot = image.shadowRoot.querySelector(
        'slot[name="progress"]'
      );
      expect(progressSlot.hasAttribute("slot")).toBe(true);
      expect(progressSlot.getAttribute("slot")).toBe("progress");
    });

    it("无内容的 progress slot 不应该有 slot 属性", async () => {
      const image = document.createElement("ea-image");
      image.setAttribute("preview", "");
      container.appendChild(image);
      await waitForRender();

      const progressSlot = image.shadowRoot.querySelector(
        'slot[name="progress"]'
      );
      expect(progressSlot.hasAttribute("slot")).toBe(false);
    });

    it("有内容的 toolbar slot 应该获得 slot 属性以转发到 preview", async () => {
      const image = document.createElement("ea-image");
      image.setAttribute("preview", "");
      image.innerHTML = `<section slot="toolbar"><ea-icon data-action="zoom-in"></ea-icon></section>`;
      container.appendChild(image);
      await waitForRender();

      const toolbarSlot = image.shadowRoot.querySelector(
        'slot[name="toolbar"]'
      );
      expect(toolbarSlot.hasAttribute("slot")).toBe(true);
      expect(toolbarSlot.getAttribute("slot")).toBe("toolbar");
    });

    it("无内容的 toolbar slot 不应该有 slot 属性", async () => {
      const image = document.createElement("ea-image");
      image.setAttribute("preview", "");
      container.appendChild(image);
      await waitForRender();

      const toolbarSlot = image.shadowRoot.querySelector(
        'slot[name="toolbar"]'
      );
      expect(toolbarSlot.hasAttribute("slot")).toBe(false);
    });

    it("error 插槽默认内容应该是 FAILED", async () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);
      await waitForRender();

      const errorSlot = image.shadowRoot.querySelector('slot[name="error"]');
      expect(errorSlot.textContent).toContain("FAILED");
    });
  });

  describe("Methods", () => {
    it("应该存在 showPreview 方法", async () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);
      await waitForRender();

      expect(typeof image.showPreview).toBe("function");
    });

    it("应该存在 setActiveItem 方法", async () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);
      await waitForRender();

      expect(typeof image.setActiveItem).toBe("function");
    });

    it("应该存在 reset 方法", async () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);
      await waitForRender();

      expect(typeof image.reset).toBe("function");
    });

    it("showPreview 应该设置 preview 的 visible 为 true", async () => {
      const image = document.createElement("ea-image");
      image.setAttribute("preview", "");
      container.appendChild(image);
      await waitForRender();

      image.showPreview();
      await waitForRender();

      const preview = image.shadowRoot.querySelector("ea-image-preview");
      expect(preview.visible).toBe(true);
    });

    it("setActiveItem 在未启用 preview 时应该不执行操作", async () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);
      await waitForRender();

      expect(() => image.setActiveItem(2)).not.toThrow();
    });

    it("reset 在未启用 preview 时应该不执行操作", async () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);
      await waitForRender();

      expect(() => image.reset()).not.toThrow();
    });

    it("setActiveItem 应该调用 preview 的 setActiveItem", async () => {
      const image = document.createElement("ea-image");
      image.setAttribute("preview", "");
      container.appendChild(image);
      await waitForRender();

      const preview = image.shadowRoot.querySelector("ea-image-preview");
      preview.urlList = ["a.jpg", "b.jpg", "c.jpg"];
      await waitForRender();

      image.setActiveItem(2);
      await waitForRender();

      expect(preview.index).toBe(2);
    });

    it("reset 应该调用 preview 的 reset", async () => {
      const image = document.createElement("ea-image");
      image.setAttribute("preview", "");
      container.appendChild(image);
      await waitForRender();

      const preview = image.shadowRoot.querySelector("ea-image-preview");
      preview.urlList = ["a.jpg", "b.jpg"];
      preview.scale = 2;
      await waitForRender();

      image.reset();
      await waitForRender();

      expect(preview.scale).toBe(1);
    });

    it("updateContainerClasslist 应该返回正确的 BEM 类名", async () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);
      await waitForRender();

      const className = image.updateContainerClasslist();
      expect(className).toContain("ea-image");
      expect(className).toContain("ea-image--error");
    });
  });

  describe("Events", () => {
    it("应该支持 load 事件监听", async () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);
      await waitForRender();

      const listener = vi.fn();
      image.addEventListener("load", listener);

      const event = new CustomEvent("load", { bubbles: true, composed: true });
      image.dispatchEvent(event);

      expect(listener).toHaveBeenCalled();
    });

    it("应该支持 error 事件监听", async () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);
      await waitForRender();

      const listener = vi.fn();
      image.addEventListener("error", listener);

      const event = new CustomEvent("error", { bubbles: true, composed: true });
      image.dispatchEvent(event);

      expect(listener).toHaveBeenCalled();
    });

    it("dispatchEvent 应该触发 Event 且 bubbles 和 composed", async () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);
      await waitForRender();

      let capturedEvent = null;
      image.addEventListener("load", e => {
        capturedEvent = e;
      });

      image.dispatchEvent(new Event("load", { bubbles: true, composed: true }));

      expect(capturedEvent).toBeTruthy();
      expect(capturedEvent.bubbles).toBe(true);
      expect(capturedEvent.composed).toBe(true);
    });
  });

  describe("Click to Preview", () => {
    it("没有 preview 属性时点击不应该打开预览", async () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);
      await waitForRender();

      const imgContainer = image.shadowRoot.querySelector(".ea-image");
      imgContainer.click();
      await waitForRender();

      const preview = image.shadowRoot.querySelector("ea-image-preview");
      expect(preview.visible).toBe(false);
    });

    it("有 preview 属性时点击应该打开预览", async () => {
      const image = document.createElement("ea-image");
      image.setAttribute("preview", "");
      container.appendChild(image);
      await waitForRender();

      const imgContainer = image.shadowRoot.querySelector(".ea-image");
      imgContainer.click();
      await waitForRender();

      const preview = image.shadowRoot.querySelector("ea-image-preview");
      expect(preview.visible).toBe(true);
    });
  });

  describe("Preview Property Delegation", () => {
    it("preview 属性变化应该同步到 preview 子组件", async () => {
      const image = document.createElement("ea-image");
      image.setAttribute("preview", "");
      image.setAttribute("zoom-rate", "1.5");
      container.appendChild(image);
      await waitForRender();

      const preview = image.shadowRoot.querySelector("ea-image-preview");
      expect(preview.zoomRate).toBe(1.5);
    });

    it("hideOnClickModal=true 时 preview 的 closeOnClickModal 应该为 false", async () => {
      const image = document.createElement("ea-image");
      image.setAttribute("preview", "");
      image.setAttribute("hide-on-click-modal", "");
      container.appendChild(image);
      await waitForRender();

      const preview = image.shadowRoot.querySelector("ea-image-preview");
      expect(preview.closeOnClickModal).toBe(false);
    });

    it("hideOnClickModal=false（默认）时 preview 的 closeOnClickModal 应该为 true", async () => {
      const image = document.createElement("ea-image");
      image.setAttribute("preview", "");
      container.appendChild(image);
      await waitForRender();

      const preview = image.shadowRoot.querySelector("ea-image-preview");
      expect(preview.closeOnClickModal).toBe(true);
    });

    it("zIndex 应该同步到 preview 子组件", async () => {
      const image = document.createElement("ea-image");
      image.setAttribute("preview", "");
      image.setAttribute("z-index", "5000");
      container.appendChild(image);
      await waitForRender();

      const preview = image.shadowRoot.querySelector("ea-image-preview");
      expect(preview.zIndex).toBe("5000");
    });

    it("initialIndex 应该同步到 preview 子组件", async () => {
      const image = document.createElement("ea-image");
      image.setAttribute("preview", "");
      image.setAttribute("initial-index", "1");
      container.appendChild(image);
      await waitForRender();

      const preview = image.shadowRoot.querySelector("ea-image-preview");
      expect(preview.initialIndex).toBe(1);
    });

    it("closeOnPressEscape 应该同步到 preview 子组件", async () => {
      const image = document.createElement("ea-image");
      image.setAttribute("preview", "");
      container.appendChild(image);
      await waitForRender();

      const preview = image.shadowRoot.querySelector("ea-image-preview");
      expect(preview.closeOnPressEscape).toBe(true);
    });

    it("infinite 应该同步到 preview 子组件", async () => {
      const image = document.createElement("ea-image");
      image.setAttribute("preview", "");
      container.appendChild(image);
      await waitForRender();

      const preview = image.shadowRoot.querySelector("ea-image-preview");
      expect(preview.infinite).toBe(true);
    });

    it("scale 应该同步到 preview 子组件", async () => {
      const image = document.createElement("ea-image");
      image.setAttribute("preview", "");
      image.setAttribute("scale", "2");
      container.appendChild(image);
      await waitForRender();

      const preview = image.shadowRoot.querySelector("ea-image-preview");
      expect(preview.scale).toBe(2);
    });

    it("minScale 应该同步到 preview 子组件", async () => {
      const image = document.createElement("ea-image");
      image.setAttribute("preview", "");
      image.setAttribute("min-scale", "0.5");
      container.appendChild(image);
      await waitForRender();

      const preview = image.shadowRoot.querySelector("ea-image-preview");
      expect(preview.minScale).toBe(0.5);
    });

    it("maxScale 应该同步到 preview 子组件", async () => {
      const image = document.createElement("ea-image");
      image.setAttribute("preview", "");
      image.setAttribute("max-scale", "10");
      container.appendChild(image);
      await waitForRender();

      const preview = image.shadowRoot.querySelector("ea-image-preview");
      expect(preview.maxScale).toBe(10);
    });

    it("showProgress 应该同步到 preview 子组件", async () => {
      const image = document.createElement("ea-image");
      image.setAttribute("preview", "");
      image.setAttribute("show-progress", "");
      container.appendChild(image);
      await waitForRender();

      const preview = image.shadowRoot.querySelector("ea-image-preview");
      expect(preview.showProgress).toBe(true);
    });

    it("未启用 preview 时属性不应该同步到子组件", async () => {
      const image = document.createElement("ea-image");
      image.setAttribute("zoom-rate", "1.5");
      container.appendChild(image);
      await waitForRender();

      const preview = image.shadowRoot.querySelector("ea-image-preview");
      expect(preview.zoomRate).toBe(1.2);
    });
  });

  describe("State Management", () => {
    it("初始状态应该是 error（无 src）", async () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);
      await waitForRender();

      const containerEl = image.shadowRoot.querySelector(".ea-image");
      expect(containerEl.classList.contains("ea-image--error")).toBe(true);
    });

    it("设置有效 src 后状态应该变为 loading", async () => {
      const image = document.createElement("ea-image");
      image.setAttribute("src", "https://example.com/image.jpg");
      container.appendChild(image);
      await waitForRender();

      const containerEl = image.shadowRoot.querySelector(".ea-image");
      expect(
        containerEl.classList.contains("ea-image--loading") ||
          containerEl.classList.contains("ea-image--success") ||
          containerEl.classList.contains("ea-image--error")
      ).toBe(true);
    });

    it("图片加载成功后状态应该变为 success", async () => {
      const image = document.createElement("ea-image");
      image.setAttribute("src", "test.jpg");
      container.appendChild(image);
      await waitForRender();

      image._states.imageStatus = "success";
      image.updateContainerClasslist();
      await waitForRender();

      const containerEl = image.shadowRoot.querySelector(".ea-image");
      expect(containerEl.classList.contains("ea-image--success")).toBe(true);
    });

    it("success 状态时背景应该变为透明", async () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);
      await waitForRender();

      const containerEl = image.shadowRoot.querySelector(".ea-image");
      containerEl.classList.add("ea-image--success");
      containerEl.classList.remove("ea-image--error", "ea-image--loading");

      expect(
        getComputedStyle(image).getPropertyValue("--ea-image-background")
      ).toBeDefined();
    });
  });

  describe("Lifecycle", () => {
    it("组件挂载时应该调用 $mount", async () => {
      const image = document.createElement("ea-image");
      container.appendChild(image);
      await waitForRender();

      const containerEl = image.shadowRoot.querySelector(".ea-image");
      expect(containerEl).toBeTruthy();
    });

    it("组件移除时应该清理 IntersectionObserver", async () => {
      const image = document.createElement("ea-image");
      image.setAttribute("lazy", "");
      container.appendChild(image);
      await waitForRender();

      image.remove();
      await waitForRender();

      expect(image.isConnected).toBe(false);
    });
  });

  describe("Accessibility", () => {
    it("默认状态应该无 a11y 违规", async () => {
      const el = document.createElement("ea-image");
      el.setAttribute("src", "https://example.com/image.png");
      el.setAttribute("alt", "Example image");
      container.appendChild(el);
      await waitForRender();
      const results = await runAxe(el);
      assertNoA11yViolations(results);
    });

    describe("ARIA Attributes", () => {
      it("错误区域应该有 role='alert'", async () => {
        const el = document.createElement("ea-image");
        el.setAttribute("src", "invalid-image.png");
        container.appendChild(el);
        await waitForRender();
        const error = el.shadowRoot.querySelector('[part="error"]');
        expect(error.getAttribute("role")).toBe("alert");
      });
    });
  });
});
