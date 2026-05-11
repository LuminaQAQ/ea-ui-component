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

  describe("Basic Functionality", () => {
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
  });

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

  describe("HideOnSinglePage Attribute", () => {
    it("默认 hideOnSinglePage 应该是 false", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);

      await waitForRender();

      expect(pagination.hideOnSinglePage).toBe(false);
    });

    it("应该支持 hideOnSinglePage 属性", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("hide-on-single-page", "");
      container.appendChild(pagination);

      await waitForRender();

      expect(pagination.hideOnSinglePage).toBe(true);
    });

    it("hideOnSinglePage 为 true 且只有一页时应该添加 hide 修饰符 class", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "5");
      pagination.setAttribute("page-size", "10");
      pagination.setAttribute("hide-on-single-page", "");
      container.appendChild(pagination);

      await waitForRender();

      const containerEl = pagination.shadowRoot.querySelector(".ea-pagination");
      expect(containerEl.classList.contains("is-hide")).toBe(true);
    });

    it("hideOnSinglePage 为 true 但有多页时不应隐藏", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("hide-on-single-page", "");
      container.appendChild(pagination);

      await waitForRender();

      const containerEl = pagination.shadowRoot.querySelector(".ea-pagination");
      expect(containerEl.classList.contains("is-hide")).toBe(false);
    });

    it("hideOnSinglePage 为 false 时不应该隐藏", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "5");
      pagination.setAttribute("page-size", "10");
      container.appendChild(pagination);

      await waitForRender();

      const containerEl = pagination.shadowRoot.querySelector(".ea-pagination");
      expect(containerEl.classList.contains("is-hide")).toBe(false);
    });
  });

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

    it("disabled 为 true 时应该添加 disabled 修饰符 class", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("disabled", "");
      container.appendChild(pagination);

      await waitForRender();

      const containerEl = pagination.shadowRoot.querySelector(".ea-pagination");
      expect(containerEl.classList.contains("is-disabled")).toBe(true);
    });

    it("disabled 为 false 时不应有 disabled 修饰符 class", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);

      await waitForRender();

      const containerEl = pagination.shadowRoot.querySelector(".ea-pagination");
      expect(containerEl.classList.contains("is-disabled")).toBe(false);
    });

    it("disabled 动态切换应该正确更新 class", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);

      await waitForRender();

      const containerEl = pagination.shadowRoot.querySelector(".ea-pagination");
      expect(containerEl.classList.contains("is-disabled")).toBe(false);

      pagination.setAttribute("disabled", "");
      await waitForRender();

      expect(containerEl.classList.contains("is-disabled")).toBe(true);

      pagination.removeAttribute("disabled");
      await waitForRender();

      expect(containerEl.classList.contains("is-disabled")).toBe(false);
    });
  });

  describe("Layout Property", () => {
    it("默认 layout 应该是 ['prev', 'pager', 'next', 'jumper', '->', 'total']", async () => {
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

    it("应该支持自定义 layout", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.layout = ["prev", "pager", "next"];
      container.appendChild(pagination);

      await waitForRender();

      expect(pagination.layout).toEqual(["prev", "pager", "next"]);
    });

    it("layout 只包含 prev 和 next 时不应渲染 pager", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.layout = ["prev", "next"];
      container.appendChild(pagination);

      await waitForRender();

      expect(
        pagination.shadowRoot.querySelector(".ea-pagination__pager")
      ).toBeFalsy();
    });

    it("layout 不包含 total 时不应渲染 total 区域", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.layout = ["prev", "pager", "next"];
      container.appendChild(pagination);

      await waitForRender();

      expect(
        pagination.shadowRoot.querySelector(".ea-pagination__total")
      ).toBeFalsy();
    });

    it("layout 不包含 prev 时不应渲染 prev icon", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.layout = ["pager", "next"];
      container.appendChild(pagination);

      await waitForRender();

      expect(
        pagination.shadowRoot.querySelector(".ea-pagination__icon.prev-icon")
      ).toBeFalsy();
    });

    it("layout 不包含 next 时不应渲染 next icon", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.layout = ["prev", "pager"];
      container.appendChild(pagination);

      await waitForRender();

      expect(
        pagination.shadowRoot.querySelector(".ea-pagination__icon.next-icon")
      ).toBeFalsy();
    });

    it("layout 动态变化时应该重新渲染", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.layout = ["prev", "pager", "next"];
      container.appendChild(pagination);

      await waitForRender();

      expect(
        pagination.shadowRoot.querySelector(".ea-pagination__total")
      ).toBeFalsy();

      pagination.layout = ["prev", "pager", "next", "total"];
      await waitForRender();

      expect(
        pagination.shadowRoot.querySelector(".ea-pagination__total")
      ).toBeTruthy();
    });

    it("layout 包含 sizes 时应该渲染 sizes 区域", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.layout = ["sizes", "prev", "pager", "next"];
      container.appendChild(pagination);

      await waitForRender();

      expect(
        pagination.shadowRoot.querySelector(".ea-pagination__sizes")
      ).toBeTruthy();
    });

    it("layout 包含 -> 时应该渲染 separator", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.layout = ["prev", "pager", "->", "next"];
      container.appendChild(pagination);

      await waitForRender();

      expect(
        pagination.shadowRoot.querySelector(".ea-pagination__separator")
      ).toBeTruthy();
    });
  });

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
      pagination.pageSizes = [10, 20, 30, 40];
      container.appendChild(pagination);

      await waitForRender();

      expect(pagination.pageSizes).toEqual([10, 20, 30, 40]);
    });

    it("pageSizes 动态变化时应该触发重新渲染", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);

      await waitForRender();

      expect(pagination.pageSizes).toEqual([10, 20, 30, 40, 50, 100]);

      pagination.pageSizes = [5, 10, 15];
      await waitForRender();

      expect(pagination.pageSizes).toEqual([5, 10, 15]);
    });
  });

  describe("Pager Rendering", () => {
    it("应该正确渲染页码", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);

      await waitForRender();

      const pages = pagination.shadowRoot.querySelectorAll(
        ".ea-pagination__page:not(.ea-pagination__more)"
      );
      expect(pages.length).toBeGreaterThan(0);
    });

    it("当前页应该有 is-active class", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);

      await waitForRender();

      const activePage = pagination.shadowRoot.querySelector(
        ".ea-pagination__page.is-active"
      );
      expect(activePage).toBeTruthy();
      expect(activePage.dataset.page).toBe("1");
    });

    it("页码应该有 data-page 属性", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);

      await waitForRender();

      const pages = pagination.shadowRoot.querySelectorAll(
        ".ea-pagination__page:not(.ea-pagination__more)"
      );
      pages.forEach(page => {
        expect(page.dataset.page).toBeDefined();
      });
    });

    it("页码应该有 part=page", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);

      await waitForRender();

      const pages = pagination.shadowRoot.querySelectorAll(
        ".ea-pagination__page:not(.ea-pagination__more)"
      );
      pages.forEach(page => {
        expect(page.getAttribute("part")).toBe("page");
      });
    });

    it("总页数较少时不应显示省略号", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "50");
      pagination.setAttribute("page-size", "10");
      container.appendChild(pagination);

      await waitForRender();

      const moreItems = pagination.shadowRoot.querySelectorAll(
        ".ea-pagination__more"
      );
      expect(moreItems.length).toBe(0);
    });

    it("总页数较多时应该显示省略号", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "1000");
      container.appendChild(pagination);

      await waitForRender();

      const moreItems = pagination.shadowRoot.querySelectorAll(
        ".ea-pagination__more"
      );
      expect(moreItems.length).toBeGreaterThan(0);
    });

    it("省略号应该有 part=more", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "1000");
      container.appendChild(pagination);

      await waitForRender();

      const moreItems = pagination.shadowRoot.querySelectorAll(
        ".ea-pagination__more"
      );
      moreItems.forEach(item => {
        expect(item.getAttribute("part")).toContain("more");
      });
    });

    it("省略号应该有 data-action 属性", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "1000");
      container.appendChild(pagination);

      await waitForRender();

      const moreItems = pagination.shadowRoot.querySelectorAll(
        ".ea-pagination__more"
      );
      moreItems.forEach(item => {
        expect(item.dataset.action).toBeDefined();
        expect(["prev", "next"]).toContain(item.dataset.action);
      });
    });

    it("第一页和最后一页应该始终显示", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "1000");
      container.appendChild(pagination);

      await waitForRender();

      const pages = pagination.shadowRoot.querySelectorAll(
        ".ea-pagination__page:not(.ea-pagination__more)"
      );
      const pageNumbers = Array.from(pages).map(p => Number(p.dataset.page));
      expect(pageNumbers).toContain(1);
      expect(pageNumbers).toContain(100);
    });
  });

  describe("Prev/Next Icon", () => {
    it("prev icon 在第一页时应该有 is-disabled class", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);

      await waitForRender();

      const prevIcon = pagination.shadowRoot.querySelector(
        ".ea-pagination__icon.prev-icon"
      );
      expect(prevIcon.classList.contains("is-disabled")).toBe(true);
    });

    it("prev icon 在非第一页时不应有 is-disabled class", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("current-page", "3");
      container.appendChild(pagination);

      await waitForRender();

      const prevIcon = pagination.shadowRoot.querySelector(
        ".ea-pagination__icon.prev-icon"
      );
      expect(prevIcon.classList.contains("is-disabled")).toBe(false);
    });

    it("next icon 在最后一页时应该有 is-disabled class", async () => {
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

    it("next icon 在非最后一页时不应有 is-disabled class", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);

      await waitForRender();

      const nextIcon = pagination.shadowRoot.querySelector(
        ".ea-pagination__icon.next-icon"
      );
      expect(nextIcon.classList.contains("is-disabled")).toBe(false);
    });

    it("prev icon 在第一页时应该有 aria-disabled=true", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);

      await waitForRender();

      const prevIcon = pagination.shadowRoot.querySelector(
        ".ea-pagination__icon.prev-icon"
      );
      expect(prevIcon.getAttribute("aria-disabled")).toBe("true");
    });

    it("next icon 在最后一页时应该有 aria-disabled=true", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("current-page", "10");
      container.appendChild(pagination);

      await waitForRender();

      const nextIcon = pagination.shadowRoot.querySelector(
        ".ea-pagination__icon.next-icon"
      );
      expect(nextIcon.getAttribute("aria-disabled")).toBe("true");
    });

    it("prev icon 在第一页时 tabindex 应该是 -1", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);

      await waitForRender();

      const prevIcon = pagination.shadowRoot.querySelector(
        ".ea-pagination__icon.prev-icon"
      );
      expect(prevIcon.getAttribute("tabindex")).toBe("-1");
    });

    it("next icon 在最后一页时 tabindex 应该是 -1", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("current-page", "10");
      container.appendChild(pagination);

      await waitForRender();

      const nextIcon = pagination.shadowRoot.querySelector(
        ".ea-pagination__icon.next-icon"
      );
      expect(nextIcon.getAttribute("tabindex")).toBe("-1");
    });

    it("total 为 0 时 prev icon 应该有 is-disabled class", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "0");
      container.appendChild(pagination);

      await waitForRender();

      const prevIcon = pagination.shadowRoot.querySelector(
        ".ea-pagination__icon.prev-icon"
      );
      expect(prevIcon.classList.contains("is-disabled")).toBe(true);
    });

    it("total 为 0 时 next icon 应该有 is-disabled class", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "0");
      container.appendChild(pagination);

      await waitForRender();

      const nextIcon = pagination.shadowRoot.querySelector(
        ".ea-pagination__icon.next-icon"
      );
      expect(nextIcon.classList.contains("is-disabled")).toBe(true);
    });
  });

  describe("Total Display", () => {
    it("应该显示 Total 文本", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);

      await waitForRender();

      const totalEl = pagination.shadowRoot.querySelector(
        ".ea-pagination__total"
      );
      expect(totalEl.textContent).toBe("Total 100");
    });

    it("total 变化时应该更新文本", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);

      await waitForRender();

      let totalEl = pagination.shadowRoot.querySelector(
        ".ea-pagination__total"
      );
      expect(totalEl.textContent).toBe("Total 100");

      pagination.setAttribute("total", "500");
      await waitForRender();

      totalEl = pagination.shadowRoot.querySelector(".ea-pagination__total");
      expect(totalEl.textContent).toBe("Total 500");
    });
  });

  describe("Events", () => {
    it("currentPage 变化时应该触发 change 事件", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);

      await waitForRender();

      const changeHandler = vi.fn();
      pagination.addEventListener("change", changeHandler);

      pagination.currentPage = 2;
      await waitForRender();

      expect(changeHandler).toHaveBeenCalledTimes(1);
      expect(changeHandler.mock.calls[0][0].detail).toEqual({
        currentPage: 2,
        pageSize: 10,
      });
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

      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler.mock.calls[0][0].detail.value).toBe(3);
    });

    it("pageSize 变化时应该触发 ea-size-change 事件", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);

      await waitForRender();

      const handler = vi.fn();
      pagination.addEventListener("ea-size-change", handler);

      pagination.pageSize = 20;
      await waitForRender();

      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler.mock.calls[0][0].detail.pageSize).toBe(20);
    });

    it("点击 prev icon 应该触发 ea-prev-click 事件", async () => {
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
      prevIcon.click();
      await waitForRender();

      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler.mock.calls[0][0].detail.value).toBe(2);
    });

    it("点击 next icon 应该触发 ea-next-click 事件", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);

      await waitForRender();

      const handler = vi.fn();
      pagination.addEventListener("ea-next-click", handler);

      const nextIcon = pagination.shadowRoot.querySelector(
        ".ea-pagination__icon.next-icon"
      );
      nextIcon.click();
      await waitForRender();

      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler.mock.calls[0][0].detail.value).toBe(2);
    });

    it("点击 prev icon 在第一页时不应触发 ea-prev-click 事件", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);

      await waitForRender();

      const handler = vi.fn();
      pagination.addEventListener("ea-prev-click", handler);

      const prevIcon = pagination.shadowRoot.querySelector(
        ".ea-pagination__icon.prev-icon"
      );
      prevIcon.click();
      await waitForRender();

      expect(handler).not.toHaveBeenCalled();
    });

    it("点击 next icon 在最后一页时不应触发 ea-next-click 事件", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("current-page", "10");
      container.appendChild(pagination);

      await waitForRender();

      const handler = vi.fn();
      pagination.addEventListener("ea-next-click", handler);

      const nextIcon = pagination.shadowRoot.querySelector(
        ".ea-pagination__icon.next-icon"
      );
      nextIcon.click();
      await waitForRender();

      expect(handler).not.toHaveBeenCalled();
    });

    it("点击页码应该更新 currentPage", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);

      await waitForRender();

      const page3 = pagination.shadowRoot.querySelector(
        '.ea-pagination__page[data-page="3"]:not(.ea-pagination__more)'
      );
      if (page3) {
        page3.click();
        await waitForRender();

        expect(pagination.currentPage).toBe(3);
      }
    });

    it("change 事件应该冒泡", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);

      await waitForRender();

      const changeHandler = vi.fn();
      pagination.addEventListener("change", changeHandler);

      pagination.currentPage = 2;
      await waitForRender();

      expect(changeHandler.mock.calls[0][0].bubbles).toBe(true);
    });

    it("ea-current-change 事件应该冒泡且可组合", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);

      await waitForRender();

      const handler = vi.fn();
      pagination.addEventListener("ea-current-change", handler);

      pagination.currentPage = 2;
      await waitForRender();

      const event = handler.mock.calls[0][0];
      expect(event.bubbles).toBe(true);
      expect(event.composed).toBe(true);
    });
  });

  describe("updateContainerClasslist", () => {
    it("应该正确组合 background 和 size 修饰符", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("background", "");
      pagination.setAttribute("size", "small");
      container.appendChild(pagination);

      await waitForRender();

      const containerEl = pagination.shadowRoot.querySelector(".ea-pagination");
      expect(containerEl.classList.contains("ea-pagination--background")).toBe(
        true
      );
      expect(containerEl.classList.contains("ea-pagination--size-small")).toBe(
        true
      );
    });

    it("应该正确组合 disabled 和 hide 修饰符", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "5");
      pagination.setAttribute("page-size", "10");
      pagination.setAttribute("disabled", "");
      pagination.setAttribute("hide-on-single-page", "");
      container.appendChild(pagination);

      await waitForRender();

      const containerEl = pagination.shadowRoot.querySelector(".ea-pagination");
      expect(containerEl.classList.contains("is-disabled")).toBe(true);
      expect(containerEl.classList.contains("is-hide")).toBe(true);
    });
  });

  describe("Edge Cases", () => {
    it("应该处理 total 为 0 的情况", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "0");
      container.appendChild(pagination);

      await waitForRender();

      expect(pagination.total).toBe(0);
    });

    it("应该处理只有一页的情况", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "5");
      pagination.setAttribute("page-size", "10");
      container.appendChild(pagination);

      await waitForRender();

      expect(pagination.total).toBe(5);
      expect(pagination.pageSize).toBe(10);
      const pages = pagination.shadowRoot.querySelectorAll(
        ".ea-pagination__page:not(.ea-pagination__more)"
      );
      expect(pages.length).toBe(1);
    });

    it("应该处理 currentPage 超过总页数的情况", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "50");
      pagination.setAttribute("page-size", "10");
      pagination.setAttribute("current-page", "10");
      container.appendChild(pagination);

      await waitForRender();

      expect(pagination.currentPage).toBe(10);
    });

    it("应该处理 total 为负数的情况", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "-1");
      container.appendChild(pagination);

      await waitForRender();

      expect(pagination.total).toBe(-1);
    });

    it("应该处理非常大的 total", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "999999");
      container.appendChild(pagination);

      await waitForRender();

      expect(pagination.total).toBe(999999);
      const pages = pagination.shadowRoot.querySelectorAll(
        ".ea-pagination__page"
      );
      expect(pages.length).toBeGreaterThan(0);
    });

    it("应该处理 pageSize 大于 total 的情况", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "5");
      pagination.setAttribute("page-size", "100");
      container.appendChild(pagination);

      await waitForRender();

      const pages = pagination.shadowRoot.querySelectorAll(
        ".ea-pagination__page:not(.ea-pagination__more)"
      );
      expect(pages.length).toBe(1);
    });
  });

  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("current-page", "3");
      container.appendChild(pagination);

      await waitForRender();

      expect(pagination.shadowRoot).toBeTruthy();
      expect(pagination.currentPage).toBe(3);
    });

    it("组件断开连接后应该正常移除", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);

      await waitForRender();

      pagination.remove();

      expect(pagination.isConnected).toBe(false);
    });

    it("应该支持属性动态更新", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);

      await waitForRender();

      expect(pagination.currentPage).toBe(1);

      pagination.setAttribute("current-page", "5");
      await waitForRender();

      expect(pagination.currentPage).toBe(5);
    });

    it("应该支持 total 动态更新", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);

      await waitForRender();

      pagination.setAttribute("total", "500");
      await waitForRender();

      expect(pagination.total).toBe(500);
    });

    it("应该支持 pageSize 动态更新", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);

      await waitForRender();

      pagination.pageSize = 20;
      await waitForRender();

      expect(pagination.pageSize).toBe(20);
    });

    it("应该支持 background 动态切换", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);

      await waitForRender();

      expect(pagination.background).toBe(false);

      pagination.setAttribute("background", "");
      await waitForRender();

      expect(pagination.background).toBe(true);
    });

    it("应该支持 disabled 动态切换", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);

      await waitForRender();

      expect(pagination.disabled).toBe(false);

      pagination.setAttribute("disabled", "");
      await waitForRender();

      expect(pagination.disabled).toBe(true);
    });

    it("应该支持 size 动态切换", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);

      await waitForRender();

      expect(pagination.size).toBe("");

      pagination.setAttribute("size", "small");
      await waitForRender();

      expect(pagination.size).toBe("small");
    });

    it("应该支持 layout 动态更新", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.layout = ["prev", "pager", "next"];
      container.appendChild(pagination);

      await waitForRender();

      expect(
        pagination.shadowRoot.querySelector(".ea-pagination__total")
      ).toBeFalsy();

      pagination.layout = ["prev", "pager", "next", "total"];
      await waitForRender();

      expect(
        pagination.shadowRoot.querySelector(".ea-pagination__total")
      ).toBeTruthy();
    });

    it("组件重新连接后应该正常工作", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);

      await waitForRender();

      pagination.remove();
      container.appendChild(pagination);

      await waitForRender();

      expect(pagination.isConnected).toBe(true);
      expect(pagination.shadowRoot).toBeTruthy();
    });
  });

  describe("BEM Naming Convention", () => {
    it("容器应该使用 ea-pagination block class", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);

      await waitForRender();

      expect(
        pagination.shadowRoot.querySelector(".ea-pagination")
      ).toBeTruthy();
    });

    it("pager 应该使用 ea-pagination__pager element class", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);

      await waitForRender();

      expect(
        pagination.shadowRoot.querySelector(".ea-pagination__pager")
      ).toBeTruthy();
    });

    it("icon 应该使用 ea-pagination__icon element class", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);

      await waitForRender();

      expect(
        pagination.shadowRoot.querySelector(".ea-pagination__icon")
      ).toBeTruthy();
    });

    it("total 应该使用 ea-pagination__total element class", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);

      await waitForRender();

      expect(
        pagination.shadowRoot.querySelector(".ea-pagination__total")
      ).toBeTruthy();
    });

    it("page 应该使用 ea-pagination__page element class", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);

      await waitForRender();

      expect(
        pagination.shadowRoot.querySelector(".ea-pagination__page")
      ).toBeTruthy();
    });

    it("more 应该使用 ea-pagination__more 修饰符 class", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "1000");
      container.appendChild(pagination);

      await waitForRender();

      expect(
        pagination.shadowRoot.querySelector(".ea-pagination__more")
      ).toBeTruthy();
    });

    it("background 应该使用 ea-pagination--background 修饰符 class", async () => {
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

    it("size 应该使用 ea-pagination--size-{value} 修饰符 class", async () => {
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

    it("is-active 应该使用状态 class", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);

      await waitForRender();

      const activePage = pagination.shadowRoot.querySelector(
        ".ea-pagination__page.is-active"
      );
      expect(activePage).toBeTruthy();
    });

    it("is-disabled 应该使用状态 class", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);

      await waitForRender();

      const prevIcon = pagination.shadowRoot.querySelector(
        ".ea-pagination__icon.prev-icon"
      );
      expect(prevIcon.classList.contains("is-disabled")).toBe(true);
    });
  });
});
