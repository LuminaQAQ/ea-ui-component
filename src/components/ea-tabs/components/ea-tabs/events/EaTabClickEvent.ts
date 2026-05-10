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

interface EaTabClickEventDetail {
  name: string;
  panel: HTMLElement | null;
}

declare global {
  interface HTMLElementEventMap {
    "ea-tab-click": EaTabClickEvent;
  }
}
