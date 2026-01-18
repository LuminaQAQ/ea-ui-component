export class EaTableCurrentChangeEvent extends Event {
  readonly detail: EaTableCurrentChangeEventDetail;
  constructor(detail: EaTableCurrentChangeEventDetail) {
    super("ea-current-change", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

interface EaTableCurrentChangeEventDetail {
  /** @description 选中行的元素 */
  target: HTMLTableRowElement;
  /** @description 所有选中的列的键名 */
  column: string;
  /** @description 当前选中的行数据 */
  row: any;
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-current-change": EaTableCurrentChangeEvent;
  }
}
