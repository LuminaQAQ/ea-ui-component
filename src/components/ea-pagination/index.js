import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";
import EaUtils from "@/utils/Utils";

export class EaPagination extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #pagination;
  /** @type {HTMLElement} */
  #prevIcon;
  /** @type {HTMLElement} */
  #nextIcon;

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

  // 处理分页的页码
  #handlePaginationItemChange() {
    if (!this.layout.includes("pager") || !this.#pagination) return;

    this.#pagination.innerHTML = "";

    const page
    for (let i = 1; i <= Math.ceil(this.total / this["page-size"]) ; i++) {
      this.#pagination.innerHTML = EaUtils.EaElement.h(
        "span",
        "ea-pagination__page",
        {
          part: "page",
          "aria-label": `page ${i}`,
          "aria-current": false,
        },
        i
      );
    }

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
      pager: `<section class='ea-pagination__pages' part='pages'></section>`,
      next: `<ea-icon class="ea-pagination__icon next-icon" icon='icon-angle-right' part='icon next-icon'></ea-icon>`,
    };

    this.shadowRoot.innerHTML = `
      <div class='ea-pagination' part='container'>
        ${validLayout.map((item) => layoutTemplate[item]).join("")}
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-pagination");
    this.#pagination = this.shadowRoot.querySelector(".ea-pagination__pages");
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
}

if (!window.customElements.get("ea-pagination")) {
  window.customElements.define("ea-pagination", EaPagination);
}
