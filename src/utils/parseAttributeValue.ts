import type { AttributeOptions } from "@mytypes/index";

/**
 * 解析默认值
 * @param defaultVal 默认值
 * @returns 解析后的默认值
 */
function parseDefaultValue(defaultVal: any): any {
  return typeof defaultVal === "function"
    ? defaultVal()
    : defaultVal !== undefined
      ? defaultVal
      : null;
}

/**
 * 解析属性值为指定类型
 * @param value 属性值
 * @param type 目标类型
 * @param defaultVal 默认值
 * @returns 转换后的值
 */
export function parseAttributeValue(
  value: string | null,
  type: AttributeOptions["type"],
  defaultVal?: any
): any {
  if (value === null) {
    return parseDefaultValue(defaultVal);
  }

  switch (type) {
    case String: {
      return value;
    }
    case Number: {
      const num = Number(value);
      return isNaN(num) ? parseDefaultValue(defaultVal) : num;
    }
    case Boolean: {
      return value !== "false" && value !== "";
    }
    case Date: {
      const date = new Date(value);
      return isNaN(date.getTime()) ? parseDefaultValue(defaultVal) : date;
    }
    default: {
      if (Array.isArray(type)) {
        return type.includes(value) ? value : parseDefaultValue(defaultVal);
      }
      if (typeof type === "object" && type !== null) {
        const realType = Object.entries(type).filter(_ =>
          typeof _[1] === "function" ? _[1]() : false
        );
        return realType && realType?.length
          ? parseAttributeValue(value, realType[0][0] as any, defaultVal)
          : parseDefaultValue(defaultVal);
      }
      return value;
    }
  }
}

export { parseDefaultValue };
export default parseAttributeValue;
