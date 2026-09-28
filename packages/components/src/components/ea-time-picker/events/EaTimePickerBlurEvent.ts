export class EaTimePickerBlurEvent extends Event {
  constructor() {
    super("blur", {
      bubbles: true,
      composed: true,
    });
  }
}
