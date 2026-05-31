export interface EaSelectChangeEventDetail {
  value: string | number | boolean | (string | number | boolean)[];
}

export class EaSelectChangeEvent extends Event {
  readonly detail: EaSelectChangeEventDetail;

  constructor(detail: EaSelectChangeEventDetail) {
    super("change", { bubbles: true, composed: true });
    this.detail = detail;
  }
}
