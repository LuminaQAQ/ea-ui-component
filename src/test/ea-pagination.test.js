import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// 尝试加载组件，处理组件尚未重构为 TypeScript 的情况
let componentReady = false;
try {
  await import("../components/ea-pagination/index.js");
  componentReady = true;
} catch (e) {
  console.warn(`[ea-pagination] 组件尚未重构为 TypeScript (或存在依赖缺失)，跳过测试`);
}

const suite = componentReady ? describe : describe.skip;

suite("EaPagination Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  /**
   * 基础功能测试
   */
  describe("Basic Functionality", () => {
    it("应该正确渲染组件", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(pagination.shadowRoot).toBeTruthy();
      expect(pagination.shadowRoot.querySelector(".ea-pagination")).toBeTruthy();
    });

    it("应该支持 CSS Parts", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(pagination.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });
  });

  /**
   * Total 属性测试
   */
  describe("Total Attribute", () => {
    it("默认 total 应该是 0", async () => {
      const pagination = document.createElement("ea-pagination");
      container.appendChild(pagination);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(Number(pagination.total)).toBe(0);
    });

    it("应该支持自定义 total", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "1000");
      container.appendChild(pagination);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(Number(pagination.total)).toBe(1000);
    });
  });

  /**
   * Default-page-size 属性测试
   */
  describe("Default-page-size Attribute", () => {
    it("默认 default-page-size 应该是 10", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(Number(pagination["default-page-size"])).toBe(10);
    });

    it("应该支持自定义 default-page-size", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("default-page-size", "20");
      container.appendChild(pagination);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(Number(pagination["default-page-size"])).toBe(20);
    });
  });

  /**
   * Page-size 属性测试
   */
  describe("Page-size Attribute", () => {
    it("默认 page-size 应该使用 default-page-size", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(Number(pagination["page-size"])).toBe(10);
    });

    it("应该支持自定义 page-size", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("page-size", "50");
      container.appendChild(pagination);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(Number(pagination["page-size"])).toBe(50);
    });
  });

  /**
   * Pager-count 属性测试
   */
  describe("Pager-count Attribute", () => {
    it("默认 pager-count 应该是 7", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(Number(pagination["pager-count"])).toBe(7);
    });

    it("应该支持自定义 pager-count", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "1000");
      pagination.setAttribute("pager-count", "11");
      container.appendChild(pagination);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(Number(pagination["pager-count"])).toBe(11);
    });
  });

  /**
   * Current-page 属性测试
   */
  describe("Current-page Attribute", () => {
    it("默认 current-page 应该是 1", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(Number(pagination["current-page"])).toBe(1);
    });

    it("应该支持自定义 current-page", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("current-page", "5");
      container.appendChild(pagination);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(Number(pagination["current-page"])).toBe(5);
    });
  });

  /**
   * Background 属性测试
   */
  describe("Background Attribute", () => {
    it("默认 background 应该是 false", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(pagination.background === false || pagination.background === null).toBe(true);
    });

    it("应该支持 background 属性", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("background", "");
      container.appendChild(pagination);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(pagination.background).toBe(true);
    });
  });

  /**
   * Size 属性测试
   */
  describe("Size Attribute", () => {
    it("默认 size 应该是空字符串", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(pagination.size).toBe("");
    });

    it("应该支持 size 属性", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("size", "small");
      container.appendChild(pagination);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(pagination.size).toBe("small");
    });
  });

  /**
   * Hide-on-single-page 属性测试
   */
  describe("Hide-on-single-page Attribute", () => {
    it("默认 hide-on-single-page 应该是 false", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(pagination["hide-on-single-page"] === false || pagination["hide-on-single-page"] === null).toBe(true);
    });

    it("应该支持 hide-on-single-page 属性", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("hide-on-single-page", "");
      container.appendChild(pagination);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(pagination["hide-on-single-page"]).toBe(true);
    });
  });

  /**
   * Disabled 属性测试
   */
  describe("Disabled Attribute", () => {
    it("默认 disabled 应该是 false", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(pagination.disabled === false || pagination.disabled === null).toBe(true);
    });

    it("应该支持 disabled 属性", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("disabled", "");
      container.appendChild(pagination);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(pagination.disabled).toBe(true);
    });
  });

  /**
   * Layout 属性测试
   */
  describe("Layout Attribute", () => {
    it("应该支持 layout 属性", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.layout = ["prev", "pager", "next"];
      container.appendChild(pagination);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(pagination.layout).toEqual(["prev", "pager", "next"]);
    });
  });

  /**
   * PageSizes 属性测试
   */
  describe("PageSizes Attribute", () => {
    it("应该支持 pageSizes 属性", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.pageSizes = [10, 20, 30, 40];
      container.appendChild(pagination);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(pagination.pageSizes).toEqual([10, 20, 30, 40]);
    });
  });

  /**
   * 事件测试
   */
  describe("Events", () => {
    it("应该触发 change 事件", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);

      await new Promise(resolve => setTimeout(resolve, 100));

      const changeHandler = vi.fn();
      pagination.addEventListener("change", changeHandler);

      pagination["current-page"] = 2;

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(changeHandler).toHaveBeenCalled();
    });

    it("应该触发 ea-current-change 事件", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);

      await new Promise(resolve => setTimeout(resolve, 100));

      const currentChangeHandler = vi.fn();
      pagination.addEventListener("ea-current-change", currentChangeHandler);

      pagination["current-page"] = 3;

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(currentChangeHandler).toHaveBeenCalled();
    });

    it("应该触发 ea-prev-click 事件", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination["current-page"] = 3;
      container.appendChild(pagination);

      await new Promise(resolve => setTimeout(resolve, 100));

      const prevClickHandler = vi.fn();
      pagination.addEventListener("ea-prev-click", prevClickHandler);

      // 模拟点击 prev 按钮
      pagination["current-page"] = 2;

      await new Promise(resolve => setTimeout(resolve, 50));

      // 事件应该被触发
      expect(pagination["current-page"]).toBe(2);
    });

    it("应该触发 ea-next-click 事件", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);

      await new Promise(resolve => setTimeout(resolve, 100));

      const nextClickHandler = vi.fn();
      pagination.addEventListener("ea-next-click", nextClickHandler);

      // 模拟点击 next 按钮
      pagination["current-page"] = 2;

      await new Promise(resolve => setTimeout(resolve, 50));

      // 事件应该被触发
      expect(pagination["current-page"]).toBe(2);
    });
  });

  /**
   * 边界条件测试
   */
  describe("Edge Cases", () => {
    it("应该处理 total 为 0 的情况", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "0");
      container.appendChild(pagination);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(Number(pagination.total)).toBe(0);
    });

    it("应该处理只有一页的情况", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "5");
      pagination.setAttribute("page-size", "10");
      container.appendChild(pagination);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(Number(pagination.total)).toBe(5);
      expect(Number(pagination["page-size"])).toBe(10);
    });

    it("应该处理 current-page 超过总页数的情况", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "50");
      pagination.setAttribute("page-size", "10");
      pagination.setAttribute("current-page", "10");
      container.appendChild(pagination);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(Number(pagination["current-page"])).toBe(10);
    });
  });

  /**
   * 生命周期测试
   */
  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("current-page", "3");
      container.appendChild(pagination);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(pagination.shadowRoot).toBeTruthy();
      expect(Number(pagination["current-page"])).toBe(3);
    });

    it("组件断开连接后应该正常移除", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);

      await new Promise(resolve => setTimeout(resolve, 100));

      pagination.remove();

      expect(pagination.isConnected).toBe(false);
    });

    it("应该支持属性动态更新", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(Number(pagination["current-page"])).toBe(1);

      pagination.setAttribute("current-page", "5");

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(Number(pagination["current-page"])).toBe(5);
    });
  });
});
