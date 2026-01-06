export class EaClearEvent extends Event {
  readonly detail: EaClearEventDetail;

  constructor(detail: EaClearEventDetail) {
    super("ea-clear", { bubbles: true, cancelable: true, composed: true });

    this.detail = detail;
  }
}

interface EaClearEventDetail {
  oldValue: string;
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-clear": EaClearEvent;
  }
}
