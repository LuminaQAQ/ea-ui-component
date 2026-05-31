export interface EaRadioFocusEventDetail {
  value: string;
  checked: boolean;
}

export class EaRadioFocusEvent extends Event {
  readonly detail: EaRadioFocusEventDetail;

  constructor(detail: EaRadioFocusEventDetail) {
    super("focus", {
      bubbles: true,
      composed: true,
    });

    this.detail = detail;
  }
}
