export interface EaSplitterPanelResizeEndEventDetail {
  size: number[];
}

export class EaSplitterPanelResizeEndEvent extends Event {
  readonly detail: EaSplitterPanelResizeEndEventDetail;

  constructor(detail: EaSplitterPanelResizeEndEventDetail) {
    super("ea-panel-resize-end", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-panel-resize-end": EaSplitterPanelResizeEndEvent;
  }
}
