export class EaTreeCheckChangeEvent extends Event {
  readonly detail: EaTreeCheckChangeEventDetail;
  constructor(detail: EaTreeCheckChangeEventDetail) {
    super("ea-check-change", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

interface EaTreeCheckChangeEventDetail {
  /** @description 节点数据对象 */
  data: any;
  /** @description 节点选中状态 */
  checked: boolean;
  /** @description 子树中是否存在被选中的节点 */
  hasCheckedChildren: boolean;
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-check-change": EaTreeCheckChangeEvent;
  }
}