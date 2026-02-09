export class EaTransferLeftCheckChangeEvent extends Event {
  readonly detail: EaTransferLeftCheckChangeEventDetail;
  constructor(detail: EaTransferLeftCheckChangeEventDetail) {
    super("ea-left-check-change", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

interface EaTransferLeftCheckChangeEventDetail {
  value: any[];
  movedKeys?: any[];
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-left-check-change": EaTransferLeftCheckChangeEvent;
  }
}