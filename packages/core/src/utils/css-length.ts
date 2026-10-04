const CSS_LENGTH_UNIT_LIST = [
  "px",
  "cm",
  "mm",
  "Q",
  "in",
  "pt",
  "pc",
  "em",
  "rem",
  "ex",
  "ch",
  "cap",
  "ic",
  "lh",
  "rlh",
  "vw",
  "vh",
  "vi",
  "vb",
  "vmin",
  "vmax",
  "svw",
  "svh",
  "lvw",
  "lvh",
  "dvw",
  "dvh",
  "cqw",
  "cqh",
  "cqi",
  "cqb",
  "cqmin",
  "cqmax",
  "%",
] as const;

/** CSS 合法长度单位（含百分比） */
export type CssLengthUnit = (typeof CSS_LENGTH_UNIT_LIST)[number];

const CSS_LENGTH_RE = new RegExp(
  `^[+-]?(?:\\d+(?:\\.\\d+)?|\\.\\d+)(?:[eE][+-]?\\d+)?(?:${CSS_LENGTH_UNIT_LIST.join("|")})$`,
  "i"
);
const CSS_ZERO_RE = /^[+-]?(?:0+(?:\.0+)?|\.0+)(?:[eE][+-]?\d+)?$/;

/**
 * 将合法的 CSS 长度值解析为纯数字（仅取值，不做单位换算）
 * @param value 待解析的 CSS 长度值，如 `'12px'`、`'1.5rem'`
 * @returns 数字部分；`value` 为空或不是合法 CSS 长度值时返回 `NaN`
 * @example
 * cssLengthToNumber('12px') // 12
 * cssLengthToNumber('1.5rem') // 1.5
 * cssLengthToNumber('-3em') // -3
 * cssLengthToNumber('0') // 0（CSS 允许无单位的 0）
 * cssLengthToNumber('12') // NaN（非零值必须带单位）
 * cssLengthToNumber('12.5.3px') // NaN
 * cssLengthToNumber('auto') // NaN
 */
export const cssLengthToNumber = (value: string | undefined | null): number => {
  if (value == null) return NaN;
  const text = value.trim();
  if (CSS_ZERO_RE.test(text)) return 0;
  if (!CSS_LENGTH_RE.test(text)) return NaN;
  return parseFloat(text);
};

/**
 * 将数字拼接为指定单位的 CSS 长度值
 * @param value 数值
 * @param unit CSS 长度单位，默认为 `'px'`
 * @returns 拼接后的 CSS 长度字符串
 * @example
 * numberToCssLength(12) // '12px'
 * numberToCssLength(1.5, 'rem') // '1.5rem'
 */
export const numberToCssLength = (
  value: number,
  unit: CssLengthUnit = "px"
): string => {
  return `${value}${unit}`;
};
