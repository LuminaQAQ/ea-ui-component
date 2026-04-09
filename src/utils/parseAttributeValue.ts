import type { AttributeOptions } from "@mytypes/index";

/**
 * 解析属性值为指定类型
 * @param value 属性值
 * @param type 目标类型
 * @returns 转换后的值
 */
export function parseAttributeValue(
  value: string | null,
  type: AttributeOptions["type"]
): any {
  if (value === null) return null;

  switch (type) {
    case String:
      return value;
    case Number:
      return Number(value);
    case Boolean:
      return value !== "false" && value !== "";
    case Date:
      return new Date(value);
    default:
      // 处理枚举类型（数组）
      if (Array.isArray(type)) {
        return type.includes(value) ? value : type[0];
      }
      return value;
  }
}

export default parseAttributeValue;
