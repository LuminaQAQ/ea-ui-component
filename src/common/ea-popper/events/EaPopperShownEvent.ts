export interface EaPopperShownEventDetail {}

export class EaPopperShownEvent extends Event {
  readonly detail: EaPopperShownEventDetail;

  constructor(detail?: EaPopperShownEventDetail) {
    super("ea-shown", { bubbles: true, composed: true });
    this.detail = detail ?? {};
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-shown": EaPopperShownEvent;
  }
}
