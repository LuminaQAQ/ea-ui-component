export class EaSelectClearEvent extends Event {
  constructor() {
    super("ea-clear", { bubbles: true, composed: true });
  }
}
