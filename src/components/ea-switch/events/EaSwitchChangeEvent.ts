export interface EaSwitchChangeEventDetail {
  value: unknown;
}

export class EaSwitchChangeEvent extends Event {
  readonly detail: EaSwitchChangeEventDetail;

  constructor(detail: EaSwitchChangeEventDetail) {
    super("change", {
      bubbles: true,
      cancelable: true,
      composed: true,
    });

    this.detail = detail;
  }
}
