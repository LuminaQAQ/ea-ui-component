import type { EaElement } from "@/types/index";

export interface ListenOptions {
  capture?: boolean;
  passive?: boolean;
  once?: boolean;
}

/**
 * 创建事件处理器
 * @param selector CSS 选择器
 * @param callback 回调函数
 * @param element 组件实例（用于绑定正确的 this 上下文）
 * @returns 事件处理器函数
 */
function createEventHandler(
  selector: string | undefined,
  callback: (e: Event) => void,
  element: EaElement & HTMLElement
): (e: Event) => void {
  // 没有 selector 或监听 window/document 时，直接调用回调
  if (!selector || selector === "window" || selector === "document") {
    return (e: Event) => callback.call(element, e);
  }

  // 使用 composedPath 来正确处理跨 shadow boundary 的事件
  return function (e: Event) {
    const path = e.composedPath();
    const shadowRoot = element.shadowRoot;
    const matchedElement = path.find(
      el =>
        el instanceof Element &&
        el.closest &&
        el.closest(selector) &&
        // 确保元素在当前的 shadowRoot 内
        (shadowRoot?.contains(el as Node) ||
          // 或者是 shadow host 本身
          el === element)
    );
    if (matchedElement) {
      callback.call(element, e);
    }
  };
}

/**
 * 获取事件监听目标
 * @param selector CSS 选择器
 * @param element 组件实例
 * @returns 事件监听目标
 */
function getEventTarget(
  selector: string | undefined,
  element: EaElement & HTMLElement
): EventTarget {
  if (selector === "window") {
    return window;
  }
  if (selector === "document") {
    return document;
  }
  return element.shadowRoot!;
}

/**
 * 创建 AbortController 的 symbol key
 * @param methodName 方法名
 * @returns symbol key
 */
function createAbortControllerKey(methodName: string | symbol): symbol {
  return Symbol(`listen_${String(methodName)}`);
}

/**
 * 设置 up 事件监听
 * @param element 组件实例
 * @param abortControllerKey AbortController 的 key
 * @param eventName 事件名称
 * @param selector CSS 选择器
 * @param callback 回调函数
 * @param options 监听选项
 */
function setupEventListener(
  element: EaElement & HTMLElement,
  abortControllerKey: symbol,
  eventName: string,
  selector: string | undefined,
  callback: (e: Event) => void,
  options?: ListenOptions
): void {
  const controller = new AbortController();
  (element as any)[abortControllerKey] = controller;

  const handler = createEventHandler(selector, callback, element);
  const target = getEventTarget(selector, element);

  target.addEventListener(eventName, handler, {
    signal: controller.signal,
    ...options,
  });
}

/**
 * 清理事件监听
 * @param element 组件实例
 * @param abortControllerKey AbortController 的 key
 */
function cleanupEventListener(
  element: EaElement & HTMLElement,
  abortControllerKey: symbol
): void {
  const controller = (element as any)[abortControllerKey];
  controller?.abort();
}

/**
 * 获取原型链上的回调函数
 * @param target 目标对象
 * @param methodName 方法名
 * @returns 回调函数或 undefined
 */
function getPrototypeCallback(
  target: any,
  methodName: "connectedCallback" | "disconnectedCallback"
): Function | undefined {
  if (target[methodName]) return target[methodName];
  const proto = Object.getPrototypeOf(target);
  if (proto && proto !== HTMLElement.prototype) {
    return getPrototypeCallback(proto, methodName);
  }
  return undefined;
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
      const methodName = context.name;
      const abortControllerKey = createAbortControllerKey(methodName);

      context.addInitializer(function (this: any) {
        const originalConnected = this.connectedCallback;
        const originalDisconnected = this.disconnectedCallback;

        this.connectedCallback = function (this: EaElement & HTMLElement) {
          originalConnected?.call(this);
          setupEventListener(
            this,
            abortControllerKey,
            eventName,
            selector,
            (e: Event) => {
              (this as any)[methodName].call(this, e);
            },
            options
          );
        };

        this.disconnectedCallback = function (this: EaElement & HTMLElement) {
          cleanupEventListener(this, abortControllerKey);
          originalDisconnected?.call(this);
        };
      });

      return targetOrValue;
    } else {
      // 旧版装饰器
      const target = targetOrValue;
      const propertyKey = propertyKeyOrContext as string;
      const desc = descriptor!;
      // 使用属性名生成唯一的 key，每个装饰器调用都有自己的 key
      const abortControllerKey = createAbortControllerKey(propertyKey);

      const originalConnected = getPrototypeCallback(
        target,
        "connectedCallback"
      );
      const originalDisconnected = getPrototypeCallback(
        target,
        "disconnectedCallback"
      );

      target.connectedCallback = function (this: EaElement & HTMLElement) {
        originalConnected?.call(this);
        setupEventListener(
          this,
          abortControllerKey,
          eventName,
          selector,
          (e: Event) => {
            desc.value.call(this, e);
          },
          options
        );
      };

      target.disconnectedCallback = function (this: EaElement & HTMLElement) {
        cleanupEventListener(this, abortControllerKey);
        originalDisconnected?.call(this);
      };
    }
  };
}

export default listen;
