export class EaColorPickerActiveChangeEvent extends Event {
  readonly detail: EaColorPickerActiveChangeEventDetail;

  constructor(detail: EaColorPickerActiveChangeEventDetail) {
    super("ea-active-change", { bubbles: true, cancelable: true, composed: true });

    this.detail = detail;
  }
}

interface EaColorPickerActiveChangeEventDetail {
  value: string;
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-active-change": EaColorPickerActiveChangeEvent;
  }
}