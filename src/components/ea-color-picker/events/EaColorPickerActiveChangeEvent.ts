/**
 * 颜色选择器活动颜色变化事件
 * @event EaColorPickerActiveChangeEvent
 * @property {string} value - 当前活动颜色值
 */
export class EaColorPickerActiveChangeEvent extends Event {
  readonly detail: EaColorPickerActiveChangeEventDetail;

  constructor(detail: EaColorPickerActiveChangeEventDetail) {
    super("ea-active-change", {
      bubbles: true,
      cancelable: true,
      composed: true,
    });

    this.detail = detail;
  }
}

interface EaColorPickerActiveChangeEventDetail {
  /** @description 当前活动颜色值 */
  value: string;
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-active-change": EaColorPickerActiveChangeEvent;
  }
}
