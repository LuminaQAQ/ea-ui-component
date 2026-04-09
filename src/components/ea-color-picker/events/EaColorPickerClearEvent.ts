/**
 * 颜色选择器清除事件
 * @event EaColorPickerClearEvent
 */
export class EaColorPickerClearEvent extends Event {
  constructor() {
    super("ea-clear", { bubbles: true, composed: true });
  }
}
