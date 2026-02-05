export class EaTreeNodeContextmenuEvent extends Event {
  readonly detail: EaTreeNodeContextmenuEventDetail;
  constructor(detail: EaTreeNodeContextmenuEventDetail) {
    super("ea-node-contextmenu", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

interface EaTreeNodeContextmenuEventDetail {
  /** @description 节点数据对象 */
  data: any;
  /** @description 节点实例对象 */
  node: any;
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-node-contextmenu": EaTreeNodeContextmenuEvent;
  }
}