export interface EaColorPickerPanelInvalidColorEventDetail {
  value: string;
}

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

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-invalid-color": EaColorPickerPanelInvalidColorEvent;
  }
}
