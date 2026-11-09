import type { PropertyDecl } from "./types";

/**
 * 类定义期的声明缓冲
 * finalize() 读取后即清除，运行时不再查询这里
 */
const DECL_BUFFER = new WeakMap<Function, Map<string, PropertyDecl>>();

/**
 * 登记一个属性声明
 * @param ctor 所属类
 * @param name 属性名
 * @param decl 声明内容
 */
export function declareProperty(
  ctor: Function,
  name: string,
  decl: PropertyDecl
): void {
  let decls = DECL_BUFFER.get(ctor);

  if (!decls) {
    decls = new Map();
    DECL_BUFFER.set(ctor, decls);
  }

  decls.set(name, decl);
}

/**
 * 取走并清空某个类的声明缓冲
 * 取走之后再写入同一类，不会进入已生成的元数据
 * @param ctor 所属类
 * @returns 本次登记的声明表
 */
export function takeDeclarations(ctor: Function): Map<string, PropertyDecl> {
  const decls = DECL_BUFFER.get(ctor);

  if (!decls) return new Map();

  DECL_BUFFER.delete(ctor);

  return decls;
}
