export interface EaRadioChangeEventDetail {
  value: string;
  checked: boolean;
}

export class EaRadioChangeEvent extends Event {
  readonly detail: EaRadioChangeEventDetail;

  constructor(detail: EaRadioChangeEventDetail) {
    super("change", {
      bubbles: true,
      cancelable: true,
      composed: true,
    });

    this.detail = detail;
  }
}
