export class EaTableSortChangeEvent extends Event {
  readonly detail: EaTableSortChangeEventDetail;
  constructor(detail: EaTableSortChangeEventDetail) {
    super("ea-sort-change", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

interface EaTableSortChangeEventDetail {
  /** @description 的列的键名 */
  prop: string;
  /** @description 当前选中的行数据 */
  order: "asc" | "desc";
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-sort-change": EaTableSortChangeEvent;
  }
}
