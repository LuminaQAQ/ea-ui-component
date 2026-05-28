export interface EaCountdownChangeEventDetail {
  value: number;
  displayValue: string;
}

export class EaCountdownChangeEvent extends Event {
  readonly detail: EaCountdownChangeEventDetail;

  constructor(detail: EaCountdownChangeEventDetail) {
    super("ea-change", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-change": EaCountdownChangeEvent;
  }
}
