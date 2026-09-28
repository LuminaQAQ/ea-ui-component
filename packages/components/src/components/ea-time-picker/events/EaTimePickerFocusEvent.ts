export class EaTimePickerFocusEvent extends Event {
  constructor() {
    super("focus", {
      bubbles: true,
      composed: true,
    });
  }
}
