export interface EaCheckboxFocusEventDetail {
  value: unknown;
  checked: boolean;
}

export class EaCheckboxFocusEvent extends Event {
  readonly detail: EaCheckboxFocusEventDetail;

  constructor(detail: EaCheckboxFocusEventDetail) {
    super("focus", {
      bubbles: true,
      composed: true,
    });

    this.detail = detail;
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    focus: EaCheckboxFocusEvent;
  }
}
