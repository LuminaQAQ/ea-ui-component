import type { EaElement } from "@/types/index";

export interface ListenOptions {
  capture?: boolean;
  passive?: boolean;
  once?: boolean;
}

/**
 * 自动绑定事件监听器的装饰器
 * 在 connectedCallback 时绑定，在 disconnectedCallback 时自动清理
 * @param eventName 事件名称
 * @param selector 可选的 CSS 选择器（用于事件委托）
 * @param options 事件监听选项（capture, passive, once）
 * @returns 方法装饰器
 *
 * @example
 * class MyComponent extends EaBase {
 *   @listen('click', '.close-btn')
 *   private _handleClose(e: Event) {
 *     this.remove();
 *   }
 *
 *   @listen('scroll', 'window', { capture: true })
 *   private _handleScroll(e: Event) {
 *     // 监听 window 的滚动事件
 *   }
 * }
 */
export function listen(
  eventName: string,
  selector?: string,
  options?: ListenOptions
) {
  return function (
    targetOrValue: any,
    propertyKeyOrContext: string | ClassMethodDecoratorContext,
    descriptor?: PropertyDescriptor
  ) {
    // 检测是否为新版装饰器 API
    const isNewDecoratorApi =
      propertyKeyOrContext &&
      typeof propertyKeyOrContext === "object" &&
      "addInitializer" in propertyKeyOrContext;

    if (isNewDecoratorApi) {
      // 新版装饰器
      const context = propertyKeyOrContext as ClassMethodDecoratorContext;
      const methodName = context.name as string;

      context.addInitializer(function (this: any) {
        const abortControllerKey = Symbol(`listen_${methodName}`);

        // 获取原始的 connectedCallback 和 disconnectedCallback
        const originalConnected = this.connectedCallback;
        const originalDisconnected = this.disconnectedCallback;

        this.connectedCallback = function (this: EaElement & HTMLElement) {
          originalConnected?.call(this);

          const controller = new AbortController();
          (this as any)[abortControllerKey] = controller;

          const handler = (e: Event) => {
            if (selector && selector !== "window" && selector !== "document") {
              const targetElement = e.target as Element;
              if (targetElement.closest(selector)) {
                (this as any)[methodName].call(this, e);
              }
            } else {
              (this as any)[methodName].call(this, e);
            }
          };

          let target: EventTarget;
          if (selector === "window") {
            target = window;
          } else if (selector === "document") {
            target = document;
          } else {
            target = this.shadowRoot!;
          }

          target.addEventListener(eventName, handler, {
            signal: controller.signal,
            ...options,
          });
        };

        this.disconnectedCallback = function (this: EaElement & HTMLElement) {
          const controller = (this as any)[abortControllerKey];
          controller?.abort();

          originalDisconnected?.call(this);
        };
      });

      return targetOrValue;
    } else {
      // 旧版装饰器
      const target = targetOrValue;
      const propertyKey = propertyKeyOrContext as string;
      const desc = descriptor!;

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
          if (selector && selector !== "window" && selector !== "document") {
            const targetElement = e.target as Element;
            if (targetElement.closest(selector)) {
              desc.value.call(this, e);
            }
          } else {
            desc.value.call(this, e);
          }
        };

        // 确定监听目标
        let targetElement: EventTarget;
        if (selector === "window") {
          targetElement = window;
        } else if (selector === "document") {
          targetElement = document;
        } else {
          targetElement = this.shadowRoot!;
        }

        targetElement.addEventListener(eventName, handler, {
          signal: controller.signal,
          ...options,
        });
      };

      target.disconnectedCallback = function (this: EaElement & HTMLElement) {
        const controller = (this as any)[abortControllerKey];
        controller?.abort();

        originalDisconnected?.call(this);
      };
    }
  };
}

export default listen;
