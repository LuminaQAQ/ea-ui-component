export class EaTagRemoveEvent extends Event {
  readonly detail: EaTagRemoveEventDetail;

  constructor(detail: EaTagRemoveEventDetail) {
    super("ea-remove", {
      bubbles: true,
      composed: true,
    });

    this.detail = detail;
  }
}

interface EaTagRemoveEventDetail {
  text: string;
}

declare global {
  interface HTMLElementEventMap {
    "ea-remove": EaTagRemoveEvent;
  }
}
