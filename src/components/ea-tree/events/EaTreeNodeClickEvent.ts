export class EaTreeNodeClickEvent extends Event {
  readonly detail: EaTreeNodeClickEventDetail;
  constructor(detail: EaTreeNodeClickEventDetail) {
    super("ea-node-click", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

interface EaTreeNodeClickEventDetail {
  /** @description 被点击的节点数据 */
  data: any;
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-node-click": EaTreeNodeClickEvent;
  }
}
