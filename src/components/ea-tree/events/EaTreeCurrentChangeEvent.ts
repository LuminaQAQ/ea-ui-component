export class EaTreeCurrentChangeEvent extends Event {
  readonly detail: EaTreeCurrentChangeEventDetail;
  constructor(detail: EaTreeCurrentChangeEventDetail) {
    super("ea-current-change", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

interface EaTreeCurrentChangeEventDetail {
  /** @description 当前选中节点数据对象 */
  data: any;
  /** @description 当前选中节点实例对象 */
  node: any;
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-current-change": EaTreeCurrentChangeEvent;
  }
}