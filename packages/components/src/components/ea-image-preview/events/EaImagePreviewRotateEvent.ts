export interface EaImagePreviewRotateEventDetail {
  oldVal: number;
  rotate: number;
}

export class EaImagePreviewRotateEvent extends Event {
  readonly detail: EaImagePreviewRotateEventDetail;

  constructor(detail: EaImagePreviewRotateEventDetail) {
    super("ea-rotate", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-rotate": EaImagePreviewRotateEvent;
  }
}
