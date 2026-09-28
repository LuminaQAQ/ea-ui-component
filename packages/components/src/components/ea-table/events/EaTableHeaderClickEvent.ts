export class EaTableHeaderClickEvent extends Event {
  readonly detail: EaTableHeaderClickEventDetail;
  constructor(detail: EaTableHeaderClickEventDetail) {
    super("ea-header-click", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

interface EaTableHeaderClickEventDetail {
  /** @description 选中行的元素 */
  cell: HTMLTableCellElement;
  /** @description 所有选中的列的键名 */
  column: string;
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-header-click": EaTableHeaderClickEvent;
  }
}
