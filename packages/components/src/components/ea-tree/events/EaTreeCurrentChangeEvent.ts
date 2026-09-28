export interface EaTreeCurrentChangeEventDetail {
  data: any;
  node: any;
}

export class EaTreeCurrentChangeEvent extends Event {
  readonly detail: EaTreeCurrentChangeEventDetail;
  constructor(detail: EaTreeCurrentChangeEventDetail) {
    super("ea-current-change", { bubbles: true, composed: true });
    this.detail = detail;
  }
}
