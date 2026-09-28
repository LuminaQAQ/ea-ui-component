export class EaOverlayOpenedEvent extends Event {
  constructor() {
    super("ea-opened", { bubbles: true, composed: true });
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-opened": EaOverlayOpenedEvent;
  }
}
