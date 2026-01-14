export class EaInputNumberChangeEvent extends Event {
  readonly detail: EaInputNumberChangeEventDetail;
  constructor(detail: EaInputNumberChangeEventDetail) {
    super("ea-change", { bubbles: true, cancelable: true, composed: true });

    this.detail = detail;
  }
}

interface EaInputNumberChangeEventDetail {
  currentValue: number;
  oldValue: number;
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-change": EaInputNumberChangeEvent;
  }
}
