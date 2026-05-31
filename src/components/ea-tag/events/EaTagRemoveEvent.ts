export interface EaTagRemoveEventDetail {
  text: string | null;
}

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

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-remove": EaTagRemoveEvent;
  }
}
