export class EaImageErrorEvent extends Event {
  constructor() {
    super("error", { bubbles: true, composed: true });
  }
}
