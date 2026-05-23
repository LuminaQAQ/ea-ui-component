/**
 * 时间选择器失去焦点事件
 * @event EaTimePickerBlurEvent
 */
export class EaTimePickerBlurEvent extends Event {
  constructor() {
    super("blur", {
      bubbles: true,
      composed: true,
    });
  }
}