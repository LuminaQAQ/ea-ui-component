export interface EaAnchorChangeEventDetail {
  href: string;
  heading: string;
}

export class EaAnchorChangeEvent extends Event {
  readonly detail: EaAnchorChangeEventDetail;

  constructor(detail: EaAnchorChangeEventDetail) {
    super("ea-change", { bubbles: true, composed: true });
    this.detail = detail;
  }
}
