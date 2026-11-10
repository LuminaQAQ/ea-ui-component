import type { A11yOption } from "./attribute";

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
  type?: PropertyTypes;
  /** @description 默认值 */
  default?: any;
  /** @description 观察者回调 - 当属性值变化时触发 */
  observer?: ((this: any, newVal: any, oldVal: any) => void) | undefined;
  /** @description 无障碍属性同步配置 */
  a11y?: A11yOption;
}
