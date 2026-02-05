export class EaTreeNodeCollapseEvent extends Event {
  readonly detail: EaTreeNodeCollapseEventDetail;
  constructor(detail: EaTreeNodeCollapseEventDetail) {
    super("ea-node-collapse", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

interface EaTreeNodeCollapseEventDetail {
  /** @description 节点数据对象 */
  data: any;
  /** @description 节点实例对象 */
  node: any;
  /** @description 节点是否展开 */
  expanded: boolean;
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-node-collapse": EaTreeNodeCollapseEvent;
  }
}
