import type { AttributeOptions, PropertyOptions } from "@/types/index";

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

function parseStringType(
  type: string
): AttributeOptions["type"] | PropertyOptions["type"] {
  switch (type) {
    case "String": {
      return String;
    }
    case "Number": {
      return Number;
    }
    case "Boolean": {
      return Boolean;
    }
    default: {
      return type;
    }
  }
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
  type: AttributeOptions["type"] | PropertyOptions["type"],
  defaultVal?: any
): any {
  if (value === null) {
    return parseDefaultValue(defaultVal);
  }

  if (Array.isArray(type)) {
    return type.includes(value) ? value : parseDefaultValue(defaultVal);
  }

  if (typeof type === "object" && type !== null) {
    const realType = Object.entries(type).filter(_ =>
      typeof _[1] === "function" ? _[1](value) : false
    );
    return realType && realType?.length
      ? parseAttributeValue(value, realType[0][0] as any, defaultVal)
      : parseDefaultValue(defaultVal);
  }

  type = parseStringType(type);

  switch (type) {
    case String: {
      return value;
    }
    case Number: {
      const num = Number(value);
      return isNaN(num) ? parseDefaultValue(defaultVal) : num;
    }
    case Boolean: {
      return value === "true" || value === "";
    }
    case Date: {
      const date = new Date(value);
      return isNaN(date.getTime()) ? parseDefaultValue(defaultVal) : date;
    }
    case Array: {
      try {
        return JSON.parse(value);
      } catch {
        return parseDefaultValue(defaultVal);
      }
    }
    case RegExp: {
      try {
        return new RegExp(value);
      } catch {
        return parseDefaultValue(defaultVal);
      }
    }
    case Function: {
      // Function 类型通常不通过 attribute 传递，返回默认值
      return parseDefaultValue(defaultVal);
    }
    default: {
      if (Array.isArray(type)) {
        return type.includes(value) ? value : parseDefaultValue(defaultVal);
      }
      if (typeof type === "object" && type !== null) {
        const realType = Object.entries(type).filter(_ =>
          typeof _[1] === "function" ? _[1](value) : false
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
