export interface EaMessageBoxConfirmEventDetail {
  value?: string;
}

export class EaMessageBoxConfirmEvent extends Event {
  readonly detail: EaMessageBoxConfirmEventDetail;

  constructor(detail?: EaMessageBoxConfirmEventDetail) {
    super("ea-confirm", { bubbles: true, composed: true });
    this.detail = detail ?? {};
  }
}
