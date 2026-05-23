/**
 * 时间选择器获得焦点事件
 * @event EaTimePickerFocusEvent
 */
export class EaTimePickerFocusEvent extends Event {
  constructor() {
    super("focus", {
      bubbles: true,
      composed: true,
    });
  }
}