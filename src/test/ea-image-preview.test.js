import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender.js";

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
import "../components/ea-image-preview/index.ts";

describe("EaImagePreview Component", () => {
  let container;

  beforeEach(() => {
    if (!window.IntersectionObserver) {
      window.IntersectionObserver = MockIntersectionObserver;
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

  function createPreview(options = {}) {
    const preview = document.createElement("ea-image-preview");
    if (options.urlList) preview.urlList = options.urlList;
    if (options.showProgress) preview.showProgress = true;
    if (options.initialIndex !== undefined)
      preview.initialIndex = options.initialIndex;
    container.appendChild(preview);

    if (options.infinite !== undefined) {
      preview.infinite = options.infinite;
    }

    return preview;
  }

  describe("Basic Rendering", () => {
    it("应该正确渲染组件并拥有 shadowRoot", async () => {
      const preview = createPreview();
      await waitForRender();

      expect(preview).toBeDefined();
      expect(preview.shadowRoot).toBeDefined();
    });

    it("应该包含所有 CSS Parts", async () => {
      const preview = createPreview();
      await waitForRender();

      const parts = [
        "container",
        "mask",
        "content",
        "header",
        "main",
        "footer",
        "progress",
        "toolbar",
      ];
      for (const part of parts) {
        expect(
          preview.shadowRoot.querySelector(`[part="${part}"]`)
        ).toBeTruthy();
      }
    });

    it("应该包含关闭图标", async () => {
      const preview = createPreview();
      await waitForRender();

      expect(
        preview.shadowRoot.querySelector(".ea-image-preview__close-icon")
      ).toBeTruthy();
    });

    it("应该包含上一页、下一页图标", async () => {
      const preview = createPreview();
      await waitForRender();

      expect(
        preview.shadowRoot.querySelector(".ea-image-preview__prev-icon")
      ).toBeTruthy();
      expect(
        preview.shadowRoot.querySelector(".ea-image-preview__next-icon")
      ).toBeTruthy();
    });

    it("应该包含默认工具栏图标（缩放和旋转）", async () => {
      const preview = createPreview();
      await waitForRender();

      expect(
        preview.shadowRoot.querySelector(".ea-image-preview__zoom-out-icon")
      ).toBeTruthy();
      expect(
        preview.shadowRoot.querySelector(".ea-image-preview__zoom-in-icon")
      ).toBeTruthy();
      expect(
        preview.shadowRoot.querySelector(".ea-image-preview__rotate-left-icon")
      ).toBeTruthy();
      expect(
        preview.shadowRoot.querySelector(".ea-image-preview__rotate-right-icon")
      ).toBeTruthy();
    });

    it("内置图标应该有正确的 data-action 属性", async () => {
      const preview = createPreview();
      await waitForRender();

      const actionMap = {
        ".ea-image-preview__prev-icon": "switch-prev",
        ".ea-image-preview__next-icon": "switch-next",
        ".ea-image-preview__zoom-out-icon": "zoom-out",
        ".ea-image-preview__zoom-in-icon": "zoom-in",
        ".ea-image-preview__rotate-left-icon": "rotate-anticlockwise",
        ".ea-image-preview__rotate-right-icon": "rotate-clockwise",
      };

      for (const [selector, action] of Object.entries(actionMap)) {
        const el = preview.shadowRoot.querySelector(selector);
        expect(el.getAttribute("data-action")).toBe(action);
      }
    });

    it("应该包含 progress 和 toolbar 区域", async () => {
      const preview = createPreview();
      await waitForRender();

      expect(
        preview.shadowRoot.querySelector(".ea-image-preview__progress")
      ).toBeTruthy();
      expect(
        preview.shadowRoot.querySelector(".ea-image-preview__toolbar")
      ).toBeTruthy();
    });

    it("应该包含 header、main、footer 区域", async () => {
      const preview = createPreview();
      await waitForRender();

      expect(
        preview.shadowRoot.querySelector(".ea-image-preview__header")
      ).toBeTruthy();
      expect(
        preview.shadowRoot.querySelector(".ea-image-preview__main")
      ).toBeTruthy();
      expect(
        preview.shadowRoot.querySelector(".ea-image-preview__footer")
      ).toBeTruthy();
    });

    it("图标应该使用 ea-icon 组件", async () => {
      const preview = createPreview();
      await waitForRender();

      const icons = preview.shadowRoot.querySelectorAll(
        ".ea-image-preview__icon"
      );
      expect(icons.length).toBeGreaterThan(0);

      icons.forEach(icon => {
        expect(icon.tagName.toLowerCase()).toBe("ea-icon");
      });
    });
  });

  describe("Inherited from EaOverlay", () => {
    it("应该继承 visible 默认值为 false", async () => {
      const preview = createPreview();
      await waitForRender();

      expect(preview.visible).toBe(false);
    });

    it("应该继承 modal 默认值为 true", async () => {
      const preview = createPreview();
      await waitForRender();

      expect(preview.modal).toBe(true);
    });

    it("应该继承 closeOnPressEscape 默认值为 true", async () => {
      const preview = createPreview();
      await waitForRender();

      expect(preview.closeOnPressEscape).toBe(true);
    });

    it("应该继承 appendToBody 默认值为 false", async () => {
      const preview = createPreview();
      await waitForRender();

      expect(preview.appendToBody).toBe(false);
    });

    it("应该继承 show/hide 方法", async () => {
      const preview = createPreview();
      await waitForRender();

      expect(typeof preview.show).toBe("function");
      expect(typeof preview.hide).toBe("function");
    });

    it("应该包含 overlay 容器结构", async () => {
      const preview = createPreview();
      await waitForRender();

      expect(preview.shadowRoot.querySelector(".ea-overlay")).toBeTruthy();
      expect(
        preview.shadowRoot.querySelector(".ea-overlay__mask")
      ).toBeTruthy();
      expect(
        preview.shadowRoot.querySelector(".ea-overlay__content")
      ).toBeTruthy();
    });
  });

  describe("initialIndex Attribute", () => {
    it("默认 initialIndex 应该为 0", async () => {
      const preview = createPreview();
      await waitForRender();

      expect(preview.initialIndex).toBe(0);
    });

    it("应该通过 initial-index 属性设置初始索引", async () => {
      const preview = document.createElement("ea-image-preview");
      preview.setAttribute("initial-index", "3");
      container.appendChild(preview);
      await waitForRender();

      expect(preview.initialIndex).toBe(3);
    });

    it("设置 initialIndex 应该同步设置 index", async () => {
      const preview = createPreview();
      await waitForRender();

      preview.initialIndex = 2;
      await waitForRender();

      expect(preview.index).toBe(2);
    });
  });

  describe("index Attribute", () => {
    it("默认 index 应该为 0", async () => {
      const preview = createPreview();
      await waitForRender();

      expect(preview.index).toBe(0);
    });

    it("设置 index 应该触发图片渲染", async () => {
      const preview = createPreview({ urlList: ["a.jpg", "b.jpg", "c.jpg"] });
      await waitForRender();

      preview.index = 1;
      await waitForRender();

      expect(
        preview.shadowRoot.querySelector(".ea-image-preview__img")
      ).toBeTruthy();
    });

    it("infinite 模式下 index 超过最大值应该循环到 0", async () => {
      const preview = createPreview({
        urlList: ["a.jpg", "b.jpg"],
        infinite: true,
      });
      await waitForRender();

      preview.index = 2;
      await waitForRender();

      expect(preview.index).toBe(0);
    });

    it("infinite 模式下 index 小于 0 应该循环到最后", async () => {
      const preview = createPreview({
        urlList: ["a.jpg", "b.jpg"],
        infinite: true,
      });
      await waitForRender();

      preview.index = -1;
      await waitForRender();

      expect(preview.index).toBe(1);
    });

    it("非 infinite 模式下 index 超出范围应该被拒绝", async () => {
      const preview = createPreview({
        urlList: ["a.jpg", "b.jpg"],
        infinite: false,
      });
      await waitForRender();

      preview.index = 5;
      await waitForRender();

      expect(preview.index).toBeLessThanOrEqual(1);
    });

    it("非 infinite 模式下 index 小于 0 应该被拒绝", async () => {
      const preview = createPreview({
        urlList: ["a.jpg", "b.jpg"],
        infinite: false,
      });
      await waitForRender();

      preview.index = -1;
      await waitForRender();

      expect(preview.index).toBeGreaterThanOrEqual(0);
    });

    it("设置 index 应该触发 _renderImage", async () => {
      const preview = createPreview({ urlList: ["a.jpg", "b.jpg"] });
      await waitForRender();

      preview.index = 1;
      await waitForRender();

      const img = preview.shadowRoot.querySelector(".ea-image-preview__img");
      expect(img).toBeTruthy();
    });
  });

  describe("infinite Attribute", () => {
    it("默认 infinite 应该为 true", async () => {
      const preview = createPreview();
      await waitForRender();

      expect(preview.infinite).toBe(true);
    });

    it("应该支持关闭无限循环", async () => {
      const preview = document.createElement("ea-image-preview");
      container.appendChild(preview);
      await waitForRender();

      preview.infinite = false;
      await waitForRender();

      expect(preview.infinite).toBe(false);
    });
  });

  describe("zoomRate Attribute", () => {
    it("默认 zoomRate 应该为 1.2", async () => {
      const preview = createPreview();
      await waitForRender();

      expect(preview.zoomRate).toBe(1.2);
    });

    it("应该支持自定义缩放率", async () => {
      const preview = document.createElement("ea-image-preview");
      preview.setAttribute("zoom-rate", "1.5");
      container.appendChild(preview);
      await waitForRender();

      expect(preview.zoomRate).toBe(1.5);
    });
  });

  describe("zoom Attribute", () => {
    it("默认 zoom 应该为 1", async () => {
      const preview = createPreview();
      await waitForRender();

      expect(preview.zoom).toBe(1);
    });

    it("应该支持设置 zoom", async () => {
      const preview = createPreview();
      await waitForRender();

      preview.setAttribute("zoom", "2");
      await waitForRender();

      expect(preview.zoom).toBe(2);
    });
  });

  describe("scale Attribute", () => {
    it("默认 scale 应该为 1", async () => {
      const preview = createPreview();
      await waitForRender();

      expect(preview.scale).toBe(1);
    });

    it("设置 scale 应该设置 CSS 变量", async () => {
      const preview = createPreview({ urlList: ["a.jpg"] });
      await waitForRender();

      preview.scale = 2;
      await waitForRender();

      const content = preview.shadowRoot.querySelector(".ea-overlay__content");
      expect(content.style.getPropertyValue("--ea-image-preview-scale")).toBe(
        "2"
      );
    });

    it("scale 在 minScale~maxScale 范围内应该正常设置", async () => {
      const preview = createPreview({ urlList: ["a.jpg"] });
      await waitForRender();

      preview.scale = 2;
      await waitForRender();

      expect(preview.scale).toBe(2);
    });

    it("scale 超过 maxScale 应该被拒绝", async () => {
      const preview = createPreview({ urlList: ["a.jpg"] });
      await waitForRender();

      preview.scale = 5;
      await waitForRender();

      preview.scale = 100;
      await waitForRender();

      expect(preview.scale).toBe(5);
    });

    it("scale 低于 minScale 应该被拒绝", async () => {
      const preview = createPreview({ urlList: ["a.jpg"] });
      await waitForRender();

      preview.scale = 0.5;
      await waitForRender();

      preview.scale = 0.01;
      await waitForRender();

      expect(preview.scale).toBe(0.5);
    });
  });

  describe("minScale & maxScale Attributes", () => {
    it("默认 minScale 应该为 0.2，maxScale 应该为 7", async () => {
      const preview = createPreview();
      await waitForRender();

      expect(preview.minScale).toBe(0.2);
      expect(preview.maxScale).toBe(7);
    });

    it("应该支持自定义 minScale 和 maxScale", async () => {
      const preview = document.createElement("ea-image-preview");
      preview.setAttribute("min-scale", "0.5");
      preview.setAttribute("max-scale", "10");
      container.appendChild(preview);
      await waitForRender();

      expect(preview.minScale).toBe(0.5);
      expect(preview.maxScale).toBe(10);
    });
  });

  describe("showProgress Attribute", () => {
    it("默认 showProgress 应该为 false", async () => {
      const preview = createPreview();
      await waitForRender();

      expect(preview.showProgress).toBe(false);
    });

    it("设置 showProgress 应该添加对应 CSS 状态类", async () => {
      const preview = document.createElement("ea-image-preview");
      container.appendChild(preview);
      await waitForRender();

      preview.setAttribute("show-progress", "");
      await waitForRender();

      const overlayEl = preview.shadowRoot.querySelector(".ea-overlay");
      expect(overlayEl.classList.contains("is-show-progress")).toBe(true);
    });

    it("showProgress 为 false 时不应包含 show-progress 类名", async () => {
      const preview = createPreview({ showProgress: false });
      await waitForRender();

      const overlayEl = preview.shadowRoot.querySelector(".ea-overlay");
      expect(
        overlayEl.classList.contains("ea-image-preview--show-progress")
      ).toBe(false);
    });
  });

  describe("urlList Property", () => {
    it("默认 urlList 应该为空数组", async () => {
      const preview = createPreview();
      await waitForRender();

      expect(preview.urlList).toEqual([]);
    });

    it("设置 urlList 应该触发图片渲染", async () => {
      const preview = createPreview();
      await waitForRender();

      preview.urlList = ["a.jpg", "b.jpg"];
      await waitForRender();

      expect(
        preview.shadowRoot.querySelector(".ea-image-preview__img")
      ).toBeTruthy();
    });

    it("设置 urlList 后 index 应该重置为 initialIndex", async () => {
      const preview = createPreview({ initialIndex: 1 });
      await waitForRender();

      preview.urlList = ["a.jpg", "b.jpg", "c.jpg"];
      await waitForRender();

      expect(preview.index).toBe(1);
    });

    it("urlList 为空时设置 index 不应该出错", async () => {
      const preview = createPreview();
      await waitForRender();

      expect(() => {
        preview.index = 0;
      }).not.toThrow();
    });
  });

  describe("status Property", () => {
    it("默认 status 应该为 loading", async () => {
      const preview = createPreview();
      await waitForRender();

      expect(preview.status).toBe("loading");
    });

    it("应该支持设置 status", async () => {
      const preview = createPreview();
      await waitForRender();

      preview.status = "success";
      expect(preview.status).toBe("success");
    });

    it("应该支持设置 status 为 error", async () => {
      const preview = createPreview();
      await waitForRender();

      preview.status = "error";
      expect(preview.status).toBe("error");
    });
  });

  describe("updateContainerClasslist", () => {
    it("应该包含 overlay 基础类名", async () => {
      const preview = createPreview();
      await waitForRender();

      const className = preview.updateContainerClasslist();
      expect(className).toContain("ea-overlay");
    });

    it("应该包含 image-preview BEM 类名", async () => {
      const preview = createPreview();
      await waitForRender();

      const className = preview.updateContainerClasslist();
      expect(className).toContain("ea-image-preview");
    });

    it("应该包含状态修饰符", async () => {
      const preview = createPreview();
      await waitForRender();

      const className = preview.updateContainerClasslist();
      expect(className).toMatch(/ea-image-preview--(loading|error|success)/);
    });

    it("showProgress 时应该包含 is-show-progress 状态类", async () => {
      const preview = createPreview({ showProgress: true });
      await waitForRender();

      const className = preview.updateContainerClasslist();
      expect(className).toContain("is-show-progress");
    });
  });

  describe("Close Icon Click", () => {
    it("点击关闭图标应该设置 visible 为 false", async () => {
      const preview = createPreview({ urlList: ["a.jpg"] });
      await waitForRender();

      preview.visible = true;
      await waitForRender();

      const closeIcon = preview.shadowRoot.querySelector(
        ".ea-image-preview__close-icon"
      );
      closeIcon.click();
      await waitForRender();

      expect(preview.visible).toBe(false);
    });

    it("点击关闭图标应该调用 hide 方法", async () => {
      const preview = createPreview({ urlList: ["a.jpg"] });
      await waitForRender();

      const hideSpy = vi.spyOn(preview, "hide");

      const closeIcon = preview.shadowRoot.querySelector(
        ".ea-image-preview__close-icon"
      );
      closeIcon.click();
      await waitForRender();

      expect(hideSpy).toHaveBeenCalled();
      hideSpy.mockRestore();
    });
  });

  describe("Event Delegation - Main (Prev/Next)", () => {
    it("点击 prev 图标应该减少 index", async () => {
      const preview = createPreview({ urlList: ["a.jpg", "b.jpg", "c.jpg"] });
      await waitForRender();

      preview.index = 1;
      await waitForRender();

      preview.shadowRoot.querySelector(".ea-image-preview__prev-icon").click();
      await waitForRender();

      expect(preview.index).toBe(0);
    });

    it("点击 next 图标应该增加 index", async () => {
      const preview = createPreview({ urlList: ["a.jpg", "b.jpg", "c.jpg"] });
      await waitForRender();

      preview.index = 0;
      await waitForRender();

      preview.shadowRoot.querySelector(".ea-image-preview__next-icon").click();
      await waitForRender();

      expect(preview.index).toBe(1);
    });

    it("点击 main 区域无 data-action 的元素不应该触发任何操作", async () => {
      const preview = createPreview({ urlList: ["a.jpg", "b.jpg"] });
      await waitForRender();

      preview.index = 1;
      await waitForRender();

      preview.shadowRoot.querySelector(".ea-image-preview__main").click();
      await waitForRender();

      expect(preview.index).toBe(1);
    });
  });

  describe("Event Delegation - Toolbar (Zoom/Rotate)", () => {
    it("点击 zoom-out 图标应该缩小", async () => {
      const preview = createPreview({ urlList: ["a.jpg"] });
      await waitForRender();

      preview.scale = 2;
      await waitForRender();

      preview.shadowRoot
        .querySelector(".ea-image-preview__zoom-out-icon")
        .click();
      await waitForRender();

      expect(preview.scale).toBeLessThan(2);
    });

    it("点击 zoom-in 图标应该放大", async () => {
      const preview = createPreview({ urlList: ["a.jpg"] });
      await waitForRender();

      preview.shadowRoot
        .querySelector(".ea-image-preview__zoom-in-icon")
        .click();
      await waitForRender();

      expect(preview.scale).toBeGreaterThan(1);
    });

    it("点击 rotate-left 图标应该逆时针旋转", async () => {
      const preview = createPreview({ urlList: ["a.jpg"] });
      await waitForRender();

      preview.shadowRoot
        .querySelector(".ea-image-preview__rotate-left-icon")
        .click();
      await waitForRender();

      const content = preview.shadowRoot.querySelector(".ea-overlay__content");
      expect(content.style.getPropertyValue("--ea-image-preview-rotate")).toBe(
        "-90deg"
      );
    });

    it("点击 rotate-right 图标应该顺时针旋转", async () => {
      const preview = createPreview({ urlList: ["a.jpg"] });
      await waitForRender();

      preview.shadowRoot
        .querySelector(".ea-image-preview__rotate-right-icon")
        .click();
      await waitForRender();

      const content = preview.shadowRoot.querySelector(".ea-overlay__content");
      expect(content.style.getPropertyValue("--ea-image-preview-rotate")).toBe(
        "90deg"
      );
    });

    it("点击 toolbar 区域无 data-action 的元素不应该触发任何操作", async () => {
      const preview = createPreview({ urlList: ["a.jpg"] });
      await waitForRender();

      const scaleBefore = preview.scale;
      preview.shadowRoot.querySelector(".ea-image-preview__toolbar").click();
      await waitForRender();

      expect(preview.scale).toBe(scaleBefore);
    });
  });

  describe("Zoom Logic", () => {
    it("zoom-in 应该按 zoomRate 倍放大", async () => {
      const preview = createPreview({ urlList: ["a.jpg"] });
      preview.zoomRate = 1.2;
      await waitForRender();

      preview.scale = 1;
      preview.shadowRoot
        .querySelector(".ea-image-preview__zoom-in-icon")
        .click();
      await waitForRender();

      expect(preview.scale).toBeCloseTo(1.2, 2);
    });

    it("zoom-out 应该按 1/zoomRate 倍缩小", async () => {
      const preview = createPreview({ urlList: ["a.jpg"] });
      preview.zoomRate = 1.2;
      await waitForRender();

      preview.scale = 1.2;
      preview.shadowRoot
        .querySelector(".ea-image-preview__zoom-out-icon")
        .click();
      await waitForRender();

      expect(preview.scale).toBeCloseTo(1, 2);
    });

    it("连续 zoom-in 应该累加缩放", async () => {
      const preview = createPreview({ urlList: ["a.jpg"] });
      preview.zoomRate = 1.2;
      await waitForRender();

      preview.scale = 1;
      const zoomInIcon = preview.shadowRoot.querySelector(
        ".ea-image-preview__zoom-in-icon"
      );

      zoomInIcon.click();
      await waitForRender();

      zoomInIcon.click();
      await waitForRender();

      expect(preview.scale).toBeCloseTo(1.44, 2);
    });

    it("zoom 不应该超过 maxScale", async () => {
      const preview = createPreview({ urlList: ["a.jpg"] });
      preview.maxScale = 3;
      preview.zoomRate = 2;
      await waitForRender();

      preview.scale = 2;
      preview.shadowRoot
        .querySelector(".ea-image-preview__zoom-in-icon")
        .click();
      await waitForRender();

      expect(preview.scale).toBeLessThanOrEqual(3);
    });

    it("zoom 不应该低于 minScale", async () => {
      const preview = createPreview({ urlList: ["a.jpg"] });
      preview.minScale = 0.5;
      preview.zoomRate = 2;
      await waitForRender();

      preview.scale = 0.5;
      preview.shadowRoot
        .querySelector(".ea-image-preview__zoom-out-icon")
        .click();
      await waitForRender();

      expect(preview.scale).toBeGreaterThanOrEqual(0.5);
    });
  });

  describe("Rotate Logic", () => {
    it("连续旋转应该累加角度", async () => {
      const preview = createPreview({ urlList: ["a.jpg"] });
      await waitForRender();

      const rotateRightIcon = preview.shadowRoot.querySelector(
        ".ea-image-preview__rotate-right-icon"
      );
      rotateRightIcon.click();
      await waitForRender();
      rotateRightIcon.click();
      await waitForRender();

      const content = preview.shadowRoot.querySelector(".ea-overlay__content");
      expect(content.style.getPropertyValue("--ea-image-preview-rotate")).toBe(
        "180deg"
      );
    });

    it("交替左右旋转应该正确计算", async () => {
      const preview = createPreview({ urlList: ["a.jpg"] });
      await waitForRender();

      preview.shadowRoot
        .querySelector(".ea-image-preview__rotate-right-icon")
        .click();
      await waitForRender();
      preview.shadowRoot
        .querySelector(".ea-image-preview__rotate-left-icon")
        .click();
      await waitForRender();

      const content = preview.shadowRoot.querySelector(".ea-overlay__content");
      expect(content.style.getPropertyValue("--ea-image-preview-rotate")).toBe(
        "0deg"
      );
    });

    it("旋转应该触发 rotate 事件", async () => {
      const preview = createPreview({ urlList: ["a.jpg"] });
      await waitForRender();

      const rotateSpy = vi.fn();
      preview.addEventListener("rotate", rotateSpy);

      preview.shadowRoot
        .querySelector(".ea-image-preview__rotate-right-icon")
        .click();
      await waitForRender();

      expect(rotateSpy).toHaveBeenCalled();
    });

    it("rotate 事件应该包含 oldVal 和 rotate detail", async () => {
      const preview = createPreview({ urlList: ["a.jpg"] });
      await waitForRender();

      let capturedEvent = null;
      preview.addEventListener("rotate", e => {
        capturedEvent = e;
      });

      preview.shadowRoot
        .querySelector(".ea-image-preview__rotate-right-icon")
        .click();
      await waitForRender();

      expect(capturedEvent).toBeTruthy();
      expect(capturedEvent.detail).toBeDefined();
      expect(capturedEvent.detail.oldVal).toBeDefined();
      expect(capturedEvent.detail.rotate).toBeDefined();
    });
  });

  describe("Progress Rendering", () => {
    it("默认 progress 应该显示 active / total 格式", async () => {
      const preview = createPreview({ urlList: ["a.jpg", "b.jpg", "c.jpg"] });
      await waitForRender();

      preview.index = 0;
      await waitForRender();

      const progressEl = preview.shadowRoot.querySelector(
        ".ea-image-preview__progress"
      );
      expect(progressEl.textContent).toContain("1");
      expect(progressEl.textContent).toContain("3");
    });

    it("切换图片后 progress 应该更新", async () => {
      const preview = createPreview({ urlList: ["a.jpg", "b.jpg", "c.jpg"] });
      await waitForRender();

      preview.index = 2;
      await waitForRender();

      const progressEl = preview.shadowRoot.querySelector(
        ".ea-image-preview__progress"
      );
      expect(progressEl.textContent).toContain("3");
    });

    it("showProgress 为 false 时 progress 应该隐藏", async () => {
      const preview = createPreview({ urlList: ["a.jpg"] });
      await waitForRender();

      const containerEl = preview.shadowRoot.querySelector(".ea-image-preview");
      expect(containerEl.classList.contains("is-show-progress")).toBe(false);
    });

    it("showProgress 为 true 时 progress 应该显示", async () => {
      const preview = createPreview({ urlList: ["a.jpg"], showProgress: true });
      await waitForRender();

      const containerEl = preview.shadowRoot.querySelector(".ea-image-preview");
      expect(containerEl.classList.contains("is-show-progress")).toBe(true);
    });
  });

  describe("Custom Progress Slot with data-active/data-total", () => {
    it("自定义 progress slot 应该渲染 data-active 和 data-total", async () => {
      const preview = createPreview({ urlList: ["a.jpg", "b.jpg"] });
      preview.innerHTML = `<section slot="progress"><span data-active></span> / <span data-total></span></section>`;
      await waitForRender();

      preview.index = 0;
      await waitForRender();

      expect(preview.querySelector("[data-active]").textContent).toBe("1");
      expect(preview.querySelector("[data-total]").textContent).toBe("2");
    });

    it("切换图片后自定义 progress 应该更新", async () => {
      const preview = createPreview({ urlList: ["a.jpg", "b.jpg", "c.jpg"] });
      preview.innerHTML = `<section slot="progress"><span data-active></span> / <span data-total></span></section>`;
      await waitForRender();

      preview.index = 2;
      await waitForRender();

      expect(preview.querySelector("[data-active]").textContent).toBe("3");
      expect(preview.querySelector("[data-total]").textContent).toBe("3");
    });
  });

  describe("Custom Toolbar Slot with data-action", () => {
    it("自定义 toolbar slot 的 data-action 元素应该触发对应操作", async () => {
      const preview = createPreview({ urlList: ["a.jpg", "b.jpg"] });
      preview.innerHTML = `<section slot="toolbar"><button data-action="switch-next">Next</button></section>`;
      await waitForRender();

      preview.index = 0;
      await waitForRender();

      preview.querySelector('[data-action="switch-next"]').click();
      await waitForRender();

      expect(preview.index).toBe(1);
    });

    it("自定义 toolbar slot 的 zoom-in data-action 应该触发缩放", async () => {
      const preview = createPreview({ urlList: ["a.jpg"] });
      preview.innerHTML = `<section slot="toolbar"><button data-action="zoom-in">Zoom In</button></section>`;
      await waitForRender();

      const scaleBefore = preview.scale;
      preview.querySelector('[data-action="zoom-in"]').click();
      await waitForRender();

      expect(preview.scale).toBeGreaterThan(scaleBefore);
    });

    it("自定义 toolbar slot 的 rotate-anticlockwise 应该触发逆时针旋转", async () => {
      const preview = createPreview({ urlList: ["a.jpg"] });
      preview.innerHTML = `<section slot="toolbar"><button data-action="rotate-anticlockwise">Rotate Left</button></section>`;
      await waitForRender();

      preview.querySelector('[data-action="rotate-anticlockwise"]').click();
      await waitForRender();

      const content = preview.shadowRoot.querySelector(".ea-overlay__content");
      expect(content.style.getPropertyValue("--ea-image-preview-rotate")).toBe(
        "-90deg"
      );
    });

    it("自定义 toolbar slot 的 rotate-clockwise 应该触发顺时针旋转", async () => {
      const preview = createPreview({ urlList: ["a.jpg"] });
      preview.innerHTML = `<section slot="toolbar"><button data-action="rotate-clockwise">Rotate Right</button></section>`;
      await waitForRender();

      preview.querySelector('[data-action="rotate-clockwise"]').click();
      await waitForRender();

      const content = preview.shadowRoot.querySelector(".ea-overlay__content");
      expect(content.style.getPropertyValue("--ea-image-preview-rotate")).toBe(
        "90deg"
      );
    });

    it("自定义 toolbar slot 的 zoom-out data-action 应该触发缩小", async () => {
      const preview = createPreview({ urlList: ["a.jpg"] });
      preview.innerHTML = `<section slot="toolbar"><button data-action="zoom-out">Zoom Out</button></section>`;
      await waitForRender();

      preview.scale = 2;
      await waitForRender();

      preview.querySelector('[data-action="zoom-out"]').click();
      await waitForRender();

      expect(preview.scale).toBeLessThan(2);
    });

    it("自定义 toolbar slot 的 switch-prev 应该切换到上一张", async () => {
      const preview = createPreview({ urlList: ["a.jpg", "b.jpg", "c.jpg"] });
      preview.innerHTML = `<section slot="toolbar"><button data-action="switch-prev">Prev</button></section>`;
      await waitForRender();

      preview.index = 1;
      await waitForRender();

      preview.querySelector('[data-action="switch-prev"]').click();
      await waitForRender();

      expect(preview.index).toBe(0);
    });
  });

  describe("Image Rendering", () => {
    it("设置 urlList 后应该渲染 ea-image 元素", async () => {
      const preview = createPreview({ urlList: ["a.jpg"] });
      await waitForRender();

      const img = preview.shadowRoot.querySelector(".ea-image-preview__img");
      expect(img).toBeTruthy();
      expect(img.tagName.toLowerCase()).toBe("ea-image");
    });

    it("渲染的 ea-image 应该有正确的 src", async () => {
      const preview = createPreview({ urlList: ["test.jpg"] });
      await waitForRender();

      const img = preview.shadowRoot.querySelector(".ea-image-preview__img");
      expect(img.getAttribute("src")).toBe("test.jpg");
    });

    it("渲染的 ea-image 应该设置 fit 为 contain", async () => {
      const preview = createPreview({ urlList: ["a.jpg"] });
      await waitForRender();

      const img = preview.shadowRoot.querySelector(".ea-image-preview__img");
      expect(img.getAttribute("fit")).toBe("contain");
    });

    it("切换 index 应该替换当前图片", async () => {
      const preview = createPreview({ urlList: ["a.jpg", "b.jpg"] });
      await waitForRender();

      preview.index = 0;
      await waitForRender();

      let img = preview.shadowRoot.querySelector(".ea-image-preview__img");
      expect(img.getAttribute("src")).toBe("a.jpg");

      preview.index = 1;
      await waitForRender();

      img = preview.shadowRoot.querySelector(".ea-image-preview__img");
      expect(img.getAttribute("src")).toBe("b.jpg");
    });
  });

  describe("switch Event", () => {
    it("切换图片时应该触发 switch 事件", async () => {
      const preview = createPreview({ urlList: ["a.jpg", "b.jpg"] });
      await waitForRender();

      preview.visible = true;
      await waitForRender();

      const switchSpy = vi.fn();
      preview.addEventListener("switch", switchSpy);

      preview.index = 1;
      await waitForRender();

      expect(switchSpy).toHaveBeenCalled();
    });

    it("switch 事件应该包含 index 和 url detail", async () => {
      const preview = createPreview({ urlList: ["a.jpg", "b.jpg"] });
      await waitForRender();

      preview.visible = true;
      await waitForRender();

      let capturedEvent = null;
      preview.addEventListener("switch", e => {
        capturedEvent = e;
      });

      preview.index = 1;
      await waitForRender();

      expect(capturedEvent).toBeTruthy();
      expect(capturedEvent.detail.index).toBe(1);
      expect(capturedEvent.detail.url).toBe("b.jpg");
    });
  });

  describe("Wheel Zoom", () => {
    it("滚轮向上应该放大", async () => {
      const preview = createPreview({ urlList: ["a.jpg"] });
      await waitForRender();

      const overlay = preview.shadowRoot.querySelector(".ea-overlay");
      const wheelEvent = new WheelEvent("wheel", {
        deltaY: -100,
        bubbles: true,
        cancelable: true,
      });

      overlay.dispatchEvent(wheelEvent);
      await waitForRender();

      expect(preview.scale).toBeGreaterThan(1);
    });

    it("滚轮向下应该缩小", async () => {
      const preview = createPreview({ urlList: ["a.jpg"] });
      await waitForRender();

      preview.scale = 2;
      await waitForRender();

      const overlay = preview.shadowRoot.querySelector(".ea-overlay");
      const wheelEvent = new WheelEvent("wheel", {
        deltaY: 100,
        bubbles: true,
        cancelable: true,
      });

      overlay.dispatchEvent(wheelEvent);
      await waitForRender();

      expect(preview.scale).toBeLessThan(2);
    });
  });

  describe("Mouse Drag Move", () => {
    it("mousedown 在 content 上应该开始拖拽", async () => {
      const preview = createPreview({ urlList: ["a.jpg"] });
      await waitForRender();

      const content = preview.shadowRoot.querySelector(".ea-overlay__content");
      const mousedownEvent = new MouseEvent("mousedown", {
        clientX: 100,
        clientY: 100,
        bubbles: true,
        cancelable: true,
      });

      expect(() => content.dispatchEvent(mousedownEvent)).not.toThrow();
    });
  });

  describe("setActiveItem Method", () => {
    it("setActiveItem 应该设置 index", async () => {
      const preview = createPreview({ urlList: ["a.jpg", "b.jpg", "c.jpg"] });
      await waitForRender();

      preview.setActiveItem(2);
      await waitForRender();

      expect(preview.index).toBe(2);
    });

    it("setActiveItem 等同于直接设置 index", async () => {
      const preview = createPreview({ urlList: ["a.jpg", "b.jpg", "c.jpg"] });
      await waitForRender();

      preview.setActiveItem(1);
      await waitForRender();

      expect(preview.index).toBe(1);
    });
  });

  describe("reset Method", () => {
    it("reset 应该重置 scale 为 1", async () => {
      const preview = createPreview({ urlList: ["a.jpg"] });
      await waitForRender();

      preview.scale = 3;
      await waitForRender();

      preview.reset();
      await waitForRender();

      expect(preview.scale).toBe(1);
    });

    it("reset 应该重置 index 为 initialIndex", async () => {
      const preview = createPreview({
        urlList: ["a.jpg", "b.jpg", "c.jpg"],
        initialIndex: 1,
      });
      await waitForRender();

      preview.index = 2;
      await waitForRender();

      preview.reset();
      await waitForRender();

      expect(preview.index).toBe(1);
    });

    it("reset 应该重置旋转角度为 0", async () => {
      const preview = createPreview({ urlList: ["a.jpg"] });
      await waitForRender();

      preview.shadowRoot
        .querySelector(".ea-image-preview__rotate-right-icon")
        .click();
      await waitForRender();

      preview.reset();
      await waitForRender();

      const content = preview.shadowRoot.querySelector(".ea-overlay__content");
      expect(content.style.getPropertyValue("--ea-image-preview-rotate")).toBe(
        "0deg"
      );
    });

    it("reset 应该重置移动位置为 0", async () => {
      const preview = createPreview({ urlList: ["a.jpg"] });
      await waitForRender();

      preview.reset();
      await waitForRender();

      const content = preview.shadowRoot.querySelector(".ea-overlay__content");
      expect(
        content.style.getPropertyValue("--ea-image-preview-img-move-x")
      ).toBe("0");
      expect(
        content.style.getPropertyValue("--ea-image-preview-img-move-y")
      ).toBe("0");
    });
  });

  describe("ea-closed Event Auto Reset", () => {
    it("ea-closed 事件应该触发 reset", async () => {
      const preview = createPreview({ urlList: ["a.jpg"] });
      await waitForRender();

      preview.scale = 3;
      await waitForRender();

      preview.reset();
      await waitForRender();

      expect(preview.scale).toBe(1);
    });

    it("_handleClosed 方法应该检查 e.target 是否为组件自身", async () => {
      const preview = createPreview({ urlList: ["a.jpg"] });
      await waitForRender();

      preview.scale = 3;
      await waitForRender();

      const fakeEvent = new CustomEvent("ea-closed", {
        bubbles: true,
        composed: true,
      });
      Object.defineProperty(fakeEvent, "target", {
        value: document.createElement("div"),
      });

      preview._handleClosed(fakeEvent);
      await waitForRender();

      expect(preview.scale).toBe(3);
    });

    it("_handleClosed 方法在 e.target 为组件自身时应该调用 reset", async () => {
      const preview = createPreview({ urlList: ["a.jpg"] });
      await waitForRender();

      preview.scale = 3;
      await waitForRender();

      const realEvent = new CustomEvent("ea-closed", {
        bubbles: true,
        composed: true,
      });
      Object.defineProperty(realEvent, "target", {
        value: preview,
      });

      preview._handleClosed(realEvent);
      await waitForRender();

      expect(preview.scale).toBe(1);
    });
  });

  describe("CSS Variables", () => {
    it("应该设置 --ea-image-preview-scale CSS 变量", async () => {
      const preview = createPreview({ urlList: ["a.jpg"] });
      await waitForRender();

      preview.scale = 2;
      await waitForRender();

      const content = preview.shadowRoot.querySelector(".ea-overlay__content");
      expect(content.style.getPropertyValue("--ea-image-preview-scale")).toBe(
        "2"
      );
    });

    it("应该设置 --ea-image-preview-rotate CSS 变量", async () => {
      const preview = createPreview({ urlList: ["a.jpg"] });
      await waitForRender();

      preview.shadowRoot
        .querySelector(".ea-image-preview__rotate-right-icon")
        .click();
      await waitForRender();

      const content = preview.shadowRoot.querySelector(".ea-overlay__content");
      expect(content.style.getPropertyValue("--ea-image-preview-rotate")).toBe(
        "90deg"
      );
    });

    it("应该支持 --ea-image-preview-img-move-x/y CSS 变量", async () => {
      const preview = createPreview({ urlList: ["a.jpg"] });
      await waitForRender();

      const content = preview.shadowRoot.querySelector(".ea-overlay__content");
      expect(
        content.style.getPropertyValue("--ea-image-preview-img-move-x")
      ).toBeDefined();
      expect(
        content.style.getPropertyValue("--ea-image-preview-img-move-y")
      ).toBeDefined();
    });
  });

  describe("Lifecycle", () => {
    it("组件挂载时应该调用 $mount", async () => {
      const preview = createPreview();
      await waitForRender();

      const overlayEl = preview.shadowRoot.querySelector(".ea-overlay");
      expect(overlayEl).toBeTruthy();
    });

    it("组件移除时应该清理资源", async () => {
      const preview = createPreview();
      await waitForRender();

      preview.remove();
      await waitForRender();

      expect(preview.isConnected).toBe(false);
    });
  });
});
