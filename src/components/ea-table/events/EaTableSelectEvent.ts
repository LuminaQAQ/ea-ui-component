export class EaTableSelectEvent extends Event {
  readonly detail: EaTableSelectEventDetail;
  constructor(detail: EaTableSelectEventDetail) {
    super("ea-select", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

interface EaTableSelectEventDetail {
  /** @description 所有选中行的数据 */
  selection: any[];
  /** @description 当前选中的行数据 */
  row: any;
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-select": EaTableSelectEvent;
  }
}
