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

interface EaPaginationSizeChangeEventDetail {
  /**
   * @description size 的值
   */
  pageSize: number;
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-size-change": EaPaginationSizeChangeEvent;
  }
}
