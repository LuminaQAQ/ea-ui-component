export interface EaMessageBoxCancelEventDetail {}

export class EaMessageBoxCancelEvent extends Event {
  readonly detail: EaMessageBoxCancelEventDetail;

  constructor(detail?: EaMessageBoxCancelEventDetail) {
    super("ea-cancel", { bubbles: true, composed: true });
    this.detail = detail ?? {};
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-cancel": EaMessageBoxCancelEvent;
  }
}
