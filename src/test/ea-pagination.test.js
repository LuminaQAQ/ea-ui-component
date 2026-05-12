import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender.js";

import "../components/ea-pagination/index.ts";

describe("EaPagination Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  // ==================== 基本渲染 ====================

  describe("Basic Rendering", () => {
    it("应该正确渲染 ea-pagination 组件", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      expect(pagination).toBeDefined();
      expect(pagination.shadowRoot).toBeTruthy();
    });

    it("应该包含 .ea-pagination 容器元素", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      const containerEl = pagination.shadowRoot.querySelector(".ea-pagination");
      expect(containerEl).toBeTruthy();
    });

    it("容器应该有 part=container", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      expect(
        pagination.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
    });

    it("默认 layout 应该包含 prev, pager, next, jumper, ->, total", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      expect(pagination.layout).toEqual([
        "prev",
        "pager",
        "next",
        "jumper",
        "->",
        "total",
      ]);
    });

    it("默认 layout 应该渲染 prev icon", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      expect(
        pagination.shadowRoot.querySelector(".ea-pagination__icon.prev-icon")
      ).toBeTruthy();
    });

    it("默认 layout 应该渲染 next icon", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      expect(
        pagination.shadowRoot.querySelector(".ea-pagination__icon.next-icon")
      ).toBeTruthy();
    });

    it("默认 layout 应该渲染 pager 区域", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      expect(
        pagination.shadowRoot.querySelector(".ea-pagination__pager")
      ).toBeTruthy();
    });

    it("默认 layout 应该渲染 total 区域", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      expect(
        pagination.shadowRoot.querySelector(".ea-pagination__total")
      ).toBeTruthy();
    });

    it("默认 layout 应该渲染 jumper 区域", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      expect(
        pagination.shadowRoot.querySelector(".ea-pagination__jumper")
      ).toBeTruthy();
    });
  });

  // ==================== CSS Parts ====================

  describe("CSS Parts", () => {
    it("应该支持 container part", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      expect(
        pagination.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
    });

    it("应该支持 pager part", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      expect(
        pagination.shadowRoot.querySelector('[part="pager"]')
      ).toBeTruthy();
    });

    it("应该支持 icon 和 prev-icon part", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      expect(
        pagination.shadowRoot.querySelector('[part="icon prev-icon"]')
      ).toBeTruthy();
    });

    it("应该支持 icon 和 next-icon part", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      expect(
        pagination.shadowRoot.querySelector('[part="icon next-icon"]')
      ).toBeTruthy();
    });

    it("应该支持 total part", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      expect(
        pagination.shadowRoot.querySelector('[part="total"]')
      ).toBeTruthy();
    });

    it("应该支持 page part", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      expect(pagination.shadowRoot.querySelector('[part="page"]')).toBeTruthy();
    });

    it("应该支持 jumper-wrap part", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      expect(
        pagination.shadowRoot.querySelector('[part="jumper-wrap"]')
      ).toBeTruthy();
    });

    it("应该支持 jumper part", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      expect(
        pagination.shadowRoot.querySelector('[part="jumper"]')
      ).toBeTruthy();
    });

    it("应该支持 separator part", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      expect(
        pagination.shadowRoot.querySelector('[part="separator"]')
      ).toBeTruthy();
    });
  });

  // ==================== Total 属性 ====================

  describe("Total Attribute", () => {
    it("默认 total 应该是 0", async () => {
      const pagination = document.createElement("ea-pagination");
      container.appendChild(pagination);
      await waitForRender();

      expect(pagination.total).toBe(0);
    });

    it("应该支持自定义 total", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "1000");
      container.appendChild(pagination);
      await waitForRender();

      expect(pagination.total).toBe(1000);
    });

    it("total 变化时应该更新 total 文本", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      let totalEl = pagination.shadowRoot.querySelector(
        ".ea-pagination__total"
      );
      expect(totalEl.textContent).toBe("Total 100");

      pagination.setAttribute("total", "200");
      await waitForRender();

      totalEl = pagination.shadowRoot.querySelector(".ea-pagination__total");
      expect(totalEl.textContent).toBe("Total 200");
    });

    it("total 为 0 时应该正常渲染", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "0");
      container.appendChild(pagination);
      await waitForRender();

      expect(pagination.total).toBe(0);
      const totalEl = pagination.shadowRoot.querySelector(
        ".ea-pagination__total"
      );
      expect(totalEl.textContent).toBe("Total 0");
    });
  });

  // ==================== DefaultPageSize 属性 ====================

  describe("DefaultPageSize Attribute", () => {
    it("默认 defaultPageSize 应该是 10", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      expect(pagination.defaultPageSize).toBe(10);
    });

    it("应该支持自定义 defaultPageSize", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("default-page-size", "20");
      container.appendChild(pagination);
      await waitForRender();

      expect(pagination.defaultPageSize).toBe(20);
    });

    it("defaultPageSize 变化时应该影响 pageSize 默认值", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("default-page-size", "25");
      container.appendChild(pagination);
      await waitForRender();

      expect(pagination.pageSize).toBe(25);
    });

    it("defaultPageSize 动态变化时应该触发重新渲染", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      expect(pagination.defaultPageSize).toBe(10);

      pagination.setAttribute("default-page-size", "50");
      await waitForRender();

      expect(pagination.defaultPageSize).toBe(50);
    });
  });

  // ==================== PageSize 属性 ====================

  describe("PageSize Attribute", () => {
    it("默认 pageSize 应该使用 defaultPageSize", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      expect(pagination.pageSize).toBe(10);
    });

    it("应该支持自定义 pageSize", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("page-size", "50");
      container.appendChild(pagination);
      await waitForRender();

      expect(pagination.pageSize).toBe(50);
    });

    it("pageSize 变化时应该触发 ea-size-change 事件", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      const sizeChangeHandler = vi.fn();
      pagination.addEventListener("ea-size-change", sizeChangeHandler);

      pagination.pageSize = 20;
      await waitForRender();

      expect(sizeChangeHandler).toHaveBeenCalled();
      expect(sizeChangeHandler.mock.calls[0][0].detail.pageSize).toBe(20);
    });

    it("pageSize 变化时应该触发重新渲染分页", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      const initialPageCount = pagination.shadowRoot.querySelectorAll(
        ".ea-pagination__page"
      ).length;

      pagination.pageSize = 50;
      await waitForRender();

      const newPageCount = pagination.shadowRoot.querySelectorAll(
        ".ea-pagination__page"
      ).length;

      expect(newPageCount).toBeLessThanOrEqual(initialPageCount + 2);
    });
  });

  // ==================== PagerCount 属性 ====================

  describe("PagerCount Attribute", () => {
    it("默认 pagerCount 应该是 7", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      expect(pagination.pagerCount).toBe(7);
    });

    it("应该支持自定义 pagerCount", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "1000");
      pagination.setAttribute("pager-count", "11");
      container.appendChild(pagination);
      await waitForRender();

      expect(pagination.pagerCount).toBe(11);
    });

    it("pagerCount 较小时应该显示省略号", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "1000");
      pagination.setAttribute("pager-count", "5");
      container.appendChild(pagination);
      await waitForRender();

      const moreItems = pagination.shadowRoot.querySelectorAll(
        ".ea-pagination__more"
      );
      expect(moreItems.length).toBeGreaterThan(0);
    });
  });

  // ==================== CurrentPage 属性 ====================

  describe("CurrentPage Attribute", () => {
    it("默认 currentPage 应该是 1", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      expect(pagination.currentPage).toBe(1);
    });

    it("应该支持自定义 currentPage", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("current-page", "5");
      container.appendChild(pagination);
      await waitForRender();

      expect(pagination.currentPage).toBe(5);
    });

    it("currentPage 变化时应该触发 change 事件", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      const changeHandler = vi.fn();
      pagination.addEventListener("change", changeHandler);

      pagination.currentPage = 2;
      await waitForRender();

      expect(changeHandler).toHaveBeenCalled();
      expect(changeHandler.mock.calls[0][0].detail.currentPage).toBe(2);
      expect(changeHandler.mock.calls[0][0].detail.pageSize).toBe(10);
    });

    it("currentPage 变化时应该触发 ea-current-change 事件", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      const handler = vi.fn();
      pagination.addEventListener("ea-current-change", handler);

      pagination.currentPage = 3;
      await waitForRender();

      expect(handler).toHaveBeenCalled();
      expect(handler.mock.calls[0][0].detail.value).toBe(3);
    });

    it("currentPage 变化时应该更新活跃页码样式", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      pagination.currentPage = 3;
      await waitForRender();

      const activePage = pagination.shadowRoot.querySelector(
        '.ea-pagination__page.is-active[data-page="3"]'
      );
      expect(activePage).toBeTruthy();
    });

    it("currentPage 动态更新应该正确反映", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      expect(pagination.currentPage).toBe(1);

      pagination.setAttribute("current-page", "5");
      await waitForRender();

      expect(pagination.currentPage).toBe(5);
    });
  });

  // ==================== Background 属性 ====================

  describe("Background Attribute", () => {
    it("默认 background 应该是 false", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      expect(pagination.background).toBe(false);
    });

    it("应该支持 background 属性", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("background", "");
      container.appendChild(pagination);
      await waitForRender();

      expect(pagination.background).toBe(true);
    });

    it("background 为 true 时应该添加 background 修饰符 class", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("background", "");
      container.appendChild(pagination);
      await waitForRender();

      const containerEl = pagination.shadowRoot.querySelector(".ea-pagination");
      expect(containerEl.classList.contains("ea-pagination--background")).toBe(
        true
      );
    });

    it("background 为 false 时不应有 background 修饰符 class", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      const containerEl = pagination.shadowRoot.querySelector(".ea-pagination");
      expect(containerEl.classList.contains("ea-pagination--background")).toBe(
        false
      );
    });

    it("background 动态切换应该正确更新 class", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      const containerEl = pagination.shadowRoot.querySelector(".ea-pagination");
      expect(containerEl.classList.contains("ea-pagination--background")).toBe(
        false
      );

      pagination.setAttribute("background", "");
      await waitForRender();

      expect(containerEl.classList.contains("ea-pagination--background")).toBe(
        true
      );

      pagination.removeAttribute("background");
      await waitForRender();

      expect(containerEl.classList.contains("ea-pagination--background")).toBe(
        false
      );
    });
  });

  // ==================== Size 属性 ====================

  describe("Size Attribute", () => {
    it("默认 size 应该是空字符串", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      expect(pagination.size).toBe("");
    });

    it("应该支持 size='small'", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("size", "small");
      container.appendChild(pagination);
      await waitForRender();

      expect(pagination.size).toBe("small");
    });

    it("应该支持 size='default'", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("size", "default");
      container.appendChild(pagination);
      await waitForRender();

      expect(pagination.size).toBe("default");
    });

    it("应该支持 size='large'", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("size", "large");
      container.appendChild(pagination);
      await waitForRender();

      expect(pagination.size).toBe("large");
    });

    it("size 变化时应该添加对应修饰符 class", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("size", "small");
      container.appendChild(pagination);
      await waitForRender();

      const containerEl = pagination.shadowRoot.querySelector(".ea-pagination");
      expect(containerEl.classList.contains("ea-pagination--size-small")).toBe(
        true
      );
    });

    it("size 为空时不应有 size 修饰符 class", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      const containerEl = pagination.shadowRoot.querySelector(".ea-pagination");
      expect(containerEl.classList.contains("ea-pagination--size-small")).toBe(
        false
      );
      expect(containerEl.classList.contains("ea-pagination--size-large")).toBe(
        false
      );
    });

    it("size 动态切换应该正确更新 class", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("size", "small");
      container.appendChild(pagination);
      await waitForRender();

      const containerEl = pagination.shadowRoot.querySelector(".ea-pagination");
      expect(containerEl.classList.contains("ea-pagination--size-small")).toBe(
        true
      );

      pagination.setAttribute("size", "large");
      await waitForRender();

      expect(containerEl.classList.contains("ea-pagination--size-small")).toBe(
        false
      );
      expect(containerEl.classList.contains("ea-pagination--size-large")).toBe(
        true
      );
    });
  });

  // ==================== HideOnSinglePage 属性 ====================

  describe("HideOnSinglePage Attribute", () => {
    it("默认 hideOnSinglePage 应该是 false", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      expect(pagination.hideOnSinglePage).toBe(false);
    });

    it("应该支持 hide-on-single-page 属性", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("hide-on-single-page", "");
      container.appendChild(pagination);
      await waitForRender();

      expect(pagination.hideOnSinglePage).toBe(true);
    });

    it("hideOnSinglePage 为 true 且只有一页时应该隐藏分页", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "5");
      pagination.setAttribute("hide-on-single-page", "");
      container.appendChild(pagination);
      await waitForRender();

      const containerEl = pagination.shadowRoot.querySelector(".ea-pagination");
      expect(containerEl.classList.contains("is-hide")).toBe(true);
    });

    it("hideOnSinglePage 为 true 但多页时不应隐藏", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("hide-on-single-page", "");
      container.appendChild(pagination);
      await waitForRender();

      const containerEl = pagination.shadowRoot.querySelector(".ea-pagination");
      expect(containerEl.classList.contains("is-hide")).toBe(false);
    });
  });

  // ==================== Disabled 属性 ====================

  describe("Disabled Attribute", () => {
    it("默认 disabled 应该是 false", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      expect(pagination.disabled).toBe(false);
    });

    it("应该支持 disabled 属性", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("disabled", "");
      container.appendChild(pagination);
      await waitForRender();

      expect(pagination.disabled).toBe(true);
    });

    it("disabled 时容器应有 is-disabled 样式类", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("disabled", "");
      container.appendChild(pagination);
      await waitForRender();

      const containerEl = pagination.shadowRoot.querySelector(".ea-pagination");
      expect(containerEl.classList.contains("is-disabled")).toBe(true);
    });

    it("disabled 时 jumper 输入框应该被禁用（需在挂载后设置）", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      pagination.setAttribute("disabled", "");
      await waitForRender();

      const jumperInput =
        pagination.shadowRoot.querySelector('[part="jumper"]');
      expect(jumperInput.disabled).toBe(true);
    });
  });

  // ==================== PageSizes 属性 ====================

  describe("PageSizes Property", () => {
    it("默认 pageSizes 应该是 [10, 20, 30, 40, 50, 100]", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      expect(pagination.pageSizes).toEqual([10, 20, 30, 40, 50, 100]);
    });

    it("应该支持自定义 pageSizes", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.pageSizes = [5, 15, 25];
      container.appendChild(pagination);
      await waitForRender();

      expect(pagination.pageSizes).toEqual([5, 15, 25]);
    });

    it("pageSizes 变化时应该更新 sizes 下拉框", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.layout = ["sizes", "prev", "pager", "next"];
      container.appendChild(pagination);
      await waitForRender();

      pagination.pageSizes = [5, 15, 25];
      await waitForRender();

      const sizes = pagination.shadowRoot.querySelector('[part="sizes"]');
      expect(sizes).toBeTruthy();
    });
  });

  // ==================== Layout 属性 ====================

  describe("Layout Property", () => {
    it("应该支持自定义 layout", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.layout = ["prev", "pager", "next"];
      container.appendChild(pagination);
      await waitForRender();

      expect(pagination.layout).toEqual(["prev", "pager", "next"]);
    });

    it("layout 包含 sizes 时应该渲染 sizes 下拉框", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.layout = ["sizes", "prev", "pager", "next"];
      container.appendChild(pagination);
      await waitForRender();

      const sizes = pagination.shadowRoot.querySelector('[part="sizes"]');
      expect(sizes).toBeTruthy();
    });

    it("layout 不包含 sizes 时不应渲染 sizes 下拉框", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.layout = ["prev", "pager", "next"];
      container.appendChild(pagination);
      await waitForRender();

      const sizes = pagination.shadowRoot.querySelector('[part="sizes"]');
      expect(sizes).toBeFalsy();
    });

    it("layout 不包含 total 时不应渲染 total 区域", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.layout = ["prev", "pager", "next"];
      container.appendChild(pagination);
      await waitForRender();

      const total = pagination.shadowRoot.querySelector('[part="total"]');
      expect(total).toBeFalsy();
    });

    it("layout 不包含 jumper 时不应渲染 jumper 区域", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.layout = ["prev", "pager", "next"];
      container.appendChild(pagination);
      await waitForRender();

      const jumperWrap = pagination.shadowRoot.querySelector(
        '[part="jumper-wrap"]'
      );
      expect(jumperWrap).toBeFalsy();
    });

    it("layout 包含 -> 时应该渲染 separator", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.layout = ["prev", "pager", "next", "->", "total"];
      container.appendChild(pagination);
      await waitForRender();

      const separator =
        pagination.shadowRoot.querySelector('[part="separator"]');
      expect(separator).toBeTruthy();
    });
  });

  // ==================== 交互测试 ====================

  describe("Prev/Next Click Interaction", () => {
    it("点击 prev 按钮应该切换到上一页", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("current-page", "3");
      container.appendChild(pagination);
      await waitForRender();

      const prevIcon = pagination.shadowRoot.querySelector(
        ".ea-pagination__icon.prev-icon"
      );
      prevIcon.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await waitForRender();

      expect(pagination.currentPage).toBe(2);
    });

    it("点击 next 按钮应该切换到下一页", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      const nextIcon = pagination.shadowRoot.querySelector(
        ".ea-pagination__icon.next-icon"
      );
      nextIcon.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await waitForRender();

      expect(pagination.currentPage).toBe(2);
    });

    it("点击 prev 按钮应该触发 ea-prev-click 事件", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("current-page", "3");
      container.appendChild(pagination);
      await waitForRender();

      const handler = vi.fn();
      pagination.addEventListener("ea-prev-click", handler);

      const prevIcon = pagination.shadowRoot.querySelector(
        ".ea-pagination__icon.prev-icon"
      );
      prevIcon.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await waitForRender();

      expect(handler).toHaveBeenCalled();
    });

    it("点击 next 按钮应该触发 ea-next-click 事件", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      const handler = vi.fn();
      pagination.addEventListener("ea-next-click", handler);

      const nextIcon = pagination.shadowRoot.querySelector(
        ".ea-pagination__icon.next-icon"
      );
      nextIcon.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await waitForRender();

      expect(handler).toHaveBeenCalled();
    });

    it("第一页时 prev 按钮应该被禁用", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      const prevIcon = pagination.shadowRoot.querySelector(
        ".ea-pagination__icon.prev-icon"
      );
      expect(prevIcon.classList.contains("is-disabled")).toBe(true);
    });

    it("最后一页时 next 按钮应该被禁用", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("current-page", "10");
      container.appendChild(pagination);
      await waitForRender();

      const nextIcon = pagination.shadowRoot.querySelector(
        ".ea-pagination__icon.next-icon"
      );
      expect(nextIcon.classList.contains("is-disabled")).toBe(true);
    });

    it("disabled 时点击 prev 仍会切换页面（disabled 不阻止点击）", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("current-page", "3");
      pagination.setAttribute("disabled", "");
      container.appendChild(pagination);
      await waitForRender();

      const prevIcon = pagination.shadowRoot.querySelector(
        ".ea-pagination__icon.prev-icon"
      );

      prevIcon.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await waitForRender();

      expect(pagination.currentPage).toBe(2);
    });

    it("disabled 时点击 next 仍会切换页面（disabled 不阻止点击）", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("disabled", "");
      container.appendChild(pagination);
      await waitForRender();

      const nextIcon = pagination.shadowRoot.querySelector(
        ".ea-pagination__icon.next-icon"
      );

      nextIcon.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await waitForRender();

      expect(pagination.currentPage).toBe(2);
    });
  });

  describe("Pager Click Interaction", () => {
    it("点击页码应该切换到对应页", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      const page5 = pagination.shadowRoot.querySelector(
        '.ea-pagination__page[data-page="5"]'
      );
      page5.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await waitForRender();

      expect(pagination.currentPage).toBe(5);
    });

    it("点击页码应该触发 change 事件", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      const handler = vi.fn();
      pagination.addEventListener("change", handler);

      const page3 = pagination.shadowRoot.querySelector(
        '.ea-pagination__page[data-page="3"]'
      );
      page3.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await waitForRender();

      expect(handler).toHaveBeenCalled();
      expect(handler.mock.calls[0][0].detail.currentPage).toBe(3);
    });

    it("点击省略号应该展开更多页码", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "1000");
      pagination.setAttribute("pager-count", "5");
      container.appendChild(pagination);
      await waitForRender();

      const moreItem = pagination.shadowRoot.querySelector(
        ".ea-pagination__more"
      );
      moreItem.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await waitForRender();

      expect(pagination.currentPage).toBeGreaterThan(1);
    });

    it("活跃页码应该有 is-active 类", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("current-page", "3");
      container.appendChild(pagination);
      await waitForRender();

      const activePage = pagination.shadowRoot.querySelector(
        '.ea-pagination__page.is-active[data-page="3"]'
      );
      expect(activePage).toBeTruthy();
    });

    it("非活跃页码不应有 is-active 类", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("current-page", "3");
      container.appendChild(pagination);
      await waitForRender();

      const page5 = pagination.shadowRoot.querySelector(
        '.ea-pagination__page[data-page="5"]'
      );
      expect(page5.classList.contains("is-active")).toBe(false);
    });
  });

  describe("Jumper Interaction", () => {
    it("jumper 输入框应该显示当前页码", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("current-page", "5");
      container.appendChild(pagination);
      await waitForRender();

      const jumperInput =
        pagination.shadowRoot.querySelector('[part="jumper"]');
      expect(jumperInput.value).toBe("5");
    });

    it("jumper 输入有效页码后按 Enter 应该跳转", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      const jumperInput =
        pagination.shadowRoot.querySelector('[part="jumper"]');
      jumperInput.value = "8";
      jumperInput.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Enter", bubbles: true })
      );
      await waitForRender();

      expect(pagination.currentPage).toBe(8);
    });

    it("jumper 输入超出范围的页码应该重置输入框", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      const jumperInput =
        pagination.shadowRoot.querySelector('[part="jumper"]');
      jumperInput.value = "999";
      jumperInput.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Enter", bubbles: true })
      );
      await waitForRender();

      expect(pagination.currentPage).toBe(1);
    });

    it("jumper 输入 0 会设置为当前页 0（无下限校验）", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      const jumperInput =
        pagination.shadowRoot.querySelector('[part="jumper"]');
      jumperInput.value = "0";
      jumperInput.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Enter", bubbles: true })
      );
      await waitForRender();

      expect(pagination.currentPage).toBe(0);
    });

    it("jumper 输入非数字应该忽略", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("current-page", "3");
      container.appendChild(pagination);
      await waitForRender();

      const jumperInput =
        pagination.shadowRoot.querySelector('[part="jumper"]');
      jumperInput.value = "abc";
      jumperInput.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Enter", bubbles: true })
      );
      await waitForRender();

      expect(pagination.currentPage).toBe(3);
    });

    it("jumper blur 时应该跳转到输入页码", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      const jumperInput =
        pagination.shadowRoot.querySelector('[part="jumper"]');
      jumperInput.value = "6";
      jumperInput.dispatchEvent(new FocusEvent("blur", { bubbles: true }));
      await waitForRender();

      expect(pagination.currentPage).toBe(6);
    });
  });

  describe("Sizes Interaction", () => {
    it("sizes 下拉框应该包含 pageSizes 选项", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.layout = ["sizes", "prev", "pager", "next"];
      container.appendChild(pagination);
      await waitForRender();

      const sizes = pagination.shadowRoot.querySelector('[part="sizes"]');
      const options = sizes.querySelectorAll("ea-option");
      expect(options.length).toBe(6);
    });

    it("sizes 下拉框当前值应该匹配 pageSize", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("page-size", "20");
      pagination.layout = ["sizes", "prev", "pager", "next"];
      container.appendChild(pagination);
      await waitForRender();

      const sizes = pagination.shadowRoot.querySelector('[part="sizes"]');
      expect(sizes.value).toBe(20);
    });

    it("sizes 变化时应该触发 ea-size-change 事件", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.layout = ["sizes", "prev", "pager", "next"];
      container.appendChild(pagination);
      await waitForRender();

      const handler = vi.fn();
      pagination.addEventListener("ea-size-change", handler);

      const sizes = pagination.shadowRoot.querySelector('[part="sizes"]');
      sizes.value = 50;
      sizes.dispatchEvent(new Event("change", { bubbles: true }));
      await waitForRender();

      expect(handler).toHaveBeenCalled();
      expect(handler.mock.calls[0][0].detail.pageSize).toBe(50);
    });

    it("sizes 变化时应该重置 currentPage 到合法范围", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("current-page", "10");
      pagination.layout = ["sizes", "prev", "pager", "next"];
      container.appendChild(pagination);
      await waitForRender();

      const sizes = pagination.shadowRoot.querySelector('[part="sizes"]');
      sizes.value = 50;
      sizes.dispatchEvent(new Event("change", { bubbles: true }));
      await waitForRender();

      expect(pagination.currentPage).toBe(2);
    });
  });

  // ==================== 边界情况 ====================

  describe("Edge Cases", () => {
    it("total 为 0 时应该正常渲染", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "0");
      container.appendChild(pagination);
      await waitForRender();

      expect(pagination.shadowRoot).toBeDefined();
    });

    it("total 为 0 时 prev 和 next 应该被禁用", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "0");
      container.appendChild(pagination);
      await waitForRender();

      const prevIcon = pagination.shadowRoot.querySelector(
        ".ea-pagination__icon.prev-icon"
      );
      const nextIcon = pagination.shadowRoot.querySelector(
        ".ea-pagination__icon.next-icon"
      );
      expect(prevIcon.classList.contains("is-disabled")).toBe(true);
      expect(nextIcon.classList.contains("is-disabled")).toBe(true);
    });

    it("pageSize 大于 total 时应该只有一页", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "5");
      pagination.setAttribute("page-size", "100");
      container.appendChild(pagination);
      await waitForRender();

      const pages = pagination.shadowRoot.querySelectorAll(
        ".ea-pagination__page"
      );
      expect(pages.length).toBe(1);
    });

    it("currentPage 超出范围时不会被自动修正", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("current-page", "999");
      container.appendChild(pagination);
      await waitForRender();

      expect(pagination.currentPage).toBe(999);
    });

    it("currentPage 为 0 时不会被自动修正", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("current-page", "0");
      container.appendChild(pagination);
      await waitForRender();

      expect(pagination.currentPage).toBe(0);
    });

    it("pageSize 不在 pageSizes 中时应该使用 pageSizes 第一项", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("page-size", "7");
      pagination.layout = ["sizes", "prev", "pager", "next"];
      container.appendChild(pagination);
      await waitForRender();

      expect(pagination.pageSize).toBe(10);
    });

    it("动态修改 total 应该更新分页", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      const initialPages = pagination.shadowRoot.querySelectorAll(
        ".ea-pagination__page"
      ).length;

      pagination.setAttribute("total", "200");
      await waitForRender();

      const newPages = pagination.shadowRoot.querySelectorAll(
        ".ea-pagination__page"
      ).length;

      expect(newPages).toBeGreaterThanOrEqual(initialPages);
    });

    it("动态修改 layout 应该更新渲染", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      expect(
        pagination.shadowRoot.querySelector('[part="total"]')
      ).toBeTruthy();

      pagination.layout = ["prev", "pager", "next"];
      await waitForRender();

      expect(pagination.shadowRoot.querySelector('[part="total"]')).toBeFalsy();
    });

    it("大 total 值应该正常渲染", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100000");
      container.appendChild(pagination);
      await waitForRender();

      expect(pagination.shadowRoot).toBeDefined();
      const totalEl = pagination.shadowRoot.querySelector(
        ".ea-pagination__total"
      );
      expect(totalEl.textContent).toBe("Total 100000");
    });
  });
});
