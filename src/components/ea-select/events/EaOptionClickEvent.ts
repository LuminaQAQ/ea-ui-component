import { EaOption } from "../components/ea-option";

export class EaOptionClickEvent extends Event {
  readonly detail: EaOptionClickEventDetail;
  constructor(detail: EaOptionClickEventDetail) {
    super("ea-option-click", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

interface EaOptionClickEventDetail {
  value: string;
  target: EaOption;
}
