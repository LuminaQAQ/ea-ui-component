export interface EaDropdownCommandEventDetail {
  command: string;
}

export class EaDropdownCommandEvent extends Event {
  readonly detail: EaDropdownCommandEventDetail;

  constructor(detail: EaDropdownCommandEventDetail) {
    super("ea-command", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-command": EaDropdownCommandEvent;
  }
}
