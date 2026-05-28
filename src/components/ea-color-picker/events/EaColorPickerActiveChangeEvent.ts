export interface EaColorPickerActiveChangeEventDetail {
  value: string;
}

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

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-active-change": EaColorPickerActiveChangeEvent;
  }
}
