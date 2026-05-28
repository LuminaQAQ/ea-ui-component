export interface EaCheckboxBlurEventDetail {
  value: unknown;
  checked: boolean;
}

export class EaCheckboxBlurEvent extends Event {
  readonly detail: EaCheckboxBlurEventDetail;

  constructor(detail: EaCheckboxBlurEventDetail) {
    super("blur", {
      bubbles: true,
      composed: true,
    });

    this.detail = detail;
  }
}
