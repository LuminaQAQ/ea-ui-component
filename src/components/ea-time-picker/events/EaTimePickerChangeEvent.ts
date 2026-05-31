export interface EaTimePickerChangeEventDetail {
  value: string;
}

export class EaTimePickerChangeEvent extends Event {
  readonly detail: EaTimePickerChangeEventDetail;

  constructor(detail: EaTimePickerChangeEventDetail) {
    super("change", {
      bubbles: true,
      composed: true,
    });

    this.detail = detail;
  }
}
