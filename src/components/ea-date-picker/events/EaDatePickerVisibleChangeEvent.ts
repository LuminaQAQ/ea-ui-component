/**
 * 日期选择器可见性改变事件
 * @event EaDatePickerVisibleChangeEvent
 * @property {boolean} visible - 下拉列表当前可见状态
 */
export class EaDatePickerVisibleChangeEvent extends Event {
  readonly detail: EaDatePickerVisibleChangeEventDetail;

  constructor(detail: EaDatePickerVisibleChangeEventDetail) {
    super("ea-visible-change", {
      bubbles: true,
      cancelable: true,
      composed: true,
    });

    this.detail = detail;
  }
}

interface EaDatePickerVisibleChangeEventDetail {
  /** @description 下拉列表当前可见状态 */
  visible: boolean;
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-visible-change": EaDatePickerVisibleChangeEvent;
  }
}
