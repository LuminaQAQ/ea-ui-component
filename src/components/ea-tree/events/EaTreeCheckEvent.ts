export class EaTreeCheckEvent extends Event {
  readonly detail: EaTreeCheckEventDetail;
  constructor(detail: EaTreeCheckEventDetail) {
    super("ea-check", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

interface EaTreeCheckEventDetail {
  /** @description 节点数据对象 */
  data: any;
  /** @description 树的当前选中状态对象 */
  checkedState: {
    /** @description 选中节点数据数组 */
    checkedNodes: any[];
    /** @description 选中节点键值数组 */
    checkedKeys: any[];
    /** @description 半选中节点数据数组 */
    halfCheckedNodes: any[];
    /** @description 半选中节点键值数组 */
    halfCheckedKeys: any[];
  };
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-check": EaTreeCheckEvent;
  }
}