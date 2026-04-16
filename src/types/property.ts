/**
 * @description Property 装饰器支持的类型
 */
export type PropertyTypes =
  | StringConstructor
  | NumberConstructor
  | BooleanConstructor
  | DateConstructor
  | ArrayConstructor
  | RegExpConstructor
  | FunctionConstructor
  | Object
  | any[];

/**
 * @description Property 装饰器选项
 * 用于声明组件的响应式属性
 */
export interface PropertyOptions {
  /** @description 属性类型 - 支持基本类型、Array、RegExp、Function 等 */
  type: PropertyTypes;
  /** @description 默认值 */
  default?: any;
  /** @description 是否映射到 HTML attribute（默认为 false，即 props 模式） */
  attr?: boolean;
  /** @description 观察者回调 - 当属性值变化时触发 */
  observer?: ((this: any, newVal: any, oldVal: any) => void) | undefined;
  /** @description 是否保留函数原始值（不执行函数） */
  rawFunction?: boolean;
  /** @description 是否可重复（用于数组类型） */
  repeatable?: boolean;
}

/**
 * @description Property 属性映射表
 * 键：类名
 * 值：属性名到 PropertyOptions 的映射
 */
export type ElementPropertyMap = Map<string, Record<string, PropertyOptions>>;
