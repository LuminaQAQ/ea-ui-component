export class EaTableRowClickEvent extends Event {
  readonly detail: EaTableRowClickEventDetail;
  constructor(detail: EaTableRowClickEventDetail) {
    super("ea-row-click", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

interface EaTableRowClickEventDetail {
  /** @description 选中行的元素 */
  target: HTMLTableRowElement;
  /** @description 所有选中的列的键名 */
  column: string;
  /** @description 当前选中的行数据 */
  row: any;
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-row-click": EaTableRowClickEvent;
  }
}
