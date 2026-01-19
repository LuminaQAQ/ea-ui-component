export class EaTableRowDBLClickEvent extends Event {
  readonly detail: EaTableRowDBLClickEventDetail;
  constructor(detail: EaTableRowDBLClickEventDetail) {
    super("ea-row-dblclick", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

interface EaTableRowDBLClickEventDetail {
  /** @description 选中行的元素 */
  target: HTMLTableCellElement;
  /** @description 所有选中的列的键名 */
  column: string;
  /** @description 当前选中的行数据 */
  row: any;
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-row-dblclick": EaTableRowDBLClickEvent;
  }
}
