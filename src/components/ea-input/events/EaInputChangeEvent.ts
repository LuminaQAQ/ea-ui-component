export interface EaInputChangeEventDetail {
  value: string;
}

export class EaInputChangeEvent extends Event {
  readonly detail: EaInputChangeEventDetail;

  constructor(detail: EaInputChangeEventDetail) {
    super("change", { bubbles: true, composed: true });
    this.detail = detail;
  }
}
