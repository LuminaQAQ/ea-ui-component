export class EaTabRemoveEvent extends Event {
  readonly detail: EaTabRemoveEventDetail;

  constructor(detail: EaTabRemoveEventDetail) {
    super("ea-tab-remove", {
      bubbles: true,
      composed: true,
    });

    this.detail = detail;
  }
}

interface EaTabRemoveEventDetail {
  name: string;
}

declare global {
  interface HTMLElementEventMap {
    "ea-tab-remove": EaTabRemoveEvent;
  }
}
