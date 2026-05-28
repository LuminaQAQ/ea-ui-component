export interface EaDatePickerChangeEventDetail {
  fullDate: string;
  year: number | null;
  month: number | null;
  date: number | null;
  week: number | null;
}

export class EaDatePickerChangeEvent extends Event {
  readonly detail: EaDatePickerChangeEventDetail;

  constructor(detail: EaDatePickerChangeEventDetail) {
    super("ea-change", {
      bubbles: true,
      composed: true,
    });

    this.detail = detail;
  }
}

