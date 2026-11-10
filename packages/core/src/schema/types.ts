import type {
  A11yOption,
  AttributeOptions,
  ForwardOption,
} from "../types/attribute";
import type { PropertyOptions } from "../types/property";

/** 声明可用的值类型构造器 */
export type DeclaredType = AttributeOptions["type"] | PropertyOptions["type"];

/**
 * 两张表共用的属性声明全集
 * `static attributes` 与 `@attribute` 在此基础上增加 `name`
 */
export interface PropertyDecl {
  /** 值类型构造器，如 String / Number / Boolean / 枚举数组 */
  type?: DeclaredType;
  /**
   * 默认值，函数视为工厂（仅 `@attribute` 一侧会被执行）
   * 省略时由字段初值在构造期推断，见 `resolveDefault`
   */
  default?: unknown;
  /** 值变化时的回调 */
  observer?: (this: any, newVal: any, oldVal: any) => void;
  /** 同步到目标元素的 ARIA 属性 */
  a11y?: A11yOption;
  /** 把属性值转发到目标元素的标签属性 */
  forward?: ForwardOption;
}

/**
 * 映射到 HTML attribute 一侧的声明
 * 与 `PropertyDecl` 的区别只有“能不能指定 attribute 名”
 */
export interface AttributeDecl extends PropertyDecl {
  /** 映射的 attribute 名，省略时由属性名转小写连字符 */
  name?: string;
}

/**
 * 归一化后的单条属性元数据
 */
export interface PropMeta {
  /** 原始声明，来自 attributes 或 properties 任一侧 */
  decl: PropertyDecl;
  /** 归一化后的 attribute 名；不映射 HTML 时为 null */
  attributeName: string | null;
}

/**
 * 沿原型链合并后的类级元数据
 */
export interface ClassMeta {
  /** 属性名 → 归一化记录，已合并父类 */
  props: ReadonlyMap<string, PropMeta>;
  /** attribute 名（小写连字符）→ 属性名 */
  attrToProp: ReadonlyMap<string, string>;
  /** observedAttributes 的结果 */
  observed: readonly string[];
  /**
   * 本类首个实例构造时从字段初值推断出的默认值
   * 不写回 `decl.default`，避免污染按引用共享的父类声明
   */
  inferred: Map<string, unknown>;
  /** 父类元数据，用于沿链查找尚未在本类推断的默认值 */
  parent: ClassMeta | null;
}
