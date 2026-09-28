export interface EaPopperHiddenEventDetail {}

export class EaPopperHiddenEvent extends Event {
  readonly detail: EaPopperHiddenEventDetail;

  constructor(detail?: EaPopperHiddenEventDetail) {
    super("ea-hidden", { bubbles: true, composed: true });
    this.detail = detail ?? {};
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-hidden": EaPopperHiddenEvent;
  }
}
