import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";
import EaUtils from "@/utils/Utils";
import { getPageItem } from "./components/pageItem";
import { getMoreItem } from "./components/moreItem";

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
      "pager-count",
      "total",
      "background",
      "current-page",
      "hide-on-single-page",
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
    "pager-count": {
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

        if (this["hide-on-single-page"]) this.updateContainerClasslist();
      },
    },
    "current-page": {
      type: Number,
      default: 1,
      /** @param {number} newVal */
      observer: (newVal) => {
        if (this.#pagination && this.layout.includes("pager")) {
          const getTemplate = (currentPage = 1) => {
            let template = ``;

            const range = this.#getPagerRange(currentPage);
            range.forEach((item) => {
              if (typeof item === "number") {
                template += getPageItem(item, this["current-page"], item);
              } else {
                template += getMoreItem("...");
              }
            });

            return template;
          };
          this.#pagination.innerHTML = getTemplate(newVal);

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
      observer: (newVal) => {
        this.updateContainerClasslist();
      },
    },
    size: {
      type: ["large", "default", "small"],
      default: "",
      observer: (newVal) => {
        this.updateContainerClasslist();
      },
    },
    "hide-on-single-page": {
      type: Boolean,
      default: false,
      observer: (newVal) => {
        if (this.#pagination && this.layout.includes("pager"))
          this.updateContainerClasslist();
      },
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist(
      "ea-pagination",
      {
        ["--background"]: this.background,
        [`--size-${this.size}`]: this.size,
      },
      {
        hide:
          this["hide-on-single-page"] &&
          Math.ceil(this.total / this["page-size"]) <= 1,
      }
    );

    this.#container.className = className;

    return className;
  }

  constructor() {
    super();

    this.stylesheet = stylesheet;

    this.$render();

    this.#states.isFirstRender = false;
  }

  #getPagerRange = (newVal) => {
    const totalCount = Math.ceil(this.total / this["page-size"]);
    const step = Math.floor(this["pager-count"] / 2);

    const getRange = (start, end) => {
      const ary = [];

      for (let i = start; i <= end; i++) {
        ary.push(i);
      }

      return ary;
    };

    const range = getRange(
      Math.max(
        2,
        newVal + step > totalCount // 处理 `endRange` 超出范围
          ? /**
             * 当 `endRange` 超出范围时，起始值 = 当前页 - （范围区间 + 1） - 后半多余区间
             * 后半多余区间 = | 总页码数 - 当前页码 - 范围区间 |
             */
            newVal - step + 1 - Math.abs(totalCount - newVal - step)
          : // 因为单独处理开头，所以 `range` 起始要多一位
            newVal - step + 1
      ),
      Math.min(
        totalCount - 1,
        newVal - step < 2 // 处理 startRange 超出范围
          ? /**
             * 当 `startRange` 超出范围时，终止值 = 当前页 + （范围区间 - 1） - 前半多余区间
             * 前半多余区间 = | 当前页码 - 范围区间 - 1 |
             */
            newVal + step - 1 + Math.abs(newVal - step - 1)
          : // 因为单独处理结尾，所以 `range` 结束要少一位
            newVal + step - 1
      )
    );

    if (range[0] > 2 || step === 0) {
      range.unshift(1, "...");
    } else {
      range.unshift(1);
    }

    if (step === 0 && newVal > 1 && newVal < totalCount) {
      range.push(newVal);
    }

    if (
      range[range.length - 1] < totalCount - 1 ||
      (step === 0 && newVal === totalCount - 1)
    ) {
      range.push("...", totalCount);
    } else {
      if (totalCount > 1) range.push(totalCount);
    }

    return range;
  };

  /**
   * 渲染页码部分
   * @description 这里的事件监听采用的是，通过 `this.#pagination` 点击事件中，获取到的最近的 `页码元素` 来进行事件触发
   */
  // TODO：需要处理页码点击逻辑，more和步进器
  #handlePagerRender = () => {
    if (!this.layout.includes("pager") || !this.#pagination) return;
    // if (this["current-page"] === 1 && this["hide-on-single-page"]) return;

    this.#paginationAbortController?.abort();
    this.#paginationAbortController = new AbortController();
    const getTemplate = (currentPage = 1) => {
      let template = ``;

      const range = this.#getPagerRange(currentPage);
      range.forEach((item) => {
        if (typeof item === "number") {
          template += getPageItem(item, this["current-page"], item);
        } else {
          template += getMoreItem(item, this["current-page"], "...");
        }
      });

      return template;
    };
    this.#pagination.innerHTML = getTemplate(1);

    this.#pagination.addEventListener(
      "click",
      (e) => {
        const target = e.target.closest(".ea-pagination__page");
        const targetPage = Number(target?.dataset?.page) || 1;

        if (target && this["current-page"] !== targetPage) {
          this["current-page"] = target.dataset.page;

          this.#dispatchChangeEvent();
          this.emit("current-change", {
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

    /**
     * 当页码改变时，处理 `prev` 按钮的状态
     * @param {Number} currentPage
     */
    const handlePageChange = (currentPage = this["current-page"]) => {
      this.#prevIcon.classList.toggle(
        "is-disabled",
        currentPage <= 1 || this.total <= 0
      );
      this.#prevIcon.setAttribute(
        "aria-disabled",
        currentPage <= 1 || this.total <= 0
      );
      this.#prevIcon.setAttribute(
        "tabindex",
        currentPage <= 1 || this.total <= 0 ? -1 : 0
      );
    };

    handlePageChange();
    this.addEventListener(
      "change",
      (e) => {
        const { currentPage } = e.detail;
        handlePageChange(currentPage);
      },
      { signal: this.#prevAbortController?.signal }
    );

    this.#prevIcon.addEventListener(
      "click",
      () => {
        if (this["current-page"] <= 1 || this.total <= 0) return;

        this["current-page"]--;

        this.#dispatchChangeEvent();
        this.emit("prev-click", {
          detail: { value: this["current-page"] },
        });
        this.emit("current-change", {
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

    /**
     * 当页码改变时，处理 `next` 按钮的状态
     * @param {Number} currentPage
     */
    const handlePageChange = (currentPage = computedIsOverflow()) => {
      this.#nextIcon.classList.toggle("is-disabled", currentPage);
      this.#nextIcon.setAttribute("aria-disabled", currentPage);
      this.#nextIcon.setAttribute("tabindex", currentPage ? -1 : 0);
    };

    handlePageChange();

    this.addEventListener(
      "change",
      (e) => {
        const { currentPage } = e.detail;
        handlePageChange(computedIsOverflow(currentPage));
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
    this.emit("change", {
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
  }

  $render() {
    /** @type {Array<'prev' | 'pager' | 'next' | '->' | 'jumper' | 'total' | 'sizes'>} */
    const validLayout = this.layout.filter((item) =>
      ["prev", "pager", "next", "jumper", "total", "sizes", "->"].includes(item)
    );
    const layoutTemplate = {
      prev: `<ea-icon class="ea-pagination__icon prev-icon" icon='icon-angle-left' part='icon prev-icon' tabindex="0"></ea-icon>`,
      pager: `<section class='ea-pagination__pager' part='pager'></section>`,
      next: `<ea-icon class="ea-pagination__icon next-icon" icon='icon-angle-right' part='icon next-icon' tabindex="0"></ea-icon>`,
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

    this.updateContainerClasslist();
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
