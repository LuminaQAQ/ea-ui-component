export class EaImageLoadEvent extends Event {
  constructor() {
    super("load", { bubbles: true, composed: true });
  }
}
