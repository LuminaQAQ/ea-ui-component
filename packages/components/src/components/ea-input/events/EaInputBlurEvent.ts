export interface EaInputBlurEventDetail {}

export class EaInputBlurEvent extends Event {
  readonly detail: EaInputBlurEventDetail;

  constructor(detail: EaInputBlurEventDetail = {}) {
    super("blur", { bubbles: true, composed: true });
    this.detail = detail;
  }
}
