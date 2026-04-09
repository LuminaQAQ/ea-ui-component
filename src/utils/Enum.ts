import type { EnumConstructor } from "../types/index.js";

/**
 * @description 创建枚举类型
 * @param ary 枚举值数组
 * @returns 枚举构造器
 *
 * @example
 * ```ts
 * const Status = Enum("pending", "success", "error");
 * // 或
 * const Status = Enum(["pending", "success", "error"]);
 * ```
 */
function Enum<T extends readonly (string | number | boolean)[]>(
  ary: T
): EnumConstructor;
function Enum<T extends string | number | boolean>(
  ...values: T[]
): EnumConstructor;
function Enum(...args: any[]): EnumConstructor {
  if (args.length === 1 && Array.isArray(args[0])) {
    return args[0];
  }
  return args;
}

export { Enum };
