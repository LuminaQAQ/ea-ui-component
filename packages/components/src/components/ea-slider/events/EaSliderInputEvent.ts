export interface EaSliderInputEventDetail {
  value: number;
}

export class EaSliderInputEvent extends Event {
  readonly detail: EaSliderInputEventDetail;

  constructor(detail: EaSliderInputEventDetail) {
    super("input", { bubbles: true, cancelable: true, composed: true });

    this.detail = detail;
  }
}
