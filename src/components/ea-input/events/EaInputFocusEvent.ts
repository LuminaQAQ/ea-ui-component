export interface EaInputFocusEventDetail {}

export class EaInputFocusEvent extends Event {
  readonly detail: EaInputFocusEventDetail;

  constructor(detail: EaInputFocusEventDetail = {}) {
    super("focus", { bubbles: true, composed: true });
    this.detail = detail;
  }
}
