export class EaOverlayOpenEvent extends Event {
  constructor() {
    super("ea-open", { bubbles: true, composed: true });
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-open": EaOverlayOpenEvent;
  }
}
