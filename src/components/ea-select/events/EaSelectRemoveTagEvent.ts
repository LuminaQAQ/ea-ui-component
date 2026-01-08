import { EaTag } from "@/components/ea-tag";

export class EaSelectRemoveTagEvent extends Event {
  readonly detail: EaSelectRemoveTagEventDetail;
  constructor(detail: EaSelectRemoveTagEventDetail) {
    super("ea-remove-tag", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

interface EaSelectRemoveTagEventDetail {
  tag: EaTag;
  tagValue: string;
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-remove-tag": EaSelectRemoveTagEvent;
  }
}
