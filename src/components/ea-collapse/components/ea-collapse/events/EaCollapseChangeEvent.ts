export interface EaCollapseChangeEventDetail {
  name: string;
  target: HTMLElement;
  active: string | string[];
}

export class EaCollapseChangeEvent extends Event {
  readonly detail: EaCollapseChangeEventDetail;

  constructor(detail: EaCollapseChangeEventDetail) {
    super("ea-change", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-change": EaCollapseChangeEvent;
  }
}
