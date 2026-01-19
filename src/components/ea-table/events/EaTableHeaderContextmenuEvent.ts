export class EaTableHeaderContextmenuEvent extends Event {
  readonly detail: EaTableHeaderContextmenuEventDetail;
  constructor(detail: EaTableHeaderContextmenuEventDetail) {
    super("ea-header-contextmenu", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

interface EaTableHeaderContextmenuEventDetail {
  /** @description 选中行的元素 */
  cell: HTMLTableCellElement;
  /** @description 所有选中的列的键名 */
  column: string;
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-header-contextmenu": EaTableHeaderContextmenuEvent;
  }
}
