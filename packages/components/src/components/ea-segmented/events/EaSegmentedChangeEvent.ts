export interface EaSegmentedChangeEventDetail {
  value: string;
}

export class EaSegmentedChangeEvent extends Event {
  readonly detail: EaSegmentedChangeEventDetail;

  constructor(detail: EaSegmentedChangeEventDetail) {
    super("change", {
      bubbles: true,
      cancelable: true,
      composed: true,
    });

    this.detail = detail;
  }
}
