/**
 * 日期选择器面板改变事件
 * @event EaDatePickerPanelChangeEvent
 * @property {Date} date - 当前选中的日期对象
 * @property {'month' | 'year'} mode - 当前面板模式
 * @property {string} [view] - 可选视图信息
 */
export class EaDatePickerPanelChangeEvent extends Event {
  readonly detail: EaDatePickerPanelChangeEventDetail;

  constructor(detail: EaDatePickerPanelChangeEventDetail) {
    super("ea-panel-change", {
      bubbles: true,
      cancelable: true,
      composed: true,
    });

    this.detail = detail;
  }
}

interface EaDatePickerPanelChangeEventDetail {
  /** @description 当前选中的日期对象 */
  date: Date;
  /** @description 当前面板模式 */
  mode: "month" | "year";
  /** @description 可选视图信息 */
  view?: string;
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-panel-change": EaDatePickerPanelChangeEvent;
  }
}
