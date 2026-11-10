import type { AttributeDecl, PropertyDecl } from "./types";

/**
 * 类定义期登记的两张声明表
 */
export interface DeclBuffer {
  /** 映射到 HTML attribute 一侧的声明 */
  attributes: Map<string, AttributeDecl>;
  /** 仅作为 JavaScript 属性一侧的声明 */
  properties: Map<string, PropertyDecl>;
}

/**
 * 类定义期的声明缓冲
 * finalize() 读取后即清除，运行时不再查询这里
 */
const DECL_BUFFER = new WeakMap<Function, DeclBuffer>();

/**
 * 取某个类的缓冲，不存在时创建
 * @param ctor 所属类
 * @returns 该类的登记表
 */
function ensureBuffer(ctor: Function): DeclBuffer {
  let buffer = DECL_BUFFER.get(ctor);

  if (!buffer) {
    buffer = { attributes: new Map(), properties: new Map() };
    DECL_BUFFER.set(ctor, buffer);
  }

  return buffer;
}

/**
 * 登记一个映射到 HTML attribute 的属性声明
 * @param ctor 所属类
 * @param name 属性名
 * @param decl 声明内容
 */
export function declareAttribute(
  ctor: Function,
  name: string,
  decl: AttributeDecl
): void {
  ensureBuffer(ctor).attributes.set(name, decl);
}

/**
 * 登记一个仅作为 JavaScript 属性的声明
 * @param ctor 所属类
 * @param name 属性名
 * @param decl 声明内容
 */
export function declareProperty(
  ctor: Function,
  name: string,
  decl: PropertyDecl
): void {
  ensureBuffer(ctor).properties.set(name, decl);
}

/**
 * 取走并清空某个类的声明缓冲
 * 取走之后再写入同一类，不会进入已生成的元数据
 * @param ctor 所属类
 * @returns 本次登记的两张表
 */
export function takeDeclarations(ctor: Function): DeclBuffer {
  const buffer = DECL_BUFFER.get(ctor);

  if (!buffer) return { attributes: new Map(), properties: new Map() };

  DECL_BUFFER.delete(ctor);

  return buffer;
}
