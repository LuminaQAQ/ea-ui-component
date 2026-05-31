export interface EaTimePickerVisibleChangeEventDetail {
  visible: boolean;
}

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

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-visible-change": EaTimePickerVisibleChangeEvent;
  }
}
