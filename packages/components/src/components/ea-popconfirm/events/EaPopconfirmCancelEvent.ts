export interface EaPopconfirmCancelEventDetail {}

export class EaPopconfirmCancelEvent extends Event {
  readonly detail: EaPopconfirmCancelEventDetail;

  constructor(detail?: EaPopconfirmCancelEventDetail) {
    super("ea-cancel", { bubbles: true, composed: true });
    this.detail = detail ?? {};
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-cancel": EaPopconfirmCancelEvent;
  }
}
