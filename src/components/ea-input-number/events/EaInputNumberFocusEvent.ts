export class EaInputNumberFocusEvent extends Event {
  constructor() {
    super("focus", { bubbles: true, composed: true });
  }
}
