import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";
import EaUtils from "@/utils/Utils";
import { getPageItem } from "./components/pageItem";

export class EaPagination extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #pagination;
  /** @type {HTMLElement} */
  #prevIcon;
  /** @type {HTMLElement} */
  #nextIcon;

  /** @type {AbortController} */
  #paginationAbortController;
  /** @type {AbortController} */
  #prevAbortController;
  /** @type {AbortController} */
  #nextAbortController;

  #states = {
    isFirstRender: true,
  };

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "layout",
      "default-page-size",
      "page-size",
      "page-count",
      "total",
      "background",
      "current-page",
    ];
  }

  state = this.properties({
    // TODO: sizes 要下拉框，没写
    layout: {
      type: Array,
      default: ["prev", "pager", "next", "jumper", "->", "total"],
      /** @param {Array<'prev' | 'pager' | 'next' | '->' | 'jumper' | 'total' | 'sizes'>} newVal */
      observer: (newVal) => {
        if (!this.#states.isFirstRender) this.$render();
      },
    },
    "default-page-size": {
      type: Number,
      default: 10,
      /** @param {number} newVal */
      observer: (newVal) => {
        if (!this.#states.isFirstRender) this.$render();
      },
    },
    "page-size": {
      type: Number,
      default: () => this["default-page-size"],
      /** @param {number} newVal */
      observer: (newVal) => {
        if (!this.#states.isFirstRender) this.$render();
      },
    },
    "page-count": {
      type: Number,
      default: 7,
      /** @param {number} newVal */
      observer: (newVal) => {},
    },
    total: {
      type: Number,
      default: 0,
      /** @param {number} newVal */
      observer: (newVal) => {
        if (this.#pagination && this.layout.includes("pager"))
          this.#handlePaginationItemChange();
      },
    },
    "current-page": {
      type: Number,
      default: 1,
      /** @param {number} newVal */
      observer: (newVal) => {
        if (this.#pagination && this.layout.includes("pager")) {
          const els = this.#pagination.querySelectorAll(".ea-pagination__page");
          const target = this.#pagination.querySelector(
            `.ea-pagination__page[data-page="${newVal}"]`
          );

          els.forEach((el) => {
            el.classList.toggle("is-active", el === target);
            el.setAttribute("aria-current", el === target);
          });
        }
      },
    },
    background: {
      type: Boolean,
      default: false,
      /** @param {boolean} newVal */
      observer: (newVal) => {},
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist("ea-pagination", {
      // ['--' + this.type]: this.type,
    });

    this.#container.className = className;

    return className;
  }

  constructor() {
    super();

    this.stylesheet = stylesheet;

    this.$render();
    this.#states.isFirstRender = false;
  }

  /**
   * 渲染页码部分
   * @description 这里的事件监听采用的是，通过 `this.#pagination` 点击事件中，获取到的最近的 `页码元素` 来进行事件触发
   */
  // TODO：需要处理页码渲染逻辑，more和 
  #handlePagerRender = () => {
    if (!this.layout.includes("pager") || !this.#pagination) return;

    const totalCount = Math.ceil(this.total / this["page-size"]);
    const renderCount = Math.min(totalCount, this["page-count"]);
    let template = ``;

    this.#paginationAbortController?.abort();
    this.#paginationAbortController = new AbortController();
    this.#pagination.innerHTML = "";

    for (let i = 1; i <= renderCount; i++) {
      template += getPageItem(i, this["current-page"], i);
    }

    this.#pagination.innerHTML = template;

    this.#pagination.addEventListener(
      "click",
      (e) => {
        const target = e.target.closest(".ea-pagination__page");
        const targetPage = Number(target?.dataset?.page) || 1;

        if (target && this["current-page"] !== targetPage) {
          this["current-page"] = target.dataset.page;

          this.#dispatchChangeEvent();
          this.dispatchEvent("current-change", {
            detail: { value: this["current-page"] },
          });
        }
      },
      { signal: this.#paginationAbortController?.signal }
    );
  };

  /**
   * 渲染 prev 按钮
   */
  #handlePrevRender = () => {
    if (!this.layout.includes("prev") || !this.#prevIcon) return;

    this.#prevAbortController?.abort();
    this.#prevAbortController = new AbortController();

    this.#prevIcon.classList.toggle(
      "is-disabled",
      this["current-page"] <= 1 || this.total <= 0
    );
    this.#prevIcon.setAttribute(
      "aria-disabled",
      this["current-page"] <= 1 || this.total <= 0
    );

    this.addEventListener(
      "change",
      (e) => {
        const { currentPage } = e.detail;
        this.#prevIcon.classList.toggle(
          "is-disabled",
          currentPage <= 1 || this.total <= 0
        );
        this.#prevIcon.setAttribute(
          "aria-disabled",
          currentPage <= 1 || this.total <= 0
        );
      },
      { signal: this.#prevAbortController?.signal }
    );

    this.#prevIcon.addEventListener(
      "click",
      () => {
        if (this["current-page"] <= 1 || this.total <= 0) return;

        this["current-page"]--;

        this.#dispatchChangeEvent();
        this.dispatchEvent("prev-click", {
          detail: { value: this["current-page"] },
        });
        this.dispatchEvent("current-change", {
          detail: { value: this["current-page"] },
        });
      },
      { signal: this.#prevAbortController?.signal }
    );
  };

  /**
   * 渲染 next 按钮
   */
  #handleNextRender = () => {
    if (!this.layout.includes("next") || !this.#nextIcon) return;

    this.#nextAbortController?.abort();
    this.#nextAbortController = new AbortController();

    const computedIsOverflow = (page = this["current-page"]) =>
      page >= Math.ceil(this.total / this["page-size"]);

    this.#nextIcon.classList.toggle("is-disabled", computedIsOverflow());
    this.#nextIcon.setAttribute("aria-disabled", computedIsOverflow());

    this.addEventListener(
      "change",
      (e) => {
        const { currentPage } = e.detail;
        this.#nextIcon.classList.toggle("is-disabled");
        this.#nextIcon.setAttribute(
          "aria-disabled",
          computedIsOverflow(currentPage)
        );
      },
      { signal: this.#nextAbortController?.signal }
    );

    this.#nextIcon.addEventListener(
      "click",
      () => {
        if (computedIsOverflow()) return;

        this["current-page"]++;

        this.#dispatchChangeEvent();
        this.dispatchEvent("next-click", {
          detail: { value: this["current-page"] },
        });
        this.dispatchEvent("current-change", {
          detail: { value: this["current-page"] },
        });
      },
      { signal: this.#nextAbortController?.signal }
    );
  };

  /**
   *
   * @param {Number} currentPage 当前页码
   * @param {Number} pageSize 每页数量
   */
  #dispatchChangeEvent(
    currentPage = this["current-page"],
    pageSize = this["page-size"]
  ) {
    this.dispatchEvent("change", {
      detail: {
        currentPage,
        pageSize,
      },
    });
  }

  // 处理分页的页码
  #handlePaginationItemChange() {
    this.#handlePagerRender();
    this.#handlePrevRender();
    this.#handleNextRender();

    // const interval = Math.floor(this.pageCount / 2);
    // let start = this.currentPage - interval;
    // let end = this.currentPage + interval;
    // // 边界处理
    // if (start <= 1) {
    //   start = 1;
    //   end =
    //     this.pageCount < this.paginationCount
    //       ? this.pageCount
    //       : this.paginationCount;
    // } else if (end >= this.paginationCount) {
    //   start = this.paginationCount - this.pageCount + 1;
    //   end = this.paginationCount;
    // } else {
    //   end--;
    // }
    // 添加页码
    // for (let i = start; i <= end; i++) {
    //   const pageItem = getPageItem(i, this.background);
    //   this.#paginationWrap.appendChild(pageItem);
    //   // 设置当前页码选中后的样式
    //   if (i === this.currentPage) {
    //     pageItem.classList.add("ea-pagination_item--active");
    //     if (this.background) pageItem.classList.add("active");
    //   }
    //   // 添加点击事件
    //   this.#handlePaginationClick(pageItem, i);
    // }
    // 添加 更多(左) + 第一页
    // if (
    //   this.total > this.pageCount &&
    //   this.currentPage >= this.pageCount &&
    //   this.paginationCount !== this.pageCount
    // ) {
    //   const more = getMoreItem("prev", this.background);
    //   this.#handleMoreItemClick(more, "prev");
    //   const firstPage = getPageItem(1, this.background);
    //   this.#handlePaginationClick(firstPage, 1);
    //   this.#paginationWrap.insertBefore(more, this.#paginationWrap.firstChild);
    //   this.#paginationWrap.insertBefore(
    //     firstPage,
    //     this.#paginationWrap.firstChild
    //   );
    // }
    // 添加 更多(右) + 最后一页
    // if (
    //   this.total > this.pageCount &&
    //   this.currentPage < this.paginationCount - interval &&
    //   this.paginationCount !== this.pageCount
    // ) {
    //   const more = getMoreItem("next", this.background);
    //   this.#handleMoreItemClick(more, "next");
    //   const lastPage = getPageItem(this.paginationCount, this.background);
    //   this.#handlePaginationClick(lastPage, this.paginationCount);
    //   this.#paginationWrap.appendChild(more);
    //   this.#paginationWrap.appendChild(lastPage);
    // }
  }

  $render() {
    /** @type {Array<'prev' | 'pager' | 'next' | '->' | 'jumper' | 'total' | 'sizes'>} */
    const validLayout = this.layout.filter((item) =>
      ["prev", "pager", "next", "jumper", "total", "sizes", "->"].includes(item)
    );
    const layoutTemplate = {
      prev: `<ea-icon class="ea-pagination__icon prev-icon" icon='icon-angle-left' part='icon prev-icon'></ea-icon>`,
      pager: `<section class='ea-pagination__pager' part='pager'></section>`,
      next: `<ea-icon class="ea-pagination__icon next-icon" icon='icon-angle-right' part='icon next-icon'></ea-icon>`,
    };

    this.shadowRoot.innerHTML = `
      <div class='ea-pagination' part='container'>
        ${validLayout.map((item) => layoutTemplate[item]).join("")}
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-pagination");
    this.#pagination = this.shadowRoot.querySelector(".ea-pagination__pager");
    this.#prevIcon = this.shadowRoot.querySelector(
      ".ea-pagination__icon.prev-icon"
    );
    this.#nextIcon = this.shadowRoot.querySelector(
      ".ea-pagination__icon.next-icon"
    );
  }

  connectedCallback() {
    super.connectedCallback();
  }

  $beforeUnmounted() {
    this.#paginationAbortController?.abort();
    this.#prevAbortController?.abort();
  }
}

if (!window.customElements.get("ea-pagination")) {
  window.customElements.define("ea-pagination", EaPagination);
}
