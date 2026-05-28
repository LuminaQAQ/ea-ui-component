export interface EaCountdownFinishEventDetail {
  value: number;
  displayValue: string;
}

export class EaCountdownFinishEvent extends Event {
  readonly detail: EaCountdownFinishEventDetail;

  constructor(detail: EaCountdownFinishEventDetail) {
    super("ea-finish", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-finish": EaCountdownFinishEvent;
  }
}
