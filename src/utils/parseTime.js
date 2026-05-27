import dayjs from "dayjs";

const TIME_UNIT_MAP = {
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

function parseRelativeTime(value) {
  if (typeof value !== "string" || !value.trim()) {
    return null;
  }

  const trimmed = value.trim();

  const match = trimmed.match(/^([+-]?\d+\.?\d*)\s*([a-zA-Z]+)$/);

  if (!match) {
    return null;
  }

  const amount = parseFloat(match[1]);
  const unit = match[2];

  const dayjsUnit = TIME_UNIT_MAP[unit];

  if (!dayjsUnit || isNaN(amount)) {
    return null;
  }

  return dayjs().add(amount, dayjsUnit);
}

/**
 * @param {string|Date|number} value - 时间值
 * @returns {Date|null}
 */
export function parseToDate(value) {
  if (!value) return null;

  if (value instanceof Date) {
    return value;
  }

  if (typeof value === "number") {
    return new Date(value);
  }

  if (typeof value === "string") {
    const relativeTime = parseRelativeTime(value);
    if (relativeTime) {
      return relativeTime.toDate();
    }

    const parsed = dayjs(value);
    if (parsed.isValid()) {
      return parsed.toDate();
    }
  }

  return null;
}

export default {
  parseToDate,
};
