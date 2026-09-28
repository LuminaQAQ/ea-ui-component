export interface EaSplitterPanelResizeEventDetail {
  size: number[];
}

export class EaSplitterPanelResizeEvent extends Event {
  readonly detail: EaSplitterPanelResizeEventDetail;

  constructor(detail: EaSplitterPanelResizeEventDetail) {
    super("ea-panel-resize", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-panel-resize": EaSplitterPanelResizeEvent;
  }
}
