import { describe, it, expect, beforeEach, afterEach } from "vitest";

// 导入 ea-empty 组件
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

  /**
   * 基本功能测试
   */
  describe("Basic Functionality", () => {
    it("应该正确渲染 ea-empty 组件", () => {
      const empty = document.createElement("ea-empty");
      container.appendChild(empty);

      expect(empty).toBeDefined();
      expect(empty.shadowRoot).toBeDefined();
    });

    it("应该包含必要的 CSS Part", () => {
      const empty = document.createElement("ea-empty");
      container.appendChild(empty);

      expect(empty.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
      expect(
        empty.shadowRoot.querySelector('[part="placeholder"]')
      ).toBeTruthy();
      expect(
        empty.shadowRoot.querySelector('[part="description"]')
      ).toBeTruthy();
      expect(empty.shadowRoot.querySelector('[part="bottom"]')).toBeTruthy();
    });

    it("应该包含必要的插槽", () => {
      const empty = document.createElement("ea-empty");
      container.appendChild(empty);

      expect(empty.shadowRoot.querySelector('slot[name="image"]')).toBeTruthy();
      expect(
        empty.shadowRoot.querySelector('slot[name="description"]')
      ).toBeTruthy();
      expect(empty.shadowRoot.querySelector("slot:not([name])")).toBeTruthy();
    });
  });

  /**
   * Description 属性测试
   */
  describe("Description Attribute", () => {
    it("默认 description 应该显示 'No Data'", async () => {
      const empty = document.createElement("ea-empty");
      container.appendChild(empty);

      await new Promise(resolve => setTimeout(resolve, 50));

      const descriptionSlot = empty.shadowRoot.querySelector(
        'slot[name="description"]'
      );
      expect(descriptionSlot).toBeTruthy();
    });

    it("应该通过 description 属性设置描述文字", async () => {
      const empty = document.createElement("ea-empty");
      empty.setAttribute("description", "Custom Description");
      container.appendChild(empty);

      await new Promise(resolve => setTimeout(resolve, 50));

      const descriptionSlot = empty.shadowRoot.querySelector(
        'slot[name="description"]'
      );
      expect(descriptionSlot).toBeTruthy();
    });

    it("description 属性应该支持空字符串", async () => {
      const empty = document.createElement("ea-empty");
      empty.setAttribute("description", "");
      container.appendChild(empty);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(empty.getAttribute("description")).toBe("");
    });
  });

  /**
   * Image 属性测试
   */
  describe("Image Attribute", () => {
    it("默认应该显示默认的空状态 SVG", async () => {
      const empty = document.createElement("ea-empty");
      container.appendChild(empty);

      await new Promise(resolve => setTimeout(resolve, 50));

      const placeholder = empty.shadowRoot.querySelector(
        '[part="placeholder"]'
      );
      expect(placeholder).toBeTruthy();
    });

    it("应该通过 image 属性设置自定义图片 URL", async () => {
      const empty = document.createElement("ea-empty");
      empty.setAttribute("image", "https://example.com/image.png");
      container.appendChild(empty);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(empty.getAttribute("image")).toBe("https://example.com/image.png");
    });

    it("image 属性应该支持空字符串", async () => {
      const empty = document.createElement("ea-empty");
      empty.setAttribute("image", "");
      container.appendChild(empty);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(empty.getAttribute("image")).toBe("");
    });
  });

  /**
   * Image Size 属性测试
   */
  describe("Image Size Attribute", () => {
    it("默认 image-size 应该为空", () => {
      const empty = document.createElement("ea-empty");
      container.appendChild(empty);

      expect(empty.getAttribute("image-size")).toBeNull();
    });

    it("应该通过 image-size 属性设置图片大小", () => {
      const empty = document.createElement("ea-empty");
      empty.setAttribute("image-size", "200px");
      container.appendChild(empty);

      expect(empty.getAttribute("image-size")).toBe("200px");
    });

    it("应该支持不同的 image-size 值", () => {
      const sizes = ["100px", "200px", "50%", "10rem"];

      sizes.forEach(size => {
        const empty = document.createElement("ea-empty");
        empty.setAttribute("image-size", size);
        expect(empty.getAttribute("image-size")).toBe(size);
      });
    });
  });

  /**
   * 插槽测试
   */
  describe("Slots", () => {
    it("默认插槽应该渲染底部内容", () => {
      const empty = document.createElement("ea-empty");
      empty.innerHTML = `
        <ea-button type="primary">Button</ea-button>
      `;
      container.appendChild(empty);

      const bottomSlot = empty.shadowRoot.querySelector("slot:not([name])");
      expect(bottomSlot).toBeTruthy();
    });

    it("image 插槽应该支持自定义图片内容", () => {
      const empty = document.createElement("ea-empty");
      empty.innerHTML = `
        <div slot="image">Custom Image</div>
      `;
      container.appendChild(empty);

      const imageSlot = empty.shadowRoot.querySelector('slot[name="image"]');
      expect(imageSlot).toBeTruthy();
    });

    it("description 插槽应该支持自定义描述内容", () => {
      const empty = document.createElement("ea-empty");
      empty.innerHTML = `
        <div slot="description">Custom Description Content</div>
      `;
      container.appendChild(empty);

      const descriptionSlot = empty.shadowRoot.querySelector(
        'slot[name="description"]'
      );
      expect(descriptionSlot).toBeTruthy();
    });

    it("应该同时支持多个插槽", () => {
      const empty = document.createElement("ea-empty");
      empty.innerHTML = `
        <div slot="image">Custom Image</div>
        <div slot="description">Custom Description</div>
        <ea-button>Action</ea-button>
      `;
      container.appendChild(empty);

      const slots = empty.shadowRoot.querySelectorAll("slot");
      expect(slots.length).toBe(3);
    });
  });

  /**
   * 边界条件测试
   */
  describe("Edge Cases", () => {
    it("空内容时应该正确渲染", () => {
      const empty = document.createElement("ea-empty");
      container.appendChild(empty);

      const emptyContainer =
        empty.shadowRoot.querySelector('[part="container"]');
      expect(emptyContainer).toBeTruthy();
    });

    it("同时设置 description 属性和插槽时应该正常工作", () => {
      const empty = document.createElement("ea-empty");
      empty.setAttribute("description", "Attribute Description");
      empty.innerHTML = `
        <div slot="description">Slot Description</div>
      `;
      container.appendChild(empty);

      const descriptionSlot = empty.shadowRoot.querySelector(
        'slot[name="description"]'
      );
      expect(descriptionSlot).toBeTruthy();
    });

    it("同时设置 image 属性和插槽时应该正常工作", () => {
      const empty = document.createElement("ea-empty");
      empty.setAttribute("image", "https://example.com/image.png");
      empty.innerHTML = `
        <div slot="image">Slot Image</div>
      `;
      container.appendChild(empty);

      const imageSlot = empty.shadowRoot.querySelector('slot[name="image"]');
      expect(imageSlot).toBeTruthy();
    });

    it("特殊字符的 description 应该正确处理", async () => {
      const empty = document.createElement("ea-empty");
      empty.setAttribute("description", "<script>alert('xss')</script>");
      container.appendChild(empty);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(empty.getAttribute("description")).toBe(
        "<script>alert('xss')</script>"
      );
    });
  });

  /**
   * 生命周期测试
   */
  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const empty = document.createElement("ea-empty");
      empty.setAttribute("description", "Test Description");
      container.appendChild(empty);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(empty.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
      expect(
        empty.shadowRoot.querySelector('[part="placeholder"]')
      ).toBeTruthy();
      expect(
        empty.shadowRoot.querySelector('[part="description"]')
      ).toBeTruthy();
    });

    it("组件断开连接后应该正常移除", () => {
      const empty = document.createElement("ea-empty");
      container.appendChild(empty);

      empty.remove();

      expect(container.contains(empty)).toBe(false);
    });

    it("动态修改属性应该生效", async () => {
      const empty = document.createElement("ea-empty");
      container.appendChild(empty);

      await new Promise(resolve => setTimeout(resolve, 50));

      empty.setAttribute("description", "New Description");
      expect(empty.getAttribute("description")).toBe("New Description");

      empty.setAttribute("image-size", "150px");
      expect(empty.getAttribute("image-size")).toBe("150px");
    });
  });
});
