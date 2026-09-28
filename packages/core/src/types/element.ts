/**
 * @description ea-ui 基础组件类接口
 * 所有使用 @customElement 装饰器的组件类都应该实现这个接口
 */
export interface EaElementConstructor {
  new (): EaElement & HTMLElement;
  prototype: EaElement & HTMLElement;
  observedAttributes?: string[];
}

/**
 * @description ea-ui 基础组件实例接口
 * 所有使用 @customElement 装饰器的组件实例都应该实现这个接口
 */
export interface EaElement extends HTMLElement {
  /** @abstract 组件连接时调用 */
  connectedCallback?(): void;
  /** @abstract 组件断开时调用 */
  disconnectedCallback?(): void;
  /** @abstract 组件被采用时调用 */
  adoptedCallback?(): void;
  /** @abstract 属性变化时调用 */
  attributeChangedCallback?(
    name: string,
    oldVal: string | null,
    newVal: string | null
  ): void;

  /** @abstract 更新组件语言 */
  $updateLocalization?(locale: string): void;
  /** @abstract 组件模板渲染，返回 HTML 字符串 */
  html?(): string;
  /** @abstract 组件销毁前调用 */
  $beforeUnmounted?(): void;
  /** @abstract 组件销毁后调用 */
  $unmounted?(): void;
}
