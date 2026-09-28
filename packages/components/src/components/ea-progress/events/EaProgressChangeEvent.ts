export interface EaProgressChangeEventDetail {
  percentage: number;
}

export class EaProgressChangeEvent extends Event {
  readonly detail: EaProgressChangeEventDetail;

  constructor(detail: EaProgressChangeEventDetail) {
    super("change", { bubbles: true, composed: true });
    this.detail = detail;
  }
}
