export interface EaCalendarSelectEventDetail {
  year: number;
  month: number;
  date: number;
  day: number;
  fullDate: string;
}

export class EaCalendarSelectEvent extends Event {
  readonly detail: EaCalendarSelectEventDetail;

  constructor(detail: EaCalendarSelectEventDetail) {
    super("ea-select", { bubbles: true, composed: true });
    this.detail = detail;
  }
}
