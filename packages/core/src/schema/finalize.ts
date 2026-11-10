import { GlobalHTMLElement } from "@utils/env";
import { camelToKebab } from "../utils/case-convert";
import { takeDeclarations } from "./declarations";
import type { AttributeDecl, ClassMeta, PropMeta, PropertyDecl } from "./types";

/**
 * 某一层自身声明的结果
 */
interface OwnDeclarations {
  /** 本层新增或覆盖的声明，按 attribute / property 标注来源 */
  entries: Map<string, { decl: PropertyDecl; isAttribute: boolean }>;
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
  inferred: new Map(),
  parent: null,
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
 * 计算属性的 attribute 名
 * @param name 属性名
 * @param decl 声明
 * @returns 小写连字符形式的 attribute 名
 */
function toAttributeName(name: string, decl: AttributeDecl): string {
  const custom = decl.name;

  return (
    typeof custom === "string" ? custom : camelToKebab(name)
  ).toLowerCase();
}

/**
 * 把一张声明表读入本层的收集器
 * 同名时后写覆盖先写，`false` 表示从继承中移除
 * @param source 声明表（static attributes / static properties / 装饰器登记）
 * @param into 本层收集结果
 * @param removed 移除名单，两张表共享
 */
function collectTable(
  source: Record<string, any> | Map<string, any> | undefined,
  into: Map<string, PropertyDecl>,
  removed: Set<string>
): void {
  if (!source) return;

  const entries =
    source instanceof Map ? source.entries() : Object.entries(source);

  for (const [name, decl] of entries) {
    if (decl === false) {
      into.delete(name);
      removed.add(name);
      continue;
    }
    if (!decl || typeof decl !== "object") continue;

    into.set(name, decl);
    removed.delete(name);
  }
}

/**
 * 读取类自身拥有的声明
 * 只读自身拥有的静态表，父类的静态表由父类元数据提供
 * 顺序：static attributes → static properties → 装饰器登记（后者覆盖前者）
 * @param ctor 目标类
 * @returns 类自身拥有的声明与移除名单
 */
function ownDeclarations(ctor: any): OwnDeclarations {
  const buffer = takeDeclarations(ctor);
  const attrs = new Map<string, PropertyDecl>();
  const props = new Map<string, PropertyDecl>();
  const removed = new Set<string>();

  const ownAttrs = hasOwn(ctor, "attributes") ? ctor.attributes : undefined;
  const ownProps = hasOwn(ctor, "properties") ? ctor.properties : undefined;

  collectTable(ownAttrs, attrs, removed);
  collectTable(ownProps, props, removed);
  collectTable(buffer.attributes, attrs, removed);
  collectTable(buffer.properties, props, removed);

  const entries = new Map<
    string,
    { decl: PropertyDecl; isAttribute: boolean }
  >();

  for (const [name, decl] of attrs) {
    if (props.has(name)) {
      throw new Error(
        `[ea-ui] 属性 "${name}" 同时出现在 attributes 与 properties 两侧，` +
          "同一个类内同名只能属于一张表"
      );
    }
    entries.set(name, { decl, isAttribute: true });
  }

  for (const [name, decl] of props) {
    entries.set(name, { decl, isAttribute: false });
  }

  return { entries, removed };
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

  const parent: ClassMeta = finalize(Object.getPrototypeOf(ctor));
  const { entries, removed } = ownDeclarations(ctor);

  const props = new Map(parent.props);
  for (const name of removed) props.delete(name);

  for (const [name, { decl, isAttribute }] of entries) {
    const meta: PropMeta = {
      decl,
      attributeName: isAttribute
        ? toAttributeName(name, decl as AttributeDecl)
        : null,
    };

    props.set(name, meta);
  }

  const attrToProp = new Map<string, string>();
  const observed: string[] = [];

  for (const [name, entry] of props) {
    const attr = entry.attributeName;
    if (attr === null || attrToProp.has(attr)) continue;

    attrToProp.set(attr, name);
    observed.push(attr);
  }

  const meta: ClassMeta = {
    props,
    attrToProp,
    observed,
    inferred: new Map(),
    parent,
  };

  Object.defineProperty(ctor, META, { value: meta, configurable: true });

  return meta;
}

/**
 * 解析属性的默认值
 * 优先级：显式 `default` > 构造期推断的字段初值 > `null`
 * @param meta 类元数据
 * @param name 属性名
 * @returns 解析后的默认值（可能仍是工厂函数）
 */
export function resolveDefault(meta: ClassMeta, name: string): unknown {
  const explicit = meta.props.get(name)?.decl.default;

  if (explicit !== undefined) return explicit;

  for (
    let current: ClassMeta | null = meta;
    current;
    current = current.parent
  ) {
    if (current.inferred.has(name)) return current.inferred.get(name);
  }

  return null;
}

/**
 * 判断类是否已生成元数据
 * @param ctor 目标类
 * @returns 是否已 finalize
 */
export function isFinalized(ctor: any): boolean {
  return !!ctor && hasOwn(ctor, META);
}
