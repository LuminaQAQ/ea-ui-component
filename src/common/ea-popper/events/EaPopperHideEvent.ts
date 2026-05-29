export interface EaPopperHideEventDetail {}

export class EaPopperHideEvent extends Event {
  readonly detail: EaPopperHideEventDetail;

  constructor(detail?: EaPopperHideEventDetail) {
    super("ea-hide", { bubbles: true, composed: true });
    this.detail = detail ?? {};
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-hide": EaPopperHideEvent;
  }
}
