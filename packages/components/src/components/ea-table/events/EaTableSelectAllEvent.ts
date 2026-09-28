export class EaTableSelectAllEvent extends Event {
  readonly detail: EaTableSelectAllEventDetail;
  constructor(detail: EaTableSelectAllEventDetail) {
    super("ea-select-all", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

interface EaTableSelectAllEventDetail {
  /** @description 所有选中行的数据 */
  selection: any[];
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-select-all": EaTableSelectAllEvent;
  }
}
