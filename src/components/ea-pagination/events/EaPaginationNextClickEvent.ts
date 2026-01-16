export class EaPaginationNextClickEvent extends Event {
  readonly detail: EaPaginationNextClickEventDetail;

  constructor(detail: EaPaginationNextClickEventDetail) {
    super("ea-next-click", {
      bubbles: true,
      cancelable: true,
      composed: true,
    });

    this.detail = detail;
  }
}

interface EaPaginationNextClickEventDetail {
  value: number;
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-next-click": EaPaginationNextClickEvent;
  }
}
