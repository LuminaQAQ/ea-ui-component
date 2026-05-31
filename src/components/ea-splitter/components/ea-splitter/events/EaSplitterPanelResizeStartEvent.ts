export interface EaSplitterPanelResizeStartEventDetail {
  size: number[];
}

export class EaSplitterPanelResizeStartEvent extends Event {
  readonly detail: EaSplitterPanelResizeStartEventDetail;

  constructor(detail: EaSplitterPanelResizeStartEventDetail) {
    super("ea-panel-resize-start", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-panel-resize-start": EaSplitterPanelResizeStartEvent;
  }
}
