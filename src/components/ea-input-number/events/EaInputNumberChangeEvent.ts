export interface EaInputNumberChangeEventDetail {
  currentValue: number;
  oldValue: number;
}

export class EaInputNumberChangeEvent extends Event {
  readonly detail: EaInputNumberChangeEventDetail;

  constructor(detail: EaInputNumberChangeEventDetail) {
    super("ea-change", { bubbles: true, cancelable: true, composed: true });
    this.detail = detail;
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-change": EaInputNumberChangeEvent;
  }
}
