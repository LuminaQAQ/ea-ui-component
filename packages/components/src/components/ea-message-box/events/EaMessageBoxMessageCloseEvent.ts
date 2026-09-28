export interface EaMessageBoxMessageCloseEventDetail {}

export class EaMessageBoxMessageCloseEvent extends Event {
  readonly detail: EaMessageBoxMessageCloseEventDetail;

  constructor(detail?: EaMessageBoxMessageCloseEventDetail) {
    super("ea-message-close", { bubbles: true, composed: true });
    this.detail = detail ?? {};
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-message-close": EaMessageBoxMessageCloseEvent;
  }
}
