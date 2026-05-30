export interface EaPageHeaderBackEventDetail {}

export class EaPageHeaderBackEvent extends Event {
  readonly detail: EaPageHeaderBackEventDetail;

  constructor(detail: EaPageHeaderBackEventDetail = {}) {
    super("ea-back", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-back": EaPageHeaderBackEvent;
  }
}
