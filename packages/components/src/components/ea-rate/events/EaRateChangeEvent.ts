export interface EaRateChangeEventDetail {
  readonly value: number;
}

export class EaRateChangeEvent extends Event {
  readonly detail: EaRateChangeEventDetail;

  constructor(detail: EaRateChangeEventDetail) {
    super("change", { bubbles: true, composed: true });
    this.detail = detail;
  }
}
