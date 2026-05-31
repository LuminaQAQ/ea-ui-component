import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender.js";

import "../components/ea-skeleton/index";

describe("EaSkeleton Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe("EaSkeleton Basic Functionality", () => {
    it("应该正确渲染 ea-skeleton 组件", async () => {
      const skeleton = document.createElement("ea-skeleton");
      container.appendChild(skeleton);

      await waitForRender();

      expect(skeleton).toBeDefined();
      expect(skeleton.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const skeleton = document.createElement("ea-skeleton");
      container.appendChild(skeleton);

      await waitForRender();

      expect(
        skeleton.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
    });

    it("应该包含 default-slot CSS Part", async () => {
      const skeleton = document.createElement("ea-skeleton");
      container.appendChild(skeleton);

      await waitForRender();

      expect(
        skeleton.shadowRoot.querySelector('[part="default-slot"]')
      ).toBeTruthy();
    });

    it("应该包含 template-slot CSS Part", async () => {
      const skeleton = document.createElement("ea-skeleton");
      container.appendChild(skeleton);

      await waitForRender();

      expect(
        skeleton.shadowRoot.querySelector('[part="template-slot"]')
      ).toBeTruthy();
    });

    it("应该包含 default 插槽", async () => {
      const skeleton = document.createElement("ea-skeleton");
      container.appendChild(skeleton);

      await waitForRender();

      const slot = skeleton.shadowRoot.querySelector(".ea-skeleton__default");
      expect(slot).toBeTruthy();
      expect(slot.tagName.toLowerCase()).toBe("slot");
    });

    it("应该包含 template 插槽", async () => {
      const skeleton = document.createElement("ea-skeleton");
      container.appendChild(skeleton);

      await waitForRender();

      const slot = skeleton.shadowRoot.querySelector(".ea-skeleton__template");
      expect(slot).toBeTruthy();
      expect(slot.tagName.toLowerCase()).toBe("slot");
      expect(slot.getAttribute("name")).toBe("template");
    });

    it("容器应该有 ea-skeleton 基础类名", async () => {
      const skeleton = document.createElement("ea-skeleton");
      container.appendChild(skeleton);

      await waitForRender();

      const containerEl =
        skeleton.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-skeleton")).toBe(true);
    });
  });

  describe("Loading Property", () => {
    it("默认 loading 应该是 true", async () => {
      const skeleton = document.createElement("ea-skeleton");
      container.appendChild(skeleton);

      await waitForRender();

      expect(skeleton.loading).toBe(true);
    });

    it("设置 loading 为 false 应该生效", async () => {
      const skeleton = document.createElement("ea-skeleton");
      skeleton.loading = false;
      container.appendChild(skeleton);

      await waitForRender();

      expect(skeleton.loading).toBe(false);
    });

    it("应该支持从 true 切换到 false", async () => {
      const skeleton = document.createElement("ea-skeleton");
      skeleton.loading = true;
      container.appendChild(skeleton);

      await waitForRender();

      skeleton.loading = false;

      await waitForRender();

      expect(skeleton.loading).toBe(false);
    });

    it("应该支持从 false 切换到 true", async () => {
      const skeleton = document.createElement("ea-skeleton");
      skeleton.loading = false;
      container.appendChild(skeleton);

      await waitForRender();

      skeleton.loading = true;

      await waitForRender();

      expect(skeleton.loading).toBe(true);
    });

    it("loading 为 true 时容器应该有 is-loading 状态类", async () => {
      const skeleton = document.createElement("ea-skeleton");
      skeleton.loading = true;
      container.appendChild(skeleton);

      await waitForRender();

      const containerEl =
        skeleton.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-loading")).toBe(true);
    });

    it("loading 为 false 时容器不应该有 is-loading 状态类", async () => {
      const skeleton = document.createElement("ea-skeleton");
      skeleton.loading = false;
      container.appendChild(skeleton);

      await waitForRender();

      const containerEl =
        skeleton.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-loading")).toBe(false);
    });

    it("切换 loading 状态应该更新容器类名", async () => {
      const skeleton = document.createElement("ea-skeleton");
      container.appendChild(skeleton);

      await waitForRender();

      const containerEl =
        skeleton.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-loading")).toBe(true);

      skeleton.loading = false;
      await waitForRender();

      expect(containerEl.classList.contains("is-loading")).toBe(false);

      skeleton.loading = true;
      await waitForRender();

      expect(containerEl.classList.contains("is-loading")).toBe(true);
    });

    it("通过 HTML 属性设置 loading 应该生效", async () => {
      const skeleton = document.createElement("ea-skeleton");
      skeleton.setAttribute("loading", "false");
      container.appendChild(skeleton);

      await waitForRender();

      expect(skeleton.loading).toBe(false);
    });

    it("通过 HTML 属性设置 loading='true' 应该生效", async () => {
      const skeleton = document.createElement("ea-skeleton");
      skeleton.setAttribute("loading", "true");
      container.appendChild(skeleton);

      await waitForRender();

      expect(skeleton.loading).toBe(true);
    });

    it("通过 HTML 属性设置空字符串 loading 应该解析为 true", async () => {
      const skeleton = document.createElement("ea-skeleton");
      skeleton.setAttribute("loading", "");
      container.appendChild(skeleton);

      await waitForRender();

      expect(skeleton.loading).toBe(true);
    });

    it("动态修改 HTML 属性 loading 应该同步到 property", async () => {
      const skeleton = document.createElement("ea-skeleton");
      container.appendChild(skeleton);

      await waitForRender();

      skeleton.setAttribute("loading", "false");
      await waitForRender();

      expect(skeleton.loading).toBe(false);

      skeleton.setAttribute("loading", "true");
      await waitForRender();

      expect(skeleton.loading).toBe(true);
    });
  });

  describe("Animated Attribute", () => {
    it("默认 animated 应该是 false", async () => {
      const skeleton = document.createElement("ea-skeleton");
      container.appendChild(skeleton);

      await waitForRender();

      expect(skeleton.animated).toBe(false);
    });

    it("设置 animated 为 true 应该生效", async () => {
      const skeleton = document.createElement("ea-skeleton");
      skeleton.animated = true;
      container.appendChild(skeleton);

      await waitForRender();

      expect(skeleton.animated).toBe(true);
    });

    it("通过 HTML 属性设置 animated 应该生效", async () => {
      const skeleton = document.createElement("ea-skeleton");
      skeleton.setAttribute("animated", "");
      container.appendChild(skeleton);

      await waitForRender();

      expect(skeleton.animated).toBe(true);
    });

    it("动态切换 animated 应该生效", async () => {
      const skeleton = document.createElement("ea-skeleton");
      container.appendChild(skeleton);

      await waitForRender();

      skeleton.animated = true;
      await waitForRender();

      expect(skeleton.animated).toBe(true);

      skeleton.animated = false;
      await waitForRender();

      expect(skeleton.animated).toBe(false);
    });

    it("animated 为 true 时应该将 animated 属性传递给默认生成的 skeleton-item", async () => {
      const skeleton = document.createElement("ea-skeleton");
      skeleton.animated = true;
      container.appendChild(skeleton);

      await waitForRender();

      const items = skeleton.shadowRoot.querySelectorAll("ea-skeleton-item");
      items.forEach(item => {
        expect(item.animated).toBe(true);
      });
    });

    it("动态修改 animated 应该更新已存在的 skeleton-item", async () => {
      const skeleton = document.createElement("ea-skeleton");
      container.appendChild(skeleton);

      await waitForRender();

      skeleton.animated = true;
      await waitForRender();

      const items = skeleton.shadowRoot.querySelectorAll("ea-skeleton-item");
      items.forEach(item => {
        expect(item.animated).toBe(true);
      });

      skeleton.animated = false;
      await waitForRender();

      items.forEach(item => {
        expect(item.animated).toBe(false);
      });
    });

    it("animated 应该传递给通过 slot 传入的 skeleton-item", async () => {
      const skeleton = document.createElement("ea-skeleton");
      skeleton.animated = true;
      const item = document.createElement("ea-skeleton-item");
      item.setAttribute("slot", "template");
      skeleton.appendChild(item);
      container.appendChild(skeleton);

      await waitForRender();

      expect(item.animated).toBe(true);
    });
  });

  describe("Rows Attribute", () => {
    it("默认 rows 应该是 4", async () => {
      const skeleton = document.createElement("ea-skeleton");
      container.appendChild(skeleton);

      await waitForRender();

      expect(skeleton.rows).toBe(4);
    });

    it("设置 rows 属性应该生效", async () => {
      const skeleton = document.createElement("ea-skeleton");
      skeleton.rows = 6;
      container.appendChild(skeleton);

      await waitForRender();

      expect(skeleton.rows).toBe(6);
    });

    it("通过 HTML 属性设置 rows 应该生效", async () => {
      const skeleton = document.createElement("ea-skeleton");
      skeleton.setAttribute("rows", "8");
      container.appendChild(skeleton);

      await waitForRender();

      expect(skeleton.rows).toBe(8);
    });

    it("默认应该根据 rows 生成对应数量的 skeleton-item", async () => {
      const skeleton = document.createElement("ea-skeleton");
      skeleton.rows = 3;
      container.appendChild(skeleton);

      await waitForRender();

      const items = skeleton.shadowRoot.querySelectorAll("ea-skeleton-item");
      expect(items.length).toBe(3);
    });

    it("动态修改 rows 应该重新生成 skeleton-item", async () => {
      const skeleton = document.createElement("ea-skeleton");
      container.appendChild(skeleton);

      await waitForRender();

      skeleton.rows = 5;
      await waitForRender();

      const items = skeleton.shadowRoot.querySelectorAll("ea-skeleton-item");
      expect(items.length).toBe(5);
    });

    it("默认生成的 skeleton-item variant 应该是 p", async () => {
      const skeleton = document.createElement("ea-skeleton");
      container.appendChild(skeleton);

      await waitForRender();

      const items = skeleton.shadowRoot.querySelectorAll("ea-skeleton-item");
      items.forEach(item => {
        expect(item.variant).toBe("p");
      });
    });

    it("已有自定义 skeleton-item 时 rows 不应覆盖", async () => {
      const skeleton = document.createElement("ea-skeleton");
      const item = document.createElement("ea-skeleton-item");
      item.setAttribute("slot", "template");
      item.variant = "circle";
      skeleton.appendChild(item);
      container.appendChild(skeleton);

      await waitForRender();

      const items = skeleton.querySelectorAll("ea-skeleton-item");
      expect(items.length).toBe(1);
      expect(items[0].variant).toBe("circle");
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

  describe("Count Attribute", () => {
    it("默认 count 应该是 1", async () => {
      const skeleton = document.createElement("ea-skeleton");
      container.appendChild(skeleton);

      await waitForRender();

      expect(skeleton.count).toBe(1);
    });

    it("设置 count 属性应该生效", async () => {
      const skeleton = document.createElement("ea-skeleton");
      skeleton.count = 3;
      container.appendChild(skeleton);

      await waitForRender();

      expect(skeleton.count).toBe(3);
    });

    it("通过 HTML 属性设置 count 应该生效", async () => {
      const skeleton = document.createElement("ea-skeleton");
      skeleton.setAttribute("count", "5");
      container.appendChild(skeleton);

      await waitForRender();

      expect(skeleton.count).toBe(5);
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

  describe("Throttle Attributes", () => {
    it("默认 throttleLeading 应该是 0", async () => {
      const skeleton = document.createElement("ea-skeleton");
      container.appendChild(skeleton);

      await waitForRender();

      expect(skeleton.throttleLeading).toBe(0);
    });

    it("默认 throttleTrailing 应该是 0", async () => {
      const skeleton = document.createElement("ea-skeleton");
      container.appendChild(skeleton);

      await waitForRender();

      expect(skeleton.throttleTrailing).toBe(0);
    });

    it("应该支持 throttleLeading 属性", async () => {
      const skeleton = document.createElement("ea-skeleton");
      skeleton.setAttribute("throttle-leading", "500");
      container.appendChild(skeleton);

      await waitForRender();

      expect(skeleton.throttleLeading).toBe(500);
    });

    it("应该支持 throttleTrailing 属性", async () => {
      const skeleton = document.createElement("ea-skeleton");
      skeleton.setAttribute("throttle-trailing", "500");
      container.appendChild(skeleton);

      await waitForRender();

      expect(skeleton.throttleTrailing).toBe(500);
    });

    it("通过 JS 属性设置 throttleLeading 应该生效", async () => {
      const skeleton = document.createElement("ea-skeleton");
      skeleton.throttleLeading = 300;
      container.appendChild(skeleton);

      await waitForRender();

      expect(skeleton.throttleLeading).toBe(300);
    });

    it("通过 JS 属性设置 throttleTrailing 应该生效", async () => {
      const skeleton = document.createElement("ea-skeleton");
      skeleton.throttleTrailing = 300;
      container.appendChild(skeleton);

      await waitForRender();

      expect(skeleton.throttleTrailing).toBe(300);
    });

    it("throttleLeading 应该延迟 loading 从 true 到 false 的切换", async () => {
      const skeleton = document.createElement("ea-skeleton");
      skeleton.throttleLeading = 200;
      container.appendChild(skeleton);

      await waitForRender();

      const containerEl =
        skeleton.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-loading")).toBe(true);

      vi.useFakeTimers();

      skeleton.loading = false;
      await vi.advanceTimersByTimeAsync(50);

      expect(skeleton.loading).toBe(false);
      expect(containerEl.classList.contains("is-loading")).toBe(true);

      await vi.advanceTimersByTimeAsync(200);

      expect(containerEl.classList.contains("is-loading")).toBe(false);

      vi.useRealTimers();
    });

    it("throttleTrailing 应该延迟 loading 从 false 到 true 的切换", async () => {
      const skeleton = document.createElement("ea-skeleton");
      skeleton.loading = false;
      skeleton.throttleTrailing = 200;
      container.appendChild(skeleton);

      await waitForRender();

      const containerEl =
        skeleton.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-loading")).toBe(false);

      vi.useFakeTimers();

      skeleton.loading = true;
      await vi.advanceTimersByTimeAsync(50);

      expect(skeleton.loading).toBe(true);
      expect(containerEl.classList.contains("is-loading")).toBe(false);

      await vi.advanceTimersByTimeAsync(200);

      expect(containerEl.classList.contains("is-loading")).toBe(true);

      vi.useRealTimers();
    });

    it("快速切换 loading 时应该取消之前的 throttle 定时器", async () => {
      const skeleton = document.createElement("ea-skeleton");
      skeleton.throttleLeading = 200;
      skeleton.throttleTrailing = 200;
      container.appendChild(skeleton);

      await waitForRender();

      const containerEl =
        skeleton.shadowRoot.querySelector('[part="container"]');

      vi.useFakeTimers();

      skeleton.loading = false;
      await vi.advanceTimersByTimeAsync(50);

      skeleton.loading = true;
      await vi.advanceTimersByTimeAsync(250);

      expect(containerEl.classList.contains("is-loading")).toBe(true);

      vi.useRealTimers();
    });
  });

  describe("EaSkeletonItem Basic Functionality", () => {
    it("应该正确渲染 ea-skeleton-item 组件", async () => {
      const item = document.createElement("ea-skeleton-item");
      container.appendChild(item);

      await waitForRender();

      expect(item).toBeDefined();
      expect(item.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const item = document.createElement("ea-skeleton-item");
      container.appendChild(item);

      await waitForRender();

      expect(item.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("容器应该有 ea-skeleton-item 基础类名", async () => {
      const item = document.createElement("ea-skeleton-item");
      container.appendChild(item);

      await waitForRender();

      const containerEl = item.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-skeleton-item")).toBe(true);
    });
  });

  describe("EaSkeletonItem Variant Attribute", () => {
    it("默认 variant 应该是 p", async () => {
      const item = document.createElement("ea-skeleton-item");
      container.appendChild(item);

      await waitForRender();

      expect(item.variant).toBe("p");
    });

    it("应该支持 variant='text'", async () => {
      const item = document.createElement("ea-skeleton-item");
      item.variant = "text";
      container.appendChild(item);

      await waitForRender();

      expect(item.variant).toBe("text");
    });

    it("应该支持 variant='h1'", async () => {
      const item = document.createElement("ea-skeleton-item");
      item.variant = "h1";
      container.appendChild(item);

      await waitForRender();

      expect(item.variant).toBe("h1");
    });

    it("应该支持 variant='h3'", async () => {
      const item = document.createElement("ea-skeleton-item");
      item.variant = "h3";
      container.appendChild(item);

      await waitForRender();

      expect(item.variant).toBe("h3");
    });

    it("应该支持 variant='caption'", async () => {
      const item = document.createElement("ea-skeleton-item");
      item.variant = "caption";
      container.appendChild(item);

      await waitForRender();

      expect(item.variant).toBe("caption");
    });

    it("应该支持 variant='button'", async () => {
      const item = document.createElement("ea-skeleton-item");
      item.variant = "button";
      container.appendChild(item);

      await waitForRender();

      expect(item.variant).toBe("button");
    });

    it("应该支持 variant='image'", async () => {
      const item = document.createElement("ea-skeleton-item");
      item.variant = "image";
      container.appendChild(item);

      await waitForRender();

      expect(item.variant).toBe("image");
    });

    it("应该支持 variant='circle'", async () => {
      const item = document.createElement("ea-skeleton-item");
      item.variant = "circle";
      container.appendChild(item);

      await waitForRender();

      expect(item.variant).toBe("circle");
    });

    it("应该支持 variant='rect'", async () => {
      const item = document.createElement("ea-skeleton-item");
      item.variant = "rect";
      container.appendChild(item);

      await waitForRender();

      expect(item.variant).toBe("rect");
    });

    it("variant 变化时应该更新容器类名", async () => {
      const item = document.createElement("ea-skeleton-item");
      container.appendChild(item);

      await waitForRender();

      const containerEl = item.shadowRoot.querySelector('[part="container"]');

      item.variant = "h1";
      await waitForRender();

      expect(containerEl.classList.contains("ea-skeleton-item--h1")).toBe(true);

      item.variant = "button";
      await waitForRender();

      expect(containerEl.classList.contains("ea-skeleton-item--button")).toBe(
        true
      );
      expect(containerEl.classList.contains("ea-skeleton-item--h1")).toBe(
        false
      );
    });

    it("默认 variant='p' 应该有 ea-skeleton-item--p 修饰符类", async () => {
      const item = document.createElement("ea-skeleton-item");
      container.appendChild(item);

      await waitForRender();

      const containerEl = item.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-skeleton-item--p")).toBe(true);
    });

    it("image variant 应该渲染 SVG 占位图", async () => {
      const item = document.createElement("ea-skeleton-item");
      item.variant = "image";
      container.appendChild(item);

      await waitForRender();

      const containerEl = item.shadowRoot.querySelector('[part="container"]');
      const svg = containerEl.querySelector("svg");
      expect(svg).toBeTruthy();
      expect(svg.getAttribute("part")).toBe("image-svg");
    });

    it("非 image variant 不应该渲染 SVG", async () => {
      const item = document.createElement("ea-skeleton-item");
      item.variant = "p";
      container.appendChild(item);

      await waitForRender();

      const containerEl = item.shadowRoot.querySelector('[part="container"]');
      const svg = containerEl.querySelector("svg");
      expect(svg).toBeNull();
    });

    it("从其他 variant 切换到 image 应该渲染 SVG", async () => {
      const item = document.createElement("ea-skeleton-item");
      item.variant = "p";
      container.appendChild(item);

      await waitForRender();

      let containerEl = item.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.querySelector("svg")).toBeNull();

      item.variant = "image";
      await waitForRender();

      containerEl = item.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.querySelector("svg")).toBeTruthy();
    });

    it("从 image 切换到其他 variant 应该移除 SVG", async () => {
      const item = document.createElement("ea-skeleton-item");
      item.variant = "image";
      container.appendChild(item);

      await waitForRender();

      let containerEl = item.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.querySelector("svg")).toBeTruthy();

      item.variant = "p";
      await waitForRender();

      containerEl = item.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.querySelector("svg")).toBeNull();
    });

    it("通过 HTML 属性设置 variant 应该生效", async () => {
      const item = document.createElement("ea-skeleton-item");
      item.setAttribute("variant", "circle");
      container.appendChild(item);

      await waitForRender();

      expect(item.variant).toBe("circle");
    });

    it("应该支持所有 variant 类型的遍历测试", async () => {
      const variants = [
        "p",
        "text",
        "h1",
        "h3",
        "caption",
        "button",
        "image",
        "circle",
        "rect",
      ];

      for (const variant of variants) {
        const item = document.createElement("ea-skeleton-item");
        item.variant = variant;
        container.appendChild(item);

        await waitForRender();

        expect(item.variant).toBe(variant);
        const containerEl = item.shadowRoot.querySelector('[part="container"]');
        expect(
          containerEl.classList.contains(`ea-skeleton-item--${variant}`)
        ).toBe(true);

        container.removeChild(item);
      }
    });
  });

  describe("EaSkeletonItem Animated Attribute", () => {
    it("默认 animated 应该是 false", async () => {
      const item = document.createElement("ea-skeleton-item");
      container.appendChild(item);

      await waitForRender();

      expect(item.animated).toBe(false);
    });

    it("设置 animated 属性应该启用动画", async () => {
      const item = document.createElement("ea-skeleton-item");
      item.animated = true;
      container.appendChild(item);

      await waitForRender();

      expect(item.animated).toBe(true);
    });

    it("通过 HTML 属性设置 animated 应该生效", async () => {
      const item = document.createElement("ea-skeleton-item");
      item.setAttribute("animated", "");
      container.appendChild(item);

      await waitForRender();

      expect(item.animated).toBe(true);
    });

    it("animated 为 true 时容器应该有 is-animated 状态类", async () => {
      const item = document.createElement("ea-skeleton-item");
      item.animated = true;
      container.appendChild(item);

      await waitForRender();

      const containerEl = item.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-animated")).toBe(true);
    });

    it("animated 为 false 时容器不应该有 is-animated 状态类", async () => {
      const item = document.createElement("ea-skeleton-item");
      container.appendChild(item);

      await waitForRender();

      const containerEl = item.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-animated")).toBe(false);
    });

    it("动态切换 animated 应该更新容器类名", async () => {
      const item = document.createElement("ea-skeleton-item");
      container.appendChild(item);

      await waitForRender();

      const containerEl = item.shadowRoot.querySelector('[part="container"]');

      item.animated = true;
      await waitForRender();

      expect(containerEl.classList.contains("is-animated")).toBe(true);

      item.animated = false;
      await waitForRender();

      expect(containerEl.classList.contains("is-animated")).toBe(false);
    });
  });

  describe("EaSkeletonItem BEM 类名", () => {
    it("默认状态应该有 ea-skeleton-item ea-skeleton-item--p 类名", async () => {
      const item = document.createElement("ea-skeleton-item");
      container.appendChild(item);

      await waitForRender();

      const containerEl = item.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.className).toBe(
        "ea-skeleton-item ea-skeleton-item--p"
      );
    });

    it("animated 状态应该有 is-animated 状态类", async () => {
      const item = document.createElement("ea-skeleton-item");
      item.animated = true;
      container.appendChild(item);

      await waitForRender();

      const containerEl = item.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.className).toBe(
        "ea-skeleton-item ea-skeleton-item--p is-animated"
      );
    });

    it("variant + animated 组合应该生成正确的类名", async () => {
      const item = document.createElement("ea-skeleton-item");
      item.variant = "circle";
      item.animated = true;
      container.appendChild(item);

      await waitForRender();

      const containerEl = item.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.className).toBe(
        "ea-skeleton-item ea-skeleton-item--circle is-animated"
      );
    });
  });

  describe("Combined Layout", () => {
    it("应该支持基本的 skeleton + skeleton-item 布局", async () => {
      const skeleton = document.createElement("ea-skeleton");
      const item = document.createElement("ea-skeleton-item");
      item.setAttribute("slot", "template");
      skeleton.appendChild(item);
      container.appendChild(skeleton);

      await waitForRender();

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

      await waitForRender();

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

      await waitForRender();

      expect(skeleton.querySelectorAll("ea-skeleton-item").length).toBe(2);
    });

    it("loading 为 true 时应该显示模板内容", async () => {
      const skeleton = document.createElement("ea-skeleton");
      skeleton.loading = true;
      skeleton.innerHTML = `
        <div slot="template">
          <ea-skeleton-item variant="p"></ea-skeleton-item>
        </div>
        <div>Real Content</div>
      `;
      container.appendChild(skeleton);

      await waitForRender();

      const containerEl =
        skeleton.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-loading")).toBe(true);
    });

    it("loading 为 false 时应该显示真实内容", async () => {
      const skeleton = document.createElement("ea-skeleton");
      skeleton.loading = false;
      skeleton.innerHTML = `
        <div slot="template">
          <ea-skeleton-item variant="p"></ea-skeleton-item>
        </div>
        <div>Real Content</div>
      `;
      container.appendChild(skeleton);

      await waitForRender();

      expect(skeleton.textContent).toContain("Real Content");
      const containerEl =
        skeleton.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-loading")).toBe(false);
    });

    it("应该支持不同 variant 的 skeleton-item 组合", async () => {
      const skeleton = document.createElement("ea-skeleton");
      skeleton.innerHTML = `
        <div slot="template">
          <ea-skeleton-item variant="circle" style="width: 60px; height: 60px"></ea-skeleton-item>
          <ea-skeleton-item variant="h3" style="width: 30%"></ea-skeleton-item>
          <ea-skeleton-item variant="p"></ea-skeleton-item>
          <ea-skeleton-item variant="p"></ea-skeleton-item>
          <ea-skeleton-item variant="button"></ea-skeleton-item>
        </div>
      `;
      container.appendChild(skeleton);

      await waitForRender();

      const items = skeleton.querySelectorAll("ea-skeleton-item");
      expect(items.length).toBe(5);
      expect(items[0].variant).toBe("circle");
      expect(items[1].variant).toBe("h3");
      expect(items[4].variant).toBe("button");
    });

    it("skeleton 的 animated 应该传递给所有子 skeleton-item", async () => {
      const skeleton = document.createElement("ea-skeleton");
      skeleton.animated = true;
      skeleton.innerHTML = `
        <div slot="template">
          <ea-skeleton-item variant="p"></ea-skeleton-item>
          <ea-skeleton-item variant="h1"></ea-skeleton-item>
        </div>
      `;
      container.appendChild(skeleton);

      await waitForRender();

      const items = skeleton.querySelectorAll("ea-skeleton-item");
      items.forEach(item => {
        expect(item.animated).toBe(true);
      });
    });
  });

  describe("Edge Cases", () => {
    it("空 skeleton 应该正常渲染", async () => {
      const skeleton = document.createElement("ea-skeleton");
      container.appendChild(skeleton);

      await waitForRender();

      expect(
        skeleton.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
    });

    it("rows=0 应该正确处理", async () => {
      const skeleton = document.createElement("ea-skeleton");
      skeleton.rows = 0;
      container.appendChild(skeleton);

      await waitForRender();

      expect(skeleton.rows).toBe(0);
    });

    it("count=0 应该正确处理", async () => {
      const skeleton = document.createElement("ea-skeleton");
      skeleton.count = 0;
      container.appendChild(skeleton);

      await waitForRender();

      expect(skeleton.count).toBe(0);
    });

    it("多次快速切换 loading 不应该出错", async () => {
      const skeleton = document.createElement("ea-skeleton");
      container.appendChild(skeleton);

      await waitForRender();

      skeleton.loading = false;
      skeleton.loading = true;
      skeleton.loading = false;
      skeleton.loading = true;

      await waitForRender();

      expect(skeleton.loading).toBe(true);
    });

    it("skeleton-item 不设置任何属性应该使用默认值", async () => {
      const item = document.createElement("ea-skeleton-item");
      container.appendChild(item);

      await waitForRender();

      expect(item.variant).toBe("p");
      expect(item.animated).toBe(false);
    });

    it("image variant 切换回其他 variant 后再切回 image 应该正常渲染 SVG", async () => {
      const item = document.createElement("ea-skeleton-item");
      container.appendChild(item);

      await waitForRender();

      item.variant = "image";
      await waitForRender();

      let containerEl = item.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.querySelector("svg")).toBeTruthy();

      item.variant = "rect";
      await waitForRender();

      containerEl = item.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.querySelector("svg")).toBeNull();

      item.variant = "image";
      await waitForRender();

      containerEl = item.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.querySelector("svg")).toBeTruthy();
    });
  });

  describe("Lifecycle", () => {
    it("skeleton 组件连接后应该正确初始化", async () => {
      const skeleton = document.createElement("ea-skeleton");
      skeleton.rows = 3;
      container.appendChild(skeleton);

      await waitForRender();

      expect(
        skeleton.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
      expect(skeleton.rows).toBe(3);
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

      await waitForRender();

      skeleton.loading = false;

      await waitForRender();

      expect(skeleton.loading).toBe(false);
    });

    it("动态修改 animated 应该生效", async () => {
      const skeleton = document.createElement("ea-skeleton");
      container.appendChild(skeleton);

      await waitForRender();

      skeleton.animated = true;

      await waitForRender();

      expect(skeleton.animated).toBe(true);
    });

    it("动态修改 rows 应该生效", async () => {
      const skeleton = document.createElement("ea-skeleton");
      skeleton.rows = 2;
      container.appendChild(skeleton);

      await waitForRender();

      skeleton.rows = 6;

      await waitForRender();

      expect(skeleton.rows).toBe(6);
    });

    it("动态修改 count 应该生效", async () => {
      const skeleton = document.createElement("ea-skeleton");
      skeleton.count = 1;
      container.appendChild(skeleton);

      await waitForRender();

      skeleton.count = 5;

      await waitForRender();

      expect(skeleton.count).toBe(5);
    });

    it("动态修改 variant 应该生效", async () => {
      const item = document.createElement("ea-skeleton-item");
      item.variant = "p";
      container.appendChild(item);

      await waitForRender();

      item.variant = "h1";

      await waitForRender();

      expect(item.variant).toBe("h1");
    });

    it("skeleton-item 组件断开连接后应该正常移除", () => {
      const item = document.createElement("ea-skeleton-item");
      container.appendChild(item);

      item.remove();

      expect(container.contains(item)).toBe(false);
    });

    it("skeleton 重新连接到 DOM 应该正常工作", async () => {
      const skeleton = document.createElement("ea-skeleton");
      skeleton.rows = 3;
      container.appendChild(skeleton);

      await waitForRender();

      skeleton.remove();
      container.appendChild(skeleton);

      await waitForRender();

      expect(
        skeleton.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
    });
  });

  describe("updateContainerClasslist Method", () => {
    it("EaSkeleton updateContainerClasslist 应该返回正确的类名", async () => {
      const skeleton = document.createElement("ea-skeleton");
      container.appendChild(skeleton);

      await waitForRender();

      const result = skeleton.updateContainerClasslist();
      expect(result).toContain("ea-skeleton");
      expect(result).toContain("is-loading");
    });

    it("EaSkeleton loading=false 时 updateContainerClasslist 不应该包含 is-loading", async () => {
      const skeleton = document.createElement("ea-skeleton");
      skeleton.loading = false;
      container.appendChild(skeleton);

      await waitForRender();

      const result = skeleton.updateContainerClasslist();
      expect(result).toBe("ea-skeleton");
    });

    it("EaSkeletonItem updateContainerClasslist 应该返回正确的类名", async () => {
      const item = document.createElement("ea-skeleton-item");
      container.appendChild(item);

      await waitForRender();

      const result = item.updateContainerClasslist();
      expect(result).toContain("ea-skeleton-item");
      expect(result).toContain("ea-skeleton-item--p");
    });

    it("EaSkeletonItem animated=true 时 updateContainerClasslist 应该包含 is-animated", async () => {
      const item = document.createElement("ea-skeleton-item");
      item.animated = true;
      container.appendChild(item);

      await waitForRender();

      const result = item.updateContainerClasslist();
      expect(result).toContain("is-animated");
    });
  });
});
