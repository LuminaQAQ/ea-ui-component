import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";
import EaUtils from "@/utils/Utils";
import { getPageItem } from "./components/pageItem";
import { getMoreItem } from "./components/moreItem";

import { EA_COMPONENT_SIZES } from "@utils/Variables";
import { EaPaginationCurrentChangeEvent } from "./events/EaPaginationCurrentChangeEvent";
import { EaPaginationPrevClickEvent } from "./events/EaPaginationPrevClickEvent";
import { EaPaginationNextClickEvent } from "./events/EaPaginationNextClickEvent";
import { EaPaginationSizeChangeEvent } from "./events/EaPaginationSizeChangeEvent";

export class EaPagination extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #pagination;
  /** @type {HTMLElement} */
  #prevIcon;
  /** @type {HTMLElement} */
  #nextIcon;
  /** @type {HTMLElement} */
  #jumper;
  /** @type {HTMLElement} */
  #total;
  /** @type {HTMLElement} */
  #sizes;

  #states = {
    isFirstRender: true,
    isEaInputImported: false,
    isEaSelectImported: false,
  };

  #AbortControllerStates = {
    /** @type {AbortController | null} */
    paginationAbortController: null,
    /** @type {AbortController | null} */
    prevAbortController: null,
    /** @type {AbortController | null} */
    nextAbortController: null,
    /** @type {AbortController | null} */
    jumperAbortController: null,
    /** @type {AbortController | null} */
    sizesAbortController: null,
  };

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "default-page-size",
      "page-size",
      "pager-count",
      "total",
      "background",
      "current-page",
      "hide-on-single-page",
      "size",
      "disabled",
    ];
  }

  state = this.properties({
    "default-page-size": {
      type: Number,
      default: 10,
      /** @param {number} newVal */
      observer: () => {
        if (!this.#states.isFirstRender) this.#handlePaginationItemChange();
      },
    },
    "page-size": {
      type: Number,
      default: () => this["default-page-size"],
      /** @param {number} newVal */
      observer: newVal => {
        if (!this.#states.isFirstRender) {
          this.#handlePaginationItemChange();

          this.dispatchEvent(
            new EaPaginationSizeChangeEvent({
              pageSize: newVal,
            })
          );
        }
      },
    },
    "pager-count": {
      type: Number,
      default: 7,
      /** @param {number} newVal */
      observer: () => {},
    },
    total: {
      type: Number,
      default: 0,
      /** @param {number} newVal */
      observer: () => {
        if (this.#pagination && this.layout.includes("pager"))
          this.#handlePaginationItemChange();

        if (this["hide-on-single-page"]) this.updateContainerClasslist();
      },
    },
    "current-page": {
      type: Number,
      default: 1,
      /** @param {number} newVal */
      observer: newVal => {
        if (this.#states.isFirstRender) return;

        this.#updatePaginationStyle(newVal);

        if (this.#jumper && this.layout?.includes("jumper")) {
          this.#jumper.value = newVal;
        }

        this.emit("change", {
          detail: {
            currentPage: newVal,
            pageSize: this["page-size"],
          },
        });

        this.dispatchEvent(
          new EaPaginationCurrentChangeEvent({ value: newVal })
        );

        this.updateContainerClasslist();
      },
    },
    background: {
      type: Boolean,
      default: false,
      observer: () => {
        this.updateContainerClasslist();
      },
    },
    size: {
      type: EA_COMPONENT_SIZES,
      default: "",
      observer: newVal => {
        if (this.#sizes) {
          this.#sizes.setAttribute("size", newVal);
        }

        if (this.#jumper) {
          this.#jumper.setAttribute("size", newVal);
        }

        this.updateContainerClasslist();
      },
    },
    "hide-on-single-page": {
      type: Boolean,
      default: false,
      observer: () => {
        if (this.#pagination && this.layout.includes("pager")) {
          this.updateContainerClasslist();
        }
      },
    },
    disabled: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.updateContainerClasslist();

        if (this.layout.includes("jumper") && this.#jumper) {
          this.#jumper.disabled = newVal;
        }
      },
    },
  });

  propState = this.properties({
    pageSizes: {
      type: Array,
      default: [10, 20, 30, 40, 50, 100],
      /** @param {Array<number>} newVal */
      observer: newVal => {
        if (!this.#states.isFirstRender) this.#handlePaginationItemChange();
      },
    },
    layout: {
      props: true,
      type: Array,
      default: ["prev", "pager", "next", "jumper", "->", "total"],
      /** @param {Array<'prev' | 'pager' | 'next' | '->' | 'jumper' | 'total' | 'sizes'>} newVal */
      observer: newVal => {
        if (!this.#states.isFirstRender) this.#handlePaginationItemChange();
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
        disabled: this.disabled,
      }
    );

    if (!this.#states.isFirstRender) this.#container.className = className;

    return className;
  }

  constructor() {
    super();

    this.stylesheet = stylesheet;
  }

  $render() {
    /** @type {Array<'prev' | 'pager' | 'next' | '->' | 'jumper' | 'total' | 'sizes'>} */
    const validLayout = this.layout.filter(item =>
      ["prev", "pager", "next", "jumper", "total", "sizes", "->"].includes(item)
    );
    const layoutTemplate = {
      prev: `<ea-icon class="ea-pagination__icon prev-icon" icon='icon-angle-left' part='icon prev-icon' tabindex="0"></ea-icon>`,
      pager: `<section class='ea-pagination__pager' part='pager'></section>`,
      next: `<ea-icon class="ea-pagination__icon next-icon" icon='icon-angle-right' part='icon next-icon' tabindex="0"></ea-icon>`,
      total: `<span class='ea-pagination__total' part='total'></span>`,
      jumper: `<span class="ea-pagination__wrapper" part='jumper-wrap'>Go to <ea-input class='ea-pagination__jumper' part='jumper'></ea-input> </span>`,
      sizes: `<ea-select class='ea-pagination__sizes' part='sizes'></ea-select>`,
      "->": `<span class='ea-pagination__separator' part='separator'></span>`,
    };

    this.shadowRoot.innerHTML = `
      <div class='ea-pagination' part='container'>
        ${validLayout.map(item => layoutTemplate[item]).join("")}
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
    this.#jumper = this.shadowRoot.querySelector(".ea-pagination__jumper");
    this.#total = this.shadowRoot.querySelector(".ea-pagination__total");
    this.#sizes = this.shadowRoot.querySelector(".ea-pagination__sizes");

    this.updateContainerClasslist();
  }

  /**
   * 更新页码样式
   * @param {Number} [currentPage]
   */
  #updatePaginationStyle = (currentPage = this["current-page"]) => {
    if (!this.#pagination || !this.layout?.includes("pager")) return;

    this.#pagination.innerHTML = this.#getPagerTemplate(currentPage);

    const els = this.#pagination.querySelectorAll(".ea-pagination__page");
    const target = this.#pagination.querySelector(
      `.ea-pagination__page[data-page="${currentPage}"]`
    );

    els.forEach(el => {
      el.classList.toggle("is-active", el === target);
      el.setAttribute("aria-current", el === target);
    });
  };

  /**
   * 获取分页器范围
   * @param {number} newVal 当前页码
   * @return {Array<number | string>} 分页器范围
   */
  #getPagerRange = newVal => {
    const totalCount = Math.ceil(this.total / this["page-size"]);
    const step = Math.floor(this["pager-count"] / 2);

    /**
     * 获取范围
     * @param {number} start 开始值
     * @param {number} end 结束值
     * @return {Array<number>} 范围数组
     */
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
   * 获取页码模板
   * @param {Number} currentPage 当前页码
   * @returns {String}
   */
  #getPagerTemplate = (currentPage = 1) => {
    let template = ``;

    const range = this.#getPagerRange(currentPage);
    range.forEach((item, index) => {
      if (typeof item === "number") {
        template += getPageItem(item, this["current-page"], item);
      } else {
        template += getMoreItem(
          "...",
          range[index - 1] === range[0] ? "prev" : "next"
        );
      }
    });

    return template;
  };

  /**
   * 渲染页码部分
   * @description 这里的事件监听采用的是，通过 `this.#pagination` 点击事件中，获取到的最近的 `页码元素` 来进行事件触发
   */
  #handlePagerRender = () => {
    if (!this.#pagination) return;
    if (!this.layout.includes("pager")) {
      this.#pagination.innerHTML = "";
      return;
    }

    /**
     * 处理页码点击事件，通过父元素确定是 `页码` 还是 `More` 元素
     * @param {MouseEvent} e
     */
    const onPagerClickEvent = e => {
      const target = e.target.closest(
        ".ea-pagination__page:not(.ea-pagination__more)"
      );
      const moreItem = e.target.closest(".ea-pagination__more");
      const targetPage = Number(target?.dataset?.page);

      if (target && this["current-page"] !== targetPage) {
        this["current-page"] = target.dataset.page;
      } else if (moreItem) {
        const action = moreItem.dataset.action;
        const totalPage = Math.ceil(this.total / this["page-size"]);
        let realPage = this["current-page"] + (action === "next" ? 5 : -5);

        if (realPage < 1) realPage = 1;
        else if (realPage > totalPage) realPage = totalPage;

        this["current-page"] = realPage;
      }
    };

    this.#pagination.innerHTML = this.#getPagerTemplate(1);

    this.#pagination.addEventListener("click", onPagerClickEvent, {
      signal: this.#AbortControllerStates.paginationAbortController.signal,
    });
  };

  /**
   * 渲染 prev 按钮
   */
  #handlePrevRender = () => {
    if (!this.#prevIcon || !this.layout.includes("prev")) return;

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

    /**
     * 当前页更新时，更新 prev 按钮状态
     * @param {Event} e
     */
    const onCurrentPageChangeEvent = e => {
      const { currentPage } = e.detail;
      handlePageChange(currentPage);
    };

    /**
     * 下一页的事件
     * @param {number} currentPage
     */
    const onPrevIconClickEvent = () => {
      if (this["current-page"] <= 1 || this.total <= 0) return;

      this["current-page"]--;

      this.dispatchEvent(
        new EaPaginationPrevClickEvent({ value: this["current-page"] })
      );
    };

    handlePageChange();

    this.addEventListener("change", onCurrentPageChangeEvent, {
      signal: this.#AbortControllerStates.prevAbortController.signal,
    });
    this.#prevIcon.addEventListener("click", onPrevIconClickEvent, {
      signal: this.#AbortControllerStates.prevAbortController.signal,
    });
  };

  /**
   * 渲染 next 按钮
   */
  #handleNextRender = () => {
    if (!this.layout.includes("next") || !this.#nextIcon) return;

    /**
     * 计算 next 按钮是否禁用
     * @param {Number} page
     * @returns {Boolean}
     */
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

    /**
     * 当页码改变时，处理 `prev` 按钮的状态
     * @param {Number} currentPage
     */
    const onCurrentPageChangeEvent = e => {
      const { currentPage } = e.detail;
      handlePageChange(computedIsOverflow(currentPage));
    };

    /**
     * 处理 `next` 按钮的状态
     */
    const onNextIconClick = () => {
      if (computedIsOverflow()) return;

      this["current-page"]++;

      this.dispatchEvent(
        new EaPaginationNextClickEvent({ value: this["current-page"] })
      );
    };

    handlePageChange();

    this.addEventListener("change", onCurrentPageChangeEvent, {
      signal: this.#AbortControllerStates.nextAbortController.signal,
    });
    this.#nextIcon.addEventListener("click", onNextIconClick, {
      signal: this.#AbortControllerStates.nextAbortController.signal,
    });
  };

  /**
   * 渲染 total
   */
  #handleTotalRender = () => {
    if (!this.layout.includes("total") || !this.#total) return;

    this.#total.textContent = `Total ${this.total}`;
  };

  /**
   * 渲染 jumper
   */
  #handleJumperRender = async () => {
    if (!this.layout.includes("jumper") || !this.#jumper) return;

    /**
     * 当输入框内容改变时，处理跳转
     */
    const handleJumperChange = () => {
      const value = this.#jumper.value;
      const totalCount = Math.ceil(this.total / this["page-size"]);

      if (
        EaUtils.Number.isNumber(value) &&
        value !== "" &&
        value <= totalCount
      ) {
        this["current-page"] = value;
      } else {
        this.#jumper.value = this["current-page"];
      }
    };

    /**
     * 当按下回车键时，处理跳转
     * @param {KeyboardEvent} e
     */
    const onJumpEvent = e => {
      if (e.key === "Enter") {
        handleJumperChange();
      }
    };

    /**
     * 当分页改变时，处理跳转
     * @param {CustomEvent} e
     */
    const onPaginationChangeEvent = e => {
      this.#jumper.value = e.detail.currentPage;
    };

    this.#jumper.setAttribute("value", this["current-page"]);

    this.#jumper.addEventListener("blur", handleJumperChange, {
      signal: this.#AbortControllerStates.jumperAbortController.signal,
    });
    this.#jumper.addEventListener("keydown", onJumpEvent, {
      signal: this.#AbortControllerStates.jumperAbortController.signal,
    });
    this.addEventListener("change", onPaginationChangeEvent, {
      signal: this.#AbortControllerStates.jumperAbortController.signal,
    });
  };

  /**
   * 渲染页数组
   */
  #handleSizesRender = async () => {
    if (!this.layout.includes("sizes") || !this.#sizes) return;

    /**
     * 渲染页数组
     * @param {Number} size
     * @returns {string}
     */
    const renderCallback = size => {
      return EaUtils.EaElement.h(
        "ea-option",
        null,
        {
          value: size,
          selected: size === this["page-size"],
        },
        `${size}/page`
      );
    };

    /**
     * 页数选择器值改变时的事件
     * @param {CustomEvent} e
     * @returns {string}
     */
    const onSizesChangeEvent = e => {
      e.stopImmediatePropagation();
      if (this.#states.isFirstRender) return;

      this["page-size"] = e.target.value;
      this["current-page"] = Math.min(
        this["current-page"],
        Math.ceil(this.total / this["page-size"])
      );
    };

    if (!this.pageSizes?.includes(this["page-size"])) {
      this["page-size"] = this.pageSizes[0];
    }

    this.#sizes.innerHTML = this.pageSizes.map(renderCallback).join("");
    this.#sizes.value = this["page-size"];

    this.#sizes.addEventListener("change", onSizesChangeEvent, {
      signal: this.#AbortControllerStates.sizesAbortController.signal,
    });
  };

  /**
   * 初始化页码带有的元素
   */
  async #handlePaginationItemChange() {
    for (const key in this.#AbortControllerStates) {
      this.#AbortControllerStates[key]?.abort();
      this.#AbortControllerStates[key] = null;
      this.#AbortControllerStates[key] = new AbortController();
    }

    if (this.layout?.includes("jumper") && !this.#states.isEaInputImported) {
      await import("@components/ea-input/index.js");
      await customElements.whenDefined("ea-input");
      this.#states.isEaInputImported = true;
    }

    if (this.layout?.includes("sizes") && !this.#states.isEaSelectImported) {
      await import("@components/ea-select/index.js");
      await customElements.whenDefined("ea-select");
      this.#states.isEaSelectImported = true;
    }

    this.#container = null;
    this.#pagination = null;
    this.#prevIcon = null;
    this.#nextIcon = null;
    this.#jumper = null;
    this.#total = null;
    this.#sizes = null;

    this.$render();

    this.#handleSizesRender();
    this.#handlePagerRender();
    this.#handlePrevRender();
    this.#handleNextRender();
    this.#handleTotalRender();
    this.#handleJumperRender();
  }

  async connectedCallback() {
    super.connectedCallback();

    await this.#handlePaginationItemChange();

    this.#states.isFirstRender = false;
  }

  $beforeUnmounted() {
    for (const key in this.#AbortControllerStates) {
      this.#AbortControllerStates[key]?.abort();
      this.#AbortControllerStates[key] = null;
    }
  }
}

if (!window.customElements.get("ea-pagination")) {
  window.customElements.define("ea-pagination", EaPagination);
}
