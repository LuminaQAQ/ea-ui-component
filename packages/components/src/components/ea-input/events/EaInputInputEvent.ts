export interface EaInputInputEventDetail {
  value: string;
}

export class EaInputInputEvent extends Event {
  readonly detail: EaInputInputEventDetail;

  constructor(detail: EaInputInputEventDetail) {
    super("input", { bubbles: true, composed: true });
    this.detail = detail;
  }
}
