/**
 * 颜色选择器面板非法颜色事件
 * @event EaColorPickerPanelInvalidColorEvent
 * @property {string} value - 非法的颜色值
 */
export class EaColorPickerPanelInvalidColorEvent extends Event {
  readonly detail: EaColorPickerPanelInvalidColorEventDetail;

  constructor(detail: EaColorPickerPanelInvalidColorEventDetail) {
    super("ea-invalid-color", {
      bubbles: true,
      composed: true,
    });

    this.detail = detail;
  }
}

interface EaColorPickerPanelInvalidColorEventDetail {
  /** @description 非法的颜色值 */
  value: string;
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-invalid-color": EaColorPickerPanelInvalidColorEvent;
  }
}
