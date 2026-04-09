/**
 * @description 枚举类型构造器
 */
export type EnumConstructor = any[];

/**
 * @description 自定义元素属性类型
 */
export type CustomElementAttributeTypes =
  | StringConstructor
  | NumberConstructor
  | BooleanConstructor
  | DateConstructor
  | EnumConstructor;

/**
 * @description 带 ShadowRoot 的元素接口
 */
export interface ShadowRootElement extends HTMLElement {
  __observedAttributes: any[];
  __observedAttributesCallback: Record<
    string,
    (this: ShadowRootElement, newVal: any, oldVal: any) => void
  >;
  shadowRoot: ShadowRoot;
  [key: string]: any;
}

/**
 * @description 属性装饰器选项
 */
export interface AttributeOptions {
  /** @description 属性类型 - 基本数据类型 */
  type: CustomElementAttributeTypes;
  /** @description 观察者回调 */
  observer?: ((this: any, newVal: any, oldVal: any) => void) | undefined;
}

/**
 * @description 属性映射表
 * 键：类名
 * 值：属性名到选项的映射
 */
export type PropertyMap = Map<string, Record<string, AttributeOptions>>;
