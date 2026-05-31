export interface EaTabRemoveEventDetail {
  name: string;
}

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

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-tab-remove": EaTabRemoveEvent;
  }
}
