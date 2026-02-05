export class EaTreeNodeExpandEvent extends Event {
  readonly detail: EaTreeNodeExpandEventDetail;
  constructor(detail: EaTreeNodeExpandEventDetail) {
    super("ea-node-expand", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

interface EaTreeNodeExpandEventDetail {
  /** @description 节点数据对象 */
  data: any;
  /** @description 节点实例对象 */
  node: any;
  /** @description 节点是否展开 */
  expanded: boolean;
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-node-expand": EaTreeNodeExpandEvent;
  }
}