/**
 * 时间选择器值改变事件
 * @event EaTimePickerChangeEvent
 * @property {string} value - 当前选中的时间值
 */
export class EaTimePickerChangeEvent extends Event {
  readonly detail: EaTimePickerChangeEventDetail;

  constructor(detail: EaTimePickerChangeEventDetail) {
    super("change", {
      bubbles: true,
      composed: true,
    });

    this.detail = detail;
  }
}

interface EaTimePickerChangeEventDetail {
  /** @description 当前选中的时间值 */
  value: string;
}