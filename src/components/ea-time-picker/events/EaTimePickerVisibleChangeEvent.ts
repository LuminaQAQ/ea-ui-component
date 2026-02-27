/**
 * 时间选择器可见性改变事件
 * @event EaTimePickerVisibleChangeEvent
 * @property {boolean} visible - 下拉列表当前可见状态
 */
export class EaTimePickerVisibleChangeEvent extends Event {
  readonly detail: EaTimePickerVisibleChangeEventDetail;

  constructor(detail: EaTimePickerVisibleChangeEventDetail) {
    super("ea-visible-change", {
      bubbles: true,
      cancelable: true,
      composed: true,
    });

    this.detail = detail;
  }
}

interface EaTimePickerVisibleChangeEventDetail {
  /** @description 下拉列表当前可见状态 */
  visible: boolean;
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-visible-change": EaTimePickerVisibleChangeEvent;
  }
}
