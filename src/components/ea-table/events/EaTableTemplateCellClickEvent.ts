export class EaTableTemplateCellClickEvent extends Event {
  readonly detail: EaTableTemplateCellClickEventDetail;
  constructor(detail: EaTableTemplateCellClickEventDetail) {
    super("ea-template-cell-click", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

interface EaTableTemplateCellClickEventDetail {
  /** @description 点击的目标元素 */
  target: HTMLElement;
  /** @description 当前行的数据 */
  rowData: any;
  /** @description 当前行的索引 */
  rowIndex: number;
  /** @description 原始的鼠标事件 */
  originalEvent: MouseEvent;
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-template-cell-click": EaTableTemplateCellClickEvent;
  }
}
