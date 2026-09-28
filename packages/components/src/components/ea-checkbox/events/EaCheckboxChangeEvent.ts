export interface EaCheckboxChangeEventDetail {
  value: unknown;
  checked: boolean;
}

export class EaCheckboxChangeEvent extends Event {
  readonly detail: EaCheckboxChangeEventDetail;

  constructor(detail: EaCheckboxChangeEventDetail) {
    super("change", {
      bubbles: true,
      cancelable: true,
      composed: true,
    });

    this.detail = detail;
  }
}
