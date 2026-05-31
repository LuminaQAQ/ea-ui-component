export interface EaTreeNodeContextmenuEventDetail {
  data: any;
  node: any;
}

export class EaTreeNodeContextmenuEvent extends Event {
  readonly detail: EaTreeNodeContextmenuEventDetail;
  constructor(detail: EaTreeNodeContextmenuEventDetail) {
    super("ea-node-contextmenu", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-node-contextmenu": EaTreeNodeContextmenuEvent;
  }
}
