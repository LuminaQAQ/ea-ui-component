export class EaTableSelectionChangeEvent extends Event {
  readonly detail: EaTableSelectionChangeEventDetail;
  constructor(detail: EaTableSelectionChangeEventDetail) {
    super("ea-selection-change", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

interface EaTableSelectionChangeEventDetail {
  newSelection: any[];
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-selection-change": EaTableSelectionChangeEvent;
  }
}
