export class EaOverlayClosedEvent extends Event {
  constructor() {
    super("ea-closed", { bubbles: true, composed: true });
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-closed": EaOverlayClosedEvent;
  }
}
