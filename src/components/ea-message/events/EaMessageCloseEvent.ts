export interface EaMessageCloseEventDetail {
  visible: false;
}

export class EaMessageCloseEvent extends Event {
  readonly detail: EaMessageCloseEventDetail;

  constructor(detail: EaMessageCloseEventDetail) {
    super("ea-close", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-close": EaMessageCloseEvent;
  }
}
