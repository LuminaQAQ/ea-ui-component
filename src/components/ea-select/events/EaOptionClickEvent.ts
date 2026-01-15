import { EaOption } from "../components/ea-option";

export class EaOptionClickEvent extends Event {
  readonly detail: EaSelectRemoveTagEventDetail;
  constructor(detail: EaSelectRemoveTagEventDetail) {
    super("ea-option-click", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

interface EaSelectRemoveTagEventDetail {
  tag: EaOption;
  tagValue: string;
}
