import type { PropertyOptions } from "@/types/index";
import { ElementPropertiesMap } from "@/stores";

/**
 * @description 注册属性配置到 ElementPropertiesMap
 * @param clsName 组件类名
 * @param name 属性名
 * @param options 属性配置选项
 */
function registerPropertyMap(
  clsName: string,
  name: string,
  options: PropertyOptions
) {
  const existingOptions = ElementPropertiesMap.get(clsName) || {};
  ElementPropertiesMap.set(clsName, {
    ...existingOptions,
    [name]: options,
  });
}

/**
 * @property 装饰器 - 用于初始化组件的响应式属性配置
 *
 * 支持两种模式：
 * 1. props 模式：通过 JavaScript 属性访问，不映射到 HTML attribute
 * 2. attr 模式：映射到 HTML attribute，支持类型转换
 *
 * @param options - 属性配置选项
 * @returns 装饰器函数
 *
 * @example
 * class MyComponent extends EaBase {
 *   // props 模式 - 仅作为 JS 属性
 *   @property({ type: String, default: 'hello' })
 *   message: string;
 *
 *   // attr 模式 - 映射到 HTML attribute
 *   @property({ type: Number, default: 0, attr: true })
 *   count: number;
 *
 *   // 带观察者的属性
 *   @property({
 *     type: String,
 *     observer: (newVal, oldVal) => console.log('changed:', newVal, oldVal)
 *   })
 *   value: string;
 * }
 */
function property(options: PropertyOptions) {
  return function (
    this: any,
    initialValue: any,
    context?: ClassFieldDecoratorContext | string | symbol
  ) {
    // 检测是否为新版装饰器 API
    const isNewDecoratorApi =
      context && typeof context === "object" && "addInitializer" in context;

    if (isNewDecoratorApi) {
      // 新版装饰器
      const ctx = context as ClassFieldDecoratorContext;
      const name = ctx.name as string;
      const clsName = (ctx as any).static?.name;

      registerPropertyMap(clsName, name, options);

      return initialValue;
    } else {
      // 旧版装饰器 API
      let name: string | undefined;
      let target: any;

      if (typeof context === "string" || typeof context === "symbol") {
        name = context as string;
        target = initialValue;
      } else {
        console.warn(
          "property decorator: 无法识别的装饰器调用格式, context:",
          context
        );
        return initialValue;
      }

      const constructor = target.constructor;
      const clsName = constructor.name;

      registerPropertyMap(clsName, name, options);
    }
  };
}

export { property };
export default property;
