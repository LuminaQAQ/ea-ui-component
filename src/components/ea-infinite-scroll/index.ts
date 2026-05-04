import { listen } from "@/decorator";
import { Enum } from "@/utils/Enum";
import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-infinite-scroll" as const;
const bem = createBEM(TAG_NAME);

export type InfiniteScrollStatus = "finished" | "loading" | "noMore";

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaInfiniteScroll extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @query(bem.ce("placeholder"))
  private _placeholder!: HTMLElement;

  private _abortController?: AbortController;

  private _states = {
    observer: null as IntersectionObserver | null,
  };

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
    observer() {},
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
  private _onSlotchange() {
    this.emit("slotchange", { bubbles: true, composed: true });
  }

  protected _onLoadmore() {
    this.status = "loading";
    this.updateContainerClasslist();
  }

  $mount(): void {
    this.updateContainerClasslist();

    this._abortController?.abort();
    this._abortController = new AbortController();

    this._states.observer = new IntersectionObserver(
      entries => {
        if (this.status !== "finished") return;

        entries.forEach(async entry => {
          if (entry.isIntersecting) {
            this._states.observer!.unobserve(entry.target);
            this.status = "loading";
            this.updateContainerClasslist();
            this.emit("loadmore", {
              detail: {
                finished: () => {
                  this.status = "finished";
                  this.updateContainerClasslist();
                  this._states.observer!.observe(entry.target);
                },
                noMore: () => {
                  this.status = "noMore";
                  this.updateContainerClasslist();
                  this._states.observer!.observe(entry.target);
                },
              },
              bubbles: true,
            });
          }
        });
      },
      {
        rootMargin: this.distance + "px",
      }
    );

    this._states.observer.observe(this._placeholder);
  }

  $beforeUnmount(): void {
    this._abortController?.abort();
    this._states.observer?.disconnect();
  }
}

export default EaInfiniteScroll;
