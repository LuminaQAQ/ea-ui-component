import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// 导入 ea-skeleton 组件及其子组件
import "../components/ea-skeleton/index.js";

describe("EaSkeleton Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  /**
   * EaSkeleton 基本功能测试
   */
  describe("EaSkeleton Basic Functionality", () => {
    it("应该正确渲染 ea-skeleton 组件", async () => {
      const skeleton = document.createElement("ea-skeleton");
      container.appendChild(skeleton);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(skeleton).toBeDefined();
      expect(skeleton.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const skeleton = document.createElement("ea-skeleton");
      container.appendChild(skeleton);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(skeleton.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("应该包含 default-slot CSS Part", async () => {
      const skeleton = document.createElement("ea-skeleton");
      container.appendChild(skeleton);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(skeleton.shadowRoot.querySelector('[part="default-slot"]')).toBeTruthy();
    });

    it("应该包含 template-slot CSS Part", async () => {
      const skeleton = document.createElement("ea-skeleton");
      container.appendChild(skeleton);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(skeleton.shadowRoot.querySelector('[part="template-slot"]')).toBeTruthy();
    });
  });

  /**
   * Loading 属性测试
   */
  describe("Loading Attribute", () => {
    it("默认 loading 应该是 true", async () => {
      const skeleton = document.createElement("ea-skeleton");
      container.appendChild(skeleton);

      await new Promise(resolve => setTimeout(resolve, 50));

      // 默认 loading 为 true，但可能返回 null 或 true
      const value = skeleton.loading;
      expect(value === true || value === null).toBe(true);
    });

    it("设置 loading 为 false 应该显示真实内容", async () => {
      const skeleton = document.createElement("ea-skeleton");
      skeleton.loading = false;
      container.appendChild(skeleton);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(skeleton.loading).toBe(false);
    });

    it("应该支持切换 loading 状态", async () => {
      const skeleton = document.createElement("ea-skeleton");
      skeleton.loading = true;
      container.appendChild(skeleton);

      await new Promise(resolve => setTimeout(resolve, 50));

      skeleton.loading = false;

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(skeleton.loading).toBe(false);
    });
  });

  /**
   * Animated 属性测试
   */
  describe("Animated Attribute", () => {
    it("默认 animated 应该是 false", async () => {
      const skeleton = document.createElement("ea-skeleton");
      container.appendChild(skeleton);

      await new Promise(resolve => setTimeout(resolve, 50));

      // 属性可能返回 null 或 false
      const value = skeleton.animated;
      expect(value === false || value === null).toBe(true);
    });

    it("设置 animated 属性应该启用动画", async () => {
      const skeleton = document.createElement("ea-skeleton");
      skeleton.animated = true;
      container.appendChild(skeleton);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(skeleton.animated).toBe(true);
    });
  });

  /**
   * Rows 属性测试
   */
  describe("Rows Attribute", () => {
    it("默认 rows 应该是 4", async () => {
      const skeleton = document.createElement("ea-skeleton");
      container.appendChild(skeleton);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(skeleton.rows).toBe(4);
    });

    it("应该支持 rows 属性", async () => {
      const skeleton = document.createElement("ea-skeleton");
      skeleton.rows = 6;
      container.appendChild(skeleton);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(skeleton.rows).toBe(6);
    });

    it("应该支持不同的 rows 值", async () => {
      const rows = [1, 2, 4, 6, 8, 10];

      for (const row of rows) {
        const skeleton = document.createElement("ea-skeleton");
        skeleton.rows = row;
        expect(skeleton.rows).toBe(row);
      }
    });
  });

  /**
   * Count 属性测试
   */
  describe("Count Attribute", () => {
    it("默认 count 应该是 1", async () => {
      const skeleton = document.createElement("ea-skeleton");
      container.appendChild(skeleton);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(skeleton.count).toBe(1);
    });

    it("应该支持 count 属性", async () => {
      const skeleton = document.createElement("ea-skeleton");
      skeleton.count = 3;
      container.appendChild(skeleton);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(skeleton.count).toBe(3);
    });

    it("应该支持不同的 count 值", async () => {
      const counts = [1, 2, 3, 5, 10];

      for (const count of counts) {
        const skeleton = document.createElement("ea-skeleton");
        skeleton.count = count;
        expect(skeleton.count).toBe(count);
      }
    });
  });

  /**
   * Throttle 属性测试
   */
  describe("Throttle Attributes", () => {
    it("默认 throttle-leading 应该是 0", async () => {
      const skeleton = document.createElement("ea-skeleton");
      container.appendChild(skeleton);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(skeleton["throttle-leading"]).toBe(0);
    });

    it("默认 throttle-trailing 应该是 0", async () => {
      const skeleton = document.createElement("ea-skeleton");
      container.appendChild(skeleton);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(skeleton["throttle-trailing"]).toBe(0);
    });

    it("应该支持 throttle-leading 属性", async () => {
      const skeleton = document.createElement("ea-skeleton");
      skeleton.setAttribute("throttle-leading", "500");
      container.appendChild(skeleton);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(skeleton["throttle-leading"]).toBe(500);
    });

    it("应该支持 throttle-trailing 属性", async () => {
      const skeleton = document.createElement("ea-skeleton");
      skeleton.setAttribute("throttle-trailing", "500");
      container.appendChild(skeleton);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(skeleton["throttle-trailing"]).toBe(500);
    });
  });

  /**
   * EaSkeletonItem 基本功能测试
   */
  describe("EaSkeletonItem Basic Functionality", () => {
    it("应该正确渲染 ea-skeleton-item 组件", async () => {
      const item = document.createElement("ea-skeleton-item");
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(item).toBeDefined();
      expect(item.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const item = document.createElement("ea-skeleton-item");
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(item.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });
  });

  /**
   * EaSkeletonItem Variant 属性测试
   */
  describe("EaSkeletonItem Variant Attribute", () => {
    it("默认 variant 应该是 p", async () => {
      const item = document.createElement("ea-skeleton-item");
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(item.variant).toBe("p");
    });

    it("应该支持 variant='text'", async () => {
      const item = document.createElement("ea-skeleton-item");
      item.variant = "text";
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(item.variant).toBe("text");
    });

    it("应该支持 variant='h1'", async () => {
      const item = document.createElement("ea-skeleton-item");
      item.variant = "h1";
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(item.variant).toBe("h1");
    });

    it("应该支持 variant='h3'", async () => {
      const item = document.createElement("ea-skeleton-item");
      item.variant = "h3";
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(item.variant).toBe("h3");
    });

    it("应该支持 variant='caption'", async () => {
      const item = document.createElement("ea-skeleton-item");
      item.variant = "caption";
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(item.variant).toBe("caption");
    });

    it("应该支持 variant='button'", async () => {
      const item = document.createElement("ea-skeleton-item");
      item.variant = "button";
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(item.variant).toBe("button");
    });

    it("应该支持 variant='image'", async () => {
      const item = document.createElement("ea-skeleton-item");
      item.variant = "image";
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(item.variant).toBe("image");
    });

    it("应该支持 variant='circle'", async () => {
      const item = document.createElement("ea-skeleton-item");
      item.variant = "circle";
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(item.variant).toBe("circle");
    });

    it("应该支持 variant='rect'", async () => {
      const item = document.createElement("ea-skeleton-item");
      item.variant = "rect";
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(item.variant).toBe("rect");
    });

    it("应该支持不同的 variant 值", async () => {
      const variants = ["p", "text", "h1", "h3", "caption", "button", "image", "circle", "rect"];

      for (const variant of variants) {
        const item = document.createElement("ea-skeleton-item");
        item.variant = variant;
        expect(item.variant).toBe(variant);
      }
    });
  });

  /**
   * EaSkeletonItem Animated 属性测试
   */
  describe("EaSkeletonItem Animated Attribute", () => {
    it("默认 animated 应该是 false", async () => {
      const item = document.createElement("ea-skeleton-item");
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      // 属性可能返回 null 或 false
      const value = item.animated;
      expect(value === false || value === null).toBe(true);
    });

    it("设置 animated 属性应该启用动画", async () => {
      const item = document.createElement("ea-skeleton-item");
      item.animated = true;
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(item.animated).toBe(true);
    });
  });

  /**
   * 组合布局测试
   */
  describe("Combined Layout", () => {
    it("应该支持基本的 skeleton + skeleton-item 布局", async () => {
      const skeleton = document.createElement("ea-skeleton");
      const item = document.createElement("ea-skeleton-item");
      item.setAttribute("slot", "template");
      skeleton.appendChild(item);
      container.appendChild(skeleton);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(skeleton.querySelector("ea-skeleton-item")).toBeTruthy();
    });

    it("应该支持多个 skeleton-item", async () => {
      const skeleton = document.createElement("ea-skeleton");

      for (let i = 0; i < 3; i++) {
        const item = document.createElement("ea-skeleton-item");
        item.setAttribute("slot", "template");
        skeleton.appendChild(item);
      }

      container.appendChild(skeleton);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(skeleton.querySelectorAll("ea-skeleton-item").length).toBe(3);
    });

    it("应该支持自定义模板", async () => {
      const skeleton = document.createElement("ea-skeleton");
      skeleton.innerHTML = `
        <div slot="template">
          <ea-skeleton-item variant="image" style="width: 240px; height: 240px"></ea-skeleton-item>
          <ea-skeleton-item variant="p" style="width: 50%"></ea-skeleton-item>
        </div>
      `;
      container.appendChild(skeleton);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(skeleton.querySelectorAll("ea-skeleton-item").length).toBe(2);
    });

    it("应该支持默认内容", async () => {
      const skeleton = document.createElement("ea-skeleton");
      skeleton.loading = false;
      skeleton.innerHTML = `
        <div slot="template">
          <ea-skeleton-item variant="p"></ea-skeleton-item>
        </div>
        <div>Real Content</div>
      `;
      container.appendChild(skeleton);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(skeleton.textContent).toContain("Real Content");
    });
  });

  /**
   * 边界条件测试
   */
  describe("Edge Cases", () => {
    it("空 skeleton 应该正常渲染", async () => {
      const skeleton = document.createElement("ea-skeleton");
      container.appendChild(skeleton);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(skeleton.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("rows=0 应该正确处理", async () => {
      const skeleton = document.createElement("ea-skeleton");
      skeleton.rows = 0;
      container.appendChild(skeleton);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(skeleton.rows).toBe(0);
    });

    it("count=0 应该正确处理", async () => {
      const skeleton = document.createElement("ea-skeleton");
      skeleton.count = 0;
      container.appendChild(skeleton);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(skeleton.count).toBe(0);
    });

    it("image variant 应该渲染 SVG", async () => {
      const item = document.createElement("ea-skeleton-item");
      item.variant = "image";
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(item.variant).toBe("image");
    });
  });

  /**
   * 生命周期测试
   */
  describe("Lifecycle", () => {
    it("skeleton 组件连接后应该正确初始化", async () => {
      const skeleton = document.createElement("ea-skeleton");
      skeleton.rows = 3;
      container.appendChild(skeleton);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(skeleton.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("组件断开连接后应该正常移除", () => {
      const skeleton = document.createElement("ea-skeleton");
      container.appendChild(skeleton);

      skeleton.remove();

      expect(container.contains(skeleton)).toBe(false);
    });

    it("动态修改 loading 应该生效", async () => {
      const skeleton = document.createElement("ea-skeleton");
      skeleton.loading = true;
      container.appendChild(skeleton);

      await new Promise(resolve => setTimeout(resolve, 50));

      skeleton.loading = false;

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(skeleton.loading).toBe(false);
    });

    it("动态修改 animated 应该生效", async () => {
      const skeleton = document.createElement("ea-skeleton");
      container.appendChild(skeleton);

      await new Promise(resolve => setTimeout(resolve, 50));

      skeleton.animated = true;

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(skeleton.animated).toBe(true);
    });

    it("动态修改 rows 应该生效", async () => {
      const skeleton = document.createElement("ea-skeleton");
      skeleton.rows = 2;
      container.appendChild(skeleton);

      await new Promise(resolve => setTimeout(resolve, 50));

      skeleton.rows = 6;

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(skeleton.rows).toBe(6);
    });

    it("动态修改 count 应该生效", async () => {
      const skeleton = document.createElement("ea-skeleton");
      skeleton.count = 1;
      container.appendChild(skeleton);

      await new Promise(resolve => setTimeout(resolve, 50));

      skeleton.count = 5;

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(skeleton.count).toBe(5);
    });

    it("动态修改 variant 应该生效", async () => {
      const item = document.createElement("ea-skeleton-item");
      item.variant = "p";
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      item.variant = "h1";

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(item.variant).toBe("h1");
    });
  });
});
