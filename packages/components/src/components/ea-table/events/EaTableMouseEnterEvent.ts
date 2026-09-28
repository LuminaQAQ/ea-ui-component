export class EaTableCellMouseEnterEvent extends Event {
  readonly detail: EaTableCellMouseEnterEventDetail;
  constructor(detail: EaTableCellMouseEnterEventDetail) {
    super("ea-cell-mouse-enter", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

interface EaTableCellMouseEnterEventDetail {
  /** @description 选中单元格的元素 */
  cell: HTMLTableCellElement;
  /** @description 所有选中的列的键名 */
  column: string;
  /** @description 当前选中的行数据 */
  row: any;
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-cell-mouse-enter": EaTableCellMouseEnterEvent;
  }
}
