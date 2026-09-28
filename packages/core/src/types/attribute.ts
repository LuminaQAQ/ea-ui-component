/**
 * @description 枚举类型构造器
 */
export type EnumConstructor = any[];

export interface HTMLFormElementConstructor {
  new (): HTMLFormElement;
}

export interface HTMLFormValidityConstructor {
  new (): ValidityState;
}

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
 * @description 无障碍属性同步选项
 */
export interface A11yOption {
  /** @description 同步到的 ARIA 属性名（如 'aria-disabled'、'aria-expanded'） */
  ariaAttr: string;
  /** @description 目标元素选择器，默认 ':host' 表示组件宿主元素 */
  target?: string;
  /** @description 值映射函数，返回 null 时移除属性 */
  map?: (val: any) => string | null;
}

/**
 * @description 属性装饰器选项
 */
export interface AttributeOptions {
  /** @description 属性类型 - 基本数据类型 */
  type:
    | CustomElementAttributeTypes
    | HTMLFormElementConstructor
    | HTMLFormValidityConstructor
    | object;
  /** @description 默认值 */
  default?: any;
  /** @description 观察者回调 */
  observer?: ((this: any, newVal: any, oldVal: any) => void) | undefined;
  /** @description 无障碍属性同步配置 */
  a11y?: A11yOption;
}

/**
 * @description 属性映射表
 * 键：类构造函数
 * 值：属性名到选项的映射
 */
export type PropertyMap = WeakMap<Function, Record<string, AttributeOptions>>;
