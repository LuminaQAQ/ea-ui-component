import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import { property } from "@decorator/property";
import { Enum } from "@/utils/Enum";
import { html } from "@/utils/html";
import { getPageItem } from "./components/pageItem.js";
import { getMoreItem } from "./components/moreItem.js";
import { EaPaginationCurrentChangeEvent } from "./events/EaPaginationCurrentChangeEvent";
import { EaPaginationPrevClickEvent } from "./events/EaPaginationPrevClickEvent";
import { EaPaginationNextClickEvent } from "./events/EaPaginationNextClickEvent";
import { EaPaginationSizeChangeEvent } from "./events/EaPaginationSizeChangeEvent";
import stylesheet from "./index.scss?inline";
import "@/components/ea-icon/index";

const TAG_NAME = "ea-pagination" as const;
const bem = createBEM(TAG_NAME);

export type PaginationSize = "large" | "default" | "small";
export type PaginationLayoutItem =
  | "prev"
  | "pager"
  | "next"
  | "jumper"
  | "total"
  | "sizes"
  | "->";

const LAYOUT_TEMPLATE: Record<string, string> = {
  prev: `<ea-icon class="ea-pagination__icon prev-icon" name='angle-left' part='icon prev-icon' tabindex="0"></ea-icon>`,
  pager: `<section class='ea-pagination__pager' part='pager'></section>`,
  next: `<ea-icon class="ea-pagination__icon next-icon" name='angle-right' part='icon next-icon' tabindex="0"></ea-icon>`,
  total: `<span class='ea-pagination__total' part='total'></span>`,
  jumper: `<span class="ea-pagination__wrapper" part='jumper-wrap'>Go to <ea-input class='ea-pagination__jumper' part='jumper'></ea-input> </span>`,
  sizes: `<ea-select class='ea-pagination__sizes' part='sizes'></ea-select>`,
  "->": `<span class='ea-pagination__separator' part='separator'></span>`,
};

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaPagination extends EaBase {
  // ==================== DOM 元素引用 ====================

  @query(".ea-pagination")
  private _container!: HTMLElement;

  @query(".ea-pagination__pager")
  private _pagination!: HTMLElement;

  @query(".ea-pagination__icon.prev-icon")
  private _prevIcon!: HTMLElement;

  @query(".ea-pagination__icon.next-icon")
  private _nextIcon!: HTMLElement;

  @query(".ea-pagination__jumper")
  private _jumper!: any;

  @query(".ea-pagination__total")
  private _total!: HTMLElement;

  @query(".ea-pagination__sizes")
  private _sizes!: any;

  private _states = {
    isFirstRender: true,
    isEaInputImported: false,
    isEaSelectImported: false,
  };

  private _abortControllerStates = {
    paginationAbortController: null as AbortController | null,
    prevAbortController: null as AbortController | null,
    nextAbortController: null as AbortController | null,
    jumperAbortController: null as AbortController | null,
    sizesAbortController: null as AbortController | null,
  };

  @attribute({
    type: Number,
    default: 10,
    observer(this: EaPagination) {
      if (!this._states.isFirstRender) this._handlePaginationItemChange();
    },
  })
  defaultPageSize: number = 10;

  @attribute({
    type: Number,
    default: function (this: EaPagination) {
      return this.defaultPageSize;
    },
    observer(this: EaPagination, newVal: number) {
      if (!this._states.isFirstRender) {
        this._handlePaginationItemChange(true);

        this.dispatchEvent(
          new EaPaginationSizeChangeEvent({
            pageSize: newVal,
          })
        );
      }
    },
  })
  pageSize: number = 10;

  @attribute({
    type: Number,
    default: 7,
    observer(this: EaPagination) {},
  })
  pagerCount: number = 7;

  @attribute({
    type: Number,
    default: 0,
    observer(this: EaPagination) {
      if (this._pagination && this.layout.includes("pager"))
        this._handlePaginationItemChange();

      if (this.hideOnSinglePage) this.updateContainerClasslist();
    },
  })
  total: number = 0;

  @attribute({
    type: Number,
    default: 1,
    observer(this: EaPagination, newVal: number) {
      if (this._states.isFirstRender) return;

      this._updatePaginationStyle(newVal);

      if (this._jumper && this.layout?.includes("jumper")) {
        this._jumper.value = newVal;
      }

      this.emit("change", {
        detail: {
          currentPage: newVal,
          pageSize: this.pageSize,
        },
      });

      this.dispatchEvent(new EaPaginationCurrentChangeEvent({ value: newVal }));

      this.updateContainerClasslist();
    },
  })
  currentPage: number = 1;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaPagination) {
      this.updateContainerClasslist();
    },
  })
  background: boolean = false;

  @attribute({
    type: Enum(["large", "default", "small"]),
    default: "",
    observer(this: EaPagination, newVal: string) {
      if (this._sizes) {
        this._sizes.setAttribute("size", newVal);
      }

      if (this._jumper) {
        this._jumper.setAttribute("size", newVal);
      }

      this.updateContainerClasslist();
    },
  })
  size: PaginationSize | "" = "";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaPagination) {
      if (this._pagination && this.layout.includes("pager")) {
        this.updateContainerClasslist();
      }
    },
  })
  hideOnSinglePage: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaPagination, newVal: boolean) {
      this.updateContainerClasslist();

      if (this.layout.includes("jumper") && this._jumper) {
        this._jumper.disabled = newVal;
      }
    },
  })
  disabled: boolean = false;

  @property({
    type: Array,
    default: [10, 20, 30, 40, 50, 100],
    observer(this: EaPagination) {
      if (!this._states.isFirstRender) this._handlePaginationItemChange();
    },
  })
  pageSizes: number[] = [10, 20, 30, 40, 50, 100];

  @property({
    type: Array,
    default: ["prev", "pager", "next", "jumper", "->", "total"],
    observer(this: EaPagination) {
      if (!this._states.isFirstRender) this._handlePaginationItemChange();
    },
  })
  layout: PaginationLayoutItem[] = [
    "prev",
    "pager",
    "next",
    "jumper",
    "->",
    "total",
  ];

  updateContainerClasslist(): string {
    const className = bem(
      {
        background: this.background,
        size: this.size || false,
      },
      {
        hide:
          this.hideOnSinglePage && Math.ceil(this.total / this.pageSize) <= 1,
        disabled: this.disabled,
      }
    );

    if (!this._states.isFirstRender && this._container)
      this._container.className = className;

    return className;
  }

  constructor() {
    super();
  }

  /**
   * 生成分页布局 HTML
   * @returns 布局 HTML 字符串
   */
  private _getLayoutHTML(): string {
    const validLayout = this.layout.filter(item =>
      ["prev", "pager", "next", "jumper", "total", "sizes", "->"].includes(
        item as string
      )
    );
    return validLayout
      .map(item => LAYOUT_TEMPLATE[item as string] || "")
      .join("");
  }

  html(): string {
    return `
			<div class='${bem()}' part='container'>
				${this._getLayoutHTML()}
			</div>
		`;
  }

  /**
   * 更新分页器样式和激活状态
   * @param currentPage 当前页码
   */
  private _updatePaginationStyle(currentPage: number = this.currentPage): void {
    if (!this._pagination || !this.layout?.includes("pager")) return;

    this._pagination.innerHTML = html(this._getPagerTemplate(currentPage));

    const els = this._pagination.querySelectorAll(".ea-pagination__page");
    const target = this._pagination.querySelector(
      `.ea-pagination__page[data-page="${currentPage}"]`
    );

    els.forEach(el => {
      el.classList.toggle("is-active", el === target);
      el.setAttribute("aria-current", String(el === target));
    });
  }

  /**
   * 计算分页器显示的页码范围
   * @param currentPage 当前页码
   * @returns 包含数字和省略号的页码数组
   */
  private _getPagerRange(newVal: number): (number | string)[] {
    const totalCount = Math.ceil(this.total / this.pageSize);
    const step = Math.floor(this.pagerCount / 2);

    const getRange = (start: number, end: number): number[] => {
      const ary: number[] = [];
      for (let i = start; i <= end; i++) {
        ary.push(i);
      }
      return ary;
    };

    const range = getRange(
      Math.max(
        2,
        newVal + step > totalCount
          ? newVal - step + 1 - Math.abs(totalCount - newVal - step)
          : newVal - step + 1
      ),
      Math.min(
        totalCount - 1,
        newVal - step < 2
          ? newVal + step - 1 + Math.abs(newVal - step - 1)
          : newVal + step - 1
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
  }

  /**
   * 生成分页器 HTML 模板
   * @param currentPage 当前页码
   * @returns 分页器 HTML 字符串
   */
  private _getPagerTemplate(currentPage: number = 1): string {
    let template = "";

    const range = this._getPagerRange(currentPage);
    range.forEach((item, index) => {
      if (typeof item === "number") {
        template += getPageItem(item, this.currentPage, item);
      } else {
        template += getMoreItem(
          "...",
          range[index - 1] === range[0] ? "prev" : "next"
        );
      }
    });

    return template;
  }

  private _handlePagerRender(): void {
    if (!this._pagination) return;
    if (!this.layout.includes("pager")) {
      this._pagination.innerHTML = "";
      return;
    }

    const onPagerClickEvent = (e: MouseEvent) => {
      const target = (e.target as Element).closest(
        ".ea-pagination__page:not(.ea-pagination__more)"
      );
      const moreItem = (e.target as Element).closest(".ea-pagination__more");
      const targetPage = Number((target as HTMLElement)?.dataset?.page);

      if (target && this.currentPage !== targetPage) {
        this.currentPage = targetPage;
      } else if (moreItem) {
        const action = (moreItem as HTMLElement).dataset.action;
        const totalPage = Math.ceil(this.total / this.pageSize);
        let realPage = this.currentPage + (action === "next" ? 5 : -5);

        if (realPage < 1) realPage = 1;
        else if (realPage > totalPage) realPage = totalPage;

        this.currentPage = realPage;
      }
    };

    this._pagination.innerHTML = html(this._getPagerTemplate(1));

    this._pagination.addEventListener("click", onPagerClickEvent, {
      signal: this._abortControllerStates.paginationAbortController!.signal,
    });
  }

  /**
   * 渲染上一页按钮并绑定事件
   */
  private _handlePrevRender(): void {
    if (!this._prevIcon || !this.layout.includes("prev")) return;

    const handlePageChange = (currentPage: number = this.currentPage) => {
      this._prevIcon.classList.toggle(
        "is-disabled",
        currentPage <= 1 || this.total <= 0
      );
      this._prevIcon.setAttribute(
        "aria-disabled",
        String(currentPage <= 1 || this.total <= 0)
      );
      this._prevIcon.setAttribute(
        "tabindex",
        currentPage <= 1 || this.total <= 0 ? "-1" : "0"
      );
    };

    const onCurrentPageChangeEvent = (e: Event) => {
      const { currentPage } = (e as CustomEvent).detail;
      handlePageChange(currentPage);
    };

    const onPrevIconClickEvent = () => {
      if (this.currentPage <= 1 || this.total <= 0) return;

      this.currentPage--;

      this.dispatchEvent(
        new EaPaginationPrevClickEvent({ value: this.currentPage })
      );
    };

    handlePageChange();

    this.addEventListener("change", onCurrentPageChangeEvent, {
      signal: this._abortControllerStates.prevAbortController!.signal,
    });
    this._prevIcon.addEventListener("click", onPrevIconClickEvent, {
      signal: this._abortControllerStates.prevAbortController!.signal,
    });
  }

  private _handleNextRender(): void {
    if (!this.layout.includes("next") || !this._nextIcon) return;

    const computedIsOverflow = (page: number = this.currentPage): boolean =>
      page >= Math.ceil(this.total / this.pageSize);

    const handlePageChange = (isOverflow: boolean = computedIsOverflow()) => {
      this._nextIcon.classList.toggle("is-disabled", isOverflow);
      this._nextIcon.setAttribute("aria-disabled", String(isOverflow));
      this._nextIcon.setAttribute("tabindex", isOverflow ? "-1" : "0");
    };

    const onCurrentPageChangeEvent = (e: Event) => {
      const { currentPage } = (e as CustomEvent).detail;
      handlePageChange(computedIsOverflow(currentPage));
    };

    const onNextIconClick = () => {
      if (computedIsOverflow()) return;

      this.currentPage++;

      this.dispatchEvent(
        new EaPaginationNextClickEvent({ value: this.currentPage })
      );
    };

    handlePageChange();

    this.addEventListener("change", onCurrentPageChangeEvent, {
      signal: this._abortControllerStates.nextAbortController!.signal,
    });
    this._nextIcon.addEventListener("click", onNextIconClick, {
      signal: this._abortControllerStates.nextAbortController!.signal,
    });
  }

  private _handleTotalRender(): void {
    if (!this.layout.includes("total") || !this._total) return;

    this._total.textContent = `Total ${this.total}`;
  }

  /**
   * 渲染跳转输入框并绑定事件
   */
  private async _handleJumperRender(): Promise<void> {
    if (!this.layout.includes("jumper") || !this._jumper) return;

    const handleJumperChange = () => {
      const value = this._jumper.value;
      const totalCount = Math.ceil(this.total / this.pageSize);

      if (!isNaN(Number(value)) && value !== "" && value <= totalCount) {
        this.currentPage = value;
      } else {
        this._jumper.value = this.currentPage;
      }
    };

    const onJumpEvent = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleJumperChange();
      }
    };

    const onPaginationChangeEvent = (e: Event) => {
      this._jumper.value = (e as CustomEvent).detail.currentPage;
    };

    this._jumper.setAttribute("value", String(this.currentPage));

    this._jumper.addEventListener("blur", handleJumperChange, {
      signal: this._abortControllerStates.jumperAbortController!.signal,
    });
    this._jumper.addEventListener("keydown", onJumpEvent, {
      signal: this._abortControllerStates.jumperAbortController!.signal,
    });
    this.addEventListener("change", onPaginationChangeEvent, {
      signal: this._abortControllerStates.jumperAbortController!.signal,
    });
  }

  /**
   * 渲染每页条数选择器并绑定事件
   */
  private async _handleSizesRender(): Promise<void> {
    if (!this.layout.includes("sizes") || !this._sizes) return;

    const renderCallback = (size: number): string => {
      return `<ea-option value="${size}" ${size === this.pageSize ? "selected" : ""}>${size}/page</ea-option>`;
    };

    const onSizesChangeEvent = (e: Event) => {
      (e as Event).stopImmediatePropagation?.();
      if (this._states.isFirstRender) return;

      this.pageSize = (e.target as any).value;
      this.currentPage = Math.min(
        this.currentPage,
        Math.ceil(this.total / this.pageSize)
      );
    };

    if (!this.pageSizes?.includes(this.pageSize)) {
      this.pageSize = this.pageSizes[0];
    }

    this._sizes.innerHTML = html(this.pageSizes.map(renderCallback).join(""));
    this._sizes.value = this.pageSize;

    this._sizes.addEventListener("change", onSizesChangeEvent, {
      signal: this._abortControllerStates.sizesAbortController!.signal,
    });
  }

  private async _handlePaginationItemChange(
    skipInnerHTML = false
  ): Promise<void> {
    for (const key in this._abortControllerStates) {
      this._abortControllerStates[
        key as keyof typeof this._abortControllerStates
      ]?.abort();
      (this._abortControllerStates as any)[key] = null;
    }

    if (this.layout?.includes("jumper") && !this._states.isEaInputImported) {
      await import("@components/ea-input/index.js");
      await customElements.whenDefined("ea-input");
      this._states.isEaInputImported = true;
    }

    if (this.layout?.includes("sizes") && !this._states.isEaSelectImported) {
      await import("@components/ea-select/index.js");
      await customElements.whenDefined("ea-select");
      this._states.isEaSelectImported = true;
    }

    for (const key in this._abortControllerStates) {
      (this._abortControllerStates as any)[key] = new AbortController();
    }

    if (this._container && !skipInnerHTML) {
      this._container.innerHTML = html(this._getLayoutHTML());
    }

    this._handleSizesRender();
    this._handlePagerRender();
    this._handlePrevRender();
    this._handleNextRender();
    this._handleTotalRender();
    this._handleJumperRender();
  }

  async $mount(): Promise<void> {
    await this._handlePaginationItemChange();

    this._states.isFirstRender = false;

    this.updateContainerClasslist();
  }

  $beforeUnmount(): void {
    for (const key in this._abortControllerStates) {
      this._abortControllerStates[
        key as keyof typeof this._abortControllerStates
      ]?.abort();
      (this._abortControllerStates as any)[key] = null;
    }
  }
}

export default EaPagination;
