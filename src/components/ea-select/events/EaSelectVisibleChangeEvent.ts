export interface EaSelectVisibleChangeEventDetail {
  visible: boolean;
}

export class EaSelectVisibleChangeEvent extends Event {
  readonly detail: EaSelectVisibleChangeEventDetail;

  constructor(detail: EaSelectVisibleChangeEventDetail) {
    super("ea-visible-change", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-visible-change": EaSelectVisibleChangeEvent;
  }
}
