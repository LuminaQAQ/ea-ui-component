export interface EaTabsChangeEventDetail {
  name: string;
}

export class EaTabsChangeEvent extends Event {
  readonly detail: EaTabsChangeEventDetail;

  constructor(detail: EaTabsChangeEventDetail) {
    super("ea-tabs-change", {
      bubbles: true,
      composed: true,
    });

    this.detail = detail;
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-tabs-change": EaTabsChangeEvent;
  }
}
