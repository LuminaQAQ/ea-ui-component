import type { AttributeOptions, EaElementConstructor } from "@/types/index";
import { ElementAttributesMap } from "@/stores";

/**
 * @description 注册属性配置到 ElementAttributesMap
 * @param clsName 组件类名
 * @param name 属性名
 * @param options 属性配置选项
 */
function registerPropertyMap(
  clsName: string,
  name: string,
  options: AttributeOptions
) {
  const existingOptions = ElementAttributesMap.get(clsName) || {};
  ElementAttributesMap.set(clsName, {
    ...existingOptions,
    [name]: options,
  });
}

/**
 * @attribute 装饰器 - 用于初始化组件的响应式属性配置
 *
 * @param options - 属性配置选项
 * @returns 装饰器函数
 */
function attribute(options: AttributeOptions): PropertyDecorator {
  return function (this: any, initialValue: any, context?: any) {
    const isNewDecoratorApi =
      context && typeof context === "object" && "addInitializer" in context;

    if (isNewDecoratorApi) {
      // 新装饰器
      const name = context.name as string;
      const clsName: string =
        (context as any).static?.name || this?.constructor?.name;

      registerPropertyMap(clsName, name, options);

      return initialValue;
    } else {
      // 旧装饰器
      const name = context as string;
      const target = initialValue as EaElementConstructor;
      const constructor = target.constructor;
      const clsName = constructor.name;

      registerPropertyMap(clsName, name, options);
    }
  };
}

export { attribute };
export default attribute;
