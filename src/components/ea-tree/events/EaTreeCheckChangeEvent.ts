export interface EaTreeCheckChangeEventDetail {
  data: any;
  checked: boolean;
  hasCheckedChildren: boolean;
}

export class EaTreeCheckChangeEvent extends Event {
  readonly detail: EaTreeCheckChangeEventDetail;
  constructor(detail: EaTreeCheckChangeEventDetail) {
    super("ea-check-change", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-check-change": EaTreeCheckChangeEvent;
  }
}
