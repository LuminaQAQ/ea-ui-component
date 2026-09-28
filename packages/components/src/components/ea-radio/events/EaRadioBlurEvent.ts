export interface EaRadioBlurEventDetail {
  value: string;
  checked: boolean;
}

export class EaRadioBlurEvent extends Event {
  readonly detail: EaRadioBlurEventDetail;

  constructor(detail: EaRadioBlurEventDetail) {
    super("blur", {
      bubbles: true,
      composed: true,
    });

    this.detail = detail;
  }
}
