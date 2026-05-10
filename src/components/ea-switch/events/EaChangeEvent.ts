export class EaSwitchChangeEvent extends Event {
  detail: { value: any };

  constructor(value: any) {
    super("change", { bubbles: true, composed: true });
    this.detail = { value };
  }
}
