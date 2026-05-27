import type { ElementPropertyMap } from "@/types/index";

/**
 * @description 属性配置映射表 - 用于存储类级别的属性配置（property 装饰器）
 * 键：类构造函数
 * 值：属性名到选项的映射
 */
const ElementPropertiesMap: ElementPropertyMap = new WeakMap();

export { ElementPropertiesMap };
export default ElementPropertiesMap;
