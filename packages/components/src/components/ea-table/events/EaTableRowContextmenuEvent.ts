export class EaTableRowContextmenuEvent extends Event {
  readonly detail: EaTableRowContextmenuEventDetail;
  constructor(detail: EaTableRowContextmenuEventDetail) {
    super("ea-row-contextmenu", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

interface EaTableRowContextmenuEventDetail {
  /** @description 选中行的元素 */
  target: HTMLTableCellElement;
  /** @description 所有选中的列的键名 */
  column: string;
  /** @description 当前选中的行数据 */
  row: any;
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-row-contextmenu": EaTableRowContextmenuEvent;
  }
}
