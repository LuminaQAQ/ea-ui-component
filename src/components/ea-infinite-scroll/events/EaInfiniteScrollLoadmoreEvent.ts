export interface EaInfiniteScrollLoadmoreEventDetail {
  finished: () => void;
  noMore: () => void;
}

export class EaInfiniteScrollLoadmoreEvent extends Event {
  readonly detail: EaInfiniteScrollLoadmoreEventDetail;

  constructor(detail: EaInfiniteScrollLoadmoreEventDetail) {
    super("ea-loadmore", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-loadmore": EaInfiniteScrollLoadmoreEvent;
  }
}
