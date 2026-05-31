export interface EaTabClickEventDetail {
  name: string;
  panel: HTMLElement | null;
}

export class EaTabClickEvent extends Event {
  readonly detail: EaTabClickEventDetail;

  constructor(detail: EaTabClickEventDetail) {
    super("ea-tab-click", {
      bubbles: true,
      composed: true,
    });

    this.detail = detail;
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-tab-click": EaTabClickEvent;
  }
}
