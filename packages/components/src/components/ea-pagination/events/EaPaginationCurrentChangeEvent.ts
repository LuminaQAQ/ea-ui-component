export interface EaPaginationCurrentChangeEventDetail {
  value: number;
}

export class EaPaginationCurrentChangeEvent extends Event {
  readonly detail: EaPaginationCurrentChangeEventDetail;

  constructor(detail: EaPaginationCurrentChangeEventDetail) {
    super("ea-current-change", {
      bubbles: true,
      cancelable: true,
      composed: true,
    });

    this.detail = detail;
  }
}
