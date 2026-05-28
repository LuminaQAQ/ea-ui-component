export interface EaColorPickerClearEventDetail {}

export class EaColorPickerClearEvent extends Event {
  readonly detail: EaColorPickerClearEventDetail;

  constructor(detail?: EaColorPickerClearEventDetail) {
    super("ea-clear", { bubbles: true, composed: true });
    this.detail = detail || {};
  }
}

