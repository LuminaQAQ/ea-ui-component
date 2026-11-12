import type { AttributeOptions } from "../types/index";
import { declareAttribute } from "../schema";
import { reportErrorOnce } from "../utils/diagnostics";

/**
 * @attribute 装饰器 - 声明映射到 HTML attribute 的属性
 *
 * 声明写入 `static attributes` 对应的登记簿，由 finalize() 合并为元数据
 *
 * @param options - 属性配置选项
 * @returns 装饰器函数
 */
function attribute(options: AttributeOptions) {
  return function (target: any, name?: string | symbol): void {
    if (typeof name !== "string" && typeof name !== "symbol") {
      reportErrorOnce(
        "attribute-decorator",
        "无法识别的装饰器调用格式, name:",
        name
      );
      return;
    }

    declareAttribute(target.constructor, String(name), { ...options });
  };
}

export { attribute };
export default attribute;
