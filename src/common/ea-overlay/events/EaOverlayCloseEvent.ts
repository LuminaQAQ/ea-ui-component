export class EaOverlayCloseEvent extends Event {
  constructor() {
    super("ea-close", { bubbles: true, composed: true });
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-close": EaOverlayCloseEvent;
  }
}
