export interface EaTreeNodeSelectEventDetail {
  node: any;
  selected: boolean;
}

export class EaTreeNodeSelectEvent extends Event {
  readonly detail: EaTreeNodeSelectEventDetail;
  constructor(detail: EaTreeNodeSelectEventDetail) {
    super("ea-node-select", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-node-select": EaTreeNodeSelectEvent;
  }
}
