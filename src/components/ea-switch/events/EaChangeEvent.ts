export class EaSwitchChangeEvent extends Event {
  constructor() {
    super("change", { bubbles: true, composed: true });
  }
}
