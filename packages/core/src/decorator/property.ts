import type { PropertyOptions } from "../types/index";
import { declareProperty } from "../schema";
import { reportErrorOnce } from "../utils/diagnostics";

/**
 * @property 装饰器 - 声明不映射到 HTML attribute 的 JavaScript 属性
 *
 * 声明写入 `static properties` 对应的登记簿，由 finalize() 合并为元数据
 *
 * @param options - 属性配置选项
 * @returns 装饰器函数
 *
 * @example
 * class MyComponent extends EaBase {
 *   @property({ type: Number })
 *   count = 0;
 *
 *   @property({
 *     type: String,
 *     observer(newVal: string, oldVal: string) {},
 *   })
 *   value = "";
 * }
 */
function property(options: PropertyOptions) {
  return function (target: any, name?: string | symbol): void {
    if (typeof name !== "string" && typeof name !== "symbol") {
      reportErrorOnce(
        "property-decorator",
        "无法识别的装饰器调用格式, name:",
        name
      );
      return;
    }

    declareProperty(target.constructor, String(name), { ...options });
  };
}

export { property };
export default property;
