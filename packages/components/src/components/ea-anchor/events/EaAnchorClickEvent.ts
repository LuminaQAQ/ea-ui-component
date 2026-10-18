export interface EaAnchorClickEventDetail {
  href: string;
  heading: string;
  targetEl: HTMLElement | null;
}

export class EaAnchorClickEvent extends Event {
  readonly detail: EaAnchorClickEventDetail;

  constructor(detail: EaAnchorClickEventDetail) {
    super("ea-click", {
      bubbles: true,
      composed: true,
    });

    this.detail = detail;
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-click": EaAnchorClickEvent;
  }
}
