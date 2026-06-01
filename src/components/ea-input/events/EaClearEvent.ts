export interface EaInputClearEventDetail {
  oldValue: string;
}

export class EaInputClearEvent extends Event {
  readonly detail: EaInputClearEventDetail;

  constructor(detail: EaInputClearEventDetail) {
    super("ea-clear", { bubbles: true, cancelable: true, composed: true });
    this.detail = detail;
  }
}
