export class EaTableCellContextmenuEvent extends Event {
  readonly detail: EaTableCellContextmenuEventDetail;
  constructor(detail: EaTableCellContextmenuEventDetail) {
    super("ea-cell-contextmenu", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

interface EaTableCellContextmenuEventDetail {
  /** @description 选中行的元素 */
  cell: HTMLTableCellElement;
  /** @description 所有选中的列的键名 */
  column: string;
  /** @description 当前选中的行数据 */
  row: any;
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-cell-contextmenu": EaTableCellContextmenuEvent;
  }
}
