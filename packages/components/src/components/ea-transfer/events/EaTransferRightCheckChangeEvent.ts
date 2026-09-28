export interface EaTransferRightCheckChangeEventDetail {
  value: any[];
  movedKeys?: any[];
}

export class EaTransferRightCheckChangeEvent extends Event {
  readonly detail: EaTransferRightCheckChangeEventDetail;
  constructor(detail: EaTransferRightCheckChangeEventDetail) {
    super("ea-right-check-change", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-right-check-change": EaTransferRightCheckChangeEvent;
  }
}
