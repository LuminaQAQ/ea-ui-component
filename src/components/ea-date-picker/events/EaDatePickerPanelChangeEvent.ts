export interface EaDatePickerPanelChangeEventDetail {
  date: Date;
  mode: "month" | "year";
  view?: string;
}

export class EaDatePickerPanelChangeEvent extends Event {
  readonly detail: EaDatePickerPanelChangeEventDetail;

  constructor(detail: EaDatePickerPanelChangeEventDetail) {
    super("ea-panel-change", {
      bubbles: true,
      composed: true,
    });

    this.detail = detail;
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-panel-change": EaDatePickerPanelChangeEvent;
  }
}
