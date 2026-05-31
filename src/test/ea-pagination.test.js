import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender.js";

import "../components/ea-pagination/index.ts";

describe("EaPagination", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe("基本渲染", () => {
    it("应该正确渲染组件", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      expect(pagination).toBeDefined();
      expect(pagination.shadowRoot).toBeTruthy();
    });

    it("应该包含容器元素", async () => {
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

    it("默认 layout 应包含 prev, pager, next, jumper, ->, total", async () => {
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

    it("默认 layout 应渲染上一页图标", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      expect(
        pagination.shadowRoot.querySelector(".ea-pagination__icon--prev")
      ).toBeTruthy();
    });

    it("默认 layout 应渲染下一页图标", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      expect(
        pagination.shadowRoot.querySelector(".ea-pagination__icon--next")
      ).toBeTruthy();
    });

    it("默认 layout 应渲染分页器区域", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      expect(
        pagination.shadowRoot.querySelector(".ea-pagination__pager")
      ).toBeTruthy();
    });

    it("默认 layout 应渲染总数区域", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      expect(
        pagination.shadowRoot.querySelector(".ea-pagination__total")
      ).toBeTruthy();
    });

    it("默认 layout 应渲染跳转区域", async () => {
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

  describe("total 属性", () => {
    it("默认 total 应为 0", async () => {
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

    it("total 变化应更新总数文本", async () => {
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

    it("total 为 0 应正常渲染", async () => {
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

  describe("defaultPageSize 属性", () => {
    it("默认 defaultPageSize 应为 10", async () => {
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

    it("defaultPageSize 应影响 pageSize 默认值", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("default-page-size", "25");
      container.appendChild(pagination);
      await waitForRender();

      expect(pagination.pageSize).toBe(25);
    });

    it("defaultPageSize 动态变化应触发重新渲染", async () => {
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

  describe("pageSize 属性", () => {
    it("默认 pageSize 应使用 defaultPageSize", async () => {
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

    it("pageSize 变化应触发 ea-size-change 事件", async () => {
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

    it("pageSize 变化应触发分页器重新渲染", async () => {
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

  describe("pagerCount 属性", () => {
    it("默认 pagerCount 应为 7", async () => {
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

    it("较小的 pagerCount 应显示省略号", async () => {
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

  describe("currentPage 属性", () => {
    it("默认 currentPage 应为 1", async () => {
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

    it("currentPage 变化应触发 ea-current-change 事件", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      const handler = vi.fn();
      pagination.addEventListener("ea-current-change", handler);

      pagination.currentPage = 2;
      await waitForRender();

      expect(handler).toHaveBeenCalled();
      expect(handler.mock.calls[0][0].detail.value).toBe(2);
    });

    it("currentPage 变化应更新激活页码样式", async () => {
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

    it("currentPage 动态更新应正确反映", async () => {
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

  describe("background 属性", () => {
    it("默认 background 应为 false", async () => {
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

    it("background 为 true 应添加 background 修饰符类", async () => {
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

    it("background 为 false 不应有 background 修饰符类", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      const containerEl = pagination.shadowRoot.querySelector(".ea-pagination");
      expect(containerEl.classList.contains("ea-pagination--background")).toBe(
        false
      );
    });

    it("background 动态切换应正确更新类名", async () => {
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

  describe("size 属性", () => {
    it("默认 size 应为空字符串", async () => {
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

    it("size 变化应添加对应修饰符类", async () => {
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

    it("空 size 不应有 size 修饰符类", async () => {
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

    it("size 动态切换应正确更新类名", async () => {
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

  describe("hideOnSinglePage 属性", () => {
    it("默认 hideOnSinglePage 应为 false", async () => {
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

    it("hideOnSinglePage 为 true 且只有一页时应隐藏分页", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "5");
      pagination.setAttribute("hide-on-single-page", "");
      container.appendChild(pagination);
      await waitForRender();

      const containerEl = pagination.shadowRoot.querySelector(".ea-pagination");
      expect(containerEl.classList.contains("is-hide")).toBe(true);
    });

    it("hideOnSinglePage 为 true 且有多页时不应隐藏", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("hide-on-single-page", "");
      container.appendChild(pagination);
      await waitForRender();

      const containerEl = pagination.shadowRoot.querySelector(".ea-pagination");
      expect(containerEl.classList.contains("is-hide")).toBe(false);
    });

    it("hideOnSinglePage 在不含 pager 的 layout 中也应生效", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "5");
      pagination.setAttribute("hide-on-single-page", "");
      pagination.layout = ["prev", "next", "total"];
      container.appendChild(pagination);
      await waitForRender();

      const containerEl = pagination.shadowRoot.querySelector(".ea-pagination");
      expect(containerEl.classList.contains("is-hide")).toBe(true);
    });
  });

  describe("disabled 属性", () => {
    it("默认 disabled 应为 false", async () => {
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

    it("disabled 应添加 is-disabled 类到容器", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("disabled", "");
      container.appendChild(pagination);
      await waitForRender();

      const containerEl = pagination.shadowRoot.querySelector(".ea-pagination");
      expect(containerEl.classList.contains("is-disabled")).toBe(true);
    });

    it("disabled 应禁用跳转输入框", async () => {
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

    it("disabled 应禁用 sizes 下拉框", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.layout = ["sizes", "prev", "pager", "next"];
      container.appendChild(pagination);
      await waitForRender(300);

      pagination.setAttribute("disabled", "");
      await waitForRender(300);

      const sizes = pagination.shadowRoot.querySelector('[part="sizes"]');
      expect(sizes.disabled).toBe(true);
    });
  });

  describe("pageSizes 属性", () => {
    it("默认 pageSizes 应为 [10, 20, 30, 40, 50, 100]", async () => {
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

    it("pageSizes 变化应更新 sizes 下拉框", async () => {
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

  describe("layout 属性", () => {
    it("应该支持自定义 layout", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.layout = ["prev", "pager", "next"];
      container.appendChild(pagination);
      await waitForRender();

      expect(pagination.layout).toEqual(["prev", "pager", "next"]);
    });

    it("layout 包含 sizes 应渲染 sizes 下拉框", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.layout = ["sizes", "prev", "pager", "next"];
      container.appendChild(pagination);
      await waitForRender();

      const sizes = pagination.shadowRoot.querySelector('[part="sizes"]');
      expect(sizes).toBeTruthy();
    });

    it("layout 不包含 sizes 不应渲染 sizes 下拉框", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.layout = ["prev", "pager", "next"];
      container.appendChild(pagination);
      await waitForRender();

      const sizes = pagination.shadowRoot.querySelector('[part="sizes"]');
      expect(sizes).toBeFalsy();
    });

    it("layout 不包含 total 不应渲染总数区域", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.layout = ["prev", "pager", "next"];
      container.appendChild(pagination);
      await waitForRender();

      const total = pagination.shadowRoot.querySelector('[part="total"]');
      expect(total).toBeFalsy();
    });

    it("layout 不包含 jumper 不应渲染跳转区域", async () => {
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

    it("layout 包含 -> 应渲染分隔符", async () => {
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

  describe("上一页/下一页点击交互", () => {
    it("点击上一页应切换到前一页", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("current-page", "3");
      container.appendChild(pagination);
      await waitForRender();

      const prevIcon = pagination.shadowRoot.querySelector(
        ".ea-pagination__icon--prev"
      );
      prevIcon.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await waitForRender();

      expect(pagination.currentPage).toBe(2);
    });

    it("点击下一页应切换到后一页", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      const nextIcon = pagination.shadowRoot.querySelector(
        ".ea-pagination__icon--next"
      );
      nextIcon.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await waitForRender();

      expect(pagination.currentPage).toBe(2);
    });

    it("点击上一页应触发 ea-prev-click 事件", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("current-page", "3");
      container.appendChild(pagination);
      await waitForRender();

      const handler = vi.fn();
      pagination.addEventListener("ea-prev-click", handler);

      const prevIcon = pagination.shadowRoot.querySelector(
        ".ea-pagination__icon--prev"
      );
      prevIcon.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await waitForRender();

      expect(handler).toHaveBeenCalled();
    });

    it("点击下一页应触发 ea-next-click 事件", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      const handler = vi.fn();
      pagination.addEventListener("ea-next-click", handler);

      const nextIcon = pagination.shadowRoot.querySelector(
        ".ea-pagination__icon--next"
      );
      nextIcon.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await waitForRender();

      expect(handler).toHaveBeenCalled();
    });

    it("第一页时上一页按钮应为禁用状态", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      const prevIcon = pagination.shadowRoot.querySelector(
        ".ea-pagination__icon--prev"
      );
      expect(prevIcon.classList.contains("is-disabled")).toBe(true);
    });

    it("最后一页时下一页按钮应为禁用状态", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("current-page", "10");
      container.appendChild(pagination);
      await waitForRender();

      const nextIcon = pagination.shadowRoot.querySelector(
        ".ea-pagination__icon--next"
      );
      expect(nextIcon.classList.contains("is-disabled")).toBe(true);
    });

    it("disabled 状态下点击上一页不应切换页码", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("current-page", "3");
      pagination.setAttribute("disabled", "");
      container.appendChild(pagination);
      await waitForRender();

      const prevIcon = pagination.shadowRoot.querySelector(
        ".ea-pagination__icon--prev"
      );
      prevIcon.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await waitForRender();

      expect(pagination.currentPage).toBe(3);
    });

    it("disabled 状态下点击下一页不应切换页码", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("disabled", "");
      container.appendChild(pagination);
      await waitForRender();

      const nextIcon = pagination.shadowRoot.querySelector(
        ".ea-pagination__icon--next"
      );
      nextIcon.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await waitForRender();

      expect(pagination.currentPage).toBe(1);
    });
  });

  describe("页码点击交互", () => {
    it("点击页码应切换到对应页", async () => {
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

    it("点击页码应触发 ea-current-change 事件", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      const handler = vi.fn();
      pagination.addEventListener("ea-current-change", handler);

      const page3 = pagination.shadowRoot.querySelector(
        '.ea-pagination__page[data-page="3"]'
      );
      page3.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await waitForRender();

      expect(handler).toHaveBeenCalled();
      expect(handler.mock.calls[0][0].detail.value).toBe(3);
    });

    it("点击省略号应展开更多页码", async () => {
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

    it("激活页码应有 is-active 类", async () => {
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

    it("非激活页码不应有 is-active 类", async () => {
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

  describe("跳转输入框交互", () => {
    it("跳转输入框应显示当前页码", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("current-page", "5");
      container.appendChild(pagination);
      await waitForRender();

      const jumperInput =
        pagination.shadowRoot.querySelector('[part="jumper"]');
      expect(jumperInput.value).toBe(5);
    });

    it("ea-change 事件应更新当前页码", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      const jumperInput =
        pagination.shadowRoot.querySelector('[part="jumper"]');
      jumperInput.dispatchEvent(
        new CustomEvent("ea-change", {
          detail: { currentValue: 8, oldValue: 1 },
          bubbles: true,
          composed: true,
        })
      );
      await waitForRender();

      expect(pagination.currentPage).toBe(8);
    });

    it("currentPage 变化应同步更新跳转输入框的值", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      pagination.currentPage = 5;
      await waitForRender();

      const jumperInput =
        pagination.shadowRoot.querySelector('[part="jumper"]');
      expect(jumperInput.value).toBe(5);
    });

    it("跳转输入框的 max 应与总页数一致", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      const jumperInput =
        pagination.shadowRoot.querySelector('[part="jumper"]');
      expect(jumperInput.max).toBe(10);
    });

    it("跳转输入框的 min 应为 1", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      container.appendChild(pagination);
      await waitForRender();

      const jumperInput =
        pagination.shadowRoot.querySelector('[part="jumper"]');
      expect(jumperInput.min).toBe(1);
    });
  });

  describe("每页条数选择器交互", () => {
    it("sizes 下拉框应包含 pageSizes 选项", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.layout = ["sizes", "prev", "pager", "next"];
      container.appendChild(pagination);
      await waitForRender();

      const sizes = pagination.shadowRoot.querySelector('[part="sizes"]');
      const options = sizes.querySelectorAll("ea-option");
      expect(options.length).toBe(6);
    });

    it("sizes 下拉框当前值应与 pageSize 匹配", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("page-size", "20");
      pagination.layout = ["sizes", "prev", "pager", "next"];
      container.appendChild(pagination);
      await waitForRender();

      const sizes = pagination.shadowRoot.querySelector('[part="sizes"]');
      expect(sizes.value).toBe(20);
    });

    it("sizes 变化应触发 ea-size-change 事件", async () => {
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

    it("sizes 变化应将 currentPage 重置到有效范围", async () => {
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

  describe("边界情况", () => {
    it("total 为 0 应正常渲染", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "0");
      container.appendChild(pagination);
      await waitForRender();

      expect(pagination.shadowRoot).toBeDefined();
    });

    it("total 为 0 时上一页和下一页应为禁用状态", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "0");
      container.appendChild(pagination);
      await waitForRender();

      const prevIcon = pagination.shadowRoot.querySelector(
        ".ea-pagination__icon--prev"
      );
      const nextIcon = pagination.shadowRoot.querySelector(
        ".ea-pagination__icon--next"
      );
      expect(prevIcon.classList.contains("is-disabled")).toBe(true);
      expect(nextIcon.classList.contains("is-disabled")).toBe(true);
    });

    it("pageSize 大于 total 应只有一页", async () => {
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

    it("currentPage 超出范围不会被自动修正", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("current-page", "999");
      container.appendChild(pagination);
      await waitForRender();

      expect(pagination.currentPage).toBe(999);
    });

    it("pageSize 不在 pageSizes 中应使用 pageSizes 第一项", async () => {
      const pagination = document.createElement("ea-pagination");
      pagination.setAttribute("total", "100");
      pagination.setAttribute("page-size", "7");
      pagination.layout = ["sizes", "prev", "pager", "next"];
      container.appendChild(pagination);
      await waitForRender();

      expect(pagination.pageSize).toBe(10);
    });

    it("动态修改 total 应更新分页器", async () => {
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

    it("动态修改 layout 应更新渲染", async () => {
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

    it("较大的 total 值应正常渲染", async () => {
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
