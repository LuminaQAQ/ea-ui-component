export interface EaTransferLeftCheckChangeEventDetail {
  value: any[];
  movedKeys?: any[];
}

export class EaTransferLeftCheckChangeEvent extends Event {
  readonly detail: EaTransferLeftCheckChangeEventDetail;
  constructor(detail: EaTransferLeftCheckChangeEventDetail) {
    super("ea-left-check-change", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-left-check-change": EaTransferLeftCheckChangeEvent;
  }
}
