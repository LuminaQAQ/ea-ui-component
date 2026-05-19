export class EaSliderChangeEvent extends Event {
  readonly detail: EaSliderChangeEventDetail;

  constructor(detail: EaSliderChangeEventDetail) {
    super("change", { bubbles: true, cancelable: true, composed: true });

    this.detail = detail;
  }
}

interface EaSliderChangeEventDetail {
  value: number;
}

declare global {
  interface GlobalEventHandlersEventMap {
    change: EaSliderChangeEvent;
  }
}
