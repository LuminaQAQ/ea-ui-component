export class EaInputNumberBlurEvent extends Event {
  constructor() {
    super("blur", { bubbles: true, composed: true });
  }
}
