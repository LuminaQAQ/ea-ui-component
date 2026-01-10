export class EaCountdownFinishEvent extends Event {
  readonly detail: EaCountdownFinishEventDetail;

  constructor(detail: EaCountdownFinishEventDetail) {
    super("ea-finish", {
      bubbles: true,
      composed: true,
    });

    this.detail = detail;
  }
}

interface EaCountdownFinishEventDetail {
  /** @description 当前时间 */
  value: number;
  /** @description 显示时间 */
  displayValue: string;
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-finish": EaCountdownFinishEvent;
  }
}
