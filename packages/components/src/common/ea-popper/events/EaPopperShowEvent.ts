export interface EaPopperShowEventDetail {}

export class EaPopperShowEvent extends Event {
  readonly detail: EaPopperShowEventDetail;

  constructor(detail?: EaPopperShowEventDetail) {
    super("ea-show", { bubbles: true, composed: true });
    this.detail = detail ?? {};
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-show": EaPopperShowEvent;
  }
}
