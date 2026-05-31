export interface EaRateHoverEventDetail {
  readonly value: number | null;
  readonly target: HTMLElement | null;
}

export class EaRateHoverEvent extends Event {
  readonly detail: EaRateHoverEventDetail;

  constructor(detail: EaRateHoverEventDetail) {
    super("ea-hover", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-hover": EaRateHoverEvent;
  }
}
