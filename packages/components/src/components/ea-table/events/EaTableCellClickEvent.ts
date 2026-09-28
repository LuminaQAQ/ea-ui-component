export class EaTableCellClickEvent extends Event {
  readonly detail: EaTableCellClickEventDetail;
  constructor(detail: EaTableCellClickEventDetail) {
    super("ea-cell-click", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

interface EaTableCellClickEventDetail {
  /** @description 选中行的元素 */
  cell: HTMLTableCellElement;
  /** @description 所有选中的列的键名 */
  column: string;
  /** @description 当前选中的行数据 */
  row: any;
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-cell-click": EaTableCellClickEvent;
  }
}
