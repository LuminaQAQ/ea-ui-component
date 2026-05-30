export interface EaPopconfirmConfirmEventDetail {}

export class EaPopconfirmConfirmEvent extends Event {
  readonly detail: EaPopconfirmConfirmEventDetail;

  constructor(detail?: EaPopconfirmConfirmEventDetail) {
    super("ea-confirm", { bubbles: true, composed: true });
    this.detail = detail ?? {};
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-confirm": EaPopconfirmConfirmEvent;
  }
}
