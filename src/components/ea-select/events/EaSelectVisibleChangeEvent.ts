export class EaSelectVisibleChangeEvent extends Event {
  readonly detail: EaSelectVisibleChangeEventDetail;

  constructor(detail: EaSelectVisibleChangeEventDetail) {
    super("ea-visible-change", { bubbles: true, composed: true });

    this.detail = detail;
  }
}

interface EaSelectVisibleChangeEventDetail {
  visible: boolean;
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-visible-change": EaSelectVisibleChangeEvent;
  }
}
