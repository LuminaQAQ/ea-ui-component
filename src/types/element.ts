/**
 * @description ea-ui 自定义元素的构造函数接口
 */
// export interface EaCustomElementConstructor extends CustomElementConstructor {
//   observedAttributes: string[];
//   __observedAttributes?: string[];
//   __observedAttributesCallback?: Record<
//     string,
//     (this: HTMLElement, newVal: any, oldVal: any) => void
//   >;
// }

/**
 * @description ea-ui 基础组件类接口
 * 所有使用 @customElement 装饰器的组件都应该实现这个接口
 */
export interface EaElementConstructor extends CustomElementConstructor {
  observedAttributes: string[];

  /** @abstract 组件连接时调用 */
  connectedCallback(): void;
  /** @abstract 组件断开时调用 */
  disconnectedCallback(): void;
  /** @abstract 组件被采用时调用 */
  adoptedCallback(): void;
  /** @abstract 属性变化时调用 */
  attributeChangedCallback(
    name: string,
    oldVal: string | null,
    newVal: string | null
  ): void;

  /** @abstract 更新组件语言 */
  $updateLocalization(locale: string): void;
  /** @abstract 组件渲染 */
  $render(): void;
  /** @abstract 组件销毁前调用 */
  $beforeUnmounted(): void;
  /** @abstract 组件销毁后调用 */
  $unmounted(): void;
}

/**
 * @description ea-ui 基础组件构造函数
 * 用于类型断言和静态属性访问
 */
// export interface EaElementConstructor extends EaCustomElementConstructor {
//   new (): EaElement;
//   __observedAttributes: string[];
//   __observedAttributesCallback: Record<
//     string,
//     (this: EaElement, newVal: any, oldVal: any) => void
//   >;
//   observedAttributes: string[];
// }
