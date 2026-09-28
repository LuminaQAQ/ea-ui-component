export interface EaCheckTagChangeEventDetail {
  checked: boolean;
}

export class EaCheckTagChangeEvent extends Event {
  readonly detail: EaCheckTagChangeEventDetail;

  constructor(detail: EaCheckTagChangeEventDetail) {
    super("change", {
      bubbles: true,
      composed: true,
    });

    this.detail = detail;
  }
}
