import type { PropertyMap } from "@/types/index";

/**
 * @description 属性配置映射表 - 用于存储类级别的属性配置
 * 键：类名
 * 值：属性名到选项的映射
 */
const ElementAttributesMap: PropertyMap = new Map();

export { ElementAttributesMap };
export default ElementAttributesMap;
