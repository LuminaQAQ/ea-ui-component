export interface EaImagePreviewSwitchEventDetail {
  index: number;
  url: string;
  imgTarget: HTMLElement;
}

export class EaImagePreviewSwitchEvent extends Event {
  readonly detail: EaImagePreviewSwitchEventDetail;

  constructor(detail: EaImagePreviewSwitchEventDetail) {
    super("ea-switch", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-switch": EaImagePreviewSwitchEvent;
  }
}
