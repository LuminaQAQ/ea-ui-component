import type {
  A11yOption,
  AttributeOptions,
  ForwardOption,
} from "../types/attribute";
import type { PropertyOptions } from "../types/property";

/** 声明可用的值类型构造器 */
export type DeclaredType = AttributeOptions["type"] | PropertyOptions["type"];

/**
 * 单个属性的完整声明
 * @attribute、@property 与 static properties 共用同一形状
 */
export interface PropertyDecl {
  /** 值类型构造器，如 String / Number / Boolean / 枚举数组 */
  type?: DeclaredType;
  /** 未设置时的默认值，函数视为工厂 */
  default?: unknown;
  /** 值变化时的回调 */
  observer?: (this: any, newVal: any, oldVal: any) => void;
  /** 同步到目标元素的 ARIA 属性 */
  a11y?: A11yOption;
  /** 把属性值转发到目标元素的标签属性 */
  forward?: ForwardOption;
  /**
   * 观察的 HTML attribute
   * - undefined / true：按属性名转成小写连字符
   * - 字符串：使用指定的 attribute 名
   * - false：不观察，仅作为 JavaScript 属性
   */
  attribute?: string | boolean;
}

/**
 * 沿原型链合并后的类级元数据
 */
export interface ClassMeta {
  /** 属性名 → 声明，已合并父类 */
  props: ReadonlyMap<string, PropertyDecl>;
  /** attribute 名（小写连字符）→ 属性名 */
  attrToProp: ReadonlyMap<string, string>;
  /** observedAttributes 的结果 */
  observed: readonly string[];
}
