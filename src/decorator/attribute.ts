import type { AttributeOptions } from "@/types/index";
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
function attribute(options: AttributeOptions) {
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
          "attribute decorator: 无法识别的装饰器调用格式, context:",
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

export { attribute };
export default attribute;
