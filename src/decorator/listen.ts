import type { EaElement } from "@/types/index";

/**
 * 自动绑定事件监听器的装饰器
 * 在 connectedCallback 时绑定，在 disconnectedCallback 时自动清理
 * @param eventName 事件名称
 * @param selector 可选的 CSS 选择器（用于事件委托）
 * @returns 方法装饰器
 *
 * @example
 * class MyComponent extends EaBase {
 *   @listen('click', '.close-btn')
 *   private _handleClose(e: Event) {
 *     this.remove();
 *   }
 * }
 */
export function listen(eventName: string, selector?: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const abortControllerKey = Symbol(`listen_${propertyKey}`);

    // 获取原型链上的 connectedCallback
    const getConnectedCallback = (t: any): Function | undefined => {
      if (t.connectedCallback) return t.connectedCallback;
      const proto = Object.getPrototypeOf(t);
      if (proto && proto !== HTMLElement.prototype) {
        return getConnectedCallback(proto);
      }
      return undefined;
    };

    // 获取原型链上的 disconnectedCallback
    const getDisconnectedCallback = (t: any): Function | undefined => {
      if (t.disconnectedCallback) return t.disconnectedCallback;
      const proto = Object.getPrototypeOf(t);
      if (proto && proto !== HTMLElement.prototype) {
        return getDisconnectedCallback(proto);
      }
      return undefined;
    };

    const originalConnected = getConnectedCallback(target);
    const originalDisconnected = getDisconnectedCallback(target);

    target.connectedCallback = function (this: EaElement & HTMLElement) {
      originalConnected?.call(this);

      const controller = new AbortController();
      (this as any)[abortControllerKey] = controller;

      const handler = (e: Event) => {
        if (selector) {
          const targetElement = e.target as Element;
          if (targetElement.closest(selector)) {
            descriptor.value.call(this, e);
          }
        } else {
          descriptor.value.call(this, e);
        }
      };

      this.shadowRoot?.addEventListener(eventName, handler, {
        signal: controller.signal,
      });
    };

    target.disconnectedCallback = function (this: EaElement & HTMLElement) {
      const controller = (this as any)[abortControllerKey];
      controller?.abort();

      originalDisconnected?.call(this);
    };
  };
}

export default listen;
