import type { EaElement } from "../types/index";

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
  if (
    !selector ||
    selector === "window" ||
    selector === "document" ||
    selector === "shadowRoot"
  ) {
    return (e: Event) => callback.call(element, e);
  }

  return function (e: Event) {
    const path = e.composedPath();
    const shadowRoot = element.shadowRoot;
    const matchedElement = path.find(
      el =>
        el instanceof Element &&
        el.closest &&
        el.closest(selector) &&
        (shadowRoot?.contains(el as Node) || el === element)
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
  if (!selector) {
    return element;
  }
  if ("shadowRoot" in element) {
    if (selector === "shadowRoot") return element.shadowRoot!;

    const target = element.shadowRoot?.querySelector(selector);
    if (target) return target;
  }
  return element.shadowRoot!;
}

/**
 * 元素级事件监听控制器存储
 * 键：组件实例
 * 值：该实例上所有 @listen 绑定的 AbortController 集合
 */
const ElementListenersMap: WeakMap<
  EaElement & HTMLElement,
  Set<AbortController>
> = new WeakMap();

/**
 * 设置事件监听
 * @param element 组件实例
 * @param eventName 事件名称
 * @param selector CSS 选择器
 * @param callback 回调函数
 * @param options 监听选项
 */
function setupEventListener(
  element: EaElement & HTMLElement,
  eventName: string,
  selector: string | undefined,
  callback: (e: Event) => void,
  options?: ListenOptions
): void {
  let controllers = ElementListenersMap.get(element);
  if (!controllers) {
    controllers = new Set();
    ElementListenersMap.set(element, controllers);
  }

  const controller = new AbortController();
  controllers.add(controller);

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
 */
function cleanupEventListener(element: EaElement & HTMLElement): void {
  const controllers = ElementListenersMap.get(element);
  if (controllers) {
    controllers.forEach(controller => controller.abort());
    ElementListenersMap.delete(element);
  }
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

      context.addInitializer(function (this: any) {
        const originalConnected = this.connectedCallback;
        const originalDisconnected = this.disconnectedCallback;

        this.connectedCallback = function (this: EaElement & HTMLElement) {
          originalConnected?.call(this);
          setupEventListener(
            this,
            eventName,
            selector,
            (this as any)[methodName],
            options
          );
        };

        this.disconnectedCallback = function (this: EaElement & HTMLElement) {
          cleanupEventListener(this);
          originalDisconnected?.call(this);
        };
      });

      return targetOrValue;
    } else {
      // 旧版装饰器或兼容模式（包括 Vite/esbuild 转换后的实验性装饰器）
      const target = targetOrValue;
      const propertyKey = propertyKeyOrContext as string;

      if (!propertyKey) {
        console.error("listen decorator: 缺少方法名", {
          targetOrValue,
          propertyKeyOrContext,
          descriptor,
          eventName,
        });
        return;
      }

      const originalConnected = getPrototypeCallback(
        target,
        "connectedCallback"
      );
      const originalDisconnected = getPrototypeCallback(
        target,
        "disconnectedCallback"
      );

      // 在事件触发时从实例上动态获取方法
      target.connectedCallback = function (this: EaElement & HTMLElement) {
        originalConnected?.call(this);
        setupEventListener(
          this,
          eventName,
          selector,
          (e: Event) => {
            // 在运行时从实例上获取方法（支持类字段和原型方法）
            const method = (this as any)[propertyKey];
            if (typeof method === "function") {
              method.call(this, e);
            } else {
              console.error(
                `listen decorator: 事件 "${eventName}" 触发时找不到方法 "${propertyKey}"`,
                { instanceKeys: Object.keys(this), propertyKey }
              );
            }
          },
          options
        );
      };

      target.disconnectedCallback = function (this: EaElement & HTMLElement) {
        cleanupEventListener(this);
        originalDisconnected?.call(this);
      };
    }
  };
}

export default listen;
