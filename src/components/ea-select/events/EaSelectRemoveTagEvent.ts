export class EaSelectRemoveTagEvent extends Event {
  readonly detail: EaSelectRemoveTagEventDetail;
  constructor(detail: EaSelectRemoveTagEventDetail) {
    super("ea-remove-tag", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

interface EaSelectRemoveTagEventDetail {
  tag: HTMLElement;
  tagValue: string;
}
