import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender";

if (typeof CSS === "undefined") {
  global.CSS = {
    supports: (prop, value) => {
      if (!value) return false;
      const testEl = document.createElement("div");
      testEl.style.setProperty(prop, value);
      return testEl.style.getPropertyValue(prop) === value;
    },
  };
} else if (!CSS.supports) {
  CSS.supports = (prop, value) => {
    if (!value) return false;
    const testEl = document.createElement("div");
    testEl.style.setProperty(prop, value);
    return testEl.style.getPropertyValue(prop) === value;
  };
}

import "../components/ea-empty/index.js";

describe("EaEmpty Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  // ==================== 基础渲染测试 ====================

  describe("Basic Rendering", () => {
    it("应该正确创建 ea-empty 元素", () => {
      const empty = document.createElement("ea-empty");
      container.appendChild(empty);

      expect(empty).toBeDefined();
      expect(empty.tagName.toLowerCase()).toBe("ea-empty");
    });

    it("应该创建 shadow DOM", () => {
      const empty = document.createElement("ea-empty");
      container.appendChild(empty);

      expect(empty.shadowRoot).toBeDefined();
      expect(empty.shadowRoot.mode).toBe("open");
    });

    it("应该渲染容器元素并带有正确的 BEM 类名", () => {
      const empty = document.createElement("ea-empty");
      container.appendChild(empty);

      const containerEl = empty.shadowRoot.querySelector(".ea-empty");
      expect(containerEl).toBeDefined();
      expect(containerEl.tagName.toLowerCase()).toBe("div");
    });

    it("应该渲染 placeholder 元素并带有正确的 BEM 类名", () => {
      const empty = document.createElement("ea-empty");
      container.appendChild(empty);

      const placeholder = empty.shadowRoot.querySelector(
        ".ea-empty__placeholder"
      );
      expect(placeholder).toBeDefined();
    });

    it("应该渲染 description 元素并带有正确的 BEM 类名", () => {
      const empty = document.createElement("ea-empty");
      container.appendChild(empty);

      const description = empty.shadowRoot.querySelector(
        ".ea-empty__description"
      );
      expect(description).toBeDefined();
    });

    it("应该渲染 bottom 元素并带有正确的 BEM 类名", () => {
      const empty = document.createElement("ea-empty");
      container.appendChild(empty);

      const bottom = empty.shadowRoot.querySelector(".ea-empty__bottom");
      expect(bottom).toBeDefined();
    });

    it("默认应该渲染空状态 SVG", () => {
      const empty = document.createElement("ea-empty");
      container.appendChild(empty);

      const defaultSvg = empty.shadowRoot.querySelector(".ea-empty__default");
      expect(defaultSvg).toBeDefined();
      expect(defaultSvg.tagName.toLowerCase()).toBe("section");

      const svg = defaultSvg.querySelector("svg");
      expect(svg).toBeDefined();
    });

    it("默认 SVG 应该包含正确的 viewBox", () => {
      const empty = document.createElement("ea-empty");
      container.appendChild(empty);

      const svg = empty.shadowRoot.querySelector(".ea-empty__default svg");
      expect(svg.getAttribute("viewBox")).toBe("25 30 50 50");
    });

    it("默认 SVG 应该包含 front 和 border 路径", () => {
      const empty = document.createElement("ea-empty");
      container.appendChild(empty);

      const frontPath = empty.shadowRoot.querySelector(
        ".ea-empty__default svg .front"
      );
      const borderPath = empty.shadowRoot.querySelector(
        ".ea-empty__default svg .border"
      );
      expect(frontPath).toBeDefined();
      expect(borderPath).toBeDefined();
    });
  });

  // ==================== CSS Part 测试 ====================

  describe("CSS Parts", () => {
    it("应该暴露 container part", () => {
      const empty = document.createElement("ea-empty");
      container.appendChild(empty);

      const el = empty.shadowRoot.querySelector('[part="container"]');
      expect(el).toBeDefined();
      expect(el.classList.contains("ea-empty")).toBe(true);
    });

    it("应该暴露 placeholder part", () => {
      const empty = document.createElement("ea-empty");
      container.appendChild(empty);

      const el = empty.shadowRoot.querySelector('[part="placeholder"]');
      expect(el).toBeDefined();
      expect(el.classList.contains("ea-empty__placeholder")).toBe(true);
    });

    it("应该暴露 description part", () => {
      const empty = document.createElement("ea-empty");
      container.appendChild(empty);

      const el = empty.shadowRoot.querySelector('[part="description"]');
      expect(el).toBeDefined();
      expect(el.classList.contains("ea-empty__description")).toBe(true);
    });

    it("应该暴露 bottom part", () => {
      const empty = document.createElement("ea-empty");
      container.appendChild(empty);

      const el = empty.shadowRoot.querySelector('[part="bottom"]');
      expect(el).toBeDefined();
      expect(el.classList.contains("ea-empty__bottom")).toBe(true);
    });

    it("默认 SVG 应该暴露 default-image-front part", () => {
      const empty = document.createElement("ea-empty");
      container.appendChild(empty);

      const el = empty.shadowRoot.querySelector('[part="default-image-front"]');
      expect(el).toBeDefined();
    });

    it("默认 SVG 应该暴露 default-image-border part", () => {
      const empty = document.createElement("ea-empty");
      container.appendChild(empty);

      const el = empty.shadowRoot.querySelector(
        '[part="default-image-border"]'
      );
      expect(el).toBeDefined();
    });
  });

  // ==================== 插槽测试 ====================

  describe("Slots", () => {
    it("应该包含默认插槽（底部内容）", () => {
      const empty = document.createElement("ea-empty");
      container.appendChild(empty);

      const defaultSlot = empty.shadowRoot.querySelector(
        ".ea-empty__bottom slot:not([name])"
      );
      expect(defaultSlot).toBeDefined();
    });

    it("应该包含 image 命名插槽", () => {
      const empty = document.createElement("ea-empty");
      container.appendChild(empty);

      const imageSlot = empty.shadowRoot.querySelector(
        '.ea-empty__placeholder slot[name="image"]'
      );
      expect(imageSlot).toBeDefined();
    });

    it("应该包含 description 命名插槽", () => {
      const empty = document.createElement("ea-empty");
      container.appendChild(empty);

      const descSlot = empty.shadowRoot.querySelector(
        '.ea-empty__description slot[name="description"]'
      );
      expect(descSlot).toBeDefined();
    });

    it("image 插槽应该有默认 fallback 内容（默认 SVG）", () => {
      const empty = document.createElement("ea-empty");
      container.appendChild(empty);

      const imageSlot = empty.shadowRoot.querySelector(
        '.ea-empty__placeholder slot[name="image"]'
      );
      const defaultSection = imageSlot.querySelector(".ea-empty__default");
      expect(defaultSection).toBeDefined();
    });

    it("description 插槽应该有默认 fallback 内容 'No Data'", () => {
      const empty = document.createElement("ea-empty");
      container.appendChild(empty);

      const descSlot = empty.shadowRoot.querySelector(
        '.ea-empty__description slot[name="description"]'
      );
      expect(descSlot.textContent.trim()).toBe("No Data");
    });

    it("默认插槽应该渲染用户传入的底部内容", () => {
      const empty = document.createElement("ea-empty");
      empty.innerHTML = '<span slot="">Action Button</span>';
      container.appendChild(empty);

      const bottomSlot = empty.shadowRoot.querySelector(
        ".ea-empty__bottom slot:not([name])"
      );
      expect(bottomSlot).toBeDefined();
    });

    it("image 插槽应该支持自定义内容替换默认 SVG", () => {
      const empty = document.createElement("ea-empty");
      empty.innerHTML = '<div slot="image">Custom Image Content</div>';
      container.appendChild(empty);

      const imageSlot = empty.shadowRoot.querySelector(
        '.ea-empty__placeholder slot[name="image"]'
      );
      expect(imageSlot).toBeDefined();
    });

    it("description 插槽应该支持自定义内容替换默认文字", () => {
      const empty = document.createElement("ea-empty");
      empty.innerHTML = '<span slot="description">Custom Description</span>';
      container.appendChild(empty);

      const descSlot = empty.shadowRoot.querySelector(
        '.ea-empty__description slot[name="description"]'
      );
      expect(descSlot).toBeDefined();
    });

    it("应该同时支持三个插槽", () => {
      const empty = document.createElement("ea-empty");
      empty.innerHTML = `
        <div slot="image">Image</div>
        <div slot="description">Description</div>
        <button>Action</button>
      `;
      container.appendChild(empty);

      const slots = empty.shadowRoot.querySelectorAll("slot");
      expect(slots.length).toBe(3);
    });
  });

  // ==================== Image 属性测试 ====================

  describe("Image Attribute", () => {
    it("默认 image 属性应该为空字符串", async () => {
      const empty = document.createElement("ea-empty");
      container.appendChild(empty);

      await waitForRender();

      expect(empty.image).toBe("");
    });

    it("默认应该渲染默认 SVG 而非 img 标签", async () => {
      const empty = document.createElement("ea-empty");
      container.appendChild(empty);

      await waitForRender();

      const defaultSvg = empty.shadowRoot.querySelector(".ea-empty__default");
      const imgEl = empty.shadowRoot.querySelector(".ea-empty__image");
      expect(defaultSvg).toBeDefined();
      expect(imgEl).toBeNull();
    });

    it("应该通过 HTML attribute 设置 image", async () => {
      const empty = document.createElement("ea-empty");
      empty.setAttribute("image", "https://example.com/custom.png");
      container.appendChild(empty);

      await waitForRender();

      expect(empty.image).toBe("https://example.com/custom.png");
    });

    it("设置 image 后应该渲染 img 标签替代默认 SVG", async () => {
      const empty = document.createElement("ea-empty");
      empty.setAttribute("image", "https://example.com/custom.png");
      container.appendChild(empty);

      await waitForRender();

      const defaultSvg = empty.shadowRoot.querySelector(".ea-empty__default");
      const imgEl = empty.shadowRoot.querySelector(".ea-empty__image");
      expect(defaultSvg).toBeNull();
      expect(imgEl).toBeDefined();
      expect(imgEl.tagName.toLowerCase()).toBe("img");
    });

    it("img 标签应该有正确的 src 属性", async () => {
      const empty = document.createElement("ea-empty");
      empty.setAttribute("image", "https://example.com/custom.png");
      container.appendChild(empty);

      await waitForRender();

      const imgEl = empty.shadowRoot.querySelector(".ea-empty__image");
      expect(imgEl.getAttribute("src")).toBe("https://example.com/custom.png");
    });

    it("img 标签应该有正确的 alt 属性", async () => {
      const empty = document.createElement("ea-empty");
      empty.setAttribute("image", "https://example.com/custom.png");
      container.appendChild(empty);

      await waitForRender();

      const imgEl = empty.shadowRoot.querySelector(".ea-empty__image");
      expect(imgEl.getAttribute("alt")).toBe("empty image");
    });

    it("img 标签应该暴露 image part", async () => {
      const empty = document.createElement("ea-empty");
      empty.setAttribute("image", "https://example.com/custom.png");
      container.appendChild(empty);

      await waitForRender();

      const imgEl = empty.shadowRoot.querySelector('[part="image"]');
      expect(imgEl).toBeDefined();
      expect(imgEl.tagName.toLowerCase()).toBe("img");
    });

    it("image 设置为空字符串后应该恢复默认 SVG", async () => {
      const empty = document.createElement("ea-empty");
      empty.setAttribute("image", "https://example.com/custom.png");
      container.appendChild(empty);

      await waitForRender();

      empty.setAttribute("image", "");
      await waitForRender();

      const defaultSvg = empty.shadowRoot.querySelector(".ea-empty__default");
      const imgEl = empty.shadowRoot.querySelector(".ea-empty__image");
      expect(defaultSvg).toBeDefined();
      expect(imgEl).toBeNull();
    });

    it("应该支持动态切换 image URL", async () => {
      const empty = document.createElement("ea-empty");
      empty.setAttribute("image", "https://example.com/first.png");
      container.appendChild(empty);

      await waitForRender();

      let imgEl = empty.shadowRoot.querySelector(".ea-empty__image");
      expect(imgEl.getAttribute("src")).toBe("https://example.com/first.png");

      empty.setAttribute("image", "https://example.com/second.png");
      await waitForRender();

      imgEl = empty.shadowRoot.querySelector(".ea-empty__image");
      expect(imgEl.getAttribute("src")).toBe("https://example.com/second.png");
    });

    it("应该支持通过 JS 属性直接设置 image", async () => {
      const empty = document.createElement("ea-empty");
      container.appendChild(empty);

      await waitForRender();

      empty.image = "https://example.com/js-property.png";
      await waitForRender();

      const imgEl = empty.shadowRoot.querySelector(".ea-empty__image");
      expect(imgEl).toBeDefined();
      expect(imgEl.getAttribute("src")).toBe(
        "https://example.com/js-property.png"
      );
    });

    it("从 image 切回空字符串后 JS 属性应为空", async () => {
      const empty = document.createElement("ea-empty");
      empty.setAttribute("image", "https://example.com/temp.png");
      container.appendChild(empty);

      await waitForRender();

      empty.image = "";
      await waitForRender();

      expect(empty.image).toBe("");
      expect(
        empty.shadowRoot.querySelector(".ea-empty__default")
      ).toBeDefined();
    });
  });

  // ==================== ImageSize 属性测试 ====================

  describe("ImageSize Attribute", () => {
    it("默认 imageSize 属性应该为空字符串", async () => {
      const empty = document.createElement("ea-empty");
      container.appendChild(empty);

      await waitForRender();

      expect(empty.imageSize).toBe("");
    });

    it("应该通过 HTML attribute image-size 设置值", async () => {
      const empty = document.createElement("ea-empty");
      empty.setAttribute("image-size", "200px");
      container.appendChild(empty);

      await waitForRender();

      expect(empty.imageSize).toBe("200px");
      expect(empty.getAttribute("image-size")).toBe("200px");
    });

    it("设置 imageSize 后应该更新 --ea-empty-size CSS 变量", async () => {
      const empty = document.createElement("ea-empty");
      empty.setAttribute("image-size", "200px");
      container.appendChild(empty);

      await waitForRender();
      await waitForRender();

      expect(empty.imageSize).toBe("200px");
      expect(empty.getAttribute("image-size")).toBe("200px");
      expect(empty.style.getPropertyValue("--ea-empty-size")).toBe("200px");
    });

    it("应该支持 px 单位", async () => {
      const empty = document.createElement("ea-empty");
      empty.setAttribute("image-size", "150px");
      container.appendChild(empty);

      await waitForRender();

      expect(empty.imageSize).toBe("150px");
    });

    it("应该支持 rem 单位", async () => {
      const empty = document.createElement("ea-empty");
      empty.setAttribute("image-size", "10rem");
      container.appendChild(empty);

      await waitForRender();

      expect(empty.imageSize).toBe("10rem");
    });

    it("应该支持百分比单位", async () => {
      const empty = document.createElement("ea-empty");
      empty.setAttribute("image-size", "50%");
      container.appendChild(empty);

      await waitForRender();

      expect(empty.imageSize).toBe("50%");
    });

    it("应该支持通过 JS 属性直接设置 imageSize", async () => {
      const empty = document.createElement("ea-empty");
      empty.imageSize = "300px";
      container.appendChild(empty);

      await waitForRender();

      expect(empty.imageSize).toBe("300px");
      expect(empty.style.getPropertyValue("--ea-empty-size")).toBe("300px");
    });

    it("应该支持动态修改 imageSize", async () => {
      const empty = document.createElement("ea-empty");
      empty.setAttribute("image-size", "100px");
      container.appendChild(empty);

      await waitForRender();

      expect(empty.imageSize).toBe("100px");

      empty.setAttribute("image-size", "250px");
      await waitForRender();

      expect(empty.imageSize).toBe("250px");
    });

    it("设置无效 CSS 值时应输出警告", async () => {
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      const empty = document.createElement("ea-empty");
      empty.setAttribute("image-size", "invalid-value!!!");
      container.appendChild(empty);

      await waitForRender();

      expect(warnSpy).toHaveBeenCalledWith(
        "[ea-empty] The size value invalid-value!!! is not supported."
      );

      warnSpy.mockRestore();
    });

    it("设置无效值时不应更新 --ea-empty-size", async () => {
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      const empty = document.createElement("ea-empty");
      empty.setAttribute("image-size", "200px");
      container.appendChild(empty);

      await waitForRender();

      expect(empty.style.getPropertyValue("--ea-empty-size")).toBe("200px");

      empty.setAttribute("image-size", "not-valid!!!");
      await waitForRender();

      expect(empty.style.getPropertyValue("--ea-empty-size")).toBe("200px");

      warnSpy.mockRestore();
    });

    it("imageSize 设置为空字符串后应清空 CSS 变量", async () => {
      const empty = document.createElement("ea-empty");
      empty.setAttribute("image-size", "200px");
      container.appendChild(empty);

      await waitForRender();

      empty.setAttribute("image-size", "");
      await waitForRender();

      expect(empty.imageSize).toBe("");
    });
  });

  // ==================== Description 属性测试 ====================

  describe("Description Attribute", () => {
    it("默认 description 属性应该为空字符串", async () => {
      const empty = document.createElement("ea-empty");
      container.appendChild(empty);

      await waitForRender();

      expect(empty.description).toBe("");
    });

    it("默认 description 插槽 fallback 应该显示 'No Data'", async () => {
      const empty = document.createElement("ea-empty");
      container.appendChild(empty);

      await waitForRender();

      const descSlot = empty.shadowRoot.querySelector(
        '.ea-empty__description slot[name="description"]'
      );
      expect(descSlot.textContent.trim()).toBe("No Data");
    });

    it("应该通过 HTML attribute 设置 description", async () => {
      const empty = document.createElement("ea-empty");
      empty.setAttribute("description", "暂无数据");
      container.appendChild(empty);

      await waitForRender();

      expect(empty.description).toBe("暂无数据");
    });

    it("设置 description 后插槽 textContent 应该更新", async () => {
      const empty = document.createElement("ea-empty");
      empty.setAttribute("description", "Custom Description Text");
      container.appendChild(empty);

      await waitForRender();

      const descSlot = empty.shadowRoot.querySelector(
        '.ea-empty__description slot[name="description"]'
      );
      expect(descSlot.textContent).toBe("Custom Description Text");
    });

    it("description 设置为空字符串后应恢复 'No Data'", async () => {
      const empty = document.createElement("ea-empty");
      empty.setAttribute("description", "Temporary Text");
      container.appendChild(empty);

      await waitForRender();

      empty.setAttribute("description", "");
      await waitForRender();

      const descSlot = empty.shadowRoot.querySelector(
        '.ea-empty__description slot[name="description"]'
      );
      expect(descSlot.textContent.trim()).toBe("No Data");
    });

    it("应该支持通过 JS 属性直接设置 description", async () => {
      const empty = document.createElement("ea-empty");
      container.appendChild(empty);

      await waitForRender();

      empty.description = "JS Property Description";
      await waitForRender();

      expect(empty.description).toBe("JS Property Description");
      const descSlot = empty.shadowRoot.querySelector(
        '.ea-empty__description slot[name="description"]'
      );
      expect(descSlot.textContent).toBe("JS Property Description");
    });

    it("应该支持动态修改 description", async () => {
      const empty = document.createElement("ea-empty");
      empty.setAttribute("description", "First Text");
      container.appendChild(empty);

      await waitForRender();

      let descSlot = empty.shadowRoot.querySelector(
        '.ea-empty__description slot[name="description"]'
      );
      expect(descSlot.textContent).toBe("First Text");

      empty.setAttribute("description", "Second Text");
      await waitForRender();

      descSlot = empty.shadowRoot.querySelector(
        '.ea-empty__description slot[name="description"]'
      );
      expect(descSlot.textContent).toBe("Second Text");
    });

    it("应该支持中文 description", async () => {
      const empty = document.createElement("ea-empty");
      empty.setAttribute("description", "这里什么都没有");
      container.appendChild(empty);

      await waitForRender();

      expect(empty.description).toBe("这里什么都没有");
    });

    it("应该支持包含 HTML 实体的 description", async () => {
      const empty = document.createElement("ea-empty");
      empty.setAttribute("description", "价格 &lt; 100 元");
      container.appendChild(empty);

      await waitForRender();

      expect(empty.description).toBe("价格 &lt; 100 元");
    });

    it("应该支持长文本 description", async () => {
      const longText =
        "这是一段非常长的描述文字，用来测试组件是否能够正确处理长文本的显示。".repeat(
          5
        );
      const empty = document.createElement("ea-empty");
      empty.setAttribute("description", longText);
      container.appendChild(empty);

      await waitForRender();

      expect(empty.description).toBe(longText);
    });
  });

  // ==================== CSS 自定义属性测试 ====================

  describe("CSS Custom Properties", () => {
    it("默认不设置 imageSize 时不应有内联 --ea-empty-size", () => {
      const empty = document.createElement("ea-empty");
      container.appendChild(empty);

      expect(empty.style.getPropertyValue("--ea-empty-size")).toBe("");
    });

    it(":host 应该定义 --ea-empty-image-color", () => {
      const empty = document.createElement("ea-empty");
      container.appendChild(empty);

      const styles = getComputedStyle(empty);
      expect(styles.getPropertyValue("--ea-empty-image-color")).toBeDefined();
    });

    it(":host 应该定义 --ea-empty-color", () => {
      const empty = document.createElement("ea-empty");
      container.appendChild(empty);

      const styles = getComputedStyle(empty);
      expect(styles.getPropertyValue("--ea-empty-color")).toBeDefined();
    });

    it(":host 应该定义 --ea-empty-description-font-size", () => {
      const empty = document.createElement("ea-empty");
      container.appendChild(empty);

      const styles = getComputedStyle(empty);
      expect(
        styles.getPropertyValue("--ea-empty-description-font-size")
      ).toBeDefined();
    });

    it(":host 应该定义 --ea-empty-spacing", () => {
      const empty = document.createElement("ea-empty");
      container.appendChild(empty);

      const styles = getComputedStyle(empty);
      expect(styles.getPropertyValue("--ea-empty-spacing")).toBeDefined();
    });

    it("用户可以通过 style 覆盖 --ea-empty-size", async () => {
      const empty = document.createElement("ea-empty");
      empty.style.setProperty("--ea-empty-size", "80px");
      container.appendChild(empty);

      await waitForRender();

      const size = getComputedStyle(empty).getPropertyValue("--ea-empty-size");
      expect(size.trim()).toBe("80px");
    });
  });

  // ==================== DOM 结构测试 ====================

  describe("DOM Structure", () => {
    it("容器应该是 placeholder、description、bottom 的父级", () => {
      const empty = document.createElement("ea-empty");
      container.appendChild(empty);

      const containerEl = empty.shadowRoot.querySelector(".ea-empty");
      const placeholder = containerEl.querySelector(".ea-empty__placeholder");
      const description = containerEl.querySelector(".ea-empty__description");
      const bottom = containerEl.querySelector(".ea-empty__bottom");

      expect(placeholder).toBeDefined();
      expect(description).toBeDefined();
      expect(bottom).toBeDefined();
    });

    it("placeholder 应该在 description 之前", () => {
      const empty = document.createElement("ea-empty");
      container.appendChild(empty);

      const containerEl = empty.shadowRoot.querySelector(".ea-empty");
      const children = Array.from(containerEl.children);
      const placeholderIndex = children.findIndex(c =>
        c.classList.contains("ea-empty__placeholder")
      );
      const descriptionIndex = children.findIndex(c =>
        c.classList.contains("ea-empty__description")
      );

      expect(placeholderIndex).toBeLessThan(descriptionIndex);
    });

    it("description 应该在 bottom 之前", () => {
      const empty = document.createElement("ea-empty");
      container.appendChild(empty);

      const containerEl = empty.shadowRoot.querySelector(".ea-empty");
      const children = Array.from(containerEl.children);
      const descriptionIndex = children.findIndex(c =>
        c.classList.contains("ea-empty__description")
      );
      const bottomIndex = children.findIndex(c =>
        c.classList.contains("ea-empty__bottom")
      );

      expect(descriptionIndex).toBeLessThan(bottomIndex);
    });

    it("容器应该恰好有三个直接子元素", () => {
      const empty = document.createElement("ea-empty");
      container.appendChild(empty);

      const containerEl = empty.shadowRoot.querySelector(".ea-empty");
      expect(containerEl.children.length).toBe(3);
    });
  });

  // ==================== 生命周期测试 ====================

  describe("Lifecycle", () => {
    it("组件添加到 DOM 后应该正确初始化", async () => {
      const empty = document.createElement("ea-empty");
      container.appendChild(empty);

      await waitForRender();

      expect(empty.shadowRoot.querySelector(".ea-empty")).toBeDefined();
      expect(
        empty.shadowRoot.querySelector(".ea-empty__placeholder")
      ).toBeDefined();
      expect(
        empty.shadowRoot.querySelector(".ea-empty__description")
      ).toBeDefined();
      expect(empty.shadowRoot.querySelector(".ea-empty__bottom")).toBeDefined();
    });

    it("组件从 DOM 移除后应该不再存在于父容器", () => {
      const empty = document.createElement("ea-empty");
      container.appendChild(empty);

      empty.remove();

      expect(container.contains(empty)).toBe(false);
    });

    it("移除后重新添加应该正常工作", async () => {
      const empty = document.createElement("ea-empty");
      container.appendChild(empty);

      await waitForRender();

      empty.remove();
      container.appendChild(empty);

      await waitForRender();

      expect(empty.shadowRoot.querySelector(".ea-empty")).toBeDefined();
    });

    it("挂载前设置属性应该在挂载后生效", async () => {
      const empty = document.createElement("ea-empty");
      empty.setAttribute("description", "Pre-mount Description");
      empty.setAttribute("image", "https://example.com/pre-mount.png");
      empty.setAttribute("image-size", "150px");
      container.appendChild(empty);

      await waitForRender();

      expect(empty.description).toBe("Pre-mount Description");
      expect(empty.image).toBe("https://example.com/pre-mount.png");
      expect(empty.imageSize).toBe("150px");
    });

    it("挂载后动态修改属性应该立即生效", async () => {
      const empty = document.createElement("ea-empty");
      container.appendChild(empty);

      await waitForRender();

      empty.setAttribute("description", "After Mount");
      await waitForRender();

      expect(empty.description).toBe("After Mount");
    });
  });

  // ==================== 边界条件测试 ====================

  describe("Edge Cases", () => {
    it("不设置任何属性时应该使用所有默认值", async () => {
      const empty = document.createElement("ea-empty");
      container.appendChild(empty);

      await waitForRender();

      expect(empty.image).toBe("");
      expect(empty.imageSize).toBe("");
      expect(empty.description).toBe("");
      expect(
        empty.shadowRoot.querySelector(".ea-empty__default")
      ).toBeDefined();
    });

    it("应该正确处理 image 和 image-size 同时设置", async () => {
      const empty = document.createElement("ea-empty");
      empty.setAttribute("image", "https://example.com/img.png");
      empty.setAttribute("image-size", "200px");
      container.appendChild(empty);

      await waitForRender();

      expect(empty.image).toBe("https://example.com/img.png");
      expect(empty.imageSize).toBe("200px");
      const imgEl = empty.shadowRoot.querySelector(".ea-empty__image");
      expect(imgEl).toBeDefined();
    });

    it("应该正确处理三个属性同时设置", async () => {
      const empty = document.createElement("ea-empty");
      empty.setAttribute("image", "https://example.com/all.png");
      empty.setAttribute("image-size", "180px");
      empty.setAttribute("description", "All Set");
      container.appendChild(empty);

      await waitForRender();

      expect(empty.image).toBe("https://example.com/all.png");
      expect(empty.imageSize).toBe("180px");
      expect(empty.description).toBe("All Set");
    });

    it("image 属性设置后又通过插槽覆盖应该正常工作", () => {
      const empty = document.createElement("ea-empty");
      empty.setAttribute("image", "https://example.com/attr.png");
      empty.innerHTML = '<div slot="image">Slot Image</div>';
      container.appendChild(empty);

      const imageSlot = empty.shadowRoot.querySelector(
        '.ea-empty__placeholder slot[name="image"]'
      );
      expect(imageSlot).toBeDefined();
    });

    it("description 属性设置后又通过插槽覆盖应该正常工作", () => {
      const empty = document.createElement("ea-empty");
      empty.setAttribute("description", "Attribute Desc");
      empty.innerHTML = '<div slot="description">Slot Description</div>';
      container.appendChild(empty);

      const descSlot = empty.shadowRoot.querySelector(
        '.ea-empty__description slot[name="description"]'
      );
      expect(descSlot).toBeDefined();
    });

    it("快速连续修改 image 属性应该正确渲染最终状态", async () => {
      const empty = document.createElement("ea-empty");
      container.appendChild(empty);

      await waitForRender();

      empty.setAttribute("image", "https://example.com/1.png");
      empty.setAttribute("image", "https://example.com/2.png");
      empty.setAttribute("image", "https://example.com/3.png");

      await waitForRender();

      const imgEl = empty.shadowRoot.querySelector(".ea-empty__image");
      expect(imgEl.getAttribute("src")).toBe("https://example.com/3.png");
    });

    it("快速连续修改 description 属性应该正确显示最终值", async () => {
      const empty = document.createElement("ea-empty");
      container.appendChild(empty);

      await waitForRender();

      empty.setAttribute("description", "A");
      empty.setAttribute("description", "B");
      empty.setAttribute("description", "C");

      await waitForRender();

      const descSlot = empty.shadowRoot.querySelector(
        '.ea-empty__description slot[name="description"]'
      );
      expect(descSlot.textContent).toBe("C");
    });

    it("image 属性使用相对路径应该正常工作", async () => {
      const empty = document.createElement("ea-empty");
      empty.setAttribute("image", "./assets/empty.png");
      container.appendChild(empty);

      await waitForRender();

      const imgEl = empty.shadowRoot.querySelector(".ea-empty__image");
      expect(imgEl.getAttribute("src")).toBe("./assets/empty.png");
    });

    it("image 属性使用 data URI 应该正常工作", async () => {
      const empty = document.createElement("ea-empty");
      empty.setAttribute("image", "data:image/svg+xml,...");
      container.appendChild(empty);

      await waitForRender();

      const imgEl = empty.shadowRoot.querySelector(".ea-empty__image");
      expect(imgEl.getAttribute("src")).toBe("data:image/svg+xml,...");
    });
  });

  // ==================== 复杂场景测试 ====================

  describe("Complex Scenarios", () => {
    it("完整配置：自定义图片 + 尺寸 + 描述 + 底部按钮", async () => {
      const empty = document.createElement("ea-empty");
      empty.setAttribute("image", "https://example.com/full.png");
      empty.setAttribute("image-size", "160px");
      empty.setAttribute("description", "没有找到相关内容");
      empty.innerHTML = "<button>重新加载</button>";
      container.appendChild(empty);

      await waitForRender();

      expect(empty.image).toBe("https://example.com/full.png");
      expect(empty.imageSize).toBe("160px");
      expect(empty.description).toBe("没有找到相关内容");

      const imgEl = empty.shadowRoot.querySelector(".ea-empty__image");
      expect(imgEl).toBeDefined();

      const bottomSlot = empty.shadowRoot.querySelector(
        ".ea-empty__bottom slot:not([name])"
      );
      expect(bottomSlot).toBeDefined();
    });

    it("从自定义图片切换回默认状态", async () => {
      const empty = document.createElement("ea-empty");
      empty.setAttribute("image", "https://example.com/temp.png");
      empty.setAttribute("description", "临时描述");
      container.appendChild(empty);

      await waitForRender();

      expect(empty.shadowRoot.querySelector(".ea-empty__image")).toBeDefined();

      empty.setAttribute("image", "");
      empty.setAttribute("description", "");
      await waitForRender();

      expect(
        empty.shadowRoot.querySelector(".ea-empty__default")
      ).toBeDefined();
      const descSlot = empty.shadowRoot.querySelector(
        '.ea-empty__description slot[name="description"]'
      );
      expect(descSlot.textContent.trim()).toBe("No Data");
    });

    it("仅设置 description 不设置 image 应该保留默认 SVG", async () => {
      const empty = document.createElement("ea-empty");
      empty.setAttribute("description", "Only Description");
      container.appendChild(empty);

      await waitForRender();

      expect(
        empty.shadowRoot.querySelector(".ea-empty__default")
      ).toBeDefined();
      expect(empty.shadowRoot.querySelector(".ea-empty__image")).toBeNull();
      expect(empty.description).toBe("Only Description");
    });

    it("仅设置 imageSize 不设置 image 应该保留默认 SVG", async () => {
      const empty = document.createElement("ea-empty");
      empty.setAttribute("image-size", "200px");
      container.appendChild(empty);

      await waitForRender();

      expect(
        empty.shadowRoot.querySelector(".ea-empty__default")
      ).toBeDefined();
      expect(empty.imageSize).toBe("200px");
    });

    it("imageSize 与 image 同时动态切换", async () => {
      const empty = document.createElement("ea-empty");
      container.appendChild(empty);

      await waitForRender();

      empty.setAttribute("image", "https://example.com/a.png");
      empty.setAttribute("image-size", "100px");
      await waitForRender();

      expect(empty.image).toBe("https://example.com/a.png");
      expect(empty.imageSize).toBe("100px");

      empty.setAttribute("image", "https://example.com/b.png");
      empty.setAttribute("image-size", "300px");
      await waitForRender();

      expect(empty.image).toBe("https://example.com/b.png");
      expect(empty.imageSize).toBe("300px");
    });
  });
});
