export class EaCheckboxChangeEvent extends Event {
  readonly detail: EaCheckboxChangeEventDetail;

  constructor(detail: EaCheckboxChangeEventDetail) {
    super("change", {
      bubbles: true,
      composed: true,
    });

    this.detail = detail;
  }
}

interface EaCheckboxChangeEventDetail {
  value: unknown;
  checked: boolean;
}
