export interface EaAlertOpenEventDetail {}

export class EaAlertOpenEvent extends Event {
  readonly detail: EaAlertOpenEventDetail;

  constructor(detail?: EaAlertOpenEventDetail) {
    super("ea-open", { bubbles: true, composed: true });
    this.detail = detail ?? {};
  }
}
