export interface EaPaginationSizeChangeEventDetail {
  pageSize: number;
}

export class EaPaginationSizeChangeEvent extends Event {
  readonly detail: EaPaginationSizeChangeEventDetail;

  constructor(detail: EaPaginationSizeChangeEventDetail) {
    super("ea-size-change", {
      bubbles: true,
      cancelable: true,
      composed: true,
    });

    this.detail = detail;
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-size-change": EaPaginationSizeChangeEvent;
  }
}
