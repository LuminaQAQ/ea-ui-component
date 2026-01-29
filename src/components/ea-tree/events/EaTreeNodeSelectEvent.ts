export class EaTreeNodeSelectEvent extends Event {
  readonly detail: EaTreeNodeSelectEventDetail;
  constructor(detail: EaTreeNodeSelectEventDetail) {
    super("ea-node-select", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

interface EaTreeNodeSelectEventDetail {
  /** @description 选中的节点数据 */
  node: any;
  /** @description 节点是否被选中 */
  selected: boolean;
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-node-select": EaTreeNodeSelectEvent;
  }
}