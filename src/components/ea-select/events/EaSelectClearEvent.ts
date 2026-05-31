export interface EaSelectClearEventDetail {}

export class EaSelectClearEvent extends Event {
  readonly detail: EaSelectClearEventDetail;

  constructor(detail: EaSelectClearEventDetail = {}) {
    super("ea-clear", { bubbles: true, composed: true });
    this.detail = detail;
  }
}
