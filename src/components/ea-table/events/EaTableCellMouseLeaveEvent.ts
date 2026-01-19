export class EaTableCellMouseLeaveEvent extends Event {
  readonly detail: EaTableCellMouseLeaveEventDetail;
  constructor(detail: EaTableCellMouseLeaveEventDetail) {
    super("ea-cell-mouse-leave", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

interface EaTableCellMouseLeaveEventDetail {
  /** @description 选中单元格的元素 */
  cell: HTMLTableCellElement;
  /** @description 所有选中的列的键名 */
  column: string;
  /** @description 当前选中的行数据 */
  row: any;
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-cell-mouse-leave": EaTableCellMouseLeaveEvent;
  }
}
