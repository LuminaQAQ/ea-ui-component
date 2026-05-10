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

interface EaTabsChangeEventDetail {
  name: string;
}

declare global {
  interface HTMLElementEventMap {
    "ea-tabs-change": EaTabsChangeEvent;
  }
}
