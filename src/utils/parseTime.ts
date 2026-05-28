import dayjs from "dayjs";
import type { ManipulateType } from "dayjs";

const TIME_UNIT_MAP: Record<string, ManipulateType> = {
  ms: "millisecond",
  millisecond: "millisecond",
  milliseconds: "millisecond",
  s: "second",
  sec: "second",
  secs: "second",
  second: "second",
  seconds: "second",
  m: "minute",
  min: "minute",
  mins: "minute",
  minute: "minute",
  minutes: "minute",
  h: "hour",
  hr: "hour",
  hrs: "hour",
  hour: "hour",
  hours: "hour",
  d: "day",
  day: "day",
  days: "day",
  w: "week",
  week: "week",
  weeks: "week",
  M: "month",
  mo: "month",
  mos: "month",
  month: "month",
  months: "month",
  y: "year",
  yr: "year",
  yrs: "year",
  year: "year",
  years: "year",
};

function parseRelativeTime(value: string): dayjs.Dayjs | null {
  const match = value.match(/^([+-]?\d+\.?\d*)\s*([a-zA-Z]+)$/);
  if (!match) return null;

  const amount = parseFloat(match[1]);
  const unit = TIME_UNIT_MAP[match[2]];

  if (!unit || isNaN(amount)) return null;

  return dayjs().add(amount, unit);
}

export function parseToDate(
  value: string | Date | number | undefined | null
): Date | null {
  if (!value) return null;

  if (value instanceof Date) return value;

  if (typeof value === "number") return new Date(value);

  if (typeof value === "string") {
    const trimmed = value.trim();

    if (/^[+-]?\d+$/.test(trimmed)) {
      const num = Number(trimmed);
      if (!isNaN(num)) return new Date(num);
    }

    const relativeTime = parseRelativeTime(trimmed);
    if (relativeTime) return relativeTime.toDate();

    const parsed = dayjs(trimmed);
    if (parsed.isValid()) return parsed.toDate();
  }

  return null;
}
