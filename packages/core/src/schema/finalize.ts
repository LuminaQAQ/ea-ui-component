import { GlobalHTMLElement } from "@utils/env";
import { camelToKebab } from "../utils/case-convert";
import { takeDeclarations } from "./declarations";
import type { ClassMeta, PropertyDecl } from "./types";

/**
 * 类自身声明的结果
 */
interface OwnDeclarations {
  /** 新增或覆盖的声明 */
  decls: Map<string, PropertyDecl>;
  /** 显式声明为 false 而需从继承中移除的属性名 */
  removed: Set<string>;
}

/**
 * 元数据在类上的缓存键
 */
const META = Symbol("ea.meta");

/**
 * 原型链根部的空元数据
 */
const EMPTY_META: ClassMeta = {
  props: new Map(),
  attrToProp: new Map(),
  observed: [],
};

/**
 * 判断键是否属于对象自身
 * ES2020 目标下不可用 Object.hasOwn
 * @param target 目标对象
 * @param key 键
 * @returns 是否自身拥有
 */
function hasOwn(target: object, key: string | symbol): boolean {
  return Object.prototype.hasOwnProperty.call(target, key);
}

/**
 * 计算声明对应的 attribute 名
 * @param name 属性名
 * @param decl 声明
 * @returns attribute 名，不观察时返回 null
 */
export function attributeOf(name: string, decl: PropertyDecl): string | null {
  const { attribute } = decl;

  if (attribute === false) return null;
  if (typeof attribute === "string") return attribute.toLowerCase();

  return camelToKebab(name).toLowerCase();
}

/**
 * 读取类自身声明的属性
 * static properties 先入表，装饰器登记的同名声明覆盖它
 * @param ctor 目标类
 * @returns 类自身拥有的声明与移除名单
 */
function ownDeclarations(ctor: any): OwnDeclarations {
  const decls = new Map<string, PropertyDecl>();
  const removed = new Set<string>();

  if (hasOwn(ctor, "properties")) {
    const declared = ctor.properties as Record<string, PropertyDecl | false>;

    for (const [name, decl] of Object.entries(declared)) {
      if (decl === false) {
        removed.add(name);
        continue;
      }
      decls.set(name, decl);
    }
  }

  for (const [name, decl] of takeDeclarations(ctor)) {
    removed.delete(name);
    decls.set(name, decl);
  }

  return { decls, removed };
}

/**
 * 生成并缓存类元数据
 * 结果只依赖类自身与父类的声明，与书写顺序无关
 * @param ctor 目标类
 * @returns 合并后的元数据
 */
export function finalize(ctor: any): ClassMeta {
  if (!ctor || ctor === GlobalHTMLElement) return EMPTY_META;
  if (hasOwn(ctor, META)) return (ctor as any)[META];

  const parent = finalize(Object.getPrototypeOf(ctor));
  const { decls, removed } = ownDeclarations(ctor);

  const props = new Map(parent.props);
  for (const name of removed) props.delete(name);
  for (const [name, decl] of decls) {
    props.set(name, decl);
  }

  const attrToProp = new Map<string, string>();
  const observed: string[] = [];

  for (const [name, decl] of props) {
    const attr = attributeOf(name, decl);
    if (attr === null || attrToProp.has(attr)) continue;

    attrToProp.set(attr, name);
    observed.push(attr);
  }

  const meta: ClassMeta = { props, attrToProp, observed };

  Object.defineProperty(ctor, META, { value: meta, configurable: true });

  return meta;
}

/**
 * 判断类是否已生成元数据
 * @param ctor 目标类
 * @returns 是否已 finalize
 */
export function isFinalized(ctor: any): boolean {
  return !!ctor && hasOwn(ctor, META);
}
