export interface EaTreeNodeExpandEventDetail {
  data: any;
  node: any;
  expanded: boolean;
}

export class EaTreeNodeExpandEvent extends Event {
  readonly detail: EaTreeNodeExpandEventDetail;
  constructor(detail: EaTreeNodeExpandEventDetail) {
    super("ea-node-expand", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-node-expand": EaTreeNodeExpandEvent;
  }
}
