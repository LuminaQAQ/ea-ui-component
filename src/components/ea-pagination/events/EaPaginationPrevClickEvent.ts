export class EaPaginationPrevClickEvent extends Event {
  readonly detail: EaPaginationPrevClickEventDetail;

  constructor(detail: EaPaginationPrevClickEventDetail) {
    super("ea-prev-click", {
      bubbles: true,
      cancelable: true,
      composed: true,
    });

    this.detail = detail;
  }
}

interface EaPaginationPrevClickEventDetail {
  value: number;
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-prev-click": EaPaginationPrevClickEvent;
  }
}
