/**
 * 组件变体类型常量
 * 用于统一所有组件的 variant 属性可选值
 */
export const VARIANT_TYPES = [
  "primary",
  "success",
  "warning",
  "danger",
  "info",
] as const;

/**
 * Variant 类型
 */
export type VariantType = (typeof VARIANT_TYPES)[number];

/**
 * Variant 类型默认值
 */
export const VARIANT_DEFAULT = "info";

/**
 * Variant 类型映射（用于图标等场景）
 * danger 和 error 等价
 */
export const VARIANT_ICON_MAP: Record<string, string> = {
  primary: "circle-info",
  success: "circle-check",
  info: "circle-info",
  warning: "triangle-exclamation",
  danger: "circle-xmark",
  error: "circle-xmark", // 兼容处理
};
