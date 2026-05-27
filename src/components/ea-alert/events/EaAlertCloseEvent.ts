export interface EaAlertCloseEventDetail {
  visible: false;
}

export class EaAlertCloseEvent extends Event {
  readonly detail: EaAlertCloseEventDetail;

  constructor(detail: EaAlertCloseEventDetail) {
    super("ea-close", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-close": EaAlertCloseEvent;
  }
}
