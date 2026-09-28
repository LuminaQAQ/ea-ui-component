export class EaOverlayOpenEvent extends Event {
  constructor() {
    super("ea-open", { bubbles: true, composed: true });
  }
}
