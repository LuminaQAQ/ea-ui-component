export interface EaTreeNodeClickEventDetail {
  data: any;
}

export class EaTreeNodeClickEvent extends Event {
  readonly detail: EaTreeNodeClickEventDetail;
  constructor(detail: EaTreeNodeClickEventDetail) {
    super("ea-node-click", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-node-click": EaTreeNodeClickEvent;
  }
}
