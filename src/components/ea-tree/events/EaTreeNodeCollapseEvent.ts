export class EaTreeNodeCollapseEvent extends Event {
  readonly detail: EaTreeNodeCollapseEventDetail;
  constructor(detail: EaTreeNodeCollapseEventDetail) {
    super("ea-node-collapse", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

interface EaTreeNodeCollapseEventDetail {
  /** @description 收起的节点数据 */
  node: any;
  /** @description 节点是否展开 */
  expanded: boolean;
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-node-collapse": EaTreeNodeCollapseEvent;
  }
}
