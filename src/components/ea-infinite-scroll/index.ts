import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query, listen } from "@decorator";
import { Enum } from "@utils/Enum";
import { EaInfiniteScrollLoadmoreEvent } from "./events/EaInfiniteScrollLoadmoreEvent";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-infinite-scroll" as const;
const bem = createBEM(TAG_NAME);

export type InfiniteScrollStatus = "finished" | "loading" | "noMore";

/**
 * @summary 无限滚动组件，滚动至底部时自动加载更多数据，支持加载状态和无更多数据状态。
 * @status stable
 * @since 3.0
 *
 * @slot default - 默认插槽，滚动列表的内容。
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

  private _observer: IntersectionObserver | null = null;

  @attribute({
    type: Enum(["finished", "loading", "noMore"]),
    default: "finished",
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

  @listen("slotchange", bem.ce("content"))
  private _handleSlotchange() {
    this.emit("ea-infinite-scroll-slotchange", {
      bubbles: true,
      composed: true,
    });
    this.emit("slotchange", { bubbles: true, composed: true });
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
            this.status = "loading";
            this.updateContainerClasslist();
            this.dispatchEvent(
              new EaInfiniteScrollLoadmoreEvent({
                finished: () => {
                  this.status = "finished";
                  this.updateContainerClasslist();
                  this._observer!.observe(entry.target);
                },
                noMore: () => {
                  this.status = "noMore";
                  this.updateContainerClasslist();
                  this._observer!.observe(entry.target);
                },
              })
            );
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
    this.updateContainerClasslist();
    this._recreateObserver();
  }

  $beforeUnmount(): void {
    this._observer?.disconnect();
    this._observer = null;
  }
}

export default EaInfiniteScroll;
