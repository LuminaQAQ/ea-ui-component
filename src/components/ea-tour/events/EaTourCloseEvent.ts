export interface EaTourCloseEventDetail {
  current: number;
}

export class EaTourCloseEvent extends Event {
  readonly detail: EaTourCloseEventDetail;

  constructor(detail: EaTourCloseEventDetail) {
    super("ea-close", { bubbles: true, cancelable: true, composed: true });
    this.detail = detail;
  }
}
