export interface EaTreeCheckEventDetail {
  data: any;
  checkedState: {
    checkedNodes: any[];
    checkedKeys: any[];
    halfCheckedNodes: any[];
    halfCheckedKeys: any[];
  };
}

export class EaTreeCheckEvent extends Event {
  readonly detail: EaTreeCheckEventDetail;
  constructor(detail: EaTreeCheckEventDetail) {
    super("ea-check", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-check": EaTreeCheckEvent;
  }
}
