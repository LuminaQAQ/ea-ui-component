import type { AttributeOptions, PropertyOptions } from "@/types/index";

/**
 * 解析默认值
 * @param thisArg 函数默认值的 this 上下文
 * @param defaultVal 默认值
 * @returns 解析后的默认值
 */
function parseDefaultValue(thisArg: any, defaultVal: any): any {
  return typeof defaultVal === "function"
    ? defaultVal.call(thisArg)
    : defaultVal !== undefined
      ? defaultVal
      : null;
}

function parseStringType(
  type: AttributeOptions["type"] | PropertyOptions["type"]
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
 * @param thisArg 函数默认值的 this 上下文
 * @param value 属性值
 * @param type 目标类型
 * @param defaultVal 默认值
 * @returns 转换后的值
 */
export function parseAttributeValue(
  thisArg: any,
  value: string | null,
  type: AttributeOptions["type"] | PropertyOptions["type"],
  defaultVal?: any
): any {
  if (value === null) {
    return parseDefaultValue(thisArg, defaultVal);
  }

  if (Array.isArray(type)) {
    return type.includes(value)
      ? value
      : parseDefaultValue(thisArg, defaultVal);
  }

  if (typeof type === "object" && type !== null) {
    const realType = Object.entries(type).filter(_ =>
      typeof _[1] === "function" ? _[1](value) : false
    );
    return realType && realType?.length
      ? parseAttributeValue(thisArg, value, realType[0][0] as any, defaultVal)
      : parseDefaultValue(thisArg, defaultVal);
  }

  type = parseStringType(type);

  switch (type) {
    case String: {
      return value;
    }
    case Number: {
      const num = Number(value);
      return isNaN(num) ? parseDefaultValue(thisArg, defaultVal) : num;
    }
    case Boolean: {
      return value === "true" || value === "";
    }
    case Date: {
      const date = new Date(value);
      return isNaN(date.getTime())
        ? parseDefaultValue(thisArg, defaultVal)
        : date;
    }
    case Array: {
      try {
        return JSON.parse(value);
      } catch {
        return parseDefaultValue(thisArg, defaultVal);
      }
    }
    case RegExp: {
      try {
        return new RegExp(value);
      } catch {
        return parseDefaultValue(thisArg, defaultVal);
      }
    }
    case Function: {
      return parseDefaultValue(thisArg, defaultVal);
    }
    default: {
      if (Array.isArray(type)) {
        return type.includes(value)
          ? value
          : parseDefaultValue(thisArg, defaultVal);
      }
      if (typeof type === "object" && type !== null) {
        const realType = Object.entries(type).filter(_ =>
          typeof _[1] === "function" ? _[1](value) : false
        );
        return realType && realType?.length
          ? parseAttributeValue(
              thisArg,
              value,
              realType[0][0] as any,
              defaultVal
            )
          : parseDefaultValue(thisArg, defaultVal);
      }
      return value;
    }
  }
}

export { parseDefaultValue };
export default parseAttributeValue;
