import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, property, query, listen } from "@decorator";
import { html } from "@utils/html";
import { Enum } from "@utils/Enum";
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
  prev: `<ea-icon class="${bem.e("icon")} ${bem.e("icon")}--prev" name="angle-left" part="icon prev-icon" tabindex="0"></ea-icon>`,
  pager: `<section class="${bem.e("pager")}" part="pager"></section>`,
  next: `<ea-icon class="${bem.e("icon")} ${bem.e("icon")}--next" name="angle-right" part="icon next-icon" tabindex="0"></ea-icon>`,
  total: `<span class="${bem.e("total")}" part="total"></span>`,
  jumper: `<span class="${bem.e("wrapper")}" part="jumper-wrap">Go to <ea-input-number class="${bem.e("jumper")}" part="jumper" controls="false" min="1"></ea-input-number> </span>`,
  sizes: `<ea-select class="${bem.e("sizes")}" part="sizes"></ea-select>`,
  "->": `<span class="${bem.e("separator")}" part="separator"></span>`,
};

/**
 * @summary 分页组件，用于数据量过多时的分页处理，支持多种布局和交互模式。
 * @status stable
 * @since 3.0
 *
 * @dependency ea-icon
 * @dependency ea-input-number
 * @dependency ea-select
 *
 * @event ea-current-change - 当前页变化时触发，detail: `{ value: number }`。
 * @event ea-prev-click - 点击上一页按钮时触发，detail: `{ value: number }`。
 * @event ea-next-click - 点击下一页按钮时触发，detail: `{ value: number }`。
 * @event ea-size-change - 每页条数变化时触发，detail: `{ pageSize: number }`。
 *
 * @csspart container - 容器元素。
 * @csspart icon - 图标元素。
 * @csspart prev-icon - 上一页图标元素。
 * @csspart next-icon - 下一页图标元素。
 * @csspart pager - 分页器容器元素。
 * @csspart page - 页码元素。
 * @csspart more - 省略号元素。
 * @csspart total - 总数显示元素。
 * @csspart jumper-wrap - 跳转包裹元素。
 * @csspart jumper - 跳转输入框元素。
 * @csspart sizes - 每页条数选择器元素。
 * @csspart separator - 分隔符元素。
 *
 * @cssproperty --ea-pagination-color - 文本颜色。
 * @cssproperty --ea-pagination-active-color - 激活态颜色。
 * @cssproperty --ea-pagination-disabled-active-color - 禁用激活态颜色。
 * @cssproperty --ea-pagination-disabled-color - 禁用态颜色。
 * @cssproperty --ea-pagination-background - 背景色。
 * @cssproperty --ea-pagination-font-size - 字体大小。
 * @cssproperty --ea-pagination-font-size-small - 小号字体大小。
 * @cssproperty --ea-pagination-font-size-large - 大号字体大小。
 * @cssproperty --ea-pagination-spacing - 内边距。
 * @cssproperty --ea-pagination-spacing-small - 小号内边距。
 * @cssproperty --ea-pagination-spacing-large - 大号内边距。
 * @cssproperty --ea-pagination-jumper-height - 跳转输入框高度。
 * @cssproperty --ea-pagination-jumper-height-small - 小号跳转输入框高度。
 * @cssproperty --ea-pagination-jumper-height-large - 大号跳转输入框高度。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaPagination extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @query(bem.ce("pager"))
  private _pagination!: HTMLElement;

  @query(`${bem.ce("icon")}--prev`)
  private _prevIcon!: HTMLElement;

  @query(`${bem.ce("icon")}--next`)
  private _nextIcon!: HTMLElement;

  @query(bem.ce("jumper"))
  private _jumper!: any;

  @query(bem.ce("total"))
  private _total!: HTMLElement;

  @query(bem.ce("sizes"))
  private _sizes!: any;

  private _isFirstRender: boolean = true;

  private _isEaInputImported: boolean = false;

  private _isEaSelectImported: boolean = false;

  private _jumperAbortController: AbortController | null = null;

  private _sizesAbortController: AbortController | null = null;

  @attribute({
    type: Number,
    default: 10,
    observer(this: EaPagination) {
      if (!this._isFirstRender) this._handlePaginationItemChange();
    },
  })
  defaultPageSize: number = 10;

  @attribute({
    type: Number,
    default: function (this: EaPagination) {
      return this.defaultPageSize;
    },
    observer(this: EaPagination, newVal: number) {
      if (this._isFirstRender) return;

      this._handlePaginationItemChange(true);

      this.dispatchEvent(new EaPaginationSizeChangeEvent({ pageSize: newVal }));
    },
  })
  pageSize: number = 10;

  @attribute({
    type: Number,
    default: 7,
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
      if (this._isFirstRender) return;

      this._updatePaginationStyle(newVal);
      this._updatePrevNextState();

      if (this._jumper && this.layout?.includes("jumper")) {
        if (this._jumper.value !== newVal) {
          this._jumper.value = newVal;
        }
        const totalCount = Math.ceil(this.total / this.pageSize);
        this._jumper.max = totalCount || 1;
      }

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
      if (this._sizes && newVal) {
        this._sizes.setAttribute("size", newVal);
      }

      if (this._jumper && newVal) {
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
      this.updateContainerClasslist();
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

      if (this.layout.includes("sizes") && this._sizes) {
        this._sizes.disabled = newVal;
      }
    },
  })
  disabled: boolean = false;

  @property({
    type: Array,
    default: [10, 20, 30, 40, 50, 100],
    observer(this: EaPagination) {
      if (!this._isFirstRender) this._handlePaginationItemChange();
    },
  })
  pageSizes: number[] = [10, 20, 30, 40, 50, 100];

  @property({
    type: Array,
    default: ["prev", "pager", "next", "jumper", "->", "total"],
    observer(this: EaPagination) {
      if (!this._isFirstRender) this._handlePaginationItemChange();
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

    if (!this._isFirstRender && this._container)
      this._container.className = className;

    return className;
  }

  /** 生成分页布局 HTML */
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
      <div class="${bem()}" part="container">
        ${this._getLayoutHTML()}
      </div>
    `;
  }

  /** 更新分页器样式和激活状态 */
  private _updatePaginationStyle(currentPage: number = this.currentPage): void {
    if (!this._pagination || !this.layout?.includes("pager")) return;

    this._pagination.innerHTML = html(this._getPagerTemplate(currentPage));

    const els = this._pagination.querySelectorAll(bem.ce("page"));
    const target = this._pagination.querySelector(
      `${bem.ce("page")}[data-page="${currentPage}"]`
    );

    els.forEach(el => {
      el.classList.toggle(bem.s("active"), el === target);
      el.setAttribute("aria-current", String(el === target));
    });
  }

  /** 计算分页器显示的页码范围 */
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

    const range: (number | string)[] = getRange(
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

    if ((range[0] as number) > 2 || step === 0) {
      range.unshift(1, "...");
    } else {
      range.unshift(1);
    }

    if (step === 0 && newVal > 1 && newVal < totalCount) {
      range.push(newVal);
    }

    if (
      (range[range.length - 1] as number) < totalCount - 1 ||
      (step === 0 && newVal === totalCount - 1)
    ) {
      range.push("...", totalCount);
    } else {
      if (totalCount > 1) range.push(totalCount);
    }

    return range;
  }

  /** 生成分页器 HTML 模板 */
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

  /** 更新上一页/下一页按钮的禁用状态 */
  private _updatePrevNextState(): void {
    if (this._prevIcon && this.layout.includes("prev")) {
      const isPrevDisabled = this.currentPage <= 1 || this.total <= 0;
      this._prevIcon.classList.toggle(bem.s("disabled"), isPrevDisabled);
      this._prevIcon.setAttribute("aria-disabled", String(isPrevDisabled));
      this._prevIcon.setAttribute("tabindex", isPrevDisabled ? "-1" : "0");
    }

    if (this._nextIcon && this.layout.includes("next")) {
      const isNextDisabled =
        this.currentPage >= Math.ceil(this.total / this.pageSize);
      this._nextIcon.classList.toggle(bem.s("disabled"), isNextDisabled);
      this._nextIcon.setAttribute("aria-disabled", String(isNextDisabled));
      this._nextIcon.setAttribute("tabindex", isNextDisabled ? "-1" : "0");
    }
  }

  /** 渲染分页器内容 */
  private _handlePagerRender(): void {
    if (!this._pagination) return;
    if (!this.layout.includes("pager")) {
      this._pagination.innerHTML = "";
      return;
    }

    this._pagination.innerHTML = html(this._getPagerTemplate(this.currentPage));
  }

  /** 渲染总数文本 */
  private _handleTotalRender(): void {
    if (!this.layout.includes("total") || !this._total) return;

    this._total.textContent = `Total ${this.total}`;
  }

  /** 渲染跳转输入框并绑定事件 */
  private async _handleJumperRender(): Promise<void> {
    if (!this.layout.includes("jumper") || !this._jumper) return;

    this._jumperAbortController?.abort();
    this._jumperAbortController = new AbortController();

    const totalCount = Math.ceil(this.total / this.pageSize);

    this._jumper.value = this.currentPage;
    this._jumper.min = 1;
    this._jumper.max = totalCount || 1;

    if (this.disabled) {
      this._jumper.disabled = true;
    }

    const onJumperChangeEvent = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (
        detail &&
        typeof detail.currentValue === "number" &&
        detail.currentValue !== this.currentPage
      ) {
        this.currentPage = detail.currentValue;
      }
    };

    const onJumperKeydownEvent = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        this._jumper.blur();
      }
    };

    this._jumper.addEventListener("ea-change", onJumperChangeEvent, {
      signal: this._jumperAbortController!.signal,
    });
    this._jumper.addEventListener("keydown", onJumperKeydownEvent, {
      signal: this._jumperAbortController!.signal,
    });
  }

  /** 渲染每页条数选择器并绑定事件 */
  private async _handleSizesRender(): Promise<void> {
    if (!this.layout.includes("sizes") || !this._sizes) return;

    this._sizesAbortController?.abort();
    this._sizesAbortController = new AbortController();

    const renderCallback = (size: number): string => {
      return `<ea-option value="${size}" ${size === this.pageSize ? "selected" : ""}>${size}/page</ea-option>`;
    };

    const onSizesChangeEvent = (e: Event) => {
      (e as Event).stopImmediatePropagation?.();
      if (this._isFirstRender) return;

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

    if (this.disabled) {
      this._sizes.disabled = true;
    }

    this._sizes.addEventListener("change", onSizesChangeEvent, {
      signal: this._sizesAbortController!.signal,
    });
  }

  /** 重新渲染分页组件内容 */
  private async _handlePaginationItemChange(
    skipInnerHTML = false
  ): Promise<void> {
    this._jumperAbortController?.abort();
    this._jumperAbortController = null;
    this._sizesAbortController?.abort();
    this._sizesAbortController = null;

    if (this.layout?.includes("jumper") && !this._isEaInputImported) {
      await import("@components/ea-input-number/index.js");
      await customElements.whenDefined("ea-input-number");
      this._isEaInputImported = true;
    }

    if (this.layout?.includes("sizes") && !this._isEaSelectImported) {
      await import("@components/ea-select/index.js");
      await customElements.whenDefined("ea-select");
      this._isEaSelectImported = true;
    }

    if (this._container && !skipInnerHTML) {
      this._container.innerHTML = html(this._getLayoutHTML());
    }

    this._handleSizesRender();
    this._handlePagerRender();
    this._handleTotalRender();
    this._handleJumperRender();
    this._updatePrevNextState();
  }

  @listen("click", "shadowRoot")
  private _handlePagerClick(e: MouseEvent) {
    const path = e.composedPath();
    const targetEl = path.find(
      el =>
        el instanceof Element &&
        el.closest?.(`${bem.ce("page")}:not(${bem.ce("more")})`)
    ) as Element | undefined;
    const moreEl = path.find(
      el => el instanceof Element && el.closest?.(bem.ce("more"))
    ) as Element | undefined;

    const target = targetEl?.closest(
      `${bem.ce("page")}:not(${bem.ce("more")})`
    );
    const moreItem = moreEl?.closest(bem.ce("more"));
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
  }

  @listen("click", "shadowRoot")
  private _handlePrevClick(e: MouseEvent) {
    const path = e.composedPath();
    const matched = path.find(
      el => el instanceof Element && el.closest?.(`${bem.ce("icon")}--prev`)
    );
    if (!matched) return;

    if (this.currentPage <= 1 || this.total <= 0 || this.disabled) return;

    this.currentPage--;

    this.dispatchEvent(
      new EaPaginationPrevClickEvent({ value: this.currentPage })
    );
  }

  @listen("click", "shadowRoot")
  private _handleNextClick(e: MouseEvent) {
    const path = e.composedPath();
    const matched = path.find(
      el => el instanceof Element && el.closest?.(`${bem.ce("icon")}--next`)
    );
    if (!matched) return;

    if (
      this.currentPage >= Math.ceil(this.total / this.pageSize) ||
      this.disabled
    )
      return;

    this.currentPage++;

    this.dispatchEvent(
      new EaPaginationNextClickEvent({ value: this.currentPage })
    );
  }

  async $mount(): Promise<void> {
    await this._handlePaginationItemChange();

    this._isFirstRender = false;

    this.updateContainerClasslist();
  }

  $beforeUnmount(): void {
    this._jumperAbortController?.abort();
    this._jumperAbortController = null;
    this._sizesAbortController?.abort();
    this._sizesAbortController = null;
  }
}

export default EaPagination;
