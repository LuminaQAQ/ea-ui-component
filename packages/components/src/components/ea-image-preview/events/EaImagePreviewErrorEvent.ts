export class EaImagePreviewErrorEvent extends Event {
  constructor() {
    super("ea-preview-error", { bubbles: true, composed: true });
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-preview-error": EaImagePreviewErrorEvent;
  }
}
