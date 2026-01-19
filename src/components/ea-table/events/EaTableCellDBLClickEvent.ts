export class EaTableCellDBLClickEvent extends Event {
  readonly detail: EaTableCellDBLClickEventDetail;
  constructor(detail: EaTableCellDBLClickEventDetail) {
    super("ea-cell-dblclick", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

interface EaTableCellDBLClickEventDetail {
  /** @description 选中行的元素 */
  cell: HTMLTableCellElement;
  /** @description 所有选中的列的键名 */
  column: string;
  /** @description 当前选中的行数据 */
  row: any;
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-cell-dblclick": EaTableCellDBLClickEvent;
  }
}
