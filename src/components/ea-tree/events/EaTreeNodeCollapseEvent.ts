export interface EaTreeNodeCollapseEventDetail {
  data: any;
  node: any;
  expanded: boolean;
}

export class EaTreeNodeCollapseEvent extends Event {
  readonly detail: EaTreeNodeCollapseEventDetail;
  constructor(detail: EaTreeNodeCollapseEventDetail) {
    super("ea-node-collapse", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-node-collapse": EaTreeNodeCollapseEvent;
  }
}
