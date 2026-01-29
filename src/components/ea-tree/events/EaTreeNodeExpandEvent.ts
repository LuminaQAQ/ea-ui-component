export class EaTreeNodeExpandEvent extends Event {
  readonly detail: EaTreeNodeExpandEventDetail;
  constructor(detail: EaTreeNodeExpandEventDetail) {
    super("ea-node-expand", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

interface EaTreeNodeExpandEventDetail {
  /** @description 展开的节点数据 */
  node: any;
  /** @description 节点是否展开 */
  expanded: boolean;
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-node-expand": EaTreeNodeExpandEvent;
  }
}