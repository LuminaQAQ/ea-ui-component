import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query, listen } from "@decorator";
import { Enum } from "@utils/Enum";
import { EaInfiniteScrollLoadmoreEvent } from "./events/EaInfiniteScrollLoadmoreEvent";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-infinite-scroll" as const;
const bem = createBEM(TAG_NAME);

export type InfiniteScrollStatus = "finished" | "loading" | "noMore";

/**
 * @summary 无限滚动组件，滚动至底部时自动加载更多数据，遵循 WAI-ARIA Feed 模式。
 * @status stable
 * @since 3.0
 *
 * @slot default - 默认插槽，滚动列表的内容（每项自动获得 role="article"）。
 * @slot loading - 加载中显示内容。
 * @slot noMore - 无更多数据时显示内容。
 *
 * @event ea-loadmore - 占位元素进入可视区且 status 为 finished 时触发，detail: `{ finished: () => void, noMore: () => void }`。
 *
 * @csspart container - 根容器元素。
 * @csspart content - 内容包裹元素。
 * @csspart placeholder - 占位哨兵元素。
 * @csspart loading - 加载状态容器元素。
 * @csspart noMore - 无更多数据容器元素。
 *
 * @cssproperty --ea-infinite-scroll-placeholder-height - 占位哨兵元素高度。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaInfiniteScroll extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @query(bem.ce("placeholder"))
  private _placeholder!: HTMLElement;

  @query("slot:not([name])")
  private _defaultSlot!: HTMLSlotElement;

  private _observer: IntersectionObserver | null = null;

  @attribute({
    type: Enum(["finished", "loading", "noMore"]),
    default: "finished",
    a11y: {
      ariaAttr: "aria-busy",
      map: v => (v === "loading" ? "true" : null),
    },
    observer(this: EaInfiniteScroll) {
      this.updateContainerClasslist();
    },
  })
  status: InfiniteScrollStatus = "finished";

  @attribute({
    type: Number,
    default: 0,
    observer(this: EaInfiniteScroll) {
      this._recreateObserver();
    },
  })
  distance: number = 0;

  @attribute({
    type: String,
    default: "",
    a11y: {
      ariaAttr: "aria-label",
      map: v => v || null,
    },
  })
  label: string = "";

  updateContainerClasslist(): string {
    const className = bem(
      {},
      {
        [this.status]: this.status !== "finished",
      }
    );

    if (this._container) {
      this._container.className = className;
    }

    return className;
  }

  /** 更新子元素的 feed article a11y 属性 */
  private _updateArticleAttributes(): void {
    if (!this._defaultSlot) return;

    const articles = this._defaultSlot.assignedElements();
    const setSize = articles.length;

    articles.forEach((article, index) => {
      if (!article.hasAttribute("role")) {
        article.setAttribute("role", "article");
      }
      article.setAttribute("tabindex", "0");
      article.setAttribute("aria-posinset", String(index + 1));
      article.setAttribute("aria-setsize", String(setSize));
    });
  }

  html(): string {
    return `
      <section class="${bem()}" part="container">
        <section class="${bem.e("content")}" part="content">
          <slot></slot>
        </section>
        <div class="${bem.e("placeholder")}" part="placeholder"></div>
        <section class="${bem.e("loading")}" part="loading">
          <slot name="loading"></slot>
        </section>
        <section class="${bem.e("noMore")}" part="noMore">
          <slot name="noMore"></slot>
        </section>
      </section>
    `;
  }

  /** 检查焦点 article 是否接近末尾，触发加载 */
  private _handleArticleFocus(focusedElement: Element): void {
    if (this.status !== "finished") return;
    if (!this._defaultSlot) return;

    const articles = this._defaultSlot.assignedElements();
    const index = articles.indexOf(focusedElement);
    if (index === -1) return;

    const threshold = Math.max(1, Math.ceil(articles.length * 0.1));
    if (index >= articles.length - threshold) {
      this._triggerLoadmore();
    }
  }

  /** 触发加载更多 */
  private _triggerLoadmore(): void {
    if (this.status !== "finished") return;

    this.status = "loading";
    this.updateContainerClasslist();
    this.dispatchEvent(
      new EaInfiniteScrollLoadmoreEvent({
        finished: () => {
          this.status = "finished";
          this.updateContainerClasslist();
          this._observer?.observe(this._placeholder);
        },
        noMore: () => {
          this.status = "noMore";
          this.updateContainerClasslist();
          this._observer?.observe(this._placeholder);
        },
      })
    );
  }

  /** 监听 article 的 focusin 事件，实现焦点驱动的加载 */
  @listen("focusin")
  private _handleFocusin(e: Event): void {
    const target = e.target as Element;
    if (target.closest('[role="article"]')) {
      this._handleArticleFocus(target.closest('[role="article"]')!);
    }
  }

  @listen("slotchange", bem.ce("content"))
  private _handleSlotchange() {
    this.emit("ea-infinite-scroll-slotchange", {
      bubbles: true,
      composed: true,
    });
    this.emit("slotchange", { bubbles: true, composed: true });
    this._updateArticleAttributes();
  }

  /** 重新创建 IntersectionObserver */
  private _recreateObserver(): void {
    if (!this._placeholder) return;

    this._observer?.disconnect();
    this._observer = new IntersectionObserver(
      entries => {
        if (this.status !== "finished") return;

        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this._observer!.unobserve(entry.target);
            this._triggerLoadmore();
          }
        });
      },
      {
        rootMargin: this.distance + "px",
      }
    );

    this._observer.observe(this._placeholder);
  }

  $mount(): void {
    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "feed");
    }
    this.updateContainerClasslist();
    this._recreateObserver();
    this._updateArticleAttributes();
  }

  $beforeUnmount(): void {
    this._observer?.disconnect();
    this._observer = null;
  }
}

export default EaInfiniteScroll;
