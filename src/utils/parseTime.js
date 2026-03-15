import dayjs from "dayjs";

/**
 * 时间单位映射表
 * 支持 dayjs 的单位和常用简写
 */
export const TIME_UNIT_MAP = {
  // 毫秒
  ms: "millisecond",
  millisecond: "millisecond",
  milliseconds: "millisecond",
  // 秒
  s: "second",
  sec: "second",
  secs: "second",
  second: "second",
  seconds: "second",
  // 分钟
  m: "minute",
  min: "minute",
  mins: "minute",
  minute: "minute",
  minutes: "minute",
  // 小时
  h: "hour",
  hr: "hour",
  hrs: "hour",
  hour: "hour",
  hours: "hour",
  // 天
  d: "day",
  day: "day",
  days: "day",
  // 周
  w: "week",
  week: "week",
  weeks: "week",
  // 月
  M: "month",
  mo: "month",
  mos: "month",
  month: "month",
  months: "month",
  // 年
  y: "year",
  yr: "year",
  yrs: "year",
  year: "year",
  years: "year",
};

/**
 * 解析相对时间字符串
 * @param {string} value - 时间字符串，如 "1s", "2m", "3h", "1d", "2w", "3M", "1y"
 * @returns {dayjs.Dayjs|null} - 解析后的 dayjs 对象，如果不是相对时间格式则返回 null
 *
 * @example
 * parseRelativeTime("1s")      // dayjs().add(1, "second")
 * parseRelativeTime("5m")      // dayjs().add(5, "minute")
 * parseRelativeTime("2.5h")    // dayjs().add(2.5, "hour")
 * parseRelativeTime("1d")      // dayjs().add(1, "day")
 * parseRelativeTime("2w")      // dayjs().add(2, "week")
 * parseRelativeTime("3M")      // dayjs().add(3, "month")
 * parseRelativeTime("1y")      // dayjs().add(1, "year")
 * parseRelativeTime("10 min")  // dayjs().add(10, "minute")
 * parseRelativeTime("-30s")    // dayjs().add(-30, "second")
 */
export function parseRelativeTime(value) {
  if (typeof value !== "string" || !value.trim()) {
    return null;
  }

  const trimmed = value.trim();

  // 匹配数字 + 单位格式，如 "1s", "2.5m", "-3h"
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
 * 将值转换为 Date 对象
 * 支持相对时间字符串（如 "1s", "2m"）或普通日期字符串/Date对象
 * @param {string|Date|number} value - 时间值
 * @returns {Date|null} - 转换后的 Date 对象，如果无法解析则返回 null
 *
 * @example
 * parseToDate("1s")                    // 当前时间 + 1秒
 * parseToDate("5m")                    // 当前时间 + 5分钟
 * parseToDate("2026-12-31 23:59:59")   // 指定日期
 * parseToDate(new Date())              // Date 对象
 */
export function parseToDate(value) {
  if (!value) return null;

  // 如果已经是 Date 对象，直接返回
  if (value instanceof Date) {
    return value;
  }

  // 如果是数字（时间戳），转换为 Date
  if (typeof value === "number") {
    return new Date(value);
  }

  // 如果是字符串，先尝试解析为相对时间
  if (typeof value === "string") {
    const relativeTime = parseRelativeTime(value);
    if (relativeTime) {
      return relativeTime.toDate();
    }

    // 否则尝试作为普通日期解析
    const parsed = dayjs(value);
    if (parsed.isValid()) {
      return parsed.toDate();
    }
  }

  return null;
}

/**
 * 检查值是否为相对时间字符串
 * @param {string} value - 要检查的值
 * @returns {boolean} - 是否为相对时间格式
 *
 * @example
 * isRelativeTime("1s")     // true
 * isRelativeTime("5m")     // true
 * isRelativeTime("2026")   // false
 */
export function isRelativeTime(value) {
  return parseRelativeTime(value) !== null;
}

export default {
  TIME_UNIT_MAP,
  parseRelativeTime,
  parseToDate,
  isRelativeTime,
};
