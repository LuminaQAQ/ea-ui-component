export interface EaDatePickerVisibleChangeEventDetail {
  visible: boolean;
}

export class EaDatePickerVisibleChangeEvent extends Event {
  readonly detail: EaDatePickerVisibleChangeEventDetail;

  constructor(detail: EaDatePickerVisibleChangeEventDetail) {
    super("ea-visible-change", {
      bubbles: true,
      composed: true,
    });

    this.detail = detail;
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-visible-change": EaDatePickerVisibleChangeEvent;
  }
}
