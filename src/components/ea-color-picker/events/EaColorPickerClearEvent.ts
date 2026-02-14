export class EaColorPickerClearEvent extends Event {
  constructor() {
    super("ea-clear", { bubbles: true, composed: true });
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-clear": EaColorPickerClearEvent;
  }
}